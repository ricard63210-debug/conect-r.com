import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Star, Calendar, Instagram, Facebook, Smartphone, QrCode,
  ChevronRight, Check, Users, TrendingUp
} from "lucide-react";

export default function SmartTable() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  const portalButtons = [
    { id: "menu", label: "Menu Digital", icon: QrCode, color: "from-amber-600 to-amber-400", desc: "Carta completa con fotos HD y precios actualizados" },
    { id: "reviews", label: "Resenas Google", icon: Star, color: "from-yellow-600 to-yellow-400", desc: "Redirecciona directo al perfil de Google Business" },
    { id: "events", label: "Eventos", icon: Calendar, color: "from-orange-700 to-orange-500", desc: "Noche Maya, maridajes, celebraciones especiales" },
    { id: "instagram", label: "Instagram", icon: Instagram, color: "from-pink-700 to-pink-500", desc: "Seguir el restaurante, ver stories y reels" },
    { id: "facebook", label: "Facebook", icon: Facebook, color: "from-blue-700 to-blue-500", desc: "Pagina oficial y grupo de clientes frecuentes" },
  ];

  const handleNfcTap = () => {
    if (showAnimation) return;
    setShowAnimation(true);
    setTimeout(() => {
      setPortalOpen(true);
      setShowAnimation(false);
    }, 2000);
  };

  const resetNfc = () => {
    setPortalOpen(false);
    setActiveButton(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Smart Table — NFC / QR</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cada mesa tiene un stand fisico elegante con NFC y codigo QR. El cliente lo toca con su celular
          y accede instantaneamente al portal personalizado del restaurante.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFC Stand Visualizer */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Wifi size={20} /> Visualizador del Stand NFC
          </h3>

          <div className="relative flex flex-col items-center">
            {/* The physical stand */}
            <motion.div
              className="relative w-64 h-80 maya-card rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={handleNfcTap}
              data-testid="nfc-stand"
            >
              {/* Gold accent bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-t-2xl" />

              {/* Logo area */}
              <div className="text-center">
                <div className="text-2xl font-serif font-bold gold-gradient">Restaurante</div>
                <div className="text-3xl font-serif font-bold gold-gradient">MAYA</div>
              </div>

              {/* QR Code visual */}
              <div className="relative w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                <QrCode className="text-gray-800" size={64} />
                {showAnimation && (
                  <>
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-amber-400 opacity-60" />
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-amber-400 opacity-40" style={{ animationDelay: "0.4s" }} />
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-amber-400 opacity-20" style={{ animationDelay: "0.8s" }} />
                  </>
                )}
              </div>

              {/* NFC chip indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi size={14} className="text-amber-400" />
                <span>Toca aqui con tu celular</span>
              </div>

              <div className="text-xs text-muted-foreground/60">Mesa #07 • Salon Principal</div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-b-2xl" />
            </motion.div>

            <p className="mt-3 text-xs text-muted-foreground text-center">
              Haz clic en el stand para simular un toque NFC
            </p>

            {/* Phone animation while loading portal */}
            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial={{ x: 60, y: -20, opacity: 0 }}
                  animate={{ x: 0, y: -40, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -right-4 top-1/4"
                >
                  <div className="w-14 h-24 bg-gray-900 rounded-xl border-2 border-amber-400 flex items-center justify-center shadow-xl">
                    <Smartphone size={24} className="text-amber-400" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
                  >
                    <Wifi size={12} className="text-black" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Portal opened confirmation */}
          <AnimatePresence>
            {portalOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="maya-card rounded-xl p-4 border border-amber-800/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-amber-400" />
                    </div>
                    <span className="text-sm font-semibold text-amber-400">Portal abierto en el celular</span>
                  </div>
                  <button onClick={resetNfc} className="text-muted-foreground hover:text-foreground text-xs underline">
                    Reiniciar
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  El cliente ve el menu, resenas, eventos y redes sociales del restaurante.
                  Es una herramienta de <span className="text-amber-300 font-medium">engagement y marketing directo</span>,
                  no de captura de datos. Los datos se capturan automaticamente en
                  <span className="text-amber-300 font-medium"> Table Reserve</span> cuando el cliente hace una reservacion.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portal Cliente */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Smartphone size={20} /> Portal del Cliente (Simulador)
          </h3>

          {/* Phone mockup */}
          <div className="relative mx-auto w-72 bg-gray-950 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden" style={{ height: "580px" }}>
            {/* Status bar */}
            <div className="bg-gray-950 px-6 py-2 flex justify-between items-center text-xs text-gray-400">
              <span>9:41</span>
              <div className="w-20 h-5 bg-gray-950 rounded-full border border-gray-700 mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
              <div className="flex gap-1 items-center">
                <Wifi size={10} />
                <span>5G</span>
              </div>
            </div>

            {/* App content */}
            <div className="absolute inset-0 top-8 bg-gradient-to-b from-gray-950 to-black overflow-y-auto scrollbar-gold">
              {/* Header */}
              <div className="relative h-28 bg-gradient-to-b from-amber-900/60 to-transparent flex flex-col items-center justify-center">
                <div className="text-xl font-serif font-bold gold-gradient">RESTAURANTE MAYA</div>
                <div className="text-xs text-amber-300/70 mt-1">Cocina Mexicana Autentica</div>
              </div>

              {/* Buttons grid */}
              <div className="px-4 pb-4">
                <p className="text-xs text-center text-gray-400 mb-4">Selecciona una opcion</p>
                <div className="grid grid-cols-2 gap-3">
                  {portalButtons.map((btn) => (
                    <motion.button
                      key={btn.id}
                      onClick={() => setActiveButton(activeButton === btn.id ? null : btn.id)}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`portal-btn-${btn.id}`}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                        activeButton === btn.id
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-gray-800 bg-gray-900/60"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${btn.color} flex items-center justify-center`}>
                        <btn.icon size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-center font-medium text-gray-200">{btn.label}</span>
                      {activeButton === btn.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center"
                        >
                          <Check size={10} className="text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Active button description */}
                <AnimatePresence>
                  {activeButton && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 bg-amber-900/20 border border-amber-800/40 rounded-xl"
                    >
                      <p className="text-xs text-amber-200/80">
                        {portalButtons.find(b => b.id === activeButton)?.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stats bar */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Resenas", value: "4.9", icon: Star },
                    { label: "Mesas", value: "24", icon: Users },
                    { label: "Efic.", value: "+34%", icon: TrendingUp },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-900/80 rounded-xl p-2 text-center">
                      <stat.icon size={12} className="text-amber-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-amber-300">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What happens in the portal */}
      <div className="maya-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <ChevronRight size={20} /> Que puede hacer el cliente desde el portal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: "01", title: "Toca el stand", desc: "NFC o QR code — sin app, sin descarga, sin friccion" },
            { step: "02", title: "Ve el menu digital", desc: "Carta completa con fotos HD, precios y descripcion de platillos" },
            { step: "03", title: "Ordena desde la mesa", desc: "Envia su pedido directo a cocina sin esperar al mesero" },
            { step: "04", title: "Deja su resena", desc: "Acceso directo a Google Business para calificar con 5 estrellas en segundos" },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-700/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-amber-400">{item.step}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
