import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef, Fragment } from "react";
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
import { subscribeProperties, fetchProperties, getLocalProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";
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

  const [consoleFilters, setConsoleFilters] = useState({
    tipo: "Cualquier tipo",
    zona: "Cualquier zona",
    habitaciones: "Cualquier número",
    precio: "Cualquier precio"
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("recientes");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    setConsoleFilters({
      tipo: searchParams.tipo,
      zona: searchParams.zona,
      habitaciones: searchParams.habitaciones || "Cualquier número",
      precio: searchParams.precio
    });
  }, [searchParams]);

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
      if (val === 'Cualquier número') return (t.properties as any).anyNumber || (t.properties as any).anyBedrooms || "Cualquier número";
      if (val.includes('+')) return `${val.replace('+', '')}+ ${t.properties.bedrooms.toLowerCase()}`;
    }
    if (category === 'precio') {
      if (val === 'Cualquier precio') return t.properties.anyPrice;
      if (val.endsWith('€')) return `< ${val}`;
    }
    return val;
  };

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
    trendPct: number;
    monthlyPrices: number[];
  }>(() => {
    const stats = ZONE_MARKET_STATS[initialZoneName] || ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    const exact = 85 * stats.pricePerM2;
    return {
      estimatedValue: exact,
      rangeMin: Math.round(exact * 0.93),
      rangeMax: Math.round(exact * 1.07),
      zoneName: initialZoneName,
      trendPct: stats.trendPct,
      monthlyPrices: stats.monthlyPrices
    };
  });

  const handleCalculateValuation = () => {
    setIsCalculatingValuation(true);
    const m2 = parseFloat(valuatorData.metros.replace(/[^\d]/g, "")) || 85;
    const stats = ZONE_MARKET_STATS[valuatorData.zona] || ZONE_MARKET_STATS["Centre"] || { pricePerM2: 2350, trendPct: 4.8, monthlyPrices: [2240, 2260, 2285, 2305, 2330, 2350] };
    const exactValue = Math.round(m2 * stats.pricePerM2);
    const minVal = Math.round(exactValue * 0.93);
    const maxVal = Math.round(exactValue * 1.07);

    setTimeout(() => {
      setCalculatedResult({
        estimatedValue: exactValue,
        rangeMin: minVal,
        rangeMax: maxVal,
        zoneName: valuatorData.zona || "Zona seleccionada",
        trendPct: stats.trendPct,
        monthlyPrices: stats.monthlyPrices
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

  // Real-time dynamic property store synchronized with admin panel
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

  // Filtered and sorted properties
  const filteredProperties = liveProperties
    .filter(prop => {
      if (searchParams.mode === "favoritos") {
        return favorites.includes(prop.id);
      }
      const pOp = prop.operation || "comprar";
      return pOp === searchParams.mode || (searchParams.mode === "comprar" && pOp === "compra");
    })
    .filter(prop => {
      if (searchParams.mode === "favoritos") return true;
      const matchesZone = searchParams.zona === "Cualquier zona" || (prop.location && prop.location.includes(searchParams.zona));
      const matchesType = searchParams.tipo === "Cualquier tipo" || prop.type === searchParams.tipo;
      const matchesPrice = isPriceValid(searchParams.precio, prop.price);
      const matchesBeds = searchParams.habitaciones === "Cualquier número" || !searchParams.habitaciones || (
        searchParams.habitaciones.includes("+")
          ? prop.bedrooms >= parseInt(searchParams.habitaciones.replace("+", ""), 10)
          : prop.bedrooms === parseInt(searchParams.habitaciones, 10)
      );
      return matchesZone && matchesType && matchesPrice && matchesBeds;
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
              ? `Cuidem de la teva comunitat a ${data.name} amb criteris locals, transparència i resolució immediata.`
              : language === "en"
              ? `Professional community management in ${data.name} with local expertise, transparency, and fast response.`
              : `Cuidamos de tu comunidad en ${data.name} con criterio local, máxima transparencia y un equipo que responde.`
          }
          customValuationHref="#valuator-form"
        />

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
                  {t.properties.title1} <span className="text-[#2563eb]">{t.properties.title2}</span>
                </h2>
                
                <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-bold font-sans max-w-3xl text-balance">
                  {t.properties.subtitle}
                </p>
              </div>

              {/* Dedicated full-width row for Mode Selector + Stat Badge */}
              <div className="mt-6 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
                {/* Search Mode Selector Tabs */}
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

                {/* Stat Badge right above Search Console */}
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
                        const count = liveProperties.filter(p => {
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
                <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

                {/* Field 2: Zona */}
                <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
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
                        ...[...new Set(liveProperties.map(p => p.location))].filter(Boolean).map(loc => ({ label: formatLocation(loc, language), value: loc }))
                      ].map(opt => {
                        const count = liveProperties.filter(p => {
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
                <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

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
                        const count = liveProperties.filter(p => {
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
                <div className="hidden xl:block w-px h-10 bg-slate-200 shrink-0"></div>

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
                        const count = liveProperties.filter(p => {
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

              {/* Quick access chips for zones - All visible at a glance (no scroll needed) */}
              <div className="mt-5 pb-5 border-b border-slate-100 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                <span className="text-xs sm:text-sm font-black text-[#0f172a] uppercase tracking-wider shrink-0 font-sans mr-1 w-full sm:w-auto mb-1 sm:mb-0">{t.properties.popularZones}:</span>
                {(() => {
                  const orderedZones = [
                    "Cualquier zona",
                    "Riera Alta - Llatí",
                    "Singuerlín",
                    "Centro",
                    "Santa Rosa - Can Mariner",
                    "Fondo",
                    "El Raval",
                    "Riu"
                  ];

                  return orderedZones.map(zoneVal => {
                    const label = zoneVal === "Cualquier zona" ? t.properties.allZones : formatLocation(zoneVal, language);
                    const isActive = searchParams.zona === zoneVal;
                    const isRaval = zoneVal === "El Raval";

                    return (
                      <Fragment key={zoneVal}>
                        {isRaval && <span className="sm:hidden basis-full h-0 pointer-events-none" />}
                        <button
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, zona: zoneVal }));
                            setSearchParams(prev => ({ ...prev, zona: zoneVal }));
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs sm:text-xs xl:text-sm font-black transition-all duration-200 cursor-pointer font-sans text-center whitespace-nowrap shadow-2xs ${
                            isActive 
                              ? "bg-[#2563eb] text-white shadow-md ring-2 ring-[#2563eb]/25 border-2 border-[#2563eb]" 
                              : "bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      </Fragment>
                    );
                  });
                })()}
              </div>

              {/* RESULTS COUNT & SORTING */}
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
                          className="group bg-white rounded-[26px] sm:rounded-[28px] flex flex-col h-full border border-slate-200/90 hover:border-[#2563eb] shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] transition-all duration-300 overflow-hidden cursor-pointer"
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
                              {/* Location with Pin - Solid White Pill */}
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
                                  <Ruler className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                                  <span>{property.surface} m²</span>
                                </div>
                              </div>

                              {/* Floor / Feature Highlight badge */}
                              <div className="mt-3">
                                <div className="inline-flex items-center gap-2.5 bg-white text-slate-900 border-2 border-slate-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shadow-xs max-w-full">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shrink-0" />
                                  <span className="truncate">{property.floor || (property.features && property.features[0]) || (language === "ca" ? "Immoble verificat per Gesgrama" : language === "en" ? "Verified property by Gesgrama" : "Inmueble verificado por Gesgrama")}</span>
                                </div>
                              </div>
                            </div>

                            {/* Price & Action Button */}
                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                              <div className="flex flex-col min-w-0">
                                <span className="inline-block self-start text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2563eb] text-white mb-1 font-sans shadow-2xs">
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
                  <div id="properties-results" className="mt-6 scroll-mt-28">
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
                          {sortOption === "precio_asc" ? "Precio: Menor a Mayor" : sortOption === "precio_desc" ? "Precio: Mayor a Menor" : t.properties.mostRecent} 
                          <ChevronDown className="w-4 h-4 text-slate-700 shrink-0" />
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

                    {/* LOAD MORE BUTTON */}
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
                          <p className="text-[11px] font-bold text-slate-400 font-sans tracking-tight">
                            {t.properties.showingAll} ({filteredProperties.length})
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-[#0f172a] tracking-tight mb-5 md:mb-6 font-sans">
                  {t.testimonios.title1}{" "}
                  <span className="relative inline-block text-[#2563eb] pb-1.5">
                    {t.testimonios.title2}
                  </span>
                </h2>
                <div className="pt-2 sm:pt-3 inline-flex items-center gap-2.5 bg-white border-2 border-slate-200 rounded-full px-5 py-2.5 shadow-sm hover:border-[#2563eb]/40 transition-colors">
                  <GoogleIcon className="w-6 h-6 shrink-0" />
                  <span className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
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
                          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-slate-200 px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-2xs shrink-0">
                            <GoogleIcon className="w-4 h-4 shrink-0" />
                            <span>Google</span>
                          </div>
                        </div>
                        <p className="text-slate-700 text-[14px] sm:text-[14.5px] leading-relaxed font-normal mb-5 flex-1">
                          "{item.quote}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#0b214a] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-1 ring-slate-200">
                            {initials[i % initials.length]}
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
          <div id="valorador" className="-top-28 relative block invisible" />
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
                              {zonas.map(z => (
                                <option key={z} value={z}>{formatLocation(z, language)}</option>
                              ))}
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
                    <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 animate-pulse" />
                    <span>{t.valorador.valorEstimado} ({formatLocation(calculatedResult.zoneName, language)})</span>
                  </div>

                  {/* Main Estimated Value with animated Count-Up */}
                  <div className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-2 leading-none tracking-tight font-sans">
                    <PriceCounter value={calculatedResult.estimatedValue} duration={1200} /> <span className="text-[#2563eb] font-black">€</span>
                  </div>

                  {/* 2. Rango estimado de mercado en una caja estilizada */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 mb-2.5 shadow-sm">
                    <p className="text-xs sm:text-sm font-semibold text-slate-300 font-sans">
                      {t.valorador.rangoEstimado}: <span className="font-extrabold text-white text-sm sm:text-base ml-1">{new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMin)}€ – {new Intl.NumberFormat('es-ES').format(calculatedResult.rangeMax)}€</span>
                    </p>
                  </div>

                  {/* Animated Range Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-3 border border-slate-300">
                    <motion.div
                      key={`range-bar-${calculatedResult.estimatedValue}`}
                      initial={shouldReduceMotion ? false : { width: "0%" }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1.2, ease: easeOut }}
                      className="h-full bg-gradient-to-r from-blue-500 to-[#2563eb] rounded-full shadow-xs"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-700 mb-4 font-bold py-2 px-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                    <span className="text-[#2563eb] font-black text-base leading-none">*</span>
                    <span className="text-slate-800 font-semibold">{t.valorador.disclaimer}</span>
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
                              <linearGradient id="sparklineGradCity" x1="0" y1="0" x2="0" y2="1">
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
                              fill="url(#sparklineGradCity)"
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
                    <div className="flex justify-between items-center text-xs sm:text-[13px] font-black text-[#0f172a] mt-1.5 px-1 font-sans border-t border-slate-200 pt-1.5">
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
                          <span key={mIdx} className={mIdx === 5 ? "text-[#2563eb] font-black" : "text-slate-700"}>
                            {month}
                          </span>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Hyper-local Price Benchmark */}
                  <div className="bg-[#0b214a] text-white rounded-2xl p-3.5 text-left shadow-sm mb-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-200">
                        {language === "ca" ? "Preu mitjà barri:" : language === "en" ? "Avg. neighborhood price:" : "Precio medio barrio:"}
                      </span>
                      <span className="font-black text-[#60a5fa] text-sm sm:text-base">
                        {new Intl.NumberFormat('es-ES').format(ZONE_PRICE_PER_M2[calculatedResult.zoneName] || 2150)} €/m²
                      </span>
                    </div>
                  </div>

                  {/* Bottom CTA Row: Two solid-background buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Link
                      to="/administrador-fincas/$city"
                      params={{ city: ZONE_TO_SLUG[calculatedResult.zoneName] || "centre" }}
                      className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#0b214a] hover:text-[#2563eb] bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 py-3 px-3.5 rounded-xl transition-all shadow-xs group"
                    >
                      <Building2 className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                      <span className="truncate">
                        {language === "ca" 
                          ? `Guia a ${formatLocation(calculatedResult.zoneName, language)}`
                          : language === "en"
                          ? `Guide in ${formatLocation(calculatedResult.zoneName, language)}`
                          : `Guía en ${formatLocation(calculatedResult.zoneName, language)}`}
                      </span>
                    </Link>

                    <a
                      href={`https://wa.me/34689438012?text=${encodeURIComponent(
                        language === "ca"
                          ? `Hola Gesgrama, he valorat el meu immoble a ${formatLocation(calculatedResult.zoneName, "ca")} (~${valuatorData.metros || 85} m², estimació de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) i voldria una valoració oficial gratuïta.`
                          : language === "en"
                          ? `Hello Gesgrama, I valuated my property in ${formatLocation(calculatedResult.zoneName, "en")} (~${valuatorData.metros || 85} sq m, estimated at ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) and would like an official appraisal.`
                          : `Hola Gesgrama, he valorado mi inmueble en ${formatLocation(calculatedResult.zoneName, "es")} (~${valuatorData.metros || 85} m², estimación de ${new Intl.NumberFormat('es-ES').format(calculatedResult.estimatedValue)}€) y me gustaría una valoración oficial gratuita.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#075E54] hover:bg-[#054c44] text-white font-black text-xs sm:text-sm py-3 px-3.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <WhatsAppBrandIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>WhatsApp</span>
                    </a>
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
                          <MapPin className={`w-3 h-3 shrink-0 ${isCurrent ? "text-white" : "text-[#2563eb]"}`} />
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
                      <WhatsAppBrandIcon className="w-4 h-4 fill-white" />
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
                      <WhatsAppBrandIcon className="w-5 h-5 fill-emerald-400 shrink-0" />
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
                <a
                  href="#contacto"
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-sans uppercase tracking-wider cursor-pointer"
                >
                  <span>{t.serviceModal.contactBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                </a>
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
