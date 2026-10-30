import { useState } from "react";
import { HelpCircle, ArrowRight, Plus, X } from "lucide-react";
import { DrawnUnderline } from "@/components/DrawnUnderline";

interface FaqSectionProps {
  t: any;
}

export default function FaqSection({ t }: FaqSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section 
      id="faq" 
      className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] border-b-2 border-[#111111] scroll-mt-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Cabecera FAQ Sólida con Drawn Underline */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-4 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-4">
            <HelpCircle className="w-4 h-4 text-white" />
            <span>{t.faq.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight text-[#111111] tracking-tight mb-4">
            <span>{t.faq.title1} </span>
            <span className="relative inline-block text-[#2860F5]">
              {t.faq.title2}
              <DrawnUnderline color="#2860F5" />
            </span>
          </h2>

          <p className="text-slate-700 text-[16px] sm:text-[18px] font-bold leading-relaxed max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Acordeón Rounded Neo-Brutalist: Tarjetas blancas redondeadas (rounded-2xl) sobre fondo gris claro #FAF9FC */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-10">
          {t.faq.items.map((item: any, i: number) => {
            const isActive = activeFaq === i;
            return (
              <div 
                key={i}
                onClick={() => setActiveFaq(isActive ? null : i)}
                className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] p-5 sm:p-6 transition-all cursor-pointer hover:shadow-[4px_4px_0px_#2860F5]"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-9 h-9 bg-[#111111] text-white text-[14px] font-data-mono font-black flex items-center justify-center shrink-0 rounded-xl border border-[#111111]">
                      0{i + 1}
                    </span>
                    <h3 className="font-headline font-black text-[#111111] text-[17px] sm:text-[19px] leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  
                  {/* Botón de Expansión Circular SVG Azul Sólido (#2860F5 con + / #2860F5 o #111111 con X centrada) */}
                  <div 
                    className={`w-9 h-9 border-2 border-[#111111] rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm ${
                      isActive ? "bg-[#2860F5] text-white" : "bg-[#2860F5] text-white hover:bg-[#111111]"
                    }`}
                  >
                    {isActive ? (
                      <X className="w-5 h-5 text-white stroke-[3]" />
                    ) : (
                      <Plus className="w-5 h-5 text-white stroke-[3]" />
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="pt-4 mt-4 border-t-2 border-slate-100">
                    <p className="text-[#111111] text-[16px] sm:text-[17px] font-medium leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque CTA inferior de ayuda */}
        <div className="text-center pt-2">
          <p className="text-slate-700 font-headline font-bold text-sm sm:text-base mb-4">
            ¿Tienes otra duda o consulta sobre tu vivienda o comunidad?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-[#2860F5] hover:bg-[#111111] text-white px-8 py-3.5 rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] text-sm sm:text-base font-headline font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>CONSULTAR CON UN EXPERTO</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </section>
  );
}
