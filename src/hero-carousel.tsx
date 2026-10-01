import React, { useState } from 'react';
import { Calculator, Send, Check, Search, MapPin, Building2, Euro, ChevronDown, Users, ThumbsUp, Award, Home } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_desktop_opt.webp";
import heroBgMobileLcp from "@/assets/family_barcelona_mobile_lcp.webp";
import { translations } from './data/translations';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
  customTag?: string;
  customHeadline?: React.ReactNode;
  customSubtitle?: string;
  customTrustBadge?: string;
  customValuationHref?: string;
}

const ZONAS = [
  "Cualquier zona",
  "Santa Rosa - Can Mariner",
  "Fondo",
  "Riu",
  "Centro",
  "El Raval",
  "Riera Alta - Llatí",
  "Singuerlín",
];

const TIPOS = [
  "Cualquier tipo",
  "Piso",
  "Apartamento",
  "Ático",
  "Chalet",
  "Local",
  "Oficina",
];

const PRECIOS_COMPRA = [
  "Cualquier precio",
  "Hasta 500.000 €",
  "Hasta 1.000.000 €",
  "Hasta 2.000.000 €",
];

const PRECIOS_ALQUILER = [
  "Cualquier precio",
  "Hasta 1.000 €",
  "Hasta 1.500 €",
  "Hasta 2.000 €",
];

