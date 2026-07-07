import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties } from "../data/properties";
import { motion, useScroll, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Home, Building2, Scale, Phone, Mail, MessageCircle, Star, Clock, Shield, TrendingUp, Menu, X, ChevronRight } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";

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
    contact: {
      tag: "Contacto",
      title1: "Estamos aquí",
      titleAccent: "para ayudarle.",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Oficinas",
      nameLabel: "Nombre",
      namePlaceholder: "Su nombre completo",
      emailLabel: "Email",
      phoneLabel: "Teléfono",
      messageLabel: "Mensaje",
      messagePlaceholder: "¿En qué podemos ayudarle?",
      serviceLabel: "Servicio de interés",
      serviceOpts: ["Administración de Fincas", "Inmobiliaria", "Asesoría Jurídica", "Otro"],
      submit: "Enviar consulta"
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
      <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors resize-none placeholder:text-onyx/25"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors placeholder:text-onyx/25"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
function Index() {
  useScroll(); // keep for potential future scroll effects

  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");
  const t = translations[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    zona: "Cualquiera",
    tipo: "Todos",
  });

  // Valuator form state
  const [valuatorSubmitted, setValuatorSubmitted] = useState(false);
  const [valuatorData, setValuatorData] = useState({
    zona: "",
    tipo: "",
    metros: "",
    contacto: ""
  });

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
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50 flex items-center justify-between py-4 md:py-5 px-8 md:px-10 rounded-full bg-white/98 backdrop-blur-md border border-black/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
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
      <HeroCarousel />

      {/* ── VALORADOR DE INMUEBLES ── */}
      {/* Inspirado en Forcadell / Finques Rubio — ¿Cuánto vale tu piso? */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-[#F8FAFC] to-white text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.valuator.tag}</p>
              <h2 key={language} className="text-4xl md:text-5xl font-bold leading-tight text-onyx mb-4">
                {t.valuator.title} <span className="text-primary-blue">{t.valuator.titleAccent}</span>
              </h2>
              <p className="text-onyx/55 text-base leading-relaxed max-w-md">{t.valuator.subtitle}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-black/[0.05]">
                {valuatorSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-primary-blue" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-onyx mb-2">{t.valuator.successTitle}</h3>
                    <p className="text-onyx/60 text-sm leading-relaxed">{t.valuator.successMsg}</p>
                    <button
                      onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }}
                      className="mt-6 text-primary-blue font-bold text-sm hover:underline"
                    >
                      Nueva valoración →
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{t.valuator.zonaLabel}</label>
                        <select
                          value={valuatorData.zona}
                          onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                          className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors"
                        >
                          <option value="">Seleccionar…</option>
                          {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{t.valuator.tipoLabel}</label>
                        <select
                          value={valuatorData.tipo}
                          onChange={e => setValuatorData(d => ({ ...d, tipo: e.target.value }))}
                          className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors"
                        >
                          <option value="">Seleccionar…</option>
                          {tipos.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{t.valuator.metrosLabel}</label>
                      <input
                        type="number"
                        placeholder="Ej: 85"
                        value={valuatorData.metros}
                        onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                        className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors placeholder:text-onyx/25"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{t.valuator.contactLabel}</label>
                      <input
                        type="text"
                        placeholder={t.valuator.contactPlaceholder}
                        value={valuatorData.contacto}
                        onChange={e => setValuatorData(d => ({ ...d, contacto: e.target.value }))}
                        className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors placeholder:text-onyx/25"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (valuatorData.contacto.trim()) setValuatorSubmitted(true);
                      }}
                      className="w-full bg-primary-blue text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-onyx transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99]"
                    >
                      {t.valuator.submit}
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROPERTIES SECTION ── */}
      <section id="propiedades" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.properties.tag}</p>
                {/* PUNTO 1: Tipografía serif eliminada — ahora text-primary-blue bold */}
                <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                  {t.properties.title} <br />
                  <span className="text-primary-blue font-bold">{t.properties.titleAccent}</span>
                </h2>
              </div>
              <p className="text-onyx/50 max-w-sm text-base leading-relaxed">{t.properties.subtitle}</p>
            </div>
          </Reveal>

          {/* BARRA DE FILTROS */}
          <div className="bg-[#F8FAFC] border border-onyx/[0.05] rounded-2xl p-4 mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={searchParams.tipo}
                onChange={(e) => setSearchParams(p => ({ ...p, tipo: e.target.value }))}
                className="bg-white border border-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:border-primary-blue text-onyx/80 min-w-[150px]"
              >
                <option value="Todos">Tipo de inmueble</option>
                <option value="Piso">Piso</option>
                <option value="Ático">Ático</option>
                <option value="Local comercial">Local comercial</option>
                <option value="Chalet">Chalet</option>
              </select>
              <select
                value={searchParams.zona}
                onChange={(e) => setSearchParams(p => ({ ...p, zona: e.target.value }))}
                className="bg-white border border-slate-200 text-sm rounded-xl px-4 py-3 outline-none focus:border-primary-blue text-onyx/80 min-w-[150px]"
              >
                <option value="Cualquiera">Zona</option>
                {[...new Set(properties.map(p => p.location))].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-onyx/50 font-medium">
              {properties.filter(p => searchParams.zona === "Cualquiera" ? true : p.location.includes(searchParams.zona)).filter(p => searchParams.tipo === "Todos" ? true : p.type === searchParams.tipo).length} propiedades
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {properties
              .filter(p => searchParams.zona === 'Cualquiera' ? true : p.location.includes(searchParams.zona))
              .filter(p => searchParams.tipo === 'Todos' ? true : p.type === searchParams.tipo)
              .map((property, idx) => (
              <Link to="/inmobiliaria/$slug" params={{ slug: property.slug }} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: easeOut }}
                  className="group relative bg-white brutal-card rounded-2xl overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm text-onyx">
                      En Venta
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-onyx mb-1 group-hover:text-primary-blue transition-colors">{property.name}</h3>
                        <p className="text-sm text-onyx/60">{property.location}</p>
                      </div>
                      <div className="text-xl font-light text-onyx bg-onyx/5 px-3 py-1 rounded-full whitespace-nowrap">{new Intl.NumberFormat('es-ES').format(property.price)} €</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-onyx/50 uppercase tracking-widest mt-auto pt-6 border-t border-onyx/[0.05]">
                      {property.bedrooms > 0 && <span>{property.bedrooms} hab.</span>}
                      <span>{property.bathrooms} baños</span>
                      <span>{property.surface} m²</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="flex justify-center mt-12">
              <a href="#contacto" className="inline-flex items-center gap-3 brutal-button text-primary-blue px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white hover:bg-primary-blue hover:text-white">
                {t.properties.verTodas} →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {/* PUNTO 5: Features convertidas en chips/badges visuales */}
      <section id="servicios" className="py-28 md:py-36 px-6 md:px-12 bg-[#F8FAFC] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.services.tag}</p>
              {/* PUNTO 1: Tipografía serif eliminada */}
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                {t.services.title1}{" "}
                <span className="text-primary-blue font-bold">{t.services.titleAccent}</span>
                {" "}{t.services.title3}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.services.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl p-8 brutal-card flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-all duration-400">
                    {iconMap[card.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-onyx mb-3 leading-snug">{card.title}</h3>
                  <p className="text-onyx/55 text-sm leading-relaxed mb-6">{card.desc}</p>
                  {/* PUNTO 5: Chips/badges en lugar de lista con bullets */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {card.features.map((feat) => (
                      <span key={feat} className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue text-[11px] font-bold">
                        {feat}
                      </span>
                    ))}
                  </div>
                  <a href="#contacto" className="mt-8 text-[11px] font-bold uppercase tracking-wider text-primary-blue flex items-center gap-2 group-hover:gap-3 transition-all">
                    Saber más →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY + STATS ── */}
      <section className="py-24 md:py-32 bg-[#F8FAFC] text-onyx border-t border-onyx/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-6">{t.philosophy.tag}</p>
              {/* PUNTO 1: Tipografía serif eliminada del blockquote */}
              <blockquote key={language} className="text-2xl text-onyx font-bold leading-snug border-l-4 border-primary-blue pl-6 py-2">
                {t.philosophy.quote}
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:w-2/3 w-full">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-10">{t.stats.tag}</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={350} /></>} label={t.stats.communities} />
              <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={1200} /></>} label={t.stats.sold} />
              <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={15} /></>} label={t.stats.experience} />
              <StatBlock value={<><Counter to={98} /><span className="text-primary-blue">%</span></>} label={t.stats.satisfied} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS / WHY US ── */}
      <section id="nosotros" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.nosotros.tag}</p>
                {/* PUNTO 1: Tipografía serif eliminada */}
                <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-onyx">
                  {t.nosotros.title1} <br />
                  <span className="text-primary-blue font-bold">{t.nosotros.titleAccent}</span>
                  {" "}{t.nosotros.title3}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.nosotros.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="group bg-white rounded-2xl p-6 brutal-card flex flex-col gap-4 items-start h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-all duration-400">
                      {iconMap[item.icon]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-onyx mb-2">{item.title}</h4>
                      <p className="text-onyx/55 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden brutal-shadow w-full aspect-[4/3] lg:aspect-square">
              <img
                src={gesgramaOffice}
                alt="Oficina Gesgrama"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/20 to-transparent mix-blend-overlay"></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      {/* PUNTO 3: Nueva sección — inspirado en Forcadell "Historias reales de clientes" */}
      <section id="testimonios" className="py-28 md:py-36 px-6 md:px-12 bg-[#F8FAFC] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.testimonials.tag}</p>
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                {t.testimonials.title} <span className="text-primary-blue">{t.testimonials.titleAccent}</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TODO: sustituir por testimonios reales del cliente */}
            {t.testimonials.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-6 brutal-card flex flex-col h-full">
                  {/* Estrellas */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Cita — sin tipografía serif */}
                  <p className="text-onyx/70 text-sm leading-relaxed flex-1 mb-6">"{item.quote}"</p>
                  {/* Autor */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/[0.05]">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-black text-sm shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-onyx">{item.name}</div>
                      <div className="text-[11px] text-onyx/45 font-medium">{item.zone}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
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

              <div className="grid grid-cols-2 gap-x-10 gap-y-14">
                <div className="border-l-[3px] border-primary-blue/20 pl-6">
                  <div className="text-4xl lg:text-5xl font-black text-onyx mb-2 tracking-tight">{t.coverage.s1Value}</div>
                  <div className="text-[10px] font-bold text-onyx/40 uppercase tracking-[0.2em]">{t.coverage.s1Label}</div>
                </div>
                <div className="border-l-[3px] border-primary-blue/20 pl-6">
                  <div className="text-4xl lg:text-5xl font-black text-onyx mb-2 tracking-tight">{t.coverage.s2Value}</div>
                  <div className="text-[10px] font-bold text-onyx/40 uppercase tracking-[0.2em]">{t.coverage.s2Label}</div>
                </div>
                <div className="border-l-[3px] border-primary-blue/20 pl-6">
                  <div className="text-4xl lg:text-5xl font-black text-onyx mb-2 tracking-tight">{t.coverage.s3Value}</div>
                  <div className="text-[10px] font-bold text-onyx/40 uppercase tracking-[0.2em]">{t.coverage.s3Label}</div>
                </div>
                <div className="border-l-[3px] border-primary-blue/20 pl-6">
                  <div className="text-4xl lg:text-5xl font-black text-onyx mb-2 tracking-tight">{t.coverage.s4Value}</div>
                  <div className="text-[10px] font-bold text-onyx/40 uppercase tracking-[0.2em]">{t.coverage.s4Label}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden brutal-shadow h-[500px] md:h-[650px] bg-slate-100">
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

              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl brutal-shadow max-w-[280px]">
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
      <section className="relative bg-primary-blue py-28 md:py-40 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <Reveal className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mb-6">{t.cta.tag}</p>
          <h2 key={language} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
            {t.cta.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#propiedades" className="bg-white text-primary-blue px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest brutal-button hover:bg-onyx hover:text-white">
              {t.cta.findHome}
            </a>
            <a href="#contacto" className="bg-onyx text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest brutal-button hover:bg-white hover:text-primary-blue">
              {t.cta.contact}
            </a>
          </div>
        </Reveal>
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
                <a href="tel:+34934685656" className="flex items-center gap-4 group p-4 rounded-xl brutal-button bg-white">
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
                <a href="https://wa.me/34600000000" className="flex items-center gap-4 group p-4 rounded-xl brutal-button bg-white">
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
                <a href="mailto:info@gesgrama.com" className="flex items-center gap-4 group p-4 rounded-xl brutal-button bg-white">
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
              <div className="bg-[#F8FAFC] rounded-2xl p-8 brutal-shadow">
                <h3 className="font-bold text-xl mb-6">Solicite información sin compromiso</h3>
                <form key={language} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.contact.nameLabel} placeholder={t.contact.namePlaceholder} />
                    <FormField label={t.contact.phoneLabel} placeholder="+34" />
                  </div>
                  <FormField label={t.contact.emailLabel} type="email" placeholder="correo@email.com" />
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-onyx/45 font-bold block mb-2">{t.contact.serviceLabel}</label>
                    <select className="w-full bg-white border border-black/[0.08] rounded-lg px-4 py-3 text-sm text-onyx focus:border-primary-blue focus:outline-none transition-colors">
                      {t.contact.serviceOpts.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <FormField label={t.contact.messageLabel} placeholder={t.contact.messagePlaceholder} textarea />
                  <button
                    type="button"
                    className="w-full bg-primary-blue text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest brutal-button hover:bg-onyx"
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
