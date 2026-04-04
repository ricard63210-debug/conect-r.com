import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Calendar, Image, Grid, ChevronLeft, ChevronRight, Instagram, Facebook, Plus, Check, Sparkles } from "lucide-react";

const menuTemplates = [
  {
    id: 1,
    name: "Elegante Oscuro",
    bg: "from-stone-900 to-amber-950",
    accent: "text-amber-400",
    border: "border-amber-700/40",
    preview: "bg-gradient-to-br from-stone-900 to-amber-950",
  },
  {
    id: 2,
    name: "Madera Rustica",
    bg: "from-amber-900 to-stone-800",
    accent: "text-orange-300",
    border: "border-orange-700/40",
    preview: "bg-gradient-to-br from-amber-900 to-stone-800",
  },
  {
    id: 3,
    name: "Moderno Minimalista",
    bg: "from-gray-900 to-neutral-900",
    accent: "text-white",
    border: "border-white/20",
    preview: "bg-gradient-to-br from-gray-900 to-neutral-900",
  },
];

const daysOfWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const contentCalendar: Record<string, { type: string; text: string; platform: "ig" | "fb" | "both" }> = {
  "0": { type: "foto", text: "Pozole Rojo — receta de abuela", platform: "ig" },
  "1": { type: "story", text: "Detras de la cocina — Chef Mario", platform: "ig" },
  "2": { type: "promo", text: "Noche Maya este Viernes — Reserva YA", platform: "both" },
  "3": { type: "reel", text: "Como preparamos nuestra Cochinita", platform: "ig" },
  "4": { type: "evento", text: "Noche Maya • Musica en Vivo • 8pm", platform: "both" },
  "5": { type: "foto", text: "Mesa romantica para dos — te esperamos", platform: "ig" },
  "6": { type: "promo", text: "Brunch Dominical 11am-3pm", platform: "both" },
};

const colorMap: Record<string, string> = {
  foto: "bg-blue-500/20 border-blue-700/40 text-blue-300",
  story: "bg-purple-500/20 border-purple-700/40 text-purple-300",
  promo: "bg-amber-500/20 border-amber-700/40 text-amber-300",
  reel: "bg-pink-500/20 border-pink-700/40 text-pink-300",
  evento: "bg-green-500/20 border-green-700/40 text-green-300",
};

