import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Check, MapPin, Sun, Moon, Languages,
  Globe, Smartphone, Monitor, HeartHandshake,
  Eye, Target, Shield, Lock, FileText, AlertTriangle,
  Zap, Megaphone, Layers, Award, Sparkles, MessageCircle, Mail,
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
  HeartHandshake,  // Asesoria para Negocios
];
const EXPANSION_ICONS = [Zap, Megaphone, Layers, Award];
const LEGAL_ICONS = [FileText, Lock, Shield, AlertTriangle];

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-500 text-[11px] sm:text-xs font-bold tracking-[0.12em]">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
      {children}
    </div>
  );
}

/* ───────────── Wordmark — "Conect-" + R con ondas wifi en naranja ───────────── */

function Wordmark({ size = "base", isScrolled = false }: { size?: "base" | "lg"; isScrolled?: boolean }) {
  if (size === "lg") {
    return (
      <img
        src={conectrLogo}
        alt="Conect-R"
        className="h-28 sm:h-40 md:h-56 w-auto object-contain select-none"
        draggable={false}
      />
    );
  }
  const cls = isScrolled
    ? "h-10 sm:h-12 w-auto object-contain select-none transition-all duration-300"
    : "h-12 sm:h-16 w-auto object-contain select-none transition-all duration-300";
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
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                <Eye size={24} strokeWidth={1.5} />
              </div>
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
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                <Target size={24} strokeWidth={1.5} />
              </div>
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
              const Icon = MODULE_ICONS[i] || Globe;
              const cardPaths = [
                "/premium-website",
                "/chamba",
                "/table-reserve",
                "/nextup",
                "/nfc-stands",
                "/tv-menu-boards",
                "/business-consulting"
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
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
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

          <div className="text-center mt-20">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 glass-panel px-8 py-4 rounded-2xl text-foreground hover:text-orange-500 font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <Sparkles size={18} strokeWidth={2.5} className="text-orange-500" />
              {lang === "es" ? "Ver demo interactiva" : "Interactive demo"}
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* BUSINESS CONSULTING — Studies & Profit Optimization */}
      <section id="consulting" className="relative border-t border-border bg-muted/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-40">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {lang === "es" ? "ASESORÍA DE NEGOCIO" : "BUSINESS CONSULTING"}
              </div>
            </div>
            <h2 className="text-4xl sm:text-7xl font-serif italic mb-8">
              {lang === "es" ? "Más utilidad," : "More profit,"}<br />
              <span className="text-gradient font-sans not-italic font-black block mt-2">
                {lang === "es" ? "menos suposiciones." : "less guessing."}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              {T.consulting.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {T.consulting.steps.map((step, i) => {
              const Icon = [BarChart3, Lightbulb, TrendingUp, DollarSign][i] || BarChart3;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="maya-card glass-panel rounded-3xl p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-black tracking-[0.25em] text-orange-500/60 mb-3 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-foreground text-xl mb-3 leading-tight font-sans">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light tracking-wide">{step.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto mesh-gradient rounded-[2.5rem] border border-orange-500/20 p-8 sm:p-14 text-center shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              {T.consulting.metrics.map((m) => (
                <div key={m.label} className="relative">
                  <div className="text-4xl sm:text-5xl font-black text-orange-500 tracking-tighter mb-2">
                    {m.value}
                  </div>
                  <div className="text-xs font-black tracking-[0.2em] text-foreground/40 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => openDemoChat(lang, lang === "es" ? "Quiero un diagnóstico gratuito" : "I want a free diagnosis")}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
            >
              {lang === "es" ? "Diagnóstico gratis" : "Free diagnosis"}
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* LOCAL CALIFORNIA */}
      <section id="local" className="relative border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="glass-panel rounded-[3rem] p-8 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">
              <div className="w-20 h-20 rounded-3xl bg-orange-500 flex items-center justify-center shrink-0 shadow-2xl shadow-orange-500/40">
                <MapPin size={32} strokeWidth={2} className="text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-6">
                  <div className="inline-flex px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black tracking-[0.2em] uppercase">
                    {L.local.pill}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif italic mb-6 leading-tight">
                  {L.local.title1}<br />
                  <span className="text-gradient font-sans not-italic font-black block mt-2">{L.local.title2}</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-light tracking-wide mb-8">
                  {L.local.body}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {L.local.cities.map(city => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/5 text-xs font-bold text-foreground/80 tracking-wide"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USA EXPANSION */}
      <section id="expansion" className="relative border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-40">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {L.expansion.pill}
              </div>
            </div>
            <h2 className="text-4xl sm:text-7xl font-serif italic mb-8">
              {L.expansion.title1}<br />
              <span className="text-gradient font-sans not-italic font-black block mt-2">{L.expansion.title2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              {L.expansion.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {L.expansion.items.map((item, i) => {
              const Icon = EXPANSION_ICONS[i] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="maya-card glass-panel rounded-3xl p-8 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-xl mb-3 leading-tight font-sans">
                        {item.title.replace(/\*/g, "")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light tracking-wide">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING — Table + Bundle */}
      <section id="pricing" className="relative border-t border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28 sm:py-40">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {L.pricing.pill}
              </div>
            </div>
            <h2 className="text-4xl sm:text-7xl font-serif italic mb-8">
              {L.pricing.title1}<br />
              <span className="text-gradient font-sans not-italic font-black block mt-2">{L.pricing.title2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light tracking-wide">{L.pricing.body}</p>
          </div>

          {/* Pricing Table */}
          <div className="max-w-5xl mx-auto glass-panel rounded-[2rem] overflow-hidden mb-20 shadow-2xl">
            <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr] gap-4 px-8 py-6 border-b border-border/50 bg-muted/20">
              <div className="text-[10px] font-black tracking-[0.25em] text-foreground/40">
                {L.pricing.table.header.service.toUpperCase()}
              </div>
              <div className="text-[10px] font-black tracking-[0.25em] text-foreground/40 text-right">
                {L.pricing.table.header.setup.toUpperCase()}
              </div>
              <div className="text-[10px] font-black tracking-[0.25em] text-foreground/40 text-right">
                {L.pricing.table.header.monthly.toUpperCase()}
              </div>
            </div>

            <div className="divide-y divide-border/50">
              {L.pricing.table.rows.map((row) => (
                <Link
                  key={row.service}
                  href={`/dashboard#${row.hash}`}
                  className="group block px-8 py-6 hover:bg-orange-500/[0.03] transition-colors"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-3 sm:gap-4 items-center">
                    <div className="col-span-2 sm:col-span-1">
                      <div className="font-bold text-foreground text-lg flex items-center gap-2">
                        {row.service}
                        <ArrowUpRight size={15} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <div className="text-sm text-muted-foreground font-light tracking-wide mt-1">{row.note}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:hidden font-black tracking-widest text-foreground/40 mb-1">SETUP</div>
                      <div className="font-bold text-foreground text-lg">{row.setup}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:hidden font-black tracking-widest text-foreground/40 mb-1">SAAS</div>
                      <div className="font-bold text-foreground text-lg">
                        {row.monthly}<span className="text-xs text-muted-foreground font-light ml-1">{L.pricing.period}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-3 sm:gap-4 items-center px-8 py-7 border-t border-border bg-orange-500/[0.02]">
              <div className="col-span-2 sm:col-span-1 text-sm font-black tracking-widest text-orange-500 uppercase">
                {L.pricing.table.totalLabel}
              </div>
              <div className="text-right text-xl font-black text-foreground">
                {L.pricing.table.totalSetup}
              </div>
              <div className="text-right text-xl font-black text-foreground">
                {L.pricing.table.totalMonthly}<span className="text-xs text-muted-foreground font-light ml-1">{L.pricing.period}</span>
              </div>
            </div>
          </div>

          {/* Bundle Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-[3rem] border border-orange-500/20 mesh-gradient p-8 sm:p-16 relative overflow-hidden shadow-2xl shadow-orange-500/10"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-black tracking-[0.2em] uppercase shadow-lg shadow-orange-500/40">
                  <Sparkles size={12} fill="currentColor" />
                  {L.pricing.bundle.badge}
                </span>
              </div>

              <h3 className="text-3xl sm:text-6xl font-serif italic mb-6">
                {L.pricing.bundle.title}
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mb-12 leading-relaxed font-light tracking-wide">
                {L.pricing.bundle.body}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="glass-panel rounded-[2rem] p-8 border border-white/5 bg-white/[0.02]">
                  <div className="text-[10px] font-black tracking-[0.25em] text-foreground/40 mb-4 uppercase">
                    {L.pricing.bundle.setupLabel}
                  </div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-5xl sm:text-6xl font-black text-orange-500 tracking-tighter">
                      {L.pricing.bundle.setupNow}
                    </span>
                    <span className="text-xl text-muted-foreground line-through font-light">
                      {L.pricing.bundle.setupOriginal}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-orange-500/80 tracking-wide uppercase">
                    {L.pricing.bundle.setupSavings}
                  </div>
                </div>

                <div className="glass-panel rounded-[2rem] p-8 border border-white/5 bg-white/[0.02]">
                  <div className="text-[10px] font-black tracking-[0.25em] text-foreground/40 mb-4 uppercase">
                    {L.pricing.bundle.monthlyLabel}
                  </div>
                  <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                    <span className="text-5xl sm:text-6xl font-black text-orange-500 tracking-tighter">
                      {L.pricing.bundle.monthlyNow}
                    </span>
                    <span className="text-base text-muted-foreground font-light">{L.pricing.period}</span>
                    <span className="text-xl text-muted-foreground line-through font-light">
                      {L.pricing.bundle.monthlyOriginal}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-orange-500/80 tracking-wide uppercase">
                    {L.pricing.bundle.monthlySavings}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <a
                  href="mailto:contact@conect-r.com"
                  className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  {L.pricing.bundle.cta}
                  <ArrowRight size={20} strokeWidth={2.5} />
                </a>
                <p className="text-sm text-muted-foreground/60 italic max-w-sm leading-relaxed font-light">
                  {L.pricing.bundle.note}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEGAL */}
      <section id="legal" className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5"><Pill>{L.legal.pill}</Pill></div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              {L.legal.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{L.legal.body}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {L.legal.items.map((item, i) => {
              const Icon = LEGAL_ICONS[i] || Shield;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-sm mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
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
              href={`https://wa.me/${PHONE_DIGITS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle size={22} strokeWidth={2.5} />
              {L.finalCta.whatsapp}
              <ArrowRight size={22} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-3 glass-panel text-foreground px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all hover:bg-muted/50 active:scale-95"
            >
              <Mail size={22} strokeWidth={2.5} />
              {L.finalCta.email}
            </a>
          </div>
          <div className="mt-12">
            <a
              href={`sms:+${PHONE_DIGITS}`}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass-panel border-white/5 text-sm font-bold text-foreground hover:text-orange-500 transition-all shadow-lg"
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              {lang === "es" ? "Enviar texto" : "Text"}
              <span className="opacity-20">·</span>
              <span className="opacity-60 font-medium tracking-wider">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/20 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            <div>
              <Wordmark size="lg" />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">
                {L.footer.tagline}
              </p>
              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
                <MapPin size={12} className="text-orange-500" />
                {L.footer.location}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-foreground/50 mb-4">
                {L.footer.productLabel.toUpperCase()}
              </div>
              <ul className="space-y-2.5">
                {L.footer.productLinks.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                        {link.label}
                      </Link>
                    ) : link.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollTo(link.href.slice(1))}
                        className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                      >
                        {link.label}
                      </button>
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
