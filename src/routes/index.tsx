import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties } from "../data/properties";
import { motion, useScroll, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Home, Building2, Scale, Phone, Mail, MessageCircle, Star, Clock, Shield, TrendingUp, Menu, X, ChevronRight, Calendar, ChevronDown, ArrowRight, Send, Check, Paintbrush } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";
import handKeysImg from "@/assets/hand_keys_blue.jpg";
import gallery1 from "@/assets/gallery-1.webp";
import { FooterAnimationGSAP } from '@/components/FooterAnimationGSAP';

export const Route = createFileRoute("/")(  {
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// TRANSLATIONS (es / en / ca)
// ---------------------------------------------------------------------------
const translations = {
  es: {
    nav: {
      propiedades: "Inmobiliaria",
      servicios: "Servicios",
      nosotros: "Nosotros",
      contacto: "Contacto",
      portal: "Portal de Clientes"
    },
    hero: {
      tag: "Gestión integral — desde 2009",
      title1: "Administración de Fincas,",
      title2: "Inmobiliaria y",
      title3: "Asesoría jurídica.",
      subtitle: "Gestión experta, transparente y cercana para su tranquilidad.",
      comprar: "Comprar",
      alquilar: "Alquilar",
      zona: "Zona",
      tipo: "Tipo",
      hab: "Hab.",
      precio: "Precio máx.",
      buscarBtn: "Buscar"
    },
    properties: {
      tag: "Inmobiliaria",
      title: "Pisos, locales",
      titleAccent: "y más.",
      subtitle: "Explore nuestro catálogo de propiedades en venta. Gestión directa, sin intermediarios.",
      beds: "hab.",
      baths: "baños",
      verTodas: "Ver todas las propiedades"
    },
    valuator: {
      tag: "Valoración gratuita",
      title: "¿Cuánto vale",
      titleAccent: "tu piso?",
      subtitle: "Reciba una valoración profesional sin compromiso. Un asesor le contactará en menos de 24h.",
      zonaLabel: "Zona",
      tipoLabel: "Tipo de inmueble",
      metrosLabel: "Superficie (m²)",
      contactLabel: "Email o teléfono",
      contactPlaceholder: "Para enviarle la valoración",
      submit: "Solicitar valoración gratuita",
      successTitle: "¡Solicitud recibida!",
      successMsg: "Gracias, un asesor le contactará con la valoración en menos de 24h."
    },
    philosophy: {
      tag: "Nuestra filosofía",
      quote: '"Más de 15 años gestionando comunidades con transparencia, cercanía y la máxima profesionalidad."'
    },
    services: {
      tag: "Lo que hacemos",
      title1: "Gestión integral.",
      titleAccent: "Tranquilidad",
      title3: "absoluta.",
      cards: [
        {
          icon: "building",
          title: "Administración de Fincas y Comunidades",
          desc: "Gestión íntegra de su comunidad: contabilidad, convocatorias, mantenimiento, incidencias y relación con proveedores. Todo bajo control.",
          features: ["Contabilidad transparente", "Gestión de incidencias 24h", "Optimización de gastos", "Asambleas y actas"]
        },
        {
          icon: "home",
          title: "Inmobiliaria",
          desc: "Venta y captación de pisos, locales comerciales e inmuebles. Le ayudamos a encontrar compradores cualificados y a conseguir el mejor precio.",
          features: ["Venta de pisos y locales", "Captación de inmuebles", "Valoraciones gratuitas", "Gestión integral de la venta"]
        },
        {
          icon: "scale",
          title: "Asesoría Jurídica",
          desc: "Expertos en derecho inmobiliario, contratos de arrendamiento, herencias y toda la gestión legal que necesite para proteger su patrimonio.",
          features: ["Contratos de arrendamiento", "Tramitación de herencias", "Asesoría legal integral", "Resolución de conflictos"]
        }
      ]
    },
    stats: {
      tag: "Gesgrama en cifras",
      communities: "Comunidades gestionadas",
      sold: "Propiedades vendidas",
      experience: "Años de experiencia",
      satisfied: "Clientes satisfechos"
    },
    nosotros: {
      tag: "Por qué Gesgrama",
      title1: "Experiencia.",
      titleAccent: "Compromiso",
      title3: "y cercanía.",
      items: [
        { icon: "clock", title: "Respuesta en menos de 24h", desc: "Ante cualquier incidencia o consulta, nuestro equipo responde con agilidad y eficacia." },
        { icon: "shield", title: "Transparencia total", desc: "Acceso digital permanente a cuentas, actas y toda la documentación de su comunidad." },
        { icon: "star", title: "+15 años de trayectoria", desc: "Una empresa con sólida experiencia, cartera consolidada y reputación impecable en el sector." },
        { icon: "trending", title: "Optimización de costes", desc: "Revisamos todos los contratos y servicios para que su comunidad pague siempre lo justo." }
      ]
    },
    testimonials: {
      tag: "Historias reales",
      title: "Lo que dicen",
      titleAccent: "nuestros clientes.",
      // TODO: sustituir por testimonios reales del cliente
      items: [
        {
          name: "M. García",
          initials: "MG",
          zone: "Eixample, Barcelona",
          quote: "Llevan nuestra comunidad desde hace 8 años. La transparencia en las cuentas y la rapidez ante cualquier incidencia son simplemente excelentes."
        },
        {
          name: "R. Puig",
          initials: "RP",
          zone: "Sarrià-Sant Gervasi",
          quote: "Vendimos nuestro piso en menos de un mes al precio que pedíamos. Su conocimiento del mercado local es una ventaja real frente a otras agencias."
        },
        {
          name: "A. Martínez",
          initials: "AM",
          zone: "Gràcia, Barcelona",
          quote: "La asesoría jurídica para la herencia fue impecable. Nos guiaron en cada paso con una paciencia y profesionalidad que agradecemos enormemente."
        },
        {
          name: "J. Costa",
          initials: "JC",
          zone: "Sant Antoni, Barcelona",
          quote: "Alquilamos nuestro local comercial en tiempo récord. Gestionan todo: contrato, aval, incidencias. Sin preocupaciones."
        }
      ]
    },
    coverage: {
      tag: "ÁREA DE COBERTURA",
      title: "Trabajamos en toda la provincia de Barcelona",
      subtitle: "Equipo propio en toda el área metropolitana, Maresme, Vallès, Baix Llobregat y Costa Daurada.",
      s1Value: "+300",
      s1Label: "Comunidades atendidas",
      s2Value: "15+",
      s2Label: "Años de experiencia",
      s3Value: "100%",
      s3Label: "Personal propio y certificado",
      s4Value: "24h",
      s4Label: "Respuesta rápida garantizada",
      mapTitle: "Sede Central",
      mapSubtitle: "Av. dels Banús, 49"
    },
    cta: {
      tag: "¿Hablamos?",
      title: "Su comunidad en las mejores manos.",
      findHome: "Ver propiedades en venta",
      contact: "Solicitar asesoramiento gratuito"
    },
    faq: {
      tag: "Preguntas Frecuentes",
      title: "Resolvemos sus dudas",
      items: [
        {
          q: "¿Por qué elegir a Gesgrama para administrar su comunidad?",
          a: "Ofrecemos total transparencia, atención 24h para urgencias y un equipo legal propio que garantiza la máxima seguridad en todas las gestiones."
        },
        {
          q: "¿Es seguro el proceso de cambio de administrador?",
          a: "Totalmente. Nos encargamos del 100% del papeleo y de la transición con el administrador anterior de forma transparente y sin cortes de servicio."
        },
        {
          q: "¿Cuánto tiempo tardan en alquilar o vender una propiedad?",
          a: "Gracias a nuestra amplia cartera de clientes y marketing premium, el tiempo medio de cierre de operaciones es inferior a 45 días."
        },
        {
          q: "¿Qué cobertura legal ofrecen a los propietarios?",
          a: "Contamos con un gabinete jurídico interno especializado en derecho inmobiliario que asesora de forma gratuita a nuestros clientes."
        }
      ]
    },
    contact: {
      tag: "Contacto",
      title1: "¿Hablamos de",
      titleAccent: "tu comunidad?",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Oficinas",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre y apellidos...",
      emailLabel: "Email",
      phoneLabel: "Teléfono",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntanos qué necesita tu finca o qué problemas queréis solucionar...",
      serviceLabel: "Servicio de interés",
      serviceOpts: ["Administración de Fincas", "Inmobiliaria", "Asesoría Jurídica", "Otro"],
      submit: "Solicitar información"
    },
    footer: {
      rights: "© 2026 Gesgrama — Todos los derechos reservados",
      quickLinks: "Navegación",
      contactInfo: "Contacto",
      legal: "Legal",
      privacy: "Privacidad",
      cookies: "Cookies",
      legalNotice: "Aviso Legal"
    }
  },
  en: {
    nav: {
      propiedades: "Real Estate",
      servicios: "Services",
      nosotros: "About",
      contacto: "Contact",
      portal: "Client Portal"
    },
    hero: {
      tag: "Integral management — since 2009",
      title1: "Property Management,",
      title2: "Real Estate &",
      title3: "Legal Advisory.",
      subtitle: "Expert, transparent and close management for your peace of mind.",
      comprar: "Buy",
      alquilar: "Rent",
      zona: "Area",
      tipo: "Type",
      hab: "Beds",
      precio: "Max. price",
      buscarBtn: "Search"
    },
    properties: {
      tag: "Real Estate",
      title: "Flats, premises",
      titleAccent: "and more.",
      subtitle: "Browse our catalogue of properties for sale. Direct management, no middlemen.",
      beds: "beds",
      baths: "baths",
      verTodas: "View all properties"
    },
    valuator: {
      tag: "Free valuation",
      title: "How much is",
      titleAccent: "your property worth?",
      subtitle: "Get a professional valuation with no commitment. An advisor will contact you within 24h.",
      zonaLabel: "Area",
      tipoLabel: "Property type",
      metrosLabel: "Surface area (m²)",
      contactLabel: "Email or phone",
      contactPlaceholder: "We'll send you the valuation here",
      submit: "Request free valuation",
      successTitle: "Request received!",
      successMsg: "Thank you, an advisor will contact you with the valuation within 24h."
    },
    philosophy: {
      tag: "Our philosophy",
      quote: '"Over 15 years managing communities with transparency, closeness and maximum professionalism."'
    },
    services: {
      tag: "What we do",
      title1: "Integral management.",
      titleAccent: "Absolute",
      title3: "peace of mind.",
      cards: [
        {
          icon: "building",
          title: "Property & Community Management",
          desc: "Full management of your community: accounting, meetings, maintenance, incidents and supplier relations.",
          features: ["Transparent accounting", "24h incident management", "Cost optimization", "Meetings and minutes"]
        },
        {
          icon: "home",
          title: "Real Estate",
          desc: "Sale and acquisition of flats, commercial premises and real estate. We help you find qualified buyers.",
          features: ["Sale of flats & premises", "Property acquisition", "Free valuations", "Full sale management"]
        },
        {
          icon: "scale",
          title: "Legal Advisory",
          desc: "Experts in real estate law, lease agreements, inheritances and all the legal management you need.",
          features: ["Lease agreements", "Inheritance management", "Full legal advisory", "Conflict resolution"]
        }
      ]
    },
    stats: {
      tag: "Gesgrama in numbers",
      communities: "Communities managed",
      sold: "Properties sold",
      experience: "Years of experience",
      satisfied: "Satisfied clients"
    },
    nosotros: {
      tag: "Why Gesgrama",
      title1: "Experience.",
      titleAccent: "Commitment",
      title3: "and proximity.",
      items: [
        { icon: "clock", title: "Response in less than 24h", desc: "For any incident or query, our team responds with agility and effectiveness." },
        { icon: "shield", title: "Total transparency", desc: "Permanent digital access to accounts, minutes and all your community's documentation." },
        { icon: "star", title: "+15 years of history", desc: "A company with solid experience, consolidated portfolio and impeccable reputation." },
        { icon: "trending", title: "Cost optimization", desc: "We review all contracts and services so your community always pays the right price." }
      ]
    },
    testimonials: {
      tag: "Real stories",
      title: "What our",
      titleAccent: "clients say.",
      // TODO: replace with real client testimonials
      items: [
        {
          name: "M. García",
          initials: "MG",
          zone: "Eixample, Barcelona",
          quote: "They have been managing our community for 8 years. The transparency in accounts and speed in handling incidents is simply excellent."
        },
        {
          name: "R. Puig",
          initials: "RP",
          zone: "Sarrià-Sant Gervasi",
          quote: "We sold our flat in less than a month at the price we asked. Their knowledge of the local market is a real advantage."
        },
        {
          name: "A. Martínez",
          initials: "AM",
          zone: "Gràcia, Barcelona",
          quote: "The legal advice for the inheritance was impeccable. They guided us every step of the way with patience and professionalism."
        },
        {
          name: "J. Costa",
          initials: "JC",
          zone: "Sant Antoni, Barcelona",
          quote: "We rented out our commercial premises in record time. They handle everything: contract, guarantees, incidents. No worries."
        }
      ]
    },
    coverage: {
      tag: "COVERAGE AREA",
      title: "We work throughout the province of Barcelona",
      subtitle: "Our own team across the metropolitan area, Maresme, Vallès, Baix Llobregat, and Costa Daurada.",
      s1Value: "+300",
      s1Label: "Communities served",
      s2Value: "15+",
      s2Label: "Years of experience",
      s3Value: "100%",
      s3Label: "In-house certified staff",
      s4Value: "24h",
      s4Label: "Fast response guaranteed",
      mapTitle: "Headquarters",
      mapSubtitle: "Av. dels Banús, 49"
    },
    cta: {
      tag: "Let's talk",
      title: "Your community in the best hands.",
      findHome: "View properties for sale",
      contact: "Request free advice"
    },
    faq: {
      tag: "Frequently Asked Questions",
      title: "We answer your questions",
      items: [
        {
          q: "Why choose Gesgrama to manage your community?",
          a: "We offer total transparency, 24/7 emergency attention, and an in-house legal team that guarantees maximum security."
        },
        {
          q: "Is the process of changing administrators safe?",
          a: "Absolutely. We handle 100% of the paperwork and the transition with the previous administrator transparently and without service interruptions."
        },
        {
          q: "How long does it take to rent or sell a property?",
          a: "Thanks to our extensive client portfolio and premium marketing, the average closing time is under 45 days."
        },
        {
          q: "What legal coverage do you offer owners?",
          a: "We have an internal legal department specialized in real estate law that provides free advice to our clients."
        }
      ]
    },
    contact: {
      tag: "Contact",
      title1: "We're here",
      titleAccent: "to help you.",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Offices",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      serviceLabel: "Service of interest",
      serviceOpts: ["Property Management", "Real Estate", "Legal Advisory", "Other"],
      submit: "Send inquiry"
    },
    footer: {
      rights: "© 2026 Gesgrama — All rights reserved",
      quickLinks: "Navigation",
      contactInfo: "Contact",
      legal: "Legal",
      privacy: "Privacy",
      cookies: "Cookies",
      legalNotice: "Legal Notice"
    }
  },
  ca: {
    nav: {
      propiedades: "Immobiliària",
      servicios: "Serveis",
      nosotros: "Nosaltres",
      contacto: "Contacte",
      portal: "Portal de Clients"
    },
    hero: {
      tag: "Gestió integral — des de 2009",
      title1: "Administració de Finques,",
      title2: "Immobiliària i",
      title3: "Assessoria jurídica.",
      subtitle: "Gestió experta, transparent i propera per a la seva tranquil·litat.",
      comprar: "Comprar",
      alquilar: "Llogar",
      zona: "Zona",
      tipo: "Tipus",
      hab: "Hab.",
      precio: "Preu màx.",
      buscarBtn: "Cercar"
    },
    properties: {
      tag: "Immobiliària",
      title: "Pisos, locals",
      titleAccent: "i molt més.",
      subtitle: "Exploreu el nostre catàleg de propietats en venda. Gestió directa, sense intermediaris.",
      beds: "hab.",
      baths: "banys",
      verTodas: "Veure totes les propietats"
    },
    valuator: {
      tag: "Valoració gratuïta",
      title: "Quant val",
      titleAccent: "el teu pis?",
      subtitle: "Rebi una valoració professional sense compromís. Un assessor el contactarà en menys de 24h.",
      zonaLabel: "Zona",
      tipoLabel: "Tipus d'immoble",
      metrosLabel: "Superfície (m²)",
      contactLabel: "Email o telèfon",
      contactPlaceholder: "Per enviar-li la valoració",
      submit: "Sol·licitar valoració gratuïta",
      successTitle: "Sol·licitud rebuda!",
      successMsg: "Gràcies, un assessor el contactarà amb la valoració en menys de 24h."
    },
    philosophy: {
      tag: "La nostra filosofia",
      quote: '"Més de 15 anys gestionant comunitats amb transparència, proximitat i la màxima professionalitat."'
    },
    services: {
      tag: "El que fem",
      title1: "Gestió integral.",
      titleAccent: "Tranquil·litat",
      title3: "absoluta.",
      cards: [
        {
          icon: "building",
          title: "Administració de Finques i Comunitats",
          desc: "Gestió íntegra de la seva comunitat: comptabilitat, convocatòries, manteniment i incidències.",
          features: ["Comptabilitat transparent", "Gestió d'incidències 24h", "Optimització de despeses", "Assemblees i actes"]
        },
        {
          icon: "home",
          title: "Immobiliària",
          desc: "Venda i captació de pisos, locals comercials i immobles. Us ajudem a trobar compradors qualificats.",
          features: ["Venda de pisos i locals", "Captació d'immobles", "Valoracions gratuïtes", "Gestió integral de la venda"]
        },
        {
          icon: "scale",
          title: "Assessoria Jurídica",
          desc: "Experts en dret immobiliari, contractes d'arrendament, herències i tota la gestió legal.",
          features: ["Contractes d'arrendament", "Tramitació d'herències", "Assessoria legal integral", "Resolució de conflictes"]
        }
      ]
    },
    stats: {
      tag: "Gesgrama en xifres",
      communities: "Comunitats gestionades",
      sold: "Propietats venudes",
      experience: "Anys d'experiència",
      satisfied: "Clients satisfets"
    },
    nosotros: {
      tag: "Per què Gesgrama",
      title1: "Experiència.",
      titleAccent: "Compromís",
      title3: "i proximitat.",
      items: [
        { icon: "clock", title: "Resposta en menys de 24h", desc: "Davant qualsevol incidència o consulta, el nostre equip respon amb agilitat i eficàcia." },
        { icon: "shield", title: "Transparència total", desc: "Accés digital permanent als comptes, actes i tota la documentació de la seva comunitat." },
        { icon: "star", title: "+15 anys de trajectòria", desc: "Una empresa amb sòlida experiència, cartera consolidada i reputació impecable al sector." },
        { icon: "trending", title: "Optimització de costos", desc: "Revisem tots els contractes i serveis perquè la seva comunitat sempre pagui el just." }
      ]
    },
    testimonials: {
      tag: "Històries reals",
      title: "El que diuen",
      titleAccent: "els nostres clients.",
      // TODO: substituir per testimonis reals del client
      items: [
        {
          name: "M. García",
          initials: "MG",
          zone: "Eixample, Barcelona",
          quote: "Porten la nostra comunitat des de fa 8 anys. La transparència en els comptes i la rapidesa davant qualsevol incidència són senzillament excel·lents."
        },
        {
          name: "R. Puig",
          initials: "RP",
          zone: "Sarrià-Sant Gervasi",
          quote: "Vàrem vendre el nostre pis en menys d'un mes al preu que demanàvem. El seu coneixement del mercat local és un avantatge real."
        },
        {
          name: "A. Martínez",
          initials: "AM",
          zone: "Gràcia, Barcelona",
          quote: "L'assessoria jurídica per a l'herència va ser impecable. Ens van guiar a cada pas amb una paciència i professionalitat que agraïm moltíssim."
        },
        {
          name: "J. Costa",
          initials: "JC",
          zone: "Sant Antoni, Barcelona",
          quote: "Vàrem llogar el nostre local en temps rècord. Gestionen tot: contracte, aval, incidències. Sense preocupacions."
        }
      ]
    },
    coverage: {
      tag: "ÀREA DE COBERTURA",
      title: "Treballem a tota la província de Barcelona",
      subtitle: "Equip propi a tota l'àrea metropolitana, Maresme, Vallès, Baix Llobregat i Costa Daurada.",
      s1Value: "+300",
      s1Label: "Comunitats ateses",
      s2Value: "15+",
      s2Label: "Anys d'experiència",
      s3Value: "100%",
      s3Label: "Personal propi i certificat",
      s4Value: "24h",
      s4Label: "Resposta ràpida garantida",
      mapTitle: "Àrea Metropolitana",
      mapSubtitle: "Seu: Av. dels Banús, 49"
    },
    cta: {
      tag: "Parlem?",
      title: "La seva comunitat en les millors mans.",
      findHome: "Veure propietats en venda",
      contact: "Sol·licitar assessorament gratuït"
    },
    faq: {
      tag: "Preguntes Freqüents",
      title: "Resolem els seus dubtes",
      items: [
        {
          q: "Per què triar Gesgrama per administrar la seva comunitat?",
          a: "Oferim total transparència, atenció 24h per a urgències i un equip legal propi que garanteix la màxima seguretat."
        },
        {
          q: "És segur el procés de canvi d'administrador?",
          a: "Totalment. Ens encarreguem del 100% de la paperassa i de la transició amb l'administrador anterior de forma transparent i sense talls de servei."
        },
        {
          q: "Quant triguen a llogar o vendre una propietat?",
          a: "Gràcies a la nostra àmplia cartera de clients i màrqueting premium, el temps mitjà de tancament d'operacions és inferior a 45 dies."
        },
        {
          q: "Quina cobertura legal ofereixen als propietaris?",
          a: "Comptem amb un gabinet jurídic intern especialitzat en dret immobiliari que assessora de forma gratuïta als nostres clients."
        }
      ]
    },
    contact: {
      tag: "Contacte",
      title1: "Som aquí",
      titleAccent: "per ajudar-lo.",
      phone: "Telèfon",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Oficines",
      nameLabel: "Nom",
      namePlaceholder: "El seu nom complet",
      emailLabel: "Email",
      phoneLabel: "Telèfon",
      messageLabel: "Missatge",
      messagePlaceholder: "Com podem ajudar-lo?",
      serviceLabel: "Servei d'interès",
      serviceOpts: ["Administració de Finques", "Immobiliària", "Assessoria Jurídica", "Altre"],
      submit: "Enviar consulta"
    },
    footer: {
      rights: "© 2026 Gesgrama — Tots els drets reservats",
      quickLinks: "Navegació",
      contactInfo: "Contacte",
      legal: "Legal",
      privacy: "Privacitat",
      cookies: "Cookies",
      legalNotice: "Avís Legal"
    }
  }
} as const;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2.2,
      ease: easeOut,
      onUpdate: (v) => {
        const rounded = Math.round(v);
        setDisplay(rounded.toLocaleString("es-ES"));
      },
    });
    return () => controls.stop();
  }, [inView, to, mv]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

