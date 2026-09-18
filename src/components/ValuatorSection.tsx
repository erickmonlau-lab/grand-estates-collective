import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ruler, Home, ArrowRight, Check, Star, Info, TrendingUp, ChevronDown } from "lucide-react";
import { formatLocation } from "@/data/properties";

interface ValuatorSectionProps {
  language: "es" | "en" | "ca";
  t: any;
  zonas: string[];
  shouldReduceMotion: boolean | null;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const ZONE_MARKET_STATS: Record<string, { pricePerM2: number; trendPct: number; monthlyPrices: number[] }> = {
  "Centre": { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] },
  "Centro": { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] },
  "Santa Rosa - Can Mariner": { pricePerM2: 1910, trendPct: 5.1, monthlyPrices: [1815, 1835, 1855, 1875, 1890, 1910] },
  "Singuerlín": { pricePerM2: 1720, trendPct: 3.4, monthlyPrices: [1660, 1675, 1685, 1700, 1710, 1720] },
  "Fondo": { pricePerM2: 1680, trendPct: 5.8, monthlyPrices: [1585, 1605, 1625, 1645, 1660, 1680] },
  "El Raval": { pricePerM2: 1790, trendPct: 4.2, monthlyPrices: [1715, 1730, 1745, 1760, 1775, 1790] },
  "Riera Alta - Llatí": { pricePerM2: 1850, trendPct: 3.9, monthlyPrices: [1780, 1795, 1810, 1825, 1835, 1850] },
  "Riu": { pricePerM2: 1950, trendPct: 4.5, monthlyPrices: [1865, 1880, 1900, 1915, 1935, 1950] },
  "Riu Nord / Riu Sud": { pricePerM2: 1950, trendPct: 4.5, monthlyPrices: [1865, 1880, 1900, 1915, 1935, 1950] },
  "Oliveres - Can Serra": { pricePerM2: 1720, trendPct: 3.2, monthlyPrices: [1665, 1680, 1690, 1700, 1710, 1720] }
};

