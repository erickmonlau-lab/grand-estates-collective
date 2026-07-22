import { createFileRoute, Link } from "@tanstack/react-router";
import { properties } from "../data/properties";
import { ArrowLeft, Bath, Bed, Maximize, MapPin, Building2, Phone, MessageCircle, ChevronRight } from "lucide-react";
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
        <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Gesgrama Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-onyx/60 hover:text-primary-blue transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.detail.back}
          </Link>
        </nav>

        <main className="pt-28 pb-16 px-4 md:px-8 flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white rounded-[28px] md:rounded-[36px] p-8 md:p-12 text-center shadow-xl border border-slate-100">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              Error 404
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-onyx mb-4">{t.detail.notFound}</h1>
            <p className="text-onyx/60 text-base md:text-lg mb-8 leading-relaxed">{t.detail.notFoundDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto bg-primary-blue text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-onyx transition-colors shadow-md">
                {t.detail.backHome}
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-onyx text-white py-8 px-6 text-center text-xs text-white/50 border-t border-white/10">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.derechos}</p>
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

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={logoImg} alt="Gesgrama Inmobiliaria" className="h-10 w-auto object-contain" />
        </Link>
        <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-onyx/60 hover:text-primary-blue transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t.detail.back}
        </Link>
      </nav>

      <main className="pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 p-6 sm:p-10 md:p-14">
          
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-2 text-xs font-semibold text-onyx/50">
            <Link to="/" className="hover:text-primary-blue transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-onyx/30" />
            <span className="text-onyx/50">Inmobiliaria</span>
            <ChevronRight className="w-3.5 h-3.5 text-onyx/30" />
            <span className="text-primary-blue font-bold truncate max-w-[200px] sm:max-w-[400px]">
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
                  <span className="bg-primary-blue/10 text-primary-blue text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block">{pData.type}</span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-onyx mb-2">{pData.name}</h1>
                  <div className="flex items-center gap-2 text-onyx/60 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-primary-blue" /> {pData.location}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-primary-blue">{property.priceFormatted}</div>
              </div>

              {/* FEATURES ROW */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-slate-100 mb-10">
                <div className="flex items-center gap-3">
                  <Bed className="w-6 h-6 text-primary-blue/70" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">{t.detail.bedrooms}</div>
                    <div className="font-semibold text-lg">{property.bedrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-6 h-6 text-primary-blue/70" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">{t.detail.bathrooms}</div>
                    <div className="font-semibold text-lg">{property.bathrooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize className="w-6 h-6 text-primary-blue/70" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">{t.detail.surface}</div>
                    <div className="font-semibold text-lg">{property.surface} m²</div>
                  </div>
                </div>
                {pData.floor && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-primary-blue/70" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-onyx/40 font-bold">{t.detail.floor}</div>
                      <div className="font-semibold text-lg">{pData.floor}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-onyx">{t.detail.description}</h2>
                <p className="text-onyx/75 leading-relaxed text-base md:text-lg whitespace-pre-line">{pData.description}</p>
              </div>

              {/* FEATURES LIST */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-onyx">{t.detail.features}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pData.features.map((feat: string) => (
                    <li key={feat} className="flex items-center gap-3 text-onyx/80 font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary-blue shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SIDEBAR CTA */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 sticky top-28 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-onyx">{t.detail.interested}</h3>
                <p className="text-onyx/60 text-sm mb-8 leading-relaxed">
                  {t.detail.contactDesc.replace("{name}", pData.name)}
                </p>
                
                <div className="space-y-4">
                  <a href="https://wa.me/34600000000" className="w-full flex items-center justify-center gap-3 bg-primary-blue text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-onyx transition-all duration-300 shadow-md">
                    <MessageCircle className="w-5 h-5" /> {t.detail.whatsappBtn}
                  </a>
                  <a href="tel:+34900000000" className="w-full flex items-center justify-center gap-3 border border-black/10 text-onyx py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
                    <Phone className="w-5 h-5" /> {t.detail.callBtn}
                  </a>
                </div>
                
                <p className="text-[10px] text-center text-onyx/40 mt-6 uppercase tracking-wider font-semibold">Ref: {property.id.toUpperCase()}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-onyx text-white py-12 px-6 md:px-12 border-t border-white/10 text-center text-xs text-white/50">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.derechos}</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.propiedades}</Link>
            <Link to="/" className="hover:text-white transition-colors">{t.nav.servicios}</Link>
            <Link to="/" className="hover:text-white transition-colors">{t.nav.contacto}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
