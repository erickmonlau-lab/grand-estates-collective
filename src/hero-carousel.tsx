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
      className="hero relative text-slate-900 overflow-visible bg-[#f8fafc]"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── 1. FOTOGRAFÍA DE LA PAREJA COMPLETA + FONDO LUMINOSO CONTROLADO ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Fondo base ultra limpio, luminoso y arquitectónico */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/70 to-[#e2e8f0]/40" />

        {/* Fotografía de la pareja: visible completa, posicionada elegantemente sin recortar cuerpo ni cabezas */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] flex items-end justify-end pointer-events-none">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobileLcp} width={360} height={554} />
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgDesktop}
              alt="Familia sonriente en su nuevo hogar con Gesgrama"
              className="w-full h-full object-contain object-right-bottom sm:object-cover sm:object-[center_12%] lg:object-contain lg:object-right-bottom opacity-85 sm:opacity-90 lg:opacity-95 transition-opacity"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={850}
              height={1113}
            />
          </picture>

          {/* Difuminado suave lateral y vertical para fundir la foto con el fondo claro sin tapar ni cortar a la pareja */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-56 md:w-80 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent hidden sm:block" />
          <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent" />
        </div>

        {/* Difuminado sutil central que asegura 100% de legibilidad en los textos y buscador */}
        <div
          className="absolute inset-0 hidden sm:block pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 65% at 38% 38%, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0.85) 50%, rgba(248,250,252,0.30) 80%, transparent 100%)',
          }}
        />

        {/* En móvil: velo translúcido equilibrado que asegura nitidez total de texto y foto */}
        <div className="absolute inset-0 bg-[#f8fafc]/80 sm:hidden" />
      </div>

      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-18 md:pb-20 flex flex-col items-center text-center"
      >
        {/* ── 2. BRANDING Y TITULAR ESTRICTAMENTE CENTRADOS CON MÁXIMA ELEGANCIA ── */}
        <div className="relative z-10 w-full max-w-[840px] mx-auto flex flex-col items-center text-center">

          {/* Eyebrow / Kicker */}
          <div className="mb-3 sm:mb-3.5">
            <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] px-4 sm:px-5 py-1.5 rounded-full font-sans shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 shrink-0" />
              {customTag || L.tag}
            </span>
          </div>

          {/* H1 — Navy + Azul Gesgrama sobre el eje central exacto */}
          <h1
            className="font-black text-[#0b214a] tracking-tight leading-[1.04] mb-3 sm:mb-3.5 font-heading max-w-[760px] mx-auto"
            style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}
          >
            {customHeadline ? (
              customHeadline
            ) : (
              <>
                <span className="block text-[#0b214a]">{L.titleLine1}</span>
                <span className="text-[#2563eb] block mt-1">{L.titleLine2}</span>
              </>
            )}
          </h1>

          {/* Subtítulo: conciso, 1-2 líneas, oscuro y nítido */}
          <p
            className="text-slate-700 font-bold leading-relaxed max-w-[600px] mx-auto text-balance text-sm sm:text-base md:text-lg mb-2"
          >
            {customSubtitle || L.subtitle}
          </p>
        </div>

        {/* ── 3. BUSCADOR SEARCH-FIRST CENTRADO CON AIRE Y SOMBRA NATURAL ── */}
        <div
          className="relative z-40 w-full max-w-[1020px] mx-auto mt-4 sm:mt-5 mb-10 sm:mb-12"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_22px_55px_rgba(15,23,42,0.12)] flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-2.5 transition-all hover:shadow-[0_26px_65px_rgba(37,99,235,0.16)] hover:border-blue-200"
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

            {/* Botón BUSCAR */}
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

        {/* ── 4. TRUST: ZONA DE CONTRASTE ESTABLE (CARD ELEGANTE TRASLÚCIDA DE ALTA LEGIBILIDAD) ── */}
        <div className="w-full max-w-[1020px] mx-auto bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">

            {/* Métrica 1: Clientes */}
            <div className="flex items-center justify-center gap-3.5 p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2563eb] stroke-[2.2]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#0b214a] leading-tight font-heading">4.500+</p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 leading-snug">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Métrica 2: Satisfacción */}
            <div className="flex items-center justify-center gap-3.5 p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <ThumbsUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2563eb] stroke-[2.2]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#2563eb] leading-tight font-heading">98%</p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 leading-snug">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Métrica 3: Comunidades */}
            <div className="flex items-center justify-center gap-3.5 p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <Building2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2563eb] stroke-[2.2]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#0b214a] leading-tight font-heading">+300</p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 leading-snug">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Métrica 4: Años */}
            <div className="flex items-center justify-center gap-3.5 p-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2563eb] stroke-[2.2]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#2563eb] leading-tight font-heading">15+</p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5 leading-snug">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}