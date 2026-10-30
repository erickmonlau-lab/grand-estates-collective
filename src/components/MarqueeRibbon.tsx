import { useState } from "react";
import { ShieldCheck, Clock, Building2, Award, FileCheck, ThumbsUp } from "lucide-react";

interface MarqueeRibbonProps {
  language?: "es" | "en" | "ca";
  className?: string;
}

const RIBBON_ITEMS = {
  es: [
    { text: "COL·LEGI D'ADMINISTRADORS DE FINQUES (CAFBL)", icon: Award },
    { text: "REGISTRE D'AGENTS IMMOBILIARIS (AICAT Nº 5583)", icon: ShieldCheck },
    { text: "+300 COMUNIDADES DE PROPIETARIOS ACTIVAS", icon: Building2 },
    { text: "98% DE SATISFACCIÓN Y FIDELIDAD DE VECINOS", icon: ThumbsUp },
    { text: "ATENCIÓN URGENTE EN ~15 MINUTOS", icon: Clock },
    { text: "AUDITORÍA CONTABLE Y CONTROL DE GASTOS GRATUITO", icon: FileCheck },
    { text: "+15 AÑOS DE EXPERIENCIA EN SANTA COLOMA Y BARCELONA", icon: Award }
  ],
  ca: [
    { text: "COL·LEGI D'ADMINISTRADORS DE FINQUES (CAFBL)", icon: Award },
    { text: "REGISTRE D'AGENTS IMMOBILIARIS (AICAT Nº 5583)", icon: ShieldCheck },
    { text: "+300 COMUNITATS DE PROPIETARIS ACTIVES", icon: Building2 },
    { text: "98% DE SATISFACCIÓ I FIDELITAT DE VEÏNS", icon: ThumbsUp },
    { text: "ATENCIÓ URGENTE EN ~15 MINUTS", icon: Clock },
    { text: "AUDITORIA COMPTABLE I CONTROL DE DESPESES GRATUÏT", icon: FileCheck },
    { text: "+15 ANYS D'EXPERIÈNCIA A SANTA COLOMA I BARCELONA", icon: Award }
  ],
  en: [
    { text: "CHARTERED PROPERTY MANAGERS ASSOCIATION (CAFBL)", icon: Award },
    { text: "OFFICIAL CATALONIA REAL ESTATE REGISTER (AICAT 5583)", icon: ShieldCheck },
    { text: "+300 ACTIVE MANAGED COMMUNITIES", icon: Building2 },
    { text: "98% SATISFACTION & CLIENT RETENTION RATE", icon: ThumbsUp },
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
      className={`w-full relative z-20 flex items-center bg-[#111111] border-y-2 border-[#111111] select-none overflow-hidden h-12 sm:h-14 shadow-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed Left Badge: Sólido Azul Neo-Brutalist */}
      <div className="relative z-30 flex items-center h-full px-3.5 sm:px-6 bg-[#2860F5] shrink-0 border-r-2 border-[#111111]">
        <span className="text-[11px] sm:text-xs font-black tracking-widest text-white uppercase font-headline whitespace-nowrap flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-white shrink-0 border border-[#111111]" />
          {badge}
        </span>
      </div>

      {/* Seamless Continuous Marquee Track */}
      <div className="flex-1 overflow-hidden flex items-center bg-[#111111]">
        <div
          className={`flex items-center text-white font-headline text-xs sm:text-sm font-extrabold tracking-wider uppercase whitespace-nowrap w-max animate-marquee ${
            isHovered ? "[animation-play-state:paused]" : ""
          }`}
        >
          {[1, 2, 3].map((trackNum) => (
            <div key={`track-${trackNum}`} className="flex items-center gap-8 sm:gap-10 pr-8 sm:pr-10 shrink-0">
              {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={`item-${trackNum}-${idx}`} className="flex items-center gap-2.5 shrink-0">
                    <span className="w-2 h-2 bg-[#2860F5] shrink-0 border border-white" />
                    {Icon && <Icon className="w-4 h-4 text-[#2860F5] shrink-0 stroke-[2.5]" />}
                    <span className="text-white font-black tracking-wide whitespace-nowrap">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeRibbon;
