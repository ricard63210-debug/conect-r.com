import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Info, Languages } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import MenuChat from "@/components/MenuChat";

type Lang = "es" | "en";

type MenuItem = {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  price: number;
  image: string;
  tags: string[];
};

type Category = {
  category: string;
  category_en: string;
  items: MenuItem[];
};

const MENU_DATA: Category[] = [
  {
    category: "BRUNCH",
    category_en: "BRUNCH",
    items: [
      {
        id: "chilaquiles",
        title: "Chilaquiles Maya",
        title_en: "Maya Chilaquiles",
        description: "Tortillas de maíz fritas en salsa roja o verde, queso, arrachera, papas y frijoles",
        description_en: "Crispy corn tortillas in red or green salsa, cheese, skirt steak, potatoes and beans",
        price: 19.0,
        image: `${import.meta.env.BASE_URL}images/chilaquiles.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "huevos-rancheros",
        title: "Huevos Rancheros",
        title_en: "Huevos Rancheros",
        description: "Huevos sobre tortilla con salsa roja casera, frijoles negros y chorizo",
        description_en: "Eggs over tortilla with house red salsa, black beans and chorizo",
        price: 16.0,
        image: `${import.meta.env.BASE_URL}images/huevos-rancheros.png`,
        tags: [],
      },
      {
        id: "pancakes-cajeta",
        title: "Pancakes de Cajeta",
        title_en: "Cajeta Pancakes",
        description: "Hot cakes esponjosos con cajeta artesanal, fresas y crema",
        description_en: "Fluffy pancakes with artisanal cajeta caramel, strawberries and cream",
        price: 14.0,
        image: `${import.meta.env.BASE_URL}images/pancakes-cajeta.png`,
        tags: [],
      },
    ],
  },
  {
    category: "STARTERS",
    category_en: "STARTERS",
    items: [
      {
        id: "birria-egg-rolls",
        title: "Birria Egg Rolls",
        title_en: "Birria Egg Rolls",
        description: "Rollos crujientes rellenos de birria de res y queso, servidos con consomé, cebolla curtida y salsa molcajete",
        description_en: "Crispy rolls filled with beef birria and cheese, served with consommé, pickled onion and molcajete salsa",
        price: 13.0,
        image: `${import.meta.env.BASE_URL}images/birria-egg-rolls.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "pork-belly-bites",
        title: "Pork Belly Bites",
        title_en: "Pork Belly Bites",
        description: "Chicharrón de cerdo crujiente con salsa de néctar de agave dulce y picante",
        description_en: "Crispy pork belly with sweet & spicy agave nectar sauce",
        price: 12.0,
        image: `${import.meta.env.BASE_URL}images/pork-belly-bites.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "guacamole",
        title: "Guacamole Maya",
        title_en: "Maya Guacamole",
        description: "Aguacate fresco, jitomate, cilantro, cebolla morada y chile serrano",
        description_en: "Fresh avocado, tomato, cilantro, red onion and serrano chile",
        price: 11.0,
        image: `${import.meta.env.BASE_URL}images/guacamole.png`,
        tags: ["🌿 Vegetariano"],
      },
      {
        id: "elote-loco",
        title: "Elote Loco",
        title_en: "Elote Loco",
        description: "Elote asado con mayonesa, queso cotija, chile piquín y limón",
        description_en: "Grilled corn with mayo, cotija cheese, piquin chile and lime",
        price: 9.0,
        image: `${import.meta.env.BASE_URL}images/elote-loco.png`,
        tags: ["🌿 Vegetariano"],
      },
    ],
  },
  {
    category: "TACOS",
    category_en: "TACOS",
    items: [
      {
        id: "taco-maya",
        title: "Taco Maya",
        title_en: "Maya Taco",
        description: "Skirt steak, queso fresco, aguacate, cebolla curtida, inspirado en la dieta maya",
        description_en: "Skirt steak, queso fresco, avocado, pickled onion — inspired by the Mayan diet",
        price: 16.0,
        image: `${import.meta.env.BASE_URL}images/taco-maya.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "taco-birria",
        title: "Taco de Birria",
        title_en: "Birria Taco",
        description: "Res estofada en consomé con queso, cebolla y cilantro",
        description_en: "Slow-braised beef in consommé with cheese, onion and cilantro",
        price: 15.0,
        image: `${import.meta.env.BASE_URL}images/taco-birria.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "taco-carnitas",
        title: "Taco de Carnitas",
        title_en: "Carnitas Taco",
        description: "Cerdo confitado, salsa verde, cebolla y cilantro",
        description_en: "Confit pork, green salsa, onion and cilantro",
        price: 14.0,
        image: `${import.meta.env.BASE_URL}images/taco-carnitas.png`,
        tags: [],
      },
      {
        id: "taco-vegano",
        title: "Taco Vegano",
        title_en: "Vegan Taco",
        description: "Hongos portobello al pastor, aguacate, pico de gallo",
        description_en: "Al pastor portobello mushrooms, avocado, pico de gallo",
        price: 13.0,
        image: `${import.meta.env.BASE_URL}images/taco-vegano.png`,
        tags: ["🌿 Vegetariano"],
      },
    ],
  },
  {
    category: "MARISCOS",
    category_en: "SEAFOOD",
    items: [
      {
        id: "ceviche",
        title: "Ceviche Maya",
        title_en: "Maya Ceviche",
        description: "Camarón y pulpo marinados en limón, jitomate, cebolla, cilantro y chile jalapeño",
        description_en: "Shrimp and octopus marinated in lime, tomato, onion, cilantro and jalapeño",
        price: 18.0,
        image: `${import.meta.env.BASE_URL}images/ceviche.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "tostadas-atun",
        title: "Tostadas de Atún",
        title_en: "Tuna Tostadas",
        description: "Atún fresco con aguacate, mayonesa de chipotle y masago",
        description_en: "Fresh tuna with avocado, chipotle mayo and masago",
        price: 17.0,
        image: `${import.meta.env.BASE_URL}images/tostadas-atun.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "aguachile",
        title: "Aguachile Verde",
        title_en: "Green Aguachile",
        description: "Camarón crudo marinado en chile serrano, pepino y cebolla morada",
        description_en: "Raw shrimp marinated in serrano chile, cucumber and red onion",
        price: 19.0,
        image: `${import.meta.env.BASE_URL}images/aguachile.png`,
        tags: ["🌶 Picante"],
      },
    ],
  },
  {
    category: "PLATOS FUERTES",
    category_en: "MAINS",
    items: [
      {
        id: "mole",
        title: "Mole Negro",
        title_en: "Black Mole",
        description: "Pechuga de pollo bañada en mole negro oaxaqueño, arroz y frijoles",
        description_en: "Chicken breast bathed in Oaxacan black mole, rice and beans",
        price: 22.0,
        image: `${import.meta.env.BASE_URL}images/mole.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "arrachera",
        title: "Arrachera a la Parrilla",
        title_en: "Grilled Skirt Steak",
        description: "Arrachera marinada con chimichurri maya, papas rústicas y ensalada",
        description_en: "Skirt steak marinated with Maya chimichurri, rustic potatoes and salad",
        price: 26.0,
        image: `${import.meta.env.BASE_URL}images/arrachera.png`,
        tags: [],
      },
      {
        id: "chile-nogada",
        title: "Chile en Nogada",
        title_en: "Chile en Nogada",
        description: "Poblano relleno de picadillo, cubierto de nogada de nuez y granada",
        description_en: "Poblano stuffed with picadillo, topped with walnut nogada and pomegranate",
        price: 24.0,
        image: `${import.meta.env.BASE_URL}images/chile-nogada.png`,
        tags: [],
      },
      {
        id: "camarones-mezcal",
        title: "Camarones al Mezcal",
        title_en: "Mezcal Shrimp",
        description: "Camarones en mantequilla de ajo y mezcal, arroz negro y tortillas",
        description_en: "Shrimp in garlic-mezcal butter, black rice and tortillas",
        price: 25.0,
        image: `${import.meta.env.BASE_URL}images/camarones-mezcal.png`,
        tags: ["🌶 Picante"],
      },
    ],
  },
  {
    category: "DRINKS",
    category_en: "DRINKS",
    items: [
      {
        id: "margarita",
        title: "Margarita Clásica",
        title_en: "Classic Margarita",
        description: "Tequila 100% agave, triple sec, limón fresco, sal",
        description_en: "100% agave tequila, triple sec, fresh lime, salt",
        price: 12.0,
        image: `${import.meta.env.BASE_URL}images/margarita.png`,
        tags: [],
      },
      {
        id: "margarita-tamarindo",
        title: "Margarita de Tamarindo",
        title_en: "Tamarind Margarita",
        description: "Con pulpa de tamarindo y chile piquín",
        description_en: "With tamarind pulp and piquin chile",
        price: 13.0,
        image: `${import.meta.env.BASE_URL}images/margarita-tamarindo.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "mezcal-negroni",
        title: "Mezcal Negroni",
        title_en: "Mezcal Negroni",
        description: "Mezcal, Campari, vermut rosso",
        description_en: "Mezcal, Campari, sweet vermouth",
        price: 14.0,
        image: `${import.meta.env.BASE_URL}images/mezcal-negroni.png`,
        tags: [],
      },
      {
        id: "michelada",
        title: "Michelada Maya",
        title_en: "Maya Michelada",
        description: "Cerveza con clamato, salsa valentina, limón y especias",
        description_en: "Beer with clamato, Valentina hot sauce, lime and spices",
        price: 10.0,
        image: `${import.meta.env.BASE_URL}images/michelada.png`,
        tags: [],
      },
      {
        id: "agua-jamaica",
        title: "Agua de Jamaica",
        title_en: "Hibiscus Water",
        description: "Hibisco fresco, sin azúcar añadida",
        description_en: "Fresh hibiscus, no added sugar",
        price: 5.0,
        image: `${import.meta.env.BASE_URL}images/agua-jamaica.png`,
        tags: ["🌿 Vegetariano"],
      },
    ],
  },
];

const TAG_TRANSLATIONS: Record<string, string> = {
  "⭐ Favorito del Chef": "⭐ Chef's Favorite",
  "🌶 Picante": "🌶 Spicy",
  "🌿 Vegetariano": "🌿 Vegetarian",
};

function translateTag(tag: string, lang: Lang): string {
  if (lang === "en" && TAG_TRANSLATIONS[tag]) return TAG_TRANSLATIONS[tag];
  return tag;
}

const COPY = {
  es: {
    tagline: "Cocina Mexicana Auténtica",
    address: "455 Bercut Dr, Sacramento, CA 95811",
    hours: "Lun-Dom 9am–10pm",
    upcoming: "Próximos Eventos",
    searchPlaceholder: "Buscar platillo o ingrediente...",
    noResults: (q: string) => `No se encontraron resultados para "${q}"`,
    eventsTitle: "Próximos Eventos",
    eventsSubtitle: "Música en vivo, shows y noches especiales en Maya Cantina",
    reserveEvent: "Reservar Mesa para el Evento",
    ingredients: "Ingredientes",
    backToMenu: "Volver al Menú",
    langOther: "EN",
  },
  en: {
    tagline: "Authentic Mexican Cuisine",
    address: "455 Bercut Dr, Sacramento, CA 95811",
    hours: "Mon-Sun 9am–10pm",
    upcoming: "Upcoming Events",
    searchPlaceholder: "Search for a dish or ingredient...",
    noResults: (q: string) => `No results found for "${q}"`,
    eventsTitle: "Upcoming Events",
    eventsSubtitle: "Live music, shows and special nights at Maya Cantina",
    reserveEvent: "Reserve a Table for the Event",
    ingredients: "Ingredients",
    backToMenu: "Back to Menu",
    langOther: "ES",
  },
} as const;

const EVENTS = [
  {
    id: "mariachi",
    day: { es: "Viernes", en: "Friday" },
    time: "8:00 PM",
    title: { es: "Noche de Mariachi", en: "Mariachi Night" },
    desc: {
      es: "Los mejores mariachis de Sacramento llenan la cantina con tradición, sabor y romance. Música en vivo toda la noche.",
      en: "Sacramento's best mariachis fill the cantina with tradition, flavor and romance. Live music all night.",
    },
    img: "https://images.unsplash.com/photo-1571266028253-6c1f7c75e1f0?w=800&h=600&fit=crop",
    fallbackEmoji: "🎺",
    color: "from-[#D35400] to-[#F0A500]",
  },
  {
    id: "banda",
    day: { es: "Sábado", en: "Saturday" },
    time: "9:00 PM",
    title: { es: "Banda Machos en Vivo", en: "Banda Machos Live" },
    desc: {
      es: "La legendaria Banda Machos llega a Maya Cantina. Una noche de banda, baile y energía pura. Cupo limitado.",
      en: "The legendary Banda Machos comes to Maya Cantina. A night of banda, dancing and pure energy. Limited seating.",
    },
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    fallbackEmoji: "🎷",
    color: "from-[#7c2d12] to-[#D35400]",
  },
  {
    id: "badbunny",
    day: { es: "Domingo", en: "Sunday" },
    time: "8:30 PM",
    title: { es: "Bad Bunny — Tributo en Vivo", en: "Bad Bunny — Live Tribute" },
    desc: {
      es: "El mejor imitador de Bad Bunny de la costa oeste. Reggaetón, baile y ambiente de estadio en plena cantina.",
      en: "The best Bad Bunny tribute on the west coast. Reggaetón, dancing and stadium vibes inside the cantina.",
    },
    img: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&h=600&fit=crop",
    fallbackEmoji: "🐰",
    color: "from-[#a21caf] to-[#D35400]",
  },
  {
    id: "pajares",
    day: { es: "Todos los Domingos", en: "Every Sunday" },
    time: "1:00 PM",
    title: { es: "Pajares — Show Familiar", en: "Pajares — Family Show" },
    desc: {
      es: "Los Pajares cada domingo: comedia, música y diversión para toda la familia mientras disfrutas el brunch.",
      en: "Pajares every Sunday: comedy, music and fun for the whole family while you enjoy brunch.",
    },
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    fallbackEmoji: "🎭",
    color: "from-[#2E7D32] to-[#F0A500]",
  },
];

export default function Menu() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("maya-lang");
    return saved === "es" ? "es" : "en";
  });

  const t = COPY[lang];

  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].category);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("maya-lang", lang);
    }
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTitle = (it: MenuItem) => (lang === "en" ? it.title_en : it.title);
  const getDesc = (it: MenuItem) => (lang === "en" ? it.description_en : it.description);
  const getCat = (c: Category) => (lang === "en" ? c.category_en : c.category);

  const filteredCategories = MENU_DATA.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        getTitle(item).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getDesc(item).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((category) => category.items.length > 0);

  const displayCategories = searchQuery
    ? filteredCategories
    : MENU_DATA.filter((c) => c.category === activeCategory);

  const scrollToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 font-sans">
      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#121212]/90 backdrop-blur-md shadow-md py-3 border-b border-white/5" : "bg-transparent py-6"
        }`}
      >
        {/* Top bar — language toggle (always visible) */}
        <div className="container mx-auto px-4 flex justify-end mb-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-[#F0A500] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
            aria-label="Switch language"
          >
            <Languages size={13} />
            {t.langOther}
          </button>
        </div>

        <div className="container mx-auto px-4 flex justify-between items-center relative">
          {/* Big centered logo (unscrolled) */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              scrolled ? "opacity-0 scale-95 pointer-events-none absolute" : "opacity-100 scale-100 relative"
            } flex flex-col items-center justify-center w-full`}
          >
            <img
              src={`${import.meta.env.BASE_URL}maya-logo.jpeg`}
              alt="Maya Cantina"
              className="w-24 h-24 object-contain rounded-full shadow-lg border-2 border-[#D35400]/20 mb-3"
            />
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest text-center font-medium px-4">
              {t.tagline} • {t.address}
            </p>
            {/* Próximos Eventos pill — centered, BELOW the address */}
            <button
              onClick={scrollToEvents}
              className="mt-4 inline-flex items-center gap-2 bg-[#D35400] hover:bg-[#D35400]/90 text-white text-[11px] font-bold py-2.5 px-5 rounded-full uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(211,84,0,0.4)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {t.upcoming}
            </button>
          </div>

          {/* Compact bar (scrolled) */}
          <div
            className={`transition-all duration-500 flex items-center gap-3 ${
              scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none absolute"
            }`}
          >
            <img
              src={`${import.meta.env.BASE_URL}maya-logo.jpeg`}
              alt="Maya Cantina"
              className="w-10 h-10 object-contain rounded-full border border-[#D35400]/20"
            />
            <div className="text-xl font-serif font-bold text-[#D35400]">MAYA</div>
          </div>

          {/* Compact Próximos Eventos button (scrolled only) */}
          {scrolled && (
            <button
              onClick={scrollToEvents}
              className="bg-[#D35400] hover:bg-[#D35400]/90 text-white text-[11px] font-bold py-2 px-3.5 rounded-full uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(211,84,0,0.4)]"
            >
              {t.upcoming}
            </button>
          )}
        </div>

        {/* Search */}
        <div className="container mx-auto px-4 mt-6 mb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white pl-12 rounded-2xl focus-visible:ring-[#D35400] h-14 text-base font-medium placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="container mx-auto px-0 mt-4">
            <div className="flex overflow-x-auto hide-scrollbar px-4 gap-3 pb-3">
              {MENU_DATA.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat.category
                      ? "bg-[#D35400] text-white shadow-[0_4px_14px_rgba(211,84,0,0.3)]"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {getCat(cat)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Menu Grid */}
      <main className="container mx-auto px-4 mt-6">
        <AnimatePresence mode="popLayout">
          {displayCategories.map((category) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              {searchQuery && (
                <h2 className="text-2xl font-serif font-bold mb-6 text-[#F0A500] tracking-wide">
                  {getCat(category)}
                </h2>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    onClick={() => setSelectedItem(item)}
                    className="bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-xl border border-white/5 cursor-pointer active:scale-[0.98] transition-transform flex flex-col"
                  >
                    <div className="h-56 w-full relative overflow-hidden bg-[#222]">
                      <img
                        src={item.image}
                        alt={getTitle(item)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent flex items-end p-5"></div>
                      {item.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-md ${
                                tag.includes("Favorito")
                                  ? "bg-[#F0A500]/90 text-white"
                                  : tag.includes("Picante")
                                    ? "bg-red-500/90 text-white"
                                    : "bg-[#2E7D32]/90 text-white"
                              }`}
                            >
                              {translateTag(tag, lang)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h3 className="font-serif font-bold text-xl leading-tight text-white">{getTitle(item)}</h3>
                        <span className="text-[#D35400] font-bold text-lg whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed flex-1 font-sans">
                        {getDesc(item)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {displayCategories.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">{t.noResults(searchQuery)}</p>
          </div>
        )}
      </main>

      {/* Eventos */}
      <section id="eventos" className="container mx-auto px-4 mt-16 scroll-mt-32">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F0A500] tracking-wide mb-2">
            {t.eventsTitle}
          </h2>
          <p className="text-gray-400 text-sm">{t.eventsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-xl border border-white/5 flex flex-col"
            >
              <div className={`h-56 w-full relative overflow-hidden bg-gradient-to-br ${ev.color}`}>
                <img
                  src={ev.img}
                  alt={ev.title[lang]}
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {ev.day[lang]} · {ev.time}
                </div>
                <div className="absolute bottom-4 right-4 text-5xl drop-shadow-lg">{ev.fallbackEmoji}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-2xl leading-tight text-white mb-2">{ev.title[lang]}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">{ev.desc[lang]}</p>
                <a
                  href="https://tablereserve.conect-r.com/book/roosters-on-the-river"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#D35400] hover:bg-[#D35400]/90 text-white text-sm font-bold py-3 px-5 rounded-2xl uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(211,84,0,0.4)] text-center"
                >
                  {t.reserveEvent}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Socials */}
      <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-3">
        <a
          href="https://www.instagram.com/mayacantina"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-gradient-to-br from-[#D35400] to-[#F0A500] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          aria-label="Instagram"
        >
          <FaInstagram size={20} className="text-white" />
        </a>
        <a
          href="https://www.facebook.com/mayacantina"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          aria-label="Facebook"
        >
          <FaFacebookF size={18} className="text-white" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 text-center border-t border-white/5 mt-16 px-4">
        <img
          src={`${import.meta.env.BASE_URL}maya-logo.jpeg`}
          alt="Maya Cantina"
          className="w-16 h-16 object-contain rounded-full mx-auto opacity-50 mb-6 grayscale"
        />
        <div className="font-serif text-2xl font-bold text-[#D35400] mb-4 opacity-80 tracking-widest">MAYA CANTINA</div>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
          <MapPin size={16} className="text-[#F0A500]" /> {t.address}
        </div>
        <div className="text-sm text-gray-500 space-y-3 max-w-xs mx-auto bg-white/5 p-4 rounded-2xl">
          <p className="flex items-center justify-center gap-3">
            <Clock size={16} className="text-[#2E7D32]" /> {t.hours}
          </p>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 text-xs text-gray-600 font-medium">
          <a href="https://mayacantina.toast.site" className="hover:text-[#D35400] transition-colors">
            mayacantina.toast.site
          </a>
        </div>
      </footer>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto w-full md:w-[500px] bg-[#1A1A1A] rounded-t-[2.5rem] md:rounded-[2.5rem] z-50 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col border border-white/10"
            >
              <div className="h-72 w-full relative shrink-0 bg-[#222]">
                <img src={selectedItem.image} alt={getTitle(selectedItem)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center font-bold hover:bg-black/60 transition-colors border border-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 overflow-y-auto -mt-8 relative z-10">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <h2 className="font-serif font-black text-3xl text-white leading-none">{getTitle(selectedItem)}</h2>
                  <span className="text-[#D35400] font-black text-2xl bg-[#D35400]/10 px-4 py-2 rounded-2xl">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                </div>

                {selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedItem.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className={`text-sm px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${
                          tag.includes("Favorito")
                            ? "bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20"
                            : tag.includes("Picante")
                              ? "bg-red-500/10 text-red-500 border border-red-500/20"
                              : "bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20"
                        }`}
                      >
                        {translateTag(tag, lang)}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info size={16} className="text-[#D35400]" /> {t.ingredients}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-sans text-lg">{getDesc(selectedItem)}</p>
                </div>

                <div className="mt-8">
                  <button
                    className="w-full bg-[#D35400] hover:bg-[#D35400]/90 text-white rounded-2xl h-16 text-xl font-bold shadow-[0_8px_20px_rgba(211,84,0,0.3)] transition-all active:scale-95"
                    onClick={() => setSelectedItem(null)}
                  >
                    {t.backToMenu}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Menu Assistant */}
      <MenuChat lang={lang} menu={MENU_DATA} />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
