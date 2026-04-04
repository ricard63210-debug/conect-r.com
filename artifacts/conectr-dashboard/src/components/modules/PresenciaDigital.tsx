import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, MapPin, Clock, Phone, Star, Send, Bot, User, ChevronRight } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
}

const faqAnswers: Record<string, string> = {
  horario: "Estamos abiertos de Lunes a Domingo de 13:00 a 23:00. Los Viernes y Sabados hasta las 00:30. Dias festivos consultar disponibilidad.",
  direccion: "Nos encontramos en Av. Insurgentes Sur 1234, Col. Del Valle, CDMX. A 3 minutos del Metro Insurgentes. Contamos con estacionamiento propio.",
  reserva: "Puedes hacer tu reservacion directamente en nuestro sitio web, llamando al +52 55 5555 0101, o enviando mensaje a este chat. Te confirmamos en menos de 10 minutos.",
  especialidades: "Nuestros platillos estrella son: Pozole Rojo Estilo Guerrero, Mole Negro Oaxaqueno, Cochinita Pibil de horno de tierra y nuestra famosa Tarta de Tamal. Todos hechos con ingredientes de temporada.",
  precio: "El ticket promedio por persona es de $350-$550 MXN, incluyendo bebida. Tenemos menu ejecutivo de Lunes a Viernes de $180 con sopa, plato fuerte y agua.",
  estacionamiento: "Si, contamos con estacionamiento propio con capacidad para 40 vehiculos. El costo es de $30 por hora, con 1 hora gratis al consumir en el restaurante.",
};

function detectIntent(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("horario") || lower.includes("hora") || lower.includes("abren") || lower.includes("cierran")) return "horario";
  if (lower.includes("direcci") || lower.includes("donde") || lower.includes("ubicaci") || lower.includes("como llegar")) return "direccion";
  if (lower.includes("reserva") || lower.includes("reservaci") || lower.includes("mesa") || lower.includes("apartar")) return "reserva";
  if (lower.includes("especialidad") || lower.includes("platillo") || lower.includes("comida") || lower.includes("men") || lower.includes("comer")) return "especialidades";
  if (lower.includes("precio") || lower.includes("costo") || lower.includes("cuanto") || lower.includes("ticket")) return "precio";
  if (lower.includes("estaciona") || lower.includes("parking") || lower.includes("carro")) return "estacionamiento";
  return "";
}

