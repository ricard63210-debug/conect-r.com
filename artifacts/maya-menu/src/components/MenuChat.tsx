import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";

type Lang = "es" | "en";
type Msg = { role: "user" | "assistant"; content: string };

const COPY = {
  es: {
    open: "Pregúntame sobre el menú",
    title: "Maya · Asistente del Menú",
    subtitle: "En vivo · entrenada con el menú actual",
    placeholder: "Pregunta lo que quieras del menú…",
    send: "Enviar",
    welcome:
      "¡Hola! Soy Maya, tu asistente del menú 🌮 Pregúntame por platillos picantes, opciones veganas, recomendaciones para tu grupo, maridajes con bebidas, o lo que se te antoje hoy.",
    suggested: ["¿Qué me recomiendas hoy?", "Opciones vegetarianas", "Algo picante", "¿Qué eventos hay?"],
    error: "Algo falló — vuelve a intentarlo en un momento.",
  },
  en: {
    open: "Ask about the menu",
    title: "Maya · Menu Assistant",
    subtitle: "Live · trained on the current menu",
    placeholder: "Ask anything about the menu…",
    send: "Send",
    welcome:
      "Hi! I'm Maya, your menu assistant 🌮 Ask me about spicy dishes, vegan options, group recommendations, drink pairings — or whatever you're craving today.",
    suggested: ["What do you recommend?", "Vegetarian options", "Something spicy", "What events are coming up?"],
    error: "Something went wrong — try again in a moment.",
  },
} as const;

type MenuPayload = unknown;

interface Props {
  lang: Lang;
  menu: MenuPayload;
}

export default function MenuChat({ lang, menu }: Props) {
  const t = COPY[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t.welcome }]);
    }
  }, [open, lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/menu-assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang, menu }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply = data.reply?.trim() || t.error;
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", damping: 18 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-[#D35400] to-[#F0A500] hover:opacity-95 text-white px-5 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(211,84,0,0.5)] flex items-center gap-2.5 active:scale-95 transition-transform"
        style={{ display: open ? "none" : "flex" }}
      >
        <Sparkles size={16} className="animate-pulse" />
        {t.open}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.96 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:w-[420px] h-[88vh] md:h-[640px] bg-[#1A1A1A] rounded-t-[2rem] md:rounded-[2rem] z-50 overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#D35400] to-[#F0A500] px-5 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-white text-base leading-tight">{t.title}</div>
                    <div className="text-[10px] text-white/80 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      {t.subtitle}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-[#121212]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-[#D35400] text-white rounded-br-md"
                          : "bg-white/5 text-gray-100 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 size={16} className="animate-spin text-[#F0A500]" />
                    </div>
                  </div>
                )}

                {messages.length <= 1 && !loading && (
                  <div className="pt-3 flex flex-wrap gap-2">
                    {t.suggested.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-xs px-3 py-2 rounded-full bg-white/5 border border-[#D35400]/30 text-gray-200 hover:bg-[#D35400]/15 hover:border-[#D35400]/60 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="p-3 bg-[#1A1A1A] border-t border-white/10 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={loading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D35400]/60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-11 h-11 rounded-full bg-[#D35400] hover:bg-[#D35400]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label={t.send}
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
