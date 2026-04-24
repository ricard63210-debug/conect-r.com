import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Facebook, Heart, MessageCircle, Share2,
  TrendingUp, Eye, Camera, PenTool, Calendar,
  Star, BarChart2, ChevronRight, Sparkles, Clock
} from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const GOLD = "#d4a017";

const SERVICE_ICONS = [Camera, PenTool, MessageCircle, TrendingUp, BarChart2, Star];
const SERVICE_COLORS = [
  "from-pink-700 to-pink-500",
  "from-amber-700 to-amber-500",
  "from-orange-700 to-orange-500",
  "from-green-700 to-green-500",
  "from-teal-700 to-teal-500",
  "from-purple-700 to-purple-500",
];

const calendarWeek = [
  { key: "mon", type: null },
  { key: "tue", type: "reel", icon: "🎬", color: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
  { key: "wed", type: "story", icon: "📣", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { key: "thu", type: "post", icon: "📸", color: "bg-orange-500/20 border-orange-500/40 text-orange-400" },
  { key: "fri", type: "reel", icon: "🎬", color: "bg-pink-500/20 border-pink-500/40 text-pink-300" },
  { key: "sat", type: "story", icon: "📣", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { key: "sun", type: "post", icon: "📸", color: "bg-orange-500/20 border-orange-500/40 text-orange-400" },
];

const postData = [
  { id: 1, platform: "instagram", image: "🌮", tag: "🎬 Reel", tagColor: "text-pink-400", likes: 847, comments: 63, shares: 124, reach: 4200, daysAgo: 2 },
  { id: 2, platform: "instagram", image: "🥑", tag: "📸 Foto", tagColor: "text-orange-500", likes: 621, comments: 42, shares: 88, reach: 3100, daysAgo: 4 },
  { id: 3, platform: "facebook", image: "🍹", tag: "📣 Story", tagColor: "text-blue-400", likes: 312, comments: 28, shares: 55, reach: 1800, daysAgo: 6 },
  { id: 4, platform: "instagram", image: "🎭", tag: "🎬 Reel", tagColor: "text-pink-400", likes: 1103, comments: 89, shares: 201, reach: 5600, daysAgo: 7 },
];

const calendarLabels = {
  es: { days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], labels: ["", "Video Happy Hour", "Story del día", "Foto platillo", "Reel Mariachi", "Especial noche", "Promo Brunch"], closed: "Cerrado", live: "En vivo", calTitle: "Calendario Editorial — Semana Tipo", calSub: "5–7 publicaciones semanales programadas y optimizadas", reel: "Reel / Video", photo: "Foto Producto", story: "Story Promo", verified: "Verificado", posts: "Posts", following: "Siguiendo" },
  en: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], labels: ["", "Happy Hour Video", "Daily Story", "Dish Photo", "Mariachi Reel", "Special Night", "Brunch Promo"], closed: "Closed", live: "Live", calTitle: "Editorial Calendar — Sample Week", calSub: "5–7 weekly scheduled and optimized publications", reel: "Reel / Video", photo: "Product Photo", story: "Promo Story", verified: "Verified", posts: "Posts", following: "Following" },
};

const stratCardIcons = [Clock, TrendingUp, Star];

