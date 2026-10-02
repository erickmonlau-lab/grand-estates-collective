import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, MapPin, Home as HomeIcon, Tag, ChevronDown, Check, Users, ThumbsUp, Building2, User } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_desktop_opt.webp";
import interiorLeftBg from "@/assets/interior_santacoloma_opt.webp";
import { translations } from './data/translations';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
  customTag?: string;
  customHeadline?: React.ReactNode;
  customSubtitle?: string;
  customTrustBadge?: string;
  customValuationHref?: string;
  /** Pre-select a barrio on mount (used by neighbourhood pages) */
  initialBarrio?: string;
  /** Parent stores a reset function that restores hero to default state */
  onRegisterReset?: (resetFn: () => void) => void;
}

const BARRIOS = [
  "Todos los barrios",
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
  "Local comercial",
  "Chalet",
  "Oficina",
];

const PRECIOS_COMPRA = [
  "Cualquier precio",
  "Hasta 150.000 €",
  "150.000 - 250.000 €",
  "250.000 - 350.000 €",
  "350.000 - 500.000 €",
  "Más de 500.000 €",
];

const PRECIOS_ALQUILER = [
  "Cualquier precio",
  "Hasta 800 €",
  "800 - 1.200 €",
  "1.200 - 1.600 €",
  "Más de 1.600 €",
];

interface DropCoords {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}

