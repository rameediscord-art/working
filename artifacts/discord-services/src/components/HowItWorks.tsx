import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Select Your Service",
    description: "Choose the advisory package that best matches your professional needs from our three service tiers.",
  },
  {
    number: "2",
    title: "Complete Your Purchase",
    description: "Enter your name and email, then submit. Secure one-time payment processed through Paddle — no card stored, no account required.",
  },
  {
    number: "3",
    title: "Receive Instant Confirmation",
    description: "Your Order ID and service access details are sent to your email immediately. Our team follows up within 24 hours to deliver your service.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ background: "#0A0A0F", padding: "80px 20px", borderTop: "1px solid #2A2A3A" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: "#fff", margin: "0 0 12px" }}>
            How It Works
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#9A9AAF", margin: 0 }}>
            Three steps. Done in minutes.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}
          className="how-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#7C5CFC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {step.number}
              </div>
              <div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 0 8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#9A9AAF", margin: 0, lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
