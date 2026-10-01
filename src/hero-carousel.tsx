import { useState } from 'react';
import { ArrowRight, Building2, Check, Home, Users, ThumbsUp, Award, Calculator, Phone, Send, ChevronDown, MapPin, Search } from "lucide-react";
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

  // ── Mini search bar state (only affects onPerformSearch, not duplicating buscador state)
  const [heroMode, setHeroMode] = useState<"comprar" | "alquilar">("comprar");
  const [heroZona, setHeroZona] = useState("Cualquier zona");
  const [heroTipo, setHeroTipo] = useState("Cualquier tipo");
  const [heroOpenDrop, setHeroOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const labelsEs = {
    zona: { "Cualquier zona": "Cualquier zona" },
    tipo: {
      "Cualquier tipo": "Cualquier tipo",
      "Piso": "Piso", "Apartamento": "Apartamento", "Ático": "Ático",
      "Chalet": "Chalet / Villa", "Local": "Local", "Oficina": "Oficina",
    },
  };

  const getZonaLabel = (v: string) => v === "Cualquier zona"
    ? (language === "ca" ? "Qualsevol zona" : language === "en" ? "Any area" : "Cualquier zona")
    : v;
  const getTipoLabel = (v: string) => v === "Cualquier tipo"
    ? (language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo")
    : v === "Cualquier tipo" ? v : v;

  const handleHeroSearch = () => {
    onPerformSearch?.({ mode: heroMode, zona: heroZona, tipo: heroTipo, precio: "Cualquier precio" });
    scrollToProperties();
  };

  const handleQuickMode = (mode: "comprar" | "alquilar") => {
    onPerformSearch?.({ mode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio" });
    scrollToProperties();
  };

  return (
    <section
      id="hero"
      className={`relative text-slate-900 min-h-[100svh] ${
        customHeadline
          ? "pt-18 sm:pt-20 lg:pt-24 h-auto lg:h-screen lg:min-h-[700px]"
          : "pt-18 sm:pt-24 lg:pt-28 h-[100svh] sm:h-screen"
      } pb-0 flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] px-4 md:px-8 xl:px-12`}
      onClick={() => setHeroOpenDrop(null)}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* On desktop: right half raised upwards. On mobile: starts at top-0 with soft gradient feathering */}
        <div className="absolute right-0 top-0 sm:-top-8 lg:-top-12 w-[64%] sm:w-[65%] lg:w-[50%] xl:w-[46%] h-[78%] sm:h-[calc(100%+2rem)] lg:h-[calc(100%+3rem)] pointer-events-none bg-[#F8FAFC] sm:bg-transparent overflow-hidden">
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
          {/* Feathering: top edge difuminado suave y profundo arriba de la imagen */}
          <div className="absolute inset-x-0 top-0 h-40 sm:h-48 md:h-56 bg-gradient-to-b from-[#F8FAFC] from-[35%] via-[#F8FAFC]/80 via-[70%] to-transparent pointer-events-none z-20" />
          {/* Feathering: balanced bottom fade */}
          <div className="absolute inset-x-0 -bottom-1 h-36 sm:h-44 bg-gradient-to-t from-[#F8FAFC] from-[25%] via-[#F8FAFC]/70 to-transparent pointer-events-none z-10" />
        </div>

        {/* Mobile: solid white text backdrop covering entire buttons and text area */}
        <div className="sm:hidden absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#F8FAFC] from-[78%] to-transparent pointer-events-none z-[1]" />
      </div>

      <div className="max-w-[1360px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between pt-1 sm:pt-2 pb-2 sm:pb-3">
        {/* Mobile text container: comfortable width, clean readability */}
        <div className={`max-w-[55%] xs:max-w-[53%] sm:max-w-2xl lg:max-w-3xl ${customHeadline ? "xl:max-w-[780px]" : "xl:max-w-[720px]"} text-left py-1 sm:py-2 my-auto`}>
          <div className="flex flex-col justify-center h-full">
            <div className="mb-1.5 sm:mb-2.5">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#2563eb] text-white text-[7.5px] xs:text-[9.5px] sm:text-[12.5px] font-black uppercase tracking-[0.04em] sm:tracking-[0.1em] px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit max-w-full">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shrink-0 animate-pulse" />
                <span className="text-left leading-tight line-clamp-1">{customTag || t.heroCarousel.tag}</span>
              </div>
            </div>

            <h1
              className={`text-[23px] xs:text-[26px] ${
                customHeadline
                  ? "sm:text-4xl md:text-[2.85rem] lg:text-[3.35rem] leading-[1.08] sm:leading-[1.06]"
                  : "sm:text-5xl md:text-[3.35rem] lg:text-[4rem] leading-[1.1] sm:leading-[1.04]"
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

            <p
              className="text-[#1e293b] text-[12px] xs:text-[13px] sm:text-base md:text-[1.15rem] mb-2 sm:mb-4 font-bold leading-snug sm:leading-relaxed font-sans"
            >
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-3.5 w-full max-w-[190px] xs:max-w-[205px] sm:max-w-none mb-2 sm:mb-4"
            >
              {/* Primary CTA: Solicitar presupuesto -> directly to contact form */}
              <a 
                href="#formulario-contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                  if (formEl) {
                    const navOffset = window.innerWidth < 768 ? 75 : 85;
                    const elementPosition = formEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navOffset;
                    window.scrollTo({
                      top: Math.max(0, offsetPosition),
                      behavior: "smooth"
                    });
                    window.history.replaceState(null, "", "#formulario-contacto");
                    const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                    if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 sm:px-7 py-1.5 sm:py-3.5 rounded-full font-black text-[10px] xs:text-[11px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 group cursor-pointer shrink-0 shadow-md"
              >
                <Send className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnBudget || "Solicitar presupuesto"}</span>
              </a>

              {/* Secondary CTA: Valorar mi propiedad (Calculadora) -> directly to valuator with exact offset */}
              <a 
                href={customValuationHref || "#valuator-form"} 
                onClick={(e) => {
                  e.preventDefault();
                  const targetEl = document.getElementById("valuator-card") || document.getElementById("valuator-form");
                  if (targetEl) {
                    const navOffset = window.innerWidth < 768 ? 90 : 100;
                    const elementPosition = targetEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navOffset;
                    window.scrollTo({
                      top: Math.max(0, offsetPosition),
                      behavior: "smooth"
                    });
                    window.history.replaceState(null, "", "#valuator-form");
                    const inputEl = document.getElementById("valuator-zona-select") || targetEl.querySelector("select");
                    if (inputEl) setTimeout(() => (inputEl as HTMLElement).focus({ preventScroll: true }), 450);
                  }
                }}
                className="btn-lift w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 px-3 sm:px-6 py-1.5 sm:py-3.5 rounded-full font-extrabold text-[10px] xs:text-[11px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 group cursor-pointer shrink-0 shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#2563eb] stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>
            </div>

            <div
              className="flex items-center gap-2 sm:gap-3 pt-0.5"
            >
              {/* Overlapping customer avatars stack */}
              <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
                <img
                  src="/images/avatar-1.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-2.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-3.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-4.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={32}
                  height={32}
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white stroke-[3.5]" />
                </span>
                <span className="font-extrabold font-sans text-slate-950 text-[11px] xs:text-xs sm:text-[14px] lg:text-[15px] leading-snug">
                  {customTrustBadge ? (
                    customTrustBadge
                  ) : language === 'ca' ? (
                    <>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">Més de 4.500 </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">clients ja confien </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950 font-black">en Gesgrama</span>
                    </>
                  ) : language === 'en' ? (
                    <>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">Over 4,500 clients </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">already trust </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950 font-black">Gesgrama</span>
                    </>
                  ) : (
                    <>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">Más de 4.500 </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950">clientes ya confían </span>
                      <span className="block sm:inline whitespace-nowrap text-slate-950 font-black">en Gesgrama</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* ── MINI SEARCH WIDGET (SEARCH-FIRST) ──
                Desktop: horizontal bar with Comprar/Alquilar tabs + 2 dropdowns + Buscar button
                Mobile: 2 quick-intent pill buttons (no dropdown complexity, no layout shift risk) */}
            <div className="mt-3 sm:mt-4 w-full max-w-[190px] xs:max-w-[205px] sm:max-w-none">

              {/* MOBILE: Quick intent pills only */}
              <div className="flex gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => handleQuickMode("comprar")}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 text-white text-[10px] xs:text-[11px] font-black uppercase tracking-wide px-3 py-2 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  <Home className="w-3 h-3 shrink-0" />
                  <span className="whitespace-nowrap">
                    {language === "ca" ? "Comprar pis" : language === "en" ? "Buy flat" : "Comprar piso"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickMode("alquilar")}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 text-[10px] xs:text-[11px] font-black uppercase tracking-wide px-3 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Building2 className="w-3 h-3 shrink-0 text-[#2563eb]" />
                  <span className="whitespace-nowrap">
                    {language === "ca" ? "Llogar" : language === "en" ? "Rent flat" : "Alquilar"}
                  </span>
                </button>
              </div>

              {/* DESKTOP: Full search bar */}
              <div className="hidden sm:flex items-stretch bg-white border-2 border-slate-900 rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.10)] overflow-visible" onClick={(e) => e.stopPropagation()}>
                {/* Mode tabs */}
                <div className="flex items-center p-1.5 gap-1 border-r-2 border-slate-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setHeroMode("comprar")}
                    className={`px-3.5 py-2 rounded-xl text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                      heroMode === "comprar"
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMode("alquilar")}
                    className={`px-3.5 py-2 rounded-xl text-[12px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                      heroMode === "alquilar"
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar"}
                  </button>
                </div>

                {/* Zona dropdown */}
                <div className="relative flex-1 border-r-2 border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "zona" ? null : "zona"); }}
                    className="w-full h-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-blue-50/50 transition-colors cursor-pointer text-left"
                  >
                    <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        {language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona"}
                      </div>
                      <div className="text-[13px] font-extrabold text-[#0f172a] leading-none">{getZonaLabel(heroZona)}</div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 ml-auto shrink-0 transition-transform ${heroOpenDrop === "zona" ? "rotate-180" : ""}`} />
                  </button>
                  {heroOpenDrop === "zona" && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] z-50 p-2 max-h-60 overflow-y-auto">
                      {ZONAS.map(z => (
                        <button
                          key={z}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setHeroZona(z); setHeroOpenDrop(null); }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
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

                {/* Tipo dropdown */}
                <div className="relative flex-1 border-r-2 border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setHeroOpenDrop(heroOpenDrop === "tipo" ? null : "tipo"); }}
                    className="w-full h-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-blue-50/50 transition-colors cursor-pointer text-left"
                  >
                    <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        {language === "ca" ? "Tipus" : language === "en" ? "Type" : "Tipo"}
                      </div>
                      <div className="text-[13px] font-extrabold text-[#0f172a] leading-none">{getTipoLabel(heroTipo)}</div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 ml-auto shrink-0 transition-transform ${heroOpenDrop === "tipo" ? "rotate-180" : ""}`} />
                  </button>
                  {heroOpenDrop === "tipo" && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white border-2 border-slate-900 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] z-50 p-2">
                      {TIPOS.map(tp => (
                        <button
                          key={tp}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setHeroTipo(tp); setHeroOpenDrop(null); }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
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

                {/* Search button */}
                <button
                  type="button"
                  onClick={handleHeroSearch}
                  className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 m-1.5 rounded-xl font-black text-[13px] tracking-wide transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>{language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-4 relative z-20 -mt-10 xs:-mt-8 sm:-mt-6 md:-mt-8 mb-3 sm:mb-4"
        >
          {/* Mobile: fade the right column into the background */}
          <div className="flex flex-col items-center justify-center text-center px-2 py-2 xs:py-2.5 sm:py-4 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_24px_rgba(15,23,42,0.22)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Users className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#6C96F7] mb-1 sm:mb-2" />
            <p className="text-[20px] xs:text-[24px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              <span>4.500+</span>
            </p>
            <p className="text-[10px] xs:text-xs sm:text-[14.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.clientesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2 xs:py-2.5 sm:py-4 sm:px-4 rounded-xl sm:rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5">
            <ThumbsUp className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#2563eb] mb-1 sm:mb-2" />
            <p className="text-[20px] xs:text-[24px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-[#0b214a]">
              <span>98%</span>
            </p>
            <p className="text-[10px] xs:text-xs sm:text-[14.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.satisfaccionLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2 xs:py-2.5 sm:py-4 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_24px_rgba(15,23,42,0.22)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Building2 className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#6C96F7] mb-1 sm:mb-2" />
            <p className="text-[20px] xs:text-[24px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              <span>+300</span>
            </p>
            <p className="text-[10px] xs:text-xs sm:text-[14.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.comunidadesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2 xs:py-2.5 sm:py-4 sm:px-4 rounded-xl sm:rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5">
            <Award className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#2563eb] mb-1 sm:mb-2" />
            <p className="text-[20px] xs:text-[24px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-[#0b214a]">
              <span>15+</span>
            </p>
            <p className="text-[10px] xs:text-xs sm:text-[14.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.anosLabel}</p>
          </div>
        </div>
      </div>

      {/* ── CONTINUOUS AUTHORITY MARQUEE INTEGRATED AS HERO BASE ── */}
      <div className={`w-full relative z-20 ${customHeadline ? "mt-0 sm:mt-1" : "mt-0 sm:mt-2"}`}>
        <MarqueeRibbon language={language} className="-mx-4 md:-mx-8 xl:-mx-12" />
      </div>
    </section>
  );
}