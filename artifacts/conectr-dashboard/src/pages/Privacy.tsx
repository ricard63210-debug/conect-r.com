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

export default function Privacy() {
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
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
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
                  CONECT-R LLC, ubicada en 1518 D Street, Sacramento CA 95814, respeta tu privacidad. Esta Política de Privacidad detalla cómo recopilamos, usamos y protegemos tus datos personales al usar nuestros servicios tecnológicos para restaurantes, incluyendo Nextup (lista de espera digital), TableReserve (reservaciones) y CONECT-R Station (sistema de punto de venta/POS).
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  2. Información que Recopilamos (Information We Collect)
                </h2>
                <p>
                  Recopilamos datos personales básicos como tu nombre, número de teléfono celular e información de pago cuando interactúas y haces uso de nuestros servicios.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  3. Cómo Utilizamos tu Información (How We Use Your Information)
                </h2>
                <p>
                  Utilizamos la información recopilada de manera exclusiva para proveer los servicios que has solicitado. Esto incluye el envío de notificaciones automáticas y transaccionales vía SMS relacionadas con el estado de tu turno en la lista de espera, disponibilidad de tu mesa, confirmaciones de tus reservas y avisos de actualización sobre tus pedidos en restaurantes.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  4. Comunicaciones SMS (SMS Communications)
                </h2>
                <p>
                  Los clientes otorgan su consentimiento explícito para recibir alertas de mensajería SMS mediante una casilla de verificación obligatoria en conect-r.com. No vendemos, alquilamos ni compartimos tus números telefónicos con terceros o afiliados con fines promocionales o de marketing. Pueden aplicarse cargos por mensajes y datos. Responde <strong>STOP</strong> para darte de baja en cualquier momento.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  5. Seguridad de Datos (Data Security)
                </h2>
                <p>
                  Utilizamos medidas de seguridad físicas, técnicas y administrativas estándar en la industria para proteger tu información personal contra pérdidas, robo, accesos no autorizados, modificaciones o divulgación indebida.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  6. Servicios de Terceros (Third Party Services)
                </h2>
                <p>
                  Para garantizar la calidad de la entrega de nuestros servicios, nos apoyamos en plataformas líderes de la industria:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Twilio:</strong> Utilizado como nuestro canal seguro para la distribución y entrega técnica de alertas por SMS.</li>
                  <li><strong>Stripe:</strong> Utilizado para procesar de forma segura todas las transacciones de pago, garantizando el cumplimiento de las normativas de seguridad financiera.</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  7. Contáctanos (Contact Us)
                </h2>
                <p>
                  Si tienes alguna consulta o requieres asistencia adicional sobre esta Política de Privacidad, por favor ponte en contacto con nosotros:
                </p>
                <p className="font-semibold text-foreground">
                  CONECT-R LLC<br />
                  Correo electrónico: <a href="mailto:contact@conect-r.com" className="text-orange-500 hover:underline">contact@conect-r.com</a><br />
                  Dirección postal: 1518 D Street, Sacramento CA 95814
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  1. Overview
                </h2>
                <p>
                  CONECT-R LLC, located at 1518 D Street, Sacramento CA 95814, respects your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when using our restaurant technology services, including Nextup (digital waitlist), TableReserve (reservations), and CONECT-R Station (POS system).
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  2. Information We Collect
                </h2>
                <p>
                  We collect your name, phone number, and payment information when you request or use our services.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  3. How We Use Your Information
                </h2>
                <p>
                  We use the information we collect exclusively to provide the requested services. This includes sending you transactional SMS notifications regarding waitlist status, table availability, reservation confirmations, and order updates.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  4. SMS Communications
                </h2>
                <p>
                  Customers opt in to receive text messages via a mandatory checkbox on conect-r.com. We do not sell or share your phone number with third parties or affiliates for marketing or promotional purposes. Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  5. Data Security
                </h2>
                <p>
                  We employ industry-standard administrative, physical, and technical security measures to safeguard your personal data against unauthorized access, loss, alteration, or disclosure.
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  6. Third Party Services
                </h2>
                <p>
                  To deliver our services reliably, we integrate with industry-leading third-party platforms:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Twilio:</strong> Used as our communication gateway for secure SMS notifications.</li>
                  <li><strong>Stripe:</strong> Used for secure credit card processing in compliance with payment industry standards.</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4">
                  7. Contact Us
                </h2>
                <p>
                  If you have any questions or feedback regarding this Privacy Policy, please contact us at:
                </p>
                <p className="font-semibold text-foreground">
                  CONECT-R LLC<br />
                  Email: <a href="mailto:contact@conect-r.com" className="text-orange-500 hover:underline">contact@conect-r.com</a><br />
                  Mail: 1518 D Street, Sacramento CA 95814
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
            <a href="https://nextup.conect-r.com/privacy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </a>
            <span className="text-muted-foreground/30 hidden sm:inline">|</span>
            <a href="https://nextup.conect-r.com/terms" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
            </a>
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
