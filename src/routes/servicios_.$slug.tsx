import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, TrendingUp, Scale, Wrench, Check, MessageCircle, ArrowLeft, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AccreditationBadges } from "@/components/AccreditationBadges";

const SITE_DOMAIN = "https://gesgrama.com";

export const Route = createFileRoute("/servicios_/$slug")({
  head: ({ params }) => {
    const slug = params.slug as string;
    const service = servicesData[slug] || servicesData["administracion-de-fincas"];
    const canonicalUrl = `${SITE_DOMAIN}/servicios/${service.slug}`;
    const ogImage = "https://gesgrama.com/og-image.png";
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
                "streetAddress": "Av. dels Banús, 49",
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
  steps: { number: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "administracion-de-fincas": {
    id: "fincas",
    slug: "administracion-de-fincas",
    icon: Building2,
    titleKey: "Administración de Fincas",
    taglineKey: "Gestión transparente e integral de comunidades en Santa Coloma de Gramenet",
    metaTitle: "Administración de Fincas en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Administradores de fincas colegiados en Santa Coloma de Gramenet. Gestión eficiente de comunidades, control de morosidad y resolución de incidencias.",
    intro: "En Gesgrama llevamos más de 15 años administrando comunidades de propietarios en Santa Coloma de Gramenet y comarca. Ofrecemos un servicio cercano, transparente y orientado al ahorro real de la comunidad.",
    details: [
      "Coordinación y soporte en reuniones de vecinos ordinarias y extraordinarias con moderación profesional.",
      "Redacción, legalización y custodia de actas y libro de actas oficial de la comunidad.",
      "Liquidación contable anual clara, desglosada y comprensible para todos los vecinos.",
      "Gestión ágil de cobro de recibos y reclamación extrajudicial de morosidad sin sobrecostes ocultos.",
      "Atención y resolución urgente de averías con industriales locales de confianza en Santa Coloma.",
      "Asesoramiento técnico para la obtención de subvenciones para rehabilitación energética de edificios."
    ],
    benefits: [
      "Transparencia contable garantizada con acceso digital a las cuentas.",
      "Reducción directa de costes en contratos de mantenimiento y seguros.",
      "Administradores colegiados con seguro oficial de responsabilidad civil.",
      "Atención presencial en nuestra oficina local para cualquier propietario."
    ],
    image: "/images/art8_comunidad_propietarios.webp",
    asuntoOption: "Administración de Fincas",
    steps: [
      {
        number: "01",
        title: "Auditoría inicial de la comunidad",
        desc: "Revisamos los contratos vigentes, suministros, seguros y estado de cuentas para identificar ahorros inmediatos y regularizar cualquier situación pendiente."
      },
      {
        number: "02",
        title: "Traspaso ágil y sin molestias",
        desc: "Nos encargamos de toda la gestión documental con el administrador saliente o la junta anterior, garantizando continuidad absoluta en servicios y pagos."
      },
      {
        number: "03",
        title: "Gestión continua y comunicación directa",
        desc: "Asignamos un gestor dedicado con teléfono directo, respuesta rápida a incidencias y emisión puntual de estados contables transparentes."
      }
    ],
    faqs: [
      {
        q: "¿Cómo se aprueba el cambio de administrador en la comunidad?",
        a: "Solo se requiere incluir el punto en el orden del día de una junta ordinaria o extraordinaria y obtener el voto favorable de la mayoría simple de propietarios presentes y representados."
      },
      {
        q: "¿Qué coste tiene el cambio de administración para los vecinos?",
        a: "El trámite de transición y traspaso de documentación no tiene ningún coste añadido. Además, en la mayoría de casos conseguimos reducir la cuota mensual optimizando los contratos de limpieza, ascensor y seguros."
      },
      {
        q: "¿Cómo se gestiona la morosidad en una finca administrada por Gesgrama?",
        a: "Actuamos desde el primer mes de retraso mediante requerimientos amistosos documentados. Si persiste, preparamos la liquidación de deuda certificada para el procedimiento monitorio judicial con pleno respaldo legal."
      }
    ]
  },
  "gestion-inmobiliaria": {
    id: "inmobiliaria",
    slug: "gestion-inmobiliaria",
    icon: TrendingUp,
    titleKey: "Gestión Inmobiliaria",
    taglineKey: "Compra, venta y alquiler seguro de viviendas en Santa Coloma de Gramenet",
    metaTitle: "Gestión Inmobiliaria en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Agencia inmobiliaria especialista en Santa Coloma de Gramenet. Valoración gratuita de inmuebles, filtro riguroso de inquilinos y gestión total de la venta.",
    intro: "Si deseas vender o alquilar tu piso en Santa Coloma de Gramenet, en Gesgrama garantizamos el máximo valor real de mercado con absoluta tranquilidad, rigor y seguridad jurídica.",
    details: [
      "Valoración profesional precisa de mercado basada en escrituras y operaciones reales de la zona.",
      "Estrategia de marketing multicanal (Idealista, Fotocasa, escaparate en calle transitada y red directa de compradores).",
      "Filtro riguroso de solvencia económica y scoring de inquilinos con seguro de impago garantizado.",
      "Redacción minuciosa de contratos de compraventa y arrendamiento conforme a la normativa vigente en Cataluña.",
      "Tramitación completa de cédulas de habitabilidad y certificados de eficiencia energética (CEE).",
      "Acompañamiento integral, liquidación de plusvalía y asistencia en Notaría hasta la firma definitiva."
    ],
    benefits: [
      "Sin comisiones ocultas y con informe de valoración gratuito sin compromiso.",
      "Amplia cartera de compradores e inversores cualificados de Santa Coloma y Barcelona.",
      "Agentes Inmobiliarios Registrados de Cataluña (AICAT homologado).",
      "Reportaje fotográfico profesional y tour virtual para maximizar el atractivo del inmueble."
    ],
    image: "/images/interior_santacoloma_opt.webp",
    asuntoOption: "Gestión Inmobiliaria",
    steps: [
      {
        number: "01",
        title: "Valoración y plan comercial",
        desc: "Visitamos la vivienda, analizamos el mercado real de Santa Coloma (Centro, Singuerlín, Fondo, Santa Rosa) y fijamos el precio óptimo de salida."
      },
      {
        number: "02",
        title: "Difusión y selección de candidatos",
        desc: "Presentación profesional de la vivienda, filtrado previo de solvencia financiera y coordinación personalizada de visitas sin molestias para ti."
      },
      {
        number: "03",
        title: "Cierre, contratos y firma en notaría",
        desc: "Redactamos arras o contratos de arrendamiento, gestionamos la documentación registral y te acompañamos hasta el cobro final en notaría."
      }
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo se tarda en vender un piso en Santa Coloma con Gesgrama?",
        a: "Fijando un precio de mercado realista con nuestro estudio comparativo, el tiempo medio de cierre suele situarse entre 30 y 60 días gracias a nuestra base de compradores activos."
      },
      {
        q: "¿Qué documentación necesito para poner mi piso en venta o alquiler?",
        a: "Necesitas la escritura de propiedad, DNI/NIE de los titulares, último IBI pagado, cédula de habitabilidad vigente y certificado de eficiencia energética. Si te falta alguno, nosotros lo tramitamos."
      },
      {
        q: "¿Cómo garantizáis el cobro en los contratos de alquiler?",
        a: "Efectuamos un estudio de riesgo exhaustivo a través de aseguradoras líderes. Ofrecemos pólizas de impago de alquiler que aseguran el cobro mensual y la defensa jurídica completa del propietario."
      }
    ]
  },
  "asesoria-juridica-fiscal": {
    id: "juridico",
    slug: "asesoria-juridica-fiscal",
    icon: Scale,
    titleKey: "Asesoría Jurídica y Fiscal",
    taglineKey: "Especialistas en derecho inmobiliario, herencias y plusvalías en Santa Coloma",
    metaTitle: "Asesoría Jurídica e Inmobiliaria en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Abogados y asesores en derecho inmobiliario en Santa Coloma. Herencias, contratos de alquiler, desahucios y reclamaciones tributarias.",
    intro: "Prestamos asesoramiento legal y fiscal especializado en derecho inmobiliario y patrimonial para resolver con total seguridad cualquier trámite sucesorio, contractual o tributario.",
    details: [
      "Gestión integral de herencias, declaraciones de herederos y adjudicación de inmuebles.",
      "Optimización fiscal del Impuesto sobre el Incremento del Valor de los Terrenos (Plusvalía municipal) e IRPF.",
      "Resolución de controversias arrendaticias, resolución de contratos y desahucios por impago.",
      "Redacción y blindaje legal de contratos de arras, opciones de compra y permutas.",
      "Asesoramiento y defensa en impugnación de acuerdos de juntas de propietarios.",
      "Tramitación de expedientes notariales, registrales y subsanación de discrepancias catastrales."
    ],
    benefits: [
      "Atención directa por letrados y fiscalistas especializados en patrimonio inmobiliario.",
      "Enfoque preventivo para evitar litigios prolongados y costes judiciales innecesarios.",
      "Presupuesto cerrado por escrito antes de iniciar cualquier actuación.",
      "Conocimiento exhaustivo de las ordenanzas fiscales del Ayuntamiento de Santa Coloma."
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Asesoría Jurídica",
    steps: [
      {
        number: "01",
        title: "Consulta y diagnóstico jurídico",
        desc: "Analizamos tu caso con detalle, revisamos escrituras, contratos o requerimientos y determinamos la mejor vía legal o fiscal a seguir."
      },
      {
        number: "02",
        title: "Estrategia y redacción documental",
        desc: "Elaboramos contratos, recursos o cuadernos particionales adaptados para maximizar bonificaciones fiscales y proteger tu patrimonio."
      },
      {
        number: "03",
        title: "Gestión notarial, tributaria o judicial",
        desc: "Te representamos ante notarías, liquidamos los impuestos correspondientes en los plazos reglamentarios y defendemos tus derechos ante los tribunales si es necesario."
      }
    ],
    faqs: [
      {
        q: "¿Cómo se calcula la plusvalía municipal tras vender o heredar en Santa Coloma?",
        a: "Se puede calcular mediante el método objetivo (coeficientes sobre el valor catastral del suelo) o por la ganancia real demostrada. Calculamos ambas opciones para que tributes siempre por la cantidad menor permitida por ley."
      },
      {
        q: "¿Qué plazo hay para tramitar y liquidar una herencia con inmuebles?",
        a: "El plazo general para el Impuesto de Sucesiones y la Plusvalía municipal es de 6 meses desde el fallecimiento, prorrogable por otros 6 meses si se solicita dentro de los primeros 5 meses."
      },
      {
        q: "¿Puedo pedir presupuesto sin compromiso para una consulta jurídica?",
        a: "Sí. Ofrecemos una primera valoración informativa de tu expediente para explicarte los pasos a dar y facilitarte un presupuesto cerrado y detallado sin sorpresas."
      }
    ]
  },
  "obras-mantenimiento": {
    id: "obras",
    slug: "obras-mantenimiento",
    icon: Wrench,
    titleKey: "Obras y Mantenimiento",
    taglineKey: "Rehabilitación de edificios residenciales, fachadas e ITE en Santa Coloma",
    metaTitle: "Obras, Mantenimiento e ITE en Santa Coloma de Gramenet | Gesgrama",
    metaDesc: "Supervisión técnica de obras, reformas, ITE e Inspección Técnica de Edificios en Santa Coloma. Tramitación de subvenciones de rehabilitación.",
    intro: "Ofrecemos soporte técnico experto para la conservación, rehabilitación energética y mantenimiento integral de fincas urbanas y edificios de viviendas en Santa Coloma de Gramenet.",
    details: [
      "Gestión integral de la Inspección Técnica de Edificios (ITE) y tramitación del Certificado de Aptitud ante la Generalitat.",
      "Proyectos de rehabilitación de fachadas urbanas, balcones, cornisas, cubiertas y patios de luces.",
      "Eliminación de barreras arquitectónicas: bajada a cota cero e instalación de ascensores en fincas antiguas.",
      "Tramitación y justificación de subvenciones públicas y fondos europeos de eficiencia energética.",
      "Comparativa ciega de presupuestos de industriales homologados para garantizar el mejor precio.",
      "Coordinación de seguridad y salud, y dirección técnica facultativa durante toda la ejecución de obra."
    ],
    benefits: [
      "Ahorro de hasta el 80% del coste total mediante la gestión de subvenciones públicas.",
      "Control exhaustivo de plazos, certificaciones y calidades con firmas especializadas.",
      "Empresas e industriales locales con amplia experiencia en la arquitectura de Santa Coloma.",
      "Tranquilidad total para la junta de vecinos al delegar la supervisión en técnicos cualificados."
    ],
    image: "/images/art6_ite_rehabilitacion.webp",
    asuntoOption: "Obras y Reformas",
    steps: [
      {
        number: "01",
        title: "Diagnóstico técnico y dictamen ITE",
        desc: "Un arquitecto técnico colegiado realiza una inspección exhaustiva de la finca para evaluar la estructura, fachadas, saneamiento y eficiencia energética."
      },
      {
        number: "02",
        title: "Licitación transparente y ayudas",
        desc: "Redactamos el pliego de condiciones técnicas, solicitamos 3 o más presupuestos a industriales cualificados y solicitamos las subvenciones disponibles."
      },
      {
        number: "03",
        title: "Dirección de obra y recepción final",
        desc: "Supervisamos la correcta ejecución, controlamos los pagos por certificación de obra terminada y gestionamos las licencias y garantías con el Ayuntamiento."
      }
    ],
    faqs: [
      {
        q: "¿Cuándo es obligatorio pasar la ITE en Santa Coloma de Gramenet?",
        a: "Los edificios residenciales de más de 45 años de antigüedad tienen la obligación legal de pasar la Inspección Técnica de Edificios. No realizarla conlleva sanciones y problemas para contratar seguros o vender viviendas."
      },
      {
        q: "¿Qué subvenciones existen actualmente para rehabilitar un edificio?",
        a: "Existen líneas de ayudas públicas municipales, autonómicas y fondos europeos destinadas al aislamiento de fachadas (SATE), cubiertas, accesibilidad (ascensores) y mejora de eficiencia energética que pueden cubrir entre el 40% y el 80% de la inversión."
      },
      {
        q: "¿Cómo se organiza la derrama para una obra en la comunidad de propietarios?",
        a: "Calculamos el plan de pagos por cuota de participación o acuerdo de junta, coordinamos posibles aplazamientos de pago con los constructores y gestionamos opciones de financiación bancaria específica para comunidades."
      }
    ]
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
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
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
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
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

            {/* Direct Contact Card with Real Office Photo */}
            <div className="bg-[#0f172a] text-white rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src="/images/gesgrama_office.webp"
                  alt="Oficina Gesgrama Santa Coloma"
                  className="w-full h-full object-cover object-center brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 bg-[#2563eb]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Atención en Santa Coloma de Gramenet
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-lg font-bold mb-2 text-white">¿Necesitas asesoramiento inmediato?</h3>
                <p className="text-xs text-slate-300 mb-5 font-medium leading-relaxed">
                  Visítanos en nuestra oficina física en Santa Coloma o contáctanos directamente por teléfono y WhatsApp sin intermediarios.
                </p>
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm py-3.5 px-6 rounded-full text-center block transition-colors shadow-sm cursor-pointer"
                >
                  Solicitar presupuesto sin compromiso
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN ENRIQUECIDA: PROCESO PASO A PASO ── */}
        <section className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[#2563eb] font-extrabold text-xs uppercase tracking-wider block mb-2">Metodología transparente</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">¿Cómo trabajamos paso a paso?</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
              Un proceso claro, sin letra pequeña y con comunicación continua en cada fase del servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.steps.map((st, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-[#2563eb]/40 font-mono block mb-3">{st.number}</span>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECCIÓN ENRIQUECIDA: PREGUNTAS FRECUENTES (FAQ) ── */}
        <section className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-[#2563eb] font-extrabold text-xs uppercase tracking-wider block mb-2">Resolvemos tus dudas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">Preguntas frecuentes sobre {service.titleKey}</h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-2 flex items-start gap-2.5">
                  <span className="text-[#2563eb] font-mono shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
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

            {/* Mascot on Mobile (<768px): Prominent and clear mascot presentation */}
            <div className="w-full md:hidden flex justify-center items-center pt-4 pb-4">
              <FooterMascot className="w-40 sm:w-48 max-w-[200px] h-auto object-contain drop-shadow-xl" />
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18] pb-6 sm:pb-5">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-xs sm:text-sm md:text-base text-slate-200 font-extrabold tracking-wide">
                © 2026 Gesgrama. Todos los derechos reservados.
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">
                Desarrollado por <a href="https://kovia.es" target="_blank" rel="noopener" className="text-white underline hover:text-blue-300 font-bold">Kovia</a>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm md:text-base text-slate-300 font-extrabold">
              <Link to="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
              <span className="text-slate-600">·</span>
              <Link to="/politica-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
              <span className="text-slate-600">·</span>
              <Link to="/politica-cookies" className="hover:text-white transition-colors">Cookies</Link>
              <span className="text-slate-600">·</span>
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