export default function RedesSociales() {
  const { lang } = useLang();
  const T = getT(lang).redes;
  const CL = calendarLabels[lang];

  const [activeTab, setActiveTab] = useState<"feed" | "calendar" | "servicios">("feed");
  const dateLabel = lang === "es" ? (n: number) => `Hace ${n} ${n === 1 ? "día" : "días"}` : (n: number) => `${n} ${n === 1 ? "day" : "days"} ago`;

  const services = T.services.map((s, i) => ({
    ...s,
    icon: SERVICE_ICONS[i],
    color: SERVICE_COLORS[i],
  }));

  const postsWithData = postData.map((p, i) => ({
    ...p,
    caption: T.posts[i]?.caption ?? "",
    date: dateLabel(p.daysAgo),
  }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {T.description} <span className="text-orange-500 font-medium">{T.descEngagement}</span>{T.descMid}{" "}
          <span className="text-orange-500 font-medium">{T.descFollowers}</span> {T.descAnd}{" "}
          <span className="text-orange-500 font-medium">{T.descClients}</span>{T.descEnd}
        </p>
        <ImpactPills />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {T.results.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="maya-card rounded-xl p-4 border border-orange-800/20"
          >
            <div className="text-2xl font-bold text-orange-400">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "feed", label: T.tabPosts, icon: Instagram },
          { id: "calendar", label: T.tabCalendar, icon: Calendar },
          { id: "servicios", label: T.tabServices, icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            data-testid={`redes-tab-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-orange-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon size={15} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Profile header */}
            <div className="maya-card rounded-2xl p-4 border border-orange-800/20 flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 p-0.5"
                  style={{ borderColor: GOLD }}>
                  <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-full h-full rounded-full object-cover" style={{ filter: "brightness(0.85)" }} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
                  <Instagram size={10} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">@carmelitasgroup</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded-full">{CL.verified}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Carmelita's Kitchen de Mexico · Mexican Bar &amp; Grill</div>
              </div>
              <div className="hidden sm:flex gap-5 text-center">
                {[
                  { label: CL.posts, value: "148" },
                  { label: lang === "es" ? "Seguidores" : "Followers", value: "4.2K" },
                  { label: CL.following, value: "312" },
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
              {postsWithData.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="maya-card rounded-2xl overflow-hidden border border-orange-800/20"
                >
                  <div className="px-4 py-3 flex items-center justify-between border-b border-border/20">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-orange-700/40">
                        <img src="/carmelitas-logo.png" alt="Carmelitas" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
                      </div>
                      <span className="text-xs font-semibold">carmelitasgroup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${post.tagColor}`}>{post.tag}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center" style={{ height: 120, background: "linear-gradient(135deg, #1e1309 0%, #2a1a07 100%)", fontSize: 56 }}>
                    {post.image}
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      <span className="font-semibold text-foreground">carmelitasgroup</span>{" "}{post.caption}
                    </p>
                  </div>

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
                    <div className="flex items-center gap-1 text-xs text-orange-500">
                      <Eye size={12} /> {post.reach.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="maya-card rounded-xl p-4 border border-orange-800/20 flex items-start gap-3">
              <Star size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">{T.publishNote}</p>
            </div>
          </motion.div>
        )}

        {activeTab === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="maya-card rounded-2xl p-5 border border-orange-800/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">{CL.calTitle}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{CL.calSub}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-700/30 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-orange-400">{CL.live}</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarWeek.map((day, i) => (
                  <div key={day.key} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2 font-medium">{CL.days[i]}</div>
                    {day.type ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-xl p-2 border text-center ${day.color}`}
                      >
                        <div className="text-lg mb-1">{day.icon}</div>
                        <div className="text-xs leading-tight hidden sm:block">{CL.labels[i]}</div>
                      </motion.div>
                    ) : (
                      <div className="rounded-xl p-2 border border-border/20 text-center opacity-30 h-full min-h-[72px] flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">—</div>
                        <div className="text-xs text-muted-foreground mt-1 hidden sm:block">{CL.closed}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/20">
                {[
                  { icon: "🎬", label: CL.reel, color: "text-pink-400" },
                  { icon: "📸", label: CL.photo, color: "text-orange-500" },
                  { icon: "📣", label: CL.story, color: "text-blue-400" },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-1.5 text-xs">
                    <span>{t.icon}</span>
                    <span className={t.color}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {T.calendarStrats.map((card, i) => (
                <div key={card.title} className="maya-card rounded-xl p-4 border border-orange-800/20">
                  <div className="flex items-center gap-2 mb-3">
                    {(() => { const Icon = stratCardIcons[i]; return <Icon size={15} className="text-orange-500" />; })()}
                    <div className="text-sm font-semibold">{card.title}</div>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ChevronRight size={12} className="text-orange-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

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
                  className="maya-card rounded-xl p-5 border border-orange-800/20 flex gap-4"
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
            <div className="maya-card rounded-2xl p-5 border border-orange-800/20">
              <h3 className="text-sm font-semibold mb-4">{T.platformNote}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-900/20 to-orange-900/20 border border-pink-800/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-orange-500 flex items-center justify-center">
                    <Instagram size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Instagram</div>
                    <div className="text-xs text-muted-foreground">{T.igHandle}</div>
                    <div className="text-xs text-pink-300 mt-1">{T.igTypes}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-pink-300">{T.igFollowers}</div>
                    <div className="text-xs text-muted-foreground">{T.followers}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-800/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-700 to-orange-500 flex items-center justify-center">
                    <Facebook size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Facebook</div>
                    <div className="text-xs text-muted-foreground">{T.fbHandle}</div>
                    <div className="text-xs text-blue-300 mt-1">{T.fbTypes}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-300">{T.fbFollowers}</div>
                    <div className="text-xs text-muted-foreground">{T.followers}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
