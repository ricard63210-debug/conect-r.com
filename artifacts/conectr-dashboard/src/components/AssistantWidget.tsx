import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "contact@conect-r.com";
const PHONE_DISPLAY = "+1 916 812 0873";

type Lang = "es" | "en";

type Msg = { id: string; from: "bot" | "user"; text: string };

type Appointment = {
  businessName: string;
  businessType: string;
  locations: string;
  website: string;
  challenge: string;
  currentTech: string;
  interest: string;
  touchpoints: string;
  budget: string;
  attendees: string;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
};

const STR = {
  es: {
    fab: "Chat",
    name: "Aria",
    role: "Conect-R",
    greet:
      "¡Hola! 👋 Soy Aria del equipo de Conect-R. ¿En qué te puedo ayudar hoy?",
    typeHere: "Escribe un mensaje...",
    fallback: `Tuve un problemita de conexión. Mientras, escríbeme a ${CONTACT_EMAIL} o al ${PHONE_DISPLAY}.`,
    summaryTitle: "Resumen para el equipo",
    summaryHint: "Revisa los datos y mándalos cuando estés listo.",
    sendBtn: "Enviar correo",
    edit: "Editar",
    labels: {
      profile: "Perfil del Negocio",
      diagnosis: "Diagnóstico",
      interest: "Interés",
      budgetSection: "Presupuesto y decisión",
      contact: "Contacto",
      businessName: "Nombre del negocio",
      businessType: "Giro",
      locations: "Ubicaciones",
      website: "Sitio web / redes",
      challenge: "Reto actual",
      currentTech: "Tecnología actual",
      interestField: "Solución de interés",
      touchpoints: "Puntos a digitalizar",
      budget: "Presupuesto",
      attendees: "Participantes",
      contactName: "Contacto",
      role: "Cargo",
      phone: "Teléfono",
      email: "Correo",
    },
    emailSubject: "Solicitud de demo — Conect-R",
    emailIntro:
      "Hola equipo Conect-R, me interesa agendar una demo. Estos son mis datos:",
  },
  en: {
    fab: "Chat",
    name: "Aria",
    role: "Conect-R",
    greet: "Hi! 👋 I'm Aria from the Conect-R team. What's on your mind today?",
    typeHere: "Type a message...",
    fallback: `Hit a connection snag. Meanwhile, drop me a line at ${CONTACT_EMAIL} or call ${PHONE_DISPLAY}.`,
    summaryTitle: "Summary for the team",
    summaryHint: "Review your details and send when ready.",
    sendBtn: "Send email",
    edit: "Edit",
    labels: {
      profile: "Business profile",
      diagnosis: "Diagnosis",
      interest: "Interest",
      budgetSection: "Budget & decision",
      contact: "Contact",
      businessName: "Business name",
      businessType: "Industry",
      locations: "Locations",
      website: "Website / social",
      challenge: "Current challenge",
      currentTech: "Current tech",
      interestField: "Solution of interest",
      touchpoints: "Touchpoints",
      budget: "Budget",
      attendees: "Attendees",
      contactName: "Contact",
      role: "Role",
      phone: "Phone",
      email: "Email",
    },
    emailSubject: "Demo request — Conect-R",
    emailIntro:
      "Hi Conect-R team, I'd like to book a demo. Here are my details:",
  },
} as const;

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function buildEmailBody(lang: Lang, b: Appointment) {
  const t = STR[lang];
  const L = t.labels;
  return [
    t.emailIntro,
    "",
    `1. ${L.profile}`,
    `• ${L.businessName}: ${b.businessName || "—"}`,
    `• ${L.businessType}: ${b.businessType || "—"}`,
    `• ${L.locations}: ${b.locations || "—"}`,
    `• ${L.website}: ${b.website || "—"}`,
    "",
    `2. ${L.diagnosis}`,
    `• ${L.challenge}: ${b.challenge || "—"}`,
    `• ${L.currentTech}: ${b.currentTech || "—"}`,
    "",
    `3. ${L.interest}`,
    `• ${L.interestField}: ${b.interest || "—"}`,
    `• ${L.touchpoints}: ${b.touchpoints || "—"}`,
    "",
    `4. ${L.budgetSection}`,
    `• ${L.budget}: ${b.budget || "—"}`,
    `• ${L.attendees}: ${b.attendees || "—"}`,
    "",
    `5. ${L.contact}`,
    `• ${L.contactName}: ${b.contactName || "—"}${b.contactRole ? ` (${b.contactRole})` : ""}`,
    `• ${L.phone}: ${b.phone || "—"}`,
    `• ${L.email}: ${b.email || "—"}`,
  ].join("\n");
}

