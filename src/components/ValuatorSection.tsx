import { DrawnUnderline } from "@/components/DrawnUnderline";
import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Ruler, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ShieldCheck,
  Star,
  Building,
  TrendingUp,
  Activity,
  Layers
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
    const stats = ZONE_STATS_MAP[targetZona] || { pricePerM2: 2150, demand: "Alta", variation: "+3.8%" };
    let basePricePerM2 = stats.pricePerM2;

    // Multiplicador por estado
    const estadoMultipliers: Record<string, number> = {
      reformar: 0.85,
      bueno: 1.0,
      reformado: 1.15
    };
    basePricePerM2 *= (estadoMultipliers[targetEstado] || 1.0);

    // Ajuste por habitaciones
    const habBonus: Record<string, number> = {
      "1": -0.02,
      "2": 0.0,
      "3": 0.03,
      "4+": 0.05
    };
    basePricePerM2 *= (1 + (habBonus[targetHabitaciones] || 0));

    // Ajuste por extras
    let extrasBonus = 0;
    if (targetExtras.ascensor) extrasBonus += 0.06;
    if (targetExtras.terraza) extrasBonus += 0.05;
    if (targetExtras.parking) extrasBonus += 0.08;
    if (targetExtras.exterior) extrasBonus += 0.03;
    basePricePerM2 *= (1 + extrasBonus);

    const estimatedValue = Math.round(basePricePerM2 * targetMetros);
    const minValue = Math.round(estimatedValue * 0.94);
    const maxValue = Math.round(estimatedValue * 1.06);

    return {
      pricePerM2: Math.round(basePricePerM2),
      estimatedValue,
      minValue,
      maxValue,
      demand: stats.demand,
      variation: stats.variation,
      zoneName: targetZona
    };
  };

  const [result, setResult] = useState(() =>
    calculateValuation(zona, metros, habitaciones, estado, extras)
  );

  // Estados visuales animados
  const [displayMin, setDisplayMin] = useState(result.minValue);
  const [displayMax, setDisplayMax] = useState(result.maxValue);
  const [displayPricePerM2, setDisplayPricePerM2] = useState(result.pricePerM2);

  const animFrameRef = useRef<number | null>(null);

  const animateNumber = (
    startVal: number,
    endVal: number,
    setter: (val: number) => void,
    durationMs: number = 220
  ) => {
    if (shouldReduceMotion) {
      setter(endVal);
      return;
    }
    const startTime = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * ease);
      setter(current);
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      }
    };
    animFrameRef.current = requestAnimationFrame(frame);
  };

  const prevResultRef = useRef(result);

  useEffect(() => {
    const nextResult = calculateValuation(zona, metros, habitaciones, estado, extras);
    setResult(nextResult);

    const prev = prevResultRef.current;
    animateNumber(prev.minValue, nextResult.minValue, setDisplayMin, 220);
    animateNumber(prev.maxValue, nextResult.maxValue, setDisplayMax, 220);
    animateNumber(prev.pricePerM2, nextResult.pricePerM2, setDisplayPricePerM2, 180);

    prevResultRef.current = nextResult;

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [zona, metros, habitaciones, estado, extras, shouldReduceMotion]);

  const triggerCalculation = () => {
    setIsCalculatingValuation(true);
    setTimeout(() => {
      const nextResult = calculateValuation(zona, metros, habitaciones, estado, extras);
      setResult(nextResult);
      setDisplayMin(nextResult.minValue);
      setDisplayMax(nextResult.maxValue);
      setDisplayPricePerM2(nextResult.pricePerM2);
      setIsCalculatingValuation(false);
    }, 280);
  };

  const handleSliderChange = (newMetros: number) => {
    setMetros(newMetros);
  };

  const toggleExtra = (key: keyof typeof extras) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const contactText = encodeURIComponent(
    `Hola Gesgrama, he realizado una valoración en vuestra web para un piso en ${result.zoneName} de ${metros}m², ${habitaciones} habs (${estado}). Rango estimado: ${new Intl.NumberFormat("es-ES").format(result.minValue)} € - ${new Intl.NumberFormat("es-ES").format(result.maxValue)} €. Me gustaría agendar una valoración presencial técnica.`
  );

  return (
    <section 
      id="calculadora-valoracion" 
      className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] relative overflow-hidden font-sans border-y-2 border-[#111111] scroll-mt-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* ── CABECERA EDITORIAL NEO-BRUTALIST ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-[#111111]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[14px] sm:text-[15px] font-headline font-black tracking-widest uppercase px-4 py-2 rounded-none neo-shadow-sm mb-4">
              <span className="w-2 h-2 bg-[#2860F5] inline-block"></span>
              <span>{isCa ? "VALORACIÓ DE MERCAT · SANTA COLOMA" : isEn ? "REAL ESTATE VALUATION · SANTA COLOMA" : "VALORACIÓN DE MERCADO · SANTA COLOMA"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-headline font-black text-[#111111] tracking-tight leading-[1.1]">
              {isCa ? (
                <>¿Quant val el teu habitatge a <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">Santa Coloma</span>?</>
              ) : isEn ? (
                <>How much is your home worth in <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">Santa Coloma</span>?</>
              ) : (
                <>¿Cuánto vale tu vivienda en <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">Santa Coloma</span>?</>
              )}
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-[17px] sm:text-[18px] text-[#111111] font-bold leading-relaxed bg-white p-5 border-2 border-[#111111] neo-shadow-sm">
              {isCa
                ? "Calcula en 1 minut l'estimació real de mercat basada en transaccions notarials recents als 14 barris oficials de la ciutat."
                : "Calcula en 1 minuto la estimación real de mercado basada en transacciones notariales recientes en los 14 barrios oficiales de la ciudad."}
            </p>
          </div>
        </div>

        {/* ── DOS BLOQUES DIFERENCIADOS NEO-BRUTALIST (58% Blanco / 42% Azul #2860F5) ── */}
        {/* ── CONTENEDOR INTEGRADO ÚNICO NEO-BRUTALIST (MARCO BLANCO 2PX NEGRO + SOMBRA 4PX) ── */}
        <div className="bg-[#FFFFFF] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-3 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* PANEL IZQUIERDO: FORMULARIO TÉCNICO (58% -> lg:col-span-7) */}
            <div className="lg:col-span-7 bg-[#FFFFFF] text-[#111111] flex flex-col justify-between pr-0 lg:pr-2">
            <div className="space-y-6">
              
              {/* 1. Selector de Barrio de Santa Coloma */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="valuator-zona-select" className="text-[16px] sm:text-[18px] md:text-[19px] font-headline font-black uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2860F5]" />
                    <span>{isCa ? "BARRI DE SANTA COLOMA" : "BARRIO DE SANTA COLOMA"}</span>
                  </label>
                  <span className="text-[12px] sm:text-[14px] font-headline font-black text-white bg-[#111111] px-2.5 sm:px-3 py-1 border-2 border-[#111111] shrink-0">
                    14 BARRIS OFICIALS
                  </span>
                </div>
                
                <div className="relative bg-[#FFFFFF] border-2 border-[#111111] neo-shadow-sm p-3.5 flex items-center justify-between">
                  <select
                    id="valuator-zona-select"
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-[19px] sm:text-[20px] font-headline font-black text-[#111111] focus:ring-0 appearance-none cursor-pointer outline-none leading-normal"
                  >
                    {SANTA_COLOMA_14_BARRIOS.map((b) => (
                      <option key={b.name} value={b.name} className="py-1">
                        {b.name} — {b.pricePerM2} €/m² ({b.demand} demanda)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#111111] pointer-events-none shrink-0 stroke-[2.5]" />
                </div>
              </div>

              {/* 2. Superficie m² con Slider y Controles */}
              <div>
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 mb-3">
                  <label htmlFor="valuator-m2-input" className="text-[17px] sm:text-[19px] md:text-[20px] font-headline font-black uppercase tracking-wider text-[#111111] flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border-2 border-[#111111] shadow-[1px_1px_0px_#111111]">
                      <Ruler className="w-4 h-4 text-white stroke-[2.5]" />
                    </span>
                    <span className="whitespace-nowrap">{isCa ? "SUPERFÍCIE" : "SUPERFICIE"}</span>
                    <span className="whitespace-nowrap">{isCa ? "CONSTRUÏDA" : "CONSTRUIDA"}</span>
                  </label>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.max(30, metros - 5))}
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FFFFFF] hover:bg-slate-100 text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-headline font-black flex items-center justify-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-xl sm:text-2xl"
                      aria-label="Restar 5 metros"
                    >
                      -
                    </button>
                    
                    <div className="bg-[#FFFFFF] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] px-2 sm:px-3 py-1 flex items-center gap-1 min-w-[74px] sm:min-w-[84px] justify-center">
                      <input
                        id="valuator-m2-input"
                        type="number"
                        min="30"
                        max="250"
                        value={metros}
                        onChange={(e) => handleSliderChange(Math.max(20, Math.min(300, parseInt(e.target.value) || 30)))}
                        className="w-10 sm:w-12 text-center text-[19px] sm:text-[21px] font-data-mono font-black text-[#111111] border-none p-0 focus:ring-0 outline-none"
                      />
                      <span className="text-[15px] font-headline font-bold text-[#2860F5]">m²</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSliderChange(Math.min(250, metros + 5))}
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-[#FFFFFF] hover:bg-slate-100 text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] font-headline font-black flex items-center justify-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-xl sm:text-2xl"
                      aria-label="Sumar 5 metros"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Range Slider estilo técnico con barra gruesa y referencias 16-18px */}
                <div className="mt-3.5 mb-1">
                  <div className="relative flex items-center py-1">
                    <input
                      type="range"
                      min="30"
                      max="220"
                      step="5"
                      value={metros}
                      onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #2860F5 0%, #2860F5 ${Math.min(100, Math.max(0, ((metros - 30) / (220 - 30)) * 100))}%, #E3E0E8 ${Math.min(100, Math.max(0, ((metros - 30) / (220 - 30)) * 100))}%, #E3E0E8 100%)`
                      }}
                      className="neo-range-slider"
                      aria-label="Superficie construida en metros cuadrados"
                    />
                  </div>

                  {/* Referencias: tamaño 16px mínimo, negro #111111, JetBrains Mono tabular, activo 18px en azul corporativo */}
                  <div className="flex justify-between items-center text-[15px] sm:text-[16px] font-data-mono font-bold text-[#111111] mt-2 px-0.5 select-none">
                    {[
                      { val: 30, label: "30 m²" },
                      { val: 75, label: "75 m²" },
                      { val: 120, label: "120 m²" },
                      { val: 160, label: "160 m²" },
                      { val: 220, label: "220+ m²" }
                    ].map((step) => {
                      const isClosest = Math.abs(metros - step.val) <= (step.val === 220 ? 30 : 20);
                      return (
                        <button
                          key={step.val}
                          type="button"
                          onClick={() => handleSliderChange(step.val)}
                          className={`cursor-pointer transition-all ${
                            isClosest
                              ? "text-[17px] sm:text-[18px] font-black text-[#2860F5] underline decoration-2 underline-offset-4"
                              : "text-[#111111] hover:text-[#2860F5]"
                          }`}
                        >
                          {step.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Habitaciones y Estado en 2 Columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Habitaciones */}
                <div>
                  <span className="block text-[18px] sm:text-[19px] font-headline font-black uppercase tracking-wider text-[#111111] mb-2.5">
                    {isCa ? "HABITACIONS" : "HABITACIONES"}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {["1", "2", "3", "4+"].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHabitaciones(h)}
                        className={`h-[58px] sm:h-[60px] border-2 border-[#111111] rounded-xl font-headline font-black text-[19px] sm:text-[20px] transition-all cursor-pointer flex items-center justify-center ${
                          habitaciones === h
                            ? "bg-[#2860F5] text-white neo-shadow-sm translate-x-[-1px] translate-y-[-1px]"
                            : "bg-[#FFFFFF] text-[#111111] hover:bg-slate-100"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <span className="block text-[18px] sm:text-[19px] font-headline font-black uppercase tracking-wider text-[#111111] mb-2.5">
                    {isCa ? "ESTAT DE LA VIVENDA" : "ESTADO DE LA VIVIENDA"}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "reformar", label: isCa ? "A reformar" : "A reformar" },
                      { key: "bueno", label: isCa ? "Bon estat" : "Buen estado" },
                      { key: "reformado", label: isCa ? "Reformat" : "Reformado" }
                    ].map((st) => (
                      <button
                        key={st.key}
                        type="button"
                        onClick={() => setEstado(st.key as any)}
                        className={`h-[58px] sm:h-[60px] px-2 border-2 border-[#111111] rounded-xl font-headline font-black text-[16px] sm:text-[17px] transition-all cursor-pointer flex items-center justify-center text-center leading-tight ${
                          estado === st.key
                            ? "bg-[#2860F5] text-white neo-shadow-sm translate-x-[-1px] translate-y-[-1px]"
                            : "bg-[#FFFFFF] text-[#111111] hover:bg-slate-100"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Extras de la Vivienda */}
              <div>
                <span className="block text-[18px] sm:text-[19px] font-headline font-black uppercase tracking-wider text-[#111111] mb-2.5">
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
                        className={`h-[58px] px-3.5 sm:px-4 border-2 border-[#111111] rounded-xl text-[16px] sm:text-[17px] font-headline font-black transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? "bg-[#2860F5] text-white neo-shadow-sm translate-x-[-1px] translate-y-[-1px]"
                            : "bg-[#FFFFFF] text-[#111111] hover:bg-slate-100"
                        }`}
                      >
                        <span>{chip.label}</span>
                        <span className={`w-5 h-5 border-2 border-[#111111] flex items-center justify-center text-[13px] font-black shrink-0 ${isChecked ? "bg-white text-[#111111]" : "bg-[#FAF9FC] text-transparent"}`}>
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Botón Principal Sólido «CALCULAR VALORACIÓN AHORA» */}
            <div className="pt-6 mt-6 border-t-2 border-[#111111]">
              <button
                type="button"
                onClick={() => triggerCalculation()}
                disabled={isCalculatingValuation}
                className="w-full h-[60px] sm:h-[64px] neo-btn-primary font-headline font-black text-[18px] sm:text-[19px] px-6 cursor-pointer flex items-center justify-center gap-3 uppercase tracking-wider disabled:opacity-80 shadow-[3px_3px_0px_#111111]"
              >
                <Sparkles className="w-5 h-5 text-white shrink-0" />
                <div className="flex items-center justify-center gap-3 w-full">
                  <span>
                    {isCalculatingValuation
                      ? isCa ? "CALCULANT ESTIMACIÓ..." : "CALCULANDO ESTIMACIÓN..."
                      : isCa ? "CALCULAR VALORACIÓ ARA" : "CALCULAR VALORACIÓN AHORA"}
                  </span>
                  {!isCalculatingValuation && (
                    <ArrowRight className="w-6 h-6 text-white shrink-0 stroke-[2.5]" />
                  )}
                </div>
              </button>
            </div>
          </div>

            {/* PANEL DERECHO: RESULTADO (Fondo Azul Corporativo Sólido #2860F5 -> 42% -> lg:col-span-5) */}
            <div className="lg:col-span-5 bg-[#2860F5] text-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            
            {/* Loading Overlay */}
            {isCalculatingValuation && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#2860F5] border-2 border-[#111111] transition-opacity duration-200">
                <div className="w-10 h-10 border-4 border-white border-t-[#111111] animate-spin mb-3" />
                <span className="text-[14px] font-headline font-black text-white tracking-widest uppercase">
                  {isCa ? "ACTUALITZANT VALORACIÓ..." : "ACTUALIZANDO VALORACIÓN..."}
                </span>
              </div>
            )}

            <div>
              {/* Encabezado: Texto blanco con icono de verificación */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white text-[#111111] border border-[#111111] flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-[16px] sm:text-[17px] font-headline font-black uppercase tracking-wider text-white">
                    {isCa ? "VALORACIÓ DE MERCAT" : "VALORACIÓN DE MERCADO"}
                  </span>
                </div>
                
                <span className="text-[16px] sm:text-[17px] font-headline font-black text-white bg-[#111111] px-3.5 py-1.5 border-2 border-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2860F5] shrink-0" />
                  <span>{result.zoneName}</span>
                </span>
              </div>

              {/* Precio Estimado: Dos columnas limpias DESDE - HASTA */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start">
                  <div className="bg-white text-[#111111] border-2 border-[#111111] rounded-xl p-2.5 sm:p-3.5 neo-shadow-sm min-w-0 overflow-hidden">
                    <span className="text-[14px] sm:text-[15px] font-headline font-black uppercase tracking-wider text-slate-700 block mb-1 text-center">
                      {isCa ? "DES DE" : "DESDE"}
                    </span>
                    <span className="text-[19px] xs:text-[22px] sm:text-[27px] xl:text-[30px] font-data-mono font-black text-[#111111] whitespace-nowrap block leading-tight tracking-tight text-center truncate">
                      {new Intl.NumberFormat("es-ES").format(displayMin)}&nbsp;€
                    </span>
                  </div>

                  <div className="bg-white text-[#111111] border-2 border-[#111111] rounded-xl p-2.5 sm:p-3.5 neo-shadow-sm min-w-0 overflow-hidden">
                    <span className="text-[14px] sm:text-[15px] font-headline font-black uppercase tracking-wider text-slate-700 block mb-1 text-center">
                      {isCa ? "FINS A" : "HASTA"}
                    </span>
                    <span className="text-[19px] xs:text-[22px] sm:text-[27px] xl:text-[30px] font-data-mono font-black text-[#111111] whitespace-nowrap block leading-tight tracking-tight text-center truncate">
                      {new Intl.NumberFormat("es-ES").format(displayMax)}&nbsp;€
                    </span>
                  </div>
                </div>

                {/* Resumen Inmueble Exactamente Sincronizado */}
                <div className="mt-4 p-3 bg-[#111111] text-white border-2 border-[#111111] rounded-xl">
                  <p className="text-[15px] sm:text-[16px] font-headline font-black leading-snug text-center">
                    {metros} m² · {habitaciones} {isCa ? "habs" : "habs"} · {estado === "reformado" ? "Reformado" : estado === "reformar" ? "A reformar" : "Buen estado"} · {result.zoneName}
                  </p>
                </div>
              </div>

              {/* Indicadores de Mercado: Superficies Técnicas con Bordes y Mono */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                <div className="bg-white text-[#111111] border-2 border-[#111111] rounded-xl p-2 sm:p-3 text-center flex flex-col items-center justify-center neo-shadow-sm min-w-0 overflow-hidden">
                  <span className="text-[11px] sm:text-[14px] font-headline font-black text-slate-700 uppercase tracking-wider block truncate">
                    {isCa ? "PREU M²" : "PRECIO M²"}
                  </span>
                  <span className="text-[16px] sm:text-[22px] font-data-mono font-black text-[#111111] mt-0.5 block whitespace-nowrap">
                    {displayPricePerM2}&nbsp;€
                  </span>
                </div>

                <div className="bg-white text-[#111111] border-2 border-[#111111] rounded-xl p-2 sm:p-3 text-center flex flex-col items-center justify-center neo-shadow-sm min-w-0 overflow-hidden">
                  <span className="text-[11px] sm:text-[14px] font-headline font-black text-slate-700 uppercase tracking-wider block truncate">
                    {isCa ? "DEMANDA" : "DEMANDA"}
                  </span>
                  <span className="text-[16px] sm:text-[22px] font-headline font-black text-[#111111] mt-0.5 block">
                    {result.demand}
                  </span>
                </div>

                <div className="bg-white text-[#111111] border-2 border-[#111111] rounded-xl p-2 sm:p-3 text-center flex flex-col items-center justify-center neo-shadow-sm min-w-0 overflow-hidden">
                  <span className="text-[11px] sm:text-[14px] font-headline font-black text-slate-700 uppercase tracking-wider block truncate">
                    {isCa ? "VARIACIÓ" : "VARIACIÓN"}
                  </span>
                  <span className="text-[16px] sm:text-[22px] font-data-mono font-black text-[#16A34A] mt-0.5 block">
                    {result.variation}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA de Valoración Exacta: Botón Blanco con Bordes Negros y Sombra Neo */}
            <div className="space-y-3 pt-4 border-t-2 border-white/30">
              <a
                href={`https://wa.me/34689438012?text=${contactText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[64px] sm:h-[66px] bg-[#FFFFFF] hover:bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black text-[16px] sm:text-[17px] md:text-[17.5px] px-4 sm:px-6 transition-all flex items-center justify-between uppercase tracking-wider cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span className="flex-1 text-center whitespace-normal sm:whitespace-nowrap">
                  {isCa ? "VULL UNA VALORACIÓ EXACTA" : "QUIERO UNA VALORACIÓN EXACTA"}
                </span>
                <ArrowRight className="w-6 h-6 text-[#2860F5] shrink-0 stroke-[2.5] ml-2" />
              </a>

              <div className="flex items-center justify-center gap-2.5 text-white text-[14px] sm:text-[15px] font-bold pt-1.5 leading-snug text-center">
                <ShieldCheck className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                <span>
                  {isCa
                    ? "Informe tècnic presencial per pèrit col·legiat a Santa Coloma"
                    : "Informe técnico presencial por perito colegiado en Santa Coloma"}
                </span>
              </div>
            </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
