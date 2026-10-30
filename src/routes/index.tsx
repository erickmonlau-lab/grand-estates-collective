import { DrawnUnderline } from "@/components/DrawnUnderline";
import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties, formatLocation } from "../data/properties";
import { subscribeProperties, fetchProperties, getLocalProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { MapPin, Building2, Phone, Mail, ChevronDown, ArrowRight, Check, Heart, Star, Home, Clock, Scale, Shield, TrendingUp, Paintbrush, Wrench, Bath, Maximize2, Sparkles, CheckCircle2, Quote, Info, Key, Search } from "lucide-react";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ServicesSection } from '@/components/ServicesSection';
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
const CookieBanner = lazy(() => import('@/components/CookieBanner'));
const FooterMascot = lazy(() => import('@/components/FooterMascot').then(m => ({ default: m.FooterMascot })));
const AccreditationBadges = lazy(() => import('@/components/AccreditationBadges').then(m => ({ default: m.AccreditationBadges })));
const ValuatorSection = lazy(() => import('@/components/ValuatorSection'));
const CoberturaSection = lazy(() => import('@/components/CoberturaSection'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const ServiceModal = lazy(() => import('@/components/ServiceModal'));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gesgrama · Inmobiliaria y Fincas en Santa Coloma de Gramenet" },
      { name: "description", content: "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet. Valoración online gratuita, compraventa de pisos y gestión de comunidades. Llámanos al 93 468 56 56." },
      { name: "keywords", content: "gesgrama, administrador de fincas santa coloma de gramenet, inmobiliaria santa coloma de gramenet, administracion comunidades barcelona, vender piso santa coloma, valoracion inmueble santa coloma" },
      { property: "og:title", content: "Gesgrama · Inmobiliaria y Fincas en Santa Coloma de Gramenet" },
      { property: "og:description", content: "Gestión experta de comunidades, compraventa de pisos y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana. +15 años de experiencia." },
      { property: "og:url", content: "https://gesgrama.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://gesgrama.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Valoración Inmobiliaria Online en Santa Coloma de Gramenet",
          "serviceType": "Tasación y valoración inmobiliaria",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Gesgrama",
            "url": "https://gesgrama.com",
            "telephone": "+34934685656",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. dels Banús, 49",
              "addressLocality": "Santa Coloma de Gramenet",
              "postalCode": "08923",
              "addressCountry": "ES"
            }
          },
          "areaServed": {
            "@type": "City",
            "name": "Santa Coloma de Gramenet"
          },
          "description": "Herramienta inteligente de estimación del precio de mercado m² para pisos y comunidades en todos los barrios de Santa Coloma de Gramenet."
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo se gestiona el cambio de administración a Gesgrama?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nos encargamos de todo el proceso de transición sin coste adicional: solicitamos la documentación al administrador anterior, auditamos el estado de las cuentas y convocamos la junta inicial."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué documentación necesito para vender mi piso con vosotros?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Necesitarás la escritura de propiedad, DNI/NIE, certificado de eficiencia energética, cédula de habitabilidad y el último recibo del IBI. Nosotros nos encargamos de tramitar lo que te falte."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cómo garantizáis el cobro del alquiler si el inquilino no paga?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ofrecemos un servicio integral de gestión de alquileres con seguro de impago garantizado, estudio de solvencia scoring del inquilino y cobertura legal ante cualquier eventualidad."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué área geográfica cubrís para administración de fincas?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestra sede central está en Santa Coloma de Gramenet y damos cobertura directa en todo el área metropolitana de Barcelona, Maresme y Vallès."
              }
            }
          ]
        })
      }
    ],
  }),
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// TRANSLATIONS (es / en / ca)
// ---------------------------------------------------------------------------
import { translations, loadLanguage } from "../data/translations";

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function WhatsAppBrandIcon({ className = "w-4 h-4 fill-current shrink-0" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className={className}>
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
    </svg>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
const parsePrice = (priceStr: string) => {
  if (priceStr.includes("Cualquier")) return Infinity;
  const cleanStr = priceStr.replace(/[^\d]/g, '');
  return parseInt(cleanStr, 10);
};

const isPriceValid = (priceStr: string, propertyPrice: number) => {
  if (priceStr.includes("Cualquier")) return true;
  if (priceStr.includes("Hasta")) {
    const max = parsePrice(priceStr);
    return propertyPrice <= max;
  }
  if (priceStr.includes("Más de")) {
    const min = parsePrice(priceStr);
    return propertyPrice >= min;
  }
  // Rango: "1.000 - 1.500 €"
  const match = priceStr.match(/(\d[\d.]*)\s*-\s*(\d[\d.]*)/);
  if (match) {
    const min = parseInt(match[1].replace(/[^\d]/g, ''), 10);
    const max = parseInt(match[2].replace(/[^\d]/g, ''), 10);
    return propertyPrice >= min && propertyPrice <= max;
  }
  return true;
};
function Index() {
  const [language, setLanguageState] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        return stored;
      }
    }
    return "es";
  });

  const setLanguage = (lang: "es" | "en" | "ca") => {
    if (lang === "es") {
      setLanguageState("es");
      if (typeof window !== "undefined") {
        localStorage.setItem("language", "es");
        window.dispatchEvent(new Event("languagechange"));
      }
    } else {
      loadLanguage(lang).then(() => {
        setLanguageState(lang);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
          window.dispatchEvent(new Event("languagechange"));
        }
      });
    }
  };
  const t = translations[language];

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "ca" || stored === "en") {
        loadLanguage(stored).then(() => {
          setLanguageState(stored);
        });
      } else if (stored === "es") {
        setLanguageState("es");
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("languagechange", handleLangChange);
      window.addEventListener("storage", handleLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("languagechange", handleLangChange);
        window.removeEventListener("storage", handleLangChange);
      }
    };
  }, []);

  const [mountFloating, setMountFloating] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(() => setMountFloating(true), { timeout: 3000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setMountFloating(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const [searchParams, setSearchParams] = useState({
    mode: "comprar",
    zona: "Cualquier zona",
    tipo: "Cualquier tipo",
    precio: "Cualquier precio",
    habitaciones: "Cualquier número"
  });

  const [consoleFilters, setConsoleFilters] = useState({
    tipo: "Cualquier tipo",
    zona: "Cualquier zona",
    habitaciones: "Cualquier número",
    precio: "Cualquier precio"
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("recientes");
  const [visibleCount, setVisibleCount] = useState<number>(3);

  useEffect(() => {
    setConsoleFilters({
      tipo: searchParams.tipo,
      zona: searchParams.zona,
      habitaciones: searchParams.habitaciones || "Cualquier número",
      precio: searchParams.precio
    });
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // ── Dynamic HTML lang attribute for SEO ──
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleHeroSearch = (params: { mode: any; zona: string; tipo: string; precio: string }) => {
    setSearchParams({
      mode: params.mode,
      zona: params.zona,
      tipo: params.tipo,
      precio: params.precio,
      habitaciones: "Cualquier número"
    });
  };

  // Favorites state persisted directly in localStorage without login requirement
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("gesgrama_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try {
        localStorage.setItem("gesgrama_favorites", JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving favorites:", e);
      }
      return updated;
    });
  };

  const getTranslatedFilterLabel = (category: "tipo" | "zona" | "habitaciones" | "precio", val: string) => {
    if (category === "tipo") {
      if (val === "Cualquier tipo") return t.properties.anyType;
      if (val === "Piso") return language === "ca" ? "Pis" : language === "en" ? "Flat" : "Piso";
      if (val === "Apartamento") return language === "ca" ? "Apartament" : language === "en" ? "Apartment" : "Apartamento";
      if (val === "Ático") return language === "ca" ? "Àtic" : language === "en" ? "Penthouse" : "Ático";
      if (val === "Chalet" || val === "Chalet / Villa") return language === "ca" ? "Xalet / Vil·la" : language === "en" ? "Villa / House" : "Chalet / Villa";
      if (val === "Local" || val === "Local Comercial" || val === "Local comercial") return language === "ca" ? "Local comercial" : language === "en" ? "Commercial premises" : "Local Comercial";
      if (val === "Oficina") return language === "ca" ? "Oficina" : language === "en" ? "Office" : "Oficina";
      if (val === "Aparcamiento") return language === "ca" ? "Aparcament" : language === "en" ? "Parking space" : "Aparcamiento";
    }
    if (category === "zona") {
      if (val === "Cualquier zona") return t.properties.allZones;
      return formatLocation(val, language);
    }
    if (category === "habitaciones") {
      if (val === "Cualquier número") return (t.properties as any).anyBedrooms || t.properties.anyHab || "Cualquier número";
      if (val.includes("+")) return val.replace("+", "") + "+ " + t.properties.bedrooms.toLowerCase();
    }
    if (category === "precio") {
      if (val === "Cualquier precio") return t.properties.anyPrice;
      if (val.startsWith("Hasta ")) {
        const amount = val.replace("Hasta ", "");
        const prefix = language === "ca" ? "Fins a " : language === "en" ? "Up to " : "Hasta ";
        return prefix + amount;
      }
      if (val.endsWith("€")) return "< " + val;
    }
    return val;
  };

  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedServiceIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedServiceIndex]);

  const iconMap: Record<string, React.ReactNode> = {
    building: <Building2 className="w-7 h-7" />,
    home: <Home className="w-7 h-7" />,
    scale: <Scale className="w-7 h-7" />,
    clock: <Clock className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />
  };

  const [liveProperties, setLiveProperties] = useState<ExtendedProperty[]>(() => getLocalProperties());
  const heroResetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = subscribeProperties((list) => {
      setLiveProperties(prev => JSON.stringify(prev) === JSON.stringify(list) ? prev : list);
    });

    const refresh = () => {
      fetchProperties().then((data) => {
        if (data) setLiveProperties(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
      });
    };

    // Defer network fetch until initial render & paint are complete
    if (typeof window !== "undefined") {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(refresh, { timeout: 2500 });
      } else {
        setTimeout(refresh, 1500);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", refresh);
      window.addEventListener("focus", refresh);

      if (window.location.hash === "#formulario-contacto" || window.location.hash === "#contacto") {
        setTimeout(() => {
          const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
          if (formEl) {
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
            const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
            if (inputEl) {
              setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 400);
            }
          }
        }, 300);
      }
    }

    return () => {
      unsub();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", refresh);
        window.removeEventListener("focus", refresh);
      }
    };
  }, []);

  const zonas = [
    "Santa Rosa - Can Mariner",
    "Fondo",
    "Riu",
    "Centro",
    "El Raval",
    "Riera Alta - Llatí",
    "Singuerlín"
  ];
  const tipos = ["Piso", "Apartamento", "Ático", "Local comercial", "Chalet", "Oficina"];

  // Filter properties: exclude "vendido" and "alquilado" from the public listing
  // "disponible" and "reservado" remain visible to visitors
  const activeLiveProperties = liveProperties.filter(
    (p) => p.status !== "vendido" && p.status !== "alquilado"
  );

  // Filter and sort properties
  const filteredProperties = activeLiveProperties
    .filter(p => {
      if (searchParams.mode === "favoritos") {
        return favorites.includes(p.id);
      }
      const pOp = (p.operation || "comprar") as string;
      return pOp === searchParams.mode || (searchParams.mode === "comprar" && pOp === "compra");
    })
    .filter(p => {
      if (searchParams.mode === "favoritos") return true;
      return (searchParams.zona === 'Cualquier zona' ? true : (p.location && p.location.includes(searchParams.zona))) &&
             (searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo) &&
             isPriceValid(searchParams.precio, p.price) &&
             (searchParams.habitaciones === 'Cualquier número' || !searchParams.habitaciones || p.bedrooms >= parseInt(searchParams.habitaciones.replace("+", ""), 10));
    })
    .sort((a, b) => {
      if (sortOption === "precio_asc") return a.price - b.price;
      if (sortOption === "precio_desc") return b.price - a.price;
      return 0; // recientes / default order
    });

  // ── SINGLE SOURCE OF TRUTH ──
  // The cards displayed proceed exclusively from filteredProperties.
  // Count is ALWAYS filteredProperties.length.
  // When count === 0, show empty state and 0 property cards.
  const hasActiveFilters = searchParams.mode !== "favoritos" &&
    (searchParams.zona !== "Cualquier zona" || searchParams.tipo !== "Cualquier tipo" || searchParams.precio !== "Cualquier precio");

  const displayProperties = filteredProperties.slice(0, visibleCount);

  // Fallback properties when specific filter combination yields 0
  const relatedProperties = activeLiveProperties
    .filter(p => {
      const pOp = (p.operation || "comprar") as string;
      const targetMode = searchParams.mode === "favoritos" ? "comprar" : searchParams.mode;
      return pOp === targetMode || (targetMode === "comprar" && pOp === "compra");
    })
    .sort((a, b) => {
      if (sortOption === "precio_asc") return a.price - b.price;
      if (sortOption === "precio_desc") return b.price - a.price;
      return 0;
    })
    .slice(0, 6);

  return (
    <div className="bg-white text-onyx font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ── MAIN LANDMARK ── */}
      <main id="main-content">
        {/* ── 1. HERO SEARCH-FIRST COMPLETO ── */}
        <HeroCarousel
          onPerformSearch={handleHeroSearch}
          language={language}
          onRegisterReset={(fn) => { heroResetRef.current = fn; }}
        />

      {/* ── PROPERTIES GRID (REFERENCE IMAGE 1 STYLE) ── */}
      <section id="seccion-propiedades" className="relative overflow-hidden bg-[#FAF9FC] text-onyx py-8 md:py-12 border-t-2 border-[#111111]">
        <div id="propiedades" className="bg-white rounded-[24px] shadow-[4px_4px_0px_#111111] border-2 border-[#111111] p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1360px] relative z-10 scroll-mt-20 md:scroll-mt-24">
          <div>
            {/* Header: Encabezado Editorial Limpio + H2 con Drawn Underline + Descripción Compactada */}
            <div className="mb-6 sm:mb-8">
              {/* Encabezado editorial: INMOBILIARIA · SANTA COLOMA en azul corporativo, sin botón, sin borde negro rectangular, sin sombra dura */}
              <div className="flex items-center gap-2 text-[#2860F5] text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase mb-2">
                <Home className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                <span>{language === "ca" ? "IMMOBILIÀRIA · SANTA COLOMA" : language === "en" ? "REAL ESTATE · SANTA COLOMA" : "INMOBILIARIA · SANTA COLOMA"}</span>
              </div>

              {/* Titular principal: Space Grotesk, 42-46px, peso 700-800, azul #2860F5 con trazo orgánico Drawn */}
              <h2 key={language} className="text-3xl sm:text-4xl md:text-[44px] font-headline font-extrabold text-[#111111] leading-[1.15] tracking-tight mb-3 w-full" style={{ textWrap: "balance" }}>
                {language === "ca" ? (
                  <>Descobreix les nostres{" "}
                    <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                      millors oportunitats.
                      <DrawnUnderline color="#2860F5" />
                    </span>
                  </>
                ) : language === "en" ? (
                  <>Discover our{" "}
                    <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                      best properties.
                      <DrawnUnderline color="#2860F5" />
                    </span>
                  </>
                ) : (
                  <>Descubre nuestras{" "}
                    <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                      mejores oportunidades.
                      <DrawnUnderline color="#2860F5" />
                    </span>
                  </>
                )}
              </h2>

              {/* Descripción: 16-18px Inter / Sans font-medium text-[#111111] max-w-3xl */}
              <p className="text-[#333333] text-base sm:text-[17px] leading-relaxed font-sans font-medium max-w-3xl">
                {language === "ca"
                  ? "Selecció d'immobles a Santa Coloma i Barcelona gestionats amb total garantia i transparència per Gesgrama."
                  : language === "en"
                  ? "Selection of properties in Santa Coloma and Barcelona managed with full guarantee and transparency by Gesgrama."
                  : "Selección de inmuebles en Santa Coloma y Barcelona gestionados con total garantía y transparencia por Gesgrama."}
              </p>
            </div>

            {/* Unified Results Controls Bar: Barra integrada sólida y redondeada */}
            <div id="properties-results" className="scroll-mt-24 md:scroll-mt-28 mt-2 mb-6 p-2 sm:p-2.5 bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl shadow-[2px_2px_0px_#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
              {/* Left: Favoritos button sólido y redondeado */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: prev.mode === "favoritos" ? "comprar" : "favoritos" }))}
                  className={`h-[44px] px-4 rounded-xl text-sm font-headline font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] ${
                    searchParams.mode === "favoritos"
                      ? "bg-red-500 text-white"
                      : "bg-[#FFFFFF] text-[#111111] hover:bg-[#FAF9FC]"
                  }`}
                >
                  <Heart className={`w-4 h-4 fill-current shrink-0 ${searchParams.mode === "favoritos" ? "text-white" : "text-red-500"}`} />
                  <span>Favoritos ({favorites.length})</span>
                </button>
              </div>

              {/* Right: Counter + Sort en bloque integrado */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                <div
                  className="flex items-center gap-2 bg-[#FFFFFF] border-2 border-[#111111] rounded-xl px-3.5 h-[44px] shadow-[2px_2px_0px_#111111]"
                  aria-label={`${filteredProperties.length} ${t.properties.availableCount}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2860F5] shrink-0" />
                  <span className="text-sm font-headline font-black text-[#111111] tabular-nums">
                    {filteredProperties.length}
                  </span>
                  <span className="text-xs sm:text-sm font-headline font-bold text-[#111111]">{t.properties.availableCount}</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm relative" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === "ordenar" ? null : "ordenar")}
                    className="h-[44px] flex items-center gap-2 bg-[#FFFFFF] border-2 border-[#111111] hover:border-[#2860F5] rounded-xl px-3.5 py-1.5 font-headline font-bold text-[#111111] hover:text-[#2860F5] transition-all shadow-[2px_2px_0px_#111111] text-xs sm:text-sm cursor-pointer"
                  >
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] hidden sm:inline">{t.properties.sortBy}:</span>
                    <span>{sortOption === "precio_asc" ? t.properties.precioMenor : sortOption === "precio_desc" ? t.properties.precioMayor : t.properties.mostRecent}</span>
                    <ChevronDown className="w-4 h-4 text-[#111111] shrink-0 stroke-[2.5]" />
                  </button>

                  {openDropdown === "ordenar" && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_#111111] z-50 p-2 space-y-1">
                      {[
                        { label: t.properties.mostRecent, value: "recientes" },
                        { label: t.properties.precioMenor, value: "precio_asc" },
                        { label: t.properties.precioMayor, value: "precio_desc" }
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortOption(opt.value);
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-headline font-bold text-left transition-all cursor-pointer border ${
                            sortOption === opt.value ? "bg-[#2860F5] text-white border-[#111111] shadow-xs" : "border-transparent hover:border-[#111111] text-[#111111] hover:bg-[#FAF9FC]"
                          }`}
                        >
                          <span className="leading-snug">{opt.label}</span>
                          {sortOption === opt.value && <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.5]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── ACTIVE FILTER CHIPS — only when non-default filters applied ── */}
            {(searchParams.zona !== "Cualquier zona" || searchParams.tipo !== "Cualquier tipo" || searchParams.precio !== "Cualquier precio") && (
              <div className="flex flex-wrap items-center gap-2 mb-4 py-1">
                <span className="text-xs text-slate-500 font-semibold mr-1 shrink-0">
                  {language === "ca" ? "Filtrant per:" : language === "en" ? "Filtering by:" : "Filtrando por:"}
                </span>
                {searchParams.zona !== "Cualquier zona" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#0b214a] text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-md shrink-0">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {searchParams.zona}
                  </span>
                )}
                {searchParams.tipo !== "Cualquier tipo" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#0b214a] text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-md shrink-0">
                    <Home className="w-3 h-3 shrink-0" />
                    {searchParams.tipo}
                  </span>
                )}
                {searchParams.precio !== "Cualquier precio" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#0b214a] text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-md shrink-0">
                    {searchParams.precio}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const mode = searchParams.mode === "alquilar" ? "alquilar" : "comprar";
                    setSearchParams({ mode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                    heroResetRef.current?.();
                  }}
                  className="text-xs font-black text-slate-500 hover:text-[#2563eb] underline cursor-pointer ml-auto shrink-0"
                >
                  {language === "ca" ? "Veure tots" : language === "en" ? "See all" : "Ver todos"}
                </button>
              </div>
            )}

            {/* Single subtle divider line immediately before cards */}
            <div className="w-full h-px bg-slate-200 mb-5 sm:mb-6" />

            {/* RESULTS COUNT & SORTING (INSIDE CARD BUBBLE) */}
            {(() => {
              const renderPropertyCard = (property: any, idx: number) => {
                const isFav = favorites.includes(property.id);
                const pData = getTranslatedProperty(property, language, t.propertiesData);
                const isRent = (property.operation || "").toLowerCase() === "alquilar" || property.price < 5000;
                const type = pData.type || property.type || "Piso";

                return (
                  <div key={property.id} className="h-full">
                    <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} className="block h-full">
                      <div className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#2860F5] hover:border-[#2860F5] flex flex-col h-full transition-all duration-200 group cursor-pointer overflow-hidden">
                        
                        {/* 1. ZONA FOTOGRÁFICA EDITORIAL */}
                        <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden bg-slate-100 border-b-2 border-[#111111]">
                          <img 
                            src={property.image}
                            alt={pData.name} 
                            loading="lazy" 
                            decoding="async"
                            width={400}
                            height={240}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          
                          {/* Badges Rectangulares Sólidos */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                            <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[11px] sm:text-[12px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                              <span className={`w-2 h-2 ${isRent ? 'bg-amber-400' : 'bg-[#2860F5]'}`} />
                              <span>{isRent ? (language === "ca" ? "LLOGUER" : language === "en" ? "RENT" : "ALQUILER") : (language === "ca" ? "VENDA" : language === "en" ? "SALE" : "VENTA")}</span>
                            </span>
                            <span className="inline-flex items-center bg-[#2860F5] text-white text-[11px] sm:text-[12px] font-headline font-black uppercase tracking-wider px-2.5 py-1 border border-white">
                              {type}
                            </span>
                            {property.status === "reservado" && (
                              <span className="inline-flex items-center bg-amber-400 text-black font-headline font-black uppercase tracking-wider text-[11px] px-2 py-1 border border-black">
                                {language === "ca" ? "RESERVAT" : "RESERVADO"}
                              </span>
                            )}
                          </div>

                          {/* Botón Favorito Rectangular Sólido */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(property.id);
                            }}
                            aria-label="Guardar en favoritos"
                            className={`absolute top-3 right-3 w-9 h-9 border-2 border-[#111111] flex items-center justify-center transition-all z-20 cursor-pointer ${
                              isFav ? 'bg-red-500 text-white shadow-[2px_2px_0px_#111111]' : 'bg-white text-[#111111] hover:bg-slate-100 shadow-[2px_2px_0px_#111111]'
                            }`}
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>

                          {/* Ref Badge en JetBrains Mono */}
                          <div className="absolute bottom-2.5 left-3 z-20">
                            <span className="inline-flex items-center text-[11px] font-data-mono font-black text-white bg-[#111111] px-2 py-0.5 border border-white">
                              Ref: {property.ref || "PJ2024"}
                            </span>
                          </div>
                        </div>

                        {/* 2. ZONA INFORMATIVA ESTRUCTURADA */}
                        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                          <div>
                            {/* Barrio con Icono */}
                            <div className="mb-2">
                              <span className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-headline font-black text-[#2860F5] uppercase tracking-wider">
                                <MapPin className="w-3.5 h-3.5 text-[#2860F5] stroke-[2.5]" />
                                <span className="truncate">{formatLocation(pData.location || property.location, language)}</span>
                              </span>
                            </div>

                            {/* Título Inmueble */}
                            <h3 className="text-[19px] sm:text-[20px] font-headline font-black text-[#111111] mb-4 leading-snug group-hover:text-[#2860F5] transition-colors line-clamp-1">
                              {pData.name}
                            </h3>

                            {/* Rejilla de Características en JetBrains Mono y Bordes */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-xl py-2 px-1 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-headline font-bold text-slate-600 uppercase">Habs</span>
                                <span className="text-[16px] sm:text-[17px] font-data-mono font-black text-[#111111]">{property.bedrooms > 0 ? property.bedrooms : "0"}</span>
                              </div>
                              <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-xl py-2 px-1 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-headline font-bold text-slate-600 uppercase">{language === "ca" ? "Banys" : "Baños"}</span>
                                <span className="text-[16px] sm:text-[17px] font-data-mono font-black text-[#111111]">{property.bathrooms > 0 ? property.bathrooms : "1"}</span>
                              </div>
                              <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-xl py-2 px-1 flex flex-col items-center justify-center text-center">
                                <span className="text-[11px] font-headline font-bold text-slate-600 uppercase">Sup.</span>
                                <span className="text-[16px] sm:text-[17px] font-data-mono font-black text-[#111111]">{property.surface} m²</span>
                              </div>
                            </div>
                          </div>

                          {/* 3. PRECIO DESTACADO & ACCIÓN EDITORIAL */}
                          <div className="pt-4 border-t-2 border-[#111111] flex items-center justify-between gap-3">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-headline font-black uppercase text-slate-600">Precio</span>
                              <div className="flex items-baseline whitespace-nowrap">
                                <span className="text-2xl sm:text-[26px] font-data-mono font-black text-[#111111] leading-none">
                                  {new Intl.NumberFormat('es-ES').format(property.price)}&nbsp;€
                                </span>
                                {isRent && <span className="text-[12px] font-bold text-slate-600 ml-1">/mes</span>}
                              </div>
                            </div>

                            <div className="h-[44px] px-4 bg-[#2860F5] group-hover:bg-[#111111] text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-2 font-headline font-black text-[13px] uppercase tracking-wider transition-all">
                              <span>{t.properties.verDetalles || "Ficha"}</span>
                              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                            </div>
                          </div>

                        </div>
                      </div>
                    </Link>
                  </div>
                );
              };

              return (
                <div>

                  {/* EMPTY STATE: Only when filteredProperties.length === 0. NEVER render property cards when 0. */}
                  {filteredProperties.length === 0 ? (
                    <div>
                      <div
                        className="flex flex-col items-center justify-center text-center py-12 sm:py-14 px-6 sm:px-10 bg-slate-50 border border-slate-200 rounded-2xl mb-8"
                        role="status"
                        aria-live="polite"
                      >
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shrink-0">
                          {searchParams.mode === "favoritos" ? (
                            <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                          ) : (
                            <Search className="w-7 h-7 text-[#2563eb]" />
                          )}
                        </div>

                        {/* Main message */}
                        <p className="text-lg sm:text-xl font-black text-[#0f172a] mb-2 leading-snug max-w-sm">
                          {searchParams.mode === "favoritos"
                            ? (language === "ca"
                                ? "Encara no tens cap immoble guardat."
                                : language === "en"
                                ? "No saved properties yet."
                                : "Aún no tienes inmuebles guardados.")
                            : (language === "ca"
                                ? "No hem trobat immobles amb aquests filtres."
                                : language === "en"
                                ? "No properties found with these filters."
                                : "No encontramos inmuebles con estos filtros.")}
                        </p>

                        {/* Secondary message */}
                        <p className="text-sm text-slate-500 font-medium mb-7 max-w-xs leading-relaxed">
                          {searchParams.mode === "favoritos"
                            ? (language === "ca"
                                ? "Fes clic al cor de qualsevol immoble per guardar-lo aquí."
                                : language === "en"
                                ? "Tap the heart on any property to save it here."
                                : "Pulsa el corazón de cualquier propiedad para guardarla aquí.")
                            : (language === "ca"
                                ? "Prova una altra zona, tipus o rang de preu."
                                : language === "en"
                                ? "Try another zone, type or price range."
                                : "Prueba otra zona, tipo o rango de precio.")}
                        </p>

                        {/* CTA */}
                        <button
                          type="button"
                          onClick={() => {
                            setSearchParams({ mode: "comprar", zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                            setConsoleFilters({ zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                            heroResetRef.current?.();
                          }}
                          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer font-sans"
                        >
                          {language === "ca" ? "Veure catàleg" : language === "en" ? "View catalog" : "Ver catálogo"}
                        </button>
                      </div>

                      {/* Showcase active properties in Santa Coloma */}
                      {relatedProperties.length > 0 && (
                        <div className="mb-10">
                          <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200">
                            <div>
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{language === "ca" ? "Altres immobles a Santa Coloma" : language === "en" ? "Other properties in Santa Coloma" : "Otros inmuebles en Santa Coloma"}</span>
                              </span>
                              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight">
                                {language === "ca" ? "Oportunitats destacades que et poden interessar" : language === "en" ? "Featured opportunities you might like" : "Oportunidades destacadas que te pueden interesar"}
                              </h3>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {relatedProperties.map((prop: any, idx: number) => renderPropertyCard(prop, idx))}
                          </div>
                          <div className="flex flex-col items-center justify-center pt-8 gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const currentMode = searchParams.mode === "alquilar" ? "alquilar" : "comprar";
                                setSearchParams({ mode: currentMode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                                setConsoleFilters({ zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                                heroResetRef.current?.();
                                setVisibleCount(999);
                                const el = document.getElementById('propiedades');
                                if (el) {
                                  const pos = el.getBoundingClientRect().top + window.scrollY - 130;
                                  window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
                                }
                              }}
                              className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#2860F5] font-headline font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                            >
                              <span>{t.properties.verTodas}</span>
                              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* PROPERTY CARDS GRID: Rendered strictly when filteredProperties.length > 0 */
                    <div
                      key={searchParams.mode}
                      className={`grid grid-cols-1 ${displayProperties.length === 1 ? 'max-w-xl mx-auto' : displayProperties.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 md:gap-8 mb-8 transition-opacity duration-300`}
                    >
                      {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                    </div>
                  )}

                  {/* LOAD MORE BUTTON: Rendered only when there are filtered properties */}
                  {filteredProperties.length > 0 && (
                    <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100 gap-3">
                      {visibleCount < filteredProperties.length ? (
                        <button 
                          type="button"
                          onClick={() => setVisibleCount(prev => prev + 6)}
                          className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#2860F5] font-headline font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <span>{t.properties.verMas}</span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              const currentMode = searchParams.mode === "alquilar" ? "alquilar" : "comprar";
                              setSearchParams({ mode: currentMode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                              setConsoleFilters({ zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                              heroResetRef.current?.();
                              setVisibleCount(999);
                              const el = document.getElementById('propiedades');
                              if (el) {
                                const pos = el.getBoundingClientRect().top + window.scrollY - 130;
                                window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
                              }
                            }}
                            className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#2860F5] font-headline font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <span>{t.properties.verTodas}</span>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                          </button>
                          <div className="inline-flex items-center gap-2.5 bg-[#FFFFFF] border-2 border-[#111111] px-5 py-2.5 rounded-2xl shadow-[3px_3px_0px_#111111]">
                            <div className="w-5 h-5 rounded-full bg-[#2860F5] text-white flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                            <p className="text-xs sm:text-sm font-headline font-black text-[#111111] tracking-tight">
                              {t.properties.showingAll} <span className="text-[#2860F5] font-data-mono font-black">({filteredProperties.length})</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── 5. VALORADOR DE INMUEBLES ── */}
      <Suspense fallback={<div className="h-96 bg-[#e2e8f0]" />}>
        <ValuatorSection language={language} t={t} zonas={zonas} shouldReduceMotion={false} />
      </Suspense>

      {/* ── 6. ADMINISTRACIÓN DE FINCAS (GESTIÓ DE COMUNITATS) ── */}
      <section className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] border-b-2 border-[#111111]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-[#FFFFFF] border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Content (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 shadow-[2px_2px_0px_#2860F5] mb-4 w-fit">
                  <Building2 className="w-4 h-4 text-[#2860F5]" />
                  <span>{language === "ca" ? "GESTIÓ DE COMUNITATS" : language === "en" ? "COMMUNITY MANAGEMENT" : "GESTIÓN DE COMUNIDADES"}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight text-[#111111] mb-4 tracking-tight">
                  {language === "ca" ? (
                    <>Parlem de la teva <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">comunitat</span>?</>
                  ) : language === "en" ? (
                    <>Let's talk about your <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">community</span></>
                  ) : (
                    <>¿Hablamos de tu <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">comunidad</span>?</>
                  )}
                </h2>
                
                <p className="text-[17px] sm:text-[18px] text-[#111111] font-bold leading-relaxed mb-6 max-w-xl">
                  {language === "ca" 
                    ? "Administració transparent, resposta àgil i optimització de costos garantida per a la teva finca." 
                    : language === "en" 
                    ? "Transparent management, agile response and guaranteed cost optimization for your property." 
                    : "Administración transparente, respuesta ágil y optimización de costes garantizada para tu finca."}
                </p>

                {/* Acciones principales */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                  <a 
                    href="#formulario-contacto" 
                    onClick={(e) => {
                      e.preventDefault();
                      const formEl = document.getElementById("formulario-contacto");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                        if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 400);
                      }
                    }}
                    className="h-[56px] px-6 bg-[#2860F5] hover:bg-[#174bcb] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>{language === "ca" ? "Parlar amb un assessor" : language === "en" ? "Talk to an advisor" : "Hablar con un asesor"}</span>
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </a>
                  <a 
                    href="https://wa.me/34601259424" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[56px] px-6 bg-[#111111] hover:bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#2860F5] font-headline font-black text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white shrink-0">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    <span>{language === "ca" ? "WhatsApp directe" : language === "en" ? "Direct WhatsApp" : "WhatsApp directo"}</span>
                  </a>
                </div>

                {/* Métricas destacadas en 3 bloques con fondos sólidos */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-[#111111]">
                  <div className="bg-[#111111] text-white p-3.5 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#2860F5] text-center">
                    <p className="text-xl sm:text-2xl font-data-mono font-black mb-1">Nº 5583</p>
                    <p className="text-[12px] sm:text-[13px] font-headline font-bold text-slate-300 leading-tight uppercase">{language === "ca" ? "Registre AICAT" : language === "en" ? "AICAT Registry" : "Registro AICAT"}</p>
                  </div>
                  <div className="bg-[#111111] text-white p-3.5 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#2860F5] text-center">
                    <p className="text-xl sm:text-2xl font-data-mono font-black mb-1">+15 AÑOS</p>
                    <p className="text-[12px] sm:text-[13px] font-headline font-bold text-slate-300 leading-tight uppercase">{language === "ca" ? "Experiència Local" : language === "en" ? "Local Experience" : "Experiencia Local"}</p>
                  </div>
                  <div className="bg-[#111111] text-white p-3.5 border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#2860F5] text-center">
                    <p className="text-xl sm:text-2xl font-data-mono font-black mb-1">100%</p>
                    <p className="text-[12px] sm:text-[13px] font-headline font-bold text-slate-300 leading-tight uppercase">{language === "ca" ? "Col·legiats API" : language === "en" ? "Registered API" : "Colegiados API"}</p>
                  </div>
                </div>
              </div>

              {/* Right Image (5 cols) */}
              <div className="lg:col-span-5 h-[280px] sm:h-[340px] md:h-[400px] relative border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] overflow-hidden">
                <img 
                  src={gesgramaOffice} 
                  alt="Oficina principal Gesgrama" 
                  className="w-full h-full object-cover" 
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      <ServicesSection language={language} t={t} isNeighborhoodLanding={false} />

      {/* ── 8. COBERTURA LOCAL (BARRIOS Y ZONAS) ── */}
      <Suspense fallback={<div className="h-96 bg-[#e2e8f0]" />}>
        <CoberturaSection language={language} t={t} />
      </Suspense>

      {/* ── 9. TESTIMONIOS / NOSOTROS EDITORIAL NEO-BRUTALIST ── */}
      <section id="nosotros" className="py-14 sm:py-20 bg-[#FFFFFF] text-[#111111] scroll-mt-24 border-b-2 border-[#111111]">
        <div id="testimonios" className="-top-32 relative block invisible" />
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Cabecera Editorial */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-[#111111]">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 shadow-[2px_2px_0px_#2860F5] mb-4">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{t.testimonios.tag}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight">
                {t.testimonios.title1}{" "}
                <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">{t.testimonios.title2}</span>
              </h2>
            </div>

            {/* Google Verified Reviews Badge Sólido */}
            <div className="lg:max-w-md">
              <div className="inline-flex items-center gap-3 bg-[#FAF9FC] border-2 border-[#111111] rounded-full shadow-[2px_2px_0px_#111111] px-5 py-2.5">
                <GoogleIcon className="w-6 h-6 shrink-0" />
                <span className="text-[15px] sm:text-[16px] font-headline font-black text-[#111111] tracking-wide">
                  {language === 'ca' ? 'Ressenyes 100% verificades a Google' : language === 'en' ? 'Verified Google Reviews' : 'Reseñas 100% verificadas en Google'}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Real Google Reviews Cards en Bloques Blancos Sólidos con Bordes de 2px */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {t.testimonios.items.map((item, i) => {
              const initials = ["F", "A", "C"];

              return (
                <div 
                  key={item.author} 
                  className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#2860F5] hover:border-[#2860F5] p-6 flex flex-col justify-between transition-all duration-200 group"
                >
                  <div>
                    {/* Top Row: Stars + Google Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-[#111111]">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-[#111111] text-white px-2.5 py-0.5 text-[11px] font-headline font-black tracking-wider uppercase">
                        <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>Google</span>
                      </div>
                    </div>

                    {/* Texto de Reseña Grande y Legible */}
                    <p className="text-[#111111] text-[16px] sm:text-[17px] font-medium leading-relaxed mb-6">
                      “{item.quote}”
                    </p>
                  </div>

                  {/* Fila de Autor y Verificación */}
                  <div className="pt-4 border-t-2 border-[#111111] flex items-center justify-between gap-3 mt-auto">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#111111] text-white border-2 border-[#111111] rounded-full font-headline font-black text-sm flex items-center justify-center shrink-0">
                        {initials[i % initials.length]}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <strong className="font-headline font-black text-[15px] sm:text-[16px] text-[#111111] truncate">
                          {item.author}
                        </strong>
                        <span className="text-[12px] font-data-mono font-bold text-slate-600">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[12px] font-headline font-black text-white bg-[#16A34A] border border-[#111111] rounded-full px-2.5 py-1 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{language === 'ca' ? 'Verificat' : language === 'en' ? 'Verified' : 'Verificado'}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 10. ÚLTIMAS NOTICIAS (BLOG) ── */}
      <Suspense fallback={<div className="h-96 bg-[#e2e8f0]" />}>
        <BlogSection language={language} t={t} />
      </Suspense>

      {/* ── FAQ ── */}
      <Suspense fallback={<div className="h-96 bg-[#e2e8f0]" />}>
        <FaqSection t={t} />
      </Suspense>

      {/* ── CONTACT ── */}
      <Suspense fallback={<div className="h-96 bg-[#e2e8f0]" />}>
        <ContactSection language={language} t={t} />
      </Suspense>

      {/* ── FINAL CLOSING CTA BANNER NEO-BRUTALIST EDITORIAL ── */}
      <section id="final-cta" className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] border-b-2 border-[#111111]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 shadow-[2px_2px_0px_#2860F5] mb-4">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.finalCta.tag}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] mb-4 leading-tight tracking-tight">
                  {t.finalCta.title1.startsWith("¿") ? (
                    <>
                      <span>¿</span>
                      {t.finalCta.title1.slice(1)}
                    </>
                  ) : (
                    t.finalCta.title1
                  )}{" "}
                  <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                    {t.finalCta.title2}?
                    <DrawnUnderline color="#2860F5" />
                  </span>
                </h2>
                
                <p className="text-[17px] sm:text-[18px] text-[#111111] font-bold leading-relaxed mb-8 max-w-xl">
                  {t.finalCta.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#calculadora-valoracion"
                    className="h-[56px] px-8 bg-[#2860F5] hover:bg-[#174bcb] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black text-[15px] sm:text-[16px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Home className="w-4 h-4 text-white shrink-0" />
                    <span>{t.finalCta.btnValuate}</span>
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </a>
                  <a
                    href="#formulario-contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      const formEl = document.getElementById("formulario-contacto");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                        if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 400);
                      }
                    }}
                    className="h-[56px] px-8 bg-[#111111] hover:bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#2860F5] font-headline font-black text-[15px] sm:text-[16px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Phone className="w-4 h-4 text-white shrink-0" />
                    <span>{t.finalCta.btnContact}</span>
                  </a>
                </div>
              </div>

              {/* Right Side: Advisors Image rectangular con marco sólido */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-[420px] aspect-[4/3] border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] overflow-hidden bg-slate-100">
                  <img 
                    src="/images/cta_advisors_closed_laptop.jpg" 
                    alt="Asesores inmobiliarios Gesgrama" 
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
      </main>

      {/* Floating Utilities */}
      {mountFloating && (
        <Suspense fallback={null}>
          <WhatsAppButton language={language} />
          <CookieBanner language={language} />
        </Suspense>
      )}

            

    </div>
  );
}

