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
  Check,
  Star,
  Home,
  Key,
  TrendingUp,
  Shield,
  Calendar,
  Users
} from "lucide-react";
import { SANTA_COLOMA_BARRIOS, type NeighborhoodDetail } from "@/data/geoLocations";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { Navbar } from "@/components/Navbar";
import { FooterMascot } from "@/components/FooterMascot";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_DOMAIN = "https://www.gesgrama.es";

// Localized dictionary for neighborhood page UI
const BARRIO_I18N = {
  es: {
    barrioTag: "Barrio",
    atencionEn: "Atención en ~",
    minutos: "min",
    distrito: "Distrito",
    cp: "CP",
    heroGlobalTitle: "Administración de Fincas y Comunidades en Santa Coloma de Gramenet",
    heroGlobalSubtitle: "Sede central en Av. dels Banús, 49. Más de 15 años gestionando comunidades en los 14 barrios de Santa Coloma con total transparencia contable, auditoría gratis de gastos y peritos judiciales colegiados.",
    trustPoints: [
      "Sede física en Santa Coloma (Av. dels Banús, 49)",
      "Auditoría contable y revisión de contratos gratis",
      "Cero comisiones ocultas en obras y proveedores",
      "Peritos judiciales inmobiliarios colegiados"
    ],
    ctaStudy: "Pedir Estudio Económico Gratis",
    ctaWhatsapp: "WhatsApp Directo",
    formBadge: "Estudio Económico Gratuito",
    formTitle: "¿Cuánto puede ahorrar tu comunidad en",
    formSub: "Enviamos una comparativa detallada de cuotas y suministros en menos de 24 horas.",
    vecinosLabel: "Nº de Vecinos / Entidades en la Finca",
    phoneLabel: "Teléfono de Contacto",
    emailLabel: "Email",
    streetLabel: "Calle de la Finca en",
    streetPlaceholder: "Ej. Calle Mayor, 12",
    submitBtn: "Solicitar Estudio de Costes",
    disclaimer: "🔒 Sin permanencia · Sin coste de traspaso · Sede en Santa Coloma de Gramenet.",
    realityBadge: "Tipología y Problemáticas en",
    realityTitle: "Especialistas en la Realidad Constructiva de",
    commonInterventions: "Intervenciones habituales que gestionamos en este barrio:",
    verifiedCommunity: "Comunidad de Santa Coloma Verificada",
    managementYear: "Año de gestión:",
    servicesBadge: "Servicios de Administración en",
    servicesTitle: "Gestión Integral y Defensa de la Comunidad",
    servicesSub: "Soluciones específicas para las fincas de",
    servicesSubEnd: ": auditoría sin coste, asesoramiento legal de cabecera y conservación técnica.",
    serviceGuaranteed: "Servicio garantizado por Gesgrama",
    servicesList: [
      {
        title: "Auditoría Contable y Reclamación de Morosidad",
        desc: "Revisamos hasta el último céntimo de la comunidad. Negociamos acuerdos fraccionados con morosos y activamos el procedimiento judicial monitorio con nuestros propios abogados sin costes adicionales."
      },
      {
        title: "ITE, Rehabilitación y Subvenciones Oficiales",
        desc: "Supervisión de la Inspección Técnica de Edificios, tramitación de subvenciones de accesibilidad (bajadas de ascensor a cota cero) y proyectos Next Generation ante el Ayuntamiento de Santa Coloma."
      },
      {
        title: "Optimización de Contratos y Ahorro Directo",
        desc: "Revisamos y licitamos los contratos de ascensor, seguro de la finca y limpieza comunitaria. Reducimos de media entre un 15% y un 30% del gasto ordinario anual."
      },
      {
        title: "Respuesta a Averías Urgentes en Minutos",
        desc: "Ante fugas de agua, apagones o bloqueos de ascensor, nuestro equipo e industriales de confianza acuden en menos de 15 minutos para cortar el siniestro y tramitar el parte con el seguro."
      },
      {
        title: "Juntas Ágiles y Cuentas Claras 24/7",
        desc: "Convocatorias bien organizadas, actas enviadas en 48 horas y balances bancarios transparentes. Los vecinos tienen acceso digital continuo a facturas y justificantes bancarios sin letra pequeña."
      },
      {
        title: "Colegiación Oficial y Seguros de Garantía",
        desc: "Administradores colegiados en el CAFBL y agentes de la propiedad inmobiliaria (API). Tu comunidad está protegida con póliza de caución y de responsabilidad civil profesional."
      }
    ],
    reviewsBadge: "Testimonios Verificados en Santa Coloma",
    reviewsTitle: "La Tranquilidad de +300 Comunidades Gestionadas",
    reviewsRating: "4.9 / 5 estrellas en reseñas reales de propietarios",
    googleVerified: "Google Verificada",
    verified: "Verificado",
    reviewsList: [
      {
        author: "Carmen R.",
        category: "Presidenta de Escalera",
        barrioPrefix: "Comunidad en",
        time: "Hace 2 meses",
        initial: "C",
        quote: "Llevábamos años con un administrador que no atendía urgencias ni explicaba las cuentas. El cambio a Gesgrama fue impecable: resolvieron la ITE con subvención y nos bajaron la cuota negociando el seguro."
      },
      {
        author: "Antonio M.",
        category: "Vocal de Finca",
        barrioPrefix: "Santa Coloma de Gramenet",
        time: "Hace 4 meses",
        initial: "A",
        quote: "Teníamos una deuda de más de 6.000€ en el portal por dos vecinos que no pagaban. En menos de seis meses Gesgrama pactó la recuperación íntegra sin llegar a juicio. Trato 100% profesional y transparente."
      },
      {
        author: "Marta & Jordi P.",
        category: "Propietarios",
        barrioPrefix: "Santa Coloma Centro / Banús",
        time: "Hace 1 mes",
        initial: "M",
        quote: "Cualquier avería o siniestro se comunica por WhatsApp y el operario se presenta enseguida. Además, las actas se reciben de forma inmediata y cada factura se puede auditar con todo detalle."
      }
    ],
    whyBadge: "¿Por qué elegir Gesgrama en",
    whyTitle: "Proximidad real, sin centralitas lejanas ni costes ocultos",
    whyDesc: "A diferencia de grandes gestorías que administran desde despachos remotos en Barcelona, nosotros estamos a pocos minutos de tu portal, en la Av. dels Banús, 49. Conocemos personalmente la normativa urbanística y las características de las fincas de Santa Coloma.",
    pillars: [
      {
        title: "Cero comisiones ocultas en mantenimientos",
        desc: "No cobramos comisiones ni porcentajes a los proveedores. Trabajamos con tarifas pactadas transparentes que benefician directamente al bolsillo de la comunidad."
      },
      {
        title: "Asistencia presencial continua",
        desc: "Supervisamos las obras en persona, acudimos a las inspecciones técnicas y nos personamos ante cualquier conflicto vecinal urgente."
      },
      {
        title: "Asesoría Jurídica y Peritaje Propio",
        desc: "Disponemos de abogado colegiado y perito judicial inmobiliario en plantilla para defender a la finca ante constructoras, seguros o impagos."
      }
    ],
    stats: {
      years: "+15 años",
      yearsLabel: "De experiencia local",
      yearsDesc: "Especialistas en Santa Coloma de Gramenet desde nuestros orígenes.",
      communities: "+300",
      communitiesLabel: "Comunidades activas",
      communitiesDesc: "Cientos de fincas confían en nuestra administración contable.",
      collegiate: "Nº 5583",
      collegiateLabel: "Colegiados Oficiales",
      collegiateDesc: "Registro AICAT y Colegio de Administradores de Fincas.",
      urgency: "15 min",
      urgencyLabel: "Respuesta ante urgencias",
      urgencyDesc: "Atención inmediata a siniestros de fontanería, luz o ascensor."
    },
    ctaBoxTitle: "¿Quieres saber cuánto ahorraría tu comunidad en",
    ctaBoxSub: "Solicita un estudio comparativo sin ningún compromiso ni permanencia.",
    ctaBoxBtn: "Pedir Comparativa Gratuita",
    faqsBadge: "Preguntas Frecuentes ·",
    faqsAccent: "Dudas Comunes",
    faqsTitleEnd: "en comunidades de",
    faqsSub: "Respuestas claras de nuestros administradores colegiados sobre normativa, costes, obras y gestión vecinal específica en",
    faqsBtn: "Pedir Presupuesto o Consultar Duda",
    coverageBadge: "Presencia Local",
    coverageTitle: "Cobertura en Santa Coloma de Gramenet",
    coverageSub: "Atención presencial e inmediata en todas las zonas oficiales de la ciudad:",
    footerNavTitle: "Navegación",
    footerContactTitle: "Contacto Directo",
    footerLegalTitle: "Legal",
    footerOffice: "Oficina: 93 468 56 56",
    footerRights: "© 2026 Gesgrama. Todos los derechos reservados. · Desarrollado por",
    footerAcreditaciones: "ACREDITACIONES PROFESIONALES OFICIALES"
  },
  ca: {
    barrioTag: "Barri",
    atencionEn: "Atenció en ~",
    minutos: "min",
    distrito: "Districte",
    cp: "CP",
    heroGlobalTitle: "Administració de Finques i Comunitats a Santa Coloma de Gramenet",
    heroGlobalSubtitle: "Seu central a l'Av. dels Banús, 49. Més de 15 anys gestionant comunitats als 14 barris de Santa Coloma amb total transparència comptable, auditoria de despeses gratuïta i pèrits judicials col·legiats.",
    trustPoints: [
      "Seu física a Santa Coloma (Av. dels Banús, 49)",
      "Auditoria comptable i revisió de contractes gratis",
      "Zero comissions ocultes en obres i proveïdors",
      "Pèrits judicials immobiliaris col·legiats"
    ],
    ctaStudy: "Demanar Estudi Econòmic Gratis",
    ctaWhatsapp: "WhatsApp Directe",
    formBadge: "Estudi Econòmic Gratuït",
    formTitle: "Quant pot estalviar la teva comunitat a",
    formSub: "Enviem una comparativa detallada de quotes i subministraments en menys de 24 hores.",
    vecinosLabel: "Nre. de Veïns / Entitats a la Finca",
    phoneLabel: "Telèfon de Contacte",
    emailLabel: "Correu Electrònic",
    streetLabel: "Carrer de la Finca a",
    streetPlaceholder: "Ex. Carrer Major, 12",
    submitBtn: "Sol·licitar Estudi de Costos",
    disclaimer: "🔒 Sense permanència · Sense cost de traspàs · Seu a Santa Coloma de Gramenet.",
    realityBadge: "Tipologia i Problemàtiques a",
    realityTitle: "Especialistes en la Realitat Constructiva de",
    commonInterventions: "Intervencions habituals que gestionem en aquest barri:",
    verifiedCommunity: "Comunitat de Santa Coloma Verificada",
    managementYear: "Any de gestió:",
    servicesBadge: "Serveis d'Administració a",
    servicesTitle: "Gestió Integral i Defensa de la Comunitat",
    servicesSub: "Solucions específiques per a les finques de",
    servicesSubEnd: ": auditoria sense cost, assessorament legal continuat i manteniment tècnic.",
    serviceGuaranteed: "Servei garantit per Gesgrama",
    servicesList: [
      {
        title: "Auditoria Comptable i Reclamació de Morositat",
        desc: "Revisem fins a l'últim cèntim de la comunitat. Negociem acords fraccionats amb deutors i activem el procediment judicial monitori amb els nostres advocats sense costos afegits."
      },
      {
        title: "ITE, Rehabilitació i Subvencions Oficials",
        desc: "Supervisió de la Inspecció Tècnica d'Edificis, tramitació de subvencions d'accessibilitat (ascensors a cota zero) i ajuts Next Generation davant l'Ajuntament de Santa Coloma."
      },
      {
        title: "Optimització de Contractes i Estalvi Directe",
        desc: "Revisem i licitem els contractes d'ascensor, assegurança i neteja comunitària. Reduïm de mitjana entre un 15% i un 30% de la despesa ordinària anual."
      },
      {
        title: "Resposta a Avaries Urgents en Minuts",
        desc: "Davant fuites d'aigua, talls de llum o bloquejos d'ascensor, el nostre equip i industrials de confiança es desplacen en menys de 15 minuts per aturar el sinistre."
      },
      {
        title: "Juntes Àgils i Comptes Clars 24/7",
        desc: "Convocatòries ben estructurades, actes enviades en 48 hores i balanços bancaris transparents. Els veïns tenen accés digital continu a factures i extractes sense lletra petita."
      },
      {
        title: "Col·legiació Oficial i Assegurances de Garantia",
        desc: "Administradors col·legiats al CAFBL i agents de la propietat immobiliària (API). La teva comunitat està protegida amb pòlissa de caució i responsabilitat civil professional."
      }
    ],
    reviewsBadge: "Testimonis Verificats a Santa Coloma",
    reviewsTitle: "La Tranquil·litat de +300 Comunitats Gestionades",
    reviewsRating: "4.9 / 5 estrelles en ressenyes reals de propietaris",
    googleVerified: "Google Verificada",
    verified: "Verificat",
    reviewsList: [
      {
        author: "Carmen R.",
        category: "Presidenta d'Escala",
        barrioPrefix: "Comunitat a",
        time: "Fa 2 mesos",
        initial: "C",
        quote: "Portàvem anys amb un administrador que no atenia urgències ni explicava els comptes. El canvi a Gesgrama va ser impecable: van resoldre la ITE amb subvenció i van baixar la quota renegociant l'assegurança."
      },
      {
        author: "Antonio M.",
        category: "Vocal de Finca",
        barrioPrefix: "Santa Coloma de Gramenet",
        time: "Fa 4 mesos",
        initial: "A",
        quote: "Teníem un deute de més de 6.000€ a l'escala per dos veïns que no pagaven. En menys de sis mesos Gesgrama va recuperar íntegrament els diners sense judici. Tracte 100% professional i transparent."
      },
      {
        author: "Marta & Jordi P.",
        category: "Propietaris",
        barrioPrefix: "Santa Coloma Centre / Banús",
        time: "Fa 1 mes",
        initial: "M",
        quote: "Qualsevol avaria o sinistre es comunica per WhatsApp i l'operari es presenta de seguida. A més, les actes es reben ràpidament i cada factura es pot auditar al detall."
      }
    ],
    whyBadge: "Per què triar Gesgrama a",
    whyTitle: "Proximitat real, sense centraletes llunyanes ni costos ocults",
    whyDesc: "A diferència de grans gestories que administren des de despatxos remots a Barcelona, nosaltres som a pocs minuts del teu portal, a l'Av. dels Banús, 49. Coneixem personalment la normativa urbanística i les necessitats de les finques de Santa Coloma.",
    pillars: [
      {
        title: "Zero comissions ocultes en manteniments",
        desc: "No cobrem comissions ni percentatges als proveïdors. Treballem amb tarifes pactades transparents que beneficien directament la comunitat."
      },
      {
        title: "Assistència presencial continuada",
        desc: "Supervisem les obres en persona, assistim a les inspeccions tècniques i ens personem davant qualsevol incidència urgent."
      },
      {
        title: "Assessorament Jurídic i Peritatge Propi",
        desc: "Disposem d'advocat col·legiat i pèrit judicial immobiliari en plantilla per defensar la finca davant constructores, asseguradores o impagaments."
      }
    ],
    stats: {
      years: "+15 anys",
      yearsLabel: "D'experiència local",
      yearsDesc: "Especialistes a Santa Coloma de Gramenet des dels nostres inicis.",
      communities: "+300",
      communitiesLabel: "Comunitats actives",
      communitiesDesc: "Centenars de finques confien en la nostra administració comptable.",
      collegiate: "Nº 5583",
      collegiateLabel: "Col·legiats Oficials",
      collegiateDesc: "Registre AICAT i Col·legi d'Administradors de Finques.",
      urgency: "15 min",
      urgencyLabel: "Resposta a urgències",
      urgencyDesc: "Atenció immediata a incidències de fontaneria, llum o ascensor."
    },
    ctaBoxTitle: "Vols saber quant estalviaria la teva comunitat a",
    ctaBoxSub: "Sol·licita un estudi comparatiu sense cap compromís ni permanència.",
    ctaBoxBtn: "Demanar Comparativa Gratuïta",
    faqsBadge: "Preguntes Freqüents ·",
    faqsAccent: "Dubtes Freqüents",
    faqsTitleEnd: "en comunitats de",
    faqsSub: "Respostes clares dels nostres administradors col·legiats sobre normativa, costos, obres i gestió veïnal específica a",
    faqsBtn: "Demanar Pressupost o Consultar Dubte",
    coverageBadge: "Presència Local",
    coverageTitle: "Cobertura a Santa Coloma de Gramenet",
    coverageSub: "Atenció presencial i immediata a totes les zones oficials de la ciutat:",
    footerNavTitle: "Navegació",
    footerContactTitle: "Contacte Directe",
    footerLegalTitle: "Legal",
    footerOffice: "Oficina: 93 468 56 56",
    footerRights: "© 2026 Gesgrama. Tots els drets reservats. · Desenvolupat per",
    footerAcreditaciones: "ACREDITACIONS PROFESSIONALS OFICIALS"
  },
  en: {
    barrioTag: "Neighborhood",
    atencionEn: "Response in ~",
    minutos: "min",
    distrito: "District",
    cp: "ZIP",
    heroGlobalTitle: "Property Management & HOA in Santa Coloma de Gramenet",
    heroGlobalSubtitle: "Headquarters at Av. dels Banús, 49. Over 15 years managing residential communities across all 14 neighborhoods of Santa Coloma with full accounting transparency, free cost audits, and certified judicial experts.",
    trustPoints: [
      "Physical office in Santa Coloma (Av. dels Banús, 49)",
      "Free financial audit & supplier contract review",
      "Zero hidden commissions on repairs & providers",
      "Registered property & judicial building experts"
    ],
    ctaStudy: "Request Free Economic Study",
    ctaWhatsapp: "Direct WhatsApp",
    formBadge: "Free Economic Study",
    formTitle: "How much can your community save in",
    formSub: "We deliver a thorough breakdown of HOA fees and utility savings in less than 24 hours.",
    vecinosLabel: "Number of Neighbors / Units in Building",
    phoneLabel: "Contact Phone Number",
    emailLabel: "Email Address",
    streetLabel: "Building Street in",
    streetPlaceholder: "E.g. Main Street, 12",
    submitBtn: "Request Cost Study",
    disclaimer: "🔒 No lock-in contracts · Zero handover fee · Local Santa Coloma office.",
    realityBadge: "Building Typology & Needs in",
    realityTitle: "Specialists in the Construction Reality of",
    commonInterventions: "Frequent interventions we handle in this area:",
    verifiedCommunity: "Verified Santa Coloma Community",
    managementYear: "Management since:",
    servicesBadge: "Management Services in",
    servicesTitle: "Comprehensive Management & Community Defense",
    servicesSub: "Tailored solutions for residential buildings in",
    servicesSubEnd: ": zero-cost audit, ongoing legal advice, and expert structural care.",
    serviceGuaranteed: "Service guaranteed by Gesgrama",
    servicesList: [
      {
        title: "Accounting Audit & Delinquency Collection",
        desc: "We scrutinize every single euro of the community. We negotiate installment plans with debtors and trigger expedited court proceedings with our in-house lawyers at no extra fee."
      },
      {
        title: "ITE Inspection, Retrofitting & Grants",
        desc: "Supervision of Mandatory Building Inspections (ITE), accessibility grants (zero-threshold elevators), and NextGen EU funding through the Santa Coloma City Council."
      },
      {
        title: "Contract Optimization & Direct Savings",
        desc: "We review and retender elevator maintenance, building insurance, and cleaning contracts, reducing ordinary annual expenses by 15% to 30% on average."
      },
      {
        title: "Urgent Breakdown Response in Minutes",
        desc: "In case of water leaks, electrical blackouts, or elevator entrapments, our vetted emergency technicians arrive in less than 15 minutes to secure the issue."
      },
      {
        title: "Agile HOA Meetings & 24/7 Clear Accounts",
        desc: "Well-organized meetings, minutes sent within 48 hours, and 100% transparent bank statements. Owners get 24/7 digital access to all invoices and receipts."
      },
      {
        title: "Official Accreditation & Surety Bonds",
        desc: "Registered property managers with the CAFBL and certified real estate agents (API). Your building is covered by comprehensive civil liability and guarantee bonds."
      }
    ],
    reviewsBadge: "Verified Reviews in Santa Coloma",
    reviewsTitle: "Peace of Mind for +300 Managed Communities",
    reviewsRating: "4.9 / 5 stars across authentic homeowner reviews",
    googleVerified: "Google Verified",
    verified: "Verified",
    reviewsList: [
      {
        author: "Carmen R.",
        category: "Building President",
        barrioPrefix: "Community in",
        time: "2 months ago",
        initial: "C",
        quote: "We spent years with a manager who never answered emergencies or explained expenses. Switching to Gesgrama was smooth: they resolved our ITE with a grant and lowered our monthly fees."
      },
      {
        author: "Antonio M.",
        category: "Committee Member",
        barrioPrefix: "Santa Coloma de Gramenet",
        time: "4 months ago",
        initial: "A",
        quote: "We had over €6,000 in unpaid dues from two defaulting neighbors. In less than six months Gesgrama recovered all funds without litigation. 100% professional and transparent."
      },
      {
        author: "Marta & Jordi P.",
        category: "Property Owners",
        barrioPrefix: "Santa Coloma Centre / Banús",
        time: "1 month ago",
        initial: "M",
        quote: "Any repair or incident is reported via WhatsApp and the contractor shows up promptly. Minutes are delivered swiftly and every invoice is fully traceable."
      }
    ],
    whyBadge: "Why choose Gesgrama in",
    whyTitle: "Real local presence, no remote call centers or hidden fees",
    whyDesc: "Unlike large management firms operating remotely from downtown Barcelona, we are located just minutes from your entrance, at Av. dels Banús, 49. We know the urban regulations and technical specifics of Santa Coloma buildings firsthand.",
    pillars: [
      {
        title: "Zero hidden commissions on maintenance",
        desc: "We never take kickbacks or percentages from contractors. We work with transparent, pre-negotiated rates that directly benefit the community."
      },
      {
        title: "Continuous in-person oversight",
        desc: "We inspect works on site, attend technical audits in person, and handle any urgent neighbor dispute directly."
      },
      {
        title: "In-House Legal & Technical Experts",
        desc: "We have accredited practicing lawyers and real estate appraisal experts on staff to defend the building against builders, insurers, or defaults."
      }
    ],
    stats: {
      years: "+15 years",
      yearsLabel: "Of local experience",
      yearsDesc: "Dedicated specialists in Santa Coloma de Gramenet from day one.",
      communities: "+300",
      communitiesLabel: "Active communities",
      communitiesDesc: "Hundreds of buildings trust our bookkeeping and governance.",
      collegiate: "No. 5583",
      collegiateLabel: "Official Registrations",
      collegiateDesc: "AICAT registry and Official Association of Property Administrators.",
      urgency: "15 min",
      urgencyLabel: "Emergency response time",
      urgencyDesc: "Swift on-site dispatch for plumbing, electricity, or elevator repairs."
    },
    ctaBoxTitle: "Want to know how much your community can save in",
    ctaBoxSub: "Request a detailed comparative study with no commitment or lock-in.",
    ctaBoxBtn: "Get Free Comparative Study",
    faqsBadge: "Frequently Asked Questions ·",
    faqsAccent: "Common Inquiries",
    faqsTitleEnd: "in communities of",
    faqsSub: "Straightforward answers from our chartered property managers regarding regulations, costs, renovations, and governance in",
    faqsBtn: "Request Quote or Ask a Question",
    coverageBadge: "Local Coverage",
    coverageTitle: "Coverage Across Santa Coloma de Gramenet",
    coverageSub: "Immediate in-person service across all official city neighborhoods:",
    footerNavTitle: "Navigation",
    footerContactTitle: "Direct Contact",
    footerLegalTitle: "Legal",
    footerOffice: "Office: 93 468 56 56",
    footerRights: "© 2026 Gesgrama. All rights reserved. · Developed by",
    footerAcreditaciones: "OFFICIAL ACCREDITATIONS & LICENSES"
  }
};

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

  const t = BARRIO_I18N[language] || BARRIO_I18N.es;
  const allBarrios = Object.values(SANTA_COLOMA_BARRIOS);

  // Dynamic translated headlines for the barrio
  const localizedHeadline = isGlobal
    ? t.heroGlobalTitle
    : language === "ca"
      ? `Administrador de Finques al barri de ${data.name} (Santa Coloma)`
      : language === "en"
        ? `Property Administrator in ${data.name} (Santa Coloma)`
        : data.heroHeadline;

  const localizedSubtitle = isGlobal
    ? t.heroGlobalSubtitle
    : language === "ca"
      ? `Gestió experta per a comunitats al barri de ${data.name}: seu central a Av. dels Banús 49, auditoria gratuïta de despeses, resolució d'avaries en ~${data.emergencyResponseMinutes} minuts i màxima transparència comptable.`
      : language === "en"
        ? `Expert property administration for communities in ${data.name}: local headquarters at Av. dels Banús 49, free cost audit, emergency response in ~${data.emergencyResponseMinutes} minutes, and transparent bookkeeping.`
        : data.heroSubtitle;

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      {/* ── NAVBAR OFICIAL CORPORATIVO FLOTANTE DE GESGRAMA ── */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      <main>
        {/* ── HERO SECTION IDÉNTICO AL DISEÑO DE LA PÁGINA PRINCIPAL (ADAPTADO AL BARRIO) ── */}
        <section className="relative text-slate-900 pt-28 sm:pt-36 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] px-4 md:px-8 xl:px-12 border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Identical hierarchy to homepage hero */}
              <div className="lg:col-span-7 space-y-5 text-left">
                {/* Blue pill badge identical to Home */}
                <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[11px] sm:text-[13px] font-black uppercase tracking-[0.12em] px-4 sm:px-5 py-2 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit">
                  <span className="w-2 h-2 rounded-full bg-white shrink-0 animate-pulse" />
                  <span>{t.barrioTag} {data.name} · Santa Coloma</span>
                </div>

                {/* Main Headline identical to Home typography */}
                <h1 className="text-[32px] xs:text-[36px] sm:text-5xl md:text-[3.35rem] lg:text-[3.8rem] font-black text-[#0b214a] leading-[1.08] sm:leading-[1.04] tracking-tight font-heading">
                  {localizedHeadline.split(" en ")[0] || localizedHeadline}<br />
                  <span className="text-[#2563eb] inline-block mt-0.5 sm:mt-1">
                    {localizedHeadline.includes(" en ") ? `en ${localizedHeadline.split(" en ")[1]}` : data.name}
                  </span>
                </h1>

                {/* Subtitle with high contrast and readability */}
                <p className="text-[#1e293b] text-[15px] sm:text-lg md:text-[1.15rem] font-bold leading-relaxed font-sans max-w-[620px]">
                  {localizedSubtitle}
                </p>

                {/* Trust points card with 100% solid white cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {t.trustPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-bold bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-2xs">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#2563eb] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons matching Home Page buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a 
                    href="#calculadora-presupuesto"
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-[0_4px_16px_rgba(37,99,235,0.32)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <Calculator className="w-4.5 h-4.5 shrink-0" />
                    <span>{t.ctaStudy}</span>
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>

                  <a 
                    href={`https://wa.me/34601259424?text=${encodeURIComponent(
                      language === 'ca'
                        ? `Hola Gesgrama, sol·licito informació per a una comunitat al barri de ${data.name} (Santa Coloma)`
                        : language === 'en'
                          ? `Hello Gesgrama, I'd like info regarding community management in ${data.name} (Santa Coloma)`
                          : `Hola Gesgrama, solicito estudio para comunidad en el barrio de ${data.name} (Santa Coloma)`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#075E54] hover:bg-[#054c44] text-white px-6 py-3.5 rounded-full font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white shrink-0">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    <span>{t.ctaWhatsapp}</span>
                  </a>
                </div>

                {/* Trust badge with check */}
                <div className="flex items-center gap-2.5 pt-1">
                  <span className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-extrabold font-sans text-slate-800 text-[13.5px] sm:text-[14px]">
                    {t.atencionEn} ~{data.emergencyResponseMinutes} {t.minutos} · CP {data.postalCode} ({data.district})
                  </span>
                </div>
              </div>

              {/* Right Column: Calculator Card */}
              <div id="calculadora-presupuesto" className="lg:col-span-5">
                <div className="bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-200 text-slate-900">
                  <div className="mb-4 text-left">
                    <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block mb-1 font-sans">
                      {t.formBadge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b214a] font-sans leading-snug">
                      {t.formTitle} {data.name}?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                      {t.formSub}
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
                    className="space-y-3.5 text-left"
                  >
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1 font-sans">
                        {t.vecinosLabel}
                      </label>
                      <input 
                        type="number" 
                        name="vecinos"
                        min="2" 
                        max="300" 
                        defaultValue="12" 
                        required 
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1 font-sans">
                          {t.phoneLabel}
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="600 000 000" 
                          required 
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1 font-sans">
                          {t.emailLabel}
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="tu@email.com" 
                          required 
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-slate-800 mb-1 font-sans">
                        {t.streetLabel} {data.name}
                      </label>
                      <input 
                        type="text" 
                        name="street"
                        placeholder={`Ej. ${data.testimonial.street}`} 
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none text-sm font-semibold bg-white text-slate-900"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 px-5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <span>{t.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Clarified, 100% solid disclaimer pill */}
                    <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-center shadow-2xs">
                      <p className="text-xs sm:text-[13px] font-extrabold text-slate-800 leading-snug font-sans">
                        {t.disclaimer}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* 4 Stats Grid identical to Home Hero Carousel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200/80">
              <div className="flex flex-col items-center justify-center text-center px-3 py-3.5 rounded-2xl bg-[#0f172a] text-white shadow-sm border border-slate-800">
                <Users className="w-5 h-5 text-[#38bdf8] mb-1.5" />
                <p className="text-2xl sm:text-3xl font-black leading-none font-sans tracking-tight mb-1 text-white">
                  +4.500
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-slate-300 leading-tight font-sans">
                  {t.stats.communitiesLabel}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-3 py-3.5 rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#2563eb] mb-1.5" />
                <p className="text-2xl sm:text-3xl font-black leading-none font-sans tracking-tight mb-1 text-[#0b214a]">
                  ~{data.emergencyResponseMinutes} min
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-slate-600 leading-tight font-sans">
                  {t.stats.urgencyLabel}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-3 py-3.5 rounded-2xl bg-[#0f172a] text-white shadow-sm border border-slate-800">
                <Building2 className="w-5 h-5 text-[#38bdf8] mb-1.5" />
                <p className="text-2xl sm:text-3xl font-black leading-none font-sans tracking-tight mb-1 text-white">
                  +300
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-slate-300 leading-tight font-sans">
                  {t.stats.communities}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-3 py-3.5 rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-sm">
                <Award className="w-5 h-5 text-[#2563eb] mb-1.5" />
                <p className="text-2xl sm:text-3xl font-black leading-none font-sans tracking-tight mb-1 text-[#0b214a]">
                  15+
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-slate-600 leading-tight font-sans">
                  {t.stats.yearsLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DETALLES ESPECÍFICOS DEL BARRIO ── */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-black uppercase tracking-wider text-[#2563eb] block font-sans">
                  {t.realityBadge} {data.name}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight font-sans">
                  {t.realityTitle} {data.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed font-sans">
                  {data.buildingTypology}
                </p>

                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 font-sans">
                    {t.commonInterventions}
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
                <div className="bg-[#0f172a] text-white p-7 sm:p-9 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center font-black text-lg text-white shadow-xs">
                      {data.testimonial.author[0]}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black">{data.testimonial.author}</h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {data.testimonial.role} · {data.testimonial.street} ({t.barrioTag} {data.name})
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed mb-6 font-serif">
                    "{data.testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800 font-sans">
                    <span>{t.managementYear} {data.testimonial.year}</span>
                    <span className="text-emerald-400 font-bold">{t.verifiedCommunity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 1: SERVICIOS INTEGRALES Y VALOR DIFERENCIAL EN EL BARRIO ── */}
        <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-12 bg-[#e2e8f0] text-slate-900">
          <div className="max-w-[1360px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 bg-[#0f172a] text-white text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-3 font-sans">
                <Building2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{t.servicesBadge} {data.name}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight font-sans">
                {t.servicesTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 font-bold max-w-2xl mx-auto font-sans">
                {t.servicesSub} {data.name}{t.servicesSubEnd}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.servicesList.map((serv, sIdx) => {
                const serviceIcons = [
                  <Scale className="w-5 h-5 text-white" />,
                  <ShieldCheck className="w-5 h-5 text-white" />,
                  <TrendingUp className="w-5 h-5 text-white" />,
                  <Clock className="w-5 h-5 text-white" />,
                  <Award className="w-5 h-5 text-white" />,
                  <Shield className="w-5 h-5 text-white" />
                ];
                const serviceBgs = [
                  "bg-[#2563eb]",
                  "bg-[#0369a1]",
                  "bg-[#1e3a8a]",
                  "bg-[#0f172a]",
                  "bg-[#0284c7]",
                  "bg-[#334155]"
                ];

                return (
                  <div 
                    key={sIdx}
                    className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-[#2563eb] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-11 h-11 rounded-xl ${serviceBgs[sIdx]} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                        {serviceIcons[sIdx]}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-[#2563eb] transition-colors font-sans">
                        {serv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
                        {serv.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-black text-[#2563eb] font-sans">
                      <span>{t.serviceGuaranteed}</span>
                      <Check className="w-3.5 h-3.5 text-[#2563eb]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 2: OPINIONES Y RESEÑAS VERIFICADAS DE VECINOS ── */}
        <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-12 bg-white text-slate-900 border-y border-slate-200">
          <div className="max-w-[1360px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 bg-[#0b214a] text-white text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs mb-3 font-sans">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{t.reviewsBadge}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight font-sans">
                {t.reviewsTitle}
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 shadow-2xs font-sans">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  {t.reviewsRating}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.reviewsList.map((rev, rIdx) => (
                <div 
                  key={rIdx}
                  className="bg-[#f8fafc] rounded-2xl p-6 border-2 border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-[#2563eb]" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-600 shadow-2xs font-sans">
                        {t.googleVerified}
                      </span>
                    </div>

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium mb-6 italic">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0b214a] text-white font-black text-sm flex items-center justify-center shadow-xs">
                        {rev.initial}
                      </div>
                      <div>
                        <strong className="block font-black text-sm text-slate-900 leading-tight">
                          {rev.author}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-bold">
                          {rev.category} · {rev.barrioPrefix} {rIdx === 0 ? data.name : ""}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#2563eb] px-2.5 py-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span>{t.verified}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 3: LOS 4 PILARES Y CIFRAS DE CONFIANZA DE GESGRAMA ── */}
        <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-12 bg-[#0b172a] text-white">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl shadow-xs font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>{t.whyBadge} {data.name}?</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight font-sans">
                  {t.whyTitle}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium font-sans">
                  {t.whyDesc}
                </p>

                <div className="space-y-3 pt-2">
                  {t.pillars.map((pil, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-4 bg-[#1e293b] border border-slate-700 rounded-xl shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white text-sm sm:text-base font-black mb-1 font-sans">
                          {pil.title}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed font-sans">
                          {pil.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarjetas de Estadísticas y Cifras Clave */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1e293b] border-2 border-slate-700 p-6 rounded-2xl text-center shadow-lg">
                    <p className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight font-sans">
                      {t.stats.years}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#38bdf8] uppercase tracking-wider font-sans">
                      {t.stats.yearsLabel}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 font-medium font-sans">
                      {t.stats.yearsDesc}
                    </p>
                  </div>

                  <div className="bg-[#1e293b] border-2 border-slate-700 p-6 rounded-2xl text-center shadow-lg">
                    <p className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight font-sans">
                      {t.stats.communities}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#38bdf8] uppercase tracking-wider font-sans">
                      {t.stats.communitiesLabel}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 font-medium font-sans">
                      {t.stats.communitiesDesc}
                    </p>
                  </div>

                  <div className="bg-[#1e293b] border-2 border-slate-700 p-6 rounded-2xl text-center shadow-lg">
                    <p className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight font-sans">
                      {t.stats.collegiate}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#38bdf8] uppercase tracking-wider font-sans">
                      {t.stats.collegiateLabel}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 font-medium font-sans">
                      {t.stats.collegiateDesc}
                    </p>
                  </div>

                  <div className="bg-[#1e293b] border-2 border-slate-700 p-6 rounded-2xl text-center shadow-lg">
                    <p className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight font-sans">
                      {t.stats.urgency}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#38bdf8] uppercase tracking-wider font-sans">
                      {t.stats.urgencyLabel}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 font-medium font-sans">
                      {t.stats.urgencyDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-[#2563eb] p-6 rounded-2xl text-white text-center shadow-xl">
                  <h3 className="text-lg sm:text-xl font-black mb-2 font-sans">
                    {t.ctaBoxTitle} {data.name}?
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium mb-4 font-sans">
                    {t.ctaBoxSub}
                  </p>
                  <a
                    href="#calculadora-presupuesto"
                    className="inline-flex items-center gap-2 bg-white text-[#2563eb] hover:bg-slate-100 px-6 py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer font-sans"
                  >
                    <span>{t.ctaBoxBtn}</span>
                    <ArrowRight className="w-4 h-4 text-[#2563eb]" />
                  </a>
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
                  <span>{t.faqsBadge} {data.name}</span>
                </span>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white tracking-tight font-sans mb-3 text-center">
                  <span className="bg-[#2563eb] text-white px-3 py-1 rounded-xl inline-block shadow-md">
                    {t.faqsAccent}
                  </span>{" "}
                  {t.faqsTitleEnd} {data.name}
                </h2>

                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-relaxed font-sans text-center">
                  {t.faqsSub} {data.name}.
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
                  <span>{t.faqsBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COBERTURA EN SANTA COLOMA ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-slate-900 text-white">
          <div className="max-w-[1360px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-[#38bdf8] block mb-2 font-sans">
                {t.coverageBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-sans">
                {t.coverageTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium font-sans">
                {t.coverageSub}
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

      {/* ── FOOTER CORPORATIVO COMPLETO CON MASCOTA Y ENLACES LOCALIZADOS ── */}
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
                  {language === "ca" 
                    ? "Administració de finques i intermediació immobiliària a Santa Coloma de Gramenet amb més de 15 anys d'experiència."
                    : language === "en"
                      ? "Property management and real estate brokerage in Santa Coloma de Gramenet with over 15 years of experience."
                      : "Administración de fincas e intermediación inmobiliaria en Santa Coloma de Gramenet con más de 15 años de experiencia."}
                </p>
              </div>

              {/* Navegación rápida */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {t.footerNavTitle}
                </h3>
                <ul className="space-y-3.5">
                  {[
                    { label: language === "ca" ? "Propietats" : language === "en" ? "Properties" : "Propiedades", href: "/#propiedades" },
                    { label: language === "ca" ? "Serveis" : language === "en" ? "Services" : "Servicios", href: "/#servicios" },
                    { label: language === "ca" ? "Nosaltres" : language === "en" ? "About Us" : "Nosotros", href: "/#nosotros" },
                    { label: language === "ca" ? "Contacte" : language === "en" ? "Contact" : "Contacto", href: "/#contacto" },
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
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {t.footerContactTitle}
                </h3>
                <ul className="space-y-4 text-base text-slate-300 font-bold">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                    <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                  </li>
                  <li>
                    <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                      <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                      {t.footerOffice}
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
                <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
                  {t.footerLegalTitle}
                </h3>
                <ul className="space-y-3.5">
                  <li>
                    <Link to="/aviso-legal" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Avís Legal" : language === "en" ? "Legal Notice" : "Aviso Legal"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-privacidad" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Política de Privacitat" : language === "en" ? "Privacy Policy" : "Política de Privacidad"}
                    </Link>
                  </li>
                  <li>
                    <Link to="/politica-cookies" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {language === "ca" ? "Política de Cookies" : language === "en" ? "Cookie Policy" : "Política de Cookies"}
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
              {t.footerAcreditaciones}
            </h3>
            <AccreditationBadges language={language} />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">{t.footerRights} <a href="https://kovia.es" target="_blank" rel="noopener">Kovia</a></p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">{language === "ca" ? "Avís Legal" : language === "en" ? "Legal" : "Aviso Legal"}</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">{language === "ca" ? "Privacitat" : language === "en" ? "Privacy" : "Privacidad"}</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">{language === "ca" ? "Galetes" : language === "en" ? "Cookies" : "Cookies"}</Link>
              <span>·</span>
              <Link to="/admin" className="hover:text-amber-300 text-slate-400 transition-colors">{language === "ca" ? "Accés Gestor" : language === "en" ? "Staff Login" : "Acceso Gestor"}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <WhatsAppButton language={language} />
    </div>
  );
}
