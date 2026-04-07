import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Grid, Check, ExternalLink, Star } from "lucide-react";

const menuTemplates = [
  {
    id: 1,
    name: "Elegante Oscuro",
    bg: "from-stone-900 to-amber-950",
    accentColor: "#c9a227",
    accentClass: "text-amber-400",
    border: "border-amber-700/40",
    preview: "bg-gradient-to-br from-stone-900 to-amber-950",
    mutedClass: "text-amber-400/50",
    lineClass: "border-amber-700/30",
    descClass: "text-stone-400",
    footerClass: "text-stone-500",
  },
  {
    id: 2,
    name: "Madera Rustica",
    bg: "from-amber-900 to-stone-800",
    accentColor: "#f4a261",
    accentClass: "text-orange-300",
    border: "border-orange-700/40",
    preview: "bg-gradient-to-br from-amber-900 to-stone-800",
    mutedClass: "text-orange-300/50",
    lineClass: "border-orange-700/30",
    descClass: "text-amber-200/60",
    footerClass: "text-stone-400",
  },
  {
    id: 3,
    name: "Moderno Minimalista",
    bg: "from-zinc-950 to-neutral-900",
    accentColor: "#e5e5e5",
    accentClass: "text-white",
    border: "border-white/15",
    preview: "bg-gradient-to-br from-zinc-950 to-neutral-900",
    mutedClass: "text-white/40",
    lineClass: "border-white/10",
    descClass: "text-neutral-400",
    footerClass: "text-neutral-500",
  },
];

const MENU_SECTIONS = [
  {
    category: "BRUNCH",
    items: [
      { name: "Chilaquiles Maya", price: "$19", star: true },
      { name: "Huevos Rancheros", price: "$16" },
      { name: "Pancakes de Cajeta", price: "$14" },
    ],
  },
  {
    category: "STARTERS",
    items: [
      { name: "Birria Egg Rolls", price: "$13", star: true },
      { name: "Pork Belly Bites", price: "$12" },
      { name: "Guacamole Maya", price: "$11" },
      { name: "Elote Loco", price: "$9" },
    ],
  },
  {
    category: "TACOS",
    items: [
      { name: "Taco Maya", price: "$16", star: true },
      { name: "Taco de Birria", price: "$15" },
      { name: "Taco de Carnitas", price: "$14" },
      { name: "Taco Vegano", price: "$13" },
    ],
  },
  {
    category: "MARISCOS",
    items: [
      { name: "Ceviche Maya", price: "$18" },
      { name: "Tostadas de Atún", price: "$17", star: true },
      { name: "Aguachile Verde", price: "$19" },
    ],
  },
  {
    category: "PLATOS FUERTES",
    items: [
      { name: "Mole Negro", price: "$22", star: true },
      { name: "Arrachera a la Parrilla", price: "$26" },
      { name: "Chile en Nogada", price: "$24" },
      { name: "Camarones al Mezcal", price: "$25" },
    ],
  },
  {
    category: "DRINKS",
    items: [
      { name: "Margarita Clásica", price: "$12" },
      { name: "Margarita de Tamarindo", price: "$13" },
      { name: "Mezcal Negroni", price: "$14" },
      { name: "Michelada Maya", price: "$10" },
      { name: "Agua de Jamaica", price: "$5" },
    ],
  },
];