export default function HeroCarousel({
  onPerformSearch,
  language = 'es',
  customTag,
  customHeadline,
  customSubtitle,
  initialBarrio,
  onRegisterReset,
}: HeroCarouselProps) {
  const t = translations[language];

  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [barrio, setBarrio] = useState("Todos los barrios");
  const [tipo, setTipo] = useState("Cualquier tipo");
  const [precio, setPrecio] = useState("Cualquier precio");
  const [openDrop, setOpenDrop] = useState<"barrio" | "tipo" | "precio" | null>(null);
  const [dropCoords, setDropCoords] = useState<DropCoords | null>(null);

  // Sync initialBarrio on mount (for neighbourhood pages)
  useEffect(() => {
    if (initialBarrio && BARRIOS.includes(initialBarrio)) {
      setBarrio(initialBarrio);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBarrio]);

  // Register reset function so parent can call it when "Ver todos" is clicked
  useEffect(() => {
    if (onRegisterReset) {
      onRegisterReset(() => {
        setMode("comprar");
        setBarrio("Todos los barrios");
        setTipo("Cualquier tipo");
        setPrecio("Cualquier precio");
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barrioTriggerRef = useRef<HTMLButtonElement | null>(null);
  const tipoTriggerRef = useRef<HTMLButtonElement | null>(null);
  const precioTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  // ALWAYS OPEN DOWNWARDS (Strictly requested: no upward flip, natural downward flow)
  // Shows approximately 5-7 options (maxHeight: 230px) with clean internal scrollbar
  const calculateCoords = (targetEl: HTMLElement): DropCoords => {
    const rect = targetEl.getBoundingClientRect();
    const vpHeight = window.innerHeight;
    const vpWidth = window.innerWidth;

    const minWidth = Math.min(vpWidth - 32, 280);
    const width = Math.max(rect.width, minWidth);

    let left = rect.left;
    if (left + width > vpWidth - 16) {
      left = Math.max(16, vpWidth - width - 16);
    }
    if (left < 16) left = 16;

    // Fixed compact height for 5-7 options with internal scroll
    const spaceBelow = vpHeight - rect.bottom;
    const maxHeight = Math.min(232, Math.max(160, spaceBelow - 16));

    return {
      top: rect.bottom + 6,
      left,
      width,
      maxHeight,
    };
  };

  const handleToggleDrop = (name: "barrio" | "tipo" | "precio", targetEl: HTMLButtonElement | null) => {
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
        barrioTriggerRef.current?.contains(target) ||
        tipoTriggerRef.current?.contains(target) ||
        precioTriggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDrop(null);
      setDropCoords(null);
    };

    const handleScrollOrResize = () => {
      if (openDrop === "barrio" && barrioTriggerRef.current) {
        setDropCoords(calculateCoords(barrioTriggerRef.current));
      } else if (openDrop === "tipo" && tipoTriggerRef.current) {
        setDropCoords(calculateCoords(tipoTriggerRef.current));
      } else if (openDrop === "precio" && precioTriggerRef.current) {
        setDropCoords(calculateCoords(precioTriggerRef.current));
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
    neighborhood: language === "ca" ? "BARRI" : language === "en" ? "NEIGHBORHOOD" : "BARRIO",
    type: language === "ca" ? "TIPUS" : language === "en" ? "TYPE" : "TIPO",
    price: language === "ca" ? "PREU" : language === "en" ? "PRICE" : "PRECIO",
    search: language === "ca" ? "BUSCAR" : language === "en" ? "SEARCH" : "BUSCAR",
  };

  const handleSearch = () => {
    onPerformSearch?.({
      mode,
      zona: barrio === "Todos los barrios" ? "Cualquier zona" : barrio,
      tipo: tipo === "Cualquier tipo" ? "Cualquier tipo" : tipo,
      precio: precio === "Cualquier precio" ? "Cualquier precio" : precio,
    });
    const el = document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 90 : 130;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
      window.history.replaceState(null, "", "#propiedades");
    }
  };

  const preciosActuales = mode === "comprar" ? PRECIOS_COMPRA : PRECIOS_ALQUILER;

  return (
    <section
      id="hero"
      className="hero relative text-slate-900 overflow-visible bg-[#f8fafc]"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── 1. BACKGROUND & PROTAGONIST PHOTOGRAPHY (RESTORED PRODUCTION COMPOSITION) ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Fondo base arquitectónico ultra limpio */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/70 to-[#e2e8f0]/40" />

        {/* Fotografía secundaria sutil de interior urbano realista (lado izquierdo) */}
        <div className="absolute inset-y-0 left-0 w-[42%] lg:w-[38%] xl:w-[35%] hidden md:flex items-center justify-start pointer-events-none z-0">
          <img
            src={interiorLeftBg}
            alt="Interior luminoso de vivienda en Santa Coloma"
            className="w-full h-full object-cover object-center opacity-[0.28] filter saturate-[0.80] contrast-[0.92] transition-opacity duration-500"
            loading="lazy"
            decoding="async"
            width={720}
            height={480}
          />
          {/* Difuminados perimetrales suaves que integran el interior con el fondo sin bordes de card */}
          <div className="absolute inset-y-0 right-0 w-36 lg:w-48 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
        </div>

        {/* Fotografía de la pareja: ÚNICAMENTE visible en tablet/desktop (hidden en mobile) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] hidden md:flex items-end justify-end pointer-events-none z-0">
          <picture className="w-full h-full block">
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgDesktop}
              alt="Familia sonriente en su nuevo hogar con Gesgrama"
              className="w-full h-full sm:object-cover sm:object-[center_12%] lg:object-contain lg:object-right-bottom opacity-85 sm:opacity-90 lg:opacity-95 transition-opacity"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={850}
              height={1113}
            />
          </picture>

          {/* Difuminados perimetrales suaves que funden la foto con el fondo sin cortar a los protagonistas */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-56 md:w-80 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent hidden sm:block" />
          <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent" />
        </div>

        {/* Gradiente radial central en desktop que protege el 100% de la legibilidad tipográfica y del buscador */}
        <div
          className="absolute inset-0 hidden sm:block pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 65% at 50% 38%, rgba(248,250,252,0.98) 0%, rgba(248,250,252,0.88) 45%, rgba(248,250,252,0.25) 80%, transparent 100%)',
          }}
        />

        {/* Fondo móvil: Limpio, luminoso y elegante con sutil halo radial azul Gesgrama (cero imágenes, máxima legibilidad y ligereza) */}
        <div 
          className="absolute inset-0 sm:hidden pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(37, 99, 235, 0.05) 0%, rgba(248, 250, 252, 0.95) 70%, #f8fafc 100%)'
          }}
        />
      </div>

      {/* ── 2. HERO CONTENT: EJE CENTRADO CON ALTURA GENEROSA Y ESPACIO RESERVADO ── */}
      <div
        className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-16 md:pb-20 flex flex-col items-center text-center"
      >
        {/* Bloque de marca y titular centrado */}
        <div className="relative z-10 w-full max-w-[840px] mx-auto flex flex-col items-center text-center">

          {/* Eyebrow / Kicker */}
          <div className="mb-3 sm:mb-3.5">
            <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] px-4 sm:px-5 py-1.5 rounded-full font-sans shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 shrink-0" />
              {customTag || L.tag}
            </span>
          </div>

          {/* H1 Principal */}
          <h1
            className="font-bold text-[#0b214a] tracking-normal leading-[1.06] mb-3 sm:mb-3.5 font-heading max-w-[780px] mx-auto"
            style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.6rem)' }}
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

          {/* Subtítulo: tipografía sans limpia, navy muy oscuro / negro (#0b214a), font-semibold (600), legible, generoso line-height */}
          <p
            className="text-[#0b214a] font-sans font-semibold text-base sm:text-lg md:text-[19px] leading-relaxed max-w-[580px] mx-auto text-balance tracking-normal mb-2"
          >
            {customSubtitle || L.subtitle}
          </p>
        </div>

        {/* ── 3. QUICK SEARCH CENTRADO: BARRIO / TIPO / PRECIO / BUSCAR ── */}
        <div
          className="relative z-40 w-full max-w-[1060px] mx-auto mt-4 sm:mt-5 mb-8 sm:mb-16 md:mb-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.10)] flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-2.5 transition-all hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:border-blue-200"
          >
            {/* Toggle Comprar / Alquilar */}
            <div className="flex bg-[#f1f5f9] rounded-xl sm:rounded-full shrink-0 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("comprar");
                  setPrecio("Cualquier precio");
                }}
                className={`px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "comprar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.buy}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("alquilar");
                  setPrecio("Cualquier precio");
                }}
                className={`px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-sans font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                  mode === "alquilar"
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-1" />

            {/* Selector BARRIO */}
            <div className="relative flex-1 min-w-0">
              <button
                ref={barrioTriggerRef}
                type="button"
                aria-expanded={openDrop === "barrio"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("barrio", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all cursor-pointer border ${
                  openDrop === "barrio"
                    ? "bg-blue-50/90 border-[#2563eb] ring-1 ring-[#2563eb]/30 shadow-xs"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <MapPin className="w-4 h-4 shrink-0 text-[#2563eb]" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans font-black text-slate-600 uppercase tracking-wider leading-none">
                      {L.neighborhood}
                    </span>
                    <span className="block text-xs sm:text-[14px] font-sans font-bold text-[#0b214a] truncate mt-0.5">
                      {barrio === "Todos los barrios" ? (language === "ca" ? "Tots els barris" : language === "en" ? "All areas" : "Todos") : barrio}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-all ${openDrop === "barrio" ? "rotate-180 text-[#2563eb]" : "text-slate-500"}`} />
              </button>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-1" />

            {/* Selector TIPO */}
            <div className="relative flex-1 min-w-0">
              <button
                ref={tipoTriggerRef}
                type="button"
                aria-expanded={openDrop === "tipo"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("tipo", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all cursor-pointer border ${
                  openDrop === "tipo"
                    ? "bg-blue-50/90 border-[#2563eb] ring-1 ring-[#2563eb]/30 shadow-xs"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <HomeIcon className="w-4 h-4 shrink-0 text-[#2563eb]" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans font-black text-slate-600 uppercase tracking-wider leading-none">
                      {L.type}
                    </span>
                    <span className="block text-xs sm:text-[14px] font-sans font-bold text-[#0b214a] truncate mt-0.5">
                      {tipo === "Cualquier tipo" ? (language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo") : tipo}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-all ${openDrop === "tipo" ? "rotate-180 text-[#2563eb]" : "text-slate-500"}`} />
              </button>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-200 shrink-0 mx-1" />

            {/* Selector PRECIO */}
            <div className="relative flex-1 min-w-0">
              <button
                ref={precioTriggerRef}
                type="button"
                aria-expanded={openDrop === "precio"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("precio", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all cursor-pointer border ${
                  openDrop === "precio"
                    ? "bg-blue-50/90 border-[#2563eb] ring-1 ring-[#2563eb]/30 shadow-xs"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1">
                  <Tag className="w-4 h-4 shrink-0 text-[#2563eb]" />
                  <div className="min-w-0">
                    <span className="block text-[11px] font-sans font-black text-slate-600 uppercase tracking-wider leading-none">
                      {L.price}
                    </span>
                    <span className="block text-xs sm:text-[14px] font-sans font-bold text-[#0b214a] truncate mt-0.5">
                      {precio === "Cualquier precio" ? (language === "ca" ? "Sense límit" : language === "en" ? "Any price" : "Cualquiera") : precio}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-all ${openDrop === "precio" ? "rotate-180 text-[#2563eb]" : "text-slate-500"}`} />
              </button>
            </div>

            {/* Botón BUSCAR */}
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-full font-sans font-extrabold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all shrink-0 select-none mt-2 sm:mt-0"
            >
              <Search className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="leading-none translate-y-[1px]">{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── DROPDOWNS: SIEMPRE HACIA ABAJO CON PORTAL Y SCROLL INTERNO DISCRETO ── */}
        {openDrop && dropCoords && typeof document !== "undefined" && createPortal(
          <div
            ref={dropdownMenuRef}
            role="listbox"
            tabIndex={-1}
            style={{
              position: "fixed",
              top: `${dropCoords.top}px`,
              left: `${dropCoords.left}px`,
              width: `${dropCoords.width}px`,
              maxHeight: `${dropCoords.maxHeight}px`,
              zIndex: 99999,
            }}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.14)] py-1.5 overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5 dropdown-scrollbar font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {openDrop === "barrio" && BARRIOS.map((b) => (
              <button
                key={b}
                type="button"
                role="option"
                aria-selected={barrio === b}
                onClick={() => { setBarrio(b); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  barrio === b ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{b}</span>
                {barrio === b && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
              </button>
            ))}

            {openDrop === "tipo" && TIPOS.map((tItem) => (
              <button
                key={tItem}
                type="button"
                role="option"
                aria-selected={tipo === tItem}
                onClick={() => { setTipo(tItem); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  tipo === tItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{tItem}</span>
                {tipo === tItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
              </button>
            ))}

            {openDrop === "precio" && preciosActuales.map((pItem) => (
              <button
                key={pItem}
                type="button"
                role="option"
                aria-selected={precio === pItem}
                onClick={() => { setPrecio(pItem); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  precio === pItem ? "bg-blue-50 text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">{pItem}</span>
                {precio === pItem && <Check className="w-4 h-4 text-[#2563eb] shrink-0" />}
              </button>
            ))}
          </div>,
          document.body
        )}

        {/* ── 4. TRUST: BANDA UNIFICADA CON ICONOS AZUL GESGRAMA PURO Y MÁXIMA LEGIBILIDAD ── */}
        <div
          id="hero-trust-bar"
          className={`w-full max-w-[1020px] mx-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 ${
            openDrop ? "opacity-35 scale-[0.99] pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 items-center">

            {/* Métrica 1: Clientes (Icono Marino #0b214a, Número #0b214a) */}
            <div className="flex items-center justify-center gap-3.5 p-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0b214a] flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2.4]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#0b214a] leading-tight font-heading">4.500+</p>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#0b214a] mt-0.5 leading-snug">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Métrica 2: Satisfacción (Icono Azul Royal #2563eb, Número #2563eb) */}
            <div className="flex items-center justify-center gap-3.5 p-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-xs">
                <ThumbsUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2.4]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#2563eb] leading-tight font-heading">98%</p>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#0b214a] mt-0.5 leading-snug">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Métrica 3: Comunidades (Icono Marino #0b214a, Número #0b214a) */}
            <div className="flex items-center justify-center gap-3.5 p-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0b214a] flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2.4]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#0b214a] leading-tight font-heading">+300</p>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#0b214a] mt-0.5 leading-snug">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Métrica 4: Años (Icono Azul Royal #2563eb, Número #2563eb) */}
            <div className="flex items-center justify-center gap-3.5 p-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white stroke-[2.4]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#2563eb] leading-tight font-heading">15+</p>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#0b214a] mt-0.5 leading-snug">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}