import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, starterPacksTable } from "@workspace/db";
import { requireAuth } from "../../middlewares/requireAuth";
import { logAudit } from "../../lib/audit";
import {
  CreateAdminPackBody,
  UpdateAdminPackBody,
  UpdateAdminPackParams,
  DeleteAdminPackParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatPack(pack: typeof starterPacksTable.$inferSelect) {
  return {
    id: pack.id,
    name: pack.name,
    price: pack.price,
    discountPercentage: pack.discountPercentage,
    items: pack.items,
    checkoutUrl: pack.checkoutUrl,
    isAvailable: pack.isAvailable,
    createdAt: pack.createdAt.toISOString(),
    updatedAt: pack.updatedAt.toISOString(),
  };
}

router.get("/admin/packs", requireAuth, async (req, res): Promise<void> => {
  const packs = await db.select().from(starterPacksTable).orderBy(starterPacksTable.id);
  res.json(packs.map(formatPack));
});

router.post("/admin/packs", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const parsed = CreateAdminPackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [pack] = await db.insert(starterPacksTable).values(parsed.data).returning();
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "create",
    entityType: "starter_pack",
    entityId: String(pack.id),
    newValue: parsed.data,
    ipAddress: req.ip,
  });
  res.status(201).json(formatPack(pack));
});

router.patch("/admin/packs/:id", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const params = UpdateAdminPackParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateAdminPackBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [existing] = await db
    .select()
    .from(starterPacksTable)
    .where(eq(starterPacksTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Pack not found" });
    return;
  }
  const [pack] = await db
    .update(starterPacksTable)
    .set(parsed.data)
    .where(eq(starterPacksTable.id, params.data.id))
    .returning();
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "update",
    entityType: "starter_pack",
    entityId: String(pack.id),
    oldValue: formatPack(existing),
    newValue: parsed.data,
    ipAddress: req.ip,
  });
  res.json(formatPack(pack));
});

router.delete("/admin/packs/:id", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const params = DeleteAdminPackParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [pack] = await db
    .delete(starterPacksTable)
    .where(eq(starterPacksTable.id, params.data.id))
    .returning();
  if (!pack) {
    res.status(404).json({ error: "Pack not found" });
    return;
  }
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "delete",
    entityType: "starter_pack",
    entityId: String(pack.id),
    oldValue: formatPack(pack),
    ipAddress: req.ip,
  });
  res.sendStatus(204);
});

export default router;
