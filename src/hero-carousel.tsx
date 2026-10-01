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

  // Search states
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [zona, setZona] = useState("Toda zona");
  const [tipo, setTipo] = useState("Todo tipo");
  const [openDrop, setOpenDrop] = useState<"zona" | "tipo" | null>(null);

  const L = {
    tag: language === "ca" ? "GESTIÓ IMMOBILIÀRIA I FINQUES" : language === "en" ? "REAL ESTATE & PROPERTY MANAGEMENT" : "GESTIÓN INMOBILIARIA Y FINCAS",
    titleMain: language === "ca" ? "La teva propera llar," : language === "en" ? "Your next home," : "Tu próximo hogar,",
    titleAccent: language === "ca" ? "més a prop." : language === "en" ? "closer than ever." : "más cerca.",
    subtitle: language === "ca"
      ? "T'acompanyem per comprar, vendre o cuidar la teva propietat amb transparència, criteri local i un equip que respon."
      : language === "en"
      ? "We accompany you to buy, sell or care for your property with transparency, local criteria and a responsive team."
      : "Te acompañamos para comprar, vender o cuidar tu propiedad con transparencia, criterio local y un equipo que responde.",
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
      className="hero relative z-30 bg-white text-slate-900 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-14 overflow-visible"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── ARCO SUTIL DECORATIVO A LA IZQUIERDA (TAL CUAL LA REFERENCIA) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-[300px] top-[4%] w-[680px] h-[680px] rounded-full border-[52px] border-blue-50/60 -z-10" />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 relative z-10">
        
        {/* ── CONTENEDOR HERO EN VIEWPORT: TEXTO A LA IZQUIERDA + FOTO FLOTANTE REDONDEADA A LA DERECHA ── */}
        <div className="relative min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] flex items-center justify-between">
          
          {/* Columna de Texto Editorial */}
          <div className="relative z-10 w-full md:max-w-[56%] lg:max-w-[52%] flex flex-col items-start text-left pt-2 pb-14 sm:pb-16 md:pb-20">
            
            {/* Pill Badge */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 bg-[#2563eb]/10 text-[#2563eb] text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full font-sans">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
                {customTag || L.tag}
              </span>
            </div>

            {/* H1 Idéntico a la Referencia 2 */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[4.25rem] lg:text-[4.85rem] font-black text-[#0b214a] tracking-tight leading-[1.04] mb-4 sm:mb-5 font-heading">
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  <span className="block text-[#0b214a]">{L.titleMain}</span>
                  <span className="text-[#2563eb] block mt-0.5">{L.titleAccent}</span>
                </>
              )}
            </h1>

            {/* Subtítulo de 2 líneas airy y limpio */}
            <p className="text-slate-600 text-sm sm:text-base md:text-[17px] font-bold leading-relaxed max-w-lg text-balance">
              {customSubtitle || L.subtitle}
            </p>

          </div>

          {/* Fotografía de la pareja como tarjeta grande con esquinas redondeadas suaves (Fiel a la Referencia 2) */}
          <div className="absolute right-0 top-0 bottom-6 w-[48%] sm:w-[46%] lg:w-[45%] max-w-[580px] pointer-events-none z-0 hidden md:block">
            <div className="relative w-full h-[400px] sm:h-[440px] md:h-[480px] lg:h-[510px] rounded-[48px] overflow-hidden">
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
              {/* Fade blanco muy sutil en el borde izquierdo para fundirse con el fondo */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/30 to-transparent" />
            </div>
          </div>

        </div>

        {/* ── SEARCH PILL: BARRA FLOTANTE BLANCA HORIZONTAL SUPERPUESTA A LA PARTE INFERIOR DE LA FOTO ── */}
        <div className="relative -mt-10 sm:-mt-12 md:-mt-14 z-40 w-full max-w-[840px] mx-auto md:mx-0">
          <div 
            className="bg-white rounded-full p-2 sm:p-2.5 shadow-[0_16px_48px_rgba(15,23,42,0.12)] border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1 transition-shadow hover:shadow-[0_20px_54px_rgba(37,99,235,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-[#f1f5f9] p-1 rounded-full shrink-0">
              <button
                type="button"
                onClick={() => setMode("comprar")}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none ${
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
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer select-none ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-1 shrink-0" />

            {/* Selector 1: Zona */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "zona" ? null : "zona")}
                className="w-full flex items-center justify-between text-left px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                      {L.area}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                      {zona}
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
                      <span className="truncate">{z}</span>
                      {zona === z && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-1 shrink-0" />

            {/* Selector 2: Tipo */}
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === "tipo" ? null : "tipo")}
                className="w-full flex items-center justify-between text-left px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <HomeIcon className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                      {L.type}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-[#0f172a] truncate mt-0.5">
                      {tipo}
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
                      <span className="truncate">{tItem}</span>
                      {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Buscar: Azul royal píldora alargada con icono (idéntico a la referencia 2) */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 sm:px-8 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── FRANJA DE CONFIANZA INFERIOR (TAL CUAL LA REFERENCIA 2) ── */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-slate-200/80 max-w-[1100px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            {/* Clientes satisfechos */}
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">4.500+</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Satisfacción */}
            <div className="flex items-center gap-3">
              <ThumbsUp className="w-5 h-5 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#2563eb] leading-none">98%</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Comunidades */}
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#2563eb] shrink-0 stroke-[2]" />
              <div className="text-left">
                <p className="text-sm sm:text-base font-black text-[#0b214a] leading-none">+300</p>
                <p className="text-[11px] font-bold text-slate-500 mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Años de experiencia */}
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#2563eb] shrink-0 stroke-[2]" />
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