import { motion } from "framer-motion";
import {
  TrendingUp, Star, Users, DollarSign, Smartphone,
  Instagram, Globe, Monitor, Wifi, Palette, ArrowRight, Zap
} from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const MODULE_ICONS = [Wifi, Wifi, Monitor, Globe, Instagram, Palette];
const MODULE_COLORS = [
  "from-amber-600 to-amber-400",
  "from-amber-600 to-amber-400",
  "from-teal-700 to-teal-500",
  "from-orange-700 to-orange-500",
  "from-pink-700 to-pink-500",
  "from-purple-700 to-purple-500",
];
const KPI_ICONS = [DollarSign, Users, Star, Instagram, Smartphone, TrendingUp];

const CustomTooltip = ({ active, payload, label, revenueLabel }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
  revenueLabel?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-orange-800/40 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs font-medium" style={{ color: p.color }}>
            {p.name}: {p.name.includes("Revenue") || p.name.includes("Ingres") ? `$${p.value}K` : p.name.includes("Reach") || p.name.includes("Alcance") ? `${(p.value / 1000).toFixed(0)}K` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AntesDepues() {
  const { lang } = useLang();
  const T = getT(lang).resultados;

  const chartLabels = lang === "es"
    ? ["Hoy", "Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"]
    : ["Today", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

  const revenueData = [
    { mes: chartLabels[0], ingresos: 70, covers: 1820, reviews: 45 },
    { mes: chartLabels[1], ingresos: 74, covers: 1930, reviews: 62 },
    { mes: chartLabels[2], ingresos: 79, covers: 2060, reviews: 82 },
    { mes: chartLabels[3], ingresos: 84, covers: 2180, reviews: 98 },
    { mes: chartLabels[4], ingresos: 89, covers: 2300, reviews: 111 },
    { mes: chartLabels[5], ingresos: 94, covers: 2420, reviews: 119 },
    { mes: chartLabels[6], ingresos: 100, covers: 2540, reviews: 128 },
  ];

  const socialData = [
    { mes: chartLabels[0], instagram: 4200, facebook: 2100, alcance: 12000 },
    { mes: chartLabels[1], instagram: 4600, facebook: 2300, alcance: 16000 },
    { mes: chartLabels[2], instagram: 5100, facebook: 2550, alcance: 21000 },
    { mes: chartLabels[3], instagram: 5500, facebook: 2750, alcance: 25000 },
    { mes: chartLabels[4], instagram: 5900, facebook: 2950, alcance: 28500 },
    { mes: chartLabels[5], instagram: 6200, facebook: 3100, alcance: 31000 },
    { mes: chartLabels[6], instagram: 6500, facebook: 3200, alcance: 34000 },
  ];

  const revenueChartName = lang === "es" ? "Ingresos USD" : "Revenue USD";
  const reachName = lang === "es" ? "Alcance" : "Reach";
  const socialChartTitle = lang === "es" ? "Audiencia en redes" : "Social audience";
  const socialChartSub = lang === "es"
    ? "Instagram + Facebook · Gestión mensual Conect-R"
    : "Instagram + Facebook · Monthly Conect-R management";
  const revenueChartSub = lang === "es"
    ? "USD mensuales · 6 meses con Conect-R"
    : "Monthly USD · 6 months with Conect-R";
  const revenueChartTitle = lang === "es" ? "Ingresos proyectados" : "Projected revenue";
  const igFollowersLabel = lang === "es" ? "4.2K → 6.5K seguidores IG" : "4.2K → 6.5K IG followers";
  const additionalCoversLabel = lang === "es" ? "cubiertos adicionales/mes" : "additional covers/month";

  const modules = T.modules.map((m, i) => ({
    ...m,
    icon: MODULE_ICONS[i],
    color: MODULE_COLORS[i],
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{T.description}</p>
        <ImpactPills />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {T.kpis.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="maya-card rounded-xl p-4 border border-orange-800/20"
          >
            <div className="flex items-center justify-between mb-2">
              {(() => { const Icon = KPI_ICONS[i]; return <Icon size={15} className="text-orange-500" />; })()}
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                {item.delta}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{item.label}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs line-through text-muted-foreground/50">{item.today}</span>
              <ArrowRight size={10} className="text-orange-600 shrink-0" />
              <span className="text-sm font-bold text-orange-400">{item.projected}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="maya-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
              <DollarSign size={16} /> {revenueChartTitle}
            </h4>
            <span className="text-xs text-green-400 font-semibold">$70K → $84K</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{revenueChartSub}</p>
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
              <Tooltip content={<CustomTooltip revenueLabel={revenueChartName} />} />
              <Area type="monotone" dataKey="ingresos" name={revenueChartName} stroke="#d4a017" strokeWidth={2.5} fill="url(#ingGrad)" dot={{ fill: "#d4a017", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="maya-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
              <Instagram size={16} /> {socialChartTitle}
            </h4>
            <span className="text-xs text-pink-400 font-semibold">{igFollowersLabel}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{socialChartSub}</p>
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

      {/* Module impact */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-orange-500" />
          <h3 className="text-sm font-semibold">{T.impactTitle}</h3>
          <span className="text-xs text-muted-foreground ml-1">{T.impactSubtitle}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="maya-card rounded-xl p-4 border border-orange-800/20"
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
                <ArrowRight size={10} className="text-orange-600 shrink-0" />
                <span className="text-xs text-orange-400 font-semibold">{mod.kpi.after}</span>
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
            <div className="text-4xl font-serif font-bold gold-gradient">+$14K</div>
            <div className="text-xs text-muted-foreground mt-1">{T.revenueLabel}</div>
          </div>
          <div className="text-3xl text-orange-800/40">·</div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-green-400">+720</div>
            <div className="text-xs text-muted-foreground mt-1">{additionalCoversLabel}</div>
          </div>
          <div className="text-3xl text-orange-800/40">·</div>
          <div className="text-center">
            <div className="text-4xl font-serif font-bold text-pink-400">+2,300</div>
            <div className="text-xs text-muted-foreground mt-1">{T.followersLabel}</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{T.projection6mo}</p>
        <p className="text-xs text-muted-foreground/50 mt-1">{T.projectionNote}</p>
      </motion.div>
    </div>
  );
}
