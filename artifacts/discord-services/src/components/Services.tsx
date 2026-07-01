import { motion } from "framer-motion";

function PortalIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#7C5CFC" strokeWidth="1.8"/>
      <path d="M3 9h18M9 21V9" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function SessionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#7C5CFC" strokeWidth="1.8"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function BundleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#7C5CFC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const items = [
  {
    icon: <PortalIcon />,
    name: "Professional Member Portal Access",
    desc: "Permanent access to our private digital portal containing expert resources, curated materials, and direct communication with our advisory team — all in one place.",
  },
  {
    icon: <SessionIcon />,
    name: "Expert Advisory Session",
    desc: "A private 2-hour one-on-one digital consultation with a senior professional advisor. Fully personalised to your goals, scheduled via email immediately after your purchase is confirmed.",
  },
  {
    icon: <BundleIcon />,
    name: "Complete Advisory Package",
    desc: "Everything included in our portal access and advisory session, bundled together with 30 days of full premium resource access. Our highest-value service offering.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      style={{ background: "#0A0A0F", padding: "80px 20px" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: "#fff", margin: "0 0 12px" }}>
            What You Get
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#9A9AAF", margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Three professional service tiers. Everything clearly defined. No ambiguity.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="what-you-get-grid"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "#13131A",
                border: "1px solid #2A2A3A",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ marginBottom: 20, width: 52, height: 52, background: "rgba(124,92,252,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 0 10px" }}>{item.name}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#9A9AAF", margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .what-you-get-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
