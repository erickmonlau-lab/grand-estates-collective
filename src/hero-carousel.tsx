import React, { useState } from 'react';
import { Search, MapPin, Building2, Euro, ChevronDown, Check, Users, ThumbsUp, Award, Calculator, FileText, ArrowRight } from "lucide-react";
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
    price: language === "ca" ? "Preu" : language === "en" ? "Price" : "Precio",
    search: language === "ca" ? "Buscar" : language === "en" ? "Search" : "Buscar",
    allAreas: language === "ca" ? "Toda zona" : language === "en" ? "All areas" : "Toda zona",
    allTypes: language === "ca" ? "Todo tipo" : language === "en" ? "All types" : "Todo tipo",
    allPrices: language === "ca" ? "Cualquier precio" : language === "en" ? "Any price" : "Cualquier precio",
    btnBudget: language === "ca" ? "SOL·LICITAR PRESSUPOST" : language === "en" ? "REQUEST A QUOTE" : "SOLICITAR PRESUPUESTO",
    btnValuation: language === "ca" ? "VALORAR EL MEU IMMOBLE" : language === "en" ? "VALUE MY PROPERTY" : "VALORAR MI PROPIEDAD",
    copySubtitle: language === "ca"
      ? "Compra, ven o administra la teva propietat amb un equip local i proper."
      : language === "en"
      ? "Buy, sell or manage your property with an expert local team."
      : "Compra, vende o administra tu propiedad con un equipo local y cercano."
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = window.innerWidth < 768 ? 80 : 90;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="hero"
      className="hero relative z-30 bg-gradient-to-b from-white via-slate-50/40 to-white text-slate-900 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-14 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* Fondo con arcos sutiles arquitectónicos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-[240px] top-[5%] w-[640px] h-[640px] rounded-full border-[48px] border-blue-50/50 -z-10" />
        <div className="absolute right-[5%] -top-[120px] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-3xl -z-10" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10">
        
        {/* ── ESCENA PRINCIPAL HERO: EDITORIAL + FOTOGRAFÍA INTEGRADA CON FADE SUAVE ── */}
        <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px] flex items-center">
          
          {/* Fotografía de la pareja integrada a la derecha con fade blanco al centro */}
          <div className="absolute right-0 top-0 bottom-8 w-[48%] sm:w-[46%] lg:w-[48%] max-w-[620px] pointer-events-none z-0 hidden md:flex items-center justify-end">
            <div className="relative w-full h-[460px] lg:h-[520px] rounded-[36px] lg:rounded-[48px] overflow-hidden shadow-2xl shadow-blue-950/5 border border-slate-100">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz celebrando en su nuevo hogar con Gesgrama"
                  className="w-full h-full object-cover object-[center_20%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              
              {/* Fade blanco profesional hacia la izquierda/centro para fusionarse orgánicamente */}
              <div className="absolute inset-y-0 left-0 w-36 lg:w-44 bg-gradient-to-r from-white via-white/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent" />
            </div>
          </div>

          {/* Bloque Editorial Izquierda: Badge + H1 Grande + Subtítulo + CTAs Directos */}
          <div className="relative z-10 w-full md:max-w-[60%] lg:max-w-[55%] flex flex-col items-start text-left pt-2 pb-6">
            
            {/* Pill Badge */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 bg-[#2563eb]/10 text-[#2563eb] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans border border-[#2563eb]/15">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 animate-pulse" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* H1 Grande e Impactante */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[4rem] lg:text-[4.75rem] font-black text-[#0b214a] tracking-tight leading-[1.05] mb-5 font-heading">
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block text-[#0b214a]">
                    {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}
                  </span>
                  <span className="text-[#2563eb] block mt-1">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </h1>

            {/* Subtítulo Editorial */}
            <p className="text-slate-600 text-base sm:text-lg md:text-xl font-bold leading-relaxed max-w-xl mb-6 sm:mb-8 text-balance">
              {customSubtitle || L.copySubtitle}
            </p>

            {/* CTAs de Portada */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
              <button
                type="button"
                onClick={() => scrollToSection("contacto")}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>{L.btnBudget}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("valorador")}
                className="bg-white hover:bg-slate-50 text-[#0b214a] border-2 border-slate-200/90 hover:border-slate-300 px-6 sm:px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#2563eb] stroke-[2.5]" />
                <span>{L.btnValuation}</span>
              </button>
            </div>

          </div>

        </div>

        {/* ── BUSCADOR PRINCIPAL (SEARCH-FIRST HERO CARD COMPLETA Y CENTRADA) ── */}
        <div className="relative mt-2 sm:mt-4 md:-mt-6 lg:-mt-10 w-full max-w-[1080px] mx-auto z-40">
          <div 
            className="bg-white rounded-3xl sm:rounded-4xl p-4 sm:p-6 shadow-[0_20px_56px_rgba(15,23,42,0.12)] border border-slate-200/90 transition-shadow hover:shadow-[0_24px_64px_rgba(37,99,235,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del buscador: Título de sección + Toggle Comprar/Alquilar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <h3 className="text-xs sm:text-sm font-black text-[#0b214a] uppercase tracking-widest font-heading">
                  {L.searchTitle}
                </h3>
              </div>

              {/* Toggle Comprar / Alquilar */}
              <div className="inline-flex bg-slate-100 p-1 rounded-full self-start sm:self-auto border border-slate-200/60">
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

            {/* Barra de Selectores: ZONA | TIPO | PRECIO | BUSCAR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3 items-center">
              
              {/* Selector 1: Zona */}
              <div className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer"
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
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer"
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
                  className="w-full flex items-center justify-between text-left px-4 py-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer"
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

        {/* ── FRANJA DE MÉTRICAS Y CONFIANZA LOCAL (CIERRE ANTES DE LA CINTA) ── */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-200/80 max-w-[1080px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <ThumbsUp className="w-4 h-4 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-[#2563eb]" />
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}