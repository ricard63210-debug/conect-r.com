import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Facebook, Heart, MessageCircle, Share2,
  Calendar, TrendingUp, Users, Eye, Camera, PenTool,
  Star, BarChart2, ChevronRight, Sparkles
} from "lucide-react";

const GOLD = "#d4a017";

const mockPosts = [
  {
    id: 1,
    type: "reel",
    platform: "instagram",
    image: "🌮",
    caption: "¡Nuestros Tacos de Birria están de otro nivel! 🔥 Res estofada en consomé, queso fundido y tortilla de maíz hecha a mano. Happy Hour Mar–Jue 5–7pm. #MayaCantina #SacramentoEats #Birria",
    likes: 847,
    comments: 63,
    shares: 124,
    reach: 4200,
    date: "Hace 2 días",
    tag: "🎬 Reel",
    tagColor: "text-pink-400",
  },
  {
    id: 2,
    type: "post",
    platform: "instagram",
    image: "🥑",
    caption: "Nuestro Guacamole Maya — aguacate fresco, jítomate, cilantro, cebolla morada y chile serrano. Hecho al momento, siempre. 🥑✨ #GuacaDay #AuténticoMexicano",
    likes: 621,
    comments: 42,
    shares: 88,
    reach: 3100,
    date: "Hace 4 días",
    tag: "📸 Foto",
    tagColor: "text-amber-400",
  },
  {
    id: 3,
    type: "story",
    platform: "facebook",
    image: "🍹",
    caption: "¿Planes para el domingo? Únete a nuestro Brunch 11am–3pm 🌅 Mimosas, Micheladas y lo mejor de la cocina mexicana. ¡Trae a la familia! Reserva en el link. #BrunchDominical #MayaSac",
    likes: 312,
    comments: 28,
    shares: 55,
    reach: 1800,
    date: "Hace 6 días",
    tag: "📣 Story",
    tagColor: "text-blue-400",
  },
  {
    id: 4,
    type: "reel",
    platform: "instagram",
    image: "🎭",
    caption: "¡Esta noche Mariachi en vivo! 🎺🎸 Ven a celebrar al ritmo de la mejor música mexicana — Viernes y Sábados a las 8pm. Mesas disponibles. ¡No te lo pierdas! #Mariachi #MayaCantinaSAC",
    likes: 1103,
    comments: 89,
    shares: 201,
    reach: 5600,
    date: "Hace 1 semana",
    tag: "🎬 Reel",
    tagColor: "text-pink-400",
  },
];

