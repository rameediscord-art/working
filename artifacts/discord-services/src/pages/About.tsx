import { motion } from "framer-motion";
import { Shield, Zap, Star, HeartHandshake } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

const values = [
  {
    icon: <Shield className="w-6 h-6" style={{ color: "#7C5CFC" }} />,
    title: "Transparency",
    description: "Clear pricing, clear deliverables, and straightforward terms — no hidden fees, no ambiguity.",
  },
  {
    icon: <Zap className="w-6 h-6" style={{ color: "#7C5CFC" }} />,
    title: "Fast Delivery",
    description: "Service access and session scheduling handled within 24 hours of purchase confirmation — no delays.",
  },
  {
    icon: <Star className="w-6 h-6" style={{ color: "#7C5CFC" }} />,
    title: "Professional Quality",
    description: "Every service is results-focused, professionally delivered, and tailored to each client's specific goals.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" style={{ color: "#7C5CFC" }} />,
    title: "Client-First",
    description: "Every decision we make is guided by what delivers the most value to our clients.",
  },
];

export function About() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 96, paddingBottom: 64 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#7C5CFC", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              About Us
            </p>
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15, margin: "0 0 20px" }}>
              Professional Digital Advisory Services
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: "#9A9AAF", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
              We are a professional digital services provider offering expert advisory sessions, curated educational resources, and private consultation packages for individuals and professionals seeking structured digital guidance.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64 }} className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>What We Do</h2>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#9A9AAF", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ margin: 0 }}>
                  Our team delivers high-quality, results-focused services entirely online. We offer three professional service tiers: Member Portal Access, Expert Advisory Sessions, and our Complete Advisory Package — all as one-time purchases with no subscriptions or recurring charges.
                </p>
                <p style={{ margin: 0 }}>
                  Every service is clearly described before purchase. We believe clients deserve to know exactly what they are receiving — transparent pricing, transparent deliverables, and a straightforward process from start to finish.
                </p>
                <p style={{ margin: 0 }}>
                  After every purchase, clients receive an Order ID by email. Our team contacts you within 24 hours to deliver your service — whether that is portal access, session scheduling, or both.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 16px" }}>Who We Serve</h2>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#9A9AAF", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ margin: 0 }}>
                  We serve individuals and professionals who want structured digital guidance, expert one-on-one consultation, and access to curated professional resources — all delivered without unnecessary complexity.
                </p>
                <p style={{ margin: 0 }}>
                  Whether you need permanent access to our professional resource portal, a dedicated two-hour advisory session tailored to your goals, or the complete package that covers everything — there is a service for you.
                </p>
                <p style={{ margin: 0 }}>
                  Every client receives dedicated attention, premium materials, and direct access to our advisory network. We operate with full transparency — no vague promises, no hidden charges.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 64 }}
          >
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", textAlign: "center", margin: "0 0 36px" }}>Our Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="values-grid">
              {values.map((value, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: 24, borderRadius: 16, background: "#13131A", border: "1px solid #2A2A3A" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(124,92,252,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 6px" }}>{value.title}</h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#9A9AAF", margin: 0, lineHeight: 1.65 }}>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", padding: 40, borderRadius: 20, background: "#13131A", border: "1px solid #2A2A3A" }}
          >
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 12px" }}>Get in Touch</h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#9A9AAF", margin: "0 0 24px" }}>
              Questions about our services? We respond to every inquiry within 12 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }} className="contact-buttons">
              <a
                href="mailto:rameediscord@gmail.com"
                style={{ display: "inline-block", background: "#7C5CFC", color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none" }}
              >
                rameediscord@gmail.com
              </a>
              <Link
                href="/contact"
                style={{ display: "inline-block", background: "transparent", color: "#9A9AAF", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid #2A2A3A" }}
              >
                Contact Form
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .contact-buttons { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
