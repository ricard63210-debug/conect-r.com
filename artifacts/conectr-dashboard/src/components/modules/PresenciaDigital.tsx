import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, MapPin, Clock, Phone, Star, Send, Bot, User, ChevronRight, ExternalLink, Instagram, Facebook } from "lucide-react";
import ImpactPills from "@/components/ImpactPills";

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
}

const faqAnswers: Record<string, string> = {
  horario: "Carmelitas abre Lunes a Jueves de 11:00 AM a 9:00 PM, Viernes y Sabado de 11:00 AM a 10:00 PM, y Domingos de 11:00 AM a 8:00 PM. Visita carmelitas-psi.vercel.app para horarios actualizados.",
  direccion: "Nos encuentras en el area de Sacramento, CA. Para ubicacion exacta y como llegar, visita carmelitas-psi.vercel.app o busca 'Carmelita's Kitchen de Mexico' en Google Maps.",
  reserva: "Puedes hacer tu reservacion en tablereserve.conect-r.com, seguirnos en Instagram @carmelitasgroup o visitarnos directamente. Para grupos grandes te recomendamos reservar con anticipacion.",
  especialidades: "En Carmelita's destacan los Tacos de Birria, el Mole autentico, Enchiladas, Fajitas y los famosos Chilaquiles. Cocina mexicana autentica con un ambiente de Mexican Bar & Grill que te va a encantar.",
  eventos: "Tenemos promociones especiales, Happy Hour con bebidas 2x1, y eventos de fin de semana. Siguenos en @carmelitasgroup en Instagram para ver todos los eventos y promociones especiales.",
  instagram: "Siguenos en Instagram como @carmelitasgroup para ver nuestros platillos, eventos especiales, reels y los mejores momentos de Carmelita's. Tambien estamos en Facebook como Carmelitas Mexican Bar & Grill.",
  tacos: "Nuestros tacos mas populares incluyen Birria, Al Pastor, Carnitas, Pollo y opciones vegetarianas. Tortillas de maiz hechas a mano y salsas caseras que complementan cada platillo a la perfeccion.",
  margaritas: "Tenemos margaritas clasicas, de frutas y opciones especiales de la casa. Durante Happy Hour tenemos bebidas con descuento — consulta nuestro Instagram @carmelitasgroup para las promociones actuales.",
  brunch: "Tenemos opciones de brunch con platillos mexicanos autenticos, mimosas y un ambiente familiar inigualable. Visita carmelitas-psi.vercel.app para ver el menu completo.",
};

function detectIntent(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("horario") || lower.includes("hora") || lower.includes("abren") || lower.includes("cierran") || lower.includes("abierto")) return "horario";
  if (lower.includes("direcci") || lower.includes("donde") || lower.includes("ubicaci") || lower.includes("como llegar") || lower.includes("sacramento")) return "direccion";
  if (lower.includes("reserva") || lower.includes("mesa") || lower.includes("apartar") || lower.includes("book")) return "reserva";
  if (lower.includes("especialidad") || lower.includes("platillo") || lower.includes("comida") || lower.includes("men") || lower.includes("comer") || lower.includes("recomienda")) return "especialidades";
  if (lower.includes("evento") || lower.includes("noche") || lower.includes("mariachi") || lower.includes("actividad")) return "eventos";
  if (lower.includes("instagram") || lower.includes("face") || lower.includes("red social") || lower.includes("seguir")) return "instagram";
  if (lower.includes("taco")) return "tacos";
  if (lower.includes("margarita") || lower.includes("bebida") || lower.includes("trago") || lower.includes("drink")) return "margaritas";
  if (lower.includes("brunch") || lower.includes("domingo") || lower.includes("mimosa") || lower.includes("desayuno")) return "brunch";
  return "";
}

