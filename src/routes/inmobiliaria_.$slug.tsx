import { createFileRoute, Link } from "@tanstack/react-router";
import { properties, formatLocation } from "../data/properties";
import { getLocalProperties } from "@/lib/propertyStore";
import { getTranslatedProperty } from "@/lib/translateProperty";

import { ArrowLeft, Bath, Bed, Maximize, MapPin, Building2, Phone, MessageCircle, ChevronRight, Menu, X, Home, Mail } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useEffect, useState } from "react";
import { translations } from "../data/translations";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const SITE_DOMAIN = "https://www.gesgrama.es";

export const Route = createFileRoute("/inmobiliaria_/$slug")({
  head: ({ params }) => {
    const slug = params.slug as string;
    const property = properties.find((p) => p.slug === slug);
    if (!property) {
      return {
        meta: [
          { title: "Propiedad no encontrada | Gesgrama Inmobiliaria" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const canonicalUrl = `${SITE_DOMAIN}/inmobiliaria/${property.slug}`;
    const ogImage = typeof property.gallery[0] === "string" && property.gallery[0].startsWith("http")
      ? property.gallery[0]
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
            "@type": "Product",
            "name": property.name,
            "description": property.description.slice(0, 160),
            "url": canonicalUrl,
            "image": [ogImage],
            "offers": {
              "@type": "Offer",
              "price": property.price,
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "url": canonicalUrl
            },
            "brand": { "@type": "Organization", "name": "Gesgrama" },
            "additionalProperty": [
              { "@type": "PropertyValue", "name": "Habitaciones", "value": property.bedrooms },
              { "@type": "PropertyValue", "name": "Baños", "value": property.bathrooms },
              { "@type": "PropertyValue", "name": "Superficie", "value": `${property.surface} m²` }
            ],
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
  const [property, setProperty] = useState(() => {
    const list = getLocalProperties();
    return list.find((p) => p.slug === slug) || properties.find((p) => p.slug === slug);
  });

  useEffect(() => {
    const list = getLocalProperties();
    const found = list.find((p) => p.slug === slug) || properties.find((p) => p.slug === slug);
    if (found) setProperty(found);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  }, [slug]);

  const t = translations[language];

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

  const canonicalUrl = `${SITE_DOMAIN}/inmobiliaria/${property.slug}`;

  // Structured Data (JSON-LD) for RealEstateListing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": pData.name,
    "description": pData.description.slice(0, 160),
    "url": canonicalUrl,
    "image": property.gallery,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": pData.location,
      "addressRegion": "Barcelona",
      "addressCountry": "ES"
    }
  };

  return (
    <div className="bg-slate-100 text-onyx font-sans min-h-screen">
      {/* Head tags now served via Route.head() for SSR — removed from JSX */}

      {/* SHARED CANONICAL NAVY NAVBAR */}
      <Navbar language={language} setLanguage={changeLanguage} />

      <main className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 p-6 sm:p-10 md:p-14">
          
          {/* HEADER BACK BUTTON INSIDE CONTENT CARD */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#2563eb] transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-200/70"
            >
              <ArrowLeft className="w-4 h-4 text-[#2563eb]" /> {t.detail.back}
            </Link>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inmobiliaria Gesgrama</span>
          </div>

          {/* BREADCRUMB - UNTRUNCATED FULL NAME */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-[#2563eb] transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors">Inmobiliaria</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#2563eb] font-bold break-words">
              {pData.name}
            </span>
          </nav>

          {/* HERO GALLERY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[350px] sm:h-[420px] md:h-[480px] mb-12 rounded-2xl overflow-hidden shadow-lg">
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden">
              <img src={property.gallery[0]} alt={pData.name} loading="eager" fetchPriority="high" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4 h-full">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={property.gallery[1]} alt={`${pData.name} interior`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img src={property.gallery[2]} alt={`${pData.name} detalle`} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#2563eb]/10 text-[#2563eb] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">{pData.type}</span>
                    <span className="bg-slate-100 text-[#0f172a] text-xs font-mono font-black px-3 py-1 rounded-full border border-slate-300">
                      Ref: {property.ref || "API A10750"}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900 mb-2 font-sans">{pData.name}</h1>
                  <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-[#2563eb]" /> {formatLocation(pData.location || property.location, language)} {property.city ? `(${property.city})` : ""}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#2563eb] font-sans">{property.priceFormatted}</div>
              </div>

              {/* FEATURES ROW */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-slate-100 mb-10">
                <div className="flex items-center gap-3">
                  <Bed className="w-6 h-6 text-[#2563eb]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.detail.bedrooms}</div>
                    <div className="font-bold text-lg text-slate-900">{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-6 h-6 text-[#2563eb]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.detail.bathrooms}</div>
                    <div className="font-bold text-lg text-slate-900">{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize className="w-6 h-6 text-[#2563eb]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.detail.surface}</div>
                    <div className="font-bold text-lg text-slate-900">{property.surface} m²</div>
                  </div>
                </div>
                {pData.floor && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#2563eb]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t.detail.floor}</div>
                      <div className="font-bold text-lg text-slate-900">{pData.floor}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black mb-6 text-slate-900 font-sans">{t.detail.description}</h2>
                <p className="text-slate-700 leading-relaxed text-base md:text-lg whitespace-pre-line font-sans">{pData.description}</p>
              </div>

              {/* FEATURES LIST */}
              <div className="mb-12">
                <h3 className="text-xl font-extrabold mb-6 text-slate-900 font-sans">{t.detail.features}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pData.features.map((feat: string) => (
                    <li key={feat} className="flex items-center gap-3 text-slate-800 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* VIDEO TOUR COMPONENT */}
              <div className="mb-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
                <h3 className="text-xl font-bold font-serif mb-2">Recorrido en Vídeo de la Propiedad</h3>
                <p className="text-slate-400 text-sm mb-6">Visualiza el inmueble con todo detalle desde cualquier dispositivo.</p>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                  <iframe
                    src={property.videoUrl || "https://www.youtube.com/embed/videoseries?list=PLgesgrama"}
                    title={`Recorrido en vídeo - ${pData.name}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                </div>
              </div>
            </div>

            {/* SIDEBAR CTA */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 sticky top-28 shadow-sm">
                <h3 className="text-xl font-extrabold mb-2 text-slate-900 font-sans">{t.detail.interested}</h3>
                <p className="text-xs font-mono font-bold text-blue-600 mb-4">Referencia: {property.ref || "API A10750"}</p>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                  {t.detail.contactDesc.replace("{name}", pData.name)}
                </p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-[#075E54] hover:bg-[#054c44] text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    WhatsApp (601 25 94 24)
                  </a>
                  <a href="tel:+34934685656" className="w-full flex items-center justify-center gap-3 border border-slate-200 text-slate-900 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-white transition-all duration-300">
                    <Phone className="w-5 h-5" /> Oficina (93 468 56 56)
                  </a>
                </div>
                
                <p className="text-[10px] text-center text-slate-400 mt-6 uppercase tracking-wider font-semibold">Ref: {property.id.toUpperCase()}</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM NAVIGATION BLOCK TO KEEP EXPLORING THE WEBSITE */}
        <div className="mt-12 bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-lg border border-slate-200/80">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 font-sans">
            {language === 'ca' ? 'Descobreix més immobles a Barcelona' : language === 'en' ? 'Discover More Properties in Barcelona' : 'Descubre más inmuebles en Barcelona'}
          </h3>
          <p className="text-slate-500 text-sm md:text-base font-medium mb-6">
            {language === 'ca' 
              ? 'Explora el nostre catàleg complet de pisos o sol·licita una tasació personalitzada.' 
              : language === 'en'
              ? 'Explore our full property catalog or request a personalized valuation.'
              : 'Explora nuestro catálogo completo de pisos o solicita una tasación personalizada sin compromiso.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/#propiedades"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  Catálogo Inmobiliario
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Ver todos los inmuebles</p>
              </div>
            </a>

            <a
              href="/#valuator-form"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  Valorar mi Propiedad
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Tasación gratuita</p>
              </div>
            </a>

            <a
              href="/#contacto"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  Contactar con Asesor
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Atención inmediata</p>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER CORPORATIVO UNIFICADO */}
      <footer className="bg-[#0b1329] text-white pt-16 pb-0 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-14">
          <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-16">
            
            {/* Left Block: Logo, Info & 4 Columns */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              
              {/* Brand Col */}
              <div>
                <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                  <img src={logoImg} alt="Gesgrama" className="w-10 h-10 rounded-xl object-contain bg-white p-1" />
                  <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-200 transition-colors font-sans">
                    GESGRAMA
                  </span>
                </Link>
                <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
                  {t.footer.brandDesc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Colegiados CAFBL 8.423 · AICAT 7.892
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">Navegación</h3>
                <ul className="space-y-3.5">
                  <li>
                    <Link to="/" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <a href="/#propiedades" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Inmuebles
                    </a>
                  </li>
                  <li>
                    <a href="/#servicios" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="/#contacto" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">Contacto</h3>
                <ul className="space-y-3.5 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                    <span>Rambla de Sant Sebastià, 48, Santa Coloma de Gramenet</span>
                  </li>
                  <li>
                    <a href="tel:934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      93 468 56 56
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] shrink-0">
                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                      </svg>
                      WhatsApp: 601 259 424
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
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">Legal</h3>
                <ul className="space-y-3.5">
                  <li>
                    <Link to="/aviso-legal" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Aviso Legal
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-privacidad" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Política de Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-cookies" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      Política de Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Block: Mascot Illustration */}
            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Bottom Horizontal Block: Acreditaciones Profesionales */}
          <div className="border-t border-slate-800 pt-8 mt-12">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES OFICIALES
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. Todos los derechos reservados. · Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener">Kovia</a></p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">Aviso Legal</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">Privacidad</Link>
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
    </div>
  );
}
