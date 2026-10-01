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
      {/* ── 1. FONDO CON IMAGEN DE LA FAMILIA QUE CUBRE GRAN PARTE DEL HERO Y SE FUNDE CON BLANCO ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#f8fafc]">
        {/* Arco sutil decorativo en la izquierda y derecha como en el diseño de referencia */}
        <div className="hidden lg:block absolute -left-28 top-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border-[38px] border-blue-100/50 pointer-events-none z-10" />
        <div className="hidden xl:block absolute -right-20 top-1/4 w-[360px] h-[360px] rounded-full border-[32px] border-blue-100/30 pointer-events-none z-10" />

        {/* Imagen de la familia cubriendo gran parte del Hero (desde el centro hacia la derecha, borde a borde) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%] xl:w-[56%] h-full">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgDesktop}
              alt="Familia feliz con Gesgrama en su nuevo hogar"
              className="w-full h-full object-cover object-[center_14%] md:object-[center_12%]"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={850}
              height={1113}
            />
          </picture>

          {/* Difuminado suave horizontal: de blanco puro a transparente para fundir la imagen con la zona de texto sin cortes */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 via-40% to-transparent pointer-events-none" />

          {/* Difuminado superior e inferior para fundir con navbar y ribbon */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

          {/* Tarjeta flotante de confianza en la derecha (como en la referencia) */}
          <div className="hidden lg:flex absolute top-24 right-8 xl:right-16 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_16px_36px_rgba(15,23,42,0.12)] border border-slate-100/80 items-center gap-3.5 max-w-[210px] pointer-events-auto transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <HomeIcon className="w-5 h-5 text-[#2563eb]" />
            </div>
            <div className="text-left">
              <p className="text-[12px] font-bold text-slate-800 leading-tight">
                {language === "ca" ? "Troba espais fets per a tu" : language === "en" ? "Find spaces that fit you" : "Encuentra espacios que encajan contigo"}
              </p>
              <div className="w-6 h-0.5 bg-[#2563eb] mt-1.5 rounded-full" />
            </div>
          </div>
        </div>

        {/* En móvil, velo blanco sutil para asegurar que el texto sea perfectamente legible */}
        <div className="md:hidden absolute inset-0 bg-white/80" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 flex flex-col justify-between min-h-[580px] sm:min-h-[620px] md:min-h-[660px]"
      >
        {/* ── 2. SECCIÓN SUPERIOR: TEXTO A LA IZQUIERDA CON TOTAL LEGIBILIDAD ── */}
        <div className="w-full max-w-[660px] text-center md:text-left flex flex-col items-center md:items-start pt-2 sm:pt-4">
          
          {/* Eyebrow / Kicker */}
          <div className="mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 sm:px-5 py-1.5 rounded-full font-sans shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
              {customTag || L.tag}
            </span>
          </div>

          {/* H1 — Titular con personalidad de Gesgrama: Navy + Azul en 2 líneas */}
          <h1
            className="font-black text-[#0b214a] tracking-tight leading-[1.04] mb-3 sm:mb-4 font-heading"
            style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.3rem)' }}
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
            className="text-slate-800 font-bold leading-relaxed max-w-[500px] text-balance mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}
          >
            {customSubtitle || L.subtitle}
          </p>

          {/* Botones de acción directa (como en la referencia editorial) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a
              href="#propiedades"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <span>{language === "ca" ? "Veure propietats" : language === "en" ? "View properties" : "Ver propiedades"}</span>
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all"
            >
              <span>{language === "ca" ? "Els nostres serveis" : language === "en" ? "Our services" : "Nuestros servicios"}</span>
            </a>
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