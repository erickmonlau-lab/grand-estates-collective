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
    cta1: language === "ca" ? "Ver propiedades" : language === "en" ? "View properties" : "Ver propiedades",
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

  return (
    <section
      id="hero"
      className="hero relative bg-white text-slate-900 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── ARCO SUTIL DECORATIVO DE FONDO ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute -left-[280px] top-[4%] w-[680px] h-[680px] rounded-full border-[52px] border-blue-50/60" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-28 sm:pt-32 md:pt-36 pb-8 md:pb-12"
      >
        {/* ── BLOQUE EDITORIAL + IMAGEN INTEGRADA (ESCENA ÚNICA) ── */}
        <div className="relative flex flex-col md:flex-row items-center md:items-stretch justify-between min-h-[420px] md:min-h-[460px] lg:min-h-[480px]">

          {/* Columna editorial izquierda */}
          <div className="relative z-10 w-full md:max-w-[54%] lg:max-w-[50%] flex flex-col items-start text-left justify-center pb-6 md:pb-8">

            {/* Eyebrow / Kicker — pegado armónicamente al H1 */}
            <div className="mb-2.5 sm:mb-3">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-3.5 sm:px-4 py-1.5 rounded-full font-sans shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                {customTag || L.tag}
              </span>
            </div>

            {/* H1 — Titular cohesionado en 3 líneas que se lee como un solo bloque compacto */}
            <h1
              className="font-black text-[#0b214a] tracking-tight leading-[0.98] mb-3 sm:mb-4 font-heading max-w-[540px]"
              style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)' }}
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

            {/* Subtítulo — nítido, elegante y con jerarquía secundaria inmediata */}
            <p
              className="text-slate-600 font-semibold leading-relaxed mb-5 sm:mb-6 max-w-[480px]"
              style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)' }}
            >
              {customSubtitle || L.subtitle}
            </p>

            {/* CTA único principal — "Ver propiedades →" */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleCta1}
                className="inline-flex items-center gap-2.5 bg-[#0b214a] hover:bg-[#162d5e] text-white font-black text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg select-none"
              >
                <span>{L.cta1}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Imagen editorial integrada sin caja rígida (fade suave a blanco hacia la izquierda) */}
          <div className="relative w-full md:w-[48%] lg:w-[48%] mt-6 md:mt-0 flex items-center justify-end">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-full max-h-[500px] rounded-3xl md:rounded-[44px] overflow-hidden shadow-2xl md:shadow-none">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
                <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
                <img
                  src={heroBgDesktop}
                  alt="Pareja feliz con Gesgrama en su nuevo hogar"
                  className="w-full h-full object-cover object-[center_16%]"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width={850}
                  height={1113}
                />
              </picture>
              {/* Máscara de integración progresiva con el fondo blanco (elimina bordes duros hacia el texto) */}
              <div className="hidden md:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
              <div className="hidden md:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── BUSCADOR PRINCIPAL (SIGUIENTE ACCIÓN NATURAL DEL HERO) ── */}
        <div
          className="relative z-40 w-full mt-4 sm:mt-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.11)] flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-2.5 transition-shadow hover:shadow-[0_24px_58px_rgba(37,99,235,0.14)]"
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-[#f1f5f9] rounded-xl sm:rounded-full shrink-0 p-1">
              <button
                type="button"
                onClick={() => setMode("comprar")}
                className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
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
                className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none whitespace-nowrap ${
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

            {/* Selector ZONA — dropdown anclado hacia abajo naturalmente */}
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

              {/* Dropdown anclado hacia ABAJO con scroll y z-50 sobre métricas */}
              {openDrop === "zona" && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
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

            {/* Selector TIPO — dropdown anclado hacia abajo naturalmente */}
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

              {openDrop === "tipo" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-64 overflow-y-auto">
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

            {/* Botón BUSCAR — icono perfectamente centrado respecto al texto */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-black text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none mt-2 sm:mt-0"
            >
              <Search className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="leading-none">{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── MÉTRICAS: SEGUNDA CAPA DEL HERO (SEPARADA Y EQUILIBRADA) ── */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">

            {/* Métrica 1: Clientes */}
            <div className="flex items-center gap-3.5">
              <Users className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Métrica 2: Satisfacción */}
            <div className="flex items-center gap-3.5">
              <ThumbsUp className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Métrica 3: Comunidades */}
            <div className="flex items-center gap-3.5">
              <Building2 className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Métrica 4: Años */}
            <div className="flex items-center gap-3.5">
              <User className="w-6 h-6 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl font-black text-[#2563eb] leading-none">15+</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}