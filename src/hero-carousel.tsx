import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Home, Building2, Warehouse, Trees, ArrowRight, Key, Phone, Star, X } from "lucide-react";

import img1 from "@/assets/dream_couple_offcenter_1783263799684.webp";
import img2 from "@/assets/dream_family_flipped.webp";

const images = [img1, img2];
const bgOrigins = ["origin-right", "origin-right"];
const imageClasses = [
  "object-right", // Couple: Push to the absolute right edge (100%)
  "object-right"  // Family (Flipped): Push to the absolute right edge (100%)
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

// ─── Mobile Search Bottom Sheet (completely isolated from desktop widget) ───
function MobileSearchSheet({
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
  const prices = mode === "comprar" ? PRICES_COMPRAR : PRICES_ALQUILAR;

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white rounded-t-[2rem] shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.25)] max-h-[90dvh] flex flex-col"
          >
            {/* Handle + Close */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto" />
            </div>
            <div className="flex items-center justify-between px-6 pb-3 shrink-0">
              <h2 className="font-black text-xl text-slate-900">Buscador de inmuebles</h2>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto overscroll-contain px-4 pb-8 flex flex-col gap-4">

              {/* Mode tabs */}
              <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-slate-200">
                {(["comprar", "alquilar"] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wide uppercase transition-all ${
                      mode === m
                        ? "bg-primary-blue text-white"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {m === "comprar" ? <Home className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                    {m === "comprar" ? "Comprar" : "Alquilar"}
                  </button>
                ))}
              </div>

              {/* Zona */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Localidad</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={zona}
                    onChange={e => setZona(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:border-primary-blue focus:outline-none appearance-none"
                  >
                    {ZONES.map(z => (
                      <option key={z.label} value={z.label}>{z.label}{z.count ? ` (${z.count})` : ""}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Tipo de inmueble</label>
                <div className="relative">
                  <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:border-primary-blue focus:outline-none appearance-none"
                  >
                    {TIPOS.map(t => (
                      <option key={t.label} value={t.label}>{t.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                  {mode === "alquilar" ? "Renta mensual" : "Precio máx."}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-base">€</span>
                  <select
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:border-primary-blue focus:outline-none appearance-none"
                  >
                    {prices.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Quick filters */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Búsqueda rápida</label>
                <div className="flex flex-wrap gap-2">
                  {["Eixample", "Gràcia", "Sant Antoni", "Pedralbes", "Sarrià-Sant Gervasi"].map(z => (
                    <button
                      key={z}
                      onClick={() => { setZona(z); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                        zona === z
                          ? "bg-primary-blue text-white border-primary-blue"
                          : "border-slate-200 text-slate-700 bg-white"
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => { onSearch(); onClose(); }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-base tracking-wide"
                style={{ background: "linear-gradient(135deg,#0082C8 0%,#004e8c 100%)", boxShadow: "0 12px 32px rgba(0,130,200,0.45)" }}
              >
                <Search className="w-5 h-5" />
                Buscar Inmuebles
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroCarousel() {
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
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE SEARCH BOTTOM SHEET ── (isolated, only renders on mobile via CSS) */}
      <MobileSearchSheet
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        mode={mode} setMode={setMode}
        zona={zona} setZona={setZona}
        tipo={tipo} setTipo={setTipo}
        precio={precio} setPrecio={setPrecio}
        onSearch={handleSearch}
      />

      {/*
        ── MOBILE & DESKTOP HERO: min-h-[100dvh] to prevent stats from peeking ──
      */}
      <section className="relative w-full flex flex-col items-center
        min-h-[100dvh] justify-center md:pt-20
        pt-[112px] pb-0 bg-slate-100 md:bg-transparent overflow-x-hidden"
        style={{ fontFamily: "var(--font-system)" }}
      >

        {/* ── BACKGROUND ── */}
        <div className="absolute top-0 inset-x-0 h-full md:h-[100dvh] z-0 pointer-events-none overflow-hidden bg-slate-900">
          <AnimatePresence mode="popLayout">
            <motion.img key={imgIdx} src={images[imgIdx]}
              initial={{ opacity: 0, scale: 1.18 }} animate={{ opacity: 1, scale: 1.14 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className={`absolute inset-0 w-full h-full object-cover ${bgOrigins[imgIdx]} ${imageClasses[imgIdx]}`} alt="" />
          </AnimatePresence>

          {/*
            MÓVIL — overlay con gradiente lineal robusto (CSS puro vía Tailwind).
            Blanco sólido solo hasta donde llega el texto (50%), y caída brusca a transparente (65%)
            para revelar a los sujetos al máximo.
          */}
          <div className="absolute inset-0 md:hidden bg-gradient-to-r from-white/100 from-50% to-transparent to-65%" />

          {/* Desktop Gradients & Blur — unchanged */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/5 to-white/95 hidden md:block" />
        </div>

        {/* ── HEADLINE BLOCK ── */}
        {/*
          PUNTO 4: En móvil quitamos min-h-[calc(100dvh-150px)] que forzaba un
          espacio enorme. Ahora es h-auto. En desktop se mantiene md:min-h-0
          (el centrado lo hace el flex del <section>).
        */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-start md:items-center text-left md:text-center pointer-events-none mb-0 md:mb-10 mt-4 md:mt-0">

          {/* Original Content (Fades out on desktop when a dropdown is open) */}
          <div className={`w-full flex flex-col items-start md:items-center transition-all duration-300 ease-in-out ${drop ? 'md:opacity-0 md:blur-md md:scale-95' : 'opacity-100 blur-0 scale-100'}`}>
            {/* ── EYEBROW ── */}
            {/* Desktop pill: fondo claro sobre imagen desenfocada */}
            <div className="hidden md:flex mb-6 flex-wrap justify-center items-center gap-3 font-bold bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-900 shadow-sm text-sm text-slate-900 normal-case w-max mx-auto">
              <span>Administración de fincas</span>
              <span className="text-primary-blue font-black">•</span>
              <span>Asesoría jurídica</span>
              <span className="text-primary-blue font-black">•</span>
              <span>Inmobiliaria</span>
            </div>
            {/* Mobile pill: tratamiento sólido blanco con halo/glow sutil (estilo DISET revertido) */}
            <div className="md:hidden mb-4 flex items-center gap-2 font-bold bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] px-4 py-2 rounded-full border border-white/50 text-[11px] text-slate-900 uppercase w-max"
                 style={{ fontFamily: "var(--font-system)", fontWeight: 700 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary-blue shadow-sm" />
              <span>Gestión Inmobiliaria Integral</span>
            </div>

            {/* ── HEADLINE ── */}
            <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.1, delay:.2 }} className="w-full">
              {/* Desktop Headline — unchanged */}
              <h1 className="hidden md:block text-slate-900 font-black leading-[1.12] tracking-tight text-center text-[clamp(1.9rem,4.2vw,3.8rem)]">
                Encontramos tu hogar.<br/>
                <span className="relative inline-block mt-2">
                  Nosotros nos ocupamos del resto.
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-[104%] h-6 -bottom-[22px] -left-[2%] text-primary-blue" viewBox="0 0 400 30" fill="none" preserveAspectRatio="none">
                    <path d="M 5 20 Q 100 5 200 15 T 395 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </h1>

              {/* Mobile headline — texto oscuro sobre overlay claro */}
              <h1 className="block md:hidden text-slate-900 font-black leading-[1.05] tracking-tight text-left text-[2.75rem]"
                  style={{ fontFamily: "var(--font-system)", fontWeight: 900 }}
              >
                Encontramos<br/>
                tu <span className="text-[#4db8ff]">hogar</span>.<br/>
                Nosotros nos<br/>
                ocupamos<br/>
                del resto.
              </h1>
            </motion.div>

            {/* ── MOTTO — texto oscuro sobre fondo claro ── */}
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.1, delay:.3 }}
              className="mt-4 md:mt-10 text-slate-800 md:text-slate-800 font-semibold md:font-bold text-base md:text-xl max-w-[280px] md:max-w-2xl leading-relaxed text-left md:text-center"
              style={{ fontFamily: "var(--font-system)", fontWeight: 700 }}
            >
              La tranquilidad de tu hogar, nuestra responsabilidad.
            </motion.p>

            {/* ── MOBILE CTA BUTTONS ── */}
            {/*
              pb-10: da respiro al final del hero, evitando que quede apretado
              contra la trust bar oscura de abajo.
            */}
            <div className="w-full md:hidden flex flex-col mt-6 pb-10 pointer-events-auto max-w-[280px]">
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.1, delay:.4 }} className="flex flex-col gap-3">
                {/* Botón primario */}
                <button
                  onClick={() => setMobileSheetOpen(true)}
                  className="bg-primary-blue text-white w-full py-3.5 rounded-full font-bold text-[15px] shadow-[0_8px_16px_-6px_rgba(0,130,200,0.5)] flex justify-center items-center gap-2"
                  style={{ fontFamily: "var(--font-system)", fontWeight: 700 }}
                >
                  <Search className="w-4 h-4" />
                  Buscar Inmuebles
                </button>
                {/* Botón secundario */}
                <button
                  onClick={() => window.location.href='tel:+34934685656'}
                  className="bg-white text-slate-900 w-full py-3.5 rounded-full font-bold text-[15px] shadow-lg flex justify-center items-center gap-2 hover:bg-white/90 transition-colors"
                  style={{ fontFamily: "var(--font-system)", fontWeight: 700 }}
                >
                  <Phone className="w-4 h-4"/> Llamar Ahora
                </button>
              </motion.div>
            </div>
          </div>

          {/* Dynamic Prompt (desktop only — fades in when a dropdown is open) */}
          <div className={`absolute inset-0 hidden md:flex transition-all duration-500 ease-in-out
            ${drop === 'tipo' ? 'justify-end items-center text-right md:pr-8' :
              drop === 'precio' ? 'justify-start items-center text-left md:pl-8' :
              'justify-center items-center text-center'}
            ${drop ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105 pointer-events-none justify-center items-center'}
          `}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight text-balance drop-shadow-sm transition-all duration-500 max-w-[450px]">
              {drop === "zona" && "Elige tu zona"}
              {drop === "tipo" && "Elige el tipo de inmueble"}
              {drop === "precio" && "Elige el precio que quieras"}
            </h2>
          </div>

        </div>

        {/*
          ── SEARCH WIDGET (DESKTOP ONLY) ──
          PUNTO 4: Hidden on mobile (hidden md:flex). The mobile bottom sheet
          handles search on small screens without creating whitespace in the
          document flow.
        */}
        <motion.div ref={barRef} id="search-widget-block"
          className="relative z-20 w-full max-w-[1160px] mx-auto px-4 md:px-0 md:py-0 md:mt-0 hidden md:flex flex-col justify-end"
          initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:.18 }}>

          {/* The Widget Box */}
          <div className="w-full bg-white rounded-[2rem] overflow-visible pointer-events-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 transition-all duration-300 ease-out">

            {/* ── BIG MODE TABS ── */}
            <div className="grid grid-cols-2 overflow-hidden rounded-t-[2rem]">
              {(["comprar","alquilar"] as const).map(m => {
                const isActive = mode === m;
                return (
                  <button key={m} onClick={() => setMode(m)}
                    className={`relative flex items-center justify-center gap-3 sm:gap-4 py-3 sm:py-6 font-bold tracking-[0.12em] uppercase transition-all duration-300 focus:outline-none overflow-hidden ${
                      isActive ? "text-white" : "text-white"
                    }`}
                    style={isActive ? {} : { background: '#1e293b', boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.25)' }}>
                    {isActive && (
                      <motion.div layoutId="tabBg" className="absolute inset-0"
                        style={{ background: "linear-gradient(135deg, #0082C8 0%, #0055a0 100%)" }}
                        transition={{ type:"spring", stiffness:380, damping:36 }} />
                    )}
                    <span className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all ${
                      isActive ? "bg-white shadow-white/30" : "bg-white shadow-black/10"
                    }`}>
                      {m === "comprar"
                        ? <Home className={`w-6 h-6 transition-colors ${isActive ? "text-primary-blue" : "text-slate-500"}`} />
                        : <Key  className={`w-6 h-6 transition-colors ${isActive ? "text-primary-blue" : "text-amber-500"}`} />
                      }
                    </span>
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
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-2 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "zona" ? "bg-cyan-50/50" : "hover:bg-slate-50/80"
                  }`}>
                  <div className={`w-12 h-12 rounded-2xl hidden sm:flex items-center justify-center shrink-0 transition-all ${drop==="zona" ? "bg-gradient-to-tr from-cyan-400 to-primary-blue shadow-lg shadow-primary-blue/30 text-white scale-105" : "bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100"}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
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
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-2 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "tipo" ? "bg-cyan-50/50" : "hover:bg-slate-50/80"
                  }`}>
                  <div className={`w-12 h-12 rounded-2xl hidden sm:flex items-center justify-center shrink-0 transition-all ${drop==="tipo" ? "bg-gradient-to-tr from-cyan-400 to-primary-blue shadow-lg shadow-primary-blue/30 text-white scale-105" : "bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100"}`}>
                    <Home className="w-6 h-6" />
                  </div>
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
                  className={`w-full flex items-center gap-2 sm:gap-4 px-4 sm:px-7 py-2 sm:py-6 transition-all duration-200 text-left focus:outline-none group ${
                    drop === "precio" ? "bg-cyan-50/50" : "hover:bg-slate-50/80"
                  }`}>
                  <div className={`w-12 h-12 rounded-2xl hidden sm:flex items-center justify-center shrink-0 font-black text-xl transition-all ${drop==="precio" ? "bg-gradient-to-tr from-cyan-400 to-primary-blue shadow-lg shadow-primary-blue/30 text-white scale-105" : "bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100"}`}>
                    €
                  </div>
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
                  whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}
                  onClick={handleSearch}
                  className="relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-5 rounded-2xl text-white font-bold text-base tracking-wide overflow-hidden group focus:outline-none"
                  style={{ background:"linear-gradient(135deg,#0082C8 0%,#004e8c 100%)", boxShadow:"0 12px 32px rgba(0,130,200,0.45)" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Search className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Buscar</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>

            </div>

            {/* ── BOTTOM QUICK FILTERS ── */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 px-6 py-4 border-t-2 border-slate-300 bg-slate-50/50 rounded-b-[2rem]">
              <span className="text-xs font-semibold text-slate-700 shrink-0 w-full sm:w-auto text-center sm:text-left mb-1 sm:mb-0">Búsqueda rápida:</span>
              {["Eixample", "Gràcia", "Sant Antoni", "Pedralbes", "Sarrià-Sant Gervasi"].map(z => (
                <button key={z}
                  onClick={() => { setZona(z); handleSearch(); }}
                  className="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 text-slate-700 bg-white hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-200 shadow-sm">
                  {z}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </section>

      {/*
        ── TRUST BADGES ──
        PROBLEMA 2: cambiado de azul-navy (#0a1829) a gris oscuro neutro (#1A1D23).
        Esto crea tres bloques claramente distintos en móvil:
          [foto/hero — blanco/foto] → [trust bar — gris casi negro] → [stats — navy azul]
        El azul solo aparece como acento en los iconos de cada badge, no como fondo.
      */}
      <div
        className="w-full z-10 relative py-3 px-4 flex justify-center overflow-hidden"
        style={{ background: "#1A1D23" }}
      >
        {/* Separador top: diferencia visualmente del hero blanco */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/[0.10]" />
        <div className="w-full max-w-5xl flex flex-wrap justify-center md:justify-between items-center gap-x-6 gap-y-2">
          {[
            { icon: "◆", label: "+300 comunidades" },
            { icon: "◆", label: "+15 años de trayectoria" },
            { icon: "⚡", label: "Respuesta en 24h" },
            { icon: "✓", label: "Equipo certificado" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 text-[11px] font-semibold tracking-wide">
              {/* Acento azul solo en el icono */}
              <span className="text-[13px] font-black" style={{ color: "#0082C8" }}>{b.icon}</span>
              <span className="text-white/65">{b.label}</span>
            </div>
          ))}
        </div>
        {/* Separador bottom: diferencia visualmente del navy oscuro de stats */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.06]" />
      </div>

      {/* ── STATS (BELOW FOLD) ── */}
      {/*
        Punto 1: bg-slate-700 → gradiente navy corporativo #0F1E33 → #16294A
        Punto 2: Grid 2x2 en móvil, fila horizontal en desktop (md: sin cambios)
        Punto 3: Jerarquía visual consistente con barra de acento en primary-blue
        Punto 5: Todo derivado de --color-primary, contraste AA garantizado
      */}
      <section
        className="w-full z-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F1E33 0%, #16294A 60%, #112038 100%)",
        }}
      >
        {/* Subtle grid texture — same pattern as CTA section in index.tsx */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Top edge glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0082C8]/40 to-transparent" />

        <div className="relative w-full max-w-5xl mx-auto px-4 py-10 md:py-14">

          {/* ── MOBILE: 2x2 grid ── */}
          <div className="grid grid-cols-2 md:hidden divide-x divide-y divide-white/[0.08]">
            {[
              { val: "4.500+", label: "Sueños\ncumplidos con éxito" },
              { val: "98%",    label: "Clientes\ntotalmente satisfechos" },
              { val: "+300",   label: "Comunidades\ngestionadas" },
              { val: "15+",    label: "Años de\nexperiencia" },
            ].map((s, i) => (
              <div key={s.val} className={`flex flex-col items-center text-center px-4 py-8 ${i >= 2 ? "" : ""}`}>
                <div className="text-4xl font-black text-white tracking-tighter leading-none mb-2">
                  {s.val}
                </div>
                <div className="text-[10px] font-bold text-[#7aafd4] tracking-[0.12em] uppercase leading-relaxed whitespace-pre-line mb-3">
                  {s.label}
                </div>
                <div className="w-6 h-[2px] rounded-full" style={{ background: "#0082C8" }} />
              </div>
            ))}
          </div>

          {/* ── DESKTOP: horizontal row — unchanged from before ── */}
          <div className="hidden md:flex flex-row justify-center items-center divide-x divide-white/[0.10]">
            {[
              { val: "4.500+", lines: ["Sueños", "cumplidos", "con éxito"] },
              { val: "98%",    lines: ["Clientes", "totalmente", "satisfechos"] },
              { val: "+300",   lines: ["Comunidades", "gestionadas"] },
              { val: "15+",    lines: ["Años de", "experiencia", "en el sector"] },
            ].map(s => (
              <div key={s.val} className="flex-1 flex flex-col items-center text-center px-6 py-2">
                <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">{s.val}</div>
                <div className="text-[11px] font-bold text-[#7aafd4] tracking-[0.12em] uppercase mt-3 mb-3 leading-relaxed">
                  {s.lines.map((l, i) => <span key={i}>{l}<br/></span>)}
                </div>
                <div className="w-8 h-[3px] rounded-full" style={{ background: "#0082C8" }} />
              </div>
            ))}
          </div>

        </div>

        {/* Bottom edge fade */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0082C8]/20 to-transparent" />
      </section>
    </>
  );
}
