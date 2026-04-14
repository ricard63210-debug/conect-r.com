import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function ImpactPills() {
  const { lang } = useLang();
  const label = lang === "es" ? "Contactar a Conect-R" : "Contact Conect-R";

  return (
    <div className="mt-5 flex justify-center">
      <a
        href="mailto:contact@conect-r.com"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-600/60 bg-amber-500/10 text-amber-300 text-sm font-medium hover:bg-amber-500/20 hover:border-amber-500 transition-all duration-200 shadow-sm shadow-amber-900/20"
      >
        <Mail size={15} />
        {label}
        <span className="text-amber-500/70 text-xs">contact@conect-r.com</span>
      </a>
    </div>
  );
}
