import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Star, Calendar, Instagram, Facebook, Smartphone, QrCode,
  ChevronRight, Check, Users, TrendingUp, ExternalLink, MessageCircleWarning,
  ThumbsDown, Send, ArrowLeft, Flame, Leaf, Heart
} from "lucide-react";

interface FeedbackState {
  rating: number;
  issues: string[];
  comment: string;
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

const ISSUE_OPTIONS = [
  "Tiempo de espera",
  "Calidad de la comida",
  "Atencion del mesero",
  "Temperatura de la comida",
  "Ambiente / ruido",
  "Limpieza",
  "Precio vs calidad",
  "Otro",
];

const MENU_CATEGORIES = ["Entradas", "Tacos", "Platos Fuertes", "Bebidas", "Postres"] as const;
type MenuCategory = typeof MENU_CATEGORIES[number];

const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
  Entradas: [
    {
      name: "Guacamole Artesanal",
      desc: "Aguacate, jitomate, cilantro, limon, jalapeño",
      detail: "Preparado al momento en molcajete de piedra volcanica. Usamos aguacates Hass maduros, jitomate asado, cilantro fresco, limon de Colima y jalapeño picado. Servido con totopos artesanales recien hechos. Una receta familiar que llevamos mas de 15 anos perfeccionando.",
      emoji: "🥑",
      gradient: "from-green-700 to-emerald-500",
      veg: true,
    },
    {
      name: "Queso Fundido",
      desc: "Queso Oaxaca derretido con chorizo y rajas",
      detail: "Una cazuela de barro directo al horno con queso Oaxaca de hebra fundido a la perfeccion, coronado con chorizo artesanal de la casa y rajas de chile poblano asado. Se sirve con tortillas de maiz recien hechas. Ideal para compartir.",
      emoji: "🧀",
      gradient: "from-yellow-600 to-orange-500",
      spicy: true,
    },
    {
      name: "Tostadas de Ceviche",
      desc: "Camaron fresco, limon, chile serrano, pepino",
      detail: "Camaron fresco marinado en jugo de limon durante 4 horas, mezclado con pepino, cebolla morada, chile serrano y cilantro. Servido sobre tostadas crujientes artesanales con aguacate y salsa botanera. Sabor del mar en cada bocado.",
      emoji: "🦐",
      gradient: "from-orange-600 to-red-500",
    },
    {
      name: "Sopa de Lima",
      desc: "Caldo de pollo, tortilla crujiente, lima yucateca",
      detail: "Receta tradicional yucateca con caldo de pollo dorado, pechuga desmenuzada, jitomate asado, cebolla morada, chile habanero suave y el toque distintivo de lima yucateca. Se decora con tiras de tortilla crujiente y aguacate. Confort en cada cucharada.",
      emoji: "🍋",
      gradient: "from-yellow-500 to-amber-400",
    },
  ],
  Tacos: [
    {
      name: "Al Pastor",
      desc: "Cerdo adobado, pina, cilantro, cebolla",
      detail: "Cerdo marinado 24 horas en achiote, chiles guajillo y ancho, oregano y especias. Cocinado en trompo vertical y cortado al momento. Servido con pina natural, cilantro fresco, cebolla blanca y salsa verde tatemada. El taco mas icónico de la cultura mexicana.",
      emoji: "🌮",
      gradient: "from-red-600 to-orange-500",
      spicy: true,
    },
    {
      name: "Birria",
      desc: "Res estofada en consomme, queso, cilantro",
      detail: "Res cocida lentamente por 6 horas en consomme de chiles guajillo, ancho y pasilla con especias mexicanas. Servida con queso Chihuahua fundido, cilantro y cebolla. Acompanada de consomme caliente para mojar. La receta favorita de nuestros clientes.",
      emoji: "🥩",
      gradient: "from-rose-700 to-red-500",
    },
    {
      name: "Camarones",
      desc: "Camaron a la diabla, col morada, chipotle",
      detail: "Camarones jumbo salteados en salsa a la diabla con chile de arbol, chipotle ahumado y mantequilla de ajo. Servidos sobre tortilla de maiz azul con col morada encurtida, crema de chipotle y jugo de limon. Picantes y llenos de sabor del oceano.",
      emoji: "🦐",
      gradient: "from-pink-700 to-red-600",
      spicy: true,
    },
    {
      name: "Hongos",
      desc: "Hongos salteados, epazote, chile poblano",
      detail: "Mix de hongos de temporada — portobello, shiitake y ostra — salteados con ajo, epazote fresco, chile poblano asado y mantequilla. Servidos en tortilla de maiz hecha a mano con frijoles negros, queso Oaxaca y salsa verde. Opcion vegetariana de sabor intenso.",
      emoji: "🍄",
      gradient: "from-amber-700 to-yellow-600",
      veg: true,
    },
    {
      name: "Carnitas",
      desc: "Cerdo confitado, salsa verde, cebolla morada",
      detail: "Cerdo confitado en manteca de cerdo durante 4 horas con naranja, canela, hojas de laurel y ajo hasta lograr una textura que se deshace. Crujiente por fuera, jugoso por dentro. Servido con salsa verde tatemada, cebolla morada y chile serrano.",
      emoji: "🐷",
      gradient: "from-amber-600 to-orange-500",
    },
  ],
  "Platos Fuertes": [
    {
      name: "Mole Negro",
      desc: "Pollo bañado en mole negro oaxaqueño, arroz, frijoles",
      detail: "Nuestro mole negro es una receta de mas de 30 ingredientes: chiles mulato, pasilla, chihuacle negro, chocolate amargo, platano macho, ajonjoli y especias. Cocinado lentamente por 8 horas. Servido sobre muslo de pollo rostizado, arroz rojo y frijoles negros con epazote. Patrimonio de la cocina mexicana.",
      emoji: "🍗",
      gradient: "from-stone-700 to-amber-800",
    },
    {
      name: "Chile en Nogada",
      desc: "Chile poblano relleno, nogada de nuez, granadas",
      detail: "Chile poblano asado relleno de picadillo de res y cerdo con frutas de temporada — durazno, pera, platano y almendras — bañado en nogada de nuez de Castilla fresca, decorado con granada roja y perejil. Los colores de la bandera mexicana en un solo plato.",
      emoji: "🌶️",
      gradient: "from-green-700 to-emerald-600",
      veg: true,
    },
    {
      name: "Ribeye a la Mexicana",
      desc: "300g, nopal asado, salsa roja, frijoles charros",
      detail: "Corte de Ribeye de 300g al punto deseado, sazonado con especias mexicanas y sellado en comal de hierro. Acompanado de nopal asado con ensalada de chile de arbol, frijoles charros con tocino y chorizo, y salsa roja de molcajete. El favorito de los carnivoros.",
      emoji: "🥩",
      gradient: "from-red-800 to-rose-700",
      spicy: true,
    },
    {
      name: "Camarones al Mezcal",
      desc: "Camarones jumbo, crema de chile ancho, arroz verde",
      detail: "Camarones gigantes flambeados en mezcal Joven con mantequilla de ajo negro, servidos sobre crema de chile ancho tatemado y arroz verde de cilantro. Un plato que combina la tradicion del mezcal artesanal con ingredientes del Pacifico mexicano. Experiencia gourmet.",
      emoji: "🦐",
      gradient: "from-blue-700 to-teal-600",
    },
  ],
  Bebidas: [
    {
      name: "Margarita Clasica",
      desc: "Tequila blanco, limon, triple sec, sal",
      detail: "La clasica bien hecha: tequila blanco 100% agave, jugo de limon exprimido al momento, triple sec premium y una pizca de sal de grano. Servida en copa escarcha con sal de grano y limon. Simple, perfecta, inigualable. La base de toda buena cantina.",
      emoji: "🍹",
      gradient: "from-yellow-500 to-lime-500",
    },
    {
      name: "Mezcal Negroni",
      desc: "Mezcal Joven, Campari, Vermut Rojo",
      detail: "Un Negroni con caracter mexicano: mezcal joven artesanal de Oaxaca en lugar del gin clasico, Campari italiano y Vermut Rojo dulce. Servido en vaso old fashioned con hielo esferico y una piel de naranja expresada. Para los amantes de lo amargo y lo complejo.",
      emoji: "🥃",
      gradient: "from-red-700 to-amber-600",
    },
    {
      name: "Agua de Jamaica",
      desc: "Flor de Jamaica, azucar de cana, hierbabuena",
      detail: "Infusion artesanal de flor de Jamaica seca de Guerrero, endulzada con azucar de cana natural, enfriada lentamente y servida con hierbabuena fresca y limon. Una bebida sin alcohol llena de antioxidantes y sabor genuino. Refrescante y natural.",
      emoji: "🌺",
      gradient: "from-pink-700 to-fuchsia-600",
      veg: true,
    },
    {
      name: "Michelada Maya",
      desc: "Cerveza, clamato, limon, chamoy, tajin",
      detail: "La michelada de la casa: cerveza lager fria mezclada con clamato, jugo de limon fresco, salsa Worcestershire, Tabasco y sal de ajo. Vaso escarcha con chamoy y tajin. Decorada con camarones encurtidos y pepino. Una explosion de sabores que solo Maya sabe hacer.",
      emoji: "🍺",
      gradient: "from-amber-600 to-red-500",
      spicy: true,
    },
  ],
  Postres: [
    {
      name: "Tres Leches",
      desc: "Bizcocho esponjoso empapado en tres leches, crema batida",
      detail: "Bizcocho casero horneado en el momento y empapado en la mezcla de leche entera, leche evaporada y leche condensada. Cubierto con crema batida artesanal y decorado con canela en polvo. Ligero, humedo y con ese sabor dulce que recuerda la cocina de la abuela.",
      emoji: "🍰",
      gradient: "from-amber-200 to-yellow-300",
      veg: true,
    },
    {
      name: "Churros con Chocolate",
      desc: "Churros crujientes, chocolate caliente, cajeta",
      detail: "Churros fritos al momento con masa de choux, crujientes por fuera y suaves por dentro, espolvoreados con azucar y canela. Servidos con chocolate caliente artesanal de cacao mexicano de Tabasco y cajeta de cabra para mojar. El postre mas pedido de la casa.",
      emoji: "🍫",
      gradient: "from-amber-700 to-yellow-600",
    },
    {
      name: "Helado de Elote",
      desc: "Helado artesanal de elote dulce, cajeta, canela",
      detail: "Helado elaborado con elote dulce fresco de temporada, leche entera y crema. De textura cremosa y sabor inconfundible. Servido en copa con cajeta artesanal de Celaya, canela molida y nuez tostada. Una interpretacion gourmet de un sabor tipicamente mexicano.",
      emoji: "🌽",
      gradient: "from-yellow-400 to-amber-400",
      veg: true,
    },
  ],
};

