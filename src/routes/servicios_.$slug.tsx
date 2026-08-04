import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, TrendingUp, Shield, Paintbrush, Check, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo.webp";

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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
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
    <div className="min-[#0f172a] bg-[#f8fafc] text-onyx min-h-screen font-sans">
      {/* Top Header / Nav */}
      <header className="bg-[#757989] text-white py-4 px-6 md:px-12 border-b border-white/20 shadow-md">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 bg-white p-2 rounded-xl">
            <img src={logoImg} alt="Gesgrama" className="h-9 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-bold text-white hover:text-blue-200 flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la inicio</span>
            </Link>
            <a
              href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#contacto`}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-extrabold uppercase px-5 py-2.5 rounded-full shadow-sm transition-all"
            >
              Contactar
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#005c99]">Inicio</Link>
          <span>/</span>
          <span className="text-[#005c99]">Servicios</span>
          <span>/</span>
          <span className="text-slate-800">{service.titleKey}</span>
        </div>

        {/* Hero Banner for Service */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 md:p-14 text-white shadow-2xl overflow-hidden relative mb-12 border border-sky-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-[#0284c7]/20 text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-bold uppercase px-4 py-2 rounded-full mb-4">
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
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm py-3.5 px-7 rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Solicitar este servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/34601259424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
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
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f0f7ff] border border-blue-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#005c99] mb-4">Ventajas de elegir a Gesgrama</h3>
              <ul className="space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-800 font-bold text-xs sm:text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#005c99] shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#757989] text-white rounded-3xl p-6 md:p-8 shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Necesitas asesoramiento inmediato?</h3>
              <p className="text-xs text-slate-200 mb-6">Atendemos consultas presenciales en nuestra oficina de Santa Coloma de Gramenet o por teléfono y WhatsApp.</p>
              <a
                href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#contacto`}
                className="w-full bg-white text-[#0f172a] font-extrabold text-sm py-3.5 px-6 rounded-full text-center block hover:bg-slate-100 transition-colors shadow-sm"
              >
                Solicitar presupuesto sin compromiso
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
