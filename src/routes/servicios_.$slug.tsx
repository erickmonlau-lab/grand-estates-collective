import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, TrendingUp, Shield, Paintbrush, Check, MessageCircle, ArrowLeft, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AccreditationBadges } from "@/components/AccreditationBadges";

const SITE_DOMAIN = "https://www.gesgrama.es";

export const Route = createFileRoute("/servicios_/$slug")({
  head: ({ params }) => {
    const slug = params.slug as string;
    const service = servicesData[slug] || servicesData["administracion-de-fincas"];
    const canonicalUrl = `${SITE_DOMAIN}/servicios/${service.slug}`;
    const ogImage = "https://www.gesgrama.es/og-image.png";
    return {
      meta: [
        { title: service.metaTitle },
        { name: "description", content: service.metaDesc },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { property: "og:site_name", content: "Gesgrama" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: service.metaTitle },
        { name: "twitter:description", content: service.metaDesc },
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
            "@type": "Service",
            "name": service.titleKey,
            "description": service.metaDesc,
            "url": canonicalUrl,
            "provider": {
              "@type": "RealEstateAgent",
              "name": "Gesgrama",
              "url": SITE_DOMAIN,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. dels Sants nº 49-51 local",
                "addressLocality": "Santa Coloma de Gramenet",
                "postalCode": "08923",
                "addressRegion": "Barcelona",
                "addressCountry": "ES"
              },
              "telephone": "+34934685656"
            },
            "areaServed": "Santa Coloma de Gramenet y área metropolitana",
            "serviceType": service.titleKey,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_DOMAIN },
                { "@type": "ListItem", "position": 2, "name": "Servicios", "item": `${SITE_DOMAIN}/#servicios` },
                { "@type": "ListItem", "position": 3, "name": service.titleKey, "item": canonicalUrl }
              ]
            }
          })
        }
      ]
    };
  },
  component: ServiceDetail,
});

