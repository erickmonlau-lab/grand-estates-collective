import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Building2, 
  ShieldCheck, 
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
  FileText
} from "lucide-react";
import { GEO_LOCATIONS, type GeoLocationData } from "@/data/geoLocations";
import { AccreditationBadges } from "@/components/AccreditationBadges";

const SITE_DOMAIN = "https://www.gesgrama.es";

export const Route = createFileRoute("/administrador-fincas_/$city")({
  head: ({ params }) => {
    const citySlug = (params.city as string) || "santa-coloma-de-gramenet";
    const data: GeoLocationData = GEO_LOCATIONS[citySlug] || GEO_LOCATIONS["santa-coloma-de-gramenet"];
    const canonicalUrl = `${SITE_DOMAIN}/administrador-fincas/${data.slug}`;
    const ogImage = "https://www.gesgrama.es/og-image.png";

    // JSON-LD Schemas (ProfessionalService + FAQPage + BreadcrumbList)
    const jsonLdGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${canonicalUrl}#service`,
          "name": `Gesgrama — Administrador de Fincas en ${data.cityName}`,
          "alternateName": "Gesgrama Administració de Finques",
          "url": canonicalUrl,
          "telephone": "+34934685656",
          "email": "info@gesgrama.com",
          "priceRange": data.priceRange,
          "image": ogImage,
          "logo": "https://www.gesgrama.es/logo.png",
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
            "latitude": data.geo.latitude,
            "longitude": data.geo.longitude
          },
          "areaServed": [
            {
              "@type": "City",
              "name": data.cityName
            },
            ...data.neighborhoods.map(n => ({
              "@type": "AdministrativeArea",
              "name": `${n.name}, ${data.cityName}`
            }))
          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
              "opens": "09:00",
              "closes": "14:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
              "opens": "16:00",
              "closes": "19:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Friday",
              "opens": "09:00",
              "closes": "14:00"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios de Administración de Fincas",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": `Administración integral de comunidades en ${data.cityName}`
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Auditoría de cuentas y reducción de morosidad"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Tramitación de ITE y subvenciones de rehabilitación NextGen"
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
              "name": "Administración de Fincas",
              "item": `${SITE_DOMAIN}/servicios/administracion-de-fincas`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": data.cityName,
              "item": canonicalUrl
            }
          ]
        }
      ]
    };

    return {
      meta: [
        { title: data.metaTitle },
        { name: "description", content: data.metaDescription },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        { property: "og:title", content: data.metaTitle },
        { property: "og:description", content: data.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "es_ES" },
        { property: "og:site_name", content: "Gesgrama" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: data.metaTitle },
        { name: "twitter:description", content: data.metaDescription },
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
  component: GeoLocalPage
});

