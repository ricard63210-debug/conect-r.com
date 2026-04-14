import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function ImpactPills() {
  const { lang } = useLang();
  const label = lang === "es" ? "Contactar a Conect-R" : "Contact Conect-R";

  return (
    <div className="mt-5 flex justify-center px-4">
      <a
        href="mailto:contact@conect-r.com"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-600/60 bg-sky-500/10 text-sky-300 text-sm font-medium hover:bg-sky-500/20 hover:border-sky-500 transition-all duration-200 shadow-sm shadow-sky-900/20 whitespace-nowrap"
      >
        <Mail size={15} className="shrink-0" />
        <span className="whitespace-nowrap">{label}</span>
        <span className="text-sky-500/70 text-xs whitespace-nowrap">contact@conect-r.com</span>
      </a>
    </div>
  );
}
