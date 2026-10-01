import { useState } from 'react';
import { Building2, Check, Home, Users, ThumbsUp, Award, Calculator, Send, ChevronDown, MapPin, Search, Star } from "lucide-react";
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

function scrollToProperties() {
  const el = document.getElementById("propiedades");
  if (!el) return;
  const navOffset = window.innerWidth < 768 ? 90 : 100;
  const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
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
  const [heroOpenDrop, setHeroOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const getZonaLabel = (v: string) =>
    v === "Cualquier zona"
      ? (language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona")
      : v;

  const getTipoLabel = (v: string) =>
    v === "Cualquier tipo"
      ? (language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo")
      : v;

  const handleHeroSearch = () => {
    onPerformSearch?.({ mode: heroMode, zona: heroZona, tipo: heroTipo, precio: "Cualquier precio" });
    scrollToProperties();
  };

  const handleQuickMode = (mode: "comprar" | "alquilar") => {
    setHeroMode(mode);
    onPerformSearch?.({ mode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio" });
    scrollToProperties();
  };

  const searchLabel = language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar";
  const buyLabel = language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar";
  const rentLabel = language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar";
  const zonaLabel = language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona";
  const tipoLabel = language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo";
  const findLabel = language === "ca" ? "CERCAR HABITATGE" : language === "en" ? "FIND A HOME" : "BUSCAR VIVIENDA";

  const STATS = [
    { value: "4.500+", label: t.heroCarousel.stats.clientesLabel, icon: <Users className="w-4 h-4 text-[#6C96F7]" /> },
    { value: "98%", label: t.heroCarousel.stats.satisfaccionLabel, icon: <ThumbsUp className="w-4 h-4 text-[#2563eb]" /> },
    { value: "+300", label: t.heroCarousel.stats.comunidadesLabel, icon: <Building2 className="w-4 h-4 text-[#6C96F7]" /> },
    { value: "15+", label: t.heroCarousel.stats.anosLabel, icon: <Award className="w-4 h-4 text-[#2563eb]" /> },
  ];

  return (
    <section
      id="hero"
      className="relative text-slate-900 min-h-[100svh] bg-[#F8FAFC] px-4 md:px-8 xl:px-12 pb-0 flex flex-col overflow-hidden select-none"
      onClick={() => setHeroOpenDrop(null)}
    >
      {/* ── BACKGROUND PHOTO ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 sm:-top-8 lg:-top-12 w-[64%] sm:w-[62%] lg:w-[48%] xl:w-[44%] h-[62%] sm:h-[calc(100%+2rem)] lg:h-[calc(100%+3rem)] overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgMobileLcp}
              alt="Pareja feliz entrando a su nuevo hogar con las llaves y celebrando con Gesgrama"
              className="w-full h-full object-cover object-[center_top] sm:object-[right_top] block"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={360}
              height={554}
            />
          </picture>
          {/* Feathering: left edge */}
          <div className="absolute inset-y-0 left-0 w-28 sm:w-40 md:w-52 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/85 to-transparent pointer-events-none z-10" />
          {/* Feathering: top */}
          <div className="absolute inset-x-0 top-0 h-40 sm:h-48 md:h-56 bg-gradient-to-b from-[#F8FAFC] from-[35%] via-[#F8FAFC]/80 via-[70%] to-transparent pointer-events-none z-20" />
          {/* Feathering: bottom */}
          <div className="absolute inset-x-0 -bottom-1 h-32 sm:h-40 bg-gradient-to-t from-[#F8FAFC] from-[30%] via-[#F8FAFC]/70 to-transparent pointer-events-none z-10" />
        </div>
        {/* Mobile left backdrop */}
        <div className="sm:hidden absolute inset-y-0 left-0 w-[72%] bg-gradient-to-r from-[#F8FAFC] from-[80%] to-transparent pointer-events-none z-[1]" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1360px] mx-auto w-full flex-1 flex flex-col relative z-10 pt-[72px] sm:pt-24 lg:pt-28">

        {/* ── ZONA 1: BRAND + COPY + CTAs ── */}
        <div className="flex-1 flex flex-col justify-center pb-4 sm:pb-6 lg:pb-8">
          <div className="max-w-[52%] xs:max-w-[50%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">

            {/* Badge */}
            <div className="mb-2 sm:mb-3">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#2563eb] text-white text-[8px] xs:text-[10px] sm:text-[12.5px] font-black uppercase tracking-[0.06em] sm:tracking-[0.1em] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shrink-0 animate-pulse" />
                <span className="leading-tight line-clamp-1">{customTag || t.heroCarousel.tag}</span>
              </div>
            </div>

            {/* H1 */}
            <h1
              className={`text-[22px] xs:text-[25px] ${
                customHeadline
                  ? "sm:text-4xl md:text-[2.85rem] lg:text-[3.2rem] leading-[1.08]"
                  : "sm:text-5xl md:text-[3.2rem] lg:text-[3.8rem] leading-[1.1] sm:leading-[1.04]"
              } mb-2 sm:mb-3 font-black text-[#0b214a] tracking-tight font-heading`}
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block whitespace-nowrap">
                    {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}
                  </span>
                  <span className="text-[#2563eb] block mt-0.5 sm:mt-1 whitespace-nowrap">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-[#1e293b] text-[11px] xs:text-[12px] sm:text-base md:text-[1.1rem] mb-3 sm:mb-4 font-bold leading-snug sm:leading-relaxed font-sans max-w-sm sm:max-w-none">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 w-full max-w-[185px] xs:max-w-[200px] sm:max-w-none">
              {/* Primary: Solicitar presupuesto */}
              <a
                href="#formulario-contacto"
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                  if (formEl) {
                    const navOffset = window.innerWidth < 768 ? 75 : 85;
                    const pos = formEl.getBoundingClientRect().top + window.scrollY - navOffset;
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                    window.history.replaceState(null, "", "#formulario-contacto");
                    const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                    if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 sm:px-6 py-2 sm:py-3.5 rounded-full font-black text-[10px] xs:text-[11px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 cursor-pointer shrink-0 shadow-md"
              >
                <Send className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnBudget || "Solicitar presupuesto"}</span>
              </a>

              {/* Secondary: Valorar mi propiedad */}
              <a
                href={customValuationHref || "#valuator-form"}
                onClick={(e) => {
                  e.preventDefault();
                  const targetEl = document.getElementById("valuator-card") || document.getElementById("valuator-form");
                  if (targetEl) {
                    const navOffset = window.innerWidth < 768 ? 90 : 100;
                    const pos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
                    window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
                    window.history.replaceState(null, "", "#valuator-form");
                    const inputEl = document.getElementById("valuator-zona-select") || targetEl.querySelector("select");
                    if (inputEl) setTimeout(() => (inputEl as HTMLElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 px-3 sm:px-5 py-2 sm:py-3.5 rounded-full font-extrabold text-[10px] xs:text-[11px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 cursor-pointer shrink-0 shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#2563eb] stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
                {[1, 2, 3, 4].map(n => (
                  <img
                    key={n}
                    src={`/images/avatar-${n}.webp`}
                    alt="Cliente Gesgrama"
                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                    loading="lazy"
                    decoding="async"
                    width={28}
                    height={28}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white stroke-[3.5]" />
                </span>
                <span className="font-extrabold font-sans text-slate-950 text-[10px] xs:text-[11px] sm:text-sm leading-snug">
                  {customTrustBadge ? customTrustBadge : (
                    language === 'ca'
                      ? <><span className="whitespace-nowrap">Més de 4.500 clients </span><span className="font-black whitespace-nowrap">confien en Gesgrama</span></>
                      : language === 'en'
                      ? <><span className="whitespace-nowrap">Over 4,500 clients </span><span className="font-black whitespace-nowrap">trust Gesgrama</span></>
                      : <><span className="whitespace-nowrap">Más de 4.500 clientes </span><span className="font-black whitespace-nowrap">confían en Gesgrama</span></>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── ZONA 2: SEARCH CARD — PROTAGONISTA ── */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="w-full mb-3 sm:mb-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-900 shadow-[0_16px_48px_rgba(0,0,0,0.13)] overflow-visible">

            {/* Search card header */}
            <div className="flex items-center gap-2.5 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-slate-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-slate-500 font-sans">
                {findLabel}
              </span>
              {/* Mode tabs inline on desktop */}
              <div className="hidden sm:flex items-center gap-1 ml-4 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setHeroMode("comprar")}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                    heroMode === "comprar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {buyLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode("alquilar")}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                    heroMode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {rentLabel}
                </button>
              </div>
            </div>

            {/* ── DESKTOP FILTER ROW ── */}
            <div className="hidden sm:flex items-stretch px-4 sm:px-6 py-3 sm:py-4 gap-2 xl:gap-3">

              {/* ZONA dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "zona" ? null : "zona"); }}
                  className="w-full h-full flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-[#2563eb]/40 bg-slate-50 hover:bg-blue-50/40 transition-all cursor-pointer text-left group"
                >
                  <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{zonaLabel}</div>
                    <div className="text-[13px] font-extrabold text-[#0f172a] leading-none truncate">{getZonaLabel(heroZona)}</div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${heroOpenDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {heroOpenDrop === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2 max-h-64 overflow-y-auto">
                    {ZONAS.map(z => (
                      <button
                        key={z}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setHeroZona(z); setHeroOpenDrop(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          heroZona === z ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {heroZona === z && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                        {getZonaLabel(z)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TIPO dropdown */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "tipo" ? null : "tipo"); }}
                  className="w-full h-full flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-[#2563eb]/40 bg-slate-50 hover:bg-blue-50/40 transition-all cursor-pointer text-left group"
                >
                  <Home className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{tipoLabel}</div>
                    <div className="text-[13px] font-extrabold text-[#0f172a] leading-none truncate">{getTipoLabel(heroTipo)}</div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${heroOpenDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {heroOpenDrop === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.18)] z-50 p-2">
                    {TIPOS.map(tp => (
                      <button
                        key={tp}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setHeroTipo(tp); setHeroOpenDrop(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          heroTipo === tp ? "bg-[#2563eb] text-white" : "hover:bg-blue-50 text-slate-800"
                        }`}
                      >
                        {heroTipo === tp && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                        {getTipoLabel(tp)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* BUSCAR button */}
              <button
                type="button"
                onClick={handleHeroSearch}
                className="flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-8 py-3 rounded-xl font-black text-[14px] tracking-wide transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <Search className="w-4.5 h-4.5 shrink-0" />
                <span>{searchLabel}</span>
              </button>
            </div>

            {/* ── MOBILE LAYOUT ── */}
            <div className="sm:hidden px-4 pt-3 pb-4 space-y-2.5">
              {/* Mode tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHeroMode("comprar")}
                  className={`py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                    heroMode === "comprar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {buyLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMode("alquilar")}
                  className={`py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                    heroMode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {rentLabel}
                </button>
              </div>

              {/* Native selects - best UX on mobile */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none z-10" />
                <select
                  value={heroZona}
                  onChange={(e) => setHeroZona(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 rounded-xl pl-9 pr-4 py-3 text-[13px] font-bold text-[#0f172a] cursor-pointer focus:outline-none focus:border-[#2563eb]"
                >
                  {ZONAS.map(z => <option key={z} value={z}>{getZonaLabel(z)}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb] pointer-events-none z-10" />
                <select
                  value={heroTipo}
                  onChange={(e) => setHeroTipo(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border-2 border-slate-200 rounded-xl pl-9 pr-4 py-3 text-[13px] font-bold text-[#0f172a] cursor-pointer focus:outline-none focus:border-[#2563eb]"
                >
                  {TIPOS.map(tp => <option key={tp} value={tp}>{getTipoLabel(tp)}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={handleHeroSearch}
                className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-xl font-black text-[14px] tracking-wide transition-colors cursor-pointer shadow-md"
              >
                <Search className="w-4.5 h-4.5 shrink-0" />
                <span>{searchLabel}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── ZONA 3: STATS COMPACTAS — DEBAJO DEL BUSCADOR ── */}
        {/* ══════════════════════════════════════════════════════ */}

        {/* Desktop: horizontal strip with separators */}
        <div className="hidden sm:flex items-center justify-start gap-0 mb-3 sm:mb-4 bg-[#0f172a]/[0.03] rounded-2xl border border-slate-200/80 px-4 py-3">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-2.5 px-5 xl:px-7">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  {s.icon}
                </div>
                <div>
                  <div className="text-[20px] xl:text-[22px] font-black text-[#0f172a] leading-none tracking-tight font-sans">{s.value}</div>
                  <div className="text-[11px] font-bold text-slate-500 leading-tight font-sans mt-0.5">{s.label}</div>
                </div>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-10 bg-slate-200 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 compact grid */}
        <div className="sm:hidden grid grid-cols-2 gap-2 mb-3">
          {STATS.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${i === 0 || i === 2 ? "bg-[#0f172a] border-slate-700" : "bg-white border-slate-200"}`}>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${i === 0 || i === 2 ? "bg-white/10" : "bg-slate-50"}`}>
                {s.icon}
              </div>
              <div>
                <div className={`text-[17px] font-black leading-none tracking-tight font-sans ${i === 0 || i === 2 ? "text-white" : "text-[#0f172a]"}`}>{s.value}</div>
                <div className={`text-[9px] font-bold leading-tight font-sans mt-0.5 ${i === 0 || i === 2 ? "text-slate-300" : "text-slate-500"}`}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── MARQUEE ── */}
      <div className="w-full relative z-20 -mx-4 md:-mx-8 xl:-mx-12">
        <MarqueeRibbon language={language} className="" />
      </div>
    </section>
  );
}