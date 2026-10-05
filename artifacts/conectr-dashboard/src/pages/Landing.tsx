import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Check, Sun, Moon, Languages,
  Globe, Smartphone, Monitor,
  Eye, Target,
  Sparkles, MessageCircle, Mail,
  TrendingUp, BarChart3, Lightbulb, DollarSign,
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

function openDemoChat(lang: "es" | "en", userMessage?: string) {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: { greeting: DEMO_GREETING[lang], lang, userMessage },
    }),
  );
}

/* ───────────── Custom Brand Icons (orange) ───────────── */

function ChefHatIcon({ size = 18 }: { size?: number }) {
  // Chamba — Chef hat estilo "cloud" con band y swoosh (replica IMG_3612 en naranja)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Top: tres lóbulos puffy formando una nube */}
      <path d="M18 32
               c-5 0 -9 -4 -9 -9
               c0 -5.5 4.5 -10 10 -10
               c1.2 0 2.3 .2 3.3 .5
               c1.5 -4.5 6 -7.5 11.7 -7.5
               c5.7 0 10.2 3 11.7 7.5
               c1 -.3 2.1 -.5 3.3 -.5
               c5.5 0 10 4.5 10 10
               c0 5 -4 9 -9 9 Z" />
      {/* Band rectangular debajo del top */}
      <path d="M19 32 L19 44 L45 44 L45 32" />
      {/* Swoosh/tail saliendo de la esquina inferior-derecha */}
      <path d="M40 44 c4 6 9 8 14 6" strokeWidth="3.5" />
    </svg>
  );
}

function ForkKnifeIcon({ size = 18 }: { size?: number }) {
  // Table Reserve — Cuchillo + Tenedor cruzados en X (replica IMG_3614 en naranja)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* TENEDOR — rotado +45° (mango abajo-izquierda, púas arriba-derecha) */}
      <g transform="rotate(45 32 32)">
        <path d="M22 8 L22 18 Q22 22 26 22" />
        <path d="M28 8 L28 18" />
        <path d="M34 8 L34 18 Q34 22 30 22" />
        <path d="M28 22 L28 56" />
      </g>
      {/* CUCHILLO — rotado -45° (hoja arriba-derecha, mango abajo-izquierda) */}
      <g transform="rotate(-45 32 32)">
        <path d="M28 8 Q24 12 24 22 Q24 32 32 34 Q40 32 40 22 Q40 12 36 8 Z" />
        <path d="M32 34 L32 56" />
      </g>
    </svg>
  );
}

function NextUpIcon({ size = 18 }: { size?: number }) {
  // NextUp — N estilizada con flecha hacia arriba (recoloreada en naranja)
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 50 V18 L40 44 V18" />
      <path d="M40 18 L52 6" />
      <path d="M44 6 H52 V14" />
    </svg>
  );
}

const MODULE_ICONS: Array<React.ComponentType<{ size?: number; strokeWidth?: number }>> = [
  Globe,           // Premium Website
  ChefHatIcon,     // Chamba
  ForkKnifeIcon,   // Table Reserve
  NextUpIcon,      // NextUp
  Smartphone,      // NFC Stands
  Monitor,         // TV Menu Boards
];

/* ───────────── Theme ───────────── */

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

/* ───────────── Wordmark — "Conect-" + R con ondas wifi en naranja ───────────── */

function Wordmark({ size = "base", isScrolled = false }: { size?: "base" | "lg"; isScrolled?: boolean }) {
  if (size === "lg") {
    return (
      <img
        src={conectrLogo}
        alt="Conect-R"
        className="h-[448px] sm:h-[640px] md:h-[896px] w-auto object-contain select-none"
        draggable={false}
      />
    );
  }
  const cls = isScrolled
    ? "h-40 sm:h-48 w-auto object-contain select-none transition-all duration-300"
    : "h-48 sm:h-64 w-auto object-contain select-none transition-all duration-300";
  return (
    <img
      src={conectrLogo}
      alt="Conect-R"
      className={cls}
      draggable={false}
    />
  );
}

/* ───────────── Page ───────────── */

