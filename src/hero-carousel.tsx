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

// ── Responsive Designer Vector Building Sketches (Inline SVGs) ──
const BuildingSketchLeft = () => (
  <svg className="w-full h-auto max-w-[240px] text-slate-200" viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="0.6">
    {/* Ground Baseline */}
    <line x1="0" y1="150" x2="120" y2="150" strokeWidth="0.8" />
    
    {/* Main Facade Elevation Outline */}
    <rect x="15" y="20" width="90" height="130" rx="1.5" />
    
    {/* Floor Slabs / Structural lines */}
    <line x1="10" y1="52" x2="110" y2="52" strokeWidth="0.4" />
    <line x1="10" y1="84" x2="110" y2="84" strokeWidth="0.4" />
    <line x1="10" y1="116" x2="110" y2="116" strokeWidth="0.4" />
    
    {/* Structural Columns on Ground Floor */}
    <line x1="25" y1="116" x2="25" y2="150" strokeWidth="0.8" />
    <line x1="45" y1="116" x2="45" y2="150" strokeWidth="0.8" />
    <line x1="75" y1="116" x2="75" y2="150" strokeWidth="0.8" />
    <line x1="95" y1="116" x2="95" y2="150" strokeWidth="0.8" />
    
    {/* Floor 3: Glass Curtain Wall with shading lines */}
    <rect x="22" y="26" width="35" height="20" rx="0.5" />
    <line x1="33" y1="26" x2="33" y2="46" strokeWidth="0.3" />
    <line x1="45" y1="26" x2="45" y2="46" strokeWidth="0.3" />
    <line x1="25" y1="42" x2="30" y2="30" strokeWidth="0.25" opacity="0.6" />
    <line x1="36" y1="42" x2="41" y2="30" strokeWidth="0.25" opacity="0.6" />
    
    <rect x="63" y="26" width="35" height="20" rx="0.5" />
    <line x1="74" y1="26" x2="74" y2="46" strokeWidth="0.3" />
    <line x1="86" y1="26" x2="86" y2="46" strokeWidth="0.3" />
    <line x1="66" y1="42" x2="71" y2="30" strokeWidth="0.25" opacity="0.6" />
    <line x1="77" y1="42" x2="82" y2="30" strokeWidth="0.25" opacity="0.6" />

    {/* Floor 2: Double Balcony Unit */}
    <rect x="22" y="58" width="32" height="20" rx="0.5" />
    <rect x="66" y="58" width="32" height="20" rx="0.5" />
    
    {/* Balcony structure with thin railings */}
    <rect x="19" y="70" width="38" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="19" y1="74" x2="57" y2="74" strokeWidth="0.3" />
    {[...Array(10)].map((_, i) => (
      <line key={i} x1={22 + i * 3.5} y1="70" x2={22 + i * 3.5} y2="78" strokeWidth="0.25" />
    ))}

    <rect x="63" y="70" width="38" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="63" y1="74" x2="101" y2="74" strokeWidth="0.3" />
    {[...Array(10)].map((_, i) => (
      <line key={i} x1={66 + i * 3.5} y1="70" x2={66 + i * 3.5} y2="78" strokeWidth="0.25" />
    ))}

    {/* Floor 1: Large Windows & Center Atrium */}
    <rect x="22" y="90" width="76" height="20" rx="0.5" />
    <line x1="40" y1="90" x2="40" y2="110" strokeWidth="0.4" />
    <line x1="80" y1="90" x2="80" y2="110" strokeWidth="0.4" />
    <line x1="28" y1="106" x2="34" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="46" y1="106" x2="52" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="62" y1="106" x2="68" y2="94" strokeWidth="0.2" opacity="0.5" />
    <line x1="86" y1="106" x2="92" y2="94" strokeWidth="0.2" opacity="0.5" />

    {/* Ground Floor portal */}
    <rect x="52" y="124" width="16" height="26" rx="0.5" />
    <line x1="60" y1="124" x2="60" y2="150" strokeWidth="0.4" />
    <circle cx="56" cy="137" r="0.6" fill="currentColor" />
    <circle cx="64" cy="137" r="0.6" fill="currentColor" />

    {/* Architectural Axes & Circles at Top */}
    <line x1="25" y1="12" x2="25" y2="150" strokeDasharray="3 3" strokeWidth="0.3" opacity="0.7" />
    <circle cx="25" cy="8" r="3" />
    <text x="25" y="10.5" className="fill-slate-500 font-mono text-[6px] font-bold" textAnchor="middle">A</text>

    <line x1="95" y1="12" x2="95" y2="150" strokeDasharray="3 3" strokeWidth="0.3" opacity="0.7" />
    <circle cx="95" cy="8" r="3" />
    <text x="95" y="10.5" className="fill-slate-500 font-mono text-[6px] font-bold" textAnchor="middle">B</text>

    {/* Elevation Dimension text */}
    <line x1="7" y1="20" x2="7" y2="150" strokeWidth="0.3" />
    <line x1="4" y1="20" x2="10" y2="20" strokeWidth="0.3" />
    <line x1="4" y1="150" x2="10" y2="150" strokeWidth="0.3" />
    <text x="4" y="85" className="fill-slate-400 font-mono text-[7px]" transform="rotate(-90 4 85)" textAnchor="middle">H = 15.60m</text>

    {/* Detailed Tree at base */}
    <path d="M 110 150 L 110 142 M 110 142 L 106 139 M 110 142 L 113 138" strokeWidth="0.5" />
    <circle cx="110" cy="135" r="5" strokeDasharray="1.5 1.5" />
    <circle cx="107" cy="137" r="4.5" strokeDasharray="1.5 1.5" />
    <circle cx="113" cy="136" r="4.5" strokeDasharray="1.5 1.5" />
  </svg>
);