function GeoLocalPage() {
  const { city } = Route.useParams();
  const data = GEO_LOCATIONS[city] || GEO_LOCATIONS["santa-coloma-de-gramenet"];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const otherCities = Object.values(GEO_LOCATIONS).filter(c => c.slug !== data.slug);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── HEADER / TOP NAV ── */}
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
            {/* Phone CTA */}
            <a 
              href="tel:+34934685656" 
              aria-label="Llamar por teléfono a Gesgrama"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-300 text-slate-800 text-xs sm:text-sm font-extrabold hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#2563eb]" />
              <span>93 468 56 56</span>
            </a>

            {/* WhatsApp CTA with AAA contrast (Emerald #166534) */}
            <a 
              href={`https://wa.me/34601259424?text=Hola,%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20administraci%C3%B3n%20de%20fincas%20en%20${encodeURIComponent(data.cityName)}`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp con respuesta inmediata"
              className="inline-flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Urgente</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO SECTION GEOLOCALIZADO ── */}
        <section className="relative bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb]/20 text-[#60a5fa] border border-[#2563eb]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  {data.cityName}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Atención presencial en ~{data.emergencyResponseTimeMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold">
                  {data.postalCodes.join(", ")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {data.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
                {data.heroSubtitle}
              </p>

              {/* Bullet points of trust */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  `+${data.satisfiedCommunitiesCount} comunidades gestionadas`,
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
                  href={`#calculadora-presupuesto`}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm sm:text-base py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group"
                >
                  <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Pedir Presupuesto Gratis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href={`https://wa.me/34601259424?text=Hola,%20solicito%20estudio%20para%20comunidad%20en%20${encodeURIComponent(data.cityName)}`}
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
                    ¿Cuánto puede ahorrar tu comunidad en {data.cityName}?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Enviamos una comparativa de costes detallada en menos de 24 horas laborables.
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
                    const message = `Hola Gesgrama, solicito presupuesto para mi comunidad en ${data.cityName}. Vecinos: ${vecinos}, Tel: ${phone}, Email: ${email}`;
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
                      Dirección aproximada o Barrio en {data.cityName}
                    </label>
                    <input 
                      type="text" 
                      name="address"
                      placeholder={`Ej. ${data.neighborhoods[0]?.name || "Calle Mayor"}`} 
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
                    🔒 Sin permanencia · Sin coste de traspaso · Datos protegidos por RGPD.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── BARRIOS Y REALIDAD LOCAL DE LA CIUDAD ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-2">
                Conocimiento Local Exhaustivo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
                Experiencia en los Barrios y Fincas de {data.cityName}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
                Cada zona urbana tiene problemáticas constructivas y comunitarias distintas. Adaptamos el plan de conservación a la antigüedad y tipología de cada escalera.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.neighborhoods.map((n, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-lg font-black text-slate-900">{n.name}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        CP {n.postalCode}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4 leading-relaxed">
                      {n.buildingTypology}
                    </p>

                    <div className="space-y-2 mb-4">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                        Problemáticas habituales resueltas:
                      </span>
                      {n.commonIssues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2563eb] shrink-0 mt-0.5" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="#calculadora-presupuesto"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-[#2563eb] hover:text-[#1d4ed8] uppercase tracking-wider pt-3 border-t border-slate-100"
                  >
                    <span>Pedir presupuesto para {n.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NORMATIVAS Y SUBVENCIONES LOCALES ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block">
                Asesoría Legal e ITE en {data.cityName}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Protección Legal y Acceso a Subvenciones para tu Finca
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Nuestra condición de peritos judiciales colegiados permite a las comunidades de {data.cityName} navegar con seguridad entre normativas municipales y convocatorias de rehabilitación.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <h3 className="text-sm font-black text-blue-900 mb-1">🏛️ Fiscalidad y Plusvalía Municipal</h3>
                  <p className="text-xs sm:text-sm text-blue-800">{data.localRegulations.plusvaliaInfo}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <h3 className="text-sm font-black text-emerald-900 mb-1">💶 Fondos Europeos y Rehabilitación</h3>
                  <p className="text-xs sm:text-sm text-emerald-800">{data.localRegulations.subsidiesInfo}</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <h3 className="text-sm font-black text-amber-900 mb-1">📋 Inspección Técnica de Edificios (ITE)</h3>
                  <p className="text-xs sm:text-sm text-amber-800">{data.localRegulations.iteStatus}</p>
                </div>
              </div>
            </div>

            {/* Testimonial card */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-slate-900 to-[#0b1221] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center font-black text-lg text-white">
                    {data.testimonial.author[0]}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black">{data.testimonial.author}</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {data.testimonial.role} · Barrio {data.testimonial.neighborhood} ({data.cityName})
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed mb-6 font-serif">
                  "{data.testimonial.quote}"
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10 font-sans">
                  <span>Año de gestión: {data.testimonial.year}</span>
                  <span className="text-emerald-400 font-bold">Comunidad Verificada</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQS GEOLOCALIZADAS (RICH SNIPPETS GOOGLE) ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-2">
                Preguntas Frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
                Dudas Habituales en {data.cityName}
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Respuestas directas sobre honorarios, traspaso de cuentas y funcionamiento del servicio.
              </p>
            </div>

            <div className="space-y-4">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-colors"
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
                      <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-700 leading-relaxed font-medium border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CIUDADES VECINAS (ENLAZADO INTERNO GEO-LOCAL) ── */}
        <section className="py-12 px-4 sm:px-6 lg:px-12 bg-white border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 text-center">
              Administración de Fincas en Otras Localidades del Área Metropolitana:
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {otherCities.map((other) => (
                <Link
                  key={other.slug}
                  to="/administrador-fincas/$city"
                  params={{ city: other.slug }}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-[#2563eb] text-slate-700 hover:text-white text-xs sm:text-sm font-bold transition-all shadow-2xs"
                >
                  Administrador en {other.cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO CON ACREDITACIONES ── */}
      <footer className="bg-[#0b1221] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-10">
          {/* Acreditaciones Oficiales */}
          <div className="border-b border-white/10 pb-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES OFICIALES
            </h3>
            <AccreditationBadges />
          </div>

          {/* Bottom Bar */}
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
