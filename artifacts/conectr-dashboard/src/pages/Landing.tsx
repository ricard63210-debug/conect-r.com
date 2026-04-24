import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowRight, Check, MapPin, Sun, Moon, Languages,
  Wifi, BarChart3, Monitor, Globe, Instagram, Palette, TrendingUp,
  MessageCircle, Mail, Sparkles, Star,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const MODULE_ICONS = [Wifi, BarChart3, Monitor, Globe, Instagram, Palette, TrendingUp];

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

function Wordmark({ size = "base" }: { size?: "base" | "lg" }) {
  const cls = size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl";
  return (
    <span className={`${cls} font-extrabold tracking-tight text-foreground`}>
      Conect<span className="text-orange-500">-R</span>
    </span>
  );
}

export default function Landing() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const T = getT(lang);
  const L = T.landing;
  const modules = T.modules;

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
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
            >
              {L.nav.signIn}
            </Link>
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all"
            >
              <span className="hidden sm:inline">{L.nav.scheduleDemo}</span>
              <span className="sm:hidden">Demo</span>
              <ArrowUpRight size={14} />
            </a>
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
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-xl shadow-orange-500/25 transition-all"
            >
              {L.hero.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            <button
              onClick={() => scrollTo("ecosystem")}
              className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted transition-all"
            >
              {L.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section id="ecosystem" className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.ecosystem.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.ecosystem.title1}<br />
              {L.ecosystem.title2}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">{L.ecosystem.body}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {modules.map((mod, i) => {
              const Icon = MODULE_ICONS[i];
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-orange-500/40 hover:bg-orange-500/[0.03] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <Icon size={18} className="text-orange-500" />
                  </div>
                  <div className="font-bold text-foreground mb-1">{mod.label}</div>
                  <div className="text-sm text-muted-foreground">{mod.sublabel}</div>
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

      {/* FLOW */}
      <section id="flow" className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.flow.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.flow.title1}<br />
              {L.flow.title2}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{L.flow.body}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {L.flow.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-background p-6 relative overflow-hidden"
              >
                <div className="absolute top-4 right-5 text-5xl font-extrabold text-orange-500/15 leading-none">
                  {step.num}
                </div>
                <div className="text-orange-500 font-bold text-xs tracking-wider mb-3">PASO {step.num}</div>
                <h3 className="font-bold text-foreground text-lg mb-2 leading-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL CALIFORNIA */}
      <section id="local" className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
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

      {/* PRICING */}
      <section id="pricing" className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-6"><Pill>{L.pricing.pill}</Pill></div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              {L.pricing.title1}<br />
              {L.pricing.title2}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">{L.pricing.body}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {L.pricing.tiers.map((tier, i) => {
              const isPro = i === 1;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`rounded-2xl p-7 relative ${
                    isPro
                      ? "border-2 border-orange-500 bg-background shadow-xl shadow-orange-500/15 md:scale-[1.03]"
                      : "border border-border bg-background"
                  }`}
                >
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-orange-500 text-white text-[11px] font-bold tracking-wide px-3 py-1 rounded-full shadow-lg">
                      <Star size={10} fill="currentColor" />
                      {L.pricing.popular.toUpperCase()}
                    </div>
                  )}
                  <div className="font-bold text-foreground text-lg mb-1">{tier.name}</div>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{tier.desc}</p>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    {tier.price.startsWith("$") && (
                      <span className="text-sm text-muted-foreground">{L.pricing.period}</span>
                    )}
                  </div>
                  <a
                    href="mailto:contact@conect-r.com"
                    className={`block text-center px-5 py-3 rounded-xl text-sm font-semibold mb-6 transition-all ${
                      isPro
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {tier.cta}
                  </a>
                  <ul className="space-y-2.5">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                        <div className="w-4 h-4 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} className="text-orange-500" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
            {L.finalCta.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-9">
            {L.finalCta.body}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/19165551234"
              target="_blank" rel="noopener noreferrer"
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
                CONTACTO
              </div>
              <a
                href="mailto:contact@conect-r.com"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors block mb-2"
              >
                contact@conect-r.com
              </a>
              <a
                href="https://wa.me/19165551234"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors block"
              >
                WhatsApp
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