export default function Landing() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const T = getT(lang);
  const L = T.landing;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-background/60 backdrop-blur-md border-b border-border/40 shadow-sm shadow-black/5" 
          : "py-4 bg-transparent"
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          <a href={import.meta.env.BASE_URL} className="flex items-center shrink-0">
            <Wordmark isScrolled={isScrolled} />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex w-9 h-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-95"
            >
              {theme === "dark" ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/50 text-foreground text-xs font-bold hover:bg-muted/50 transition-all active:scale-95"
            >
              <Languages size={13} strokeWidth={2.5} />
              {T.global.langBtn}
            </button>
            <button
              onClick={() => openDemoChat(lang, lang === "es" ? "Me gustaría agendar una demo" : "I would like to book a demo")}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-95 active:shadow-inner"
            >
              <span className="hidden sm:inline">{L.nav.scheduleDemo}</span>
              <span className="sm:hidden">Demo</span>
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              {L.hero.pill}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif italic font-medium tracking-tight leading-[0.9] mb-8"
          >
            {L.hero.title1}<br />
            <span className="text-gradient font-sans not-italic font-black block mt-2 sm:mt-4 pb-3 pt-1 leading-normal">{L.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
          >
            {L.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openDemoChat(lang, lang === "es" ? "Me gustaría agendar una demo" : "I would like to book a demo")}
              className="group relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10">{L.hero.ctaPrimary}</span>
              <ArrowRight size={18} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollTo("ecosystem")}
              className="inline-flex items-center gap-3 glass-panel text-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:bg-muted/50 active:scale-95"
            >
              {L.hero.ctaSecondary}
              <ArrowRight size={18} strokeWidth={2.5} className="rotate-90 opacity-40" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ABOUT — Executive Summary + Vision/Mission */}
      <section id="about" className="relative border-t border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {L.about.pill}
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif italic mb-8">
              {L.about.title1}<br />
              <span className="text-gradient font-sans not-italic font-black block mt-2 pb-3 pt-1 leading-normal">{L.about.title2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              {L.about.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="maya-card glass-panel rounded-3xl p-8 group"
            >
              <div className="text-xs font-black tracking-[0.2em] text-orange-500/60 mb-3 uppercase">{L.about.vision.label}</div>
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">{L.about.vision.body}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="maya-card glass-panel rounded-3xl p-8 group"
            >
              <div className="text-xs font-black tracking-[0.2em] text-orange-500/60 mb-3 uppercase">{L.about.mission.label}</div>
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">{L.about.mission.body}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM — Application Portfolio */}
      <section id="ecosystem" className="relative border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-40">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {L.ecosystem.pill}
              </div>
            </div>
            <h2 className="text-4xl sm:text-7xl font-serif italic mb-8">
              {L.ecosystem.title1}<br />
              <span className="text-gradient font-sans not-italic font-black block mt-2">{L.ecosystem.title2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              {L.ecosystem.body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {L.appPortfolio.map((mod, i) => {
              const cardPaths = [
                "/premium-website",
                "/chamba",
                "/table-reserve",
                "/nextup",
                "/conectr-station",
                "/tv-menu-boards",
                "/chop-chop"
              ];
              const path = cardPaths[i] || "/";
              const cardClasses = "maya-card group block h-full text-left w-full rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-sm p-8 hover:border-orange-500/30 hover:bg-orange-500/[0.02] transition-all cursor-pointer relative overflow-hidden";
              
              return (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <Link href={path} className={cardClasses}>
                    <div className="relative z-10">
                      <div className="font-bold text-foreground text-2xl mb-2 flex items-center gap-2">
                        {mod.name}
                        <ArrowUpRight size={18} strokeWidth={2.5} className="text-orange-500 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                      <div className="text-[10px] font-black tracking-[0.25em] text-orange-500/80 mb-4 uppercase">
                        {mod.tagline}
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-light tracking-wide">{mod.body}</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-border bg-muted/30 overflow-hidden">
        {/* Background Mesh for Final CTA */}
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-32 sm:py-48 text-center">
          <h2 className="text-5xl sm:text-8xl font-serif italic mb-10 leading-[0.85]">
            {L.finalCta.title}
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 font-light tracking-wide">
            {L.finalCta.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("conectr:open-consent", { detail: { type: "whatsapp" } }));
              }}
              className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle size={22} strokeWidth={2.5} />
              {L.finalCta.whatsapp}
              <ArrowRight size={22} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("conectr:open-consent", { detail: { type: "email" } }));
              }}
              className="inline-flex items-center gap-3 glass-panel text-foreground px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all hover:bg-muted/50 active:scale-95 cursor-pointer"
            >
              <Mail size={22} strokeWidth={2.5} />
              {L.finalCta.email}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
