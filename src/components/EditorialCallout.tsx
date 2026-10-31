import React from "react";
import { 
  Lightbulb, 
  AlertTriangle, 
  Sparkles, 
  Info, 
  Bookmark, 
  CheckCircle2, 
  FileText,
  LucideIcon 
} from "lucide-react";

export type CalloutVariant = 
  | "idea-clave" 
  | "importante" 
  | "consejo" 
  | "dato-clave" 
  | "destacado" 
  | "nota" 
  | "resumen" 
  | "legal";

interface EditorialCalloutProps {
  variant?: CalloutVariant;
  label?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
}

const VARIANT_CONFIG: Record<CalloutVariant, {
  defaultLabel: string;
  icon: LucideIcon;
  badgeBg: string;
  badgeText: string;
  containerBg: string;
  borderColor: string;
  shadowColor: string;
  iconBg: string;
  iconColor: string;
}> = {
  "idea-clave": {
    defaultLabel: "IDEA CLAVE",
    icon: Lightbulb,
    badgeBg: "bg-[#111111]",
    badgeText: "text-white",
    containerBg: "bg-[#FAF9FC]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#111111]",
    iconBg: "bg-[#2860F5]",
    iconColor: "text-white",
  },
  "importante": {
    defaultLabel: "IMPORTANTE",
    icon: AlertTriangle,
    badgeBg: "bg-[#111111]",
    badgeText: "text-white",
    containerBg: "bg-amber-50/50",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#111111]",
    iconBg: "bg-[#111111]",
    iconColor: "text-amber-400",
  },
  "consejo": {
    defaultLabel: "CONSEJO GESGRAMA",
    icon: Sparkles,
    badgeBg: "bg-[#2860F5]",
    badgeText: "text-white",
    containerBg: "bg-[#FFFFFF]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#2860F5]",
    iconBg: "bg-[#2860F5]",
    iconColor: "text-white",
  },
  "dato-clave": {
    defaultLabel: "DATO CLAVE",
    icon: Bookmark,
    badgeBg: "bg-[#111111]",
    badgeText: "text-white",
    containerBg: "bg-[#FAF9FC]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#111111]",
    iconBg: "bg-[#2860F5]",
    iconColor: "text-white",
  },
  "destacado": {
    defaultLabel: "INFORMACIÓN DESTACADA",
    icon: Info,
    badgeBg: "bg-[#2860F5]",
    badgeText: "text-white",
    containerBg: "bg-[#FFFFFF]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#111111]",
    iconBg: "bg-[#111111]",
    iconColor: "text-white",
  },
  "nota": {
    defaultLabel: "NOTA INFORMATIVA",
    icon: FileText,
    badgeBg: "bg-slate-800",
    badgeText: "text-white",
    containerBg: "bg-[#FFFFFF]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[3px_3px_0px_#111111]",
    iconBg: "bg-slate-200",
    iconColor: "text-[#111111]",
  },
  "resumen": {
    defaultLabel: "RESUMEN EJECUTIVO",
    icon: CheckCircle2,
    badgeBg: "bg-[#2860F5]",
    badgeText: "text-white",
    containerBg: "bg-[#FAF9FC]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#2860F5]",
    iconBg: "bg-[#2860F5]",
    iconColor: "text-white",
  },
  "legal": {
    defaultLabel: "VERIFICACIÓN LEGAL / FISCAL",
    icon: AlertTriangle,
    badgeBg: "bg-[#111111]",
    badgeText: "text-[#60A5FA]",
    containerBg: "bg-[#111111]",
    borderColor: "border-[#111111]",
    shadowColor: "shadow-[4px_4px_0px_#2860F5]",
    iconBg: "bg-[#1E293B]",
    iconColor: "text-[#60A5FA]",
  },
};

export function EditorialCallout({
  variant = "idea-clave",
  label,
  title,
  children,
  className = "",
  icon: CustomIcon,
}: EditorialCalloutProps) {
  const cfg = VARIANT_CONFIG[variant] || VARIANT_CONFIG["idea-clave"];
  const displayLabel = label || cfg.defaultLabel;
  const IconComponent = CustomIcon || cfg.icon;
  const isDark = variant === "legal";

  return (
    <aside
      className={`w-full my-8 p-6 sm:p-8 md:p-9 border-2 ${cfg.borderColor} rounded-[18px] sm:rounded-2xl ${cfg.containerBg} ${cfg.shadowColor} transition-all ${className}`}
      aria-label={displayLabel}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-black/10">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${cfg.iconBg} ${cfg.iconColor} border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0`}>
            <IconComponent className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className={`inline-flex items-center px-3.5 py-1.5 rounded-lg ${cfg.badgeBg} ${cfg.badgeText} text-xs sm:text-[14px] font-headline font-black uppercase tracking-wider border border-[#111111]`}>
            {displayLabel}
          </span>
        </div>
        {title && (
          <h4 className={`text-lg sm:text-[20px] font-headline font-black ${isDark ? "text-white" : "text-[#111111]"} tracking-tight`}>
            {title}
          </h4>
        )}
      </div>

      <div className={`text-[17px] sm:text-[18px] font-medium leading-[1.65] ${isDark ? "text-slate-100" : "text-[#111111]"}`}>
        {children}
      </div>
    </aside>
  );
}

export default EditorialCallout;
