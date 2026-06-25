import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membershipPlansTable } from "@workspace/db";
import { requireAuth } from "../../middlewares/requireAuth";
import { logAudit } from "../../lib/audit";
import {
  CreateAdminPlanBody,
  UpdateAdminPlanBody,
  UpdateAdminPlanParams,
  DeleteAdminPlanParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatPlan(plan: typeof membershipPlansTable.$inferSelect) {
  return {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    billingCycle: plan.billingCycle,
    description: plan.description,
    features: plan.features,
    checkoutUrl: plan.checkoutUrl,
    isActive: plan.isActive,
    isFeatured: plan.isFeatured,
    createdAt: plan.createdAt.toISOString(),
    updatedAt: plan.updatedAt.toISOString(),
  };
}

router.get("/admin/plans", requireAuth, async (req, res): Promise<void> => {
  const plans = await db
    .select()
    .from(membershipPlansTable)
    .orderBy(membershipPlansTable.sortOrder);
  res.json(plans.map(formatPlan));
});

router.post("/admin/plans", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const parsed = CreateAdminPlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [plan] = await db.insert(membershipPlansTable).values(parsed.data).returning();
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "create",
    entityType: "membership_plan",
    entityId: String(plan.id),
    newValue: parsed.data,
    ipAddress: req.ip,
  });
  res.status(201).json(formatPlan(plan));
});

router.patch("/admin/plans/:id", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const params = UpdateAdminPlanParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateAdminPlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [existing] = await db
    .select()
    .from(membershipPlansTable)
    .where(eq(membershipPlansTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }
  const [plan] = await db
    .update(membershipPlansTable)
    .set(parsed.data)
    .where(eq(membershipPlansTable.id, params.data.id))
    .returning();
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "update",
    entityType: "membership_plan",
    entityId: String(plan.id),
    oldValue: formatPlan(existing),
    newValue: parsed.data,
    ipAddress: req.ip,
  });
  res.json(formatPlan(plan));
});

router.delete("/admin/plans/:id", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const params = DeleteAdminPlanParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [plan] = await db
    .delete(membershipPlansTable)
    .where(eq(membershipPlansTable.id, params.data.id))
    .returning();
  if (!plan) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "delete",
    entityType: "membership_plan",
    entityId: String(plan.id),
    oldValue: formatPlan(plan),
    ipAddress: req.ip,
  });
  res.sendStatus(204);
});

export default router;
