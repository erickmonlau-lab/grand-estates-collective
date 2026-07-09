import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Home, Building2, Warehouse, Trees, ArrowRight, Key, Phone, Star, X, Building, Award, Zap, CheckCircle2 } from "lucide-react";

import img1 from "@/assets/premium_rental_apartment.webp";
import img2 from "@/assets/family_no_boy.jpg";

const images = [img1, img2];
const bgOrigins = ["origin-right", "origin-right"];

// Clases CSS personalizadas inyectadas en el componente para asegurar
// que se aplican las posiciones exactas sin depender del compilador de Tailwind.
const imageClasses = [
  "desktop-pos-right mobile-pos-couple",
  "desktop-pos-right mobile-pos-family"
];

const ZONES = [
  { label: "Cualquier zona",      count: null },
  { label: "Eixample",            count: 2 },
  { label: "Sarrià-Sant Gervasi", count: 1 },
  { label: "Gràcia",              count: 1 },
  { label: "Pedralbes",           count: 1 },
  { label: "Sant Antoni",         count: 1 },
];

const TIPOS = [
  { label: "Cualquier tipo",    icon: null,                              desc: null },
  { label: "Piso",              icon: <Home      className="w-4 h-4"/>,  desc: "Apartamento estándar" },
  { label: "Ático",             icon: <Building2 className="w-4 h-4"/>,  desc: "Última planta con vistas" },
  { label: "Chalet",            icon: <Trees     className="w-4 h-4"/>,  desc: "Casa independiente" },
  { label: "Local comercial",   icon: <Warehouse className="w-4 h-4"/>,  desc: "Espacio de negocio" },
];

const PRICES_COMPRAR  = [
  "Cualquier precio", "Hasta 200.000 €", "200.000 – 400.000 €",
  "400.000 – 700.000 €", "700.000 – 1.500.000 €", "Más de 1.500.000 €",
];
const PRICES_ALQUILAR = [
  "Cualquier precio", "Hasta 800 €/mes", "800 – 1.500 €/mes",
  "1.500 – 2.500 €/mes", "Más de 2.500 €/mes",
];

type Mode = "comprar" | "alquilar";
type Drop = "zona" | "tipo" | "precio" | null;

