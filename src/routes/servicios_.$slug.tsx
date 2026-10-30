import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from '@/components/Footer';
import { useEffect, useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  Scale, 
  Wrench, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Phone, 
  Calculator, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  HelpCircle,
  Home
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AccreditationBadges } from "@/components/AccreditationBadges";

const SITE_DOMAIN = "https://gesgrama.com";

// 14 BARRIS OFICIALS DE SANTA COLOMA DE GRAMENET (100% EXCLUSIVO)
const SANTA_COLOMA_14_BARRIOS = [
  { slug: "centre", name: "Centre", cp: "08921" },
  { slug: "santa-rosa", name: "Santa Rosa", cp: "08923" },
  { slug: "can-mariner", name: "Can Mariner", cp: "08923" },
  { slug: "fondo", name: "Fondo", cp: "08922" },
  { slug: "singuerlin", name: "Singuerlín", cp: "08924" },
  { slug: "riera-alta", name: "Riera Alta", cp: "08924" },
  { slug: "llati", name: "Llatí", cp: "08921" },
  { slug: "el-raval", name: "El Raval", cp: "08923" },
  { slug: "riu-nord", name: "Riu Nord", cp: "08921" },
  { slug: "riu-sud", name: "Riu Sud", cp: "08921" },
  { slug: "can-franquesa", name: "Can Franquesa", cp: "08924" },
  { slug: "les-oliveres", name: "Les Oliveres", cp: "08924" },
  { slug: "la-guinardera", name: "La Guinardera", cp: "08924" },
  { slug: "cementiri-vell", name: "Cementiri Vell", cp: "08921" }
] as const;

export const Route = createFileRoute("/servicios_/$slug")({
  head: ({ params }) => {
    const slug = params.slug as string;
    const service = servicesData[slug] || servicesData["administracion-de-fincas"];
    const canonicalUrl = `${SITE_DOMAIN}/servicios/${service.slug}`;
    const ogImage = "https://gesgrama.com/og-image.png";

    // Mapeo dinámico del proveedor semántico especializado según servicio
    const providerType = service.providerSchemaType || "RealEstateAgent";

    // 14 Objetos Place hiperlocales correspondientes a los 14 barrios oficiales de Santa Coloma de Gramenet
    const areaServedPlaces = [
      {
        "@type": "City",
        "name": "Santa Coloma de Gramenet",
        "sameAs": "https://es.wikipedia.org/wiki/Santa_Coloma_de_Gramanet"
      },
      ...SANTA_COLOMA_14_BARRIOS.map(barrio => ({
        "@type": "Place",
        "name": `Barrio ${barrio.name}, Santa Coloma de Gramenet`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Santa Coloma de Gramenet",
          "postalCode": barrio.cp,
          "addressRegion": "Barcelona",
          "addressCountry": "ES"
        }
      }))
    ];

    // Schema Service
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.titleKey,
      "description": service.metaDesc,
      "url": canonicalUrl,
      "provider": {
        "@type": providerType,
        "name": "Gesgrama",
        "url": SITE_DOMAIN,
        "image": ogImage,
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
      "areaServed": areaServedPlaces,
      "serviceType": service.titleKey,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Servicios de ${service.titleKey} en Santa Coloma de Gramenet`,
        "itemListElement": service.details.map((detail, idx) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": detail
          },
          "position": idx + 1
        }))
      }
    };

    // Schema FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": service.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    // Schema HowTo
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `Cómo se gestiona el servicio de ${service.titleKey} en Santa Coloma de Gramenet con Gesgrama`,
      "description": `Metodología paso a paso para la contratación y ejecución de ${service.titleKey} en Santa Coloma de Gramenet.`,
      "step": service.steps.map((st, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "name": st.title,
        "text": st.desc
      }))
    };

    // Schema BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_DOMAIN },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": `${SITE_DOMAIN}/#servicios` },
        { "@type": "ListItem", "position": 3, "name": service.titleKey, "item": canonicalUrl }
      ]
    };

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
        { property: "og:locale", content: "es_ES" },
        { property: "og:locale:alternate", content: "ca_ES" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: service.metaTitle },
        { name: "twitter:description", content: service.metaDesc },
        { name: "twitter:image", content: ogImage },
        { name: "geo.region", content: "ES-CT" },
        { name: "geo.placename", content: "Santa Coloma de Gramenet" },
        { name: "geo.position", content: "41.4516;2.2081" },
        { name: "ICBM", content: "41.4516, 2.2081" }
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        { rel: "alternate", hrefLang: "es", href: canonicalUrl },
        { rel: "alternate", hrefLang: "ca", href: canonicalUrl },
        { rel: "alternate", hrefLang: "x-default", href: canonicalUrl }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(serviceSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(howToSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema)
        }
      ]
    };
  },
  component: ServiceDetail,
});

