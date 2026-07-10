import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mail, Check } from "lucide-react";
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
      "¡Hola! 👋 Soy Aria del equipo de Conect-R. Hablo español e inglés, escríbeme en el idioma que prefieras. ¿En qué te puedo ayudar hoy?",
    typeHere: "Escribe un mensaje...",
    fallback: `Tuve un problemita de conexión. Mientras, escríbeme a ${CONTACT_EMAIL} o al ${PHONE_DISPLAY}.`,
    summaryTitle: "Resumen para el equipo",
    summaryHint: "Revisa los datos y mándalos cuando estés listo.",
    sendBtn: "Enviar resumen por correo",
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
    greet: "Hi! 👋 I'm Aria from the Conect-R team. I speak English and Spanish — write to me in whichever you prefer. What's on your mind today?",
    typeHere: "Type a message...",
    fallback: `Hit a connection snag. Meanwhile, drop me a line at ${CONTACT_EMAIL} or call ${PHONE_DISPLAY}.`,
    summaryTitle: "Summary for the team",
    summaryHint: "Review your details and send when ready.",
    sendBtn: "Send summary",
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
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentType, setConsentType] = useState<"sms" | "whatsapp" | "email">("sms");
  const customGreetRef = useRef<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const aiHistoryRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Initialize / language change (skip if a custom greeting was just set externally)
  useEffect(() => {
    if (customGreetRef.current) {
      // Reset flag — the event handler already seeded messages
      customGreetRef.current = null;
      return;
    }
    setMessages([{ id: uid(), from: "bot", text: t.greet }]);
    aiHistoryRef.current = [{ role: "assistant", content: t.greet }];
    setAppointment(null);
    setEditing(false);
    setSendStatus("idle");
  }, [lang, t.greet]);

  // Listen for external "open chat with greeting" and consent overlay triggers
  useEffect(() => {
    const handleOpenChat = () => {
      setConsentType("sms");
      setConsentChecked(false);
      setConsentModalOpen(true);
    };
    const handleOpenConsent = (e: Event) => {
      const ce = e as CustomEvent<{ type: "sms" | "whatsapp" | "email" }>;
      setConsentType(ce.detail?.type || "sms");
      setConsentChecked(false);
      setConsentModalOpen(true);
    };

    window.addEventListener("conectr:open-chat", handleOpenChat);
    window.addEventListener("conectr:open-consent", handleOpenConsent as EventListener);
    return () => {
      window.removeEventListener("conectr:open-chat", handleOpenChat);
      window.removeEventListener("conectr:open-consent", handleOpenConsent as EventListener);
    };
  }, []);

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

  // Keep sendMessageRef in sync with latest sendMessage (declared below)
  const sendMessageRef = useRef<((raw: string) => void) | null>(null);

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
  sendMessageRef.current = sendMessage;

  const sendEmail = async () => {
    if (!appointment || sendStatus === "sending") return;
    setSendStatus("sending");
    try {
      const res = await fetch(`${apiBase}/api/assistant/send-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSendStatus("sent");
      pushBot(
        lang === "es"
          ? "¡Listo! Enviamos el resumen a tu correo y al equipo de Conect-R. Te contactamos en menos de 24 horas 🙌"
          : "Done! We sent the summary to your inbox and to the Conect-R team. You'll hear from us within 24 hours 🙌",
      );
    } catch {
      setSendStatus("error");
      // Fallback to mailto so the user can still send manually
      window.location.href = buildMailto(lang, appointment);
    }
  };

  const handleConsentSubmit = () => {
    if (!consentChecked) return;
    setConsentModalOpen(false);

    if (consentType === "sms") {
      const bodyText = lang === "es" 
        ? "estoy interesado en una en una demostración gratis" 
        : "I am interested in a free demo";
      const encodedBody = encodeURIComponent(bodyText);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
      const smsUrl = isIOS 
        ? `sms:+19168120873&body=${encodedBody}` 
        : `sms:+19168120873?body=${encodedBody}`;
      window.location.href = smsUrl;
    } else if (consentType === "whatsapp") {
      const bodyText = lang === "es"
        ? "Hola, estoy interesado en una demostración gratis"
        : "Hello, I am interested in a free demo";
      const encodedBody = encodeURIComponent(bodyText);
      window.open(`https://wa.me/19168120873?text=${encodedBody}`, "_blank", "noopener,noreferrer");
    } else if (consentType === "email") {
      const subject = lang === "es" ? "Solicitud de Demostración - Conect-R" : "Demo Request - Conect-R";
      const bodyText = lang === "es"
        ? "Hola, estoy interesado en una demostración gratis"
        : "Hello, I am interested in a free demo";
      window.location.href = `mailto:contact@conect-r.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    }
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
                  status={sendStatus}
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

      {/* Global SMS Consent Modal for Demo Bookings */}
      <AnimatePresence>
        {consentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setConsentModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                {consentType === "sms" && (lang === "es" ? "Consentimiento de SMS" : "SMS Consent")}
                {consentType === "whatsapp" && (lang === "es" ? "Consentimiento de Comunicación" : "Communication Consent")}
                {consentType === "email" && (lang === "es" ? "Consentimiento de Correo" : "Email Consent")}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 mb-6">
                {consentType === "sms" && (
                  lang === "es" 
                    ? "CONECT-R se comunica contigo a través de SMS para coordinar tu demostración."
                    : "CONECT-R communicates with you via SMS to coordinate your demo."
                )}
                {consentType === "whatsapp" && (
                  lang === "es" 
                    ? "CONECT-R se comunica contigo a través de WhatsApp para coordinar tu demostración."
                    : "CONECT-R communicates with you via WhatsApp to coordinate your demo."
                )}
                {consentType === "email" && (
                  lang === "es" 
                    ? "CONECT-R se comunica contigo a través de correo electrónico para coordinar tu demostración."
                    : "CONECT-R communicates with you via email to coordinate your demo."
                )}
              </p>

              <div className="flex items-start gap-3 bg-muted/40 p-4 rounded-2xl border border-border/60 mb-6">
                <input
                  type="checkbox"
                  id="global-sms-consent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="global-sms-consent" className="text-xs leading-normal text-muted-foreground select-none cursor-pointer">
                  By providing your phone number and checking this box, I agree to receive automated SMS notifications from CONECT-R and its services (Nextup, TableReserve, CONECT-R Station). Msg & data rates may apply. Reply STOP to opt out at any time.
                </label>
              </div>

              <div className="text-xs text-muted-foreground flex justify-center gap-1.5 mb-6">
                <a href="https://conect-r.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Privacy Policy</a>
                <span>|</span>
                <a href="https://conect-r.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Terms & Conditions</a>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConsentSubmit}
                  disabled={!consentChecked}
                  className="w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
                >
                  {consentType === "sms" && (lang === "es" ? "Enviar y Agendar vía SMS" : "Submit & Book via SMS")}
                  {consentType === "whatsapp" && (lang === "es" ? "Enviar y Agendar vía WhatsApp" : "Submit & Book via WhatsApp")}
                  {consentType === "email" && (lang === "es" ? "Enviar y Agendar vía Correo" : "Submit & Book via Email")}
                </button>
                <button
                  onClick={() => setConsentModalOpen(false)}
                  className="w-full inline-flex items-center justify-center border border-border hover:bg-muted text-muted-foreground px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                >
                  {lang === "es" ? "Cancelar" : "Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
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
  status,
  onEdit,
  onChange,
  onSend,
}: {
  lang: Lang;
  appt: Appointment;
  editing: boolean;
  status: "idle" | "sending" | "sent" | "error";
  onEdit: () => void;
  onChange: (a: Appointment) => void;
  onSend: () => void;
}) {
  const t = STR[lang];
  const L = t.labels;
  const [smsConsent, setSmsConsent] = useState(false);

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
            <div key={f.key} className="space-y-1">
              <label className="block">
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
              {f.key === "phone" && (
                <div className="mt-1.5 mb-1.5 flex items-start gap-2 bg-background/30 p-2 rounded-lg border border-border/40">
                  <input
                    type="checkbox"
                    id="sms-consent-edit"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded accent-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="sms-consent-edit" className="text-[9px] leading-tight text-muted-foreground select-none">
                    By providing your phone number, you agree to receive automated SMS notifications from CONECT-R and its services (Nextup, TableReserve). Msg & data rates may apply. Reply STOP to opt out. Privacy Policy: <a href="https://conect-r.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">https://conect-r.com/privacy</a> | Terms: <a href="https://conect-r.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">https://conect-r.com/terms</a>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1 pt-1">
          {fields
            .filter((f) => appt[f.key])
            .map((f) => (
              <div key={f.key} className="space-y-1">
                <div className="text-[11px] flex gap-2">
                  <span className="text-muted-foreground shrink-0 w-24">
                    {f.label}
                  </span>
                  <span className="text-foreground break-words">
                    {appt[f.key]}
                  </span>
                </div>
                {f.key === "phone" && (
                  <div className="mt-1.5 mb-1.5 flex items-start gap-2 bg-background/30 p-2 rounded-lg border border-border/40">
                    <input
                      type="checkbox"
                      id="sms-consent-view"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded accent-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="sms-consent-view" className="text-[9px] leading-tight text-muted-foreground select-none">
                      By providing your phone number, you agree to receive automated SMS notifications from CONECT-R and its services (Nextup, TableReserve). Msg & data rates may apply. Reply STOP to opt out. Privacy Policy: <a href="https://conect-r.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">https://conect-r.com/privacy</a> | Terms: <a href="https://conect-r.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">https://conect-r.com/terms</a>
                    </label>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      <button
        onClick={onSend}
        disabled={status === "sending" || status === "sent" || (!!appt.phone && !smsConsent)}
        className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg text-sm font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {status === "sent" ? (
          <>
            <Check size={14} />
            {lang === "es" ? "Enviado" : "Sent"}
          </>
        ) : status === "sending" ? (
          <>
            <Mail size={14} />
            {lang === "es" ? "Enviando..." : "Sending..."}
          </>
        ) : (
          <>
            <Mail size={14} /> {t.sendBtn}
          </>
        )}
      </button>
    </div>
  );
}
