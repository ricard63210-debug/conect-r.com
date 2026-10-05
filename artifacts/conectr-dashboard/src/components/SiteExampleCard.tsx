import { motion } from "framer-motion";

type SiteExampleCardProps = {
  name: string;
  industry: string;
  url: string;
  desktopSrc: string;
  mobileSrc: string;
  desktopAlt: string;
  mobileAlt: string;
  visitLabel: string;
  index?: number;
};

export default function SiteExampleCard({
  name,
  industry,
  url,
  desktopSrc,
  mobileSrc,
  desktopAlt,
  mobileAlt,
  visitLabel,
  index = 0,
}: SiteExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="maya-card group h-full rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-sm p-4 sm:p-5 hover:border-orange-500/30 hover:bg-orange-500/[0.02] transition-all relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="relative">
          <div className="aspect-[16/10] rounded-[1.75rem] overflow-hidden border border-border bg-muted">
            <img
              src={desktopSrc}
              alt={`${name} — ${desktopAlt}`}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-6 right-4 sm:right-6 w-[22%] min-w-[72px] aspect-[390/664] rounded-2xl overflow-hidden border-4 border-background bg-muted shadow-2xl">
            <img
              src={mobileSrc}
              alt={`${name} — ${mobileAlt}`}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="px-3 sm:px-4 pt-8 pb-3">
          <div className="text-[10px] font-black tracking-[0.25em] text-orange-500/80 mb-2 uppercase">
            {industry}
          </div>
          <div className="font-bold text-foreground text-2xl mb-5">{name}</div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-2xl border border-border text-foreground font-semibold text-sm hover:border-orange-500/40 hover:text-orange-500 transition-all"
          >
            {visitLabel}
          </a>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
