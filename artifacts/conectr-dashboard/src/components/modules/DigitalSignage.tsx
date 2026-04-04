import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Edit3, Check, RefreshCw, Star, Clock, Utensils, Music } from "lucide-react";

interface ScreenContent {
  title: string;
  subtitle: string;
  type: "menu" | "event" | "promo";
  bg: string;
}

const presets: ScreenContent[] = [
  {
    title: "Menu del Dia",
    subtitle: "Pozole Rojo • Enchiladas Verdes • Agua de Jamaica",
    type: "menu",
    bg: "from-amber-900/80 to-stone-900",
  },
  {
    title: "Noche Maya",
    subtitle: "Musica en Vivo • Cena Romantica • Viernes 7pm",
    type: "event",
    bg: "from-purple-900/80 to-stone-900",
  },
  {
    title: "2x1 en Margaritas",
    subtitle: "Hoy de 18:00 a 20:00 • Solo con reservacion",
    type: "promo",
    bg: "from-orange-900/80 to-stone-900",
  },
];

export default function DigitalSignage() {
  const [activeContent, setActiveContent] = useState<ScreenContent>(presets[0]);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleUpdate = (content: ScreenContent) => {
    setUpdating(true);
    setTimeout(() => {
      setActiveContent(content);
      setUpdating(false);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 2500);
    }, 1200);
  };

  const handleCustomUpdate = () => {
    if (!editTitle.trim()) return;
    handleUpdate({
      title: editTitle,
      subtitle: editSubtitle,
      type: "promo",
      bg: "from-teal-900/80 to-stone-900",
    });
    setEditMode(false);
    setEditTitle("");
    setEditSubtitle("");
    setCustomMessage("Pantallas actualizadas en tiempo real");
    setTimeout(() => setCustomMessage(""), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Pantallas Digitales — Digital Signage</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Controla todas las pantallas de tu restaurante desde tu celular.
          Cambia el menu, anuncia eventos o promociones con un solo clic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TV Screens simulation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Monitor size={20} /> Pantallas del Restaurante
          </h3>

          {/* Main boarding screen */}
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
                        <p className="text-amber-300 text-sm">Actualizando pantallas...</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeContent.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`w-full h-full bg-gradient-to-br ${activeContent.bg} relative flex flex-col items-center justify-center p-8`}
                    >
                      {/* Background texture */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #d4a017 25%, transparent 25%, transparent 75%, #d4a017 75%, #d4a017), repeating-linear-gradient(45deg, #d4a017 25%, transparent 25%, transparent 75%, #d4a017 75%, #d4a017)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 10px 10px"
                      }} />

                      {/* Content */}
                      <div className="text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-600/40 rounded-full mb-4">
                          {activeContent.type === "menu" && <Utensils size={14} className="text-amber-400" />}
                          {activeContent.type === "event" && <Music size={14} className="text-amber-400" />}
                          {activeContent.type === "promo" && <Star size={14} className="text-amber-400" />}
                          <span className="text-xs text-amber-300 uppercase tracking-widest">
                            {activeContent.type === "menu" ? "Menu de Hoy" : activeContent.type === "event" ? "Evento Especial" : "Promocion"}
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
                          {activeContent.title}
                        </h2>
                        <p className="text-amber-200/80 text-lg">{activeContent.subtitle}</p>

                        {/* Bottom bar */}
                        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-8">
                          <span className="text-xs text-white/40 font-serif">RESTAURANTE MAYA</span>
                          <div className="flex items-center gap-1 text-xs text-white/40">
                            <Clock size={10} />
                            <span>Lun-Dom 13:00-23:00</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* TV stand */}
            <div className="flex justify-center mt-1">
              <div className="w-16 h-2 bg-gray-700 rounded" />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-1.5 bg-gray-800 rounded" />
            </div>
          </div>

          {/* Multiple small screens */}
          <div className="grid grid-cols-2 gap-3">
            {["Barra", "Terraza"].map((location) => (
              <div key={location} className="bg-gray-900 rounded-xl p-1 border-2 border-gray-700">
                <div className="bg-gray-950 rounded-lg overflow-hidden">
                  <div
                    className={`bg-gradient-to-br ${activeContent.bg} flex flex-col items-center justify-center p-3`}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <p className="text-xs text-amber-300 font-serif font-bold text-center">{activeContent.title}</p>
                    <p className="text-xs text-amber-200/60 text-center mt-1" style={{ fontSize: "9px" }}>{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {updated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-700/40 rounded-xl px-4 py-2.5"
            >
              <Check size={16} /> 3 pantallas actualizadas en tiempo real
              {customMessage && ` — ${customMessage}`}
            </motion.div>
          )}
        </div>

        {/* Control panel — owner's phone */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Smartphone size={20} /> Control desde el Celular del Dueno
          </h3>

          {/* Phone mockup */}
          <div className="mx-auto w-64 bg-gray-950 rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden" style={{ minHeight: "480px" }}>
            <div className="p-4 space-y-3">
              <div className="text-center mb-4">
                <div className="text-xs text-muted-foreground">Panel de Control</div>
                <div className="text-sm font-semibold gold-gradient font-serif">Restaurante Maya</div>
              </div>

              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Contenido rapido</div>

              <div className="space-y-2">
                {presets.map((preset) => (
                  <motion.button
                    key={preset.title}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleUpdate(preset)}
                    data-testid={`preset-btn-${preset.type}`}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                      activeContent.title === preset.title
                        ? "border-amber-600/60 bg-amber-500/10"
                        : "border-gray-800 bg-gray-900/60"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${preset.bg.replace("/80", "")} flex items-center justify-center shrink-0`}>
                      {preset.type === "menu" && <Utensils size={14} className="text-white" />}
                      {preset.type === "event" && <Music size={14} className="text-white" />}
                      {preset.type === "promo" && <Star size={14} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{preset.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate" style={{ maxWidth: "150px" }}>{preset.subtitle}</div>
                    </div>
                    {activeContent.title === preset.title && (
                      <Check size={14} className="text-amber-400 ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="border-t border-border/40 pt-3">
                <button
                  onClick={() => setEditMode(!editMode)}
                  data-testid="custom-content-btn"
                  className="w-full flex items-center gap-2 p-3 rounded-xl border border-dashed border-amber-700/40 text-amber-400 text-xs hover:bg-amber-500/5 transition-colors"
                >
                  <Edit3 size={14} />
                  Mensaje personalizado
                </button>
              </div>

              <AnimatePresence>
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <input
                      type="text"
                      placeholder="Titulo..."
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Descripcion..."
                      value={editSubtitle}
                      onChange={e => setEditSubtitle(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={handleCustomUpdate}
                      className="w-full py-2 bg-amber-500 text-black text-xs rounded-lg font-semibold"
                    >
                      Actualizar todas las pantallas
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Feature callout */}
          <div className="maya-card rounded-xl p-4 border border-amber-800/30">
            <div className="text-sm font-semibold text-amber-400 mb-2">Cambio en un Clic</div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {[
                "Actualiza menu, eventos o promos desde cualquier lugar",
                "Las 3 pantallas del local se sincronizan en segundos",
                "Programa contenido con anticipacion por dias y horas",
                "Sin necesidad de IT ni tecnico en sitio",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={12} className="text-amber-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
