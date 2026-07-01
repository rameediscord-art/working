import { Link } from "wouter";

const products = [
  {
    id: "discord",
    order: { desktop: 1, mobile: 3 },
    name: "Discord Access",
    price: "$14",
    label: "One-Time Payment",
    features: [
      "Permanent Discord server access",
      "Private members-only channels",
      "Exclusive resources and updates",
      "No expiry, no renewal ever",
    ],
    featured: false,
    cta: "Buy Now",
    href: "/checkout?plan=Discord+Access&price=14",
  },
  {
    id: "bundle",
    order: { desktop: 2, mobile: 1 },
    name: "Full Bundle",
    price: "$120",
    label: "One-Time Payment",
    features: [
      "Permanent Discord server access",
      "1x private live session (2 hours)",
      "Full resource library for 30 days",
      "Priority email delivery",
    ],
    featured: true,
    badge: "Best Value",
    cta: "Buy Now",
    href: "/checkout?plan=Full+Bundle&price=120",
  },
  {
    id: "session",
    order: { desktop: 3, mobile: 2 },
    name: "Live 1-on-1 Session",
    price: "$60",
    label: "One-Time Payment",
    features: [
      "2-hour private live session",
      "Fully personalised to your goals",
      "Scheduled via email after purchase",
      "No subscription required",
    ],
    featured: false,
    cta: "Buy Now",
    href: "/checkout?plan=Live+1-on-1+Session&price=60",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill="#7C5CFC" fillOpacity="0.18" />
      <path d="M5 8l2 2 4-4" stroke="#7C5CFC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="pricing"
      style={{
        background: "#0A0A0F",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px 60px",
      }}
    >
      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 680 }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#7C5CFC", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
          One-Time Payment. No Subscriptions. Ever.
        </p>
        <h1
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 14px",
          }}
        >
          Pay Once. Access Forever.
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#9A9AAF",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Choose your product below and get instant access — no renewals, no surprises.
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          width: "100%",
          maxWidth: 1080,
        }}
        className="cards-grid"
      >
        {products
          .sort((a, b) => a.order.desktop - b.order.desktop)
          .map((p) => (
            <div
              key={p.id}
              style={{
                order: p.order.desktop,
                background: p.featured
                  ? "linear-gradient(145deg, #13131A, #1A1428)"
                  : "#13131A",
                border: p.featured ? "2px solid #7C5CFC" : "1px solid #7C5CFC",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                boxShadow: p.featured
                  ? "0 0 24px rgba(124, 92, 252, 0.4)"
                  : "none",
                position: "relative",
              }}
              className={`product-card ${p.featured ? "featured-card" : ""} card-order-${p.order.mobile}`}
            >
              {p.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "#7C5CFC",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "Inter, sans-serif",
                    padding: "4px 10px",
                    borderRadius: 99,
                    letterSpacing: "0.04em",
                  }}
                >
                  {p.badge}
                </span>
              )}

              <h2
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#fff",
                  margin: "0 0 16px",
                  paddingRight: p.badge ? 80 : 0,
                }}
                className="card-name"
              >
                {p.name}
              </h2>

              <div style={{ marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 42,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                  className="card-price"
                >
                  {p.price}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: "#9A9AAF",
                  margin: "0 0 20px",
                }}
              >
                {p.label}
              </p>

              <div style={{ height: 1, background: "#2A2A3A", marginBottom: 20 }} />

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {p.features.map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "Inter, sans-serif", fontSize: 14, color: "#fff" }}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                style={{
                  display: "block",
                  width: "100%",
                  height: 48,
                  background: "#7C5CFC",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: "48px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#6344E0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#7C5CFC")}
              >
                {p.cta}
              </Link>
            </div>
          ))}
      </div>

      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9A9AAF", marginTop: 24, textAlign: "center" }}>
        Questions? Email us at{" "}
        <a href="mailto:rameediscord@gmail.com" style={{ color: "#7C5CFC", textDecoration: "none" }}>
          rameediscord@gmail.com
        </a>
      </p>

      <style>{`
        @media (max-width: 767px) {
          .cards-grid {
            grid-template-columns: 1fr !important;
          }
          .card-order-1 { order: 1; }
          .card-order-2 { order: 2; }
          .card-order-3 { order: 3; }
          .featured-card {
            border-width: 2px !important;
          }
          .card-name { font-size: 18px !important; }
          .card-price { font-size: 36px !important; }
          .product-card { padding: 20px !important; }
        }
      `}</style>
    </section>
  );
}
