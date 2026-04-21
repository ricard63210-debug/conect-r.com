import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Wifi, BarChart3, Monitor, Globe, Instagram, Palette, TrendingUp,
  MapPin, Mail, Languages, ArrowRight, Sparkles, Check
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const MODULE_ICONS = [Wifi, BarChart3, Monitor, Globe, Instagram, Palette, TrendingUp];
const MODULE_COLORS = [
  "from-orange-500 to-amber-400",
  "from-orange-600 to-red-500",
  "from-cyan-500 to-sky-400",
  "from-sky-500 to-blue-500",
  "from-pink-600 to-fuchsia-500",
  "from-purple-600 to-violet-500",
  "from-emerald-500 to-green-400",
];

export default function Landing() {
  const { lang, toggle } = useLang();
  const T = getT(lang);
  const L = T.landing;
  const modules = T.modules;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/conectr-logo.png"
              alt="Conect-R"
              className="h-14 sm:h-16 object-contain"
              style={{ filter: "brightness(1.15)" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-700/40 bg-sky-500/10 text-sky-300 text-xs font-semibold hover:bg-sky-500/20 transition-colors"
            >
              <Languages size={13} />
              {T.global.langBtn}
            </motion.button>
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 text-white text-xs font-semibold hover:from-sky-500 hover:to-sky-400 transition-all"
            >
              {L.ctaDemo}
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(56,189,248,0.20), transparent 60%)" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-700/40 bg-sky-500/10 text-sky-300 text-xs font-semibold mb-6"
          >
            <MapPin size={12} />
            {L.localBadge}
          </motion.div>

          <motion.img
            src="/conectr-logo.png"
            alt="Conect-R"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto h-32 sm:h-44 object-contain mb-6"
            style={{ filter: "brightness(1.15)" }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-bold gold-gradient mb-5 leading-tight"
          >
            {L.heroTagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {L.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold hover:from-sky-500 hover:to-sky-300 transition-all shadow-lg shadow-sky-900/40"
            >
              <Sparkles size={16} />
              {L.ctaDemo}
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-sky-700/50 text-sky-200 font-semibold hover:bg-sky-500/10 transition-all"
            >
              <Mail size={16} />
              {L.ctaContact}
            </a>
          </motion.div>
        </div>
      </section>

      {/* What is Conect-R */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold gold-gradient mb-4">
            {L.whatTitle}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {L.whatBody}
          </p>
        </div>
      </section>

      {/* Local section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="rounded-3xl border border-sky-800/40 bg-gradient-to-br from-sky-950/40 to-blue-950/30 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center shrink-0 shadow-lg shadow-sky-900/40">
              <MapPin size={26} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sky-200 mb-3">
                {L.localTitle}
              </h2>
              <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed mb-4">
                {L.localBody}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sacramento", "Elk Grove", "Roseville", "Folsom", "Davis", "Rocklin"].map(city => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-700/40 text-xs text-sky-200"
                  >
                    <Check size={10} />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold gold-gradient mb-3">
            {L.modulesTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {L.modulesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => {
            const Icon = MODULE_ICONS[i];
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-sky-700/50 hover:bg-sky-950/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${MODULE_COLORS[i]} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{mod.label}</h3>
                <p className="text-xs text-muted-foreground">{mod.sublabel}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-sky-700/50 text-sky-200 font-semibold hover:bg-sky-500/10 transition-all"
          >
            {L.ctaDemo}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold gold-gradient mb-3">
            {L.statsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {L.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-sky-800/40 bg-gradient-to-br from-sky-950/30 to-blue-950/20 p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-serif font-bold text-sky-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="rounded-3xl border border-sky-700/40 bg-gradient-to-br from-sky-900/40 via-sky-950/30 to-blue-950/40 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold gold-gradient mb-4">
            {L.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-7">
            {L.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:contact@conect-r.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold hover:from-sky-500 hover:to-sky-300 transition-all shadow-lg shadow-sky-900/40"
            >
              <Mail size={16} />
              contact@conect-r.com
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-sky-700/50 text-sky-200 font-semibold hover:bg-sky-500/10 transition-all"
            >
              <Sparkles size={16} />
              {L.ctaDemo}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/conectr-logo.png"
              alt="Conect-R"
              className="h-10 object-contain"
              style={{ filter: "brightness(1.15)" }}
            />
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <MapPin size={12} className="text-sky-400" />
            {L.footerTagline}
          </div>
          <a
            href="mailto:contact@conect-r.com"
            className="text-xs text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1.5"
          >
            <Mail size={12} />
            contact@conect-r.com
          </a>
        </div>
      </footer>
    </div>
  );
}
