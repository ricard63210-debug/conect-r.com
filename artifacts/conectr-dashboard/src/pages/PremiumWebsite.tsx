import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, Check, Globe, Sparkles, ArrowRight,
  Palette, CalendarCheck, Utensils, Search,
  TrendingUp, Zap, Shield, Star,
  Sun, Moon, Languages, ArrowUpRight,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import conectrLogo from "@/assets/conectr-logo.png";
import { useState, useEffect } from "react";

const DEMO_GREETING_EN =
  "Thanks for your interest in our Premium Website! I'm Aria from Conect-R. I'll guide you through booking a consultation.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?";
const DEMO_GREETING_ES =
  "¡Gracias por tu interés en nuestro sitio Premium! Soy Aria de Conect-R. Te guiaré para agendar tu consulta.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?";

const DEMO_GREETING = {
  es: "Gracias por contactar a Conect-R, mi nombre es Aria y te guiaré paso a paso para hacer tu cita. Hablo español e inglés, escríbeme en el idioma que prefieras.\n\nPara empezar, ¿cuál es el nombre de tu negocio y qué tipo de restaurante es?",
  en: "Thanks for reaching out to Conect-R, my name is Aria and I'll guide you step by step to book your appointment. I speak English and Spanish — feel free to write in whichever you prefer.\n\nTo start, what's the name of your business and what type of restaurant is it?",
};

function openDemoChat(lang: "es" | "en", userMessage?: string) {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: { greeting: DEMO_GREETING[lang], lang, userMessage },
    }),
  );
}

function openChat(lang: "es" | "en") {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: {
        greeting: lang === "es" ? DEMO_GREETING_ES : DEMO_GREETING_EN,
        lang,
        userMessage: lang === "es" ? "Me gustaría solicitar mi Sitio Web Premium" : "I would like to request my Premium Website",
      },
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
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

const FEATURES = [
  {
    icon: Palette,
    title: "Premium brand design",
    body: "Custom visual identity built around your restaurant — colors, typography, photography layouts, and micro-animations that create a real wow-factor.",
  },
  {
    icon: CalendarCheck,
    title: "Online reservations",
    body: "Integrated reservation flow that lets guests book a table in seconds, directly from your site — no third-party fees, no missed calls.",
  },
  {
    icon: Utensils,
    title: "Integrated digital menu",
    body: "Your full menu lives on the site — always up to date, beautifully formatted, and accessible from any device without an app.",
  },
  {
    icon: Search,
    title: "Local SEO optimized",
    body: "Technical SEO baked in from day one: semantic HTML, structured data, fast load times, and Google Business integration to rank in local search.",
  },
];

const WHY_US = [
  {
    icon: TrendingUp,
    title: "Built to convert, not just look good",
    body: "Every section — from the hero to the menu — is designed with proven conversion patterns that turn visitors into reservations.",
  },
  {
    icon: Zap,
    title: "Fast delivery, zero tech headaches",
    body: "Full project live in under 2 weeks. We handle hosting, updates, and performance monitoring so you focus on running your restaurant.",
  },
  {
    icon: Shield,
    title: "Your brand, your asset",
    body: "You own it. The design, the content, the domain. We build it to last and hand you full control with no lock-in.",
  },
  {
    icon: Star,
    title: "Proven for local restaurants",
    body: "Tested with Sacramento-area restaurants — Mexican, American, and Latino concepts — that saw measurable increases in walk-ins and online reservations.",
  },
];

export default function PremiumWebsite() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const T = getT(lang);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4">
        <div className="bg-transparent max-w-5xl mx-auto flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <img src={conectrLogo} alt="Conect-R" className="h-20 sm:h-32 md:h-44 w-auto object-contain select-none" draggable={false} />
          </Link>
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
              <span className="hidden sm:inline">{T.landing.nav.scheduleDemo}</span>
              <span className="sm:hidden">Demo</span>
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden">
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
              <Globe size={12} strokeWidth={2.5} />
              PREMIUM WEBSITE
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif italic font-medium tracking-tight leading-[0.9] mb-6"
          >
            Your digital home,
            <br />
            <span className="text-gradient font-sans not-italic font-black block mt-2 sm:mt-4 pb-3 pt-1 leading-normal">
              built to sell.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
          >
            Not a template. Not a basic site. A premium, interactive web presence built specifically for your restaurant — with reservations, menu, and SEO baked in from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openChat(lang)}
              className="group relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10">Request my site</span>
              <ArrowRight size={18} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative border-t border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                PRICING
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-light">
              One-time setup fee, then a low monthly SaaS subscription. No hidden costs, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Setup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl p-8 border border-border"
            >
              <div className="text-xs font-black tracking-[0.2em] text-orange-500 uppercase mb-4">Initial Setup</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-foreground">$1,000</span>
                <span className="text-muted-foreground font-light mb-1">USD</span>
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                One-time fee covering design, development, content setup, and full launch. Starting price — final quote based on scope.
              </p>
            </motion.div>

            {/* Monthly SaaS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl p-8 border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-500/5 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black tracking-[0.15em] uppercase">
                  Monthly
                </span>
              </div>
              <div className="text-xs font-black tracking-[0.2em] text-orange-500 uppercase mb-4">SaaS Subscription</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-foreground">$250</span>
                <span className="text-muted-foreground font-light mb-1">USD / mo</span>
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                Includes hosting, performance monitoring, content updates, and ongoing support. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="relative border-t border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                WHAT'S INCLUDED
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic mb-4">
              Everything you need,
              <br />
              <span className="text-gradient font-sans not-italic font-black">nothing you don't.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-panel rounded-3xl p-8 border border-border group"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-500">
                  <f.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3 font-sans">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TEAMS CHOOSE US */}
      <section className="relative border-t border-border bg-muted/30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                WHY TEAMS CHOOSE US
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic">
              More than a website —
              <br />
              <span className="text-gradient font-sans not-italic font-black">a growth engine.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border border-border bg-card/40"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-orange-500 mt-0.5">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1 text-base font-sans">{item.title}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                READY TO LAUNCH
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif italic font-medium tracking-tight mb-6">
              Let's build your
              <br />
              <span className="text-gradient font-sans not-italic font-black pb-2 block leading-normal">
                restaurant's best page.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Talk to Aria — our AI assistant will gather your details and connect you with the Conect-R team to kick things off.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openChat(lang)}
                className="group relative inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles size={20} strokeWidth={2} className="transition-transform group-hover:rotate-12" />
                Request my site
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:border-orange-500/30 font-semibold text-sm transition-all"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to home
              </Link>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            {["Flexible terms", "Full project live in under 2 weeks", "Bilingual support (EN/ES)", "Sacramento-based team"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={14} strokeWidth={2.5} className="text-orange-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src={conectrLogo} alt="Conect-R" className="h-12 w-auto object-contain select-none" draggable={false} />
          </Link>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Conect-R. Sacramento, CA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
