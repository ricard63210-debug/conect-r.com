import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, Send, Bot, User, ChevronRight, ExternalLink } from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
}

function detectIntent(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("horario") || lower.includes("hora") || lower.includes("abren") || lower.includes("cierran") || lower.includes("abierto") || lower.includes("hour") || lower.includes("open") || lower.includes("close") || lower.includes("schedule")) return "horario";
  if (lower.includes("direcci") || lower.includes("donde") || lower.includes("ubicaci") || lower.includes("como llegar") || lower.includes("sacramento") || lower.includes("address") || lower.includes("location") || lower.includes("located") || lower.includes("where")) return "direccion";
  if (lower.includes("reserva") || lower.includes("mesa") || lower.includes("apartar") || lower.includes("book") || lower.includes("reservation") || lower.includes("table")) return "reserva";
  if (lower.includes("especialidad") || lower.includes("platillo") || lower.includes("comida") || lower.includes("comer") || lower.includes("recomienda") || lower.includes("recommend") || lower.includes("menu") || lower.includes("food") || lower.includes("dish")) return "especialidades";
  if (lower.includes("evento") || lower.includes("noche") || lower.includes("mariachi") || lower.includes("actividad") || lower.includes("event") || lower.includes("night") || lower.includes("activity")) return "eventos";
  if (lower.includes("instagram") || lower.includes("face") || lower.includes("red social") || lower.includes("seguir") || lower.includes("follow") || lower.includes("social")) return "instagram";
  if (lower.includes("taco")) return "tacos";
  if (lower.includes("margarita") || lower.includes("bebida") || lower.includes("trago") || lower.includes("drink") || lower.includes("cocktail")) return "margaritas";
  if (lower.includes("brunch") || lower.includes("domingo") || lower.includes("mimosa") || lower.includes("desayuno") || lower.includes("sunday") || lower.includes("breakfast")) return "brunch";
  return "";
}

export default function PresenciaDigital() {
  const { lang } = useLang();
  const T = getT(lang).presencia;

  const [activeTab, setActiveTab] = useState<"web" | "chat">("web");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "bot", text: T.initialMessage }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: 0, role: "bot", text: T.initialMessage }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const intent = detectIntent(text);
      const faq = T.faqAnswers as Record<string, string>;
      const reply = intent && faq[intent] ? faq[intent] : faq["fallback"];
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: reply }]);
      setIsTyping(false);
    }, 1100 + Math.random() * 700);
  };

  const handleSend = () => { if (input.trim()) sendMessage(input.trim()); };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{T.description}</p>
        <ImpactPills />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "web", label: T.tabWeb, icon: Globe },
          { id: "chat", label: T.tabChat, icon: Bot },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "web" | "chat")}
            data-testid={`presencia-tab-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-sky-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "web" ? (
          <motion.div
            key="web"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Live site iframe */}
            <div className="maya-card rounded-2xl overflow-hidden border border-sky-800/20">
              <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3 border-b border-border/40">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <a
                  href="https://carmelitas-psi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-300 flex items-center gap-2 hover:bg-gray-700 transition-colors"
                >
                  <Globe size={10} className="text-green-400 shrink-0" />
                  carmelitas-psi.vercel.app
                  <ExternalLink size={9} className="text-gray-500 ml-auto" />
                </a>
              </div>
              <div style={{ height: "420px" }}>
                <iframe
                  src="https://carmelitas-psi.vercel.app/"
                  title="Carmelita's Kitchen de Mexico"
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {T.webFeatures.map(item => (
                <div key={item.title} className="maya-card rounded-xl p-4 flex gap-3">
                  <ChevronRight size={16} className="text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat interface */}
              <div className="lg:col-span-2">
                <div className="maya-card rounded-2xl overflow-hidden flex flex-col" style={{ height: "520px" }}>
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3 bg-sky-900/10">
                    <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-9 h-9 rounded-full object-cover border border-sky-700/40" style={{ filter: "brightness(0.8)" }} />
                    <div>
                      <div className="text-sm font-semibold">{T.botName}</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> {T.botOnline}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-gold">
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${
                          msg.role === "bot" ? "" : "bg-gray-700"
                        }`}>
                          {msg.role === "bot"
                            ? <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
                            : <User size={14} className="text-gray-200" />
                          }
                        </div>
                        <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "bot"
                            ? "bg-sky-900/20 border border-sky-800/30 text-foreground rounded-tl-sm"
                            : "bg-gray-700 text-white rounded-tr-sm"
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2 items-center"
                      >
                        <div className="w-7 h-7 rounded-full overflow-hidden">
                          <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
                        </div>
                        <div className="bg-sky-900/20 border border-sky-800/30 px-3 py-2 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1">
                            {[0,1,2].map(i => (
                              <div key={i} className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="px-4 py-3 border-t border-border/40 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSend()}
                      placeholder={T.inputPlaceholder}
                      data-testid="chat-input"
                      className="flex-1 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={handleSend}
                      data-testid="chat-send-btn"
                      className="w-9 h-9 bg-sky-500 text-black rounded-xl flex items-center justify-center hover:bg-sky-400 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick questions + impact */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <MessageCircle size={16} /> {T.faqTitle}
                  </h4>
                  <div className="space-y-1.5">
                    {T.quickQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs px-3 py-2.5 bg-muted/20 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-sky-700/40 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="maya-card rounded-xl p-4 border border-sky-800/20">
                  <div className="text-xs font-semibold text-sky-400 mb-2">{T.impactTitle}</div>
                  <div className="space-y-2">
                    {T.impactItems.map(item => (
                      <div key={item.label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-sky-400 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
