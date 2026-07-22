import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Shield, Check, Home, Compass } from "lucide-react";
import heroBg from "@/assets/family_barcelona.jpg"; 
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
    <section id="hero" className="relative bg-[#f8fafc] text-onyx pt-28 pb-12 md:pt-36 md:pb-16 px-4 md:px-8 overflow-hidden min-h-[100dvh] flex flex-col justify-center select-none">
      
      {/* ── 1. Sophisticated Technical Blueprint Grid ── */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #cbd5e1 1px, transparent 1px),
            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }} 
      />

      {/* ── 2. Subtle Radial Blueprint Dots overlay ── */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
          backgroundSize: '2rem 2rem'
        }} 
      />

      {/* ── 3. Technical Coordinate Crosshairs (+) & Labels ── */}
      <div className="absolute top-[12%] left-[5%] font-mono text-[9px] text-slate-400 opacity-60 z-0">
        + ZONE_BCN_E-01 / 41.3851° N, 2.1734° E
      </div>
      <div className="absolute bottom-[8%] right-[5%] font-mono text-[9px] text-slate-400 opacity-60 z-0">
        + REF: GES_2026_HERO / SCALE 1:50
      </div>

      {/* ── 4. Technical Architectural Sketch Backgrounds (Faded, aligned with grid) ── */}
      <div className="absolute left-[3%] bottom-[5%] w-[380px] h-[380px] z-0 opacity-[0.09] pointer-events-none select-none">
        <div 
          className="w-full h-full bg-contain bg-no-repeat bg-left-bottom"
          style={{ backgroundImage: `url(${gesgramaBuilding})` }}
        />
        {/* Horizontal dimension line overlay */}
        <div className="absolute bottom-4 left-0 right-10 h-px bg-slate-400/80 flex items-center justify-between px-2">
          <span className="text-[8px] font-mono text-slate-400">| 0.00m</span>
          <span className="text-[8px] font-mono text-slate-500 bg-[#f8fafc] px-1 font-bold">L-ELEVATION: 18.50m</span>
          <span className="text-[8px] font-mono text-slate-400">18.50m |</span>
        </div>
      </div>

      <div className="absolute right-[2%] top-[12%] w-[420px] h-[420px] z-0 opacity-[0.09] pointer-events-none select-none">
        <div 
          className="w-full h-full bg-contain bg-no-repeat bg-right-top"
          style={{ backgroundImage: `url(${gesgramaBuilding})` }}
        />
        {/* Technical angle arc overlay (drawn in SVG) */}
        <svg className="absolute top-8 right-8 w-24 h-24 text-slate-500/60" viewBox="0 0 100 100" fill="none">
          <path d="M 10 90 A 80 80 0 0 1 90 10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" />
          <line x1="90" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" />
          <text x="50" y="75" className="fill-slate-500 font-mono text-[10px]" textAnchor="middle">R=80.0</text>
        </svg>
      </div>

      {/* ── Main Layout Wrapper ── */}
      <div className="max-w-[1300px] mx-auto w-full relative z-10">
        
        {/* ── Main Levitating Architect Canvas Card ── */}
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] md:rounded-[36px] shadow-[0_25px_60px_rgba(15,23,42,0.05)] border border-slate-200/60 p-6 md:p-12 lg:p-14 relative z-10 overflow-hidden">
          
          {/* Subtle Grid overlay inside the card to integrate it with the technical theme */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '1rem 1rem' }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: expo }}
                className="w-full"
              >
                {/* Eyebrow Tag */}
                <span className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#2563eb] text-[11.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 w-fit shadow-xs">
                  <Compass className="w-3.5 h-3.5 text-[#2563eb] animate-spin-slow" />
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

            {/* Right Column: Family Photo with Technical Blueprint Framing */}
            <div className="lg:col-span-5 w-full flex items-center justify-center relative">
              
              {/* Technical Ruler Markings (Top & Left) */}
              <div className="absolute top-[-20px] left-[10px] right-[10px] h-[5px] flex justify-between z-10 pointer-events-none opacity-50">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className={`w-0.5 bg-slate-400 ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
                ))}
              </div>
              <div className="absolute left-[-20px] top-[10px] bottom-[10px] w-[5px] flex flex-col justify-between z-10 pointer-events-none opacity-50">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className={`h-0.5 bg-slate-400 ${i % 5 === 0 ? 'w-3' : 'w-1.5'}`} />
                ))}
              </div>

              {/* Dimension callout: width */}
              <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 pointer-events-none opacity-60">
                <div className="w-8 h-px bg-slate-400" />
                <span className="font-mono text-[9px] text-slate-500 bg-white px-1.5 py-0.5 border border-slate-100 rounded-sm font-bold">w = 12.40m</span>
                <div className="w-8 h-px bg-slate-400" />
              </div>

              {/* Main Photo Wrapper */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[430px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.06)] border-2 border-slate-100 bg-slate-50">
                <motion.img
                  src={heroBg}
                  alt="Gesgrama - Barcelona"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: expo }}
                  className="w-full h-full object-cover object-[center_35%]"
                />
                
                {/* Elevation Stamp */}
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white font-mono text-[9px] px-3 py-1.5 rounded-md border border-white/10 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span>ELEVATION VIEW E-01</span>
                </div>
              </div>

              {/* Dimension callout: height */}
              <div className="absolute right-[-35px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none opacity-60 origin-center rotate-90">
                <div className="w-8 h-px bg-slate-400" />
                <span className="font-mono text-[9px] text-slate-500 bg-white px-1.5 py-0.5 border border-slate-100 rounded-sm font-bold">h = 8.50m</span>
                <div className="w-8 h-px bg-slate-400" />
              </div>

            </div>

          </div>
        </div>

        {/* ── Floating Stat Cards Row (Aligned with Technical theme) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 relative z-20">
          
          {/* Stat 1: Clientes Satisfechos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 z-0" />
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 relative z-10">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="relative z-10">
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
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 z-0" />
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 relative z-10">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="relative z-10">
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
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 z-0" />
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 relative z-10">
              <Shield className="w-6 h-6" />
            </div>
            <div className="relative z-10">
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
            className="bg-white rounded-2xl md:rounded-3xl p-5 border border-slate-200/60 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500 z-0" />
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 relative z-10">
              <Star className="w-6 h-6 fill-[#2563eb]" />
            </div>
            <div className="relative z-10">
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
