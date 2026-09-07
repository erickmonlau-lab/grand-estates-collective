import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Building2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ChevronDown, 
  Award, 
  Scale, 
  ArrowRight,
  Calculator,
  ShieldCheck
} from "lucide-react";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { AccreditationBadges } from "@/components/AccreditationBadges";

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

  const allBarrios = Object.values(SANTA_COLOMA_BARRIOS);
  const otherBarrios = allBarrios.filter(b => b.slug !== data.slug);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── HEADER DE NAVEGACIÓN ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/logo-gesgrama-text-horizontal.webp" 
              alt="Gesgrama Fincas" 
              width={180} 
              height={44} 
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
            <Link to="/" className="hover:text-[#2563eb] transition-colors">Inicio</Link>
            <a href="/#servicios" className="hover:text-[#2563eb] transition-colors">Servicios</a>
            <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors">Inmuebles</a>
            <a href="/#contacto" className="hover:text-[#2563eb] transition-colors">Contacto</a>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:+34934685656" 
              aria-label="Llamar por teléfono a Gesgrama"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 text-slate-800 text-xs sm:text-sm font-extrabold hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2563eb]" />
              <span>93 468 56 56</span>
            </a>

            <a 
              href={`https://wa.me/34601259424?text=Hola,%20solicito%20informaci%C3%B3n%20para%20una%20comunidad%20en%20el%20barrio%20de%20${encodeURIComponent(data.name)}%20(Santa%20Coloma)`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="inline-flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Urgente</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO SECTION ENFOCADO EN EL BARRIO DE SANTA COLOMA ── */}
        <section className="relative bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb]/20 text-[#60a5fa] border border-[#2563eb]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  Barrio {data.name} · Santa Coloma de Gramenet
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Atención presencial en ~{data.emergencyResponseMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold">
                  CP {data.postalCode} · {data.district}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {isGlobal 
                  ? "Administración de Fincas y Comunidades en Santa Coloma de Gramenet"
                  : data.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                {isGlobal
                  ? "Sede central en Av. dels Banús, 49. Más de 15 años gestionando comunidades en los 14 barrios de Santa Coloma con total transparencia contable, auditoría gratis de gastos y peritos judiciales colegiados."
                  : data.heroSubtitle}
              </p>

              {/* Bullet points of trust */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Sede física en Santa Coloma (Av. dels Banús, 49)",
                  "Auditoría contable y revisión de contratos gratis",
                  "Cero comisiones ocultas en obras y proveedores",
                  "Peritos judiciales inmobiliarios colegiados"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base text-slate-200 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="#calculadora-presupuesto"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm sm:text-base py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group"
                >
                  <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Pedir Estudio Económico Gratis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href={`https://wa.me/34601259424?text=Hola,%20solicito%20estudio%20para%20comunidad%20en%20el%20barrio%20de%20${encodeURIComponent(data.name)}%20(Santa%20Coloma)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm sm:text-base py-4 px-6 rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Card: Quick Request Form */}
            <div id="calculadora-presupuesto" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900">
                <div className="mb-5">
                  <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-1">
                    Estudio Económico Gratuito
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    ¿Cuánto puede ahorrar tu comunidad en {data.name}?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
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
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Nº de Vecinos / Entidades en la Finca
                    </label>
                    <input 
                      type="number" 
                      name="vecinos"
                      min="2" 
                      max="300" 
                      defaultValue="12" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                        Teléfono de Contacto
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="600 000 000" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="tu@email.com" 
                        required 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Calle de la Finca en {data.name}
                    </label>
                    <input 
                      type="text" 
                      name="street"
                      placeholder={`Ej. ${data.testimonial.street}`} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Estudio de Costes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    🔒 Sin permanencia · Sin coste de traspaso · Sede en Santa Coloma de Gramenet.
                  </p>
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

        {/* ── FAQS DEL BARRIO ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-2">
                Preguntas Frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
                Dudas Comunes en el barrio de {data.name}
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Respuestas directas sobre honorarios, traspaso de administración y averías.
              </p>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                  >
                    <button 
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 sm:p-6 font-black text-slate-900 text-base sm:text-lg flex items-center justify-between gap-4 hover:text-[#2563eb] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#2563eb]" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-700 leading-relaxed font-medium border-t border-slate-200/60 pt-4 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RED COMPLETA DE LOS 14 BARRIOS DE SANTA COLOMA ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-900 text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8] block mb-2">
                Presencia en Toda la Ciudad
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                Administración de Fincas en Todos los Barrios de Santa Coloma
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">
                Cobertura directa desde nuestra sede en Av. dels Banús, 49 a cada una de las 14 zonas oficiales de la ciudad:
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
                        ? "bg-[#2563eb] text-white font-black shadow-lg ring-2 ring-white/20" 
                        : "bg-white/5 hover:bg-white/15 text-slate-200 font-bold border border-white/10"
                    }`}
                  >
                    <span className="text-sm block">{b.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{b.postalCode}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO CON ACREDITACIONES ── */}
      <footer className="bg-[#0b1221] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="border-b border-white/10 pb-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES OFICIALES
            </h3>
            <AccreditationBadges />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-4 text-sm sm:text-base text-white font-extrabold">
            <p>© 2026 Gesgrama. Todos los derechos reservados. · Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener">Kovia</a></p>
            <div className="flex gap-4">
              <Link to="/aviso-legal" className="hover:text-blue-200">Aviso Legal</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">Privacidad</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
