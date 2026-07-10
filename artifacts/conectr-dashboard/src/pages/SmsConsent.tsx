import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Languages, ArrowUpRight, ArrowLeft, Check, CheckCircle2
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import conectrLogo from "@/assets/conectr-logo.png";

const PHONE_DIGITS = "19168120873";
const PHONE_DISPLAY = "+1 916 812 0873";

const DEMO_GREETING = {
  es: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
  en: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
} as const;

function openDemoChat(lang: "es" | "en") {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: { greeting: DEMO_GREETING[lang], lang },
    }),
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("conectr-theme", theme); } catch {}
  }, [theme]);
  return { theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") };
}

export default function SmsConsent() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const T = getT(lang);
  const L = T.landing;

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checked) return;
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <img src={conectrLogo} alt="Conect-R" className="h-20 sm:h-32 md:h-44 w-auto object-contain select-none" draggable={false} />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex w-9 h-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-muted transition-colors"
            >
              <Languages size={13} />
              {T.global.langBtn}
            </button>
            <button
              onClick={() => openDemoChat(lang)}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
            >
              <span className="hidden sm:inline">{L.nav.scheduleDemo}</span>
              <span className="sm:hidden">Demo</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to Home"}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-12 shadow-xl"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            SMS Consent & Communication Policy
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            CONECT-R and its services communicate with you via SMS to enhance your experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Services Explanation */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground uppercase tracking-wider text-orange-500">
                {lang === "es" ? "Servicios que envían SMS" : "Services that send SMS"}
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">Nextup</span>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {lang === "es" ? "Notificaciones de estado de lista de espera y preparación de mesa." : "waitlist status and table readiness notifications"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">TableReserve</span>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {lang === "es" ? "Confirmaciones de reserva y recordatorios." : "reservation confirmations and reminders"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">CONECT-R Station</span>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                      {lang === "es" ? "Actualizaciones de pedidos y notificaciones del servicio." : "order updates and service notifications"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Box */}
            <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="sms-consent-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-bold text-base text-foreground mb-1">
                      {lang === "es" ? "Formulario de Consentimiento" : "Consent Form"}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "es" ? "Nombre" : "First Name"}
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {lang === "es" ? "Apellido" : "Last Name"}
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {lang === "es" ? "Número de Teléfono" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 mt-2 bg-background/50 p-3 rounded-xl border border-border/40">
                      <input
                        type="checkbox"
                        id="sms-consent-checkbox"
                        required
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-orange-500 focus:ring-orange-500 cursor-pointer"
                      />
                      <label htmlFor="sms-consent-checkbox" className="text-[10px] sm:text-xs leading-normal text-muted-foreground select-none cursor-pointer">
                        By providing your phone number and checking this box, I agree to receive automated SMS notifications from CONECT-R and its services (Nextup, TableReserve, CONECT-R Station). Msg & data rates may apply. Reply STOP to opt out at any time.
                      </label>
                    </div>

                    <div className="text-[10px] text-muted-foreground pt-1 flex justify-center gap-1.5">
                      <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
                      <span>|</span>
                      <Link href="/terms" className="underline hover:text-foreground">Terms & Conditions</Link>
                    </div>

                    <button
                      type="submit"
                      disabled={!checked || loading}
                      className="w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-[0.98] transition-all mt-2"
                    >
                      {loading ? (lang === "es" ? "Enviando..." : "Submitting...") : (lang === "es" ? "Enviar Consentimiento" : "Submit Consent")}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sms-consent-success"
                    className="text-center py-8 space-y-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="inline-flex w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25 items-center justify-center text-green-500 mx-auto">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-extrabold text-lg text-foreground mt-2">
                      {lang === "es" ? "Consentimiento Recibido" : "Consent Received"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang === "es"
                        ? "¡Muchas gracias! Tu consentimiento para recibir notificaciones por SMS ha sido registrado exitosamente."
                        : "Thank you! Your consent to receive SMS notifications has been successfully recorded."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 mt-auto py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </Link>
            <span className="text-muted-foreground/30 hidden sm:inline">|</span>
            <Link href="/terms" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
            </Link>
            <span className="text-muted-foreground/30 hidden sm:inline">|</span>
            <Link href="/sms-consent" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              {lang === "es" ? "Consentimiento SMS" : "SMS Consent"}
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {lang === "es" 
              ? `© ${new Date().getFullYear()} Conect-R. Sacramento, CA. Todos los derechos reservados.`
              : `© ${new Date().getFullYear()} Conect-R. Sacramento, CA. All rights reserved.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