const calendarWeek = [
  { day: "Lun", type: null },
  { day: "Mar", type: "reel", label: "Video Happy Hour", icon: "🎬", color: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
  { day: "Mié", type: "story", label: "Story del día", icon: "📣", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { day: "Jue", type: "post", label: "Foto platillo", icon: "📸", color: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
  { day: "Vie", type: "reel", label: "Reel Mariachi", icon: "🎬", color: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
  { day: "Sáb", type: "story", label: "Especial noche", icon: "📣", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { day: "Dom", type: "post", label: "Promo Brunch", icon: "📸", color: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
];

const services = [
  {
    icon: Camera,
    title: "Fotografía & Video",
    desc: "Producción de contenido visual profesional — fotos de platillos, reels del equipo, eventos y ambiente del restaurante.",
    color: "from-pink-700 to-pink-500",
  },
  {
    icon: PenTool,
    title: "Copywriting & Diseño",
    desc: "Redacción de captions en español con voz auténtica de Maya, diseño de stories, carruseles y gráficos para cada plataforma.",
    color: "from-amber-700 to-amber-500",
  },
  {
    icon: Calendar,
    title: "Calendario Editorial",
    desc: "Publicaciones programadas según los mejores horarios de cada plataforma, 5–7 posts por semana con variedad de formatos.",
    color: "from-purple-700 to-purple-500",
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    desc: "Respuesta a comentarios y mensajes directos en menos de 2 horas. Moderación activa y gestión de la reputación online.",
    color: "from-blue-700 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Crecimiento Orgánico",
    desc: "Estrategia de hashtags, geolocalización y colaboración con creadores locales para alcanzar nuevas audiencias en Sacramento.",
    color: "from-green-700 to-green-500",
  },
  {
    icon: BarChart2,
    title: "Reportes Mensuales",
    desc: "Análisis detallado de alcance, engagement y crecimiento de seguidores. Ajuste de estrategia basado en datos reales.",
    color: "from-teal-700 to-teal-500",
  },
];

const metrics = [
  { label: "Seguidores Instagram", value: "4.2K", change: "+18%", icon: Instagram },
  { label: "Alcance mensual", value: "28K", change: "+31%", icon: Eye },
  { label: "Engagement rate", value: "6.4%", change: "+2.1%", icon: Heart },
  { label: "Nuevos clientes via RRSS", value: "~38/mes", change: "estimado", icon: Users },
];

export default function RedesSociales() {
  const [activeTab, setActiveTab] = useState<"feed" | "calendar" | "servicios">("feed");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Redes Sociales</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conect-R gestiona la presencia de Maya Cantina en Instagram y Facebook —
          contenido profesional, comunidad activa y crecimiento orgánico mes a mes.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="maya-card rounded-xl p-4 border border-amber-800/20"
          >
            <div className="flex items-start justify-between mb-2">
              <m.icon size={16} className="text-amber-400 mt-0.5" />
              <span className="text-xs text-green-400 font-medium">{m.change}</span>
            </div>
            <div className="text-2xl font-bold text-amber-300">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "feed", label: "Feed de Contenido", icon: Instagram },
          { id: "calendar", label: "Calendario", icon: Calendar },
          { id: "servicios", label: "Qué Incluye", icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            data-testid={`redes-tab-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-amber-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={15} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── FEED ── */}
        {activeTab === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Profile header */}
            <div className="maya-card rounded-2xl p-4 border border-amber-800/20 flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 p-0.5"
                  style={{ borderColor: GOLD }}>
                  <img src="/maya-logo.jpeg" alt="Maya Cantina" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
                  <Instagram size={10} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">@mayacantinasac</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded-full">Verificado</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Maya Cantina Sacramento · Cocina Mexicana Auténtica</div>
              </div>
              <div className="hidden sm:flex gap-5 text-center">
                {[
                  { label: "Posts", value: "148" },
                  { label: "Seguidores", value: "4.2K" },
                  { label: "Siguiendo", value: "312" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-sm font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="maya-card rounded-2xl overflow-hidden border border-amber-800/20"
                >
                  {/* Post header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-border/20">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-700/40">
                        <img src="/maya-logo.jpeg" alt="Maya" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-semibold">mayacantinasac</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${post.tagColor}`}>{post.tag}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>

                  {/* Image area */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      height: 120,
                      background: "linear-gradient(135deg, #1e1309 0%, #2a1a07 100%)",
                      fontSize: 56,
                    }}
                  >
                    {post.image}
                  </div>

                  {/* Caption */}
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      <span className="font-semibold text-foreground">mayacantinasac</span>{" "}
                      {post.caption}
                    </p>
                  </div>

                  {/* Engagement */}
                  <div className="px-4 py-3 border-t border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-400 transition-colors">
                        <Heart size={14} /> {post.likes.toLocaleString()}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-400 transition-colors">
                        <MessageCircle size={14} /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-green-400 transition-colors">
                        <Share2 size={14} /> {post.shares}
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Eye size={12} /> {post.reach.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="maya-card rounded-xl p-4 border border-amber-800/20 flex items-start gap-3">
              <Star size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Todo el contenido es creado y publicado por el equipo de Conect-R — sin esfuerzo adicional para Maya Cantina.
                Nos encargamos de la fotografía, el copy, la programación y la respuesta a la comunidad.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── CALENDARIO ── */}
        {activeTab === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="maya-card rounded-2xl p-5 border border-amber-800/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Calendario Editorial — Semana Tipo</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">5–7 publicaciones semanales programadas y optimizadas</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-700/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-amber-300">En vivo</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarWeek.map((day, i) => (
                  <div key={day.day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2 font-medium">{day.day}</div>
                    {day.type ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-xl p-2 border text-center ${day.color}`}
                      >
                        <div className="text-lg mb-1">{day.icon}</div>
                        <div className="text-xs leading-tight hidden sm:block">{day.label}</div>
                      </motion.div>
                    ) : (
                      <div className="rounded-xl p-2 border border-border/20 text-center opacity-30 h-full min-h-[72px] flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">—</div>
                        <div className="text-xs text-muted-foreground mt-1 hidden sm:block">Cerrado</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/20">
                {[
                  { icon: "🎬", label: "Reel / Video", color: "text-pink-400" },
                  { icon: "📸", label: "Foto Producto", color: "text-amber-400" },
                  { icon: "📣", label: "Story Promo", color: "text-blue-400" },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-1.5 text-xs">
                    <span>{t.icon}</span>
                    <span className={t.color}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Mejores horarios",
                  items: ["Mar–Jue: 6:30 pm (Happy Hour)", "Vie–Sáb: 7:00 pm (peak cena)", "Dom: 10:30 am (pre-brunch)"],
                  icon: Clock,
                },
                {
                  title: "Formatos que más convierten",
                  items: ["Reels de platillos: +68% alcance", "Stories de eventos: +42% clics", "Carruseles de menú: +35% guardados"],
                  icon: TrendingUp,
                },
                {
                  title: "Estrategia de hashtags",
                  items: ["#SacramentoEats #MayaCantinaSAC", "#CocinaM exicana #TacosBirria", "Geotags: Sacramento, CA"],
                  icon: Star,
                },
              ].map(card => (
                <div key={card.title} className="maya-card rounded-xl p-4 border border-amber-800/20">
                  <div className="flex items-center gap-2 mb-3">
                    <card.icon size={15} className="text-amber-400" />
                    <div className="text-sm font-semibold">{card.title}</div>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ChevronRight size={12} className="text-amber-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── SERVICIOS ── */}
        {activeTab === "servicios" && (
          <motion.div
            key="servicios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="maya-card rounded-xl p-5 border border-amber-800/20 flex gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shrink-0`}>
                    <svc.icon size={17} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">{svc.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Platform coverage */}
            <div className="maya-card rounded-2xl p-5 border border-amber-800/20">
              <h3 className="text-sm font-semibold mb-4">Plataformas gestionadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-900/20 to-orange-900/20 border border-pink-800/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center">
                    <Instagram size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Instagram</div>
                    <div className="text-xs text-muted-foreground">@mayacantinasac</div>
                    <div className="text-xs text-pink-300 mt-1">Posts · Reels · Stories · Highlights</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-pink-300">4.2K</div>
                    <div className="text-xs text-muted-foreground">seguidores</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-800/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center">
                    <Facebook size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Facebook</div>
                    <div className="text-xs text-muted-foreground">Mayarestaurantsac</div>
                    <div className="text-xs text-blue-300 mt-1">Posts · Eventos · Reviews · Ads</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-300">2.1K</div>
                    <div className="text-xs text-muted-foreground">seguidores</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Posts/semana", value: "5–7", sub: "promedio" },
                { label: "Tiempo de respuesta", value: "<2h", sub: "DMs y comentarios" },
                { label: "Crecimiento mensual", value: "+12%", sub: "nuevos seguidores" },
                { label: "Contenido generado", value: "100%", sub: "por Conect-R" },
              ].map(item => (
                <div key={item.label} className="maya-card rounded-xl p-4 text-center border border-amber-800/20">
                  <div className="text-xl font-bold text-amber-300">{item.value}</div>
                  <div className="text-xs font-medium mt-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Clock({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
