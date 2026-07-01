import { motion } from "framer-motion";

export function CTABanner() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #13131A 0%, #1A1428 100%)",
        borderTop: "1px solid #2A2A3A",
        borderBottom: "1px solid #2A2A3A",
        padding: "72px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}
      >
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 36px)", color: "#fff", margin: "0 0 14px", lineHeight: 1.2 }}>
          Ready to get started?
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#9A9AAF", margin: "0 0 32px", lineHeight: 1.6 }}>
          Pick a product, pay once, and we will take it from there.
        </p>
        <a
          href="#pricing"
          style={{
            display: "inline-block",
            background: "#7C5CFC",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 40px",
            borderRadius: 10,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#6344E0")}
          onMouseLeave={e => (e.currentTarget.style.background = "#7C5CFC")}
          className="cta-btn"
        >
          View Products
        </a>
      </motion.div>

      <style>{`
        @media (max-width: 767px) {
          .cta-btn { display: block !important; text-align: center; margin: 0 auto; padding: 16px 20px !important; }
        }
      `}</style>
    </section>
  );
}
