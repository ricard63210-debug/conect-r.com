import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, MapPin, Clock, Languages } from "lucide-react";
import { EVENTS, type EventLang } from "@/lib/events";

const COPY = {
  es: {
    back: "Volver al Menú",
    title: "Próximos Eventos",
    subtitle: "Música en vivo, shows y noches especiales en Maya Cantina",
    address: "455 Bercut Dr, Sacramento, CA 95811",
    hours: "Lun-Dom 9am–10pm",
    reserveEvent: "Reservar Mesa para el Evento",
    langOther: "EN",
    intro:
      "Vive Maya Cantina más allá del menú. Cada semana traemos artistas, banda en vivo, tributos y shows familiares. Reserva tu mesa con tiempo — los mejores asientos se van rápido.",
  },
  en: {
    back: "Back to Menu",
    title: "Upcoming Events",
    subtitle: "Live music, shows and special nights at Maya Cantina",
    address: "455 Bercut Dr, Sacramento, CA 95811",
    hours: "Mon-Sun 9am–10pm",
    reserveEvent: "Reserve a Table for the Event",
    langOther: "ES",
    intro:
      "Experience Maya Cantina beyond the menu. Every week we bring live artists, banda, tributes and family shows. Reserve your table early — the best seats go fast.",
  },
} as const;

export default function Events() {
  const [lang, setLang] = useState<EventLang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("maya-lang");
    return saved === "es" ? "es" : "en";
  });

  const t = COPY[lang];

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("maya-lang", lang);
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-200 hover:text-[#F0A500] transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider text-[12px]">{t.back}</span>
          </Link>

          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}maya-logo.jpeg`}
              alt="Maya Cantina"
              className="w-9 h-9 object-contain rounded-full border border-[#D35400]/20"
            />
            <div className="text-lg font-serif font-bold text-[#D35400] hidden sm:block">MAYA</div>
          </div>

          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-[#F0A500] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
            aria-label="Switch language"
          >
            <Languages size={13} />
            {t.langOther}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D35400]/15 border border-[#D35400]/40 rounded-full text-[11px] font-bold text-[#F0A500] uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500] animate-pulse" />
            Maya Cantina
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F0A500] tracking-wide mb-4">
            {t.title}
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed mb-2">{t.subtitle}</p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">{t.intro}</p>
        </motion.div>
      </section>

      {/* Events grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-xl border border-white/5 flex flex-col"
            >
              <div className={`h-64 w-full relative overflow-hidden bg-gradient-to-br ${ev.color}`}>
                <img
                  src={ev.img}
                  alt={ev.title[lang]}
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {ev.day[lang]} · {ev.time}
                </div>
                <div className="absolute bottom-4 right-4 text-6xl drop-shadow-lg">{ev.fallbackEmoji}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-2xl leading-tight text-white mb-2">{ev.title[lang]}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{ev.desc[lang]}</p>
                <a
                  href="https://tablereserve.conect-r.com/book/roosters-on-the-river"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#D35400] hover:bg-[#D35400]/90 text-white text-sm font-bold py-3 px-5 rounded-2xl uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(211,84,0,0.4)] text-center"
                >
                  {t.reserveEvent}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info footer */}
      <footer className="container mx-auto px-4 mt-16">
        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 text-center">
          <img
            src={`${import.meta.env.BASE_URL}maya-logo.jpeg`}
            alt="Maya Cantina"
            className="w-14 h-14 object-contain rounded-full mx-auto opacity-70 mb-4"
          />
          <div className="font-serif text-xl font-bold text-[#D35400] mb-4 tracking-widest">MAYA CANTINA</div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-[#F0A500]" /> {t.address}
            </span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-[#2E7D32]" /> {t.hours}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