export default function ModuloCreativo() {
  const [activeTab, setActiveTab] = useState<"menu" | "calendar">("menu");
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [addingPost, setAddingPost] = useState(false);
  const [newPostText, setNewPostText] = useState("");

  const template = menuTemplates[selectedTemplate];

  const menuItems = [
    { category: "Antojitos", items: [
      { name: "Tostadas de Tinga", price: "$85", photo: "🥗" },
      { name: "Quesadillas de Flor de Calabaza", price: "$95", photo: "🫓" },
    ]},
    { category: "Platos Principales", items: [
      { name: "Pozole Rojo Estilo Guerrero", price: "$195", photo: "🍲" },
      { name: "Mole Negro Oaxaqueno", price: "$225", photo: "🍗" },
      { name: "Cochinita Pibil de Horno", price: "$210", photo: "🥩" },
    ]},
    { category: "Postres", items: [
      { name: "Tarta de Tamal Dulce", price: "$85", photo: "🍮" },
    ]},
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Modulo Creativo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Disena tu menu con plantillas premium y planifica tu contenido para redes sociales
          con un calendario intuitivo de publicaciones.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "menu", label: "Diseno de Menu", icon: Palette },
          { id: "calendar", label: "Planificador Social", icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "menu" | "calendar")}
            data-testid={`creativo-tab-${tab.id}`}
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
        {activeTab === "menu" ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Template picker */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Grid size={20} /> Plantillas de Menu
              </h3>
              <div className="flex gap-4">
                {menuTemplates.map((tmpl, idx) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(idx)}
                    data-testid={`template-btn-${idx}`}
                    className={`flex-1 h-20 rounded-xl ${tmpl.preview} border-2 transition-all relative overflow-hidden ${
                      selectedTemplate === idx ? "border-amber-400 scale-105" : "border-transparent opacity-70 hover:opacity-90"
                    }`}
                  >
                    <div className={`absolute inset-0 flex flex-col items-center justify-center ${tmpl.accent}`}>
                      <div className="text-xs font-serif font-bold">{tmpl.name}</div>
                      {selectedTemplate === idx && (
                        <Check size={14} className="mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu preview */}
            <motion.div
              layout
              key={selectedTemplate}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl overflow-hidden bg-gradient-to-br ${template.bg} border ${template.border}`}
            >
              {/* Menu header */}
              <div className={`relative text-center py-8 px-6 border-b ${template.border}`}>
                <div className="absolute top-4 left-6 w-8 h-8 border border-amber-700/40 rounded-full" />
                <div className="absolute top-4 right-6 w-8 h-8 border border-amber-700/40 rounded-full" />
                <div className={`text-xs uppercase tracking-widest ${template.accent} mb-2`}>CARTA</div>
                <h1 className={`text-4xl font-serif font-bold ${template.accent}`}>Restaurante Maya</h1>
                <p className={`text-sm mt-2 opacity-60 ${template.accent}`}>Cocina Mexicana de Autor</p>
              </div>

              {/* Menu items */}
              <div className="p-6 space-y-6">
                {menuItems.map(section => (
                  <div key={section.category}>
                    <div className={`text-xs uppercase tracking-widest ${template.accent} mb-3 flex items-center gap-3`}>
                      <div className={`h-px flex-1 bg-current opacity-30`} />
                      {section.category}
                      <div className={`h-px flex-1 bg-current opacity-30`} />
                    </div>
                    <div className="space-y-3">
                      {section.items.map(item => (
                        <div key={item.name} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl shrink-0">
                            {item.photo}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${template.accent}`}>{item.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">Con ingredientes de temporada</div>
                          </div>
                          <div className={`text-lg font-serif font-bold ${template.accent}`}>{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={`text-center py-4 border-t ${template.border} text-xs text-muted-foreground`}>
                restaurantemaya.mx • Reservaciones: +52 55 5555 0101
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Image, title: "Fotos HD incluidas", desc: "Galeria de +500 fotos profesionales de platillos mexicanos" },
                { icon: Palette, title: "50+ plantillas", desc: "Diseños modernos para cada estilo de restaurante" },
                { icon: Sparkles, title: "Actualizacion instant.", desc: "Cambios en el menu se reflejan en el sitio y pantallas al instante" },
              ].map(item => (
                <div key={item.title} className="maya-card rounded-xl p-4 flex gap-3">
                  <item.icon size={18} className="text-amber-400 shrink-0 mt-0.5" />
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
            key="calendar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Instagram size={20} /> Planificador de Contenido Social
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-lg border border-border hover:border-amber-700/40">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-muted-foreground px-2">Sem {weekOffset === 0 ? "actual" : weekOffset > 0 ? `+${weekOffset}` : weekOffset}</span>
                <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg border border-border hover:border-amber-700/40">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {Object.entries({ foto: "Foto", story: "Story", promo: "Promo", reel: "Reel", evento: "Evento" }).map(([type, label]) => (
                <div key={type} className={`text-xs px-2 py-1 rounded-full border ${colorMap[type]}`}>{label}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day, idx) => {
                const post = contentCalendar[String(idx)];
                const isSelected = selectedDay === String(idx);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(isSelected ? null : String(idx))}
                    data-testid={`calendar-day-${idx}`}
                    className={`rounded-xl border p-2 text-center transition-all min-h-24 flex flex-col items-center ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-border hover:border-amber-700/30"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    {post ? (
                      <div className={`text-xs px-1.5 py-0.5 rounded-full border ${colorMap[post.type]} w-full text-center`}>
                        {post.type}
                      </div>
                    ) : (
                      <div className="w-full flex-1 flex items-center justify-center">
                        <Plus size={12} className="text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="mt-1 flex gap-0.5 justify-center">
                      {post?.platform === "ig" || post?.platform === "both" ? <Instagram size={8} className="text-pink-400" /> : null}
                      {post?.platform === "fb" || post?.platform === "both" ? <Facebook size={8} className="text-blue-400" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected day detail */}
            <AnimatePresence>
              {selectedDay !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="maya-card rounded-xl p-5 border border-amber-800/30"
                >
                  {contentCalendar[selectedDay] ? (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-primary">
                          {daysOfWeek[parseInt(selectedDay)]} — Publicacion programada
                        </h4>
                        <div className={`text-xs px-2 py-1 rounded-full border ${colorMap[contentCalendar[selectedDay].type]}`}>
                          {contentCalendar[selectedDay].type}
                        </div>
                      </div>
                      <p className="text-sm text-foreground mb-3">{contentCalendar[selectedDay].text}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Publicar en:</span>
                        <div className="flex gap-2">
                          {(contentCalendar[selectedDay].platform === "ig" || contentCalendar[selectedDay].platform === "both") && (
                            <span className="flex items-center gap-1 text-xs text-pink-400"><Instagram size={12} /> Instagram</span>
                          )}
                          {(contentCalendar[selectedDay].platform === "fb" || contentCalendar[selectedDay].platform === "both") && (
                            <span className="flex items-center gap-1 text-xs text-blue-400"><Facebook size={12} /> Facebook</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-3">
                        {daysOfWeek[parseInt(selectedDay)]} — Sin publicacion
                      </h4>
                      <AnimatePresence>
                        {addingPost ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-3"
                          >
                            <input
                              type="text"
                              placeholder="Describe el contenido a publicar..."
                              value={newPostText}
                              onChange={e => setNewPostText(e.target.value)}
                              className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setAddingPost(false); setNewPostText(""); }}
                                className="px-4 py-2 bg-amber-500 text-black text-sm rounded-lg font-medium"
                              >
                                Agregar
                              </button>
                              <button onClick={() => setAddingPost(false)} className="px-4 py-2 border border-border rounded-lg text-sm">
                                Cancelar
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => setAddingPost(true)}
                            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            <Plus size={16} /> Agregar publicacion para este dia
                          </button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Engagement promedio", value: "+185%", desc: "vs publicacion espontanea" },
                { label: "Alcance semanal", value: "12,400", desc: "personas unicas por semana" },
                { label: "Nuevos seguidores/mes", value: "+340", desc: "crecimiento organico" },
                { label: "Conversiones a reserva", value: "8.2%", desc: "de visitas a perfil social" },
              ].map(stat => (
                <div key={stat.label} className="maya-card rounded-xl p-4">
                  <div className="text-2xl font-bold gold-gradient font-serif">{stat.value}</div>
                  <div className="text-sm font-medium mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
