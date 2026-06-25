import { Router, type IRouter } from "express";
import { db, membershipPlansTable, starterPacksTable, auditLogsTable, siteSettingsTable, ordersTable } from "@workspace/db";
import { count, eq, desc } from "drizzle-orm";
import { requireAuth } from "../../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/admin/dashboard", requireAuth, async (_req, res): Promise<void> => {
  const [plansCount] = await db.select({ total: count() }).from(membershipPlansTable);
  const [activePlansCount] = await db
    .select({ total: count() })
    .from(membershipPlansTable)
    .where(eq(membershipPlansTable.isActive, true));
  const [packsCount] = await db.select({ total: count() }).from(starterPacksTable);
  const [activePacksCount] = await db
    .select({ total: count() })
    .from(starterPacksTable)
    .where(eq(starterPacksTable.isAvailable, true));
  const [ordersCount] = await db.select({ total: count() }).from(ordersTable);
  const [pendingOrdersCount] = await db
    .select({ total: count() })
    .from(ordersTable)
    .where(eq(ordersTable.paymentStatus, "pending"));

  const recentLogs = await db
    .select()
    .from(auditLogsTable)
    .orderBy(desc(auditLogsTable.createdAt))
    .limit(10);

  const [settings] = await db.select().from(siteSettingsTable).limit(1);

  res.json({
    totalPlans: plansCount?.total ?? 0,
    activePlans: activePlansCount?.total ?? 0,
    totalPacks: packsCount?.total ?? 0,
    activePacks: activePacksCount?.total ?? 0,
    totalOrders: ordersCount?.total ?? 0,
    pendingOrders: pendingOrdersCount?.total ?? 0,
    maintenanceMode: settings?.maintenanceMode ?? false,
    recentActivity: recentLogs.map((log) => ({
      id: log.id,
      adminUserId: log.adminUserId,
      adminUsername: log.adminUsername,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      oldValue: log.oldValue,
      newValue: log.newValue,
      ipAddress: log.ipAddress,
      createdAt: log.createdAt.toISOString(),
    })),
  });
});

export default router;
