import { useState } from 'react';
import { Building2, Check, Home, Users, ThumbsUp, Award, Calculator, Send, ChevronDown, MapPin, Search, Euro } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_desktop_opt.webp";
import heroBgMobileLcp from "@/assets/family_barcelona_mobile_lcp.webp";
import { translations } from './data/translations';
import MarqueeRibbon from '@/components/MarqueeRibbon';

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

function scrollToProperties(offset = 100) {
  const el = document.getElementById("propiedades");
  if (!el) return;
  const pos = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 90 : offset);
  window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
  window.history.replaceState(null, "", "#propiedades");
}

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

  const [heroMode, setHeroMode] = useState<"comprar" | "alquilar">("comprar");
  const [heroZona, setHeroZona] = useState("Cualquier zona");
  const [heroTipo, setHeroTipo] = useState("Cualquier tipo");
  const [heroPrecio, setHeroPrecio] = useState("Cualquier precio");
  const [heroOpenDrop, setHeroOpenDrop] = useState<"zona" | "tipo" | "precio" | null>(null);

  const precios = heroMode === "alquilar" ? PRECIOS_ALQUILER : PRECIOS_COMPRA;

  const handleHeroSearch = () => {
    onPerformSearch?.({ mode: heroMode, zona: heroZona, tipo: heroTipo, precio: heroPrecio });
    scrollToProperties();
  };

  const handleModeChange = (mode: "comprar" | "alquilar") => {
    setHeroMode(mode);
    setHeroPrecio("Cualquier precio"); // reset price when switching mode
  };

  // i18n labels
  const L = {
    searchTitle: language === "ca" ? "CERCAR HABITATGE" : language === "en" ? "FIND A HOME" : "BUSCAR VIVIENDA",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    anyArea: language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona",
    anyType: language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo",
    anyPrice: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: Users },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: ThumbsUp },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: Building2 },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: Award },
  ];

  const closeDrop = () => setHeroOpenDrop(null);

  return (
    <section
      id="hero"
      className="relative bg-[#F8FAFC] overflow-hidden flex flex-col"
      style={{ minHeight: "max(680px, calc(100svh))" }}
      onClick={closeDrop}
    >
      {/* ── PHOTO — RIGHT HALF (desktop) / TOP STRIP (mobile) ── */}
      {/* Desktop */}
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[50%] lg:w-[46%] xl:w-[44%] pointer-events-none">
        <img
          src={heroBgDesktop}
          alt="Pareja feliz con las llaves de su nuevo hogar"
          className="w-full h-full object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          width={850}
          height={1113}
        />
        {/* Feather left */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-44 lg:w-56 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent" />
        {/* Feather top */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F8FAFC]/60 to-transparent" />
        {/* Feather bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent" />
      </div>

      {/* Mobile photo — top-right strip */}
      <div className="sm:hidden absolute right-0 top-0 w-[56%] h-[44%] pointer-events-none overflow-hidden">
        <img
          src={heroBgMobileLcp}
          alt="Pareja feliz con las llaves de su nuevo hogar"
          className="w-full h-full object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          width={360}
          height={554}
        />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#F8FAFC]/50 to-transparent" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col max-w-[1360px] mx-auto w-full px-4 md:px-8 xl:px-12">

        {/* Header spacer */}
        <div className="h-[68px] sm:h-[78px] lg:h-[88px] shrink-0" />

        {/* ── ZONE 1: BRAND (left column) ── */}
        <div className="flex-1 flex flex-col justify-center pb-4 sm:pb-6 lg:pb-8">
          <div className="max-w-[54%] xs:max-w-[52%] sm:max-w-[48%] lg:max-w-[44%] xl:max-w-[42%]">

            {/* Badge */}
            <div className="mb-2.5 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-[23px] xs:text-[26px] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] font-black text-[#0b214a] tracking-tight leading-[1.08] mb-2.5 sm:mb-3 font-heading">
              {customHeadline ? customHeadline : (
                <>
                  <span className="block">
                    {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}
                  </span>
                  <span className="text-[#2563eb] block">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle — compact */}
            <p className="text-slate-700 text-[11px] xs:text-[12px] sm:text-[15px] md:text-base font-semibold leading-snug sm:leading-relaxed mb-3 sm:mb-4 max-w-xs sm:max-w-sm">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 max-w-[185px] sm:max-w-none">
              <a
                href="#formulario-contacto"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                  if (el) {
                    const pos = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 75 : 85);
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-center sm:justify-start gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-[10px] xs:text-[11px] sm:text-sm tracking-wide shadow-md cursor-pointer w-full sm:w-auto"
              >
                <Send className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnBudget || "Solicitar presupuesto"}</span>
              </a>
              <a
                href={customValuationHref || "#valuator-form"}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("valuator-card") || document.getElementById("valuator-form");
                  if (el) {
                    const pos = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 90 : 100);
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-extrabold text-[10px] xs:text-[11px] sm:text-sm tracking-wide shadow-sm cursor-pointer w-full sm:w-auto"
              >
                <Calculator className="w-3.5 h-3.5 text-[#2563eb] shrink-0 stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>
            </div>

            {/* Trust — avatars + text */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 shrink-0">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 border-2 border-white shadow-sm ring-1 ring-slate-300/40 overflow-hidden shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 text-white stroke-[3.5]" />
                </span>
                <span className="text-[10px] xs:text-[11px] sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {customTrustBadge || (
                    language === 'ca' ? "Més de 4.500 clients confien en Gesgrama"
                    : language === 'en' ? "Over 4,500 clients trust Gesgrama"
                    : "Más de 4.500 clientes confían en Gesgrama"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── ZONE 2: QUICK SEARCH — CENTRADO, PROTAGONISTA ── */}
        {/* ══════════════════════════════════════════════════════ */}
        <div
          className="w-full mb-3 sm:mb-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Centered card — max-w-3xl ensures it's a focused product widget */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.16)] overflow-visible">

            {/* Card top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 sm:pb-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {L.searchTitle}
                </span>
              </div>
              {/* Mode tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1 w-full sm:w-auto">
                {(["comprar", "alquilar"] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleModeChange(mode)}
                    className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                      heroMode === mode
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {mode === "comprar" ? L.buy : L.rent}
                  </button>
                ))}
              </div>
            </div>

            {/* ── DESKTOP FILTER ROW ── */}
            <div className="hidden sm:flex items-stretch gap-0 px-5 sm:px-7 py-4 sm:py-5">
              {/* ZONA */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "zona" ? null : "zona"); }}
                  className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-[#2563eb]/30 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">{L.area}</div>
                    <div className="text-[13px] font-extrabold text-[#0f172a] leading-tight truncate">
                      {heroZona === "Cualquier zona" ? L.anyArea : heroZona}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 mt-1 transition-transform ${heroOpenDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {heroOpenDrop === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-64 overflow-y-auto">
                    {ZONAS.map(z => (
                      <button key={z} type="button"
                        onClick={(e) => { e.stopPropagation(); setHeroZona(z); setHeroOpenDrop(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          heroZona === z ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {heroZona === z && <Check className="w-3 h-3 shrink-0 stroke-[2.5]" />}
                        {z === "Cualquier zona" ? L.anyArea : z}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-slate-100 mx-1 self-stretch my-2 shrink-0" />

              {/* TIPO */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "tipo" ? null : "tipo"); }}
                  className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-[#2563eb]/30 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <Home className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">{L.type}</div>
                    <div className="text-[13px] font-extrabold text-[#0f172a] leading-tight truncate">
                      {heroTipo === "Cualquier tipo" ? L.anyType : heroTipo}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 mt-1 transition-transform ${heroOpenDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {heroOpenDrop === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                    {TIPOS.map(tp => (
                      <button key={tp} type="button"
                        onClick={(e) => { e.stopPropagation(); setHeroTipo(tp); setHeroOpenDrop(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          heroTipo === tp ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {heroTipo === tp && <Check className="w-3 h-3 shrink-0 stroke-[2.5]" />}
                        {tp === "Cualquier tipo" ? L.anyType : tp}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-slate-100 mx-1 self-stretch my-2 shrink-0" />

              {/* PRECIO */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "precio" ? null : "precio"); }}
                  className="w-full h-full flex items-start gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-100 hover:border-[#2563eb]/30 hover:bg-blue-50/30 transition-all cursor-pointer group"
                >
                  <Euro className="w-4 h-4 text-[#2563eb] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">{L.price}</div>
                    <div className="text-[13px] font-extrabold text-[#0f172a] leading-tight truncate">
                      {heroPrecio === "Cualquier precio" ? L.anyPrice : heroPrecio}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 mt-1 transition-transform ${heroOpenDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {heroOpenDrop === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                    {precios.map(p => (
                      <button key={p} type="button"
                        onClick={(e) => { e.stopPropagation(); setHeroPrecio(p); setHeroOpenDrop(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          heroPrecio === p ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {heroPrecio === p && <Check className="w-3 h-3 shrink-0 stroke-[2.5]" />}
                        {p === "Cualquier precio" ? L.anyPrice : p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-slate-100 mx-1 self-stretch my-2 shrink-0" />

              {/* BUSCAR */}
              <div className="flex items-center pl-2 shrink-0">
                <button
                  type="button"
                  onClick={handleHeroSearch}
                  className="flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-8 py-3.5 rounded-2xl font-black text-[14px] tracking-wide transition-colors cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>{L.search}</span>
                </button>
              </div>
            </div>

            {/* ── MOBILE FILTERS ── */}
            <div className="sm:hidden px-4 pt-3 pb-5 space-y-3">
              {/* Zona — native select */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none z-10" />
                <select
                  value={heroZona}
                  onChange={(e) => setHeroZona(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-bold text-[#0f172a] cursor-pointer outline-none"
                >
                  {ZONAS.map(z => <option key={z} value={z}>{z === "Cualquier zona" ? L.anyArea : z}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {/* Tipo */}
              <div className="relative">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none z-10" />
                <select
                  value={heroTipo}
                  onChange={(e) => setHeroTipo(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-bold text-[#0f172a] cursor-pointer outline-none"
                >
                  {TIPOS.map(tp => <option key={tp} value={tp}>{tp === "Cualquier tipo" ? L.anyType : tp}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {/* Precio */}
              <div className="relative">
                <Euro className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none z-10" />
                <select
                  value={heroPrecio}
                  onChange={(e) => setHeroPrecio(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 focus:border-[#2563eb] rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-bold text-[#0f172a] cursor-pointer outline-none"
                >
                  {precios.map(p => <option key={p} value={p}>{p === "Cualquier precio" ? L.anyPrice : p}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {/* Buscar */}
              <button
                type="button"
                onClick={handleHeroSearch}
                className="w-full flex items-center justify-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 rounded-2xl font-black text-[15px] tracking-wide transition-colors cursor-pointer shadow-lg"
              >
                <Search className="w-5 h-5 shrink-0" />
                <span>{L.search}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── ZONE 3: TRUST BAR — COMPACT ── */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto w-full mb-3 sm:mb-4">
          {/* Desktop: horizontal with dividers */}
          <div className="hidden sm:flex items-center justify-between bg-[#0f172a]/[0.04] border border-slate-200/80 rounded-2xl px-2 py-3">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex items-center gap-2 px-5">
                    <Icon className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span className="text-[17px] xl:text-[19px] font-black text-[#0f172a] leading-none">{s.value}</span>
                    <span className="text-[11px] font-bold text-slate-500 leading-tight max-w-[80px]">{s.label}</span>
                  </div>
                  {i < STATS.length - 1 && <div className="w-px h-8 bg-slate-200 shrink-0" />}
                </div>
              );
            })}
          </div>
          {/* Mobile: 2x2 compact */}
          <div className="sm:hidden grid grid-cols-2 gap-2">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-xs">
                  <Icon className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div>
                    <div className="text-[16px] font-black text-[#0f172a] leading-none">{s.value}</div>
                    <div className="text-[9px] font-bold text-slate-500 mt-0.5 leading-tight">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── MARQUEE — full bleed ── */}
      <div className="w-full shrink-0">
        <MarqueeRibbon language={language} />
      </div>
    </section>
  );
}