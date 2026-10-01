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
  const [zona, setZona] = useState("Toda zona");
  const [tipo, setTipo] = useState("Todo tipo");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const L = {
    tag: language === "ca" ? "GESTIÓ IMMOBILIÀRIA I FINQUES" : language === "en" ? "REAL ESTATE & PROPERTY MANAGEMENT" : "GESTIÓN INMOBILIARIA Y FINCAS",
    titleLine1: language === "ca" ? "La teva propera llar," : language === "en" ? "Your next home," : "Tu próximo hogar,",
    titleLine2: language === "ca" ? "més a prop." : language === "en" ? "closer than ever." : "más cerca.",
    subtitle: language === "ca"
      ? "T'acompanyem per comprar, vendre o cuidar la teva propietat amb transparència i criteri local."
      : language === "en"
      ? "We guide you to buy, sell or care for your property with transparency and local expertise."
      : "Te acompañamos para comprar, vender o cuidar tu propiedad con transparencia y criterio local.",
    buy: language === "ca" ? "Comprar" : language === "en" ? "Buy" : "Comprar",
    rent: language === "ca" ? "Alquilar" : language === "en" ? "Rent" : "Alquilar",
    area: language === "ca" ? "ZONA" : language === "en" ? "AREA" : "ZONA",
    type: language === "ca" ? "TIPUS" : language === "en" ? "TYPE" : "TIPO",
    search: language === "ca" ? "BUSCAR" : language === "en" ? "SEARCH" : "BUSCAR",
  };

  const handleSearch = () => {
    onPerformSearch?.({ mode, zona: zona === "Toda zona" ? "Cualquier zona" : zona, tipo: tipo === "Todo tipo" ? "Cualquier tipo" : tipo, precio: "Cualquier precio" });
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
      className="hero relative bg-white text-slate-900 overflow-visible"
      style={{ minHeight: '100svh' }}
      onClick={() => setOpenDrop(null)}
    >
      {/* Arco decorativo sutil izquierda */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute -left-[260px] top-[6%] w-[600px] h-[600px] rounded-full border-[48px] border-blue-50/70" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 flex flex-col"
        style={{
          minHeight: '100svh',
          paddingTop: 'clamp(88px, 11vh, 116px)',
          paddingBottom: 'clamp(20px, 3.5vh, 44px)',
        }}
      >

        {/* ── BLOQUE EDITORIAL: texto izquierda + foto derecha ── */}
        <div
          className="relative flex items-center justify-between"
          style={{ height: 'clamp(240px, calc(100svh - 300px), 440px)' }}
        >
          {/* Columna editorial izquierda */}
          <div className="relative z-10 w-full md:max-w-[54%] lg:max-w-[50%] flex flex-col items-start text-left">

            {/* Badge — fondo azul sólido */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                {customTag || L.tag}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-black text-[#0b214a] tracking-tight leading-[1.04] mb-3 sm:mb-4 font-heading"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 4rem)' }}
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block">{L.titleLine1}</span>
                  <span className="text-[#2563eb] block mt-0.5">{L.titleLine2}</span>
                </>
              )}
            </h1>

            {/* Subtítulo — legible y con peso */}
            <p
              className="text-slate-700 font-semibold leading-relaxed max-w-[480px]"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
              {customSubtitle || L.subtitle}
            </p>
          </div>

          {/* Foto flotante derecha */}
          <div className="absolute right-0 top-0 bottom-0 w-[47%] sm:w-[44%] lg:w-[43%] max-w-[560px] pointer-events-none z-0 hidden md:flex items-stretch">
            <div className="relative w-full rounded-[40px] overflow-hidden">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz con Gesgrama en su nuevo hogar"
                  className="w-full h-full object-cover object-[center_15%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── SEARCH PILL — full-width centrado, protagonista ── */}
        <div
          className="relative z-40 w-full mt-4 sm:mt-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-2xl sm:rounded-full border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.13)] flex flex-col sm:flex-row items-stretch sm:items-center overflow-hidden sm:overflow-visible transition-shadow hover:shadow-[0_24px_64px_rgba(37,99,235,0.16)]" style={{ padding: '6px' }}>

            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-[#f1f5f9] rounded-xl sm:rounded-full shrink-0 m-1">
              <button
                type="button"
                onClick={() => setMode("comprar")}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => setMode("alquilar")}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Separador */}
            <div className="hidden sm:block w-[1px] h-10 bg-slate-200 shrink-0 mx-1" />

            {/* Selector ZONA */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-slate-50 rounded-xl sm:rounded-full transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 pr-1">
                  <MapPin className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      {L.area}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-bold text-[#0f172a] truncate mt-0.5">
                      {zona}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>

              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
                  {ZONAS.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => { setZona(z); setOpenDrop(null); }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
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

            {/* Separador */}
            <div className="hidden sm:block w-[1px] h-10 bg-slate-200 shrink-0 mx-1" />

            {/* Selector TIPO */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-slate-50 rounded-xl sm:rounded-full transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 pr-1">
                  <HomeIcon className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      {L.type}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-bold text-[#0f172a] truncate mt-0.5">
                      {tipo}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
              </button>

              {openDrop === "tipo" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
                  {TIPOS.map((tItem) => (
                    <button
                      key={tItem}
                      type="button"
                      onClick={() => { setTipo(tItem); setOpenDrop(null); }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
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

            {/* Botón BUSCAR — prominente */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl sm:rounded-full font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none m-1"
              style={{ padding: '14px clamp(22px, 3vw, 40px)' }}
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── TRUST STRIP — números y labels grandes y legibles ── */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-200/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200">

            <div className="flex items-center gap-3 sm:gap-4 sm:pr-8">
              <Users className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 sm:px-8">
              <ThumbsUp className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 sm:px-8">
              <Building2 className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 sm:pl-8">
              <User className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}