const BuildingSketchRight = () => (
  <svg className="w-full h-auto max-w-[250px] text-slate-200" viewBox="0 0 130 160" fill="none" stroke="currentColor" strokeWidth="0.6">
    {/* Ground Baseline */}
    <line x1="0" y1="140" x2="130" y2="140" strokeWidth="0.8" />
    
    {/* Barcelona Eixample Corner Facade elevation */}
    <path d="M 20 140 L 20 25 L 45 15 L 85 15 L 110 25 L 110 140 Z" />
    <line x1="45" y1="15" x2="45" y2="140" strokeWidth="0.4" />
    <line x1="85" y1="15" x2="85" y2="140" strokeWidth="0.4" />
    <line x1="20" y1="52" x2="110" y2="52" strokeWidth="0.4" />
    <line x1="20" y1="84" x2="110" y2="84" strokeWidth="0.4" />
    <line x1="20" y1="116" x2="110" y2="116" strokeWidth="0.4" />
    
    {/* Modernist Balcony details */}
    <rect x="42" y="44" width="46" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="42" y1="48" x2="88" y2="48" strokeWidth="0.3" />
    {[...Array(12)].map((_, i) => (
      <line key={i} x1={45 + i * 3.5} y1="44" x2={45 + i * 3.5} y2="52" strokeWidth="0.25" />
    ))}
    
    <rect x="42" y="76" width="46" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="42" y1="80" x2="88" y2="80" strokeWidth="0.3" />
    {[...Array(12)].map((_, i) => (
      <line key={i} x1={45 + i * 3.5} y1="76" x2={45 + i * 3.5} y2="84" strokeWidth="0.25" />
    ))}

    <rect x="42" y="108" width="46" height="8" rx="0.5" fill="#f8fafc" />
    <line x1="42" y1="112" x2="88" y2="112" strokeWidth="0.3" />
    {[...Array(12)].map((_, i) => (
      <line key={i} x1={45 + i * 3.5} y1="108" x2={45 + i * 3.5} y2="116" strokeWidth="0.25" />
    ))}

    {/* Windows */}
    <rect x="25" y="25" width="12" height="18" rx="0.5" />
    <rect x="25" y="57" width="12" height="18" rx="0.5" />
    <rect x="25" y="89" width="12" height="18" rx="0.5" />
    <line x1="28" y1="40" x2="33" y2="28" strokeWidth="0.2" opacity="0.5" />
    <line x1="28" y1="72" x2="33" y2="60" strokeWidth="0.2" opacity="0.5" />
    <line x1="28" y1="104" x2="33" y2="92" strokeWidth="0.2" opacity="0.5" />

    <rect x="93" y="25" width="12" height="18" rx="0.5" />
    <rect x="93" y="57" width="12" height="18" rx="0.5" />
    <rect x="93" y="89" width="12" height="18" rx="0.5" />
    <line x1="96" y1="40" x2="101" y2="28" strokeWidth="0.2" opacity="0.5" />
    <line x1="96" y1="72" x2="101" y2="60" strokeWidth="0.2" opacity="0.5" />
    <line x1="96" y1="104" x2="101" y2="92" strokeWidth="0.2" opacity="0.5" />

    {/* Center Windows */}
    <rect x="52" y="22" width="26" height="20" rx="0.5" />
    <line x1="65" y1="22" x2="65" y2="42" strokeWidth="0.4" />
    <rect x="52" y="54" width="26" height="20" rx="0.5" />
    <line x1="65" y1="54" x2="65" y2="74" strokeWidth="0.4" />
    <rect x="52" y="86" width="26" height="20" rx="0.5" />
    <line x1="65" y1="86" x2="65" y2="106" strokeWidth="0.4" />

    {/* Ground Portal */}
    <rect x="54" y="118" width="22" height="22" rx="1" />
    <line x1="65" y1="118" x2="65" y2="140" strokeWidth="0.5" />
    <circle cx="59" cy="129" r="0.7" fill="currentColor" />
    <circle cx="71" cy="129" r="0.7" fill="currentColor" />

    {/* Compass */}
    <circle cx="15" cy="149" r="6" strokeWidth="0.4" />
    <line x1="15" y1="143" x2="15" y2="155" strokeWidth="0.3" />
    <line x1="9" y1="149" x2="21" y2="149" strokeWidth="0.3" />
    <polygon points="15,144 17,149 13,149" fill="currentColor" />
    <text x="15" y="141" className="fill-slate-400 font-mono text-[5px] font-bold" textAnchor="middle">N</text>

    {/* Axis Label */}
    <line x1="65" y1="10" x2="65" y2="140" strokeDasharray="3 3" strokeWidth="0.3" opacity="0.7" />
    <circle cx="65" cy="6" r="3" />
    <text x="65" y="8.5" className="fill-slate-500 font-mono text-[6px] font-bold" textAnchor="middle">C</text>
  </svg>
);

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];

  return (
    <section id="hero" className="relative bg-[#f8fafc] text-onyx pt-28 pb-12 md:pt-36 md:pb-16 px-4 md:px-8 overflow-hidden min-h-[100dvh] flex flex-col justify-center select-none">
      
      {/* ── Completely White Base Background ── */}
      <div className="absolute inset-0 z-0 bg-[#f8fafc] pointer-events-none" />

      {/* ── Responsive Flex Layout for Sketches (Perfect dynamic centering in margins) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-between hidden lg:flex">
        {/* Left Margin Container: Allocates exactly the space between screen edge and the 1300px bubble */}
        <div className="flex-1 max-w-[calc(50vw-650px)] flex items-end justify-center pb-[20vh] px-2 xl:px-6">
           <BuildingSketchLeft />
        </div>
        {/* Right Margin Container */}
        <div className="flex-1 max-w-[calc(50vw-650px)] flex items-start justify-center pt-[15vh] px-2 xl:px-6">
           <BuildingSketchRight />
        </div>
      </div>

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
                <p className="text-slate-500 text-base md:text-lg max-w-[560px] mb-8 font-medium leading-relaxed font-sans">
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
