import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Star, Calendar, Instagram, Facebook, Smartphone, QrCode,
  ChevronRight, Check, Users, TrendingUp, ExternalLink, MessageCircleWarning,
  ThumbsDown, Send, ArrowLeft, Flame, Leaf, Heart, Gamepad2
} from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

interface FeedbackState {
  rating: number;
  name: string;
  tableNum: string;
  datetime: string;
  email: string;
  phone: string;
  reason: string;
  submitted: boolean;
}

interface MenuItem {
  name: string;
  desc: string;
  detail: string;
  emoji: string;
  gradient: string;
  spicy?: boolean;
  veg?: boolean;
}

const MENU_KEYS = ["Entradas", "Tacos", "Platos Fuertes", "Bebidas", "Postres"] as const;
type MenuKey = typeof MENU_KEYS[number];

const MENU_ITEMS: Record<MenuKey, MenuItem[]> = {
  Entradas: [
    { name: "Guacamole Artesanal", desc: "Aguacate, jitomate, cilantro, limon, jalapeño", detail: "Preparado al momento en molcajete de piedra volcanica. Usamos aguacates Hass maduros, jitomate asado, cilantro fresco, limon de Colima y jalapeño picado. Servido con totopos artesanales recien hechos.", emoji: "🥑", gradient: "from-green-700 to-emerald-500", veg: true },
    { name: "Queso Fundido", desc: "Queso Oaxaca derretido con chorizo y rajas", detail: "Una cazuela de barro directo al horno con queso Oaxaca de hebra fundido a la perfeccion, coronado con chorizo artesanal de la casa y rajas de chile poblano asado. Se sirve con tortillas de maiz recien hechas.", emoji: "🧀", gradient: "from-yellow-600 to-orange-500", spicy: true },
    { name: "Tostadas de Ceviche", desc: "Camaron fresco, limon, chile serrano, pepino", detail: "Camaron fresco marinado en jugo de limon durante 4 horas, mezclado con pepino, cebolla morada, chile serrano y cilantro. Servido sobre tostadas crujientes artesanales con aguacate y salsa botanera.", emoji: "🦐", gradient: "from-orange-600 to-red-500" },
    { name: "Sopa de Lima", desc: "Caldo de pollo, tortilla crujiente, lima yucateca", detail: "Receta tradicional yucateca con caldo de pollo dorado, pechuga desmenuzada, jitomate asado, cebolla morada, chile habanero suave y el toque distintivo de lima yucateca. Se decora con tiras de tortilla crujiente.", emoji: "🍋", gradient: "from-yellow-500 to-amber-400" },
  ],
  Tacos: [
    { name: "Al Pastor", desc: "Cerdo adobado, pina, cilantro, cebolla", detail: "Cerdo marinado 24 horas en achiote, chiles guajillo y ancho, oregano y especias. Cocinado en trompo vertical y cortado al momento. Servido con pina natural, cilantro fresco, cebolla blanca y salsa verde tatemada.", emoji: "🌮", gradient: "from-red-600 to-orange-500", spicy: true },
    { name: "Birria", desc: "Res estofada en consomme, queso, cilantro", detail: "Res cocida lentamente por 6 horas en consomme de chiles guajillo, ancho y pasilla con especias mexicanas. Servida con queso Chihuahua fundido, cilantro y cebolla. Acompanada de consomme caliente para mojar.", emoji: "🥩", gradient: "from-rose-700 to-red-500" },
    { name: "Camarones", desc: "Camaron a la diabla, col morada, chipotle", detail: "Camarones jumbo salteados en salsa a la diabla con chile de arbol, chipotle ahumado y mantequilla de ajo. Servidos sobre tortilla de maiz azul con col morada encurtida, crema de chipotle y jugo de limon.", emoji: "🦐", gradient: "from-pink-700 to-red-600", spicy: true },
    { name: "Hongos", desc: "Hongos salteados, epazote, chile poblano", detail: "Mix de hongos de temporada — portobello, shiitake y ostra — salteados con ajo, epazote fresco, chile poblano asado y mantequilla. Servidos en tortilla de maiz hecha a mano con frijoles negros y queso Oaxaca.", emoji: "🍄", gradient: "from-amber-700 to-yellow-600", veg: true },
    { name: "Carnitas", desc: "Cerdo confitado, salsa verde, cebolla morada", detail: "Cerdo confitado en manteca de cerdo durante 4 horas con naranja, canela, hojas de laurel y ajo hasta lograr una textura que se deshace. Crujiente por fuera, jugoso por dentro.", emoji: "🐷", gradient: "from-amber-600 to-orange-500" },
  ],
  "Platos Fuertes": [
    { name: "Mole Negro", desc: "Pollo bañado en mole negro oaxaqueño, arroz, frijoles", detail: "Nuestro mole negro es una receta de mas de 30 ingredientes: chiles mulato, pasilla, chihuacle negro, chocolate amargo, platano macho, ajonjoli y especias. Cocinado lentamente por 8 horas. Patrimonio de la cocina mexicana.", emoji: "🍗", gradient: "from-stone-700 to-amber-800" },
    { name: "Chile en Nogada", desc: "Chile poblano relleno, nogada de nuez, granadas", detail: "Chile poblano asado relleno de picadillo de res y cerdo con frutas de temporada — durazno, pera, platano y almendras — bañado en nogada de nuez de Castilla fresca, decorado con granada roja y perejil.", emoji: "🌶️", gradient: "from-green-700 to-emerald-600", veg: true },
    { name: "Ribeye a la Mexicana", desc: "300g, nopal asado, salsa roja, frijoles charros", detail: "Corte de Ribeye de 300g al punto deseado, sazonado con especias mexicanas y sellado en comal de hierro. Acompanado de nopal asado, frijoles charros con tocino y chorizo, y salsa roja de molcajete.", emoji: "🥩", gradient: "from-red-800 to-rose-700", spicy: true },
    { name: "Camarones al Mezcal", desc: "Camarones jumbo, crema de chile ancho, arroz verde", detail: "Camarones gigantes flambeados en mezcal Joven con mantequilla de ajo negro, servidos sobre crema de chile ancho tatemado y arroz verde de cilantro. Experiencia gourmet.", emoji: "🦐", gradient: "from-blue-700 to-teal-600" },
  ],
  Bebidas: [
    { name: "Margarita Clasica", desc: "Tequila blanco, limon, triple sec, sal", detail: "La clasica bien hecha: tequila blanco 100% agave, jugo de limon exprimido al momento, triple sec premium y una pizca de sal de grano. Servida en copa escarcha. Simple, perfecta, inigualable.", emoji: "🍹", gradient: "from-yellow-500 to-lime-500" },
    { name: "Mezcal Negroni", desc: "Mezcal Joven, Campari, Vermut Rojo", detail: "Un Negroni con caracter mexicano: mezcal joven artesanal de Oaxaca, Campari italiano y Vermut Rojo dulce. Servido en vaso old fashioned con hielo esferico y una piel de naranja expresada.", emoji: "🥃", gradient: "from-red-700 to-amber-600" },
    { name: "Agua de Jamaica", desc: "Flor de Jamaica, azucar de cana, hierbabuena", detail: "Infusion artesanal de flor de Jamaica seca de Guerrero, endulzada con azucar de cana natural y servida con hierbabuena fresca y limon. Una bebida sin alcohol llena de antioxidantes.", emoji: "🌺", gradient: "from-pink-700 to-fuchsia-600", veg: true },
    { name: "Michelada Carmelitas", desc: "Cerveza, clamato, limon, chamoy, tajin", detail: "La michelada de la casa: cerveza lager fria mezclada con clamato, jugo de limon fresco, salsa Worcestershire, Tabasco y sal de ajo. Vaso escarcha con chamoy y tajin. Decorada con camarones encurtidos.", emoji: "🍺", gradient: "from-amber-600 to-red-500", spicy: true },
  ],
  Postres: [
    { name: "Tres Leches", desc: "Bizcocho esponjoso empapado en tres leches, crema batida", detail: "Bizcocho casero horneado en el momento y empapado en la mezcla de leche entera, leche evaporada y leche condensada. Cubierto con crema batida artesanal y decorado con canela en polvo.", emoji: "🍰", gradient: "from-amber-200 to-yellow-300", veg: true },
    { name: "Churros con Chocolate", desc: "Churros crujientes, chocolate caliente, cajeta", detail: "Churros fritos al momento, crujientes por fuera y suaves por dentro, espolvoreados con azucar y canela. Servidos con chocolate caliente artesanal de cacao mexicano de Tabasco y cajeta de cabra.", emoji: "🍫", gradient: "from-amber-700 to-yellow-600" },
    { name: "Helado de Elote", desc: "Helado artesanal de elote dulce, cajeta, canela", detail: "Helado elaborado con elote dulce fresco de temporada, leche entera y crema. Servido con cajeta artesanal de Celaya, canela molida y nuez tostada. Una interpretacion gourmet de un sabor tipicamente mexicano.", emoji: "🌽", gradient: "from-yellow-400 to-amber-400", veg: true },
  ],
};

