import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, MapPin, Building2, Award, FileCheck } from "lucide-react";

interface MarqueeRibbonProps {
  language?: "es" | "en" | "ca";
  className?: string;
}

const RIBBON_ITEMS = {
  es: [
    { text: "+300 COMUNIDADES", icon: Building2 },
    { text: "DISET", icon: null },
    { text: "DIVERSPLAS", icon: null },
    { text: "4.9/5 GOOGLE REVIEWS", icon: Star },
    { text: "GESGRAMA", icon: null },
    { text: "COL·LEGI CAFBL", icon: Award },
    { text: "AICAT Nº 5583", icon: ShieldCheck },
    { text: "ATENCIÓN ~15 MIN", icon: Clock },
    { text: "AUDITORÍA GRATUITA", icon: FileCheck }
  ],
  ca: [
    { text: "+300 COMUNITATS", icon: Building2 },
    { text: "DISET", icon: null },
    { text: "DIVERSPLAS", icon: null },
    { text: "4.9/5 GOOGLE REVIEWS", icon: Star },
    { text: "GESGRAMA", icon: null },
    { text: "COL·LEGI CAFBL", icon: Award },
    { text: "AICAT Nº 5583", icon: ShieldCheck },
    { text: "ATENCIÓ ~15 MIN", icon: Clock },
    { text: "AUDITORIA GRATUÏTA", icon: FileCheck }
  ],
  en: [
    { text: "+300 COMMUNITIES", icon: Building2 },
    { text: "DISET", icon: null },
    { text: "DIVERSPLAS", icon: null },
    { text: "4.9/5 GOOGLE REVIEWS", icon: Star },
    { text: "GESGRAMA", icon: null },
    { text: "CHARTERED CAFBL", icon: Award },
    { text: "AICAT REG. 5583", icon: ShieldCheck },
    { text: "RESPONSE ~15 MIN", icon: Clock },
    { text: "FREE AUDIT", icon: FileCheck }
  ]
};

const BADGE_LABEL = {
  es: "CONFÍAN EN NOSOTROS",
  ca: "CONFIDEN EN NOSALTRES",
  en: "TRUSTED BY"
};

export function MarqueeRibbon({ language = "es", className = "" }: MarqueeRibbonProps) {
  const items = RIBBON_ITEMS[language] || RIBBON_ITEMS.es;
  const badge = BADGE_LABEL[language] || BADGE_LABEL.es;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative z-20 flex items-center bg-[#090D16] border-y border-white/10 select-none overflow-hidden h-11 sm:h-12 shadow-inner ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed Left Badge (matching reference) */}
      <div className="relative z-30 flex items-center h-full px-4 sm:px-6 bg-[#090D16] shrink-0 border-r border-white/10 shadow-[8px_0_16px_rgba(9,13,22,0.9)]">
        <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-400 uppercase font-sans whitespace-nowrap">
          {badge}
        </span>
      </div>

      {/* Edge gradient mask for natural fade */}
      <div className="absolute left-28 sm:left-48 top-0 bottom-0 w-8 bg-gradient-to-r from-[#090D16] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#090D16] to-transparent z-20 pointer-events-none" />

      {/* Continuous Marquee Track */}
      <div className="flex-1 overflow-hidden flex items-center">
        <motion.div
          animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 26
          }}
          className="flex items-center text-white font-sans text-[11px] sm:text-[13px] font-black tracking-wider uppercase whitespace-nowrap w-max will-change-transform"
        >
          {/* Track A */}
          <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`track-a-${idx}`} className="flex items-center gap-2 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 stroke-[2.5]" />}
                  <span className="text-slate-200 font-extrabold tracking-wider whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Track B (Duplicate for seamless loop) */}
          <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`track-b-${idx}`} className="flex items-center gap-2 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 stroke-[2.5]" />}
                  <span className="text-slate-200 font-extrabold tracking-wider whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MarqueeRibbon;
