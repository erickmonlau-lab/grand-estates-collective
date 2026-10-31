import { DrawnUnderline } from "@/components/DrawnUnderline";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from '@/components/Footer';
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
  Scale,
  Wrench,
  Calendar, 
  Ruler,
  Bath,
  Paintbrush,
  Loader2,
  Search,
  X,
  Heart,
  Maximize2,
  Sparkles,
  Bed,
  Store,
  DoorOpen,
  Accessibility,
  Layers,
  Flame
} from "lucide-react";
import ValuatorSection from "@/components/ValuatorSection";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { getNeighborhoodFaqs } from "@/data/barrioFaqsI18n";
import { properties, formatLocation } from "@/data/properties";
import { subscribeProperties, fetchProperties, getLocalProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";
import { articles } from "@/data/articles";
import { translations, loadLanguage } from "@/data/translations";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroCarousel from "@/hero-carousel";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

const SITE_DOMAIN = "https://gesgrama.com";
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

export const SLUG_TO_ZONE: Record<string, string> = {
  "centre": "Centro",
  "santa-rosa": "Santa Rosa - Can Mariner",
  "can-mariner": "Santa Rosa - Can Mariner",
  "fondo": "Fondo",
  "singuerlin": "Singuerlín",
  "riera-alta": "Riera Alta - Llatí",
  "llati": "Riera Alta - Llatí",
  "el-raval": "El Raval",
  "riu-nord": "Riu",
  "riu-sud": "Riu",
  "can-franquesa": "Singuerlín",
  "les-oliveres": "Singuerlín",
  "la-guinardera": "Centro",
  "cementiri-vell": "Centro",
  "santa-coloma-de-gramenet": "Cualquier zona"
};

export const Route = createFileRoute("/administrador-fincas_/$city")({
  head: ({ params }) => {
    const rawSlug = (params.city as string) || "centre";
    const isGlobal = rawSlug === "santa-coloma-de-gramenet";
    const data: NeighborhoodDetail = SANTA_COLOMA_BARRIOS[rawSlug] || SANTA_COLOMA_BARRIOS["centre"];
    const canonicalUrl = `${SITE_DOMAIN}/administrador-fincas/${isGlobal ? "santa-coloma-de-gramenet" : data.slug}`;
    const ogImage = "https://gesgrama.com/og-image.png";

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


function getDynamicPropertySpecs(property: any, language: "es" | "ca" | "en") {
  const rawType = (property.type || "").toLowerCase();
  const isCommercial = rawType.includes("local") || rawType.includes("comercial") || rawType.includes("nave") || rawType.includes("tienda");
  const isOffice = rawType.includes("oficina") || rawType.includes("despacho");
  const feats: string[] = (property.features || []).map((f: string) => f.toLowerCase());
  const desc = (property.description || "").toLowerCase();

  const blocks: Array<{
    id: string;
    icon: any;
    label: string;
    value: string;
    isNumericOnly?: boolean;
  }> = [];

  const L = {
    surface: language === "ca" ? "SUPERFÍCIE" : language === "en" ? "SURFACE" : "SUPERFICIE",
    baths: language === "ca" ? "BANYS" : language === "en" ? "BATHROOMS" : "BAÑOS",
    rooms: language === "ca" ? "HABITACIONS" : language === "en" ? "BEDROOMS" : "HABITACIONES",
    facade: language === "ca" ? "FAÇANA" : language === "en" ? "FACADE" : "ESCAPARATE",
    smoke: language === "ca" ? "FUMS" : language === "en" ? "SMOKE EXT." : "S. HUMOS",
    access: language === "ca" ? "ACCÉS" : language === "en" ? "ACCESS" : "ACCESIBILIDAD",
    floor: language === "ca" ? "PLANTA" : language === "en" ? "FLOOR" : "PLANTA",
    condition: language === "ca" ? "ESTAT" : language === "en" ? "STATUS" : "ESTADO",
    yes: language === "ca" ? "SÍ" : language === "en" ? "YES" : "SÍ",
    good: language === "ca" ? "BO" : language === "en" ? "GOOD" : "BUENO",
    exterior: language === "ca" ? "EXTERIOR" : language === "en" ? "EXTERIOR" : "EXTERIOR",
    street: language === "ca" ? "CARRER" : language === "en" ? "STREET" : "A PIE CALLE",
    elevator: language === "ca" ? "ASCENSOR" : language === "en" ? "ELEVATOR" : "ASCENSOR"
  };

  if (isCommercial) {
    blocks.push({
      id: "surface",
      icon: Maximize2,
      label: L.surface,
      value: property.surface + "&nbsp;m²"
    });

    blocks.push({
      id: "bathrooms",
      icon: Bath,
      label: L.baths,
      value: String(property.bathrooms > 0 ? property.bathrooms : 1),
      isNumericOnly: true
    });

    const facadeMatch = desc.match(/fachada de (\d+)\s*m/i) || desc.match(/(\d+)\s*metros de fachada/i);
    const hasEscaparate = feats.some(f => f.includes("escaparate")) || desc.includes("escaparate");
    const hasSalidaHumos = feats.some(f => f.includes("humos")) || desc.includes("humos");
    const hasPMR = feats.some(f => f.includes("pmr") || f.includes("adaptado") || f.includes("accesib")) || desc.includes("pmr");

    if (facadeMatch) {
      blocks.push({
        id: "facade",
        icon: Store,
        label: L.facade,
        value: facadeMatch[1] + "&nbsp;m"
      });
    } else if (hasEscaparate) {
      blocks.push({
        id: "facade",
        icon: Store,
        label: L.facade,
        value: L.yes
      });
    } else if (hasSalidaHumos) {
      blocks.push({
        id: "smoke",
        icon: Flame,
        label: L.smoke,
        value: L.yes
      });
    } else if (hasPMR) {
      blocks.push({
        id: "access",
        icon: Accessibility,
        label: L.access,
        value: "PMR"
      });
    } else if (property.floor) {
      blocks.push({
        id: "floor",
        icon: Layers,
        label: L.floor,
        value: property.floor.toLowerCase().includes("baja") ? "BAJA" : property.floor.slice(0, 6)
      });
    } else {
      blocks.push({
        id: "condition",
        icon: DoorOpen,
        label: L.condition,
        value: L.street
      });
    }
  } else if (isOffice) {
    blocks.push({
      id: "surface",
      icon: Maximize2,
      label: L.surface,
      value: property.surface + "&nbsp;m²"
    });

    blocks.push({
      id: "bathrooms",
      icon: Bath,
      label: L.baths,
      value: String(property.bathrooms > 0 ? property.bathrooms : 1),
      isNumericOnly: true
    });

    if (property.floor) {
      const isGround = property.floor.toLowerCase().includes("baja");
      blocks.push({
        id: "floor",
        icon: Layers,
        label: L.floor,
        value: isGround ? "BAJA" : property.floor.slice(0, 6).toUpperCase()
      });
    } else {
      blocks.push({
        id: "elevator",
        icon: Building2,
        label: L.elevator,
        value: L.yes
      });
    }
  } else {
    blocks.push({
      id: "bedrooms",
      icon: Bed,
      label: L.rooms,
      value: String(property.bedrooms > 0 ? property.bedrooms : 1),
      isNumericOnly: true
    });

    blocks.push({
      id: "bathrooms",
      icon: Bath,
      label: L.baths,
      value: String(property.bathrooms > 0 ? property.bathrooms : 1),
      isNumericOnly: true
    });

    blocks.push({
      id: "surface",
      icon: Maximize2,
      label: L.surface,
      value: property.surface + "&nbsp;m²"
    });
  }

  return blocks.slice(0, 3);
}

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

  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem("language") as "es" | "en" | "ca";
      if (savedLang === "ca" || savedLang === "en") {
        loadLanguage(savedLang).then(() => {
          setLanguageState(savedLang);
        });
      } else if (savedLang === "es") {
        setLanguageState("es");
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

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInView, setMapInView] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMapInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMapInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Default initial zone based on neighborhood slug
  const initialZone = SLUG_TO_ZONE[rawSlug] || "Cualquier zona";

  // Search console state
  const [searchParams, setSearchParams] = useState({
    mode: "comprar",
    zona: initialZone,
    tipo: "Cualquier tipo",
    precio: "Cualquier precio",
    habitaciones: "Cualquier número"
  });

  const [consoleFilters, setConsoleFilters] = useState({
    tipo: "Cualquier tipo",
    zona: initialZone,
    habitaciones: "Cualquier número",
    precio: "Cualquier precio"
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("recientes");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const heroResetRef = useRef<(() => void) | null>(null);

  // Sync filters whenever user navigates to a different neighborhood page
  useEffect(() => {
    const targetZone = SLUG_TO_ZONE[rawSlug] || "Cualquier zona";
    setSearchParams(prev => ({
      ...prev,
      zona: targetZone
    }));
    setConsoleFilters(prev => ({
      ...prev,
      zona: targetZone
    }));
  }, [rawSlug]);

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
      if (val === 'Cualquier número') return (t.properties as any).anyNumber || (t.properties as any).anyBedrooms || t.properties.anyHab || "Cualquier número";
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

  // Canonical zone for ValuatorSection
  const initialZoneName = Object.keys(ZONE_PRICE_PER_M2).find(
    z => z.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(z.toLowerCase())
  ) || "Centre";

  const handleHeroSearch = (p: { mode: string; zona: string; tipo: string; precio: string }) => {
    setSearchParams({
      mode: p.mode,
      zona: p.zona,
      tipo: p.tipo,
      precio: p.precio,
      habitaciones: "Cualquier número"
    });
    const el = document.getElementById("properties-results") || document.getElementById("propiedades");
    if (el) {
      const navOffset = window.innerWidth < 768 ? 70 : 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
    }
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

  // Filter properties: exclude "vendido" and "alquilado" from the public listing
  // "disponible" and "reservado" remain visible to visitors
  const activeLiveProperties = liveProperties.filter(
    (p) => p.status !== "vendido" && p.status !== "alquilado"
  );

  // Filtered and sorted properties
  const matchesFilter = (prop: ExtendedProperty) => {
    if (searchParams.mode === "favoritos") {
      return favorites.includes(prop.id);
    }
    const pOp = (prop.operation || "comprar") as string;
    const matchesMode = pOp === searchParams.mode || (searchParams.mode === "comprar" && pOp === "compra");
    if (!matchesMode) return false;

    const normalizedSearch = (searchParams.zona || "").toLowerCase().trim();
    const normalizedPropLoc = (prop.location || "").toLowerCase().trim();
    const normalizedCity = ((prop as any).city || "").toLowerCase().trim();
    const matchesZone = searchParams.zona === "Cualquier zona" ||
      normalizedPropLoc.includes(normalizedSearch) ||
      normalizedSearch.includes(normalizedPropLoc) ||
      normalizedCity.includes(normalizedSearch) ||
      (normalizedSearch.includes("santa rosa") && normalizedPropLoc.includes("santa rosa")) ||
      ((normalizedSearch === "centro" || normalizedSearch === "centre") && (normalizedPropLoc === "centro" || normalizedPropLoc === "centre")) ||
      (normalizedSearch.startsWith("riu") && normalizedPropLoc.startsWith("riu")) ||
      (normalizedSearch.includes("singuerlin") && normalizedPropLoc.includes("singuerl")) ||
      (normalizedSearch.includes("fondo") && normalizedPropLoc.includes("fondo"));

    const matchesType = searchParams.tipo === "Cualquier tipo" || prop.type === searchParams.tipo;
    const matchesPrice = isPriceValid(searchParams.precio, prop.price);
    const matchesBeds = searchParams.habitaciones === "Cualquier número" || !searchParams.habitaciones || (
      searchParams.habitaciones.includes("+")
        ? prop.bedrooms >= parseInt(searchParams.habitaciones.replace("+", ""), 10)
        : prop.bedrooms === parseInt(searchParams.habitaciones, 10)
    );
    return matchesZone && matchesType && matchesPrice && matchesBeds;
  };

  const exactMatches = activeLiveProperties
    .filter(matchesFilter)
    .sort((a, b) => {
      if (sortOption === "precio_asc") return a.price - b.price;
      if (sortOption === "precio_desc") return b.price - a.price;
      return 0; // recientes / default order
    });

  // ── SINGLE SOURCE OF TRUTH ──
  // Properties displayed proceed strictly from exactMatches.
  // Count is ALWAYS filteredProperties.length.
  // When count === 0, show empty state and 0 property cards.
  const filteredProperties = exactMatches;
  const displayProperties = filteredProperties.slice(0, visibleCount);

  // Fallback properties across other zones in same mode when current zone has 0
  const relatedProperties = activeLiveProperties
    .filter(p => {
      const pOp = (p.operation || "comprar") as string;
      const targetMode = searchParams.mode === "favoritos" ? "comprar" : searchParams.mode;
      const matchesMode = pOp === targetMode || (targetMode === "comprar" && pOp === "compra");
      return matchesMode;
    })
    .sort((a, b) => {
      if (sortOption === "precio_asc") return a.price - b.price;
      if (sortOption === "precio_desc") return b.price - a.price;
      return 0;
    })
    .slice(0, 6);


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
          initialBarrio={SLUG_TO_ZONE[rawSlug] || undefined}
          onRegisterReset={(fn) => { heroResetRef.current = fn; }}
          customTag={
            language === "ca"
              ? `Barri ${data.name} · Santa\u00A0Coloma`
              : language === "en"
              ? `Neighborhood ${data.name} · Santa\u00A0Coloma`
              : `Barrio ${data.name} · Santa\u00A0Coloma`
          }
          customHeadline={
            <>
              <span className="block text-[#0b214a] sm:whitespace-nowrap">
                {language === "ca"
                  ? "Administració de Finques,"
                  : language === "en"
                  ? "Property Management,"
                  : "Administración de Fincas,"}
              </span>
              <span className="text-[#2563eb] block mt-1">
                {language === "ca" ? `a ${data.name}.` : language === "en" ? `in ${data.name}.` : `en ${data.name}.`}
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
        <section id="seccion-propiedades" className="relative overflow-hidden bg-[#FAF9FC] text-[#111111] py-8 md:py-12 border-t-2 border-[#111111]">
          <div id="propiedades" className="bg-white rounded-[24px] shadow-[4px_4px_0px_#111111] border-2 border-[#111111] p-6 sm:p-8 md:p-10 mx-3 sm:mx-4 md:mx-auto max-w-[1520px] w-[95%] relative z-10 scroll-mt-20 md:scroll-mt-24">
            <div>
              {/* Header: Encabezado Editorial con Gran Presencia Visual + H2 con Underline Equilibrado + Descripción */}
              <div className="mb-6 sm:mb-8">
                {/* Badge Identificador de Categoría */}
                <div className="inline-flex items-center gap-2.5 bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl px-4 py-2 shadow-[2px_2px_0px_#111111] mb-3.5">
                  <MapPin className="w-4 h-4 text-white stroke-[2.5] shrink-0" />
                  <span className="text-[15px] sm:text-[16px] font-headline font-bold tracking-wider uppercase">
                    {language === "ca" ? `IMMOBILIÀRIA · ${data.name.toUpperCase()}` : language === "en" ? `REAL ESTATE · ${data.name.toUpperCase()}` : `INMOBILIARIA · ${data.name.toUpperCase()}`}
                  </span>
                </div>

                {/* Titular principal con DrawnUnderline */}
                <h2 key={language} className="text-3xl sm:text-4xl md:text-[44px] font-headline font-extrabold text-[#111111] leading-[1.15] tracking-tight mb-3 w-full" style={{ textWrap: "balance" }}>
                  {language === "ca" ? (
                    <>Descobreix les nostres{" "}
                      <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                        millors oportunitats.
                        <DrawnUnderline color="#2860F5" className="-bottom-[6px] sm:-bottom-[8px]" />
                      </span>
                    </>
                  ) : language === "en" ? (
                    <>Discover our{" "}
                      <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                        best properties.
                        <DrawnUnderline color="#2860F5" className="-bottom-[6px] sm:-bottom-[8px]" />
                      </span>
                    </>
                  ) : (
                    <>Descubre nuestras{" "}
                      <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                        mejores oportunidades.
                        <DrawnUnderline color="#2860F5" className="-bottom-[6px] sm:-bottom-[8px]" />
                      </span>
                    </>
                  )}
                </h2>

                <p className="text-[#111111] text-[17px] sm:text-[18px] leading-relaxed font-sans font-medium max-w-3xl">
                  {language === "ca"
                    ? `Selecció d'immobles a ${data.name} i Santa Coloma gestionats amb total garantia i transparència per Gesgrama.`
                    : language === "en"
                    ? `Selection of properties in ${data.name} and Santa Coloma managed with full guarantee and transparency by Gesgrama.`
                    : `Selección de inmuebles en ${data.name} y Santa Coloma gestionados con total garantía y transparencia por Gesgrama.`}
                </p>
              </div>

              {/* Unified Results Controls Bar: Fav Button + Counter + Sort Dropdown on Shared Baseline */}
              {/* Unified Results Controls Bar: Favoritos (blanco), Disponibles (azul), Ordenar por (negro #111111 sólido) */}
              <div id="properties-results" className="scroll-mt-24 md:scroll-mt-28 mt-2 mb-6 p-2 sm:p-2.5 bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl shadow-[2px_2px_0px_#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                {/* Left: Favoritos button sólido y redondeado */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, mode: prev.mode === "favoritos" ? "comprar" : "favoritos" }))}
                    className={`h-[48px] px-4 rounded-xl text-[15px] sm:text-[16px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] ${
                      searchParams.mode === "favoritos"
                        ? "bg-red-500 text-white"
                        : "bg-[#FFFFFF] text-[#111111] hover:bg-slate-50"
                    }`}
                  >
                    <Heart className={`w-4.5 h-4.5 fill-current shrink-0 ${searchParams.mode === "favoritos" ? "text-white" : "text-red-500"}`} />
                    <span>Favoritos ({favorites.length})</span>
                  </button>
                </div>

                {/* Right: Counter + Sort en bloque integrado */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
                  {/* Propiedades disponibles: indicador azul, número destacado, 15-16px, alineación vertical */}
                  <div
                    className="flex items-center gap-2.5 bg-[#FFFFFF] border-2 border-[#111111] rounded-xl px-4 h-[48px] shadow-[2px_2px_0px_#111111]"
                    aria-label={`${filteredProperties.length} ${t.properties.availableCount}`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#2860F5] shrink-0" />
                    <span className="text-[15px] sm:text-[16px] font-data-mono font-black text-[#111111] tabular-nums">
                      {filteredProperties.length}
                    </span>
                    <span className="text-[14px] sm:text-[15px] font-headline font-bold text-[#111111] leading-none">
                      {t.properties.availableCount}
                    </span>
                  </div>

                  {/* Ordenar por: Negro sólido #111111, texto blanco, flecha blanca, 15-16px, esquinas redondeadas 14px, hover discreto */}
                  <div className="flex items-center gap-2 relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === "ordenar" ? null : "ordenar")}
                      className="h-[48px] flex items-center gap-2.5 bg-[#111111] hover:bg-[#222222] text-white border-2 border-[#111111] rounded-[14px] px-4 py-2 font-headline font-bold text-[14px] sm:text-[15px] tracking-wide transition-all shadow-[2px_2px_0px_#2860F5] cursor-pointer"
                    >
                      <span className="text-slate-300 font-bold uppercase tracking-wider text-[12px] hidden sm:inline">{t.properties.sortBy}:</span>
                      <span className="text-white font-bold">
                        {sortOption === "precio_asc" ? t.properties.precioMenor : sortOption === "precio_desc" ? t.properties.precioMayor : t.properties.mostRecent}
                      </span>
                      <ChevronDown className="w-4.5 h-4.5 text-white shrink-0 stroke-[2.5]" />
                    </button>

                    {openDropdown === "ordenar" && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-[#111111] text-white border-2 border-[#111111] rounded-xl shadow-[4px_4px_0px_#2860F5] z-50 p-2 space-y-1">
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
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-headline font-bold text-left transition-all cursor-pointer border ${
                              sortOption === opt.value
                                ? "bg-[#2860F5] text-white border-white/20 shadow-xs"
                                : "border-transparent hover:border-slate-700 text-slate-200 hover:bg-[#222222] hover:text-white"
                            }`}
                          >
                            <span className="leading-snug">{opt.label}</span>
                            {sortOption === opt.value && <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />}
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
                  const specs = getDynamicPropertySpecs(property, language);

                  // Ubicación estructurada: Barrio principal destacado + Municipio secundario
                  const rawLocation = pData.location || property.location || "Santa Coloma";
                  const barrioName = formatLocation(rawLocation, language);
                  const cityName = property.city || (rawLocation.toLowerCase().includes("barcelona") ? "Barcelona" : rawLocation.toLowerCase().includes("badalona") ? "Badalona" : "Santa Coloma de Gramenet");

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
                                <span className={`w-2 h-2 ${isRent ? "bg-amber-400" : "bg-[#2860F5]"}`} />
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
                                isFav ? "bg-red-500 text-white shadow-[2px_2px_0px_#111111]" : "bg-white text-[#111111] hover:bg-slate-100 shadow-[2px_2px_0px_#111111]"
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

                          {/* 2. ZONA INFORMATIVA ESTRUCTURADA: UBICACIÓN PROTAGONISTA (44-48PX ICONO AZUL + 27-30PX BARRIO) */}
                          <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                            <div>
                              {/* BLOQUE PROTAGONISTA DE UBICACIÓN */}
                              <div className="flex items-center gap-3 sm:gap-3.5 mb-3">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-[#2860F5] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0">
                                  <MapPin className="w-6 h-6 text-white stroke-[2.5]" />
                                </div>

                                <div className="min-w-0 flex flex-col justify-center">
                                  <span className="text-[25px] sm:text-[28px] md:text-[30px] font-headline font-extrabold text-[#111111] leading-none tracking-tight truncate uppercase">
                                    {barrioName}
                                  </span>
                                  <span className="text-[12px] sm:text-[13px] font-sans font-semibold text-slate-600 truncate mt-1">
                                    {cityName}
                                  </span>
                                </div>
                              </div>

                              {/* Título Inmueble con excelente presencia */}
                              <h3 className="text-[18px] sm:text-[19px] font-headline font-bold text-[#111111] mb-4 leading-snug group-hover:text-[#2860F5] transition-colors line-clamp-1">
                                {pData.name}
                              </h3>

                              {/* Rejilla de Características Dinámicas según el Inmueble */}
                              <div className={`grid ${specs.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2.5 mb-5`}>
                                {specs.map((item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <div
                                      key={item.id}
                                      className="bg-white border-2 border-[#111111] rounded-[14px] p-2 sm:p-2.5 flex flex-col items-center justify-center text-center shadow-[2px_2px_0px_#111111] min-w-0"
                                    >
                                      <div className="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-lg bg-[#2860F5] border border-[#111111] flex items-center justify-center mb-1.5 shrink-0">
                                        <IconComponent className="w-6 h-6 text-white stroke-[2.5]" />
                                      </div>
                                      <span className="text-[11px] sm:text-[12px] font-headline font-bold text-[#111111] uppercase tracking-wider block truncate w-full">
                                        {item.label}
                                      </span>
                                      <span
                                        className={`${item.isNumericOnly ? "text-[18px] sm:text-[22px]" : "text-[14px] sm:text-[16px]"} font-data-mono font-black text-[#111111] leading-tight block whitespace-nowrap`}
                                        dangerouslySetInnerHTML={{ __html: item.value }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 3. PRECIO DESTACADO & ACCIÓN EDITORIAL */}
                            <div className="pt-4 border-t-2 border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex flex-col min-w-0">
                                <span className="text-[11px] sm:text-[12px] font-headline font-bold uppercase tracking-wider text-slate-500">
                                  {isRent
                                    ? (language === "ca" ? "PREU DE LLOGUER" : language === "en" ? "RENTAL PRICE" : "PRECIO DE ALQUILER")
                                    : (language === "ca" ? "PREU DE VENDA" : language === "en" ? "SALE PRICE" : "PRECIO DE VENTA")}
                                </span>
                                <div className="flex items-baseline whitespace-nowrap mt-0.5">
                                  <span className="text-[24px] sm:text-[28px] font-data-mono font-extrabold text-[#111111] leading-none tracking-tight">
                                    {new Intl.NumberFormat("es-ES").format(property.price)}&nbsp;€
                                  </span>
                                  {isRent && (
                                    <span className="text-[15px] sm:text-[16px] font-data-mono font-bold text-[#111111] ml-1.5">
                                      /mes
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="h-[50px] sm:h-[52px] px-5 bg-[#2860F5] group-hover:bg-[#111111] text-white border-2 border-[#111111] rounded-[12px] shadow-[3px_3px_0px_#111111] flex items-center justify-center gap-2.5 font-headline font-black text-[14px] sm:text-[15px] uppercase tracking-wider transition-all shrink-0">
                                <span>{t.properties.verDetalles || "Ver Detalles"}</span>
                                <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
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
                              heroResetRef.current?.();
                            }}
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer font-sans"
                          >
                            {language === "ca" ? "Veure catàleg" : language === "en" ? "View catalog" : "Ver catálogo"}
                          </button>
                        </div>

                        {/* Showcase available properties in nearby Santa Coloma zones */}
                        {relatedProperties.length > 0 && (
                          <div className="mb-10">
                            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200">
                              <div>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-1">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{language === "ca" ? "Oportunitats en altres barris de Santa Coloma" : language === "en" ? "Opportunities in other neighborhoods" : "Oportunidades en otros barrios de Santa Coloma"}</span>
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight">
                                  {language === "ca" ? "Immobles disponibles actualment" : language === "en" ? "Currently available properties" : "Inmuebles disponibles actualmente"}
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
                                  setSearchParams({
                                    mode: currentMode,
                                    zona: "Cualquier zona",
                                    tipo: "Cualquier tipo",
                                    precio: "Cualquier precio",
                                    habitaciones: "Cualquier número"
                                  });
                                  heroResetRef.current?.();
                                  setVisibleCount(999);
                                  const el = document.getElementById('propiedades');
                                  if (el) {
                                    const pos = el.getBoundingClientRect().top + window.scrollY - 130;
                                    window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
                                  }
                                }}
                                className="btn-lift active:scale-95 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer font-sans select-none"
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 transition-opacity duration-300"
                      >
                        {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                      </div>
                    )}

                    {/* LOAD MORE BUTTON */}
                    {filteredProperties.length > 0 && (
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
                                const currentMode = searchParams.mode === "alquilar" ? "alquilar" : "comprar";
                                setSearchParams({
                                  mode: currentMode,
                                  zona: "Cualquier zona",
                                  tipo: "Cualquier tipo",
                                  precio: "Cualquier precio",
                                  habitaciones: "Cualquier número"
                                });
                                heroResetRef.current?.();
                                setVisibleCount(999);
                                const el = document.getElementById('propiedades');
                                if (el) {
                                  const pos = el.getBoundingClientRect().top + window.scrollY - 130;
                                  window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
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
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ── 2. TESTIMONIOS CANÓNICOS (GOOGLE REVIEWS CON 5 ESTRELLAS) ── */}
        <section id="nosotros" className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] scroll-mt-24 border-b-2 border-[#111111]">
          <div id="testimonios" className="-top-32 relative block invisible" />
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Cabecera Editorial Limpia */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b-2 border-[#111111]">
              <div>
                {/* Etiqueta azul sólida redondeada con estrella */}
                <div className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[12px] sm:text-[13px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-3">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                  <span>{language === "ca" ? "OPINIONS DE CLIENTS" : language === "en" ? "CLIENT REVIEWS" : "OPINIONES DE CLIENTES"}</span>
                </div>

                {/* Titular grande con detalle Drawn orgánico */}
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-headline font-black text-[#111111] tracking-tight leading-tight mb-4">
                  <span>{language === "ca" ? "El que diuen els nostres " : language === "en" ? "What our clients " : "Lo que dicen nuestros "}</span>
                  <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                    {language === "ca" ? `veïns a ${data.name}.` : language === "en" ? `clients in ${data.name}.` : `vecinos en ${data.name}.`}
                    <DrawnUnderline color="#2860F5" />
                  </span>
                </h2>
                
                <p className="text-[18px] sm:text-[19px] font-sans font-medium text-[#111111] leading-relaxed max-w-xl pt-1">
                  {t.testimonios.subtitle}
                </p>
              </div>

              {/* Acreditación de Google integrada en cabecera */}
              <div className="lg:max-w-md shrink-0">
                <div className="inline-flex items-center gap-3 bg-[#FFFFFF] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] px-5 py-3">
                  <GoogleIcon className="w-6 h-6 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[14px] sm:text-[15px] font-headline font-black text-[#111111] leading-none">
                      {language === "ca" ? "Ressenyes verificades" : language === "en" ? "Verified reviews" : "Reseñas verificadas"}
                    </span>
                    <span className="text-[12px] font-headline font-bold text-[#2860F5] mt-0.5">
                      Google Business Profile
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Opiniones con Jerarquía: Central Destacada en Azul #2860F5 + Complementarias Blancas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {t.testimonios.items.map((item, i) => {
                const initials = ["F", "A", "C"];
                const isFeatured = i === 1;

                return (
                  <div 
                    key={item.author} 
                    className={`rounded-2xl border-2 border-[#111111] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                      isFeatured
                        ? "bg-[#2860F5] text-white shadow-[4px_4px_0px_#111111] md:-translate-y-1.5"
                        : "bg-[#FFFFFF] text-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#2860F5]"
                    }`}
                  >
                    <div>
                      {/* Top Row: Stars + Google Badge Integrado */}
                      <div className={`flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 ${isFeatured ? "border-white/30" : "border-[#111111]"}`}>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                          ))}
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-headline font-black tracking-wider uppercase rounded-lg border ${
                          isFeatured ? "bg-white text-[#111111] border-white" : "bg-[#111111] text-white border-[#111111]"
                        }`}>
                          <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>Google</span>
                        </div>
                      </div>

                      {/* Texto de Reseña de 16-17px */}
                      <p className={`text-[16px] sm:text-[17px] font-medium leading-relaxed mb-6 ${isFeatured ? "text-white" : "text-[#111111]"}`}>
                        “{item.quote}”
                      </p>
                    </div>

                    {/* Fila de Autor y Verificación */}
                    <div className={`pt-4 border-t-2 ${isFeatured ? "border-white/30" : "border-[#111111]"} flex items-center justify-between gap-3 mt-auto`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-full font-headline font-black text-sm flex items-center justify-center shrink-0 border-2 ${
                          isFeatured ? "bg-white text-[#2860F5] border-white" : "bg-[#2860F5] text-white border-[#111111]"
                        }`}>
                          {initials[i % initials.length]}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <strong className={`font-headline font-black text-[15px] sm:text-[16px] truncate ${isFeatured ? "text-white" : "text-[#111111]"}`}>
                            {item.author}
                          </strong>
                          <span className={`text-[12px] font-data-mono font-bold ${isFeatured ? "text-blue-100" : "text-slate-500"}`}>
                            {item.time}
                          </span>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-headline font-black border rounded-full px-2.5 py-1 shrink-0 ${
                        isFeatured
                          ? "bg-white text-[#2860F5] border-white"
                          : "bg-[#2860F5] text-white border-[#111111]"
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{language === "ca" ? "Verificat" : language === "en" ? "Verified" : "Verificado"}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── 3. SERVICIOS INTEGRALES CORPORATIVOS (GRID 2x2 HORIZONTAL CON MODAL) ── */}
        <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#111111] border-2 border-[#111111] neo-shadow-lg p-4 sm:p-6 md:p-7 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-white">
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
                  <Scale key={2} className="w-5 h-5" />,
                  <Wrench key={3} className="w-5 h-5" />
                ];
                const bgs = [
                  "/images/service-1.webp",
                  "/images/service-2.webp",
                  "/images/service-3.webp",
                  "/images/service-4.webp"
                ];
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div 
                      onClick={() => setSelectedServiceIndex(i)}
                      className="group bg-white text-[#0f172a] rounded-xl md:rounded-2xl p-3.5 md:p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 h-full border-2 border-slate-100 hover:border-[#0284c7] cursor-pointer"
                    >
                      <div className="relative w-full sm:w-[120px] h-[95px] sm:h-[105px] rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-xs">
                        <img 
                          src={bgs[i]} 
                          alt={item.title} 
                          loading="lazy" 
                          decoding="async"
                          width={120}
                          height={105}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-7 h-7 rounded-lg bg-[#0b214a] text-white flex items-center justify-center shrink-0 shadow-xs">
                              {icons[i]}
                            </span>
                            <h3 className="text-base sm:text-lg md:text-xl font-black text-[#0f172a] leading-snug group-hover:text-[#0369a1] transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-3">
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

        {/* ── 4. VALORADOR DE INMUEBLES SIMPLIFICADO ORIENTADO A CONVERSIÓN ── */}
        <ValuatorSection
          language={language}
          t={t}
          zonas={zonas}
          shouldReduceMotion={shouldReduceMotion}
          initialZona={SLUG_TO_ZONE[rawSlug] || initialZoneName}
        />

        {/* ── 5. ÁREA DE COBERTURA Y SEDE CENTRAL (MAPA CON PÍLDORAS DE BARRIOS) ── */}
        <section id="cobertura" className="py-6 md:py-10 px-4 md:px-8 bg-[#FAF9FC] border-b-2 border-[#111111] text-white scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#111111] border-2 border-[#111111] neo-shadow-lg p-4 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden">
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
                    {allBarrios.slice(0, -2).map(b => {
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
                    {/* Pair the last two barrios together so Cementiri Vell is never orphaned on its own row */}
                    <div className="inline-flex flex-wrap gap-1.5 sm:gap-2">
                      {allBarrios.slice(-2).map(b => {
                        const isCurrent = b.slug === data.slug;
                        return (
                          <Link
                            key={b.slug}
                            to="/administrador-fincas/$city"
                            params={{ city: b.slug }}
                            className={`text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border transition-all flex items-center gap-1 shrink-0 ${
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
                      className="w-full md:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans whitespace-nowrap"
                    >
                      <span>{t.hero.contacto}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <div 
                ref={mapContainerRef}
                className="w-full lg:w-1/2 relative h-[280px] sm:h-[330px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden border-[3px] border-[#2563eb] bg-[#e8ecf1] shadow-lg group"
              >
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

                {mapInView && (
                  <iframe
                    title="Ubicación de Gesgrama en Santa Coloma de Gramenet"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1s${language}!2ses!4v1700000000000!5m2!1s${language}!2ses`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    onLoad={() => setMapLoaded(true)}
                    referrerPolicy="no-referrer-when-downgrade"
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-auto transition-opacity duration-700 ease-out ${
                      mapLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}

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
                      <>Parlem de la teva <span className="relative inline-block text-[#2860F5] whitespace-nowrap">comunitat a {data.name}?<DrawnUnderline color="#2860F5" /></span></>
                    ) : language === "en" ? (
                      <>Let's talk about your <span className="relative inline-block text-[#2860F5] whitespace-nowrap">community in {data.name}<DrawnUnderline color="#2860F5" /></span></>
                    ) : (
                      <>¿Hablamos de tu <span className="relative inline-block text-[#2860F5] whitespace-nowrap">comunidad en {data.name}?<DrawnUnderline color="#2860F5" /></span></>
                    )}
                  </h2>
                  
                  <p className="text-[18px] sm:text-[19px] text-[#111111] font-medium leading-relaxed mb-6 max-w-xl">
                    {language === "ca" 
                      ? `Administració transparent, resposta àgil i optimització de costos garantida per a les finques de ${data.name}.` 
                      : language === "en" 
                      ? `Transparent management, agile response and guaranteed cost optimization for properties in ${data.name}.` 
                      : `Administración transparente, respuesta ágil y optimización de costes garantizada para las fincas de ${data.name}.`}
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
                      className="h-[56px] px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
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

        {/* ── 7. ARTÍCULOS Y NOTICIAS INFORMATIVAS (BLOG) ── */}
        <section id="blog" className="py-14 sm:py-18 bg-[#FFFFFF] text-[#111111] border-b-2 border-[#111111]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Cabecera Editorial */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-[#111111]">
              <div>
                <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#2860F5] mb-4">
                  <span className="w-2 h-2 bg-[#2860F5]" />
                  <span>{t.noticias.tag} · {data.name}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight">
                  <>{t.noticias.title1} <span className="relative inline-block text-[#2860F5] whitespace-nowrap">{t.noticias.title2}<DrawnUnderline color="#2860F5" /></span></>
                </h2>
              </div>
              
              <div className="lg:max-w-md">
                <p className="text-[17px] text-[#111111] font-bold leading-relaxed bg-[#FAF9FC] p-4 border-2 border-[#111111] rounded-2xl shadow-[2px_2px_0px_#111111]">
                  {t.noticias.subtitle}
                </p>
              </div>
            </div>

            {(() => {
              const barrioArticleMap: Record<string, string> = {
                "fondo": "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
                "santa-rosa": "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
                "can-mariner": "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
                "riera-alta": "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
                "llati": "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
                "el-raval": "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
                "riu-nord": "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
                "riu-sud": "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
                "les-oliveres": "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
                "can-franquesa": "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
                "singuerlin": "guia-alquilar-vender-piso-singuerlin-centre-santa-coloma",
                "centre": "guia-alquilar-vender-piso-singuerlin-centre-santa-coloma"
              };
              const prioritizedSlug = barrioArticleMap[rawSlug];
              let list = articles;
              if (prioritizedSlug) {
                const primary = articles.find((a) => a.slug === prioritizedSlug);
                const others = articles.filter((a) => a.slug !== prioritizedSlug);
                list = primary ? [primary, ...others] : articles;
              }
              const displayList = list.slice(0, 4);

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 items-stretch">
                  {displayList.map((art) => {
                    const artContent = (art as any)[language] || (art as any).es;
                    const title = artContent?.title || "";
                    const summary = artContent?.summary || "";
                    const date = artContent?.date || "";
                    return (
                      <div 
                        key={art.id} 
                        className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#2860F5] hover:border-[#2860F5] transition-all flex flex-col justify-between group cursor-pointer overflow-hidden"
                      >
                        <div>
                          <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/9] overflow-hidden bg-slate-100 border-b-2 border-[#111111] cursor-pointer">
                            <img
                              src={art.image}
                              alt={title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                          <div className="p-5 sm:p-6">
                            <div className="flex items-center gap-2 text-xs font-headline font-black text-slate-500 mb-2">
                              <Calendar className="w-3.5 h-3.5 text-[#2860F5]" />
                              <span>{date}</span>
                            </div>
                            <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-headline font-black text-[17px] sm:text-[18px] text-[#111111] leading-snug mb-3 group-hover:text-[#2860F5] transition-colors line-clamp-2">
                              {title}
                            </Link>
                            <p className="text-[14px] text-slate-600 font-medium leading-relaxed line-clamp-3">
                              {summary}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 pt-0 mt-auto">
                          <div className="pt-3 border-t-2 border-[#111111] flex items-center justify-between">
                            <Link
                              to="/noticias/$slug"
                              params={{ slug: art.slug }}
                              className="inline-flex items-center gap-2 text-[13px] font-headline font-black uppercase tracking-wider text-[#2860F5] hover:text-[#111111] transition-colors"
                            >
                              <span>{t.noticias.seguirLeyendo}</span>
                              <ArrowRight className="w-4 h-4 text-[#2860F5] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <div className="text-center mt-6">
              <Link
                to="/noticias"
                className="h-[52px] px-8 bg-[#2860F5] hover:bg-[#174bcb] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] font-headline font-black text-[14px] sm:text-[15px] uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>{t.noticias.verTodasBtn}</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 8. FAQS DEL BARRIO (FORMATO CANÓNICO DE GESGRAMA) ── */}
        <section 
          id="faq" 
          className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] border-b-2 border-[#111111] scroll-mt-24"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Cabecera FAQ Sólida con Drawn Underline */}
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-4 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-4">
                <HelpCircle className="w-4 h-4 text-white" />
                <span>{t.faq.tag} · {data.name}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight text-[#111111] tracking-tight mb-4">
                <span>{language === "ca" ? "Preguntes freqüents a " : language === "en" ? "Common questions in " : "Preguntas frecuentes en "}</span>
                <span className="relative inline-block text-[#2860F5]">
                  {data.name}
                  <DrawnUnderline color="#2860F5" />
                </span>
              </h2>

              <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
                {language === "ca"
                  ? `Respostes clares dels nostres administradors col·legiats per a les comunitats de veïns a ${data.name}.`
                  : language === "en"
                  ? `Straightforward answers from our chartered property managers for buildings in ${data.name}.`
                  : `Respuestas claras de nuestros administradores colegiados para las comunidades de propietarios en ${data.name}.`}
              </p>
            </div>

            {/* Acordeón Rounded Neo-Brutalist: Tarjetas blancas redondeadas sobre fondo gris claro #FAF9FC */}
            <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-10">
              {getNeighborhoodFaqs(data.slug, language, data.faqs).map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveFaq(isActive ? null : idx)}
                    className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] p-5 sm:p-6 transition-all cursor-pointer hover:shadow-[4px_4px_0px_#2860F5]"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="w-8 h-8 rounded-xl bg-[#2860F5] text-white font-data-mono font-black text-sm flex items-center justify-center shrink-0 border border-[#111111]">
                          0{idx + 1}
                        </span>
                        <h3 className="font-headline font-bold text-[17px] sm:text-[18px] text-[#111111] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-xl border-2 border-[#111111] flex items-center justify-center shrink-0 transition-all ${
                        isActive ? "bg-[#111111] text-white" : "bg-[#FAF9FC] text-[#111111]"
                      }`}>
                        <span className="text-xl font-bold leading-none select-none">{isActive ? "−" : "+"}</span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="pt-4 mt-4 border-t-2 border-[#111111] text-[#111111] text-[15px] sm:text-[16px] leading-relaxed font-sans font-medium">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <a 
                href="#formulario-contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const formEl = document.getElementById("formulario-contacto");
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    const inputEl = formEl.querySelector("input") as HTMLInputElement | null;
                    if (inputEl) setTimeout(() => inputEl.focus({ preventScroll: true }), 400);
                  }
                }}
                className="h-[52px] px-8 bg-[#111111] hover:bg-[#222222] text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#2860F5] font-headline font-black text-[14px] sm:text-[15px] uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>{t.faq.askDoubt}</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 9. FORMULARIO DE CONTACTO CANÓNICO CON VALIDACIÓN ── */}
        <section id="contacto" className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] scroll-mt-28 md:scroll-mt-32 border-b-2 border-[#111111]">
          <div className="bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-10 md:p-12 mx-auto max-w-[1360px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Reveal>
                  <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-5 sm:mb-6 w-fit">
                    {t.contacto.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-5 sm:mb-6 leading-[1.2] sm:leading-[1.18] tracking-tight font-sans">
                    {t.contacto.title1.startsWith("¿") ? (
                      <>
                        <span className="mr-1 inline-block">¿</span>
                        {t.contacto.title1.slice(1)}
                      </>
                    ) : (
                      t.contacto.title1
                    )}{" "}
                    <span className="relative inline-block text-[#2563eb]">
                      {t.contacto.title2.endsWith("?") ? (
                        <>
                          {t.contacto.title2.slice(0, -1)}
                          <span className="ml-1.5 inline-block">?</span>
                        </>
                      ) : (
                        t.contacto.title2
                      )}
                      <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#2563eb]" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                        <path d="M0,7 Q25,0 50,7 T100,7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bold font-sans mb-7 sm:mb-8 max-w-xl">
                    {language === "ca" 
                      ? `Necessites un gestor a ${data.name}? Deixa'ns les teves dades i t'atendrem immediatament.`
                      : language === "en"
                      ? `Need a property manager in ${data.name}? Leave your details and we will assist you immediately.`
                      : `¿Necesitas un administrador colegiado en ${data.name}? Déjanos tus datos y te atenderemos de inmediato.`}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-[#f8fafc] border border-slate-200 p-3 rounded-xl shadow-2xs">
                      <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                      <div>
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
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <div id="formulario-contacto" className="bg-white border-2 border-[#111111] p-6 sm:p-8 rounded-[20px] shadow-[3px_3px_0px_#111111] scroll-mt-28 md:scroll-mt-32">
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

                        const payload = {
                          _subject: `🏢 Solicitud Fincas Gesgrama [Barrio: ${data.name}]: ${contactForm.asunto || "Gestión de Comunidad"} (${contactForm.nombre})`,
                          _template: "table",
                          _captcha: "false",
                          "Nombre y Apellidos": contactForm.nombre,
                          "Teléfono / WhatsApp": contactForm.telefono,
                          "Correo Electrónico": contactForm.email,
                          "Barrio / Zona": data.name,
                          "Motivo de Contacto": contactForm.asunto,
                          "Mensaje": contactForm.mensaje || "Solicitud de información sobre administración de fincas",
                          "Página de Origen": typeof window !== "undefined" ? window.location.href : `https://gesgrama.com/administrador-fincas/${data.slug}`,
                          "Fecha de Envío": new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
                        };

                        const web3Payload = {
                          access_key: "29166dd1-5523-42cd-b759-6875c7977d14",
                          subject: `🏢 Solicitud Fincas Gesgrama [Barrio: ${data.name}]: ${contactForm.asunto || "Gestión de Comunidad"} (${contactForm.nombre})`,
                          from_name: "Web Gesgrama",
                          name: contactForm.nombre,
                          phone: contactForm.telefono,
                          email: contactForm.email,
                          barrio_zona: data.name,
                          asunto: contactForm.asunto,
                          mensaje: contactForm.mensaje || "Solicitud de información sobre administración de fincas",
                          pagina_origen: typeof window !== "undefined" ? window.location.href : `https://gesgrama.com/administrador-fincas/${data.slug}`,
                          fecha_envio: new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })
                        };

                        const resetCityFormSuccess = () => {
                          setIsSubmittedSuccess(true);
                          setContactForm({
                            nombre: "",
                            telefono: "",
                            email: "",
                            asunto: `Gestión de Comunidades en ${data.name || "Santa Coloma"}`,
                            mensaje: "",
                            privacidad: false
                          });
                          setTimeout(() => {
                            setIsSubmittedSuccess(false);
                          }, 4000);
                        };

                        const triggerCityWhatsAppFallback = () => {
                          const fallbackMsg = `Hola Gesgrama, os contacto desde la web [Barrio: ${data.name}]:\n- Nombre: ${contactForm.nombre}\n- Teléfono: ${contactForm.telefono}\n- Email: ${contactForm.email}\n- Motivo: ${contactForm.asunto}\n- Mensaje: ${contactForm.mensaje || "Solicitud de información"}`;
                          window.open(`https://wa.me/34688320490?text=${encodeURIComponent(fallbackMsg)}`, "_blank");
                        };

                        // 1er intento: Web3Forms
                        fetch("https://api.web3forms.com/submit", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                          },
                          body: JSON.stringify(web3Payload)
                        })
                          .then(async (res) => {
                            const resData = await res.json().catch(() => ({}));
                            if (res.ok && (resData.success === true || resData.success === "true")) {
                              resetCityFormSuccess();
                            } else {
                              // 2do intento: FormSubmit
                              fetch("https://formsubmit.co/ajax/info@gesgrama.com", {
                                method: "POST",
                                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                                body: JSON.stringify(payload)
                              })
                                .then(async (res2) => {
                                  const data2 = await res2.json().catch(() => ({}));
                                  if (res2.ok && (data2.success === true || data2.success === "true")) {
                                    resetCityFormSuccess();
                                  } else {
                                    triggerCityWhatsAppFallback();
                                  }
                                })
                                .catch(() => triggerCityWhatsAppFallback());
                            }
                          })
                          .catch(() => {
                            fetch("https://formsubmit.co/ajax/info@gesgrama.com", {
                              method: "POST",
                              headers: { "Content-Type": "application/json", "Accept": "application/json" },
                              body: JSON.stringify(payload)
                            })
                              .then(async (res2) => {
                                const data2 = await res2.json().catch(() => ({}));
                                if (res2.ok && (data2.success === true || data2.success === "true")) {
                                  resetCityFormSuccess();
                                } else {
                                  triggerCityWhatsAppFallback();
                                }
                              })
                              .catch(() => triggerCityWhatsAppFallback());
                          })
                          .finally(() => {
                            setIsSubmittingContact(false);
                          });
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
        <section id="final-cta" className="py-14 sm:py-20 bg-[#FAF9FC] text-[#111111] border-b-2 border-[#111111]">
          <div className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-10 md:p-12 max-w-[1360px] mx-auto relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
              <div className="w-full lg:w-7/12 text-left py-0 lg:py-1">
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-3">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{t.finalCta.tag}</span>
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-2.5 leading-tight tracking-tight font-sans">
                    {t.finalCta.title1.startsWith("¿") ? (
                      <>
                        <span className="mr-1 inline-block">¿</span>
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
                      className="w-full sm:w-auto bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <Phone className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">{t.finalCta.btnContact}</span>
                    </a>
                  </div>
                </Reveal>
              </div>

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
                <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA Y ENLACES LOCALIZADOS ── */}
      <Footer language={language} />

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
            {/* Top Brand Color Banner with Solid Navy Background and Clear Iconography */}
            <div className="relative bg-[#0b214a] p-6 sm:p-8 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <button
                type="button"
                onClick={() => setSelectedServiceIndex(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:scale-105 z-10"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-lg border border-white/90">
                  {selectedServiceIndex === 0 && <Building2 className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 1 && <TrendingUp className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 2 && <Scale className="w-7 h-7 stroke-[2.2]" />}
                  {selectedServiceIndex === 3 && <Wrench className="w-7 h-7 stroke-[2.2]" />}
                </div>
                <div>
                  <span className="inline-block bg-[#2563eb] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full mb-1 font-sans shadow-xs">
                    {t.servicios.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                    {t.serviceModal.items[selectedServiceIndex]?.title}
                  </h3>
                </div>
              </div>

              <p className="text-blue-100 text-xs sm:text-sm font-semibold mt-3 font-sans leading-snug relative z-10">
                {t.serviceModal.items[selectedServiceIndex]?.tagline}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium font-sans">
                {t.serviceModal.items[selectedServiceIndex]?.description}
              </p>

              {/* Benefits with SOLID container and high contrast white title & distinct checkmarks */}
              <div className="bg-[#0b214a] rounded-2xl p-5 sm:p-6 text-white space-y-3.5 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-sans">
                    {language === "ca" ? "Què inclou el servei:" : language === "en" ? "What's included:" : "Qué incluye el servicio:"}
                  </p>
                </div>
                {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-100 font-sans">
                    <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                    </div>
                    <span className="leading-snug pt-0.5">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="#formulario-contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedServiceIndex(null);
                    setTimeout(() => {
                      const formEl = document.getElementById("formulario-contacto") || document.getElementById("contacto");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                        if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 400);
                      }
                    }, 50);
                  }}
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
