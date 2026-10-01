import React, { useState } from 'react';
import { Search, MapPin, Home as HomeIcon, ChevronDown, Check, Users, ThumbsUp, Building2, User } from "lucide-react";
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
  "Santa Coloma",
  "Toda zona",
  "Santa Rosa - Can Mariner",
  "Fondo",
  "Riu",
  "Centro",
  "El Raval",
  "Riera Alta - Llatí",
  "Singuerlín",
];

const TIPOS = [
  "Todo tipo",
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
}: HeroCarouselProps) {
  const t = translations[language];

  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Santa Coloma");
  const [tipo, setTipo] = useState("Todo tipo");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const L = {
    tag: language === "ca"
      ? "GESTIÓ IMMOBILIÀRIA I FINQUES"
      : language === "en"
      ? "REAL ESTATE & PROPERTY MANAGEMENT"
      : "GESTIÓN INMOBILIARIA Y FINCAS",
    titleLine1: language === "ca"
      ? "La teva propera llar,"
      : language === "en"
      ? "Your next home,"
      : "Tu próximo hogar,",
    titleLine2: language === "ca"
      ? "més a prop."
      : language === "en"
      ? "closer than ever."
      : "más cerca.",
    subtitle: language === "ca"
      ? "Compra, lloga o descobreix quant val la teva propietat a Santa Coloma."
      : language === "en"
      ? "Buy, rent or discover how much your property is worth in Santa Coloma."
      : "Compra, alquila o descubre cuánto vale tu propiedad en Santa Coloma.",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Alquilar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "ZONA" : language === "en" ? "AREA" : "ZONA",
    type: language === "ca" ? "TIPUS" : language === "en" ? "TYPE" : "TIPO",
    search: language === "ca" ? "BUSCAR" : language === "en" ? "SEARCH" : "BUSCAR",
  };

  const handleSearch = () => {
    onPerformSearch?.({
      mode,
      zona: zona === "Toda zona" ? "Cualquier zona" : zona,
      tipo: tipo === "Todo tipo" ? "Cualquier tipo" : tipo,
      precio: "Cualquier precio",
    });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 80 : 90;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  return (
    <section
      id="hero"
      className="hero relative text-slate-900 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── 1. FONDO CON DECORACIÓN GEOMÉTRICA SUTIL (ARCOS) ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#fafcff]">
        {/* Arco sutil decorativo en la izquierda como en el diseño de referencia */}
        <div className="hidden lg:block absolute -left-28 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border-[36px] border-blue-100/40 pointer-events-none" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-20 sm:pt-24 md:pt-26 pb-4 sm:pb-6 flex flex-col"
      >
        {/* ── 2. SECCIÓN SUPERIOR: TEXTO A LA IZQUIERDA + FOTO PANEL A LA DERECHA ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center mb-6 sm:mb-8">
          
          {/* Columna Izquierda: Texto limpio y ultra legible */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left z-10">
            {/* Eyebrow / Kicker */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 sm:px-5 py-1.5 rounded-full font-sans shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                {customTag || L.tag}
              </span>
            </div>

            {/* H1 — Titular con personalidad de Gesgrama: Navy + Azul en 2 líneas */}
            <h1
              className="font-black text-[#0b214a] tracking-tight leading-[1.05] mb-3 sm:mb-4 font-heading"
              style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)' }}
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block text-[#0b214a]">{L.titleLine1}</span>
                  <span className="text-[#2563eb] block mt-0.5">{L.titleLine2}</span>
                </>
              )}
            </h1>

            {/* Texto de apoyo conciso y oscuro */}
            <p
              className="text-slate-800 font-bold leading-relaxed max-w-[520px] text-balance"
              style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.12rem)' }}
            >
              {customSubtitle || L.subtitle}
            </p>
          </div>

          {/* Columna Derecha: Panel de la Familia como en la referencia */}
          <div className="md:col-span-6 lg:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] md:max-w-none aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/5] lg:aspect-[5/6] max-h-[460px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.14)] border-4 sm:border-[6px] border-white ring-1 ring-slate-100">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Familia feliz con Gesgrama en su nuevo hogar"
                  className="w-full h-full object-cover object-[center_12%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>

              {/* Velo blanco degradado muy sutil en bordes para integración visual suave */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── 3. BUSCADOR GEOMÉTRICAMENTE CENTRADO ── */}
        <div
          className="relative z-40 w-full max-w-[1020px] mx-auto my-2 sm:my-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.14)] flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-2.5 transition-all hover:shadow-[0_24px_58px_rgba(37,99,235,0.18)] hover:border-blue-200"
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-[#f1f5f9] rounded-xl sm:rounded-full shrink-0 p-1">
              <button
                type="button"
                onClick={() => setMode("comprar")}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => setMode("alquilar")}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-2" />

            {/* Selector ZONA */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                className="w-full flex items-center justify-between text-left px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-slate-50 rounded-xl sm:rounded-full transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                      {L.area}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                      {zona}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>

              {/* Dropdown anclado hacia abajo */}
              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto text-left">
                  {ZONAS.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => { setZona(z); setOpenDrop(null); }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        zona === z ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{z}</span>
                      {zona === z && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-2" />

            {/* Selector TIPO */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                className="w-full flex items-center justify-between text-left px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-slate-50 rounded-xl sm:rounded-full transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                      {L.type}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                      {tipo}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>

              {/* Dropdown anclado hacia abajo */}
              {openDrop === "tipo" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto text-left">
                  {TIPOS.map((tItem) => (
                    <button
                      key={tItem}
                      type="button"
                      onClick={() => { setTipo(tItem); setOpenDrop(null); }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{tItem}</span>
                      {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón BUSCAR — icono alineado con precisión y centrado */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-black text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none mt-2 sm:mt-0"
            >
              <Search className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="leading-none">{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── 4. MÉTRICAS: CAPA INFERIOR INTEGRADA EN EL HERO ── */}
        <div className="w-full max-w-[1020px] mx-auto mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">

            {/* Métrica 1: Clientes */}
            <div className="flex items-center justify-center gap-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Métrica 2: Satisfacción */}
            <div className="flex items-center justify-center gap-3">
              <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Métrica 3: Comunidades */}
            <div className="flex items-center justify-center gap-3">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Métrica 4: Años */}
            <div className="flex items-center justify-center gap-3">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 mt-0.5 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}