import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowLeft, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CONTACT_EMAIL = "contact@conect-r.com";
const PHONE_DISPLAY = "+1 916 812 0873";

type Lang = "es" | "en";

type Msg = { id: string; from: "bot" | "user"; text: string };

type Mode = "menu" | "faq" | "booking" | "review" | "done";

type BookingForm = {
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

const EMPTY_BOOKING: BookingForm = {
  businessName: "", businessType: "", locations: "", website: "",
  challenge: "", currentTech: "", interest: "", touchpoints: "",
  budget: "", attendees: "", contactName: "", contactRole: "", phone: "", email: "",
};

/* ───────────── i18n strings ───────────── */

const STR = {
  es: {
    fab: "Asistente",
    title: "Asistente Conect-R",
    subtitle: "En linea • Responde al instante",
    greet: "Hola, soy Aria, tu asistente virtual de Conect-R. Puedo contarte sobre nuestro ecosistema, resolver tus dudas y agendar tu demo gratis. ¿Como te ayudo?",
    backToMenu: "Volver al menu",
    optAsk: "Tengo preguntas sobre Conect-R",
    optBook: "Quiero agendar una demo",
    optTalk: "Hablar con una persona",
    talk: `Con gusto. Puedes escribirnos a ${CONTACT_EMAIL} o llamar / WhatsApp al ${PHONE_DISPLAY}. Tambien puedo agendar una demo aqui mismo si prefieres.`,
    faqIntro: "Estos son los temas mas consultados. Toca uno o escribe tu pregunta.",
    bookingIntro: "Perfecto. Te hare unas preguntas rapidas (toma menos de 2 minutos) y al final preparo tu correo a contact@conect-r.com con todo listo para enviar.",
    nextStep: "Siguiente",
    skip: "Saltar",
    sendDraft: "Generar borrador de correo",
    sendDraftHint: "Se abrira tu app de correo con todo prellenado para contact@conect-r.com",
    doneTitle: "Borrador listo",
    doneBody: "Abrimos tu app de correo con un mensaje pre-armado para contact@conect-r.com. Solo revisa y envia. Nuestro equipo responde en menos de 24 horas.",
    closeAfter: "Cerrar",
    typeHere: "Escribe tu mensaje...",
    didntCatch: "Cuentame mas — o elige una opcion abajo.",
    required: "Este dato lo necesitamos para preparar tu cita.",
    steps: {
      businessName: { q: "Para empezar, ¿cual es el nombre de tu negocio?", ph: "Ej. Maya Cantina" },
      businessType: { q: "¿Que tipo de negocio es?", ph: "Restaurante, clinica, tienda, etc." },
      locations: { q: "¿Cuantas ubicaciones tienes?", ph: "Ej. 1, 2, 5+" },
      website: { q: "¿Cual es tu sitio web o redes sociales?", ph: "URL o @usuario (opcional)" },
      challenge: { q: "¿Cual es tu mayor reto tecnologico actual?", ph: "Cuentame en tus palabras" },
      currentTech: { q: "¿Que tecnologia usas hoy? (POS, sitio web, sistema de pedidos)", ph: "Ej. Square POS, sitio en Wix, pedidos por WhatsApp" },
      interest: { q: "¿Que solucion de Conect-R te interesa mas?", ph: "Elige o escribe" },
      touchpoints: { q: "¿Cuantos puntos de contacto necesitas digitalizar? (mesas/mostradores)", ph: "Ej. 12 mesas" },
      budget: { q: "¿Tienes un presupuesto estimado para esta inversion?", ph: "Elige un rango" },
      attendees: { q: "¿Quienes participaran en la reunion?", ph: "Nombres y roles (idealmente quien decide)" },
      contactName: { q: "¿Cual es tu nombre y cargo?", ph: "Ej. Ana Lopez, Gerente" },
      phone: { q: "¿Telefono de contacto directo?", ph: "Ej. +1 555 123 4567" },
      email: { q: "Por ultimo, ¿tu correo?", ph: "tu@correo.com" },
    },
    challengeOpts: [
      "Mis menus estan desactualizados",
      "No tengo base de datos de mis clientes",
      "Mi sistema de reservaciones es lento",
      "Necesito mejorar mi marketing digital",
    ],
    interestOpts: [
      "Menus Digitales NFC",
      "Tarjetas de Presentacion Digitales",
      "Automatizacion con IA (Asistentes Virtuales)",
      "Programas de Lealtad",
      "Quiero el ecosistema completo",
    ],
    budgetOpts: ["$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Aun no lo se"],
    faqTopics: [
      { q: "¿Que es Conect-R?", a: "Conect-R es la infraestructura operativa que atrae, atiende y retiene a tus clientes — un ecosistema completo de hardware + software disenado para restaurantes y negocios de hospitalidad. Integra menus digitales, reservas, lista de espera, presencia digital, automatizacion con IA y mucho mas en una sola plataforma." },
      { q: "¿Que modulos incluye?", a: "El portafolio incluye: Premium Website, Chamba (back office), Table Reserve, NextUp (lista de espera), Smart Table NFC, Digital Signage, Modulo Creativo y Asesoria para Negocios. Cada uno resuelve una necesidad critica y todos comparten la misma base visual y operativa." },
      { q: "¿Cuanto cuesta?", a: "El presupuesto depende de cuantas ubicaciones y puntos de contacto necesitas digitalizar. Los rangos tipicos van desde $500 para implementaciones puntuales hasta $5,000+ para el ecosistema completo. Agenda una demo y te preparamos una propuesta a la medida." },
      { q: "¿Como se implementa?", a: "Te contactas con nosotros, agendamos una llamada de descubrimiento, preparamos una propuesta y arrancamos la implementacion. La mayoria de modulos quedan vivos en 1–3 semanas." },
      { q: "¿Mis datos estan seguros?", a: "Si. Conect-R tiene un compromiso firme de confidencialidad: protegemos los datos operativos del restaurante y la base de clientes. No vendemos ni distribuimos esa informacion a terceros." },
      { q: "¿Como los contacto?", a: `Por correo en ${CONTACT_EMAIL}, por telefono o WhatsApp al ${PHONE_DISPLAY}, o agenda una demo aqui mismo y te respondemos en menos de 24 horas.` },
    ],
    emailSubject: "Solicitud de demo — Conect-R",
    emailIntro: "Hola equipo Conect-R, me interesa agendar una demo. Estos son mis datos:",
    labels: {
      profile: "1. Perfil del Negocio",
      diagnosis: "2. Diagnostico de Necesidades",
      interest: "3. Interes en Conect-R",
      budgetSection: "4. Presupuesto y Decision",
      contact: "5. Contacto",
      businessName: "Nombre del negocio",
      businessType: "Giro",
      locations: "Numero de ubicaciones",
      website: "Sitio web / redes",
      challenge: "Reto tecnologico actual",
      currentTech: "Tecnologia actual",
      interestField: "Solucion de interes",
      touchpoints: "Puntos de contacto a digitalizar",
      budget: "Presupuesto estimado",
      attendees: "Participantes en la reunion",
      contactName: "Contacto y cargo",
      phone: "Telefono",
      email: "Correo",
    },
    reviewTitle: "Revisemos antes de enviar",
    reviewHint: "Toca cualquier campo para editar.",
  },
  en: {
    fab: "Assistant",
    title: "Conect-R Assistant",
    subtitle: "Online • Replies instantly",
    greet: "Hi, I'm Aria, your Conect-R virtual assistant. I can tell you about our ecosystem, answer your questions, and book your free demo. How can I help?",
    backToMenu: "Back to menu",
    optAsk: "I have questions about Conect-R",
    optBook: "I want to book a demo",
    optTalk: "Talk to a person",
    talk: `Happy to. You can reach us at ${CONTACT_EMAIL} or call / WhatsApp ${PHONE_DISPLAY}. I can also book your demo right here if you prefer.`,
    faqIntro: "Here are the most common topics. Tap one or type your question.",
    bookingIntro: "Perfect. I'll ask a few quick questions (under 2 minutes) and at the end I'll prepare your email to contact@conect-r.com ready to send.",
    nextStep: "Next",
    skip: "Skip",
    sendDraft: "Generate email draft",
    sendDraftHint: "Your email app will open prefilled to contact@conect-r.com",
    doneTitle: "Draft ready",
    doneBody: "We opened your email app with a pre-filled message to contact@conect-r.com. Just review and send. Our team replies in under 24 hours.",
    closeAfter: "Close",
    typeHere: "Type your message...",
    didntCatch: "Tell me more — or pick an option below.",
    required: "We'll need this to prepare your appointment.",
    steps: {
      businessName: { q: "To start, what's your business name?", ph: "e.g. Maya Cantina" },
      businessType: { q: "What type of business is it?", ph: "Restaurant, clinic, store, etc." },
      locations: { q: "How many locations do you have?", ph: "e.g. 1, 2, 5+" },
      website: { q: "What's your website or social media?", ph: "URL or @handle (optional)" },
      challenge: { q: "What's your biggest tech challenge today?", ph: "Tell me in your own words" },
      currentTech: { q: "What tech do you use today? (POS, website, ordering system)", ph: "e.g. Square POS, Wix site, WhatsApp orders" },
      interest: { q: "Which Conect-R solution interests you most?", ph: "Pick or write" },
      touchpoints: { q: "How many touchpoints do you need to digitize? (tables/counters)", ph: "e.g. 12 tables" },
      budget: { q: "Do you have an estimated budget for this investment?", ph: "Pick a range" },
      attendees: { q: "Who will join the meeting?", ph: "Names and roles (ideally the decision-maker)" },
      contactName: { q: "What's your name and role?", ph: "e.g. Ana Lopez, Manager" },
      phone: { q: "Direct phone number?", ph: "e.g. +1 555 123 4567" },
      email: { q: "Lastly, your email?", ph: "you@email.com" },
    },
    challengeOpts: [
      "My menus are out of date",
      "I have no customer database",
      "My reservation system is slow",
      "I need to improve my digital marketing",
    ],
    interestOpts: [
      "NFC Digital Menus",
      "Digital Business Cards",
      "AI Automation (Virtual Assistants)",
      "Loyalty Programs",
      "I want the full ecosystem",
    ],
    budgetOpts: ["$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"],
    faqTopics: [
      { q: "What is Conect-R?", a: "Conect-R is the operational infrastructure that attracts, serves, and retains your customers — a complete hardware + software ecosystem built for restaurants and hospitality. It bundles digital menus, reservations, waitlist, digital presence, AI automation, and more into one platform." },
      { q: "What modules are included?", a: "The portfolio includes: Premium Website, Chamba (back office), Table Reserve, NextUp (waitlist), Smart Table NFC, Digital Signage, Creative Module, and Business Consulting. Each solves a critical need and all share the same visual and operational backbone." },
      { q: "How much does it cost?", a: "Pricing depends on locations and touchpoints. Typical ranges go from $500 for one-off implementations to $5,000+ for the full ecosystem. Book a demo and we'll prepare a tailored proposal." },
      { q: "How is it implemented?", a: "You reach out, we run a discovery call, prepare a proposal, and start implementation. Most modules go live in 1–3 weeks." },
      { q: "Is my data safe?", a: "Yes. Conect-R is firmly committed to confidentiality: we protect operational and customer data. We don't sell or share that information with third parties." },
      { q: "How do I contact you?", a: `Email ${CONTACT_EMAIL}, call or WhatsApp ${PHONE_DISPLAY}, or book a demo right here — we reply in under 24 hours.` },
    ],
    emailSubject: "Demo request — Conect-R",
    emailIntro: "Hi Conect-R team, I'd like to book a demo. Here are my details:",
    labels: {
      profile: "1. Business Profile",
      diagnosis: "2. Needs Diagnosis",
      interest: "3. Interest in Conect-R",
      budgetSection: "4. Budget & Decision",
      contact: "5. Contact",
      businessName: "Business name",
      businessType: "Industry",
      locations: "Number of locations",
      website: "Website / social",
      challenge: "Current tech challenge",
      currentTech: "Current tech stack",
      interestField: "Solution of interest",
      touchpoints: "Touchpoints to digitize",
      budget: "Estimated budget",
      attendees: "Meeting attendees",
      contactName: "Contact and role",
      phone: "Phone",
      email: "Email",
    },
    reviewTitle: "Let's review before sending",
    reviewHint: "Tap any field to edit.",
  },
} as const;

/* ───────────── Booking flow steps order ───────────── */

const STEP_ORDER: (keyof BookingForm)[] = [
  "businessName", "businessType", "locations", "website",
  "challenge", "currentTech",
  "interest", "touchpoints",
  "budget", "attendees",
  "contactName", "phone", "email",
];

const REQUIRED: Partial<Record<keyof BookingForm, true>> = {
  businessName: true,
  businessType: true,
  contactName: true,
  phone: true,
  email: true,
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function buildEmail(lang: Lang, b: BookingForm) {
  const t = STR[lang];
  const L = t.labels;
  const lines = [
    t.emailIntro,
    "",
    L.profile,
    `• ${L.businessName}: ${b.businessName || "—"}`,
    `• ${L.businessType}: ${b.businessType || "—"}`,
    `• ${L.locations}: ${b.locations || "—"}`,
    `• ${L.website}: ${b.website || "—"}`,
    "",
    L.diagnosis,
    `• ${L.challenge}: ${b.challenge || "—"}`,
    `• ${L.currentTech}: ${b.currentTech || "—"}`,
    "",
    L.interest,
    `• ${L.interestField}: ${b.interest || "—"}`,
    `• ${L.touchpoints}: ${b.touchpoints || "—"}`,
    "",
    L.budgetSection,
    `• ${L.budget}: ${b.budget || "—"}`,
    `• ${L.attendees}: ${b.attendees || "—"}`,
    "",
    L.contact,
    `• ${L.contactName}: ${b.contactName || "—"} ${b.contactRole ? `(${b.contactRole})` : ""}`,
    `• ${L.phone}: ${b.phone || "—"}`,
    `• ${L.email}: ${b.email || "—"}`,
  ];
  return lines.join("\n");
}

function buildMailto(lang: Lang, b: BookingForm) {
  const t = STR[lang];
  const subject = encodeURIComponent(t.emailSubject);
  const body = encodeURIComponent(buildEmail(lang, b));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

/* ───────────── Component ───────────── */

export default function AssistantWidget() {
  const { lang } = useLang();
  const t = STR[lang];

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingForm>(EMPTY_BOOKING);
  const [errorKey, setErrorKey] = useState<keyof BookingForm | null>(null);
  const [thinking, setThinking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const aiHistoryRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const apiBase = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Reset greeting when language changes (or first open)
  useEffect(() => {
    setMessages([{ id: uid(), from: "bot", text: t.greet }]);
    setMode("menu");
    setStep(0);
    setErrorKey(null);
    aiHistoryRef.current = [{ role: "assistant", content: t.greet }];
  }, [lang, t.greet]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, mode, step, open]);

  const pushBot = (text: string) =>
    setMessages((m) => [...m, { id: uid(), from: "bot", text }]);
  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: uid(), from: "user", text }]);

  const goMenu = () => {
    setMode("menu");
    setStep(0);
    setErrorKey(null);
  };

  const startBooking = () => {
    pushUser(t.optBook);
    pushBot(t.bookingIntro);
    pushBot(t.steps.businessName.q);
    setBooking(EMPTY_BOOKING);
    setStep(0);
    setMode("booking");
    setInput("");
  };

  const startFaq = () => {
    pushUser(t.optAsk);
    aiHistoryRef.current.push({ role: "user", content: t.optAsk });
    pushBot(t.faqIntro);
    aiHistoryRef.current.push({ role: "assistant", content: t.faqIntro });
    setMode("faq");
  };

  const startTalk = () => {
    pushUser(t.optTalk);
    pushBot(t.talk);
    aiHistoryRef.current.push(
      { role: "user", content: t.optTalk },
      { role: "assistant", content: t.talk },
    );
  };

  const askAI = async (userText: string) => {
    pushUser(userText);
    aiHistoryRef.current.push({ role: "user", content: userText });
    setInput("");
    setThinking(true);
    try {
      const res = await fetch(`${apiBase}/api/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: aiHistoryRef.current.slice(-16),
          lang,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reply?: string };
      const reply =
        (data.reply && data.reply.trim()) ||
        (lang === "es"
          ? "Disculpa, tuve un problema. ¿Puedes intentarlo de nuevo?"
          : "Sorry, I hit a snag. Could you try again?");
      pushBot(reply);
      aiHistoryRef.current.push({ role: "assistant", content: reply });
    } catch {
      const fallback =
        lang === "es"
          ? `Tuve un problema de conexion. Mientras tanto, escribenos a ${CONTACT_EMAIL} o llama al ${PHONE_DISPLAY}.`
          : `I had a connection issue. In the meantime, email ${CONTACT_EMAIL} or call ${PHONE_DISPLAY}.`;
      pushBot(fallback);
    } finally {
      setThinking(false);
    }
  };

  const onFaqPick = (q: string) => {
    void askAI(q);
  };

  const advanceBooking = (rawValue: string) => {
    const key = STEP_ORDER[step];
    const value = rawValue.trim();

    if (REQUIRED[key] && !value) {
      setErrorKey(key);
      return;
    }
    setErrorKey(null);

    setBooking((b) => ({ ...b, [key]: value }));
    pushUser(value || "—");

    const nextIdx = step + 1;
    if (nextIdx >= STEP_ORDER.length) {
      // Move to review
      setMode("review");
      pushBot(t.reviewTitle);
      setInput("");
      return;
    }

    const nextKey = STEP_ORDER[nextIdx];
    pushBot(t.steps[nextKey as keyof typeof t.steps].q);
    setStep(nextIdx);
    setInput("");
  };

  const handleSend = () => {
    if (mode === "booking") {
      advanceBooking(input);
      return;
    }
    if (mode === "faq") {
      const q = input.trim();
      if (!q || thinking) return;
      void askAI(q);
      return;
    }
    setInput("");
  };

  const handleSubmitDraft = () => {
    const url = buildMailto(lang, booking);
    window.location.href = url;
    setMode("done");
    pushBot(t.doneBody);
  };

  const currentStepKey = STEP_ORDER[step] as keyof typeof t.steps;
  const currentStepDef = mode === "booking" ? t.steps[currentStepKey] : null;

  /* Render quick-reply chips for current step */
  const stepChips = useMemo(() => {
    if (mode !== "booking") return null;
    const k = STEP_ORDER[step];
    if (k === "challenge") return t.challengeOpts;
    if (k === "interest") return t.interestOpts;
    if (k === "budget") return t.budgetOpts;
    return null;
  }, [mode, step, t]);

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
            aria-label={t.title}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="w-9 h-9 rounded-full bg-white/20 inline-flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold leading-tight truncate">{t.title}</div>
                <div className="text-[11px] opacity-90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                  {t.subtitle}
                </div>
              </div>
              {mode !== "menu" && mode !== "done" && (
                <button
                  onClick={goMenu}
                  aria-label={t.backToMenu}
                  className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg hover:bg-white/15 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-muted/30">
              {messages.map((m) => (
                <MessageBubble key={m.id} from={m.from} text={m.text} />
              ))}

              {/* Quick replies for menu */}
              {mode === "menu" && (
                <div className="flex flex-col gap-2 pt-1">
                  <ChipButton primary onClick={startBooking}>{t.optBook}</ChipButton>
                  <ChipButton onClick={startFaq}>{t.optAsk}</ChipButton>
                  <ChipButton onClick={startTalk}>{t.optTalk}</ChipButton>
                </div>
              )}

              {/* FAQ topics — conversation starters fed to the AI */}
              {mode === "faq" && messages.length <= 4 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.faqTopics.map((f) => (
                    <ChipButton key={f.q} small onClick={() => onFaqPick(f.q)}>
                      {f.q}
                    </ChipButton>
                  ))}
                  <ChipButton small onClick={startBooking}>{t.optBook}</ChipButton>
                </div>
              )}

              {/* Typing indicator */}
              {thinking && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  </div>
                </div>
              )}

              {/* Booking step chips */}
              {mode === "booking" && stepChips && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {stepChips.map((opt) => (
                    <ChipButton key={opt} small onClick={() => advanceBooking(opt)}>
                      {opt}
                    </ChipButton>
                  ))}
                </div>
              )}

              {/* Review */}
              {mode === "review" && (
                <ReviewCard lang={lang} booking={booking} onChange={setBooking} onSend={handleSubmitDraft} />
              )}

              {/* Done */}
              {mode === "done" && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-foreground space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={16} /> {t.doneTitle}
                  </div>
                  <a
                    href={buildMailto(lang, booking)}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-semibold"
                  >
                    <Mail size={14} /> {t.sendDraft}
                  </a>
                </div>
              )}
            </div>

            {/* Input */}
            {(mode === "booking" || mode === "faq") && (
              <div className="border-t border-border bg-background px-3 py-2.5">
                {mode === "booking" && currentStepDef && (
                  <div className="text-[11px] text-muted-foreground mb-1.5 px-1">
                    {currentStepDef.ph}
                    {errorKey === STEP_ORDER[step] && (
                      <span className="text-orange-500 ml-2">• {t.required}</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={mode === "booking" ? currentStepDef?.ph : t.typeHere}
                    type={mode === "booking" && STEP_ORDER[step] === "email" ? "email" : "text"}
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                    autoFocus
                  />
                  <button
                    onClick={handleSend}
                    aria-label="Send"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white shrink-0"
                  >
                    {mode === "booking" ? <Send size={15} /> : <Send size={15} />}
                  </button>
                </div>
                {mode === "booking" && !REQUIRED[STEP_ORDER[step]] && (
                  <button
                    onClick={() => advanceBooking("")}
                    className="text-[11px] text-muted-foreground hover:text-foreground mt-1.5 px-1"
                  >
                    {t.skip} →
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Subcomponents ───────────── */

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

function ChipButton({
  children,
  onClick,
  primary,
  small,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  small?: boolean;
}) {
  const base = small ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";
  const style = primary
    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
    : "bg-background hover:bg-muted text-foreground border-border";
  return (
    <button
      onClick={onClick}
      className={`${base} ${style} font-medium rounded-full border transition-colors text-left`}
    >
      {children}
    </button>
  );
}

function ReviewCard({
  lang,
  booking,
  onChange,
  onSend,
}: {
  lang: Lang;
  booking: BookingForm;
  onChange: (b: BookingForm) => void;
  onSend: () => void;
}) {
  const t = STR[lang];
  const L = t.labels;

  const fields: { key: keyof BookingForm; label: string }[] = [
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
    { key: "phone", label: L.phone },
    { key: "email", label: L.email },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-3 space-y-2">
      <div className="text-[11px] text-muted-foreground px-1">{t.reviewHint}</div>
      <div className="space-y-1.5">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.label}</span>
            <input
              value={booking[f.key]}
              onChange={(e) => onChange({ ...booking, [f.key]: e.target.value })}
              className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </label>
        ))}
      </div>
      <button
        onClick={onSend}
        className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg text-sm font-semibold mt-2"
      >
        <Mail size={14} /> {t.sendDraft}
      </button>
      <div className="text-[10px] text-muted-foreground text-center">{t.sendDraftHint}</div>
    </div>
  );
}