function WhatsAppBrandIcon({ className = "w-4 h-4 fill-current shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function PriceCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  return <span>{new Intl.NumberFormat('es-ES').format(displayValue)}</span>;
}

const getSparklineData = (prices: number[], width = 250, height = 80, paddingY = 16, paddingX = 15) => {
  if (!prices || prices.length < 2) {
    return {
      linePath: "M 15,62 Q 40,58 62,55 T 109,44 T 156,35 T 203,24 T 250,14",
      areaPath: "M 15,62 Q 40,58 62,55 T 109,44 T 156,35 T 203,24 T 250,14 L 250,80 L 15,80 Z",
      points: [
        { cx: 15, cy: 62 }, { cx: 62, cy: 55 }, { cx: 109, cy: 44 },
        { cx: 156, cy: 35 }, { cx: 203, cy: 24 }, { cx: 250, cy: 14 }
      ]
    };
  }
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const innerHeight = height - paddingY * 2;
  const innerWidth = width - paddingX * 2;
  const stepX = innerWidth / (prices.length - 1);

  const points = prices.map((val, idx) => {
    const cx = Math.round(paddingX + idx * stepX);
    const cy = Math.round(height - paddingY - ((val - min) / range) * innerHeight);
    return { cx, cy };
  });

  let linePath = `M ${points[0].cx},${points[0].cy}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.cx + curr.cx) / 2;
    linePath += ` Q ${midX},${prev.cy} ${curr.cx},${curr.cy}`;
  }

  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L ${last.cx},${height} L ${first.cx},${height} Z`;

  return { linePath, areaPath, points };
};

export default function ValuatorSection({ language, t, zonas, shouldReduceMotion }: ValuatorSectionProps) {
  const [valuatorData, setValuatorData] = useState({
    zona: "Centre",
    metros: "85"
  });
  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState(() => {
    const defaultStats = ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    const m2 = 85;
    const sizeFactor = m2 < 65 ? 1.06 : m2 <= 90 ? 1.03 : m2 <= 120 ? 0.98 : 0.94;
    const propPricePerM2 = Math.round(defaultStats.pricePerM2 * sizeFactor);
    const exact = Math.round(m2 * propPricePerM2);
    return {
      estimatedValue: exact,
      rangeMin: Math.round(exact * 0.93),
      rangeMax: Math.round(exact * 1.07),
      zoneName: "Centre",
      trendPct: defaultStats.trendPct,
      monthlyPrices: defaultStats.monthlyPrices,
      propertyM2: m2,
      propertyPricePerM2: propPricePerM2,
      neighborhoodPricePerM2: defaultStats.pricePerM2
    };
  });

  const handleCalculateValuation = () => {
    setIsCalculatingValuation(true);
    const m2 = Math.max(20, Math.min(600, parseFloat(valuatorData.metros.replace(/[^\d]/g, "")) || 85));
    const stats = ZONE_MARKET_STATS[valuatorData.zona] || ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    
    const sizeFactor = m2 < 65 ? 1.06 : m2 <= 90 ? 1.03 : m2 <= 120 ? 0.98 : 0.94;
    const propPricePerM2 = Math.round(stats.pricePerM2 * sizeFactor);
    const exactValue = Math.round(m2 * propPricePerM2);
    const minVal = Math.round(exactValue * 0.93);
    const maxVal = Math.round(exactValue * 1.07);

    setTimeout(() => {
      setCalculatedResult({
        estimatedValue: exactValue,
        rangeMin: minVal,
        rangeMax: maxVal,
        zoneName: valuatorData.zona || "Centre",
        trendPct: stats.trendPct,
        monthlyPrices: stats.monthlyPrices,
        propertyM2: m2,
        propertyPricePerM2: propPricePerM2,
        neighborhoodPricePerM2: stats.pricePerM2
      });
      setIsCalculatingValuation(false);
    }, 1200);
  };

  return (
    <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-10 scroll-mt-20 sm:scroll-mt-24">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <div id="valuator-card" className="bg-white rounded-[24px] sm:rounded-[32px] shadow-xl border border-slate-200/80 p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1240px] relative z-10 overflow-hidden text-[#0f172a] scroll-mt-14 sm:scroll-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* LEFT COLUMN: Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-xl shadow-xs font-sans">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span>{t.valorador.tag}</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2.5 sm:mb-3.5 leading-[1.12] tracking-tight font-sans text-[#0f172a] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{t.valorador.title}</span>
              <span className="bg-[#2563eb] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl shadow-sm whitespace-nowrap">
                {t.valorador.titleAccent}
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-xl mb-5 sm:mb-6 leading-relaxed font-bold font-sans">
              {t.valorador.subtitle}
            </p>

            <div className="w-full max-w-xl">
              <div className="w-full">
                {/* Inputs Row with crystal clear visual labels & m² suffix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Select Zona */}
                  <div className="bg-white border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 sm:p-3.5 shadow-2xs transition-all text-left">
                    <label htmlFor="valuator-zona-select" className="block text-[11px] font-black uppercase tracking-wider text-black mb-1 font-sans">
                      {language === "ca" ? "Zona o barri" : language === "en" ? "Area / Zone" : "Zona o barrio"}
                    </label>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 w-full">
                        <MapPin className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                        <select
                          id="valuator-zona-select"
                          aria-label="Seleccionar zona de la propiedad"
                          value={valuatorData.zona}
                          onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-extrabold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                        >
                          <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                          {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                        </select>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  </div>

                  {/* Input Superficie (m²) */}
                  <div className="bg-white border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 sm:p-3.5 shadow-2xs transition-all text-left">
                    <label htmlFor="valuator-metros-input" className="block text-[11px] font-black uppercase tracking-wider text-black mb-1 font-sans">
                      {language === "ca" ? "Superfície estimada" : language === "en" ? "Estimated area" : "Superficie estimada"}
                    </label>
                    <div className="flex items-center gap-2.5">
                      <Ruler className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                      <input
                        id="valuator-metros-input"
                        type="number"
                        min="20"
                        max="600"
                        placeholder="85"
                        value={valuatorData.metros}
                        onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                        className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-extrabold text-[#0f172a] focus:ring-0 outline-none font-sans"
                      />
                      <span className="text-xs sm:text-sm font-black text-slate-900 bg-white border border-slate-900 px-2.5 py-0.5 rounded-md shrink-0">
                        m²
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleCalculateValuation}
                  disabled={isCalculatingValuation}
                  className="btn-lift w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm sm:text-base py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 mb-3.5 font-sans disabled:opacity-75"
                >
                  <Home className="w-4 h-4 text-white" />
                  <span>{isCalculatingValuation ? t.valorador.calculando : t.valorador.calcularBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                {/* Trust Badges - Horizontal row centered under button */}
                <div className="flex flex-row flex-nowrap sm:flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 w-full">
                  <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#60a5fa] stroke-[3] shrink-0" />
                    <span>{t.valorador.sinCompromiso}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0" />
                    <span>{t.valorador.resultadoInmediato}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: White Floating Result Card with Permanent Blue Border */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
            <div className="bg-white text-[#0f172a] rounded-3xl p-5 sm:p-7 shadow-xl w-full max-w-[460px] border-2 border-[#2563eb] relative overflow-hidden text-center">
              
              {/* Spinner / Skeleton Loading Overlay with AnimatePresence */}
              <AnimatePresence>
                {isCalculatingValuation && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6"
                  >
                    <div className="w-12 h-12 border-4 border-[#2563eb]/20 border-t-[#2563eb] rounded-full animate-spin mb-4" />
                    <p className="text-sm font-black text-[#0f172a] font-sans">{t.valorador.calculando}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1 font-sans">{t.valorador.analizando} {formatLocation(valuatorData.zona, language) || "la zona"}...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 1. "VALOR ESTIMADO" pill badge */}
              <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-md font-sans">
                <span>{t.valorador.valorEstimado} ({formatLocation(calculatedResult.zoneName, language)})</span>
              </div>
              
              {/* Main Estimated Value with animated Count-Up */}
              <div className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-2 leading-none tracking-tight font-sans">
                <PriceCounter value={calculatedResult.estimatedValue} duration={1200} /> <span className="text-[#2563eb] font-black">€</span>
              </div>

              {/* 2. Rango estimado de mercado en una caja estilizada */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 mb-2 shadow-sm">
                <p className="text-xs sm:text-sm font-semibold text-slate-300 font-sans">
                  {t.valorador.rangoEstimado}: <span className="font-extrabold text-white text-sm sm:text-base ml-1">{new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)}€ – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)}€</span>
                </p>
              </div>

              {/* Animated Range Progress Bar with Context Label */}
              <div className="mb-3">
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300">
                  <motion.div
                    key={`range-bar-${calculatedResult.estimatedValue}`}
                    initial={shouldReduceMotion ? false : { width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.2, ease: easeOut }}
                    className="h-full bg-gradient-to-r from-blue-500 to-[#2563eb] rounded-full shadow-xs"
                  />
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 font-bold mt-1.5 text-center font-sans">
                  {language === "ca" 
                    ? "Posició del valor estimat dins del rang de mercat" 
                    : language === "en" 
                    ? "Estimated value position within the market range" 
                    : "Posición del valor estimado dentro del rango de mercado"}
                </p>
              </div>

              {/* Disclaimer box with neutral dark gray background and pure white text */}
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-white mb-4 font-semibold py-2 px-3 rounded-xl bg-slate-700 border border-slate-600 shadow-xs text-center leading-snug">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200 shrink-0 self-center" />
                <span className="text-white font-medium text-balance leading-tight">{t.valorador.disclaimer}</span>
              </div>
              
              {/* 3. Sparkline Price Trend Chart Container */}
              <div className="pt-3.5 pb-2 px-3.5 bg-slate-50 rounded-2xl border border-slate-200 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-black text-[#0f172a] font-sans uppercase tracking-wider">
                    {language === "ca" ? "Tendència de mercat" : language === "en" ? "Market trend" : "Tendencia de mercado"}
                  </span>
                  <span className="bg-[#2563eb] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm font-sans">
                    <TrendingUp className="w-3.5 h-3.5 text-white stroke-[3]" /> +{calculatedResult.trendPct.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-20 sm:h-24 relative pt-1">
                  {(() => {
                    const spark = getSparklineData(calculatedResult.monthlyPrices);
                    return (
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 250 80" fill="none">
                        <defs>
                          <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        {/* Subdued horizontal guide lines */}
                        <line x1="0" y1="20" x2="250" y2="20" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="0" y1="50" x2="250" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                        
                        {/* Fill area & Trend curve */}
                        <path
                          d={spark.areaPath}
                          fill="url(#sparklineGrad)"
                        />
                        <motion.path
                          key={`trend-line-${calculatedResult.estimatedValue}-${calculatedResult.zoneName}`}
                          d={spark.linePath} 
                          fill="none" 
                          stroke="#2563eb" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          initial={shouldReduceMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        
                        {/* Data Points */}
                        {spark.points.map((pt, pIdx) => (
                          <circle
                            key={pIdx}
                            cx={pt.cx}
                            cy={pt.cy}
                            r={pIdx === spark.points.length - 1 ? 4.5 : 3}
                            fill={pIdx === spark.points.length - 1 ? "#2563eb" : "#ffffff"}
                            stroke={pIdx === spark.points.length - 1 ? "#ffffff" : "#2563eb"}
                            strokeWidth="2.5"
                          />
                        ))}
                      </svg>
                    );
                  })()}
                </div>
                {/* X-Axis Month Labels */}
                <div className="flex justify-between items-center text-xs sm:text-[13px] font-bold text-[#0f172a] mt-1.5 px-1 font-sans border-t border-slate-200 pt-1.5">
                  {(() => {
                    const locale = language === "ca" ? "ca-ES" : language === "en" ? "en-US" : "es-ES";
                    const now = new Date();
                    const months = [];
                    for (let i = 5; i >= 0; i--) {
                      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                      const m = d.toLocaleDateString(locale, { month: "short" });
                      months.push(m.charAt(0).toUpperCase() + m.slice(1).replace(".", ""));
                    }
                    return months.map((month, mIdx) => {
                      const isCurrentMonth = mIdx === 5;
                      return (
                        <span
                          key={mIdx}
                          className={
                            isCurrentMonth
                              ? "inline-flex items-center gap-1 text-[#2563eb] font-black underline underline-offset-4 decoration-2 decoration-[#2563eb]"
                              : "text-slate-600 font-semibold"
                          }
                        >
                          {isCurrentMonth && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                          )}
                          <span>{month}</span>
                        </span>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Hyper-local Price Benchmark with Comparative Property Price/m² */}
              {(() => {
                const propertyPricePerM2 = calculatedResult.propertyPricePerM2;
                const neighborhoodPricePerM2 = calculatedResult.neighborhoodPricePerM2;
                const diffPrice = propertyPricePerM2 - neighborhoodPricePerM2;
                const diffPct = ((diffPrice / neighborhoodPricePerM2) * 100).toFixed(1);
                const isAbove = diffPrice > 0;
                const isEqual = diffPrice === 0;

                return (
                  <div className="bg-[#0b214a] text-white rounded-2xl p-3.5 text-left shadow-sm mb-3 font-sans">
                    <div className="divide-y divide-blue-900/60">
                      {/* Line 1: Neighborhood average price */}
                      <div className="flex items-center justify-between text-xs sm:text-sm pb-2.5">
                        <span className="font-bold text-slate-300">
                          {language === "ca" ? "Preu mitjà barri:" : language === "en" ? "Avg. neighborhood price:" : "Precio medio barrio:"}
                        </span>
                        <span className="font-black text-white text-sm sm:text-base">
                          {new Intl.NumberFormat('es-ES').format(neighborhoodPricePerM2)} €/m²
                        </span>
                      </div>

                      {/* Line 2: Property estimated price/m² and comparative indicator */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm pt-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
                          <span className="font-bold text-slate-200">
                            {language === "ca" ? "Preu m² del teu immoble:" : language === "en" ? "Your property price/m²:" : "Precio m² de tu inmueble:"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <span className="font-black text-white text-sm sm:text-base">
                            {new Intl.NumberFormat('es-ES').format(propertyPricePerM2)} €/m²
                          </span>
                          {!isEqual && (
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-md shrink-0 shadow-sm text-white whitespace-nowrap ${
                              isAbove ? "bg-emerald-700 border border-emerald-600" : "bg-sky-700 border border-sky-600"
                            }`}>
                              {isAbove ? `+${diffPct}%` : `${diffPct}%`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Micro-note explaining comparison and percentage diff */}
                    <div className="mt-2.5 pt-2 border-t border-blue-900/40 text-[11px] text-slate-400 text-center leading-tight">
                      {language === "ca"
                        ? "Compara el preu estimat del teu habitatge amb la mitjana de la zona."
                        : language === "en"
                        ? "Compares your estimated property price with the area average."
                        : "Compara el precio estimado de tu vivienda con la media de la zona."}
                    </div>
                  </div>
                );
              })()}

              {/* Bottom CTA Row: Direct WhatsApp button */}
              <div>
                <a
                  href={`https://wa.me/34689438012?text=${encodeURIComponent(
                    language === "ca"
                      ? `Hola Gesgrama, he valorat el meu immoble a ${formatLocation(calculatedResult.zoneName, "ca")} (~${calculatedResult.propertyM2} m², estimació de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) i voldria una valoració oficial gratuïta.`
                      : language === "en"
                      ? `Hello Gesgrama, I valuated my property in ${formatLocation(calculatedResult.zoneName, "en")} (~${calculatedResult.propertyM2} sq m, estimated at ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) and would like an official appraisal.`
                      : `Hola Gesgrama, he valorado mi inmueble en ${formatLocation(calculatedResult.zoneName, "es")} (~${calculatedResult.propertyM2} m², estimación de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) y me gustaría una valoración oficial gratuita.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#075E54] hover:bg-[#054c44] text-white font-black text-sm py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer hover:scale-[1.01]"
                >
                  <WhatsAppBrandIcon className="w-5 h-5 fill-white shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
