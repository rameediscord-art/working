import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          background: scrolled ? "#13131A" : "transparent",
          borderBottom: scrolled ? "1px solid #2A2A3A" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #7C5CFC, #9D7BFF)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>
              R
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>Ramee Digital</span>
          </Link>

          {/* Desktop links */}
          <nav style={{ display: "flex", gap: 32 }} className="hidden md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#9A9AAF", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9A9AAF")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            className="hidden md:inline-flex"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", background: "#7C5CFC", padding: "8px 20px", borderRadius: 8, textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6344E0")}
            onMouseLeave={e => (e.currentTarget.style.background = "#7C5CFC")}
          >
            Get Started
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 99, background: "#0A0A0F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "Outfit, sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", textDecoration: "none" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#fff", background: "#7C5CFC", padding: "14px 40px", borderRadius: 10, textDecoration: "none", marginTop: 8 }}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
