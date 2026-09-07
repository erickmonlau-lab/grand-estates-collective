import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  ArrowRight,
  Mail, 
  Check, 
  Star, 
  Home, 
  TrendingUp, 
  Shield, 
  Calendar, 
  Ruler,
  Bath,
  Paintbrush,
  Loader2,
  X,
  Heart
} from "lucide-react";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { properties, formatLocation } from "@/data/properties";
import { homeArticles as articles } from "@/data/homeArticles";
import { translations } from "@/data/translations";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroCarousel from "@/hero-carousel";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

const SITE_DOMAIN = "https://www.gesgrama.es";
const easeOut = [0.16, 1, 0.3, 1] as const;

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
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
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function PriceCounter({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    prevRef.current = value;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * easeProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <span>{new Intl.NumberFormat('es-ES').format(displayValue)}</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
  const match = priceStr.match(/(\d[\d.]*)\s*-\s*(\d[\d.]*)/);
  if (match) {
    const min = parseInt(match[1].replace(/[^\d]/g, ''), 10);
    const max = parseInt(match[2].replace(/[^\d]/g, ''), 10);
    return propertyPrice >= min && propertyPrice <= max;
  }
  return true;
};

const ZONE_PRICE_PER_M2: Record<string, number> = {
  "Centre": 2350,
  "Centro": 2350,
  "Santa Rosa - Can Mariner": 1910,
  "Singuerlín": 1720,
  "Fondo": 1680,
  "El Raval": 1790,
  "Riera Alta - Llatí": 1850,
  "Riu": 1950,
  "Riu Nord / Riu Sud": 1950,
  "Oliveres - Can Serra": 1720
};

export const Route = createFileRoute("/administrador-fincas_/$city")({
  head: ({ params }) => {
    const rawSlug = (params.city as string) || "centre";
    const isGlobal = rawSlug === "santa-coloma-de-gramenet";
    const data: NeighborhoodDetail = SANTA_COLOMA_BARRIOS[rawSlug] || SANTA_COLOMA_BARRIOS["centre"];
    const canonicalUrl = `${SITE_DOMAIN}/administrador-fincas/${isGlobal ? "santa-coloma-de-gramenet" : data.slug}`;
    const ogImage = "https://www.gesgrama.es/og-image.png";

    const title = isGlobal
      ? "Administrador de Fincas en Santa Coloma de Gramenet · Gesgrama"
      : data.metaTitle;
    const description = isGlobal
      ? "Administración de comunidades en todos los barrios de Santa Coloma de Gramenet. Sede en Av. dels Banús, 49. Auditoría contable y respuesta urgente en 15 min."
      : data.metaDescription;

    const jsonLdGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["RealEstateAgent", "LocalBusiness"],
          "@id": `${canonicalUrl}#organization`,
          "name": `Gesgrama - Administrador de Fincas en ${data.name}`,
          "url": canonicalUrl,
          "logo": `${SITE_DOMAIN}/images/logo-gesgrama-text-horizontal.webp`,
          "image": ogImage,
          "telephone": "+34934685656",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. dels Banús, 49",
            "addressLocality": "Santa Coloma de Gramenet",
            "postalCode": "08923",
            "addressRegion": "Barcelona",
            "addressCountry": "ES"
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": `${data.name}, Santa Coloma de Gramenet`
            },
            {
              "@type": "City",
              "name": "Santa Coloma de Gramenet"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          "mainEntity": data.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": SITE_DOMAIN
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Servicios",
              "item": `${SITE_DOMAIN}/#servicios`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Santa Coloma de Gramenet",
              "item": `${SITE_DOMAIN}/administrador-fincas/santa-coloma-de-gramenet`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": data.name,
              "item": canonicalUrl
            }
          ]
        }
      ]
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { property: "og:site_name", content: "Gesgrama" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage }
      ],
      links: [
        { rel: "canonical", href: canonicalUrl }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLdGraph)
        }
      ]
    };
  },
  component: SantaColomaBarrioPage
});

