import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, MapPin, Building2, Award, FileCheck } from "lucide-react";

interface MarqueeRibbonProps {
  language?: "es" | "en" | "ca";
  className?: string;
}

const RIBBON_ITEMS = {
  es: [
    { text: "+300 COMUNIDADES GESTIONADAS", icon: Building2 },
    { text: "4.9/5 EN GOOGLE REVIEWS", icon: Star },
    { text: "ATENCIÓN URGENTE EN ~15 MIN", icon: Clock },
    { text: "ADMINISTRADORES COLEGIADOS CAFBL", icon: Award },
    { text: "SEDE EN AV. DELS BANÚS, 49", icon: MapPin },
    { text: "AUDITORÍA CONTABLE GRATUITA", icon: FileCheck },
    { text: "REGISTRO AICAT Nº 5583", icon: ShieldCheck }
  ],
  ca: [
    { text: "+300 COMUNITATS GESTIONADES", icon: Building2 },
    { text: "4.9/5 A GOOGLE REVIEWS", icon: Star },
    { text: "ATENCIÓ URGENT EN ~15 MIN", icon: Clock },
    { text: "ADMINISTRADORS COL·LEGIATS CAFBL", icon: Award },
    { text: "SEU A AV. DELS BANÚS, 49", icon: MapPin },
    { text: "AUDITORIA COMPTABLE GRATUÏTA", icon: FileCheck },
    { text: "REGISTRE AICAT Nº 5583", icon: ShieldCheck }
  ],
  en: [
    { text: "+300 COMMUNITIES MANAGED", icon: Building2 },
    { text: "4.9/5 ON GOOGLE REVIEWS", icon: Star },
    { text: "EMERGENCY RESPONSE IN ~15 MIN", icon: Clock },
    { text: "CHARTERED PROPERTY MANAGERS", icon: Award },
    { text: "HEADQUARTERS AT AV. DELS BANÚS, 49", icon: MapPin },
    { text: "FREE ACCOUNTING AUDIT", icon: FileCheck },
    { text: "OFFICIAL AICAT REG. NO. 5583", icon: ShieldCheck }
  ]
};

export function MarqueeRibbon({ language = "es", className = "" }: MarqueeRibbonProps) {
  const items = RIBBON_ITEMS[language] || RIBBON_ITEMS.es;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`overflow-hidden bg-[#0b214a] border-y border-white/10 py-3.5 select-none relative z-20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 32
        }}
        className="flex items-center text-white font-sans text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap w-max will-change-transform"
      >
        {/* Track A */}
        <div className="flex items-center gap-6 pr-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`track-a-${idx}`} className="flex items-center gap-2.5 shrink-0">
                <Icon className="w-4 h-4 text-[#38bdf8] shrink-0 stroke-[2.5]" />
                <span className="text-slate-100 whitespace-nowrap">{item.text}</span>
                <span className="text-slate-600 ml-4 select-none">/</span>
              </div>
            );
          })}
        </div>

        {/* Track B (Duplicate for continuous loop) */}
        <div className="flex items-center gap-6 pr-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`track-b-${idx}`} className="flex items-center gap-2.5 shrink-0">
                <Icon className="w-4 h-4 text-[#38bdf8] shrink-0 stroke-[2.5]" />
                <span className="text-slate-100 whitespace-nowrap">{item.text}</span>
                <span className="text-slate-600 ml-4 select-none">/</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default MarqueeRibbon;
