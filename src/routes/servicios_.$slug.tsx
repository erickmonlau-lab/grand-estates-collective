import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  Building2, 
  TrendingUp, 
  Scale, 
  Wrench, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  HelpCircle, 
  Award, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calculator,
  ChevronDown
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/servicios_/$slug")({
  component: ServicioSlugPage,
  head: ({ params }) => {
    const s = servicesData[params.slug];
    if (!s) return { meta: [{ title: "Servicio no encontrado | Gesgrama" }] };

    const canonicalUrl = `https://gesgrama.com/servicios/${s.slug}`;
    const barriosNames = SANTA_COLOMA_14_BARRIOS.map(b => b.name).join(", ");

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": s.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": s.titleKey,
      "serviceType": s.titleKey,
      "description": s.metaDesc,
      "url": canonicalUrl,
      "provider": {
        "@type": s.providerSchemaType,
        "name": "Gesgrama",
        "telephone": "+34934685656",
        "url": "https://gesgrama.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. dels Banús, 49",
          "postalCode": "08923",
          "addressLocality": "Santa Coloma de Gramenet",
          "addressRegion": "Barcelona",
          "addressCountry": "ES"
        }
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Santa Coloma de Gramenet",
          "sameAs": "https://es.wikipedia.org/wiki/Santa_Coloma_de_Gramanet"
        },
        ...SANTA_COLOMA_14_BARRIOS.map(b => ({
          "@type": "Place",
          "name": `${b.name}, Santa Coloma de Gramenet`,
          "address": {
            "@type": "PostalAddress",
            "postalCode": b.cp,
            "addressLocality": "Santa Coloma de Gramenet",
            "addressRegion": "Barcelona",
            "addressCountry": "ES"
          }
        }))
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://gesgrama.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Servicios",
          "item": "https://gesgrama.com/#servicios"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": s.titleKey,
          "item": canonicalUrl
        }
      ]
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `Cómo funciona el servicio de ${s.titleKey} en Gesgrama`,
      "description": s.intro,
      "step": s.steps.map((st, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": st.title,
        "text": st.desc
      }))
    };

    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDesc },
        { name: "keywords", content: `${s.titleKey}, Santa Coloma de Gramenet, ${barriosNames}, 08921, 08922, 08923, 08924` },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDesc },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "es_ES" },
        { property: "og:locale:alternate", content: "ca_ES" }
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
          children: JSON.stringify(faqSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(serviceSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema)
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(howToSchema)
        }
      ]
    };
  }
});

const SANTA_COLOMA_14_BARRIOS = [
  { name: "Centre", slug: "centre", cp: "08921" },
  { name: "Santa Rosa", slug: "santa-rosa", cp: "08923" },
  { name: "Can Mariner", slug: "can-mariner", cp: "08921" },
  { name: "Fondo", slug: "fondo", cp: "08922" },
  { name: "Singuerlín", slug: "singuerlin", cp: "08924" },
  { name: "Riera Alta", slug: "riera-alta", cp: "08924" },
  { name: "Llatí", slug: "llati", cp: "08921" },
  { name: "El Raval", slug: "el-raval", cp: "08923" },
  { name: "Riu Nord", slug: "riu-nord", cp: "08921" },
  { name: "Riu Sud", slug: "riu-sud", cp: "08923" },
  { name: "Can Franquesa", slug: "can-franquesa", cp: "08924" },
  { name: "Les Oliveres", slug: "les-oliveres", cp: "08924" },
  { name: "La Guinardera", slug: "la-guinardera", cp: "08924" },
  { name: "Cementiri Vell", slug: "cementiri-vell", cp: "08921" }
];

interface ServiceConfig {
  id: string;
  slug: string;
  icon: any;
  providerSchemaType: string;
  titleKey: string;
  taglineKey: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  details: string[];
  benefits: string[];
  image: string;
  asuntoOption: string;
  barrioTitleContext: string;
  steps: { number: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const servicesData: Record<string, ServiceConfig> = {
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
    image: "/images/art7_plusvalia_fiscal.webp",
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
        title: "Dirección de obra y Certificado de Aptitud",
        desc: "Supervisamos la ejecución, controlamos las certificaciones y entregamos el Certificado de Aptitud oficial de la Generalitat."
      }
    ],
    faqs: [
      {
        q: "¿Cuándo es obligatorio pasar la ITE en Santa Coloma de Gramenet?",
        a: "La Inspección Técnica del Edificio es obligatoria por ley para todos los edificios plurifamiliares con más de 45 años de antigüedad. No realizarla acarrea sanciones administrativas e impide contratar seguros o vender viviendas."
      },
      {
        q: "¿Cómo se aprueba en junta la instalación o bajada de ascensor a cota cero?",
        a: "Según la LPH y la normativa catalana de accesibilidad, si la obra es solicitada por un propietario mayor de 70 años o con discapacidad, la comunidad está obligada a su ejecución siempre que el coste anual no exceda de 12 cuotas ordinarias."
      },
      {
        q: "¿Qué ayudas públicas se pueden solicitar para rehabilitación en Santa Coloma?",
        a: "Gestionamos los Fondos Europeos Next Generation (que subvencionan del 40% al 80% según el ahorro energético conseguido) y los programas de rehabilitación del Consorci Metropolità de l'Habitatge."
      },
      {
        q: "¿Quién redacta los proyectos técnicos y licencias en el Ayuntamiento?",
        a: "Nuestro equipo técnico de arquitectos se encarga íntegramente del proyecto ejecutivo, la solicitud de licencia de obras municipal y el Libro del Edificio."
      }
    ]
  }
};

