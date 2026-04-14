import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor, Check, Clock, Music, Star, Flame, Calendar,
  MessageSquare, Phone, Instagram, Facebook, RefreshCw
} from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const SLIDE_ICONS = [Music, Flame, Star, Star, Flame];
const SLIDE_BG = [
  "from-purple-950 via-indigo-950 to-stone-950",
  "from-amber-950 via-orange-950 to-stone-950",
  "from-rose-950 via-pink-950 to-stone-950",
  "from-red-950 via-rose-950 to-stone-950",
  "from-green-950 via-emerald-950 to-stone-950",
];
const SLIDE_ACCENT = ["text-purple-300", "text-amber-300", "text-rose-300", "text-red-300", "text-green-300"];

export default function DigitalSignage() {
  const { lang } = useLang();
  const T = getT(lang).signage;

  const slides = T.slides.map((s, i) => ({
    ...s,
    tagIcon: SLIDE_ICONS[i],
    bg: SLIDE_BG[i],
    accent: SLIDE_ACCENT[i],
  }));

  const [activeIdx, setActiveIdx] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIdx];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const selectSlide = (idx: number) => {
    setUpdating(true);
    setIsPaused(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setUpdating(false);
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
        setIsPaused(false);
      }, 2500);
    }, 900);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {T.description} <span className="text-amber-400 font-medium">{T.descSales}</span> {T.descMid}{" "}
          <span className="text-amber-400 font-medium">{T.descClients}</span> {T.descAnd}{" "}
          <span className="text-amber-400 font-medium">{T.descWork}</span> {T.descEnd}
        </p>
        <ImpactPills />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TV Screens */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Monitor size={20} /> {T.screensTitle}
          </h3>

          <div className="relative">
            <div className="bg-gray-900 rounded-2xl p-2 border-4 border-gray-700 tv-glow">
              <div className="bg-gray-950 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <AnimatePresence mode="wait">
                  {updating ? (
                    <motion.div
                      key="updating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center bg-gray-950"
                    >
                      <div className="text-center">
                        <RefreshCw size={32} className="text-amber-400 animate-spin mx-auto mb-3" />
                        <p className="text-amber-300 text-sm">{T.updating}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                      className={`w-full h-full bg-gradient-to-br ${activeSlide.bg} relative flex flex-col items-center justify-center px-6 py-4`}
                    >
                      <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(212,160,23,0.3) 0%, transparent 70%)" }}
                      />

                      <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                        <span className="text-xs text-white/30 font-serif tracking-widest uppercase">Carmelitas</span>
                        <div className="flex gap-1">
                          {slides.map((_, i) => (
                            <div
                              key={i}
                              className={`h-0.5 rounded-full transition-all duration-300 ${
                                i === activeIdx ? "w-6 bg-amber-400" : "w-2 bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-center relative z-10">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-3"
                        >
                          <activeSlide.tagIcon size={12} className="text-amber-400" />
                          <span className="text-xs text-amber-300 uppercase tracking-widest">{activeSlide.tag}</span>
                        </motion.div>

                        <motion.h2
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2"
                        >
                          {activeSlide.title}
                        </motion.h2>

                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className={`text-base ${activeSlide.accent} mb-1`}
                        >
                          {activeSlide.subtitle}
                        </motion.p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-xs text-white/50 italic"
                        >
                          {activeSlide.detail}
                        </motion.p>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-white/40">
                          <Calendar size={10} />
                          <span>{activeSlide.days}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/40">
                          <Clock size={10} />
                          <span>{activeSlide.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-16 h-2 bg-gray-700 rounded" />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-1.5 bg-gray-800 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {T.locations.map((loc) => (
              <div key={loc} className="bg-gray-900 rounded-xl p-1 border-2 border-gray-700">
                <div className="bg-gray-950 rounded-lg overflow-hidden">
                  <div
                    className={`bg-gradient-to-br ${activeSlide.bg} flex flex-col items-center justify-center p-3`}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <p className="text-xs text-amber-300 font-serif font-bold text-center leading-tight">{activeSlide.title}</p>
                    <p className="text-white/40 text-center mt-1" style={{ fontSize: "9px" }}>{loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {updated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-700/40 rounded-xl px-4 py-2.5"
            >
              <Check size={16} /> {T.updated}
            </motion.div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Calendar size={20} /> {T.eventsTitle}
          </h3>

          <div className="space-y-2">
            {slides.map((slide, idx) => (
              <motion.button
                key={slide.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSlide(idx)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                  activeIdx === idx
                    ? "border-amber-600/60 bg-amber-500/10"
                    : "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${slide.bg} flex items-center justify-center shrink-0`}>
                  <slide.tagIcon size={15} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground">{slide.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">{slide.days} • {slide.time}</div>
                </div>
                {activeIdx === idx && <Check size={14} className="text-amber-400 shrink-0" />}
                {activeIdx !== idx && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="maya-card rounded-2xl p-5 border border-amber-800/30 space-y-4">
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-1 flex items-center gap-2">
                <MessageSquare size={15} /> {T.howTitle}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{T.howDesc}</p>
            </div>

            <div className="space-y-2">
              {[Phone, MessageSquare, RefreshCw, Check].map((Icon, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-700/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={11} className="text-amber-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">{T.howSteps[i]}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border/30 pt-3">
              <p className="text-xs text-muted-foreground/60 mb-2">{T.followUs}</p>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/carmelitasgroup?igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-900/20 border border-pink-800/30 rounded-lg text-xs text-pink-300 hover:bg-pink-900/30 transition-colors"
                >
                  <Instagram size={12} /> @carmelitasgroup
                </a>
                <a
                  href="https://www.facebook.com/pages/Carmelitas-Mexican-Bar-Grill/151034358242633?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/20 border border-blue-800/30 rounded-lg text-xs text-blue-300 hover:bg-blue-900/30 transition-colors"
                >
                  <Facebook size={12} /> Carmelitas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
