import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Shield, Check, Home } from "lucide-react";
import heroBg from "@/assets/family_barcelona.jpg"; 
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

// ── Designer Vector Building Sketches (Inline SVGs) ──
const BuildingSketchLeft = () => (
  <svg className="absolute left-[2%] bottom-[8%] w-[280px] h-[380px] text-slate-200 pointer-events-none select-none z-0 hidden md:block" viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeWidth="0.6">
    {/* Ground line */}
    <line x1="0" y1="135" x2="100" y2="135" />
    
    {/* Modern Building Facade Elevation */}
    <rect x="15" y="15" width="70" height="120" rx="1.5" />
    
    {/* Floor lines */}
    <line x1="15" y1="45" x2="85" y2="45" strokeDasharray="2 2" strokeWidth="0.4" />
    <line x1="15" y1="75" x2="85" y2="75" strokeDasharray="2 2" strokeWidth="0.4" />
    <line x1="15" y1="105" x2="85" y2="105" strokeDasharray="2 2" strokeWidth="0.4" />
    
    {/* Modern Window Grid & Balconies */}
    <rect x="25" y="25" width="12" height="12" rx="0.5" />
    <rect x="63" y="25" width="12" height="12" rx="0.5" />
    <rect x="25" y="55" width="12" height="12" rx="0.5" />
    <rect x="63" y="55" width="12" height="12" rx="0.5" />
    <rect x="25" y="85" width="12" height="12" rx="0.5" />
    <rect x="63" y="85" width="12" height="12" rx="0.5" />
    
    {/* Balcony Railings */}
    <line x1="22" y1="37" x2="40" y2="37" />
    <line x1="22" y1="37" x2="22" y2="42" />
    <line x1="40" y1="37" x2="40" y2="42" />
    
    <line x1="60" y1="37" x2="78" y2="37" />
    <line x1="60" y1="37" x2="60" y2="42" />
    <line x1="78" y1="37" x2="78" y2="42" />

    <line x1="22" y1="67" x2="40" y2="67" />
    <line x1="22" y1="67" x2="22" y2="72" />
    <line x1="40" y1="67" x2="40" y2="72" />
    
    <line x1="60" y1="67" x2="78" y2="67" />
    <line x1="60" y1="67" x2="60" y2="72" />
    <line x1="78" y1="67" x2="78" y2="72" />

    {/* Door */}
    <rect x="42" y="110" width="16" height="25" />
    <circle cx="54" cy="122" r="0.7" fill="currentColor" />

    {/* Architectural Axis Guides */}
    <line x1="8" y1="5" x2="8" y2="135" strokeDasharray="3 3" strokeWidth="0.3" />
    <line x1="92" y1="5" x2="92" y2="135" strokeDasharray="3 3" strokeWidth="0.3" />
  </svg>
);

const BuildingSketchRight = () => (
  <svg className="absolute right-[2%] top-[14%] w-[300px] h-[380px] text-slate-200 pointer-events-none select-none z-0 hidden lg:block" viewBox="0 0 100 130" fill="none" stroke="currentColor" strokeWidth="0.6">
    {/* Ground line */}
    <line x1="0" y1="120" x2="100" y2="120" />
    
    {/* Modern Penthouse Villa Line art */}
    <path d="M 15 120 L 15 65 L 50 65 L 50 40 L 85 40 L 85 120 Z" />
    
    {/* Window groups */}
    <rect x="25" y="75" width="15" height="30" rx="0.5" />
    <rect x="58" y="50" width="20" height="15" rx="0.5" />
    <rect x="58" y="80" width="20" height="25" rx="0.5" />
    
    {/* Window divisions */}
    <line x1="32.5" y1="75" x2="32.5" y2="105" strokeWidth="0.4" />
    <line x1="68" y1="50" x2="68" y2="65" strokeWidth="0.4" />
    <line x1="68" y1="80" x2="68" y2="105" strokeWidth="0.4" />
    
    {/* Pergola / Canopy structure */}
    <line x1="10" y1="65" x2="55" y2="65" />
    <line x1="15" y1="57" x2="48" y2="57" strokeWidth="0.4" />
    <line x1="22" y1="57" x2="22" y2="65" strokeWidth="0.4" />
    <line x1="32" y1="57" x2="32" y2="65" strokeWidth="0.4" />
    <line x1="42" y1="57" x2="42" y2="65" strokeWidth="0.4" />

    {/* Trees minimal architectural outline */}
    <path d="M 8 120 L 8 105 A 4 4 0 0 1 12 101 A 4 4 0 0 1 16 105 L 16 120" strokeWidth="0.4" />
    <path d="M 90 120 L 90 110 A 3 3 0 0 1 93 107 A 3 3 0 0 1 96 110 L 96 120" strokeWidth="0.4" />
  </svg>
);

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];

  return (
    <section id="hero" className="relative bg-[#f8fafc] text-onyx pt-28 pb-12 md:pt-36 md:pb-16 px-4 md:px-8 overflow-hidden min-h-[100dvh] flex flex-col justify-center select-none">
      
      {/* ── Completely White Base Background ── */}
      <div className="absolute inset-0 z-0 bg-[#f8fafc] pointer-events-none" />

      {/* ── Elegant Vector Line Drawings of Buildings (Instead of superimposed images) ── */}
      <BuildingSketchLeft />
      <BuildingSketchRight />

      <div className="max-w-[1300px] mx-auto w-full relative z-10">
        
        {/* Main Light Card */}
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-[0_20px_50px_rgba(15,23,42,0.03)] border border-slate-200/50 p-6 md:p-12 lg:p-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
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
                <p className="text-slate-500 text-base md:text-lg max-w-lg mb-8 font-medium leading-relaxed font-sans">
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

            {/* Right Image Column (Clean, Portrait aspect family photo) */}
            <div className="lg:col-span-5 w-full h-[320px] sm:h-[400px] lg:h-[440px] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
              <motion.img
                src={heroBg}
                alt="Gesgrama - Barcelona"
                initial={{ scale: 1.03, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: expo }}
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>

          </div>
        </div>

        {/* Floating Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 relative z-20">
          
          {/* Stat 1: Clientes Satisfechos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
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
            initial={{ opacity: 0, y: 15 }}
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
            initial={{ opacity: 0, y: 15 }}
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
            initial={{ opacity: 0, y: 15 }}
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