function SantaColomaBarrioPage() {
  const { city } = Route.useParams();
  const rawSlug = city || "centre";
  const data: NeighborhoodDetail = SANTA_COLOMA_BARRIOS[rawSlug] || SANTA_COLOMA_BARRIOS["centre"];
  const shouldReduceMotion = useReducedMotion();

  // Language management
  const [language, setLanguageState] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") return stored;
    }
    return "es";
  });

  const handleLanguageChange = (lang: "es" | "en" | "ca") => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      window.dispatchEvent(new Event("languagechange"));
    }
  };

  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem("language") as "es" | "en" | "ca";
      if (savedLang && ["es", "en", "ca"].includes(savedLang)) {
        setLanguageState(savedLang);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("languagechange", syncLang);
      window.addEventListener("storage", syncLang);
      return () => {
        window.removeEventListener("languagechange", syncLang);
        window.removeEventListener("storage", syncLang);
      };
    }
  }, []);

  const t = translations[language];
  const allBarrios = Object.values(SANTA_COLOMA_BARRIOS);

  // Search console state
  const [searchParams, setSearchParams] = useState({
    mode: "comprar",
    zona: "Cualquier zona",
    tipo: "Cualquier tipo",
    precio: "Cualquier precio",
    habitaciones: "Cualquier número"
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Favorites state
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

  // Close dropdown on click outside
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    if (typeof window !== "undefined") {
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, []);

  // Lock scroll on service modal open
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

  // Contact form state
  const [contactForm, setContactForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    asunto: `Gestión de Comunidades en ${data.name}`,
    mensaje: "",
    privacidad: false
  });
  const [contactErrors, setContactErrors] = useState<{
    nombre?: string;
    telefono?: string;
    email?: string;
    privacidad?: string;
  }>({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Valuator state pre-configured for this neighborhood
  const initialZoneName = Object.keys(ZONE_PRICE_PER_M2).find(
    z => z.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(z.toLowerCase())
  ) || "Centre";

  const [valuatorData, setValuatorData] = useState({
    zona: initialZoneName,
    metros: "85"
  });
  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<{
    estimatedValue: number;
    rangeMin: number;
    rangeMax: number;
    zoneName: string;
  }>(() => {
    const pricePerM2 = ZONE_PRICE_PER_M2[initialZoneName] || 2350;
    const exact = 85 * pricePerM2;
    return {
      estimatedValue: exact,
      rangeMin: Math.round(exact * 0.93),
      rangeMax: Math.round(exact * 1.07),
      zoneName: initialZoneName
    };
  });

  const handleCalculateValuation = () => {
    setIsCalculatingValuation(true);
    const m2 = parseFloat(valuatorData.metros.replace(/[^\d]/g, "")) || 85;
    const pricePerM2 = ZONE_PRICE_PER_M2[valuatorData.zona] || 2150;
    const exactValue = Math.round(m2 * pricePerM2);
    const minVal = Math.round(exactValue * 0.93);
    const maxVal = Math.round(exactValue * 1.07);

    setTimeout(() => {
      setCalculatedResult({
        estimatedValue: exactValue,
        rangeMin: minVal,
        rangeMax: maxVal,
        zoneName: valuatorData.zona || "Zona seleccionada"
      });
      setIsCalculatingValuation(false);
    }, 1200);
  };

  const handleHeroSearch = (p: { mode: string; zona: string; tipo: string; precio: string }) => {
    setSearchParams({
      mode: p.mode,
      zona: p.zona,
      tipo: p.tipo,
      precio: p.precio,
      habitaciones: "Cualquier número"
    });
    const el = document.getElementById("propiedades");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered properties
  const filteredProperties = properties.filter(prop => {
    if (searchParams.mode === "favoritos") {
      return favorites.includes(prop.id);
    }
    const matchesMode = (prop.operation || "comprar") === searchParams.mode;
    const matchesZone = searchParams.zona === "Cualquier zona" || (prop.location && prop.location.includes(searchParams.zona));
    const matchesType = searchParams.tipo === "Cualquier tipo" || prop.type === searchParams.tipo;
    const matchesPrice = isPriceValid(searchParams.precio, prop.price);
    const matchesBeds = searchParams.habitaciones === "Cualquier número" || (
      searchParams.habitaciones.includes("+")
        ? prop.bedrooms >= parseInt(searchParams.habitaciones)
        : prop.bedrooms === parseInt(searchParams.habitaciones)
    );
    return matchesMode && matchesZone && matchesType && matchesPrice && matchesBeds;
  });

  const displayProperties = filteredProperties.slice(0, visibleCount);

  // Available filter options
  const tipos = ["Cualquier tipo", "Piso", "Ático", "Local comercial", "Chalet"];
  const zonas = ["Cualquier zona", "Centre", "Singuerlín", "Santa Rosa - Can Mariner", "Fondo", "Riera Alta - Llatí", "El Raval", "Riu Nord / Riu Sud", "Oliveres - Can Serra"];
  const preciosVenta = ["Cualquier precio", "Hasta 150.000 €", "Hasta 250.000 €", "Hasta 350.000 €", "Más de 350.000 €"];
  const preciosAlquiler = ["Cualquier precio", "Hasta 800 €", "Hasta 1.200 €", "Hasta 1.600 €", "Más de 1.600 €"];
  const preciosActuales = searchParams.mode === "alquilar" ? preciosAlquiler : preciosVenta;
  const habitaciones = ["Cualquier número", "1", "2", "3", "4+"];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── NAVBAR OFICIAL CORPORATIVO FLOTANTE DE GESGRAMA ── */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      <main id="main-content">
        {/* ── HERO CANÓNICO CON FOTOGRAFÍA OFICIAL Y TITULAR EQUILIBRADO ── */}
        <HeroCarousel
          language={language}
          onPerformSearch={handleHeroSearch}
          customTag={
            language === "ca"
              ? `Barri ${data.name} · Santa Coloma`
              : language === "en"
              ? `Neighborhood ${data.name} · Santa Coloma`
              : `Barrio ${data.name} · Santa Coloma`
          }
          customHeadline={
            <>
              {language === "ca"
                ? "Administració de Finques,"
                : language === "en"
                ? "Property Management,"
                : "Administración de Fincas,"}
              <br />
              <span className="text-[#2563eb] inline-block mt-0.5 sm:mt-1">
                {language === "ca"
                  ? `a ${data.name} · Santa Coloma`
                  : language === "en"
                  ? `in ${data.name} · Santa Coloma`
                  : `en ${data.name} · Santa Coloma`}
              </span>
            </>
          }
          customSubtitle={
            language === "ca"
              ? `Gestió experta per a comunitats al barri de ${data.name}: seu central a Av. dels Banús 49, auditoria gratuïta de despeses, resolució d'avaries en ~${data.emergencyResponseMinutes} minuts i màxima transparència comptable.`
              : language === "en"
              ? `Expert property administration for communities in ${data.name}: local headquarters at Av. dels Banús 49, free cost audit, emergency response in ~${data.emergencyResponseMinutes} minutes, and transparent bookkeeping.`
              : `Gestión experta para comunidades en el barrio de ${data.name}: sede central en Av. dels Banús 49, auditoría gratis de gastos, resolución de averías en ~${data.emergencyResponseMinutes} minutos y máxima transparencia contable.`
          }
          customTrustBadge={
            language === "ca"
              ? `Atenció en ~${data.emergencyResponseMinutes} min · CP ${data.postalCode} (${data.district})`
              : language === "en"
              ? `Response in ~${data.emergencyResponseMinutes} min · ZIP ${data.postalCode} (${data.district})`
              : `Atención en ~${data.emergencyResponseMinutes} min · CP ${data.postalCode} (${data.district})`
          }
          customValuationHref="#valuator-form"
        />

        {/* ── CONTINUOUS AUTHORITY MARQUEE ── */}
        <MarqueeRibbon language={language} />

        {/* ── 1. BUSCADOR & CATÁLOGO DE INMUEBLES CANÓNICO DE GESGRAMA ── */}
        <section id="propiedades" className="relative overflow-hidden bg-[#f5f6f8] text-slate-900 py-6 md:py-10 border-t border-slate-200 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mx-4 md:mx-auto max-w-[1240px] relative z-10">
            <Reveal>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-2.5 font-sans">
                  <Home className="w-3.5 h-3.5 text-white" />
                  <span>{t.properties.tag}</span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2 font-sans w-full">
                  {t.properties.title1} <span className="text-[#2563eb]">{data.name} & Santa Coloma</span>
                </h2>
                
                <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-bold font-sans max-w-3xl text-balance">
                  {t.properties.subtitle}
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="mt-6 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
                <div className="grid grid-cols-3 sm:flex sm:items-center bg-slate-200 p-1.5 sm:p-2 rounded-2xl border-2 border-slate-300 shadow-sm w-full sm:w-auto gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, mode: "comprar" }))}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center font-sans ${
                      searchParams.mode === "comprar"
                        ? "bg-[#2563eb] text-white shadow-md scale-100"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-300/60"
                    }`}
                  >
                    {t.properties.modeComprar}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, mode: "alquilar" }))}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center font-sans ${
                      searchParams.mode === "alquilar"
                        ? "bg-[#2563eb] text-white shadow-md scale-100"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-300/60"
                    }`}
                  >
                    {t.properties.modeAlquilar}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, mode: "favoritos" }))}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans ${
                      searchParams.mode === "favoritos"
                        ? "bg-[#2563eb] text-white shadow-md scale-100"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-300/60"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? "fill-red-400 text-red-400" : ""}`} />
                    <span>{t.properties.modeFavoritos} ({favorites.length})</span>
                  </button>
                </div>
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
                {/* Tipo Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "tipo" ? null : "tipo");
                    }}
                    className="w-full flex items-center justify-between bg-white border-2 border-slate-300 hover:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 transition-all text-left shadow-2xs"
                  >
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">{t.properties.type}</span>
                      <span className="truncate">{searchParams.tipo}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                  {openDropdown === "tipo" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5">
                      {tipos.map(tp => (
                        <button
                          key={tp}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, tipo: tp }));
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 text-slate-800 transition-colors"
                        >
                          {tp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Zona Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "zona" ? null : "zona");
                    }}
                    className="w-full flex items-center justify-between bg-white border-2 border-slate-300 hover:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 transition-all text-left shadow-2xs"
                  >
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">{t.properties.zone}</span>
                      <span className="truncate">{formatLocation(searchParams.zona, language)}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                  {openDropdown === "zona" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5 max-h-56 overflow-y-auto">
                      {zonas.map(zn => (
                        <button
                          key={zn}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, zona: zn }));
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 text-slate-800 transition-colors"
                        >
                          {formatLocation(zn, language)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Habitaciones Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "hab" ? null : "hab");
                    }}
                    className="w-full flex items-center justify-between bg-white border-2 border-slate-300 hover:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 transition-all text-left shadow-2xs"
                  >
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">{t.properties.bedrooms}</span>
                      <span className="truncate">{searchParams.habitaciones}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                  {openDropdown === "hab" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5">
                      {habitaciones.map(hb => (
                        <button
                          key={hb}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, habitaciones: hb }));
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 text-slate-800 transition-colors"
                        >
                          {hb}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Precio Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "precio" ? null : "precio");
                    }}
                    className="w-full flex items-center justify-between bg-white border-2 border-slate-300 hover:border-[#2563eb] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 transition-all text-left shadow-2xs"
                  >
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase">{t.properties.price}</span>
                      <span className="truncate">{searchParams.precio}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                  {openDropdown === "precio" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1.5">
                      {preciosActuales.map(pr => (
                        <button
                          key={pr}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, precio: pr }));
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 text-slate-800 transition-colors"
                        >
                          {pr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Grid */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-xs font-black w-7 h-7 rounded-full shadow-sm">
                      {filteredProperties.length}
                    </span>
                    <p className="text-sm sm:text-base font-black text-[#0f172a]">
                      {t.properties.availableCount}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                  {displayProperties.map((prop) => {
                    const isFav = favorites.includes(prop.id);
                    return (
                      <div key={prop.id} className="card-lift group bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md hover:border-[#2563eb] flex flex-col justify-between">
                        <div>
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={prop.image}
                              alt={prop.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="bg-[#2563eb] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                                {prop.operation === "alquilar" ? (language === "ca" ? "Lloguer" : language === "en" ? "Rent" : "Alquiler") : (language === "ca" ? "Venda" : language === "en" ? "Sale" : "Venta")}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleFavorite(prop.id)}
                              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                              aria-label="Guardar en favoritos"
                            >
                              <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-slate-700"}`} />
                            </button>
                          </div>

                          <div className="p-5">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                              <span>{formatLocation(prop.location, language)}</span>
                            </div>

                            <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-[#2563eb] transition-colors line-clamp-1 mb-3">
                              {prop.title}
                            </h3>

                            <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs font-bold text-slate-700">
                              <div className="flex items-center gap-1">
                                <Ruler className="w-3.5 h-3.5 text-[#2563eb]" />
                                <span>{prop.surface} m²</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
                                <span>{prop.bedrooms} {language === "en" ? "beds" : language === "ca" ? "hab" : "hab"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Bath className="w-3.5 h-3.5 text-[#2563eb]" />
                                <span>{prop.bathrooms || 1} {language === "en" ? "bath" : language === "ca" ? "banys" : "baños"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
                          <span className="text-2xl font-black text-[#0f172a]">
                            {new Intl.NumberFormat("es-ES").format(prop.price)} €
                            {prop.operation === "alquilar" && <span className="text-xs font-bold text-slate-500">/mes</span>}
                          </span>
                          <Link
                            to="/inmobiliaria/$slug"
                            params={{ slug: prop.slug || prop.id }}
                            className="inline-flex items-center gap-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-sm"
                          >
                            <span>{t.properties.verDetalles}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {visibleCount < filteredProperties.length && (
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setVisibleCount(prev => prev + 3)}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer font-sans"
                    >
                      <span>{t.properties.verMas}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 2. TESTIMONIOS CANÓNICOS (GOOGLE REVIEWS CON 5 ESTRELLAS) ── */}
        <section id="nosotros" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-10 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-[#f8fafc] rounded-[24px] md:rounded-[30px] shadow-xl border border-slate-300 p-5 sm:p-7 md:p-10 mx-4 md:mx-auto max-w-[1240px] relative z-10 text-[#0f172a]">
            <Reveal>
              <div className="mb-6 md:mb-8 text-center">
                <span className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-white/10 mb-2.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-[#0f172a] tracking-tight mb-2 font-sans">
                  {t.testimonios.title1}{" "}
                  <span className="relative inline-block text-[#2563eb] pb-1.5">
                    {t.testimonios.title2}
                  </span>
                </h2>
                <div className="mt-2 inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1 shadow-xs">
                  <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">
                    {language === "ca" ? "Ressenyes verificades a Google" : language === "en" ? "Verified Google Reviews" : "Reseñas verificadas en Google"}
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {t.testimonios.items.map((item, i) => {
                const initials = ["C", "A", "M"];
                return (
                  <Reveal key={item.author} delay={i * 0.1}>
                    <div className="card-lift group bg-white text-[#0f172a] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full border-2 border-slate-100 hover:border-[#2563eb] shadow-[0_4px_16px_rgba(15,23,42,0.05)] relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#2563eb]" />
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-2 mb-4 h-7">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, s) => (
                              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                            ))}
                          </div>
                          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-2xs shrink-0">
                            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>Google</span>
                          </div>
                        </div>
                        <p className="text-slate-700 text-[14px] sm:text-[14.5px] leading-relaxed font-normal mb-5 flex-1">
                          "{item.quote}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#0b214a] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-1 ring-slate-200">
                            {initials[i % initials.length]}
                          </div>
                          <div className="flex flex-col">
                            <strong className="font-bold text-sm text-[#0f172a] tracking-tight leading-tight">
                              {item.author}
                            </strong>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {item.time}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-white bg-[#2563eb] px-2.5 py-1 rounded-full shadow-xs shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                          <span>{language === "ca" ? "Verificat" : language === "en" ? "Verified" : "Verificado"}</span>
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. SERVICIOS INTEGRALES CORPORATIVOS (GRID 2x2 HORIZONTAL CON MODAL) ── */}
        <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-[#0f172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-sky-500/20 p-4 sm:p-6 md:p-7 mx-4 md:mx-auto max-w-[1150px] relative z-10 overflow-hidden text-white">
            <div className="text-center mb-6">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-xl mb-2 shadow-xs border border-slate-200 font-sans">
                  <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>{t.servicios.tag}</span>
                </span>
              </Reveal>
              <Reveal>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-1.5 tracking-tight font-sans">
                  {t.servicios.title1} <span className="text-[#38bdf8]">{t.servicios.title2}</span>
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans mt-2">
                  {t.servicios.subtitle}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {t.servicios.items.map((item, i) => {
                const icons = [
                  <Building2 key={0} className="w-5 h-5" />,
                  <TrendingUp key={1} className="w-5 h-5" />,
                  <Shield key={2} className="w-5 h-5" />,
                  <Paintbrush key={3} className="w-5 h-5" />
                ];
                const bgs = [
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=75&w=400&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=75&w=400&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=75&w=400&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=75&w=400&auto=format&fit=crop"
                ];
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div 
                      onClick={() => setSelectedServiceIndex(i)}
                      className="card-lift group bg-white text-[#0f172a] rounded-xl md:rounded-2xl p-3.5 md:p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-3.5 h-full border-2 border-slate-100 hover:border-[#0284c7] cursor-pointer"
                    >
                      <div className="relative w-full sm:w-[110px] h-[85px] sm:h-[95px] rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                        <img src={bgs[i]} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-[#0369a1] text-white shadow-xs flex items-center justify-center z-10">
                          {icons[i]}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#0f172a] mb-1.5 leading-snug group-hover:text-[#0369a1] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed mb-3">
                            {item.desc}
                          </p>
                        </div>
                        <div>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedServiceIndex(i);
                            }}
                            className="bg-[#0369a1] hover:bg-[#075985] text-white font-black text-xs sm:text-sm px-4.5 py-2 rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2 w-fit font-sans"
                          >
                            <span>{t.servicios.saberMas}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. VALORADOR DE INMUEBLES CANÓNICO CON PRESELECCIÓN DEL BARRIO ── */}
        <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-10 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] shadow-xl border border-slate-200 p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1240px] relative z-10 overflow-hidden text-[#0f172a]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white text-xs font-black tracking-wider uppercase px-3.5 py-1.5 rounded-xl shadow-xs font-sans">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    <span>{t.valorador.tag}</span>
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2.5 sm:mb-3.5 leading-[1.12] tracking-tight font-sans text-[#0f172a] flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{t.valorador.title}</span>
                  <span className="bg-[#2563eb] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl shadow-sm whitespace-nowrap">
                    {t.valorador.titleAccent}
                  </span>
                </h2>

                <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-xl mb-5 sm:mb-6 leading-relaxed font-bold font-sans">
                  {t.valorador.subtitle}
                </p>

                <div className="w-full max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 sm:p-3.5 shadow-2xs transition-all text-left">
                      <label htmlFor="valuator-zona-select" className="block text-[11px] font-black uppercase tracking-wider text-black mb-1 font-sans">
                        {language === "ca" ? "Zona o barri" : language === "en" ? "Area / Zone" : "Zona o barrio"}
                      </label>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 w-full">
                          <MapPin className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                          <select
                            id="valuator-zona-select"
                            aria-label="Seleccionar zona de la propiedad"
                            value={valuatorData.zona}
                            onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                            className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-extrabold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                          >
                            {zonas.filter(z => z !== "Cualquier zona").map(z => (
                              <option key={z} value={z}>{formatLocation(z, language)}</option>
                            ))}
                          </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </div>

                    <div className="bg-white border-2 border-slate-300 hover:border-[#2563eb] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 rounded-xl p-3 sm:p-3.5 shadow-2xs transition-all text-left">
                      <label htmlFor="valuator-metros-input" className="block text-[11px] font-black uppercase tracking-wider text-black mb-1 font-sans">
                        {language === "ca" ? "Superfície estimada" : language === "en" ? "Estimated area" : "Superficie estimada"}
                      </label>
                      <div className="flex items-center gap-2.5">
                        <Ruler className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                        <input
                          id="valuator-metros-input"
                          type="number"
                          min="20"
                          max="600"
                          placeholder="85"
                          value={valuatorData.metros}
                          onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-sm sm:text-base font-extrabold text-[#0f172a] focus:ring-0 outline-none font-sans"
                        />
                        <span className="text-xs sm:text-sm font-black text-slate-900 bg-white border border-slate-900 px-2.5 py-0.5 rounded-md shrink-0">
                          m²
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculateValuation}
                    disabled={isCalculatingValuation}
                    className="btn-lift w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm sm:text-base py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 mb-3.5 font-sans disabled:opacity-75"
                  >
                    <Home className="w-4 h-4 text-white" />
                    <span>{isCalculatingValuation ? t.valorador.calculando : t.valorador.calcularBtn}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <div className="flex flex-row flex-nowrap sm:flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 w-full">
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700 shrink-0">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#60a5fa] stroke-[3] shrink-0" />
                      <span>{t.valorador.sinCompromiso}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700 shrink-0">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0" />
                      <span>{t.valorador.resultadoInmediato}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
                <div className="bg-white text-[#0f172a] rounded-3xl p-5 sm:p-7 shadow-xl w-full max-w-[460px] border-2 border-[#2563eb] relative overflow-hidden text-center">
                  <div className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider mb-2.5 shadow-sm font-sans">
                    <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
                    <span>{t.valorador.valorEstimado} ({formatLocation(calculatedResult.zoneName, language)})</span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-black text-[#0f172a] mb-1.5 leading-none tracking-tight font-sans">
                    <PriceCounter value={calculatedResult.estimatedValue} duration={1200} /> <span className="text-[#2563eb] font-bold">€</span>
                  </div>

                  <p className="text-xs sm:text-sm font-black text-[#0f172a] mb-1.5 font-sans">
                    {t.valorador.rangoEstimado}: <span className="font-black text-[#0f172a]">{new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)}€ – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)}€</span>
                  </p>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2 border border-slate-200">
                    <motion.div
                      key={`range-bar-${calculatedResult.estimatedValue}`}
                      initial={shouldReduceMotion ? false : { width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1.2, ease: easeOut }}
                      className="h-full bg-gradient-to-r from-blue-400 to-[#2563eb] rounded-full"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 mb-3 font-medium bg-slate-100 py-1.5 px-2.5 rounded-lg border border-slate-200">
                    <span className="text-[#2563eb] font-bold text-xs">*</span>
                    <span>{t.valorador.disclaimer}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs sm:text-sm font-black text-[#0f172a] font-sans uppercase tracking-wider">
                        {language === "ca" ? "Tendència de mercat" : language === "en" ? "Market trend" : "Tendencia de mercado"}
                      </span>
                      <span className="bg-[#1e3a6e] text-white px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-2xs font-sans">
                        <TrendingUp className="w-3 h-3 text-white stroke-[3]" /> +4.2%
                      </span>
                    </div>

                    <div className="mt-2.5 bg-white border border-slate-300 rounded-xl p-2.5 text-left shadow-2xs">
                      <div className="flex items-center justify-between text-xs sm:text-[13px]">
                        <span className="font-extrabold text-black">
                          {language === "ca" ? "Preu mitjà barri:" : language === "en" ? "Avg. neighborhood price:" : "Precio medio barrio:"}
                        </span>
                        <span className="font-black text-black">
                          {new Intl.NumberFormat('es-ES').format(ZONE_PRICE_PER_M2[calculatedResult.zoneName] || 2150)} €/m²
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <a
                        href={`https://wa.me/34689438012?text=${encodeURIComponent(
                          language === "ca"
                            ? `Hola Gesgrama, voldria una valoració oficial per al meu immoble al barri de ${data.name} (~${valuatorData.metros} m²).`
                            : language === "en"
                            ? `Hello Gesgrama, I would like an official appraisal for my property in ${data.name} (~${valuatorData.metros} sq m).`
                            : `Hola Gesgrama, me gustaría una valoración oficial para mi inmueble en el barrio de ${data.name} (~${valuatorData.metros} m²).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#075E54] hover:bg-[#054c44] text-white font-black text-xs py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-[#075E54] shrink-0" />
                        <span>{language === "ca" ? "Demanar valoració per WhatsApp" : language === "en" ? "Request appraisal via WhatsApp" : "Solicitar valoración por WhatsApp"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. ÁREA DE COBERTURA Y SEDE CENTRAL (MAPA CON PÍLDORAS DE BARRIOS) ── */}
        <section id="cobertura" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-white scroll-mt-24 md:scroll-mt-28">
          <div className="bg-[#0b172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-white/10 p-4 sm:p-7 md:p-8 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{language === "ca" ? "ÀREA DE COBERTURA" : language === "en" ? "COVERAGE AREA" : "ÁREA DE COBERTURA"}</span>
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3 font-sans flex flex-col items-start gap-1">
                    <span>{language === "ca" ? "Experts a" : language === "en" ? "Experts in" : "Expertos en"}</span>
                    <span className="inline-block bg-[#2563eb] text-white px-3.5 py-1 rounded-xl shadow-md mt-0.5 whitespace-nowrap">
                      {data.name} · Santa Coloma
                    </span>
                  </h2>
                  
                  <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-lg mb-4 font-bold leading-snug font-sans">
                    {language === "ca"
                      ? `Atenció immediata a ${data.name} amb seu central a Av. dels Banús 49. Arribem a la teva finca en menys de ${data.emergencyResponseMinutes} minuts.`
                      : language === "en"
                      ? `Immediate on-site service in ${data.name} from our headquarters at Av. dels Banús 49. We arrive at your building in under ${data.emergencyResponseMinutes} minutes.`
                      : `Atención inmediata en ${data.name} con sede central en Av. dels Banús 49. Acudimos a tu finca en menos de ${data.emergencyResponseMinutes} minutos.`}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 max-w-lg">
                    {allBarrios.map(b => {
                      const isCurrent = b.slug === data.slug;
                      return (
                        <Link
                          key={b.slug}
                          to="/administrador-fincas/$city"
                          params={{ city: b.slug }}
                          className={`text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border transition-all flex items-center gap-1 ${
                            isCurrent
                              ? "bg-[#2563eb] text-white border-[#2563eb] shadow-md ring-2 ring-blue-400"
                              : "bg-white text-slate-900 border-slate-300 hover:bg-blue-50"
                          }`}
                        >
                          <MapPin className="w-3 h-3 text-[#2563eb] shrink-0" />
                          <span>{b.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </Reveal>

                <Reveal delay={0.1} className="w-full">
                  <div className="bg-white border-2 border-[#2563eb] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 shadow-lg text-[#0f172a]">
                    <div className="flex items-center gap-3 sm:gap-3.5 flex-1">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 text-white shadow-xs">
                        <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-black text-[#0f172a] leading-tight font-sans tracking-tight">
                          {language === "ca" ? "¿Necessites un administrador?" : language === "en" ? "Need a property manager?" : "¿Necesitas un administrador?"}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm font-bold leading-tight mt-0.5 font-sans">
                          {language === "ca" ? `Auditem la teva finca a ${data.name} gratis.` : language === "en" ? `Free HOA audit in ${data.name}.` : `Auditamos tu finca en ${data.name} gratis.`}
                        </p>
                      </div>
                    </div>
                    <a 
                      href="#contacto" 
                      className="w-full md:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans whitespace-nowrap"
                    >
                      <span>{t.hero.contacto}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="w-full lg:w-1/2 relative h-[280px] sm:h-[330px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden border-[3px] border-[#2563eb] bg-[#e8ecf1] shadow-lg">
                <iframe
                  title="Ubicación de Gesgrama en Santa Coloma de Gramenet"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1s${language}!2ses!4v1700000000000!5m2!1s${language}!2ses`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 bg-[#0b172a] text-white rounded-xl p-3 sm:p-3.5 shadow-lg border border-white/20 z-30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-[10px] sm:text-xs uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</h3>
                      <p className="text-white text-xs sm:text-sm font-black font-sans leading-tight">Av. dels Banús, 49</p>
                      <p className="text-slate-300 text-[11px] sm:text-xs font-bold font-sans">08923 Santa Coloma de Gramenet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. GESTIÓN DE COMUNIDADES GESGRAMA (CON FOTOGRAFÍA OFICIAL DE SEDE) ── */}
        <section className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-slate-900">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-lg border border-slate-200 p-5 md:p-8 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-10">
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{language === "ca" ? "GESTIÓ DE COMUNITATS" : language === "en" ? "COMMUNITY MANAGEMENT" : "GESTIÓN DE COMUNIDADES"}</span>
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0f172a] mb-3 font-sans">
                    {language === "ca" ? (
                      <>Parlem de la teva <span className="text-[#2563eb]">comunitat</span> a {data.name}?</>
                    ) : language === "en" ? (
                      <>Let's talk about your <span className="text-[#2563eb]">community</span> in {data.name}</>
                    ) : (
                      <>¿Hablamos de tu <span className="text-[#2563eb]">comunidad</span> en {data.name}?</>
                    )}
                  </h2>
                  
                  <p className="text-[#0f172a] text-sm sm:text-base md:text-lg max-w-lg mb-4 font-bold leading-snug font-sans">
                    {language === "ca" 
                      ? `Administració transparent, resposta àgil i optimització de costos garantida per a les finques de ${data.name}.` 
                      : language === "en" 
                      ? `Transparent management, agile response, and guaranteed cost optimization for properties in ${data.name}.` 
                      : `Administración transparente, respuesta ágil y optimización de costes garantizada para las fincas de ${data.name}.`}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                    <a href="#contacto" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer font-sans">
                      <Phone className="w-4 h-4 text-white" />
                      <span>{language === "ca" ? "Parlar amb un assessor" : language === "en" ? "Talk to an advisor" : "Hablar con un asesor"}</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="https://wa.me/34601259424" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#075E54] hover:bg-[#054c44] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer font-sans"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#075E54]" />
                      <span>{language === "ca" ? "WhatsApp directe" : language === "en" ? "Direct WhatsApp" : "WhatsApp directo"}</span>
                    </a>
                  </div>

                  <div className="hidden sm:grid grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
                      <p className="text-lg sm:text-xl font-black text-slate-900 mb-0.5 font-sans">Nº 5583</p>
                      <p className="text-xs font-bold text-slate-600 leading-tight font-sans">{language === "ca" ? "Registre AICAT" : language === "en" ? "AICAT Registry" : "Registro AICAT"}</p>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
                      <p className="text-lg sm:text-xl font-black text-slate-900 mb-0.5 font-sans">+15 {language === "ca" ? "anys" : language === "en" ? "years" : "años"}</p>
                      <p className="text-xs font-bold text-slate-600 leading-tight font-sans">{language === "ca" ? "Experiència Local" : language === "en" ? "Local Experience" : "Experiencia Local"}</p>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xs">
                      <p className="text-lg sm:text-xl font-black text-slate-900 mb-0.5 font-sans">100%</p>
                      <p className="text-xs font-bold text-slate-600 leading-tight font-sans">{language === "ca" ? "Col·legiats API" : language === "en" ? "Registered API" : "Colegiados API"}</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="w-full lg:w-1/2 h-[220px] sm:h-[260px] md:h-[320px] relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-[#0f172a]">
                <Reveal delay={0.2} className="w-full h-full">
                  <img 
                    src={gesgramaOffice} 
                    alt="Oficina principal Gesgrama en Santa Coloma" 
                    className="absolute inset-0 w-full h-full object-cover object-center" 
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. ARTÍCULOS Y NOTICIAS INFORMATIVAS (BLOG) ── */}
        <section id="blog" className="pt-6 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 bg-[#e2e8f0] text-slate-900">
          <div className="max-w-[1150px] mx-auto">
            <Reveal>
              <div className="mb-6 text-center">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-wider uppercase px-3.5 py-1 rounded-xl shadow-xs mb-2">
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>{t.noticias.tag}</span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-1.5 font-sans tracking-tight">
                  {t.noticias.title1} <span className="text-[#2563eb]">{t.noticias.title2}</span>
                </h2>
                
                <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-snug font-sans mt-1">
                  {t.noticias.subtitle}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {articles.slice(0, 4).map((art, i) => {
                const title = art.title[language];
                const summary = art.summary[language];
                const date = art.date;
                return (
                  <Reveal key={art.id} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 flex flex-col h-full border-2 border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/8] overflow-hidden rounded-xl mb-3.5 bg-slate-100 cursor-pointer">
                        <img
                          src={art.image}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2">
                          <span className="text-slate-500 font-extrabold">{date}</span>
                        </div>
                        <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-black text-[#0f172a] text-base sm:text-lg leading-snug mb-2.5 group-hover:text-[#2563eb] transition-colors line-clamp-2 font-sans cursor-pointer">
                          {title}
                        </Link>
                        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-4 flex-1 line-clamp-3">
                          {summary}
                        </p>
                        <div className="mt-auto pt-3 border-t border-slate-100">
                          <Link
                            to="/noticias/$slug"
                            params={{ slug: art.slug }}
                            className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#2563eb] hover:text-[#1d4ed8] transition-all font-sans cursor-pointer"
                          >
                            <span>{t.noticias.seguirLeyendo}</span>
                            <ArrowRight className="w-4 h-4 text-[#2563eb]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3}>
              <div className="text-center mt-6">
                <Link
                  to="/noticias"
                  className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer font-sans"
                >
                  <span>{t.noticias.verTodasBtn}</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 8. FAQS DEL BARRIO (FORMATO CANÓNICO OSCURO DE GESGRAMA) ── */}
        <section id="faq" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-[#0b172a] rounded-[24px] md:rounded-[30px] shadow-xl border border-white/10 p-5 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1100px] relative z-10 overflow-hidden text-white flex flex-col items-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center w-full">
              <Reveal>
                <div className="text-center mb-6 flex flex-col items-center">
                  <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200 mb-3 font-sans">
                    <HelpCircle className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <span>{t.faq.tag} · {data.name}</span>
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white tracking-tight font-sans mb-2">
                    <span className="bg-[#2563eb] text-white px-3 py-1 rounded-xl inline-block shadow-md">
                      {language === "ca" ? "Preguntes Freqüents" : language === "en" ? "Common Questions" : "Preguntas Frecuentes"}
                    </span>{" "}
                    {language === "ca" ? `a ${data.name}` : language === "en" ? `in ${data.name}` : `en ${data.name}`}
                  </h2>

                  <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans mt-1.5 text-center">
                    {language === "ca"
                      ? `Respostes clares dels nostres administradors col·legiats per a les comunitats de veïns a ${data.name}.`
                      : language === "en"
                      ? `Straightforward answers from our chartered property managers for buildings in ${data.name}.`
                      : `Respuestas claras de nuestros administradores colegiados para las comunidades de propietarios en ${data.name}.`}
                  </p>
                </div>
              </Reveal>

              <div className="w-full flex flex-col gap-2.5 mb-6">
                {data.faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div 
                        onClick={() => setActiveFaq(isActive ? null : idx)}
                        className="cursor-pointer bg-[#e2e8f0] border border-slate-300 rounded-xl p-3.5 sm:p-4 shadow-xs transition-colors duration-200 hover:border-slate-400 group"
                      >
                        <div className="flex justify-between items-center gap-3">
                          <h3 className="font-black text-[#0f172a] text-sm sm:text-base md:text-lg pr-2 font-sans leading-snug">{faq.question}</h3>
                          <motion.div 
                            animate={{ rotate: isActive ? 45 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 shadow-xs ${isActive ? 'bg-[#1d4ed8] text-white' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'}`}
                          >
                            <span className="text-xl font-black leading-none select-none">+</span>
                          </motion.div>
                        </div>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div 
                              key={`faq-barrio-${idx}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pt-3 text-[#0f172a] leading-relaxed font-bold text-xs sm:text-sm md:text-base border-t border-slate-300 mt-3 font-sans">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <div className="text-center">
                <a 
                  href="#contacto" 
                  className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer font-sans"
                >
                  <span>{t.faq.askDoubt}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. FORMULARIO DE CONTACTO CANÓNICO CON VALIDACIÓN ── */}
        <section id="contacto" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-slate-900 scroll-mt-24 md:scroll-mt-28">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200 p-4 sm:p-7 md:p-9 mx-auto max-w-[1150px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Reveal>
                  <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                    {t.contacto.badge}
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2.5 font-sans">
                    {t.contacto.title1}<br />
                    <span className="text-[#2563eb] italic font-serif">en {data.name}</span>
                  </h2>
                  
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-4 font-bold leading-snug font-sans">
                    {language === "ca"
                      ? `Demana'ns un estudi de costos sense compromís per a la teva finca a ${data.name}. T'atendrem en menys de 24 hores.`
                      : language === "en"
                      ? `Request a free cost study for your building in ${data.name}. We reply in under 24 hours.`
                      : `Pídenos un estudio económico sin compromiso para tu comunidad en ${data.name}. Te respondemos en menos de 24 horas.`}
                  </p>

                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/10] group">
                    <img 
                      src={gesgramaOffice} 
                      alt="Gesgrama oficina principal en Santa Coloma" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:left-3 sm:right-auto bg-white rounded-xl p-3 shadow-lg border border-slate-200 max-w-[260px] z-20">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-black text-[10px] sm:text-xs text-[#0f172a] uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</div>
                          <div className="text-xs sm:text-sm text-[#0f172a] font-extrabold leading-snug mt-0.5 font-sans">
                            Av. dels Banús, 49
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-600 font-bold font-sans">
                            08923 Santa Coloma de Gramenet
                          </div>
                          <a href="tel:+34934685656" className="inline-flex items-center gap-1 text-[#2563eb] font-black text-xs sm:text-sm mt-1 font-sans">
                            <Phone className="w-3 h-3 text-[#2563eb]" /> 93 468 56 56
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <div className="bg-white border-2 border-slate-300 p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm">
                    <h3 className="font-black text-xl sm:text-2xl text-[#0f172a] mb-4 tracking-tight font-sans">
                      {language === "ca" ? `Consulta per a ${data.name}` : language === "en" ? `Inquiry for ${data.name}` : `Consulta para ${data.name}`}
                    </h3>
                    
                    <form 
                      key={language} 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const errors: typeof contactErrors = {};
                        if (!contactForm.nombre.trim()) {
                          errors.nombre = language === "ca" ? "El nom és obligatori" : language === "en" ? "Name is required" : "El nombre es obligatorio";
                        }
                        if (!contactForm.telefono.trim()) {
                          errors.telefono = language === "ca" ? "El telèfon és obligatori" : language === "en" ? "Phone is required" : "El teléfono es obligatorio";
                        }
                        if (!contactForm.email.trim()) {
                          errors.email = language === "ca" ? "L'email és obligatori" : language === "en" ? "Email is required" : "El email es obligatorio";
                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
                          errors.email = language === "ca" ? "Format d'email invàlid" : language === "en" ? "Invalid email format" : "Formato de correo no válido";
                        }
                        if (!contactForm.privacidad) {
                          errors.privacidad = language === "ca" ? "Has d'acceptar la política de privacitat" : language === "en" ? "You must accept privacy policy" : "Debes aceptar la política de privacidad";
                        }

                        setContactErrors(errors);
                        if (Object.keys(errors).length > 0) return;

                        setIsSubmittingContact(true);
                        setTimeout(() => {
                          setIsSubmittingContact(false);
                          setIsSubmittedSuccess(true);
                          setContactForm({
                            nombre: "",
                            telefono: "",
                            email: "",
                            asunto: `Gestión de Comunidades en ${data.name}`,
                            mensaje: "",
                            privacidad: false
                          });
                          setTimeout(() => {
                            setIsSubmittedSuccess(false);
                          }, 3000);
                        }, 1000);
                      }} 
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.nombre.toUpperCase()}</label>
                          <input 
                            type="text" 
                            placeholder={t.contacto.form.nombrePlaceholder} 
                            value={contactForm.nombre}
                            onChange={e => {
                              setContactForm(f => ({ ...f, nombre: e.target.value }));
                              if (contactErrors.nombre) setContactErrors(err => ({ ...err, nombre: undefined }));
                            }}
                            className={`w-full bg-[#f8fafc] border-2 ${contactErrors.nombre ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 font-sans`} 
                          />
                          {contactErrors.nombre && (
                            <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.nombre}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.telefono.toUpperCase()}</label>
                          <input 
                            type="text" 
                            placeholder={t.contacto.form.telefonoPlaceholder} 
                            value={contactForm.telefono}
                            onChange={e => {
                              setContactForm(f => ({ ...f, telefono: e.target.value }));
                              if (contactErrors.telefono) setContactErrors(err => ({ ...err, telefono: undefined }));
                            }}
                            className={`w-full bg-[#f8fafc] border-2 ${contactErrors.telefono ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 font-sans`} 
                          />
                          {contactErrors.telefono && (
                            <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.telefono}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.email.toUpperCase()}</label>
                          <input 
                            type="email" 
                            placeholder={t.contacto.form.emailPlaceholder} 
                            value={contactForm.email}
                            onChange={e => {
                              setContactForm(f => ({ ...f, email: e.target.value }));
                              if (contactErrors.email) setContactErrors(err => ({ ...err, email: undefined }));
                            }}
                            className={`w-full bg-[#f8fafc] border-2 ${contactErrors.email ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 font-sans`} 
                          />
                          {contactErrors.email && (
                            <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="contacto-asunto-select" className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.asunto.toUpperCase()}</label>
                          <div className="relative">
                            <select 
                              id="contacto-asunto-select" 
                              aria-label="Seleccionar motivo o tipo de consulta" 
                              value={contactForm.asunto}
                              onChange={e => setContactForm(f => ({ ...f, asunto: e.target.value }))}
                              className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none appearance-none pr-8 cursor-pointer truncate font-sans"
                            >
                              <option>{language === "ca" ? `Comunitat a ${data.name}` : `Comunidad en ${data.name}`}</option>
                              <option>{t.contacto.form.asuntoOpciones.comunidad}</option>
                              <option>{t.contacto.form.asuntoOpciones.venta}</option>
                              <option>{t.contacto.form.asuntoOpciones.juridico}</option>
                              <option>{t.contacto.form.asuntoOpciones.otro}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.mensaje.toUpperCase()}</label>
                        <textarea 
                          rows={2} 
                          placeholder={t.contacto.form.mensajePlaceholder} 
                          value={contactForm.mensaje}
                          onChange={e => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                          className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none resize-none font-sans" 
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 pt-1">
                          <input 
                            type="checkbox" 
                            id="privacy-barrio" 
                            checked={contactForm.privacidad}
                            onChange={e => {
                              setContactForm(f => ({ ...f, privacidad: e.target.checked }));
                              if (contactErrors.privacidad) setContactErrors(err => ({ ...err, privacidad: undefined }));
                            }}
                            className="w-4.5 h-4.5 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer" 
                          />
                          <label htmlFor="privacy-barrio" className="text-sm sm:text-base text-[#0f172a] font-bold cursor-pointer font-sans select-none">{t.contacto.form.privacidad}</label>
                        </div>
                        {contactErrors.privacidad && (
                          <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.privacidad}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className={`w-full text-white py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer font-sans disabled:opacity-80 ${
                          isSubmittedSuccess ? "bg-[#0b214a] hover:bg-[#0f172a]" : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                        }`}
                      >
                        {isSubmittingContact ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{language === "ca" ? "Enviant..." : language === "en" ? "Sending..." : "Enviando..."}</span>
                          </>
                        ) : isSubmittedSuccess ? (
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 stroke-[3] text-white" />
                            <span>{language === "ca" ? "Missatge enviat!" : language === "en" ? "Message sent!" : "¡Mensaje enviado!"}</span>
                          </div>
                        ) : (
                          <>
                            <span>{t.contacto.form.botonEnviar}</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. BANNER FINAL CTA ('LISTO PARA DAR EL SIGUIENTE PASO') ── */}
        <section id="final-cta" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-[#0f172a]">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-xl border border-slate-200 p-5 sm:p-7 md:p-9 pb-5 md:pb-7 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
              <div className="w-full lg:w-7/12 text-left py-0 lg:py-1">
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-3">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{t.finalCta.tag}</span>
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-2.5 leading-tight tracking-tight font-sans">
                    {t.finalCta.title1}{" "}
                    <span className="inline-block bg-[#2563eb] text-white px-3 py-1 rounded-xl shadow-xs">
                      {t.finalCta.title2}
                    </span>
                    ?
                  </h2>
                  
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mb-4 font-bold leading-snug font-sans text-balance">
                    {t.finalCta.subtitle}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 max-w-lg mb-2 sm:mb-4">
                    <a
                      href="#valuator-form"
                      className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <Home className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">{t.finalCta.btnValuate}</span>
                    </a>
                    <a
                      href="#contacto"
                      className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <Phone className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">{t.finalCta.btnContact}</span>
                    </a>
                  </div>
                </Reveal>
              </div>

              <div className="w-full lg:w-5/12 flex justify-center lg:justify-end items-end self-end mt-0 lg:mt-0">
                <img 
                  src="/images/cta_advisors_closed_laptop.jpg" 
                  alt="Asesores inmobiliarios Gesgrama" 
                  width={1024}
                  height={1024}
                  className="w-full max-w-[480px] h-auto object-contain block -mb-1" 
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA Y ENLACES LOCALIZADOS ── */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
            <div className="w-full md:hidden flex justify-center items-center mb-4">
              <FooterMascot className="w-44 sm:w-52 h-auto object-contain drop-shadow-lg" />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-4">
              <div className="lg:col-span-1">
                <div className="inline-block mb-4">
                  <img src="/images/logo-gesgrama-text-horizontal.webp" alt="Gesgrama - Inmobiliaria y Administración de Fincas" width={212} height={52} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[260px]">
                  {language === "ca" 
                    ? "Administració de finques i intermediació immobiliària a Santa Coloma de Gramenet amb més de 15 anys d'experiència."
                    : language === "en"
                      ? "Property management and real estate brokerage in Santa Coloma de Gramenet with over 15 years of experience."
                      : "Administración de fincas e intermediación inmobiliaria en Santa Coloma de Gramenet con más de 15 años de experiencia."}
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {language === "ca" ? "Navegació" : language === "en" ? "Navigation" : "Navegación"}
                </h3>
                <ul className="space-y-3.5">
                  {[
                    { label: language === "ca" ? "Propietats" : language === "en" ? "Properties" : "Propiedades", href: "/#propiedades" },
                    { label: language === "ca" ? "Serveis" : language === "en" ? "Services" : "Servicios", href: "/#servicios" },
                    { label: language === "ca" ? "Nosaltres" : language === "en" ? "About Us" : "Nosotros", href: "/#nosotros" },
                    { label: language === "ca" ? "Contacte" : language === "en" ? "Contact" : "Contacto", href: "/#contacto" },
                  ].map(link => (
                    <li key={link.href}>
                      <a href={link.href} className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                        <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {language === "ca" ? "Contacte Directe" : language === "en" ? "Direct Contact" : "Contacto Directo"}
                </h3>
                <ul className="space-y-4 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                    <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                  </li>
                  <li>
                    <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      {language === "en" ? "Office: 93 468 56 56" : "Oficina: 93 468 56 56"}
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 font-bold transition-colors whitespace-nowrap">
                      <MessageCircle className="w-5 h-5 fill-emerald-400 shrink-0" />
                      WhatsApp: 601 25 94 24
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@gesgrama.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold">
                      <Mail className="w-5 h-5 text-[#2563eb] shrink-0" />
                      info@gesgrama.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {language === "ca" ? "Legal" : language === "en" ? "Legal" : "Legal"}
                </h3>
                <ul className="space-y-3.5">
                  <li>
                    <Link to="/aviso-legal" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Avís Legal" : language === "en" ? "Legal Notice" : "Aviso Legal"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-privacidad" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Política de Privacitat" : language === "en" ? "Privacy Policy" : "Política de Privacidad"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-cookies" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Política de Cookies" : language === "en" ? "Cookie Policy" : "Política de Cookies"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              {language === "ca" ? "ACREDITACIONS PROFESSIONALS OFICIALS" : language === "en" ? "OFFICIAL PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES OFICIALES"}
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. {language === "ca" ? "Tots els drets reservats." : language === "en" ? "All rights reserved." : "Todos los derechos reservados."} · Desenvolupat per <a href="https://kovia.es" target="_blank" rel="noopener">Kovia</a></p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">{language === "ca" ? "Avís Legal" : language === "en" ? "Legal" : "Aviso Legal"}</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">{language === "ca" ? "Privacitat" : language === "en" ? "Privacy" : "Privacidad"}</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">{language === "ca" ? "Galetes" : language === "en" ? "Cookies" : "Cookies"}</Link>
              <span>·</span>
              <Link to="/admin" className="hover:text-amber-300 text-slate-400 transition-colors">{language === "ca" ? "Accés Gestor" : language === "en" ? "Staff Login" : "Acceso Gestor"}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <WhatsAppButton language={language} />

      {/* Service Detail Modal */}
      {selectedServiceIndex !== null && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto my-auto text-[#0f172a] animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedServiceIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-2 font-sans">
              {t.serviceModal.items[selectedServiceIndex]?.title}
            </h3>
            <p className="text-[#2563eb] text-sm sm:text-base font-extrabold mb-4 font-sans">
              {t.serviceModal.items[selectedServiceIndex]?.tagline}
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-bold font-sans">
              {t.serviceModal.items[selectedServiceIndex]?.description}
            </p>

            <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-200 mb-8 space-y-3">
              {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs md:text-sm font-extrabold text-slate-800 font-sans">
                  <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5 stroke-[3]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#contacto"
                onClick={() => setSelectedServiceIndex(null)}
                className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm py-4 px-6 rounded-full text-center transition-all shadow-md flex items-center justify-center gap-2 font-sans uppercase tracking-wider"
              >
                <span>{t.serviceModal.contactBtn}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <button
                type="button"
                onClick={() => setSelectedServiceIndex(null)}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm py-4 px-7 rounded-full transition-all cursor-pointer font-sans uppercase tracking-wider"
              >
                {t.serviceModal.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
