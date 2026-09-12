import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties, formatLocation } from "../data/properties";
import { homeArticles as articles } from "../data/homeArticles";
import { subscribeProperties, fetchProperties, getLocalProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";

import { useEffect, useRef, useState, Fragment } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, Building2, Phone, Mail, MessageCircle, HelpCircle, Menu, X, ChevronRight, Calendar, ChevronDown, ArrowRight, Send, Check, Heart, Star, Home, Clock, Ruler, Scale, Shield, TrendingUp, Paintbrush, Bath, Maximize2, Loader2, CheckCircle2, Key, Quote, Info } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";
import handKeysImg from "@/assets/hand_keys_blue.webp";
import gallery1 from "@/assets/gallery-1.webp";

import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import { FooterMascot } from '@/components/FooterMascot';
import { Navbar } from '@/components/Navbar';
import { AccreditationBadges } from '@/components/AccreditationBadges';
import MarqueeRibbon from '@/components/MarqueeRibbon';
import heroBgMobile from "@/assets/family_barcelona_opt_mobile.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", href: "/images/logo-gesgrama-text-horizontal.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: heroBgMobile, as: "image", type: "image/webp", media: "(max-width: 640px)" },
      { rel: "preconnect", href: "https://maps.googleapis.com" },
      { rel: "preconnect", href: "https://maps.gstatic.com" },
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
            "url": "https://www.gesgrama.es",
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
      }
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
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
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
  const shouldReduceMotion = useReducedMotion();

  // Contact form UX state
  const [contactForm, setContactForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    asunto: "Gestión de Comunidades",
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
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // Valuator real calculation state & market stats
  const ZONE_MARKET_STATS: Record<string, { pricePerM2: number; trendPct: number; monthlyPrices: number[] }> = {
    "Centre": { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] },
    "Centro": { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] },
    "Santa Rosa - Can Mariner": { pricePerM2: 1910, trendPct: 5.1, monthlyPrices: [1815, 1835, 1855, 1875, 1890, 1910] },
    "Singuerlín": { pricePerM2: 1720, trendPct: 3.4, monthlyPrices: [1660, 1675, 1685, 1700, 1710, 1720] },
    "Fondo": { pricePerM2: 1680, trendPct: 5.8, monthlyPrices: [1585, 1605, 1625, 1645, 1660, 1680] },
    "El Raval": { pricePerM2: 1790, trendPct: 4.2, monthlyPrices: [1715, 1730, 1745, 1760, 1775, 1790] },
    "Riera Alta - Llatí": { pricePerM2: 1850, trendPct: 3.9, monthlyPrices: [1780, 1795, 1810, 1825, 1835, 1850] },
    "Riu": { pricePerM2: 1950, trendPct: 4.5, monthlyPrices: [1865, 1880, 1900, 1915, 1935, 1950] },
    "Riu Nord / Riu Sud": { pricePerM2: 1950, trendPct: 4.5, monthlyPrices: [1865, 1880, 1900, 1915, 1935, 1950] },
    "Oliveres - Can Serra": { pricePerM2: 1720, trendPct: 3.2, monthlyPrices: [1665, 1680, 1690, 1700, 1710, 1720] }
  };

  const ZONE_PRICE_PER_M2: Record<string, number> = Object.fromEntries(
    Object.entries(ZONE_MARKET_STATS).map(([k, v]) => [k, v.pricePerM2])
  );

  const ZONE_TO_SLUG: Record<string, string> = {
    "Centre": "centre",
    "Centro": "centre",
    "Santa Rosa - Can Mariner": "santa-rosa",
    "Singuerlín": "singuerlin",
    "Fondo": "fondo",
    "El Raval": "el-raval",
    "Riera Alta - Llatí": "riera-alta",
    "Riu": "riu-nord",
    "Riu Nord / Riu Sud": "riu-nord",
    "Oliveres - Can Serra": "oliveres"
  };

  const getSparklineData = (prices: number[], width = 250, height = 80, paddingY = 16, paddingX = 15) => {
    if (!prices || prices.length < 2) {
      return {
        linePath: "M 15,62 Q 40,58 62,55 T 109,44 T 156,35 T 203,24 T 250,14",
        areaPath: "M 15,62 Q 40,58 62,55 T 109,44 T 156,35 T 203,24 T 250,14 L 250,80 L 15,80 Z",
        points: [
          { cx: 15, cy: 62 }, { cx: 62, cy: 55 }, { cx: 109, cy: 44 },
          { cx: 156, cy: 35 }, { cx: 203, cy: 24 }, { cx: 250, cy: 14 }
        ]
      };
    }
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const innerHeight = height - paddingY * 2;
    const innerWidth = width - paddingX * 2;
    const stepX = innerWidth / (prices.length - 1);

    const points = prices.map((val, idx) => {
      const cx = Math.round(paddingX + idx * stepX);
      const cy = Math.round(height - paddingY - ((val - min) / range) * innerHeight);
      return { cx, cy };
    });

    let linePath = `M ${points[0].cx},${points[0].cy}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.cx + curr.cx) / 2;
      linePath += ` Q ${midX},${prev.cy} ${curr.cx},${curr.cy}`;
    }

    const last = points[points.length - 1];
    const first = points[0];
    const areaPath = `${linePath} L ${last.cx},${height} L ${first.cx},${height} Z`;

    return { linePath, areaPath, points };
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
    trendPct: number;
    monthlyPrices: number[];
    propertyM2: number;
    propertyPricePerM2: number;
    neighborhoodPricePerM2: number;
  }>(() => {
    const defaultStats = ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    const m2 = 85;
    // Calibrated market valuation factor based on surface size (smaller units command higher €/m², larger units lower €/m²)
    const sizeFactor = m2 < 65 ? 1.06 : m2 <= 90 ? 1.03 : m2 <= 120 ? 0.98 : 0.94;
    const propPricePerM2 = Math.round(defaultStats.pricePerM2 * sizeFactor);
    const exact = Math.round(m2 * propPricePerM2);
    return {
      estimatedValue: exact,
      rangeMin: Math.round(exact * 0.93),
      rangeMax: Math.round(exact * 1.07),
      zoneName: "Centre",
      trendPct: defaultStats.trendPct,
      monthlyPrices: defaultStats.monthlyPrices,
      propertyM2: m2,
      propertyPricePerM2: propPricePerM2,
      neighborhoodPricePerM2: defaultStats.pricePerM2
    };
  });

  const handleCalculateValuation = () => {
    setIsCalculatingValuation(true);
    const m2 = Math.max(20, Math.min(600, parseFloat(valuatorData.metros.replace(/[^\d]/g, "")) || 85));
    const stats = ZONE_MARKET_STATS[valuatorData.zona] || ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    
    // Calibrated property valuation per m² accounting for unit scale efficiency
    const sizeFactor = m2 < 65 ? 1.06 : m2 <= 90 ? 1.03 : m2 <= 120 ? 0.98 : 0.94;
    const propPricePerM2 = Math.round(stats.pricePerM2 * sizeFactor);
    const exactValue = Math.round(m2 * propPricePerM2);
    const minVal = Math.round(exactValue * 0.93);
    const maxVal = Math.round(exactValue * 1.07);

    setTimeout(() => {
      setCalculatedResult({
        estimatedValue: exactValue,
        rangeMin: minVal,
        rangeMax: maxVal,
        zoneName: valuatorData.zona || "Centre",
        trendPct: stats.trendPct,
        monthlyPrices: stats.monthlyPrices,
        propertyM2: m2,
        propertyPricePerM2: propPricePerM2,
        neighborhoodPricePerM2: stats.pricePerM2
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
      if (val === 'Apartamento') return language === 'ca' ? 'Apartament' : language === 'en' ? 'Apartment' : 'Apartamento';
      if (val === 'Ático') return language === 'ca' ? 'Àtic' : language === 'en' ? 'Penthouse' : 'Ático';
      if (val === 'Chalet' || val === 'Chalet / Villa') return language === 'ca' ? 'Xalet / Vil·la' : language === 'en' ? 'Villa / House' : 'Chalet / Villa';
      if (val === 'Local' || val === 'Local Comercial' || val === 'Local comercial') return language === 'ca' ? 'Local comercial' : language === 'en' ? 'Commercial premises' : 'Local Comercial';
      if (val === 'Oficina') return language === 'ca' ? 'Oficina' : language === 'en' ? 'Office' : 'Oficina';
      if (val === 'Aparcamiento') return language === 'ca' ? 'Aparcament' : language === 'en' ? 'Parking space' : 'Aparcamiento';
    }
    if (category === 'zona') {
      if (val === 'Cualquier zona') return t.properties.allZones;
      return formatLocation(val, language);
    }
    if (category === 'habitaciones') {
      if (val === 'Cualquier número') return (t.properties as any).anyBedrooms || t.properties.anyHab || "Cualquier número";
      if (val.includes('+')) return `${val.replace('+', '')}+ ${t.properties.bedrooms.toLowerCase()}`;
    }
    if (category === 'precio') {
      if (val === 'Cualquier precio') return t.properties.anyPrice;
      if (val.startsWith('Hasta ')) {
        const amount = val.replace('Hasta ', '');
        const prefix = language === 'ca' ? 'Fins a ' : language === 'en' ? 'Up to ' : 'Hasta ';
        return `${prefix}${amount}`;
      }
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

  const [liveProperties, setLiveProperties] = useState<ExtendedProperty[]>(() => getLocalProperties());

  useEffect(() => {
    const unsub = subscribeProperties((list) => {
      setLiveProperties(list);
    });

    const refresh = () => {
      fetchProperties().then((data) => {
        if (data) setLiveProperties(data);
      });
    };

    refresh();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", refresh);
      window.addEventListener("focus", refresh);
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

  // Filter and sort properties
  const filteredProperties = liveProperties
    .filter(p => {
      if (searchParams.mode === "favoritos") {
        return favorites.includes(p.id);
      }
      const pOp = p.operation || "comprar";
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

  let displayProperties = filteredProperties.slice(0, visibleCount);
  let isFallback = false;

  if (filteredProperties.length === 0 && searchParams.mode !== "favoritos") {
    isFallback = true;
    let similarProperties = liveProperties
      .filter(p => searchParams.zona === 'Cualquier zona' ? true : (p.location && p.location.includes(searchParams.zona)))
      .filter(p => (p.operation || "comprar") === searchParams.mode);

    if (similarProperties.length === 0) {
      similarProperties = liveProperties
        .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
        .filter(p => (p.operation || "comprar") === searchParams.mode);
    }

    if (similarProperties.length === 0) {
      similarProperties = liveProperties.filter(p => (p.operation || "comprar") === searchParams.mode);
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
            }
          })
        }}
      />
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ── MAIN LANDMARK ── */}
      <main id="main-content">
        {/* ── HERO CON CINTA DE MOVIMIENTO INTEGRADA ── */}
        <HeroCarousel onPerformSearch={handleHeroSearch} language={language} />

      {/* ── PROPERTIES GRID (REFERENCE IMAGE 1 STYLE) ── */}
      <section id="propiedades" className="relative overflow-hidden bg-[#cbd5e1] text-onyx py-8 md:py-12 border-t-2 border-slate-400 scroll-mt-28 md:scroll-mt-32">
        <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-xl border-2 border-slate-300 p-4 sm:p-6 md:p-8 mx-4 md:mx-auto max-w-[1240px] relative z-10">
          <Reveal>
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-2.5 font-sans">
                <Home className="w-3.5 h-3.5 text-white" />
                <span>{t.properties.tag}</span>
              </span>
              
              <h2 key={language} className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2 font-sans w-full">
                {t.properties.title1} <span className="text-[#2563eb] whitespace-nowrap inline-block">{t.properties.title2}</span>
              </h2>
              
              <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-bold font-sans max-w-3xl text-balance">
                {t.properties.subtitle}
              </p>
            </div>

            {/* Dedicated full-width row for Mode Selector + Stat Badge right above Search Console */}
            <div className="mt-6 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
              {/* Search Mode Selector Tabs - Responsive 3-column equal grid on mobile to fit all screen sizes */}
              <div className="grid grid-cols-3 sm:flex sm:items-center bg-slate-200/90 p-1.5 sm:p-2 rounded-2xl border-2 border-slate-300 shadow-sm w-full sm:w-auto gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "comprar" }))}
                  className={`px-2 sm:px-5 py-2.5 rounded-xl text-[11px] xs:text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer font-sans text-center shadow-xs ${
                    searchParams.mode === "comprar" 
                      ? "bg-[#2563eb] text-white shadow-md ring-2 ring-[#2563eb]/20" 
                      : "bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 hover:text-slate-950"
                  }`}
                >
                  {t.hero.comprar}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "alquilar" }))}
                  className={`px-2 sm:px-5 py-2.5 rounded-xl text-[11px] xs:text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer font-sans text-center shadow-xs ${
                    searchParams.mode === "alquilar" 
                      ? "bg-[#2563eb] text-white shadow-md ring-2 ring-[#2563eb]/20" 
                      : "bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 hover:text-slate-950"
                  }`}
                >
                  {t.hero.alquilar}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams(prev => ({ ...prev, mode: "favoritos" }))}
                  className={`px-1.5 xs:px-2 sm:px-5 py-2.5 rounded-xl text-[10px] xs:text-[11px] sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 font-sans whitespace-nowrap shadow-xs ${
                    searchParams.mode === "favoritos" 
                      ? "bg-red-600 text-white shadow-md ring-2 ring-red-500/20" 
                      : "bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 hover:text-slate-950"
                  }`}
                >
                  <Heart className={`w-3 h-3 sm:w-4 sm:h-4 fill-current shrink-0 ${searchParams.mode === "favoritos" ? "text-white" : "text-red-500"}`} />
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
            <div className="bg-white border-2 border-slate-900 rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-4 xl:p-3 flex flex-col xl:flex-row items-stretch xl:items-center gap-3 xl:gap-4 relative z-40">
              
              {/* Field 1: Tipo de Inmueble */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-xs flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.propertyType}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("tipo", consoleFilters.tipo)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-900 stroke-[2.5] group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-2.5 divide-y divide-slate-100 backdrop-blur-md">
                    {[
                      { value: "Cualquier tipo" },
                      { value: "Piso" },
                      { value: "Apartamento" },
                      { value: "Ático" },
                      { value: "Chalet" },
                      { value: "Local" },
                      { value: "Oficina" },
                      { value: "Aparcamiento" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesTipo = opt.value === "Cualquier tipo" ? true : p.type === opt.value;
                        return matchesMode && matchesTipo;
                      }).length;

                      const isActive = consoleFilters.tipo === opt.value;
                      const label = getTranslatedFilterLabel("tipo", opt.value);

                      return (
                        <div key={opt.value} className="py-1 first:pt-0 last:pb-0">
                          <button
                            onClick={() => {
                              setConsoleFilters(prev => ({ ...prev, tipo: opt.value }));
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                              isActive ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-800 hover:bg-blue-50/40"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isActive ? (
                                <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                              ) : (
                                <span className="w-4 h-4 shrink-0" />
                              )}
                              <span className="font-medium text-[13.5px] leading-snug">{label}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-xs transition-colors ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/80"
                            }`}>
                              {count}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 2: Zona */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-xs flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.zone}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("zona", consoleFilters.zona)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-900 stroke-[2.5] group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-2.5 divide-y divide-slate-100 backdrop-blur-md">
                    {[
                      { value: "Cualquier zona" },
                      ...[...new Set(properties.map(p => p.location))].map(loc => ({ value: loc }))
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesZona = opt.value === "Cualquier zona" ? true : p.location === opt.value;
                        return matchesMode && matchesZona;
                      }).length;

                      const isActive = consoleFilters.zona === opt.value;
                      const label = getTranslatedFilterLabel("zona", opt.value);

                      return (
                        <div key={opt.value} className="py-1 first:pt-0 last:pb-0">
                          <button
                            onClick={() => {
                              setConsoleFilters(prev => ({ ...prev, zona: opt.value }));
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                              isActive ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-800 hover:bg-blue-50/40"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isActive ? (
                                <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                              ) : (
                                <span className="w-4 h-4 shrink-0" />
                              )}
                              <span className="font-medium text-[13.5px] leading-snug">{label}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-xs transition-colors ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/80"
                            }`}>
                              {count}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 3: Habitaciones */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "habitaciones" ? null : "habitaciones")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-xs flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.bedrooms}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("habitaciones", consoleFilters.habitaciones)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-900 stroke-[2.5] group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "habitaciones" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-2.5 divide-y divide-slate-100 backdrop-blur-md">
                    {[
                      { value: "Cualquier número" },
                      { value: "1+" },
                      { value: "2+" },
                      { value: "3+" },
                      { value: "4+" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        if (opt.value === "Cualquier número") return true;
                        const min = parseInt(opt.value.replace("+", ""), 10);
                        return p.bedrooms >= min;
                      }).length;

                      const isActive = consoleFilters.habitaciones === opt.value;
                      const label = getTranslatedFilterLabel("habitaciones", opt.value);

                      return (
                        <div key={opt.value} className="py-1 first:pt-0 last:pb-0">
                          <button
                            onClick={() => {
                              setConsoleFilters(prev => ({ ...prev, habitaciones: opt.value }));
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                              isActive ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-800 hover:bg-blue-50/40"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isActive ? (
                                <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                              ) : (
                                <span className="w-4 h-4 shrink-0" />
                              )}
                              <span className="font-medium text-[13.5px] leading-snug">{label}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-xs transition-colors ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/80"
                            }`}>
                              {count}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 4: Precio Máximo */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "precio" ? null : "precio")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-blue-50/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-xs flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-black">€</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.maxPrice}</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f172a] leading-none font-sans">{getTranslatedFilterLabel("precio", consoleFilters.precio)}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-900 stroke-[2.5] group-hover:text-[#2563eb] transition-colors ml-4 shrink-0" />
                </button>

                {openDropdown === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-2.5 divide-y divide-slate-100 backdrop-blur-md">
                    {(searchParams.mode === "alquilar" 
                      ? ["Cualquier precio", "Hasta 1.000 €", "Hasta 1.500 €", "Hasta 2.000 €"]
                      : ["Cualquier precio", "Hasta 500.000 €", "Hasta 1.000.000 €", "Hasta 2.000.000 €"]
                    ).map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        return isPriceValid(opt, p.price);
                      }).length;

                      const isActive = consoleFilters.precio === opt;
                      const label = getTranslatedFilterLabel("precio", opt);

                      return (
                        <div key={opt} className="py-1 first:pt-0 last:pb-0">
                          <button
                            onClick={() => {
                              setConsoleFilters(prev => ({ ...prev, precio: opt }));
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                              isActive ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-800 hover:bg-blue-50/40"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isActive ? (
                                <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                              ) : (
                                <span className="w-4 h-4 shrink-0" />
                              )}
                              <span className="font-medium text-[13.5px] leading-snug">{label}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center shadow-xs transition-colors ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/80"
                            }`}>
                              {count}
                            </span>
                          </button>
                        </div>
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

            {/* RESULTS COUNT & SORTING (INSIDE CARD BUBBLE) */}
            {(() => {
              const renderPropertyCard = (property: any, idx: number) => {
                const isFav = favorites.includes(property.id);
                const pData = getTranslatedProperty(property, language, t.propertiesData);
                const isRent = (property.operation || "").toLowerCase() === "alquilar" || property.price < 5000;
                const type = pData.type || property.type || "Piso";

                return (
                  <motion.div
                    key={property.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: (idx % 6) * 0.09, ease: easeOut }}
                    className="h-full"
                  >
                    <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} className="block h-full">
                      <motion.div
                        whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="group bg-white rounded-[26px] sm:rounded-[28px] flex flex-col h-full border-2 border-slate-900/80 hover:border-[#2563eb] shadow-[0_6px_24px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)] transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        {/* Image Block with Top Floating Badges & Glassmorphism Heart */}
                        <div className="relative h-[200px] sm:h-[225px] md:h-[235px] w-full overflow-hidden bg-slate-100">
                          <img 
                            src={property.image} 
                            alt={pData.name} 
                            loading="lazy" 
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                          
                          {/* Floating Status & Type Pills */}
                          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-20">
                            <span className="inline-flex items-center gap-1.5 bg-[#0b214a]/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md border border-white/10 font-sans">
                              <span className={`w-1.5 h-1.5 rounded-full ${isRent ? 'bg-amber-400' : 'bg-[#60a5fa]'} animate-pulse shrink-0`}></span>
                              <span>{isRent ? (language === "ca" ? "Lloguer" : language === "en" ? "Rent" : "Alquiler") : (language === "ca" ? "Venda" : language === "en" ? "Sale" : "Venta")}</span>
                            </span>
                            <span className="inline-flex items-center bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-xl shadow-md font-sans">
                              {type}
                            </span>
                          </div>

                          {/* Heart Favorite Button with micro-bounce */}
                          <motion.button
                            type="button"
                            whileTap={{ scale: 1.25 }}
                            transition={{ type: "spring", stiffness: 450, damping: 17 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(property.id);
                            }}
                            aria-label="Guardar en favoritos"
                            className={`absolute top-3.5 right-3.5 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-md z-20 ${
                              isFav 
                                ? 'bg-red-500 text-white shadow-red-500/30' 
                                : 'bg-white text-slate-700 hover:text-red-500 hover:bg-slate-50'
                            }`}
                          >
                            <Heart className="w-5 h-5 fill-current" />
                          </motion.button>

                          {/* Bottom-left Ref Badge directly over the image */}
                          <div className="absolute bottom-3 left-3.5 z-20">
                            <span className="inline-flex items-center text-[11px] font-mono font-black text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/15">
                              Ref: {property.ref || "PJ2024"}
                            </span>
                          </div>
                        </div>

                        {/* Content Block */}
                        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                          <div>
                            {/* Location with Pin - Solid White Pill (No Transparency) */}
                            <div className="mb-2.5">
                              <span className="inline-flex items-center gap-1.5 bg-white text-[#0b214a] border border-slate-300 px-3 py-1 rounded-full text-xs sm:text-[13px] font-extrabold tracking-tight shadow-2xs">
                                <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0 stroke-[2.5]" />
                                <span className="truncate">{formatLocation(pData.location || property.location, language)}</span>
                              </span>
                            </div>

                            {/* Main Title */}
                            <h3 className="text-lg sm:text-[19px] font-black text-[#0f172a] mb-3 leading-snug group-hover:text-[#2563eb] transition-colors font-sans line-clamp-1">
                              {pData.name}
                            </h3>

                            {/* Features Micro-Boxes */}
                            <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
                              <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                                <Home className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                                <span>{property.bedrooms > 0 ? property.bedrooms : "2"} {language === "en" ? "bd" : "hab"}</span>
                              </div>
                              <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                                <Bath className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                                <span>{property.bathrooms > 0 ? property.bathrooms : "1"} {language === "en" ? "ba" : language === "ca" ? "banys" : "baños"}</span>
                              </div>
                              <div className="bg-[#2563eb] text-white rounded-xl py-2 px-1 flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm shadow-xs">
                                <Maximize2 className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                                <span>{property.surface} m²</span>
                              </div>
                            </div>

                            {/* Floor / Feature Highlight badge - Only shown if it provides non-redundant, relevant information */}
                            {(() => {
                              const isRedundant = (text: string) => {
                                if (!text) return true;
                                const lower = text.toLowerCase();
                                return (
                                  lower.includes("dormitori") ||
                                  lower.includes("habitación") ||
                                  lower.includes("habitacion") ||
                                  lower.includes("bedroom") ||
                                  lower.includes("bany") ||
                                  lower.includes("baño") ||
                                  lower.includes("bathroom") ||
                                  lower.includes("verificat") ||
                                  lower.includes("verified") ||
                                  lower.includes("verificado")
                                );
                              };

                              let relevantFeature = "";
                              if (pData.floor && !isRedundant(pData.floor)) {
                                relevantFeature = pData.floor;
                              } else if (pData.features && pData.features.length > 0) {
                                const found = pData.features.find((f: string) => !isRedundant(f));
                                if (found) relevantFeature = found;
                              }

                              if (!relevantFeature) return null;

                              return (
                                <div className="mt-3">
                                  <div className="inline-flex items-center gap-2.5 bg-white text-slate-900 border-2 border-slate-200 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs max-w-full">
                                    <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
                                    <span className="truncate">{relevantFeature}</span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Price & Action Button */}
                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                            <div className="flex flex-col min-w-0">
                              {/* Blue Pill Badge for "PRECIO" / "PREU" - Identical to detail page */}
                              <span className="inline-flex items-center self-start bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs mb-1.5 font-sans">
                                {t.properties.priceLabel || (isRent ? (language === "ca" ? "LLOGUER" : language === "en" ? "RENT" : "ALQUILER") : (language === "ca" ? "PREU VENDA" : language === "en" ? "SALE PRICE" : "PRECIO"))}
                              </span>
                              <div className="flex items-baseline whitespace-nowrap">
                                <span className="text-xl sm:text-2xl font-black text-[#0f172a] leading-none font-sans tracking-tight">
                                  {new Intl.NumberFormat('es-ES').format(property.price)}<span className="text-[#2563eb] ml-0.5 font-black">€</span>
                                </span>
                                {isRent && (
                                  <span className="text-[11px] font-black text-slate-500 font-sans ml-1">/mes</span>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 inline-flex items-center gap-1.5 bg-[#0b214a] group-hover:bg-[#2563eb] text-white text-[11.5px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-md border border-slate-800 group-hover:border-[#2563eb]">
                              <span className="whitespace-nowrap">{t.properties.verDetalles || "Ver ficha"}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              };

              return (
                <div id="properties-results" className="mt-6 scroll-mt-32">
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
                      <span className="text-slate-600 font-black uppercase tracking-wider text-xs font-sans">{t.properties.sortBy}:</span>
                      <button 
                        onClick={() => setOpenDropdown(openDropdown === "ordenar" ? null : "ordenar")}
                        className="flex items-center gap-2 bg-white border-2 border-slate-300 hover:border-[#2563eb] rounded-xl px-4 py-2 font-black text-[#0f172a] hover:text-[#2563eb] transition-all shadow-xs font-sans text-xs sm:text-sm cursor-pointer"
                      >
                        {sortOption === "precio_asc" ? t.properties.precioMenor : sortOption === "precio_desc" ? t.properties.precioMayor : t.properties.mostRecent} 
                        <ChevronDown className="w-4 h-4 text-slate-700 shrink-0" />
                      </button>

                      {openDropdown === "ordenar" && (
                        <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-2.5 divide-y divide-slate-100 backdrop-blur-md">
                          {[
                            { label: t.properties.mostRecent, value: "recientes" },
                            { label: t.properties.precioMenor, value: "precio_asc" },
                            { label: t.properties.precioMayor, value: "precio_desc" }
                          ].map(opt => (
                            <div key={opt.value} className="py-1 first:pt-0 last:pb-0">
                              <button
                                onClick={() => {
                                  setSortOption(opt.value);
                                  setOpenDropdown(null);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                                  sortOption === opt.value ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-slate-100 hover:border-blue-200 text-slate-800 hover:bg-blue-50/40"
                                }`}
                              >
                                <span className="font-medium text-[13.5px] leading-snug">{opt.label}</span>
                                {sortOption === opt.value && <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />}
                              </button>
                            </div>
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

                  {/* PROPERTY CARDS GRID WITH CROSSFADE ON FILTER CHANGE */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={searchParams.mode}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
                    >
                      {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                    </motion.div>
                  </AnimatePresence>

                  {/* LOAD MORE BUTTON (INSIDE CARD BUBBLE) */}
                  <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100 gap-3">
                    {visibleCount < filteredProperties.length ? (
                      <button 
                        type="button"
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer font-sans select-none"
                      >
                        <span>{t.properties.verMas}</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => {
                            // Reset filters to defaults and show all available properties
                            const defaultFilters = {
                              mode: "comprar",
                              zona: "Cualquier zona",
                              tipo: "Cualquier tipo",
                              precio: "Cualquier precio",
                              habitaciones: "Cualquier número"
                            };
                            setSearchParams(defaultFilters);
                            setConsoleFilters({
                              zona: "Cualquier zona",
                              tipo: "Cualquier tipo",
                              precio: "Cualquier precio",
                              habitaciones: "Cualquier número"
                            });
                            setVisibleCount(Math.max(liveProperties.length, properties.length, 50));
                            
                            // Smooth scroll directly to the property listings grid
                            const el = document.getElementById('properties-results') || document.getElementById('propiedades');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer font-sans select-none"
                        >
                          <span>{t.properties.verTodas}</span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 px-4 py-1.5 rounded-full shadow-2xs">
                          <CheckCircle2 className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                          <p className="text-xs sm:text-sm font-black text-[#0f172a] font-sans tracking-tight">
                            {t.properties.showingAll} <span className="text-[#2563eb]">({filteredProperties.length})</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS / NOSOTROS (DISTINCT CLEAN CONTRAST) ── */}
      <section id="nosotros" className="relative overflow-hidden bg-[#edf2f7] text-onyx py-6 md:py-12 border-t-2 border-slate-300/80 scroll-mt-28 md:scroll-mt-32">
        <div id="testimonios" className="-top-32 relative block invisible" />
        <div className="bg-white rounded-[24px] md:rounded-[30px] shadow-lg border border-slate-200 p-5 sm:p-7 md:p-10 mx-4 md:mx-auto max-w-[1240px] relative z-10 overflow-hidden text-[#0f172a]">
          {/* Subtle Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0" />
          <div className="relative z-10">
            {/* Header */}
            <Reveal>
              <div className="mb-6 md:mb-8 text-center">
                <span className="inline-flex items-center gap-2 bg-[#0b214a] text-white text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-white/10 mb-2.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-[#0f172a] tracking-tight mb-5 md:mb-6 font-sans">
                  {t.testimonios.title1}{" "}
                  <span className="relative inline-block text-[#2563eb] pb-1.5">
                    {t.testimonios.title2}
                    <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#2563eb]" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                      <path d="M0,7 Q25,0 50,7 T100,7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                {/* Google Verified Reviews Subtitle Badge with spacious margin */}
                <div className="flex items-center justify-center pt-2 sm:pt-3">
                  <div className="inline-flex items-center gap-2.5 bg-white border-2 border-slate-200 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-sm hover:border-[#2563eb]/40 transition-colors">
                    <GoogleIcon className="w-6 h-6 shrink-0" />
                    <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                      {language === 'ca' ? 'Ressenyes verificades a Google' : language === 'en' ? 'Verified Google Reviews' : 'Reseñas verificadas en Google'}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 3 Real Google Reviews Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {t.testimonios.items.map((item, i) => {
                const cardMeta = [
                  {
                    category: language === 'ca' ? "Compra d'habitatge" : language === 'en' ? "Home purchase" : "Compra de vivienda",
                    Icon: Home,
                  },
                  {
                    category: language === 'ca' ? "Gestió de lloguer" : language === 'en' ? "Rental management" : "Gestión de alquiler",
                    Icon: Key,
                  },
                  {
                    category: language === 'ca' ? "Comunitat de veïns" : language === 'en' ? "HOA & Building" : "Comunidad de propietarios",
                    Icon: Building2,
                  }
                ];
                const meta = cardMeta[i % cardMeta.length];
                const initials = ["F", "A", "C"];

                return (
                  <Reveal key={item.author} delay={i * 0.1}>
                    <div className="group bg-white text-[#0f172a] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full border-2 border-slate-100 hover:border-[#2563eb] shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_28px_-8px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      
                      {/* Top Accent Solid Bar */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#2563eb]" />

                      <div className="relative z-10 flex-1 flex flex-col">
                        {/* Top Row: 5 Stars Left Aligned & Google Badge Right Aligned */}
                        <div className="flex items-center justify-between gap-2 mb-4 h-7">
                          {/* 5 Stars Rating Perfectly Aligned */}
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, s) => (
                              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                            ))}
                          </div>

                          {/* Google Badge */}
                          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-slate-200 px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-2xs shrink-0">
                            <GoogleIcon className="w-4 h-4 shrink-0" />
                            <span>Google</span>
                          </div>
                        </div>

                        {/* Quote Text */}
                        <p className="text-slate-700 text-[14px] sm:text-[14.5px] leading-relaxed font-normal mb-5 flex-1">
                          “{item.quote}”
                        </p>
                      </div>

                      {/* Author Row */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#0b214a] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-1 ring-slate-200 relative">
                            {initials[i % initials.length]}
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2563eb] rounded-full border-2 border-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <strong className="font-bold text-sm sm:text-base text-[#0f172a] tracking-tight leading-tight">
                              {item.author}
                            </strong>
                            <span className="text-xs sm:text-[13px] text-slate-600 font-semibold mt-0.5">
                              {item.time}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold text-white bg-[#2563eb] px-3 py-1.5 rounded-full shadow-xs shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" />
                          <span>{language === 'ca' ? 'Verificat' : language === 'en' ? 'Verified' : 'Verificado'}</span>
                        </span>
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
      <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-7 scroll-mt-28 md:scroll-mt-32">
        <div className="bg-[#0f172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-sky-500/20 p-4 sm:p-6 md:p-7 mx-4 md:mx-auto max-w-[1150px] relative z-10 overflow-hidden text-white">
          <div className="text-center mb-4 sm:mb-6">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-xl mb-2 shadow-xs border border-slate-200 font-sans">
                <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>{t.servicios.tag}</span>
              </span>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-1.5 tracking-tight font-sans">
                {t.servicios.title1} <span className="text-[#38bdf8]">{t.servicios.title2}</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans mt-2">
                {t.servicios.subtitle}
              </p>
            </Reveal>
          </div>

          {/* Grid de 2x2 Tarjetas Horizontales Informativas (Texto Protagonista + Imagen Thumbnail ~30%) */}
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
                    className="group bg-white text-[#0f172a] rounded-xl md:rounded-2xl p-3.5 md:p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 h-full border-2 border-slate-100 hover:border-[#0284c7] cursor-pointer"
                  >
                    
                    {/* Thumbnail con icono Cyan superpuesto */}
                    <div className="relative w-full sm:w-[110px] h-[85px] sm:h-[95px] rounded-lg sm:rounded-xl overflow-hidden shrink-0">
                      <img src={bgs[i]} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-[#0369a1] text-white shadow-xs flex items-center justify-center z-10">
                        {icons[i]}
                      </div>
                    </div>

                    {/* Texto informativo + Botón Píldora Azul Cyan */}
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

      {/* ── VALORADOR DE INMUEBLES (EXACT MATCH REFERENCE IMAGE) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-[#0f172a] py-6 sm:py-8 md:py-10 scroll-mt-32 md:scroll-mt-36">
        <div id="valorador" className="-top-32 relative block invisible" />
        <div className="bg-white rounded-[24px] sm:rounded-[32px] shadow-xl border border-slate-200/80 p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1240px] relative z-10 overflow-hidden text-[#0f172a]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* LEFT COLUMN: Form */}
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
                <div className="w-full">
                  {/* Inputs Row with crystal clear visual labels & m² suffix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Select Zona */}
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
                            <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                            {zonas.map(z => <option key={z} value={z}>{formatLocation(z, language)}</option>)}
                          </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </div>

                    {/* Input Superficie (m²) */}
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
                  
                  {/* Submit Button */}
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

                  {/* Trust Badges - Horizontal row centered under button */}
                  <div className="flex flex-row flex-nowrap sm:flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 w-full">
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#60a5fa] stroke-[3] shrink-0" />
                      <span>{t.valorador.sinCompromiso}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs text-xs sm:text-sm font-black font-sans whitespace-nowrap border border-slate-700/60 shrink-0">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0" />
                      <span>{t.valorador.resultadoInmediato}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: White Floating Result Card with Permanent Blue Border */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
              <div className="bg-white text-[#0f172a] rounded-3xl p-5 sm:p-7 shadow-xl w-full max-w-[460px] border-2 border-[#2563eb] relative overflow-hidden text-center">
                
                {/* Spinner / Skeleton Loading Overlay with AnimatePresence */}
                <AnimatePresence>
                  {isCalculatingValuation && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6"
                    >
                      <div className="w-12 h-12 border-4 border-[#2563eb]/20 border-t-[#2563eb] rounded-full animate-spin mb-4" />
                      <p className="text-sm font-black text-[#0f172a] font-sans">{t.valorador.calculando}</p>
                      <p className="text-xs text-slate-500 font-bold mt-1 font-sans">{t.valorador.analizando} {formatLocation(valuatorData.zona, language) || "la zona"}...</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 1. "VALOR ESTIMADO" pill badge */}
                <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-md font-sans">
                  <span>{t.valorador.valorEstimado} ({formatLocation(calculatedResult.zoneName, language)})</span>
                </div>
                
                {/* Main Estimated Value with animated Count-Up */}
                <div className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-2 leading-none tracking-tight font-sans">
                  <PriceCounter value={calculatedResult.estimatedValue} duration={1200} /> <span className="text-[#2563eb] font-black">€</span>
                </div>

                {/* 2. Rango estimado de mercado en una caja estilizada */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 mb-2 shadow-sm">
                  <p className="text-xs sm:text-sm font-semibold text-slate-300 font-sans">
                    {t.valorador.rangoEstimado}: <span className="font-extrabold text-white text-sm sm:text-base ml-1">{new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)}€ – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)}€</span>
                  </p>
                </div>

                {/* Animated Range Progress Bar with Context Label */}
                <div className="mb-3">
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-300">
                    <motion.div
                      key={`range-bar-${calculatedResult.estimatedValue}`}
                      initial={shouldReduceMotion ? false : { width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1.2, ease: easeOut }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[#2563eb] rounded-full shadow-xs"
                    />
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 font-bold mt-1.5 text-center font-sans">
                    {language === "ca" 
                      ? "Posició del valor estimat dins del rang de mercat" 
                      : language === "en" 
                      ? "Estimated value position within the market range" 
                      : "Posición del valor estimado dentro del rango de mercado"}
                  </p>
                </div>

                {/* Disclaimer box with neutral dark gray background and pure white text */}
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-white mb-4 font-semibold py-2 px-3 rounded-xl bg-slate-700 border border-slate-600 shadow-xs text-center leading-snug">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200 shrink-0 self-center" />
                  <span className="text-white font-medium text-balance leading-tight">{t.valorador.disclaimer}</span>
                </div>
                
                {/* 3. Sparkline Price Trend Chart Container */}
                <div className="pt-3.5 pb-2 px-3.5 bg-slate-50 rounded-2xl border border-slate-200 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-black text-[#0f172a] font-sans uppercase tracking-wider">
                      {language === "ca" ? "Tendència de mercat" : language === "en" ? "Market trend" : "Tendencia de mercado"}
                    </span>
                    <span className="bg-[#2563eb] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm font-sans">
                      <TrendingUp className="w-3.5 h-3.5 text-white stroke-[3]" /> +{calculatedResult.trendPct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-20 sm:h-24 relative pt-1">
                    {(() => {
                      const spark = getSparklineData(calculatedResult.monthlyPrices);
                      return (
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 250 80" fill="none">
                          <defs>
                            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>
                          {/* Subdued horizontal guide lines */}
                          <line x1="0" y1="20" x2="250" y2="20" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="50" x2="250" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                          
                          {/* Fill area & Trend curve */}
                          <path
                            d={spark.areaPath}
                            fill="url(#sparklineGrad)"
                          />
                          <motion.path
                            key={`trend-line-${calculatedResult.estimatedValue}-${calculatedResult.zoneName}`}
                            d={spark.linePath} 
                            fill="none" 
                            stroke="#2563eb" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            initial={shouldReduceMotion ? false : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          />
                          
                          {/* Data Points */}
                          {spark.points.map((pt, pIdx) => (
                            <circle
                              key={pIdx}
                              cx={pt.cx}
                              cy={pt.cy}
                              r={pIdx === spark.points.length - 1 ? 4.5 : 3}
                              fill={pIdx === spark.points.length - 1 ? "#2563eb" : "#ffffff"}
                              stroke={pIdx === spark.points.length - 1 ? "#ffffff" : "#2563eb"}
                              strokeWidth="2.5"
                            />
                          ))}
                        </svg>
                      );
                    })()}
                  </div>
                  {/* X-Axis Month Labels */}
                  <div className="flex justify-between items-center text-xs sm:text-[13px] font-bold text-[#0f172a] mt-1.5 px-1 font-sans border-t border-slate-200 pt-1.5">
                    {(() => {
                      const locale = language === "ca" ? "ca-ES" : language === "en" ? "en-US" : "es-ES";
                      const now = new Date();
                      const months = [];
                      for (let i = 5; i >= 0; i--) {
                        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                        const m = d.toLocaleDateString(locale, { month: "short" });
                        months.push(m.charAt(0).toUpperCase() + m.slice(1).replace(".", ""));
                      }
                      return months.map((month, mIdx) => {
                        const isCurrentMonth = mIdx === 5;
                        return (
                          <span
                            key={mIdx}
                            className={
                              isCurrentMonth
                                ? "inline-flex items-center gap-1 text-[#2563eb] font-black underline underline-offset-4 decoration-2 decoration-[#2563eb]"
                                : "text-slate-600 font-semibold"
                            }
                          >
                            {isCurrentMonth && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                            )}
                            <span>{month}</span>
                          </span>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Hyper-local Price Benchmark with Comparative Property Price/m² */}
                {(() => {
                  const propertyPricePerM2 = calculatedResult.propertyPricePerM2;
                  const neighborhoodPricePerM2 = calculatedResult.neighborhoodPricePerM2;
                  const diffPrice = propertyPricePerM2 - neighborhoodPricePerM2;
                  const diffPct = ((diffPrice / neighborhoodPricePerM2) * 100).toFixed(1);
                  const isAbove = diffPrice > 0;
                  const isEqual = diffPrice === 0;

                  return (
                    <div className="bg-[#0b214a] text-white rounded-2xl p-3.5 text-left shadow-sm mb-3 divide-y divide-blue-900/60 font-sans">
                      {/* Line 1: Neighborhood average price */}
                      <div className="flex items-center justify-between text-xs sm:text-sm pb-2.5">
                        <span className="font-bold text-slate-300">
                          {language === "ca" ? "Preu mitjà barri:" : language === "en" ? "Avg. neighborhood price:" : "Precio medio barrio:"}
                        </span>
                        <span className="font-black text-white text-sm sm:text-base">
                          {new Intl.NumberFormat('es-ES').format(neighborhoodPricePerM2)} €/m²
                        </span>
                      </div>

                      {/* Line 2: Property estimated price/m² and comparative indicator */}
                      <div className="flex items-center justify-between text-xs sm:text-sm pt-2.5">
                        <span className="font-bold text-slate-300">
                          {language === "ca" ? "Preu estimat immoble:" : language === "en" ? "Estimated property price:" : "Precio estimado inmueble:"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white text-sm sm:text-base">
                            {new Intl.NumberFormat('es-ES').format(propertyPricePerM2)} €/m²
                          </span>
                          {!isEqual && (
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-md mr-1 sm:mr-1.5 shrink-0 shadow-xs ${
                              isAbove ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                            }`}>
                              {isAbove ? `+${diffPct}%` : `${diffPct}%`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Bottom CTA Row: Direct WhatsApp button */}
                <div>
                  <a
                    href={`https://wa.me/34689438012?text=${encodeURIComponent(
                      language === "ca"
                        ? `Hola Gesgrama, he valorat el meu immoble a ${formatLocation(calculatedResult.zoneName, "ca")} (~${calculatedResult.propertyM2} m², estimació de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) i voldria una valoració oficial gratuïta.`
                        : language === "en"
                        ? `Hello Gesgrama, I valuated my property in ${formatLocation(calculatedResult.zoneName, "en")} (~${calculatedResult.propertyM2} sq m, estimated at ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) and would like an official appraisal.`
                        : `Hola Gesgrama, he valorado mi inmueble en ${formatLocation(calculatedResult.zoneName, "es")} (~${calculatedResult.propertyM2} m², estimación de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) y me gustaría una valoración oficial gratuita.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#075E54] hover:bg-[#054c44] text-white font-black text-sm py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer hover:scale-[1.01]"
                  >
                    <WhatsAppBrandIcon className="w-5 h-5 fill-white shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GALLERY (COBERTURA / PROYECTOS EXCLUSIVOS - POINT 5 LIGHT GRAY BG) ── */}
      <section id="cobertura" className="py-4 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-white scroll-mt-28 md:scroll-mt-32">
        <div className="bg-[#0b172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-white/10 p-4 sm:p-7 md:p-8 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
            
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 border border-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>{language === "ca" ? "ÀREA DE COBERTURA" : language === "en" ? "COVERAGE AREA" : "ÁREA DE COBERTURA"}</span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3 font-sans flex flex-col items-start gap-1">
                  <span>{language === "ca" ? "Experts a" : language === "en" ? "Experts in" : "Expertos en"}</span>
                  <span className="inline-block bg-[#2563eb] text-white px-3.5 py-1 rounded-xl shadow-md mt-0.5 whitespace-nowrap">
                    Santa Coloma de
                  </span>
                  <span className="inline-block bg-[#2563eb] text-white px-3.5 py-1 rounded-xl shadow-md whitespace-nowrap">
                    Gramenet
                  </span>
                </h2>
                
                <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-lg mb-3 font-bold leading-snug font-sans">
                  {language === "ca" ? "Equip propi amb atenció personalitzada a tots els barris de Santa Coloma de Gramenet." : language === "en" ? "Our own team with personalized service in all neighborhoods of Santa Coloma de Gramenet." : "Equipo propio con atención personalizada en todos los barrios de Santa Coloma de Gramenet."}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 max-w-lg">
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
                    <span key={barrio} className="bg-white text-slate-950 text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1 rounded-full border border-slate-300 shadow-2xs hover:border-white hover:bg-blue-50 transition-all flex items-center gap-1 cursor-default">
                      <MapPin className="w-3 h-3 text-[#2563eb] shrink-0" />
                      <span>{formatLocation(barrio, language)}</span>
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Help Bubble Card - Compact 80% */}
              <Reveal delay={0.1} className="w-full">
                <div className="bg-white border-2 border-[#2563eb] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 shadow-lg text-[#0f172a]">
                  <div className="flex items-center gap-3 sm:gap-3.5 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 text-white shadow-xs">
                      <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-black text-[#0f172a] leading-tight font-sans tracking-tight">
                        {language === "ca" ? "¿Necessites ajuda?" : language === "en" ? "Need help?" : "¿Necesitas ayuda?"}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm font-bold leading-tight mt-0.5 font-sans">
                        {language === "ca" ? "Som aquí per ajudar-te, sense compromís." : language === "en" ? "We are here to help you, no obligation." : "Estamos aquí para ayudarte, sin compromiso."}
                      </p>
                    </div>
                  </div>
                  <a 
                    href="#contacto" 
                    className="w-full md:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans whitespace-nowrap group hover:scale-[1.02]"
                  >
                    <span>{t.hero.contacto}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT CONTENT: MAP WITH PROMINENT BLUE BORDER */}
            <div className="w-full lg:w-1/2 relative h-[280px] sm:h-[330px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden border-[3px] border-[#2563eb] bg-[#e8ecf1] shadow-lg group">
              {/* Skeleton placeholder */}
              <div 
                className={`absolute inset-0 bg-[#e8ecf1] flex flex-col items-center justify-center transition-opacity duration-700 z-10 pointer-events-none ${
                  mapLoaded ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#2563eb]/15 flex items-center justify-center mb-2 animate-pulse">
                  <MapPin className="w-5 h-5 text-[#2563eb]" />
                </div>
                <span className="text-[11px] font-black text-slate-600 font-sans tracking-wide">
                  {language === "ca" ? "Carregant mapa de la seu..." : language === "en" ? "Loading headquarters map..." : "Cargando mapa de la sede..."}
                </span>
              </div>

              {/* Iframe */}
              <iframe
                title="Ubicación de Gesgrama en Santa Coloma de Gramenet"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1s${language}!2ses!4v1700000000000!5m2!1s${language}!2ses`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="eager"
                onLoad={() => setMapLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
                className={`absolute inset-0 w-full h-full object-cover pointer-events-auto transition-opacity duration-700 ease-out ${
                  mapLoaded ? "opacity-100" : "opacity-0"
                }`}
              ></iframe>

              {/* Floating Card Bottom Right */}
              <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 bg-[#0b172a] text-white rounded-xl p-3 sm:p-3.5 shadow-lg border border-white/20 z-30 pointer-events-auto max-w-full">
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

      {/* ── CTA COMUNIDAD (ELEGANT LIGHT BUBBLE CARD WITH BLUE ACCENT) ── */}
      <section className="py-5 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-onyx">
        <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-lg border border-slate-200/80 p-5 md:p-8 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-10">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{language === "ca" ? "GESTIÓ DE COMUNITATS" : language === "en" ? "COMMUNITY MANAGEMENT" : "GESTIÓN DE COMUNIDADES"}</span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0f172a] mb-3 font-sans">
                  {language === "ca" ? (
                    <>Parlem de la teva <span className="text-[#2563eb]">comunitat</span>?</>
                  ) : language === "en" ? (
                    <>Let's talk about your <span className="text-[#2563eb]">community</span></>
                  ) : (
                    <>¿Hablamos de tu <span className="text-[#2563eb]">comunidad</span>?</>
                  )}
                </h2>
                
                <p className="text-[#0f172a] text-sm sm:text-base md:text-lg max-w-lg mb-4 font-bold leading-snug font-sans text-balance">
                  {language === "ca" 
                    ? "Administració transparent, resposta àgil i optimització de costos garantida per a la teva finca." 
                    : language === "en" 
                    ? "Transparent management, agile response and guaranteed cost optimization for your property." 
                    : "Administración transparente, respuesta ágil y optimización de costes garantizada para tu finca."}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                  <a href="#contacto" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer font-sans">
                    <Phone className="w-4 h-4 text-white" />
                    <span>{language === "ca" ? "Parlar amb un assessor" : language === "en" ? "Talk to an advisor" : "Hablar con un asesor"}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="https://wa.me/34601259424" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#075E54] hover:bg-[#054c44] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer font-sans"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white group-hover:scale-110 transition-transform">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    <span>{language === "ca" ? "WhatsApp directe" : language === "en" ? "Direct WhatsApp" : "WhatsApp directo"}</span>
                  </a>
                </div>

                {/* Stats Grid */}
                <div className="hidden sm:grid grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-slate-200/80">
                  <div className="bg-[#586174] border border-white/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-md">
                    <p className="text-xl sm:text-2xl font-black text-white mb-0.5 font-sans tracking-tight">Nº 5583</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">{language === "ca" ? "Registre AICAT" : language === "en" ? "AICAT Registry" : "Registro AICAT"}</p>
                  </div>
                  <div className="bg-[#586174] border border-white/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-md">
                    <p className="text-xl sm:text-2xl font-black text-white mb-0.5 font-sans tracking-tight">+15 {language === "ca" ? "anys" : language === "en" ? "years" : "años"}</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">{language === "ca" ? "Experiència Local" : language === "en" ? "Local Experience" : "Experiencia Local"}</p>
                  </div>
                  <div className="bg-[#586174] border border-white/30 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-md">
                    <p className="text-xl sm:text-2xl font-black text-white mb-0.5 font-sans tracking-tight">100%</p>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">{language === "ca" ? "Col·legiats API" : language === "en" ? "Registered API" : "Colegiados API"}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Image (Left in desktop) */}
            <div className="w-full lg:w-1/2 h-[220px] sm:h-[260px] md:h-[320px] relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-[#0f172a]">
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

      {/* ── ÚLTIMAS NOTICIAS (BLOG) ── */}
      <section id="blog" className="pt-4 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 bg-[#e2e8f0] text-onyx">
        <div className="max-w-[1150px] mx-auto">
          <Reveal>
            <div className="mb-4 sm:mb-6 text-center">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
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

      {/* ── FAQ (COMPACT LAYOUT WITH BALANCED TEXT) ── */}
      <section 
        id="faq" 
        className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-4 md:py-6 scroll-mt-28 md:scroll-mt-32"
      >
        <div className="bg-[#0b172a] rounded-[24px] md:rounded-[30px] shadow-xl border border-white/10 p-5 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1100px] relative z-10 overflow-hidden text-white flex flex-col items-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center w-full">
            <Reveal>
              <div className="text-center mb-6 flex flex-col items-center">
                {/* White Badge with Icon next to Text */}
                <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200 mb-3 font-sans">
                  <HelpCircle className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                  <span>{t.faq.tag}</span>
                </span>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white tracking-tight font-sans mb-2">
                  <span className="bg-[#2563eb] text-white px-3 py-1 rounded-xl inline-block shadow-md">
                    {t.faq.title1}
                  </span>{" "}
                  {t.faq.title2}
                </h2>

                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans mt-1.5">
                  {t.faq.subtitle}
                </p>
              </div>
            </Reveal>

            {/* Accordion Cards - Visual Cards with Index Badges & Balanced Text */}
            <div className="w-full flex flex-col gap-3 mb-6">
              {t.faq.items.map((item, i) => {
                const isActive = activeFaq === i;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div 
                      onClick={() => setActiveFaq(isActive ? null : i)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 group border ${
                        isActive 
                          ? 'bg-white shadow-lg border-blue-500/40 ring-1 ring-blue-500/20' 
                          : 'bg-slate-100/95 hover:bg-white border-slate-200/90 hover:border-blue-400/50 shadow-xs'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-3.5">
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors duration-200 font-sans ${
                            isActive ? 'bg-[#2563eb] text-white shadow-xs' : 'bg-slate-200 text-slate-700 group-hover:bg-blue-100 group-hover:text-[#2563eb]'
                          }`}>
                            0{i + 1}
                          </span>
                          <h3 className="font-black text-[#0f172a] text-sm sm:text-base md:text-lg font-sans leading-snug text-balance">
                            {item.q}
                          </h3>
                        </div>
                        <motion.div 
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-xs ${
                            isActive ? 'bg-[#1d4ed8] text-white shadow-sm' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                          }`}
                        >
                          <span className="text-xl font-black leading-none select-none">+</span>
                        </motion.div>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div 
                            key={`faq-ans-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-3.5 text-slate-700 leading-relaxed font-semibold text-xs sm:text-sm md:text-[15px] border-t border-slate-200 mt-3.5 font-sans text-balance">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Bottom Eye-Catching Blue CTA Button */}
            <div className="text-center">
              <a 
                href="#formulario-contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.getElementById("formulario-contacto");
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    const inputEl = formEl.querySelector("input") as HTMLInputElement | null;
                    if (inputEl) {
                      setTimeout(() => inputEl.focus({ preventScroll: true }), 400);
                    }
                  }
                }}
                className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer font-sans"
              >
                <span>{t.faq.askDoubt}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT (EXACT MATCH REFERENCE IMAGE) ── */}
      <section id="contacto" className="py-5 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-onyx scroll-mt-28 md:scroll-mt-32">
        <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200/80 p-4 sm:p-7 md:p-9 mx-auto max-w-[1150px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Title & Image Overlay Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                  {t.contacto.badge}
                </span>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2.5 font-sans">
                  {t.contacto.title1}<br />
                  <span className="text-[#2563eb] italic font-serif">{t.contacto.title2}</span>
                </h2>
                
                <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-4 font-bold leading-snug font-sans">
                  {t.contacto.subtitle}
                </p>

                {/* Storefront Image Card with Central Office Overlay */}
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 aspect-[16/10] group">
                  <img 
                    src={gesgramaOffice} 
                    alt="Gesgrama oficina principal en Santa Coloma" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Floating Office Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:left-3 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-100 max-w-[260px] z-20">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
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

            {/* RIGHT COLUMN: Contact Form Card */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div id="formulario-contacto" className="bg-white border-2 border-[#757989] p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm scroll-mt-28 md:scroll-mt-32">
                  <h3 className="font-black text-xl sm:text-2xl text-[#0f172a] mb-4 tracking-tight font-sans">{t.contacto.form.formTitle}</h3>
                  
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
                          asunto: "Gestión de Comunidades",
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
                    {/* Row 1: Nombre & Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="contacto-nombre-input" className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.nombre.toUpperCase()}</label>
                        <input 
                          id="contacto-nombre-input"
                          type="text" 
                          placeholder={t.contacto.form.nombrePlaceholder} 
                          value={contactForm.nombre}
                          onChange={e => {
                            setContactForm(f => ({ ...f, nombre: e.target.value }));
                            if (contactErrors.nombre) setContactErrors(err => ({ ...err, nombre: undefined }));
                          }}
                          className={`w-full bg-[#f8fafc] border-2 ${contactErrors.nombre ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                        />
                        <AnimatePresence>
                          {contactErrors.nombre && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-red-600 font-black mt-1 font-sans"
                            >
                              {contactErrors.nombre}
                            </motion.p>
                          )}
                        </AnimatePresence>
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
                          className={`w-full bg-[#f8fafc] border-2 ${contactErrors.telefono ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                        />
                        <AnimatePresence>
                          {contactErrors.telefono && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-red-600 font-black mt-1 font-sans"
                            >
                              {contactErrors.telefono}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Row 2: Correo & Tipo de Consulta en 2 columnas horizontales */}
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
                          className={`w-full bg-[#f8fafc] border-2 ${contactErrors.email ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out font-sans placeholder:text-slate-400`} 
                        />
                        <AnimatePresence>
                          {contactErrors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-red-600 font-black mt-1 font-sans"
                            >
                              {contactErrors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="contacto-asunto-select" className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.asunto.toUpperCase()}</label>
                        <div className="relative">
                          <select 
                            id="contacto-asunto-select" 
                            aria-label="Seleccionar motivo o tipo de consulta" 
                            value={contactForm.asunto}
                            onChange={e => setContactForm(f => ({ ...f, asunto: e.target.value }))}
                            className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out appearance-none pr-8 cursor-pointer truncate font-sans"
                          >
                            <option>{t.contacto.form.asuntoOpciones.comunidad}</option>
                            <option>{t.contacto.form.asuntoOpciones.venta}</option>
                            <option>{t.contacto.form.asuntoOpciones.juridico}</option>
                            <option>{t.contacto.form.asuntoOpciones.otro}</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Mensaje */}
                    <div>
                      <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-1 text-xs sm:text-sm font-sans">{t.contacto.form.mensaje.toUpperCase()}</label>
                      <textarea 
                        rows={2} 
                        placeholder={t.contacto.form.mensajePlaceholder} 
                        value={contactForm.mensaje}
                        onChange={e => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                        className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all duration-200 ease-out resize-none font-sans placeholder:text-slate-400" 
                      />
                    </div>

                    {/* Checkbox Privacidad */}
                    <div>
                      <div className="flex items-center gap-2.5 pt-1">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          checked={contactForm.privacidad}
                          onChange={e => {
                            setContactForm(f => ({ ...f, privacidad: e.target.checked }));
                            if (contactErrors.privacidad) setContactErrors(err => ({ ...err, privacidad: undefined }));
                          }}
                          className="w-4.5 h-4.5 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer" 
                        />
                        <label htmlFor="privacy" className="text-sm sm:text-base text-[#0f172a] font-bold cursor-pointer font-sans select-none">{t.contacto.form.privacidad}</label>
                      </div>
                      <AnimatePresence>
                        {contactErrors.privacidad && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-red-600 font-black mt-1 font-sans"
                          >
                            {contactErrors.privacidad}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button with Loading & Success micro-animation */}
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
                        <motion.div 
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: [0.7, 1.2, 1], opacity: 1 }}
                          transition={{ duration: 0.4, ease: easeOut }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-5 h-5 stroke-[3] text-white" />
                          <span>{language === "ca" ? "Missatge enviat!" : language === "en" ? "Message sent!" : "¡Mensaje enviado!"}</span>
                        </motion.div>
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

      {/* ── FINAL CLOSING CTA BANNER ('LISTO PARA DAR EL SIGUIENTE PASO') ── */}
      <section id="final-cta" className="py-4 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-[#0f172a]">
        <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-xl border border-slate-200/80 p-5 sm:p-7 md:p-9 pb-5 md:pb-7 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
            
            {/* Left Content (Title, Subtitle & Buttons) */}
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
                    className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Home className="w-4 h-4 text-white shrink-0" />
                    <span className="whitespace-nowrap">{t.finalCta.btnValuate}</span>
                  </a>
                  <a
                    href="#contacto"
                    className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Phone className="w-4 h-4 text-white shrink-0" />
                    <span className="whitespace-nowrap">{t.finalCta.btnContact}</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Side: Cut-out Advisors Image with smooth blended edges (left, right, bottom) */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end items-end self-end mt-2 lg:mt-0 relative">
              <div 
                className="relative w-full max-w-[480px] overflow-hidden"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
                  WebkitMaskComposite: "destination-in",
                  maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
                  maskComposite: "intersect"
                }}
              >
                <img 
                  src="/images/cta_advisors_closed_laptop.jpg" 
                  alt="Asesores inmobiliarios Gesgrama" 
                  width={1024}
                  height={1024}
                  className="w-full h-auto object-contain block -mb-1"
                />
              </div>
              {/* Fallback smooth gradients directly matching card background (#ffffff) */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
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
            {/* Text Columns (Left Block) - Logo + Description FIRST, then Navigation, Contact & Legal */}
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

            {/* Mascot on Mobile (<768px): Placed discreetly at the end of content, compact scale */}
            <div className="w-full md:hidden flex justify-center items-center pt-2 pb-2">
              <FooterMascot className="w-24 sm:w-28 h-auto object-contain drop-shadow-md opacity-90" />
            </div>

            {/* Right Block: Mascot Illustration (Desktop / Tablet >= 768px) - Sweet spot scale */}
            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Cobertura en Santa Coloma de Gramenet */}
          <div className="border-t border-white/10 pt-8 pb-2">
            <h3 className="text-sm sm:text-base font-black text-[#38bdf8] uppercase tracking-wider mb-4 font-sans text-center md:text-left">
              {language === "ca" ? "COBERTURA A SANTA COLOMA DE GRAMENET" : language === "en" ? "COVERAGE IN SANTA COLOMA DE GRAMENET" : "COBERTURA EN SANTA COLOMA DE GRAMENET"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 sm:gap-2.5">
              {[
                { name: "Centre", slug: "centre" },
                { name: "Santa Rosa", slug: "santa-rosa" },
                { name: "Can Mariner", slug: "can-mariner" },
                { name: "Fondo", slug: "fondo" },
                { name: "Singuerlín", slug: "singuerlin" },
                { name: "Riera Alta", slug: "riera-alta" },
                { name: "Llatí", slug: "llati" },
                { name: "El Raval", slug: "el-raval" },
                { name: "Riu Nord", slug: "riu-nord" },
                { name: "Riu Sud", slug: "riu-sud" },
                { name: "Can Franquesa", slug: "can-franquesa" },
                { name: "Les Oliveres", slug: "les-oliveres" },
                { name: "La Guinardera", slug: "la-guinardera" },
                { name: "Cementiri Vell", slug: "cementiri-vell" }
              ].map(zone => (
                <Link
                  key={zone.slug}
                  to="/administrador-fincas/$city"
                  params={{ city: zone.slug }}
                  className="px-2.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-900 hover:text-[#2563eb] text-xs sm:text-xs xl:text-sm font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                  <span className="truncate">{zone.name}</span>
                </Link>
              ))}
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
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. {t.footer.rights} · <span className="inline-block whitespace-nowrap">Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener" className="underline hover:text-blue-300">Kovia</a></span></p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">{language === "ca" ? "Avís Legal" : language === "en" ? "Legal Notice" : "Aviso Legal"}</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">{language === "ca" ? "Privacitat" : language === "en" ? "Privacy" : "Privacidad"}</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">Cookies</Link>
              <span>·</span>
              <Link to="/admin" className="hover:text-amber-300 text-slate-400 transition-colors">Acceso Gestor</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <WhatsAppButton language={language} />
      <CookieBanner language={language} />

      {/* Service Detail Modal */}
      {selectedServiceIndex !== null && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedServiceIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[28px] max-w-xl w-full shadow-2xl relative border-2 border-slate-200 max-h-[90vh] overflow-hidden my-auto text-[#0f172a] animate-in fade-in zoom-in-95 duration-200 flex flex-col"
          >
            {/* Top Brand Color Banner */}
            <div className="relative bg-gradient-to-r from-[#0b214a] via-[#1e3a6e] to-[#2563eb] p-6 sm:p-8 text-white">
              <button
                type="button"
                onClick={() => setSelectedServiceIndex(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-lg border border-white/80">
                  {selectedServiceIndex === 0 && <Building2 className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 1 && <TrendingUp className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 2 && <Shield className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 3 && <Paintbrush className="w-7 h-7 stroke-[2.2]" />}
                </div>
                <div>
                  <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 border border-white/20 font-sans">
                    {t.servicios.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                    {t.serviceModal.items[selectedServiceIndex]?.title}
                  </h3>
                </div>
              </div>

              <p className="text-blue-100 text-xs sm:text-sm font-extrabold mt-3 font-sans leading-snug">
                {t.serviceModal.items[selectedServiceIndex]?.tagline}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold font-sans">
                {t.serviceModal.items[selectedServiceIndex]?.description}
              </p>

              {/* Benefits with solid light-blue container and vibrant blue icons */}
              <div className="bg-[#eff6ff] rounded-2xl p-4 sm:p-5 border-2 border-[#bfdbfe] space-y-3 shadow-xs">
                <p className="text-xs font-black uppercase tracking-wider text-[#1e3a6e] mb-2 font-sans">
                  {language === "ca" ? "Què inclou el servei:" : language === "en" ? "What's included:" : "Qué incluye el servicio:"}
                </p>
                {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-extrabold text-[#0f172a] font-sans">
                    <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                    </div>
                    <span className="leading-snug pt-0.5">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = selectedServiceIndex;
                    setSelectedServiceIndex(null);
                    // Pre-fill subject if applicable
                    if (currentIdx === 0) {
                      setContactForm(prev => ({ ...prev, asunto: t.contacto.form.asuntoOpciones.comunidad }));
                    } else if (currentIdx === 1 || currentIdx === 2) {
                      setContactForm(prev => ({ ...prev, asunto: t.contacto.form.asuntoOpciones.venta }));
                    } else if (currentIdx === 3) {
                      setContactForm(prev => ({ ...prev, asunto: t.contacto.form.asuntoOpciones.otro }));
                    }

                    setTimeout(() => {
                      const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                      if (formEl) {
                        const navOffset = window.innerWidth < 768 ? 76 : 90;
                        const elementPosition = formEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                        window.scrollTo({
                          top: Math.max(0, offsetPosition),
                          behavior: "smooth"
                        });
                        window.history.pushState(null, "", "#formulario-contacto");
                        
                        // Focus on the first input
                        setTimeout(() => {
                          const inputEl = document.getElementById("contacto-nombre-input");
                          if (inputEl) inputEl.focus();
                        }, 400);
                      }
                    }, 50);
                  }}
                  className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-sans uppercase tracking-wider cursor-pointer"
                >
                  <span>{t.serviceModal.contactBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-[#0f172a] border border-slate-300 font-black text-xs sm:text-sm py-3.5 px-7 rounded-full transition-all cursor-pointer font-sans uppercase tracking-wider"
                >
                  {t.serviceModal.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

