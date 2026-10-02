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
      ? `Hola, he consultat la valoració d'un habitatge a ${formatLocation(calculatedResult.zoneName, "ca")} d'aproximadament ${calculatedResult.propertyM2} m² (estimació: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) i m'agradaria rebre una valoració personalitzada.`
      : language === "en"
      ? `Hello, I checked the valuation of a home in ${formatLocation(calculatedResult.zoneName, "en")} of approximately ${calculatedResult.propertyM2} sq m (estimate: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) and would like to receive a personalized valuation.`
      : `Hola, he consultado la valoración de una vivienda en ${formatLocation(calculatedResult.zoneName, "es")} de aproximadamente ${calculatedResult.propertyM2} m² (estimación: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) y me gustaría recibir una valoración personalizada.`
  );

  return (
    <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-10 scroll-mt-20 sm:scroll-mt-24 font-sans">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <div id="valuator-card" className="bg-white rounded-[24px] sm:rounded-[28px] shadow-xl border border-slate-200/90 p-5 sm:p-8 md:p-9 mx-3 sm:mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-[#0f172a]">
        
        {/* Header Kicker */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-7 pb-6 border-b border-slate-200">
          <div className="flex flex-col items-start max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-xs mb-3 font-sans">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{language === "ca" ? "VALORACIÓ GRATUÏTA" : language === "en" ? "FREE VALUATION" : "VALORACIÓN GRATUITA"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#0b214a] tracking-tight leading-[1.1] font-heading">
              {language === "ca" ? (
                <><span className="mr-0.5 inline-block">¿</span>Quant val el teu habitatge<span className="ml-0.5 inline-block">?</span></>
              ) : language === "en" ? (
                "How much is your home worth?"
              ) : (
                <><span className="mr-0.5 inline-block">¿</span>Cuánto vale tu vivienda<span className="ml-0.5 inline-block">?</span></>
              )}
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-[18px] text-[#0b214a] font-semibold max-w-lg leading-[1.4] md:pt-2">
            {language === "ca" 
              ? "Descobreix una estimació orientativa de mercat en menys d'un minut." 
              : language === "en" 
              ? "Discover an orientative market estimate in less than a minute." 
              : "Descubre una estimación orientativa de mercado en menos de un minuto."}
          </p>
        </div>

        {/* 2-Column Split: INPUT Form on Left, RESULT on Right — Estructura editorial unificada */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: FORM INPUTS & CALCULAR BUTTON — Panel editorial con cabecera azul sólida y cuerpo #F4F7FC */}
          <div 
            className="lg:col-span-6 flex flex-col justify-between rounded-2xl sm:rounded-3xl relative overflow-hidden h-full"
            style={{ 
              backgroundColor: "#F4F7FC",
              border: "2px solid #CBD6E5"
            }}
          >
            {/* Cabecera visual azul sólida: DATOS DE TU VIVIENDA */}
            <div className="bg-[#2563eb] text-white px-5 sm:px-7 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                <h3 className="text-[15px] sm:text-[16px] font-extrabold uppercase tracking-widest text-white font-sans">
                  {language === "ca" ? "DADES DEL TEU HABITATGE" : language === "en" ? "YOUR HOME DETAILS" : "DATOS DE TU VIVIENDA"}
                </h3>
              </div>
              <span className="text-[12px] font-bold text-white/90 uppercase tracking-wider font-sans">
                {language === "ca" ? "PAS 1" : language === "en" ? "STEP 1" : "PASO 1"}
              </span>
            </div>

            {/* Contenido formulario — Compacto y sin espacio muerto */}
            <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 gap-4">
              {/* Inputs Barrio y Superficie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Select Barrio / Zona */}
                <div 
                  className="rounded-[16px] p-3 sm:p-3.5 text-left transition-colors"
                  style={{ 
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #CBD6E5"
                  }}
                >
                  <label htmlFor="valuator-zona-select" className="block text-[14px] sm:text-[15px] font-bold text-[#0b214a] mb-1.5 tracking-normal font-sans">
                    {language === "ca" ? "Zona o barri" : language === "en" ? "Neighborhood" : "Zona o barrio"}
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 w-full min-w-0">
                      <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                      <select
                        id="valuator-zona-select"
                        aria-label="Seleccionar zona de la propiedad"
                        value={valuatorData.zona}
                        onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                        className="w-full bg-white border-0 p-0 text-[17px] sm:text-[18px] font-extrabold text-[#0b214a] focus:ring-0 appearance-none cursor-pointer outline-none truncate font-sans"
                      >
                        {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                      </select>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#2563eb] shrink-0" />
                  </div>
                </div>

                {/* Input Superficie estimada */}
                <div 
                  className="rounded-[16px] p-3 sm:p-3.5 text-left transition-colors"
                  style={{ 
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #CBD6E5"
                  }}
                >
                  <label htmlFor="valuator-metros-input" className="block text-[14px] sm:text-[15px] font-bold text-[#0b214a] mb-1.5 tracking-normal font-sans">
                    {language === "ca" ? "Superfície estimada" : language === "en" ? "Estimated area" : "Superficie estimada"}
                  </label>
                  <div className="flex items-center gap-2.5">
                    <Ruler className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                    <input
                      id="valuator-metros-input"
                      type="number"
                      min="20"
                      max="600"
                      placeholder="85"
                      value={valuatorData.metros}
                      onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                      className="w-full bg-white border-0 p-0 text-[17px] sm:text-[18px] font-extrabold text-[#0b214a] focus:ring-0 outline-none font-sans"
                    />
                    <span 
                      className="text-[13px] font-bold text-[#0b214a] px-2.5 py-0.5 rounded-md shrink-0 font-sans"
                      style={{ 
                        backgroundColor: "#F4F7FC",
                        border: "1px solid #CBD6E5"
                      }}
                    >
                      m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón Calcular — Inmediatamente después de los inputs */}
              <button
                type="button"
                onClick={handleCalculateValuation}
                disabled={isCalculatingValuation}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-base sm:text-[17px] py-4 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2.5 uppercase tracking-wider font-sans disabled:opacity-75 shadow-xs"
              >
                <Home className="w-5 h-5 text-white shrink-0" />
                <span>{isCalculatingValuation ? t.valorador.calculando : (language === "ca" ? "CALCULAR VALORACIÓ" : language === "en" ? "CALCULATE VALUATION" : "CALCULAR VALORACIÓN")}</span>
                <ArrowRight className="w-5 h-5 text-white shrink-0" />
              </button>

              {/* Trust Guarantees — Directamente debajo del botón */}
              <div className="flex items-center justify-between text-[14px] sm:text-[15px] text-[#0b214a] font-bold font-sans px-1 pt-0.5">
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

          {/* RIGHT: RESULT PANEL — NAVY GESGRAMA SÓLIDO (#0B1733), equilibrado verticalmente */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div 
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-center relative overflow-hidden flex flex-col items-center justify-between h-full min-h-[340px] text-white"
              style={{
                backgroundColor: "#0B1733",
                border: "2px solid #2563eb"
              }}
            >
              
              {/* Spinner while recalculating — Fondo sólido #0B1733 */}
              <AnimatePresence>
                {isCalculatingValuation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6"
                    style={{ backgroundColor: "#0B1733" }}
                  >
                    <div className="w-10 h-10 border-4 border-[#2563eb] border-t-white rounded-full animate-spin mb-3" />
                    <p className="text-sm font-bold text-white font-sans">{t.valorador.calculando}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 1. Header label + Price Block */}
              <div className="w-full flex flex-col items-center">
                <span className="inline-block text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-white bg-[#2563eb] px-6 py-1.5 rounded-full mb-2 font-sans">
                  {language === "ca" ? "VALOR ESTIMAT" : language === "en" ? "ESTIMATED VALUE" : "VALOR ESTIMADO"}
                </span>

                {/* Dominant Price Number */}
                <div className="text-5xl sm:text-6xl md:text-[64px] font-black text-white leading-none tracking-tight my-2 font-heading" style={{ fontSize: "clamp(46px, 5.2vw, 70px)" }}>
                  <span>{new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}</span>
                  <span className="text-[#2563eb] ml-1.5 font-sans">€</span>
                </div>

                {/* Secondary price per m² */}
                <p className="text-base sm:text-lg md:text-[19px] font-bold text-white font-sans mt-0.5">
                  <span className="text-[#2563eb] font-black mr-1">≈</span>{new Intl.NumberFormat('es-ES').format(calculatedResult.propertyPricePerM2)} €/m²
                </p>
              </div>

              {/* 2. Divisor sólido azul + CTA + Nota Legal */}
              <div 
                className="w-full mt-3 pt-3.5 flex flex-col items-center"
                style={{ borderTop: "1px solid #1D4ED8" }}
              >
                <a
                  href={`https://wa.me/34689438012?text=${contactText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[420px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs sm:text-sm md:text-[15px] py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer font-sans"
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

                {/* Cláusula legal en 2 líneas exactas balanceadas, centradas, max-w-[440px] */}
                <p className="text-[12px] sm:text-[13px] text-slate-200 font-medium font-sans mt-3 leading-[1.35] text-center max-w-[440px] mx-auto">
                  {language === "ca" ? (
                    <>
                      <span>Estimació orientativa basada en dades de mercat.</span>
                      <br className="hidden sm:inline" />{" "}
                      <span className="sm:inline block">No constitueix una <span className="whitespace-nowrap">taxació oficial.</span></span>
                    </>
                  ) : language === "en" ? (
                    <>
                      <span>Guidance estimation based on market data.</span>
                      <br className="hidden sm:inline" />{" "}
                      <span className="sm:inline block">Does not constitute an <span className="whitespace-nowrap">official appraisal.</span></span>
                    </>
                  ) : (
                    <>
                      <span>Estimación orientativa basada en datos de mercado.</span>
                      <br className="hidden sm:inline" />{" "}
                      <span className="sm:inline block">No constituye una <span className="whitespace-nowrap">tasación oficial.</span></span>
                    </>
                  )}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
