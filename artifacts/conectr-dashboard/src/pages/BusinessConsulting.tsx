import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, Check, Sparkles, ArrowRight,
  BarChart3, Lightbulb, TrendingUp, DollarSign,
  Sun, Moon, Languages, ArrowUpRight
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import conectrLogo from "@/assets/conectr-logo.png";
import { useState, useEffect } from "react";

const DEMO_GREETING_EN =
  "Thanks for your interest in our Business Consulting services! I'm Aria from Conect-R. I'll guide you through scheduling your free diagnosis.\n\nTo start, what's the name of your restaurant and what type of cuisine do you serve?";
const DEMO_GREETING_ES =
  "¡Gracias por tu interés en nuestra Asesoría de Negocios! Soy Aria de Conect-R. Te guiaré para programar tu diagnóstico gratuito.\n\nPara empezar, ¿cuál es el nombre de tu restaurante y qué tipo de cocina manejan?";

function openChat(lang: "es" | "en") {
  window.dispatchEvent(
    new CustomEvent("conectr:open-chat", {
      detail: {
        greeting: lang === "es" ? DEMO_GREETING_ES : DEMO_GREETING_EN,
        lang,
        userMessage: lang === "es" ? "Quiero un diagnóstico gratuito" : "I want a free diagnosis",
      },
    }),
  );
}

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

const STEPS = [
  {
    number: "01",
    icon: BarChart3,
    title: "Operational Diagnosis",
    body: "Deep study of sales, costs, service times, waste, table turnover and POS data — pinpointing exactly where money is leaking.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategic Plan",
    body: "Concrete recommendations: menu re-engineering, price strategy, shift redesign, tip policy, local marketing and digital activation.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Guided Implementation",
    body: "We activate the Conect-R modules you need, train the team and leave processes documented so the business no longer depends on one person.",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Profit Measurement",
    body: "Monthly KPI dashboard: average check, food cost %, labor %, occupancy and net profit — clear before vs. after comparison.",
  },
];

const METRICS = [
  {
    value: "+28%",
    label: "Average net profit lift",
  },
  {
    value: "-18%",
    label: "Food cost after menu engineering",
  },
  {
    value: "+34%",
    label: "Average ticket in optimized hours",
  },
];

export default function BusinessConsulting() {
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
              <TrendingUp size={12} strokeWidth={2.5} />
              BUSINESS CONSULTING
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif italic font-medium tracking-tight leading-[0.9] mb-6"
          >
            Business Consulting
            <br />
            <span className="text-gradient font-sans not-italic font-black block mt-2 sm:mt-4 pb-3 pt-1 leading-normal">
              More profit, less guessing.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
          >
            We analyze your restaurant in depth and roll out measurable optimizations so every table, every dish and every shift drives more profit.
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
              <span className="relative z-10">{lang === "es" ? "Quiero un diagnóstico gratuito" : "I want a free diagnosis"}</span>
              <ArrowRight size={18} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative border-t border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                PROVEN RESULTS
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic mb-4">Studies that turn into real money</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-light">
              We deliver concrete financial improvements through data-driven operational redesigns.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mesh-gradient rounded-[2.5rem] border border-orange-500/20 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {METRICS.map((m) => (
                <div key={m.label} className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-black text-orange-500 tracking-tighter mb-2">
                    {m.value}
                  </div>
                  <div className="text-xs font-black tracking-[0.2em] text-foreground/60 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED (4-Step Process) */}
      <section className="relative border-t border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                OUR METHOD
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic mb-4">
              A structured roadmap to
              <br />
              <span className="text-gradient font-sans not-italic font-black">maximizing efficiency.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-panel rounded-3xl p-8 border border-border group relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                    <s.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-2xl font-black text-orange-500/30 tracking-tight font-sans">
                    {s.number}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3 font-sans">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{s.body}</p>
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
                READY TO OPTIMIZE
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif italic font-medium tracking-tight mb-6">
              Ready to optimize your restaurant?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Talk to Aria — our AI assistant will gather your details and connect you with our consulting team to get started.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openChat(lang)}
                className="group relative inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles size={20} strokeWidth={2} className="transition-transform group-hover:rotate-12" />
                {lang === "es" ? "Quiero un diagnóstico gratuito" : "I want a free diagnosis"}
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
