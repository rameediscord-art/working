import { Router, type IRouter } from "express";
import { db, auditLogsTable } from "@workspace/db";
import { desc, count } from "drizzle-orm";
import { requireAuth } from "../../middlewares/requireAuth";
import { ListAuditLogsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/audit-logs", requireAuth, async (req, res): Promise<void> => {
  const params = ListAuditLogsQueryParams.safeParse(req.query);
  const limit = params.success ? (params.data.limit ?? 20) : 20;
  const offset = params.success ? (params.data.offset ?? 0) : 0;

  const [totalResult] = await db.select({ total: count() }).from(auditLogsTable);
  const items = await db
    .select()
    .from(auditLogsTable)
    .orderBy(desc(auditLogsTable.createdAt))
    .limit(limit)
    .offset(offset);

  res.json({
    total: totalResult.total,
    items: items.map((log) => ({
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
