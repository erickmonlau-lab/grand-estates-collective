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
  MapPin, 
  Award, 
  FileText, 
  Clock, 
  Calculator,
  ChevronDown,
  HelpCircle,
  ShieldCheck
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

interface FeatureCard {
  title: string;
  desc: string;
}

interface ValueCard {
  metric: string;
  title: string;
  desc: string;
}

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
  features: FeatureCard[];
  values: ValueCard[];
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
    intro: "En Gesgrama somos administradores de fincas colegiados especializados exclusivamente en Santa Coloma de Gramenet. Aplicamos con rigor el régimen de propiedad horizontal catalana (Libro V del Código Civil de Cataluña), garantizando transparencia contable permanente, mediación vecinal resolutiva y un ahorro directo en los costes comunitarios de la escalera.",
    features: [
      {
        title: "1. Rigor Legal (Código Civil Catalán)",
        desc: "Aplicación experta del Libro V (Llei 5/2006 de propietat horitzontal catalana) y cómputo de mayorías cualificadas sin errores jurídicos."
      },
      {
        title: "2. Juntas y Actas Inmediatas",
        desc: "Convocatoria ordenada, moderación profesional de asambleas y redacción ágil de actas con entrega directa a cada propietario."
      },
      {
        title: "3. Contabilidad 100% Clara",
        desc: "Liquidaciones económicas transparentes con acceso digital permanente a facturas originales y extractos bancarios conciliados céntimo a céntimo."
      },
      {
        title: "4. Control de Morosidad",
        desc: "Reclamación amistosa fehaciente y activación de procedimiento monitorio judicial comunitario con máxima rapidez y sin adelanto de honorarios."
      },
      {
        title: "5. Ahorro en Proveedores",
        desc: "Revisión y optimización continua de contratos de luz de escalera, ascensores, limpieza y pólizas comunitarias multirriesgo con un ahorro medio del 20%."
      },
      {
        title: "6. Gestión Ágil de Averías",
        desc: "Canal prioritario para incidencias comunitarias y derivación in situ con técnicos e industriales homologados en Santa Coloma de Gramenet."
      }
    ],
    values: [
      {
        metric: "COL. 5583",
        title: "Colegiación Oficial",
        desc: "Administradores colegiados con seguro de responsabilidad civil profesional y caución colegial que protegen los fondos de tu finca."
      },
      {
        metric: "48 horas",
        title: "Traspaso 100% Gratis",
        desc: "Gestionamos la recogida de libros, llaves y contabilidad con el administrador saliente sin molestias para la presidencia ni costes extra."
      },
      {
        metric: "-20% medio",
        title: "Ahorro en Gastos Fijos",
        desc: "Reducción demostrada en las cuotas ordinarias de la escalera auditando contratos de mantenimiento, seguros y tarifas energéticas."
      },
      {
        metric: "100% Local",
        title: "Atención Presencial",
        desc: "Despacho a pie de calle en Av. dels Banús, 49. Nos personamos en tu comunidad cuando lo necesites, sin filtros de call center."
      }
    ],
    image: "/images/santa_coloma_fincas.webp",
    asuntoOption: "Administración de Fincas",
    barrioTitleContext: "Administración de fincas y comunidades en los 14 barrios de Santa Coloma",
    steps: [
      {
        number: "01",
        title: "Auditoría inicial del edificio y contratos",
        desc: "Examinamos pólizas de seguros comunitarios, contratos de ascensor, suministros de luz y estado de morosidad para planificar ahorros inmediatos en las cuotas."
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
    features: [
      {
        title: "1. Valoración Precisa por m²",
        desc: "Tasación analítica basada en compraventas notariales reales y demanda vigente en el barrio específico de Santa Coloma."
      },
      {
        title: "2. Difusión Multicanal Premium",
        desc: "Reportaje fotográfico profesional, publicación destacada en Idealista y Fotocasa, y presencia activa en escaparate a pie de calle."
      },
      {
        title: "3. Alquiler Seguro (Lloguer Segur)",
        desc: "Análisis riguroso de solvencia crediticia, scoring financiero del arrendatario y cobertura del 100% de rentas con póliza de impago."
      },
      {
        title: "4. Control Legal de Rentas",
        desc: "Aplicación exacta del Índice de Referencia de Precios de Alquiler de Cataluña en zona tensionada para evitar sanciones."
      },
      {
        title: "5. Cédulas y Certificados CEE",
        desc: "Tramitación ágil de la Cédula de Habitabilidad y Certificado de Eficiencia Energética con arquitecto técnico propio."
      },
      {
        title: "6. Arras y Notaría Blindadas",
        desc: "Redacción de contratos de arras según el Art. 621-8 del Código Civil Catalán y acompañamiento presencial hasta la firma notarial."
      }
    ],
    values: [
      {
        metric: "AICAT 5583",
        title: "Garantía Registrada",
        desc: "Agentes acreditados en el Registro Oficial de la Generalitat de Catalunya con seguro de caución y responsabilidad civil."
      },
      {
        metric: "30-45 días",
        title: "Plazo Medio de Venta",
        desc: "Compradores cualificados e inversores locales activos que agilizan el cierre al valor óptimo de mercado."
      },
      {
        metric: "100% Cobro",
        title: "Garantía de Alquiler",
        desc: "Pólizas integrales de impago que cubren defensa jurídica, desahucio y cobro de rentas desde el primer impago."
      },
      {
        metric: "0€ Coste",
        title: "Valoración Inicial",
        desc: "Estudio comparativo de mercado presencial y sin compromiso para conocer el valor real de tu piso en Santa Coloma."
      }
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
        desc: "Difusión publicitaria premium, filtrado riguroso de compradores solventes o verificación de nóminas y estabilidad laboral en arrendatarios."
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
    features: [
      {
        title: "1. Herencias y Sucesiones",
        desc: "Tramitación integral de herencias con bienes inmuebles: aceptación, declaración de herederos, legítima catalana y adjudicación notarial."
      },
      {
        title: "2. Impuesto de Sucesiones (ATC)",
        desc: "Liquidación ante la Agència Tributària de Catalunya aplicando todas las reducciones legales por parentesco y transmisión de vivienda habitual."
      },
      {
        title: "3. Mínima Plusvalía (IIVTNU)",
        desc: "Cálculo comparativo entre método objetivo y plusvalía real en el Ayuntamiento de Santa Coloma para abonar la menor cuota legal."
      },
      {
        title: "4. Reclamación de Pérdidas",
        desc: "Tramitación de exención o no sujeción si el valor del suelo decreció entre la adquisición y la venta o adjudicación hereditaria."
      },
      {
        title: "5. Litigios y Desahucios",
        desc: "Interposición de demandas de desahucio por falta de pago o expiración de plazo y resolución de extinciones de condominio entre coherederos."
      },
      {
        title: "6. Asesoría en IRPF Inmobiliario",
        desc: "Optimización de la ganancia patrimonial en renta por transmisión de fincas con estudio de exención por reinversión en mayores de 65 años."
      }
    ],
    values: [
      {
        metric: "15+ Años",
        title: "Especialización Civil",
        desc: "Abogados y fiscalistas con dominio absoluto de la normativa catalana y ordenanzas fiscales de Santa Coloma de Gramenet."
      },
      {
        metric: "0 Sorpresas",
        title: "Presupuesto Cerrado",
        desc: "Propuesta económica por escrito desde la primera sesión de asesoramiento, con honorarios claros y sin gastos imprevistos."
      },
      {
        metric: "Máximo",
        title: "Ahorro Fiscal Legal",
        desc: "Elegimos siempre la alternativa tributaria más beneficiosa para reducir la factura impositiva de sucesiones y plusvalías."
      },
      {
        metric: "Presencial",
        title: "Estudio Documental",
        desc: "Revisamos escrituras, notas registrales y recibos en persona en nuestra sede local para asegurar la máxima tranquilidad jurídica."
      }
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
    features: [
      {
        title: "1. Dictamen ITE Obligatoria",
        desc: "Inspección técnica para edificios de más de 45 años, emisión de dictamen y obtención del Certificado de Aptitud ante la Generalitat."
      },
      {
        title: "2. Fachadas y Patios de Luces",
        desc: "Saneamiento de revocos, reparación de cornisas, balcones de hormigón y aplicación de revestimientos técnicos protectores."
      },
      {
        title: "3. Ascensor a Cota Cero",
        desc: "Eliminación de barreras arquitectónicas en portales e instalación de elevadores interiores o exteriores en comunidades sin ascensor."
      },
      {
        title: "4. Cubiertas y Bajantes",
        desc: "Impermeabilización garantizada de terrados comunitarios, tejados y sustitución completa de bajantes de fecales y pluviales."
      },
      {
        title: "5. Subvenciones NextGen",
        desc: "Tramitación y justificación completa de fondos europeos y ayudas metropolitanas para rehabilitación con hasta un 80% de subvención."
      },
      {
        title: "6. Licitación y Precio Cerrado",
        desc: "Concurso ciego entre constructoras de confianza, dirección facultativa y cláusulas de penalización por retrasos sin derramas sorpresa."
      }
    ],
    values: [
      {
        metric: "Hasta 80%",
        title: "Subvenciones Públicas",
        desc: "Gestión integral de Fondos Europeos Next Generation y ayudas del Consorci Metropolità para financiar la rehabilitación de tu finca."
      },
      {
        metric: "0 Derramas",
        title: "Precio y Plazo Cerrado",
        desc: "Contratos de ejecución estrictos con penalizaciones por día de retraso y mediciones auditadas por arquitecto técnico."
      },
      {
        metric: "10 Años",
        title: "Garantía Oficial",
        desc: "Rehabilitaciones con cobertura técnica decenal y entrega de Libro del Edificio conforme a las normativas de la Generalitat."
      },
      {
        metric: "Técnicos",
        title: "Equipo Propio Homologado",
        desc: "Arquitectos técnicos colegiados con amplia experiencia en las particularidades estructurales de Santa Coloma de Gramenet."
      }
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

  return (
    <div className="bg-[#F8FAFC] text-[#0f172a] min-h-screen font-sans selection:bg-[#2563EB] selection:text-white overflow-x-clip">
      {/* ── NAVBAR CORPORATIVO OFICIAL ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 1: HERO DEL SERVICIO -> CONTENEDOR VELLUM CLARO ESTILO APPLE
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8">
        <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          {/* Top Breadcrumb & Return Link con FONDOS SÓLIDOS BIEN CONTRASTADOS */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              hash="servicios"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#2563EB] border border-[#0F172A] hover:border-[#2563EB] px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#60A5FA] group-hover:text-white group-hover:-translate-x-1 transition-all" />
              <span>Volver a Servicios</span>
            </Link>

            <nav aria-label="Migas de pan">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" itemProp="item" className="hover:text-[#2563EB] transition-colors">
                    <span itemProp="name">Inicio</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="text-slate-300">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" hash="servicios" itemProp="item" className="text-[#2563EB] hover:underline transition-colors font-bold">
                    <span itemProp="name">Servicios</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li className="text-slate-300">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-[#0f172a] font-extrabold">{service.titleKey}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Columna Izquierda: Información */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xs">
                  <IconComp className="w-4 h-4 text-white" />
                  Servicio Especializado
                </span>
                {/* Etiqueta sólida Santa Coloma de Gramenet */}
                <span className="inline-flex items-center gap-1.5 bg-[#0F172A] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                  Santa Coloma de Gramenet
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] leading-tight mb-4 tracking-tight">
                {service.titleKey}
              </h1>

              <p className="text-[#2563EB] text-lg sm:text-xl font-bold mb-4 leading-snug">
                {service.taglineKey}
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mb-8">
                {service.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-black text-sm sm:text-base py-4 px-8 rounded-xl shadow-md transition-all flex items-center gap-3 cursor-pointer"
                >
                  <span>Solicitar presupuesto gratuito</span>
                  <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                </a>
                <a
                  href="https://wa.me/34601259424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EFF6FF] hover:bg-blue-100 text-[#0f172a] border border-blue-200 font-black text-sm sm:text-base py-4 px-7 rounded-xl shadow-xs transition-all flex items-center gap-3 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#16A34A] shrink-0">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                  </svg>
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Fotografía Real Local con Tarjeta Inferior de Sede Central */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
                <img 
                  src={service.image} 
                  alt={`${service.titleKey} en Santa Coloma de Gramenet`} 
                  className="w-full h-[360px] sm:h-[400px] object-cover" 
                  width={600}
                  height={400}
                  loading="eager"
                />
                {/* Tarjeta flotante inferior en Azul Marino Sólido #0F172A */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0F172A] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3.5 border border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#60A5FA] block">
                      Sede Central en Santa Coloma
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                      Av. dels Banús, 49 · Atención Presencial
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 2: "¿QUÉ INCLUYE?" -> CONTENEDOR VELLUM CLARO ESTILO APPLE
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          {/* Cabecera centrada */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <FileText className="w-4 h-4 text-white" />
              Alcance del Servicio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
              ¿Qué incluye nuestro servicio de {service.titleKey}?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              Desglose detallado de actuaciones jurídicas, técnicas y administrativas incluidas en nuestra tarifa sin sobrecostes.
            </p>
          </div>

          {/* Grid Bento Simétrico de 3 Columnas (Tarjetas Azul Claro Sólido #EFF6FF) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {service.features.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-[#EFF6FF] border-2 border-blue-200/80 hover:border-[#2563EB] rounded-2xl p-7 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Cuadrado sólido azul intenso 48x48 */}
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 mb-5 shadow-xs group-hover:scale-105 transition-transform">
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0f172a] mb-3 leading-snug group-hover:text-[#2563EB] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Horizontal de Contacto Directo en Azul Marino Sólido #0F172A */}
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <img
                src="/images/gesgrama_office.webp"
                alt="Despacho Gesgrama Santa Coloma"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-700 shrink-0 shadow-md"
                width={112}
                height={112}
                loading="lazy"
              />
              <div>
                <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  Atención en Despacho
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Atención técnica presencial en nuestro despacho de Santa Coloma
                </h4>
                <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
                  Visítanos en Av. dels Banús, 49 o concierta una reunión con nuestros administradores y abogados.
                </p>
              </div>
            </div>

            <a
              href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
              className="bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0f172a] font-black text-sm sm:text-base py-4 px-8 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Solicitar consulta personalizada</span>
              <ArrowRight className="w-5 h-5 text-[#2563EB] stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 3: "¿POR QUÉ ELEGIR A GESGRAMA?" + METODOLOGÍA -> CONTENEDOR VELLUM CLARO
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          {/* Bloque A: ¿Por qué elegir a Gesgrama en Santa Coloma? */}
          <div className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
                <Award className="w-4 h-4 text-white" />
                Ventajas Gesgrama
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
                ¿Por qué elegir a Gesgrama en Santa Coloma?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Solvencia técnica colegiada, transparencia contable garantizada y cercanía física en cada gestión.
              </p>
            </div>

            {/* 4 Tarjetas en Azul Claro Sólido (#EFF6FF) con texto oscuro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.values.map((v, i) => (
                <div 
                  key={i}
                  className="bg-[#EFF6FF] text-[#0f172a] border-2 border-blue-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:border-[#2563EB] transition-all"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#2563EB] block font-mono mb-3">
                      {v.metric}
                    </span>
                    <h3 className="text-lg font-black text-[#0f172a] mb-2 leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Línea divisoria suave */}
          <div className="w-full h-px bg-slate-200 my-16" />

          {/* Bloque B: "Cómo trabajamos paso a paso" (Tarjetas en Azul Claro #EFF6FF con texto oscuro) */}
          <div itemScope itemType="https://schema.org/HowTo">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
                <Clock className="w-4 h-4 text-white" />
                Metodología
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4" itemProp="name">
                Cómo trabajamos paso a paso
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed" itemProp="description">
                Un proceso riguroso, trazable y adaptado a la legislación de Cataluña y normativas de Santa Coloma de Gramenet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {service.steps.map((st, i) => (
                <div 
                  key={i}
                  className="bg-[#EFF6FF] border-2 border-blue-200/80 hover:border-[#2563EB] rounded-2xl p-7 flex flex-col justify-between shadow-xs transition-all"
                  itemScope 
                  itemProp="step" 
                  itemType="https://schema.org/HowToStep"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      {/* Etiqueta PASO con fondo azul sólido */}
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#2563EB] text-white text-sm font-black font-mono shadow-xs">
                        PASO {st.number}
                      </span>
                      <span className="text-xs font-black text-[#2563EB] uppercase tracking-wider font-mono">
                        Fase 0{i + 1}
                      </span>
                    </div>
                    <meta itemProp="position" content={String(i + 1)} />
                    <h3 className="text-lg sm:text-xl font-black text-[#0f172a] mb-3 leading-snug" itemProp="name">
                      {st.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed" itemProp="text">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 4: PREGUNTAS FRECUENTES (FAQ) -> CONTENEDOR VELLUM CLARO
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-[960px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <HelpCircle className="w-4 h-4 text-white" />
              Resolvemos tus Dudas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
              Preguntas frecuentes sobre {service.titleKey}
            </h2>
            <p className="text-slate-600 text-base font-medium">
              Respuestas directas y claras a las consultas más comunes de propietarios y comunidades en Santa Coloma.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i}
                  className={`border-2 rounded-2xl transition-all overflow-hidden ${
                    isOpen ? "border-[#2563EB] bg-[#EFF6FF] shadow-xs" : "border-slate-200 bg-[#F8FAFC]"
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
                    <h3 className="text-base sm:text-lg font-black text-[#0f172a] flex items-center gap-3.5" itemProp="name">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 transition-colors ${
                        isOpen ? "bg-[#2563EB] text-white" : "bg-[#0F172A] text-white"
                      }`}>
                        ?
                      </span>
                      <span>{faq.q}</span>
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-[#2563EB] text-white rotate-180" : "bg-slate-200 text-slate-700"
                    }`}>
                      <ChevronDown className="w-5 h-5 stroke-[3]" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div 
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                      className="px-5 sm:px-6 pb-6 pt-2 border-t-2 border-blue-200/60"
                    >
                      <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed pl-11" itemProp="text">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 5: SERVICIOS COMPLEMENTARIOS -> CONTENEDOR VELLUM CLARO
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Building2 className="w-4 h-4 text-white" />
              Ecosistema Integral Gesgrama
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
              Servicios complementarios en Santa Coloma
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              Conectamos administración de fincas, comercialización inmobiliaria, asesoría jurídica y obras con un único interlocutor directo.
            </p>
          </div>

          {/* 3 Tarjetas en Azul Claro Sólido (#EFF6FF) con botones destacados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {relatedServices.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <div
                  key={rel.slug}
                  className="bg-[#EFF6FF] text-[#0f172a] border-2 border-blue-200/80 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:border-[#2563EB] transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center mb-5 shadow-xs">
                      <RelIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-[#0f172a] mb-3 leading-snug">
                      {rel.titleKey}
                    </h3>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mb-6">
                      {rel.taglineKey}
                    </p>
                  </div>
                  
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: rel.slug }}
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 px-5 rounded-xl font-black text-sm text-center block transition-all shadow-xs cursor-pointer"
                  >
                    Ver servicio completo →
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Banner Valorador en Azul Marino Sólido #0F172A con botón blanco */}
          <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-700 shadow-xl text-white">
            <div className="flex items-center gap-5 text-left">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center shrink-0 shadow-md">
                <Calculator className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  ¿Quieres saber el valor exacto de un piso en Santa Coloma?
                </h4>
                <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
                  Calcula en 1 minuto la horquilla real de mercado según barrio y tipología sin registro obligatorio.
                </p>
              </div>
            </div>
            
            <a
              href="/#valorador"
              className="bg-white hover:bg-[#F8FAFC] text-[#0f172a] font-black text-sm sm:text-base py-4 px-8 rounded-xl transition-all shrink-0 shadow-md flex items-center gap-3 cursor-pointer"
            >
              <span>Calcular valoración gratuita</span>
              <ArrowRight className="w-5 h-5 text-[#2563EB] stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 6: LOS 14 BARRIOS DE SANTA COLOMA -> CONTENEDOR VELLUM CLARO
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <MapPin className="w-4 h-4 text-white" />
              Cobertura 100% Municipal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
              {service.barrioTitleContext}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              Gesgrama opera de forma presencial y exclusiva en Santa Coloma de Gramenet. Selecciona tu barrio para consultar información técnica y comunitaria especializada:
            </p>
          </div>

          {/* Grid de Píldoras Interactivas Sólidas de Alto Contraste */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {SANTA_COLOMA_14_BARRIOS.map((barrio) => (
              <a
                key={barrio.slug}
                href={`/administrador-fincas/${barrio.slug}`}
                className="bg-[#EFF6FF] hover:bg-[#2563EB] text-[#0f172a] hover:text-white border-2 border-blue-200/80 hover:border-[#2563EB] rounded-2xl p-4.5 flex items-center justify-between transition-all duration-200 shadow-xs hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
                title={`${service.titleKey} en el barrio de ${barrio.name}, Santa Coloma de Gramenet`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] group-hover:bg-white text-white group-hover:text-[#2563EB] flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-base font-black truncate block leading-snug">
                      {barrio.name}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-500 group-hover:text-blue-100 transition-colors">
                      CP {barrio.cp}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#1D4ED8] text-[#2563EB] group-hover:text-white flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-transparent transition-all shadow-xs">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </a>
            ))}
          </div>

          {/* Footer de cobertura municipal con SEDE CENTRAL en Azul Marino Sólido #0F172A */}
          <div className="p-5 sm:p-6 bg-[#0F172A] text-white border border-slate-700 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold shadow-md">
            <span className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0" />
              <span>Sede central: <strong className="text-white">Av. dels Banús, 49</strong> · Santa Coloma de Gramenet (08923)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white px-3.5 py-1.5 rounded-full font-mono text-xs font-black shadow-xs">
              Códigos postales cubiertos: 08921 · 08922 · 08923 · 08924
            </span>
          </div>

        </div>
      </section>

      {/* ── FOOTER GLOBAL UNIFICADO ── */}
      <Footer language={language} />

      <WhatsAppButton />
    </div>
  );
}
