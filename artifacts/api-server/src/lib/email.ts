import nodemailer from "nodemailer";

const GMAIL_USER = "rameediscord@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function getTransporter() {
  if (!GMAIL_APP_PASSWORD) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendPasswordResetEmail(toEmail: string, resetToken: string, baseUrl: string): Promise<void> {
  const transporter = getTransporter();
  const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken}`;

  if (!transporter) {
    console.warn("[email] GMAIL_APP_PASSWORD not set — skipping password reset email. Reset URL:", resetUrl);
    return;
  }

  await transporter.sendMail({
    from: `"NexusHub Admin" <${GMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset Request — NexusHub Admin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">NexusHub Admin — Password Reset</h2>
        <p>You requested a password reset for your admin account.</p>
        <p>Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">If you did not request this, ignore this email — your password will not change.</p>
        <p style="color: #666; font-size: 12px;">Link: ${resetUrl}</p>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(order: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planPrice: string;
  createdAt: string;
}): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn("[email] GMAIL_APP_PASSWORD not set — skipping order confirmation email for", order.orderId);
    return;
  }

  await transporter.sendMail({
    from: `"NexusHub" <${GMAIL_USER}>`,
    to: order.customerEmail,
    subject: `Order Confirmation — ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
        <h2 style="color: #a78bfa; margin-bottom: 4px;">Thank you for your order!</h2>
        <p style="color: #94a3b8; margin-top: 0;">Your purchase has been received and is being processed.</p>

        <div style="background: #1a1a2e; border: 1px solid #312e81; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Order ID</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #a78bfa; letter-spacing: 2px;">${order.orderId}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #1e1e3f;">Customer Name</td>
            <td style="padding: 8px 0; color: #e2e8f0; text-align: right; border-bottom: 1px solid #1e1e3f;">${order.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #1e1e3f;">Plan</td>
            <td style="padding: 8px 0; color: #e2e8f0; text-align: right; border-bottom: 1px solid #1e1e3f;">${order.planName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; border-bottom: 1px solid #1e1e3f;">Amount</td>
            <td style="padding: 8px 0; color: #e2e8f0; text-align: right; border-bottom: 1px solid #1e1e3f;">$${order.planPrice}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8;">Date</td>
            <td style="padding: 8px 0; color: #e2e8f0; text-align: right;">${new Date(order.createdAt).toLocaleDateString()}</td>
          </tr>
        </table>

        <div style="background: #1a1a2e; border-left: 3px solid #a78bfa; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 8px; font-weight: bold; color: #a78bfa;">Next Steps</p>
          <p style="margin: 0; color: #94a3b8; font-size: 14px;">Our team will review your payment and activate your plan within 24 hours. Keep this Order ID for your records — you'll need it for any support or refund requests.</p>
        </div>

        <p style="color: #64748b; font-size: 13px;">Questions? Contact us at <a href="mailto:rameediscord@gmail.com" style="color: #a78bfa;">rameediscord@gmail.com</a> — include your Order ID in every message.</p>
      </div>
    `,
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn("[email] GMAIL_APP_PASSWORD not set — skipping contact email from", data.email);
    return;
  }

  await transporter.sendMail({
    from: `"NexusHub Contact Form" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: data.email,
    subject: `[Contact Form] ${data.subject ?? "New Message"} — from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject ?? "—"}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${data.message}</p>
      </div>
    `,
  });
}
