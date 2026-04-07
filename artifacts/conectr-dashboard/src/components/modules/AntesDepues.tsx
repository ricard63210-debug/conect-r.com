import { motion } from "framer-motion";
import {
  TrendingUp, Star, Clock, Users, DollarSign, Smartphone,
  Instagram, Globe, Monitor, Wifi, Palette, ArrowRight, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const revenueData = [
  { mes: "Hoy",   ingresos: 70, covers: 1820, reviews: 45 },
  { mes: "Mes 1", ingresos: 74, covers: 1930, reviews: 62 },
  { mes: "Mes 2", ingresos: 79, covers: 2060, reviews: 82 },
  { mes: "Mes 3", ingresos: 84, covers: 2180, reviews: 98 },
  { mes: "Mes 4", ingresos: 89, covers: 2300, reviews: 111 },
  { mes: "Mes 5", ingresos: 94, covers: 2420, reviews: 119 },
  { mes: "Mes 6", ingresos: 100, covers: 2540, reviews: 128 },
];

const socialData = [
  { mes: "Hoy",   instagram: 4200, facebook: 2100, alcance: 12000 },
  { mes: "Mes 1", instagram: 4600, facebook: 2300, alcance: 16000 },
  { mes: "Mes 2", instagram: 5100, facebook: 2550, alcance: 21000 },
  { mes: "Mes 3", instagram: 5500, facebook: 2750, alcance: 25000 },
  { mes: "Mes 4", instagram: 5900, facebook: 2950, alcance: 28500 },
  { mes: "Mes 5", instagram: 6200, facebook: 3100, alcance: 31000 },
  { mes: "Mes 6", instagram: 6500, facebook: 3200, alcance: 34000 },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-amber-800/40 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs font-medium" style={{ color: p.color }}>
            {p.name}: {p.name.includes("Ingresos") ? `$${p.value}K` : p.name.includes("Alcance") ? `${(p.value / 1000).toFixed(0)}K` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const modules = [
  {
    icon: Wifi,
    label: "Smart Table NFC/QR",
    color: "from-amber-600 to-amber-400",
    impact: "+167% reseñas",
    detail: "NFC en cada mesa prompts clientes a dejar reseña Google al final de la cena. De ~45/mes actuales a 120+/mes en 60 días.",
    kpi: { before: "45 reseñas/mes", after: "120+ reseñas/mes" },
  },
  {
    icon: Wifi,
    label: "Lista de espera digital",
    color: "from-amber-600 to-amber-400",
    impact: "0 filas en puerta",
    detail: "Clientes reciben SMS cuando su mesa está lista. Reduce fricción en Happy Hour (Mar–Jue 5–7pm) y fines de semana.",
    kpi: { before: "Espera en pie", after: "Aviso por SMS" },
  },
  {
    icon: Monitor,
    label: "Pantallas Digitales",
    color: "from-teal-700 to-teal-500",
    impact: "+8% ticket promedio",
    detail: "Pantallas en el salón muestran especiales del Chef, Happy Hour countdown y reseñas de Google en tiempo real. Upsell pasivo.",
    kpi: { before: "$40 ticket promedio", after: "$43 ticket promedio" },
  },
  {
    icon: Globe,
    label: "Sitio Web + AI Chat",
    color: "from-blue-700 to-blue-500",
    impact: "55% reservas online",
    detail: "Sitio profesional con reservas integradas 24/7. AI Concierge responde automáticamente horarios, menú y eventos. Hoy ~5% reservas son online.",
    kpi: { before: "~5% reservas online", after: "55% reservas online" },
  },
  {
    icon: Instagram,
    label: "Gestión Redes Sociales",
    color: "from-pink-700 to-pink-500",
    impact: "+55% seguidores",
    detail: "Conect-R crea y publica 5–7 posts/semana en @mayacantinasac y Mayarestaurantsac. Alcance mensual proyectado: 34K personas en Sacramento.",
    kpi: { before: "4.2K seguidores IG", after: "6.5K seguidores IG" },
  },
  {
    icon: Palette,
    label: "Menú Digital + Imprimible",
    color: "from-purple-700 to-purple-500",
    impact: "+12% ticket brunch",
    detail: "Menú digital vía QR con fotos y descripciones detalladas. Menú imprimible premium para mesas. Brunch domenical destaca platillos de mayor margen.",
    kpi: { before: "Menú papel genérico", after: "Menú digital + premium print" },
  },
];

const todayVsProjected = [
  { label: "Ingresos mensuales", today: "$70,000", projected: "$100,000", delta: "+43%", icon: DollarSign },
  { label: "Cubiertos/mes", today: "~1,820", projected: "~2,540", delta: "+40%", icon: Users },
  { label: "Reseñas Google/mes", today: "~45", projected: "120+", delta: "+167%", icon: Star },
  { label: "Seguidores Instagram", today: "4,200", projected: "6,500", delta: "+55%", icon: Instagram },
  { label: "Reservas online", today: "~5%", projected: "55%", delta: "×11", icon: Smartphone },
  { label: "Ticket promedio", today: "$40", projected: "$43", delta: "+8%", icon: TrendingUp },
];

export default function AntesDepues() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Proyección con Conect-R</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Basado en el perfil real de Maya Cantina Sacramento — horarios, precios, presencia digital actual
          y benchmarks de restaurantes similares que adoptaron el ecosistema.
        </p>
      </div>

      {/* Hoy vs Mes 6 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {todayVsProjected.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="maya-card rounded-xl p-4 border border-amber-800/20"
          >
            <div className="flex items-center justify-between mb-2">
              <item.icon size={15} className="text-amber-400" />
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                {item.delta}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{item.label}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs line-through text-muted-foreground/50">{item.today}</span>
              <ArrowRight size={10} className="text-amber-600 shrink-0" />
              <span className="text-sm font-bold text-amber-300">{item.projected}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="maya-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
              <DollarSign size={16} /> Ingresos proyectados
            </h4>
            <span className="text-xs text-green-400 font-semibold">$70K → $100K</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">USD mensuales · 6 meses con Conect-R</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="ingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4a017" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,160,23,0.08)" />
              <XAxis dataKey="mes" tick={{ fill: "#8b7355", fontSize: 11 }} />
              <YAxis tick={{ fill: "#8b7355", fontSize: 11 }} unit="K" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ingresos" name="Ingresos USD" stroke="#d4a017" strokeWidth={2.5} fill="url(#ingGrad)" dot={{ fill: "#d4a017", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Social */}
        <div className="maya-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
              <Instagram size={16} /> Audiencia en redes
            </h4>
            <span className="text-xs text-pink-400 font-semibold">4.2K → 6.5K seguidores IG</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Instagram + Facebook · Gestión mensual Conect-R</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={socialData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,160,23,0.08)" />
              <XAxis dataKey="mes" tick={{ fill: "#8b7355", fontSize: 11 }} />
              <YAxis tick={{ fill: "#8b7355", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: "#8b7355", fontSize: "11px" }}>{v}</span>} />
              <Bar dataKey="instagram" name="Instagram" fill="#e1306c" radius={[3, 3, 0, 0]} />
              <Bar dataKey="facebook" name="Facebook" fill="#1877f2" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Module-by-module impact */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold">Impacto por módulo</h3>
          <span className="text-xs text-muted-foreground ml-1">— qué mueve la aguja en Maya Cantina</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="maya-card rounded-xl p-4 border border-amber-800/20"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center shrink-0`}>
                  <mod.icon size={14} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold leading-tight">{mod.label}</div>
                  <div className="text-xs text-green-400 font-medium mt-0.5">{mod.impact}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{mod.detail}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                <span className="text-xs text-muted-foreground/60 line-through">{mod.kpi.before}</span>
                <ArrowRight size={10} className="text-amber-600 shrink-0" />
                <span className="text-xs text-amber-300 font-semibold">{mod.kpi.after}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(212,160,23,0.12) 0%, rgba(184,134,11,0.06) 100%)",
          border: "1px solid rgba(212,160,23,0.3)"
        }}
      >
        <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
          <div className="text-center">
            <div className="text-4xl font-serif font-bold gold-gradient">+$30K</div>
            <div className="text-xs text-muted-foreground mt-1">ingresos adicionales/mes</div>
          </div>
          <div className="text-3xl text-amber-800/40">·</div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-green-400">+720</div>
            <div className="text-xs text-muted-foreground mt-1">cubiertos adicionales/mes</div>
          </div>
          <div className="text-3xl text-amber-800/40">·</div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-pink-400">+2,300</div>
            <div className="text-xs text-muted-foreground mt-1">nuevos seguidores en 6 meses</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Proyección a 6 meses con ecosistema Conect-R completo · basada en perfil de Maya Cantina Sacramento
        </p>
        <p className="text-xs text-muted-foreground/50 mt-1">
          Ticket promedio $40 USD · 6 días operativos/semana · Aforo estimado 80 personas
        </p>
      </motion.div>
    </div>
  );
}
