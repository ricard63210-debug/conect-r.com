import { motion } from "framer-motion";
import { TrendingUp, Star, Clock, Users, DollarSign, Smartphone, X, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const reviewData = [
  { mes: "Ene", antes: 12, despues: 12 },
  { mes: "Feb", antes: 15, despues: 28 },
  { mes: "Mar", antes: 11, despues: 45 },
  { mes: "Abr", antes: 13, despues: 67 },
  { mes: "May", antes: 14, despues: 89 },
  { mes: "Jun", antes: 10, despues: 124 },
];

const efficiencyData = [
  { mes: "Ene", ocupacion: 58, rotacion: 2.1, ingresos: 42 },
  { mes: "Feb", ocupacion: 62, rotacion: 2.3, ingresos: 46 },
  { mes: "Mar", ocupacion: 71, rotacion: 2.8, ingresos: 58 },
  { mes: "Abr", ocupacion: 79, rotacion: 3.1, ingresos: 68 },
  { mes: "May", ocupacion: 85, rotacion: 3.4, ingresos: 79 },
  { mes: "Jun", ocupacion: 91, rotacion: 3.8, ingresos: 94 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-amber-800/40 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs font-medium" style={{ color: p.color }}>
            {p.name}: {p.value}{p.name.includes("Ingresos") ? "k MXN" : p.name.includes("Rotacion") ? "x/dia" : p.name.includes("resena") ? " resenas" : "%"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AntesDepues() {
  const comparisons = [
    {
      metric: "Resenas Google",
      icon: Star,
      before: "12/mes",
      after: "124/mes",
      improvement: "+933%",
      positive: true,
    },
    {
      metric: "Tiempo de espera",
      icon: Clock,
      before: "35 min en pie",
      after: "Digital + SMS",
      improvement: "0 colas",
      positive: true,
    },
    {
      metric: "Ocupacion de mesas",
      icon: Users,
      before: "58%",
      after: "91%",
      improvement: "+57%",
      positive: true,
    },
    {
      metric: "Datos de clientes",
      icon: Smartphone,
      before: "0 registros",
      after: "2,400 perfiles",
      improvement: "CRM activo",
      positive: true,
    },
    {
      metric: "Ingresos mensuales",
      icon: DollarSign,
      before: "$42k MXN",
      after: "$94k MXN",
      improvement: "+123%",
      positive: true,
    },
    {
      metric: "Rotacion de mesas",
      icon: TrendingUp,
      before: "2.1x por dia",
      after: "3.8x por dia",
      improvement: "+81%",
      positive: true,
    },
  ];

  const beforeIssues = [
    "Filas fisicas en la puerta",
    "Sin datos de clientes",
    "Menus de papel desactualizados",
    "12 resenas nuevas al mes",
    "Pantallas TV sin uso",
    "Reservas por telefono solamente",
    "0% presencia online",
    "Rotacion de 2.1x por dia",
  ];

  const afterBenefits = [
    "Lista de espera 100% digital con SMS",
    "CRM con 2,400+ perfiles activos",
    "Menu digital actualizable en 1 clic",
    "124 resenas nuevas al mes",
    "Digital Signage con contenido dinamico",
    "Reservas online 24/7 con confirmacion",
    "Sitio web + redes sociales gestionadas",
    "Rotacion de 3.8x por dia",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Antes y Despues de Conect-R</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Resultados reales de restaurantes que adoptaron el ecosistema Conect-R.
          Los numeros hablan solos.
        </p>
      </div>

      {/* Before / After comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-red-900/40 overflow-hidden"
          style={{ background: "linear-gradient(145deg, hsl(0 20% 9%), hsl(0 15% 7%))" }}
        >
          <div className="px-6 py-4 border-b border-red-900/40 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-900/40 rounded-lg flex items-center justify-center">
              <X size={16} className="text-red-400" />
            </div>
            <div>
              <div className="font-semibold">Restaurante Maya — Antes</div>
              <div className="text-xs text-muted-foreground">Sin tecnologia. Solo tradicion.</div>
            </div>
          </div>
          <div className="p-6 space-y-2.5">
            {beforeIssues.map((issue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 text-sm"
              >
                <X size={14} className="text-red-500 shrink-0" />
                <span className="text-muted-foreground">{issue}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-amber-800/40 overflow-hidden"
          style={{ background: "linear-gradient(145deg, hsl(20 20% 11%), hsl(30 15% 9%))" }}
        >
          <div className="px-6 py-4 border-b border-amber-800/40 flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Check size={16} className="text-amber-400" />
            </div>
            <div>
              <div className="font-semibold">Restaurante Maya — Con Conect-R</div>
              <div className="text-xs text-muted-foreground">Negocio inteligente y rentable.</div>
            </div>
          </div>
          <div className="p-6 space-y-2.5">
            {afterBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 text-sm"
              >
                <Check size={14} className="text-amber-400 shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisons.map((item, i) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="maya-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <item.icon size={18} className="text-amber-400" />
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                {item.improvement}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{item.metric}</div>
            <div className="flex items-end gap-2">
              <div className="text-xs line-through text-muted-foreground/60">{item.before}</div>
              <div className="text-base font-bold gold-gradient font-serif">{item.after}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reviews chart */}
        <div className="maya-card rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
            <Star size={16} /> Resenas Google por mes
          </h4>
          <p className="text-xs text-muted-foreground mb-4">Comparativa antes vs despues de Conect-R</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,160,23,0.08)" />
              <XAxis dataKey="mes" tick={{ fill: "#8b7355", fontSize: 11 }} />
              <YAxis tick={{ fill: "#8b7355", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: "#8b7355", fontSize: "11px" }}>{v}</span>} />
              <Bar dataKey="antes" name="Sin Conect-R" fill="#4a4a4a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despues" name="Con Conect-R" fill="#d4a017" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency chart */}
        <div className="maya-card rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
            <TrendingUp size={16} /> Crecimiento post-implementacion
          </h4>
          <p className="text-xs text-muted-foreground mb-4">Ocupacion, rotacion e ingresos mensuales</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,160,23,0.08)" />
              <XAxis dataKey="mes" tick={{ fill: "#8b7355", fontSize: 11 }} />
              <YAxis tick={{ fill: "#8b7355", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: "#8b7355", fontSize: "11px" }}>{v}</span>} />
              <Line type="monotone" dataKey="ocupacion" name="Ocupacion %" stroke="#d4a017" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ingresos" name="Ingresos (k MXN)" stroke="#f5c842" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rotacion" name="Rotacion x/dia" stroke="#b8860b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, rgba(212,160,23,0.1) 0%, rgba(184,134,11,0.05) 100%)", border: "1px solid rgba(212,160,23,0.3)" }}
      >
        <div className="text-4xl font-serif font-bold gold-gradient mb-3">+123% de ingresos</div>
        <p className="text-lg text-muted-foreground mb-1">en 6 meses con el ecosistema Conect-R completo</p>
        <p className="text-xs text-muted-foreground/60">Resultados promedio. Los resultados individuales pueden variar.</p>
      </motion.div>
    </div>
  );
}
