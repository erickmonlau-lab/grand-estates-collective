import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ruler, Home, ArrowRight, ChevronDown, Check, Star } from "lucide-react";
import { formatLocation } from "@/data/properties";

interface ValuatorSectionProps {
  language: "es" | "en" | "ca";
  t: any;
  zonas: string[];
  shouldReduceMotion: boolean | null;
}

const ZONE_MARKET_STATS: Record<string, { pricePerM2: number }> = {
  "Centre": { pricePerM2: 2350 },
  "Centro": { pricePerM2: 2350 },
  "Santa Rosa - Can Mariner": { pricePerM2: 1910 },
  "Singuerlín": { pricePerM2: 1720 },
  "Fondo": { pricePerM2: 1680 },
  "El Raval": { pricePerM2: 1790 },
  "Riera Alta - Llatí": { pricePerM2: 1850 },
  "Riu": { pricePerM2: 1950 },
  "Riu Nord / Riu Sud": { pricePerM2: 1950 },
  "Oliveres - Can Serra": { pricePerM2: 1720 }
};

export default function ValuatorSection({ language, t, zonas, shouldReduceMotion }: ValuatorSectionProps) {
  const [valuatorData, setValuatorData] = useState({
    zona: "Centre",
    metros: "85"
  });
  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const [calculatedResult, setCalculatedResult] = useState(() => {
    const defaultStats = ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350 };
    const m2 = 85;
    const sizeFactor = m2 < 65 ? 1.06 : m2 <= 90 ? 1.03 : m2 <= 120 ? 0.98 : 0.94;
    const propPricePerM2 = Math.round(defaultStats.pricePerM2 * sizeFactor);
    const exact = Math.round(m2 * propPricePerM2);
    return {
      estimatedValue: exact,
      rangeMin: Math.round(exact * 0.93),
      rangeMax: Math.round(exact * 1.07),
      zoneName: "Centre",
      propertyM2: m2,
      propertyPricePerM2: propPricePerM2
    };
  });

  const handleCalculateValuation = () => {
    setIsCalculatingValuation(true);
    const m2 = Math.max(20, Math.min(600, parseFloat(valuatorData.metros.replace(/[^\d]/g, "")) || 85));
    const stats = ZONE_MARKET_STATS[valuatorData.zona] || ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350 };
    
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
        propertyM2: m2,
        propertyPricePerM2: propPricePerM2
      });
      setIsCalculatingValuation(false);
      setHasCalculated(true);
    }, 600);
  };

  const contactText = encodeURIComponent(
    language === "ca"
      ? `Hola Gesgrama, he utilitzat la calculadora per al meu immoble a ${formatLocation(calculatedResult.zoneName, "ca")} (~${calculatedResult.propertyM2} m², estimació de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) i voldria una valoració personalitzada.`
      : language === "en"
      ? `Hello Gesgrama, I used your valuation tool for my property in ${formatLocation(calculatedResult.zoneName, "en")} (~${calculatedResult.propertyM2} sq m, estimated at ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) and would like a personalized valuation.`
      : `Hola Gesgrama, he utilizado la calculadora para mi inmueble en ${formatLocation(calculatedResult.zoneName, "es")} (~${calculatedResult.propertyM2} m², estimación de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) y me gustaría una valoración personalizada.`
  );

  return (
    <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-10 scroll-mt-20 sm:scroll-mt-24 font-sans">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <div id="valuator-card" className="bg-white rounded-[24px] sm:rounded-[32px] shadow-xl border border-slate-200/90 p-5 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1100px] relative z-10 overflow-hidden text-[#0f172a]">
        
        {/* Header Kicker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-2.5">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{language === "ca" ? "VALORACIÓ GRATUÏTA" : language === "en" ? "FREE VALUATION" : "VALORACIÓN GRATUITA"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0b214a] tracking-tight leading-tight font-heading">
              {language === "ca" ? "¿Quant val el teu immoble?" : language === "en" ? "How much is your property worth?" : "¿Cuánto vale tu inmueble?"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#0b214a] font-semibold max-w-md leading-snug">
            {language === "ca" 
              ? "Descobreix una estimació orientativa en menys d'un minut basada en dades de mercat reals." 
              : language === "en" 
              ? "Discover an orientative estimation in less than a minute based on real market data." 
              : "Descubre una estimación orientativa en menos de un minuto basada en datos de mercado reales."}
          </p>
        </div>

        {/* 2-Column Split: INPUT Form on Left, RESULT on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: FORM INPUTS & CALCULAR BUTTON (Balanced, harmonious with right panel on desktop, compact on mobile) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
            {/* Top subtle blue accent indicator line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563eb]" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                <p className="text-xs font-black uppercase tracking-wider text-[#0b214a]">
                  {language === "ca" ? "DADES DE L'IMMOBLE" : language === "en" ? "PROPERTY DETAILS" : "DATOS DEL INMUEBLE"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5 sm:mb-6">
                {/* Select Barrio / Zona */}
                <div className="bg-slate-50/80 border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 shadow-2xs transition-all text-left">
                  <label htmlFor="valuator-zona-select" className="block text-[11px] font-black uppercase tracking-wider text-[#0b214a] mb-1">
                    {language === "ca" ? "Zona o barri" : language === "en" ? "Neighborhood" : "Zona o barrio"}
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                      <select
                        id="valuator-zona-select"
                        aria-label="Seleccionar zona de la propiedad"
                        value={valuatorData.zona}
                        onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                        className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-bold text-[#0b214a] focus:ring-0 appearance-none cursor-pointer outline-none truncate"
                      >
                        {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                      </select>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                </div>

                {/* Input Superficie estimada */}
                <div className="bg-slate-50/80 border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 shadow-2xs transition-all text-left">
                  <label htmlFor="valuator-metros-input" className="block text-[11px] font-black uppercase tracking-wider text-[#0b214a] mb-1">
                    {language === "ca" ? "Superfície estimada" : language === "en" ? "Estimated area" : "Superficie estimada"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                    <input
                      id="valuator-metros-input"
                      type="number"
                      min="20"
                      max="600"
                      placeholder="85"
                      value={valuatorData.metros}
                      onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                      className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-bold text-[#0b214a] focus:ring-0 outline-none"
                    />
                    <span className="text-xs font-black text-[#0b214a] bg-slate-200/80 border border-slate-300 px-2 py-0.5 rounded-md shrink-0">
                      m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Action Button — High Placement, Solid Gesgrama Blue */}
            <div className="mt-2 sm:mt-4">
              <button
                type="button"
                onClick={handleCalculateValuation}
                disabled={isCalculatingValuation}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-75"
              >
                <Home className="w-4 h-4 text-white shrink-0" />
                <span>{isCalculatingValuation ? t.valorador.calculando : (language === "ca" ? "CALCULAR VALORACIÓ" : language === "en" ? "CALCULATE VALUATION" : "CALCULAR VALORACIÓN")}</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </button>

              {/* Trust Guarantees — Distinct & Highly Legible */}
              <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#0b214a] font-bold mt-4 px-2">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2563eb] stroke-[3]" />
                  {t.valorador.sinCompromiso}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2563eb] stroke-[3]" />
                  {t.valorador.resultadoInmediato}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN CONVERSION RESULT BOX (Subtle Blue Tint & Dominant Price) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div 
              className="bg-white border-2 border-[#2563eb] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden flex flex-col items-center justify-between min-h-[300px]"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0) 70%)"
              }}
            >
              
              {/* Spinner while recalculating */}
              <AnimatePresence>
                {isCalculatingValuation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6"
                  >
                    <div className="w-10 h-10 border-4 border-[#2563eb]/20 border-t-[#2563eb] rounded-full animate-spin mb-3" />
                    <p className="text-sm font-black text-[#0b214a]">{t.valorador.calculando}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 1. Header label */}
              <div className="w-full">
                <span className="inline-block text-xs font-black uppercase tracking-widest text-[#2563eb] bg-blue-50 border border-blue-200/60 px-4 py-1.5 rounded-full mb-3 shadow-2xs">
                  {language === "ca" ? "VALOR ESTIMAT" : language === "en" ? "ESTIMATED VALUE" : "VALOR ESTIMADO"}
                </span>

                {/* 2. Dominant Price Number */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0b214a] leading-none tracking-tight my-2.5 font-heading">
                  <span>{new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}</span>
                  <span className="text-[#2563eb] ml-1.5">€</span>
                </div>

                {/* 3. Secondary price per m² */}
                <p className="text-sm sm:text-base font-bold text-[#0b214a] mt-1 mb-2">
                  <span className="text-[#2563eb] font-black">≈</span> {new Intl.NumberFormat('es-ES').format(calculatedResult.propertyPricePerM2)} €/m²
                </p>

                {/* Optional small range */}
                <p className="text-xs sm:text-[13px] text-slate-700 font-medium mb-1">
                  {language === "ca" ? "Rango orientatiu:" : language === "en" ? "Estimated range:" : "Rango orientativo:"}{" "}
                  <span className="font-bold text-[#0b214a]">
                    {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)} € – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)} €
                  </span>
                </p>
              </div>

              {/* 4. Single Clear CTA oriented to conversion */}
              <div className="w-full mt-4 pt-4 border-t border-slate-200/80 flex flex-col items-center">
                <a
                  href={`https://wa.me/34689438012?text=${contactText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <span>
                    {language === "ca" 
                      ? "VULL UNA VALORACIÓ PERSONALITZADA" 
                      : language === "en" 
                      ? "I WANT A PERSONALIZED APPRAISAL" 
                      : "QUIERO UNA VALORACIÓN PERSONALIZADA"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0" />
                </a>

                {/* Honest disclaimer */}
                <p className="text-[11px] sm:text-xs text-slate-700 font-semibold mt-2.5 leading-tight">
                  {language === "ca"
                    ? "Estimació orientativa basada en dades de mercat. No constitueix una taxació oficial."
                    : language === "en"
                    ? "Guidance estimation based on market data. Does not constitute an official appraisal."
                    : "Estimación orientativa basada en datos de mercado. No constituye una tasación oficial."}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
