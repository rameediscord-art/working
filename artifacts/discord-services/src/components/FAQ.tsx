import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What do I get with Discord Access?",
    answer: "You get permanent access to our private Discord server — including all members-only channels, resources, and updates. This is a one-time payment. There is no expiry date and you will never be asked to pay again.",
  },
  {
    question: "How do I schedule my Live Session after purchase?",
    answer: "After your order is confirmed you will receive an email from us. We will reach out to you at the email address you provided at checkout to schedule the 2-hour session at a time that works for you.",
  },
  {
    question: "What is included in the Full Bundle?",
    answer: "The Full Bundle includes everything: permanent Discord server access, one 2-hour private live session, and full access to all resources and materials for 30 days. It is the best-value option and covers everything we offer in a single one-time payment.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. We offer a 7-day refund window from your purchase date. To request a refund, email rameediscord@gmail.com with your Order ID. Please review our Refund Policy page for the full terms.",
  },
  {
    question: "How will I receive my access after payment?",
    answer: "Immediately after placing your order you will receive a confirmation email containing your unique Order ID. Our team will then contact you within a few hours to deliver your product — whether that is a Discord invite link, a session scheduling message, or both.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{ background: "#0A0A0F", padding: "80px 20px", borderTop: "1px solid #2A2A3A" }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: "#fff", margin: "0 0 12px" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#9A9AAF", margin: 0 }}>
            Everything you need to know before buying.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "#13131A",
                  border: `1px solid ${isOpen ? "#7C5CFC" : "#2A2A3A"}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 12,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", lineHeight: 1.4 }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{ color: "#7C5CFC", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#9A9AAF", padding: "0 20px 20px", margin: 0, lineHeight: 1.75 }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