const servicesData: Record<string, {
  id: string;
  slug: string;
  icon: any;
  titleKey: string;
  taglineKey: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  details: string[];
  benefits: string[];
  image: string;
  asuntoOption: string;
}> = {
  "administracion-de-fincas": {
    id: "fincas",
    slug: "administracion-de-fincas",
    icon: Building2,
    titleKey: "Administración de Fincas",
    taglineKey: "Gestión transparente e integral de comunidades en Santa Coloma de Gramenet",
    metaTitle: "Administración de Fincas en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Administradores de fincas colegiados en Santa Coloma de Gramenet. Gestión eficiente de comunidades, control de morosidad y resolución de incidencias.",
    intro: "En Gesgrama llevamos más de 15 años administrando comunidades de propietarios en Santa Coloma de Gramenet y comarca. Ofrecemos un servicio personalizado, transparente y orientado al ahorro de la comunidad.",
    details: [
      "Coordinación y soporte en reuniones de vecinos ordinarias y extraordinarias.",
      "Redacción y custodia de actas y libro de actas oficial.",
      "Liquidación contable anual clara y detallada para todos los vecinos.",
      "Gestión de cobro de recibos y reclamación ágil de morosidad sin costes adicionales excesivos.",
      "Atención y resolución ágil de incidencias con industriales de confianza de la zona.",
      "Asesoramiento técnico para la obtención de subvenciones para rehabilitación de edificios."
    ],
    benefits: [
      "Transparencia contable garantizada con acceso digital a las cuentas.",
      "Reducción directa de costes en contratos de mantenimiento.",
      "Administradores colegiados con seguro de responsabilidad civil."
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Administración de Fincas"
  },
  "gestion-inmobiliaria": {
    id: "inmobiliaria",
    slug: "gestion-inmobiliaria",
    icon: TrendingUp,
    titleKey: "Gestión Inmobiliaria",
    taglineKey: "Compra, venta y alquiler seguro de viviendas e inmuebles",
    metaTitle: "Gestión Inmobiliaria en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Agencia inmobiliaria especialista en Santa Coloma de Gramenet. Valoración gratuita de inmuebles, filtro riguroso de inquilinos y gestión total de la venta.",
    intro: "Si deseas vender o alquilar tu vivienda en Santa Coloma de Gramenet o alrededores, en Gesgrama garantizamos el máximo valor de mercado con absoluta tranquilidad y seguridad jurídica.",
    details: [
      "Valoración profesional precisa de mercado basada en operaciones reales recientes.",
      "Estrategia de marketing multicanal (portales inmobiliarios, red de clientes y compradores).",
      "Filtro riguroso de solvencia para inquilinos con seguro de impago opcional.",
      "Redacción de contratos de compraventa y arrendamiento según legislación vigente LAU.",
      "Gestión de cédulas de habitabilidad y certificados de eficiencia energética (CEE).",
      "Acompañamiento integral hasta la firma en Notaría."
    ],
    benefits: [
      "Sin comisiones ocultas y con valoración gratuita inicial.",
      "Amplia base de datos de compradores e inversores cualificados.",
      "Agentes Inmobiliarios Registrados de Cataluña (AICAT)."
    ],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Gestión Inmobiliaria"
  },
  "asesoria-juridica-fiscal": {
    id: "juridico",
    slug: "asesoria-juridica-fiscal",
    icon: Shield,
    titleKey: "Asesoría Jurídica y Fiscal",
    taglineKey: "Especialistas en derecho inmobiliario, herencias y arrendamientos",
    metaTitle: "Asesoría Jurídica e Inmobiliaria en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Abogados y asesores en derecho inmobiliario en Santa Coloma. Herencias, contratos de alquiler, desahucios y reclamaciones tributarias.",
    intro: "Prestamos asesoramiento legal especializado en derecho inmobiliario y patrimonial para resolver de forma rápida cualquier controversia o trámite complejo.",
    details: [
      "Gestión integral de herencias y sucesiones con inmuebles involucrados.",
      "Asesoramiento fiscal para optimizar plusvalías e impuestos patrimoniales.",
      "Resolución de conflictos en arrendamientos y procedimientos de desahucio.",
      "Redacción y revisión de contratos de arras, opción de compra y permuta.",
      "Defensa legal en juntas de propietarios y reclamaciones a morosos.",
      "Tramitación de expedientes registrales y catastrales."
    ],
    benefits: [
      "Atención por letrados colegiados especialistas en derecho inmobiliario.",
      "Resolución preventiva de conflictos para evitar costes judiciales.",
      "Presupuesto cerrado sin sorpresas."
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Asesoría Jurídica"
  },
  "obras-mantenimiento": {
    id: "obras",
    slug: "obras-mantenimiento",
    icon: Paintbrush,
    titleKey: "Obras y Mantenimiento",
    taglineKey: "Rehabilitación de edificios, reformas y gestión de ITE",
    metaTitle: "Obras, Mantenimiento e ITE en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Supervisión técnica de obras, reformas, ITE e Inspección Técnica de Edificios en Santa Coloma. Tramitación de subvenciones de rehabilitación.",
    intro: "Ofrecemos soporte técnico experto para la conservación, rehabilitación energética y mantenimiento preventivo o correctivo de fincas e inmuebles.",
    details: [
      "Inspección Técnica de Edificios (ITE) y expedición de certificados de aptitud.",
      "Proyectos de rehabilitación de fachadas, tejados y patios de luces.",
      "Eliminación de barreras arquitectónicas e instalación de ascensores.",
      "Gestión y tramitación integral de subvenciones europeas Next Generation.",
      "Comparativa y negociación de presupuestos de industriales colegiados.",
      "Dirección técnica y control de ejecución de obra."
    ],
    benefits: [
      "Ahorro de hasta el 80% mediante subvenciones públicas.",
      "Garantía de cumplimiento de plazos y calidades.",
      "Industriales homologados con amplia experiencia en la zona."
    ],
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Obras y Reformas"
  }
};

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = servicesData[slug] || servicesData["administracion-de-fincas"];

  const [language, setLanguage] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        return stored;
      }
    }
    return "es";
  });

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


  const IconComp = service.icon;

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] min-h-screen font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── NAVBAR CORPORATIVO OFICIAL ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Main Container */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-36 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#2563eb]">Inicio</Link>
          <span>/</span>
          <span className="text-[#2563eb]">Servicios</span>
          <span>/</span>
          <span className="text-slate-900 font-extrabold">{service.titleKey}</span>
        </div>

        {/* Hero Banner for Service */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 md:p-14 text-white shadow-2xl overflow-hidden relative mb-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-black uppercase px-4 py-2 rounded-full mb-4 shadow-sm">
                <IconComp className="w-4 h-4" />
                Servicio Especializado
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 font-sans">
                {service.titleKey}
              </h1>

              <p className="text-[#38bdf8] text-base md:text-xl font-bold mb-4">
                {service.taglineKey}
              </p>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl font-medium mb-8">
                {service.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#contacto`}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm py-3.5 px-7 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Solicitar este servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/34601259424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#075E54] hover:bg-[#054c44] text-white font-extrabold text-sm py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                  </svg>
                  <span>Consulta por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl aspect-[4/3]">
                <img src={service.image} alt={service.titleKey} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black text-[#0f172a] mb-6">¿Qué incluye nuestro servicio de {service.titleKey}?</h2>
              <ul className="space-y-4">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium text-sm sm:text-base">
                    <Check className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5 stroke-[3]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#0b214a] mb-4">Ventajas de elegir a Gesgrama</h3>
              <ul className="space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-800 font-bold text-xs sm:text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#0f172a] text-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-800">
              <h3 className="text-lg font-bold mb-2">¿Necesitas asesoramiento inmediato?</h3>
              <p className="text-xs text-slate-300 mb-6 font-medium">Atendemos consultas presenciales en nuestra oficina de Santa Coloma de Gramenet o por teléfono y WhatsApp.</p>
              <a
                href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#contacto`}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm py-3.5 px-6 rounded-full text-center block transition-colors shadow-sm cursor-pointer"
              >
                Solicitar presupuesto sin compromiso
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA ── */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-4">
              <div className="lg:col-span-1">
                <div className="inline-block mb-4">
                  <img src="/images/logo-gesgrama-text-horizontal.webp" alt="Gesgrama" width={212} height={52} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[260px]">
                  Administración de fincas e intermediación inmobiliaria en Santa Coloma de Gramenet con más de 15 años de experiencia.
                </p>
              </div>

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

            {/* Mascot on Mobile (<768px): Placed discreetly at the end of content, compact scale */}
            <div className="w-full md:hidden flex justify-center items-center pt-2 pb-2">
              <FooterMascot className="w-24 sm:w-28 h-auto object-contain drop-shadow-md opacity-90" />
            </div>

            <div className="hidden md:flex w-full md:w-[245px] lg:w-[275px] xl:w-[305px] items-center justify-center self-center shrink-0">
              <FooterMascot className="w-full max-h-[225px] lg:max-h-[250px] object-contain drop-shadow-lg" />
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
              ACREDITACIONES PROFESIONALES OFICIALES
            </h3>
            <AccreditationBadges language={language} />
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© 2026 Gesgrama. Todos los derechos reservados. · <span className="inline-block whitespace-nowrap">Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener" className="underline hover:text-blue-300">Kovia</a></span></p>
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