export default function SmartTable() {
  const { lang } = useLang();
  const T = getT(lang).smartTable;

  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuKeyIdx, setMenuKeyIdx] = useState(0);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({ rating: 0, name: "", tableNum: "", datetime: "", email: "", phone: "", reason: "", submitted: false });
  const feedbackFormRef = useRef<HTMLDivElement>(null);

  const menuKey = MENU_KEYS[menuKeyIdx];

  const spicyLabel = lang === "es" ? "Picante" : "Spicy";
  const vegLabel = lang === "es" ? "Vegetariano" : "Vegetarian";
  const goBackLabel = lang === "es" ? "Regresar" : "Go Back";
  const resetLabel = lang === "es" ? "Reiniciar" : "Reset";
  const portalOpenedLabel = lang === "es" ? "Portal abierto en el celular" : "Portal opened on phone";
  const portalOpenedDesc = lang === "es"
    ? "Herramienta de engagement y marketing directo. Los datos del cliente se capturan en Table Reserve al hacer una reservacion."
    : "Direct engagement and marketing tool. Customer data is captured in Table Reserve when making a reservation.";
  const portalSteps = lang === "es"
    ? [
        { step: "01", title: "Toca el stand", desc: "NFC o QR code — sin app, sin descarga, sin friccion" },
        { step: "02", title: "Ve el menu digital", desc: "Carta completa con fotos y descripcion detallada de cada platillo" },
        { step: "03", title: "Cualquier link que el dueno elija", desc: "Juegos, trivias, promociones, videos — cualquier destino en internet adaptado a lo que el restaurante necesita" },
        { step: "04", title: "Comparte su experiencia", desc: "Acceso directo a Google Business para calificar con 5 estrellas en segundos" },
      ]
    : [
        { step: "01", title: "Tap the stand", desc: "NFC or QR code — no app, no download, no friction" },
        { step: "02", title: "View the digital menu", desc: "Full menu with photos and detailed descriptions of every dish" },
        { step: "03", title: "Any link the owner chooses", desc: "Games, trivia, promotions, videos — any internet destination tailored to what the restaurant needs" },
        { step: "04", title: "Share their experience", desc: "Direct access to Google Business to rate with 5 stars in seconds" },
      ];
  const portalSectionTitle = lang === "es" ? "Que puede hacer el cliente desde el portal" : "What can the customer do from the portal";
  const clickHintLabel = lang === "es" ? "Haz clic en el stand para simular un toque NFC" : "Click the stand to simulate an NFC tap";
  const gameLabel = lang === "es" ? "Juega y gana" : "Play and win";
  const badExpLabel = lang === "es" ? "Tuviste una mala experiencia?" : "Had a bad experience?";
  const helpUsLabel = lang === "es" ? "Ayudanos a mejorar" : "Help us improve";
  const reviewsLabel = lang === "es" ? "Resenas" : "Reviews";
  const tablesLabel = lang === "es" ? "Mesas" : "Tables";
  const effLabel = lang === "es" ? "Efic." : "Eff.";
  const authenticNoteText = lang === "es"
    ? "Cocinado con ingredientes frescos y recetas autenticas de la cocina mexicana tradicional."
    : "Cooked with fresh ingredients and authentic traditional Mexican recipes.";

  const portalButtons = [
    { id: "menu", label: T.portalButtons.menu, icon: QrCode, color: "from-sky-600 to-sky-400", desc: lang === "es" ? "Carta completa con descripcion y fotos de cada platillo" : "Full menu with photos and descriptions of every dish", url: "https://restaurante-maya-dash.replit.app/maya-menu/", isMenu: false },
    { id: "reviews", label: T.portalButtons.reviews, icon: Heart, color: "from-yellow-600 to-yellow-400", desc: T.reviewsDesc, url: "https://www.google.com/search?q=carmelitas+google+reviews&ie=UTF-8&oe=UTF-8&hl=en-us&client=safari#ebo=2" },
    { id: "events", label: T.portalButtons.events, icon: Calendar, color: "from-orange-700 to-orange-500", desc: T.eventDesc, url: "https://carmelitasgroup.com/private-events" },
    { id: "instagram", label: T.portalButtons.instagram, icon: Instagram, color: "from-pink-700 to-pink-500", desc: T.instagramDesc, url: "https://www.instagram.com/carmelitasgroup?igsh=NTc4MTIwNjQ2YQ==" },
    { id: "facebook", label: T.portalButtons.facebook, icon: Facebook, color: "from-blue-700 to-blue-500", desc: T.facebookDesc, url: "https://www.facebook.com/pages/Carmelitas-Mexican-Bar-Grill/151034358242633?mibextid=wwXIfr" },
    { id: "reserve", label: T.portalButtons.reserve, icon: Calendar, color: "from-amber-700 to-amber-500", desc: T.reserveDesc, url: "https://tablereserve.conect-r.com" },
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
    setShowMenu(false);
    setSelectedDish(null);
    setFeedback({ rating: 0, name: "", tableNum: "", datetime: "", email: "", phone: "", reason: "", submitted: false });
  };

  const handlePortalButton = (btn: typeof portalButtons[0]) => {
    setActiveButton(btn.id);
    if (btn.url) {
      window.open(btn.url, "_blank", "noopener,noreferrer");
    }
  };

  const submitFeedback = () => {
    setFeedback(prev => ({ ...prev, submitted: true }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {T.description} <span className="text-sky-400 font-medium">{T.descReviews}</span>
          {T.desc2}<span className="text-sky-400 font-medium">{T.descClients}</span>
          {T.desc3}<span className="text-sky-400 font-medium">{T.descSales}</span>
          {T.desc4}<span className="text-sky-400 font-medium">{T.descWork}</span>{T.desc5}
        </p>
        <ImpactPills />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFC Stand Visualizer */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Wifi size={20} /> {T.nfcTitle}
          </h3>

          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative w-64 h-80 maya-card rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={handleNfcTap}
              data-testid="nfc-stand"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-sky-400 to-amber-700 rounded-t-2xl" />
              <div className="text-center px-4">
                <img src="/carmelitas-logo.png" alt="Carmelita's" className="h-24 object-contain mx-auto" style={{ filter: "invert(1) brightness(1.3)" }} />
              </div>
              <div className="relative w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                <QrCode className="text-gray-800" size={64} />
                {showAnimation && (
                  <>
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-sky-400 opacity-60" />
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-sky-400 opacity-40" style={{ animationDelay: "0.4s" }} />
                    <div className="absolute inset-0 rounded-xl nfc-pulse border-2 border-sky-400 opacity-20" style={{ animationDelay: "0.8s" }} />
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi size={14} className="text-sky-400" />
                <span>{T.nfcTap}</span>
              </div>
              <div className="text-xs text-muted-foreground/60">{T.nfcTable}</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-sky-400 to-amber-700 rounded-b-2xl" />
            </motion.div>

            <p className="mt-3 text-xs text-muted-foreground text-center">{clickHintLabel}</p>

            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial={{ x: 60, y: -20, opacity: 0 }}
                  animate={{ x: 0, y: -40, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -right-4 top-1/4"
                >
                  <div className="w-14 h-24 bg-gray-900 rounded-xl border-2 border-sky-400 flex items-center justify-center shadow-xl">
                    <Smartphone size={24} className="text-sky-400" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-sky-400 rounded-full flex items-center justify-center"
                  >
                    <Wifi size={12} className="text-black" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {portalOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="maya-card rounded-xl p-4 border border-sky-800/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-sky-500/20 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-sky-400" />
                    </div>
                    <span className="text-sm font-semibold text-sky-400">{portalOpenedLabel}</span>
                  </div>
                  <button onClick={resetNfc} className="text-muted-foreground hover:text-foreground text-xs underline">
                    {resetLabel}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{portalOpenedDesc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portal Cliente — Phone mockup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Smartphone size={20} /> {T.portalTitle}
          </h3>

          <div className="relative mx-auto w-72 bg-gray-950 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden" style={{ height: "680px" }}>
            {/* Status bar */}
            <div className="bg-gray-950 px-6 py-2 flex justify-between items-center text-xs text-gray-400">
              <span>9:41</span>
              <div className="w-20 h-5 bg-gray-950 rounded-full border border-gray-700 mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
              <div className="flex gap-1 items-center">
                <Wifi size={10} />
                <span>5G</span>
              </div>
            </div>

            {/* ===== DISH DETAIL VIEW ===== */}
            <AnimatePresence>
              {selectedDish && (
                <motion.div
                  key="dish-detail"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.28 }}
                  className="absolute inset-0 top-8 bg-gray-950 z-20 flex flex-col overflow-y-auto"
                >
                  <div className={`relative h-52 bg-gradient-to-br ${selectedDish.gradient} flex flex-col items-center justify-center shrink-0`}>
                    <button
                      onClick={() => setSelectedDish(null)}
                      className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs text-white font-medium"
                    >
                      <ArrowLeft size={13} /> {goBackLabel}
                    </button>
                    <span className="text-7xl drop-shadow-lg">{selectedDish.emoji}</span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white leading-tight">{selectedDish.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedDish.spicy && (
                            <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-900/30 px-2 py-0.5 rounded-full">
                              <Flame size={10} /> {spicyLabel}
                            </span>
                          )}
                          {selectedDish.veg && (
                            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                              <Leaf size={10} /> {vegLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedDish.detail}</p>
                    <div className="p-3 bg-sky-900/20 border border-sky-800/30 rounded-xl">
                      <p className="text-xs text-sky-300/80 italic">"{authenticNoteText}"</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== MENU VIEW ===== */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  key="menu-view"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="absolute inset-0 top-8 bg-gray-950 z-10 flex flex-col"
                >
                  <div className="relative bg-white flex flex-col items-center pt-4 pb-3 shrink-0">
                    <button
                      onClick={() => { setShowMenu(false); setActiveButton(null); setSelectedDish(null); }}
                      className="absolute left-3 top-4 flex items-center gap-1 text-xs text-blue-600 font-medium"
                    >
                      <ArrowLeft size={14} /> {T.menuBack}
                    </button>
                    <img src="/carmelitas-logo.png" alt="Carmelita's" className="h-20 object-contain" />
                    <p className="text-xs text-gray-500 mt-1">{T.menuSubtitle}</p>
                  </div>

                  <div className="flex gap-0 bg-gray-900 border-b border-gray-800 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
                    {T.menuCategories.map((cat, idx) => (
                      <button
                        key={cat}
                        onClick={() => setMenuKeyIdx(idx)}
                        className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                          menuKeyIdx === idx
                            ? "border-sky-400 text-sky-400"
                            : "border-transparent text-gray-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={menuKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="divide-y divide-gray-800"
                      >
                        {MENU_ITEMS[menuKey].map((item) => (
                          <motion.button
                            key={item.name}
                            onClick={() => setSelectedDish(item)}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 p-3 text-left active:bg-gray-800/60"
                          >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}>
                              <span className="text-2xl">{item.emoji}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-xs font-semibold text-white leading-tight">{item.name}</span>
                                {item.spicy && <Flame size={10} className="text-orange-500 shrink-0" />}
                                {item.veg && <Leaf size={10} className="text-green-500 shrink-0" />}
                              </div>
                              <p className="text-xs text-gray-400 leading-tight line-clamp-2">{item.desc}</p>
                            </div>
                            <ChevronRight size={14} className="text-gray-600 shrink-0" />
                          </motion.button>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-3 px-3 py-2 border-t border-gray-800 bg-gray-900 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Flame size={10} className="text-orange-500" /> {spicyLabel}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Leaf size={10} className="text-green-500" /> {vegLabel}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== PORTAL MAIN VIEW ===== */}
            <div className="absolute inset-0 top-8 bg-gradient-to-b from-gray-950 to-black overflow-y-auto scrollbar-gold">
              <div className="relative h-24 bg-gradient-to-b from-amber-900/60 to-transparent flex flex-col items-center justify-center">
                <img src="/carmelitas-logo.png" alt="Carmelita's" className="h-20 object-contain" style={{ filter: "invert(1) brightness(1.4)" }} />
                <div className="text-xs text-sky-300/70 mt-1">{T.portalSubtitle}</div>
              </div>

              <div className="px-4 pb-6 space-y-3">
                <p className="text-xs text-center text-gray-400">{T.portalPrompt}</p>

                <div className="grid grid-cols-2 gap-3">
                  {portalButtons.map((btn) => (
                    <motion.button
                      key={btn.id}
                      onClick={() => handlePortalButton(btn)}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`portal-btn-${btn.id}`}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                        activeButton === btn.id
                          ? "border-sky-500 bg-sky-500/10"
                          : "border-gray-800 bg-gray-900/60"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${btn.color} flex items-center justify-center`}>
                        <btn.icon size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-center font-medium text-gray-200 leading-tight">{btn.label}</span>
                      {btn.url && (
                        <ExternalLink size={8} className="absolute top-2 left-2 text-gray-600" />
                      )}
                      {activeButton === btn.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-4 h-4 bg-sky-400 rounded-full flex items-center justify-center"
                        >
                          <Check size={10} className="text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {activeButton && activeButton !== "feedback" && activeButton !== "menu" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-sky-900/20 border border-sky-800/40 rounded-xl"
                    >
                      <p className="text-xs text-sky-200/80">
                        {portalButtons.find(b => b.id === activeButton)?.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Maya King game banner */}
                <motion.button
                  onClick={() => window.open("https://maya-cantina-dash.replit.app/juego/juego/", "_blank", "noopener,noreferrer")}
                  whileTap={{ scale: 0.97 }}
                  data-testid="portal-btn-game-banner"
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-purple-700/40 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(100,30,160,0.22), rgba(212,160,23,0.10))" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-700 to-violet-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/40">
                    <Gamepad2 size={18} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-bold text-purple-200" style={{ fontFamily: "Cinzel, serif" }}>Maya King</div>
                    <div className="text-xs text-purple-400 mt-0.5">🏆 {gameLabel}</div>
                  </div>
                  <ExternalLink size={12} className="text-purple-500 shrink-0" />
                </motion.button>

                {/* Feedback button */}
                <motion.button
                  onClick={() => {
                    const opening = activeButton !== "feedback";
                    setActiveButton(opening ? "feedback" : null);
                    if (opening) {
                      setTimeout(() => feedbackFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="portal-btn-feedback"
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-200 ${
                    activeButton === "feedback"
                      ? "border-orange-600/60 bg-orange-900/20"
                      : "border-gray-800 bg-gray-900/60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-700 to-red-600 flex items-center justify-center shrink-0">
                    <ThumbsDown size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-orange-300">{badExpLabel}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{helpUsLabel}</div>
                  </div>
                  <MessageCircleWarning size={14} className="text-orange-500 ml-auto" />
                </motion.button>

                {/* Feedback questionnaire */}
                <AnimatePresence>
                  {activeButton === "feedback" && (
                    <motion.div
                      ref={feedbackFormRef}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="border border-orange-800/40 rounded-2xl bg-gray-900/80"
                    >
                      {feedback.submitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 text-center"
                        >
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Check size={24} className="text-green-400" />
                          </div>
                          <p className="text-sm font-semibold text-green-400 mb-1">{T.feedbackSuccess}</p>
                          <p className="text-xs text-gray-400">{T.feedbackNote}</p>
                        </motion.div>
                      ) : (
                        <div className="p-3 space-y-2.5">
                          <p className="text-xs font-semibold text-orange-300">{T.feedbackTitle}</p>

                          {/* Star rating */}
                          <div className="flex gap-1 justify-center">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  size={22}
                                  className={feedback.rating >= star ? "fill-orange-400 text-orange-400" : "text-gray-600"}
                                />
                              </button>
                            ))}
                          </div>

                          {/* Name */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Nombre *" : "Name *"}</p>
                            <input
                              type="text"
                              value={feedback.name}
                              onChange={e => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                              placeholder={lang === "es" ? "Tu nombre" : "Your name"}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-600"
                            />
                          </div>

                          {/* Table number */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Mesa / Posición *" : "Table / Position *"}</p>
                            <input
                              type="text"
                              value={feedback.tableNum}
                              onChange={e => setFeedback(prev => ({ ...prev, tableNum: e.target.value }))}
                              placeholder={lang === "es" ? "Ej: Mesa 7, Barra, Terraza" : "E.g. Table 7, Bar, Patio"}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-600"
                            />
                          </div>

                          {/* Date and time */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Día y hora *" : "Date & time *"}</p>
                            <input
                              type="datetime-local"
                              value={feedback.datetime}
                              onChange={e => setFeedback(prev => ({ ...prev, datetime: e.target.value }))}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-600"
                            />
                          </div>

                          {/* Email (optional) */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Correo electrónico (opcional)" : "Email (optional)"}</p>
                            <input
                              type="email"
                              value={feedback.email}
                              onChange={e => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="ejemplo@correo.com"
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-600"
                            />
                          </div>

                          {/* Phone (optional) */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Teléfono (opcional)" : "Phone (optional)"}</p>
                            <input
                              type="tel"
                              value={feedback.phone}
                              onChange={e => setFeedback(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder={lang === "es" ? "+1 (555) 000-0000" : "+1 (555) 000-0000"}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-600"
                            />
                          </div>

                          {/* Reason */}
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{lang === "es" ? "Razón de la queja *" : "Reason for complaint *"}</p>
                            <textarea
                              value={feedback.reason}
                              onChange={e => setFeedback(prev => ({ ...prev, reason: e.target.value }))}
                              placeholder={lang === "es" ? "Describe lo que ocurrió..." : "Describe what happened..."}
                              rows={3}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-orange-600 resize-none"
                            />
                          </div>

                          <button
                            onClick={submitFeedback}
                            disabled={!feedback.name.trim() || !feedback.tableNum.trim() || !feedback.reason.trim()}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                              feedback.name.trim() && feedback.tableNum.trim() && feedback.reason.trim()
                                ? "bg-orange-600 hover:bg-orange-500 text-white"
                                : "bg-gray-800 text-gray-600 cursor-not-allowed"
                            }`}
                          >
                            <Send size={12} />
                            {T.sendBtn}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { label: reviewsLabel, value: "4.9", icon: Star },
                    { label: tablesLabel, value: "24", icon: Users },
                    { label: effLabel, value: "+34%", icon: TrendingUp },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-900/80 rounded-xl p-2 text-center">
                      <stat.icon size={12} className="text-sky-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-sky-300">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal steps */}
      <div className="maya-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <ChevronRight size={20} /> {portalSectionTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {portalSteps.map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-10 h-10 bg-sky-500/10 border border-sky-700/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-sky-400">{item.step}</span>
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
