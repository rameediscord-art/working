import { Router, type Request } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { db, adminUsersTable, passwordResetTokensTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";
import { sendPasswordResetEmail } from "../../lib/email";
import { logger } from "../../lib/logger";

const router = Router();

function getBaseUrl(req: Request): string {
  const host = req.get("host") ?? "localhost";
  const proto = (req.get("x-forwarded-proto") ?? req.protocol) as string;
  return `${proto}://${host}`;
}

// POST /admin/auth/forgot-password
router.post("/admin/auth/forgot-password", async (req, res) => {
  const { email } = req.body as { email?: string };
  const successMsg = "If that email is registered, a reset link has been sent.";

  if (!email || typeof email !== "string") {
    res.json({ success: true, message: successMsg });
    return;
  }

  const [admin] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email.toLowerCase().trim()))
    .limit(1);

  if (!admin) {
    res.json({ success: true, message: successMsg });
    return;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db
    .update(passwordResetTokensTable)
    .set({ used: true })
    .where(and(eq(passwordResetTokensTable.adminUserId, admin.id), eq(passwordResetTokensTable.used, false)));

  await db.insert(passwordResetTokensTable).values({
    adminUserId: admin.id,
    tokenHash,
    expiresAt,
    used: false,
  });

  try {
    await sendPasswordResetEmail(admin.email, rawToken, getBaseUrl(req));
    logger.info({ adminId: admin.id }, "Password reset email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send password reset email");
  }

  res.json({ success: true, message: successMsg });
});

// POST /admin/auth/reset-password
router.post("/admin/auth/reset-password", async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body as {
    token?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  if (!token || !newPassword || !confirmPassword) {
    res.status(400).json({ error: "token, newPassword, and confirmPassword are required." });
    return;
  }
  if (newPassword !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match." });
    return;
  }
  if (newPassword.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters." });
    return;
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const [resetToken] = await db
    .select()
    .from(passwordResetTokensTable)
    .where(
      and(
        eq(passwordResetTokensTable.tokenHash, tokenHash),
        eq(passwordResetTokensTable.used, false),
        gt(passwordResetTokensTable.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!resetToken) {
    res.status(400).json({ error: "This reset link is invalid or has expired. Please request a new one." });
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await db
    .update(adminUsersTable)
    .set({ passwordHash: hashedPassword })
    .where(eq(adminUsersTable.id, resetToken.adminUserId));

  await db
    .update(passwordResetTokensTable)
    .set({ used: true })
    .where(eq(passwordResetTokensTable.id, resetToken.id));

  logger.info({ adminId: resetToken.adminUserId }, "Password reset successfully");
  res.json({ success: true, message: "Password reset successfully. You can now log in." });
});

export default router;
