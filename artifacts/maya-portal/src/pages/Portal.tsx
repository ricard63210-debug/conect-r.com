import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

const LINKS = {
  menu: "/maya-menu/",
  reserve: "https://tablereserve.conect-r.com/book/roosters-on-the-river",
  review: "https://www.google.com/maps/search/?api=1&query=Carmelita%27s+Kitchen+de+Mexico+Sacramento",
  events: "https://www.instagram.com/mayacantinasac/",
  instagram: "https://www.instagram.com/mayacantinasac/",
  facebook: "https://www.facebook.com/Mayarestaurantsac",
  game: "https://maya-cantina-dash.replit.app/juego/juego/",
};

interface FormState {
  name: string;
  email: string;
  table: string;
  message: string;
}

function QRIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 6v14M21 6v14M3 12h18M10 6v14M14 6v14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M6 20.75A4.75 4.75 0 0 1 1.25 16v-4A6.75 6.75 0 0 1 8 5.25h8A6.75 6.75 0 0 1 22.75 12v4A4.75 4.75 0 0 1 18 20.75a4.75 4.75 0 0 1-3.808-1.908L12 16.25l-2.192 2.592A4.75 4.75 0 0 1 6 20.75z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3M12 17v4M8 21h8M7 4h10l-1 8a4 4 0 0 1-8 0L7 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="12" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

const actionButtons = [
  {
    id: "menu",
    label: "Digital Menu",
    href: LINKS.menu,
    icon: <QRIcon />,
    gradient: "linear-gradient(135deg, #d4700a, #f09030)",
    external: false,
  },
  {
    id: "reserve",
    label: "Reserve a Table",
    href: LINKS.reserve,
    icon: <TableIcon />,
    gradient: "linear-gradient(135deg, #c4860a, #d4a017)",
    external: true,
  },
  {
    id: "review",
    label: "Share Your Experience",
    href: LINKS.review,
    icon: <HeartIcon />,
    gradient: "linear-gradient(135deg, #b03060, #e05090)",
    external: true,
  },
  {
    id: "events",
    label: "Events & Specials",
    href: LINKS.events,
    icon: <CalendarIcon />,
    gradient: "linear-gradient(135deg, #c84a10, #f06030)",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: LINKS.instagram,
    icon: <InstagramIcon />,
    gradient: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
    external: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: LINKS.facebook,
    icon: <FacebookIcon />,
    gradient: "linear-gradient(135deg, #1565c0, #1976d2)",
    external: true,
  },
];

