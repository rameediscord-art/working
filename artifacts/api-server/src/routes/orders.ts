import { Router } from "express";
import { db, ordersTable, membershipPlansTable } from "@workspace/db";
import { eq, or, ilike, and, sql, desc } from "drizzle-orm";
import { requireAuth } from "../middlewares/requireAuth";
import { sendOrderConfirmationEmail } from "../lib/email";
import { logger } from "../lib/logger";

const router = Router();

function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(10000 + Math.random() * 90000).toString();
  return `ORD-${date}-${random}`;
}

// POST /orders — public checkout
router.post("/orders", async (req, res) => {
  const { customerName, customerEmail, planName, planPrice } = req.body as {
    customerName?: string;
    customerEmail?: string;
    planName?: string;
    planPrice?: string;
  };

  if (!customerName?.trim() || !customerEmail?.trim() || !planName?.trim() || !planPrice) {
    res.status(400).json({ error: "customerName, customerEmail, planName, and planPrice are required." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerEmail)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  const orderId = generateOrderId();

  const [order] = await db
    .insert(ordersTable)
    .values({
      orderId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      planName: planName.trim(),
      planPrice,
      paymentStatus: "pending",
      notes: "",
    })
    .returning();

  if (!order) {
    res.status(500).json({ error: "Failed to create order." });
    return;
  }

  try {
    await sendOrderConfirmationEmail({
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      planName: order.planName,
      planPrice: order.planPrice,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (err) {
    logger.error({ err }, "Failed to send order confirmation email");
  }

  res.status(201).json({
    id: order.id,
    orderId: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    planName: order.planName,
    planPrice: order.planPrice,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  });
});

// GET /orders/:orderId — public confirmation lookup
router.get("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.orderId, orderId))
    .limit(1);

  if (!order) {
    res.status(404).json({ error: "Order not found." });
    return;
  }

  res.json({
    id: order.id,
    orderId: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    planName: order.planName,
    planPrice: order.planPrice,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  });
});

// GET /admin/orders — protected
router.get("/admin/orders", requireAuth, async (req, res) => {
  const search = (req.query["search"] as string) ?? "";
  const status = (req.query["status"] as string) ?? "";
  const limit = parseInt((req.query["limit"] as string) ?? "50", 10);
  const offset = parseInt((req.query["offset"] as string) ?? "0", 10);

  const conditions = [];
  if (search) {
    conditions.push(
      or(ilike(ordersTable.orderId, `%${search}%`), ilike(ordersTable.customerEmail, `%${search}%`), ilike(ordersTable.customerName, `%${search}%`)),
    );
  }
  if (status && ["pending", "confirmed", "refunded"].includes(status)) {
    conditions.push(eq(ordersTable.paymentStatus, status as "pending" | "confirmed" | "refunded"));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, [countRow]] = await Promise.all([
    db
      .select()
      .from(ordersTable)
      .where(whereClause)
      .orderBy(desc(ordersTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(ordersTable).where(whereClause),
  ]);

  res.json({
    items: items.map((o) => ({
      id: o.id,
      orderId: o.orderId,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      planName: o.planName,
      planPrice: o.planPrice,
      paymentStatus: o.paymentStatus,
      notes: o.notes,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    })),
    total: Number(countRow?.count ?? 0),
  });
});

// PATCH /admin/orders/:id — protected
router.patch("/admin/orders/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params["id"] ?? "", 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID." });
    return;
  }

  const { paymentStatus, notes } = req.body as { paymentStatus?: string; notes?: string };
  const updates: Partial<typeof ordersTable.$inferInsert> = {};

  if (paymentStatus !== undefined) {
    if (!["pending", "confirmed", "refunded"].includes(paymentStatus)) {
      res.status(400).json({ error: "Invalid paymentStatus." });
      return;
    }
    updates.paymentStatus = paymentStatus as "pending" | "confirmed" | "refunded";
  }
  if (notes !== undefined) updates.notes = notes;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields to update." });
    return;
  }

  const [order] = await db.update(ordersTable).set(updates).where(eq(ordersTable.id, id)).returning();
  if (!order) {
    res.status(404).json({ error: "Order not found." });
    return;
  }

  res.json({
    id: order.id,
    orderId: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    planName: order.planName,
    planPrice: order.planPrice,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  });
});

export default router;
