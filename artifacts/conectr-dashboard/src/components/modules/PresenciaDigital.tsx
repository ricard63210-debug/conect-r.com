import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageCircle, MapPin, Clock, Phone, Star, Send, Bot, User, ChevronRight, ExternalLink, Instagram, Facebook } from "lucide-react";

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
}

const faqAnswers: Record<string, string> = {
  horario: "Abrimos Martes a Jueves de 5:00 PM a 10:00 PM. Viernes y Sabado de 5:00 PM a 11:00 PM. Domingos: Brunch de 11:00 AM a 3:00 PM y cena de 5:00 PM a 10:00 PM. Lunes cerrado. Happy Hour: Martes a Jueves de 5pm a 7pm.",
  direccion: "Nos encuentras en Sacramento, CA. Para ver la ubicacion exacta y como llegar, visita mayacantina.toast.site o busca 'Maya Cantina Sacramento' en Google Maps. Tambien puedes llamarnos y te damos indicaciones.",
  reserva: "Puedes hacer tu reservacion en mayacantina.toast.site/events, seguirnos en Instagram @mayacantinasac o llamarnos directamente. Para grupos de 8 o mas personas, te recomendamos reservar con anticipacion.",
  especialidades: "Nuestros platillos estrella son el Mole Negro Oaxaqueno con pollo, los Tacos de Birria con consomme, las Carnitas confitadas, el Chile en Nogada de temporada y los Camarones al Mezcal. Todo hecho con recetas autenticas y ingredientes frescos.",
  eventos: "Tenemos Noches de Mariachi los Viernes y Sabados a las 8pm, Happy Hour Martes-Jueves 5pm-7pm con 2x1 en Margaritas, Brunch Dominical con Mimosas de 11am a 3pm, y Taco Tuesday con tacos desde $3. Visita mayacantina.toast.site/events para ver todos los eventos.",
  instagram: "Siguenos en Instagram como @mayacantinasac para ver nuestros platos, eventos especiales, stories y los mejores momentos de Maya Cantina Sacramento. Tambien estamos en Facebook como Maya Cantina SAC.",
  tacos: "Nuestros tacos mas populares son: Al Pastor (cerdo adobado con pina), Birria (res estofada en consomme con queso), Camarones a la diabla, Hongos con epazote, y Carnitas confitadas. Tortillas de maiz hechas a mano.",
  margaritas: "Nuestras margaritas son con tequila 100% agave y jugo de limon fresco exprimido al momento. Ofrecemos Clasica, de Tamarindo, de Fresa y de Pepino con Chile. Durante Happy Hour son 2x1 — Martes a Jueves de 5pm a 7pm.",
  brunch: "Nuestro Brunch Dominical es de 11am a 3pm con Mimosas, Micheladas, Huevos Rancheros, Chilaquiles, Enchiladas de Mole y mucho mas. Una experiencia tipicamente mexicana para el domingo.",
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
      text: "Hola! Bienvenido a Maya Cantina Sacramento 🌮 Soy el asistente virtual de Maya. Puedo ayudarte con horarios, reservaciones, nuestra ubicacion, eventos y platillos. Como puedo ayudarte hoy?"
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
        : "Gracias por tu mensaje! Para mas informacion visita mayacantina.toast.site, llamanos directamente o siguenos en @mayacantinasac en Instagram. Con gusto te ayudamos.";
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
          con informacion real de Maya Cantina Sacramento.
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
                <a
                  href="https://mayacantina.toast.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-300 flex items-center gap-2 hover:bg-gray-700 transition-colors"
                >
                  <Globe size={10} className="text-green-400 shrink-0" />
                  mayacantina.toast.site
                  <ExternalLink size={9} className="text-gray-500 ml-auto" />
                </a>
              </div>

              {/* Nav bar */}
              <div className="bg-gray-950 px-5 py-3 flex items-center justify-between border-b border-border/20">
                <div className="flex items-center gap-2">
                  <img src="/maya-logo.jpeg" alt="Maya Cantina" className="h-8 object-contain" />
                </div>
                <div className="hidden sm:flex gap-5 text-xs text-muted-foreground">
                  {["Menu", "Eventos", "Reservar", "Contacto"].map(item => (
                    <span key={item} className="hover:text-amber-400 cursor-pointer transition-colors">{item}</span>
                  ))}
                </div>
                <button className="px-3 py-1.5 bg-amber-500 text-black text-xs rounded-lg font-semibold">
                  Reservar Mesa
                </button>
              </div>

              {/* Hero */}
              <div
                className="relative flex flex-col items-center justify-center text-center py-14 px-6"
                style={{ background: "linear-gradient(135deg, #0d0a06 0%, #1e1309 40%, #0d0a06 100%)" }}
              >
                {/* Subtle cross pattern */}
                <div className="absolute inset-0 opacity-8" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8921a' fill-opacity='0.25'%3E%3Cpath d='M21 19h2v2h-2v2h-2v-2h-2v-2h2v-2h2v2zm0-10h2v2h-2v2h-2v-2h-2v-2h2v-2h2v2zm0 20h2v2h-2v2h-2v-2h-2v-2h2v-2h2v2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }} />

                <div className="relative z-10">
                  <img src="/maya-logo.jpeg" alt="Maya Cantina" className="h-24 object-contain mx-auto mb-5" />
                  <h1 className="text-4xl font-serif font-bold gold-gradient mb-2">Maya Cantina</h1>
                  <p className="text-amber-200/70 text-lg mb-7">Cocina Mexicana Autentica • Sacramento, CA</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a
                      href="https://mayacantina.toast.site/events"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-amber-500 text-black rounded-full font-semibold text-sm hover:bg-amber-400 transition-colors"
                    >
                      Reservar Mesa
                    </a>
                    <a
                      href="https://mayacantina.toast.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 border border-amber-500/60 text-amber-300 rounded-full text-sm hover:bg-amber-500/10 transition-colors"
                    >
                      Ver Menu
                    </a>
                  </div>
                </div>
              </div>

              {/* Info strip */}
              <div className="bg-black/40 px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/20">
                {[
                  { icon: MapPin, label: "Ubicacion", value: "Sacramento, California" },
                  { icon: Clock, label: "Horario", value: "Mar-Dom • 5pm–10pm | Dom Brunch 11am" },
                  { icon: Phone, label: "Reservaciones", value: "mayacantina.toast.site" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stars + social */}
              <div className="px-6 py-3 bg-amber-900/10 border-t border-border/20 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-amber-300 font-semibold">4.9</span>
                  <span className="text-xs text-muted-foreground">Google Reviews</span>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.instagram.com/mayacantinasac" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors">
                    <Instagram size={12} /> @mayacantinasac
                  </a>
                  <a href="https://www.facebook.com/Mayarestaurantsac" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    <Facebook size={12} /> Maya Cantina SAC
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Reservas en linea", desc: "Boton conectado directo a Toast donde los clientes reservan en tiempo real", icon: ChevronRight },
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
                    <img src="/maya-logo.jpeg" alt="Maya" className="w-9 h-9 rounded-full object-cover border border-amber-700/40" />
                    <div>
                      <div className="text-sm font-semibold">Maya — Asistente Virtual</div>
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
                            ? <img src="/maya-logo.jpeg" alt="Maya" className="w-full h-full object-cover" />
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
                          <img src="/maya-logo.jpeg" alt="Maya" className="w-full h-full object-cover" />
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
