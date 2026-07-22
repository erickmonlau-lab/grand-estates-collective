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

// ── Designer Vector Building Sketches (Detailed High-End Line Art) ──
const BuildingSketchLeft = () => (
  <svg className="absolute left-[1.5%] bottom-[5%] w-[320px] h-[450px] text-slate-300 pointer-events-none select-none z-0 hidden md:block" viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="0.5">
    {/* Ground Baseline */}
    <line x1="0" y1="150" x2="120" y2="150" strokeWidth="0.8" />
    
    {/* Main Facade Elevation Outline */}
    <rect x="20" y="20" width="80" height="130" rx="1.5" />
    
    {/* Floor Slabs / Structural lines (Extended slightly past the building) */}
    <line x1="15" y1="52" x2="105" y2="52" strokeWidth="0.4" />
    <line x1="15" y1="84" x2="105" y2="84" strokeWidth="0.4" />
    <line x1="15" y1="116" x2="105" y2="116" strokeWidth="0.4" />
    
    {/* Structural Columns on Ground Floor */}
    <line x1="28" y1="116" x2="28" y2="150" strokeWidth="0.8" />
    <line x1="48" y1="116" x2="48" y2="150" strokeWidth="0.8" />
    <line x1="72" y1="116" x2="72" y2="150" strokeWidth="0.8" />
    <line x1="92" y1="116" x2="92" y2="150" strokeWidth="0.8" />
    
    {/* Floor 3: Glass Curtain Wall with shading lines */}
    <rect x="25" y="26" width="30" height="20" rx="0.5" />
    <line x1="35" y1="26" x2="35" y2="46" strokeWidth="0.3" />
    <line x1="45" y1="26" x2="45" y2="46" strokeWidth="0.3" />
    {/* Shading / Reflection lines */}
    <line x1="28" y1="42" x2="32" y2="30" strokeWidth="0.25" opacity="0.6" />
    <line x1="38" y1="42" x2="42" y2="30" strokeWidth="0.25" opacity="0.6" />
    
    <rect x="65" y="26" width="30" height="20" rx="0.5" />
    <line x1="75" y1="26" x2="75" y2="46" strokeWidth="0.3" />
    <line x1="85" y1="26" x2="85" y2="46" strokeWidth="0.3" />
    <line x1="68" y1="42" x2="72" y2="30" strokeWidth="0.25" opacity="0.6" />
    <line x1="78" y1="42" x2="82" y2="30" strokeWidth="0.25" opacity="0.6" />

    {/* Floor 2: Double Balcony Unit */}
    <rect x="25" y="58" width="28" height="20" rx="0.5" />
    <rect x="67" y="58" width="28" height="20" rx="0.5" />
    
    {/* Balcony structure with thin railings */}
    <rect x="22" y="70" width="34" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="22" y1="74" x2="56" y2="74" strokeWidth="0.3" />
    {[...Array(9)].map((_, i) => (
      <line key={i} x1={25 + i * 3.5} y1="70" x2={25 + i * 3.5} y2="78" strokeWidth="0.25" />
    ))}

    <rect x="64" y="70" width="34" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="64" y1="74" x2="98" y2="74" strokeWidth="0.3" />
    {[...Array(9)].map((_, i) => (
      <line key={i} x1={67 + i * 3.5} y1="70" x2={67 + i * 3.5} y2="78" strokeWidth="0.25" />
    ))}

    {/* Floor 1: Large Windows & Center Atrium */}
    <rect x="25" y="90" width="70" height="20" rx="0.5" />
    <line x1="42" y1="90" x2="42" y2="110" strokeWidth="0.4" />
    <line x1="78" y1="90" x2="78" y2="110" strokeWidth="0.4" />
    {/* Shading */}
    <line x1="30" y1="106" x2="36" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="48" y1="106" x2="54" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="62" y1="106" x2="68" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="84" y1="106" x2="90" y2="94" strokeWidth="0.2" opacity="0.5" />

    {/* Ground Floor Entry Lobby */}
    <rect x="52" y="124" width="16" height="26" rx="0.5" />
    <line x1="60" y1="124" x2="60" y2="150" strokeWidth="0.4" />
    <circle cx="56" cy="137" r="0.6" fill="currentColor" />
    <circle cx="64" cy="137" r="0.6" fill="currentColor" />

    {/* Architectural Axes & Circles at Top */}
    <line x1="28" y1="12" x2="28" y2="150" strokeDasharray="3 3" strokeWidth="0.3" opacity="0.7" />
    <circle cx="28" cy="8" r="3" />
    <text x="28" y="10.5" className="fill-slate-500 font-mono text-[6px] font-bold" textAnchor="middle">A</text>

    <line x1="92" y1="12" x2="92" y2="150" strokeDasharray="3 3" strokeWidth="0.3" opacity="0.7" />
    <circle cx="92" cy="8" r="3" />
    <text x="92" y="10.5" className="fill-slate-500 font-mono text-[6px] font-bold" textAnchor="middle">B</text>

    {/* Elevation Dimension text */}
    <line x1="12" y1="20" x2="12" y2="150" strokeWidth="0.3" />
    <line x1="9" y1="20" x2="15" y2="20" strokeWidth="0.3" />
    <line x1="9" y1="150" x2="15" y2="150" strokeWidth="0.3" />
    <text x="7" y="88" className="fill-slate-400 font-mono text-[7px]" transform="rotate(-90 7 88)" textAnchor="middle">H = 15.60m</text>

    {/* Detailed Tree at base */}
    <path d="M 12 150 L 12 142 M 12 142 L 8 139 M 12 142 L 15 138" strokeWidth="0.5" />
    <circle cx="12" cy="135" r="5" strokeDasharray="1.5 1.5" />
    <circle cx="9" cy="137" r="4.5" strokeDasharray="1.5 1.5" />
    <circle cx="15" cy="136" r="4.5" strokeDasharray="1.5 1.5" />
  </svg>
);

