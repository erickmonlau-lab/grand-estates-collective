import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, Sofa, Building, Star, BarChart3, Smile, ShieldCheck, ChevronRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Reveal from './Reveal';

import reformaBefore from '@/assets/reforma_before.jpg';
import reformaAfter from '@/assets/reforma_after.jpg';
import stagingBefore from '@/assets/staging_before.jpg';
import stagingAfter from '@/assets/staging_after.jpg';
import fachadaBefore from '@/assets/fachada_before.jpg';
import fachadaAfter from '@/assets/fachada_after.jpg';

const CATEGORIES = [
  {
    id: 'reforma',
    title: 'Reformas Integrales',
    subtitle: 'Renovación completa',
    icon: Paintbrush,
    before: reformaBefore,
    after: reformaAfter,
  },
  {
    id: 'staging',
    title: 'Home Staging',
    subtitle: 'Decoración estratégica',
    icon: Sofa,
    before: stagingBefore,
    after: stagingAfter,
  },
  {
    id: 'fachadas',
    title: 'Restauración',
    subtitle: 'Fachadas y exteriores',
    icon: Building,
    before: fachadaBefore,
    after: fachadaAfter,
  }
];

export default function BeforeAfterSection() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0b1221] text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start mb-20">
          
          {/* Left Column: Text & Buttons */}
          <div className="lg:w-[40%] flex flex-col pt-4">
            <Reveal>
              <div className="inline-block mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#005c99] px-1">
                  ANTES & DESPUÉS
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.1] text-white mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Resultados<br />
                que se ven,<br />
                <span className="text-[#005c99]">a primera vista.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-slate-400 text-lg md:text-xl max-w-[500px] font-medium leading-relaxed mb-12">
                Deslice el control para comparar el estado de cada espacio antes y después de nuestra intervención.
              </p>
            </Reveal>

            <div className="flex flex-col gap-4">
              {CATEGORIES.map((cat, i) => {
                const isActive = activeCategory.id === cat.id;
                return (
                  <Reveal key={cat.id} delay={0.3 + i * 0.1}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`relative w-full text-left p-5 rounded-[1.25rem] transition-all duration-300 overflow-hidden group flex items-center justify-between border ${
                        isActive 
                          ? 'border-[#005c99]/40 bg-[#005c99]/10' 
                          : 'border-white/5 bg-[#151f32]/50 hover:bg-[#151f32]'
                      }`}
                    >
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-[#005c99] text-white shadow-lg shadow-[#005c99]/20' : 'bg-white/5 text-slate-400 group-hover:text-white'
                        }`}>
                          <cat.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-bold text-[15px] mb-0.5 transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {cat.title}
                          </h3>
                          <p className={`text-[13px] font-medium transition-colors ${isActive ? 'text-[#0082c8]' : 'text-slate-500'}`}>
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-colors ${isActive ? 'text-[#005c99]' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Slider */}
          <div className="lg:w-[60%] w-full">
            <Reveal delay={0.4}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full"
                >
                  <BeforeAfterSlider 
                    beforeImage={activeCategory.before} 
                    afterImage={activeCategory.after} 
                  />
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>

        </div>

        {/* Bottom Horizontal Stats Bar */}
        <Reveal delay={0.6}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-10 border-t border-white/5">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0082c8]">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none mb-1">4.9/5</p>
                <p className="text-xs text-slate-400">Valoración media</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-10 bg-white/5"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0082c8]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none mb-1">+300</p>
                <p className="text-xs text-slate-400">Proyectos realizados</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/5"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0082c8]">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none mb-1">98%</p>
                <p className="text-xs text-slate-400">Clientes satisfechos</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/5"></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0082c8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight mb-0.5">Garantía de calidad</p>
                <p className="text-xs text-slate-400">Materiales premium y acabados impecables</p>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