function buildMailto(lang: Lang, b: Appointment) {
  const t = STR[lang];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(buildEmailBody(lang, b))}`;
}

export default function AssistantWidget() {
  const { lang } = useLang();
  const t = STR[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [editing, setEditing] = useState(false);
  const [unread, setUnread] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const aiHistoryRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Initialize / language change
  useEffect(() => {
    setMessages([{ id: uid(), from: "bot", text: t.greet }]);
    aiHistoryRef.current = [{ role: "assistant", content: t.greet }];
    setAppointment(null);
    setEditing(false);
  }, [lang, t.greet]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, appointment, thinking, open]);

  // Subtle "new message" hint after a short delay if user hasn't opened
  useEffect(() => {
    if (open) {
      setUnread(false);
      return;
    }
    const t1 = setTimeout(() => setUnread(true), 18000);
    return () => clearTimeout(t1);
  }, [open]);

  const pushBot = (text: string) =>
    setMessages((m) => [...m, { id: uid(), from: "bot", text }]);
  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: uid(), from: "user", text }]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    pushUser(text);
    aiHistoryRef.current.push({ role: "user", content: text });
    setInput("");
    setThinking(true);
    try {
      const res = await fetch(`${apiBase}/api/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: aiHistoryRef.current.slice(-20),
          lang,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as {
        reply?: string;
        appointment?: Appointment | null;
      };

      let replyText = data.reply?.trim() ?? "";
      if (!replyText && data.appointment) {
        replyText =
          lang === "es"
            ? "Listo, ya armé el resumen para el equipo. Revísalo abajo y mándalo cuando estés listo 🙌"
            : "All set — I put the summary together for the team. Take a look below and send it when you're ready 🙌";
      }
      if (replyText) {
        pushBot(replyText);
        aiHistoryRef.current.push({
          role: "assistant",
          content: replyText,
        });
      }
      if (data.appointment) {
        // Merge with any prior appointment so user edits are preserved
        setAppointment((prev) => ({
          businessName: "",
          businessType: "",
          locations: "",
          website: "",
          challenge: "",
          currentTech: "",
          interest: "",
          touchpoints: "",
          budget: "",
          attendees: "",
          contactName: "",
          contactRole: "",
          phone: "",
          email: "",
          ...(prev || {}),
          ...data.appointment,
        }));
      }
    } catch {
      pushBot(t.fallback);
    } finally {
      setThinking(false);
    }
  };

  const sendEmail = () => {
    if (!appointment) return;
    window.location.href = buildMailto(lang, appointment);
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setOpen(true)}
            aria-label={t.fab}
            className="fixed z-[60] bottom-5 right-5 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-orange-500/30 transition-all"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-semibold pr-1">{t.fab}</span>
            {unread && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-background" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] h-[min(640px,calc(100vh-2rem))] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
            role="dialog"
            aria-label={t.name}
          >
            {/* Header — feels like a real person */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
              <Avatar />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold leading-tight truncate text-foreground">
                  {t.name}
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {t.role}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-muted/20"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} from={m.from} text={m.text} />
              ))}

              {thinking && <TypingDots />}

              {appointment && (
                <SummaryCard
                  lang={lang}
                  appt={appointment}
                  editing={editing}
                  onEdit={() => setEditing((e) => !e)}
                  onChange={(a) => setAppointment(a)}
                  onSend={sendEmail}
                />
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background px-3 py-2.5">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void sendMessage(input);
                    }
                  }}
                  placeholder={t.typeHere}
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-full border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  autoFocus
                  disabled={thinking}
                />
                <button
                  onClick={() => void sendMessage(input)}
                  disabled={thinking || !input.trim()}
                  aria-label="Send"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Subcomponents ───────────── */

function Avatar() {
  return (
    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 inline-flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-background shadow">
      A
    </div>
  );
}

function MessageBubble({ from, text }: { from: "bot" | "user"; text: string }) {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? "bg-card border border-border text-foreground rounded-tl-sm"
            : "bg-orange-500 text-white rounded-tr-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 inline-flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
      </div>
    </div>
  );
}

function SummaryCard({
  lang,
  appt,
  editing,
  onEdit,
  onChange,
  onSend,
}: {
  lang: Lang;
  appt: Appointment;
  editing: boolean;
  onEdit: () => void;
  onChange: (a: Appointment) => void;
  onSend: () => void;
}) {
  const t = STR[lang];
  const L = t.labels;

  const fields: { key: keyof Appointment; label: string }[] = [
    { key: "businessName", label: L.businessName },
    { key: "businessType", label: L.businessType },
    { key: "locations", label: L.locations },
    { key: "website", label: L.website },
    { key: "challenge", label: L.challenge },
    { key: "currentTech", label: L.currentTech },
    { key: "interest", label: L.interestField },
    { key: "touchpoints", label: L.touchpoints },
    { key: "budget", label: L.budget },
    { key: "attendees", label: L.attendees },
    { key: "contactName", label: L.contactName },
    { key: "contactRole", label: L.role },
    { key: "phone", label: L.phone },
    { key: "email", label: L.email },
  ];

  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-foreground">{t.summaryTitle}</div>
        <button
          onClick={onEdit}
          className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline"
        >
          {editing ? "✓" : t.edit}
        </button>
      </div>
      <div className="text-[11px] text-muted-foreground">{t.summaryHint}</div>

      {editing ? (
        <div className="space-y-1.5 pt-1">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {f.label}
              </span>
              <input
                value={appt[f.key]}
                onChange={(e) =>
                  onChange({ ...appt, [f.key]: e.target.value })
                }
                className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
            </label>
          ))}
        </div>
      ) : (
        <div className="space-y-1 pt-1">
          {fields
            .filter((f) => appt[f.key])
            .map((f) => (
              <div key={f.key} className="text-[11px] flex gap-2">
                <span className="text-muted-foreground shrink-0 w-24">
                  {f.label}
                </span>
                <span className="text-foreground break-words">
                  {appt[f.key]}
                </span>
              </div>
            ))}
        </div>
      )}

      <button
        onClick={onSend}
        className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg text-sm font-semibold mt-2"
      >
        <Mail size={14} /> {t.sendBtn}
      </button>
    </div>
  );
}