interface ServiceItem {
  id: string;
  slug: string;
  icon: any;
  titleKey: string;
  taglineKey: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  providerSchemaType: "RealEstateAgent" | "LegalService" | "GeneralContractor";
  details: string[];
  benefits: string[];
  image: string;
  asuntoOption: string;
  barrioTitleContext: string;
  steps: { number: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceItem> = {
  "administracion-de-fincas": {
    id: "fincas",
    slug: "administracion-de-fincas",
    icon: Building2,
    providerSchemaType: "RealEstateAgent",
    titleKey: "Administración de Fincas",
    taglineKey: "Administració de finques i gestió de comunitats a Santa Coloma de Gramenet",
    metaTitle: "Administrador de Fincas en Santa Coloma de Gramenet | Colegiados Gesgrama",
    metaDesc: "Administradores de fincas colegiados en Santa Coloma de Gramenet. Gestión integral según el Libro V del Código Civil de Cataluña, auditoría contable y control de morosidad.",
    intro: "En Gesgrama somos administradores de fincas colegiados especializados exclusivamente en Santa Coloma de Gramenet. Aplicamos con rigor el régimen de propiedad horizontal catalana (Libro V del Código Civil de Cataluña), garantizando transparencia contable 24/7, mediación vecinal resolutiva y un ahorro directo en los costes comunitarios de la escalera.",
    details: [
      "Aplicación experta del Libro V del Código Civil de Cataluña (Llei 5/2006 de propietat horitzontal catalana) y cómputo exacto de mayorías simples y cualificadas.",
      "Convocatoria, moderación profesional y redacción inmediata de actas en juntas ordinarias y extraordinarias de propietarios.",
      "Auditoría contable y liquidación económica anual comprensible, con acceso digital y extractos bancarios conciliados céntimo a céntimo.",
      "Reclamación ágil de vecinos morosos mediante requerimiento fehaciente y activación de procedimiento monitorio judicial comunitario sin recargos desproporcionados.",
      "Optimización de contratos comunitarios: negociación de tarifas de luz de escalera, mantenimiento de ascensores, limpieza y seguros multirriesgo de la finca.",
      "Atención urgente 24 horas y resolución in situ de averías con industriales homologados de Santa Coloma de Gramenet."
    ],
    benefits: [
      "Administradores colegiados con seguro oficial de responsabilidad civil y caución comunitaria.",
      "Traspaso de administración 100% gratuito y sin molestias: gestionamos la recogida documental con el administrador saliente en 48 horas.",
      "Reducción demostrada de entre un 15% y un 30% en los gastos fijos ordinarios de la comunidad.",
      "Atención presencial en nuestra sede de Av. dels Banús, 49 para cualquier consulta vecinal."
    ],
    image: "/images/art8_comunidad_propietarios.webp",
    asuntoOption: "Administración de Fincas",
    barrioTitleContext: "Administración de fincas y comunidades en los 14 barrios de Santa Coloma",
    steps: [
      {
        number: "01",
        title: "Auditoría inicial del edificio y contratos",
        desc: "Examinamos las pólizas de seguro comunitario, contratos de ascensor, suministros de luz y estado de morosidad para planificar ahorros inmediatos en las cuotas."
      },
      {
        number: "02",
        title: "Aprobación y traspaso integral sin coste",
        desc: "Guiamos a la presidencia para incluir el punto en la junta. Nos personamos ante el administrador anterior para custodiar libros de actas, claves bancarias y expedientes sin conflicto."
      },
      {
        number: "03",
        title: "Gestión transparente y mediación continua",
        desc: "Asignamos gestor colegiado con teléfono directo, supervisamos averías en tiempo real y publicamos balances claros sin letra pequeña."
      }
    ],
    faqs: [
      {
        q: "¿Qué mayoría se necesita para cambiar de administrador de fincas en Santa Coloma?",
        a: "Conforme a la normativa catalana (Libro V del Código Civil de Cataluña), basta con el acuerdo de la mayoría simple de los propietarios presentes y representados (que sumen la mayoría de cuotas) en una junta ordinaria o extraordinaria debidamente convocada."
      },
      {
        q: "¿Tiene algún coste o penalización cambiar a Gesgrama como administrador?",
        a: "Ninguno. El proceso de transición, auditoría inicial y recepción de la documentación comunitaria es 100% gratuito. Además, revisamos los contratos de mantenimiento existentes para rebajar el presupuesto de la escalera."
      },
      {
        q: "¿Cómo actúa Gesgrama ante un vecino moroso en la comunidad?",
        a: "Iniciamos de inmediato la mediación amistosa y el requerimiento fehaciente con desglose contable. Si no hay acuerdo, la junta aprueba la liquidación certificada y nuestro departamento legal interpone el procedimiento monitorio de reclamación judicial."
      },
      {
        q: "¿Gestionáis también comunidades de parking o mancomunidades en Santa Coloma?",
        a: "Sí. Administramos garajes comunitarios, mancomunidades de propietarios y complejos residenciales con vados y zonas comunes en todos los barrios colomenses."
      }
    ]
  },
  "gestion-inmobiliaria": {
    id: "inmobiliaria",
    slug: "gestion-inmobiliaria",
    icon: TrendingUp,
    providerSchemaType: "RealEstateAgent",
    titleKey: "Gestión Inmobiliaria",
    taglineKey: "Agència immobiliària AICAT, compravenda i lloguer segur a Santa Coloma",
    metaTitle: "Inmobiliaria en Santa Coloma de Gramenet | Venta y Alquiler Seguro Gesgrama",
    metaDesc: "Agencia inmobiliaria en Santa Coloma de Gramenet registrada en AICAT. Valoración gratuita por m², venta al mejor precio de mercado y alquiler seguro con seguro de impago.",
    intro: "Somos agentes inmobiliarios inscritos en el Registre d'Agents Immobiliaris de Catalunya (AICAT). Si quieres vender o alquilar tu piso en Santa Coloma de Gramenet, te aseguramos el valor real máximo de mercado con total solvencia, filtro exhaustivo de inquilinos y blindaje legal en cada contrato.",
    details: [
      "Valoración y tasación precisa por m² basada en compraventas reales cerradas en el barrio exacto de Santa Coloma.",
      "Estrategia comercial multicanal: reportaje fotográfico profesional, publicación en portales líderes (Idealista, Fotocasa) y escaparate físico en zona de alto tránsito peatonal.",
      "Gestión de alquiler seguro (lloguer segur): análisis de solvencia financiera, ratio de endeudamiento y contratación de seguro de impago de rentas.",
      "Cumplimiento riguroso de la legislación de contención de rentas y aplicación del Índice de Referencia de Precios de Alquiler en zona tensionada.",
      "Tramitación urgente de la Cédula de Habitabilidad de segunda ocupación y Certificado de Eficiencia Energética (CEE) con arquitecto técnico.",
      "Redacción de contratos de arras penitenciales (Art. 621-8 del Código Civil de Cataluña), certificado de comunidad al corriente de pago y acompañamiento a Notaría."
    ],
    benefits: [
      "Agentes colegiados AICAT: máxima seguridad jurídica y custodia de fianzas e importes en Notaría.",
      "Valoración comparativa gratuita y sin compromiso de tu vivienda en Santa Coloma.",
      "Garantía de cobro del 100% de las mensualidades en alquiler mediante pólizas con cobertura jurídica completa.",
      "Base de datos activa de compradores cualificados listos para adquirir piso en el municipio."
    ],
    image: "/images/interior_santacoloma_opt.webp",
    asuntoOption: "Gestión Inmobiliaria",
    barrioTitleContext: "Agencia inmobiliaria especialista en los 14 barrios de Santa Coloma",
    steps: [
      {
        number: "01",
        title: "Valoración inmobiliaria por m² y plan de venta",
        desc: "Inspeccionamos la vivienda y comparamos las transacciones reales en el barrio (Centre, Fondo, Singuerlín, Santa Rosa, etc.) para definir el precio óptimo y maximizar tu rentabilidad."
      },
      {
        number: "02",
        title: "Comercialización, filtro y selección de candidatos",
        desc: "Difusión publicitaria premium, filtrado riguroso de compradores solventes o verificación de nóminas/estabilidad laboral en arrendatarios."
      },
      {
        number: "03",
        title: "Firma de arras, documentación y Notaría",
        desc: "Redactamos contratos jurídicamente blindados, gestionamos CEE y cédula, y te asistimos presencialmente hasta el otorgamiento de la escritura pública."
      }
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo se tarda en vender un piso en Santa Coloma de Gramenet con Gesgrama?",
        a: "Con una valoración ajustada a las transacciones notariales recientes, el tiempo medio de venta en Gesgrama oscila entre 30 y 60 días, gracias a nuestra red directa de compradores e inversores locales."
      },
      {
        q: "¿Qué documentación obligatoria necesito para vender o alquilar en Santa Coloma?",
        a: "Se exige título de propiedad (escritura), DNI de los titulares, última cuota de IBI, certificado de eficiencia energética (CEE), cédula de habitabilidad vigente y el certificado de la comunidad conforme está al corriente de pago."
      },
      {
        q: "¿Cómo funciona el seguro de impago de alquiler en Santa Coloma?",
        a: "Realizamos un scoring previo de solvencia del candidato. Una vez aprobado, la aseguradora garantiza el abono continuado de las rentas mensuales impagadas, asume los costes judiciales de desahucio y cubre actos vandálicos."
      },
      {
        q: "¿Cómo afecta la declaración de Santa Coloma como zona de mercado residencial tensionado?",
        a: "Aplicamos el Índice de Referencia de Precios de Alquiler de Cataluña y la ley estatal de vivienda para determinar el tope de renta aplicable según contratos previos y tipología del arrendador (gran tenedor o pequeño tenedor)."
      }
    ]
  },
  "asesoria-juridica-fiscal": {
    id: "juridico",
    slug: "asesoria-juridica-fiscal",
    icon: Scale,
    providerSchemaType: "LegalService",
    titleKey: "Asesoría Jurídica y Fiscal",
    taglineKey: "Dret immobiliari, successions, herències i plusvàlua a Santa Coloma",
    metaTitle: "Abogados Inmobiliarios y Asesoría Fiscal en Santa Coloma | Gesgrama",
    metaDesc: "Asesoría jurídica y fiscal en Santa Coloma de Gramenet. Tramitación de herencias y sucesiones, cálculo mínimo de Plusvalía Municipal (IIVTNU) y desahucios.",
    intro: "Prestamos asesoramiento jurídico y tributario especializado en derecho inmobiliario, patrimonial y sucesorio en Santa Coloma de Gramenet. Resolvemos particiones de herencias complejas, optimizamos impuestos municipales y autonómicos, y blindamos contratos ante cualquier eventualidad legal.",
    details: [
      "Tramitación integral de herencias y sucesiones con bienes inmuebles en Santa Coloma: aceptación, declaración de herederos, adjudicación de bienes, legítima catalana y usufructos.",
      "Liquidación del Impuesto de Sucesiones y Donaciones (ISD) ante la Agència Tributària de Catalunya (ATC), aplicando todas las deducciones por parentesco y vivienda habitual.",
      "Cálculo, optimización y liquidación del Impuesto sobre el Incremento de Valor de los Terrenos (Plusvalía Municipal IIVTNU) en el Ayuntamiento de Santa Coloma de Gramenet.",
      "Comparativa técnica de Plusvalía: método objetivo vs plusvalía real para liquidar la cuota mínima legal, o reclamación de no sujeción si hubo pérdidas económicas.",
      "Resolución de litigios arrendaticios: procedimiento judicial de desahucio por falta de pago o fin de contrato, reclamación de rentas y extinción de condominio.",
      "Asesoramiento en la ganancia patrimonial del IRPF por venta de inmuebles, con análisis de exenciones por reinversión o transmisión por mayores de 65 años."
    ],
    benefits: [
      "Abogados colegiados y fiscalistas expertos en el marco tributario de Cataluña y las ordenanzas de Santa Coloma.",
      "Presupuesto cerrado por escrito desde la primera sesión informativa, sin costes imprevistos.",
      "Ahorro tributario real acreditado en liquidaciones de plusvalía municipal y sucesiones.",
      "Atención cercana y presencial en nuestro despacho local para revisar escrituras y documentación."
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=75&w=800&auto=format&fit=crop",
    asuntoOption: "Asesoría Jurídica",
    barrioTitleContext: "Asesoramiento jurídico e inmobiliario en todos los barrios de Santa Coloma",
    steps: [
      {
        number: "01",
        title: "Diagnóstico legal y fiscal del expediente",
        desc: "Estudiamos testamentos, títulos de propiedad, notas simples registrales y certificados de defunción para definir la hoja de ruta jurídica más eficiente."
      },
      {
        number: "02",
        title: "Cuaderno particional y redacción documental",
        desc: "Redactamos la partición de herencia, contratos de arras blindados o demandas judiciales garantizando el cumplimiento de plazos para bonificaciones tributarias."
      },
      {
        number: "03",
        title: "Gestión notarial, liquidación y Registro",
        desc: "Te acompañamos a la Notaría, liquidamos los tributos (ATC e IIVTNU municipal) y formalizamos la inscripción en el Registro de la Propiedad."
      }
    ],
    faqs: [
      {
        q: "¿Cómo se calcula la Plusvalía Municipal (IIVTNU) en el Ayuntamiento de Santa Coloma?",
        a: "Calculamos obligatoriamente las dos fórmulas legales: el método objetivo (coeficiente sobre el valor catastral del suelo) y el método real (ganancia patrimonial efectiva entre compra y venta/herencia). Elegimos la vía de menor coste impositivo. Si vendes a pérdidas, tramitamos la exención total."
      },
      {
        q: "¿Qué plazo hay para tramitar una herencia con un piso en Santa Coloma de Gramenet?",
        a: "El plazo legal para liquidar el Impuesto de Sucesiones y la Plusvalía municipal es de 6 meses desde el fallecimiento. Si se solicita dentro de los 5 primeros meses, podemos tramitar una prórroga de otros 6 meses adicionales."
      },
      {
        q: "¿Qué puedo hacer si uno de los herederos se niega a vender o alquilar el piso?",
        a: "Asesoramos en procedimientos de extinción de condominio o división de cosa común. Buscamos primero la mediación amistosa para la compra de partes o subasta voluntaria antes de judicializar el conflicto."
      },
      {
        q: "¿Cuánto tarda un procedimiento de desahucio por impago de alquiler?",
        a: "Depende de la carga de los Juzgados de Santa Coloma de Gramenet, pero habitualmente oscila entre 4 y 8 meses. Interponemos la demanda con solicitud inmediata de fecha de lanzamiento para reducir al mínimo el perjuicio económico."
      }
    ]
  },
  "obras-mantenimiento": {
    id: "obras",
    slug: "obras-mantenimiento",
    icon: Wrench,
    providerSchemaType: "GeneralContractor",
    titleKey: "Obras y Mantenimiento",
    taglineKey: "Rehabilitació d'edificis, façanes, ascensors a cota zero i ITE a Santa Coloma",
    metaTitle: "Rehabilitación de Edificios, Obras e ITE en Santa Coloma | Gesgrama",
    metaDesc: "Especialistas en ITE obligatoria en Santa Coloma de Gramenet, rehabilitación de fachadas, cubiertas e instalación de ascensores a cota cero con subvenciones.",
    intro: "Ofrecemos dirección y supervisión técnica integral para la conservación, rehabilitación y eficiencia de edificios residenciales plurifamiliares en Santa Coloma de Gramenet. Especialistas en superar la ITE, rehabilitar fachadas y patios, e instalar ascensores a cota cero gestionando ayudas públicas.",
    details: [
      "Tramitación obligatoria de la Inspección Técnica de Edificios (ITE) para fincas de más de 45 años y expedición del Certificado de Aptitud ante la Agència de l'Habitatge de Catalunya.",
      "Rehabilitación integral de fachadas principales y patios de luces: saneamiento de revocos, reparación de cornisas, balcones y tratamiento de carbonatación del hormigón.",
      "Eliminación de barreras arquitectónicas: bajada de ascensor a cota cero en portales antiguos e instalación de ascensores exteriores/interiores en fincas que no disponen de elevador.",
      "Impermeabilización de cubiertas planas, tejados comunitarios, terrados transitables y sustitución de bajantes de saneamiento.",
      "Gestión integral de subvenciones públicas: tramitación de Fondos Europeos Next Generation y convocatorias municipales de rehabilitación energética.",
      "Concurso de presupuestos ciegos entre 3 constructoras homologadas de la zona, dirección facultativa y control riguroso de certificaciones de obra y plazos."
    ],
    benefits: [
      "Ahorro de hasta el 80% del coste total mediante la consecución y justificación de subvenciones públicas de rehabilitación.",
      "Eliminación del riesgo de derramas imprevistas mediante contratos de obra con precio cerrado y penalización por retraso.",
      "Constructores e industriales de confianza contrastada en el parque inmobiliario de Santa Coloma de Gramenet.",
      "Garantía decenal y entrega del Libro del Edificio actualizado."
    ],
    image: "/images/art6_ite_rehabilitacion.webp",
    asuntoOption: "Obras y Reformas",
    barrioTitleContext: "Rehabilitación de edificios, obras e ITE en los 14 barrios de Santa Coloma",
    steps: [
      {
        number: "01",
        title: "Inspección técnica in situ y dictamen ITE",
        desc: "Un arquitecto técnico visita la finca, analiza la estructura, fachadas, saneamiento y accesibilidad, emitiendo el informe de deficiencias y prioridades."
      },
      {
        number: "02",
        title: "Licitación comparativa y solicitud de ayudas",
        desc: "Elaboramos el pliego de condiciones, comparamos presupuestos de 3 empresas homologadas y solicitamos las subvenciones disponibles en el Ayuntamiento y la Generalitat."
      },
      {
        number: "03",
        title: "Dirección de obra y recepción con garantías",
        desc: "Controlamos las calidades, coordinamos la seguridad laboral y expedimos el Certificado Final de Obra con todas las garantías legales."
      }
    ],
    faqs: [
      {
        q: "¿Cuándo es obligatoria la ITE en Santa Coloma de Gramenet?",
        a: "La Inspección Técnica del Edificio es obligatoria por ley para todos los edificios plurifamiliares con más de 45 años de antigüedad. No realizarla acarrea sanciones administrativas e impide contratar seguros o vender viviendas."
      },
      {
        q: "¿Qué ayudas existen para instalar ascensor o rehabilitar fachadas en Santa Coloma?",
        a: "Gestionamos los Fondos Next Generation EU y las ayudas de la Agència de l'Habitatge para accesibilidad y eficiencia energética, con coberturas que oscilan entre el 40% y el 80% de la inversión total."
      },
      {
        q: "¿Cómo se aprueba en junta de propietarios la bajada de ascensor a cota cero?",
        a: "Según la LPH y la normativa catalana de accesibilidad, si la obra es solicitada por un propietario mayor de 70 años o con discapacidad, la comunidad está obligada a su ejecución siempre que el coste anual no exceda de 12 cuotas ordinarias."
      },
      {
        q: "¿Cómo evita Gesgrama sobrecostes en las obras de la comunidad?",
        a: "Trabajamos con pliegos técnicos cerrados donde cualquier partida imprevista debe ser previamente visada por la dirección facultativa. Además, los pagos se liberan exclusivamente por certificaciones de obra realmente ejecutada."
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

  // Servicios relacionados para cross-selling interno
  const relatedServices = Object.values(servicesData).filter(s => s.slug !== service.slug);

  return (
    <div className="bg-[#eef2f7] text-[#0f172a] min-h-screen font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── NAVBAR CORPORATIVO OFICIAL ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Main Container */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-36 pb-12">
        {/* Top Navigation: Botón Volver + Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            hash="servicios"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:text-white bg-[#0f172a] hover:bg-[#2563eb] border border-slate-700 hover:border-[#2563eb] px-5 py-2.5 rounded-full shadow-md transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#38bdf8] group-hover:text-white group-hover:-translate-x-1 transition-all" />
            <span>Volver a Servicios</span>
          </Link>

          <nav aria-label="Migas de pan">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item" className="hover:text-[#2563eb] transition-colors">
                  <span itemProp="name">Inicio</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-slate-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" hash="servicios" itemProp="item" className="hover:text-[#2563eb] transition-colors text-[#2563eb]">
                  <span itemProp="name">Servicios</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-slate-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-slate-900 font-extrabold">{service.titleKey}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero Banner for Service */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 md:p-14 text-white shadow-2xl overflow-hidden relative mb-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-sm">
                  <IconComp className="w-4 h-4" />
                  Servicio Especializado
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 text-[#38bdf8] text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700">
                  <MapPin className="w-3.5 h-3.5" />
                  100% Santa Coloma de Gramenet
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 font-sans">
                {service.titleKey} en Santa Coloma de Gramenet
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
                  <span>Solicitar presupuesto sin compromiso</span>
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
                <img 
                  src={service.image} 
                  alt={`${service.titleKey} en Santa Coloma de Gramenet`} 
                  className="w-full h-full object-cover" 
                  width={600}
                  height={450}
                  loading="eager"
                />
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

            {/* Direct Contact Card with Real Office Photo & Local Business Microdata */}
            <div 
              className="bg-[#0f172a] text-white rounded-3xl overflow-hidden shadow-lg border border-slate-800 flex flex-col"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content="Gesgrama - Santa Coloma de Gramenet" />
              <meta itemProp="image" content="https://gesgrama.com/images/gesgrama_office.webp" />
              <meta itemProp="telephone" content="+34934685656" />
              <meta itemProp="url" content="https://gesgrama.com" />

              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src="/images/gesgrama_office.webp"
                  alt="Oficina Gesgrama en Santa Coloma de Gramenet"
                  className="w-full h-full object-cover object-center brightness-90 contrast-105"
                  loading="lazy"
                  width={400}
                  height={192}
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-[#0f172a]/40" />
                <span 
                  className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 bg-[#2563eb]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Atención presencial: <span itemProp="streetAddress">Av. dels Banús, 49</span>
                  </span>
                  <meta itemProp="postalCode" content="08923" />
                  <meta itemProp="addressLocality" content="Santa Coloma de Gramenet" />
                  <meta itemProp="addressRegion" content="Barcelona" />
                  <meta itemProp="addressCountry" content="ES" />
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-lg font-bold mb-2 text-white">¿Necesitas asesoramiento inmediato?</h3>
                <p className="text-xs text-slate-300 mb-5 font-medium leading-relaxed">
                  Te atendemos en persona en nuestra oficina de Santa Coloma o te llamamos al instante sin compromiso ni esperas.
                </p>
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm py-3.5 px-6 rounded-full text-center block transition-colors shadow-sm cursor-pointer"
                >
                  Solicitar consulta personalizada
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN ENRIQUECIDA: PROCESO PASO A PASO (HOWTO SEMÁNTICO) ── */}
        <section 
          className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
          itemScope 
          itemType="https://schema.org/HowTo"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[#2563eb] font-extrabold text-xs uppercase tracking-wider block mb-2">Metodología transparente</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]" itemProp="name">
              ¿Cómo trabajamos paso a paso en {service.titleKey}?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium" itemProp="description">
              Un proceso riguroso, trazable y adaptado a la legislación de Cataluña y las normativas municipales de Santa Coloma de Gramenet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.steps.map((st, i) => (
              <div 
                key={i} 
                className="bg-[#f8fafc] border-2 border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs"
                itemScope 
                itemProp="step" 
                itemType="https://schema.org/HowToStep"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#2563eb] text-white text-base font-black font-mono mb-4 shadow-xs">{st.number}</span>
                  <meta itemProp="position" content={String(i + 1)} />
                  <h3 className="text-base font-bold text-[#0f172a] mb-2" itemProp="name">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed" itemProp="text">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECCIÓN ENRIQUECIDA: PREGUNTAS FRECUENTES (FAQPage SEMÁNTICO) ── */}
        <section 
          className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[#2563eb] font-extrabold text-xs uppercase tracking-wider block mb-2">Resolvemos tus dudas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
              Preguntas frecuentes sobre {service.titleKey} en Santa Coloma
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border-2 border-slate-200 rounded-2xl p-6 bg-[#f8fafc] shadow-xs"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-2 flex items-start gap-2.5" itemProp="name">
                  <span className="text-[#2563eb] font-mono shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <div 
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                  className="pl-6"
                >
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECCIÓN CROSS-SELLING: OTROS SERVICIOS + HERRAMIENTA VALORACIÓN M² ── */}
        <section className="mb-16 bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-[#38bdf8] font-extrabold text-xs uppercase tracking-wider block mb-2">Ecosistema integral Gesgrama</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Servicios complementarios en Santa Coloma</h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
              Conectamos administración de comunidades, gestión inmobiliaria, departamento legal y reformas técnicas en un único interlocutor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {relatedServices.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  to="/servicios_/$slug"
                  params={{ slug: rel.slug }}
                  className="bg-[#1e293b] hover:bg-[#0f172a] border-2 border-slate-700 hover:border-[#2563eb] rounded-2xl p-5 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#2563eb]/20 text-[#38bdf8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <RelIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-2">
                      {rel.titleKey}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-medium">
                      {rel.taglineKey}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs font-bold text-[#38bdf8]">
                    <span>Ver servicio completo</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Banner Valorador de Viviendas */}
          <div className="bg-[#1e40af] rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-400/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white">¿Quieres saber el valor exacto de un piso en Santa Coloma?</h4>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">Calcula en 1 minuto el precio medio por m² real según el barrio y tipología.</p>
              </div>
            </div>
            <a
              href="/#valorador"
              className="bg-white hover:bg-slate-100 text-[#0f172a] font-extrabold text-sm py-3 px-6 rounded-full transition-all shrink-0 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Calcular valoración gratuita</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── SECCIÓN INTERLINKING HIPERLOCAL: LOS 14 BARRIOS DE SANTA COLOMA DE GRAMENET ── */}
        <section className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[12px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              Cobertura 100% municipal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              {service.barrioTitleContext}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              Gesgrama opera de forma presencial y exclusiva en Santa Coloma de Gramenet. Consulta la información técnica de cada uno de los 14 barrios oficiales del municipio:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {SANTA_COLOMA_14_BARRIOS.map((barrio) => (
              <a
                key={barrio.slug}
                href={`/administrador-fincas/${barrio.slug}`}
                className="bg-white hover:bg-[#0f172a] border-2 border-slate-200 hover:border-[#0f172a] rounded-2xl p-4 transition-all duration-200 text-center flex flex-col items-center justify-center group cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
                title={`${service.titleKey} en el barrio de ${barrio.name}, Santa Coloma de Gramenet`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:bg-[#38bdf8] mb-2 transition-colors ring-4 ring-blue-100 group-hover:ring-slate-700" />
                <span className="text-sm font-black text-[#0f172a] group-hover:text-white transition-colors block">
                  {barrio.name}
                </span>
                <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-bold font-mono transition-colors mt-0.5">
                  CP {barrio.cp}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
              <span>Sede central: <strong>Av. dels Banús, 49</strong> · Santa Coloma de Gramenet (08923)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
              Códigos postales cubiertos: 08921 · 08922 · 08923 · 08924
            </span>
          </div>
        </section>
      </main>

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA ── */}
      <Footer language={language} />

      <WhatsAppButton />
    </div>
  );
}