export default function ModuloCreativo() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const tmpl = menuTemplates[selectedTemplate];

  const handleOpenPrint = () => {
    window.open(`${window.location.origin}/maya-menu-print/`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Diseño de Menú</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conect-R diseña y entrega tu menú físico listo para imprimir en tres estilos elegantes
          que reflejan la identidad de Maya Cantina.
        </p>
      </div>

      {/* Template picker */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-primary flex items-center gap-2">
          <Grid size={18} /> Elige el estilo de tu menú
        </h3>
        <div className="flex gap-3">
          {menuTemplates.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(idx)}
              data-testid={`template-btn-${idx}`}
              className={`flex-1 h-20 rounded-xl ${t.preview} border-2 transition-all relative overflow-hidden ${
                selectedTemplate === idx
                  ? "border-amber-400 scale-105 shadow-lg shadow-amber-900/30"
                  : "border-transparent opacity-60 hover:opacity-85"
              }`}
            >
              <div className={`absolute inset-0 flex flex-col items-center justify-center ${t.accentClass}`}>
                <div className="text-xs font-serif font-bold uppercase tracking-wide leading-tight px-2 text-center">
                  {t.name}
                </div>
                {selectedTemplate === idx && (
                  <Check size={13} className="mt-1.5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Menu preview */}
      <motion.div
        key={selectedTemplate}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className={`rounded-2xl overflow-hidden bg-gradient-to-br ${tmpl.bg} border ${tmpl.border}`}
      >
        {/* Cover header */}
        <div className={`relative text-center py-8 px-6 border-b ${tmpl.lineClass}`}>
          {/* Ornament corners */}
          <div className={`absolute top-4 left-5 w-7 h-7 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute top-4 right-5 w-7 h-7 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute bottom-4 left-5 w-5 h-5 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute bottom-4 right-5 w-5 h-5 border ${tmpl.lineClass} rounded-full`} />

          <div className={`text-[10px] uppercase tracking-[0.25em] ${tmpl.mutedClass} mb-1`}>CARTA</div>
          <h1 className={`text-3xl font-serif font-bold ${tmpl.accentClass}`} style={{ fontFamily: "Cinzel, Georgia, serif" }}>
            Maya Cantina
          </h1>
          <p className={`text-xs mt-1.5 ${tmpl.mutedClass} tracking-wider`}>
            Cocina Mexicana Auténtica · Sacramento, CA
          </p>
          <div className={`w-24 h-px mx-auto mt-3 bg-current ${tmpl.mutedClass}`} />
        </div>

        {/* Two-column menu */}
        <div className="grid grid-cols-2 gap-0 divide-x divide-white/5">
          {/* Left column */}
          <div className="p-5 space-y-4">
            {MENU_SECTIONS.slice(0, 3).map(section => (
              <div key={section.category}>
                <div className={`text-[9px] uppercase tracking-[0.22em] ${tmpl.accentClass} mb-2 flex items-center gap-2`}>
                  <span className={`h-px flex-1 bg-current opacity-25`} />
                  {section.category}
                  <span className={`h-px flex-1 bg-current opacity-25`} />
                </div>
                <div className="space-y-1.5">
                  {section.items.map(item => (
                    <div key={item.name} className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-1 min-w-0">
                        {item.star && <Star size={8} className={`${tmpl.accentClass} shrink-0`} fill="currentColor" />}
                        <span className={`text-[10px] font-medium ${tmpl.accentClass} truncate`}>{item.name}</span>
                      </div>
                      <div className={`flex items-center gap-1 shrink-0`}>
                        <span className={`border-b border-dotted ${tmpl.lineClass} w-4`} />
                        <span className={`text-[10px] font-bold ${tmpl.accentClass}`}>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="p-5 space-y-4">
            {MENU_SECTIONS.slice(3).map(section => (
              <div key={section.category}>
                <div className={`text-[9px] uppercase tracking-[0.22em] ${tmpl.accentClass} mb-2 flex items-center gap-2`}>
                  <span className={`h-px flex-1 bg-current opacity-25`} />
                  {section.category}
                  <span className={`h-px flex-1 bg-current opacity-25`} />
                </div>
                <div className="space-y-1.5">
                  {section.items.map(item => (
                    <div key={item.name} className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-1 min-w-0">
                        {item.star && <Star size={8} className={`${tmpl.accentClass} shrink-0`} fill="currentColor" />}
                        <span className={`text-[10px] font-medium ${tmpl.accentClass} truncate`}>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className={`border-b border-dotted ${tmpl.lineClass} w-4`} />
                        <span className={`text-[10px] font-bold ${tmpl.accentClass}`}>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Legend at bottom */}
            <div className={`mt-4 pt-3 border-t ${tmpl.lineClass} flex gap-3 flex-wrap`}>
              {[
                { symbol: "★", label: "Chef" },
                { symbol: "●", label: "Picante", color: "text-red-400" },
                { symbol: "●", label: "Vegano", color: "text-green-400" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <span className={`text-[8px] ${l.color ?? tmpl.accentClass}`}>{l.symbol}</span>
                  <span className={`text-[8px] ${tmpl.descClass}`}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center py-3 border-t ${tmpl.lineClass}`}>
          <p className={`text-[9px] tracking-widest uppercase ${tmpl.footerClass}`}>
            @mayacantinasac · tablereserve.conect-r.com/book/roosters-on-the-river
          </p>
        </div>
      </motion.div>

      {/* CTA to open printable menu */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-900/10 border border-amber-700/25">
        <div className="flex items-center gap-3">
          <Palette size={20} className="text-amber-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold">Menú listo para imprimir</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              3 páginas · portada, menú completo y contraportada · formato US Letter
            </div>
          </div>
        </div>
        <button
          onClick={handleOpenPrint}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg transition-colors shrink-0 ml-4"
        >
          <ExternalLink size={14} /> Ver menú
        </button>
      </div>
    </div>
  );
}
