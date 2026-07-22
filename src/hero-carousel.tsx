import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Shield, Check, Home, LineChart, Zap, Users } from "lucide-react";
import realisticBg from "@/assets/realistic-bg.webp"; 
import gesgramaBuilding from "@/assets/gesgrama_building.webp"; 
import { translations } from './data/translations';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
}

// ── Animated Counter ──
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(easeOut * to);
      setDisplay(currentCount.toString());

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplay(to.toString());
      }
    };

    requestAnimationFrame(animateCount);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const expo = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];

  return (
    <section id="hero" className="relative bg-[#f1f5f9] text-onyx pt-28 pb-12 md:pt-36 md:pb-16 px-4 md:px-8 overflow-hidden min-h-[100dvh] flex flex-col justify-center">
      
      {/* ── Screen Blueprint Background ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${realisticBg})`,
          backgroundSize: '100% 100%' 
        }} 
      />

      <div className="max-w-[1300px] mx-auto w-full relative z-10">
        
        {/* Main Levitating White Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] md:rounded-[36px] shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-200/50 p-6 md:p-12 lg:p-14 relative z-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: expo }}
                className="w-full"
              >
                {/* Eyebrow Tag */}
                <span className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#2563eb] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
                  {t.heroCarousel.tag}
                </span>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-[1.08] tracking-tight mb-6 font-sans">
                  {t.heroCarousel.titleMain}<br />
                  <span className="text-[#2563eb]">{t.heroCarousel.titleAccent}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-500 text-base md:text-lg max-w-lg mb-8 font-medium leading-relaxed">
                  {t.heroCarousel.subtitle}
                </p>

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6">
                  {/* Button 1: Valorar mi propiedad */}
                  <a
                    href="#valuator-form"
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-white" />
                    <span>{t.heroCarousel.btnValuation}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Button 2: Ver propiedades */}
                  <a
                    href="#propiedades"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span>{t.heroCarousel.btnProperties}</span>
                  </a>
                </div>

                {/* Trust Badge Below Buttons */}
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{t.heroCarousel.trustBadge}</span>
                </div>
              </motion.div>
            </div>

            {/* Right Valuation Container Card (Exact Mockup Layout) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: expo }}
                className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.04)] w-full max-w-[380px] relative overflow-hidden"
              >
                {/* Floating Home Badge Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shadow-xs">
                  <Home className="w-6 h-6" />
                </div>

                {/* Card Title */}
                <div className="text-xs font-extrabold text-[#2563eb] uppercase tracking-wider mb-2 font-sans">
                  {t.heroCarousel.estimatedValue}
                </div>
                
                {/* Price Display */}
                <div className="text-4xl md:text-[44px] font-black text-[#0f172a] mb-4 leading-none tracking-tight font-sans">
                  245<span className="text-slate-400 font-normal">.000€</span>
                </div>
                
                {/* Range Badge */}
                <div className="inline-flex flex-col mb-6 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-fit">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    {t.heroCarousel.estimatedRange}
                  </span>
                  <span className="text-xs font-bold text-[#0f172a] leading-none">
                    230.000€ – 260.000€
                  </span>
                </div>

                {/* Building Blueprint Drawing (Rendered as blue/gray sketch) */}
                <div className="w-full h-36 rounded-2xl overflow-hidden mb-6 bg-slate-50/50 border border-slate-100 p-2 flex items-center justify-center">
                  <img 
                    src={gesgramaBuilding} 
                    alt="Blue-print Rendering" 
                    className="w-full h-full object-contain opacity-60 mix-blend-multiply" 
                  />
                </div>
                
                {/* Card Check Rows */}
                <div className="flex flex-col gap-2.5 text-[11px] font-bold text-slate-500 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>{t.heroCarousel.basedOnReal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LineChart className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>{t.heroCarousel.professionalAnalysis}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>{t.heroCarousel.getInstantly}</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Floating Stat Cards Row (Exact Image 3 Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 relative z-20">
          
          {/* Stat 1: Clientes Satisfechos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0f172a] leading-none mb-1 font-sans">
                <Counter to={4500} suffix="+" />
              </p>
              <p className="text-xs text-slate-500 font-semibold leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
            </div>
          </motion.div>

          {/* Stat 2: Comunidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0f172a] leading-none mb-1 font-sans">
                {t.heroCarousel.stats.comunidadesNum}
              </p>
              <p className="text-xs text-slate-500 font-semibold leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
            </div>
          </motion.div>

          {/* Stat 3: Satisfacción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0f172a] leading-none mb-1 font-sans">
                <Counter to={98} suffix="%" />
              </p>
              <p className="text-xs text-slate-500 font-semibold leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
            </div>
          </motion.div>

          {/* Stat 4: Años de experiencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 fill-[#2563eb]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#0f172a] leading-none mb-1 font-sans">
                <Counter to={15} suffix="+" />
              </p>
              <p className="text-xs text-slate-500 font-semibold leading-tight">{t.heroCarousel.stats.anosLabel}</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
