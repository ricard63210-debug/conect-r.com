import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Grid, Check, ExternalLink, Star } from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const menuTemplates = [
  {
    id: 1,
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

export default function ModuloCreativo() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const tmpl = menuTemplates[selectedTemplate];
  const { lang } = useLang();
  const T = getT(lang).creativo;

  const handleOpenPrint = () => {
    window.open(`${window.location.origin}/maya-menu-print/`, "_blank", "noopener,noreferrer");
  };

  const sectionKeys = ["Brunch", "Starters", "Tacos", lang === "es" ? "Mariscos" : "Seafood", "Bar"] as const;
  const sectionDisplay = lang === "es"
    ? ["BRUNCH", "STARTERS", "TACOS", "MARISCOS", "BAR"]
    : ["BRUNCH", "STARTERS", "TACOS", "SEAFOOD", "BAR"];

  const menuData = lang === "es"
    ? [
        { category: sectionDisplay[0], items: T.menuItems.Brunch },
        { category: sectionDisplay[1], items: T.menuItems.Starters },
        { category: sectionDisplay[2], items: T.menuItems.Tacos },
        { category: sectionDisplay[3], items: T.menuItems.Seafood },
        { category: sectionDisplay[4], items: T.menuItems.Bar },
      ]
    : [
        { category: sectionDisplay[0], items: T.menuItems.Brunch },
        { category: sectionDisplay[1], items: T.menuItems.Starters },
        { category: sectionDisplay[2], items: T.menuItems.Tacos },
        { category: sectionDisplay[3], items: T.menuItems.Seafood },
        { category: sectionDisplay[4], items: T.menuItems.Bar },
      ];

  const legendItems = lang === "es"
    ? [{ symbol: "★", label: "Chef" }, { symbol: "●", label: "Picante", color: "text-red-400" }, { symbol: "●", label: "Vegano", color: "text-green-400" }]
    : [{ symbol: "★", label: "Chef" }, { symbol: "●", label: "Spicy", color: "text-red-400" }, { symbol: "●", label: "Vegan", color: "text-green-400" }];

  const printReadyLabel = lang === "es" ? "Menú listo para imprimir" : "Print-ready menu";
  const printSubLabel = lang === "es"
    ? "3 páginas · portada, menú completo y contraportada · formato US Letter"
    : "3 pages · cover, full menu and back cover · US Letter format";
  const viewBtn = lang === "es" ? "Ver menú" : "View menu";
  const pickStyleLabel = lang === "es" ? "Elige el estilo de tu menú" : "Choose your menu style";
  const templateLabel = lang === "es" ? "Plantilla:" : "Template:";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {T.description} <span className="text-amber-400 font-medium">{T.descSales}</span> {T.descMid}{" "}
          <span className="text-amber-400 font-medium">{T.descTicket}</span>{T.descEnd}
        </p>
        <ImpactPills />
      </div>

      {/* Template picker */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-primary flex items-center gap-2">
          <Grid size={18} /> {pickStyleLabel}
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
                  {T.templates[idx]}
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
          <div className={`absolute top-4 left-5 w-7 h-7 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute top-4 right-5 w-7 h-7 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute bottom-4 left-5 w-5 h-5 border ${tmpl.lineClass} rounded-full`} />
          <div className={`absolute bottom-4 right-5 w-5 h-5 border ${tmpl.lineClass} rounded-full`} />
          <div className={`text-[10px] uppercase tracking-[0.25em] ${tmpl.mutedClass} mb-1`}>CARTA</div>
          <img
            src="/carmelitas-logo.png"
            alt="Carmelita's"
            className="h-14 object-contain mx-auto mb-1"
            style={{ filter: "brightness(0.15) sepia(1) saturate(3) hue-rotate(10deg)" }}
          />
          <p className={`text-xs mt-1.5 ${tmpl.mutedClass} tracking-wider`}>
            Kitchen de Mexico · Mexican Bar &amp; Grill
          </p>
          <div className={`w-24 h-px mx-auto mt-3 bg-current ${tmpl.mutedClass}`} />
        </div>

        {/* Two-column menu */}
        <div className="grid grid-cols-2 gap-0 divide-x divide-white/5">
          <div className="p-5 space-y-4">
            {menuData.slice(0, 3).map(section => (
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

          <div className="p-5 space-y-4">
            {menuData.slice(3).map(section => (
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

            <div className={`mt-4 pt-3 border-t ${tmpl.lineClass} flex gap-3 flex-wrap`}>
              {legendItems.map(l => (
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
            {T.menuFooter}
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-900/10 border border-amber-700/25">
        <div className="flex items-center gap-3">
          <Palette size={20} className="text-amber-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold">{printReadyLabel}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{printSubLabel}</div>
          </div>
        </div>
        <button
          onClick={handleOpenPrint}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg transition-colors shrink-0 ml-4"
        >
          <ExternalLink size={14} /> {viewBtn}
        </button>
      </div>
    </div>
  );
}
