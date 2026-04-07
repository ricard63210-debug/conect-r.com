import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Info } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const MENU_DATA = [
  {
    category: "BRUNCH",
    items: [
      {
        id: "chilaquiles",
        title: "Chilaquiles Maya",
        description: "Tortillas de maíz fritas en salsa roja o verde, queso, arrachera, papas y frijoles",
        price: 19.00,
        image: `${import.meta.env.BASE_URL}images/chilaquiles.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "huevos-rancheros",
        title: "Huevos Rancheros",
        description: "Huevos sobre tortilla con salsa roja casera, frijoles negros y chorizo",
        price: 16.00,
        image: `${import.meta.env.BASE_URL}images/huevos-rancheros.png`,
        tags: [],
      },
      {
        id: "pancakes-cajeta",
        title: "Pancakes de Cajeta",
        description: "Hot cakes esponjosos con cajeta artesanal, fresas y crema",
        price: 14.00,
        image: `${import.meta.env.BASE_URL}images/pancakes-cajeta.png`,
        tags: [],
      }
    ]
  },
  {
    category: "STARTERS",
    items: [
      {
        id: "birria-egg-rolls",
        title: "Birria Egg Rolls",
        description: "Rollos crujientes rellenos de birria de res y queso, servidos con consomé, cebolla curtida y salsa molcajete",
        price: 13.00,
        image: `${import.meta.env.BASE_URL}images/birria-egg-rolls.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "pork-belly-bites",
        title: "Pork Belly Bites",
        description: "Chicharrón de cerdo crujiente con salsa de néctar de agave dulce y picante",
        price: 12.00,
        image: `${import.meta.env.BASE_URL}images/pork-belly-bites.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "guacamole",
        title: "Guacamole Maya",
        description: "Aguacate fresco, jitomate, cilantro, cebolla morada y chile serrano",
        price: 11.00,
        image: `${import.meta.env.BASE_URL}images/guacamole.png`,
        tags: ["🌿 Vegetariano"],
      },
      {
        id: "elote-loco",
        title: "Elote Loco",
        description: "Elote asado con mayonesa, queso cotija, chile piquín y limón",
        price: 9.00,
        image: `${import.meta.env.BASE_URL}images/elote-loco.png`,
        tags: ["🌿 Vegetariano"],
      }
    ]
  },
  {
    category: "TACOS",
    items: [
      {
        id: "taco-maya",
        title: "Taco Maya",
        description: "Skirt steak, queso fresco, aguacate, cebolla curtida, inspirado en la dieta maya",
        price: 16.00,
        image: `${import.meta.env.BASE_URL}images/taco-maya.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "taco-birria",
        title: "Taco de Birria",
        description: "Res estofada en consomé con queso, cebolla y cilantro",
        price: 15.00,
        image: `${import.meta.env.BASE_URL}images/taco-birria.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "taco-carnitas",
        title: "Taco de Carnitas",
        description: "Cerdo confitado, salsa verde, cebolla y cilantro",
        price: 14.00,
        image: `${import.meta.env.BASE_URL}images/taco-carnitas.png`,
        tags: [],
      },
      {
        id: "taco-vegano",
        title: "Taco Vegano",
        description: "Hongos portobello al pastor, aguacate, pico de gallo",
        price: 13.00,
        image: `${import.meta.env.BASE_URL}images/taco-vegano.png`,
        tags: ["🌿 Vegetariano"],
      }
    ]
  },
  {
    category: "MARISCOS",
    items: [
      {
        id: "ceviche",
        title: "Ceviche Maya",
        description: "Camarón y pulpo marinados en limón, jitomate, cebolla, cilantro y chile jalapeño",
        price: 18.00,
        image: `${import.meta.env.BASE_URL}images/ceviche.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "tostadas-atun",
        title: "Tostadas de Atún",
        description: "Atún fresco con aguacate, mayonesa de chipotle y masago",
        price: 17.00,
        image: `${import.meta.env.BASE_URL}images/tostadas-atun.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "aguachile",
        title: "Aguachile Verde",
        description: "Camarón crudo marinado en chile serrano, pepino y cebolla morada",
        price: 19.00,
        image: `${import.meta.env.BASE_URL}images/aguachile.png`,
        tags: ["🌶 Picante"],
      }
    ]
  },
  {
    category: "PLATOS FUERTES",
    items: [
      {
        id: "mole",
        title: "Mole Negro",
        description: "Pechuga de pollo bañada en mole negro oaxaqueño, arroz y frijoles",
        price: 22.00,
        image: `${import.meta.env.BASE_URL}images/mole.png`,
        tags: ["⭐ Favorito del Chef"],
      },
      {
        id: "arrachera",
        title: "Arrachera a la Parrilla",
        description: "Arrachera marinada con chimichurri maya, papas rústicas y ensalada",
        price: 26.00,
        image: `${import.meta.env.BASE_URL}images/arrachera.png`,
        tags: [],
      },
      {
        id: "chile-nogada",
        title: "Chile en Nogada",
        description: "Poblano relleno de picadillo, cubierto de nogada de nuez y granada",
        price: 24.00,
        image: `${import.meta.env.BASE_URL}images/chile-nogada.png`,
        tags: [],
      },
      {
        id: "camarones-mezcal",
        title: "Camarones al Mezcal",
        description: "Camarones en mantequilla de ajo y mezcal, arroz negro y tortillas",
        price: 25.00,
        image: `${import.meta.env.BASE_URL}images/camarones-mezcal.png`,
        tags: ["🌶 Picante"],
      }
    ]
  },
  {
    category: "DRINKS",
    items: [
      {
        id: "margarita",
        title: "Margarita Clásica",
        description: "Tequila 100% agave, triple sec, limón fresco, sal",
        price: 12.00,
        image: `${import.meta.env.BASE_URL}images/margarita.png`,
        tags: [],
      },
      {
        id: "margarita-tamarindo",
        title: "Margarita de Tamarindo",
        description: "Con pulpa de tamarindo y chile piquín",
        price: 13.00,
        image: `${import.meta.env.BASE_URL}images/margarita-tamarindo.png`,
        tags: ["🌶 Picante"],
      },
      {
        id: "mezcal-negroni",
        title: "Mezcal Negroni",
        description: "Mezcal, Campari, vermut rosso",
        price: 14.00,
        image: `${import.meta.env.BASE_URL}images/mezcal-negroni.png`,
        tags: [],
      },
      {
        id: "michelada",
        title: "Michelada Maya",
        description: "Cerveza con clamato, salsa valentina, limón y especias",
        price: 10.00,
        image: `${import.meta.env.BASE_URL}images/michelada.png`,
        tags: [],
      },
      {
        id: "agua-jamaica",
        title: "Agua de Jamaica",
        description: "Hibisco fresco, sin azúcar añadida",
        price: 5.00,
        image: `${import.meta.env.BASE_URL}images/agua-jamaica.png`,
        tags: ["🌿 Vegetariano"],
      }
    ]
  }
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("BRUNCH");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCategories = MENU_DATA.map(category => {
    return {
      ...category,
      items: category.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  }).filter(category => category.items.length > 0);

  const displayCategories = searchQuery ? filteredCategories : MENU_DATA.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24 font-sans">
      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#121212]/90 backdrop-blur-md shadow-md py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <div className={`transition-all duration-500 ease-in-out ${scrolled ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100 relative'} flex flex-col items-center justify-center w-full`}>
            <img src={`${import.meta.env.BASE_URL}maya-logo.jpeg`} alt="Maya Cantina" className="w-24 h-24 object-contain rounded-full shadow-lg border-2 border-[#D35400]/20 mb-3" />
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest text-center font-medium">Cocina Mexicana Autentica • Sacramento, CA</p>
          </div>
          
          <div className={`transition-all duration-500 flex items-center gap-3 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}>
            <img src={`${import.meta.env.BASE_URL}maya-logo.jpeg`} alt="Maya Cantina" className="w-10 h-10 object-contain rounded-full border border-[#D35400]/20" />
            <div className="text-xl font-serif font-bold text-[#D35400]">MAYA</div>
          </div>

          <a 
            href="https://tablereserve.conect-r.com/book/roosters-on-the-river" 
            target="_blank" 
            rel="noreferrer"
            className={`bg-[#D35400] hover:bg-[#D35400]/90 text-white text-xs font-bold py-2.5 px-5 rounded-full uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(211,84,0,0.4)] ${scrolled ? '' : 'absolute right-4 top-4'}`}
          >
            Reservar Mesa
          </a>
        </div>

        {/* Search */}
        <div className="container mx-auto px-4 mt-6 mb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Buscar platillo o ingrediente..." 
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
                      ? 'bg-[#D35400] text-white shadow-[0_4px_14px_rgba(211,84,0,0.3)]' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.category}
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
                <h2 className="text-2xl font-serif font-bold mb-6 text-[#F0A500] tracking-wide">{category.category}</h2>
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
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent flex items-end p-5">
                      </div>
                      {item.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {item.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-md ${
                                tag.includes('Favorito') ? 'bg-[#F0A500]/90 text-white' : 
                                tag.includes('Picante') ? 'bg-red-500/90 text-white' :
                                'bg-[#2E7D32]/90 text-white'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h3 className="font-serif font-bold text-xl leading-tight text-white">{item.title}</h3>
                        <span className="text-[#D35400] font-bold text-lg whitespace-nowrap">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed flex-1 font-sans">{item.description}</p>
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
            <p className="text-lg">No se encontraron resultados para "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Floating Socials */}
      <div className="fixed bottom-8 right-6 flex flex-col gap-4 z-30">
        <a 
          href="https://www.facebook.com/Mayarestaurantsac" 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform"
        >
          <FaFacebookF size={24} />
        </a>
        <a 
          href="https://www.instagram.com/mayacantinasac" 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform"
        >
          <FaInstagram size={28} />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 text-center border-t border-white/5 mt-16 px-4">
        <img src={`${import.meta.env.BASE_URL}maya-logo.jpeg`} alt="Maya Cantina" className="w-16 h-16 object-contain rounded-full mx-auto opacity-50 mb-6 grayscale" />
        <div className="font-serif text-2xl font-bold text-[#D35400] mb-4 opacity-80 tracking-widest">MAYA CANTINA</div>
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
          <MapPin size={16} className="text-[#F0A500]"/> Sacramento, CA
        </div>
        <div className="text-sm text-gray-500 space-y-3 max-w-xs mx-auto bg-white/5 p-4 rounded-2xl">
          <p className="flex items-center justify-center gap-3"><Clock size={16} className="text-[#2E7D32]"/> Mar-Dom 5pm–10pm</p>
          <p className="flex items-center justify-center gap-3"><Clock size={16} className="text-[#2E7D32]"/> Dom Brunch 11am–3pm</p>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 text-xs text-gray-600 font-medium">
          <a href="https://mayacantina.toast.site" className="hover:text-[#D35400] transition-colors">mayacantina.toast.site</a>
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
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
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
                  <h2 className="font-serif font-black text-3xl text-white leading-none">{selectedItem.title}</h2>
                  <span className="text-[#D35400] font-black text-2xl bg-[#D35400]/10 px-4 py-2 rounded-2xl">${selectedItem.price.toFixed(2)}</span>
                </div>
                
                {selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedItem.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className={`text-sm px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${
                          tag.includes('Favorito') ? 'bg-[#F0A500]/10 text-[#F0A500] border border-[#F0A500]/20' : 
                          tag.includes('Picante') ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info size={16} className="text-[#D35400]"/> Ingredientes
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-sans text-lg">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-8">
                  <button 
                    className="w-full bg-[#D35400] hover:bg-[#D35400]/90 text-white rounded-2xl h-16 text-xl font-bold shadow-[0_8px_20px_rgba(211,84,0,0.3)] transition-all active:scale-95"
                    onClick={() => setSelectedItem(null)}
                  >
                    Volver al Menú
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetContentEditable>{`
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