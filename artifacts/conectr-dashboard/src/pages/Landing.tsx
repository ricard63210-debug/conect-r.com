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
  es: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
  en: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment.\n\nTo start, what's the name of your business and what type of restaurant is it?",
} as const;

function openDemoChat(lang: "es" | "en") {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: { greeting: DEMO_GREETING[lang], lang },
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

const MODULE_ICONS: Array<React.ComponentType<{ size?: number }>> = [
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

function Wordmark({ size = "base" }: { size?: "base" | "lg" }) {
  const h = size === "lg" ? 112 : 88;
  return (
    <img
      src={conectrLogo}
      alt="Conect-R"
      style={{ height: h, width: "auto" }}
      className="object-contain select-none"
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <a href={import.meta.env.BASE_URL} className="flex items-center shrink-0">
            <Wordmark />
          </a>
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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background: theme === "dark"
              ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.18), transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.10), transparent 70%)"
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-16 sm:pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-7">
            <Pill>{L.hero.pill}</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] mb-6"
          >
            {L.hero.title1}<br />
            <span className="text-orange-500">{L.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            {L.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => openDemoChat(lang)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-orange-500/25 transition-all"
            >
              {L.hero.ctaPrimary}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("ecosystem")}
              className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted transition-all"
            >
              {L.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ABOUT — Executive Summary + Vision/Mission */}
      <section id="about" className="border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6"><Pill>{L.about.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.about.title1}<br />
              <span className="text-orange-500">{L.about.title2}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {L.about.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4">
                <Eye size={18} className="text-orange-500" />
              </div>
              <div className="text-xs font-bold tracking-widest text-orange-500 mb-2">{L.about.vision.label.toUpperCase()}</div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{L.about.vision.body}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4">
                <Target size={18} className="text-orange-500" />
              </div>
              <div className="text-xs font-bold tracking-widest text-orange-500 mb-2">{L.about.mission.label.toUpperCase()}</div>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{L.about.mission.body}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM — Application Portfolio */}
      <section id="ecosystem" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.ecosystem.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.ecosystem.title1}<br />
              {L.ecosystem.title2}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{L.ecosystem.body}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {L.appPortfolio.map((mod, i) => {
              const Icon = MODULE_ICONS[i] || Globe;
              return (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <Link
                    href={`/dashboard#${mod.dashHash}`}
                    className="group block h-full rounded-2xl border border-border bg-card p-6 hover:border-orange-500/40 hover:bg-orange-500/[0.03] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                      <Icon size={19} />
                    </div>
                    <div className="font-bold text-foreground text-lg mb-1.5 flex items-center gap-1.5">
                      {mod.name}
                      <ArrowUpRight size={15} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] font-bold tracking-wider text-orange-500 mb-3">
                      {mod.tagline}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{mod.body}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
            >
              <Sparkles size={15} />
              {lang === "es" ? "Ver demo interactiva del ecosistema" : "View interactive ecosystem demo"}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* BUSINESS CONSULTING — Studies & Profit Optimization */}
      <section id="consulting" className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <Pill>{lang === "es" ? "ASESORÍA DE NEGOCIO" : "BUSINESS CONSULTING"}</Pill>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {lang === "es" ? "Más utilidad, menos suposiciones." : "More profit, less guessing."}<br />
              <span className="text-orange-500">
                {lang === "es" ? "Estudios que se traducen en dinero." : "Studies that turn into real money."}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {T.consulting.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {T.consulting.steps.map((step, i) => {
              const Icon = [BarChart3, Lightbulb, TrendingUp, DollarSign][i] || BarChart3;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-500">
                    <Icon size={19} />
                  </div>
                  <div className="text-[11px] font-bold tracking-wider text-orange-500 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1.5 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-7 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
              {T.consulting.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 tracking-tight mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => openDemoChat(lang)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-orange-500/25 transition-all"
              >
                {lang === "es" ? "Quiero un diagnóstico gratis" : "I want a free diagnosis"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CALIFORNIA */}
      <section id="local" className="border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-7 sm:p-12">
            <div className="flex flex-col md:flex-row items-start gap-7">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <MapPin size={26} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="mb-4"><Pill>{L.local.pill}</Pill></div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                  {L.local.title1}<br />
                  <span className="text-orange-500">{L.local.title2}</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                  {L.local.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {L.local.cities.map(city => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-medium text-orange-500"
                    >
                      <Check size={11} />
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
      <section id="expansion" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.expansion.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.expansion.title1}<br />
              <span className="text-orange-500">{L.expansion.title2}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {L.expansion.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {L.expansion.items.map((item, i) => {
              const Icon = EXPANSION_ICONS[i] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-base mb-1.5 leading-tight">
                        {item.title.replace(/\*/g, "")}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING — Table + Bundle */}
      <section id="pricing" className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.pricing.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.pricing.title1}<br />
              <span className="text-orange-500">{L.pricing.title2}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{L.pricing.body}</p>
          </div>

          {/* Pricing Table */}
          <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-card overflow-hidden mb-10">
            <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border bg-muted/40">
              <div className="text-[11px] font-bold tracking-widest text-foreground/60">
                {L.pricing.table.header.service.toUpperCase()}
              </div>
              <div className="text-[11px] font-bold tracking-widest text-foreground/60 text-right">
                {L.pricing.table.header.setup.toUpperCase()}
              </div>
              <div className="text-[11px] font-bold tracking-widest text-foreground/60 text-right">
                {L.pricing.table.header.monthly.toUpperCase()}
              </div>
            </div>

            <div className="divide-y divide-border">
              {L.pricing.table.rows.map((row) => (
                <Link
                  key={row.service}
                  href={`/dashboard#${row.hash}`}
                  className="group block px-6 py-5 hover:bg-orange-500/[0.04] transition-colors"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-3 sm:gap-4 items-center">
                    <div className="col-span-2 sm:col-span-1">
                      <div className="font-bold text-foreground text-sm sm:text-base flex items-center gap-1.5">
                        {row.service}
                        <ArrowUpRight size={13} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{row.note}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:hidden font-bold tracking-widest text-foreground/50 mb-0.5">SETUP</div>
                      <div className="font-bold text-foreground text-sm sm:text-base">{row.setup}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] sm:hidden font-bold tracking-widest text-foreground/50 mb-0.5">SAAS</div>
                      <div className="font-bold text-foreground text-sm sm:text-base">
                        {row.monthly}<span className="text-xs text-muted-foreground font-normal">{L.pricing.period}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-3 sm:gap-4 items-center px-6 py-5 border-t-2 border-border bg-muted/30">
              <div className="col-span-2 sm:col-span-1 text-sm font-bold text-foreground">
                {L.pricing.table.totalLabel}
              </div>
              <div className="text-right text-base sm:text-lg font-extrabold text-foreground">
                {L.pricing.table.totalSetup}
              </div>
              <div className="text-right text-base sm:text-lg font-extrabold text-foreground">
                {L.pricing.table.totalMonthly}<span className="text-xs text-muted-foreground font-normal">{L.pricing.period}</span>
              </div>
            </div>
          </div>

          {/* Bundle Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto rounded-3xl border-2 border-orange-500 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-7 sm:p-10 relative overflow-hidden shadow-xl shadow-orange-500/15"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-extrabold tracking-wider shadow-lg">
                  <Sparkles size={11} fill="currentColor" />
                  {L.pricing.bundle.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                {L.pricing.bundle.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                {L.pricing.bundle.body}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-7">
                <div className="rounded-2xl border border-border bg-background/80 backdrop-blur p-6">
                  <div className="text-xs font-bold tracking-widest text-foreground/60 mb-3">
                    {L.pricing.bundle.setupLabel.toUpperCase()}
                  </div>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-orange-500 tracking-tight">
                      {L.pricing.bundle.setupNow}
                    </span>
                    <span className="text-base sm:text-lg text-muted-foreground line-through">
                      {L.pricing.bundle.setupOriginal}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-orange-500">
                    {L.pricing.bundle.setupSavings}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 backdrop-blur p-6">
                  <div className="text-xs font-bold tracking-widest text-foreground/60 mb-3">
                    {L.pricing.bundle.monthlyLabel.toUpperCase()}
                  </div>
                  <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-extrabold text-orange-500 tracking-tight">
                      {L.pricing.bundle.monthlyNow}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">{L.pricing.period}</span>
                    <span className="text-base sm:text-lg text-muted-foreground line-through">
                      {L.pricing.bundle.monthlyOriginal}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-orange-500">
                    {L.pricing.bundle.monthlySavings}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="mailto:contact@conect-r.com"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-orange-500/25 transition-all"
                >
                  {L.pricing.bundle.cta}
                  <ArrowRight size={16} />
                </a>
                <p className="text-xs text-muted-foreground italic max-w-md leading-relaxed">
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
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
            {L.finalCta.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-9">
            {L.finalCta.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${PHONE_DIGITS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-orange-500/25 transition-all"
            >
              <MessageCircle size={16} />
              {L.finalCta.whatsapp}
              <ArrowRight size={16} />
            </a>
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted transition-all"
            >
              <Mail size={16} />
              {L.finalCta.email}
            </a>
          </div>
          <div className="mt-5">
            <a
              href={`sms:+${PHONE_DIGITS}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:text-orange-500 hover:border-orange-500/40 transition-colors"
            >
              <MessageCircle size={14} />
              {lang === "es" ? "Enviar texto" : "Text"}
              <span className="text-muted-foreground font-normal">·</span>
              <span className="text-muted-foreground font-normal">{PHONE_DISPLAY}</span>
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
