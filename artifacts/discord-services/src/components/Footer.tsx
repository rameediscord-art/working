import { Link } from "wouter";

export function Footer() {
  return (
    <footer style={{ background: "#0A0A0F", borderTop: "1px solid #2A2A3A", padding: "48px 20px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #7C5CFC, #9D7BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 14, color: "#fff" }}>
              R
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>Ramee Digital Services</span>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#7C5CFC", margin: "0 0 6px", fontWeight: 600 }}>
            Professional Digital Advisory Services
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9A9AAF", margin: 0, maxWidth: 360 }}>
            Expert guidance, premium resources, and private consultations — delivered digitally.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 24px", marginBottom: 28 }} className="footer-links">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Refund Policy", href: "/refund" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9A9AAF", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9A9AAF")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9A9AAF", textAlign: "center", margin: 0, paddingTop: 24, borderTop: "1px solid #2A2A3A" }}>
          © {new Date().getFullYear()} Ramee Digital Services. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .footer-links {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            text-align: center;
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
