import { TrendingUp, Star, Users, Zap } from "lucide-react";

const PILLS = [
  { icon: TrendingUp, label: "Más ventas", color: "text-green-400 bg-green-400/10 border-green-700/30" },
  { icon: Star,       label: "Más reviews", color: "text-amber-400 bg-amber-400/10 border-amber-700/30" },
  { icon: Users,      label: "Más clientes", color: "text-blue-400 bg-blue-400/10 border-blue-700/30" },
  { icon: Zap,        label: "Menos trabajo", color: "text-purple-400 bg-purple-400/10 border-purple-700/30" },
];

export default function ImpactPills() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
      {PILLS.map(({ icon: Icon, label, color }) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${color}`}
        >
          <Icon size={12} />
          {label}
        </span>
      ))}
    </div>
  );
}
