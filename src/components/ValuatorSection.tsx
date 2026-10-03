import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Ruler, Home, ArrowRight, ChevronDown, Check, Star, Zap, CheckCircle2 } from "lucide-react";
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
  const [badgeAnimatedIn, setBadgeAnimatedIn] = useState(false);

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

  // Animated display price
  const [displayPrice, setDisplayPrice] = useState<number>(calculatedResult.estimatedValue);
  const currentPriceRef = useRef<number>(calculatedResult.estimatedValue);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

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

      // Number animation with ease-out
      if (shouldReduceMotion) {
        setDisplayPrice(exactValue);
        currentPriceRef.current = exactValue;
        setBadgeAnimatedIn(true);
        return;
      }

      // Start value: 0 on first calculation, previous value on recalculation
      const startValue = hasCalculated ? currentPriceRef.current : 0;
      const targetValue = exactValue;
      const duration = 850; // 850ms (within 700-1000ms target)
      const startTime = performance.now();

      setBadgeAnimatedIn(false);

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Clean ease-out cubic curve: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(startValue + (targetValue - startValue) * easeOut);

        setDisplayPrice(currentVal);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animateStep);
        } else {
          setDisplayPrice(targetValue);
          currentPriceRef.current = targetValue;
          // Trigger subtle badge appearance
          setBadgeAnimatedIn(true);
        }
      };

      animFrameRef.current = requestAnimationFrame(animateStep);
    }, 320);
  };

  const contactText = encodeURIComponent(
    language === "ca"
      ? `Hola, he consultat la valoració d'un habitatge a ${formatLocation(calculatedResult.zoneName, "ca")} d'aproximadament ${calculatedResult.propertyM2} m² (estimació: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) i m'agradaria rebre una valoració personalitzada.`
      : language === "en"
      ? `Hello, I checked the valuation of a home in ${formatLocation(calculatedResult.zoneName, "en")} of approximately ${calculatedResult.propertyM2} sq m (estimate: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) and would like to receive a personalized valuation.`
      : `Hola, he consultado la valoración de una vivienda en ${formatLocation(calculatedResult.zoneName, "es")} de aproximadamente ${calculatedResult.propertyM2} m² (estimación: ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} €) y me gustaría recibir una valoración personalizada.`
  );

  return (
    <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-9 scroll-mt-20 sm:scroll-mt-24 font-sans">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <div id="valuator-card" className="bg-white rounded-[24px] sm:rounded-[28px] shadow-lg border border-slate-300 p-4 sm:p-6 md:p-7 mx-3 sm:mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-[#0f172a]">
        
        {/* Cabecera Editorial Limpia */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 mb-5 pb-4 border-b border-slate-200">
          <div className="flex flex-col items-start max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-2xs mb-2 font-sans">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{language === "ca" ? "VALORACIÓ GRATUÏTA" : language === "en" ? "FREE VALUATION" : "VALORACIÓN GRATUITA"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b214a] tracking-tight leading-[1.08] font-heading">
              {language === "ca" ? (
                <><span className="mr-0.5 inline-block">¿</span>Quant val el teu habitatge<span className="ml-0.5 inline-block">?</span></>
              ) : language === "en" ? (
                "How much is your home worth?"
              ) : (
                <><span className="mr-0.5 inline-block">¿</span>Cuánto vale tu vivienda<span className="ml-0.5 inline-block">?</span></>
              )}
            </h2>
          </div>
          <div className="md:max-w-md md:self-end md:pb-0.5">
            <p className="text-sm sm:text-[15px] text-[#0b214a] font-semibold leading-snug">
              {language === "ca" ? (
                <>Descobreix una estimació orientativa de mercat en menys d&apos;<span className="whitespace-nowrap">un minut.</span></>
              ) : language === "en" ? (
                <>Discover an orientative market estimate in less than <span className="whitespace-nowrap">a minute.</span></>
              ) : (
                <>Descubre una estimación orientativa de mercado en menos de <span className="whitespace-nowrap">un minuto.</span></>
              )}
            </p>
          </div>
        </div>

        {/* 2-Column Split Compacto y Equilibrado (Sin espacios vacíos) */}
        {/* 2-Column Split: Proporción balanceada 5/7 o 6/6 (Lg: 5.5 cols / 6.5 cols via 12-col grid o flex) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* PANEL IZQUIERDO: FLUJO DIRECTO Y VISUAL (DATOS -> INPUTS -> CTA -> BENEFICIOS) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between rounded-2xl relative overflow-hidden bg-[#F4F7FC] border-2 border-[#CBD6E5] p-4 sm:p-5">
            <div className="flex flex-col gap-3">
              {/* Cabecera del Panel Izquierdo con fondo azul sólido refinado */}
              <div className="bg-[#2563eb] text-white rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-xs">
                <Home className="w-4 h-4 text-white stroke-[2.5] shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase font-sans text-white">
                  {language === "ca" ? "DADES DEL TEU HABITATGE" : language === "en" ? "YOUR HOME DETAILS" : "DATOS DE TU VIVIENDA"}
                </h3>
              </div>

              {/* Inputs Estructurados en Grid con jerarquía clara y valores destacados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Zona o Barrio */}
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border-2 border-[#CBD6E5] hover:border-[#2563eb] focus-within:border-[#2563eb] transition-colors flex flex-col justify-between">
                  <label htmlFor="valuator-zona-select" className="block text-[12px] sm:text-[13px] font-semibold text-[#0b214a] mb-1 font-sans">
                    {language === "ca" ? "ZONA O BARRI" : language === "en" ? "NEIGHBORHOOD" : "ZONA O BARRIO"}
                  </label>
                  <div className="flex items-center justify-between gap-1.5 min-w-0">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                      <select
                        id="valuator-zona-select"
                        aria-label="Seleccionar zona de la propiedad"
                        value={valuatorData.zona}
                        onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                        className="w-full bg-transparent border-0 p-0 text-[17px] sm:text-[18px] font-bold text-[#0b214a] focus:ring-0 appearance-none cursor-pointer outline-none truncate font-sans leading-tight"
                      >
                        {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                      </select>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#2563eb] shrink-0" />
                  </div>
                </div>

                {/* Superficie Estimada con cápsula m² azul sólida */}
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border-2 border-[#CBD6E5] hover:border-[#2563eb] focus-within:border-[#2563eb] transition-colors flex flex-col justify-between">
                  <label htmlFor="valuator-metros-input" className="block text-[12px] sm:text-[13px] font-semibold text-[#0b214a] mb-1 font-sans">
                    {language === "ca" ? "SUPERFÍCIE ESTIMADA" : language === "en" ? "ESTIMATED AREA" : "SUPERFICIE ESTIMADA"}
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
                      className="w-full bg-transparent border-0 p-0 text-[17px] sm:text-[18px] font-bold text-[#0b214a] focus:ring-0 outline-none font-sans leading-tight"
                    />
                    <span className="text-xs font-bold text-white px-2.5 py-1 rounded-lg shrink-0 font-sans tracking-tight bg-[#2563eb]">
                      m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón CTA Inmediatamente Conectado a los inputs */}
              <button
                type="button"
                onClick={handleCalculateValuation}
                disabled={isCalculatingValuation}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 px-5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider font-sans disabled:opacity-85 shadow-sm select-none"
              >
                <span>
                  {isCalculatingValuation
                    ? (language === "ca" ? "CALCULANT..." : language === "en" ? "CALCULATING..." : "CALCULANDO...")
                    : hasCalculated
                    ? (language === "ca" ? "ACTUALITZAR VALORACIÓ" : language === "en" ? "UPDATE VALUATION" : "ACTUALIZAR VALORACIÓN")
                    : (language === "ca" ? "CALCULAR VALORACIÓ" : language === "en" ? "CALCULATE VALUATION" : "CALCULAR VALORACIÓN")}
                </span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </button>
            </div>

            {/* Beneficios Integrados Inmediatamente Debajo del CTA (Alineados, Navy 14-15px Bold) */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 pt-3 mt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white stroke-[3.5]" />
                </div>
                <span className="text-[14px] sm:text-[15px] text-[#0b214a] font-bold font-sans">
                  {t?.valorador?.sinCompromiso || (language === "ca" ? "Sense compromís" : language === "en" ? "No obligation" : "Sin compromiso")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                  <Zap className="w-3 h-3 text-white fill-white stroke-[2.5]" />
                </div>
                <span className="text-[14px] sm:text-[15px] text-[#0b214a] font-bold font-sans">
                  {t?.valorador?.resultadoInmediato || (language === "ca" ? "Resultat immediat" : language === "en" ? "Instant result" : "Resultado inmediato")}
                </span>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO: RESULTADO PROTAGONISTA LIMPIO EN NAVY SÓLIDO (#0B1733) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between rounded-2xl relative overflow-hidden bg-[#0B1733] border-2 border-[#2563eb] p-5 sm:p-6 text-white text-center">
            
            {/* Overlay sutil mientras calcula */}
            {isCalculatingValuation && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#0B1733]">
                <div className="w-7 h-7 border-3 border-[#2563eb] border-t-white rounded-full animate-spin mb-2" />
                <span className="text-xs font-bold text-white tracking-widest uppercase font-sans">
                  {language === "ca" ? "CALCULANT ESTIMACIÓ..." : language === "en" ? "CALCULATING ESTIMATE..." : "CALCULANDO ESTIMACIÓN..."}
                </span>
              </div>
            )}

            {/* Bloque Superior: Badge + Precio Dominante + €/m² */}
            <div className="flex flex-col items-center my-auto py-2">
              {hasCalculated ? (
                <span 
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2563eb] px-3.5 py-1 rounded-full mb-2 font-sans shadow-xs transition-transform duration-200 ${
                    badgeAnimatedIn ? "scale-100" : "scale-95"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                  <span>{language === "ca" ? "VALORACIÓ CALCULADA" : language === "en" ? "VALUATION CALCULATED" : "VALORACIÓN CALCULADA"}</span>
                </span>
              ) : (
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-200 bg-[#16274e] border border-blue-500/40 px-3.5 py-1 rounded-full mb-2 font-sans">
                  {language === "ca" ? "VALOR ESTIMAT" : language === "en" ? "ESTIMATED VALUE" : "VALOR ESTIMADO"}
                </span>
              )}

              {/* Cifra de Precio Dominante */}
              <div 
                className={`text-5xl sm:text-6xl md:text-[64px] font-black text-white leading-none tracking-tight my-2 font-heading transition-opacity duration-200 ${
                  isCalculatingValuation ? "opacity-25" : "opacity-100"
                }`} 
                style={{ fontSize: "clamp(44px, 5.2vw, 66px)" }}
              >
                <span aria-live="polite" aria-atomic="true">
                  {new Intl.NumberFormat('es-ES').format(displayPrice)}
                </span>
                <span className="text-[#2563eb] ml-1 font-sans">€</span>
              </div>

              {/* Métrica secundaria €/m² inmediatamente debajo del precio */}
              <p className="text-sm sm:text-base font-bold text-slate-200 font-sans">
                <span className="text-[#2563eb] font-bold mr-1">≈</span>{new Intl.NumberFormat('es-ES').format(calculatedResult.propertyPricePerM2)} €/m²
              </p>
            </div>

            {/* Bloque Inferior: Divisor Fino + CTA Comercial + Cláusula Legal Concisa */}
            <div className="w-full pt-4 border-t border-[#1D4ED8]/80 flex flex-col items-center">
              <a
                href={`https://wa.me/34689438012?text=${contactText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[420px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full transition-colors flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer font-sans shadow-sm"
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

              {/* Cláusula legal en máximo 2 líneas exactas compactas */}
              <p className="text-[12px] sm:text-[13px] text-slate-300 font-normal font-sans mt-2 leading-tight text-center max-w-[400px] mx-auto">
                {language === "ca" ? (
                  <>Estimació orientativa basada en dades de mercat.<br className="hidden sm:inline" /> No constitueix una taxació oficial.</>
                ) : language === "en" ? (
                  <>Guidance estimation based on market data.<br className="hidden sm:inline" /> Does not constitute an official appraisal.</>
                ) : (
                  <>Estimación orientativa basada en datos de mercado.<br className="hidden sm:inline" /> No constituye una tasación oficial.</>
                )}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
