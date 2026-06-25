import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteSettingsTable } from "@workspace/db";
import { requireAuth } from "../../middlewares/requireAuth";
import { logAudit } from "../../lib/audit";
import { UpdateAdminSettingsBody } from "@workspace/api-zod";

const router: IRouter = Router();

function formatSettings(s: typeof siteSettingsTable.$inferSelect) {
  return {
    id: s.id,
    siteName: s.siteName,
    logoUrl: s.logoUrl,
    contactEmail: s.contactEmail,
    currency: s.currency,
    taxRate: s.taxRate,
    notificationEmail: s.notificationEmail,
    maintenanceMode: s.maintenanceMode,
    discordInviteUrl: s.discordInviteUrl,
    updatedAt: s.updatedAt.toISOString(),
  };
}

async function getOrCreateSettings() {
  const [existing] = await db.select().from(siteSettingsTable).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(siteSettingsTable).values({}).returning();
  return created;
}

router.get("/admin/settings", requireAuth, async (_req, res): Promise<void> => {
  const settings = await getOrCreateSettings();
  res.json(formatSettings(settings));
});

router.patch("/admin/settings", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const parsed = UpdateAdminSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const existing = await getOrCreateSettings();
  const [updated] = await db
    .update(siteSettingsTable)
    .set(parsed.data)
    .where(eq(siteSettingsTable.id, existing.id))
    .returning();
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "update",
    entityType: "site_settings",
    oldValue: formatSettings(existing),
    newValue: parsed.data,
    ipAddress: req.ip,
  });
  res.json(formatSettings(updated));
});

export default router;
