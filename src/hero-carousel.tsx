import React, { useState } from 'react';
import { Search, MapPin, Home as HomeIcon, ChevronDown, Check, Users, ThumbsUp, Building2, User, ArrowRight } from "lucide-react";
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
      ? "més a prop"
      : language === "en"
      ? "closer than ever"
      : "más cerca",
    subtitle: language === "ca"
      ? "T'acompanyem per comprar, vendre o llogar la teva propietat amb transparència, proximitat i assessorament professional."
      : language === "en"
      ? "We guide you to buy, rent or care for your property with transparency, closeness and professional advice."
      : "Te acompañamos para comprar, vender o alquilar tu propiedad con transparencia, cercanía y asesoramiento profesional.",
    cta1: language === "ca" ? "Veure propietats" : language === "en" ? "View properties" : "Ver propiedades",
    cta2: language === "ca" ? "Els nostres serveis" : language === "en" ? "Our services" : "Nuestros servicios",
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

  const handleCta1 = () => {
    const el = document.getElementById("propiedades");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  };

  const handleCta2 = () => {
    const el = document.getElementById("servicios");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
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
        <div className="absolute -left-[280px] top-[4%] w-[680px] h-[680px] rounded-full border-[52px] border-blue-50/65" />
      </div>

      {/*
        LAYOUT STRATEGY: justify-between
        TOP → editorial (badge + H1 + subtitle + CTAs)
        BOTTOM → pill + trust strip
        Photo fills the full height of the section on the right
      */}
      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 flex flex-col justify-between"
        style={{
          minHeight: '100svh',
          paddingTop: 'clamp(104px, 13vh, 136px)',
          paddingBottom: 'clamp(24px, 4vh, 48px)',
          gap: 'clamp(16px, 3vh, 32px)',
        }}
      >

        {/* ── BLOQUE EDITORIAL ── */}
        <div className="relative flex items-start justify-between">

          {/* Columna de texto izquierda */}
          <div className="relative z-10 w-full md:max-w-[52%] lg:max-w-[49%] flex flex-col items-start text-left">

            {/* Badge */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs sm:text-sm font-black uppercase tracking-[0.12em] px-4 sm:px-5 py-2 rounded-full font-sans shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white/70 shrink-0" />
                {customTag || L.tag}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-black text-[#0b214a] tracking-tight leading-[1.02] mb-3 sm:mb-4 font-heading"
              style={{ fontSize: 'clamp(2.4rem, 5.8vw, 4.8rem)' }}
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block">{L.titleLine1}</span>
                  <span className="text-[#2563eb] block">{L.titleLine2}</span>
                </>
              )}
            </h1>

            {/* Subtítulo */}
            <p
              className="text-slate-600 font-semibold leading-relaxed mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', maxWidth: '460px' }}
            >
              {customSubtitle || L.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCta1}
                className="inline-flex items-center gap-2 bg-[#0b214a] hover:bg-[#162d5e] text-white font-black rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg select-none"
                style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.95rem)', padding: '13px 26px' }}
              >
                {L.cta1}
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleCta2}
                className="inline-flex items-center gap-2 text-[#0b214a] hover:text-[#2563eb] font-bold border-2 border-slate-200 hover:border-blue-300 rounded-xl cursor-pointer transition-all select-none bg-white"
                style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.95rem)', padding: '12px 22px' }}
              >
                {L.cta2}
              </button>
            </div>
          </div>

          {/* Foto derecha — absolute, llena todo el editorial */}
          <div
            className="absolute right-0 top-0 bottom-[-32px] w-[50%] sm:w-[48%] lg:w-[46%] max-w-[640px] pointer-events-none z-0 hidden md:block"
          >
            <div className="relative w-full h-full rounded-l-[40px] overflow-hidden">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz con Gesgrama en su nuevo hogar"
                  className="w-full h-full object-cover object-[center_12%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── BOTTOM: PILL + TRUST ── */}
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* SEARCH PILL */}
          <div
            className="relative z-40 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white rounded-2xl border-2 border-slate-200 shadow-[0_24px_64px_rgba(15,23,42,0.14)] flex flex-col sm:flex-row items-stretch sm:items-center overflow-visible transition-shadow hover:shadow-[0_28px_72px_rgba(37,99,235,0.16)] hover:border-blue-200"
              style={{ padding: '8px' }}
            >
              {/* Toggle Comprar / Alquilar */}
              <div className="flex bg-[#f1f5f9] rounded-[14px] shrink-0 m-1">
                <button
                  type="button"
                  onClick={() => setMode("comprar")}
                  className={`px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer select-none whitespace-nowrap ${
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
                  className={`px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer select-none whitespace-nowrap ${
                    mode === "alquilar"
                      ? "bg-[#2563eb] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {L.rent}
                </button>
              </div>

              {/* Separador */}
              <div className="hidden sm:block w-[1px] h-12 bg-slate-200 shrink-0 mx-2" />

              {/* Selector ZONA — dropdown ▲ ARRIBA */}
              <div className="relative flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{L.area}</span>
                      <span className="block text-sm sm:text-[15px] font-bold text-[#0f172a] truncate mt-0.5">{zona}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform ${openDrop === "zona" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {openDrop === "zona" && (
                  <div className="absolute bottom-full left-0 mb-3 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-72 overflow-y-auto">
                    {ZONAS.map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => { setZona(z); setOpenDrop(null); }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${zona === z ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"}`}
                      >
                        <span className="truncate">{z}</span>
                        {zona === z && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Separador */}
              <div className="hidden sm:block w-[1px] h-12 bg-slate-200 shrink-0 mx-2" />

              {/* Selector TIPO — dropdown ▲ ARRIBA */}
              <div className="relative flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-5 sm:px-6 py-3 sm:py-3.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-1">
                    <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb] shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{L.type}</span>
                      <span className="block text-sm sm:text-[15px] font-bold text-[#0f172a] truncate mt-0.5">{tipo}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : ""}`} />
                </button>
                {openDrop === "tipo" && (
                  <div className="absolute bottom-full left-0 mb-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-72 overflow-y-auto">
                    {TIPOS.map((tItem) => (
                      <button
                        key={tItem}
                        type="button"
                        onClick={() => { setTipo(tItem); setOpenDrop(null); }}
                        className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"}`}
                      >
                        <span className="truncate">{tItem}</span>
                        {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* BUSCAR */}
              <button
                type="button"
                onClick={handleSearch}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-all shrink-0 select-none m-1"
                style={{ padding: '14px clamp(24px, 3.5vw, 48px)' }}
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                <span>{L.search}</span>
              </button>
            </div>
          </div>

          {/* TRUST STRIP */}
          <div className="pt-4 sm:pt-5 border-t-2 border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200">

              <div className="flex items-center gap-3 sm:gap-4 sm:pr-8">
                <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563eb] shrink-0 stroke-[2]" />
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b214a] leading-none">4.500+</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 sm:px-8">
                <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563eb] shrink-0 stroke-[2]" />
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2563eb] leading-none">98%</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 sm:px-8">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563eb] shrink-0 stroke-[2]" />
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b214a] leading-none">+300</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 sm:pl-8">
                <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563eb] shrink-0 stroke-[2]" />
                <div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2563eb] leading-none">15+</p>
                  <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}