import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, BarChart2, Monitor, Globe, Palette, TrendingUp,
  Menu, X, ChevronRight, Instagram
} from "lucide-react";
import SmartTable from "@/components/modules/SmartTable";
import GestionOperativa from "@/components/modules/GestionOperativa";
import DigitalSignage from "@/components/modules/DigitalSignage";
import PresenciaDigital from "@/components/modules/PresenciaDigital";
import RedesSociales from "@/components/modules/RedesSociales";
import ModuloCreativo from "@/components/modules/ModuloCreativo";
import AntesDepues from "@/components/modules/AntesDepues";

const modules = [
  {
    id: "smart-table",
    label: "Smart Table",
    sublabel: "NFC / QR",
    icon: Wifi,
    component: SmartTable,
    color: "from-amber-600 to-amber-400",
  },
  {
    id: "gestion",
    label: "Ecosistema All Inclusive",
    sublabel: "Todo en uno para crecer",
    icon: BarChart2,
    component: GestionOperativa,
    color: "from-orange-700 to-orange-500",
  },
  {
    id: "signage",
    label: "Pantallas Digitales",
    sublabel: "Digital Signage",
    icon: Monitor,
    component: DigitalSignage,
    color: "from-teal-700 to-teal-500",
  },
  {
    id: "presencia",
    label: "Presencia Digital",
    sublabel: "Web & AI Chat",
    icon: Globe,
    component: PresenciaDigital,
    color: "from-blue-700 to-blue-500",
  },
  {
    id: "redes",
    label: "Redes Sociales",
    sublabel: "Instagram & Facebook",
    icon: Instagram,
    component: RedesSociales,
    color: "from-pink-700 to-pink-500",
  },
  {
    id: "creativo",
    label: "Diseño de Menú",
    sublabel: "Menú Imprimible",
    icon: Palette,
    component: ModuloCreativo,
    color: "from-purple-700 to-purple-500",
  },
  {
    id: "resultados",
    label: "Resultados",
    sublabel: "Antes vs Despues",
    icon: TrendingUp,
    component: AntesDepues,
    color: "from-green-700 to-green-500",
  },
];

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState("smart-table");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component ?? SmartTable;
  const activeInfo = modules.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500/20 border border-amber-600/40 rounded-lg flex items-center justify-center">
              <span className="text-sm font-serif font-bold text-amber-400">C</span>
            </div>
            <div>
              <div className="font-serif font-bold text-sm gold-gradient leading-none">Conect-R</div>
              <div className="text-xs text-muted-foreground leading-none mt-0.5">Ecosistema Restaurante Maya</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {modules.map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                data-testid={`nav-${mod.id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                  activeModule === mod.id
                    ? "bg-amber-500/10 border border-amber-700/40 text-amber-300"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <mod.icon size={15} />
                <span className="whitespace-nowrap">{mod.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
                        ? "bg-amber-500/10 border border-amber-700/40 text-amber-300"
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
            {modules.map((mod, idx) => (
              <motion.button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                data-testid={`sidebar-${mod.id}`}
                whileHover={{ x: 2 }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeModule === mod.id
                    ? "bg-amber-500/10 border border-amber-700/40"
                    : "hover:bg-muted/20 border border-transparent"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center shrink-0`}>
                  <mod.icon size={14} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${activeModule === mod.id ? "text-amber-300" : "text-foreground"}`}>
                    {mod.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{mod.sublabel}</div>
                </div>
                {activeModule === mod.id && (
                  <ChevronRight size={12} className="text-amber-400 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Bottom card */}
          <div className="mt-auto p-3 rounded-xl border border-amber-800/30 bg-amber-900/10">
            <div className="text-xs font-semibold text-amber-400 mb-1">Demo Interactiva</div>
            <p className="text-xs text-muted-foreground">
              Explorа cada modulo y descubre como Conect-R transforma tu restaurante.
            </p>
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
