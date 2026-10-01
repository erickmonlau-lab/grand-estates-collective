import React, { useState } from 'react';
import { Search, MapPin, Building2, ChevronDown, Check, Users, ThumbsUp, Award } from "lucide-react";
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
}: HeroCarouselProps) {
  const t = translations[language];

  // QuickSearch states
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Cualquier zona");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const L = {
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Alquilar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "Zona" : language === "en" ? "Area" : "Zona",
    type: language === "ca" ? "Tipo" : language === "en" ? "Type" : "Tipo",
    search: language === "ca" ? "Buscar" : language === "en" ? "Search" : "Buscar",
    allAreas: language === "ca" ? "Toda zona" : language === "en" ? "All areas" : "Toda zona",
    allTypes: language === "ca" ? "Todo tipo" : language === "en" ? "All types" : "Todo tipo",
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
    <section
      id="hero"
      className="hero relative z-30 bg-white text-slate-900 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── ARCO SUTIL DECORATIVO A LA IZQUIERDA (INSPIRACIÓN DIRECTA DE LA REFERENCIA) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-[320px] top-[10%] w-[680px] h-[680px] rounded-full border-[52px] border-blue-50/50 -z-10" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10">
        
        {/* ── CONTENEDOR HERO EN VIEWPORT: H1 Y TEXTO CENTRADOS + FOTO INTEGRADA DETRÁS A LA DERECHA ── */}
        <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[460px] flex items-center justify-center">
          
          {/* Fotografía de la pareja integrada como fondo a la derecha con máscara suave */}
          <div className="absolute right-0 top-0 bottom-0 w-[52%] sm:w-[48%] lg:w-[46%] max-w-[560px] pointer-events-none z-0 hidden sm:flex items-center justify-end">
            <div className="relative w-full h-[380px] sm:h-[430px] md:h-[460px] rounded-[42px] sm:rounded-[50px] overflow-hidden">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz celebrando en su nuevo hogar con Gesgrama"
                  className="w-full h-full object-cover object-[center_15%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              {/* Degradado sutil para fusionarse suavemente con el fondo blanco hacia el centro */}
              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/40 to-transparent" />
            </div>
          </div>

          {/* Fotografía en mobile (pantallas pequeñas sin espacio lateral): colocada de fondo sutil o arriba */}
          <div className="sm:hidden w-full max-w-[340px] mb-6 rounded-[36px] overflow-hidden shadow-md">
            <picture className="w-full h-full block">
              <source srcSet={heroBgMobileLcp} width={360} height={554} />
              <img
                src={heroBgMobileLcp}
                alt="Pareja feliz celebrando en su nuevo hogar con Gesgrama"
                className="w-full h-[240px] object-cover object-[center_top]"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                width={360}
                height={240}
              />
            </picture>
          </div>

          {/* ── BLOQUE DE TEXTO CENTRADO (EXACTO A LA REFERENCIA) ── */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-2">
            
            {/* Badge pill */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-[#2563eb]/10 text-[#2563eb] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
                {customTag || t.heroCarousel.tag}
              </span>
            </div>

            {/* H1 Protagonista con el color y jerarquía idéntica a la referencia */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[4.2rem] lg:text-[4.6rem] font-black text-[#0b214a] tracking-tight leading-[1.08] mb-4 font-heading">
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

            {/* Subtítulo breve descriptivo */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-bold leading-relaxed max-w-lg text-balance">
              {customSubtitle || t.heroCarousel.subtitle}
            </p>

          </div>

        </div>

        {/* ── SEARCH PILL: CENTRADO HORIZONTALMENTE CON LIGERO OVERLAP FLOTANTE ── */}
        <div className="relative -mt-6 sm:-mt-8 md:-mt-10 flex justify-center w-full z-40 px-2 sm:px-4">
          <div 
            className="w-full max-w-[880px] bg-white rounded-full p-2 sm:p-2.5 shadow-[0_16px_48px_rgba(15,23,42,0.12)] border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 transition-shadow hover:shadow-[0_20px_54px_rgba(37,99,235,0.14)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-slate-100 p-1 rounded-full shrink-0">
              <button
                type="button"
                onClick={() => setMode("comprar")}
                className={`flex-1 sm:flex-initial px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none ${
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
                className={`flex-1 sm:flex-initial px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none ${
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
                className="w-full flex items-center justify-between text-left px-3 py-2 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
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
                <div className="absolute top-full left-0 mt-3 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
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
                className="w-full flex items-center justify-between text-left px-3 py-2 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
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
                <div className="absolute top-full left-0 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
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

            {/* Botón Buscar: Azul royal redondeado píldora */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 sm:px-9 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── FRANJA COMPACTA DE CONFIANZA DENTRO DEL HERO ── */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-slate-200/80 max-w-[880px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center justify-center gap-2.5">
              <Users className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <ThumbsUp className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
              <Award className="w-4 h-4 text-[#2563eb] shrink-0" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}