export default function SmartTable() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuCategory, setMenuCategory] = useState<MenuCategory>("Entradas");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({
    rating: 0,
    issues: [],
    comment: "",
    submitted: false,
  });

  const portalButtons = [
    {
      id: "menu",
      label: "Menu Digital",
      icon: QrCode,
      color: "from-amber-600 to-amber-400",
      desc: "Carta completa con descripcion y fotos de cada platillo",
      url: null,
    },
    {
      id: "reviews",
      label: "Comparte tu experiencia",
      icon: Heart,
      color: "from-yellow-600 to-yellow-400",
      desc: "Disfrutaste con nosotros? Compartelo con la gente.",
      url: "https://www.google.com/search?q=maya+cantina+reviews+google",
    },
    {
      id: "events",
      label: "Eventos",
      icon: Calendar,
      color: "from-orange-700 to-orange-500",
      desc: "Noche Maya, maridajes y celebraciones especiales",
      url: "https://mayacantina.toast.site/events",
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: Instagram,
      color: "from-pink-700 to-pink-500",
      desc: "Siguenos en Instagram y ve nuestros reels y stories",
      url: "https://www.instagram.com/mayacantinasac?igsh=NTc4MTIwNjQ2YQ==",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      color: "from-blue-700 to-blue-500",
      desc: "Pagina oficial y comunidad de Maya en Facebook",
      url: "https://www.facebook.com/Mayarestaurantsac?mibextid=wwXIfr",
    },
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
    setFeedback({ rating: 0, issues: [], comment: "", submitted: false });
  };

  const handlePortalButton = (btn: typeof portalButtons[0]) => {
    setActiveButton(btn.id);
    if (btn.id === "menu") {
      setShowMenu(true);
    } else if (btn.url) {
      window.open(btn.url, "_blank", "noopener,noreferrer");
    }
  };

  const toggleIssue = (issue: string) => {
    setFeedback(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue],
    }));
  };

  const submitFeedback = () => {
    setFeedback(prev => ({ ...prev, submitted: true }));
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
            <motion.div
              className="relative w-64 h-80 maya-card rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={handleNfcTap}
              data-testid="nfc-stand"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-t-2xl" />
              <div className="text-center">
                <div className="text-2xl font-serif font-bold gold-gradient">Restaurante</div>
                <div className="text-3xl font-serif font-bold gold-gradient">MAYA</div>
              </div>
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wifi size={14} className="text-amber-400" />
                <span>Toca aqui con tu celular</span>
              </div>
              <div className="text-xs text-muted-foreground/60">Mesa #07 • Salon Principal</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-b-2xl" />
            </motion.div>

            <p className="mt-3 text-xs text-muted-foreground text-center">
              Haz clic en el stand para simular un toque NFC
            </p>

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
                  Herramienta de <span className="text-amber-300 font-medium">engagement y marketing directo</span>.
                  Los datos del cliente se capturan en <span className="text-amber-300 font-medium">Table Reserve</span> al hacer una reservacion.
                  Los botones con enlace real abren el sitio en una nueva pestana.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portal Cliente — Phone mockup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Smartphone size={20} /> Portal del Cliente — Links Reales
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
                  {/* Photo area */}
                  <div className={`relative h-52 bg-gradient-to-br ${selectedDish.gradient} flex flex-col items-center justify-center shrink-0`}>
                    <button
                      onClick={() => setSelectedDish(null)}
                      className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs text-white font-medium"
                    >
                      <ArrowLeft size={13} /> Regresar
                    </button>
                    <span className="text-7xl drop-shadow-lg">{selectedDish.emoji}</span>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white leading-tight">{selectedDish.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedDish.spicy && (
                            <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-900/30 px-2 py-0.5 rounded-full">
                              <Flame size={10} /> Picante
                            </span>
                          )}
                          {selectedDish.veg && (
                            <span className="flex items-center gap-1 text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full">
                              <Leaf size={10} /> Vegetariano
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{selectedDish.detail}</p>

                    <div className="p-3 bg-amber-900/20 border border-amber-800/30 rounded-xl">
                      <p className="text-xs text-amber-300/80 italic">
                        "Cocinado con ingredientes frescos y recetas autenticas de la cocina mexicana tradicional."
                      </p>
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
                  {/* Menu header */}
                  <div className="relative bg-white flex flex-col items-center pt-4 pb-3 shrink-0">
                    <button
                      onClick={() => { setShowMenu(false); setActiveButton(null); setSelectedDish(null); }}
                      className="absolute left-3 top-4 flex items-center gap-1 text-xs text-blue-600 font-medium"
                    >
                      <ArrowLeft size={14} /> Volver
                    </button>
                    <img src="/maya-logo.jpeg" alt="Maya Cantina" className="h-14 object-contain" />
                    <p className="text-xs text-gray-500 mt-1">Cocina Mexicana • SAC, CA</p>
                  </div>

                  {/* Category tabs */}
                  <div className="flex gap-0 bg-gray-900 border-b border-gray-800 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
                    {MENU_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setMenuCategory(cat)}
                        className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                          menuCategory === cat
                            ? "border-amber-400 text-amber-400"
                            : "border-transparent text-gray-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Menu items — tappable */}
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={menuCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="divide-y divide-gray-800"
                      >
                        {MENU_ITEMS[menuCategory].map((item) => (
                          <motion.button
                            key={item.name}
                            onClick={() => setSelectedDish(item)}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 p-3 text-left active:bg-gray-800/60"
                          >
                            {/* Mini photo */}
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

                  {/* Legend */}
                  <div className="flex gap-3 px-3 py-2 border-t border-gray-800 bg-gray-900 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Flame size={10} className="text-orange-500" /> Picante
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Leaf size={10} className="text-green-500" /> Vegetariano
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===== PORTAL MAIN VIEW ===== */}
            <div className="absolute inset-0 top-8 bg-gradient-to-b from-gray-950 to-black overflow-y-auto scrollbar-gold">
              <div className="relative h-24 bg-gradient-to-b from-amber-900/60 to-transparent flex flex-col items-center justify-center">
                <div className="text-xl font-serif font-bold gold-gradient">RESTAURANTE MAYA</div>
                <div className="text-xs text-amber-300/70 mt-1">Cocina Mexicana Autentica</div>
              </div>

              <div className="px-4 pb-6 space-y-3">
                <p className="text-xs text-center text-gray-400">Selecciona una opcion</p>

                {/* Main buttons grid */}
                <div className="grid grid-cols-2 gap-3">
                  {portalButtons.map((btn) => (
                    <motion.button
                      key={btn.id}
                      onClick={() => handlePortalButton(btn)}
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
                      <span className="text-xs text-center font-medium text-gray-200 leading-tight">{btn.label}</span>
                      {btn.url && (
                        <ExternalLink size={8} className="absolute top-2 left-2 text-gray-600" />
                      )}
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
                  {activeButton && activeButton !== "feedback" && activeButton !== "menu" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-amber-900/20 border border-amber-800/40 rounded-xl"
                    >
                      <p className="text-xs text-amber-200/80">
                        {portalButtons.find(b => b.id === activeButton)?.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feedback button */}
                <motion.button
                  onClick={() => setActiveButton(activeButton === "feedback" ? null : "feedback")}
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
                    <div className="text-xs font-semibold text-orange-300">Tuviste una mala experiencia?</div>
                    <div className="text-xs text-gray-500 mt-0.5">Ayudanos a mejorar</div>
                  </div>
                  <MessageCircleWarning size={14} className="text-orange-500 ml-auto" />
                </motion.button>

                {/* Feedback questionnaire */}
                <AnimatePresence>
                  {activeButton === "feedback" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border border-orange-800/40 rounded-2xl overflow-hidden bg-gray-900/80"
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
                          <p className="text-sm font-semibold text-green-400 mb-1">Gracias por tu retroalimentacion</p>
                          <p className="text-xs text-gray-400">Tu opinion nos ayuda a mejorar cada dia. El equipo de Maya la revisara personalmente.</p>
                        </motion.div>
                      ) : (
                        <div className="p-3 space-y-3">
                          <p className="text-xs font-semibold text-orange-300">Como fue tu experiencia hoy?</p>
                          <div className="flex gap-1 justify-center">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  size={22}
                                  className={feedback.rating >= star ? "fill-amber-400 text-amber-400" : "text-gray-600"}
                                />
                              </button>
                            ))}
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-2">Cual fue el problema?</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {ISSUE_OPTIONS.map(issue => (
                                <button
                                  key={issue}
                                  onClick={() => toggleIssue(issue)}
                                  className={`text-left px-2 py-1.5 rounded-lg border text-xs transition-all ${
                                    feedback.issues.includes(issue)
                                      ? "border-orange-600/60 bg-orange-900/30 text-orange-300"
                                      : "border-gray-700 text-gray-400"
                                  }`}
                                >
                                  {feedback.issues.includes(issue) && (
                                    <Check size={10} className="inline mr-1 text-orange-400" />
                                  )}
                                  {issue}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1.5">Algo mas que quieras agregar?</p>
                            <textarea
                              value={feedback.comment}
                              onChange={e => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                              placeholder="Cuentanos que paso..."
                              rows={2}
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-orange-600 resize-none"
                            />
                          </div>
                          <button
                            onClick={submitFeedback}
                            disabled={feedback.rating === 0}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                              feedback.rating > 0
                                ? "bg-orange-600 hover:bg-orange-500 text-white"
                                : "bg-gray-800 text-gray-600 cursor-not-allowed"
                            }`}
                          >
                            <Send size={12} />
                            Enviar mi opinion
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-2 pt-1">
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
            { step: "02", title: "Ve el menu digital", desc: "Carta completa con fotos y descripcion detallada de cada platillo" },
            { step: "03", title: "Cualquier link que el dueno elija", desc: "Juegos, trivias, promociones, videos — el dueno configura el destino desde el panel de control" },
            { step: "04", title: "Comparte su experiencia", desc: "Acceso directo a Google Business para calificar con 5 estrellas en segundos" },
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
