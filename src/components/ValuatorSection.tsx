import { useState, useEffect, useRef } from "react";
import { MapPin, Ruler, Home, ArrowRight, ChevronDown, Check, Star, Zap, Building2, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { formatLocation } from "@/data/properties";

interface ValuatorSectionProps {
  language: "es" | "en" | "ca";
  t: any;
  zonas: string[];
  shouldReduceMotion: boolean | null;
  initialZona?: string;
}

const SANTA_COLOMA_14_BARRIOS = [
  { name: "Centre", pricePerM2: 2350, demand: "Alta", variation: "+4.2%" },
  { name: "Santa Rosa", pricePerM2: 1910, demand: "Muy alta", variation: "+5.1%" },
  { name: "Can Mariner", pricePerM2: 2020, demand: "Alta", variation: "+3.8%" },
  { name: "Fondo", pricePerM2: 1680, demand: "Muy alta", variation: "+6.0%" },
  { name: "Singuerlín", pricePerM2: 1720, demand: "Media-Alta", variation: "+3.4%" },
  { name: "Riera Alta", pricePerM2: 1850, demand: "Media", variation: "+2.9%" },
  { name: "Llatí", pricePerM2: 1820, demand: "Alta", variation: "+3.6%" },
  { name: "El Raval", pricePerM2: 1790, demand: "Alta", variation: "+4.5%" },
  { name: "Riu Nord", pricePerM2: 1980, demand: "Alta", variation: "+3.9%" },
  { name: "Riu Sud", pricePerM2: 1950, demand: "Alta", variation: "+3.7%" },
  { name: "Can Franquesa", pricePerM2: 1620, demand: "Media", variation: "+2.1%" },
  { name: "Les Oliveres", pricePerM2: 1710, demand: "Media", variation: "+2.5%" },
  { name: "La Guinardera", pricePerM2: 1780, demand: "Media-Alta", variation: "+3.2%" },
  { name: "Cementiri Vell", pricePerM2: 1940, demand: "Alta", variation: "+3.5%" }
];

const ZONE_STATS_MAP: Record<string, { pricePerM2: number; demand: string; variation: string }> = {};
SANTA_COLOMA_14_BARRIOS.forEach(b => {
  ZONE_STATS_MAP[b.name] = { pricePerM2: b.pricePerM2, demand: b.demand, variation: b.variation };
});
ZONE_STATS_MAP["Centro"] = ZONE_STATS_MAP["Centre"];
ZONE_STATS_MAP["Santa Rosa - Can Mariner"] = ZONE_STATS_MAP["Santa Rosa"];
ZONE_STATS_MAP["Riera Alta - Llatí"] = ZONE_STATS_MAP["Riera Alta"];
ZONE_STATS_MAP["Riu"] = ZONE_STATS_MAP["Riu Nord"];
ZONE_STATS_MAP["Riu Nord / Riu Sud"] = ZONE_STATS_MAP["Riu Nord"];
ZONE_STATS_MAP["Oliveres - Can Serra"] = ZONE_STATS_MAP["Les Oliveres"];
ZONE_STATS_MAP["Oliveres"] = ZONE_STATS_MAP["Les Oliveres"];

export default function ValuatorSection({ language, t, zonas, shouldReduceMotion, initialZona }: ValuatorSectionProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

  const effectiveInitialZona = initialZona && ZONE_STATS_MAP[initialZona] ? initialZona : "Centre";

  // Form State
  const [zona, setZona] = useState(effectiveInitialZona);
  const [metros, setMetros] = useState(85);
  const [habitaciones, setHabitaciones] = useState("3");
  const [estado, setEstado] = useState<"reformar" | "bueno" | "reformado">("bueno");
  const [extras, setExtras] = useState<{ ascensor: boolean; terraza: boolean; parking: boolean; exterior: boolean }>({
    ascensor: true,
    terraza: false,
    parking: false,
    exterior: true
  });

  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);

  // Calculation Logic
  const calculateResultValues = (
    targetZona: string,
    targetMetros: number,
    targetEstado: "reformar" | "bueno" | "reformado",
    targetExtras: { ascensor: boolean; terraza: boolean; parking: boolean; exterior: boolean }
  ) => {
    const stats = ZONE_STATS_MAP[targetZona] || ZONE_STATS_MAP["Centre"];
    let basePricePerM2 = stats.pricePerM2;

    const sizeFactor = targetMetros < 60 ? 1.07 : targetMetros <= 85 ? 1.03 : targetMetros <= 120 ? 0.98 : 0.93;

    let estadoFactor = 1.0;
    if (targetEstado === "reformar") estadoFactor = 0.85;
    if (targetEstado === "reformado") estadoFactor = 1.12;

    let extrasFactor = 1.0;
    if (targetExtras.ascensor) extrasFactor += 0.05;
    if (targetExtras.terraza) extrasFactor += 0.04;
    if (targetExtras.parking) extrasFactor += 0.05;
    if (targetExtras.exterior) extrasFactor += 0.03;

    const finalPricePerM2 = Math.round(basePricePerM2 * sizeFactor * estadoFactor * extrasFactor);
    const estimatedValue = Math.round(targetMetros * finalPricePerM2);
    const rangeMin = Math.round(estimatedValue * 0.94);
    const rangeMax = Math.round(estimatedValue * 1.06);

    return {
      estimatedValue,
      rangeMin,
      rangeMax,
      pricePerM2: finalPricePerM2,
      basePricePerM2: stats.pricePerM2,
      demand: stats.demand,
      variation: stats.variation,
      zoneName: targetZona
    };
  };

  const [result, setResult] = useState(() =>
    calculateResultValues(effectiveInitialZona, 85, "bueno", { ascensor: true, terraza: false, parking: false, exterior: true })
  );

  const [displayMin, setDisplayMin] = useState<number>(result.rangeMin);
  const [displayMax, setDisplayMax] = useState<number>(result.rangeMax);
  const [displayPricePerM2, setDisplayPricePerM2] = useState<number>(result.pricePerM2);

  const animFrameRef = useRef<number | null>(null);

  const triggerCalculation = (
    newZona = zona,
    newMetros = metros,
    newEstado = estado,
    newExtras = extras
  ) => {
    setIsCalculatingValuation(true);
    const calculated = calculateResultValues(newZona, newMetros, newEstado, newExtras);

    setTimeout(() => {
      setResult(calculated);
      setIsCalculatingValuation(false);

      if (shouldReduceMotion) {
        setDisplayMin(calculated.rangeMin);
        setDisplayMax(calculated.rangeMax);
        setDisplayPricePerM2(calculated.pricePerM2);
        return;
      }

      const startMin = displayMin;
      const targetMin = calculated.rangeMin;
      const startMax = displayMax;
      const targetMax = calculated.rangeMax;
      const startM2 = displayPricePerM2;
      const targetM2 = calculated.pricePerM2;

      const duration = 500;
      const startTime = performance.now();

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setDisplayMin(Math.round(startMin + (targetMin - startMin) * easeOut));
        setDisplayMax(Math.round(startMax + (targetMax - startMax) * easeOut));
        setDisplayPricePerM2(Math.round(startM2 + (targetM2 - startM2) * easeOut));

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          setDisplayMin(targetMin);
          setDisplayMax(targetMax);
          setDisplayPricePerM2(targetM2);
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    }, 200);
  };

  const handleSliderChange = (val: number) => {
    setMetros(val);
  };

  const toggleExtra = (key: keyof typeof extras) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const contactText = encodeURIComponent(
    isCa
      ? `Hola Gesgrama, he consultat la valoració d'un habitatge a ${formatLocation(result.zoneName, "ca")} de ${metros} m² (${result.demand} demanda, estimació: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). M'agradaria sol·licitar una tasació presencial gratuïta.`
      : isEn
      ? `Hello Gesgrama, I calculated the valuation for a property in ${formatLocation(result.zoneName, "en")} of ${metros} sq m (range: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). I would like to request a free in-person appraisal.`
      : `Hola Gesgrama, he consultado la valoración de una vivienda en ${formatLocation(result.zoneName, "es")} de ${metros} m² (horquilla: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). Me gustaría solicitar una tasación presencial gratuita.`
  );

  return (
    <section id="valuator-form" className="relative overflow-hidden bg-[#0A192F] text-white py-12 md:py-16 scroll-mt-20 font-sans">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Cabecera Principal Integrada en el Fondo Azul Corporativo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex flex-col items-start max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[12px] font-black tracking-wider uppercase px-3.5 py-1 rounded-full shadow-sm mb-2.5 font-sans">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{isCa ? "VALORACIÓ EN TEMPS REAL" : isEn ? "REAL-TIME APPRAISAL" : "VALORACIÓN EN TIEMPO REAL"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-white tracking-tight leading-[1.08] font-sans">
              {isCa ? (
                <>¿Quant val el teu habitatge a Santa Coloma?</>
              ) : isEn ? (
                "How much is your home worth in Santa Coloma?"
              ) : (
                <>¿Cuánto vale tu vivienda en Santa Coloma?</>
              )}
            </h2>
          </div>
          <div className="md:max-w-md md:self-end">
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {isCa
                ? "Calcula en menys d'un minut una estimació precisa basada en dades reals de compravenda als 14 barris de la ciutat."
                : "Calcula en menos de un minuto una estimación precisa basada en datos reales de compraventa en los 14 barrios de la ciudad."}
            </p>
          </div>
        </div>

        {/* 2-Column Split: 58% Izquierda / 42% Derecha (Compacto, sin separación excesiva, altura 100% equilibrada) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* PANEL IZQUIERDO: Formulario de Datos (58% approx -> lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[22px] bg-white text-[#0f172a] p-5 sm:p-7 shadow-xl border border-slate-200">
            <div className="space-y-4 sm:space-y-4.5">
              
              {/* 1. Selector de Barrio */}
              <div>
                <label htmlFor="valuator-zona-select" className="block text-[13px] sm:text-sm font-black uppercase tracking-wider text-slate-800 mb-1.5 font-sans flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2563eb]" />
                    {isCa ? "Barri de Santa Coloma" : "Barrio de Santa Coloma"}
                  </span>
                  <span className="text-[12px] font-bold text-[#2563eb] normal-case">14 barrios oficiales</span>
                </label>
                <div className="relative bg-[#f8fafc] rounded-xl border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] transition-colors p-2.5 sm:p-3 flex items-center justify-between">
                  <select
                    id="valuator-zona-select"
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-[15px] sm:text-[16px] font-extrabold text-[#0b214a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                  >
                    {SANTA_COLOMA_14_BARRIOS.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name} — {b.pricePerM2} €/m² (Demanda {b.demand})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#2563eb] pointer-events-none shrink-0" />
                </div>
              </div>

              {/* 2. Superficie m² con Slider Fluido + Botones - / + */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="valuator-m2-input" className="text-[13px] sm:text-sm font-black uppercase tracking-wider text-slate-800 font-sans flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-[#2563eb]" />
                    {isCa ? "Superfície construïda" : "Superficie construida"}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.max(30, metros - 5))}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#2563eb] hover:text-white border border-slate-300 text-slate-800 font-black flex items-center justify-center cursor-pointer active:scale-95 transition-all text-base"
                      aria-label="Restar 5 metros"
                    >
                      -
                    </button>
                    <div className="bg-[#f8fafc] border-2 border-slate-300 rounded-lg px-3 py-1 flex items-center gap-1">
                      <input
                        id="valuator-m2-input"
                        type="number"
                        min="30"
                        max="250"
                        value={metros}
                        onChange={(e) => handleSliderChange(Math.max(20, Math.min(300, parseInt(e.target.value) || 30)))}
                        className="w-12 text-center text-[16px] sm:text-[17px] font-black text-[#0b214a] border-none p-0 focus:ring-0 outline-none"
                      />
                      <span className="text-xs sm:text-sm font-extrabold text-[#2563eb]">m²</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.min(250, metros + 5))}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#2563eb] hover:text-white border border-slate-300 text-slate-800 font-black flex items-center justify-center cursor-pointer active:scale-95 transition-all text-base"
                      aria-label="Sumar 5 metros"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="250"
                  step="1"
                  value={metros}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
                />
                <div className="flex justify-between text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
                  <span>30 m²</span>
                  <span>90 m²</span>
                  <span>150 m²</span>
                  <span>250 m²</span>
                </div>
              </div>

              {/* 3. Habitaciones y Estado agrupados en grid compacto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Habitaciones */}
                <div>
                  <span className="block text-[13px] sm:text-sm font-black uppercase tracking-wider text-slate-800 mb-1.5 font-sans">
                    {isCa ? "Habitacions" : "Habitaciones"}
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["1", "2", "3", "4+"].map((h) => {
                      const isSelected = habitaciones === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHabitaciones(h)}
                          className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 text-center shadow-xs ${
                            isSelected
                              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm"
                              : "bg-[#f8fafc] text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Estado del Inmueble */}
                <div>
                  <span className="block text-[13px] sm:text-sm font-black uppercase tracking-wider text-slate-800 mb-1.5 font-sans">
                    {isCa ? "Estat del pis" : "Estado del piso"}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { key: "reformar", label: "A reformar" },
                      { key: "bueno", label: "Buen estado" },
                      { key: "reformado", label: "Reformado" }
                    ].map((item) => {
                      const isSelected = estado === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setEstado(item.key as any)}
                          className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer border-2 text-center shadow-xs ${
                            isSelected
                              ? "bg-[#0b214a] text-white border-[#0b214a]"
                              : "bg-[#f8fafc] text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Extras y Características (Chips Compactos pero Claros) */}
              <div>
                <span className="block text-[13px] sm:text-sm font-black uppercase tracking-wider text-slate-800 mb-1.5 font-sans">
                  {isCa ? "Extres de l'habitatge" : "Extras de la vivienda"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: "ascensor", label: "Ascensor" },
                    { key: "terraza", label: isCa ? "Terrassa" : "Terraza" },
                    { key: "parking", label: "Parking" },
                    { key: "exterior", label: "Exterior" }
                  ].map((chip) => {
                    const isChecked = extras[chip.key as keyof typeof extras];
                    return (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={() => toggleExtra(chip.key as keyof typeof extras)}
                        className={`py-2 px-2.5 rounded-xl text-xs sm:text-[13px] font-black border-2 transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                          isChecked
                            ? "bg-blue-50 text-[#1d4ed8] border-[#2563eb]"
                            : "bg-[#f8fafc] text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span>{chip.label}</span>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${isChecked ? "bg-[#2563eb] text-white" : "bg-slate-300 text-slate-500"}`}>
                          {isChecked ? "✓" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Botón Principal Sólido con Proporciones Equilibradas */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => triggerCalculation()}
                disabled={isCalculatingValuation}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-black text-sm sm:text-base py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider font-sans select-none disabled:opacity-80"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>
                  {isCalculatingValuation
                    ? isCa ? "CALCULANT ESTIMACIÓ..." : "CALCULANDO ESTIMACIÓN..."
                    : isCa ? "CALCULAR VALORACIÓ ARA →" : "CALCULAR VALORACIÓN AHORA →"}
                </span>
              </button>
            </div>
          </div>

          {/* PANEL DERECHO: Resultado de Valoración Potente y sin Espacios Vacíos (42% approx -> lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[22px] bg-[#071328] border-2 border-slate-700 p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden">
            
            {/* Loading Overlay */}
            {isCalculatingValuation && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#071328]/95 backdrop-blur-xs transition-opacity duration-200">
                <div className="w-8 h-8 border-3 border-[#2563eb] border-t-white rounded-full animate-spin mb-3" />
                <span className="text-xs font-black text-white tracking-widest uppercase font-sans">
                  {isCa ? "ACTUALITZANT VALORACIÓ..." : "ACTUALIZANDO VALORACIÓN..."}
                </span>
              </div>
            )}

            {/* Parte Superior del Resultado */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white bg-[#2563eb] px-3.5 py-1 rounded-full shadow-xs">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                  <span>{isCa ? "ESTIMACIÓ DE MERCAT" : "ESTIMACIÓN DE MERCADO"}</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#38bdf8] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  {result.zoneName}
                </span>
              </div>

              {/* Rango de Precios Dominante y Nítido */}
              <div className="bg-[#0e2142] rounded-2xl p-4 sm:p-5 border border-slate-700 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  {isCa ? "Horquilla real de venda:" : "Horquilla real de venta:"}
                </p>
                <div className="text-2xl sm:text-3xl xl:text-[34px] font-black text-white leading-tight tracking-tight font-sans">
                  <span>{new Intl.NumberFormat("es-ES").format(displayMin)} €</span>
                  <span className="text-[#38bdf8] mx-2">–</span>
                  <span>{new Intl.NumberFormat("es-ES").format(displayMax)} €</span>
                </div>
                <p className="text-xs text-slate-300 mt-1.5 font-medium">
                  {metros} m² · {habitaciones} {isCa ? "hab" : "hab"} · {estado === "reformado" ? "Reformado" : estado === "reformar" ? "A reformar" : "Buen estado"}
                </p>
              </div>

              {/* 3 Indicadores Secundarios Compactos con Tipografía Grande */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#0e2142] border border-slate-700/80 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider">Preu m²</span>
                  <span className="text-sm sm:text-base font-black text-white mt-0.5">{displayPricePerM2} €</span>
                </div>
                <div className="bg-[#0e2142] border border-slate-700/80 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider">Demanda</span>
                  <span className="text-sm sm:text-base font-black text-[#38bdf8] mt-0.5">{result.demand}</span>
                </div>
                <div className="bg-[#0e2142] border border-slate-700/80 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider">Variació</span>
                  <span className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">{result.variation}</span>
                </div>
              </div>
            </div>

            {/* Parte Inferior: Botón de Valoración Exacta y Micro-Copy de Confianza Integrado */}
            <div className="pt-4 mt-4 border-t border-slate-800 space-y-2.5">
              <a
                href={`https://wa.me/34689438012?text=${contactText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-slate-100 text-[#071328] font-black text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.99] font-sans"
              >
                <span>{isCa ? "Vull una valoració exacta" : "Quiero una valoración exacta"}</span>
                <ArrowRight className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[3]" />
              </a>

              <div className="flex items-center justify-center gap-2 text-center pt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <p className="text-[11px] sm:text-xs text-slate-300 font-semibold font-sans">
                  {isCa
                    ? "Taxació presencial gratuïta per agents AICAT 5583 · Sense compromís"
                    : "Tasación presencial gratuita por agentes AICAT 5583 · Sin compromiso"}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
