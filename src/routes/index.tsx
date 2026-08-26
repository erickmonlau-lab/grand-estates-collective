import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties, formatLocation } from "../data/properties";
import { homeArticles as articles } from "../data/homeArticles";

import { useEffect, useRef, useState } from "react";
import { MapPin, Building2, Phone, Mail, MessageCircle, HelpCircle, Menu, X, ChevronRight, Calendar, ChevronDown, ArrowRight, Send, Check, Heart, Star, Home, Clock, Ruler, Scale, Shield, TrendingUp, Paintbrush } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";
import handKeysImg from "@/assets/hand_keys_blue.webp";
import gallery1 from "@/assets/gallery-1.webp";

import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import { FooterMascot } from '@/components/FooterMascot';
import { Navbar } from '@/components/Navbar';
import { AccreditationBadges } from '@/components/AccreditationBadges';
import heroBgMobile from "@/assets/family_barcelona_opt_mobile.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", href: "/images/logo-gesgrama-text-horizontal.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: heroBgMobile, as: "image", type: "image/webp", media: "(max-width: 640px)" },
    ],
  }),
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// TRANSLATIONS (es / en / ca)
// ---------------------------------------------------------------------------
import { translations } from "../data/translations";

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function Reveal({ children, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function StatBlock({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <Reveal className="text-center">
      <div className="text-4xl md:text-6xl font-bold mb-3 text-onyx">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-onyx/40 font-medium">{label}</div>
    </Reveal>
  );
}

function FormField({ label, placeholder, type = "text", textarea }: { label: string; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-onyx font-bold uppercase tracking-wider block mb-2 text-[11px]">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-5 py-4 text-[15px] font-medium text-onyx focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors resize-none placeholder:text-onyx/30"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-5 py-4 text-[15px] font-medium text-onyx focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors placeholder:text-onyx/30"
        />
      )}
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
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      window.dispatchEvent(new Event("languagechange"));
    }
  };
  const t = translations[language];

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguageState(stored);
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

  // Valuator real calculation state
  const ZONE_PRICE_PER_M2: Record<string, number> = {
    "Riera Alta - Llatí": 1850,
    "Singuerlín": 1720,
    "Centre": 2350,
    "Santa Rosa - Can Mariner": 1910,
    "Fondo": 1680,
    "El Raval": 1790,
    "Riu": 1950
  };

  const [valuatorData, setValuatorData] = useState({
    zona: "Centre",
    metros: "85"
  });
  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);
  const [calculatedResult, setCalculatedResult] = useState<{
    estimatedValue: number;
    rangeMin: number;
    rangeMax: number;
    zoneName: string;
  }>({
    estimatedValue: 588000,
    rangeMin: 547000,
    rangeMax: 629000,
    zoneName: "Centre"
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
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mapInteractive, setMapInteractive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  // Lock body scroll when service modal is open
  useEffect(() => {
    if (selectedServiceIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedServiceIndex]);

  // --- USER AUTHENTICATION STATE & MOCK DATABASE ---
  const [user, setUser] = useState<{ email: string } | null>(() => {
    try {
      const stored = localStorage.getItem('gesgrama_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Favorites state persisted directly in localStorage without login requirement
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gesgrama_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try {
        localStorage.setItem('gesgrama_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving favorites:', e);
      }
      return updated;
    });
  };

  const getTranslatedFilterLabel = (category: 'tipo' | 'zona' | 'habitaciones' | 'precio', val: string) => {
    if (category === 'tipo') {
      if (val === 'Cualquier tipo') return t.properties.anyType;
      if (val === 'Piso') return language === 'ca' ? 'Pis' : language === 'en' ? 'Flat' : 'Piso';
      if (val === 'Ático') return language === 'ca' ? 'Àtic' : language === 'en' ? 'Penthouse' : 'Ático';
      if (val === 'Local comercial') return language === 'ca' ? 'Local comercial' : language === 'en' ? 'Commercial premises' : 'Local comercial';
      if (val === 'Chalet') return language === 'ca' ? 'Xalet' : language === 'en' ? 'Villa' : 'Chalet';
    }
    if (category === 'zona') {
      if (val === 'Cualquier zona') return t.properties.allZones;
      return formatLocation(val, language);
    }
    if (category === 'habitaciones') {
      if (val === 'Cualquier número') return t.properties.anyBedrooms;
      if (val.includes('+')) return `${val.replace('+', '')}+ ${t.properties.bedrooms.toLowerCase()}`;
    }
    if (category === 'precio') {
      if (val === 'Cualquier precio') return t.properties.anyPrice;
      if (val.endsWith('€')) return `< ${val}`;
    }
    return val;
  };
  const iconMap: Record<string, React.ReactNode> = {
    building: <Building2 className="w-7 h-7" />,
    home: <Home className="w-7 h-7" />,
    scale: <Scale className="w-7 h-7" />,
    clock: <Clock className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />
  };

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

  // Filter and sort properties
  const filteredProperties = properties
    .filter(p => {
      if (searchParams.mode === "favoritos") {
        return favorites.includes(p.id);
      }
      return p.operation === searchParams.mode;
    })
    .filter(p => {
      if (searchParams.mode === "favoritos") return true;
      return (searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona)) &&
             (searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo) &&
             isPriceValid(searchParams.precio, p.price) &&
             (searchParams.habitaciones === 'Cualquier número' || !searchParams.habitaciones || p.bedrooms >= parseInt(searchParams.habitaciones.replace("+", ""), 10));
    })
    .sort((a, b) => {
      if (sortOption === "precio_asc") return a.price - b.price;
      if (sortOption === "precio_desc") return b.price - a.price;
      return 0; // recientes / default order
    });

  let displayProperties = filteredProperties.slice(0, visibleCount);
  let isFallback = false;

  if (filteredProperties.length === 0 && searchParams.mode !== "favoritos") {
    isFallback = true;
    let similarProperties = properties
      .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
      .filter(p => p.operation === searchParams.mode);

    if (similarProperties.length === 0) {
      similarProperties = properties
        .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
        .filter(p => p.operation === searchParams.mode);
    }

    if (similarProperties.length === 0) {
      similarProperties = properties.filter(p => p.operation === searchParams.mode);
    }
    displayProperties = similarProperties.slice(0, 3);
  }

  return (
    <div className="bg-white text-onyx font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      <title>Gesgrama — Administración de Fincas, Inmobiliaria y Asesoría Jurídica en Santa Coloma de Gramenet</title>
      <meta name="description" content="Gesgrama: administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana. Gestión transparente de comunidades, compraventa de pisos, valoraciones gratuitas y asesoramiento legal. +15 años de experiencia, +300 comunidades gestionadas." />
      <link rel="canonical" href="https://www.gesgrama.es/" />

      {/* Google Search Favicon Directives */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="48x48" href="https://www.gesgrama.es/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="https://www.gesgrama.es/favicon-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://www.gesgrama.es/apple-touch-icon.png" />
      <link rel="shortcut icon" href="https://www.gesgrama.es/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content="Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet" />
      <meta property="og:description" content="Gestión profesional, transparente y cercana para tu comunidad y propiedad en Santa Coloma de Gramenet y área metropolitana. +4500 clientes satisfechos." />
      <meta property="og:url" content="https://grand-estates-collective.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://grand-estates-collective.vercel.app/og-image.png" />
      <meta property="og:image:secure_url" content="https://grand-estates-collective.vercel.app/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="Gesgrama" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="ca_ES" />
      <meta property="og:locale:alternate" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet" />
      <meta name="twitter:description" content="Gestión profesional de comunidades, compraventa de pisos y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana." />
      <meta name="twitter:image" content="https://grand-estates-collective.vercel.app/og-image.png" />

      {/* Geo Targeting SEO — Barcelona, Cataluña, España */}
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content="Santa Coloma de Gramenet, Barcelona" />
      <meta name="geo.position" content="41.4518;2.2085" />
      <meta name="ICBM" content="41.4518, 2.2085" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="keywords" content="administración de fincas Barcelona, inmobiliaria Barcelona, pisos en venta Barcelona, gestión de comunidades, asesoría jurídica inmobiliaria, comprar piso Santa Coloma de Gramenet, administrador de fincas Cataluña, valoración de pisos Barcelona, alquiler pisos Barcelona, Gesgrama" />

      {/* JSON-LD Structured Data — RealEstateAgent + LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["RealEstateAgent", "LocalBusiness"],
            "name": "Gesgrama",
            "alternateName": "Gesgrama Inmobiliaria y Administración de Fincas",
            "image": "https://www.gesgrama.es/logo.png",
            "logo": "https://www.gesgrama.es/logo.png",
            "@id": "https://www.gesgrama.es",
            "url": "https://www.gesgrama.es",
            "telephone": "+34934685656",
            "email": "info@gesgrama.es",
            "description": "Empresa de administración de fincas, inmobiliaria y asesoría jurídica en Barcelona y Santa Coloma de Gramenet. Más de 15 años de experiencia gestionando comunidades de propietarios, compraventa de pisos y asesoramiento legal inmobiliario.",
            "priceRange": "€€",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. dels Banús, 49",
              "addressLocality": "Santa Coloma de Gramenet",
              "postalCode": "08923",
              "addressRegion": "Barcelona",
              "addressCountry": "ES"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 41.4518,
              "longitude": 2.2085
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
              }
            ],
            "areaServed": [
              {
                "@type": "City",
                "name": "Barcelona",
                "sameAs": "https://es.wikipedia.org/wiki/Barcelona"
              },
              {
                "@type": "City",
                "name": "Santa Coloma de Gramenet",
                "sameAs": "https://es.wikipedia.org/wiki/Santa_Coloma_de_Gramenet"
              },
              {
                "@type": "City",
                "name": "Badalona"
              },
              {
                "@type": "City",
                "name": "L'Hospitalet de Llobregat"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Maresme"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Vallès"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Baix Llobregat"
              },
              {
                "@type": "State",
                "name": "Cataluña",
                "sameAs": "https://es.wikipedia.org/wiki/Catalu%C3%B1a"
              }
            ],
            "sameAs": [
              "https://www.gesgrama.es"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios Gesgrama",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Administración de Fincas",
                    "description": "Gestión integral de comunidades de propietarios en Barcelona y área metropolitana"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Servicios Inmobiliarios",
                    "description": "Compraventa y alquiler de pisos, áticos, chalets y locales comerciales en Barcelona"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Asesoría Jurídica Inmobiliaria",
                    "description": "Asesoramiento legal en herencias, contratos de arrendamiento y reclamación de deudas"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Obras y Mantenimiento",
                    "description": "Supervisión técnica de rehabilitaciones, tramitación de subvenciones y ITE de edificios"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "312",
              "bestRating": "5"
            }
          })
        }}
      />
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ── MAIN LANDMARK ── */}
      <main id="main-content">
        {/* ── HERO ── */}
        <HeroCarousel onPerformSearch={handleHeroSearch} language={language} />

      {/* ── PROPERTIES GRID (REFERENCE IMAGE 1 STYLE) ── */}
      <section id="propiedades" className="relative overflow-hidden bg-[#f5f6f8] text-onyx py-8 md:py-16 border-t border-slate-200/80">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-md border border-slate-200/80 p-5 sm:p-8 md:p-12 mx-4 md:mx-auto max-w-[1300px] relative z-10">
          <Reveal>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2.5 rounded-2xl shadow-md mb-4 font-sans">
                <Home className="w-4 h-4 text-white" />
                <span>{t.properties.tag}</span>
              </span>
              
              <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] leading-tight tracking-tight mb-3 font-sans w-full">
                {t.properties.title1} <span className="text-[#2563eb]">{t.properties.title2}</span>
              </h2>
              
              <p className="text-[#0f172a] text-lg sm:text-xl md:text-2xl leading-relaxed font-extrabold font-sans max-w-4xl text-balance">
                {t.properties.subtitle}
              </p>
            </div>

            {/* Dedicated full-width row for Mode Selector + Stat Badge right above Search Console */}
            <div className="mt-6 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
              {/* Search Mode Selector Tabs - Responsive 3-column equal grid on mobile to fit all screen sizes */}
              <div className="grid grid-cols-3 sm:flex sm:items-center bg-[#E8EAF0] p-1.5 sm:p-2 rounded-2xl border border-slate-300/80 shadow-sm w-full sm:w-auto gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "comprar" }))}
                  className={`px-2 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[11px] xs:text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer font-sans text-center ${
                    searchParams.mode === "comprar" ? "bg-[#2563eb] text-white shadow-sm" : "bg-[#E8EAF0] text-[#1A1F2E] hover:bg-[#d8dbe4]"
                  }`}
                >
                  {t.hero.comprar}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "alquilar" }))}
                  className={`px-2 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[11px] xs:text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer font-sans text-center ${
                    searchParams.mode === "alquilar" ? "bg-[#2563eb] text-white shadow-sm" : "bg-[#E8EAF0] text-[#1A1F2E] hover:bg-[#d8dbe4]"
                  }`}
                >
                  {t.hero.alquilar}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "favoritos" }))}
                  className={`px-1.5 xs:px-2 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] xs:text-[11px] sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 font-sans whitespace-nowrap ${
                    searchParams.mode === "favoritos" ? "bg-red-500 text-white shadow-sm" : "bg-[#E8EAF0] text-[#1A1F2E] hover:bg-[#d8dbe4]"
                  }`}
                >
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current shrink-0" />
                  <span>Fav ({favorites.length})</span>
                </button>
              </div>

              <div className="hidden sm:flex bg-[#0f172a] text-white rounded-2xl px-6 py-3.5 items-center gap-3.5 shadow-lg border border-slate-700/80 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Home className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-2xl font-black text-white font-sans">{filteredProperties.length}</span>
                    <span className="text-sm font-black text-blue-400 font-sans">{language === "ca" ? "propietats" : language === "en" ? "properties" : "propiedades"}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-300 tracking-wide font-sans mt-0.5">{language === "ca" ? "disponibles ara" : language === "en" ? "available now" : "disponibles ahora"}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FILTERS */}
          {/* SINGLE SEARCH CONSOLE (4 FIELDS + BUSCAR BUTTON) */}
          <div className="mt-8 mb-4">
            <div className="bg-white border-2 border-slate-200 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40">
              
              {/* Field 1: Tipo de Inmueble */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.propertyType}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("tipo", consoleFilters.tipo)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: t.properties.anyType, value: "Cualquier tipo" },
                      { label: "Piso", value: "Piso" },
                      { label: "Apartamento", value: "Apartamento" },
                      { label: "Ático", value: "Ático" },
                      { label: "Chalet / Villa", value: "Chalet" },
                      { label: "Local Comercial", value: "Local" },
                      { label: "Oficina", value: "Oficina" },
                      { label: "Aparcamiento", value: "Aparcamiento" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesTipo = opt.value === "Cualquier tipo" ? true : p.type === opt.value;
                        return matchesMode && matchesTipo;
                      }).length;

                      const isActive = consoleFilters.tipo === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, tipo: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer font-sans ${
                            isActive ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />
                            ) : (
                              <span className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span>{opt.label}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 2: Zona */}
              <div className="hidden lg:block flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.zone}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("zona", consoleFilters.zona)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: t.properties.allZones, value: "Cualquier zona" },
                      ...[...new Set(properties.map(p => p.location))].map(loc => ({ label: formatLocation(loc, language), value: loc }))
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesZona = opt.value === "Cualquier zona" ? true : p.location === opt.value;
                        return matchesMode && matchesZona;
                      }).length;

                      const isActive = consoleFilters.zona === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, zona: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer font-sans ${
                            isActive ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />
                            ) : (
                              <span className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span>{opt.label}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 3: Habitaciones */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "habitaciones" ? null : "habitaciones")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.bedrooms}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("habitaciones", consoleFilters.habitaciones)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "habitaciones" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: (t.properties as any).anyNumber || (t.properties as any).anyBedrooms || "Cualquier número", value: "Cualquier número" },
                      { label: "1+ " + t.properties.bedrooms.toLowerCase(), value: "1+" },
                      { label: "2+ " + t.properties.bedrooms.toLowerCase(), value: "2+" },
                      { label: "3+ " + t.properties.bedrooms.toLowerCase(), value: "3+" },
                      { label: "4+ " + t.properties.bedrooms.toLowerCase(), value: "4+" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        if (opt.value === "Cualquier número") return true;
                        const min = parseInt(opt.value.replace("+", ""), 10);
                        return p.bedrooms >= min;
                      }).length;

                      const isActive = consoleFilters.habitaciones === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, habitaciones: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer font-sans ${
                            isActive ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />
                            ) : (
                              <span className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span>{opt.label}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 4: Precio Máximo */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "precio" ? null : "precio")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-[#2563eb] text-xs font-black">€</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.maxPrice}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("precio", consoleFilters.precio)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {(searchParams.mode === "alquilar" 
                      ? [t.properties.anyPrice, "Hasta 1.000 €", "Hasta 1.500 €", "Hasta 2.000 €"]
                      : [t.properties.anyPrice, "Hasta 500.000 €", "Hasta 1.000.000 €", "Hasta 2.000.000 €"]
                    ).map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        return isPriceValid(opt, p.price);
                      }).length;

                      const isActive = consoleFilters.precio === opt;

                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, precio: opt }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer font-sans ${
                            isActive ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isActive ? (
                              <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />
                            ) : (
                              <span className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span>{opt}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Buscar Button */}
              <button 
                onClick={() => {
                  setSearchParams(prev => ({
                    ...prev,
                    tipo: consoleFilters.tipo,
                    zona: consoleFilters.zona,
                    habitaciones: consoleFilters.habitaciones,
                    precio: consoleFilters.precio
                  }));
                  const el = document.getElementById('propiedades');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-sm px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shrink-0 cursor-pointer font-sans uppercase tracking-wider"
              >
                {t.hero.buscarBtn}
              </button>
            </div>

            {/* Quick access chips for zones - Horizontal scrollable carousel on mobile */}
            <div className="flex items-center gap-2.5 mt-6 pb-6 border-b border-slate-100 overflow-x-auto no-scrollbar scroll-smooth -mx-1 px-1">
              <span className="text-xs sm:text-sm font-black text-[#0f172a] uppercase tracking-wider mr-2 shrink-0 font-sans">{t.properties.popularZones}:</span>
              {[
                { label: t.properties.allZones, value: "Cualquier zona" },
                ...[...new Set(properties.map(p => p.location))].map(loc => ({ label: formatLocation(loc, language), value: loc }))
              ].map(item => {
                const isActive = searchParams.zona === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setConsoleFilters(prev => ({ ...prev, zona: item.value }));
                      setSearchParams(prev => ({ ...prev, zona: item.value }));
                    }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer font-sans shrink-0 whitespace-nowrap ${
                      isActive 
                        ? "bg-[#2563eb] text-white shadow-xs" 
                        : "bg-[#E8EAF0] text-[#1A1F2E] hover:bg-[#d8dbe4]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* RESULTS COUNT & SORTING (INSIDE CARD BUBBLE) */}
            {(() => {
              const renderPropertyCard = (property: any, idx: number) => {
                const isFav = favorites.includes(property.id);
                const pData = (t.propertiesData as any)?.[property.id] || property;

                return (
                  <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id}>
                    <div
                      className="group bg-white rounded-3xl flex flex-col h-full border-2 border-slate-300 hover:border-[#2563eb] shadow-md hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-all duration-300 overflow-hidden"
                    >
                      {/* Image Block */}
                      <div className="relative h-[170px] sm:h-[220px] md:h-[250px] w-full overflow-hidden bg-slate-100">
                        <img src={property.image} alt={pData.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                        
                        {/* Heart Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(property.id);
                          }}
                          aria-label="Guardar en favoritos"
                          className={`absolute top-4 right-4 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md z-20 ${
                            isFav 
                              ? 'bg-red-500 text-white scale-110 shadow-red-500/30' 
                              : 'bg-white/90 text-slate-700 hover:text-red-500 hover:scale-110'
                          }`}
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>

                      {/* Content Block */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        {/* Badge + Ref */}
                        <div className="mb-3 flex items-center justify-between gap-2">
                          {(() => {
                            const type = pData.type || property.type || "Piso";
                            let badgeClass = "bg-[#2563eb] text-white";
                            if (type.includes("Ático") || type.includes("Penthouse") || type.includes("Àtic")) {
                              badgeClass = "bg-[#0369a1] text-white";
                            } else if (type.includes("Chalet") || type.includes("Villa") || type.includes("Xalet")) {
                              badgeClass = "bg-[#4338ca] text-white";
                            } else if (type.toLowerCase().includes("local")) {
                              badgeClass = "bg-slate-700 text-white";
                            } else if (type.includes("Oficina") || type.includes("Office")) {
                              badgeClass = "bg-[#d97706] text-white";
                            }
                            return (
                              <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider font-sans shadow-xs ${badgeClass}`}>
                                {type}
                              </span>
                            );
                          })()}
                          <span className="text-xs font-mono font-black text-[#0f172a] bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                            Ref: {property.ref || "API A10750"}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-black text-[#0f172a] mb-1.5 leading-snug group-hover:text-[#2563eb] transition-colors font-sans text-balance">{pData.name}</h3>
                        <p className="text-sm font-extrabold text-slate-500 flex items-center gap-1.5 mb-4 font-sans">
                          <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                          {formatLocation(pData.location || property.location, language)}
                        </p>

                        {/* Features Row */}
                        <div className="mb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-700 font-sans">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4.5 h-4.5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            <span>{property.bedrooms > 0 ? property.bedrooms : "2"} {language === "en" ? (property.bedrooms === 1 ? "bd" : "bds") : "hab"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4.5 h-4.5 text-[#0369a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 2v4m0 0H4a2 2 0 00-2 2v3a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-2V2m-8 0h8M6 14v6m4-6v6m4-6v6" /></svg>
                            <span>{property.bathrooms > 0 ? property.bathrooms : "1"} {language === "en" ? (property.bathrooms === 1 ? "bath" : "baths") : language === "ca" ? (property.bathrooms === 1 ? "bany" : "banys") : (property.bathrooms === 1 ? "baño" : "baños")}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4.5 h-4.5 text-[#0369a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            <span className="font-black text-[#0369a1] bg-[#dbeafe] px-2.5 py-0.5 rounded-md text-xs sm:text-sm">{property.surface} m²</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div>
                            <div className="text-xs sm:text-sm font-black text-[#0f172a] uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.priceLabel || "PRECIO"}</div>
                            <div className="text-2xl sm:text-3xl font-black text-[#2563eb] leading-none font-sans">
                              {new Intl.NumberFormat('es-ES').format(property.price)}€
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              };

              return (
                <div className="mt-6">
                  {/* Results Count & Sort directly below zones pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-xs font-black w-7 h-7 rounded-full shadow-sm">
                        {filteredProperties.length}
                      </span>
                      <p className="text-sm sm:text-base font-black text-[#0f172a] font-sans">
                        {t.properties.availableCount}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-sm relative" onClick={(e) => e.stopPropagation()}>
                      <span className="text-slate-500 font-extrabold uppercase tracking-wider text-xs font-sans">{t.properties.sortBy}:</span>
                      <button 
                        onClick={() => setOpenDropdown(openDropdown === "ordenar" ? null : "ordenar")}
                        className="flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-xl px-4 py-2 font-black text-[#0f172a] hover:bg-slate-200 transition-colors shadow-xs font-sans text-xs sm:text-sm cursor-pointer"
                      >
                        {sortOption === "precio_asc" ? "Precio: Menor a Mayor" : sortOption === "precio_desc" ? "Precio: Mayor a Menor" : t.properties.mostRecent} 
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      </button>

                      {openDropdown === "ordenar" && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                          {[
                            { label: t.properties.mostRecent, value: "recientes" },
                            { label: "Precio: Menor a Mayor", value: "precio_asc" },
                            { label: "Precio: Mayor a Menor", value: "precio_desc" }
                          ].map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setSortOption(opt.value);
                                setOpenDropdown(null);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-left transition-all cursor-pointer font-sans ${
                                sortOption === opt.value ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {sortOption === opt.value && <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {isFallback && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm font-medium">
                      {t.properties.fallbackMsg}
                    </div>
                  )}

                  {/* PROPERTY CARDS GRID (INSIDE CARD BUBBLE) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                  </div>

                  {/* LOAD MORE BUTTON (INSIDE CARD BUBBLE) */}
                  <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100">
                    {visibleCount < filteredProperties.length ? (
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 4)}
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer font-sans"
                      >
                        <span>{t.properties.verMas}</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setSearchParams({
                            mode: "comprar",
                            zona: "Cualquier zona",
                            tipo: "Cualquier tipo",
                            precio: "Cualquier precio",
                            habitaciones: "Cualquier número"
                          });
                          setVisibleCount(properties.length);
                        }}
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer font-sans"
                      >
                        <span>{t.properties.verTodas}</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <div id="nosotros"></div>
      <section id="testimonios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14">
        <div className="bg-[#f1f5f9] rounded-[28px] md:rounded-[36px] shadow-2xl border-2 border-slate-400/90 p-6 sm:p-10 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-[#0f172a]">
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none z-0" />
          <div className="relative z-10">
            {/* Header */}
            <Reveal>
              <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-sm font-black tracking-widest uppercase px-5 py-2 rounded-2xl shadow-md border border-white/10 mb-4">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0f172a] tracking-tight mb-3 font-sans">
                  {t.testimonios.title1}{" "}
                  <span className="relative inline-block text-[#2563eb] pb-2">
                    {t.testimonios.title2}
                    <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#38bdf8]" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                      <path d="M0,7 Q25,0 50,7 T100,7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
              </div>
            </Reveal>

            {/* 3 Real Google Reviews Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {t.testimonios.items.map((item, i) => {
                const avatarBgs = ["bg-indigo-600", "bg-amber-700", "bg-[#2563eb]"];
                const topBorders = ["border-t-4 border-[#0b214a]", "border-t-4 border-[#2563eb]", "border-t-4 border-[#0b214a]"];
                const initials = ["F", "A", "C"];
                return (
                  <Reveal key={item.author} delay={i * 0.1}>
                    <div className={`bg-white text-[#0f172a] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full border border-slate-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${topBorders[i % topBorders.length]}`}>
                      
                      {/* Watermark Quote Icon */}
                      <div className="absolute top-3 right-4 text-[#757989] opacity-30 select-none pointer-events-none text-6xl font-serif font-black leading-none">
                        “
                      </div>

                      <div className="relative z-10">
                        {/* Rating Stars & Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, s) => (
                              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-sm font-black text-slate-800 ml-1.5">5/5</span>
                          </div>
                        </div>

                        {/* Quote Text - LETRA MÁS GRANDE Y LEGIBLE */}
                        <p className="text-[#0f172a] text-base sm:text-lg md:text-xl leading-relaxed mb-6 font-bold tracking-tight">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Author Row */}
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5 relative z-10">
                        <div className={`w-12 h-12 rounded-full ${avatarBgs[i % avatarBgs.length]} text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md uppercase tracking-wider border-2 border-white/60`}>
                          {initials[i % initials.length]}
                        </div>
                        <div className="flex flex-col">
                          <strong className="font-black text-lg sm:text-xl text-[#0f172a] tracking-tight leading-tight">{item.author}</strong>
                          <span className="text-sm text-slate-600 font-extrabold mt-0.5">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION (DISTINCT DARK NAVY & CYAN LOGO ACCENT INFORMATIVE LAYOUT) ── */}
      <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-8">
        <div className="bg-[#0f172a] rounded-[28px] md:rounded-[36px] shadow-xl border border-sky-500/20 p-5 sm:p-7 md:p-9 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white">
          <div className="text-center mb-6 sm:mb-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-2xl mb-3 shadow-md border border-slate-200 font-sans">
                <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>{t.servicios.tag}</span>
              </span>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-2 tracking-tight font-sans">
                {t.servicios.title1} <span className="text-[#38bdf8]">{t.servicios.title2}</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-white text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-extrabold leading-relaxed font-sans mt-3">
                {t.servicios.subtitle}
              </p>
            </Reveal>
          </div>

          {/* Grid de 2x2 Tarjetas Horizontales Informativas (Texto Protagonista + Imagen Thumbnail ~30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    className="group bg-white text-[#0f172a] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 h-full border-2 border-slate-100 hover:border-[#0284c7] cursor-pointer"
                  >
                    
                    {/* Thumbnail con icono Cyan superpuesto */}
                    <div className="relative w-full sm:w-[130px] h-[100px] sm:h-[115px] rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
                      <img src={bgs[i]} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#0369a1] text-white shadow-md flex items-center justify-center z-10">
                        {icons[i]}
                      </div>
                    </div>

                    {/* Texto informativo + Botón Píldora Azul Cyan */}
                    <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0f172a] mb-2.5 leading-snug group-hover:text-[#0369a1] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-base sm:text-lg text-slate-700 font-bold leading-relaxed mb-5">
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
                          className="bg-[#0369a1] hover:bg-[#075985] text-white font-black text-sm sm:text-base px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2.5 w-fit font-sans"
                        >
                          <span>{t.servicios.saberMas}</span>
                          <ArrowRight className="w-4.5 h-4.5 text-white" />
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

      {/* ── VALORADOR DE INMUEBLES (EXACT MATCH REFERENCE IMAGE) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-3 sm:py-6 md:py-10">
        <div className="bg-white rounded-[24px] sm:rounded-[36px] shadow-2xl border border-slate-200/80 p-5 sm:p-8 md:p-14 mx-3 sm:mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-[#0f172a]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            
            {/* LEFT COLUMN: Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white text-xs sm:text-sm font-black tracking-wider sm:tracking-widest uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-md font-sans">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span>{t.valorador.tag}</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-[1.15] sm:leading-[1.1] tracking-tight font-sans text-[#0f172a] flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{t.valorador.title}</span>
                <span className="bg-[#2563eb] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-sm whitespace-nowrap">
                  {t.valorador.titleAccent}
                </span>
              </h2>

              <p className="text-slate-700 text-base sm:text-xl md:text-2xl max-w-[580px] mb-6 sm:mb-8 leading-relaxed font-extrabold font-sans">
                {t.valorador.subtitle}
              </p>

              <div className="w-full max-w-xl">
                <div className="w-full">
                  {/* Inputs Row */}
                  <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
                    {/* Select Zona */}
                    <div className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-5 py-4 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3 w-full">
                        <MapPin className="w-5 h-5 text-[#2563eb] shrink-0" />
                        <select
                          id="valuator-zona-select"
                          aria-label="Seleccionar zona de la propiedad"
                          value={valuatorData.zona}
                          onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-base font-bold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                        >
                          <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                          {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                        </select>
                      </div>
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    </div>

                    {/* Input Superficie (Ruler Icon) */}
                    <div className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xs">
                      <Ruler className="w-5 h-5 text-[#2563eb] shrink-0" />
                      <input
                        type="text"
                        placeholder={language === "ca" ? "Superfície aprox. (m²)" : language === "en" ? "Approx. surface (m²)" : "Superficie aprox. (m²)"}
                        value={valuatorData.metros}
                        onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                        className="w-full bg-transparent border-0 p-0 text-base font-bold text-[#0f172a] focus:ring-0 outline-none placeholder:text-slate-400 font-sans"
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleCalculateValuation}
                    disabled={isCalculatingValuation}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-base sm:text-lg py-4.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2.5 mb-4 font-sans disabled:opacity-75"
                  >
                    <Home className="w-5 h-5 text-white" />
                    <span>{isCalculatingValuation ? t.valorador.calculando : t.valorador.calcularBtn}</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Trust Badges - Horizontal row centered under button */}
                  <div className="flex flex-row flex-nowrap sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-3 w-full">
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md text-xs sm:text-base font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 stroke-[3] shrink-0" />
                      <span>{t.valorador.sinCompromiso}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md text-xs sm:text-base font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400 shrink-0" />
                      <span>{t.valorador.resultadoInmediato}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: White Floating Result Card with Permanent Blue Border */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="bg-white text-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-[380px] border-2 border-[#2563eb] relative overflow-hidden text-center">
                
                {/* Spinner / Skeleton Loading Overlay */}
                {isCalculatingValuation && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="w-12 h-12 border-4 border-[#2563eb]/20 border-t-[#2563eb] rounded-full animate-spin mb-4" />
                    <p className="text-sm font-black text-[#0f172a] font-sans">{t.valorador.calculando}</p>
                    <p className="text-xs text-slate-500 font-bold mt-1 font-sans">{t.valorador.analizando} {formatLocation(valuatorData.zona, language) || "la zona"}...</p>
                  </div>
                )}

                {/* 1. "VALOR ESTIMADO" pill badge */}
                <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-md font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 animate-pulse"></span>
                  <span>{t.valorador.valorEstimado} ({formatLocation(calculatedResult.zoneName, language)})</span>
                </div>
                
                {/* Main Estimated Value */}
                <div className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-3 leading-none tracking-tight font-sans">
                  {new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)} <span className="text-[#2563eb] font-bold">€</span>
                </div>

                {/* 2. Rango estimado de mercado en una sola línea limpia */}
                <p className="text-base sm:text-lg font-black text-[#0f172a] mb-2 font-sans">
                  {t.valorador.rangoEstimado}: <span className="font-black text-[#0f172a]">{new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)}€ – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)}€</span>
                </p>
                <p className="text-sm sm:text-base font-extrabold text-[#0f172a] mb-6 font-sans">
                  *{t.valorador.disclaimer}
                </p>
                
                {/* 3. Sparkline Price Trend Chart con badge en cabecera limpia y eje X de 6 meses */}
                <div className="pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm sm:text-base font-black text-[#0f172a] font-sans uppercase tracking-wider">
                      {language === "ca" ? "Tendència de mercat" : language === "en" ? "Market trend" : "Tendencia de mercado"}
                    </span>
                    <span className="bg-emerald-800 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-black flex items-center gap-1 shadow-sm font-sans">
                      <TrendingUp className="w-3.5 h-3.5 text-white stroke-[3]" /> +4.2%
                    </span>
                  </div>
                  <div className="w-full h-28 sm:h-32 relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 250 80" fill="none">
                      <defs>
                        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Subdued horizontal guide lines */}
                      <line x1="0" y1="20" x2="250" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="250" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      
                      {/* Fill area & Trend curve */}
                      <path d="M 15 62 C 38 62, 45 55, 62 55 C 85 55, 92 44, 109 44 C 132 44, 139 35, 156 35 C 179 35, 186 24, 203 24 C 226 24, 235 14, 250 14 L 250 80 L 15 80 Z" fill="url(#sparklineGrad)" />
                      <path d="M 15 62 C 38 62, 45 55, 62 55 C 85 55, 92 44, 109 44 C 132 44, 139 35, 156 35 C 179 35, 186 24, 203 24 C 226 24, 235 14, 250 14" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      
                      {/* Data Points */}
                      <circle cx="15" cy="62" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="62" cy="55" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="109" cy="44" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="156" cy="35" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="203" cy="24" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="250" cy="14" r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                    </svg>
                  </div>
                  {/* X-Axis Month Labels (Last 6 Months) */}
                  <div className="flex justify-between items-center text-xs sm:text-sm font-black text-[#0f172a] mt-2 px-1 font-sans border-t border-slate-100/80 pt-2">
                    {(() => {
                      const locale = language === "ca" ? "ca-ES" : language === "en" ? "en-US" : "es-ES";
                      const now = new Date();
                      const months = [];
                      for (let i = 5; i >= 0; i--) {
                        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                        const m = d.toLocaleDateString(locale, { month: "short" });
                        months.push(m.charAt(0).toUpperCase() + m.slice(1).replace(".", ""));
                      }
                      return months.map((month, mIdx) => (
                        <span key={mIdx} className={mIdx === 5 ? "text-[#2563eb] font-black" : "text-[#0f172a]"}>
                          {month}
                        </span>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GALLERY (COBERTURA / PROYECTOS EXCLUSIVOS - POINT 5 LIGHT GRAY BG) ── */}
      <section id="cobertura" className="py-6 md:py-14 px-4 md:px-8 bg-[#e2e8f0] text-white">
        <div className="bg-[#0b172a] rounded-[28px] md:rounded-[36px] shadow-2xl border border-white/10 p-6 sm:p-10 md:p-12 mx-auto max-w-[1300px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
              <Reveal>
                <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-4 py-2 rounded-2xl shadow-md mb-6 border border-slate-200">
                  <MapPin className="w-4 h-4 text-[#2563eb]" />
                  <span>{language === "ca" ? "ÀREA DE COBERTURA" : language === "en" ? "COVERAGE AREA" : "ÁREA DE COBERTURA"}</span>
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white mb-6 font-sans flex flex-col items-start gap-1">
                  <span>{language === "ca" ? "Experts a" : language === "en" ? "Experts in" : "Expertos en"}</span>
                  <span className="inline-block bg-[#2563eb] text-white px-4.5 py-1.5 rounded-2xl shadow-lg mt-1 whitespace-nowrap">
                    Santa Coloma de
                  </span>
                  <span className="inline-block bg-[#2563eb] text-white px-4.5 py-1.5 rounded-2xl shadow-lg whitespace-nowrap">
                    Gramenet
                  </span>
                </h2>
                
                <p className="text-white text-lg sm:text-xl md:text-2xl max-w-lg mb-4 font-extrabold leading-relaxed font-sans">
                  {language === "ca" ? "Equip propi amb atenció personalitzada a tots els barris de Santa Coloma de Gramenet." : language === "en" ? "Our own team with personalized service in all neighborhoods of Santa Coloma de Gramenet." : "Equipo propio con atención personalizada en todos los barrios de Santa Coloma de Gramenet."}
                </p>
                <div className="flex flex-wrap gap-2.5 mb-8 max-w-lg">
                  {[
                    "Centro",
                    "Singuerlín",
                    "Santa Rosa - Can Mariner",
                    "Fondo",
                    "Riera Alta - Llatí",
                    "El Raval",
                    "Riu Nord / Riu Sud",
                    "Oliveres - Can Serra"
                  ].map((barrio) => (
                    <span key={barrio} className="bg-[#2A3245] text-white text-sm sm:text-base font-black px-4.5 py-2.5 rounded-full border border-white/10 shadow-sm hover:bg-[#343e55] transition-colors">
                      📍 {formatLocation(barrio, language)}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Help Bubble Card - LETRAS MÁS GRANDES */}
              <Reveal delay={0.1} className="w-full">
                <div className="bg-white border-2 border-[#2563eb] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl text-[#0f172a]">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-14 h-14 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 text-white shadow-md">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0f172a] leading-tight font-sans">
                        {language === "ca" ? "Necessites ajuda?" : language === "en" ? "Need help?" : "¿Necesitas ayuda?"}
                      </h3>
                      <p className="text-slate-700 text-base sm:text-lg font-extrabold leading-snug mt-1 font-sans">
                        {language === "ca" ? "Som aquí per ajudar-te, sense compromís." : language === "en" ? "We are here to help you, no obligation." : "Estamos aquí para ayudarte, sin compromiso."}
                      </p>
                    </div>
                  </div>
                  <a href="#contacto" className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-base px-8 py-4 rounded-full transition-all shadow-md flex items-center justify-center gap-2.5 shrink-0 cursor-pointer font-sans whitespace-nowrap">
                    <span>{t.hero.contacto}</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT CONTENT: MAP WITH PROMINENT BLUE BORDER */}
            <div className="w-full lg:w-1/2 relative h-[340px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden border-4 border-[#2563eb] bg-slate-100 shadow-xl group">
              <Reveal delay={0.2} className="w-full h-full">
                <iframe
                  title="Ubicación de Gesgrama en Santa Coloma de Gramenet"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
                ></iframe>

                {/* Floating Card Bottom Right */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-[#0b172a] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/20 z-30 pointer-events-auto max-w-full">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md">
                      <MapPin className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-xs sm:text-sm uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</h3>
                      <p className="text-white text-base sm:text-lg font-black font-sans">Av. dels Banús, 49</p>
                      <p className="text-slate-200 text-sm font-bold font-sans">08923 Santa Coloma de Gramenet</p>
                    </div>
                  </div>
                </div>

              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA COMUNIDAD (ELEGANT LIGHT BUBBLE CARD WITH BLUE ACCENT) ── */}
      <section className="py-10 md:py-14 px-4 md:px-8 bg-[#e2e8f0] text-onyx">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 p-8 md:p-14 mx-auto max-w-[1300px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-14">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-2xl shadow-md mb-6 w-fit">
                  <Building2 className="w-4 h-4" />
                  <span>{language === "ca" ? "GESTIÓ DE COMUNITATS" : language === "en" ? "COMMUNITY MANAGEMENT" : "GESTIÓN DE COMUNIDADES"}</span>
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-[#0f172a] mb-5 font-sans">
                  {language === "ca" ? (
                    <>Parlem de la teva <span className="text-[#2563eb]">comunitat</span>?</>
                  ) : language === "en" ? (
                    <>Let's talk about your <span className="text-[#2563eb]">community</span></>
                  ) : (
                    <>¿Hablamos de tu <span className="text-[#2563eb]">comunidad</span>?</>
                  )}
                </h2>
                
                <p className="text-[#0f172a] text-lg sm:text-xl md:text-2xl max-w-xl mb-8 font-extrabold leading-snug font-sans text-balance">
                  {language === "ca" 
                    ? "Administració transparent, resposta àgil i optimització de costos garantida per a la teva finca." 
                    : language === "en" 
                    ? "Transparent management, agile response and guaranteed cost optimization for your property." 
                    : "Administración transparente, respuesta ágil y optimización de costes garantizada para tu finca."}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                  <a href="#contacto" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-black text-sm sm:text-base transition-all shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group w-full sm:w-auto cursor-pointer font-sans">
                    <Phone className="w-4.5 h-4.5 text-white" />
                    <span>{language === "ca" ? "Parlar amb un assessor" : language === "en" ? "Talk to an advisor" : "Hablar con un asesor"}</span>
                    <ArrowRight className="w-4.5 h-4.5 text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="https://wa.me/34601259424" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#075E54] hover:bg-[#054c44] text-white px-8 py-4 rounded-full font-black text-sm sm:text-base transition-all shadow-[0_6px_20px_rgba(7,94,84,0.4)] hover:shadow-[0_8px_25px_rgba(7,94,84,0.55)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group w-full sm:w-auto cursor-pointer font-sans"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:scale-110 transition-transform">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    <span>{language === "ca" ? "WhatsApp directe" : language === "en" ? "Direct WhatsApp" : "WhatsApp directo"}</span>
                  </a>
                </div>

                {/* Stats Grid - Fondo gris y letra en blanco impecable */}
                <div className="hidden sm:grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-6 border-t border-slate-200/80">
                  <div className="bg-[#757989] border border-white/20 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-md transition-all hover:bg-[#646877] hover:scale-105">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 font-sans tracking-tight">Nº 5583</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-snug font-sans tracking-wide">{language === "ca" ? "Registre Oficial AICAT" : language === "en" ? "Official AICAT Registry" : "Registro Oficial AICAT"}</p>
                  </div>
                  <div className="bg-[#757989] border border-white/20 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-md transition-all hover:bg-[#646877] hover:scale-105">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 font-sans tracking-tight">+15 {language === "ca" ? "anys" : language === "en" ? "years" : "años"}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-snug font-sans tracking-wide">{language === "ca" ? "Experiència Local" : language === "en" ? "Local Experience" : "Experiencia Local"}</p>
                  </div>
                  <div className="bg-[#757989] border border-white/20 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-md transition-all hover:bg-[#646877] hover:scale-105">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 font-sans tracking-tight">100%</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-snug font-sans tracking-wide">{language === "ca" ? "Col·legiats API / ADM" : language === "en" ? "Registered API / ADM" : "Colegiados API / ADM"}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Image (Left in desktop) - Borde negro nítido */}
            <div className="w-full lg:w-1/2 h-[280px] sm:h-[320px] md:h-[420px] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#0f172a]">
              <Reveal delay={0.2} className="w-full h-full">
                <img 
                  src={gesgramaOffice} 
                  alt="Oficina principal Gesgrama" 
                  className="absolute inset-0 w-full h-full object-cover object-center" 
                />
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── ÚLTIMAS NOTICIAS (BLOG) - LETRAS MÁS GRANDES Y LEGIBLES ── */}
      <section id="blog" className="pt-6 pb-14 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 bg-[#e2e8f0] text-onyx">
        <div className="max-w-[1300px] mx-auto">
          <Reveal>
            <div className="mb-6 sm:mb-8 text-center">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-4 py-1.5 rounded-2xl shadow-md mb-3">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>{t.noticias.tag}</span>
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] mb-2 font-sans tracking-tight">
                {t.noticias.title1} <span className="text-[#2563eb]">{t.noticias.title2}</span>
              </h2>
              
              <p className="text-[#0f172a] text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-extrabold leading-relaxed font-sans mt-2">
                {t.noticias.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                          className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#2563eb] hover:text-[#1d4ed8] group-hover:gap-3 transition-all font-sans cursor-pointer"
                        >
                          <span>{t.noticias.seguirLeyendo}</span>
                          <ArrowRight className="w-4.5 h-4.5 text-[#2563eb]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-8 sm:mt-12 mb-2 sm:mb-4">
              <Link
                to="/noticias"
                className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-9 py-4.5 rounded-full text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 cursor-pointer font-sans"
              >
                <span>{t.noticias.verTodasBtn}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ (COMPACT LAYOUT WITH BIGGER LEGIBLE TEXT) ── */}
      <section 
        id="faq" 
        className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-8"
      >
        <div className="bg-[#0b172a] rounded-[28px] md:rounded-[36px] shadow-2xl border border-white/10 p-5 sm:p-7 md:p-10 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white flex flex-col items-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center w-full">
            <Reveal>
              <div className="text-center mb-8 flex flex-col items-center">
                {/* White Badge with Icon next to Text */}
                <span className="inline-flex items-center gap-2.5 bg-white text-[#0f172a] text-xs sm:text-sm font-black tracking-widest uppercase px-5 py-2.5 rounded-2xl shadow-md border border-slate-200 mb-5 font-sans">
                  <HelpCircle className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                  <span>{t.faq.tag}</span>
                </span>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white tracking-tight font-sans mb-3">
                  <span className="bg-[#2563eb] text-white px-3.5 py-1 rounded-2xl inline-block shadow-md">
                    {t.faq.title1}
                  </span>{" "}
                  {t.faq.title2}
                </h2>

                <p className="text-white text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-extrabold leading-relaxed font-sans mt-3">
                  {t.faq.subtitle}
                </p>
              </div>
            </Reveal>

            {/* Accordion Cards - Compact Gap with Larger Legible Text */}
            <div className="w-full flex flex-col gap-3.5 mb-8">
              {t.faq.items.map((item, i) => {
                const isActive = activeFaq === i;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div 
                      onClick={() => setActiveFaq(isActive ? null : i)}
                      className="cursor-pointer bg-[#e2e8f0] border border-slate-300/80 rounded-2xl p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-slate-400 group"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="font-black text-[#0f172a] text-lg sm:text-xl md:text-2xl pr-2 font-sans leading-snug">{item.q}</h3>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm ${isActive ? 'bg-[#1d4ed8] text-white rotate-45' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'}`}>
                          <span className="text-2xl font-black leading-none">+</span>
                        </div>
                      </div>
                      {isActive && (
                        <div className="overflow-hidden transition-all duration-300">
                          <p className="pt-4 text-[#0f172a] leading-relaxed font-bold text-base sm:text-lg md:text-xl border-t-2 border-slate-300/80 mt-4 font-sans">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Bottom Eye-Catching Blue CTA Button */}
            <div className="text-center">
              <a 
                href="#contacto" 
                className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer font-sans"
              >
                <span>{t.faq.askDoubt}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT (EXACT MATCH REFERENCE IMAGE) ── */}
      <section id="contacto" className="py-6 md:py-14 px-4 md:px-8 bg-[#e2e8f0] text-onyx">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/80 p-6 sm:p-10 md:p-14 mx-auto max-w-[1300px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Title & Image Overlay Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-2xl shadow-md mb-6 w-fit">
                  {t.contacto.badge}
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] leading-[1.08] tracking-tight mb-4 font-sans">
                  {t.contacto.title1}<br />
                  <span className="text-[#2563eb] italic font-serif">{t.contacto.title2}</span>
                </h2>
                
                <p className="text-[#0f172a] text-lg sm:text-xl md:text-2xl mb-8 font-extrabold leading-relaxed font-sans">
                  {t.contacto.subtitle}
                </p>

                {/* Storefront Image Card with Central Office Overlay */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 aspect-[16/10] group">
                  <img 
                    src={gesgramaOffice} 
                    alt="Gesgrama oficina principal en Santa Coloma" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Floating Office Badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[300px] z-20">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-[#0f172a] uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</div>
                        <div className="text-sm sm:text-base text-[#0f172a] font-extrabold leading-snug mt-0.5 font-sans">
                          Av. dels Banús, 49
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-extrabold font-sans">
                          08923 Santa Coloma de Gramenet
                        </div>
                        <a href="tel:+34934685656" className="inline-flex items-center gap-1.5 text-[#2563eb] font-black text-sm sm:text-base mt-1.5 font-sans">
                          <Phone className="w-4 h-4 text-[#2563eb]" /> 93 468 56 56
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Contact Form Card */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="bg-white border-2 border-[#757989] p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm">
                  <h3 className="font-black text-2xl sm:text-3xl text-[#0f172a] mb-6 tracking-tight font-sans">{t.contacto.form.formTitle}</h3>
                  
                  <form key={language} className="space-y-4">
                    {/* Row 1: Nombre & Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-2 text-sm sm:text-base font-sans">{t.contacto.form.nombre.toUpperCase()}</label>
                        <input type="text" placeholder={t.contacto.form.nombrePlaceholder} className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-4 py-3.5 text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors font-sans placeholder:text-slate-500" />
                      </div>
                      <div>
                        <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-2 text-sm sm:text-base font-sans">{t.contacto.form.telefono.toUpperCase()}</label>
                        <input type="text" placeholder={t.contacto.form.telefonoPlaceholder} className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-4 py-3.5 text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors font-sans placeholder:text-slate-500" />
                      </div>
                    </div>
                    
                    {/* Row 2: Correo */}
                    <div>
                      <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-2 text-sm sm:text-base font-sans">{t.contacto.form.email.toUpperCase()}</label>
                      <input type="email" placeholder={t.contacto.form.emailPlaceholder} className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-4 py-3.5 text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors font-sans placeholder:text-slate-500" />
                    </div>

                    {/* Row 3: Tipo de Consulta */}
                    <div>
                      <label htmlFor="contacto-asunto-select" className="text-[#0f172a] font-black uppercase tracking-wider block mb-2 text-sm sm:text-base font-sans">{t.contacto.form.asunto.toUpperCase()}</label>
                      <div className="relative">
                        <select id="contacto-asunto-select" aria-label="Seleccionar motivo o tipo de consulta" className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-4 py-3.5 text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors appearance-none pr-9 cursor-pointer truncate font-sans">
                          <option>{t.contacto.form.asuntoOpciones.comunidad}</option>
                          <option>{t.contacto.form.asuntoOpciones.venta}</option>
                          <option>{t.contacto.form.asuntoOpciones.juridico}</option>
                          <option>{t.contacto.form.asuntoOpciones.otro}</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Row 4: Mensaje */}
                    <div>
                      <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-2 text-sm sm:text-base font-sans">{t.contacto.form.mensaje.toUpperCase()}</label>
                      <textarea rows={3} placeholder={t.contacto.form.mensajePlaceholder} className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-4 py-3.5 text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors resize-none font-sans placeholder:text-slate-500" />
                    </div>

                    {/* Checkbox Privacidad */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <input type="checkbox" id="privacy" className="w-4.5 h-4.5 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer" />
                      <label htmlFor="privacy" className="text-sm sm:text-base text-[#0f172a] font-bold cursor-pointer font-sans">{t.contacto.form.privacidad}</label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer font-sans"
                    >
                      <span>{t.contacto.form.botonEnviar}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CLOSING CTA BANNER ('LISTO PARA DAR EL SIGUIENTE PASO') ── */}
      <section id="final-cta" className="py-6 md:py-14 px-4 md:px-8 bg-[#e2e8f0] text-[#0f172a]">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-2xl border border-slate-200/80 p-6 sm:p-10 md:p-12 pb-6 md:pb-10 mx-auto max-w-[1300px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            
            {/* Left Content (Title, Subtitle & Buttons) */}
            <div className="w-full lg:w-7/12 text-left py-0 lg:py-2">
              <Reveal>
                <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded-2xl shadow-md mb-5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t.finalCta.tag}</span>
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-4 leading-tight tracking-tight font-sans">
                  {t.finalCta.title1}{" "}
                  <span className="inline-block bg-[#2563eb] text-white px-4 py-1.5 rounded-2xl shadow-sm">
                    {t.finalCta.title2}
                  </span>
                  ?
                </h2>
                
                <p className="text-[#0f172a] text-lg sm:text-xl md:text-2xl max-w-xl mb-6 font-extrabold leading-relaxed font-sans text-balance">
                  {t.finalCta.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 max-w-xl mb-2 sm:mb-8">
                  <a
                    href="#valuator-form"
                    className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                  >
                    <Home className="w-4.5 h-4.5 text-white shrink-0" />
                    <span className="whitespace-nowrap">{t.finalCta.btnValuate}</span>
                  </a>
                  <a
                    href="#contacto"
                    className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.45)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                  >
                    <Phone className="w-4.5 h-4.5 text-white shrink-0" />
                    <span className="whitespace-nowrap">{t.finalCta.btnContact}</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Side: Cut-out Advisors Image with closed laptop */}
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

      {/* ── FOOTER GSAP ── */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10" style={{ backgroundColor: '#0b1221' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          
          {/* Top Section: 4 Columns + Mascot */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
            {/* Mascot on Mobile (<768px): Centered Above Columns */}
            <div className="w-full md:hidden flex justify-center items-center mb-4">
              <FooterMascot className="w-44 sm:w-52 h-auto object-contain drop-shadow-lg" />
            </div>

            {/* Text Columns (Left Block) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-4">
              {/* Logo + tagline */}
              <div className="lg:col-span-1">
                <div className="inline-block mb-4">
                  <img src="/images/logo-gesgrama-text-horizontal.webp" alt="Gesgrama - Inmobiliaria y Administración de Fincas" width={212} height={52} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[260px]">
                  {t.footer.descripcion}
                </p>
              </div>

              {/* Navegación rápida */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.quickLinks}</h3>
                <ul className="space-y-3.5">
                  {[
                    { label: t.nav.propiedades, href: "#propiedades" },
                    { label: t.nav.servicios, href: "#servicios" },
                    { label: t.nav.nosotros, href: "#nosotros" },
                    { label: t.nav.contacto, href: "#contacto" },
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

              {/* Contacto */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.contactInfo}</h3>
                <ul className="space-y-4 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                    <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                  </li>
                  <li>
                    <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      {language === "en" ? "Office:" : "Oficina:"} 93 468 56 56
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 font-bold transition-colors whitespace-nowrap">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-400 shrink-0">
                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                      </svg>
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

              {/* Legal */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.legal}</h3>
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

            {/* Right Block: Mascot Illustration (Desktop / Tablet >= 768px) - Sweet spot scale */}
            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Bottom Horizontal Block: Acreditaciones Profesionales (Fila Horizontal 4 Columnas Oficiales) */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              {language === "ca" ? "ACREDITACIONS PROFESSIONALS" : language === "en" ? "PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES"}
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. {t.footer.rights}</p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">{language === "ca" ? "Avís Legal" : language === "en" ? "Legal Notice" : "Aviso Legal"}</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">{language === "ca" ? "Privacitat" : language === "en" ? "Privacy" : "Privacidad"}</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <WhatsAppButton language={language} />
      <CookieBanner language={language} />

      {/* Service Detail Modal (Point 3 Fix) */}
      {selectedServiceIndex !== null && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto my-auto text-[#0f172a] animate-in fade-in zoom-in-95 duration-200"
          >
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
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
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