export default function Portal() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", table: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/aricard63210@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name || "Anonymous Guest",
          email: form.email || "No email provided",
          table: form.table || "Not specified",
          message: form.message,
          _subject: "⚠️ Bad Experience Report — Maya Cantina Sacramento",
          _template: "box",
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", table: "", message: "" });
        setTimeout(() => {
          setSent(false);
          setShowFeedback(false);
        }, 3000);
      } else {
        setError("Could not send. Please try again.");
      }
    } catch {
      setError("Could not send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#0d0a06", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 32px" }}>

      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 10%, rgba(212,160,23,0.06) 0%, transparent 55%),
                          radial-gradient(ellipse at 80% 80%, rgba(212,160,23,0.04) 0%, transparent 50%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, padding: "0 16px" }}>

        {/* Header */}
        <div style={{ paddingTop: 40, paddingBottom: 24, textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <div style={{
              width: 96, height: 96, borderRadius: "50%",
              border: "2.5px solid #d4a017",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(212,160,23,0.3), 0 0 80px rgba(212,160,23,0.1)",
              margin: "0 auto",
            }}>
              <img src={`${BASE}maya-logo.jpeg`} alt="Maya Cantina" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 28, letterSpacing: "0.1em", lineHeight: 1.1 }}
            className="gold-gradient">
            MAYA CANTINA
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "rgba(212,160,23,0.6)", letterSpacing: "0.3em", marginTop: 6 }}>
            AUTHENTIC MEXICAN CUISINE
          </div>
          <div style={{ marginTop: 6, fontSize: 13, color: "#8b7355" }}>
            455 Bercut Dr, Sacramento, CA 95811
          </div>
        </div>

        {/* Select prompt */}
        <div style={{ textAlign: "center", marginBottom: 20, fontSize: 13, color: "#6b5a3a", letterSpacing: "0.05em" }}>
          What can we help you with?
        </div>

        {/* Action buttons grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {actionButtons.map((btn, i) => (
            <motion.a
              key={btn.id}
              href={btn.href}
              target={btn.external ? "_blank" : undefined}
              rel={btn.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.28 }}
              className="portal-card"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", textAlign: "center",
                padding: "20px 12px 16px",
                textDecoration: "none", color: "inherit", cursor: "pointer",
                userSelect: "none",
              }}
              whileTap={{ scale: 0.94 }}
            >
              <div className="btn-icon" style={{ background: btn.gradient }}>
                <span style={{ color: "white" }}>{btn.icon}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#f5ead5", lineHeight: 1.3 }}>
                {btn.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Game Banner — Maya King */}
        <motion.a
          href={LINKS.game}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.28 }}
          style={{
            display: "flex", alignItems: "center", gap: 14,
            width: "100%", marginTop: 12, padding: "16px 18px",
            background: "linear-gradient(135deg, rgba(120,40,180,0.18) 0%, rgba(212,160,23,0.14) 100%)",
            border: "1px solid rgba(180,120,230,0.35)",
            borderRadius: "1.25rem", cursor: "pointer", textDecoration: "none",
            position: "relative", overflow: "hidden",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* shimmer line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(180,120,255,0.6), rgba(212,160,23,0.8), transparent)",
          }} />
          <div style={{
            width: 50, height: 50, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg, #7820b4, #b040e0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(160,60,220,0.4)",
          }}>
            <span style={{ color: "white" }}><GameIcon /></span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f5ead5", marginBottom: 3, fontFamily: "'Cinzel', serif", letterSpacing: "0.03em" }}>
              Maya King
            </div>
            <div style={{ fontSize: 12, color: "#c090e8" }}>
              🏆 Juega y gana
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(180,120,255,0.7)" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.a>

        {/* Bad Experience Banner */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.28 }}
          onClick={() => setShowFeedback(true)}
          style={{
            width: "100%", marginTop: 16, padding: "14px 16px",
            background: "rgba(180,40,20,0.12)", border: "1px solid rgba(180,40,20,0.3)",
            borderRadius: "1.25rem", cursor: "pointer", display: "flex",
            alignItems: "center", gap: 14, textAlign: "left",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, #c43010, #e05020)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f5ead5", marginBottom: 2 }}>
              Had a bad experience?
            </div>
            <div style={{ fontSize: 12, color: "#8b7355" }}>
              Help us improve — tell us what happened
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b5a3a" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          style={{
            marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1, background: "rgba(212,160,23,0.12)",
            borderRadius: "1.25rem", overflow: "hidden",
            border: "1px solid rgba(212,160,23,0.18)",
          }}
        >
          {[
            { icon: <StarIcon />, value: "4.9", label: "Reviews" },
            { value: "6", label: "Days a Week" },
            { value: "HH", label: "Tue–Thu 5–7pm" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "14px 8px", textAlign: "center",
              background: "#1a1208",
              borderRight: i < 2 ? "1px solid rgba(212,160,23,0.12)" : "none",
            }}>
              {stat.icon && (
                <div style={{ display: "flex", justifyContent: "center", color: "#d4a017", marginBottom: 2 }}>
                  {stat.icon}
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 700, color: "#d4a017", fontFamily: "'Cinzel', serif" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: "#6b5a3a", marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hours note */}
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#4a3a22", lineHeight: 1.6 }}>
          Open daily · Mon–Sun 9am–10pm
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowFeedback(false); }}
          >
            <motion.div
              className="modal-sheet"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Handle bar */}
              <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, margin: "0 auto 20px" }} />

              {sent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "#d4a017", marginBottom: 8 }}>
                    Thank You
                  </div>
                  <p style={{ fontSize: 14, color: "#8b7355" }}>
                    Your feedback has been received. We'll use it to improve your experience.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color: "#d4a017", marginBottom: 6 }}>
                      Share Your Feedback
                    </div>
                    <p style={{ fontSize: 13, color: "#8b7355" }}>
                      We take every experience seriously. Tell us what happened.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Your name (optional)"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Table # (optional)"
                        value={form.table}
                        onChange={e => setForm(f => ({ ...f, table: e.target.value }))}
                      />
                    </div>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Email (optional — for follow-up)"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    <textarea
                      className="form-input"
                      placeholder="Please tell us what happened so we can make it right..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                    />
                    {error && (
                      <p style={{ fontSize: 12, color: "#e05030" }}>{error}</p>
                    )}
                    <button type="submit" className="btn-submit" disabled={sending || !form.message.trim()}>
                      {sending ? "Sending…" : "Send Feedback"}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setShowFeedback(false)}>
                      Cancel
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
