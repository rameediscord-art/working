import { Router, type IRouter } from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db, adminUsersTable } from "@workspace/db";
import { signToken } from "../../lib/auth";
import { requireAuth } from "../../middlewares/requireAuth";
import { logAudit } from "../../lib/audit";
import {
  AdminLoginBody,
  AdminChangePasswordBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

router.post("/admin/auth/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { username, password } = parsed.data;

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.username, username));

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    res.status(423).json({ error: "Account locked. Try again later." });
    return;
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordValid) {
    const attempts = user.failedLoginAttempts + 1;
    const lockedUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
    await db
      .update(adminUsersTable)
      .set({ failedLoginAttempts: attempts, lockedUntil })
      .where(eq(adminUsersTable.id, user.id));
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  await db
    .update(adminUsersTable)
    .set({ failedLoginAttempts: 0, lockedUntil: null })
    .where(eq(adminUsersTable.id, user.id));

  const token = signToken({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  await logAudit({
    adminUserId: user.id,
    adminUsername: user.username,
    action: "login",
    entityType: "session",
    ipAddress: req.ip,
  });

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      totpEnabled: user.totpEnabled,
      sessionTimeoutMinutes: user.sessionTimeoutMinutes,
      createdAt: user.createdAt.toISOString(),
    },
  });
});

router.post("/admin/auth/logout", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  await logAudit({
    adminUserId: adminUser.id,
    adminUsername: adminUser.username,
    action: "logout",
    entityType: "session",
    ipAddress: req.ip,
  });
  res.json({ success: true, message: "Logged out" });
});

router.get("/admin/auth/me", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, adminUser.id));

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    totpEnabled: user.totpEnabled,
    sessionTimeoutMinutes: user.sessionTimeoutMinutes,
    createdAt: user.createdAt.toISOString(),
  });
});

router.post("/admin/auth/change-password", requireAuth, async (req, res): Promise<void> => {
  const adminUser = (req as typeof req & { adminUser: { id: number; username: string } }).adminUser;
  const parsed = AdminChangePasswordBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { currentPassword, newPassword } = parsed.data;

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, adminUser.id));

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    res.status(400).json({ error: "Current password is incorrect" });
    return;
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await db
    .update(adminUsersTable)
    .set({ passwordHash: newHash })
    .where(eq(adminUsersTable.id, user.id));

  await logAudit({
    adminUserId: user.id,
    adminUsername: user.username,
    action: "change_password",
    entityType: "admin_user",
    entityId: String(user.id),
    ipAddress: req.ip,
  });

  res.json({ success: true, message: "Password updated" });
});

export default router;