const BuildingSketchRight = () => (
  <svg className="absolute right-[1.5%] top-[12%] w-[330px] h-[450px] text-slate-300 pointer-events-none select-none z-0 hidden lg:block" viewBox="0 0 130 160" fill="none" stroke="currentColor" strokeWidth="0.5">
    {/* Ground line */}
    <line x1="0" y1="130" x2="130" y2="130" strokeWidth="0.8" />
    
    {/* Modern Isometric/Perspective Architectural Facade */}
    {/* Volume 1: Left block */}
    <path d="M 20 130 L 20 60 L 65 50 L 65 130 Z" />
    
    {/* Volume 2: Right Cantilevered Block */}
    <path d="M 65 130 L 65 30 L 110 40 L 110 115 L 65 115" />
    
    {/* Structural lines & perspective helpers */}
    <line x1="20" y1="60" x2="65" y2="30" strokeDasharray="2 2" strokeWidth="0.3" opacity="0.6" />
    <line x1="65" y1="50" x2="110" y2="20" strokeDasharray="2 2" strokeWidth="0.3" opacity="0.6" />
    
    {/* Large Windows left block */}
    <path d="M 28 115 L 28 85 L 57 78 L 57 108 Z" />
    <line x1="42.5" y1="111.5" x2="42.5" y2="81.5" strokeWidth="0.4" />
    {/* Reflection lines */}
    <line x1="33" y1="108" x2="38" y2="90" strokeWidth="0.2" opacity="0.5" />
    <line x1="47" y1="104" x2="52" y2="86" strokeWidth="0.2" opacity="0.5" />

    {/* Cantilever balcony block */}
    <path d="M 72 75 L 103 82 L 103 105 L 72 98 Z" />
    {/* Railings */}
    <line x1="72" y1="84" x2="103" y2="91" strokeWidth="0.4" />
    {[...Array(8)].map((_, i) => (
      <line key={i} x1={75 + i * 3.8} y1={75 + i * 0.85} x2={75 + i * 3.8} y2={84 + i * 0.85} strokeWidth="0.25" />
    ))}

    {/* Top Floor Sliding Doors */}
    <path d="M 72 65 L 72 45 L 103 52 L 103 72 Z" />
    <line x1="87.5" y1="68.5" x2="87.5" y2="48.5" strokeWidth="0.4" />
    <line x1="77" y1="63" x2="82" y2="49" strokeWidth="0.2" opacity="0.5" />
    <line x1="91" y1="67" x2="96" y2="53" strokeWidth="0.2" opacity="0.5" />

    {/* Compass / Orientation Indicator in Corner */}
    <circle cx="108" cy="142" r="7" strokeWidth="0.4" />
    <line x1="108" y1="135" x2="108" y2="149" strokeWidth="0.3" />
    <line x1="101" y1="142" x2="115" y2="142" strokeWidth="0.3" />
    <polygon points="108,136 110,142 106,142" fill="currentColor" />
    <text x="108" y="133" className="fill-slate-400 font-mono text-[6px] font-bold" textAnchor="middle">N</text>

    {/* Stylized Olive / Cypress Tree */}
    <path d="M 118 130 L 118 110 M 118 110 L 115 106 M 118 110 L 121 107" strokeWidth="0.5" />
    <path d="M 118 112 C 114 112, 114 90, 118 90 C 122 90, 122 112, 118 112 Z" strokeDasharray="1.5 1.5" />
  </svg>
);

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];

  return (
    <section id="hero" className="relative bg-[#f8fafc] text-onyx pt-28 pb-12 md:pt-36 md:pb-16 px-4 md:px-8 overflow-hidden min-h-[100dvh] flex flex-col justify-center select-none">
      
      {/* ── Completely White Base Background ── */}
      <div className="absolute inset-0 z-0 bg-[#f8fafc] pointer-events-none" />

      {/* ── Elegant Vector Line Drawings of Buildings (Specially detailed high-end CAD lines) ── */}
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
