import { createFileRoute, Link } from "@tanstack/react-router";
import { properties } from "../data/properties";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bath, Bed, Maximize, MapPin, Building2, Phone, MessageCircle, ChevronRight, Menu, X, Home } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useEffect, useState } from "react";
import { translations } from "../data/translations";

export const Route = createFileRoute("/inmobiliaria/$slug")({
  component: PropertyDetail,
});

const SITE_DOMAIN = "https://www.gesgrama.es";

function PropertyDetail() {
  const { slug } = Route.useParams();
  const property = properties.find((p) => p.slug === slug);
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguage(stored);
      }
    }
  }, []);

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

  const pData = t.propertiesData[property.id] || {
    name: property.name,
    type: property.type,
    location: property.location,
    floor: property.floor,
    description: property.description,
    features: property.features,
  };

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
      {/* Dynamic SEO Meta & Head Tags */}
      <title>{`${pData.name} — ${property.priceFormatted} | Gesgrama Inmobiliaria`}</title>
      <meta name="description" content={`${pData.type} en ${pData.location}: ${pData.description.slice(0, 140)}...`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={`${pData.name} — ${property.priceFormatted}`} />
      <meta property="og:description" content={`${pData.type} en ${pData.location}. ${property.bedrooms} hab. | ${property.surface} m²`} />
      <meta property="og:image" content={property.gallery[0]} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pData.name} />
      <meta name="twitter:description" content={`${pData.type} en ${pData.location}`} />
      <meta name="twitter:image" content={property.gallery[0]} />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FLOATING CAPSULE NAVIGATION HEADER */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[94%] max-w-[1300px] z-[100] flex items-center justify-between py-2 md:py-2.5 px-4 md:px-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-slate-900"
      >
        <Link to="/" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2">
          <img src={logoImg} alt="Gesgrama" className="h-9 sm:h-11 md:h-12 w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[220px] object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-[13px] md:text-[14px] font-bold text-slate-700 tracking-widest uppercase">
          <Link to="/" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
          <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="/#servicios" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="/#contacto" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 shrink-0 pr-1">
          <div className="flex items-center bg-slate-100/90 border border-slate-200 rounded-full p-1 text-[10px] md:text-[12px] font-bold shadow-inner">
            {(["es", "ca", "en"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-full transition-all duration-200 ${language === lang ? 'bg-[#2563eb] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {lang.toUpperCase()}
                </button>
                {idx < 2 && <div className="w-px h-3 bg-slate-300 mx-0.5"></div>}
              </div>
            ))}
          </div>
          <a
            href="/#contacto"
            className="hidden sm:inline-flex items-center gap-2 bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-bold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t.nav.portal}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[99] bg-slate-950/90 backdrop-blur-xl flex flex-col pt-28 px-6 pb-10"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6 text-xl font-bold text-white uppercase tracking-wider my-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
              <a href="/#propiedades" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.propiedades}</a>
              <a href="/#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.servicios}</a>
              <a href="/#contacto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.contacto}</a>
            </div>
            <a
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#2563eb] text-white font-bold py-4 rounded-full text-center uppercase tracking-widest text-sm shadow-lg mt-auto"
            >
              {t.nav.portal}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
              <img src={property.gallery[0]} alt={pData.name} loading="eager" className="w-full h-full object-cover" />
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
                  <span className="bg-[#2563eb]/10 text-[#2563eb] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block">{pData.type}</span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900 mb-2 font-sans">{pData.name}</h1>
                  <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-[#2563eb]" /> {pData.location}
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
              <div>
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
            </div>

            {/* SIDEBAR CTA */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 sticky top-28 shadow-sm">
                <h3 className="text-xl font-extrabold mb-4 text-slate-900 font-sans">{t.detail.interested}</h3>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                  {t.detail.contactDesc.replace("{name}", pData.name)}
                </p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/34600000000" className="w-full flex items-center justify-center gap-3 bg-[#2563eb] text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-[#1d4ed8] transition-all duration-300 shadow-md">
                    <MessageCircle className="w-5 h-5" /> {t.detail.whatsappBtn}
                  </a>
                  <a href="tel:+34900000000" className="w-full flex items-center justify-center gap-3 border border-slate-200 text-slate-900 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-white transition-all duration-300">
                    <Phone className="w-5 h-5" /> {t.detail.callBtn}
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
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
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
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
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
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
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

      {/* FOOTER */}
      <footer className="bg-[#0b1221] text-white py-12 px-6 md:px-12 border-t border-slate-800 text-center text-xs text-slate-400">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
            <a href="/#propiedades" className="hover:text-white transition-colors">{t.nav.propiedades}</a>
            <a href="/#servicios" className="hover:text-white transition-colors">{t.nav.servicios}</a>
            <a href="/#contacto" className="hover:text-white transition-colors">{t.nav.contacto}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
