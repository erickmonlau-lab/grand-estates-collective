import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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

interface DropCoords {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  placement: "up" | "down";
  maxHeight: number;
}

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
  const [dropCoords, setDropCoords] = useState<DropCoords | null>(null);

  const zonaTriggerRef = useRef<HTMLButtonElement | null>(null);
  const tipoTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const calculateCoords = (targetEl: HTMLElement): DropCoords => {
    const rect = targetEl.getBoundingClientRect();
    const vpHeight = window.innerHeight;
    const vpWidth = window.innerWidth;

    const spaceBelow = vpHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Detect distance to bottom of hero or marquee ribbon if present
    const heroEl = document.getElementById("hero");
    const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : vpHeight;
    const heroSpaceBelow = heroBottom - rect.bottom;

    const availableSpaceBelow = Math.min(spaceBelow, heroSpaceBelow);
    // Menu content typically needs ~250px. If space below is restricted, flip UP
    const placement = (availableSpaceBelow < 260 && spaceAbove > 200) ? "up" : "down";

    // Set width aligned with trigger (minimum comfortable width on mobile/desktop)
    const minWidth = Math.min(vpWidth - 32, 280);
    const width = Math.max(rect.width, minWidth);

    // Ensure left does not overflow screen
    let left = rect.left;
    if (left + width > vpWidth - 16) {
      left = Math.max(16, vpWidth - width - 16);
    }
    if (left < 16) left = 16;

    const maxHeight = placement === "up" 
      ? Math.min(270, spaceAbove - 24)
      : Math.min(270, spaceBelow - 24);

    return {
      top: placement === "down" ? rect.bottom + 8 : undefined,
      bottom: placement === "up" ? (vpHeight - rect.top + 8) : undefined,
      left,
      width,
      placement,
      maxHeight: Math.max(160, maxHeight),
    };
  };

  const handleToggleDrop = (name: "zona" | "tipo", targetEl: HTMLButtonElement | null) => {
    if (openDrop === name) {
      setOpenDrop(null);
      setDropCoords(null);
      return;
    }
    if (targetEl) {
      setDropCoords(calculateCoords(targetEl));
      setOpenDrop(name);
    }
  };

  // Close on outside click, Escape key, resize or scroll
  useEffect(() => {
    if (!openDrop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDrop(null);
        setDropCoords(null);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        dropdownMenuRef.current?.contains(target) ||
        zonaTriggerRef.current?.contains(target) ||
        tipoTriggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDrop(null);
      setDropCoords(null);
    };

    const handleScrollOrResize = () => {
      // Re-anchor or close smoothly on scroll
      if (openDrop === "zona" && zonaTriggerRef.current) {
        setDropCoords(calculateCoords(zonaTriggerRef.current));
      } else if (openDrop === "tipo" && tipoTriggerRef.current) {
        setDropCoords(calculateCoords(tipoTriggerRef.current));
      } else {
        setOpenDrop(null);
        setDropCoords(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [openDrop]);

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
      {/* ── 1. FONDO DE LA FAMILIA CON DIFUMINADO BLANCO QUE CUBRE TODA LA PÁGINA ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <picture className="w-full h-full block">
          <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
          <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
          <img
            src={heroBgDesktop}
            alt="Familia feliz con Gesgrama en su nuevo hogar"
            className="w-full h-full object-cover object-[center_20%] sm:object-[center_15%]"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width={850}
            height={1113}
          />
        </picture>

        {/* Capa de difuminado blanco que cubre toda la página con suavidad y calidez */}
        <div className="absolute inset-0 bg-white/55 sm:bg-white/50" />
        
        {/* Difuminado blanco generoso que arropa el contenido central garantizando contraste óptimo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 75% at 50% 32%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.45) 80%, rgba(255,255,255,0.20) 100%)',
          }}
        />

        {/* Velos superior e inferior suaves para fundir bordes con navbar y franja de métricas */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-18 sm:pt-20 md:pt-22 pb-5 sm:pb-7 flex flex-col items-center text-center"
      >
        {/* ── 2. BLOQUE EDITORIAL CENTRADO SOBRE FONDO LIMPIO ── */}
        <div className="relative z-10 w-full max-w-[840px] mx-auto flex flex-col items-center text-center">

          {/* Eyebrow / Kicker */}
          <div className="mb-2 sm:mb-2.5">
            <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.14em] px-4 sm:px-5 py-1.5 rounded-full font-sans shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
              {customTag || L.tag}
            </span>
          </div>

          {/* H1 — Titular con personalidad de Gesgrama: Navy + Azul en 2 líneas exactas */}
          <h1
            className="font-black text-[#0b214a] tracking-tight leading-[1.04] mb-2 sm:mb-2.5 font-heading"
            style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4.2rem)' }}
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

          {/* Texto de apoyo conciso y oscuro de 1-2 líneas sobre fondo naturalmente limpio */}
          <p
            className="text-slate-800 font-bold leading-relaxed max-w-[580px] mx-auto text-balance"
            style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
          >
            {customSubtitle || L.subtitle}
          </p>
        </div>

        {/* ── 3. BUSCADOR GEOMÉTRICAMENTE CENTRADO (CON SUFICIENTE AIRE INFERIOR) ── */}
        <div
          className="relative z-40 w-full max-w-[1020px] mx-auto mt-2 sm:mt-3 mb-8 sm:mb-10"
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
                ref={zonaTriggerRef}
                type="button"
                aria-expanded={openDrop === "zona"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("zona", e.currentTarget)}
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
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-2" />

            {/* Selector TIPO */}
            <div className="relative flex-1 min-w-0">
              <button
                ref={tipoTriggerRef}
                type="button"
                aria-expanded={openDrop === "tipo"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("tipo", e.currentTarget)}
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

        {/* ── DROPDOWNS VIA REACT PORTAL: Inmunes a clipping, overflow y stacking contexts ── */}
        {openDrop && dropCoords && typeof document !== "undefined" && createPortal(
          <div
            ref={dropdownMenuRef}
            role="listbox"
            tabIndex={-1}
            style={{
              position: "fixed",
              top: dropCoords.top !== undefined ? `${dropCoords.top}px` : undefined,
              bottom: dropCoords.bottom !== undefined ? `${dropCoords.bottom}px` : undefined,
              left: `${dropCoords.left}px`,
              width: `${dropCoords.width}px`,
              maxHeight: `${dropCoords.maxHeight}px`,
              zIndex: 99999,
            }}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_20px_45px_rgba(15,23,42,0.22)] py-2 overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {openDrop === "zona" && ZONAS.map((z) => (
              <button
                key={z}
                type="button"
                role="option"
                aria-selected={zona === z}
                onClick={() => { setZona(z); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  zona === z ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{z}</span>
                {zona === z && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
              </button>
            ))}

            {openDrop === "tipo" && TIPOS.map((tItem) => (
              <button
                key={tItem}
                type="button"
                role="option"
                aria-selected={tipo === tItem}
                onClick={() => { setTipo(tItem); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{tItem}</span>
                {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
              </button>
            ))}
          </div>,
          document.body
        )}

        {/* ── 4. MÉTRICAS: CAPA INFERIOR INTEGRADA EN EL HERO ── */}
        <div className="w-full max-w-[1020px] mx-auto mt-2 sm:mt-3 pt-4 sm:pt-5 pb-2 border-t border-slate-200/80">
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