export default function PresenciaDigital() {
  const [activeTab, setActiveTab] = useState<"web" | "chat">("web");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "bot",
      text: "Hola! Bienvenido a Carmelita's Kitchen de Mexico 🌮 Soy el asistente virtual de Carmelitas. Puedo ayudarte con horarios, reservaciones, ubicacion, eventos y platillos. Como puedo ayudarte hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const reply = intent && faqAnswers[intent]
        ? faqAnswers[intent]
        : "Gracias por tu mensaje! Para mas informacion visita carmelitas-psi.vercel.app, siguenos en @carmelitasgroup en Instagram o en Facebook como Carmelitas Mexican Bar & Grill. Con gusto te ayudamos.";
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: reply }]);
      setIsTyping(false);
    }, 1100 + Math.random() * 700);
  };

  const handleSend = () => { if (input.trim()) sendMessage(input.trim()); };

  const quickQuestions = [
    "Cual es el horario?",
    "Donde estan ubicados?",
    "Que eventos tienen?",
    "Me recomiendan algo?",
    "Como hago una reservacion?",
    "Tienen brunch dominical?",
    "Que tal son sus tacos?",
    "Cuales son sus margaritas?",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Presencia Digital</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sitio web profesional + Asistente Virtual con IA que responde 24/7 a tus clientes
          con informacion real de Carmelita's Kitchen de Mexico.
        </p>
        <ImpactPills />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "web", label: "Web Builder", icon: Globe },
          { id: "chat", label: "AI Concierge", icon: Bot },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "web" | "chat")}
            data-testid={`presencia-tab-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-amber-500 text-black"
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
            {/* Website preview — live iframe */}
            <div className="maya-card rounded-2xl overflow-hidden border border-amber-800/20">
              {/* Browser chrome */}
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
              {/* Live iframe */}
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
              {[
                { title: "Reservas en linea", desc: "Boton conectado directo a Table Reserve donde los clientes reservan en tiempo real", icon: ChevronRight },
                { title: "Menu digital integrado", desc: "Carta actualizada con fotos, descripcion de platillos y eventos de temporada", icon: ChevronRight },
                { title: "SEO local optimizado", desc: "Visible en Google Maps para 'restaurante mexicano Sacramento' y busquedas cercanas", icon: ChevronRight },
              ].map(item => (
                <div key={item.title} className="maya-card rounded-xl p-4 flex gap-3">
                  <item.icon size={16} className="text-amber-400 mt-0.5 shrink-0" />
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
                  <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3 bg-amber-900/10">
                    <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-9 h-9 rounded-full object-cover border border-amber-700/40" style={{ filter: "brightness(0.8)" }} />
                    <div>
                      <div className="text-sm font-semibold">Carmelita — Asistente Virtual</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En linea 24/7 • Sacramento, CA
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
                            ? "bg-amber-900/20 border border-amber-800/30 text-foreground rounded-tl-sm"
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
                        <div className="bg-amber-900/20 border border-amber-800/30 px-3 py-2 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1">
                            {[0,1,2].map(i => (
                              <div key={i} className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
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
                      placeholder="Pregunta sobre horarios, eventos, menu..."
                      data-testid="chat-input"
                      className="flex-1 bg-muted/20 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={handleSend}
                      data-testid="chat-send-btn"
                      className="w-9 h-9 bg-amber-500 text-black rounded-xl flex items-center justify-center hover:bg-amber-400 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick questions + info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <MessageCircle size={16} /> Preguntas frecuentes
                  </h4>
                  <div className="space-y-1.5">
                    {quickQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs px-3 py-2.5 bg-muted/20 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-amber-700/40 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="maya-card rounded-xl p-4 border border-amber-800/20">
                  <div className="text-xs font-semibold text-amber-400 mb-2">AI Concierge — Impacto</div>
                  <div className="space-y-2">
                    {[
                      { label: "Consultas respondidas", value: "94%" },
                      { label: "Ahorro en atencion telefonica", value: "3h/dia" },
                      { label: "Conversion a reserva", value: "+42%" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-amber-400 font-semibold">{item.value}</span>
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
