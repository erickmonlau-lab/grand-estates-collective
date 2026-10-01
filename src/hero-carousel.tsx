import React, { useState } from 'react';
import { Search, MapPin, Building2, Euro, ChevronDown, Check, Users, ThumbsUp, Building, Award, Calculator, ArrowRight } from "lucide-react";
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
  "Hasta 150.000 €",
  "150.000 - 250.000 €",
  "250.000 - 400.000 €",
  "Más de 400.000 €",
];

const PRECIOS_ALQUILER = [
  "Cualquier precio",
  "Hasta 800 €",
  "800 - 1.200 €",
  "1.200 - 1.800 €",
  "Más de 1.800 €",
];

export default function HeroCarousel({
  onPerformSearch,
  language = 'es',
  customTag,
  customHeadline,
  customSubtitle,
}: HeroCarouselProps) {
  const t = translations[language];

  // QuickSearch states
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Cualquier zona");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [precio, setPrecio] = useState("Cualquier precio");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | "precio" | null>(null);

  const currentPrecios = mode === "alquilar" ? PRECIOS_ALQUILER : PRECIOS_COMPRA;

  const L = {
    searchTitle: language === "ca" ? "BUSCAR HABITATGE" : language === "en" ? "SEARCH HOMES" : "BUSCAR VIVIENDA",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Alquilar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipo" : language === "en" ? "Type" : "Tipo",
    price: language === "ca" ? "Precio" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Buscar" : language === "en" ? "Search" : "Buscar",
    allAreas: language === "ca" ? "Toda zona" : language === "en" ? "All areas" : "Toda zona",
    allTypes: language === "ca" ? "Todo tipo" : language === "en" ? "All types" : "Todo tipo",
    allPrices: language === "ca" ? "Cualquier precio" : language === "en" ? "Any price" : "Cualquier precio",
    valuateShort: language === "ca" ? "Valorar el meu immoble" : language === "en" ? "Value my property" : "Valorar mi propiedad",
    copySubtitle: language === "ca"
      ? "Compra, lloga o descobreix quant val la teva propietat a Santa Coloma."
      : language === "en"
      ? "Buy, rent or discover what your property is worth in Santa Coloma."
      : "Compra, alquila o descubre cuánto vale tu propiedad en Santa Coloma."
  };

  const handleSearch = () => {
    onPerformSearch?.({ mode, zona, tipo, precio });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 80 : 90;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  const scrollToValuator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("valorador");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 80 : 90;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#valorador");
    }
  };

  return (
    <section
      id="hero"
      className="hero relative z-30 bg-[#f8fafc] text-slate-900 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-hidden min-h-[680px] lg:min-h-[760px] flex flex-col justify-between"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── ESCENA AMBIENTAL DE FONDO: FOTOGRAFÍA FUSIONADA A GRAN ESCALA ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Fotografía de la pareja integrada como parte de la atmósfera del hero */}
        <div className="absolute -right-12 sm:right-0 top-0 bottom-0 w-[60%] sm:w-[54%] lg:w-[48%] max-w-[850px] opacity-90 sm:opacity-95">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgDesktop}
              alt="Familia feliz con Gesgrama en Santa Coloma"
              className="w-full h-full object-cover object-[center_15%]"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={850}
              height={1113}
            />
          </picture>

          {/* Fusión degradada en blanco/slate-50: suave hacia la izquierda y hacia la base para lectura cristalina */}
          <div className="absolute inset-y-0 left-0 w-44 sm:w-64 lg:w-80 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f8fafc]/80 to-transparent" />
        </div>

        {/* Círculo sutil arquitectónico detrás del texto */}
        <div className="absolute -left-48 top-[10%] w-[580px] h-[580px] rounded-full border-[56px] border-blue-100/40 -z-10" />
      </div>

      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10 my-auto">
        
        {/* ── 1. BLOQUE DE TITULAR Y BRANDING EDITORIAL ── */}
        <div className="max-w-3xl text-left mb-6 sm:mb-8 md:mb-10">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 text-[#2563eb] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans mb-3 sm:mb-4 border border-[#2563eb]/15 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
            {customTag || t.heroCarousel.tag}
          </div>

          {/* H1 Protagonista con jerarquía e impacto */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] font-black text-[#0b214a] tracking-tight leading-[1.04] mb-3 sm:mb-4 font-heading drop-shadow-xs">
            {customHeadline ? (
              customHeadline
            ) : (
              <>
                <span className="block text-[#0b214a]">
                  {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}
                </span>
                <span className="text-[#2563eb] block">
                  {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                </span>
              </>
            )}
          </h1>

          {/* Subtítulo Breve y Directo + Enlace secundario discreto a valorador */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 font-bold text-sm sm:text-base md:text-lg leading-snug">
            <p className="max-w-xl text-balance">
              {customSubtitle || L.copySubtitle}
            </p>
            <button
              type="button"
              onClick={scrollToValuator}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#2563eb] hover:text-[#1d4ed8] underline underline-offset-4 decoration-2 cursor-pointer transition-colors"
            >
              <span>{L.valuateShort}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ── 2. LA PIEZA CENTRAL: SEARCH CARD PROTAGONISTA ── */}
        <div className="w-full max-w-[1100px] mb-8 sm:mb-10">
          <div 
            className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-4xl p-4 sm:p-6 md:p-7 shadow-[0_24px_64px_rgba(15,23,42,0.12)] border border-slate-200/90 transition-all hover:shadow-[0_28px_72px_rgba(37,99,235,0.16)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header de la Search Card: Título + Toggle Comprar/Alquilar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h2 className="text-xs sm:text-sm font-black text-[#0b214a] uppercase tracking-widest font-heading">
                  {L.searchTitle}
                </h2>
              </div>

              {/* Selector de Modo Comprar / Alquilar */}
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/70 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setMode("comprar");
                    setPrecio("Cualquier precio");
                  }}
                  className={`px-5 sm:px-7 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                    mode === "comprar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {L.buy}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("alquilar");
                    setPrecio("Cualquier precio");
                  }}
                  className={`px-5 sm:px-7 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                    mode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {L.rent}
                </button>
              </div>
            </div>

            {/* Selectores de búsqueda interactivos en rejilla de 4 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 items-center">
              
              {/* Selector 1: Zona */}
              <div className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50/90 hover:bg-slate-100 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                        {L.area}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                        {zona === "Cualquier zona" ? L.allAreas : zona}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>

                {openDrop === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
                    {ZONAS.map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => {
                          setZona(z);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          zona === z ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{z === "Cualquier zona" ? L.allAreas : z}</span>
                        {zona === z && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector 2: Tipo */}
              <div className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50/90 hover:bg-slate-100 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                        {L.type}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                        {tipo === "Cualquier tipo" ? L.allTypes : tipo}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>

                {openDrop === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
                    {TIPOS.map((tItem) => (
                      <button
                        key={tItem}
                        type="button"
                        onClick={() => {
                          setTipo(tItem);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{tItem === "Cualquier tipo" ? L.allTypes : tItem}</span>
                        {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector 3: Precio */}
              <div className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "precio" ? null : "precio")}
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50/90 hover:bg-slate-100 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <Euro className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                        {L.price}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                        {precio === "Cualquier precio" ? L.allPrices : precio}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>

                {openDrop === "precio" && (
                  <div className="absolute top-full left-0 lg:right-0 lg:left-auto mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
                    {currentPrecios.map((pItem) => (
                      <button
                        key={pItem}
                        type="button"
                        onClick={() => {
                          setPrecio(pItem);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          precio === pItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{pItem === "Cualquier precio" ? L.allPrices : pItem}</span>
                        {precio === pItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón Buscar: Grande, azul royal e icónico */}
              <button
                type="button"
                onClick={handleSearch}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.01] transition-all select-none"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>

            </div>
          </div>
        </div>

        {/* ── 3. BANDA DE CONFIANZA INTEGRADA (NÚMEROS GRANDES + ICONOS) ── */}
        <div className="pt-4 border-t border-slate-200/70 max-w-[1100px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Users className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-lg sm:text-xl font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <ThumbsUp className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-lg sm:text-xl font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Building className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-lg sm:text-xl font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Award className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-lg sm:text-xl font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}