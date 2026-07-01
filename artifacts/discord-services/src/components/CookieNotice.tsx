import { useState, useEffect } from "react";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "#13131A",
        borderTop: "1px solid #2A2A3A",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9A9AAF", margin: 0, flex: 1, minWidth: 200 }}>
        We use cookies to improve your experience. By continuing, you agree to our{" "}
        <a href="/privacy" style={{ color: "#7C5CFC", textDecoration: "none" }}>Privacy Policy</a>.
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          onClick={() => setVisible(false)}
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9A9AAF", background: "none", border: "1px solid #2A2A3A", borderRadius: 8, padding: "7px 16px", cursor: "pointer" }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", background: "#7C5CFC", border: "none", borderRadius: 8, padding: "7px 16px", cursor: "pointer" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
