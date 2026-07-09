import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Home, Building2, Warehouse, Trees, ArrowRight, Key, Phone, Star, X, Building, Award, Zap, CheckCircle2, Smile, ShieldCheck } from "lucide-react";

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
      <section className="relative w-full min-h-[100dvh] pt-[110px] md:pt-[130px] overflow-x-hidden bg-white"
        style={{ fontFamily: "var(--font-system)" }}
      >
        {/* Soft Radial Blue Glow Behind Right Section */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[120px] pointer-events-none hidden lg:block" />

        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-14 lg:px-[120px] flex flex-col items-start text-left z-10 pt-2 lg:pt-4 pb-14 lg:pb-[160px]">
          
          {/* =============================================================== */}
          {/* ── DESKTOP TOP SECTION ── */}
          {/* =============================================================== */}
          <div className="hidden md:block w-full max-w-[800px] lg:max-w-[550px] xl:max-w-[650px] z-20 mb-10 lg:mb-[72px] lg:pr-8 relative">
            
            {/* ── BADGE ── */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-2 font-bold text-[11px] md:text-xs text-primary-blue mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-blue"></span>
              Administración de fincas • Asesoría jurídica • Inmobiliaria
            </motion.div>

            {/* ── HEADLINE ── */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-onyx font-black leading-[1.05] tracking-tight text-[clamp(2.75rem,5vw,4.5rem)] mb-6">
              Encontramos tu <span className="text-primary-blue">hogar</span>.<br/>
              Nos ocupamos del resto.
            </motion.h1>

            {/* ── SUBTITLE ── */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-slate-500 font-medium text-lg md:text-xl max-w-md leading-relaxed mb-8">
              Gestionamos cada paso para que disfrutes de una compra, venta o administración sin preocupaciones.
            </motion.p>
          </div>

          {/* =============================================================== */}
          {/* ── MOBILE TOP SECTION (EDITORIAL APPLE STYLE) ── */}
          {/* =============================================================== */}
          <div className="md:hidden w-full flex flex-col items-start z-10 relative overflow-visible mt-2">
            
            {/* ── BADGE ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-1.5 font-semibold text-[10px] text-primary-blue mb-5 bg-slate-50 border border-slate-100/50 rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-blue"></span>
              Administración • Asesoría • Inmobiliaria
            </motion.div>

            {/* ── HEADLINE (Editorial & Dominant) ── */}
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="text-onyx font-black leading-[1.15] tracking-tight text-[clamp(2.1rem,9vw,2.75rem)] mb-5 w-full">
              Encontramos<br/>
              tu hogar.<br/>
              <span className="text-primary-blue">Del resto</span><br/>
              nos ocupamos.
            </motion.h1>

            {/* ── SUBTITLE (Respirado) ── */}
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-slate-500 font-medium text-[15px] leading-relaxed max-w-[280px] mb-8">
              Gestionamos cada paso para que disfrutes sin preocupaciones.
            </motion.p>
            
            {/* ── FOTOGRAFÍA (Arquitectura Integrada Edge-to-Edge) ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="w-[calc(100%+3rem)] -mx-6 aspect-[5/4] rounded-t-[3rem] mt-2 mb-0 relative z-10 overflow-hidden">
              <motion.img src={img2} alt="Familia feliz" 
                className="w-full h-full object-cover object-[80%_75%] origin-[80%_75%]" 
                style={{ filter: "contrast(0.95) saturate(1.05) brightness(1.02)" }} 
                animate={{ scale: [1.35, 1.38, 1.35] }} 
                transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }} 
              />
            </motion.div>

            {/* ── SUPER-WIDGET DE BÚSQUEDA (UX App-Native) ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="w-[calc(100%+1rem)] -mx-2 flex flex-col items-center relative z-20 -mt-10 mb-10">
              
              <div className="w-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[2rem] p-4 flex flex-col border border-slate-100">
                
                {/* SELECTOR SEGMENTADO INTEGRADO */}
                <div className="w-full bg-slate-50 p-1 rounded-[1.25rem] mb-3 flex relative h-[44px] border border-slate-100">
                  {(["comprar","alquilar"] as const).map(m => {
                    const isActive = mode === m;
                    return (
                      <button key={m} onClick={() => setMode(m)}
                        className={`flex-1 relative rounded-xl font-semibold tracking-wide transition-colors duration-300 focus:outline-none flex items-center justify-center h-full ${
                          isActive ? "text-onyx drop-shadow-sm bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] border border-slate-200/50" : "text-slate-500 hover:text-slate-800"
                        }`}>
                        {isActive && <motion.div layoutId="mobileActiveModeTab" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] border border-slate-200/50" />}
                        <span className="relative z-10 text-[13.5px] capitalize">{m}</span>
                      </button>
                    );
                  })}
                </div>

                {/* GRAN BOTÓN DE BÚSQUEDA */}
                <button onClick={() => setMobileSheetOpen(true)}
                  className="w-full flex items-center bg-slate-50 hover:bg-slate-100/70 rounded-[1.5rem] p-3.5 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-[1rem] bg-white shadow-sm flex items-center justify-center shrink-0 mr-4 border border-slate-100">
                    <Search className="w-5 h-5 text-primary-blue stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col items-start flex-1 overflow-hidden">
                    <span className="font-bold text-onyx text-[16px] tracking-wide mb-1">Comenzar búsqueda</span>
                    <span className="text-slate-400 font-medium text-[13px] truncate w-full text-left">Barcelona · Chalet · Precio</span>
                  </div>
                </button>
              </div>
            </motion.div>
            
          </div>
          {/* =============================================================== */}
          {/* ── END MOBILE ── */}
          {/* =============================================================== */}

            {/* ── SEARCH WIDGET (DESKTOP ONLY) ── */}
            <motion.div ref={barRef} id="search-widget-block"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`relative z-30 w-full max-w-[1200px] hidden md:flex flex-col transition-all duration-300 ease-in-out ${drop ? 'scale-[1.02]' : 'scale-100'} lg:-mt-[70px]`}
            >
              
              {/* ── PREMIUM SEGMENTED TABS (FLOATING) ── */}
              <div className="flex items-center bg-slate-100 p-2 rounded-[1.25rem] w-max mb-6 ml-8 relative z-30 shadow-inner border border-slate-200/80">
                {(["comprar","alquilar"] as const).map(m => {
                  const isActive = mode === m;
                  return (
                    <button key={m} onClick={() => setMode(m)}
                      className={`relative px-10 py-3 rounded-[1rem] font-bold tracking-wide transition-colors duration-300 focus:outline-none ${
                        isActive ? "text-onyx drop-shadow-sm" : "text-slate-500 hover:text-slate-800"
                      }`}>
                      {isActive && (
                        <motion.div layoutId="activeModeTab" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} className="absolute inset-0 bg-white rounded-[1rem] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)] border border-slate-200/50" />
                      )}
                      <span className="relative z-10 text-[15px] capitalize">{m}</span>
                    </button>
                  );
                })}
              </div>

              {/* The Widget Box */}
              <div className="w-full bg-white/90 backdrop-blur-3xl rounded-[2rem] overflow-visible pointer-events-auto shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] border border-white/60 transition-all duration-300 ease-out">

            {/* ── FIELDS ── */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 p-2 md:p-3">

              {/* ZONA */}
              <div className="col-span-2 relative flex-1" style={{flex:'1'}}>
                <button onClick={() => toggleDrop("zona")}
                  className={`w-full flex items-center gap-3 sm:gap-5 px-6 sm:px-8 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group rounded-[1.5rem] ${
                    drop === "zona" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-1 sm:mb-2">Localidad</div>
                    <div className={`text-sm sm:text-[15px] font-bold truncate ${zona === "Cualquier zona" ? "text-primary-blue" : "text-slate-900"}`}>
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
              <div className="col-span-1 relative" style={{flex:'1.3'}}>
                <button onClick={() => toggleDrop("tipo")}
                  className={`w-full flex items-center gap-3 sm:gap-5 px-6 sm:px-8 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group rounded-[1.5rem] ${
                    drop === "tipo" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-1 sm:mb-2">Tipo de inmueble</div>
                    <div className={`text-sm sm:text-[15px] font-bold truncate ${tipo === "Cualquier tipo" ? "text-primary-blue" : "text-slate-900"}`}>
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
              <div className="col-span-1 relative flex-1">
                <button onClick={() => toggleDrop("precio")}
                  className={`w-full flex items-center gap-3 sm:gap-5 px-6 sm:px-8 py-4 sm:py-6 transition-all duration-200 text-left focus:outline-none group rounded-[1.5rem] ${
                    drop === "precio" ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-1 sm:mb-2">
                      {mode === "alquilar" ? "Renta" : "Precio máx."}
                    </div>
                    <div className={`text-sm sm:text-[15px] font-bold truncate ${precio === prices[0] ? "text-primary-blue" : "text-slate-900"}`}>
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

                {/* Tooltip Removed */}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                  className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 lg:py-6 rounded-full bg-onyx text-white font-bold text-[13px] lg:text-[14px] tracking-[0.2em] uppercase overflow-hidden group focus:outline-none hover:bg-slate-800 transition-colors shadow-xl"
                >
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 stroke-[2.5]" />
                  <span className="relative z-10 tracking-widest">Buscar</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

            </div>

            {/* ── BOTTOM QUICK FILTERS ── */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 px-6 py-4 border-t border-slate-100 bg-white rounded-b-[2rem]">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400 shrink-0 w-full sm:w-auto text-center sm:text-left mb-1 sm:mb-0">Búsqueda rápida:</span>
              {["Eixample", "Gràcia", "Sant Antoni", "Pedralbes", "Sarrià-Sant Gervasi"].map(z => (
                <button key={z}
                  onClick={() => { setZona(z); handleSearch(); }}
                  className="px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase border border-slate-200 text-slate-500 bg-white hover:bg-onyx hover:text-white transition-colors">
                  {z}
                </button>
              ))}
            </div>

            {/* NO SECONDARY ACTIONS IN THIS MATCH */}
          </div>
        </motion.div>

          {/* ── TRUST INDICATORS ── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="w-full mt-6 hidden md:flex items-center justify-between max-w-[1000px] mx-auto text-slate-500 font-bold text-sm tracking-wide z-30 px-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-primary-blue stroke-[1.5]" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-onyx font-black text-lg">4.500</span>
                  <span className="text-slate-500 font-medium text-xs">clientes felices</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary-blue stroke-[1.5]" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-onyx font-black text-lg">+300</span>
                  <span className="text-slate-500 font-medium text-xs">comunidades</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Smile className="w-8 h-8 text-primary-blue stroke-[1.5]" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-onyx font-black text-lg">98%</span>
                  <span className="text-slate-500 font-medium text-xs">satisfacción</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary-blue stroke-[1.5]" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-onyx font-black text-lg">15+</span>
                  <span className="text-slate-500 font-medium text-xs">años de experiencia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Trust Indicators */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="w-full grid grid-cols-2 gap-3 md:hidden text-slate-500 font-medium text-[14px] mb-12 z-30 px-2">
            <div className="flex flex-col items-start gap-1 bg-white p-4 rounded-[1.25rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50/80"><div className="flex items-center gap-2 text-onyx font-black text-[18px] tracking-tight"><Star className="w-4 h-4 text-primary-blue fill-primary-blue/20" /> 4.500</div><span className="text-slate-400 font-medium text-[12px] leading-none">Clientes</span></div>
            <div className="flex flex-col items-start gap-1 bg-white p-4 rounded-[1.25rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50/80"><div className="flex items-center gap-2 text-onyx font-black text-[18px] tracking-tight"><Building2 className="w-4 h-4 text-primary-blue" /> +300</div><span className="text-slate-400 font-medium text-[12px] leading-none">Comunidades</span></div>
            <div className="flex flex-col items-start gap-1 bg-white p-4 rounded-[1.25rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50/80"><div className="flex items-center gap-2 text-onyx font-black text-[18px] tracking-tight"><Smile className="w-4 h-4 text-primary-blue" /> 98%</div><span className="text-slate-400 font-medium text-[12px] leading-none">Satisfacción</span></div>
            <div className="flex flex-col items-start gap-1 bg-white p-4 rounded-[1.25rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50/80"><div className="flex items-center gap-2 text-onyx font-black text-[18px] tracking-tight"><ShieldCheck className="w-4 h-4 text-primary-blue" /> 15+</div><span className="text-slate-400 font-medium text-[12px] leading-none">Experiencia</span></div>
          </motion.div>

        </div> {/* END MAIN CONTAINER */}

        {/* =============================================================== */}
        {/* ── BACKGROUND LAYERS (DESKTOP) ── */}
        {/* =============================================================== */}
        
        {/* DESKTOP BACKGROUND */}
        <div className="absolute right-0 top-[110px] w-[50%] h-[600px] z-0 hidden lg:block pointer-events-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}>
            <img src={img2} alt="Familia feliz en su nuevo hogar" className="absolute inset-0 w-full h-full object-cover object-[75%_30%] z-0" style={{ filter: "contrast(0.95) saturate(1.05) brightness(1.02)" }} />
            <div className="absolute inset-0 bg-[#FFECD2] mix-blend-overlay opacity-20 z-0 pointer-events-none" />
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
