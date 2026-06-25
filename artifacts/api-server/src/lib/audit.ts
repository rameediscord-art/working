import { db, auditLogsTable } from "@workspace/db";

export async function logAudit(params: {
  adminUserId?: number;
  adminUsername: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
}): Promise<void> {
  await db.insert(auditLogsTable).values({
    adminUserId: params.adminUserId ?? null,
    adminUsername: params.adminUsername,
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId ?? null,
    oldValue: params.oldValue ?? null,
    newValue: params.newValue ?? null,
    ipAddress: params.ipAddress ?? null,
  });
}
