import React from 'react';
import { Users, ThumbsUp, Building2, Award } from "lucide-react";
import { translations } from '../data/translations';

interface TrustBarProps {
  language?: "es" | "en" | "ca";
}

export default function TrustBar({ language = "es" }: TrustBarProps) {
  const t = translations[language];

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2 },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award },
  ];

  return (
    <section id="trust-bar" className="bg-slate-50/70 border-b border-slate-200/80 py-6 sm:py-7">
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Desktop: barra horizontal equilibrada */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 items-center divide-x divide-slate-200">
          {STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={`flex items-center gap-3.5 ${idx !== 0 ? 'pl-6' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#2563eb] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-[#0b214a] leading-none tracking-tight font-sans">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-slate-500 tracking-wide mt-1 leading-snug">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Grid 2x2 compacto */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center mb-1.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-lg font-black text-[#0b214a] leading-none">
                  {s.value}
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">
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