export default function PresenciaDigital() {
  const [activeTab, setActiveTab] = useState<"web" | "chat">("web");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "bot",
      text: "Hola! Soy el Asistente Virtual del Restaurante Maya. Puedo ayudarte con horarios, reservaciones, nuestra ubicacion y especialidades. Como puedo ayudarte hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const intent = detectIntent(userMsg.text);
      let reply = "";
      if (intent && faqAnswers[intent]) {
        reply = faqAnswers[intent];
      } else {
        reply = "Gracias por tu mensaje. Para consultas especificas, te recomiendo llamar al +52 55 5555 0101 o visitar nuestra pagina web. Nuestro equipo estara feliz de ayudarte!";
      }
      const botMsg: ChatMessage = { id: Date.now() + 1, role: "bot", text: reply };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const quickQuestions = [
    "Que horario tienen?",
    "Como llego al restaurante?",
    "Cuales son sus especialidades?",
    "Como hago una reservacion?",
    "Tienen estacionamiento?",
    "Cual es el precio promedio?",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Presencia Digital</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sitio web profesional + Asistente Virtual con IA que responde 24/7 a tus clientes,
          aumenta reservaciones y construye tu presencia online.
        </p>
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
            {/* Website preview */}
            <div className="maya-card rounded-2xl overflow-hidden border border-amber-800/20">
              {/* Browser chrome */}
              <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3 border-b border-border/40">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-400 flex items-center gap-2">
                  <Globe size={10} className="text-green-400" />
                  restaurantemaya.mx
                </div>
              </div>

              {/* Website hero */}
              <div
                className="relative flex flex-col items-center justify-center text-center py-12 px-6"
                style={{ background: "linear-gradient(135deg, #1a0f07 0%, #2d1a0a 50%, #1a0f07 100%)" }}
              >
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }} />

                <div className="relative">
                  <div className="w-16 h-16 border-2 border-amber-500/60 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-serif font-bold gold-gradient">M</span>
                  </div>
                  <h1 className="text-4xl font-serif font-bold gold-gradient mb-2">Restaurante Maya</h1>
                  <p className="text-amber-200/70 text-lg mb-6">Cocina Mexicana Autentica • CDMX</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button className="px-6 py-2.5 bg-amber-500 text-black rounded-full font-semibold text-sm hover:bg-amber-400 transition-colors">
                      Reservar Mesa
                    </button>
                    <button className="px-6 py-2.5 border border-amber-500/60 text-amber-300 rounded-full text-sm hover:bg-amber-500/10 transition-colors">
                      Ver Menu
                    </button>
                  </div>
                </div>
              </div>

              {/* Nav bar */}
              <div className="bg-gray-900/90 px-6 py-3 flex items-center justify-between border-y border-border/20">
                <div className="font-serif font-bold text-sm gold-gradient">MAYA</div>
                <div className="hidden sm:flex gap-6 text-xs text-muted-foreground">
                  {["Inicio", "Menu", "Reservaciones", "Eventos", "Contacto"].map(item => (
                    <span key={item} className="hover:text-amber-400 cursor-pointer transition-colors">{item}</span>
                  ))}
                </div>
                <button className="px-3 py-1 bg-amber-500 text-black text-xs rounded-lg font-medium">
                  Reservar
                </button>
              </div>

              {/* Info strip */}
              <div className="bg-black/30 px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: MapPin, label: "Ubicacion", value: "Insurgentes Sur 1234, CDMX" },
                  { icon: Clock, label: "Horario", value: "Lun-Dom 13:00 - 23:00" },
                  { icon: Phone, label: "Telefono", value: "+52 55 5555 0101" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon size={16} className="text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stars */}
              <div className="px-6 py-3 bg-amber-900/10 border-t border-border/20 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-amber-300 font-semibold">4.9</span>
                <span className="text-xs text-muted-foreground">• 847 resenas en Google</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Enlazado a reservas", desc: "Boton de reserva conectado directo al sistema Table Reserve", icon: ChevronRight },
                { title: "Menu digital integrado", desc: "Menu actualizable en tiempo real desde el panel del dueno", icon: ChevronRight },
                { title: "SEO local optimizado", desc: "Aparece primero en Google Maps para 'restaurante mexicano CDMX'", icon: ChevronRight },
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
                <div className="maya-card rounded-2xl overflow-hidden flex flex-col" style={{ height: "480px" }}>
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3 bg-amber-900/10">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-black" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Maya — Asistente Virtual</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> En linea 24/7
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
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === "bot" ? "bg-amber-500" : "bg-gray-700"
                        }`}>
                          {msg.role === "bot"
                            ? <Bot size={14} className="text-black" />
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
                        <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center">
                          <Bot size={14} className="text-black" />
                        </div>
                        <div className="bg-amber-900/20 border border-amber-800/30 px-3 py-2 rounded-2xl rounded-tl-sm">
                          <div className="flex gap-1">
                            {[0,1,2].map(i => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
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
                      placeholder="Escribe tu pregunta..."
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
                    <MessageCircle size={16} /> Preguntas rapidas
                  </h4>
                  <div className="space-y-2">
                    {quickQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => {
                            setInput("");
                            const userMsg: ChatMessage = { id: Date.now(), role: "user", text: q };
                            setMessages(prev => [...prev, userMsg]);
                            setIsTyping(true);
                            setTimeout(() => {
                              const intent = detectIntent(q);
                              const reply = intent ? faqAnswers[intent] : "Gracias por tu consulta. Te atenderemos a la brevedad.";
                              setMessages(prev => [...prev, { id: Date.now() + 1, role: "bot", text: reply }]);
                              setIsTyping(false);
                            }, 1000);
                          }, 100);
                        }}
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
