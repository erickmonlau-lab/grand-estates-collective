import { useState } from "react";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";

interface FaqSectionProps {
  t: any;
}

export default function FaqSection({ t }: FaqSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section 
      id="faq" 
      className="py-14 sm:py-20 bg-[#111111] text-white border-b-2 border-[#111111] scroll-mt-24"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Cabecera FAQ Sólida */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 border border-white mb-4">
            <HelpCircle className="w-4 h-4 text-white" />
            <span>{t.faq.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight text-white tracking-tight mb-4">
            <span>{t.faq.title1} </span>
            <span className="text-[#2860F5] underline decoration-white decoration-4 underline-offset-4">{t.faq.title2}</span>
          </h2>

          <p className="text-slate-300 text-[16px] sm:text-[18px] font-bold leading-relaxed max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Acordeón Neo-Brutalist: Preguntas blancas sólidas con bordes negros, numeración JetBrains Mono y botón expansor azul geométrico */}
        <div className="max-w-4xl mx-auto flex flex-col gap-3.5 mb-10">
          {t.faq.items.map((item: any, i: number) => {
            const isActive = activeFaq === i;
            return (
              <div 
                key={i}
                onClick={() => setActiveFaq(isActive ? null : i)}
                className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] p-5 sm:p-6 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-8 h-8 bg-[#111111] text-white text-[14px] font-data-mono font-black flex items-center justify-center shrink-0 border border-[#111111]">
                      0{i + 1}
                    </span>
                    <h3 className="font-headline font-black text-[#111111] text-[17px] sm:text-[19px] leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  
                  {/* Botón de Expansión Geométrico Azul Sólido */}
                  <div 
                    className={`w-9 h-9 bg-[#2860F5] text-white border-2 border-[#111111] flex items-center justify-center shrink-0 font-black text-xl transition-transform duration-200 ${
                      isActive ? "rotate-45 bg-[#111111]" : ""
                    }`}
                  >
                    +
                  </div>
                </div>

                {isActive && (
                  <div className="pt-4 mt-4 border-t-2 border-[#111111]">
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
          <p className="text-slate-300 font-headline font-bold text-sm sm:text-base mb-4">
            ¿Tienes otra duda o consulta sobre tu vivienda o comunidad?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-[#2860F5] hover:bg-white hover:text-[#111111] text-white px-8 py-3.5 border-2 border-white shadow-[3px_3px_0px_#FFFFFF] text-sm sm:text-base font-headline font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>CONSULTAR CON UN EXPERTO</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </section>
  );
}