function ServicioSlugPage() {
  const { slug } = Route.useParams();
  const service = servicesData[slug];

  if (!service) {
    throw notFound();
  }

  const [language, setLanguage] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") return stored;
    }
    return "es";
  });

  const [activeTab, setActiveTab] = useState<"que-incluye" | "ventajas" | "metodologia" | "faqs">("que-incluye");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
  const relatedServices = Object.values(servicesData).filter(s => s.slug !== service.slug);

  const scrollToSection = (id: string, tab: "que-incluye" | "ventajas" | "metodologia" | "faqs") => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#f8fafc] text-[#111C35] min-h-screen font-sans selection:bg-[#2860F5]/20 overflow-x-clip">
      {/* ── NAVBAR CORPORATIVO OFICIAL ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Main Container */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 md:px-12 pt-28 sm:pt-36 pb-16">
        
        {/* Top Navigation: Volver + Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            hash="servicios"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:text-white bg-[#101A30] hover:bg-[#2860F5] border border-slate-700 hover:border-[#2860F5] px-5 py-2.5 rounded-full shadow-md transition-all duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#38bdf8] group-hover:text-white group-hover:-translate-x-1 transition-all" />
            <span>Volver a Servicios</span>
          </Link>

          <nav aria-label="Migas de pan">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item" className="hover:text-[#2860F5] transition-colors">
                  <span itemProp="name">Inicio</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-slate-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" hash="servicios" itemProp="item" className="hover:text-[#2860F5] transition-colors text-[#2860F5]">
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

        {/* ── A. CABECERA DEL SERVICIO (ESTILO SHOPIFY: LIMPIA, SÓLIDA Y EQUILIBRADA) ── */}
        <div className="bg-[#101A30] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl overflow-hidden relative mb-8 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  <IconComp className="w-4 h-4 text-white" />
                  Servicio Especializado
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 text-[#38bdf8] text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  Santa Coloma de Gramenet
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-black text-white leading-tight mb-3 font-sans tracking-tight">
                {service.titleKey}
              </h1>

              <p className="text-[#38bdf8] text-base md:text-lg font-bold mb-4 leading-snug">
                {service.taglineKey}
              </p>

              <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-xl font-medium mb-8">
                {service.intro}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                  className="bg-[#2860F5] hover:bg-[#1e4ed8] active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-7 rounded-xl shadow-md transition-all flex items-center gap-2.5 cursor-pointer font-sans"
                >
                  <span>Solicitar presupuesto gratuito</span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                </a>
                <a
                  href="https://wa.me/34601259424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-100 text-[#101A30] font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center gap-2.5 cursor-pointer font-sans"
                >
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-[#25D366] shrink-0">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                  </svg>
                  <span>Consultar por WhatsApp</span>
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

        {/* ── B. NAVEGACIÓN INTERNA STICKY DEL SERVICIO (ESTILO SHOPIFY) ── */}
        <div className="sticky top-20 sm:top-24 z-30 mb-10 bg-white/95 backdrop-blur-md rounded-2xl p-2 border-2 border-slate-200 shadow-md">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "que-incluye", key: "que-incluye" as const, label: "¿Qué incluye?" },
              { id: "ventajas", key: "ventajas" as const, label: "Ventajas Gesgrama" },
              { id: "como-trabajamos", key: "metodologia" as const, label: "Metodología (3 Pasos)" },
              { id: "preguntas-frecuentes", key: "faqs" as const, label: "Preguntas Frecuentes" }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id, tab.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer font-sans ${
                    isActive
                      ? "bg-[#2860F5] text-white shadow-sm"
                      : "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── C. CONTENIDO PRINCIPAL: QUÉ INCLUYE + ATENCIÓN PRESENCIAL ── */}
        <section id="que-incluye" className="mb-14 scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Qué incluye en Bento Grid Limpio */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-9 border-2 border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#2860F5] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#2860F5] block font-sans">
                    Alcance del Servicio
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111C35] font-sans tracking-tight">
                    ¿Qué incluye nuestro servicio de {service.titleKey}?
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                {service.details.map((detail, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4.5 flex items-start gap-3.5 hover:border-[#2860F5] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#2860F5] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-slate-800 font-semibold leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Despacho y Contacto Directo */}
            <div className="lg:col-span-4 space-y-6">
              <div 
                className="bg-[#101A30] text-white rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col"
                itemScope
                itemType="https://schema.org/LocalBusiness"
              >
                <meta itemProp="name" content="Gesgrama - Santa Coloma de Gramenet" />
                <meta itemProp="image" content="https://gesgrama.com/images/gesgrama_office.webp" />
                <meta itemProp="telephone" content="+34934685656" />
                <meta itemProp="url" content="https://gesgrama.com" />

                <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                  <img
                    src="/images/gesgrama_office.webp"
                    alt="Oficina Gesgrama en Santa Coloma de Gramenet"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    width={400}
                    height={176}
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-[#101A30]/40" />
                  <span 
                    className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 bg-[#2860F5] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm"
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sede Central: Av. dels Banús, 49</span>
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black mb-2 text-white font-sans">
                    Atención técnica presencial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-5 font-medium leading-relaxed">
                    Te recibimos en persona en nuestro despacho de Santa Coloma o gestionamos tu consulta por teléfono o WhatsApp de inmediato.
                  </p>
                  <a
                    href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                    className="w-full bg-[#2860F5] hover:bg-[#1e4ed8] active:scale-[0.99] text-white font-black text-xs sm:text-sm py-3 px-5 rounded-xl text-center block transition-all shadow-md cursor-pointer uppercase tracking-wider font-sans"
                  >
                    Solicitar consulta personalizada
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── D. VENTAJAS Y GARANTÍAS (FORMATO VISUAL COMÚN, AZUL CORPORATIVO SÓLIDO) ── */}
        <section id="ventajas" className="mb-14 scroll-mt-36">
          <div className="bg-white rounded-3xl p-7 sm:p-10 border-2 border-slate-200 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5">
                <Award className="w-3.5 h-3.5 text-white" />
                Garantías Gesgrama
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111C35] font-sans tracking-tight">
                ¿Por qué elegir a Gesgrama en Santa Coloma?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-1.5 leading-relaxed">
                Máxima solvencia técnica, colegiación oficial y cobertura integral con más de 15 años de trayectoria local.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {service.benefits.map((b, i) => (
                <div 
                  key={i} 
                  className="bg-[#f8fafc] border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-[#2860F5] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2860F5] text-white flex items-center justify-center shrink-0 mb-3.5 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-white stroke-[2.4]" />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-bold text-[#111C35] leading-snug">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── E. METODOLOGÍA PASO A PASO (TIMELINE HORIZONTAL VISUAL Y ORDENADO) ── */}
        <section 
          id="como-trabajamos" 
          className="mb-14 scroll-mt-36 bg-white rounded-3xl p-7 sm:p-10 border-2 border-slate-200 shadow-sm"
          itemScope 
          itemType="https://schema.org/HowTo"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[#2860F5] font-black text-xs uppercase tracking-wider block mb-2 font-sans">
              Metodología Transparente
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111C35] font-sans tracking-tight" itemProp="name">
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
                className="bg-[#f8fafc] border-2 border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between shadow-xs hover:border-[#2860F5] transition-colors"
                itemScope 
                itemProp="step" 
                itemType="https://schema.org/HowToStep"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2860F5] text-white text-base font-black font-mono shadow-xs">
                      {st.number}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Fase 0{i + 1}
                    </span>
                  </div>
                  <meta itemProp="position" content={String(i + 1)} />
                  <h3 className="text-base sm:text-lg font-black text-[#111C35] mb-2 font-sans leading-snug" itemProp="name">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed" itemProp="text">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── F. PREGUNTAS FRECUENTES (ACORDEÓN INTERACTIVO FUNCIONAL CON FONDOS SÓLIDOS) ── */}
        <section 
          id="preguntas-frecuentes" 
          className="mb-14 scroll-mt-36 bg-white rounded-3xl p-7 sm:p-10 border-2 border-slate-200 shadow-sm"
          itemScope 
          itemType="https://schema.org/FAQPage"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-[#2860F5] font-black text-xs uppercase tracking-wider block mb-2 font-sans">
              Resolvemos tus Dudas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111C35] font-sans tracking-tight">
              Preguntas frecuentes sobre {service.titleKey}
            </h2>
          </div>

          <div className="space-y-3.5">
            {service.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border-2 rounded-2xl transition-all overflow-hidden ${
                    isOpen ? "border-[#2860F5] bg-[#f8fafc]" : "border-slate-200 bg-white"
                  }`}
                  itemScope 
                  itemProp="mainEntity" 
                  itemType="https://schema.org/Question"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-[15px] sm:text-base font-black text-[#111C35] font-sans flex items-center gap-3" itemProp="name">
                      <span className="w-6 h-6 rounded-full bg-[#2860F5] text-white text-xs font-black flex items-center justify-center shrink-0">
                        ?
                      </span>
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-[#2860F5] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isOpen && (
                    <div 
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                      className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-200/80"
                    >
                      <p className="text-sm sm:text-[15px] text-slate-700 font-medium leading-relaxed pl-9" itemProp="text">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── G. CROSS-SELLING INTERNO: OTROS SERVICIOS + ACCESO AL VALORADOR M² ── */}
        <section className="mb-14 bg-[#101A30] rounded-3xl p-7 sm:p-10 border border-slate-800 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-[#38bdf8] font-black text-xs uppercase tracking-wider block mb-2 font-sans">
              Ecosistema Integral Gesgrama
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
              Servicios complementarios en Santa Coloma
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
              Conectamos administración de fincas, comercialización inmobiliaria, asesoría jurídica y obras con un único interlocutor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {relatedServices.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  to="/servicios/$slug"
                  params={{ slug: rel.slug }}
                  className="bg-[#172545] hover:bg-[#1e325c] border-2 border-slate-700 hover:border-[#2860F5] rounded-2xl p-5 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#2860F5] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
                      <RelIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-2 font-sans">
                      {rel.titleKey}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-medium">
                      {rel.taglineKey}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs font-bold text-[#38bdf8]">
                    <span>Ver servicio completo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Banner Valorador de Viviendas */}
          <div className="bg-[#2860F5] rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-400/40 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white text-[#2860F5] flex items-center justify-center shrink-0 shadow-md">
                <Calculator className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white font-sans">¿Quieres saber el valor exacto de un piso en Santa Coloma?</h4>
                <p className="text-xs sm:text-sm text-blue-100 font-medium">Calcula en 1 minuto la horquilla de mercado según barrio y tipología.</p>
              </div>
            </div>
            <a
              href="/#valorador"
              className="bg-white hover:bg-slate-100 text-[#101A30] font-extrabold text-sm py-3 px-6 rounded-xl transition-all shrink-0 shadow-md flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>Calcular valoración gratuita</span>
              <ArrowRight className="w-4 h-4 text-[#2860F5]" />
            </a>
          </div>
        </section>

        {/* ── H. INTERLINKING HIPERLOCAL: LOS 14 BARRIOS DE SANTA COLOMA DE GRAMENET ── */}
        <section className="mb-14 bg-white rounded-3xl p-7 sm:p-10 border-2 border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-white" />
              Cobertura 100% Municipal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111C35] font-sans tracking-tight">
              {service.barrioTitleContext}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              Gesgrama opera de forma presencial y exclusiva en Santa Coloma de Gramenet. Consulta la información técnica de cada uno de los 14 barrios oficiales del municipio:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {SANTA_COLOMA_14_BARRIOS.map((barrio) => (
              <a
                key={barrio.slug}
                href={`/administrador-fincas/${barrio.slug}`}
                className="bg-[#f8fafc] hover:bg-[#101A30] border-2 border-slate-200 hover:border-[#101A30] rounded-xl p-3.5 transition-all duration-200 text-center flex flex-col items-center justify-center group cursor-pointer shadow-xs hover:-translate-y-0.5"
                title={`${service.titleKey} en el barrio de ${barrio.name}, Santa Coloma de Gramenet`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#2860F5] group-hover:bg-[#38bdf8] mb-2 transition-colors" />
                <span className="text-xs sm:text-sm font-black text-[#111C35] group-hover:text-white transition-colors block font-sans">
                  {barrio.name}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-bold font-mono transition-colors mt-0.5">
                  CP {barrio.cp}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2860F5] shrink-0" />
              <span>Sede central: <strong>Av. dels Banús, 49</strong> · Santa Coloma de Gramenet (08923)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
              Códigos postales cubiertos: 08921 · 08922 · 08923 · 08924
            </span>
          </div>
        </section>
      </main>

      {/* ── FOOTER GLOBAL UNIFICADO ── */}
      <Footer language={language} />

      <WhatsAppButton />
    </div>
  );
}