function StatBlock({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <Reveal className="text-center">
      <div className="text-4xl md:text-6xl font-bold mb-3 text-onyx">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-onyx/40 font-medium">{label}</div>
    </Reveal>
  );
}

function FormField({ label, placeholder, type = "text", textarea }: { label: string; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-onyx font-bold uppercase tracking-wider block mb-2 text-[11px]">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-5 py-4 text-[15px] font-medium text-onyx focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors resize-none placeholder:text-onyx/30"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-5 py-4 text-[15px] font-medium text-onyx focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors placeholder:text-onyx/30"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
const parsePrice = (priceStr: string) => {
  if (priceStr.includes("Cualquier")) return Infinity;
  const cleanStr = priceStr.replace(/[^\d]/g, '');
  return parseInt(cleanStr, 10);
};

const isPriceValid = (priceStr: string, propertyPrice: number) => {
  if (priceStr.includes("Cualquier")) return true;
  if (priceStr.includes("Hasta")) {
    const max = parsePrice(priceStr);
    return propertyPrice <= max;
  }
  if (priceStr.includes("Más de")) {
    const min = parsePrice(priceStr);
    return propertyPrice >= min;
  }
  // Rango: "1.000 - 1.500 €"
  const match = priceStr.match(/(\d[\d.]*)\s*-\s*(\d[\d.]*)/);
  if (match) {
    const min = parseInt(match[1].replace(/[^\d]/g, ''), 10);
    const max = parseInt(match[2].replace(/[^\d]/g, ''), 10);
    return propertyPrice >= min && propertyPrice <= max;
  }
  return true;
};
function Index() {
  useScroll(); // keep for potential future scroll effects

  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");
  const t = translations[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    mode: "comprar",
    zona: "Cualquier zona",
    tipo: "Cualquier tipo",
    precio: "Cualquier precio",
    habitaciones: "Cualquier número"
  });

  const [consoleFilters, setConsoleFilters] = useState({
    tipo: "Cualquier tipo",
    zona: "Cualquier zona",
    habitaciones: "Cualquier número",
    precio: "Cualquier precio"
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setConsoleFilters({
      tipo: searchParams.tipo,
      zona: searchParams.zona,
      habitaciones: searchParams.habitaciones || "Cualquier número",
      precio: searchParams.precio
    });
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleHeroSearch = (params: { mode: any; zona: string; tipo: string; precio: string }) => {
    setSearchParams({
      mode: params.mode,
      zona: params.zona,
      tipo: params.tipo,
      precio: params.precio,
      habitaciones: "Cualquier número"
    });
  };

  // Valuator form state
  const [valuatorSubmitted, setValuatorSubmitted] = useState(false);
  const [valuatorData, setValuatorData] = useState({
    zona: "",
    tipo: "",
    metros: "",
    contacto: ""
  });
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mapInteractive, setMapInteractive] = useState(false);
  const iconMap: Record<string, React.ReactNode> = {
    building: <Building2 className="w-7 h-7" />,
    home: <Home className="w-7 h-7" />,
    scale: <Scale className="w-7 h-7" />,
    clock: <Clock className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />
  };

  const zonas = ["Eixample", "Gràcia", "Sarrià-Sant Gervasi", "Sant Antoni", "Pedralbes", "Santa Coloma de Gramenet", "Badalona", "Hospitalet de Llobregat", "Maresme"];
  const tipos = ["Piso", "Ático", "Chalet", "Local comercial", "Oficina"];

  // Filter properties
  const filteredProperties = properties
    .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
    .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
    .filter(p => p.operation === searchParams.mode)
    .filter(p => isPriceValid(searchParams.precio, p.price))
    .filter(p => {
      if (searchParams.habitaciones === 'Cualquier número' || !searchParams.habitaciones) return true;
      const minHabs = parseInt(searchParams.habitaciones.replace("+", ""), 10);
      return p.bedrooms >= minHabs;
    });

  let displayProperties = filteredProperties;
  let isFallback = false;

  if (filteredProperties.length === 0) {
    isFallback = true;
    let similarProperties = properties
      .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
      .filter(p => p.operation === searchParams.mode);

    if (similarProperties.length === 0) {
      similarProperties = properties
        .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
        .filter(p => p.operation === searchParams.mode);
    }

    if (similarProperties.length === 0) {
      similarProperties = properties.filter(p => p.operation === searchParams.mode);
    }
    displayProperties = similarProperties.slice(0, 3);
  }

  return (
    <div className="bg-white text-onyx font-sans selection:bg-primary-blue/20 overflow-x-clip">

{/* ── NAVIGATION (DARK PILL MOCKUP) ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-[96%] max-w-[1400px] z-[100] flex items-center justify-between py-3 md:py-4 px-6 md:px-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <a href="#" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2 -my-4 md:-my-6">
          <img src={logoImg} alt="Gesgrama" className="h-16 md:h-20 lg:h-[5.5rem] w-auto object-contain" />
        </a>

        <div className="hidden lg:flex items-center gap-10 text-[13px] md:text-[14px] font-bold text-white tracking-widest uppercase">
          <a href="#propiedades" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="#servicios" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="#nosotros" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.nosotros}</a>
          <a href="#contacto" className="hover:text-[#0082c8] transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-3 lg:gap-6 shrink-0 pr-1">
          <div className="flex items-center bg-[#0b1221]/60 border border-white/10 rounded-full p-1 md:p-1.5 text-[10px] md:text-[12px] font-bold shadow-inner">
            {(["es", "ca", "en"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => setLanguage(lang)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-200 ${language === lang ? 'bg-[#2563eb] text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
                >
                  {lang.toUpperCase()}
                </button>
                {idx < 2 && <div className="w-px h-3 bg-white/10 mx-0.5"></div>}
              </div>
            ))}
          </div>
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-2 bg-[#005c99] text-white hover:bg-[#004b7a] px-6 md:px-8 py-3.5 md:py-3.5 rounded-full text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            {t.nav.portal}
          </a>
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 bg-[#151f32] rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col gap-4 z-50 lg:hidden"
            >
              <a href="#propiedades" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.propiedades}</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.servicios}</a>
              <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.nosotros}</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#0082c8]">{t.nav.contacto}</a>
              <a href="#contacto" className="mt-4 text-center bg-[#005c99] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {t.nav.portal}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <HeroCarousel onPerformSearch={handleHeroSearch} />

      {/* ── VALORADOR DE INMUEBLES (PREMIUM SPLIT DESIGN) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-white text-onyx">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px] xl:min-h-[700px]">
          
          {/* LEFT COLUMN: White Background, Editorial Valuator Form */}
          <div className="bg-white px-6 md:px-12 lg:px-20 py-20 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#f1f5f9] text-[#005c99] text-[11px] font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-full mb-6 w-fit">
              <span>🛡</span> Valoración 100% gratuita y sin compromiso
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-6 leading-[1.15] tracking-tight" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
              ¿Cuánto vale <span className="text-[#005c99]">tu piso</span>?
            </h2>

            <p className="text-slate-500 text-base md:text-[15.5px] max-w-[400px] mb-8 leading-relaxed font-medium">
              Obtén una valoración profesional y precisa de tu vivienda en menos de 1 minuto.
            </p>

            <div className="w-full">
              {valuatorSubmitted ? (
                <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 max-w-lg shadow-sm">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-bold text-2xl text-[#0f172a] mb-2">{t.valuator.successTitle}</h3>
                  <p className="text-slate-500 mb-8">{t.valuator.successMsg}</p>
                  <button 
                    onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }} 
                    className="bg-[#005c99] hover:bg-[#004b7a] text-white font-bold text-xs px-6 py-3 rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Nueva valoración
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-lg">
                  <div className="flex gap-3.5 mb-5">
                    {/* Select Zona */}
                    <div className="flex-1 bg-[#f1f5f9] border border-slate-200/80 rounded-[10px] p-4 py-3 flex items-center justify-between relative hover:border-[#005c99]/50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3.5 w-full">
                        <MapPin className="w-5 h-5 text-[#005c99] shrink-0" />
                        <div className="flex flex-col flex-1">
                          <label className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.05em] leading-none mb-1 font-sans">Zona</label>
                          <select
                            value={valuatorData.zona}
                            onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                            className="w-full bg-transparent border-0 p-0 text-[14px] font-semibold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                          >
                            <option value="" disabled hidden>Selecciona tu zona</option>
                            {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                          </select>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>

                    {/* Input Superficie */}
                    <div className="flex-1 bg-[#f1f5f9] border border-slate-200/80 rounded-[10px] p-4 py-3 flex items-center gap-3.5 hover:border-[#005c99]/50 transition-colors group">
                      <div className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center shrink-0 text-[#005c99] font-bold text-[10px] font-sans">
                        ▦
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.05em] leading-none mb-1 font-sans">Superficie</label>
                        <input
                          type="text"
                          placeholder="Ej: 80 m²"
                          value={valuatorData.metros}
                          onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-[14px] font-semibold text-[#0f172a] focus:ring-0 outline-none placeholder:text-slate-400 font-sans"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                    className="w-full bg-[#005c99] hover:bg-[#0b1221] text-white font-bold text-sm h-[54px] rounded-[10px] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>🏷</span> Solicitar valoración gratuita
                  </button>

                  <div className="flex flex-wrap items-center gap-6 mt-6 text-slate-500 text-[12.5px] font-sans">
                    <span className="flex items-center gap-1.5">
                      <span>🔒</span> Sin compromiso
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span>⏱</span> Resultado rápido
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span>🛡</span> Datos 100% seguros
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Navy Background with grid pattern and result mockup */}
          <div className="bg-[#0b1221] text-white relative overflow-hidden px-6 md:px-12 py-20 flex flex-col items-center justify-center min-h-[480px] lg:min-h-full">
            
            {/* Top visual gradient transition (120px) to smooth boundary with hero */}
            <div 
              className="absolute top-0 left-0 w-full h-[120px] pointer-events-none z-10" 
              style={{ background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 50%, #0b1221 100%)" }}
            />

            {/* Geometric pattern */}
            <div 
              className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
              style={{
                backgroundImage: "linear-gradient(rgba(63,182,232,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(63,182,232,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }}
            />

            {/* Radial glow */}
            <div 
              className="absolute pointer-events-none rounded-full z-0"
              style={{
                width: "420px",
                height: "420px",
                background: "radial-gradient(circle, rgba(63,182,232,0.18), transparent 70%)",
                top: "-100px",
                right: "-100px"
              }}
            />

            {/* Central Result Card (Fintech/Serious style) */}
            <div className="relative z-10 w-full max-w-[340px]">
              <div className="bg-[#1e293b] border border-sky-400/25 rounded-[18px] p-8 md:px-10 md:py-9 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
                <div className="text-[11.5px] text-[#9FB3CC] font-bold uppercase tracking-[0.06em] mb-2 font-sans">Valor estimado</div>
                <div className="text-[38px] font-black text-white mb-5 leading-none tracking-tight" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                  245.000<span className="text-sky-400">€</span>
                </div>
                
                <div className="text-[13px] text-[#9FB3CC] font-medium font-sans">
                  Rango estimado: <strong className="text-white">230.000€ – 260.000€</strong>
                </div>
                
                {/* Mini Bar Chart */}
                <div className="flex items-end gap-1.5 h-12 mt-6">
                  <div className="flex-1 bg-[#005c99] rounded-t opacity-85 h-[40%]"></div>
                  <div className="flex-1 bg-[#005c99] rounded-t opacity-85 h-[60%]"></div>
                  <div className="flex-1 bg-[#005c99] rounded-t opacity-85 h-[50%]"></div>
                  <div className="flex-1 bg-[#005c99] rounded-t opacity-85 h-[80%]"></div>
                  <div className="flex-1 bg-[#005c99] rounded-t opacity-85 h-[65%]"></div>
                  <div className="flex-1 bg-sky-400 rounded-t opacity-100 h-full"></div>
                </div>

                <div className="text-[11px] text-[#64748b] text-right mt-4 font-bold font-sans">Actualizado: hoy</div>
              </div>
            </div>

            {/* Floating Social Proof Badge */}
            <div className="absolute bottom-8 left-8 z-10 bg-white/5 border border-white/12 backdrop-blur-md rounded-xl p-3 px-4 flex items-center gap-3 text-[12.5px] text-white">
              <div className="flex -space-x-2 shrink-0">
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1221] object-cover" src="https://i.pravatar.cc/100?img=11" alt="Usuario" />
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1221] object-cover" src="https://i.pravatar.cc/100?img=12" alt="Usuario" />
                <img className="w-6 h-6 rounded-full border-2 border-[#0b1221] object-cover" src="https://i.pravatar.cc/100?img=33" alt="Usuario" />
              </div>
              <span className="font-semibold text-white/90 font-sans">+4.500 propietarios ya lo usaron</span>
            </div>

          </div>

        </div>
      </section>
{/* ── PROPERTIES SECTION (NEW DESIGN) ── */}
      <section id="propiedades" className="py-24 md:py-32 px-6 md:px-12 bg-[#fafcff] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-[11px] md:text-xs uppercase text-[#005c99] font-bold mb-4 tracking-widest">{t.properties.tag}</p>
                <h2 key={language} className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] text-onyx tracking-tight mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                  {t.properties.title} <br className="hidden md:block" />
                  <span className="text-[#005c99]">{t.properties.titleAccent}</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                  {t.properties.subtitle}
                </p>
              </div>
              
              {/* Stat Card */}
              <div className="flex items-center gap-5 bg-slate-100 border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-2xl p-6 md:pr-10 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Home className="w-8 h-8 text-[#005c99]" />
                </div>
                <div>
                  <p className="text-4xl font-black text-[#005c99] mb-1">{filteredProperties.length}</p>
                  <p className="text-xs md:text-sm text-onyx font-bold leading-tight">Propiedades<br/>disponibles</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FILTERS */}
          {/* SINGLE SEARCH CONSOLE (4 FIELDS + BUSCAR BUTTON) */}
          <div className="mt-8 mb-4">
            <div className="bg-white border-[1.5px] border-slate-200 rounded-[16px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-4 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 relative z-40">
              
              {/* Field 1: Tipo de Inmueble */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "tipo" ? null : "tipo")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-[#005c99]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">Tipo de Inmueble</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.tipo}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: "Cualquier tipo", value: "Cualquier tipo" },
                      { label: "Piso", value: "Piso" },
                      { label: "Ático", value: "Ático" },
                      { label: "Local comercial", value: "Local comercial" },
                      { label: "Chalet", value: "Chalet" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesTipo = opt.value === "Cualquier tipo" ? true : p.type === opt.value;
                        return matchesMode && matchesTipo;
                      }).length;

                      const isActive = consoleFilters.tipo === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, tipo: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer font-sans ${
                            isActive ? "bg-[#005c99] text-white" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 2: Zona */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "zona" ? null : "zona")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#005c99]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">Zona</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.zona}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: "Cualquier zona", value: "Cualquier zona" },
                      ...[...new Set(properties.map(p => p.location))].map(loc => ({ label: loc, value: loc }))
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        const matchesZona = opt.value === "Cualquier zona" ? true : p.location === opt.value;
                        return matchesMode && matchesZona;
                      }).length;

                      const isActive = consoleFilters.zona === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, zona: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer font-sans ${
                            isActive ? "bg-[#005c99] text-white" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 3: Habitaciones */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "habitaciones" ? null : "habitaciones")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4 text-[#005c99]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">Habitaciones</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.habitaciones}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "habitaciones" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: "Cualquier número", value: "Cualquier número" },
                      { label: "1+ habitaciones", value: "1+" },
                      { label: "2+ habitaciones", value: "2+" },
                      { label: "3+ habitaciones", value: "3+" },
                      { label: "4+ habitaciones", value: "4+" }
                    ].map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        if (opt.value === "Cualquier número") return true;
                        const min = parseInt(opt.value.replace("+", ""), 10);
                        return p.bedrooms >= min;
                      }).length;

                      const isActive = consoleFilters.habitaciones === opt.value;

                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, habitaciones: opt.value }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer font-sans ${
                            isActive ? "bg-[#005c99] text-white" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-slate-200 shrink-0"></div>

              {/* Field 4: Precio Máximo */}
              <div className="flex-1 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => setOpenDropdown(openDropdown === "precio" ? null : "precio")}
                  className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#005c99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">Precio Máximo</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.precio}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {(searchParams.mode === "alquilar" 
                      ? ["Cualquier precio", "Hasta 1.500 €", "Hasta 2.000 €", "Hasta 3.000 €"]
                      : ["Cualquier precio", "Hasta 500.000 €", "Hasta 1.000.000 €", "Hasta 2.000.000 €"]
                    ).map(opt => {
                      const count = properties.filter(p => {
                        const matchesMode = p.operation === searchParams.mode;
                        if (!matchesMode) return false;
                        return isPriceValid(opt, p.price);
                      }).length;

                      const isActive = consoleFilters.precio === opt;

                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setConsoleFilters(prev => ({ ...prev, precio: opt }));
                            setOpenDropdown(null);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer font-sans ${
                            isActive ? "bg-[#005c99] text-white" : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span>{opt}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Buscar Button */}
              <button 
                onClick={() => {
                  setSearchParams(prev => ({
                    ...prev,
                    tipo: consoleFilters.tipo,
                    zona: consoleFilters.zona,
                    habitaciones: consoleFilters.habitaciones,
                    precio: consoleFilters.precio
                  }));
                }}
                className="bg-[#0b1221] hover:bg-[#1b263b] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shrink-0 cursor-pointer font-sans"
              >
                Buscar
              </button>
            </div>

            {/* Quick access chips for zones */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2 font-sans">Zonas populares:</span>
              {[
                { label: "Todas las zonas", value: "Cualquier zona" },
                ...[...new Set(properties.map(p => p.location))].map(loc => ({ label: loc, value: loc }))
              ].map(item => {
                const isActive = searchParams.zona === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => {
                      setConsoleFilters(p => ({ ...p, zona: item.value }));
                      setSearchParams(p => ({ ...p, zona: item.value }));
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer font-sans ${
                      isActive 
                        ? "bg-[#005c99] text-white border-transparent shadow-sm" 
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
{/* Results Count & Sort */}
          {(() => {


            const renderPropertyCard = (property: any, idx: number) => (
              <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: easeOut }}
                  className="group bg-white rounded-2xl flex flex-col h-full border border-slate-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
                >
                  {/* Image Block */}
                  <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-slate-100">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-onyx hover:text-red-500 hover:scale-110 transition-all cursor-pointer shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Visual accent next to the price */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[3px] h-6 bg-[#005c99] rounded-full shrink-0"></div>
                      <div className="text-[26px] font-black text-[#005c99] leading-none tracking-tight">
                        {new Intl.NumberFormat('es-ES').format(property.price)}€
                      </div>
                    </div>
                    
                    {/* Soft colored type badge */}
                    <div className="mb-3.5">
                      {(() => {
                        const type = property.type || "Piso";
                        let badgeClass = "bg-[#005c99]/10 text-[#005c99]";
                        if (type === "Ático") {
                          badgeClass = "bg-sky-100 text-sky-800";
                        } else if (type === "Chalet") {
                          badgeClass = "bg-indigo-100 text-indigo-900";
                        } else if (type === "Local comercial") {
                          badgeClass = "bg-emerald-100 text-emerald-900";
                        } else if (type === "Oficina") {
                          badgeClass = "bg-amber-100 text-amber-900";
                        }
                        return (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${badgeClass}`}>
                            {type}
                          </span>
                        );
                      })()}
                    </div>

                    <h3 className="text-base font-bold text-onyx mb-1.5">{property.name}</h3>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mb-6">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      {property.location}
                    </p>

                    {/* Features Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-onyx">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        {property.bedrooms > 0 ? property.bedrooms : "2"}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        {property.bathrooms > 0 ? property.bathrooms : "1"}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        {property.surface} m²
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );

            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60">
                  <p className="text-sm font-bold text-slate-500">
                    <strong className="text-[#005c99]">{filteredProperties.length}</strong> propiedades disponibles
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 font-bold">Ordenar por:</span>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-onyx hover:bg-slate-50 transition-colors shadow-sm">
                      Más recientes <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {isFallback && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-amber-800 text-sm font-medium">
                    No hemos encontrado inmuebles con esos filtros exactos. Aquí tienes algunas propiedades destacadas que podrían interesarte.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                  {displayProperties.map((prop, idx) => renderPropertyCard(prop, idx))}
                </div>
              </>
            );
          })()}

          {/* CTA Footer */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center mt-12 pt-12 border-t border-slate-200/60">
              <a href="#contacto" className="bg-[#005c99] hover:bg-[#004b7a] text-white px-8 py-4 rounded-xl font-bold text-sm transition-transform shadow-xl shadow-[#005c99]/20 flex items-center justify-center gap-2 group w-full sm:w-auto hover:scale-105 mb-4">
                {t.properties.verTodas}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-sm text-slate-500 font-bold">O explora nuestro catálogo completo</p>
            </div>
          </Reveal>
        </div>
      </section>
{/* ── SERVICES SECTION (NEW DARK GRID MOCKUP) ── */}
      <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 bg-[#080d1a] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <div className="inline-block mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0082c8] border border-[#0082c8]/30 px-5 py-2 rounded-full">
                  Áreas de Experiencia
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Nuestros <span className="text-[#0082c8]">Servicios</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Soluciones integrales para transformar espacios y maximizar su valor.
              </p>
            </Reveal>
          </div>

          {/* Grid de 4 tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { 
                icon: <Building2 className="w-5 h-5" />, 
                label: "Comunidades", 
                desc: "Gestión integral de comunidades con transparencia y eficiencia.",
                bg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
              },
              { 
                icon: <TrendingUp className="w-5 h-5" />, 
                label: "Inversión", 
                desc: "Asesoramiento estratégico para inversiones inmobiliarias seguras.",
                bg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                icon: <Shield className="w-5 h-5" />, 
                label: "Gestión Patrimonial", 
                desc: "Protegemos y optimizamos su patrimonio inmobiliario a largo plazo.",
                bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
              },
              { 
                icon: <Paintbrush className="w-5 h-5" />, 
                label: "Reformas", 
                desc: "Transformamos espacios con diseño, calidad y funcionalidad.",
                bg: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative h-[480px] w-full rounded-3xl overflow-hidden cursor-pointer border border-[#151f32] bg-[#0b1221] transition-all duration-500 hover:border-[#0082c8]/50 hover:shadow-[0_0_30px_rgba(0,130,200,0.1)] flex flex-col">
                  {/* Mitad superior: Imagen */}
                  <div className="relative h-[60%] w-full overflow-hidden">
                    <img src={item.bg} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1221]" />
                  </div>
                  
                  {/* Icono circular superpuesto */}
                  <div className="absolute top-[60%] left-6 -translate-y-1/2 w-14 h-14 rounded-full bg-[#0b1221] border border-[#005c99]/50 flex items-center justify-center text-white z-10 shadow-lg group-hover:bg-[#005c99] transition-colors duration-300">
                    {item.icon}
                  </div>

                  {/* Mitad inferior: Contenido */}
                  <div className="flex-1 flex flex-col justify-end p-8 pt-10">
                    <h3 className="text-[22px] font-bold text-white mb-3">
                      {item.label}
                    </h3>
                    <p className="text-[14px] font-medium text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    <div className="mt-auto">
                      <ArrowRight className="w-6 h-6 text-[#005c99] group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>


{/* ── NOSOTROS / WHY US (NEW MOCKUP) ── */}
      <section id="nosotros" className="py-28 md:py-36 px-6 md:px-12 bg-[#0b1221] text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12 lg:gap-16">
          <Reveal>
            <div className="max-w-3xl">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0082c8] mb-4">
                  Por qué Gesgrama
                </p>
                <div className="w-12 h-0.5 bg-[#0082c8]"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white mb-8" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Experiencia.<br/>
                Compromiso y<br/>
                <span className="text-[#0082c8]">cercanía.</span>
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                Más de 15 años ayudando a comunidades a funcionar mejor, con transparencia y un trato cercano.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              
              {/* Card 1 */}
              <div className="bg-[#151f32] border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-[#0082c8]/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#005c99] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  {/* Shield Check SVG */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">Experiencia que aporta valor</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Más de 15 años gestionando comunidades con éxito.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#151f32] border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-[#0082c8]/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#005c99] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  {/* Users SVG */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">Compromiso real</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Estamos a tu lado, resolviendo lo que realmente importa.
                  </p>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <Reveal>
            <div className="mb-20 text-center">
              <p className="text-sm md:text-base uppercase tracking-[0.4em] text-primary-blue font-black mb-6">{t.testimonials.tag}</p>
              <h2 key={language} className="text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-tight text-onyx tracking-tighter" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                {t.testimonials.title} <span className="text-primary-blue">{t.testimonials.titleAccent}</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.testimonials.items.map((item, i) => {
              const avatars = [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              ];
              return (
                <Reveal key={item.name} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-10 flex flex-col items-center text-center h-full border border-slate-100 shadow-md transition-all duration-300 hover:-translate-y-1">
                    {/* Estrellas */}
                    <div className="flex justify-center gap-1.5 mb-8">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-6 h-6 fill-[#005c99] text-[#005c99]" />
                      ))}
                    </div>
                    
                    {/* Cita */}
                    <p className="text-onyx/80 text-[17px] leading-relaxed italic flex-1 mb-10 font-medium">"{item.quote}"</p>
                    
                    {/* Autor */}
                    <div className="flex flex-col items-center gap-4 mt-auto">
                      <img src={avatars[i % avatars.length]} alt={item.name} className="w-16 h-16 rounded-full object-cover border border-slate-100 shrink-0" />
                      <div>
                        <div className="font-bold text-lg text-onyx mb-1">{item.name}</div>
                        <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{item.zone}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

{/* ── COVERAGE AREA (NEW MOCKUP) ── */}
      <section 
        id="cobertura" 
        className="py-24 md:py-32 px-6 md:px-12 text-onyx overflow-hidden"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <Reveal>
              <div className="mb-6">
                <span className="text-[11px] text-[#005c99] font-bold tracking-[0.2em] uppercase">
                  Área de Cobertura
                </span>
              </div>
              <h2 className="text-5xl md:text-[4rem] font-bold leading-[1.1] tracking-tight text-onyx mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Trabajamos en<br/>toda la provincia<br/>de <span className="text-[#005c99]">Barcelona</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-12">
                Equipo propio en toda el área metropolitana, Maresme, Vallès, Baix Llobregat y Costa Daurada.
              </p>
            </Reveal>

            {/* CTA Box */}
            <Reveal delay={0.1} className="w-full max-w-2xl">
              <div className="bg-[#005c99] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#004b7a] to-transparent opacity-50"></div>
                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-[#005c99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">¿Necesitas ayuda?</h4>
                    <p className="text-white/80 text-sm">Contacta con nosotros sin compromiso</p>
                  </div>
                </div>
                <a href="#contacto" className="w-full md:w-auto bg-white hover:bg-slate-50 text-[#005c99] font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0 relative z-10 group">
                  Contactar ahora
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT CONTENT (MAP WITH ZOOM OVERLAY & NO TOP-LEFT FLOATING CARD) */}
          <div 
            className="w-full lg:w-1/2 relative h-[600px] md:h-[750px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-4 border-white bg-slate-100 group"
            onMouseLeave={() => setMapInteractive(false)}
          >
            <Reveal delay={0.2} className="w-full h-full">
              {/* Original Google Map iframe with subtle styling and dynamic pointer-events */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[110%] opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 ${mapInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
              ></iframe>

              {/* Custom Overlay to block wheel scroll hijack unless clicked */}
              {!mapInteractive && (
                <div 
                  className="absolute inset-0 bg-black/0 cursor-pointer z-20 flex items-center justify-center group/overlay"
                  onClick={() => setMapInteractive(true)}
                >
                  <div className="bg-[#0b1221]/90 text-white text-xs font-bold px-5 py-3 rounded-full shadow-lg border border-white/10 opacity-0 group-hover/overlay:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Haz clic para interactuar con el mapa
                  </div>
                </div>
              )}

              {/* Light blue overlay to match the mockup tint slightly, without hiding map details */}
              <div className="absolute inset-0 bg-[#0082c8]/[0.03] pointer-events-none mix-blend-color"></div>

              {/* Dotted Circle Overlay for Coverage Area */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border-2 border-dashed border-[#0082c8]/40 bg-[#0082c8]/5 pointer-events-none z-10 flex items-center justify-center">
                 <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-[#0082c8]/10"></div>
              </div>

              {/* Floating Card Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-10 right-6 md:bottom-12 md:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 z-30 min-w-[240px] pointer-events-auto"
              >
                <div className="w-8 h-8 rounded-full bg-[#0082c8]/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-[#0082c8]" />
                </div>
                <div>
                  <h4 className="font-bold text-onyx text-base mb-1">Sede Central</h4>
                  <p className="text-slate-500 text-sm mb-3">Av. dels Banús, 49</p>
                  <a href="tel:+34934885858" className="inline-flex items-center gap-2 text-[#0082c8] font-bold hover:text-[#005c99] transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    934 885 858
                  </a>
                </div>
              </motion.div>

            </Reveal>
          </div>
        </div>
      </section>
{/* ── CTA (SPLIT LAYOUT) ── */}
      <section className="bg-[#0b1221] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[600px] xl:min-h-[700px]">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-6 md:px-12 py-20 lg:py-24 flex flex-col justify-center">
            <Reveal>
              <div className="mb-8">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#0082c8] mb-4">
                  Administración de Fincas en Barcelona
                </p>
                <div className="w-12 h-0.5 bg-[#0082c8]"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl xl:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-white mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Su comunidad,<br/>
                en las <span className="text-[#0082c8]">mejores</span> manos.
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-md mb-10 font-medium">
                Gestión profesional, transparente y cercana para comunidades que funcionan.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-16">
                <a href="#propiedades" className="bg-[#005c99] hover:bg-[#004b7a] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 group w-full sm:w-auto">
                  Ver propiedades en venta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contacto" className="text-white font-bold text-sm border-b border-white pb-0.5 hover:text-[#0082c8] hover:border-[#0082c8] transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center sm:justify-start">
                  Hablar con un asesor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Stats Grid */}
              <div className="flex items-stretch gap-6 md:gap-10">
                {/* Stat 1 */}
                <div className="flex flex-col">
                  <div className="text-[#0082c8] mb-3">
                    <Building2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">300+</p>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-tight max-w-[100px]">Comunidades gestionadas</p>
                </div>
                
                {/* Divider */}
                <div className="w-px bg-white/10"></div>

                {/* Stat 2 */}
                <div className="flex flex-col">
                  <div className="text-[#0082c8] mb-3">
                    <Shield className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">15+</p>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-tight max-w-[100px]">Años de experiencia</p>
                </div>

                {/* Divider */}
                <div className="w-px bg-white/10"></div>

                {/* Stat 3 */}
                <div className="flex flex-col">
                  <div className="text-[#0082c8] mb-3">
                    {/* Inline Smiley Face SVG */}
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">98%</p>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-tight max-w-[100px]">Índice de satisfacción</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image with navy gradient */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <Reveal delay={0.2} className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Edificio residencial moderno" 
                className="absolute inset-0 w-full h-full object-cover object-center" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1221] to-transparent w-32 hidden lg:block"></div>
            </Reveal>
          </div>

        </div>
      </section>
{/* ── ÚLTIMAS NOTICIAS (BLOG) ── */}
      <section id="blog" className="py-24 md:py-32 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-onyx">Últimas Noticias</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                date: "marzo 9, 2025", category: "Inmobiliaria",
                title: "¿Qué es un asesor inmobiliario y por qué podrías necesitarlo?",
                desc: "El mercado inmobiliario puede ser complejo y desafiante, ya sea para comprar, vender o alquilar una...",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                date: "febrero 20, 2025", category: "Inmobiliaria",
                title: "¿Qué es un contrato de exclusividad inmobiliaria?",
                desc: "El contrato de exclusividad inmobiliaria es un acuerdo entre un propietario y una agencia...",
                img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                date: "febrero 6, 2025", category: "Inmobiliaria",
                title: "¿Qué es un perito judicial inmobiliario?",
                desc: "Un perito judicial inmobiliario es un profesional especializado en la valoración y análisis...",
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                date: "enero 23, 2025", category: "Inmobiliaria",
                title: "Descubre todo sobre una vivienda de obra nueva",
                desc: "Una obra nueva es un tema crucial para aquellos interesados en el mercado inmobiliario, ya sea para...",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              }
            ].map((post, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white flex flex-col h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 bg-onyx/80 p-1.5 rounded text-white backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-onyx/50 font-medium mb-3">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1.5 text-primary-blue"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg> {post.category}</span>
                    </div>
                    <h3 className="font-semibold text-onyx leading-snug mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-onyx/60 leading-relaxed mb-6 line-clamp-3">{post.desc}</p>
                    <div className="mt-auto">
                      <a href="#" className="text-primary-blue text-[11px] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        sigue leyendo <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section 
        id="faq" 
        className="py-24 md:py-32 px-6 md:px-12 text-onyx"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] uppercase tracking-wide text-[#0082c8] font-bold mb-4">{t.faq.tag}</p>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-onyx tracking-tight">
                {t.faq.title}
              </h2>
            </div>
          </Reveal>

          <div className="w-full flex flex-col gap-4">
            {t.faq.items.map((item, i) => {
              const isActive = activeFaq === i;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div 
                    onClick={() => setActiveFaq(isActive ? null : i)}
                    className="cursor-pointer bg-white border border-slate-200 rounded-3xl p-6 md:px-8 md:py-7 transition-all duration-300 hover:border-slate-300 group"
                  >
                    <div className="flex justify-between items-center gap-6">
                      <h3 className="font-bold text-onyx text-lg md:text-xl pr-4">{item.q}</h3>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-[#0082c8] text-white' : 'bg-slate-100 text-onyx'}`}>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-90' : 'rotate-0'}`} />
                      </div>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-slate-600 leading-relaxed font-medium">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.contact.tag}</p>
              {/* PUNTO 1: Tipografía serif eliminada */}
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight mb-12">
                {t.contact.title1} <br />
                <span className="text-primary-blue font-bold">{t.contact.titleAccent}</span>
              </h2>
              <div className="space-y-6">
                {/* TODO: sustituir por el teléfono real del cliente */}
                <a href="tel:+34934685656" className="flex items-center gap-4 group p-4 border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.phone}</div>
                    {/* TODO: sustituir por el teléfono real del cliente */}
                    <div className="font-semibold text-onyx">934 685 656</div>
                  </div>
                </a>
                {/* TODO: sustituir por el WhatsApp real del cliente */}
                <a href="https://wa.me/34600000000" className="flex items-center gap-4 group p-4 border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.whatsapp}</div>
                    {/* TODO: sustituir por el WhatsApp real del cliente */}
                    <div className="font-semibold text-onyx">+34 600 000 000</div>
                  </div>
                </a>
                {/* TODO: sustituir por el email real del cliente */}
                <a href="mailto:info@gesgrama.com" className="flex items-center gap-4 group p-4 border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.email}</div>
                    {/* TODO: sustituir por el email real del cliente */}
                    <div className="font-semibold text-onyx">info@gesgrama.com</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-xl shadow-md">
                <h3 className="font-black text-3xl md:text-4xl text-onyx mb-10 tracking-tighter leading-tight">Solicite información sin compromiso</h3>
                <form key={language} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label={t.contact.nameLabel} placeholder={t.contact.namePlaceholder} />
                    <FormField label={t.contact.phoneLabel} placeholder={language === 'es' ? "Ej: 600 000 000" : "+34"} />
                  </div>
                  <FormField label={t.contact.emailLabel} type="email" placeholder={language === 'es' ? "tu-correo@ejemplo.com" : "correo@email.com"} />
                  <div>
                    <label className="text-onyx font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contact.serviceLabel}</label>
                    <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-5 py-4 text-[15px] font-medium text-onyx focus:border-[#0082c8] focus:ring-1 focus:ring-[#0082c8] outline-none transition-colors">
                      {t.contact.serviceOpts.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <FormField label={t.contact.messageLabel} placeholder={t.contact.messagePlaceholder} textarea />
                  <button
                    type="button"
                    className="w-full bg-[#0082c8] text-white py-5 mt-6 rounded-lg text-[16px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#0070ab]"
                  >
                    {t.contact.submit}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

{/* ── FOOTER GSAP ── */}
      <footer className="bg-[#0b1221] text-slate-300 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-0 flex flex-col lg:flex-row gap-12 relative">
          
          {/* Text Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8">
            {/* Logo + tagline */}
            <div className="lg:col-span-1">
              <img src={logoImg} alt="Gesgrama" className="h-12 w-auto object-contain opacity-100 mb-4" />
              <p className="text-[13px] leading-relaxed text-slate-300 max-w-[200px]">
                Administración de Fincas, Inmobiliaria y Asesoría Jurídica en el área de Barcelona desde 2009.
              </p>
            </div>

            {/* Navegación rápida */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {[
                  { label: t.nav.propiedades, href: "#propiedades" },
                  { label: t.nav.servicios, href: "#servicios" },
                  { label: t.nav.nosotros, href: "#nosotros" },
                  { label: t.nav.contacto, href: "#contacto" },
                ].map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[14px] text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-blue group-hover:scale-150 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.contactInfo}</h4>
              <ul className="space-y-3 text-[14px] text-slate-300">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                  <span>Av. dels Banús, 49<br />08923 Santa Coloma de Gramenet</span>
                </li>
                <li>
                  <a href="tel:+34934685656" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-primary-blue shrink-0" />
                    934 685 656
                  </a>
                </li>
                <li>
                  <a href="mailto:info@gesgrama.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-primary-blue shrink-0" />
                    info@gesgrama.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-5">{t.footer.legal}</h4>
              <ul className="space-y-3">
                {[
                  { label: t.footer.legalNotice, href: "#" },
                  { label: t.footer.privacy, href: "#" },
                  { label: t.footer.cookies, href: "#" },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-blue group-hover:scale-150 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Animation Column (Right) */}
          <div className="w-full lg:w-[350px] flex items-end justify-center lg:justify-end pb-0">
             <div className="w-full max-w-[300px]">
                <FooterAnimationGSAP className="w-full h-auto block" />
             </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col justify-center items-center text-center gap-4">
            <p className="text-[12px] text-slate-400">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
