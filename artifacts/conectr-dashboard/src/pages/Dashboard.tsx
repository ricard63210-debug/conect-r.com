import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, BarChart2, Monitor, Globe, Palette, TrendingUp,
  Menu, X, ChevronRight, Instagram, Languages
} from "lucide-react";
import SmartTable from "@/components/modules/SmartTable";
import GestionOperativa from "@/components/modules/GestionOperativa";
import DigitalSignage from "@/components/modules/DigitalSignage";
import PresenciaDigital from "@/components/modules/PresenciaDigital";
import RedesSociales from "@/components/modules/RedesSociales";
import ModuloCreativo from "@/components/modules/ModuloCreativo";
import AntesDepues from "@/components/modules/AntesDepues";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const MODULE_ICONS = [Wifi, BarChart2, Monitor, Globe, Instagram, Palette, TrendingUp];
const MODULE_COLORS = [
  "from-amber-600 to-amber-400",
  "from-orange-700 to-orange-500",
  "from-teal-700 to-teal-500",
  "from-blue-700 to-blue-500",
  "from-pink-700 to-pink-500",
  "from-purple-700 to-purple-500",
  "from-green-700 to-green-500",
];
const MODULE_IDS = ["smart-table", "gestion", "signage", "presencia", "redes", "creativo", "resultados"];
const MODULE_COMPONENTS = [SmartTable, GestionOperativa, DigitalSignage, PresenciaDigital, RedesSociales, ModuloCreativo, AntesDepues];

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("smart-table");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggle } = useLang();
  const T = getT(lang);

  const modules = T.modules.map((m, i) => ({
    ...m,
    icon: MODULE_ICONS[i],
    color: MODULE_COLORS[i],
    component: MODULE_COMPONENTS[i],
  }));

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component ?? SmartTable;
  const activeInfo = modules.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href={import.meta.env.BASE_URL} className="flex items-center gap-3 shrink-0">
            <img src="/conectr-logo.png" alt="Conect-R" className="h-14 lg:h-16 object-contain" style={{ filter: "brightness(1.15)" }} />
            <div className="hidden xl:block text-xs text-muted-foreground leading-none">{T.global.ecosistema}</div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {modules.map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                data-testid={`nav-${mod.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                  activeModule === mod.id
                    ? "bg-sky-500/10 border border-sky-700/40 text-sky-300"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <mod.icon size={15} />
                <span className="whitespace-nowrap">{mod.label}</span>
              </button>
            ))}
          </nav>

          {/* Right: lang toggle + mobile menu */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.93 }}
              data-testid="lang-toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-700/40 bg-sky-500/10 text-sky-300 text-xs font-semibold hover:bg-sky-500/20 transition-colors"
            >
              <Languages size={13} />
              {T.global.langBtn}
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border/40"
            >
              <div className="p-3 grid grid-cols-2 gap-2">
                {modules.map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => { setActiveModule(mod.id); setMobileMenuOpen(false); }}
                    data-testid={`mobile-nav-${mod.id}`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeModule === mod.id
                        ? "bg-sky-500/10 border border-sky-700/40 text-sky-300"
                        : "text-muted-foreground hover:text-foreground border border-transparent"
                    }`}
                  >
                    <mod.icon size={15} />
                    <span>{mod.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden xl:flex flex-col w-56 shrink-0 border-r border-border/40 bg-sidebar/50 p-3 sticky top-[57px] h-[calc(100vh-57px)]">
          <div className="space-y-1">
            {modules.map((mod) => (
              <motion.button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                data-testid={`sidebar-${mod.id}`}
                whileHover={{ x: 2 }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeModule === mod.id
                    ? "bg-sky-500/10 border border-sky-700/40"
                    : "hover:bg-muted/20 border border-transparent"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center shrink-0`}>
                  <mod.icon size={14} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${activeModule === mod.id ? "text-sky-300" : "text-foreground"}`}>
                    {mod.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{mod.sublabel}</div>
                </div>
                {activeModule === mod.id && (
                  <ChevronRight size={12} className="text-sky-400 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Bottom card */}
          <div className="mt-auto p-3 rounded-xl border border-sky-800/30 bg-sky-900/10">
            <div className="text-xs font-semibold text-sky-400 mb-1">{T.global.demoCard.title}</div>
            <p className="text-xs text-muted-foreground">{T.global.demoCard.body}</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Module header banner */}
          {activeInfo && (
            <div className="px-6 py-5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeInfo.color} flex items-center justify-center`}>
                  <activeInfo.icon size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{activeInfo.label}</h1>
                  <p className="text-sm text-muted-foreground">{activeInfo.sublabel}</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
