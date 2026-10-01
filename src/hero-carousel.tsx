import React, { useState } from 'react';
import { Calculator, Send, Search, MapPin, Building2, ChevronDown, Check } from "lucide-react";
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
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const L = {
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Llogar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "ZONA" : language === "en" ? "AREA" : "ZONA",
    type: language === "ca" ? "TIPUS" : language === "en" ? "TYPE" : "TIPO",
    search: language === "ca" ? "Cercar" : language === "en" ? "Search" : "Buscar",
    selectArea: language === "ca" ? "Selecciona zona" : language === "en" ? "Select area" : "Selecciona zona",
    selectType: language === "ca" ? "Selecciona tipus" : language === "en" ? "Select type" : "Selecciona tipo",
  };

  const handleSearch = () => {
    onPerformSearch?.({ mode, zona, tipo, precio: "Cualquier precio" });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 90 : 100;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  return (
    <header
      id="hero"
      className="relative bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/50 to-[#F8FAFC] text-slate-900 pt-24 sm:pt-28 md:pt-32 lg:pt-34 pb-10 sm:pb-12 md:pb-14 border-b border-slate-200/80"
      onClick={() => setOpenDrop(null)}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12">
        {/* Lienzo Integrado 2 Columnas: Contenido + Buscador a la izquierda, Fotografía integrada a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* Columna Izquierda: Identidad, Titular, Subtítulo, Buscador integrado y CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center relative z-20">
            {/* Tag / Badge */}
            <div className="mb-3 sm:mb-3.5">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full shadow-[0_4px_16px_rgba(37,99,235,0.32)] font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* Titular Principal H1 */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3.1rem] lg:text-[3.3rem] font-black text-[#0b214a] tracking-tight leading-[1.08] mb-3.5 sm:mb-4 font-heading">
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

            {/* Subtítulo descriptivo */}
            <p className="text-slate-700 text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-6 max-w-xl text-balance">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

            {/* ── BUSCADOR INTEGRADO EN COLUMNA IZQUIERDA (autocontenido, sin invadir la foto) ── */}
            <div 
              className="w-full max-w-[680px] bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 mb-6 relative z-30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Toggle Comprar / Alquilar */}
              <div className="flex bg-slate-100/90 p-1 rounded-full border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setMode("comprar")}
                  className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                    mode === "comprar"
                      ? "bg-[#2563eb] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {L.buy}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("alquilar")}
                  className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none ${
                    mode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {L.rent}
                </button>
              </div>

              {/* Selector Zona con divisor vertical */}
              <div className="relative flex-1 sm:border-l sm:border-slate-200 sm:pl-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-1.5 sm:px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                        {L.area}
                      </span>
                      <span className="block text-xs font-bold text-[#0f172a] truncate mt-0.5">
                        {zona === "Cualquier zona" ? L.selectArea : zona}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>

                {openDrop === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-60 overflow-y-auto">
                    {ZONAS.map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => {
                          setZona(z);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                          zona === z ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{z}</span>
                        {zona === z && <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector Tipo con divisor vertical */}
              <div className="relative flex-1 sm:border-l sm:border-slate-200 sm:pl-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-1">
                    <Building2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                        {L.type}
                      </span>
                      <span className="block text-xs font-bold text-[#0f172a] truncate mt-0.5">
                        {tipo === "Cualquier tipo" ? L.selectType : tipo}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>

                {openDrop === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-60 overflow-y-auto">
                    {TIPOS.map((tItem) => (
                      <button
                        key={tItem}
                        type="button"
                        onClick={() => {
                          setTipo(tItem);
                          setOpenDrop(null);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                          tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{tItem}</span>
                        {tipo === tItem && <Check className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón Buscar totalmente integrado en el flujo flex */}
              <button
                type="button"
                onClick={handleSearch}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>
            </div>

            {/* CTAs Debajo del Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
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
                className="btn-lift bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 sm:px-8 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all select-none"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
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
                className="btn-lift bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-slate-400 px-6 sm:px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-sm transition-all select-none"
              >
                <Calculator className="w-4 h-4 text-[#2563eb] stroke-[2.5]" />
                <span className="whitespace-nowrap">{t.heroCarousel.btnValuation || "Valorar mi propiedad"}</span>
              </a>
            </div>

          </div>

          {/* Columna Derecha: Fotografía integrada suavemente con el fondo blanco/gris */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0 z-10">
            <div className="relative w-full max-w-[480px] lg:max-w-none rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.10)] border border-slate-200/80 bg-slate-100 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[460px] lg:max-h-[520px]">
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
              
              {/* Degradado suave a la izquierda para fundirse con el hero */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8FAFC]/80 via-[#F8FAFC]/30 to-transparent pointer-events-none" />
              {/* Degradado sutil inferior para el badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge de ubicación */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-[#0f172a]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-white/15 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider font-sans">Santa Coloma de Gramenet</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}