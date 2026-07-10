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
            {lang === "es" ? "Términos y Condiciones" : "Terms and Conditions"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {lang === "es" ? "Última actualización: Julio de 2026" : "Last Updated: July 2026"}
          </p>

          <div className="prose prose-orange max-w-none text-muted-foreground space-y-6 text-sm sm:text-base leading-relaxed">
            {lang === "es" ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  1. Descripción General (Overview)
                </h2>
                <p>
                  CONECT-R LLC, ubicada en Sacramento, CA, proporciona servicios de tecnología para restaurantes. Estos servicios incluyen Nextup (lista de espera digital), TableReserve (reservaciones) y CONECT-R Station (sistema de punto de venta).
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  2. Uso del Servicio (Use of Service)
                </h2>
                <p>
                  Al utilizar cualquiera de nuestros productos y servicios (Nextup, TableReserve y CONECT-R Station), aceptas cumplir con estos Términos y Condiciones. Te comprometes a usar los servicios únicamente para fines autorizados y de acuerdo con todas las leyes federales, estatales y locales aplicables.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  3. Comunicaciones SMS y Registro (SMS Communications and Opt-In)
                </h2>
                <p>
                  CONECT-R LLC se comunica contigo a través de mensajes de texto (SMS) para mejorar tu experiencia. Los clientes otorgan su consentimiento para recibir notificaciones automáticas por SMS de CONECT-R y sus servicios (Nextup, TableReserve, CONECT-R Station) mediante una casilla de verificación obligatoria en conect-r.com antes de realizar cualquier acción de contacto.
                </p>
                <p>
                  El consentimiento para recibir mensajes SMS no es una condición obligatoria de compra para adquirir bienes o servicios. Pueden aplicarse tarifas de mensajes y datos. Responde <strong>STOP</strong> para optar por no recibir más mensajes, o <strong>HELP</strong> para obtener ayuda.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  4. Privacidad (Privacy)
                </h2>
                <p>
                  Valoramos la seguridad y protección de tus datos personales. Consulta los detalles de cómo recopilamos, usamos y resguardamos tu información en nuestra Política de Privacidad disponible en:{" "}
                  <a href="https://conect-r.com/privacy" className="text-orange-500 hover:underline">
                    conect-r.com/privacy
                  </a>.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  5. Cancelación de Suscripción (Opting Out)
                </h2>
                <p>
                  Puedes darte de baja de las notificaciones SMS en cualquier momento enviando la palabra <strong>STOP</strong> al número que te envió el mensaje. Tras enviar <strong>STOP</strong>, recibirás un mensaje de confirmación de tu exclusión. Si en el futuro deseas reactivar las alertas, puedes enviar la palabra <strong>START</strong> al mismo número.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  6. Contacto (Contact)
                </h2>
                <p>
                  Si tienes alguna pregunta o inquietud respecto a estos Términos y Condiciones, por favor contáctanos en:{" "}
                  <a href="mailto:contact@conect-r.com" className="text-orange-500 hover:underline">
                    contact@conect-r.com
                  </a>.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  1. Overview
                </h2>
                <p>
                  CONECT-R LLC, located in Sacramento, CA, provides restaurant technology services. These services include Nextup (digital waitlist), TableReserve (reservations), and CONECT-R Station (POS system).
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  2. Use of Service
                </h2>
                <p>
                  By utilizing any of our products and services (Nextup, TableReserve, and CONECT-R Station), you agree to be bound by these Terms and Conditions. You agree to use the services solely for authorized purposes and in compliance with all applicable federal, state, and local laws.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  3. SMS Communications and Opt-In
                </h2>
                <p>
                  CONECT-R LLC communicates with you via text messaging (SMS) to enhance your experience. Customers consent to receive automated SMS notifications from CONECT-R and its services (Nextup, TableReserve, CONECT-R Station) via a mandatory checkbox on conect-r.com before any contact action.
                </p>
                <p>
                  Consent is not a condition of purchase. Message & data rates may apply. Reply <strong>STOP</strong> to opt out of future messages, or <strong>HELP</strong> for help.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  4. Privacy
                </h2>
                <p>
                  We prioritize your data privacy. Please review our Privacy Policy to understand how we collect, use, and safeguard your personal information at:{" "}
                  <a href="https://conect-r.com/privacy" className="text-orange-500 hover:underline">
                    conect-r.com/privacy
                  </a>.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  5. Opting Out
                </h2>
                <p>
                  You can opt out of SMS notifications at any time by replying <strong>STOP</strong> to the shortcode or sending number. After texting <strong>STOP</strong>, you will receive a single confirmation message of your unsubscription. To resubscribe, you can text <strong>START</strong> to the same number.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  6. Contact
                </h2>
                <p>
                  If you have any questions or feedback regarding these Terms and Conditions, please reach out to us at:{" "}
                  <a href="mailto:contact@conect-r.com" className="text-orange-500 hover:underline">
                    contact@conect-r.com
                  </a>.
                </p>
              </>
            )}
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
