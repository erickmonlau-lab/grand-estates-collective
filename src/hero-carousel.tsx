import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, MapPin, Home as HomeIcon, Tag, ChevronDown, Check, Users, ThumbsUp, Building2, User, ArrowRight } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_desktop_opt.webp";
import interiorLeftBg from "@/assets/interior_santacoloma_opt.webp";
import { translations } from './data/translations';
import { formatLocation } from './data/properties';
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { GesgramaHeroMascotIcon } from "@/components/GesgramaHeroMascotIcon";

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
  /** Reduce bottom padding when an external MarqueeRibbon immediately follows the hero */
  compactBottom?: boolean;
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
  compactBottom = false,
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

    const handleScroll = () => {
      setOpenDrop(null);
      setDropCoords(null);
    };

    const handleResize = () => {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
      ? "Compra, ven i lloga habitatges. També gestionem comunitats de propietaris amb transparència i atenció propera a Santa Coloma de Gramenet i Barcelona."
      : language === "en"
      ? "Buy, sell and rent properties. We also manage homeowners associations with transparency and personal service in Santa Coloma de Gramenet and Barcelona."
      : "Compra, vende y alquila viviendas. También gestionamos comunidades de propietarios con transparencia y atención cercana en Santa Coloma de Gramenet y Barcelona.",
    tagInmo: language === "ca" ? "IMMOBILIÀRIA" : language === "en" ? "REAL ESTATE" : "INMOBILIARIA",
    tagFincas: language === "ca" ? "ADMINISTRACIÓ DE FINQUES" : language === "en" ? "PROPERTY MANAGEMENT" : "ADMINISTRACIÓN DE FINCAS",
    btnFincas: language === "ca" ? "ADMINISTRACIÓ DE FINQUES" : language === "en" ? "PROPERTY MANAGEMENT" : "ADMINISTRACIÓN DE FINCAS",
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
    const scrollToTarget = () => {
      const target =
        document.getElementById("propiedades") ||
        document.getElementById("catalogo-inmuebles") ||
        document.querySelector("#seccion-propiedades > div") ||
        document.getElementById("properties-results");
      if (target) {
        const navOffset = window.innerWidth < 768 ? 75 : 85;
        const pos = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
        window.history.replaceState(null, "", "#propiedades");
      }
    };
    scrollToTarget();
    // En móviles con renderizado asíncrono, asegurar tras el tick de React
    requestAnimationFrame(() => {
      setTimeout(scrollToTarget, 50);
    });
  };

  const preciosActuales = mode === "comprar" ? PRECIOS_COMPRA : PRECIOS_ALQUILER;

  return (
    <section
      id="hero"
      className="hero relative text-[#111111] overflow-hidden bg-[#FAF9FC] border-b-2 border-[#111111]"
      onClick={() => setOpenDrop(null)}
    >
      {/* ── 1. BACKGROUND & PROTAGONIST ARCHITECTURAL BASE ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#FAF9FC]">
        {/* Grilla sutil neo-brutalist arquitectónica de fondo */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Fotografía secundaria sutil de interior urbano realista (lado izquierdo) */}
        <div className="absolute inset-y-0 left-0 w-[42%] lg:w-[38%] xl:w-[35%] hidden md:flex items-center justify-start pointer-events-none z-0">
          <img
            src={interiorLeftBg}
            alt="Interior luminoso de vivienda en Santa Coloma"
            className="w-full h-full object-cover object-center opacity-[0.16] filter grayscale contrast-[1.1] transition-opacity duration-500"
            loading="lazy"
            decoding="async"
            width={720}
            height={480}
          />
          <div className="absolute inset-y-0 right-0 w-36 lg:w-48 bg-gradient-to-l from-[#FAF9FC] to-transparent" />
        </div>

        {/* Fotografía de la pareja: ÚNICAMENTE visible en tablet/desktop */}
        <div className="absolute inset-y-0 right-0 w-[48%] lg:w-[45%] xl:w-[42%] hidden md:flex items-end justify-end pointer-events-none z-0">
          <picture className="w-full h-full block">
            <source media="(min-width: 641px)" srcSet={heroBgDesktop} width={850} height={1113} />
            <img
              src={heroBgDesktop}
              alt="Familia en su nuevo hogar con Gesgrama"
              className="w-full h-full object-cover object-[center_15%] opacity-[0.22] filter grayscale contrast-[1.05] transition-opacity duration-500"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width={850}
              height={1113}
            />
          </picture>
          <div className="absolute inset-y-0 left-0 w-36 lg:w-48 bg-gradient-to-r from-[#FAF9FC] to-transparent" />
        </div>
      </div>

      {/* ── 2. HERO CONTENT: EJE EDITORIAL NEO-BRUTALIST ── */}
      <div
        className={`relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 pt-28 sm:pt-32 md:pt-36 flex flex-col items-center text-center ${
          compactBottom ? 'pb-8 sm:pb-10' : 'pb-12 sm:pb-16 md:pb-20'
        }`}
      >
        {/* Bloque de marca y titular centrado */}
        <div className={`relative z-10 w-full mx-auto flex flex-col items-center text-center ${customHeadline ? 'max-w-[1000px]' : 'max-w-[880px]'}`}>

          {/* 1. DOS IDENTIFICADORES VISUALES DIFERENCIADOS: INMOBILIARIA + ADMINISTRACIÓN DE FINCAS */}
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Identificador 1: INMOBILIARIA (Azul corporativo #2860F5, icono blanco, texto blanco, esquinas redondeadas 12px) */}
            <div className="h-[46px] sm:h-[50px] px-4 sm:px-5 bg-[#2860F5] text-white border-2 border-[#111111] rounded-[12px] shadow-[2px_2px_0px_#111111] flex items-center gap-2.5 select-none">
              <HomeIcon className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-white stroke-[2.5] shrink-0" />
              <span className="font-headline font-bold text-[13px] sm:text-[15px] uppercase tracking-wider whitespace-nowrap">
                {L.tagInmo}
              </span>
            </div>

            {/* Identificador 2: ADMINISTRACIÓN DE FINCAS (Blanco sólido, borde azul #2860F5 de 2px, Mascota/Ilustración original de Gesgrama a la izquierda, texto negro) */}
            <a
              href="/administrador-fincas"
              className="h-[46px] sm:h-[50px] pl-2.5 pr-4 sm:pl-3 sm:pr-5 bg-white hover:bg-slate-50 text-[#111111] border-2 border-[#2860F5] rounded-[12px] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <img
                src="/images/gesgrama_mascota_oficial.webp"
                alt="Gesgrama Administración de Fincas"
                width={64}
                height={42}
                className="h-[36px] sm:h-[42px] w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
                loading="eager"
              />
              <span className="font-headline font-bold text-[13px] sm:text-[15px] uppercase tracking-wider whitespace-nowrap text-[#111111]">
                {L.tagFincas}
              </span>
            </a>
          </div>

          {/* H1 Principal: Space Grotesk, negro puro #111111 y azul corporativo sólido #2860F5 */}
          <h1
            className={`font-headline font-black text-[#111111] tracking-tight mx-auto mb-4 sm:mb-5 leading-[1.05] sm:leading-[1.02] text-balance ${
              customHeadline ? 'max-w-[1000px]' : 'max-w-[840px]'
            }`}
            style={{ fontSize: customHeadline ? 'clamp(2.1rem, 5vw, 4.2rem)' : 'clamp(2.35rem, 5.8vw, 4.75rem)' }}
          >
            {customHeadline ? (
              customHeadline
            ) : (
              <>
                <span className="block text-[#111111]">{L.titleLine1}</span>
                <span className="text-[#2860F5] block mt-1">{L.titleLine2}</span>
              </>
            )}
          </h1>

          {/* Subtítulo: Inter font-medium/semibold, negro sólido #111111, tamaño generoso */}
          <p
            className="text-[#111111] font-sans font-medium text-base sm:text-lg md:text-[19px] leading-relaxed max-w-[780px] mx-auto text-balance tracking-normal mb-0"
          >
            {customSubtitle || L.subtitle}
          </p>
        </div>

        {/* ── 3. QUICK SEARCH CENTRADO NEO-BRUTALIST: RECTANGULAR, 2PX BORDER, HARD SHADOW ── */}
        <div
          className="relative z-40 w-full max-w-[1240px] mx-auto mt-6 sm:mt-8 md:mt-9 mb-5 sm:mb-8 md:mb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white border-2 border-[#111111] rounded-[24px] sm:rounded-full shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-2.5 transition-all"
          >
            {/* Toggle Comprar / Alquilar: Botones rectangulares neo-brutalist */}
            <div className="w-full sm:w-auto flex bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl sm:rounded-full shrink-0 p-1 mb-2.5 sm:mb-0 gap-1">
              <button
                type="button"
                onClick={() => {
                  setMode("comprar");
                  setPrecio("Cualquier precio");
                }}
                className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm md:text-[14px] font-headline font-black uppercase tracking-wider transition-all cursor-pointer select-none text-center whitespace-nowrap border-2 ${
                  mode === "comprar"
                    ? "bg-[#2860F5] text-white border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-transparent text-[#111111] border-transparent hover:bg-slate-200"
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
                className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm md:text-[14px] font-headline font-black uppercase tracking-wider transition-all cursor-pointer select-none text-center whitespace-nowrap border-2 ${
                  mode === "alquilar"
                    ? "bg-[#2860F5] text-white border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-transparent text-[#111111] border-transparent hover:bg-slate-200"
                }`}
              >
                {L.rent}
              </button>
            </div>

            {/* Separador vertical sólido para desktop */}
            <div className="hidden sm:block w-[1.5px] h-10 bg-[#111111] shrink-0 mx-1.5" />

            {/* Selector BARRIO */}
            <div className="relative flex-1 min-w-0 border-b-2 sm:border-b-0 border-[#111111] pb-2 sm:pb-0 mb-2 sm:mb-0">
              <button
                ref={barrioTriggerRef}
                type="button"
                aria-expanded={openDrop === "barrio"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("barrio", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-full transition-all cursor-pointer border-2 ${
                  openDrop === "barrio"
                    ? "bg-[#FAF9FC] border-[#111111] shadow-[2px_2px_0px_#2860F5]"
                    : "border-transparent hover:border-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
                  <div className="w-8 h-8 bg-[#2860F5] text-white rounded-full border border-[#111111] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-[12px] font-headline font-black text-[#111111] uppercase tracking-wider leading-none">
                      {L.neighborhood}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-sans font-bold text-[#111111] whitespace-nowrap mt-0.5">
                      {barrio === "Todos los barrios" ? (language === "ca" ? "Tots els barris" : language === "en" ? "All areas" : "Todos") : formatLocation(barrio, language || "es")}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all text-[#111111] stroke-[2.5] ${openDrop === "barrio" ? "rotate-180 text-[#2860F5]" : ""}`} />
              </button>
            </div>

            {/* Separador vertical sólido para desktop */}
            <div className="hidden sm:block w-[1.5px] h-10 bg-[#111111] shrink-0 mx-1.5" />

            {/* Selector TIPO */}
            <div className="relative flex-1 min-w-0 border-b-2 sm:border-b-0 border-[#111111] pb-2 sm:pb-0 mb-2 sm:mb-0">
              <button
                ref={tipoTriggerRef}
                type="button"
                aria-expanded={openDrop === "tipo"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("tipo", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-full transition-all cursor-pointer border-2 ${
                  openDrop === "tipo"
                    ? "bg-[#FAF9FC] border-[#111111] shadow-[2px_2px_0px_#2860F5]"
                    : "border-transparent hover:border-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
                  <div className="w-8 h-8 bg-[#2860F5] text-white rounded-full border border-[#111111] flex items-center justify-center shrink-0">
                    <HomeIcon className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-[12px] font-headline font-black text-[#111111] uppercase tracking-wider leading-none">
                      {L.type}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-sans font-bold text-[#111111] whitespace-nowrap mt-0.5">
                      {tipo === "Cualquier tipo" ? (language === "ca" ? "Qualsevol tipus" : language === "en" ? "Any type" : "Cualquier tipo") : tipo}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all text-[#111111] stroke-[2.5] ${openDrop === "tipo" ? "rotate-180 text-[#2860F5]" : ""}`} />
              </button>
            </div>

            {/* Separador vertical sólido para desktop */}
            <div className="hidden sm:block w-[1.5px] h-10 bg-[#111111] shrink-0 mx-1.5" />

            {/* Selector PRECIO */}
            <div className="relative flex-1 min-w-0 mb-3 sm:mb-0">
              <button
                ref={precioTriggerRef}
                type="button"
                aria-expanded={openDrop === "precio"}
                aria-haspopup="listbox"
                onClick={(e) => handleToggleDrop("precio", e.currentTarget)}
                className={`w-full flex items-center justify-between text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-full transition-all cursor-pointer border-2 ${
                  openDrop === "precio"
                    ? "bg-[#FAF9FC] border-[#111111] shadow-[2px_2px_0px_#2860F5]"
                    : "border-transparent hover:border-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
                  <div className="w-8 h-8 bg-[#2860F5] text-white rounded-full border border-[#111111] flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-[12px] font-headline font-black text-[#111111] uppercase tracking-wider leading-none">
                      {L.price}
                    </span>
                    <span className="block text-sm sm:text-[15px] font-sans font-bold text-[#111111] whitespace-nowrap mt-0.5">
                      {precio === "Cualquier precio" ? (language === "ca" ? "Sense límit" : language === "en" ? "Any price" : "Cualquier precio") : precio}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all text-[#111111] stroke-[2.5] ${openDrop === "precio" ? "rotate-180 text-[#2860F5]" : ""}`} />
              </button>
            </div>

            {/* Botón BUSCAR Neo-Brutalist: Rectangular, azul sólido #2860F5, texto Space Grotesk blanco */}
            <button
              type="button"
              onClick={handleSearch}
              className="w-full sm:w-auto bg-[#2860F5] hover:bg-[#111111] text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] font-headline font-black text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2.5 cursor-pointer transition-all shrink-0 select-none"
            >
              <Search className="w-5 h-5 stroke-[3] text-white shrink-0" />
              <span className="leading-none">{L.search}</span>
            </button>
          </div>
        </div>

        {/* ── DROPDOWNS: RECTANGULARES CON BORDES DE 2PX Y SOMBRA DURA ── */}
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
            className="bg-white border-2 border-[#111111] rounded-2xl shadow-[0_12px_36px_rgba(17,17,17,0.2)] py-2 overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-100 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {openDrop === "barrio" && BARRIOS.map((b) => (
              <button
                key={b}
                type="button"
                role="option"
                aria-selected={barrio === b}
                onClick={() => { setBarrio(b); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-bold flex items-center justify-between transition-colors cursor-pointer border-b border-slate-100 last:border-b-0 ${
                  barrio === b ? "bg-[#2860F5] text-white" : "text-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <span className="truncate">{b}</span>
                {barrio === b && <Check className="w-4 h-4 text-white stroke-[3] shrink-0" />}
              </button>
            ))}

            {openDrop === "tipo" && TIPOS.map((tItem) => (
              <button
                key={tItem}
                type="button"
                role="option"
                aria-selected={tipo === tItem}
                onClick={() => { setTipo(tItem); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-bold flex items-center justify-between transition-colors cursor-pointer border-b border-slate-100 last:border-b-0 ${
                  tipo === tItem ? "bg-[#2860F5] text-white" : "text-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <span className="truncate">{tItem}</span>
                {tipo === tItem && <Check className="w-4 h-4 text-white stroke-[3] shrink-0" />}
              </button>
            ))}

            {openDrop === "precio" && preciosActuales.map((pItem) => (
              <button
                key={pItem}
                type="button"
                role="option"
                aria-selected={precio === pItem}
                onClick={() => { setPrecio(pItem); setOpenDrop(null); setDropCoords(null); }}
                className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-sans font-bold flex items-center justify-between transition-colors cursor-pointer border-b border-slate-100 last:border-b-0 ${
                  precio === pItem ? "bg-[#2860F5] text-white" : "text-[#111111] hover:bg-[#FAF9FC]"
                }`}
              >
                <span className="truncate">{pItem}</span>
                {precio === pItem && <Check className="w-4 h-4 text-white stroke-[3] shrink-0" />}
              </button>
            ))}
          </div>,
          document.body
        )}

        {/* ── 4. TRUST BAR: RECTANGULAR, 4 CAJAS NEO-BRUTALIST CON JETBRAINS MONO Y SPACE GROTESK ── */}
        <div
          id="hero-trust-bar"
          className={`w-full max-w-[1140px] mx-auto bg-white border-2 border-[#111111] rounded-[22px] shadow-[4px_4px_0px_#111111] p-4 sm:p-5 mb-2 sm:mb-0 transition-all duration-200 ${
            openDrop ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch">

            {/* Métrica 1: Clientes */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111111] text-white rounded-xl border border-[#111111] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-2xl sm:text-3xl font-data-mono font-black text-[#111111] leading-none">4.500+</p>
                <p className="text-xs sm:text-sm font-headline font-bold text-[#111111] uppercase tracking-wide mt-1 leading-tight">{t.heroCarousel.stats.clientesLabel}</p>
              </div>
            </div>

            {/* Métrica 2: Satisfacción */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2860F5] text-white rounded-xl border border-[#111111] flex items-center justify-center shrink-0">
                <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-2xl sm:text-3xl font-data-mono font-black text-[#2860F5] leading-none">98%</p>
                <p className="text-xs sm:text-sm font-headline font-bold text-[#111111] uppercase tracking-wide mt-1 leading-tight">{t.heroCarousel.stats.satisfaccionLabel}</p>
              </div>
            </div>

            {/* Métrica 3: Comunidades */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111111] text-white rounded-xl border border-[#111111] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-2xl sm:text-3xl font-data-mono font-black text-[#111111] leading-none">+300</p>
                <p className="text-xs sm:text-sm font-headline font-bold text-[#111111] uppercase tracking-wide mt-1 leading-tight">{t.heroCarousel.stats.comunidadesLabel}</p>
              </div>
            </div>

            {/* Métrica 4: Años */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2860F5] text-white rounded-xl border border-[#111111] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-2xl sm:text-3xl font-data-mono font-black text-[#2860F5] leading-none">15+</p>
                <p className="text-xs sm:text-sm font-headline font-bold text-[#111111] uppercase tracking-wide mt-1 leading-tight">{t.heroCarousel.stats.anosLabel}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── 5. RIBBON: CIERRE VISUAL DEL HERO EN TODOS LOS BREAKPOINTS ── */}
      {/* En flujo normal como último hijo — sin position:absolute ni margins artificiales */}
      <MarqueeRibbon language={language} />

    </section>
  );
}