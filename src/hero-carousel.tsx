import React, { useState } from 'react';
import { Calculator, Send, Search, MapPin, Building2, ChevronDown, Check, Users, ThumbsUp, Award, Euro } from "lucide-react";
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
  "Hasta 100.000 €",
  "Hasta 150.000 €",
  "Hasta 200.000 €",
  "Hasta 300.000 €",
  "Hasta 500.000 €",
  "Más de 500.000 €",
];

const PRECIOS_ALQUILER = [
  "Cualquier precio",
  "Hasta 800 €",
  "Hasta 1.000 €",
  "Hasta 1.200 €",
  "Hasta 1.500 €",
  "Hasta 2.000 €",
  "Más de 2.000 €",
];

export default function HeroCarousel({
  onPerformSearch,
  language = 'es',
  customTag,
  customHeadline,
  customSubtitle,
  customValuationHref,
}: HeroCarouselProps) {
  const t = translations[language];

  // QuickSearch states
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Cualquier zona");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [precio, setPrecio] = useState("Cualquier precio");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | "precio" | null>(null);

  const L = {
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "ZONA" : language === "en" ? "AREA" : "ZONA",
    type: language === "ca" ? "TIPUS" : language === "en" ? "TYPE" : "TIPO",
    price: language === "ca" ? "PREU" : language === "en" ? "PRICE" : "PRECIO",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    allAreas: language === "ca" ? "Totes les zones" : language === "en" ? "All areas" : "Toda zona",
    allTypes: language === "ca" ? "Tots els tipus" : language === "en" ? "All types" : "Todo tipo",
    allPrices: language === "ca" ? "Qualsevol preu" : language === "en" ? "Any price" : "Cualquier precio",
  };

  const currentPrecios = mode === "alquilar" ? PRECIOS_ALQUILER : PRECIOS_COMPRA;

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

  return (
    <section
      id="hero"
      className="hero relative z-30 bg-white text-slate-900 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-14 md:pb-16 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── Sutiles curvas arquitectónicas decorativas orgánicas (como en la referencia) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Gran arco blanco azulado en el cuadrante izquierdo */}
        <div className="absolute -left-64 top-10 sm:top-16 w-[560px] h-[560px] sm:w-[700px] sm:h-[700px] rounded-full border-[48px] sm:border-[68px] border-blue-50/60 -z-10" />
        <div className="absolute -left-36 top-44 w-[360px] h-[360px] rounded-full border-[28px] border-blue-50/40 -z-10" />
        {/* Glow muy sutil y luminoso en la esquina superior derecha detrás de la foto */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/35 via-slate-50/20 to-transparent rounded-full blur-3xl -z-10" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10">
        
        {/* ── CONTENEDOR HERO EN 12 COLUMNAS: TEXTO CENTRADO-IZQUIERDA + FOTO DERECHA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Columna Contenido: Ocupa 7 columnas en desktop, centrada en mobile */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 pt-2 lg:pt-4">
            
            {/* Badge pill superior */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 bg-[#2563eb]/10 border border-[#2563eb]/25 text-[#2563eb] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 animate-pulse" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* Titular Principal H1: Grande, protagonista, limpio */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.5rem] font-black text-[#0b214a] tracking-tight leading-[1.08] mb-4 font-heading">
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

            {/* Subtítulo breve y descriptivo con mucho aire */}
            <p className="text-slate-600 text-base sm:text-lg md:text-xl font-bold leading-relaxed max-w-xl text-balance mb-6 lg:mb-4">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            {/* CTAs Secundarios discretos (Jerarquía clara: Buscador es #1, estos son secundarios) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-2">
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
                className="btn-lift inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200/90 text-slate-800 text-xs sm:text-sm font-black uppercase tracking-wider px-5 py-2.5 rounded-full border border-slate-300/80 transition-all cursor-pointer shadow-xs select-none"
              >
                <Calculator className="w-3.5 h-3.5 text-[#2563eb] stroke-[2.5]" />
                <span>{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>

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
                className="btn-lift inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-black uppercase tracking-wider px-5 py-2.5 rounded-full border border-slate-300 transition-all cursor-pointer shadow-xs select-none"
              >
                <Send className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                <span>{t.heroCarousel.btnBudget || "Solicitar presupuesto"}</span>
              </a>
            </div>

          </div>

          {/* Columna Fotografía: Ocupa 5 columnas en desktop, integrada con máscara orgánica */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end z-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none rounded-[36px] sm:rounded-[44px] lg:rounded-[48px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200/70 bg-gradient-to-b from-slate-100 to-slate-200 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[460px] xl:max-h-[500px]">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz celebrando en su nuevo hogar con Gesgrama"
                  className="w-full h-full object-cover object-[center_top] sm:object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              
              {/* Degradado suave blanco hacia la izquierda para fundirse orgánicamente */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none" />
              {/* Degradado sutil inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge de ubicación */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-[#0f172a]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-white/15 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider font-sans">Santa Coloma de Gramenet</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── BUSCADOR HERO: PROTAGONISTA Y TOTALMENTE CENTRADO HORIZONTALMENTE (MAX-WIDTH 1080PX) ── */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center w-full relative z-40">
          <div 
            className="w-full max-w-[1080px] bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 transition-shadow hover:shadow-[0_24px_58px_rgba(37,99,235,0.14)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/80 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMode("comprar");
                  setPrecio("Cualquier precio");
                }}
                className={`flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-md"
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
                className={`flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Selector 1: Zona */}
            <div className="relative flex-1 sm:border-l sm:border-slate-200 sm:pl-3 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border sm:border-transparent border-slate-200/60"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
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
            <div className="relative flex-1 sm:border-l sm:border-slate-200 sm:pl-3 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border sm:border-transparent border-slate-200/60"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
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
            <div className="relative flex-1 sm:border-l sm:border-slate-200 sm:pl-3 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "precio" ? null : "precio")}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border sm:border-transparent border-slate-200/60"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
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
                <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
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

            {/* Botón Buscar: Grande, azul royal, llamativo */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 sm:px-10 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.02] transition-all shrink-0 select-none"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── FRANJA COMPACTA DE CONFIANZA DENTRO DEL HERO (FORMATO DISCRETO Y ELEGANTE) ── */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/80 max-w-[1080px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center justify-center gap-2.5">
              <Users className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <ThumbsUp className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <Award className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}