import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Ruler, 
  Home, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  Star, 
  Sparkles, 
  ShieldCheck,
  Calculator,
  TrendingUp
} from "lucide-react";
import { formatLocation } from "@/data/properties";

interface ValuatorSectionProps {
  language: "es" | "en" | "ca";
  t: any;
  zonas: string[];
  shouldReduceMotion: boolean | null;
  initialZona?: string;
}

// 14 barrios oficiales de Santa Coloma de Gramenet con datos reales de mercado
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

export default function ValuatorSection({
  language,
  t,
  zonas,
  shouldReduceMotion,
  initialZona = "Centre"
}: ValuatorSectionProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

  const [zona, setZona] = useState<string>(() => {
    if (initialZona && ZONE_STATS_MAP[initialZona]) return initialZona;
    return "Centre";
  });
  const [metros, setMetros] = useState<number>(75);
  const [habitaciones, setHabitaciones] = useState<string>("3");
  const [estado, setEstado] = useState<"reformar" | "bueno" | "reformado">("bueno");
  const [extras, setExtras] = useState({
    ascensor: true,
    terraza: false,
    parking: false,
    exterior: true
  });

  const [isCalculatingValuation, setIsCalculatingValuation] = useState<boolean>(false);

  const calculateValuation = (
    targetZona: string,
    targetMetros: number,
    targetHabitaciones: string,
    targetEstado: "reformar" | "bueno" | "reformado",
    targetExtras: { ascensor: boolean; terraza: boolean; parking: boolean; exterior: boolean }
  ) => {
    const stats = ZONE_STATS_MAP[targetZona] || { pricePerM2: 1950, demand: "Alta", variation: "+3.8%" };
    let basePricePerM2 = stats.pricePerM2;

    if (targetMetros < 50) basePricePerM2 *= 1.08;
    else if (targetMetros > 120) basePricePerM2 *= 0.94;

    if (targetHabitaciones === "1") basePricePerM2 *= 0.97;
    else if (targetHabitaciones === "2") basePricePerM2 *= 0.99;
    else if (targetHabitaciones === "3") basePricePerM2 *= 1.0;
    else if (targetHabitaciones === "4+") basePricePerM2 *= 1.04;

    if (targetEstado === "reformar") basePricePerM2 *= 0.85;
    else if (targetEstado === "bueno") basePricePerM2 *= 1.0;
    else if (targetEstado === "reformado") basePricePerM2 *= 1.12;

    let extrasMultiplier = 1.0;
    if (targetExtras.ascensor) extrasMultiplier += 0.05;
    if (targetExtras.terraza) extrasMultiplier += 0.04;
    if (targetExtras.parking) extrasMultiplier += 0.05;
    if (targetExtras.exterior) extrasMultiplier += 0.03;

    const finalPricePerM2 = Math.round(basePricePerM2 * extrasMultiplier);
    const estimatedValue = Math.round(finalPricePerM2 * targetMetros);

    const rangeMin = Math.round((estimatedValue * 0.94) / 100) * 100;
    const rangeMax = Math.round((estimatedValue * 1.06) / 100) * 100;

    return {
      estimatedValue,
      rangeMin,
      rangeMax,
      pricePerM2: finalPricePerM2,
      demand: stats.demand,
      variation: stats.variation,
      zoneName: targetZona
    };
  };

  const [result, setResult] = useState(() =>
    calculateValuation(zona, metros, habitaciones, estado, extras)
  );

  const [displayMin, setDisplayMin] = useState<number>(result.rangeMin);
  const [displayMax, setDisplayMax] = useState<number>(result.rangeMax);
  const [displayPricePerM2, setDisplayPricePerM2] = useState<number>(result.pricePerM2);

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    triggerCalculation(false);
  }, [zona, metros, habitaciones, estado, extras]);

  const triggerCalculation = (showSpinner = true) => {
    if (showSpinner) {
      setIsCalculatingValuation(true);
    }

    setTimeout(() => {
      const calculated = calculateValuation(zona, metros, habitaciones, estado, extras);
      setResult(calculated);
      setIsCalculatingValuation(false);

      const startMin = displayMin;
      const targetMin = calculated.rangeMin;
      const startMax = displayMax;
      const targetMax = calculated.rangeMax;
      const startM2 = displayPricePerM2;
      const targetM2 = calculated.pricePerM2;

      const duration = 400;
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
    }, showSpinner ? 180 : 0);
  };

  const handleSliderChange = (val: number) => {
    setMetros(val);
  };

  const toggleExtra = (key: keyof typeof extras) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const contactText = encodeURIComponent(
    isCa
      ? `Hola Gesgrama, he consultat la valoració d'un habitatge a ${formatLocation(result.zoneName, "ca")} de ${metros} m² (rang estimat: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). M'agradaria sol·licitar una valoració exacta i presencial sense compromís.`
      : isEn
      ? `Hello Gesgrama, I calculated the valuation for a property in ${formatLocation(result.zoneName, "en")} of ${metros} sq m (range: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). I would like to request an exact appraisal.`
      : `Hola Gesgrama, he consultado la valoración de una vivienda en ${formatLocation(result.zoneName, "es")} de ${metros} m² (horquilla: ${new Intl.NumberFormat("es-ES").format(result.rangeMin)} € - ${new Intl.NumberFormat("es-ES").format(result.rangeMax)} €). Me gustaría solicitar una valoración exacta y presencial sin compromiso.`
  );

  return (
    <section id="valuator-form" className="py-6 sm:py-10 md:py-12 bg-[#F8FAFC] text-[#0f172a] scroll-mt-20 font-sans">
      <div id="valorador" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      
      {/* ── CONTENEDOR VELLUM ESTILO APPLE (Burbuja Flotante) ── */}
      <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
        
        {/* Cabecera de la Herramienta */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-100">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs sm:text-sm font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-xs mb-3">
              <Calculator className="w-4 h-4 text-white" />
              <span>{isCa ? "VALORACIÓ DE MERCAT" : isEn ? "REAL ESTATE VALUATION" : "VALORACIÓN DE MERCADO"}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0f172a] tracking-tight leading-[1.12]">
              {isCa ? (
                <>¿Quant val el teu habitatge a <span className="text-[#2563EB]">Santa Coloma</span>?</>
              ) : isEn ? (
                <>How much is your home worth in <span className="text-[#2563EB]">Santa Coloma</span>?</>
              ) : (
                <>¿Cuánto vale tu vivienda en <span className="text-[#2563EB]">Santa Coloma</span>?</>
              )}
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              {isCa
                ? "Calcula en 1 minut l'estimació real de mercat basada en transaccions notarials recents als 14 barris oficials de la ciutat."
                : "Calcula en 1 minuto la estimación real de mercado basada en transacciones notariales recientes en los 14 barrios oficiales de la ciudad."}
            </p>
          </div>
        </div>

        {/* ── MÓDULO UNIFICADO EN UNA SOLA SÚPER-TARJETA FLOTANTE ── */}
        <div className="bg-[#EFF6FF] border-2 border-blue-200/80 rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 md:p-10 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* COLUMNA IZQUIERDA: Formulario Interactivo (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Selector de Barrio de Santa Coloma */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="valuator-zona-select" className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-[#2563EB]" />
                    <span>{isCa ? "BARRI DE SANTA COLOMA" : "BARRIO DE SANTA COLOMA"}</span>
                  </label>
                  {/* Etiqueta sólida bien contrastada */}
                  <span className="text-xs sm:text-sm font-black text-white bg-[#0F172A] px-3.5 py-1 rounded-full shadow-xs">
                    14 barrios oficiales
                  </span>
                </div>
                
                <div className="relative bg-white rounded-2xl border-2 border-slate-300 hover:border-[#2563EB] focus-within:border-[#2563EB] transition-colors p-3.5 flex items-center justify-between shadow-xs">
                  <select
                    id="valuator-zona-select"
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-base sm:text-lg font-black text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none"
                  >
                    {SANTA_COLOMA_14_BARRIOS.map((b) => (
                      <option key={b.name} value={b.name} className="py-1">
                        {b.name} — {b.pricePerM2} €/m² ({b.demand} demanda)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#2563EB] pointer-events-none shrink-0 stroke-[2.5]" />
                </div>
              </div>

              {/* 2. Superficie m² con Slider y Controles */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label htmlFor="valuator-m2-input" className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                    <Ruler className="w-4.5 h-4.5 text-[#2563EB]" />
                    <span>{isCa ? "SUPERFÍCIE CONSTRUÏDA" : "SUPERFICIE CONSTRUIDA"}</span>
                  </label>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.max(30, metros - 5))}
                      className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-[#0f172a] border border-slate-300 font-black flex items-center justify-center cursor-pointer active:scale-95 transition-all text-lg shadow-xs"
                      aria-label="Restar 5 metros"
                    >
                      -
                    </button>
                    
                    <div className="bg-white border-2 border-[#2563EB] rounded-xl px-3.5 py-1 flex items-center gap-1.5 min-w-[90px] justify-center shadow-xs">
                      <input
                        id="valuator-m2-input"
                        type="number"
                        min="30"
                        max="250"
                        value={metros}
                        onChange={(e) => handleSliderChange(Math.max(20, Math.min(300, parseInt(e.target.value) || 30)))}
                        className="w-12 text-center text-lg sm:text-xl font-black text-[#0f172a] border-none p-0 focus:ring-0 outline-none"
                      />
                      <span className="text-base font-black text-[#2563EB]">m²</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.min(250, metros + 5))}
                      className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-[#0f172a] border border-slate-300 font-black flex items-center justify-center cursor-pointer active:scale-95 transition-all text-lg shadow-xs"
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
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
                
                <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-500 mt-1.5">
                  <span>30 m²</span>
                  <span>90 m²</span>
                  <span>150 m²</span>
                  <span>250 m²</span>
                </div>
              </div>

              {/* 3. Habitaciones y Estado de la Vivienda */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Habitaciones */}
                <div>
                  <span className="block text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a] mb-2">
                    {isCa ? "HABITACIONS" : "HABITACIONES"}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map((h) => {
                      const isSelected = habitaciones === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHabitaciones(h)}
                          className={`py-2.5 rounded-xl text-base font-black transition-all cursor-pointer border-2 text-center shadow-xs ${
                            isSelected
                              ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
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
                  <span className="block text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a] mb-2">
                    {isCa ? "ESTAT DEL PIS" : "ESTADO DEL PISO"}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
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
                          className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 text-center shadow-xs leading-tight ${
                            isSelected
                              ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Extras de la Vivienda */}
              <div>
                <span className="block text-sm sm:text-base font-black uppercase tracking-wider text-[#0f172a] mb-2">
                  {isCa ? "EXTRES DE L'HABITATGE" : "EXTRAS DE LA VIVIENDA"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black border-2 transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                          isChecked
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                            : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span>{chip.label}</span>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${isChecked ? "bg-white text-[#2563EB]" : "bg-slate-100 text-slate-600"}`}>
                          {isChecked ? "✓" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: Resultado Integrado en Tarjeta Blanca Luminosa (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200 shadow-md flex flex-col justify-between h-full">
              
              <div>
                {/* Cabecera del Resultado */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                  <span className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>{isCa ? "VALORACIÓ EN VIVO" : "VALORACIÓN EN VIVO"}</span>
                  </span>
                  
                  <span className="text-xs sm:text-sm font-black text-[#0f172a] flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#2563EB]" />
                    <span>{result.zoneName}</span>
                  </span>
                </div>

                {/* Bloque Principal de Valor Estimado */}
                <div className="bg-[#F8FAFC] border-2 border-slate-200 rounded-2xl p-5 sm:p-6 text-center mb-5">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 mb-3">
                    {isCa ? "VALOR ESTIMAT DE VENDA" : "VALOR ESTIMADO DE VENTA"}
                  </p>
                  
                  {/* Rango Desde - Hasta con Tabular Numbers */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center mb-3">
                    <div className="bg-white border border-slate-200 rounded-xl py-3 px-2 shadow-xs">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                        {isCa ? "DES DE" : "DESDE"}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#0f172a] font-mono tabular-nums whitespace-nowrap">
                        {new Intl.NumberFormat("es-ES").format(displayMin)}&nbsp;€
                      </span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl py-3 px-2 shadow-xs">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                        {isCa ? "FINS A" : "HASTA"}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#2563EB] font-mono tabular-nums whitespace-nowrap">
                        {new Intl.NumberFormat("es-ES").format(displayMax)}&nbsp;€
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-bold">
                    {metros} m² · {habitaciones} {isCa ? "habitacions" : "habitaciones"} · {estado === "reformado" ? "Reformado" : estado === "reformar" ? "A reformar" : "Buen estado"}
                  </p>
                </div>

                {/* 3 Indicadores de Mercado en Tarjetas Claras */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      {isCa ? "PREU M²" : "PRECIO M²"}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#0f172a] font-mono tabular-nums mt-0.5 block whitespace-nowrap">
                      {displayPricePerM2}&nbsp;€
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      {isCa ? "DEMANDA" : "DEMANDA"}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#2563EB] mt-0.5 block">
                      {result.demand}
                    </span>
                  </div>

                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      {isCa ? "VARIACIÓ" : "VARIACIÓN"}
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-600 mt-0.5 block">
                      {result.variation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón de Acción Principal y Sello de Confianza */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/34689438012?text=${contactText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-black text-sm sm:text-base px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 uppercase tracking-wider cursor-pointer"
                >
                  <span>{isCa ? "VULL UNA VALORACIÓ EXACTA" : "QUIERO UNA VALORACIÓN EXACTA"}</span>
                  <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                </a>

                <div className="flex items-center justify-center gap-2 text-center">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <p className="text-xs text-slate-600 font-bold">
                    {isCa
                      ? "Taxació presencial gratuïta per agents AICAT 5583 · Sense compromís"
                      : "Tasación presencial gratuita por agentes AICAT 5583 · Sin compromiso"}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
