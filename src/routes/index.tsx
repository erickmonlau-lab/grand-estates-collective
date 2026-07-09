import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties } from "../data/properties";
import { motion, useScroll, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Home, Building2, Scale, Phone, Mail, MessageCircle, Star, Clock, Shield, TrendingUp, Menu, X, ChevronRight, Calendar, ChevronDown, ArrowRight, Send } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";
import handKeysImg from "@/assets/hand_keys_blue.jpg";

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
      s2Value: "25+",
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
      s2Value: "25+",
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
      s2Value: "25+",
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
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-[15px] font-medium text-onyx focus:border-onyx focus:bg-white focus:ring-0 transition-colors resize-none placeholder:text-onyx/30"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-[15px] font-medium text-onyx focus:border-onyx focus:bg-white focus:ring-0 transition-colors placeholder:text-onyx/30"
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
    precio: "Cualquier precio"
  });

  const handleHeroSearch = (params: { mode: any; zona: string; tipo: string; precio: string }) => {
    setSearchParams(params);
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

  return (
    <div className="bg-white text-onyx font-sans selection:bg-primary-blue/20 overflow-x-clip">

      {/* ── NAVIGATION ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50 flex items-center justify-between py-3 md:py-4 px-6 md:px-8 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
      >
        <a href="#" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2 -my-4 md:-my-6">
          <img src={logoImg} alt="Gesgrama" className="h-16 md:h-20 lg:h-[5.5rem] w-auto object-contain" />
        </a>

        <div className="hidden lg:flex items-center gap-10 text-[13px] md:text-[14px] font-bold text-onyx/70 tracking-widest uppercase">
          <a href="#propiedades" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="#servicios" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="#nosotros" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.nosotros}</a>
          <a href="#contacto" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-3 lg:gap-6 shrink-0 pr-1">
          <div className="flex items-center bg-[#f4f6f8] border border-black/[0.03] rounded-[1.2rem] p-1 md:p-1.5 text-[10px] md:text-[12px] font-bold">
            {(["ES", "CA", "EN"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                {idx > 0 && <span className="text-black/[0.08] select-none text-[8px] md:text-[10px] mx-0.5 md:mx-1">|</span>}
                <button
                  onClick={() => setLanguage(lang.toLowerCase() as "es" | "en" | "ca")}
                  className={`transition-all duration-300 cursor-pointer px-2.5 py-1.5 md:px-4 md:py-2 rounded-[0.8rem] ${
                    language === lang.toLowerCase()
                      ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-onyx"
                      : "text-onyx/40 hover:text-onyx"
                  }`}
                >
                  {lang}
                </button>
              </div>
            ))}
          </div>
          <a
            href="#contacto"
            className="hidden sm:inline-block bg-primary-blue text-white hover:bg-onyx px-8 md:px-10 py-4 md:py-4 rounded-full text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px"
          >
            {t.nav.portal}
          </a>
          <button
            className="lg:hidden p-2 text-onyx"
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
              className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl p-6 shadow-xl border border-black/[0.05] flex flex-col gap-4 z-50 lg:hidden"
            >
              <a href="#propiedades" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-onyx">{t.nav.propiedades}</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-onyx">{t.nav.servicios}</a>
              <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-onyx">{t.nav.nosotros}</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-onyx">{t.nav.contacto}</a>
              <a href="#contacto" className="mt-4 text-center bg-onyx text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                {t.nav.portal}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <HeroCarousel onPerformSearch={handleHeroSearch} />

      {/* ── VALORADOR DE INMUEBLES (LEAD CAPTURE) ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0f172a] text-white text-center border-y border-white/5">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <h2 key={language} className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-tight text-white mb-12 drop-shadow-sm" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
              ¿Cuánto vale tu <span className="text-[#0082c8]">piso</span>?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {valuatorSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="w-14 h-14 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-blue/30">
                  <svg className="w-7 h-7 text-primary-blue" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-white mb-2">{t.valuator.successTitle}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{t.valuator.successMsg}</p>
                <button onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }} className="text-primary-blue font-bold text-sm hover:text-white transition-colors">
                  Nueva valoración →
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="relative flex-1">
                    <select
                      value={valuatorData.zona}
                      onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                      className="w-full bg-[#f8fafc] border-0 rounded-lg px-5 py-4 text-base font-semibold text-onyx focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Zona</option>
                      {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Superficie..."
                      value={valuatorData.metros}
                      onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                      className="w-full bg-[#f8fafc] border-0 rounded-lg px-5 py-4 text-base font-semibold text-onyx focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all placeholder:text-onyx/40"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                  className="w-full bg-[#0082c8] hover:bg-[#0070ab] text-white font-bold text-base tracking-wider uppercase py-4 rounded-lg transition-colors focus:outline-none mt-2 shadow-lg"
                >
                  SOLICITAR VALORACIÓN
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── PROPERTIES SECTION ── */}
      <section id="propiedades" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[13px] uppercase text-primary-blue font-bold mb-4 tracking-wide">{t.properties.tag}</p>
                {/* PUNTO 1: Tipografía serif eliminada — ahora text-primary-blue bold */}
                <h2 key={language} className="text-4xl md:text-6xl font-[800] leading-[1.15] text-onyx tracking-tight">
                  {t.properties.title} <br />
                  <span className="text-primary-blue">{t.properties.titleAccent}</span>
                </h2>
              </div>
              <p className="text-slate-600 max-w-sm text-[17px] md:text-lg leading-relaxed font-medium">{t.properties.subtitle}</p>
            </div>
          </Reveal>

          {/* BARRA DE FILTROS - Chips Editoriales */}
          <div className="flex flex-col gap-6 mt-12 w-full overflow-hidden">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold uppercase text-primary-blue tracking-wide">Tipo de Inmueble</span>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                {["Cualquier tipo", "Piso", "Ático", "Local comercial", "Chalet"].map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => setSearchParams(p => ({ ...p, tipo }))}
                    className={`px-6 py-2.5 rounded-full text-[14px] whitespace-nowrap transition-all duration-300 ${
                      searchParams.tipo === tipo 
                        ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20 font-bold" 
                        : "border border-slate-200 bg-white text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {tipo === "Cualquier tipo" ? "Todos" : tipo}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold uppercase text-primary-blue tracking-wide">Zona</span>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                {["Cualquier zona", ...new Set(properties.map(p => p.location))].map(zona => (
                  <button
                    key={zona}
                    onClick={() => setSearchParams(p => ({ ...p, zona }))}
                    className={`px-6 py-2.5 rounded-full text-[14px] whitespace-nowrap transition-all duration-300 ${
                      searchParams.zona === zona 
                        ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20 font-bold" 
                        : "border border-slate-200 bg-white text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {zona === "Cualquier zona" ? "Todas las zonas" : zona}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-400 italic pt-4 mt-2">
              {properties
                  .filter(p => searchParams.zona === "Cualquier zona" ? true : p.location.includes(searchParams.zona))
                  .filter(p => searchParams.tipo === "Cualquier tipo" ? true : p.type === searchParams.tipo)
                  .filter(p => p.operation === searchParams.mode)
                  .filter(p => isPriceValid(searchParams.precio, p.price))
                  .length} resultados encontrados en {searchParams.zona === "Cualquier zona" ? "todas las zonas" : searchParams.zona}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(() => {
              const filteredProperties = properties
                .filter(p => searchParams.zona === 'Cualquier zona' ? true : p.location.includes(searchParams.zona))
                .filter(p => searchParams.tipo === 'Cualquier tipo' ? true : p.type === searchParams.tipo)
                .filter(p => p.operation === searchParams.mode)
                .filter(p => isPriceValid(searchParams.precio, p.price));

              if (filteredProperties.length === 0) {
                // FALLBACK LOGIC
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
                
                similarProperties = similarProperties.slice(0, 3);

                const renderCard = (property: any, idx: number) => (
                  <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1, ease: easeOut }}
                      className="flex flex-col h-full cursor-pointer"
                    >
                      {/* Imagen grande */}
                      <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-2xl mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-slate-100">
                        <img src={property.image} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        
                        {/* Overlay Gradiente superior suave */}
                        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur p-2.5 rounded-full text-onyx shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-onyx/85 backdrop-blur-md text-white text-[10px] px-3 py-1.5 font-bold tracking-widest uppercase rounded-full">
                          Ref {property.id.toUpperCase().substring(0, 6)}
                        </div>
                      </div>
                      
                      {/* Contenido Minimalista sin bordes */}
                      <div className="flex flex-col flex-1 px-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-[17px] font-bold text-onyx leading-tight line-clamp-1 group-hover:text-primary-blue transition-colors">
                            {property.name || `${property.type} en ${property.location}`}
                          </h3>
                        </div>
                        
                        <p className="text-[13px] text-slate-500 font-medium mb-3">{property.location}</p>
                        
                        {/* Precio Rey */}
                        <div className="text-[1.75rem] leading-none font-black text-primary-blue mb-5">
                          {new Intl.NumberFormat('es-ES').format(property.price)}€
                          {property.price < 10000 && <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">/ mes</span>}
                        </div>
                        
                        {/* Características Simplificadas */}
                        <div className="flex items-center gap-5 text-[13px] text-slate-600 font-semibold mt-auto border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                            {property.bedrooms > 0 ? property.bedrooms : "0"} hab.
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 L22 5 L22 11 L10 11 Z"/></svg>
                            {property.bathrooms > 0 ? property.bathrooms : "1"} baños
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            {property.surface} m²
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );

                return (
                  <div className="col-span-full flex flex-col gap-8">
                    <div className="py-16 px-8 text-center bg-[#F8FAFC] rounded-2xl border border-slate-200">
                      <h3 className="text-2xl font-bold text-onyx mb-3">No hemos encontrado resultados exactos</h3>
                      <p className="text-onyx/60 mb-8 max-w-lg mx-auto text-base">
                        Actualmente no disponemos de propiedades que coincidan 100% con tu búsqueda. <br/> Sin embargo, estas opciones similares podrían interesarte:
                      </p>
                      <a href="#contacto" className="inline-flex items-center justify-center bg-onyx text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-blue transition-colors">
                        Contactar con un asesor
                      </a>
                    </div>
                    {similarProperties.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarProperties.map((prop, idx) => renderCard(prop, idx))}
                      </div>
                    )}
                  </div>
                );
              }

              return filteredProperties.map((property, idx) => (
              <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: easeOut }}
                  className="group relative bg-white flex flex-col h-full border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Imagen y badges */}
                  <div className="relative h-[220px] md:h-[260px] overflow-hidden w-full">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 text-white z-10 drop-shadow-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <div className="absolute bottom-0 left-0 bg-onyx text-white text-[10px] px-4 py-1.5 font-bold tracking-widest uppercase z-10">
                      Ref {property.id.toUpperCase().substring(0, 6)}
                    </div>
                  </div>
                  {/* Contenido y Precio */}
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    <div className="text-[22px] font-bold text-primary-blue mb-1 leading-none">
                      {new Intl.NumberFormat('es-ES').format(property.price)}€ {property.price < 10000 ? <span className="text-xs font-normal text-slate-400 uppercase tracking-widest ml-1">/ mes</span> : ''}
                    </div>
                    
                    <h3 className="text-base font-bold text-onyx mb-1.5">{property.type || "Piso"}</h3>
                    <p className="text-[13px] text-slate-500 flex items-center gap-1.5 mb-5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {property.location}
                    </p>
                    
                    {/* Separador */}
                    <div className="h-px bg-slate-100 w-full mt-auto mb-4" />

                    {/* Características */}
                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium px-1">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
                        {property.bedrooms > 0 ? property.bedrooms : "0"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 L22 5 L22 11 L10 11 Z"/></svg>
                        {property.bathrooms > 0 ? property.bathrooms : "1"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        {property.surface} m²
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
              ));
            })()}
          </div>

          <Reveal delay={0.1}>
            <div className="flex justify-center mt-12">
              <a href="#contacto" className="inline-flex items-center justify-center gap-3 border border-slate-200 text-onyx px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] bg-white hover:bg-slate-50 transition-colors w-full md:w-auto">
                {t.properties.verTodas} →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 bg-slate-50 text-onyx overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-block mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-blue bg-primary-blue/10 px-4 py-1.5 rounded-full">
                  Áreas de Experiencia
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-tight text-onyx mb-4" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                Nuestros Servicios
              </h2>
            </Reveal>
          </div>

          {/* Carrusel Horizontal de Tarjetas Editoriales */}
          <div className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { 
                icon: <Building2 className="w-8 h-8 text-white stroke-[1.5]" />, 
                label: "Comunidades", 
                desc: "Gestión integral y transparente para la tranquilidad de todos los vecinos.",
                bg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
              },
              { 
                icon: <svg className="w-8 h-8 text-white stroke-[1.5] fill-none" viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, 
                label: "Inversión", 
                desc: "Análisis estratégico y rentabilidad asegurada en cada operación.",
                bg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                icon: <svg className="w-8 h-8 text-white stroke-[1.5] fill-none" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
                label: "Gestión Patrimonial", 
                desc: "Protegemos y hacemos crecer su patrimonio inmobiliario.",
                bg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
              },
              { 
                icon: <svg className="w-8 h-8 text-white stroke-[1.5] fill-none" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, 
                label: "Reformas", 
                desc: "Proyectos llave en mano con acabados de la más alta calidad.",
                bg: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
              },
              { 
                icon: <MessageCircle className="w-8 h-8 text-white stroke-[1.5]" />, 
                label: "Consultoría Legal", 
                desc: "Asesoramiento jurídico especializado en derecho inmobiliario.",
                bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1} className="shrink-0 snap-center w-[280px] md:w-[320px] lg:w-[350px]">
                <div className="group relative h-[450px] md:h-[500px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  {/* Imagen de Fondo */}
                  <img src={item.bg} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Overlay Oscuro Base (siempre visible para legibilidad) */}
                  <div className="absolute inset-0 bg-[#0f172a]/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent" />
                  
                  {/* Overlay Oscuro Adicional (aparece en hover para leer la descripción) */}
                  <div className="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Contenido */}
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                    <div className="mb-4">
                      {item.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white">
                      {item.label}
                    </h3>
                    
                    {/* Descripción y Botón (Ocultos por defecto, expanden altura en hover) */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        <div className="pt-4 flex flex-col gap-6">
                          <p className="text-white/80 text-sm leading-relaxed font-medium">
                            {item.desc}
                          </p>
                          <button className="flex items-center gap-2 text-primary-blue font-bold text-xs uppercase tracking-widest hover:text-white transition-colors w-fit">
                            Saber más <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTA EFICAZ (ACCORDION) ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white text-onyx border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-block mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-blue bg-primary-blue/10 px-4 py-1.5 rounded-full">
                  Gestión Integral
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold text-onyx mb-6" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                La venta de pisos en Santa Coloma <br className="hidden md:block"/>más eficaz
              </h2>
            </Reveal>
          </div>
          
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Mitad Izquierda - Imagen */}
              <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-onyx/10">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Venta de pisos" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Mitad Derecha - Acordeón */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-onyx mb-6">
                  Cómo te ayudamos con la venta de tu piso
                </h3>
                <p className="text-[15px] text-slate-500 mb-10 leading-relaxed font-medium">
                  Gesgrama está a tu disposición tanto para gestionar la venta de tu piso como para ayudarte a comprar una vivienda. Nos comprometemos a ofrecerte un servicio integral. ¿Cómo lo logramos?
                </p>
                
                <div className="space-y-4">
                  {[
                    { title: "Amplia Cartera de Clientes", content: "Contamos con una extensa red de clientes potenciales, lo que nos permite encontrar rápidamente compradores interesados en tu propiedad." },
                    { title: "Marketing Efectivo", content: "Utilizamos estrategias de marketing innovadoras y eficaces para promocionar tu piso en los medios adecuados y alcanzar a un público amplio." },
                    { title: "Estudio de Mercado", content: "Realizamos un exhaustivo análisis del mercado inmobiliario local para determinar el valor justo de tu propiedad y establecer un precio competitivo que maximice tus ganancias." }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className={`border-b border-slate-200 overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'pb-6' : 'pb-4'}`}
                    >
                      <button 
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                      >
                        <span className={`text-lg font-bold transition-colors ${activeAccordion === index ? 'text-primary-blue' : 'text-onyx group-hover:text-primary-blue'}`}>
                          {item.title}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeAccordion === index ? 'bg-primary-blue text-white' : 'bg-slate-100 text-primary-blue group-hover:bg-primary-blue/10'}`}>
                          {activeAccordion === index ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14"/></svg>
                          ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                          )}
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <p className="pt-2 pb-2 text-[#64748b] font-medium text-[14px] leading-relaxed pr-8">
                              {item.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NOSOTROS / WHY US ── */}
      <section id="nosotros" className="py-28 md:py-36 px-6 md:px-12 bg-[#89888d] text-onyx">
        <div className="max-w-5xl mx-auto flex flex-col gap-12 lg:gap-20">
          <Reveal>
            <div>
              <h3 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black text-onyx mb-2 tracking-tighter uppercase leading-none break-words">{t.nosotros.tag}</h3>
              <h2 key={language} className="text-[2.75rem] sm:text-5xl md:text-[6rem] lg:text-[7rem] font-black leading-[0.95] md:leading-none tracking-tighter text-white break-words" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
                {t.nosotros.title1} <br className="hidden md:block" />
                <span className="text-onyx font-black">{t.nosotros.titleAccent}</span>
                <span className="text-white font-black">{" "}{t.nosotros.title3}</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {t.nosotros.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex flex-col gap-6 items-start bg-white border-[3px] border-onyx rounded-[32px] p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-onyx/5 flex items-center justify-center text-onyx shrink-0">
                    {iconMap[item.icon]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-3xl text-onyx mb-3 tracking-tighter leading-tight">{item.title}</h4>
                    <p className="text-onyx/70 text-base leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="py-28 md:py-36 px-6 md:px-12 bg-slate-50 text-onyx relative overflow-hidden">
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
                  <div className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center h-full border-[3px] border-onyx shadow-[8px_8px_0px_#0f172a] transition-all duration-300 hover:shadow-[0px_0px_0px_#0f172a] hover:translate-x-[8px] hover:translate-y-[8px]">
                    {/* Estrellas */}
                    <div className="flex justify-center gap-1.5 mb-8">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-6 h-6 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    
                    {/* Cita */}
                    <p className="text-onyx/80 text-[17px] leading-relaxed italic flex-1 mb-10 font-medium">"{item.quote}"</p>
                    
                    {/* Autor */}
                    <div className="flex flex-col items-center gap-4 mt-auto">
                      <img src={avatars[i % avatars.length]} alt={item.name} className="w-16 h-16 rounded-full object-cover border-[3px] border-onyx shrink-0" />
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

      {/* ── COVERAGE AREA ── */}
      <section id="cobertura" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <Reveal>
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.coverage.tag}</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-onyx mb-6">
                {t.coverage.title}
              </h2>
              <p className="text-onyx/60 text-lg md:text-xl leading-relaxed mb-16 max-w-md">
                {t.coverage.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-20 mt-12">
                <div className="border-l-[6px] border-[#0082c8] pl-6 py-2">
                  <div className="text-5xl sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] font-black text-onyx leading-[0.85] tracking-tighter mb-4">{t.coverage.s1Value}</div>
                  <div className="text-xs md:text-sm font-bold text-onyx/60 uppercase tracking-[0.2em] leading-relaxed max-w-[160px]">{t.coverage.s1Label}</div>
                </div>
                <div className="border-l-[6px] border-[#0082c8] pl-6 py-2">
                  <div className="text-5xl sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] font-black text-onyx leading-[0.85] tracking-tighter mb-4">{t.coverage.s2Value}</div>
                  <div className="text-xs md:text-sm font-bold text-onyx/60 uppercase tracking-[0.2em] leading-relaxed max-w-[160px]">{t.coverage.s2Label}</div>
                </div>
                <div className="border-l-[6px] border-[#0082c8] pl-6 py-2">
                  <div className="text-5xl sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] font-black text-onyx leading-[0.85] tracking-tighter mb-4">{t.coverage.s3Value}</div>
                  <div className="text-xs md:text-sm font-bold text-onyx/60 uppercase tracking-[0.2em] leading-relaxed max-w-[160px]">{t.coverage.s3Label}</div>
                </div>
                <div className="border-l-[6px] border-[#0082c8] pl-6 py-2">
                  <div className="text-5xl sm:text-[4.5rem] md:text-[5rem] lg:text-[6.5rem] font-black text-onyx leading-[0.85] tracking-tighter mb-4">{t.coverage.s4Value}</div>
                  <div className="text-xs md:text-sm font-bold text-onyx/60 uppercase tracking-[0.2em] leading-relaxed max-w-[160px]">{t.coverage.s4Label}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden h-[500px] md:h-[650px] bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] contrast-[110%] opacity-90 object-cover"
              ></iframe>

              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-md p-6 border border-slate-200 max-w-[280px]">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-blue/10 p-3 rounded-2xl shrink-0 text-primary-blue">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-onyx text-sm mb-1">{t.coverage.mapTitle}</h3>
                    <p className="text-onyx/60 text-[11px] font-medium leading-relaxed mb-2">{t.coverage.mapSubtitle}</p>
                    {/* TODO: sustituir por el teléfono real del cliente */}
                    <a href="tel:+34934685656" className="text-primary-blue font-bold text-[13px] hover:text-onyx transition-colors flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> 934 685 656
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 md:py-40 text-center px-6 overflow-hidden rounded-[2.5rem] mx-4 md:mx-12 my-12 shadow-2xl">
        {/* Tratamiento del Fondo: Imagen residencial estándar con overlay oscuro */}
        <div className="absolute inset-0 bg-[#0f172a]">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Edificio residencial" 
            className="w-full h-full object-cover object-center opacity-30 grayscale" 
          />
        </div>
        
        <Reveal className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-lg md:text-2xl uppercase tracking-[0.4em] text-[#0082c8] font-black mb-6">
            ¿Hablamos?
          </p>
          <h2 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white mb-12 leading-[1.05] tracking-tighter" style={{ fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif" }}>
            Su comunidad <br className="hidden md:block" />en las mejores manos.
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-4 w-full sm:w-auto">
            <a href="#propiedades" className="bg-[#0082c8] text-white px-10 py-5 font-bold text-lg transition-colors hover:bg-[#0072b1] rounded-2xl w-full sm:w-auto text-center">
              Ver propiedades en venta
            </a>
            <a href="#contacto" className="bg-white text-onyx hover:bg-slate-100 px-10 py-5 font-bold text-lg transition-colors rounded-2xl w-full sm:w-auto text-center">
              Hablar con un asesor
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── ÚLTIMAS NOTICIAS (BLOG) ── */}
      <section id="blog" className="py-24 md:py-32 px-6 md:px-12 bg-[#f9fafb] text-onyx">
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
      <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-white text-onyx">
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
              <div className="bg-white border-[3px] border-onyx p-8 md:p-12 rounded-[2rem] shadow-[12px_12px_0px_#0f172a]">
                <h3 className="font-black text-3xl md:text-4xl text-onyx mb-10 tracking-tighter leading-tight">Solicite información sin compromiso</h3>
                <form key={language} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label={t.contact.nameLabel} placeholder={t.contact.namePlaceholder} />
                    <FormField label={t.contact.phoneLabel} placeholder={language === 'es' ? "Ej: 600 000 000" : "+34"} />
                  </div>
                  <FormField label={t.contact.emailLabel} type="email" placeholder={language === 'es' ? "tu-correo@ejemplo.com" : "correo@email.com"} />
                  <div>
                    <label className="text-onyx font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contact.serviceLabel}</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-[15px] font-medium text-onyx focus:border-onyx focus:bg-white focus:ring-0 transition-colors">
                      {t.contact.serviceOpts.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <FormField label={t.contact.messageLabel} placeholder={t.contact.messagePlaceholder} textarea />
                  <button
                    type="button"
                    className="w-full bg-[#0082c8] border-[3px] border-onyx text-white py-5 mt-6 rounded-2xl text-[16px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-onyx hover:text-white shadow-[6px_6px_0px_#0f172a] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                  >
                    {t.contact.submit}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      {/* PUNTO 2: Footer ampliado con columnas de navegación y contacto */}
      <footer className="bg-onyx text-alabaster/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <img src={logoImg} alt="Gesgrama" className="h-12 w-auto object-contain opacity-80 mb-4" />
            <p className="text-[12px] leading-relaxed text-alabaster/40 max-w-[200px]">
              Administración de Fincas, Inmobiliaria y Asesoría Jurídica en el área de Barcelona desde 2009.
            </p>
          </div>

          {/* Navegación rápida */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-alabaster/30 mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {[
                { label: t.nav.propiedades, href: "#propiedades" },
                { label: t.nav.servicios, href: "#servicios" },
                { label: t.nav.nosotros, href: "#nosotros" },
                { label: t.nav.contacto, href: "#contacto" },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-alabaster/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-primary-blue group-hover:translate-x-0.5 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-alabaster/30 mb-5">{t.footer.contactInfo}</h4>
            <ul className="space-y-3 text-sm text-alabaster/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                {/* TODO: sustituir por la dirección real del cliente */}
                <span>Av. dels Banús, 49<br />08923 Santa Coloma de Gramenet</span>
              </li>
              <li>
                {/* TODO: sustituir por el teléfono real del cliente */}
                <a href="tel:+34934685656" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-primary-blue shrink-0" />
                  934 685 656
                </a>
              </li>
              <li>
                {/* TODO: sustituir por el email real del cliente */}
                <a href="mailto:info@gesgrama.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-primary-blue shrink-0" />
                  info@gesgrama.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-alabaster/30 mb-5">{t.footer.legal}</h4>
            <ul className="space-y-3">
              {[
                { label: t.footer.legalNotice, href: "#" },
                { label: t.footer.privacy, href: "#" },
                { label: t.footer.cookies, href: "#" },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-alabaster/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-alabaster/30">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
