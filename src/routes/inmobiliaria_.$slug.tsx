import { createFileRoute, Link } from "@tanstack/react-router";
import { properties, formatLocation } from "../data/properties";
import { findPropertyBySlugOrId, getLocalProperties, fetchProperties, subscribeProperties, type ExtendedProperty } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";

import { 
  ArrowLeft, Bath, Bed, Maximize, MapPin, Map, Building2, Phone, MessageCircle, 
  ChevronRight, ChevronLeft, Home, Mail, Share2, CheckCircle2, ShieldCheck, Sparkles, 
  Calendar, Eye, EyeOff, Check, Play, Loader2, ArrowRight, ChevronDown, Send, Maximize2, X
} from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translations } from "../data/translations";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className = "w-5 h-5 fill-white shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
    </svg>
  );
}

const SITE_DOMAIN = "https://www.gesgrama.es";

export const Route = createFileRoute("/inmobiliaria_/$slug")({
  loader: async ({ params }) => {
    // Attempt to preload properties if not present
    const existing = findPropertyBySlugOrId(params.slug);
    if (!existing) {
      await fetchProperties().catch(() => {});
    }
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const slug = params.slug as string;
    const property = findPropertyBySlugOrId(slug);
    if (!property) {
      return {
        meta: [
          { title: "Propiedad no encontrada | Gesgrama Inmobiliaria" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const canonicalUrl = `${SITE_DOMAIN}/inmobiliaria/${property.slug}`;
    const ogImage = typeof property.gallery?.[0] === "string" && property.gallery[0].startsWith("http")
      ? property.gallery[0]
      : property.image?.startsWith("http")
      ? property.image
      : `https://www.gesgrama.es/og-image.png`;
    const title = `${property.name} — ${property.priceFormatted} | Gesgrama Inmobiliaria`;
    const description = `${property.type} en ${property.location}: ${property.description.slice(0, 130)}...`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: `${property.name} — ${property.priceFormatted}` },
        { property: "og:description", content: `${property.type} en ${property.location}. ${property.bedrooms} hab. | ${property.surface} m²` },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "800" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Gesgrama Inmobiliaria" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: property.name },
        { name: "twitter:description", content: `${property.type} en ${property.location}` },
        { name: "twitter:image", content: ogImage },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": property.name,
            "description": property.description.slice(0, 200),
            "url": canonicalUrl,
            "image": property.gallery && property.gallery.length > 0 ? property.gallery : [ogImage],
            "datePosted": "2026-01-01",
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "EUR",
              "businessFunction": property.operation === "alquilar" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
              "availability": "https://schema.org/InStock",
              "url": canonicalUrl,
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": property.price,
                "priceCurrency": "EUR",
                "unitText": property.operation === "alquilar" ? "MONTH" : "ONE_TIME"
              }
            },
            "about": {
              "@type": property.type === "Local" ? "CommercialProperty" : property.type === "Casa" || property.type === "Chalet" ? "SingleFamilyResidence" : "Apartment",
              "name": property.name,
              "description": property.description,
              "numberOfRooms": property.bedrooms,
              "numberOfBedrooms": property.bedrooms,
              "numberOfBathroomsTotal": property.bathrooms,
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": property.surface,
                "unitCode": "MTK"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Santa Coloma de Gramenet",
                "addressRegion": "Barcelona",
                "addressCountry": "ES",
                "streetAddress": `${property.location}, Santa Coloma de Gramenet`
              }
            },
            "broker": {
              "@type": "RealEstateAgent",
              "name": "Gesgrama Inmobiliaria",
              "url": SITE_DOMAIN,
              "telephone": "+34934685656",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rambla de Sant Sebastià, 48",
                "addressLocality": "Santa Coloma de Gramenet",
                "postalCode": "08921",
                "addressRegion": "Barcelona",
                "addressCountry": "ES"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_DOMAIN },
                { "@type": "ListItem", "position": 2, "name": "Inmobiliaria", "item": `${SITE_DOMAIN}/#propiedades` },
                { "@type": "ListItem", "position": 3, "name": property.name, "item": canonicalUrl }
              ]
            }
          })
        }
      ]
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  
  // Instant lookup with fallback to defaultProperties
  const [property, setProperty] = useState<ExtendedProperty | undefined>(() => {
    return findPropertyBySlugOrId(slug);
  });
  
  // Only show loading if property is not found synchronously yet
  const [isLoading, setIsLoading] = useState<boolean>(() => !findPropertyBySlugOrId(slug));
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showLightboxArrows, setShowLightboxArrows] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Keyboard navigation for Lightbox (Esc, Left arrow, Right arrow)
  useEffect(() => {
    if (!isLightboxOpen || !property) return;
    const imagesCount = (property.gallery && property.gallery.length > 0) ? property.gallery.length : 1;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIdx((prev) => (prev === 0 ? imagesCount - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIdx((prev) => (prev === imagesCount - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, property]);

  // Sync state whenever slug changes
  useEffect(() => {
    const found = findPropertyBySlugOrId(slug);
    if (found) {
      setProperty(found);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      fetchProperties()
        .then(() => {
          const fresh = findPropertyBySlugOrId(slug);
          if (fresh) {
            setProperty(fresh);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [slug]);

  // Subscribe to property store changes (Supabase fetch or local storage updates)
  useEffect(() => {
    const unsub = subscribeProperties(() => {
      const found = findPropertyBySlugOrId(slug);
      if (found) {
        setProperty(found);
        setIsLoading(false);
      }
    });
    return () => unsub();
  }, [slug]);

  const [language, setLanguage] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        return stored;
      }
    }
    return "es";
  });

  const changeLanguage = (lang: "es" | "en" | "ca") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      window.dispatchEvent(new Event("languagechange"));
    }
  };

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguage(stored);
      }
    };
    if (typeof window !== "undefined") {
      handleLangChange();
      window.addEventListener("languagechange", handleLangChange);
      window.addEventListener("storage", handleLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("languagechange", handleLangChange);
        window.removeEventListener("storage", handleLangChange);
      }
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIdx(0);
  }, [slug]);

  // Dynamically update document head JSON-LD schema when property updates in client
  useEffect(() => {
    if (!property || typeof document === "undefined") return;
    const scriptId = "realestate-listing-schema";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    const canonicalUrl = `${SITE_DOMAIN}/inmobiliaria/${property.slug}`;
    const ogImg = typeof property.gallery?.[0] === "string" && property.gallery[0].startsWith("http")
      ? property.gallery[0]
      : property.image?.startsWith("http")
      ? property.image
      : `https://www.gesgrama.es/og-image.png`;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.name,
      "description": (property.description || "").slice(0, 200),
      "url": canonicalUrl,
      "image": property.gallery && property.gallery.length > 0 ? property.gallery : [ogImg],
      "datePosted": "2026-01-01",
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "EUR",
        "businessFunction": property.operation === "alquilar" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        "availability": "https://schema.org/InStock",
        "url": canonicalUrl,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": property.price,
          "priceCurrency": "EUR",
          "unitText": property.operation === "alquilar" ? "MONTH" : "ONE_TIME"
        }
      },
      "about": {
        "@type": property.type === "Local" ? "CommercialProperty" : property.type === "Casa" || property.type === "Chalet" ? "SingleFamilyResidence" : "Apartment",
        "name": property.name,
        "description": property.description,
        "numberOfRooms": property.bedrooms,
        "numberOfBedrooms": property.bedrooms,
        "numberOfBathroomsTotal": property.bathrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.surface,
          "unitCode": "MTK"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Santa Coloma de Gramenet",
          "addressRegion": "Barcelona",
          "addressCountry": "ES",
          "streetAddress": `${property.location}, Santa Coloma de Gramenet`
        }
      },
      "broker": {
        "@type": "RealEstateAgent",
        "name": "Gesgrama Inmobiliaria",
        "url": SITE_DOMAIN,
        "telephone": "+34934685656",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rambla de Sant Sebastià, 48",
          "addressLocality": "Santa Coloma de Gramenet",
          "postalCode": "08921",
          "addressRegion": "Barcelona",
          "addressCountry": "ES"
        }
      }
    };
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [property]);

  // Keyboard navigation for full screen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setIsVideoModalOpen(false);
      } else if (isLightboxOpen) {
        if (!property) return;
        const total = (property.gallery && property.gallery.length > 0) ? property.gallery.length : 1;
        if (e.key === "ArrowLeft") {
          setActiveImageIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
        } else if (e.key === "ArrowRight") {
          setActiveImageIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isLightboxOpen, property]);

  const t = translations[language];

  const handleCopyShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `${SITE_DOMAIN}/inmobiliaria/${slug}`;
    const shareTitle = property ? `${property.name} — Gesgrama` : "Gesgrama Inmobiliaria";
    const shareText = property 
      ? `Echa un vistazo a este inmueble en Gesgrama: ${property.name} (${property.priceFormatted})`
      : "Inmuebles en Gesgrama Santa Coloma";

    // 1. Try native Web Share API (mobile devices, tablets, modern desktop browsers)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: url,
        });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        return;
      } catch (err: any) {
        // User aborted share sheet or unsupported format; if aborted, do nothing; otherwise fallback to clipboard
        if (err?.name === "AbortError") {
          return;
        }
      }
    }

    // 2. Clipboard API fallback
    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copied = true;
      } catch {
        copied = false;
      }
    }

    // 3. Document execCommand fallback for older contexts / iframe limitations
    if (!copied && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Contact Form State for Property Details
  const [contactForm, setContactForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
    privacidad: false,
  });
  const [contactErrors, setContactErrors] = useState<{
    nombre?: string;
    telefono?: string;
    email?: string;
    privacidad?: string;
  }>({});
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
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
        mensaje: "",
        privacidad: false,
      });
      setTimeout(() => {
        setIsSubmittedSuccess(false);
      }, 4000);
    }, 1000);
  };

  // LOADING SKELETON STATE (Avoids instant flashing of 404 while database/store resolves)
  if (isLoading) {
    return (
      <div className="bg-slate-50 font-sans min-h-screen flex flex-col justify-between">
        <Navbar language={language} setLanguage={changeLanguage} />
        <main className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto w-full">
          <div className="bg-white rounded-[28px] md:rounded-[36px] p-8 md:p-12 shadow-xl border border-slate-200/80 animate-pulse">
            <div className="h-6 w-36 bg-slate-200 rounded-full mb-8" />
            <div className="h-[380px] sm:h-[460px] bg-slate-200 rounded-3xl mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                <div className="h-10 w-3/4 bg-slate-200 rounded-2xl" />
                <div className="h-6 w-1/3 bg-slate-200 rounded-xl" />
                <div className="h-24 bg-slate-100 rounded-2xl mt-6" />
              </div>
              <div className="lg:col-span-4">
                <div className="h-72 bg-slate-100 rounded-3xl" />
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-[#0b1221] text-white py-8 px-6 text-center text-xs text-slate-400 border-t border-slate-800">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
        </footer>
      </div>
    );
  }

  // 404 NOT FOUND STATE WITH FULL UI BRANDING & BUBBLE CARD LAYOUT
  if (!property) {
    return (
      <div className="bg-slate-50 text-onyx font-sans min-h-screen flex flex-col justify-between">
        <nav className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[94%] max-w-[1300px] z-[100] flex items-center justify-between py-2 md:py-2.5 px-4 md:px-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-slate-900">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Gesgrama Logo" className="h-9 sm:h-11 w-auto object-contain" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#2563eb] transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.detail.backHome}
          </Link>
        </nav>

        <main className="pt-32 pb-16 px-4 md:px-8 flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white rounded-[28px] md:rounded-[36px] p-8 md:p-12 text-center shadow-xl border border-slate-100">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              Error 404
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-onyx mb-4">{t.detail.notFound}</h1>
            <p className="text-onyx/60 text-base md:text-lg mb-8 leading-relaxed">{t.detail.notFoundDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1d4ed8] transition-colors shadow-md">
                {t.detail.backHome}
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-[#0b1221] text-white py-8 px-6 text-center text-xs text-slate-400 border-t border-slate-800">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
        </footer>
      </div>
    );
  }

  const pData = getTranslatedProperty(property, language, t.propertiesData);
  const galleryImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image];

  // STRICT VIDEO TOUR REQUIREMENT: ONLY IF REAL VIDEO EXISTS AND NOT A BROKEN PLACEHOLDER
  const hasValidVideo = Boolean(
    property.videoUrl && 
    property.videoUrl.trim() !== "" && 
    !property.videoUrl.includes("list=PLgesgrama")
  );

  const statusLabel = property.status === "reservado" 
    ? t.detail.statusReserved 
    : property.status === "vendido" 
    ? t.detail.statusSold 
    : property.status === "alquilado" 
    ? t.detail.statusRented 
    : property.operation === "alquilar" 
    ? t.detail.statusRent 
    : t.detail.statusSale;

  const statusColor = property.status === "reservado"
    ? "bg-amber-500 text-white"
    : property.status === "vendido" || property.status === "alquilado"
    ? "bg-slate-700 text-white"
    : property.operation === "alquilar"
    ? "bg-[#0284c7] text-white"
    : "bg-[#2563eb] text-white";

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen selection:bg-blue-600 selection:text-white">
      {/* SHARED CANONICAL NAVY NAVBAR */}
      <Navbar language={language} setLanguage={changeLanguage} />

      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 px-4 sm:px-6 md:px-8 max-w-[1340px] mx-auto">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 p-5 sm:p-8 md:p-12">
          
          {/* TOP NAV / ACTIONS BAR */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-2.5 rounded-full border-2 border-blue-600 shadow-sm transition-all duration-200 hover:scale-102 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-white stroke-[2.5]" /> {t.detail.back}
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
                <span>/</span>
                <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors font-extrabold text-slate-700">
                  {property.operation === "alquilar" ? t.detail.forRent : t.detail.forSale}
                </a>
                <span>/</span>
                <span className="text-[#0f172a] font-black truncate max-w-[200px]">{property.ref || property.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${property?.name ? `${property.name} — ` : ''}${typeof window !== "undefined" ? window.location.href : `${SITE_DOMAIN}/inmobiliaria/${slug}`}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-2 rounded-full transition-all shadow-sm hover:scale-102 cursor-pointer"
                title="Compartir por WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="hidden md:inline">WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyShare}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-[#0b214a] hover:bg-[#142d5c] px-5 py-2.5 rounded-full border-2 border-blue-900 transition-all shadow-sm hover:scale-102 cursor-pointer"
                title={t.detail.shareTitle}
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> : <Share2 className="w-4 h-4 text-blue-200" />}
                <span>{copiedLink ? t.detail.linkCopied : t.detail.share}</span>
              </button>
            </div>
          </div>

          {/* BREADCRUMB - Clean desktop path, hidden on mobile for cleaner native experience */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex mb-6 items-center flex-wrap gap-2 text-xs font-bold text-slate-500">
            <Link to="/" className="hover:text-[#2563eb] transition-colors text-slate-700">
              {t.detail.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors text-slate-700">{t.detail.realEstate}</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-bold">Santa Coloma de Gramenet</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2563eb] font-black break-words">
              {pData.name}
            </span>
          </nav>

          {/* LUXURY PHOTO GALLERY & VIEWER WITH CLEAN SLIDER CONTROLS - CENTERED AND HARMONIOUS ON PC */}
          <div className="mb-10 max-w-5xl mx-auto">
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 bg-slate-950 group aspect-[16/10] max-h-[540px] cursor-zoom-in mx-auto"
              title={language === "ca" ? "Fes clic per ampliar la imatge en pantalla completa" : language === "en" ? "Click to view full screen" : "Haz clic para ampliar la imagen en pantalla grande"}
            >
              <img 
                src={galleryImages[activeImageIdx] || galleryImages[0]} 
                alt={`${pData.name} - ${activeImageIdx + 1}`} 
                loading="eager" 
                fetchPriority="high" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Fullscreen Zoom Indicator in top-right */}
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#0b214a]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 text-xs font-black">
                  <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span className="hidden sm:inline">{language === "ca" ? "Ampliar" : language === "en" ? "Expand" : "Ampliar"}</span>
                </div>
              </div>

              {/* Slider Navigation Arrows - Moved to edges with opacity 0.7 and hover 1 */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                    }}
                    aria-label={t.detail.photoPrev}
                    className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)] border-2 border-white transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                    }}
                    aria-label={t.detail.photoNext}
                    className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)] border-2 border-white transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white" />
                  </button>
                </>
              )}

              {/* Bottom Image Counter & Quick Info */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-xs font-bold z-10">
                <div className="flex items-center gap-2 bg-[#0b214a] px-3.5 py-1.5 rounded-full border border-blue-400/40 shadow-md">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono font-black">{t.detail.photoCount.replace("{current}", String(activeImageIdx + 1)).replace("{total}", String(galleryImages.length))}</span>
                </div>
                {hasValidVideo && (
                  <a
                    href="#video-tour"
                    className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-1.5 rounded-full border border-blue-400/40 shadow-md transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{t.detail.videoTour}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Badges Bar - Centered on PC and cleanly balanced */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <span className={`${statusColor} px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm`}>
                {statusLabel}
              </span>
              <span className="bg-[#0b214a] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border border-blue-900">
                {pData.type}
              </span>
              <span className="bg-white text-[#0f172a] font-mono px-4 py-2 rounded-xl text-xs font-black tracking-wider shadow-sm border-2 border-slate-300">
                Ref: {property.ref || "API A10750"}
              </span>
            </div>

            {/* Gallery Thumbnails Carousel / Strip - Clean outline matching border-radius */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-3.5 px-1 scrollbar-none justify-start sm:justify-center">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative shrink-0 w-24 h-18 sm:w-28 sm:h-20 rounded-2xl overflow-hidden transition-all cursor-pointer shadow-xs ${
                      activeImageIdx === idx 
                        ? "outline-3 outline-[#2563eb] -outline-offset-1 scale-102 opacity-100" 
                        : "border border-slate-300 opacity-70 hover:opacity-100 hover:border-blue-400"
                    }`}
                  >
                    <img src={img} alt={`${pData.name} - ${idx + 1}`} className="w-full h-full object-cover rounded-2xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MAIN DETAILS GRID: LEFT CONTENT + RIGHT STICKY CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* LEFT COLUMN: TITLE, SPECS, DESCRIPTION, FEATURES, VIDEO, MAP */}
            <div className="lg:col-span-8">
              
              {/* Header Title & Price Badge - VERTICALLY ALIGNED */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b-2 border-slate-200 pb-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#000000] tracking-tight leading-tight mb-3">
                    {pData.name}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-700 font-bold text-sm sm:text-base">
                    <MapPin className="w-4 h-4 text-[#2563eb] shrink-0 stroke-[2.5]" />
                    <span>{formatLocation(pData.location || property.location, language)}, {property.city || "Santa Coloma de Gramenet"}</span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 self-start sm:self-center">
                  {/* Blue Pill Badge for "PRECIO" / "PREU" */}
                  <span className="inline-block bg-[#2563eb] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs mb-1.5 font-sans">
                    {t.detail.price.replace(":", "")}
                  </span>
                  {/* Big Dark Price with Vibrant Blue Currency Symbol */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight font-sans leading-none">
                    {(() => {
                      if (property.priceFormatted) {
                        // If price ends with €/mes or €
                        if (property.priceFormatted.includes("€/mes")) {
                          const num = property.priceFormatted.replace("€/mes", "").trim();
                          return (
                            <>
                              <span>{num}</span> <span className="text-[#2563eb]">€/mes</span>
                            </>
                          );
                        } else if (property.priceFormatted.includes("€")) {
                          const num = property.priceFormatted.replace("€", "").trim();
                          return (
                            <>
                              <span>{num}</span><span className="text-[#2563eb] ml-1">€</span>
                            </>
                          );
                        }
                        return property.priceFormatted;
                      }
                      return (
                        <>
                          <span>{new Intl.NumberFormat("es-ES").format(property.price)}</span>
                          <span className="text-[#2563eb] ml-1">€</span>
                        </>
                      );
                    })()}
                  </div>
                  {/* Clean Price per m² */}
                  {property.surface && property.surface > 0 && property.price && (
                    <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 tracking-tight font-sans">
                      {Math.round(property.price / property.surface).toLocaleString("es-ES")} €/m²
                    </div>
                  )}
                </div>
              </div>

              {/* KEY SPECS METRIC PILLS - REORDERED: SUPERFICIE, HABITACIONES, BAÑOS, PLANTA/TIPO */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-10">
                {/* 1. Superficie */}
                <div className="bg-[#2563eb] border-2 border-blue-600 rounded-2xl p-4 flex items-center gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                    <Maximize className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] uppercase font-semibold text-white/95 tracking-normal block leading-tight">{t.detail.surface}</span>
                    <span className="text-xl font-black text-white">{property.surface} m²</span>
                  </div>
                </div>

                {/* 2. Habitaciones */}
                <div className="bg-[#2563eb] border-2 border-blue-600 rounded-2xl p-4 flex items-center gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                    <Bed className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] uppercase font-semibold text-white/95 tracking-normal block leading-tight">{t.detail.bedrooms}</span>
                    <span className="text-xl font-black text-white">{property.bedrooms} {t.detail.roomShort}</span>
                  </div>
                </div>

                {/* 3. Baños */}
                <div className="bg-[#2563eb] border-2 border-blue-600 rounded-2xl p-4 flex items-center gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                    <Bath className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] uppercase font-semibold text-white/95 tracking-normal block leading-tight">{t.detail.bathrooms}</span>
                    <span className="text-xl font-black text-white">{property.bathrooms} {property.bathrooms === 1 ? t.detail.bathShortSingular : t.detail.bathShortPlural}</span>
                  </div>
                </div>

                {/* 4. Planta / Tipo */}
                <div className="bg-[#2563eb] border-2 border-blue-600 rounded-2xl p-4 flex items-center gap-3.5 shadow-md transition-transform hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11.5px] uppercase font-semibold text-white/95 tracking-normal block leading-tight">{t.detail.floor}</span>
                    <span className="text-base font-black text-white truncate block max-w-[100px]">{pData.floor || pData.type}</span>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION BLOCK */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-[#000000] mb-4 flex items-center gap-2.5">
                  <span className="w-2.5 h-6 bg-[#2563eb] rounded-full inline-block" />
                  {t.detail.description}
                </h2>
                <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <p className="text-slate-800 leading-relaxed text-base sm:text-lg whitespace-pre-line font-medium">
                    {pData.description}
                  </p>
                </div>
              </div>

              {/* FEATURES CHECKLIST */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-[#000000] mb-5 flex items-center gap-2.5">
                  <span className="w-2.5 h-6 bg-[#2563eb] rounded-full inline-block" />
                  {t.detail.features}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {pData.features.map((feat: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3.5 bg-blue-50/60 border-2 border-blue-200 p-4 rounded-2xl shadow-xs hover:border-[#2563eb] transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="text-sm font-black text-[#000000]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIDEO TOUR BLOCK - CONDITIONAL: ONLY IF REAL VIDEO EXISTS */}
              {hasValidVideo && (
                <div id="video-tour" className="mb-12 bg-[#0b1221] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-blue-600 text-white">
                        <Play className="w-5 h-5 fill-white" />
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">{t.detail.videoTitle}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">{t.detail.videoSubtitle}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl border border-white/20 transition-all shadow-md cursor-pointer hover:scale-102"
                      title={language === "ca" ? "Ampliar vídeo en gran" : language === "en" ? "Expand video" : "Ver vídeo en grande"}
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>{language === "ca" ? "Veure en gran" : language === "en" ? "Fullscreen" : "Ver en grande"}</span>
                    </button>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mt-5">
                    <iframe
                      src={property.videoUrl}
                      title={`${t.detail.videoTitle} - ${pData.name}`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  </div>
                </div>
              )}

              {/* EMBEDDED LOCATION MAP BLOCK */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-[#000000] mb-2 flex items-center gap-2.5">
                  <span className="w-2.5 h-6 bg-[#2563eb] rounded-full inline-block" />
                  {t.detail.locationMapTitle}
                </h2>
                <p className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <span>{t.detail.locationMapSubtitle.replace("{location}", formatLocation(pData.location || property.location, language))}</span>
                </p>
                <div className="rounded-3xl overflow-hidden border-2 border-slate-300 shadow-md bg-slate-100 relative">
                  <iframe
                    title={`Mapa de ubicación - ${pData.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${pData.location || property.location}, Santa Coloma de Gramenet, Barcelona, Spain`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="340"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    className="w-full"
                  />
                  <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>{t.detail.locationMapDisclaimer}</span>
                    <span className="text-[#2563eb] font-extrabold uppercase tracking-wider">{property.city || "Santa Coloma de Gramenet"}</span>
                  </div>
                </div>
              </div>

              {/* PROFESSIONAL GUARANTEE BADGE */}
              <div className="bg-[#0b214a] text-white border-2 border-blue-900 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white mb-1">
                    {t.detail.guaranteeTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                    {t.detail.guaranteeDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY CONTACT & INQUIRY CARD */}
            <div className="lg:col-span-4">
              <div className="bg-[#0b214a] text-white rounded-[28px] p-6 sm:p-8 border-2 border-blue-900 sticky top-28 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563eb] rounded-full blur-[70px] pointer-events-none opacity-40"></div>
                
                {/* Header card info */}
                <div className="relative z-10 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white bg-[#2563eb] px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm border border-blue-400">
                    {t.detail.immediateAttention}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                    {t.detail.interested}
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
                    {t.detail.contactDesc.replace("{name}", pData.name)}
                  </p>
                </div>

                {/* Property quick summary in card - HIGH CONTRAST PURE BLACK */}
                <div className="relative z-10 bg-white text-[#000000] rounded-2xl p-5 border-2 border-blue-400 mb-6 shadow-md">
                  <div className="flex items-center justify-between text-xs font-black text-[#000000] mb-2">
                    <span className="uppercase tracking-wider">{t.detail.ref}</span>
                    <span className="font-mono text-[#000000] font-black bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 text-xs">{property.ref || property.id.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black text-[#000000]">
                    <span className="uppercase tracking-wider">{t.detail.price}</span>
                    <span className="text-2xl text-[#2563eb] font-black tracking-tight">{property.priceFormatted}</span>
                  </div>
                </div>

                {/* DIRECT ACTION BUTTONS */}
                <div className="relative z-10 space-y-3 mb-6">
                  <a 
                    href={`https://wa.me/34601259424?text=${encodeURIComponent(`Hola Gesgrama, estoy interesado en el inmueble ${pData.name} (Ref: ${property.ref || property.id}) y me gustaría recibir más información o agendar una visita.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                    <span>{t.detail.whatsappBtn}</span>
                  </a>

                  <a 
                    href="tel:+34934685656" 
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0b214a] border-2 border-white py-3 px-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-tight transition-all shadow-md cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#2563eb] stroke-[2.5] shrink-0" />
                    <span className="truncate">{t.detail.callBtn}</span>
                  </a>

                  <a 
                    href="#contactar" 
                    className="w-full flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-600 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{t.detail.bookBtn}</span>
                  </a>
                </div>

                {/* OFFICE ADDRESS & SCHEDULE */}
                <div className="relative z-10 pt-5 border-t border-blue-800 text-center text-xs text-blue-200 space-y-1 font-medium">
                  <p className="font-bold text-white">{t.detail.officeLabel}</p>
                  <p>Rambla de Sant Sebastià, 48</p>
                  <p>Santa Coloma de Gramenet</p>
                  <p className="text-[11px] text-[#38bdf8] font-black pt-1">{t.detail.schedule}</p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* DIRECT PROPERTY INQUIRY / CONTACT FORM CARD */}
        <div id="contactar" className="mt-12 bg-white rounded-[28px] md:rounded-[36px] shadow-2xl border-2 border-blue-900/30 overflow-hidden">
          {/* Form Top Brand Banner */}
          <div className="bg-[#0b214a] text-white p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-60 h-60 bg-[#2563eb] rounded-full blur-[90px] pointer-events-none opacity-30" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm mb-3">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>{t.detail.inquiryBadge}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-sans mb-3">
                {t.detail.inquiryTitle}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base font-medium">
                {t.detail.inquiryDesc.replace("{name}", pData.name).replace("{ref}", property.ref || property.id)}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 max-w-3xl mx-auto">
            <form onSubmit={handleContactSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-0.5 text-xs font-sans">
                    {t.detail.nameField}
                  </label>
                  <input 
                    type="text" 
                    placeholder={t.detail.namePlaceholder} 
                    value={contactForm.nombre}
                    onChange={e => {
                      setContactForm(f => ({ ...f, nombre: e.target.value }));
                      if (contactErrors.nombre) setContactErrors(err => ({ ...err, nombre: undefined }));
                    }}
                    className={`w-full bg-[#f8fafc] border-2 ${contactErrors.nombre ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-sans placeholder:text-slate-400`} 
                  />
                  {contactErrors.nombre && (
                    <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-0.5 text-xs font-sans">
                    {t.detail.phoneField}
                  </label>
                  <input 
                    type="tel" 
                    placeholder={t.detail.phonePlaceholder} 
                    value={contactForm.telefono}
                    onChange={e => {
                      setContactForm(f => ({ ...f, telefono: e.target.value }));
                      if (contactErrors.telefono) setContactErrors(err => ({ ...err, telefono: undefined }));
                    }}
                    className={`w-full bg-[#f8fafc] border-2 ${contactErrors.telefono ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-sans placeholder:text-slate-400`} 
                  />
                  {contactErrors.telefono && (
                    <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.telefono}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-0.5 text-xs font-sans">
                  {t.detail.emailField}
                </label>
                <input 
                  type="email" 
                  placeholder={t.detail.emailPlaceholder} 
                  value={contactForm.email}
                  onChange={e => {
                    setContactForm(f => ({ ...f, email: e.target.value }));
                    if (contactErrors.email) setContactErrors(err => ({ ...err, email: undefined }));
                  }}
                  className={`w-full bg-[#f8fafc] border-2 ${contactErrors.email ? 'border-red-500' : 'border-slate-300'} rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-sans placeholder:text-slate-400`} 
                />
                {contactErrors.email && (
                  <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.email}</p>
                )}
              </div>

              <div>
                <label className="text-[#0f172a] font-black uppercase tracking-wider block mb-0.5 text-xs font-sans">
                  {t.detail.messageField}
                </label>
                <textarea 
                  rows={3} 
                  placeholder={t.detail.messagePlaceholder.replace("{name}", pData.name)} 
                  value={contactForm.mensaje}
                  onChange={e => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                  className="w-full bg-[#f8fafc] border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none font-sans placeholder:text-slate-400" 
                />
              </div>

              <div>
                <div className="flex items-center gap-2.5 pt-1">
                  <input 
                    type="checkbox" 
                    id="property-privacy" 
                    checked={contactForm.privacidad}
                    onChange={e => {
                      setContactForm(f => ({ ...f, privacidad: e.target.checked }));
                      if (contactErrors.privacidad) setContactErrors(err => ({ ...err, privacidad: undefined }));
                    }}
                    className="w-4.5 h-4.5 rounded text-[#2563eb] focus:ring-[#2563eb] cursor-pointer" 
                  />
                  <label htmlFor="property-privacy" className="text-xs sm:text-sm text-[#0f172a] font-bold cursor-pointer font-sans select-none">
                    {t.detail.privacyCheckbox}
                  </label>
                </div>
                {contactErrors.privacidad && (
                  <p className="text-xs text-red-600 font-black mt-1 font-sans">{contactErrors.privacidad}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className={`w-full text-white py-3.5 sm:py-4 px-4 rounded-xl text-xs xs:text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2.5 mt-4 cursor-pointer font-sans disabled:opacity-80 whitespace-nowrap ${
                  isSubmittedSuccess ? "bg-[#0b214a] hover:bg-[#0f172a]" : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                }`}
              >
                {isSubmittingContact ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin shrink-0" />
                    <span>{t.detail.sendingInquiry}</span>
                  </>
                ) : isSubmittedSuccess ? (
                  <div className="inline-flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] text-white shrink-0" />
                    <span>{t.detail.successInquiry}</span>
                  </div>
                ) : (
                  <>
                    <span className="leading-none">{t.detail.sendInquiry}</span>
                    <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white shrink-0 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BLOCK TO KEEP EXPLORING THE WEBSITE */}
        <div className="mt-12 bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-xl border-2 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-6 bg-[#2563eb] rounded-full inline-block" />
            <h3 className="text-xl md:text-2xl font-black text-slate-900 font-sans">
              {t.detail.exploreMoreTitle}
            </h3>
          </div>
          <p className="text-slate-600 text-sm md:text-base font-bold mb-6 pl-5">
            {t.detail.exploreMoreSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/#propiedades"
              className="p-5 rounded-2xl bg-[#0b214a] hover:bg-[#142d5c] text-white border-2 border-blue-900 transition-all duration-300 flex items-center gap-4 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-white group-hover:text-blue-200 transition-colors">
                  {t.detail.catalogCardTitle}
                </p>
                <p className="text-xs text-blue-200 font-bold">{t.detail.catalogCardSubtitle}</p>
              </div>
            </a>

            <a
              href="/#valuator-form"
              className="p-5 rounded-2xl bg-[#0b214a] hover:bg-[#142d5c] text-white border-2 border-blue-900 transition-all duration-300 flex items-center gap-4 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-white group-hover:text-blue-200 transition-colors">
                  {t.detail.valuatorCardTitle}
                </p>
                <p className="text-xs text-blue-200 font-bold">{t.detail.valuatorCardSubtitle}</p>
              </div>
            </a>

            <a
              href="#contactar"
              className="p-5 rounded-2xl bg-[#2563eb] hover:bg-blue-600 text-white border-2 border-blue-500 transition-all duration-300 flex items-center gap-4 group shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-white group-hover:text-blue-100 transition-colors">
                  {t.detail.advisorCardTitle}
                </p>
                <p className="text-xs text-blue-100 font-bold">{t.detail.advisorCardSubtitle}</p>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* ── FOOTER CORPORATIVO OFICIAL COMPLETO (IDENTICO A HOME) ── */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10" style={{ backgroundColor: '#0b1221' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          
          {/* Top Section: 4 Columns + Mascot */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
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
                    { label: t.nav.propiedades, href: "/#propiedades" },
                    { label: t.nav.servicios, href: "/#servicios" },
                    { label: t.nav.nosotros, href: "/#nosotros" },
                    { label: t.nav.contacto, href: "/#contacto" },
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

            {/* Right Block: Mascot Illustration (Desktop / Tablet >= 768px) */}
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

          {/* Bottom Horizontal Block: Acreditaciones Profesionales */}
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

      {/* FULLSCREEN LIGHTBOX MODAL FOR IMAGES */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
          >
            {/* Top Bar: Title, Counter, Clean View Toggle & Close Button */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center justify-between gap-3 text-white z-20 pb-2.5 sm:pb-3 border-b border-white/10"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="bg-[#2563eb] text-white px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono font-black shrink-0 shadow">
                  {activeImageIdx + 1} / {galleryImages.length}
                </span>
                <h3 className="text-xs sm:text-base font-bold truncate text-white/90 max-w-[140px] sm:max-w-md">
                  {pData.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Clean View Toggle Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowLightboxArrows((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                      showLightboxArrows 
                        ? "bg-white/10 hover:bg-white/20 text-white/90 border-white/20" 
                        : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-blue-400 shadow-lg ring-2 ring-blue-400/40"
                    }`}
                    title={showLightboxArrows 
                      ? (language === "ca" ? "Ocultar fletxes (Mode net)" : language === "en" ? "Hide arrows (Clean view)" : "Ocultar flechas (Modo limpio)")
                      : (language === "ca" ? "Mostrar fletxes" : language === "en" ? "Show arrows" : "Mostrar flechas")
                    }
                  >
                    {showLightboxArrows ? <EyeOff className="w-3.5 h-3.5 shrink-0" /> : <Eye className="w-3.5 h-3.5 shrink-0" />}
                    <span className="hidden xs:inline sm:inline">
                      {showLightboxArrows 
                        ? (language === "ca" ? "Veure net" : language === "en" ? "Clean view" : "Modo limpio")
                        : (language === "ca" ? "Amb fletxes" : language === "en" ? "With arrows" : "Con flechas")
                      }
                    </span>
                  </button>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-lg border border-white/20"
                  title={language === "ca" ? "Tancar (Esc)" : language === "en" ? "Close (Esc)" : "Cerrar (Esc)"}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Central Zoomed Image with Next/Prev Controls & Swipe/Tap Navigation */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative flex-1 flex items-center justify-center min-h-0 overflow-hidden my-2 select-none touch-pan-y"
            >
              <motion.img
                key={activeImageIdx}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                src={galleryImages[activeImageIdx]}
                alt={`${pData.name} - ${activeImageIdx + 1}`}
                drag={galleryImages.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipeThreshold = 50;
                  if (offset.x < -swipeThreshold || velocity.x < -500) {
                    setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                  } else if (offset.x > swipeThreshold || velocity.x > 500) {
                    setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                  }
                }}
                className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing"
              />

              {/* Invisible Left & Right Click/Tap Zones for Seamless Navigation in Clean Mode */}
              {galleryImages.length > 1 && (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-10"
                    title={language === "ca" ? "Imatge anterior" : language === "en" ? "Previous image" : "Imagen anterior"}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-10"
                    title={language === "ca" ? "Imatge següent" : language === "en" ? "Next image" : "Siguiente imagen"}
                  />
                </>
              )}

              {/* Prev Button - Sleek Glassmorphism, Perfectly Centered */}
              {galleryImages.length > 1 && showLightboxArrows && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-[#2563eb] text-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/40 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-30"
                  title="Anterior (Flecha izquierda)"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                </button>
              )}

              {/* Next Button - Sleek Glassmorphism, Perfectly Centered */}
              {galleryImages.length > 1 && showLightboxArrows && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-[#2563eb] text-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/40 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-30"
                  title="Siguiente (Flecha derecha)"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {galleryImages.length > 1 && (
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-1 max-w-4xl mx-auto z-20 scrollbar-none"
              >
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow-md ${
                      activeImageIdx === idx 
                        ? "border-[#38bdf8] ring-2 ring-[#38bdf8] scale-105 opacity-100" 
                        : "border-white/30 opacity-60 hover:opacity-100 hover:border-white"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN MODAL FOR VIDEO TOUR */}
      <AnimatePresence>
        {isVideoModalOpen && hasValidVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsVideoModalOpen(false)}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4 sm:p-8"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="w-full max-w-5xl bg-[#0b1221] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white bg-[#060c18]">
                <div className="flex items-center gap-2.5">
                  <Play className="w-5 h-5 text-blue-400 fill-blue-400" />
                  <h3 className="text-base sm:text-lg font-black">{t.detail.videoTitle} — {pData.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Cerrar vídeo (Esc)"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Iframe */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={property.videoUrl}
                  title={`${t.detail.videoTitle} - ${pData.name}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
