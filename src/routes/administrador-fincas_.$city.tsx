import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Award, 
  Scale, 
  ArrowRight,
  Calculator,
  ShieldCheck,
  Mail,
  Check
} from "lucide-react";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_DOMAIN = "https://www.gesgrama.es";

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

    // JSON-LD Schemas (ProfessionalService + FAQPage + BreadcrumbList)
    const jsonLdGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${canonicalUrl}#service`,
          "name": `Gesgrama — Administrador de Fincas en ${data.name}, Santa Coloma de Gramenet`,
          "alternateName": "Gesgrama Administració de Finques Santa Coloma",
          "url": canonicalUrl,
          "telephone": "+34934685656",
          "email": "info@gesgrama.com",
          "priceRange": "€€",
          "image": ogImage,
          "logo": "https://www.gesgrama.es/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. dels Banús, 49",
            "addressLocality": "Santa Coloma de Gramenet",
            "postalCode": data.postalCode,
            "addressRegion": "Barcelona",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.geo.latitude,
            "longitude": data.geo.longitude
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": `Barrio de ${data.name}, Santa Coloma de Gramenet`
            },
            {
              "@type": "City",
              "name": "Santa Coloma de Gramenet"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Administración de Fincas en Santa Coloma",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Administración integral de comunidades en ${data.name}`
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Auditoría contable y reducción de morosidad vecinal"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tramitación de ITE y subvenciones de accesibilidad NextGen"
                }
              }
            ]
          }
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
        { property: "og:width", content: "1200" },
        { property: "og:height", content: "630" },
        { property: "og:locale", content: "es_ES" },
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
  const isGlobal = rawSlug === "santa-coloma-de-gramenet";
  const data: NeighborhoodDetail = SANTA_COLOMA_BARRIOS[rawSlug] || SANTA_COLOMA_BARRIOS["centre"];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");

  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem("language") as "es" | "en" | "ca";
      if (savedLang && ["es", "en", "ca"].includes(savedLang)) {
        setLanguage(savedLang);
      }
    };
    syncLang();
    window.addEventListener("languagechange", syncLang);
    window.addEventListener("storage", syncLang);
    return () => {
      window.removeEventListener("languagechange", syncLang);
      window.removeEventListener("storage", syncLang);
    };
  }, []);

  const handleLanguageChange = (lang: "es" | "en" | "ca") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(new Event("languagechange"));
  };

  const allBarrios = Object.values(SANTA_COLOMA_BARRIOS);
  const otherBarrios = allBarrios.filter(b => b.slug !== data.slug);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── NAVBAR OFICIAL CORPORATIVO FLOTANTE DE GESGRAMA ── */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      <main>
        {/* ── HERO SECTION ENFOCADO EN EL BARRIO DE SANTA COLOMA ── */}
        <section className="relative bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-950 text-white pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges bar - SOLID BACKGROUNDS (NO TRANSPARENCY) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#1e3a6e] text-white border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  Barrio {data.name} · Santa Coloma
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-black shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                  Atención en ~{data.emergencyResponseMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-100 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  CP {data.postalCode} · {data.district}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {isGlobal 
                  ? "Administración de Fincas y Comunidades en Santa Coloma de Gramenet"
                  : data.heroHeadline}
              </h1>

              {/* Subtitle with enhanced visibility and solid contrast */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 max-w-2xl shadow-md">
                <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                  {isGlobal
                    ? "Sede central en Av. dels Banús, 49. Más de 15 años gestionando comunidades en los 14 barrios de Santa Coloma con total transparencia contable, auditoría gratis de gastos y peritos judiciales colegiados."
                    : data.heroSubtitle}
                </p>
              </div>

              {/* Bullet points of trust */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Sede física en Santa Coloma (Av. dels Banús, 49)",
                  "Auditoría contable y revisión de contratos gratis",
                  "Cero comisiones ocultas en obras y proveedores",
                  "Peritos judiciales inmobiliarios colegiados"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base text-slate-100 font-bold bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="#calculadora-presupuesto"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm sm:text-base py-3.5 px-7 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Calculator className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                  <span>Pedir Estudio Económico Gratis</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href={`https://wa.me/34601259424?text=Hola,%20solicito%20estudio%20para%20comunidad%20en%20el%20barrio%20de%20${encodeURIComponent(data.name)}%20(Santa%20Coloma)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#075E54] hover:bg-[#054c44] text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                  </svg>
                  <span>WhatsApp 601 25 94 24</span>
                </a>
              </div>
            </div>

            {/* Right Card: Quick Request Form */}
            <div id="calculadora-presupuesto" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-slate-200 text-slate-900">
                <div className="mb-5">
                  <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-1">
                    Estudio Económico Gratuito
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    ¿Cuánto puede ahorrar tu comunidad en {data.name}?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                    Enviamos una comparativa detallada de cuotas y suministros en menos de 24 horas.
                  </p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const email = fd.get("email");
                    const phone = fd.get("phone");
                    const vecinos = fd.get("vecinos");
                    const street = fd.get("street") || data.name;
                    const message = `Hola Gesgrama, solicito presupuesto para mi comunidad en Santa Coloma (Barrio ${data.name}, calle ${street}). Vecinos: ${vecinos}, Tel: ${phone}, Email: ${email}`;
                    window.open(`https://wa.me/34601259424?text=${encodeURIComponent(message)}`, "_blank");
                  }} 
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                      Nº de Vecinos / Entidades en la Finca
                    </label>
                    <input 
                      type="number" 
                      name="vecinos"
                      min="2" 
                      max="300" 
                      defaultValue="12" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                        Teléfono de Contacto
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="600 000 000" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="tu@email.com" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                      Calle de la Finca en {data.name}
                    </label>
                    <input 
                      type="text" 
                      name="street"
                      placeholder={`Ej. ${data.testimonial.street}`} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 px-6 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Solicitar Estudio de Costes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Clarified, perfectly readable disclaimer pill */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-center shadow-2xs">
                    <p className="text-xs sm:text-[13px] font-extrabold text-slate-800 leading-snug">
                      🔒 Sin permanencia · Sin coste de traspaso · Sede en Santa Coloma de Gramenet.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── DETALLES ESPECÍFICOS DEL BARRIO ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block">
                  Tipología y Problemáticas en {data.name}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  Especialistas en la Realidad Constructiva de {data.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  {data.buildingTypology}
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Intervenciones habituales que gestionamos en este barrio:
                  </h3>
                  {data.commonIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 shadow-2xs">
                      <CheckCircle2 className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial de este barrio */}
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-slate-900 to-[#0b1221] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center font-black text-lg text-white">
                      {data.testimonial.author[0]}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black">{data.testimonial.author}</h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {data.testimonial.role} · {data.testimonial.street} (Barrio {data.name})
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed mb-6 font-serif">
                    "{data.testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10 font-sans">
                    <span>Año de gestión: {data.testimonial.year}</span>
                    <span className="text-emerald-400 font-bold">Comunidad de Santa Coloma Verificada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQS DEL BARRIO (DISEÑO CORPORATIVO GESGRAMA) ── */}
        <section 
          id="faq" 
          className="relative overflow-hidden bg-[#e2e8f0] text-slate-900 py-12 md:py-16 scroll-mt-24 md:scroll-mt-28"
        >
          <div className="bg-[#0b172a] rounded-[24px] md:rounded-[30px] shadow-xl border border-white/10 p-6 sm:p-8 md:p-10 mx-4 md:mx-auto max-w-[1100px] relative z-10 overflow-hidden text-white flex flex-col items-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center w-full">
              <div className="text-center mb-8 flex flex-col items-center">
                {/* White Badge with Icon next to Text */}
                <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200 mb-3 font-sans">
                  <HelpCircle className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                  <span>Preguntas Frecuentes · {data.name}</span>
                </span>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white tracking-tight font-sans mb-3 text-center">
                  <span className="bg-[#2563eb] text-white px-3 py-1 rounded-xl inline-block shadow-md">
                    Dudas Comunes
                  </span>{" "}
                  en comunidades de {data.name}
                </h2>

                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans text-center">
                  Respuestas claras de nuestros administradores colegiados sobre normativa, costes, obras y gestión vecinal específica en {data.name}.
                </p>
              </div>

              {/* Accordion Cards */}
              <div className="w-full flex flex-col gap-3 mb-8">
                {data.faqs.map((faq, idx) => {
                  const isActive = activeFaq === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveFaq(isActive ? null : idx)}
                      className="cursor-pointer bg-[#e2e8f0] border border-slate-300/80 rounded-xl p-4 sm:p-5 shadow-xs transition-colors duration-200 hover:border-slate-400 group"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="font-black text-[#0f172a] text-sm sm:text-base md:text-lg pr-2 font-sans leading-snug">
                          {faq.question}
                        </h3>
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
                            <p className="pt-3 text-[#0f172a] leading-relaxed font-bold text-xs sm:text-sm md:text-base border-t border-slate-300/80 mt-3 font-sans">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Eye-Catching Blue CTA Button */}
              <div className="text-center">
                <a 
                  href="#calculadora-presupuesto" 
                  className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer font-sans"
                >
                  <span>Pedir Presupuesto o Consultar Duda</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COBERTURA EN SANTA COLOMA ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-900 text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8] block mb-2">
                Presencia Local
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                Cobertura en Santa Coloma de Gramenet
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">
                Atención presencial e inmediata en todas las zonas oficiales de la ciudad:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {allBarrios.map((b) => {
                const isCurrent = b.slug === data.slug;
                return (
                  <Link
                    key={b.slug}
                    to="/administrador-fincas/$city"
                    params={{ city: b.slug }}
                    className={`p-3.5 rounded-2xl text-center flex flex-col items-center justify-center transition-all ${
                      isCurrent 
                        ? "bg-[#2563eb] text-white font-black shadow-lg ring-4 ring-blue-400/30 scale-105" 
                        : "bg-white hover:bg-blue-50 text-slate-900 hover:text-[#2563eb] font-extrabold shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="text-sm block">{b.name}</span>
                    <span className={`text-[10px] mt-0.5 font-bold ${isCurrent ? "text-blue-100" : "text-slate-500"}`}>CP {b.postalCode}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA Y ENLACES ── */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10">
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
                  Administración de fincas e intermediación inmobiliaria en Santa Coloma de Gramenet con más de 15 años de experiencia.
                </p>
              </div>

              {/* Navegación rápida */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">Navegación</h3>
                <ul className="space-y-3.5">
                  {[
                    { label: "Propiedades", href: "/#propiedades" },
                    { label: "Servicios", href: "/#servicios" },
                    { label: "Nosotros", href: "/#nosotros" },
                    { label: "Contacto", href: "/#contacto" },
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
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">Contacto Directo</h3>
                <ul className="space-y-4 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                    <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                  </li>
                  <li>
                    <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      Oficina: 93 468 56 56
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
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES OFICIALES
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18]">
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
