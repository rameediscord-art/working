import { Router } from "express";
import { sendContactEmail } from "../lib/email";
import { logger } from "../lib/logger";

const router = Router();

// POST /contact
router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name?.trim()) {
    res.status(400).json({ error: "Name is required." });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.trim() || !emailRegex.test(email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  if (!message?.trim() || message.trim().length < 10) {
    res.status(400).json({ error: "Message must be at least 10 characters." });
    return;
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    });
    logger.info({ email }, "Contact form submitted");
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
  }

  res.json({ success: true, message: "Your message has been sent. We will get back to you shortly." });
});

export default router;
