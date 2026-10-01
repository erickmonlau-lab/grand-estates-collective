import React from 'react';
import { Users, ThumbsUp, Building2, Award } from "lucide-react";
import { translations } from '../data/translations';

interface TrustBarProps {
  language?: "es" | "en" | "ca";
}

export default function TrustBar({ language = "es" }: TrustBarProps) {
  const t = translations[language];

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users, dark: true },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp, dark: false },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2, dark: true },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award, dark: false },
  ];

  return (
    <section id="trust-bar" className="bg-[#F8FAFC] border-b border-slate-200/80 pt-4 pb-8 sm:pb-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        {/* 4 Cards Horizontales (Estilo Exacto Referencia Imagen 2: alternadas Dark Navy y Blanco) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  s.dark
                    ? "bg-[#0b1528] text-white border border-slate-800"
                    : "bg-white text-[#0b214a] border border-slate-200/90 shadow-sm"
                }`}
              >
                <div className="mb-2 sm:mb-2.5">
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${s.dark ? "text-[#38bdf8]" : "text-[#2563eb]"}`} />
                </div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-black leading-none tracking-tight font-heading ${s.dark ? "text-white" : "text-[#0b214a]"}`}>
                  {s.value}
                </div>
                <div className={`text-xs sm:text-sm font-bold mt-2 leading-tight ${s.dark ? "text-slate-300" : "text-slate-600"}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
