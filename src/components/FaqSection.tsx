import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";

interface FaqSectionProps {
  t: any;
}

export default function FaqSection({ t }: FaqSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section 
      id="faq" 
      className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-6 scroll-mt-28 md:scroll-mt-32"
    >
      <div className="bg-[#0b172a] rounded-[24px] md:rounded-[30px] shadow-xl border border-white/10 p-5 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1100px] relative z-10 overflow-hidden text-white flex flex-col items-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center w-full">
          <div className="text-center mb-6 flex flex-col items-center">
            {/* White Badge with Icon next to Text */}
            <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200 mb-3 font-sans">
              <HelpCircle className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
              <span>{t.faq.tag}</span>
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white tracking-tight font-sans mb-2">
              <span className="bg-[#2563eb] text-white px-3 py-1 rounded-xl inline-block shadow-md">
                {t.faq.title1}
              </span>{" "}
              {t.faq.title2}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans mt-1.5">
              {t.faq.subtitle}
            </p>
          </div>

          {/* Accordion Cards - Visual Cards with Index Badges & Balanced Text */}
          <div className="w-full flex flex-col gap-3 mb-6">
            {t.faq.items.map((item: any, i: number) => {
              const isActive = activeFaq === i;
              return (
                <div 
                  key={i}
                  onClick={() => setActiveFaq(isActive ? null : i)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 group border ${
                    isActive 
                      ? 'bg-white shadow-lg border-blue-500/40 ring-1 ring-blue-500/20' 
                      : 'bg-slate-100/95 hover:bg-white border-slate-200/90 hover:border-blue-400/50 shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-center gap-3.5">
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors duration-200 font-sans ${
                        isActive ? 'bg-[#2563eb] text-white shadow-xs' : 'bg-slate-200 text-slate-700 group-hover:bg-blue-100 group-hover:text-[#2563eb]'
                      }`}>
                        0{i + 1}
                      </span>
                      <h3 className="font-black text-[#0f172a] text-sm sm:text-base md:text-lg font-sans leading-snug text-balance">
                        {item.q}
                      </h3>
                    </div>
                    <motion.div 
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs ${
                        isActive ? 'bg-[#1d4ed8] text-white shadow-sm' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                      }`}
                    >
                      <span className="text-xl font-black leading-none select-none">+</span>
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div 
                        key={`faq-ans-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3.5 text-slate-700 leading-relaxed font-semibold text-xs sm:text-sm md:text-[15px] border-t border-slate-200 mt-3.5 font-sans text-balance">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Eye-Catching Blue CTA Button */}
          <div className="text-center">
            <a 
              href="#formulario-contacto" 
              onClick={(e) => {
                e.preventDefault();
                const formEl = document.getElementById("formulario-contacto");
                if (formEl) {
                  formEl.scrollIntoView({ behavior: "smooth", block: "center" });
                  const inputEl = formEl.querySelector("input") as HTMLInputElement | null;
                  if (inputEl) {
                    setTimeout(() => inputEl.focus({ preventScroll: true }), 400);
                  }
                }
              }}
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer font-sans"
            >
              <span>{t.faq.askDoubt}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
