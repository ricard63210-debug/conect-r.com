import { motion } from "framer-motion";
import { BarChart3, Lightbulb, TrendingUp, DollarSign, ClipboardCheck, ChefHat, Users, Megaphone } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const STEP_ICONS = [BarChart3, Lightbulb, TrendingUp, DollarSign];
const FOCUS_ICONS = [ChefHat, Users, Megaphone, ClipboardCheck];

export default function BusinessConsulting() {
  const { lang } = useLang();
  const T = getT(lang).consulting;

  const chartData = T.chart.points.map((p) => ({ month: p.label, before: p.before, after: p.after }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{T.description}</p>
        <ImpactPills />
      </div>

      {/* Process steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {T.steps.map((step, i) => {
          const Icon = STEP_ICONS[i] || BarChart3;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                  <Icon size={18} />
                </div>
                <div className="text-[11px] font-bold tracking-wider text-orange-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3 className="font-bold text-foreground text-base mb-1 leading-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ROI projection chart */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-foreground text-lg leading-tight">{T.chart.title}</h3>
            <p className="text-sm text-muted-foreground">{T.chart.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-muted-foreground inline-block" /> {T.chart.before}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-orange-500 inline-block" /> {T.chart.after}
            </span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => `$${v.toLocaleString()}`}
              />
              <Line type="monotone" dataKey="before" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="after" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Focus areas */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4">{T.focusTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {T.focus.map((f, i) => {
            const Icon = FOCUS_ICONS[i] || ClipboardCheck;
            return (
              <div key={f.title} className="rounded-xl border border-border bg-card p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm mb-0.5">{f.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome metrics */}
      <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {T.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500 tracking-tight mb-1">{m.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
