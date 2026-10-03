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
  Info,
  Maximize2
} from "lucide-react";
import ValuatorSection from "@/components/ValuatorSection";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { getNeighborhoodFaqs } from "@/data/barrioFaqsI18n";
import { properties, formatLocation } from "@/data/properties";
import { subscribeProperties, fetchProperties, getLocalProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";
import { homeArticles as articles } from "@/data/homeArticles";
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
    const matchesZone = searchParams.zona === "Cualquier zona" ||
      normalizedPropLoc.includes(normalizedSearch) ||
      normalizedSearch.includes(normalizedPropLoc) ||
      (normalizedSearch.startsWith("santa rosa") && normalizedPropLoc.startsWith("santa rosa")) ||
      ((normalizedSearch === "centro" || normalizedSearch === "centre") && (normalizedPropLoc === "centro" || normalizedPropLoc === "centre")) ||
      (normalizedSearch.startsWith("riu") && normalizedPropLoc.startsWith("riu"));

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
        <section id="seccion-propiedades" className="relative overflow-hidden bg-[#f5f6f8] text-slate-900 py-6 md:py-10 border-t border-slate-200">
          <div id="propiedades" className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 mx-4 md:mx-auto max-w-[1320px] relative z-10 scroll-mt-20 md:scroll-mt-24">
            <div>
              {/* Header: Badge + H2 + Description with balanced spacing */}
              <div className="mb-4 sm:mb-5">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-2.5 font-sans">
                  <Home className="w-3.5 h-3.5 text-white" />
                  <span>{t.properties.tag}</span>
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] leading-tight tracking-tight mb-2 font-sans w-full">
                  {t.properties.title1} <span className="text-[#2563eb]">{t.properties.title2}</span>
                </h2>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold font-sans max-w-3xl text-balance">
                  {t.properties.subtitle}
                </p>
              </div>

              {/* Unified Results Controls Bar: Fav Button + Counter + Sort Dropdown on Shared Baseline */}
              <div id="properties-results" className="scroll-mt-24 md:scroll-mt-28 mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 w-full">
                {/* Left: Favoritos button */}
                <div className="flex items-center self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSearchParams(prev => ({ ...prev, mode: prev.mode === "favoritos" ? "comprar" : "favoritos" }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans whitespace-nowrap border shadow-xs ${
                      searchParams.mode === "favoritos"
                        ? "bg-red-600 text-white border-red-600 shadow-sm"
                        : "bg-white text-[#0f172a] hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 fill-current shrink-0 ${searchParams.mode === "favoritos" ? "text-white" : "text-red-500"}`} />
                    <span>Fav ({favorites.length})</span>
                  </button>
                </div>

                {/* Right: Counter + Sort */}
                <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-6 shrink-0 self-stretch sm:self-center">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0f172a] font-sans">
                    <span className="w-2 h-2 rounded-full bg-[#2563eb] inline-block shrink-0" />
                    <span>
                      <strong className="text-[#2563eb] font-black">{filteredProperties.length}</strong> {t.properties.availableCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm relative" onClick={(e) => e.stopPropagation()}>
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] font-sans hidden sm:inline">{t.properties.sortBy}:</span>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === "ordenar" ? null : "ordenar")}
                      className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-[#2563eb] rounded-xl px-3 py-1.5 font-bold text-[#0f172a] hover:text-[#2563eb] transition-all shadow-2xs font-sans text-xs sm:text-sm cursor-pointer"
                    >
                      <span>{sortOption === "precio_asc" ? t.properties.precioMenor : sortOption === "precio_desc" ? t.properties.precioMayor : t.properties.mostRecent}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    </button>

                    {openDropdown === "ordenar" && (
                      <div className="absolute top-full right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-50 p-1.5 divide-y divide-slate-100">
                        {[
                          { label: t.properties.mostRecent, value: "recientes" },
                          { label: t.properties.precioMenor, value: "precio_asc" },
                          { label: t.properties.precioMayor, value: "precio_desc" }
                        ].map(opt => (
                          <div key={opt.value} className="py-0.5 first:pt-0 last:pb-0">
                            <button
                              onClick={() => {
                                setSortOption(opt.value);
                                setOpenDropdown(null);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer font-ui-clean tracking-normal border ${
                                sortOption === opt.value ? "bg-[#2563eb] text-white border-[#2563eb] shadow-xs" : "border-transparent hover:border-blue-100 text-slate-800 hover:bg-blue-50/50"
                              }`}
                            >
                              <span className="leading-snug">{opt.label}</span>
                              {sortOption === opt.value && <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.5]" />}
                            </button>
                          </div>
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
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {searchParams.zona}
                    </span>
                  )}
                  {searchParams.tipo !== "Cualquier tipo" && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                      <Home className="w-3 h-3 shrink-0" />
                      {searchParams.tipo}
                    </span>
                  )}
                  {searchParams.precio !== "Cualquier precio" && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
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
                    <div
                      key={property.id}
                      className="h-full"
                    >
                      <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} className="block h-full">
                        <div
                          className="group bg-white rounded-[26px] sm:rounded-[28px] flex flex-col h-full border-2 border-slate-900/80 hover:border-[#2563eb] shadow-[0_6px_24px_rgba(15,23,42,0.12)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                          {/* Image Block with Top Floating Badges & Glassmorphism Heart */}
                          <div className="relative h-[200px] sm:h-[225px] md:h-[235px] w-full overflow-hidden bg-slate-100">
                            {(() => {
                              const isUnsplash = typeof property.image === "string" && property.image.includes("images.unsplash.com");
                              const baseUnsplash = isUnsplash ? property.image.split("?")[0] : null;
                              const srcSet = isUnsplash
                                ? `${baseUnsplash}?auto=format&fit=crop&w=340&q=65 340w, ${baseUnsplash}?auto=format&fit=crop&w=480&q=68 480w, ${baseUnsplash}?auto=format&fit=crop&w=640&q=70 640w`
                                : undefined;
                              const imgSrc = isUnsplash
                                ? `${baseUnsplash}?auto=format&fit=crop&w=360&q=65`
                                : property.image;

                              return (
                                <img 
                                  src={imgSrc}
                                  srcSet={srcSet}
                                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 340px, 360px"
                                  alt={pData.name} 
                                  loading="lazy" 
                                  decoding="async"
                                  width={360}
                                  height={235}
                                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108" 
                                />
                              );
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
                            
                            {/* Floating Status & Type Pills — top row, never wrap */}
                            <div className="absolute top-3.5 left-3.5 right-16 flex items-center gap-1.5 z-20 pointer-events-none overflow-hidden">
                              <span className="inline-flex items-center gap-1.5 bg-[#0b214a]/95 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md border border-white/10 font-ui-clean shrink-0">
                                <span className={`w-1.5 h-1.5 rounded-full ${isRent ? 'bg-amber-400' : 'bg-[#60a5fa]'} animate-pulse shrink-0`}></span>
                                <span>{isRent ? (language === "ca" ? "Lloguer" : language === "en" ? "Rent" : "Alquiler") : (language === "ca" ? "Venda" : language === "en" ? "Sale" : "Venta")}</span>
                              </span>
                              <span className="inline-flex items-center bg-[#2563eb] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl shadow-md font-ui-clean shrink-0 whitespace-nowrap">
                                {type}
                              </span>
                            </div>
                            {/* RESERVADO badge — always anchored independently */}
                            {property.status === "reservado" && (
                              <div className="absolute top-[52px] left-3.5 z-20 pointer-events-none">
                                <span className="inline-flex items-center bg-amber-400 text-amber-950 font-bold uppercase tracking-wider text-[11px] px-2.5 py-1.5 rounded-xl shadow-md border border-amber-500/40 font-ui-clean">
                                  {language === "ca" ? "Reservat" : language === "en" ? "Reserved" : "Reservado"}
                                </span>
                              </div>
                            )}

                            {/* Heart Favorite Button with micro-bounce */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(property.id);
                              }}
                              aria-label="Guardar en favoritos"
                              className={`absolute top-3.5 right-3.5 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center active:scale-125 transition-all duration-200 cursor-pointer shadow-md z-20 ${
                                isFav 
                                  ? 'bg-red-500 text-white shadow-red-500/30' 
                                  : 'bg-white text-slate-700 hover:text-red-500 hover:bg-slate-50'
                              }`}
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </button>

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
                                  <span>{property.bedrooms > 0 ? property.bedrooms : "0"} {language === "en" ? "bd" : "hab"}</span>
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

                              {/* Floor / Feature Highlight badge - Only shown if non-redundant */}
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
                                } else if (property.floor && !isRedundant(property.floor)) {
                                  relevantFeature = property.floor;
                                } else if (property.features && property.features.length > 0) {
                                  const found = property.features.find((f: string) => !isRedundant(f));
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
                                {/* Blue Pill Badge for "VENTA" / "ALQUILER" */}
                                <span className="inline-flex items-center self-start bg-[#2563eb] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs mb-1.5 font-ui-clean">
                                  {isRent 
                                    ? (language === "ca" ? "LLOGUER" : language === "en" ? "RENT" : "ALQUILER") 
                                    : (language === "ca" ? "VENDA" : language === "en" ? "SALE" : "VENTA")}
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

                              <div className="shrink-0 inline-flex items-center gap-1.5 bg-[#0b214a] group-hover:bg-[#2563eb] text-white text-[11.5px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-md border border-slate-800 group-hover:border-[#2563eb] font-ui-clean">
                                <span className="whitespace-nowrap">{t.properties.verDetalles || "Ver ficha"}</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
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
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 sm:p-8 mb-8 text-center sm:text-left">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                            <Search className="w-5 h-5 text-[#2563eb]" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-[#0f172a] leading-snug">
                              {language === "ca"
                                ? "No hi ha immobles que coincideixin amb aquests filtres."
                                : language === "en"
                                ? "No properties match these filters."
                                : "No hay inmuebles que coincidan con estos filtros."}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                              {language === "ca"
                                ? "Prova d'ajustar la cerca o consultar totes les propietats disponibles."
                                : language === "en"
                                ? "Try adjusting your search or view all available properties."
                                : "Prueba a ajustar la búsqueda o consultar todas las propiedades disponibles."}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const mode = searchParams.mode === "alquilar" ? "alquilar" : "comprar";
                            setSearchParams({ mode, zona: "Cualquier zona", tipo: "Cualquier tipo", precio: "Cualquier precio", habitaciones: "Cualquier número" });
                            heroResetRef.current?.();
                          }}
                          className="shrink-0 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                        >
                          {language === "ca" ? "Veure tots" : language === "en" ? "See all" : "Ver todos"}
                        </button>
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
        <section id="nosotros" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#f8fafc] rounded-[22px] md:rounded-[28px] shadow-xl border border-slate-300 p-4 sm:p-6 md:p-7 mx-4 md:mx-auto max-w-[1320px] relative z-10 text-[#0f172a]">
            <Reveal>
              <div className="mb-4 md:mb-5 text-center">
                <span className="inline-flex items-center gap-1.5 bg-[#0b214a] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-xl shadow-md border border-white/10 mb-2">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{t.testimonios.tag}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black leading-tight text-[#0f172a] tracking-tight mb-2.5 font-sans">
                  {t.testimonios.title1}{" "}
                  <span className="relative inline-block text-[#2563eb] pb-0.5">
                    {t.testimonios.title2}
                  </span>
                </h2>
                <div className="pt-1 inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 shadow-xs hover:border-[#2563eb]/40 transition-colors">
                  <GoogleIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                    {language === "ca" ? "Ressenyes verificades a Google" : language === "en" ? "Verified Google Reviews" : "Reseñas verificadas en Google"}
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-4 items-stretch">
              {t.testimonios.items.map((item, i) => {
                const initials = ["C", "A", "M"];
                return (
                  <Reveal key={item.author} delay={i * 0.1}>
                    <div className="card-lift group bg-white text-[#0f172a] rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-full border-2 border-slate-100 hover:border-[#2563eb] shadow-[0_4px_14px_rgba(15,23,42,0.04)] relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-1 bg-[#2563eb]" />
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-2 mb-3 h-6">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                            ))}
                          </div>
                          <div className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-black text-slate-800 shadow-2xs shrink-0">
                            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>Google</span>
                          </div>
                        </div>
                        <p className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed font-normal mb-4 flex-1">
                          "{item.quote}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5 relative z-10 mt-auto">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-[#0b214a] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-white ring-1 ring-slate-200">
                            {initials[i % initials.length]}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <strong className="font-bold text-xs sm:text-sm text-[#0f172a] tracking-tight leading-tight truncate">
                              {item.author}
                            </strong>
                            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                              {item.time}
                            </span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-white bg-[#2563eb] px-2.5 py-1 rounded-full shadow-xs shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-white stroke-[2.5]" />
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
        <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#0f172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-sky-500/20 p-4 sm:p-6 md:p-7 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-white">
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
        <section id="cobertura" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-white scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#0b172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-white/10 p-4 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden">
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
        <section className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-slate-900">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-lg border border-slate-200 p-5 md:p-8 mx-auto max-w-[1320px] relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-10">
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{language === "ca" ? "GESTIÓ DE COMUNITATS" : language === "en" ? "COMMUNITY MANAGEMENT" : "GESTIÓN DE COMUNIDADES"}</span>
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0f172a] mb-3 font-sans">
                    {language === "ca" ? (
                      <>Parlem de la teva <span className="text-[#2563eb]">comunitat</span> a {data.name}<span className="ml-1.5 inline-block">?</span></>
                    ) : language === "en" ? (
                      <>Let's talk about your <span className="text-[#2563eb]">community</span> in {data.name}</>
                    ) : (
                      <><span className="mr-1 inline-block">¿</span>Hablamos de tu <span className="text-[#2563eb]">comunidad</span> en {data.name}<span className="ml-1.5 inline-block">?</span></>
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
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto cursor-pointer font-sans"
                    >
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
          <div className="max-w-[1320px] mx-auto">
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
        <section id="faq" className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-6 md:py-8 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-[#0b172a] rounded-[24px] md:rounded-[30px] shadow-xl border border-white/10 p-5 sm:p-7 md:p-8 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-white flex flex-col items-center">
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

              <div className="w-full flex flex-col gap-3 mb-6">
                {getNeighborhoodFaqs(data.slug, language, data.faqs).map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div 
                        onClick={() => setActiveFaq(isActive ? null : idx)}
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
                              0{idx + 1}
                            </span>
                            <h3 className="font-black text-[#0f172a] text-sm sm:text-base md:text-lg font-sans leading-snug text-balance">
                              {faq.question}
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
                              key={`faq-barrio-${idx}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pt-3.5 text-slate-700 leading-relaxed font-semibold text-xs sm:text-sm md:text-[15px] border-t border-slate-200 mt-3.5 font-sans text-balance">
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

        {/* ── 9. FORMULARIO DE CONTACTO CANÓNICO CON VALIDACIÓN ── */}
        <section id="contacto" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-slate-900 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-sm border border-slate-200 p-4 sm:p-7 md:p-9 mx-auto max-w-[1320px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Reveal>
                  <span className="inline-flex items-center justify-center bg-[#2563eb] text-white text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 w-fit">
                    {t.contacto.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-3 leading-tight tracking-tight font-sans">
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
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bold font-sans mb-6">
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
                  <div id="formulario-contacto" className="bg-white border-2 border-slate-300 p-5 sm:p-6 md:p-7 rounded-3xl shadow-sm scroll-mt-28 md:scroll-mt-32">
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
        <section id="final-cta" className="py-6 md:py-10 px-4 md:px-8 bg-[#e2e8f0] text-[#0f172a]">
          <div className="bg-white rounded-[22px] md:rounded-[28px] shadow-xl border border-slate-200 p-5 sm:p-7 md:p-9 pb-5 md:pb-7 mx-auto max-w-[1320px] relative z-10 overflow-hidden">
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
                    <span className="inline-block bg-[#2563eb] text-white px-3 py-1 rounded-xl shadow-xs">
                      {t.finalCta.title2}
                    </span>
                    <span className="ml-1.5 inline-block">?</span>
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
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
            {/* Text Columns (Left Block) - Logo + Description FIRST, then Navigation, Contact & Legal */}
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
                  {language === "ca" ? "Serveis Principals" : language === "en" ? "Main Services" : "Servicios Principales"}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/servicios/$slug" params={{ slug: "administracion-de-fincas" }} className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Administració de Finques" : language === "en" ? "Property Management" : "Administración de Fincas"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/$slug" params={{ slug: "gestion-inmobiliaria" }} className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Gestió Immobiliària" : language === "en" ? "Real Estate Brokerage" : "Gestión Inmobiliaria"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/$slug" params={{ slug: "asesoria-juridica-fiscal" }} className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Assessoria Jurídica i Fiscal" : language === "en" ? "Legal & Tax Advisory" : "Asesoría Jurídica y Fiscal"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicios/$slug" params={{ slug: "obras-mantenimiento" }} className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Obres, ITE i Manteniment" : language === "en" ? "Building Works & ITE" : "Obras, ITE y Mantenimiento"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/noticias" className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Blog i Notícies" : language === "en" ? "Blog & News" : "Blog y Noticias"}
                    </Link>
                  </li>
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

            {/* Mascot on Mobile (<768px): Prominent and clear mascot presentation */}
            <div className="w-full md:hidden flex justify-center items-center pt-4 pb-4">
              <FooterMascot className="w-40 sm:w-48 max-w-[200px] h-auto object-contain drop-shadow-xl" />
            </div>

            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* ── COBERTURA EN SANTA COLOMA DE GRAMENET ── */}
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
                  className={`px-2.5 py-2.5 rounded-xl text-xs sm:text-xs xl:text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap ${
                    zone.slug === city
                      ? "bg-[#2563eb] text-white hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5"
                      : "bg-white hover:bg-blue-50 text-slate-900 hover:text-[#2563eb] hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${zone.slug === city ? "bg-white" : "bg-[#2563eb]"}`} />
                  <span className="truncate">{zone.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              {language === "ca" ? "ACREDITACIONS PROFESSIONALS OFICIALS" : language === "en" ? "OFFICIAL PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES OFICIALES"}
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18] pb-6 sm:pb-5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-xs sm:text-sm md:text-base text-slate-200 font-extrabold tracking-wide">
                © 2026 Gesgrama. {language === "ca" ? "Tots els drets reservats." : language === "en" ? "All rights reserved." : "Todos los derechos reservados."}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">
                {language === "ca" ? "Desenvolupat per" : language === "en" ? "Developed by" : "Desarrollado por"} <a href="https://kovia.es" target="_blank" rel="noopener" className="text-white underline hover:text-blue-300 font-bold">Kovia</a>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm md:text-base text-slate-300 font-extrabold">
              <Link to="/aviso-legal" className="hover:text-white transition-colors">{language === "ca" ? "Avís Legal" : language === "en" ? "Legal" : "Aviso Legal"}</Link>
              <span className="text-slate-600">·</span>
              <Link to="/politica-privacidad" className="hover:text-white transition-colors">{language === "ca" ? "Privacitat" : language === "en" ? "Privacy" : "Privacidad"}</Link>
              <span className="text-slate-600">·</span>
              <Link to="/politica-cookies" className="hover:text-white transition-colors">{language === "ca" ? "Galetes" : language === "en" ? "Cookies" : "Cookies"}</Link>
              <span className="text-slate-600">·</span>
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
