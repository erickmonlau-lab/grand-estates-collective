import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  Building2, 
  TrendingUp, 
  Scale, 
  Wrench, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Award, 
  FileText, 
  Clock, 
  Calculator,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Users,
  BookOpen,
  DollarSign,
  AlertTriangle,
  Flame,
  BadgeCheck,
  CheckCircle2,
  Phone,
  Home,
  Check
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DrawnUnderline } from "@/components/DrawnUnderline";

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
      "mainEntity": s.faqs.es.map(f => ({
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
      "name": s.titleKey.es,
      "serviceType": s.titleKey.es,
      "description": s.metaDesc.es,
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
          "name": s.titleKey.es,
          "item": canonicalUrl
        }
      ]
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `Cómo funciona el servicio de ${s.titleKey.es} en Gesgrama`,
      "description": s.intro.es,
      "step": s.steps.es.map((st, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": st.title,
        "text": st.desc
      }))
    };

    return {
      meta: [
        { title: s.metaTitle.es },
        { name: "description", content: s.metaDesc.es },
        { name: "keywords", content: `${s.titleKey.es}, Santa Coloma de Gramenet, ${barriosNames}, 08921, 08922, 08923, 08924` },
        { property: "og:title", content: s.metaTitle.es },
        { property: "og:description", content: s.metaDesc.es },
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

interface I18nText {
  es: string;
  ca: string;
  en: string;
}

interface FeatureItem {
  icon: any;
  title: I18nText;
  desc: I18nText;
}

interface ValueItem {
  metric: string;
  title: I18nText;
  desc: I18nText;
  icon: any;
}

interface StepItem {
  number: string;
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceDataConfig {
  id: string;
  slug: string;
  icon: any;
  providerSchemaType: string;
  titleKey: I18nText;
  taglineKey: I18nText;
  metaTitle: I18nText;
  metaDesc: I18nText;
  intro: I18nText;
  features: FeatureItem[];
  values: ValueItem[];
  image: string;
  imageAlt: I18nText;
  asuntoOption: string;
  barrioTitleContext: I18nText;
  steps: { es: StepItem[]; ca: StepItem[]; en: StepItem[] };
  faqs: { es: FaqItem[]; ca: FaqItem[]; en: FaqItem[] };
}

const servicesData: Record<string, ServiceDataConfig> = {
  "administracion-de-fincas": {
    id: "fincas",
    slug: "administracion-de-fincas",
    icon: Building2,
    providerSchemaType: "RealEstateAgent",
    titleKey: {
      es: "Administración de Fincas",
      ca: "Administració de Finques",
      en: "Property Management"
    },
    taglineKey: {
      es: "Gestión colegiada de comunidades y fincas en Santa Coloma de Gramenet",
      ca: "Gestió col·legiada de comunitats i finques a Santa Coloma de Gramenet",
      en: "Chartered community and property management in Santa Coloma de Gramenet"
    },
    metaTitle: {
      es: "Administrador de Fincas en Santa Coloma de Gramenet | Colegiados Gesgrama",
      ca: "Administrador de Finques a Santa Coloma de Gramenet | Col·legiats Gesgrama",
      en: "Property Manager in Santa Coloma de Gramenet | Gesgrama"
    },
    metaDesc: {
      es: "Administradores de fincas colegiados en Santa Coloma de Gramenet. Gestión integral según el Libro V del Código Civil de Cataluña, auditoría contable y control de morosidad.",
      ca: "Administradors de finques col·legiats a Santa Coloma de Gramenet. Gestió integral segons el Llibre V del Codi Civil de Catalunya, auditoria comptable i control de morositat.",
      en: "Chartered property managers in Santa Coloma de Gramenet. Comprehensive management according to Book V of the Civil Code of Catalonia, audit and debt control."
    },
    intro: {
      es: "En Gesgrama somos administradores de fincas colegiados especializados exclusivamente en Santa Coloma de Gramenet. Aplicamos con rigor el régimen de propiedad horizontal catalana (Libro V del Código Civil de Cataluña), garantizando transparencia contable permanente, mediación vecinal resolutiva y un ahorro directo en los costes comunitarios de la escalera.",
      ca: "A Gesgrama som administradors de finques col·legiats especialitzats exclusivament a Santa Coloma de Gramenet. Apliquem amb rigor el règim de propietat horitzontal catalana (Llibre V del Codi Civil de Catalunya), garantint transparència comptable permanent, mediació veïnal resolutiva i un estalvi directe en les despeses comunitàries de l'escala.",
      en: "At Gesgrama we are chartered property managers specialized exclusively in Santa Coloma de Gramenet. We apply Catalan horizontal property regulations rigorously, ensuring permanent accounting transparency, swift neighbour mediation and direct cost savings."
    },
    image: "/images/art8_comunidad_propietarios.webp",
    imageAlt: {
      es: "Edificio residencial plurifamiliar y comunidad de propietarios en Santa Coloma de Gramenet",
      ca: "Edifici residencial plurifamiliar i comunitat de propietaris a Santa Coloma de Gramenet",
      en: "Multi-family residential building and homeowners community in Santa Coloma"
    },
    asuntoOption: "Administración de Fincas",
    barrioTitleContext: {
      es: "Administración de fincas y comunidades en los 14 barrios de Santa Coloma",
      ca: "Administració de finques i comunitats als 14 barris de Santa Coloma",
      en: "Property and community management across Santa Coloma's 14 neighborhoods"
    },
    features: [
      {
        icon: Scale,
        title: {
          es: "Rigor Legal (Código Civil Catalán)",
          ca: "Rigor Legal (Codi Civil Català)",
          en: "Legal Rigor (Catalan Civil Code)"
        },
        desc: {
          es: "Aplicación experta del Libro V (Llei 5/2006 de propietat horitzontal catalana) y cómputo exacto de mayorías cualificadas sin errores jurídicos.",
          ca: "Aplicació experta del Llibre V (Llei 5/2006 de propietat horitzontal catalana) i còmput exacte de majories qualificades sense errors jurídics.",
          en: "Expert application of Book V (Law 5/2006 on Catalan Horizontal Property) and accurate voting calculations."
        }
      },
      {
        icon: Users,
        title: {
          es: "Juntas y Actas Inmediatas",
          ca: "Juntes i Actes Immediates",
          en: "Prompt Meetings & Minutes"
        },
        desc: {
          es: "Convocatoria ordenada, moderación profesional de asambleas y redacción ágil de actas con entrega directa a cada propietario.",
          ca: "Convocatòria ordenada, moderació professional d'assemblees i redacció àgil d'actes amb lliurament directe a cada propietari.",
          en: "Organized call, professional moderation of meetings and prompt drafting and distribution of official minutes."
        }
      },
      {
        icon: DollarSign,
        title: {
          es: "Contabilidad 100% Clara",
          ca: "Comptabilitat 100% Clara",
          en: "100% Transparent Accounting"
        },
        desc: {
          es: "Liquidaciones económicas transparentes con acceso digital permanente a facturas originales y extractos bancarios conciliados al céntimo.",
          ca: "Liquidacions econòmiques transparents amb accés digital permanent a factures originals i extractes bancaris conciliats al cèntim.",
          en: "Transparent financial settlements with ongoing digital access to invoices and bank statements reconciled to the cent."
        }
      },
      {
        icon: AlertTriangle,
        title: {
          es: "Control de Morosidad",
          ca: "Control de Morositat",
          en: "Arrears & Debt Control"
        },
        desc: {
          es: "Reclamación amistosa fehaciente y activación de procedimiento monitorio judicial comunitario con máxima rapidez y sin adelanto de honorarios.",
          ca: "Reclamació amistosa fefaent i activació de procediment monitori judicial comunitari amb màxima rapidesa i sense bestreta d'honoraris.",
          en: "Formal amicable collection and swift activation of judicial payment order procedures without upfront fees."
        }
      },
      {
        icon: Award,
        title: {
          es: "Ahorro en Proveedores",
          ca: "Estalvi en Proveïdors",
          en: "Supplier & Utility Savings"
        },
        desc: {
          es: "Revisión y optimización continua de contratos de luz de escalera, ascensores, limpieza y pólizas comunitarias multirriesgo.",
          ca: "Revisió i optimització contínua de contractes de llum d'escala, ascensors, neteja i pòlisses comunitàries multirisc.",
          en: "Continuous review and renegotiation of stairwell lighting, elevator contracts, cleaning and building insurance policies."
        }
      },
      {
        icon: Flame,
        title: {
          es: "Gestión Ágil de Averías",
          ca: "Gestió Àgil d'Avaries",
          en: "Rapid Breakdown Handling"
        },
        desc: {
          es: "Canal prioritario para incidencias comunitarias y derivación in situ con técnicos e industriales homologados en Santa Coloma de Gramenet.",
          ca: "Canal prioritari per a incidències comunitàries i derivació in situ amb tècnics i industrials homologats a Santa Coloma de Gramenet.",
          en: "Priority channel for community incidents with on-site dispatch of certified local technicians and contractors."
        }
      }
    ],
    values: [
      {
        metric: "COL. CAFBL",
        icon: ShieldCheck,
        title: {
          es: "Colegiación Oficial",
          ca: "Col·legiació Oficial",
          en: "Official Membership"
        },
        desc: {
          es: "Administradores adscritos al Col·legi d'Administradors de Finques con seguro de responsabilidad civil y caución que protegen los fondos de tu finca.",
          ca: "Administradors adscrits al Col·legi d'Administradors de Finques amb assegurança de responsabilitat civil i caució que protegeixen els fons de la teva finca.",
          en: "Chartered managers with civil liability and surety insurance protecting your community funds."
        }
      },
      {
        metric: "Sin Molestias",
        icon: Clock,
        title: {
          es: "Traspaso 100% Gratis",
          ca: "Traspàs 100% Gratuït",
          en: "100% Free Handover"
        },
        desc: {
          es: "Gestionamos la recogida de libros, llaves y contabilidad con el administrador saliente sin molestias para la presidencia ni costes extra.",
          ca: "Gestionem la recollida de llibres, claus i comptabilitat amb l'administrador sortint sense molèsties per a la presidència ni costos extra.",
          en: "We handle the collection of books, keys, and accounts from the previous manager with zero president hassle or extra fees."
        }
      },
      {
        metric: "Optimizado",
        icon: DollarSign,
        title: {
          es: "Ahorro en Gastos Fijos",
          ca: "Estalvi en Despeses Fixes",
          en: "Fixed Cost Reduction"
        },
        desc: {
          es: "Reducción auditada en las cuotas ordinarias de la escalera revisando contratos de mantenimiento, seguros y tarifas energéticas.",
          ca: "Reducció auditada en les quotes ordinàries de l'escala revisant contractes de manteniment, assegurances i tarifes energètiques.",
          en: "Audited reduction in regular fees by reviewing maintenance contracts, insurance, and energy tariffs."
        }
      },
      {
        metric: "100% Local",
        icon: MapPin,
        title: {
          es: "Atención Presencial",
          ca: "Atenció Presencial",
          en: "On-Site Attention"
        },
        desc: {
          es: "Despacho a pie de calle en Av. dels Banús, 49. Nos personamos en tu comunidad cuando lo necesites, sin filtros de call center.",
          ca: "Despatx a peu de carrer a Av. dels Banús, 49. Ens personem a la teva comunitat quan ho necessitis, sense filtres de call center.",
          en: "Ground-floor office at Av. dels Banús, 49. We visit your community whenever needed without call center filters."
        }
      }
    ],
    steps: {
      es: [
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
      ca: [
        {
          number: "01",
          title: "Auditoria inicial de l'edifici i contractes",
          desc: "Examinem pòlisses d'assegurances comunitàries, contractes d'ascensor, subministraments de llum i estat de morositat per planificar estalvis immediats en les quotes."
        },
        {
          number: "02",
          title: "Aprovació i traspàs integral sense cost",
          desc: "Guiem la presidència per incloure el punt a la junta. Ens personem davant l'administrador anterior per custodiar llibres d'actes, claus bancàries i expedients sense conflicte."
        },
        {
          number: "03",
          title: "Gestió transparent i mediació contínua",
          desc: "Assignem gestor col·legiat amb telèfon directe, supervisem avaries en temps real i publiquem balanços clars sense lletra petita."
        }
      ],
      en: [
        {
          number: "01",
          title: "Initial building and contract audit",
          desc: "We review community insurance, elevator contracts, electricity supplies and debt status to plan immediate fee savings."
        },
        {
          number: "02",
          title: "Approval and free seamless handover",
          desc: "We guide the presidency to table the vote. We meet the outgoing manager directly to take over minute books, bank access and files without friction."
        },
        {
          number: "03",
          title: "Transparent management & continuous mediation",
          desc: "We assign a designated manager with direct phone contact, monitor repair issues in real-time, and publish crystal-clear balance sheets."
        }
      ]
    },
    faqs: {
      es: [
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
      ],
      ca: [
        {
          q: "Quina majoria es necessita per canviar d'administrador de finques a Santa Coloma?",
          a: "Conforme a la normativa catalana (Llibre V del Codi Civil de Catalunya), n'hi ha prou amb l'acord de la majoria simple dels propietaris presents i representats (que sumin la majoria de quotes) en una junta ordinària o extraordinària degudament convocada."
        },
        {
          q: "Té algun cost o penalització canviar a Gesgrama com a administrador?",
          a: "Cap ni un. El procés de transició, auditoria inicial i recepció de la documentació comunitària és 100% gratuït. A més, revisem els contractes de manteniment existents per rebaixar el pressupost de l'escala."
        },
        {
          q: "Com actua Gesgrama davant d'un veí morós a la comunitat?",
          a: "Iniciem immediatament la mediació amistosa i el requeriment fefaent amb desglossament comptable. Si no hi ha acord, la junta aprova la liquidació certificada i el nostre departament legal interposa el procediment monitori de reclamació judicial."
        },
        {
          q: "Gestioneu també comunitats de pàrquing o mancomunitats a Santa Coloma?",
          a: "Sí. Administrem garatges comunitaris, mancomunitats de propietaris i complexos residencials amb guals i zones comunes a tots els barris colomencs."
        }
      ],
      en: [
        {
          q: "What majority is required to change property managers in Santa Coloma?",
          a: "Under Catalan horizontal property law (Book V of the Civil Code of Catalonia), a simple majority of owners present and represented (accounting for the majority of participation quotas) at a duly convened meeting is sufficient."
        },
        {
          q: "Is there any fee or penalty for switching to Gesgrama as property manager?",
          a: "None. The handover process, initial audit, and document transfer are 100% free of charge. We also review existing service contracts to lower the building budget."
        },
        {
          q: "How does Gesgrama handle delinquent unit owners in the building?",
          a: "We initiate friendly mediation and formal demand notices immediately. If unpaid, the owners' assembly certifies the debt and our legal department files a court payment order procedure."
        },
        {
          q: "Do you also manage residential parking garages and multi-building complexes in Santa Coloma?",
          a: "Yes. We manage parking communities, joint property associations, and residential complexes across all 14 neighborhoods of Santa Coloma."
        }
      ]
    }
  },
  "gestion-inmobiliaria": {
    id: "inmobiliaria",
    slug: "gestion-inmobiliaria",
    icon: TrendingUp,
    providerSchemaType: "RealEstateAgent",
    titleKey: {
      es: "Gestión Inmobiliaria",
      ca: "Gestió Immobiliària",
      en: "Real Estate Management"
    },
    taglineKey: {
      es: "Agencia inmobiliaria AICAT, compraventa y alquiler seguro en Santa Coloma",
      ca: "Agència immobiliària AICAT, compravenda i lloguer segur a Santa Coloma",
      en: "AICAT registered real estate agency, sales and secure rentals in Santa Coloma"
    },
    metaTitle: {
      es: "Inmobiliaria en Santa Coloma de Gramenet | Venta y Alquiler Seguro Gesgrama",
      ca: "Immobiliària a Santa Coloma de Gramenet | Venda i Lloguer Segur Gesgrama",
      en: "Real Estate in Santa Coloma de Gramenet | Safe Sales & Rentals Gesgrama"
    },
    metaDesc: {
      es: "Agencia inmobiliaria en Santa Coloma de Gramenet registrada en AICAT. Valoración gratuita por m², venta al mejor precio de mercado y alquiler seguro con seguro de impago.",
      ca: "Agència immobiliària a Santa Coloma de Gramenet registrada a l'AICAT. Valoració gratuïta per m², venda al millor preu de mercat i lloguer segur amb assegurança d'impagament.",
      en: "AICAT registered real estate agency in Santa Coloma de Gramenet. Free valuation per m², best market price sales and safe rentals."
    },
    intro: {
      es: "Somos agentes inmobiliarios inscritos en el Registre d'Agents Immobiliaris de Catalunya (AICAT Nº 5583). Si quieres vender o alquilar tu piso en Santa Coloma de Gramenet, te aseguramos el valor real óptimo de mercado con total solvencia, filtro exhaustivo de inquilinos y blindaje legal en cada contrato.",
      ca: "Som agents immobiliaris inscrits al Registre d'Agents Immobiliaris de Catalunya (AICAT Núm. 5583). Si vols vendre o llogar el teu pis a Santa Coloma de Gramenet, t'assegurem el valor real òptim de mercat amb total solvència, filtre exhaustiu de llogaters i blindatge legal a cada contracte.",
      en: "We are registered real estate agents with the Official Catalan Registry (AICAT No. 5583). Whether selling or letting your home in Santa Coloma de Gramenet, we secure optimal market value with vetted solvency and legal protections."
    },
    image: "/images/interior_santacoloma_opt.webp",
    imageAlt: {
      es: "Salón luminoso y vivienda residencial gestionada por Gesgrama en Santa Coloma",
      ca: "Saló lluminós i habitatge residencial gestionat per Gesgrama a Santa Coloma",
      en: "Bright living room and residential property managed by Gesgrama in Santa Coloma"
    },
    asuntoOption: "Gestión Inmobiliaria",
    barrioTitleContext: {
      es: "Agencia inmobiliaria especialista en los 14 barrios de Santa Coloma",
      ca: "Agència immobiliària especialista als 14 barris de Santa Coloma",
      en: "Specialist real estate agency across Santa Coloma's 14 neighborhoods"
    },
    features: [
      {
        icon: Calculator,
        title: {
          es: "Valoración Precisa por m²",
          ca: "Valoració Precisa per m²",
          en: "Precise Valuation per m²"
        },
        desc: {
          es: "Tasación analítica basada en compraventas notariales reales y demanda vigente en el barrio específico de Santa Coloma.",
          ca: "Taxació analítica basada en compravendes notarials reals i demanda vigent al barri específic de Santa Coloma.",
          en: "Analytical appraisal based on actual notarial transactions and real-time demand in your specific Santa Coloma quarter."
        }
      },
      {
        icon: Home,
        title: {
          es: "Difusión Multicanal Premium",
          ca: "Difusió Multicanal Premium",
          en: "Premium Multichannel Marketing"
        },
        desc: {
          es: "Reportaje fotográfico profesional, publicación destacada en portales inmobiliarios y presencia en escaparate a pie de calle.",
          ca: "Reportatge fotogràfic professional, publicació destacada en portals immobiliaris i presència en aparador a peu de carrer.",
          en: "Professional photo shoot, featured listings on major property portals, and prime street-level showcase display."
        }
      },
      {
        icon: ShieldCheck,
        title: {
          es: "Alquiler Seguro (Lloguer Segur)",
          ca: "Lloguer Segur",
          en: "Secure Rental Guarantee"
        },
        desc: {
          es: "Análisis riguroso de solvencia crediticia, scoring financiero del arrendatario y cobertura del 100% de rentas con póliza de impago.",
          ca: "Anàlisi rigorosa de solvència creditícia, scoring financer de l'arrendatari i cobertura del 100% de rendes amb pòlissa d'impagament.",
          en: "Strict creditworthiness checks, financial tenant scoring, and full rent insurance cover."
        }
      },
      {
        icon: FileText,
        title: {
          es: "Control Legal de Rentas",
          ca: "Control Legal de Rendes",
          en: "Rent Control Compliance"
        },
        desc: {
          es: "Aplicación exacta del Índice de Referencia de Precios de Alquiler de Cataluña en zona tensionada para evitar sanciones.",
          ca: "Aplicació exacta de l'Índex de Referència de Preus de Lloguer de Catalunya en zona tensionada per evitar sancions.",
          en: "Strict compliance with Catalonia's rent reference index in designated stressed housing zones."
        }
      },
      {
        icon: BadgeCheck,
        title: {
          es: "Cédulas y Certificados CEE",
          ca: "Cèdules i Certificats CEE",
          en: "Habitability & Energy Certificates"
        },
        desc: {
          es: "Tramitación ágil de la Cédula de Habitabilidad y Certificado de Eficiencia Energética con arquitecto técnico colaborador.",
          ca: "Tramitació àgil de la Cèdula d'Habitabilitat i Certificat d'Eficiència Energètica amb arquitecte tècnic col·laborador.",
          en: "Fast issuance of Habitability Certificates and Energy Performance Certificates with licensed surveyors."
        }
      },
      {
        icon: Scale,
        title: {
          es: "Arras y Notaría Blindadas",
          ca: "Arres i Notaria Blindades",
          en: "Protected Deposit & Notary Support"
        },
        desc: {
          es: "Redacción de contratos de arras según el Art. 621-8 del Código Civil Catalán y acompañamiento presencial hasta la firma notarial.",
          ca: "Redacció de contractes d'arres segons l'Art. 621-8 del Codi Civil Català i acompanyament presencial fins a la signatura notarial.",
          en: "Deposit contracts drafted under Art. 621-8 of the Catalan Civil Code, plus full notary deed attendance."
        }
      }
    ],
    values: [
      {
        metric: "AICAT 5583",
        icon: BadgeCheck,
        title: {
          es: "Garantía Registrada",
          ca: "Garantia Registrada",
          en: "Registered Guarantee"
        },
        desc: {
          es: "Agentes acreditados en el Registro Oficial de la Generalitat de Catalunya con seguro de caución y responsabilidad civil.",
          ca: "Agents acreditats al Registre Oficial de la Generalitat de Catalunya amb assegurança de caució i responsabilitat civil.",
          en: "Accredited agents registered with the Generalitat de Catalunya with bonding and professional liability insurance."
        }
      },
      {
        metric: "30-45 días",
        icon: Clock,
        title: {
          es: "Plazo Medio de Venta",
          ca: "Termini Mitjà de Venda",
          en: "Average Sale Time"
        },
        desc: {
          es: "Compradores cualificados e inversores locales activos que agilizan el cierre al valor óptimo de mercado.",
          ca: "Compradors qualificats i inversors locals actius que agilitzen el tancament al valor òptim de mercat.",
          en: "Qualified buyers and active local investors accelerating completion at optimal market price."
        }
      },
      {
        metric: "100% Cobro",
        icon: ShieldCheck,
        title: {
          es: "Garantía de Alquiler",
          ca: "Garantia de Lloguer",
          en: "Rent Guarantee"
        },
        desc: {
          es: "Pólizas integrales de impago que cubren defensa jurídica, desahucio y cobro de rentas desde el primer impago.",
          ca: "Pòlisses integrals d'impagament que cobreixen defensa jurídica, desnonament i cobrament de rendes des del primer impagament.",
          en: "Comprehensive default policies covering legal defense, eviction costs, and rent payment from month one."
        }
      },
      {
        metric: "0€ Coste",
        icon: Calculator,
        title: {
          es: "Valoración Inicial",
          ca: "Valoració Inicial",
          en: "Initial Valuation"
        },
        desc: {
          es: "Estudio comparativo de mercado presencial y sin compromiso para conocer el valor real de tu piso en Santa Coloma.",
          ca: "Estudi comparatiu de mercat presencial i sense compromís per conèixer el valor real del teu pis a Santa Coloma.",
          en: "In-person comparative market study with zero commitment to discover your property's real value."
        }
      }
    ],
    steps: {
      es: [
        {
          number: "01",
          title: "Valoración inmobiliaria por m² y plan de venta",
          desc: "Inspeccionamos la vivienda y contrastamos las transacciones reales en el barrio para definir el precio óptimo y maximizar tu rentabilidad."
        },
        {
          number: "02",
          title: "Comercialización, filtro y selección de candidatos",
          desc: "Difusión publicitaria premium, filtrado riguroso de compradores solventes o verificación de solvencia en arrendatarios."
        },
        {
          number: "03",
          title: "Firma de arras, documentación y Notaría",
          desc: "Redactamos contratos jurídicamente blindados, gestionamos CEE y cédula, y te asistimos presencialmente hasta el otorgamiento de la escritura pública."
        }
      ],
      ca: [
        {
          number: "01",
          title: "Valoració immobiliària per m² i pla de venda",
          desc: "Inspeccionem l'habitatge i contrastem les transaccions reals al barri per definir el preu òptim i maximitzar la teva rendibilitat."
        },
        {
          number: "02",
          title: "Comercialització, filtre i selecció de candidats",
          desc: "Difusió publicitària premium, filtratge rigorós de compradors solvents o verificació de solvència en arrendataris."
        },
        {
          number: "03",
          title: "Signatura d'arres, documentació i Notaria",
          desc: "Redactem contractes jurídicament blindats, gestionem CEE i cèdula, i t'assistim presencialment fins a l'escriptura pública."
        }
      ],
      en: [
        {
          number: "01",
          title: "Property valuation per m² & sales plan",
          desc: "We inspect the apartment and compare recent local registry data to determine the optimal price and yield."
        },
        {
          number: "02",
          title: "Marketing, screening & candidate selection",
          desc: "High-exposure promotional campaign, rigorous buyer solvency screening or strict tenant credit verification."
        },
        {
          number: "03",
          title: "Deposit agreement, paperwork & Notary deed",
          desc: "We draft robust contracts, procure EPC and habitability certificates, and accompany you through deed signing."
        }
      ]
    },
    faqs: {
      es: [
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
      ],
      ca: [
        {
          q: "Quant de temps es triga a vendre un pis a Santa Coloma de Gramenet amb Gesgrama?",
          a: "Amb una valoració ajustada a les transaccions notarials recents, el temps mitjà de venda a Gesgrama oscil·la entre 30 i 60 dies, gràcies a la nostra xarxa directa de compradors i inversors locals."
        },
        {
          q: "Quina documentació obligatòria necessito per vendre o llogar a Santa Coloma?",
          a: "S'exigeix títol de propietat (escriptura), DNI dels titulars, darrer rebut d'IBI, certificat d'eficiència energètica (CEE), cèdula d'habitabilitat vigent i el certificat de la comunitat conforme s'està al corrent de pagament."
        },
        {
          q: "Com funciona l'assegurança d'impagament de lloguer a Santa Coloma?",
          a: "Realitzem un scoring previ de solvència del candidat. Un cop aprovat, l'asseguradora garanteix l'abonament continuat de les rendes mensuals impagades, assumeix els costos judicials de desnonament i cobreix danys per vandalisme."
        },
        {
          q: "Com afecta la declaració de Santa Coloma com a zona de mercat residencial tensionat?",
          a: "Apliquem l'Índex de Referència de Preus de Lloguer de Catalunya i la legislació vigent per determinar el límit de renda aplicable segons contractes previs i tipologia de l'arrendador."
        }
      ],
      en: [
        {
          q: "How long does it take to sell an apartment in Santa Coloma de Gramenet with Gesgrama?",
          a: "With an accurate price based on recent notarial sales, average sales time with Gesgrama ranges from 30 to 60 days, driven by our local buyer and investor base."
        },
        {
          q: "What mandatory documentation is required to sell or let in Santa Coloma?",
          a: "Title deed, owner IDs, latest property tax (IBI) receipt, energy efficiency certificate (EPC), valid certificate of habitability, and community fee clearance certificate."
        },
        {
          q: "How does tenant default insurance work in Santa Coloma?",
          a: "We perform an in-depth credit check. Once approved, the policy covers missed monthly payments, legal eviction proceedings, and vandalism damages."
        },
        {
          q: "How does the stressed housing market designation affect rentals in Santa Coloma?",
          a: "We apply the official Catalan Rent Reference Index to calculate rent caps according to prior agreements and landlord classification."
        }
      ]
    }
  },
  "asesoria-juridica-fiscal": {
    id: "juridico",
    slug: "asesoria-juridica-fiscal",
    icon: Scale,
    providerSchemaType: "LegalService",
    titleKey: {
      es: "Asesoría Jurídica y Fiscal",
      ca: "Assessoria Jurídica i Fiscal",
      en: "Legal & Tax Advisory"
    },
    taglineKey: {
      es: "Derecho inmobiliario, sucesiones, herencias y plusvalía en Santa Coloma",
      ca: "Dret immobiliari, successions, herències i plusvàlua a Santa Coloma",
      en: "Real estate law, inheritance, probate and capital gains in Santa Coloma"
    },
    metaTitle: {
      es: "Abogados Inmobiliarios y Asesoría Fiscal en Santa Coloma | Gesgrama",
      ca: "Advocats Immobiliaris i Assessoria Fiscal a Santa Coloma | Gesgrama",
      en: "Real Estate Lawyers & Tax Advisory in Santa Coloma | Gesgrama"
    },
    metaDesc: {
      es: "Asesoría jurídica y fiscal en Santa Coloma de Gramenet. Tramitación de herencias y sucesiones, cálculo mínimo de Plusvalía Municipal (IIVTNU) y desahucios.",
      ca: "Assessoria jurídica i fiscal a Santa Coloma de Gramenet. Tramitació d'herències i successions, càlcul mínim de Plusvàlua Municipal (IIVTNU) i desnonaments.",
      en: "Real estate legal and tax advice in Santa Coloma de Gramenet. Inheritance settlements, municipal capital gains optimization and evictions."
    },
    intro: {
      es: "Prestamos asesoramiento jurídico y tributario especializado en derecho inmobiliario, patrimonial y sucesorio en Santa Coloma de Gramenet. Resolvemos particiones de herencias complejas, optimizamos impuestos municipales y autonómicos, y blindamos contratos ante cualquier eventualidad legal.",
      ca: "Prestem assessorament jurídic i tributari especialitzat en dret immobiliari, patrimonial i successori a Santa Coloma de Gramenet. Resolem particions d'herències complexes, optimitzem impostos municipals i autonòmics, i blindem contractes davant qualsevol eventualitat legal.",
      en: "Specialized legal and tax advice in real estate, probate, and property law in Santa Coloma de Gramenet. We handle complex inheritance divisions, optimize local taxes, and safeguard your legal agreements."
    },
    image: "/images/art7_plusvalia_fiscal.webp",
    imageAlt: {
      es: "Profesionales revisando documentación jurídica y fiscal inmobiliaria en Santa Coloma",
      ca: "Professionals revisant documentació jurídica i fiscal immobiliària a Santa Coloma",
      en: "Professionals reviewing legal and real estate tax documentation in Santa Coloma"
    },
    asuntoOption: "Asesoría Jurídica",
    barrioTitleContext: {
      es: "Asesoramiento jurídico e inmobiliario en todos los barrios de Santa Coloma",
      ca: "Assessorament jurídic i immobiliari a tots els barris de Santa Coloma",
      en: "Legal and real estate advice across all Santa Coloma neighborhoods"
    },
    features: [
      {
        icon: Scale,
        title: {
          es: "Herencias y Sucesiones",
          ca: "Herències i Successions",
          en: "Inheritance & Probate"
        },
        desc: {
          es: "Tramitación integral de herencias con bienes inmuebles: aceptación, declaración de herederos, legítima catalana y adjudicación notarial.",
          ca: "Tramitació integral d'herències amb béns immobles: acceptació, declaració d'hereus, legítima catalana i adjudicació notarial.",
          en: "Full inheritance processing with real property: acceptance, declaration of heirs, Catalan statutory share and notary deed."
        }
      },
      {
        icon: DollarSign,
        title: {
          es: "Impuesto de Sucesiones (ATC)",
          ca: "Impost de Successions (ATC)",
          en: "Inheritance Tax (ATC)"
        },
        desc: {
          es: "Liquidación ante la Agència Tributària de Catalunya aplicando todas las reducciones legales por parentesco y transmisión de vivienda habitual.",
          ca: "Liquidació davant l'Agència Tributària de Catalunya aplicant totes les reduccions legals per parentiu i transmissió d'habitatge habitual.",
          en: "Settlement with the Catalan Tax Agency applying all legal deductions for family ties and primary residence transfers."
        }
      },
      {
        icon: Calculator,
        title: {
          es: "Mínima Plusvalía (IIVTNU)",
          ca: "Mínima Plusvàlua (IIVTNU)",
          en: "Minimum Municipal Plusvalia"
        },
        desc: {
          es: "Cálculo comparativo entre método objetivo y plusvalía real en el Ayuntamiento de Santa Coloma para abonar la menor cuota legal.",
          ca: "Càlcul comparatiu entre mètode objectiu i plusvàlua real a l'Ajuntament de Santa Coloma per abonar la menor quota legal.",
          en: "Comparative calculation between objective method and actual capital gains with Santa Coloma City Council to minimize liability."
        }
      },
      {
        icon: AlertTriangle,
        title: {
          es: "Reclamación de Pérdidas",
          ca: "Reclamació de Pèrdues",
          en: "Loss Relief Claims"
        },
        desc: {
          es: "Tramitación de exención o no sujeción si el valor del suelo decreció entre la adquisición y la venta o adjudicación hereditaria.",
          ca: "Tramitació d'exempció o no subjecció si el valor del sòl va decréixer entre l'adquisició i la venda o adjudicació hereditària.",
          en: "Processing full tax exemptions if land value decreased between acquisition and transfer."
        }
      },
      {
        icon: ShieldCheck,
        title: {
          es: "Litigios y Desahucios",
          ca: "Litigis i Desnonaments",
          en: "Litigation & Evictions"
        },
        desc: {
          es: "Interposición de demandas de desahucio por falta de pago o expiración de plazo y resolución de extinciones de condominio entre coherederos.",
          ca: "Interposició de demandes de desnonament per falta de pagament o expiració de termini i resolució d'extincions de condomini entre cohereus.",
          en: "Filing eviction lawsuits for non-payment or lease expiration, and resolving condominium dissolution among co-heirs."
        }
      },
      {
        icon: FileText,
        title: {
          es: "Asesoría en IRPF Inmobiliario",
          ca: "Assessoria en IRPF Immobiliari",
          en: "Property Income Tax Advisory"
        },
        desc: {
          es: "Optimización de la ganancia patrimonial en renta por transmisión de fincas con estudio de exención por reinversión en mayores de 65 años.",
          ca: "Optimització del guany patrimonial en renda per transmissió de finques amb estudi d'exempció per reinversió en majors de 65 anys.",
          en: "Optimization of capital gains on property sales with exemption analysis for seniors over 65 reinvesting in primary homes."
        }
      }
    ],
    values: [
      {
        metric: "Especialistas",
        icon: Scale,
        title: {
          es: "Especialización Civil",
          ca: "Especialització Civil",
          en: "Civil Law Expertise"
        },
        desc: {
          es: "Asesores y juristas con dominio absoluto de la normativa civil catalana y ordenanzas fiscales de Santa Coloma de Gramenet.",
          ca: "Assessors i juristes amb domini absolut de la normativa civil catalana i ordenances fiscals de Santa Coloma de Gramenet.",
          en: "Lawyers and advisors with complete mastery of Catalan civil regulations and Santa Coloma tax ordinances."
        }
      },
      {
        metric: "0 Sorpresas",
        icon: Award,
        title: {
          es: "Presupuesto Cerrado",
          ca: "Pressupost Tancat",
          en: "Fixed Fee Quote"
        },
        desc: {
          es: "Propuesta económica por escrito desde la primera sesión de asesoramiento, con honorarios claros y sin gastos imprevistos.",
          ca: "Proposta econòmica per escrit des de la primera sessió d'assessorament, amb honoraris clars i sense despeses imprevistes.",
          en: "Written financial quote from session one with transparent fees and no unexpected costs."
        }
      },
      {
        metric: "Máximo",
        icon: DollarSign,
        title: {
          es: "Ahorro Fiscal Legal",
          ca: "Estalvi Fiscal Legal",
          en: "Maximum Legal Tax Relief"
        },
        desc: {
          es: "Elegimos siempre la alternativa tributaria más beneficiosa para reducir la factura impositiva de sucesiones y plusvalías.",
          ca: "Triem sempre l'alternativa tributària més beneficiosa per reduir la factura impositiva de successions i plusvàlues.",
          en: "We choose the most advantageous tax calculation method to reduce your inheritance and capital gains bill."
        }
      },
      {
        metric: "Presencial",
        icon: MapPin,
        title: {
          es: "Estudio Documental",
          ca: "Estudi Documental",
          en: "In-Person Document Review"
        },
        desc: {
          es: "Revisamos escrituras, notas registrales y recibos en persona en nuestra sede local para asegurar la máxima tranquilidad jurídica.",
          ca: "Revisem escriptures, notes registrals i rebuts en persona a la nostra seu local per assegurar la màxima tranquil·litat jurídica.",
          en: "We review deeds, registry notes, and tax receipts in person at our local office for complete legal peace of mind."
        }
      }
    ],
    steps: {
      es: [
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
      ca: [
        {
          number: "01",
          title: "Diagnòstic legal i fiscal de l'expedient",
          desc: "Estudiem testaments, títols de propietat, notes simples registrals i certificats de defunció per definir el full de ruta jurídic més eficient."
        },
        {
          number: "02",
          title: "Quadern particional i redacció documental",
          desc: "Redactem la partició d'herència, contractes d'arres blindats o demandes judicials garantint el compliment de terminis per a bonificacions tributàries."
        },
        {
          number: "03",
          title: "Gestió notarial, liquidació i Registre",
          desc: "T'acompanyem a la Notaria, liquidem els tributs (ATC i IIVTNU municipal) i formalitzem la inscripció al Registre de la Propietat."
        }
      ],
      en: [
        {
          number: "01",
          title: "Legal and tax file assessment",
          desc: "We examine wills, property titles, land registry notes and certificates to map out the most efficient legal path."
        },
        {
          number: "02",
          title: "Partition deed and legal drafting",
          desc: "We draft inheritance distribution agreements, robust deposit contracts, or court claims meeting tax rebate deadlines."
        },
        {
          number: "03",
          title: "Notary execution, tax filing & land registry",
          desc: "We attend the notary signing, process taxes with regional and local authorities, and register titles."
        }
      ]
    },
    faqs: {
      es: [
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
      ],
      ca: [
        {
          q: "Com es calcula la Plusvàlua Municipal (IIVTNU) a l'Ajuntament de Santa Coloma?",
          a: "Calculem obligatòriament les dues fórmules legals: el mètode objectiu (coeficient sobre el valor cadastral del sòl) i el mètode real (guany patrimonial efectiu entre compra i venda/herència). Triem la via de menor cost impositiu. Si vens amb pèrdues, tramitem l'exempció total."
        },
        {
          q: "Quin termini hi ha per tramitar una herència amb un pis a Santa Coloma de Gramenet?",
          a: "El termini legal per liquidar l'Impost de Successions i la Plusvàlua municipal és de 6 mesos des de la defunció. Si se sol·licita dins dels 5 primers mesos, podem tramitar una pròrroga de 6 mesos addicionals."
        },
        {
          q: "Què puc fer si un dels hereus es nega a vendre o llogar el pis?",
          a: "Assessorem en procediments d'extinció de condomini o divisió de cosa comuna. Busquem primer la mediació amistosa per a la compra de parts o subhasta voluntària abans de judicialitzar el conflicte."
        },
        {
          q: "Quant triga un procediment de desnonament per impagament de lloguer?",
          a: "Depèn de la càrrega dels Jutjats de Santa Coloma de Gramenet, però habitualment oscil·la entre 4 i 8 mesos. Interposem la demanda amb sol·licitud immediata de data de llançament per reduir al mínim el perjudici econòmic."
        }
      ],
      en: [
        {
          q: "How is Municipal Capital Gains Tax (IIVTNU) calculated in Santa Coloma?",
          a: "We calculate both statutory methods: objective coefficient and actual market gain. We choose whichever delivers the lowest tax liability, or full exemption if sold at a loss."
        },
        {
          q: "What is the legal deadline for settling an inheritance with a home in Santa Coloma?",
          a: "The statutory deadline to settle Inheritance Tax and local capital gains is 6 months from the date of death. A 6-month extension can be requested within the first 5 months."
        },
        {
          q: "What can be done if one heir refuses to sell or rent the inherited property?",
          a: "We advise on condominium dissolution and partition actions, seeking amicable mediation or buyouts before resorting to court proceedings."
        },
        {
          q: "How long does a tenant eviction for unpaid rent take?",
          a: "Depending on court workload in Santa Coloma, it generally takes between 4 and 8 months. We file with immediate request for eviction dates to minimize rental loss."
        }
      ]
    }
  },
  "obras-mantenimiento": {
    id: "obras",
    slug: "obras-mantenimiento",
    icon: Wrench,
    providerSchemaType: "GeneralContractor",
    titleKey: {
      es: "Obras y Mantenimiento",
      ca: "Obres i Manteniment",
      en: "Works & Maintenance"
    },
    taglineKey: {
      es: "Rehabilitación de edificios, fachadas, ascensores a cota cero e ITE en Santa Coloma",
      ca: "Rehabilitació d'edificis, façanes, ascensors a cota zero i ITE a Santa Coloma",
      en: "Building rehabilitation, facades, zero-level lifts and mandatory ITE inspections"
    },
    metaTitle: {
      es: "Rehabilitación de Edificios, Obras e ITE en Santa Coloma | Gesgrama",
      ca: "Rehabilitació d'Edificis, Obres i ITE a Santa Coloma | Gesgrama",
      en: "Building Renovation, Works & ITE in Santa Coloma | Gesgrama"
    },
    metaDesc: {
      es: "Especialistas en ITE obligatoria en Santa Coloma de Gramenet, rehabilitación de fachadas, cubiertas e instalación de ascensores a cota cero con subvenciones.",
      ca: "Especialistes en ITE obligatòria a Santa Coloma de Gramenet, rehabilitació de façanes, cobertes i instal·lació d'ascensors a cota zero amb subvencions.",
      en: "Specialists in mandatory ITE inspection in Santa Coloma de Gramenet, facade repairs, roof insulation and zero-level elevator installations."
    },
    intro: {
      es: "Ofrecemos dirección y supervisión técnica integral para la conservación, rehabilitación y eficiencia de edificios residenciales plurifamiliares en Santa Coloma de Gramenet. Especialistas en superar la ITE, rehabilitar fachadas y patios, e instalar ascensores a cota cero gestionando ayudas públicas.",
      ca: "Oferim direcció i supervisió tècnica integral per a la conservació, rehabilitació i eficiència d'edificis residencials plurifamiliars a Santa Coloma de Gramenet. Especialistes a superar la ITE, rehabilitar façanes i patis, i instal·lar ascensors a cota zero gestionant ajuts públics.",
      en: "Comprehensive technical management for the preservation, renovation, and energy efficiency of multi-family buildings in Santa Coloma. Specialists in passing ITE inspections, facade repairs, and zero-level elevator installations."
    },
    image: "/images/art6_ite_rehabilitacion.webp",
    imageAlt: {
      es: "Rehabilitación técnica de fachada e inspección de edificio residencial en Santa Coloma",
      ca: "Rehabilitació tècnica de façana i inspecció d'edifici residencial a Santa Coloma",
      en: "Technical facade renovation and residential building inspection in Santa Coloma"
    },
    asuntoOption: "Obras y Reformas",
    barrioTitleContext: {
      es: "Rehabilitación de edificios, obras e ITE en los 14 barrios de Santa Coloma",
      ca: "Rehabilitació d'edificis, obres i ITE als 14 barris de Santa Coloma",
      en: "Building repairs, renovations and ITE across Santa Coloma's 14 neighborhoods"
    },
    features: [
      {
        icon: BadgeCheck,
        title: {
          es: "Dictamen ITE Obligatoria",
          ca: "Dictamen ITE Obligatòria",
          en: "Mandatory ITE Inspection"
        },
        desc: {
          es: "Inspección técnica para edificios de más de 45 años, emisión de dictamen y obtención del Certificado de Aptitud ante la Generalitat.",
          ca: "Inspecció tècnica per a edificis de més de 45 anys, emissió de dictamen i obtenció del Certificat d'Aptitud davant la Generalitat.",
          en: "Technical inspection for buildings over 45 years, issuing official reports and securing Generalitat fitness certificates."
        }
      },
      {
        icon: Building2,
        title: {
          es: "Fachadas y Patios de Luces",
          ca: "Façanes i Patis de Llums",
          en: "Facades & Courtyards"
        },
        desc: {
          es: "Saneamiento de revocos, reparación de cornisas, balcones de hormigón y aplicación de revestimientos técnicos protectores.",
          ca: "Sanejament d'arrebossats, reparació de cornises, balcons de formigó i aplicació de revestiments tècnics protectors.",
          en: "Plaster repair, cornice restoration, concrete balcony maintenance and protective thermal coatings."
        }
      },
      {
        icon: ArrowRight,
        title: {
          es: "Ascensor a Cota Cero",
          ca: "Ascensor a Cota Zero",
          en: "Zero-Level Elevator"
        },
        desc: {
          es: "Eliminación de barreras arquitectónicas en portales e instalación de elevadores interiores o exteriores en comunidades sin ascensor.",
          ca: "Eliminació de barreres arquitectòniques en portals i instal·lació d'elevadors interiors o exteriors en comunitats sense ascensor.",
          en: "Removal of entrance steps and installation of interior or exterior elevators in buildings without ground-floor access."
        }
      },
      {
        icon: Wrench,
        title: {
          es: "Cubiertas y Bajantes",
          ca: "Cobertes i Baixants",
          en: "Roofs & Drainpipes"
        },
        desc: {
          es: "Impermeabilización garantizada de terrados comunitarios, tejados y sustitución completa de bajantes de fecales y pluviales.",
          ca: "Impermeabilització garantida de terrats comunitaris, teulades i substitució completa de baixants de fecals i pluvials.",
          en: "Guaranteed waterproofing of communal flat roofs, roof tiles, and replacement of wastewater and rainwater pipes."
        }
      },
      {
        icon: DollarSign,
        title: {
          es: "Subvenciones NextGen",
          ca: "Subvencions NextGen",
          en: "NextGen Grants"
        },
        desc: {
          es: "Tramitación y justificación completa de fondos europeos y ayudas metropolitanas para rehabilitación con hasta un 80% de subvención.",
          ca: "Tramitació i justificació completa de fons europeus i ajuts metropolitans per a rehabilitació amb fins a un 80% de subvenció.",
          en: "Full application and justification of European NextGen funds and metropolitan grants covering up to 80% of renovation costs."
        }
      },
      {
        icon: Award,
        title: {
          es: "Licitación y Precio Cerrado",
          ca: "Licitació i Preu Tancat",
          en: "Tendering & Fixed Price"
        },
        desc: {
          es: "Concurso ciego entre constructoras de confianza, dirección facultativa y cláusulas de penalización por retrasos sin derramas sorpresa.",
          ca: "Concurs cec entre constructores de confiança, direcció facultativa i clàusules de penalització per retards sense derrames sorpresa.",
          en: "Competitive contractor bidding, licensed project direction, and delay penalties with zero surprise assessments."
        }
      }
    ],
    values: [
      {
        metric: "Hasta 80%",
        icon: DollarSign,
        title: {
          es: "Subvenciones Públicas",
          ca: "Subvencions Públiques",
          en: "Public Subsidies"
        },
        desc: {
          es: "Gestión integral de Fondos Europeos Next Generation y ayudas metropolitanas para financiar la rehabilitación de tu finca.",
          ca: "Gestió integral de Fons Europeus Next Generation i ajuts metropolitans per finançar la rehabilitació de la teva finca.",
          en: "Comprehensive management of European NextGen funds and metropolitan grants to finance building upgrades."
        }
      },
      {
        metric: "Sin Sorpresas",
        icon: Award,
        title: {
          es: "Precio y Plazo Cerrado",
          ca: "Preu i Termini Tancat",
          en: "Fixed Price & Schedule"
        },
        desc: {
          es: "Contratos de ejecución estrictos con penalizaciones por día de retraso y mediciones auditadas por arquitecto técnico.",
          ca: "Contractes d'execució estrictes amb penalitzacions per dia de retard i mesuraments auditats per arquitecte tècnic.",
          en: "Strict work contracts with daily delay penalties and quantities audited by licensed technical surveyors."
        }
      },
      {
        metric: "Garantía",
        icon: ShieldCheck,
        title: {
          es: "Cobertura Oficial",
          ca: "Cobertura Oficial",
          en: "Official Warranty"
        },
        desc: {
          es: "Rehabilitaciones con cobertura técnica y entrega de Libro del Edificio conforme a las normativas de la Generalitat.",
          ca: "Rehabilitacions amb cobertura tècnica i lliurament de Llibre de l'Edifici conforme a les normatives de la Generalitat.",
          en: "Renovations with technical warranty and delivery of the official Building Book under Generalitat standards."
        }
      },
      {
        metric: "Técnicos",
        icon: Wrench,
        title: {
          es: "Equipo Homologado",
          ca: "Equip Homologat",
          en: "Certified Surveyors"
        },
        desc: {
          es: "Arquitectos técnicos colegiados con amplia experiencia en las particularidades estructurales de Santa Coloma de Gramenet.",
          ca: "Arquitectes tècnics col·legiats amb àmplia experiència en les particularitats estructurals de Santa Coloma de Gramenet.",
          en: "Chartered building engineers with extensive expertise in Santa Coloma's local residential structures."
        }
      }
    ],
    steps: {
      es: [
        {
          number: "01",
          title: "Inspección técnica in situ y dictamen ITE",
          desc: "Un arquitecto técnico visita la finca, analiza la estructura, fachadas, saneamiento y accesibilidad, emitiendo el informe de deficiencias y prioridades."
        },
        {
          number: "02",
          title: "Licitación comparativa y solicitud de ayudas",
          desc: "Elaboramos el pliego de condiciones, comparamos presupuestos de constructoras homologadas y solicitamos las subvenciones disponibles en el Ayuntamiento y la Generalitat."
        },
        {
          number: "03",
          title: "Dirección de obra y Certificado de Aptitud",
          desc: "Supervisamos la ejecución, controlamos las certificaciones y tramitamos el Certificado de Aptitud oficial de la Generalitat."
        }
      ],
      ca: [
        {
          number: "01",
          title: "Inspecció tècnica in situ i dictamen ITE",
          desc: "Un arquitecte tècnic visita la finca, analitza l'estructura, façanes, sanejament i accessibilitat, emetent l'informe de deficiències i prioritats."
        },
        {
          number: "02",
          title: "Licitació comparativa i sol·licitud d'ajuts",
          desc: "Elaborem el plec de condicions, comparem pressupostos de constructores homologades i sol·licitem les subvencions disponibles a l'Ajuntament i la Generalitat."
        },
        {
          number: "03",
          title: "Direcció d'obra i Certificat d'Aptitud",
          desc: "Supervisem l'execució, controlem les certificacions i tramitem el Certificat d'Aptitud oficial de la Generalitat."
        }
      ],
      en: [
        {
          number: "01",
          title: "On-site survey & ITE report",
          desc: "A chartered surveyor inspects structure, facades, plumbing and accessibility, drafting a prioritised deficiency report."
        },
        {
          number: "02",
          title: "Competitive bidding & subsidy application",
          desc: "We prepare specifications, compare quotes from vetted contractors, and submit public subsidy applications."
        },
        {
          number: "03",
          title: "Work direction & Certificate of Fitness",
          desc: "We oversee execution, verify phase sign-offs, and obtain the official Fitness Certificate from the Generalitat."
        }
      ]
    },
    faqs: {
      es: [
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
      ],
      ca: [
        {
          q: "Quan és obligatori passar la ITE a Santa Coloma de Gramenet?",
          a: "La Inspecció Tècnica de l'Edifici és obligatòria per llei per a tots els edificis plurifamiliars amb més de 45 anys d'antiguitat. No realitzar-la comporta sancions administratives i impedeix contractar assegurances o vendre habitatges."
        },
        {
          q: "Com s'aprova en junta la instal·lació o baixada d'ascensor a cota zero?",
          a: "Segons la normativa catalana d'accessibilitat, si l'obra és sol·licitada per un propietari major de 70 anys o amb discapacitat, la comunitat està obligada a executar-la sempre que el cost anual no excedeixi de 12 quotes ordinàries."
        },
        {
          q: "Quins ajuts públics es poden sol·licitar per a rehabilitació a Santa Coloma?",
          a: "Gestionem els Fons Europeus Next Generation (que subvencionen del 40% al 80% segons l'estalvi energètic assolit) i els programes de rehabilitació del Consorci Metropolità de l'Habitatge."
        },
        {
          q: "Qui redacta els projectes tècnics i llicències a l'Ajuntament?",
          a: "El nostre equip tècnic d'arquitectes s'encarrega íntegrament del projecte executiu, la sol·licitud de llicència d'obres municipal i el Llibre de l'Edifici."
        }
      ],
      en: [
        {
          q: "When is the ITE building inspection mandatory in Santa Coloma?",
          a: "Building Technical Inspection is mandatory by law for all multi-family buildings over 45 years old. Failure to comply can lead to fines and blocks property transfers."
        },
        {
          q: "How is zero-level lift installation approved by the community?",
          a: "Under accessibility laws, if requested by an owner over 70 or with recognized disability, works are mandatory provided annual costs stay within 12 standard quotas."
        },
        {
          q: "What public subsidies are available for renovation in Santa Coloma?",
          a: "We manage European NextGen funds (covering 40% to 80% based on energy savings) and metropolitan housing rehabilitation programs."
        },
        {
          q: "Who prepares the technical projects and municipal building permits?",
          a: "Our architectural engineering team handles full executive designs, municipal license applications, and the Building Book."
        }
      ]
    }
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

  const langKey = language === "ca" ? "ca" : language === "en" ? "en" : "es";
  const title = service.titleKey[langKey];
  const tagline = service.taglineKey[langKey];
  const intro = service.intro[langKey];
  const imageAlt = service.imageAlt[langKey];
  const barrioTitle = service.barrioTitleContext[langKey];
  const stepsList = service.steps[langKey] || service.steps.es;
  const faqsList = service.faqs[langKey] || service.faqs.es;

  const returnLabel = language === "ca" ? "Tornar a Serveis" : language === "en" ? "Back to Services" : "Volver a Servicios";
  const breadcrumbHome = language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio";
  const breadcrumbServices = language === "ca" ? "Serveis" : language === "en" ? "Services" : "Servicios";
  const badgeSpecialized = language === "ca" ? "Servei Especialitzat" : language === "en" ? "Specialized Service" : "Servicio Especializado";
  const ctaPrimary = language === "ca" ? "Sol·licitar pressupost gratuït" : language === "en" ? "Request free quote" : "Solicitar presupuesto gratuito";
  const ctaWhatsapp = language === "ca" ? "Consultar per WhatsApp" : language === "en" ? "WhatsApp Inquiry" : "Consultar por WhatsApp";
  
  const includesTag = language === "ca" ? "Abast del Servei" : language === "en" ? "Service Scope" : "Alcance del Servicio";
  const includesTitle = language === "ca" ? `Què inclou el nostre servei de ${title}?` : language === "en" ? `What is included in our ${title} service?` : `¿Qué incluye nuestro servicio de ${title}?`;
  const includesSubtitle = language === "ca" ? "Desglossament detallat d'actuacions jurídiques, tècniques i administratives incloses a la nostra tarifa sense sobrecostos." : language === "en" ? "Detailed breakdown of legal, technical and administrative actions included without hidden fees." : "Desglose detallado de actuaciones jurídicas, técnicas y administrativas incluidas en nuestra tarifa sin sobrecostes.";

  const officeTag = language === "ca" ? "Atenció a Despatx" : language === "en" ? "In-Office Assistance" : "Atención en Despacho";
  const officeTitle = language === "ca" ? "Atenció tècnica presencial al nostre despatx de Santa Coloma" : language === "en" ? "In-person technical attention at our Santa Coloma office" : "Atención técnica presencial en nuestro despacho de Santa Coloma";
  const officeDesc = language === "ca" ? "Visita'ns a Av. dels Banús, 49 o concerta una reunió amb els nostres administradors i advocats col·legiats." : language === "en" ? "Visit us at Av. dels Banús, 49 or schedule an appointment with our chartered managers and lawyers." : "Visítanos en Av. dels Banús, 49 o concierta una reunión con nuestros administradores y abogados colegiados.";
  const officeBtn = language === "ca" ? "Sol·licitar consulta personalitzada" : language === "en" ? "Request in-person appointment" : "Solicitar consulta personalizada";

  const whyTag = language === "ca" ? "Avantatges Gesgrama" : language === "en" ? "Gesgrama Advantages" : "Ventajas Gesgrama";
  const whyTitle = language === "ca" ? "Per què triar Gesgrama a Santa Coloma?" : language === "en" ? "Why choose Gesgrama in Santa Coloma?" : "¿Por qué elegir a Gesgrama en Santa Coloma?";
  const whySubtitle = language === "ca" ? "Solvència tècnica col·legiada, transparència comptable garantida i proximitat física a cada gestió." : language === "en" ? "Chartered professional solvency, guaranteed accounting transparency and local proximity." : "Solvencia técnica colegiada, transparencia contable garantizada y cercanía física en cada gestión.";

  const processTag = language === "ca" ? "Metodologia" : language === "en" ? "Methodology" : "Metodología";
  const processTitle = language === "ca" ? "Com treballem pas a pas" : language === "en" ? "How we work step by step" : "Cómo trabajamos paso a paso";
  const processSubtitle = language === "ca" ? "Un procés rigorós, traçable i adaptat a la legislació de Catalunya i normatives de Santa Coloma de Gramenet." : language === "en" ? "A rigorous, traceable process tailored to Catalan law and Santa Coloma ordinances." : "Un proceso riguroso, trazable y adaptado a la legislación de Cataluña y normativas de Santa Coloma de Gramenet.";

  const faqTag = language === "ca" ? "Resolem els teus Dubtes" : language === "en" ? "Frequently Asked Questions" : "Resolvemos tus Dudas";
  const faqTitle = language === "ca" ? `Preguntes freqüents sobre ${title}` : language === "en" ? `Frequently Asked Questions about ${title}` : `Preguntas frecuentes sobre ${title}`;
  const faqSubtitle = language === "ca" ? "Respostes directes i clares a les consultes més habituals de propietaris i comunitats a Santa Coloma." : language === "en" ? "Clear and direct answers to the most common inquiries from property owners in Santa Coloma." : "Respuestas directas y claras a las consultas más habituales de propietarios y comunidades en Santa Coloma.";

  const relatedTag = language === "ca" ? "Ecosistema Integral Gesgrama" : language === "en" ? "Integrated Ecosystem" : "Ecosistema Integral Gesgrama";
  const relatedTitle = language === "ca" ? "Serveis complementaris a Santa Coloma" : language === "en" ? "Complementary services in Santa Coloma" : "Servicios complementarios en Santa Coloma";
  const relatedSubtitle = language === "ca" ? "Connectem administració de finques, comercialització immobiliària, assessoria jurídica i obres amb un únic interlocutor directe." : language === "en" ? "Connecting property management, sales, legal advisory and renovations with a single dedicated team." : "Conectamos administración de fincas, comercialización inmobiliaria, asesoría jurídica y obras con un único interlocutor directo.";
  const viewServiceBtn = language === "ca" ? "Veure servei complet →" : language === "en" ? "View full service →" : "Ver servicio completo →";

  const valuerTitle = language === "ca" ? "Vols saber el valor exacte d'un pis a Santa Coloma?" : language === "en" ? "Want to know the exact value of an apartment in Santa Coloma?" : "¿Quieres saber el valor exacto de un piso en Santa Coloma?";
  const valuerSubtitle = language === "ca" ? "Calcula en 1 minut la forquilla real de mercat segons barri i tipologia sense registre obligatori." : language === "en" ? "Calculate the real market range in 1 minute based on neighborhood and property type with no signup." : "Calcula en 1 minuto la horquilla real de mercado según barrio y tipología sin registro obligatorio.";
  const valuerBtn = language === "ca" ? "Calcular valoració gratuïta" : language === "en" ? "Calculate free valuation" : "Calcular valoración gratuita";

  const coverageTag = language === "ca" ? "Cobertura 100% Municipal" : language === "en" ? "100% Citywide Coverage" : "Cobertura 100% Municipal";
  const coverageSubtitle = language === "ca" ? "Gesgrama opera de forma presencial i exclusiva a Santa Coloma de Gramenet. Selecciona el teu barri per consultar informació tècnica i comunitària especialitzada:" : language === "en" ? "Gesgrama operates exclusively and in-person across Santa Coloma de Gramenet. Select your district for localized technical information:" : "Gesgrama opera de forma presencial y exclusiva en Santa Coloma de Gramenet. Selecciona tu barrio para consultar información técnica y comunitaria especializada:";
  const headquarterLabel = language === "ca" ? "Seu central:" : language === "en" ? "Headquarters:" : "Sede central:";
  const postcodesLabel = language === "ca" ? "Codis postals coberts: 08921 · 08922 · 08923 · 08924" : language === "en" ? "Postcodes covered: 08921 · 08922 · 08923 · 08924" : "Códigos postales cubiertos: 08921 · 08922 · 08923 · 08924";

  return (
    <div className="bg-[#FAF9FC] text-[#111111] min-h-screen font-sans selection:bg-[#2860F5] selection:text-white overflow-x-clip">
      {/* ── NAVBAR CORPORATIVO OFICIAL ── */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 1: HERO DEL SERVICIO — COMPOSICIÓN EDITORIAL EQUILIBRADA
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-8">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10">
          
          {/* Top Breadcrumb & Return Link con fondos sólidos contrastados */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              hash="servicios"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#2860F5] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] px-4 py-2 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#60A5FA] group-hover:text-white group-hover:-translate-x-1 transition-all" />
              <span>{returnLabel}</span>
            </Link>

            <nav aria-label="Migas de pan">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" itemProp="item" className="hover:text-[#2860F5] transition-colors">
                    <span itemProp="name">{breadcrumbHome}</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="text-slate-400">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link to="/" hash="servicios" itemProp="item" className="text-[#2860F5] hover:underline transition-colors font-bold">
                    <span itemProp="name">{breadcrumbServices}</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <li className="text-slate-400">/</li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span itemProp="name" className="text-[#111111] font-black">{title}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Columna Izquierda: Información */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111]">
                  <IconComp className="w-4 h-4 text-white" />
                  {badgeSpecialized}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111]">
                  <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                  Santa Coloma de Gramenet
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] leading-[1.12] mb-5 tracking-tight [text-wrap:balance]">
                {title}
              </h1>

              <p className="text-[#2860F5] text-lg sm:text-xl font-headline font-bold mb-4 leading-snug [text-wrap:balance]">
                {tagline}
              </p>

              <p className="text-[#111111] text-[18px] sm:text-[19px] leading-relaxed max-w-2xl font-medium mb-8">
                {intro}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
                  className="neo-btn-primary font-headline font-black text-sm sm:text-base py-4 px-7 flex items-center gap-3 cursor-pointer rounded-xl shadow-[4px_4px_0px_#111111]"
                >
                  <span>{ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                </a>
                <a
                  href="https://wa.me/34601259424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn-secondary font-headline font-black text-sm sm:text-base py-4 px-7 flex items-center gap-3 cursor-pointer rounded-xl shadow-[4px_4px_0px_#111111]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#16A34A] shrink-0">
                    <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                  </svg>
                  <span>{ctaWhatsapp}</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Fotografía Contextual Real con Proporción Editorial */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] bg-slate-100">
                <img 
                  src={service.image} 
                  alt={imageAlt} 
                  className="w-full h-[320px] sm:h-[380px] object-cover" 
                  width={600}
                  height={400}
                  loading="eager"
                />
                {/* Píldora de Sede Física en Santa Coloma */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-[#111111] text-white p-3.5 rounded-xl border border-white/20 flex items-center gap-3 shadow-md">
                  <div className="w-9 h-9 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white/30">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#60A5FA] block">
                      {headquarterLabel} Santa Coloma de Gramenet
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                      Av. dels Banús, 49 · Despacho a Pie de Calle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 2: "¿QUÉ INCLUYE?" — ICONOGRAFÍA ESPECÍFICA Y REJILLA 3x2
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10">
          
          {/* Cabecera centrada */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
              <FileText className="w-4 h-4 text-white" />
              {includesTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]">
              {includesTitle}
            </h2>
            <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
              {includesSubtitle}
            </p>
          </div>

          {/* Grid Bento Simétrico de 3x2 Columnas con Iconos Pertinentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
            {service.features.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between group hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111]"
                >
                  <div>
                    {/* Icono temático pertinente con fondo azul corporativo */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0">
                        <FeatIcon className="w-5 h-5 text-white stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-data-mono font-black text-[#2860F5] bg-white border border-[#111111] rounded-md px-2 py-0.5 shadow-sm">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-[20px] font-headline font-black text-[#111111] mb-2.5 leading-snug group-hover:text-[#2860F5] transition-colors">
                      {feat.title[langKey]}
                    </h3>
                    <p className="text-[16px] sm:text-[17px] text-[#111111] font-medium leading-relaxed">
                      {feat.desc[langKey]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner Horizontal de Atención Presencial con FOTOGRAFÍA REAL DE NUESTRA SEDE */}
          <div className="bg-[#2860F5] p-6 sm:p-8 md:p-9 border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
              {/* Fotografía auténtica de la sede central de Gesgrama */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#111111] shadow-[2px_2px_0px_#111111] shrink-0 bg-white">
                <img
                  src="/images/gesgrama_storefront_final.webp"
                  alt="Sede Central de Gesgrama en Av. dels Banús, 49 Santa Coloma"
                  className="w-full h-full object-cover"
                  width={112}
                  height={112}
                  loading="lazy"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 bg-[#111111] text-white text-[11px] font-headline font-bold uppercase tracking-wider px-3 py-1 border border-white/20 rounded-md mb-2">
                  <MapPin className="w-3 h-3 text-[#60A5FA]" />
                  {officeTag}
                </span>
                <h4 className="text-xl sm:text-2xl font-headline font-black text-white leading-snug [text-wrap:balance]">
                  {officeTitle}
                </h4>
                <p className="text-base sm:text-[17px] text-white font-bold mt-1.5 leading-relaxed">
                  {officeDesc}
                </p>
              </div>
            </div>

            <a
              href={`/?asunto=${encodeURIComponent(service.asuntoOption)}#formulario-contacto`}
              className="neo-btn-secondary font-headline font-black text-sm sm:text-base py-4 px-7 shrink-0 flex items-center gap-2.5 cursor-pointer rounded-xl shadow-[3px_3px_0px_#111111]"
            >
              <span>{officeBtn}</span>
              <ArrowRight className="w-5 h-5 text-[#2860F5] stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 3: "¿POR QUÉ ELEGIR A GESGRAMA?" + METODOLOGÍA EDITORIAL
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10">
          
          {/* Bloque A: ¿Por qué elegir a Gesgrama en Santa Coloma? */}
          <div className="mb-14">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
                <Award className="w-4 h-4 text-white" />
                {whyTag}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]">
                {whyTitle}
              </h2>
              <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
                {whySubtitle}
              </p>
            </div>

            {/* 4 Tarjetas de Confianza con métricas de rigor y datos reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.values.map((v, i) => {
                const ValIcon = v.icon;
                return (
                  <div 
                    key={i}
                    className="bg-white text-[#111111] border-2 border-[#111111] rounded-2xl p-6 flex flex-col justify-between transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl sm:text-3xl font-data-mono font-black text-[#2860F5]">
                          {v.metric}
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-[#FAF9FC] border border-[#111111] flex items-center justify-center text-[#111111]">
                          <ValIcon className="w-4 h-4 text-[#2860F5]" />
                        </div>
                      </div>

                      <h3 className="text-lg font-headline font-black text-[#111111] mb-2 leading-snug">
                        {v.title[langKey]}
                      </h3>
                      <p className="text-[16px] sm:text-[17px] text-[#111111] font-medium leading-relaxed">
                        {v.desc[langKey]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="w-full h-px bg-slate-200 my-12" />

          {/* Bloque B: Metodología — Secuencia de pasos equilibrada */}
          <div itemScope itemType="https://schema.org/HowTo">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
                <Clock className="w-4 h-4 text-white" />
                {processTag}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]" itemProp="name">
                {processTitle}
              </h2>
              <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto" itemProp="description">
                {processSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stepsList.map((st, i) => (
                <div 
                  key={i}
                  className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111]"
                  itemScope 
                  itemProp="step" 
                  itemType="https://schema.org/HowToStep"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-[#111111] text-white text-xs font-headline font-black tracking-wider uppercase rounded-md border border-[#111111]">
                        PASO {st.number}
                      </span>
                      <span className="text-xs font-data-mono font-bold text-[#2860F5] uppercase tracking-wider">
                        Fase 0{i + 1}
                      </span>
                    </div>
                    <meta itemProp="position" content={String(i + 1)} />
                    <h3 className="text-lg sm:text-[19px] font-headline font-black text-[#111111] mb-2.5 leading-snug [text-wrap:balance]" itemProp="name">
                      {st.title}
                    </h3>
                    <p className="text-[16px] sm:text-[17px] text-[#111111] font-medium leading-relaxed" itemProp="text">
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
          SECCIÓN 4: PREGUNTAS FRECUENTES (FAQ) — CONTENEDOR AMPLIO Y EQUILIBRADO
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10 w-full box-border">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
              <HelpCircle className="w-4 h-4 text-white" />
              {faqTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]">
              {faqTitle}
            </h2>
            <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
              {faqSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i}
                  className={`border-2 border-[#111111] rounded-2xl transition-all overflow-hidden ${
                    isOpen ? "bg-[#FAF9FC] shadow-[3px_3px_0px_#111111]" : "bg-white shadow-[2px_2px_0px_#111111]"
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
                    <h3 className="text-base sm:text-lg md:text-[19px] font-headline font-black text-[#111111] flex items-center gap-3.5" itemProp="name">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-headline font-black shrink-0 transition-colors border-2 border-[#111111] ${isOpen ? "bg-[#2860F5] text-white" : "bg-[#111111] text-white"}`}>
                        ?
                      </span>
                      <span className="[text-wrap:balance]">{faq.q}</span>
                    </h3>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all border-2 border-[#111111] ${isOpen ? "bg-[#2860F5] text-white rotate-180 shadow-[2px_2px_0px_#111111]" : "bg-white text-[#111111]"}`}>
                      <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div 
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                      className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-200"
                    >
                      <p className="text-base sm:text-[17px] text-[#111111] font-medium leading-relaxed pl-11" itemProp="text">
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
          SECCIÓN 5: SERVICIOS COMPLEMENTARIOS — PERSONALIDAD VISUAL DIFERENCIADA
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
              <Building2 className="w-4 h-4 text-white" />
              {relatedTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]">
              {relatedTitle}
            </h2>
            <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
              {relatedSubtitle}
            </p>
          </div>

          {/* 3 Tarjetas Complementarias con personalidad y enlaces claros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {relatedServices.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <div
                  key={rel.slug}
                  className="bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] p-6 sm:p-7 flex flex-col justify-between transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#111111]"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center mb-5">
                      <RelIcon className="w-6 h-6 text-white stroke-[2.5]" />
                    </div>
                    <h3 className="text-xl font-headline font-black text-[#111111] mb-2.5 leading-snug">
                      {rel.titleKey[langKey]}
                    </h3>
                    <p className="text-[16px] sm:text-[17px] text-[#111111] font-medium leading-relaxed mb-6">
                      {rel.taglineKey[langKey]}
                    </p>
                  </div>
                  
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: rel.slug }}
                    className="w-full neo-btn-primary py-3.5 px-4 font-headline font-black text-sm text-center block transition-all cursor-pointer rounded-xl shadow-[3px_3px_0px_#111111]"
                  >
                    {viewServiceBtn}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Banner Valorador con texto blanco de alto contraste */}
          <div className="bg-[#2860F5] p-6 sm:p-8 md:p-9 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] text-white">
            <div className="flex items-center gap-5 text-left">
              <div className="w-12 h-12 bg-white text-[#111111] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center shrink-0">
                <Calculator className="w-7 h-7 stroke-[2.5] text-[#2860F5]" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-headline font-black text-white leading-snug [text-wrap:balance]">
                  {valuerTitle}
                </h4>
                <p className="text-base sm:text-[17px] text-white font-bold mt-1.5 leading-relaxed">
                  {valuerSubtitle}
                </p>
              </div>
            </div>
            
            <a
              href="/#valorador"
              className="neo-btn-secondary font-headline font-black text-sm sm:text-base py-4 px-7 shrink-0 flex items-center gap-3 cursor-pointer rounded-xl shadow-[3px_3px_0px_#111111]"
            >
              <span>{valuerBtn}</span>
              <ArrowRight className="w-5 h-5 text-[#2860F5] stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          SECCIÓN 6: LOS 14 BARRIOS DE SANTA COLOMA — COBERTURA Y ENLACES
          ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 sm:py-8">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-xs font-headline font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111] mb-3">
              <MapPin className="w-4 h-4 text-white" />
              {coverageTag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight mb-4 [text-wrap:balance]">
              {barrioTitle}
            </h2>
            <p className="text-[#111111] text-[18px] sm:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto">
              {coverageSubtitle}
            </p>
          </div>

          {/* Grid de Píldoras Interactivas Sólidas de Alto Contraste */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {SANTA_COLOMA_14_BARRIOS.map((barrio) => (
              <a
                key={barrio.slug}
                href={`/administrador-fincas/${barrio.slug}`}
                className="bg-white hover:bg-[#2860F5] text-[#111111] hover:text-white border-2 border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] p-4 flex items-center justify-between transition-all group cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px]"
                title={`${title} en el barrio de ${barrio.name}, Santa Coloma de Gramenet`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#2860F5] group-hover:bg-white text-white group-hover:text-[#2860F5] border-2 border-[#111111] flex items-center justify-center shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[15px] font-headline font-black truncate block leading-snug">
                      {barrio.name}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-500 group-hover:text-blue-100 transition-colors">
                      CP {barrio.cp}
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-md bg-[#FAF9FC] group-hover:bg-[#111111] text-[#111111] group-hover:text-white flex items-center justify-center shrink-0 border border-[#111111] transition-all">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </a>
            ))}
          </div>

          {/* Footer de cobertura municipal con sede central física */}
          <div className="p-5 sm:p-6 bg-[#111111] text-white border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0" />
              <span>{headquarterLabel} <strong className="text-white">Av. dels Banús, 49</strong> · Santa Coloma de Gramenet (08923)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#2860F5] text-white px-3.5 py-1.5 border border-white/20 rounded-md font-data-mono text-xs font-black shadow-sm">
              {postcodesLabel}
            </span>
          </div>

        </div>
      </section>

      {/* ── FOOTER GLOBAL OFICIAL ── */}
      <Footer language={language} />

      <WhatsAppButton />
    </div>
  );
}
