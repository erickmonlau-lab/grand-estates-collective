import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, MapPin, Building2, Award, FileCheck } from "lucide-react";

interface MarqueeRibbonProps {
  language?: "es" | "en" | "ca";
  className?: string;
}

const RIBBON_ITEMS = {
  es: [
    { text: "COL·LEGI D'ADMINISTRADORS DE FINQUES (CAFBL)", icon: Award },
    { text: "REGISTRE D'AGENTS IMMOBILIARIS (AICAT Nº 5583)", icon: ShieldCheck },
    { text: "4.9/5 EN GOOGLE REVIEWS (+300 RESEÑAS)", icon: Star },
    { text: "+300 COMUNIDADES DE PROPIETARIOS GESTIONADAS", icon: Building2 },
    { text: "ATENCIÓN URGENTE EN ~15 MINUTOS", icon: Clock },
    { text: "AUDITORÍA CONTABLE Y CONTROL DE GASTOS GRATUITO", icon: FileCheck },
    { text: "+15 AÑOS DE EXPERIENCIA EN SANTA COLOMA Y BARCELONA", icon: Award }
  ],
  ca: [
    { text: "COL·LEGI D'ADMINISTRADORS DE FINQUES (CAFBL)", icon: Award },
    { text: "REGISTRE D'AGENTS IMMOBILIARIS (AICAT Nº 5583)", icon: ShieldCheck },
    { text: "4.9/5 A GOOGLE REVIEWS (+300 RESSENYES)", icon: Star },
    { text: "+300 COMUNITATS DE PROPIETARIS GESTIONADES", icon: Building2 },
    { text: "ATENCIÓ URGENT EN ~15 MINUTS", icon: Clock },
    { text: "AUDITORIA COMPTABLE I CONTROL DE DESPESES GRATUÏT", icon: FileCheck },
    { text: "+15 ANYS D'EXPERIÈNCIA A SANTA COLOMA I BARCELONA", icon: Award }
  ],
  en: [
    { text: "CHARTERED PROPERTY MANAGERS ASSOCIATION (CAFBL)", icon: Award },
    { text: "OFFICIAL CATALONIA REAL ESTATE REGISTER (AICAT 5583)", icon: ShieldCheck },
    { text: "4.9/5 ON GOOGLE REVIEWS (+300 REVIEWS)", icon: Star },
    { text: "+300 MANAGED COMMUNITIES OF PROPERTY OWNERS", icon: Building2 },
    { text: "EMERGENCY CALLOUT IN ~15 MINUTES", icon: Clock },
    { text: "FREE ACCOUNTING AUDIT & EXPENSE OPTIMIZATION", icon: FileCheck },
    { text: "+15 YEARS OF LOCAL EXPERIENCE IN SANTA COLOMA & BARCELONA", icon: Award }
  ]
};

const BADGE_LABEL = {
  es: "GARANTÍAS Y ACREDITACIONES",
  ca: "GARANTIES I ACREDITACIONS",
  en: "GUARANTEES & ACCREDITATIONS"
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
