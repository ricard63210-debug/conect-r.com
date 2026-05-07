export type EventLang = "es" | "en";

export type EventItem = {
  id: string;
  day: { es: string; en: string };
  time: string;
  title: { es: string; en: string };
  desc: { es: string; en: string };
  img: string;
  fallbackEmoji: string;
  color: string;
};

export const EVENTS: EventItem[] = [
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
