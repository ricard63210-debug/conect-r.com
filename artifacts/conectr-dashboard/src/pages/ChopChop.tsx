import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sun, Moon, Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";
import conectrLogo from "@/assets/conectr-logo.png";
import { useState, useEffect } from "react";

const CHOP_CHOP_URL = "https://chopchop.style/";

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

export default function ChopChop() {
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
              {T.chopChop.hero.pill}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif italic font-medium tracking-tight leading-[0.9] mb-6"
          >
            {T.chopChop.hero.title}
            <br />
            <span className="text-gradient font-sans not-italic font-black block mt-2 sm:mt-4 pb-3 pt-1 leading-normal">
              {T.chopChop.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            {T.chopChop.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="relative border-t border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {T.chopChop.features.pill}
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic mb-4">
              {T.chopChop.features.title}
              <br />
              <span className="text-gradient font-sans not-italic font-black">{T.chopChop.features.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {T.chopChop.features.list.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-panel rounded-3xl p-8 border border-border group"
              >
                <h3 className="font-bold text-foreground text-xl mb-3 font-sans">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT'S WORTH IT */}
      <section className="relative border-t border-border bg-muted/30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6">
              <div className="px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {T.chopChop.whyUs.pill}
              </div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif italic">
              {T.chopChop.whyUs.title}
              <br />
              <span className="text-gradient font-sans not-italic font-black">{T.chopChop.whyUs.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {T.chopChop.whyUs.list.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/40"
              >
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
                {T.chopChop.cta.pill}
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif italic font-medium tracking-tight mb-6">
              {T.chopChop.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light">
              {T.chopChop.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CHOP_CHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                {T.chopChop.cta.button}
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:border-orange-500/30 font-semibold text-sm transition-all"
              >
                {T.chopChop.cta.backToHome}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
