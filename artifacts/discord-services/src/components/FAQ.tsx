import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services do you provide?",
    answer: "We provide professional digital advisory services including expert consultation sessions, curated resource access, and comprehensive advisory packages — all delivered online.",
  },
  {
    question: "What do I receive after purchasing the Member Portal Access?",
    answer: "You will receive a confirmation email with your Order ID and full instructions to access our private professional portal, including all resources and materials. Access is permanent with no expiry.",
  },
  {
    question: "How do I schedule my Expert Advisory Session after purchase?",
    answer: "After your payment is confirmed, you will receive an email at the address you provided. Our team will contact you within 24 hours to schedule your 2-hour session at a time that works for you.",
  },
  {
    question: "What is included in the Complete Advisory Package?",
    answer: "The Complete Advisory Package includes permanent Member Portal Access, one 2-hour Expert Advisory Session, and 30 days of full premium resource access — everything we offer in a single purchase.",
  },
  {
    question: "Is this a subscription or recurring charge?",
    answer: "No. Every purchase is a one-time payment. You will never be charged again automatically. There are no subscriptions, billing cycles, or renewal charges of any kind.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day refund window from the date of purchase. To request a refund, email rameediscord@gmail.com with your Order ID. Full details are on our Refund Policy page.",
  },
  {
    question: "Is my payment secure?",
    answer: "Yes. All payments are processed securely through Paddle, a trusted global payment processor. We never store your card or banking details.",
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
            Everything you need to know before purchasing.
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