// ─── Mobile Search Wizard (Immersive Full-Screen) ───
function MobileSearchWizard({
  open, onClose,
  mode, setMode,
  zona, setZona,
  tipo, setTipo,
  precio, setPrecio,
  onSearch,
}: {
  open: boolean; onClose: () => void;
  mode: Mode; setMode: (m: Mode) => void;
  zona: string; setZona: (z: string) => void;
  tipo: string; setTipo: (t: string) => void;
  precio: string; setPrecio: (p: string) => void;
  onSearch: () => void;
}) {
  const [step, setStep] = useState(1);
  const prices = mode === "comprar" ? PRICES_COMPRAR : PRICES_ALQUILAR;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStep(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleZoneSelect = (z: string) => {
    setZona(z);
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => setStep(2), 300);
  };

  const handleTypeSelect = (t: string) => {
    setTipo(t);
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => setStep(3), 300);
  };

  const summaryText = step === 1 
    ? "" 
    : step === 2 
      ? `${mode === "comprar" ? "Comprar" : "Alquilar"} • ${zona !== "Cualquier zona" ? zona : "Zonas"}`
      : `${mode === "comprar" ? "Comprar" : "Alquilar"} • ${zona !== "Cualquier zona" ? zona : "Zonas"} • ${tipo !== "Cualquier tipo" ? tipo : "Tipos"}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] md:hidden bg-[#0f172a] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col"
        >
          {/* Top Nav */}
          <div className="relative z-10 flex flex-col p-6 pb-2">
            <div className="flex items-center justify-between mb-4">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors border border-white/10">
                  &lt; Volver
                </button>
              ) : (
                <div /> // placeholder for flex-between
              )}
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors border border-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Stepper */}
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
              <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
              <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-white' : 'bg-white/30'}`} />
            </div>

            {/* Breadcrumb Summary */}
            <AnimatePresence>
              {step > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-center"
                >
                  <span className="inline-block bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                    {summaryText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* H1 Titles */}
          <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white font-black text-4xl leading-tight text-balance drop-shadow-xl"
              >
                {step === 1 && "Elige tu zona"}
                {step === 2 && "Elige el tipo de inmueble"}
                {step === 3 && "Elige el precio que quieras"}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Bottom Sheet Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative z-10 bg-white rounded-t-[2rem] shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-300 h-[65dvh]"
          >
            {/* Scrollable Content */}
            <div className="overflow-y-auto overscroll-contain p-6 pb-28 flex-1">
              
              {/* ESTADO 1: ZONAS */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  {/* Mode tabs */}
                  <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-slate-200">
                    {(["comprar", "alquilar"] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => { setMode(m); if (navigator.vibrate) navigator.vibrate(10); }}
                        className={`flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wide uppercase transition-all ${
                          mode === m ? "bg-primary-blue text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {m === "comprar" ? "Comprar" : "Alquilar"}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {ZONES.map(z => {
                      const isSelected = zona === z.label;
                      return (
                        <button
                          key={z.label}
                          onClick={() => handleZoneSelect(z.label)}
                          className={`px-4 py-3 rounded-full text-[13px] font-bold border-2 transition-all duration-300 ${
                            isSelected
                              ? "bg-primary-blue text-white border-primary-blue shadow-lg shadow-primary-blue/30"
                              : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                          }`}
                        >
                          {z.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ESTADO 2: TIPO */}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {TIPOS.slice(1).map(t => { // exclude 'Cualquier tipo' to form 2x2 grid
                    const isSelected = tipo === t.label;
                    return (
                      <button
                        key={t.label}
                        onClick={() => handleTypeSelect(t.label)}
                        className={`aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-primary-blue bg-primary-blue/5 text-primary-blue shadow-lg shadow-primary-blue/20"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5] ${isSelected ? "text-primary-blue" : "text-slate-500"}`}>
                          {t.icon}
                        </div>
                        <span className="font-bold text-sm">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ESTADO 3: PRECIO */}
              {step === 3 && (
                <div className="flex flex-col gap-2 pb-24">
                  {prices.map(p => {
                    const isSelected = precio === p;
                    return (
                      <button
                        key={p}
                        onClick={() => { setPrecio(p); if (navigator.vibrate) navigator.vibrate(15); }}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all ${
                          isSelected
                            ? "bg-primary-blue text-white shadow-md shadow-primary-blue/30"
                            : "text-slate-900 bg-slate-100 border border-slate-200"
                        }`}
                      >
                        <span className="font-bold text-[15px]">{p}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-white bg-primary-blue" : "border-slate-300 bg-white"}`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky Footer CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none flex flex-col justify-end">
              <button
                onClick={() => { onSearch(); onClose(); }}
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-bold text-sm tracking-widest uppercase bg-onyx shadow-xl hover:bg-slate-800 transition-colors pointer-events-auto"
              >
                Buscar Inmuebles
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface HeroCarouselProps {
  onPerformSearch?: (params: { mode: Mode; zona: string; tipo: string; precio: string }) => void;
}

export default function HeroCarousel({ onPerformSearch }: HeroCarouselProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [mode,   setMode]   = useState<Mode>("comprar");
  const [drop,   setDrop]   = useState<Drop>(null);
  const [zona,   setZona]   = useState(ZONES[0].label);
  const [zonaSearch, setZonaSearch] = useState("");
  const [tipo,   setTipo]   = useState(TIPOS[0].label);
  const [precio, setPrecio] = useState(PRICES_COMPRAR[0]);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  // MOBILE: controls the bottom sheet
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload main background images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const t = setInterval(() => setImgIdx(p => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setPrecio(mode === "comprar" ? PRICES_COMPRAR[0] : PRICES_ALQUILAR[0]);
  }, [mode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (drop !== null) {
      setShowHint(false);
      setHasInteracted(true);
    } else if (hasInteracted) {
      timer = setTimeout(() => { setShowHint(true); }, 2500);
    } else {
      timer = setTimeout(() => { setShowHint(true); }, 6000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [drop, hasInteracted, zona, tipo, precio]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setDrop(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const prices = mode === "comprar" ? PRICES_COMPRAR : PRICES_ALQUILAR;
  const toggleDrop = (d: Drop) => setDrop(prev => prev === d ? null : d);

  const handleSearch = () => {
    setDrop(null);
    if (onPerformSearch) {
      onPerformSearch({ mode, zona, tipo, precio });
    }
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE SEARCH WIZARD ── (isolated, only renders on mobile) */}
      <MobileSearchWizard
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        mode={mode} setMode={setMode}
        zona={zona} setZona={setZona}
        tipo={tipo} setTipo={setTipo}
        precio={precio} setPrecio={setPrecio}
        onSearch={handleSearch}
      />

      {/*
        ── MOBILE & DESKTOP HERO (Premium SaaS Style) ──
      */}
      <section className="relative w-full min-h-[100dvh] pt-[120px] md:pt-[150px] pb-12 md:pb-24 overflow-x-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F7F9FC]"
        style={{ fontFamily: "var(--font-system)" }}
      >
        {/* Soft Radial Blue Glow Behind Right Section */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none hidden lg:block" />

        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-14 lg:px-[120px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20 z-10">
          
          {/* LEFT COLUMN: Text & Search */}
          <div className="flex-1 flex flex-col items-start text-left w-full max-w-[620px] mt-4 lg:mt-8 z-20">
            
            {/* ── BADGE ── */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut }}
              className="flex items-center gap-2.5 font-semibold bg-[#EEF6FF] border border-primary-blue/10 px-4 py-2 rounded-full text-[11px] md:text-[13px] text-primary-blue mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-blue"></span>
              </span>
              <span>Administración de fincas • Asesoría jurídica • Inmobiliaria</span>
            </motion.div>

            {/* ── HEADLINE ── */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
              className="text-onyx font-black leading-[1.05] tracking-tight text-[clamp(2.75rem,5vw,4.5rem)] mb-6">
              Encontramos tu <span className="text-primary-blue">hogar</span>.<br/>
              Nos ocupamos<br/> del resto.
            </motion.h1>

            {/* ── SUBTITLE ── */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="text-slate-500 font-medium text-lg md:text-xl max-w-md leading-relaxed mb-10">
              Gestionamos cada paso para que disfrutes de una compra, venta o administración sin preocupaciones.
            </motion.p>

            {/* ── CTAs (Primary & Secondary) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
              <button 
                onClick={() => {
                  if (onPerformSearch) onPerformSearch({ mode: "comprar", zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio" });
                  document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-[56px] md:h-[60px] px-8 rounded-full bg-primary-blue text-white font-bold text-[14px] tracking-wide shadow-[0_8px_20px_rgba(0,130,200,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,130,200,0.35)] transition-all duration-300">
                Explorar inmuebles
              </button>
              <a href="#contacto"
                className="h-[56px] md:h-[60px] px-8 rounded-full bg-white border border-slate-200 text-onyx font-bold text-[14px] tracking-wide hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-sm">
                Valorar mi vivienda
              </a>
            </motion.div>

            {/* Mobile search trigger (Since widget is hidden on mobile) */}
            <div className="w-full md:hidden flex flex-col mb-12">
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => setMobileSheetOpen(true)}
                className="w-full flex items-center justify-between bg-white border border-slate-200/80 text-slate-600 font-bold py-5 px-6 rounded-2xl text-[15px] shadow-sm hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-onyx stroke-[2.5]" />
                  Comenzar búsqueda...
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary-blue" />
                </div>
              </motion.button>
            </div>

            {/* ── SEARCH WIDGET (DESKTOP ONLY) ── */}
            <motion.div ref={barRef} id="search-widget-block"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
              className={`relative z-20 w-full hidden md:flex flex-col transition-all duration-300 ease-in-out ${drop ? 'scale-105' : 'scale-100'}`}
            >
              {/* The Widget Box */}
              <div className="w-full bg-white/70 backdrop-blur-2xl rounded-[2rem] overflow-visible pointer-events-auto shadow-[0_12px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-200/60 transition-all duration-300 ease-out">

            {/* ── BIG MODE TABS ── */}
            <div className="grid grid-cols-2 overflow-hidden rounded-t-[2rem]">
              {(["comprar","alquilar"] as const).map(m => {
                const isActive = mode === m;
                return (
                  <button key={m} onClick={() => setMode(m)}
                    className={`relative flex items-center justify-center gap-3 sm:gap-4 py-3 sm:py-6 font-bold tracking-[0.12em] uppercase transition-all duration-300 focus:outline-none overflow-hidden ${
                      isActive ? "text-onyx bg-white border-b-2 border-onyx" : "text-slate-400 bg-slate-50 border-b-2 border-transparent hover:text-slate-600"
                    }`}>
                    <span className="relative z-10 text-base">{m === "comprar" ? "Comprar" : "Alquilar"}</span>
                  </button>
                );
              })}
            </div>

            {/* ── FIELDS ── */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row">

              {/* ZONA */}
              <div className="col-span-2 relative flex-1 border-b sm:border-b-0 sm:border-r-2 border-slate-300" style={{flex:'1'}}>
                <button onClick={() => toggleDrop("zona")}
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "zona" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-slate-900 mb-0.5 sm:mb-1">Localidad</div>
                    <div className={`text-sm sm:text-base font-bold truncate ${zona === "Cualquier zona" ? "text-primary-blue" : "text-slate-900"}`}>
                      {zona}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${drop==="zona" ? "rotate-180 text-primary-blue" : "text-slate-300"}`} />
                </button>

                <AnimatePresence>
                  {drop === "zona" && (
                    <motion.div initial={{ opacity:0, y:8, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:.98 }}
                      transition={{ duration:.16, ease:"easeOut" }}
                      className="absolute bottom-full left-0 w-[300px] bg-white rounded-2xl border border-slate-100 shadow-[0_28px_70px_-8px_rgba(0,0,0,0.22)] z-50 mb-2 overflow-hidden flex flex-col max-h-[280px]">
                      <div className="px-3 pt-3 pb-2 border-b border-slate-100 shrink-0">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="Ej. Eixample, Gràcia..."
                            value={zonaSearch} onChange={e => setZonaSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all" autoFocus />
                        </div>
                      </div>
                      <div className="p-2 overflow-y-auto overscroll-contain">
                        {ZONES.filter(z => z.label.toLowerCase().includes(zonaSearch.toLowerCase())).map(z => {
                          const isSelected = zona === z.label;
                          return (
                            <button key={z.label} onClick={() => { setZona(z.label); setDrop(null); setZonaSearch(""); }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-xl transition-all group ${
                                isSelected
                                  ? "bg-primary-blue text-white shadow-md shadow-primary-blue/30"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                                  isSelected ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                                }`}>
                                  <MapPin className="w-4 h-4" />
                                </span>
                                <span className="font-bold text-sm">{z.label}</span>
                              </div>
                              {z.count !== null && (
                                <span className={`text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ${
                                  isSelected ? "bg-white text-primary-blue" : "bg-slate-100 text-slate-500"
                                }`}>{z.count}</span>
                              )}
                            </button>
                          );
                        })}
                        {ZONES.filter(z => z.label.toLowerCase().includes(zonaSearch.toLowerCase())).length === 0 && (
                          <div className="px-4 py-6 text-sm text-slate-500 text-center">No se encontraron zonas</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TIPO */}
              <div className="col-span-1 relative border-r sm:border-b-0 sm:border-r-2 border-slate-300" style={{flex:'1.3'}}>
                <button onClick={() => toggleDrop("tipo")}
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "tipo" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-slate-900 mb-0.5 sm:mb-1">Tipo de inmueble</div>
                    <div className={`text-sm sm:text-base font-bold truncate ${tipo === "Cualquier tipo" ? "text-primary-blue" : "text-slate-900"}`}>
                      {tipo}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${drop==="tipo" ? "rotate-180 text-primary-blue" : "text-slate-300"}`} />
                </button>

                <AnimatePresence>
                  {drop === "tipo" && (
                    <motion.div initial={{ opacity:0, y:8, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:.98 }}
                      transition={{ duration:.16, ease:"easeOut" }}
                      className="absolute bottom-full left-0 w-[310px] bg-white rounded-2xl border border-slate-100 shadow-[0_28px_70px_-8px_rgba(0,0,0,0.22)] z-50 mb-2 overflow-hidden flex flex-col max-h-[280px]">
                      <div className="px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
                        <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">Tipo de inmueble</div>
                      </div>
                      <div className="p-2 overflow-y-auto overscroll-contain">
                        {TIPOS.map(t => {
                          const isSelected = tipo === t.label;
                          return (
                            <button key={t.label} onClick={() => { setTipo(t.label); setDrop(null); }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-xl transition-all group ${
                                isSelected
                                  ? "bg-primary-blue text-white shadow-md shadow-primary-blue/30"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                                  isSelected ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                                }`}>
                                  {t.icon
                                    ? <span>{t.icon}</span>
                                    : <Search className="w-4 h-4" />
                                  }
                                </span>
                                <div className="text-left">
                                  <div className="text-sm font-bold">{t.label}</div>
                                  {t.desc && <div className={`text-[11px] mt-0.5 font-medium ${
                                    isSelected ? "text-white/75" : "text-slate-400"
                                  }`}>{t.desc}</div>}
                                </div>
                              </div>
                              {isSelected && (
                                <span className="ml-auto w-5 h-5 flex items-center justify-center shrink-0">
                                  <span className="w-2.5 h-2.5 rounded-full bg-white block"/>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PRECIO */}
              <div className="col-span-1 relative flex-1 border-b sm:border-b-0 sm:border-r-2 border-slate-300">
                <button onClick={() => toggleDrop("precio")}
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "precio" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-slate-900 mb-0.5 sm:mb-1">
                      {mode === "alquilar" ? "Renta" : "Precio máx."}
                    </div>
                    <div className={`text-sm sm:text-base font-bold truncate ${precio === prices[0] ? "text-primary-blue" : "text-slate-900"}`}>
                      {precio}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${drop==="precio" ? "rotate-180 text-primary-blue" : "text-slate-300"}`} />
                </button>

                <AnimatePresence>
                  {drop === "precio" && (
                    <motion.div initial={{ opacity:0, y:8, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:.98 }}
                      transition={{ duration:.16, ease:"easeOut" }}
                      className="absolute bottom-full left-0 right-0 bg-white rounded-2xl border border-slate-100 shadow-[0_28px_70px_-8px_rgba(0,0,0,0.22)] z-50 mb-2 overflow-hidden flex flex-col max-h-[280px]">
                      <div className="px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
                        <div className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
                          {mode === "alquilar" ? "Renta mensual" : "Precio máximo"}
                        </div>
                      </div>
                      <div className="p-2 overflow-y-auto overscroll-contain">
                        {prices.map((p, i) => {
                          const isSelected = precio === p;
                          const isDefault = i === 0;
                          return (
                            <button key={p} onClick={() => { setPrecio(p); setDrop(null); }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 mb-1 rounded-xl transition-all group ${
                                isSelected
                                  ? "bg-primary-blue text-white shadow-md shadow-primary-blue/30"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-all ${
                                  isSelected ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                                }`}>
                                  {isDefault ? "–" : "€"}
                                </span>
                                <span className="font-bold text-sm">{p}</span>
                              </div>
                              {isSelected && (
                                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <span className="w-2.5 h-2.5 rounded-full bg-white block"/>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BUSCAR */}
              <div className="col-span-2 flex items-center p-3 sm:p-4 relative">

                {/* Tooltip Hint — desktop only */}
                <AnimatePresence>
                  {showHint && drop === null && (
                    <motion.div
                      initial={{ opacity: 0, x: 20, scale: 0.9, rotate: -2 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotate: 2 }}
                      exit={{ opacity: 0, scale: 0.95, x: 10, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-4 hidden lg:flex flex-row items-center z-50 pointer-events-none"
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" className="text-slate-900/95 z-10 drop-shadow-md transform -rotate-12 translate-x-2">
                        <path d="M22 18 C16 18, 12 12, 4 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M4 12 L10 6 M4 12 L10 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="bg-slate-900/95 backdrop-blur-md text-white text-sm font-semibold py-3 px-5 rounded-2xl rounded-l-sm border border-slate-700/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] text-balance text-left min-w-[190px]">
                        Cuando ya lo tengas,<br/>
                        <span className="text-cyan-400 font-black">¡dale a buscar!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-6 bg-onyx text-white font-bold text-[10px] tracking-[0.2em] uppercase overflow-hidden group focus:outline-none border-l border-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <Search className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Buscar</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>

            </div>

            {/* ── BOTTOM QUICK FILTERS ── */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 px-6 py-4 border-t border-slate-200 bg-white">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400 shrink-0 w-full sm:w-auto text-center sm:text-left mb-1 sm:mb-0">Búsqueda rápida:</span>
              {["Eixample", "Gràcia", "Sant Antoni", "Pedralbes", "Sarrià-Sant Gervasi"].map(z => (
                <button key={z}
                  onClick={() => { setZona(z); handleSearch(); }}
                  className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-slate-200 text-slate-700 bg-white hover:bg-onyx hover:text-white transition-colors">
                  {z}
                </button>
              ))}
            </div>

            {/* Desktop "Ver Catálogo" Button */}
            <div className="w-full mt-4 flex justify-end">
              <button
                onClick={() => {
                  if (onPerformSearch) onPerformSearch({ mode: "comprar", zona: "Cualquiera", tipo: "Todos", precio: "Cualquier precio" });
                  document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-bold text-slate-500 hover:text-primary-blue transition-colors pr-2 group flex items-center gap-1"
              >
                Ver catálogo completo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

          {/* ── TRUST INDICATORS ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="w-full mt-10 hidden md:flex items-center gap-8 text-slate-500 font-semibold text-[13px] tracking-wide">
            <div className="flex items-center gap-2 text-onyx">
              <span className="text-primary-blue text-sm">★★★★★</span>
              4.500 clientes felices
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary-blue" />
              +300 comunidades
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-blue" />
              98% satisfacción
            </div>
          </motion.div>

        </div> {/* END LEFT COLUMN */}

        {/* RIGHT COLUMN: Image & Silhouette */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] lg:h-[700px] rounded-[2rem] overflow-hidden mt-8 lg:mt-0 shadow-2xl flex-shrink-0 z-20 hidden md:block">
          
          {/* White Lateral Gradient for blending */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F7F9FC] to-transparent z-10" />
          
          {/* Main Photo */}
          <img src={img2} alt="Familia feliz en su nuevo hogar" 
            className="absolute inset-0 w-full h-full object-cover object-[75%_30%] z-0" 
            style={{ filter: "contrast(0.9) saturate(1.1) brightness(1.05)" }}
          />
          
          {/* Warm Lighting overlay */}
          <div className="absolute inset-0 bg-[#FFECD2] mix-blend-overlay opacity-30 z-0" />
          
          {/* Blue Silhouette (Lucide Home as placeholder for logo watermark) */}
          <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
            <Home className="w-[500px] h-[500px] text-primary-blue stroke-[0.5]" />
          </div>
          
        </motion.div> {/* END RIGHT COLUMN */}

        {/* Mobile Trust Indicators */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="w-full flex md:hidden flex-wrap items-center justify-center gap-4 text-slate-500 font-semibold text-[13px] mt-8 z-20 pb-4">
          <div className="flex items-center gap-1.5 text-onyx"><span className="text-primary-blue text-sm">★★★★★</span> 4.500 clientes</div>
          <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-primary-blue" /> +300 comunidades</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary-blue" /> 98% satisfacción</div>
        </motion.div>

        </div>
      </section>



      {/* ── STATS (BELOW FOLD) ── */}
      {/*
        Punto 1: bg-slate-700 → gradiente navy corporativo #0F1E33 → #16294A
        Punto 2: Grid 2x2 en móvil, fila horizontal en desktop (md: sin cambios)
        Punto 3: Jerarquía visual consistente con barra de acento en primary-blue
        Punto 5: Todo derivado de --color-primary, contraste AA garantizado
      */}
      <section className="w-full z-10 relative py-16 md:py-24" style={{ background: "#8b8a91" }}>
        <div className="relative w-full max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { val: "4.500+", text: "sueños cumplidos con éxito en toda nuestra trayectoria" },
              { val: "98%",    text: "clientes totalmente satisfechos con nuestros servicios" },
              { val: "+300",   text: "comunidades gestionadas por nuestros expertos" },
              { val: "15+",    text: "años de experiencia en el sector inmobiliario" },
            ].map((s, i) => (
              <div key={i} className="bg-white border-2 border-onyx rounded-2xl p-5 md:p-8 flex flex-col items-start justify-start shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-onyx mb-2 md:mb-4 tracking-tighter truncate w-full">
                  {s.val}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-800 font-medium leading-snug">
                  {s.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
