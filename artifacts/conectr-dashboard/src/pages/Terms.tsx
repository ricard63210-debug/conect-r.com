import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Sun, Moon, Languages, ArrowUpRight, ArrowLeft, MapPin
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

function Wordmark() {
  return (
    <img
      src={conectrLogo}
      alt="Conect-R"
      className="h-24 sm:h-32 w-auto object-contain select-none"
      draggable={false}
    />
  );
}

export default function Terms() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const T = getT(lang);
  const L = T.landing;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <Wordmark />
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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
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
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Terms and Conditions for Nextup
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {lang === "es" ? "Última actualización: 11 de mayo de 2026" : "Last Updated: May 11, 2026"}
          </p>

          <div className="prose prose-orange max-w-none text-muted-foreground space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              By using the Nextup digital waitlist application (operated by Conect-R), you agree to the following terms and conditions.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
              Use of Service
            </h2>
            <p>
              Nextup provides a digital queue and notification system for restaurant guests. By providing your phone number to the host or entering it via our digital forms, you are opting in to use this service and receive communications related to your table status.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
              SMS Communications and Opt-In
            </h2>
            <p>
              By opting into the Nextup waitlist, you consent to receive automated transactional text messages regarding your waitlist status. Consent is not a condition of purchase.
            </p>
            <p className="font-semibold text-foreground">
              Message and data rates may apply.
            </p>
            <p>
              Message frequency varies based on your waitlist status and interaction with the host stand.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
              Opting Out and Getting Help
            </h2>
            <p>
              You can cancel the SMS service at any time. Just text "STOP" to the shortcode or phone number that sent you the message. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us for that specific waitlist session.
            </p>
            <p>
              If you are experiencing issues with the messaging program you can reply with the keyword "HELP" for more assistance, or you can get help directly at{" "}
              <a href="mailto:contact@conect-r.com" className="text-orange-500 hover:underline">
                contact@conect-r.com
              </a>.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
              Carriers
            </h2>
            <p>
              Carriers are not liable for delayed or undelivered messages.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p>
              Nextup and Conect-R are not responsible for any indirect, incidental, or consequential damages arising from the use of our waitlist service or SMS notifications.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div>
              <ul className="space-y-2.5">
                {L.footer.productLinks.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-foreground/50 mb-4">
                {lang === "es" ? "CONTACTO" : "CONTACT"}
              </div>
              <a
                href="mailto:contact@conect-r.com"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors block mb-2"
              >
                contact@conect-r.com
              </a>
              <a
                href={`sms:+${PHONE_DIGITS}`}
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors block mb-2"
              >
                {lang === "es" ? "Enviar texto" : "Text"} · {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${PHONE_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors block"
              >
                WhatsApp · {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-xs text-muted-foreground">
            {L.footer.copy}
          </div>
        </div>
      </footer>
    </div>
  );
}