export default function HeroCarousel({
  onPerformSearch,
  language = 'es',
  customTag,
  customHeadline,
  customSubtitle,
  customTrustBadge,
  customValuationHref,
}: HeroCarouselProps) {
  const t = translations[language];

  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Cualquier zona");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [precio, setPrecio] = useState("Cualquier precio");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | "precio" | null>(null);

  const precios = mode === "alquilar" ? PRECIOS_ALQUILER : PRECIOS_COMPRA;

  const handleModeChange = (newMode: "comprar" | "alquilar") => {
    setMode(newMode);
    setPrecio("Cualquier precio");
  };

  const handleSearch = () => {
    onPerformSearch?.({ mode, zona, tipo, precio });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 90 : 100;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  const L = {
    question: language === "ca" ? "Quin tipus de propietat cerques?" : language === "en" ? "What kind of property are you looking for?" : "¿Qué tipo de propiedad buscas?",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    searchBy: language === "ca" ? "Cercar per:" : language === "en" ? "Search by:" : "Buscar por:",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    anyArea: language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona",
    anyType: language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo",
    anyPrice: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users, dark: true },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp, dark: false },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2, dark: true },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award, dark: false },
  ];

  return (
    <header
      id="hero"
      className="relative bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-[#F8FAFC] text-slate-900 overflow-hidden pt-20 sm:pt-22 md:pt-24 lg:pt-26 pb-8 sm:pb-10 border-b border-slate-200/80"
      onClick={() => setOpenDrop(null)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        
        {/* ── SECCIÓN SUPERIOR: 2 COLUMNAS (MARCA + FOTOGRAFÍA) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Identidad y Marca */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Tag / Badge */}
            <div className="mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] px-3.5 py-1 rounded-full shadow-[0_4px_16px_rgba(37,99,235,0.32)] font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* Titular Principal H1 */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.6rem] lg:text-[3rem] font-black text-[#0b214a] tracking-tight leading-[1.08] mb-2.5 font-heading">
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block text-[#0b214a]">
                    {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}
                  </span>
                  <span className="text-[#2563eb] block mt-0.5">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtítulo limpio */}
            <p className="text-slate-700 text-xs sm:text-sm md:text-base font-bold leading-relaxed mb-4 max-w-xl text-balance">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            {/* CTAs Comerciales Directos */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-4 w-full sm:w-auto">
              <a
                href="#formulario-contacto"
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                  if (formEl) {
                    const navOffset = window.innerWidth < 768 ? 80 : 100;
                    const pos = formEl.getBoundingClientRect().top + window.scrollY - navOffset;
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                    window.history.replaceState(null, "", "#formulario-contacto");
                    const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                    if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_20px_rgba(37,99,235,0.3)] transition-all select-none"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnBudget || "Solicitar presupuesto"}</span>
              </a>

              <a
                href={customValuationHref || "#valuator-form"}
                onClick={(e) => {
                  e.preventDefault();
                  const targetEl = document.getElementById("valuator-card") || document.getElementById("valuator-form");
                  if (targetEl) {
                    const navOffset = window.innerWidth < 768 ? 90 : 110;
                    const pos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                    window.history.replaceState(null, "", "#valuator-form");
                    const inputEl = document.getElementById("valuator-zona-select") || targetEl.querySelector("select");
                    if (inputEl) setTimeout(() => (inputEl as HTMLElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all select-none"
              >
                <Calculator className="w-3.5 h-3.5 text-[#2563eb] stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>
            </div>

            {/* Social Trust: Clientes Reales */}
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1.5 shrink-0">
                {[1, 2, 3, 4].map(n => (
                  <img
                    key={n}
                    src={`/images/avatar-${n}.webp`}
                    alt="Cliente de Gesgrama"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-slate-200"
                    loading="lazy"
                    decoding="async"
                    width={28}
                    height={28}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-4 h-4 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                </span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                  {customTrustBadge || (
                    language === 'ca'
                      ? "Més de 4.500 clients confien en Gesgrama"
                      : language === 'en'
                      ? "Over 4,500 clients trust Gesgrama"
                      : "Más de 4.500 clientes confían en Gesgrama"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Fotografía Proporcional y Compacta */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-2 lg:mt-0">
            <div className="relative w-full max-w-[420px] lg:max-w-none rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_36px_rgba(15,23,42,0.14)] border-2 border-slate-900/10 bg-slate-100 aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[260px] sm:max-h-[300px] lg:max-h-[320px]">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz celebrando en su nuevo hogar con Gesgrama"
                  className="w-full h-full object-cover object-[center_20%] sm:object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#0f172a]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/15 shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider font-sans">Santa Coloma de Gramenet</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── SECCIÓN INMEDIATA CENTRAL: BUSCADOR RÁPIDO (Exacto a la composición de la referencia) ── */}
        <div className="mt-5 sm:mt-6 md:mt-7 max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-[22px] sm:rounded-[26px] border-2 border-slate-900/90 shadow-[0_12px_36px_rgba(15,23,42,0.10)] p-4 sm:p-5 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input superior tipo píldora interactiva */}
            <div className="relative mb-3 sm:mb-4">
              <div 
                onClick={handleSearch}
                className="w-full flex items-center bg-slate-50 border-2 border-slate-200 hover:border-[#2563eb] rounded-full px-5 py-3 sm:py-3.5 transition-all cursor-pointer shadow-inner group"
              >
                <Search className="w-5 h-5 text-red-500 shrink-0 mr-3 stroke-[2.5]" />
                <div className="w-full text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {zona !== "Cualquier zona" || tipo !== "Cualquier tipo" ? (
                    <span className="text-slate-900">
                      {[zona !== "Cualquier zona" && zona, tipo !== "Cualquier tipo" && tipo, mode === "comprar" ? L.buy : L.rent].filter(Boolean).join(" · ")}
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">{L.question}</span>
                  )}
                </div>
                <span className="hidden sm:inline-flex items-center text-[11px] font-black uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shrink-0 shadow-2xs group-hover:border-[#2563eb] transition-colors">
                  {mode === "comprar" ? L.buy : L.rent}
                </span>
              </div>
            </div>

            {/* Fila de controles Desktop */}
            <div className="hidden sm:flex items-center justify-between gap-2.5 pt-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest shrink-0 font-sans">
                {L.searchBy}
              </span>

              {/* Selector Comprar / Alquilar */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleModeChange("comprar")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                    mode === "comprar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{L.buy}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("alquilar")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                    mode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{L.rent}</span>
                </button>
              </div>

              {/* Dropdown Zona */}
              <div className="relative flex-1 max-w-[200px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDrop(openDrop === "zona" ? null : "zona");
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {zona === "Cualquier zona" ? L.area : zona}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {openDrop === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-60 overflow-y-auto">
                    {ZONAS.map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZona(z);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          zona === z ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {zona === z && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                        {z === "Cualquier zona" ? L.anyArea : z}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Tipo */}
              <div className="relative flex-1 max-w-[180px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDrop(openDrop === "tipo" ? null : "tipo");
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {tipo === "Cualquier tipo" ? L.type : tipo}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {openDrop === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                    {TIPOS.map((tp) => (
                      <button
                        key={tp}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTipo(tp);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          tipo === tp ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {tipo === tp && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                        {tp === "Cualquier tipo" ? L.anyType : tp}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Precio */}
              <div className="relative flex-1 max-w-[180px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDrop(openDrop === "precio" ? null : "precio");
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 hover:border-[#2563eb] bg-white transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Euro className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {precio === "Cualquier precio" ? L.price : precio}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {openDrop === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                    {precios.map((pr) => (
                      <button
                        key={pr}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPrecio(pr);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          precio === pr ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {precio === pr && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                        {pr === "Cualquier precio" ? L.anyPrice : pr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón Buscar */}
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg shrink-0 select-none"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>
            </div>

            {/* Formulario Mobile */}
            <div className="sm:hidden flex flex-col gap-2.5 pt-1">
              <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => handleModeChange("comprar")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    mode === "comprar" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600"
                  }`}
                >
                  {L.buy}
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("alquilar")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    mode === "alquilar" ? "bg-[#2563eb] text-white shadow-sm" : "text-slate-600"
                  }`}
                >
                  {L.rent}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                  <select
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-[#0f172a] outline-none"
                  >
                    {ZONAS.map((z) => (
                      <option key={z} value={z}>{z === "Cualquier zona" ? L.anyArea : z}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-[#0f172a] outline-none"
                  >
                    {TIPOS.map((tp) => (
                      <option key={tp} value={tp}>{tp === "Cualquier tipo" ? L.anyType : tp}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <Euro className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none" />
                  <select
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-8 py-2.5 text-xs font-bold text-[#0f172a] outline-none"
                  >
                    {precios.map((pr) => (
                      <option key={pr} value={pr}>{pr === "Cualquier precio" ? L.anyPrice : pr}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md mt-1 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN DE ESTADÍSTICAS / TRUST (Exacto a las 4 tarjetas de la referencia) ── */}
        <div className="mt-4 sm:mt-5 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div 
                  key={i} 
                  className={`rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col items-center justify-center text-center transition-all ${
                    s.dark 
                      ? "bg-[#0b1728] text-white shadow-sm border border-slate-800" 
                      : "bg-white text-[#0f172a] shadow-2xs border border-slate-200/90"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 ${
                    s.dark ? "bg-white/10 text-blue-400" : "bg-blue-50 text-[#2563eb]"
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-lg sm:text-xl font-black tracking-tight leading-none font-sans mb-1">
                    {s.value}
                  </div>
                  <div className={`text-[10px] sm:text-[11px] font-bold leading-tight font-sans ${
                    s.dark ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
}