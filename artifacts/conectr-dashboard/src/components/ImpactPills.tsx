import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function ImpactPills() {
  const { lang } = useLang();
  const label = lang === "es" ? "Contactar a Conect-R" : "Contact Conect-R";

  return (
    <div className="mt-5 flex justify-center px-4">
      <a
        href="mailto:contact@conect-r.com"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-600/60 bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500 transition-all duration-200 shadow-sm shadow-orange-900/20 whitespace-nowrap"
      >
        <Mail size={15} className="shrink-0" />
        <span className="whitespace-nowrap">{label}</span>
        <span className="text-orange-500/70 text-xs whitespace-nowrap">contact@conect-r.com</span>
      </a>
    </div>
  );
}
