import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Home, Users, DollarSign, ChevronDown, Building2, Scale, FileText, Phone, Mail, MessageCircle, Star, Clock, Shield, TrendingUp } from "lucide-react";
import logoImg from "@/assets/logo.png";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import texture from "@/assets/texture.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gesgramaBuilding from "@/assets/gesgrama_building.jpg";
import gesgramaOffice from "@/assets/gesgrama_office.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

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
      titleItalic: "y más.",
      subtitle: "Explore nuestro catálogo de propiedades en venta. Gestión directa, sin intermediarios.",
      beds: "hab.",
      baths: "baños",
      verTodas: "Ver todas las propiedades"
    },
    philosophy: {
      tag: "Nuestra filosofía",
      quote: '"Más de 15 años gestionando comunidades con transparencia, cercanía y la máxima profesionalidad."'
    },
    services: {
      tag: "Lo que hacemos",
      title1: "Gestión integral.",
      title2: "Tranquilidad",
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
      title2: "Compromiso",
      title3: "y cercanía.",
      items: [
        { icon: "clock", title: "Respuesta en menos de 24h", desc: "Ante cualquier incidencia o consulta, nuestro equipo responde con agilidad y eficacia." },
        { icon: "shield", title: "Transparencia total", desc: "Acceso digital permanente a cuentas, actas y toda la documentación de su comunidad." },
        { icon: "star", title: "+15 años de trayectoria", desc: "Una empresa con sólida experiencia, cartera consolidada y reputación impecable en el sector." },
        { icon: "trending", title: "Optimización de costes", desc: "Revisamos todos los contratos y servicios para que su comunidad pague siempre lo justo." }
      ]
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
      title2: "para ayudarle.",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Oficinas",
      officesVal: "C/ Ejemplo, 123 – Madrid",
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
      rights: "© 2026 Gesgrama — Todos los derechos reservados"
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
      titleItalic: "and more.",
      subtitle: "Browse our catalogue of properties for sale. Direct management, no middlemen.",
      beds: "beds",
      baths: "baths",
      verTodas: "View all properties"
    },
    philosophy: {
      tag: "Our philosophy",
      quote: '"Over 15 years managing communities with transparency, closeness and maximum professionalism."'
    },
    services: {
      tag: "What we do",
      title1: "Integral management.",
      title2: "Absolute",
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
      title2: "Commitment",
      title3: "and proximity.",
      items: [
        { icon: "clock", title: "Response in less than 24h", desc: "For any incident or query, our team responds with agility and effectiveness." },
        { icon: "shield", title: "Total transparency", desc: "Permanent digital access to accounts, minutes and all your community's documentation." },
        { icon: "star", title: "+15 years of history", desc: "A company with solid experience, consolidated portfolio and impeccable reputation." },
        { icon: "trending", title: "Cost optimization", desc: "We review all contracts and services so your community always pays the right price." }
      ]
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
      title2: "to help you.",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Offices",
      officesVal: "C/ Ejemplo, 123 – Madrid",
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
      rights: "© 2026 Gesgrama — All rights reserved"
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
      titleItalic: "i molt més.",
      subtitle: "Exploreu el nostre catàleg de propietats en venda. Gestió directa, sense intermediaris.",
      beds: "hab.",
      baths: "banys",
      verTodas: "Veure totes les propietats"
    },
    philosophy: {
      tag: "La nostra filosofia",
      quote: '"Més de 15 anys gestionant comunitats amb transparència, proximitat i la màxima professionalitat."'
    },
    services: {
      tag: "El que fem",
      title1: "Gestió integral.",
      title2: "Tranquil·litat",
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
      title2: "Compromís",
      title3: "i proximitat.",
      items: [
        { icon: "clock", title: "Resposta en menys de 24h", desc: "Davant qualsevol incidència o consulta, el nostre equip respon amb agilitat i eficàcia." },
        { icon: "shield", title: "Transparència total", desc: "Accés digital permanent als comptes, actes i tota la documentació de la seva comunitat." },
        { icon: "star", title: "+15 anys de trajectòria", desc: "Una empresa amb sòlida experiència, cartera consolidada i reputació impecable al sector." },
        { icon: "trending", title: "Optimització de costos", desc: "Revisem tots els contractes i serveis perquè la seva comunitat sempre pagui el just." }
      ]
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
      title2: "per ajudar-lo.",
      phone: "Telèfon",
      whatsapp: "WhatsApp",
      email: "Email",
      offices: "Oficines",
      officesVal: "C/ Exemple, 123 – Madrid",
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
      rights: "© 2026 Gesgrama — Tots els drets reservats"
    }
  }
} as const;

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

function LetterReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease: easeOut }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Index() {
  const { scrollY } = useScroll();

  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");
  const t = translations[language];

  const [searchType, setSearchType] = useState<"comprar" | "alquilar">("comprar");
  const [searchParams, setSearchParams] = useState({
    zona: "Madrid",
    tipo: "Piso",
    hab: "2+",
    precio: "300.000 €"
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    building: <Building2 className="w-7 h-7" />,
    home: <Home className="w-7 h-7" />,
    scale: <Scale className="w-7 h-7" />,
    clock: <Clock className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />
  };

  return (
    <div className="bg-white text-onyx font-sans selection:bg-primary-blue/20 overflow-x-clip">

      {/* NAVIGATION */}
      <motion.nav
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 flex items-center justify-between py-2 px-5 rounded-full bg-white/98 backdrop-blur-md border border-black/[0.05] shadow-[0_8px_24px_rgba(0,0,0,0.06)] h-[60px]"
      >
        {/* LOGO - Restored original logo */}
        <a href="#" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1">
          <img src={logoImg} alt="Gesgrama" className="h-9 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold text-onyx/60 tracking-wider uppercase">
          <a href="#propiedades" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="#servicios" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="#nosotros" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.nosotros}</a>
          <a href="#contacto" className="hover:text-primary-blue transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-3 shrink-0 pr-1">
          <div className="hidden md:flex items-center gap-1 text-[10px] text-onyx/35 font-bold">
            {(["ES", "CA", "EN"] as const).map((lang, idx) => (
              <span key={lang} className="flex items-center">
                {idx > 0 && <span className="mx-1 text-onyx/15 select-none">·</span>}
                <button
                  onClick={() => setLanguage(lang.toLowerCase() as "es" | "en" | "ca")}
                  className={`transition-colors hover:text-onyx cursor-pointer px-0.5 ${language === lang.toLowerCase() ? "text-primary-blue font-extrabold" : ""}`}
                >
                  {lang}
                </button>
              </span>
            ))}
          </div>
          <a
            href="#contacto"
            className="bg-primary-blue text-white hover:bg-onyx px-5 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-px"
          >
            {t.nav.portal}
          </a>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-36 pb-24 px-6 overflow-hidden bg-[#F8FAFC]">

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(0,130,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,130,200,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Left dreamy apparition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute left-0 top-[15%] w-[420px] h-[420px] xl:w-[580px] xl:h-[580px] pointer-events-none z-0 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-cover bg-center [mask-image:radial-gradient(ellipse_60%_60%_at_30%_40%,black_0%,transparent_70%)]"
            style={{ backgroundImage: `url(${gesgramaBuilding})`, opacity: 0.18 }}
          />
        </motion.div>

        {/* Right dreamy apparition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.8 }}
          className="absolute right-0 top-[30%] w-[380px] h-[380px] xl:w-[520px] xl:h-[520px] pointer-events-none z-0 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 18, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-cover bg-center [mask-image:radial-gradient(ellipse_60%_60%_at_70%_50%,black_0%,transparent_70%)]"
            style={{ backgroundImage: `url(${gesgramaOffice})`, opacity: 0.15 }}
          />
        </motion.div>

        {/* White gradient top */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#F8FAFC] to-transparent pointer-events-none z-10" />

        <div className="relative z-20 w-full max-w-5xl flex flex-col items-center text-center">

          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeOut }}
            className="w-full flex flex-col items-center pt-16 pb-14 px-6 md:px-14 rounded-[2.5rem] bg-white/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.9),0_20px_50px_rgba(0,0,0,0.05)] border border-white/90"
          >
            {/* Tag */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[11px] uppercase tracking-[0.35em] text-primary-blue font-bold mb-8"
            >
              {t.hero.tag}
            </motion.p>

            {/* Title - Uses system serif for authority; the italic accent uses a beautiful cursive feel */}
            <h1 key={language} className="text-4xl md:text-5xl lg:text-[4.2rem] leading-[1.08] mb-6 tracking-tight text-onyx font-bold max-w-3xl">
              <LetterReveal text={t.hero.title1} delay={0.2} className="block" />
              <LetterReveal text={t.hero.title2} delay={0.7} className="block" />
              <span className="block text-primary-blue" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400 }}>
                <LetterReveal text={t.hero.title3} delay={1.2} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-onyx/55 max-w-md mx-auto text-base md:text-lg font-normal leading-relaxed text-center mb-10"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* SEARCH BAR */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.8, ease: easeOut }}
              className="w-full"
            >
              <div
                ref={dropdownRef}
                className="w-full bg-[#F3F6FA] rounded-2xl p-2 border border-black/[0.06] shadow-inner flex flex-col lg:flex-row items-stretch gap-2"
              >
                {/* TABS */}
                <div className="flex rounded-xl overflow-hidden bg-white shadow-sm border border-black/[0.05] shrink-0">
                  {(["comprar", "alquilar"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSearchType(type)}
                      className={`flex-1 px-7 py-3 text-[11px] uppercase tracking-[0.18em] font-bold transition-all duration-250 cursor-pointer focus:outline-none ${
                        searchType === type
                          ? "bg-primary-blue text-white shadow-md"
                          : "text-onyx/40 hover:text-onyx/70"
                      }`}
                    >
                      {type === "comprar" ? t.hero.comprar : t.hero.alquilar}
                    </button>
                  ))}
                </div>

                {/* FIELDS */}
                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                  {/* ZONA */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "zona" ? null : "zona")}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white border border-black/[0.05] hover:border-primary-blue/40 transition-colors flex items-center gap-3 cursor-pointer group focus:outline-none shadow-sm"
                    >
                      <MapPin className="w-4 h-4 text-primary-blue shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] text-onyx/40 uppercase tracking-wider font-bold mb-0.5">{t.hero.zona}</div>
                        <div className="text-sm text-onyx font-semibold flex items-center justify-between">
                          <span className="truncate">{searchParams.zona}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-onyx/30 shrink-0 ml-1" />
                        </div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "zona" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          className="absolute top-full left-0 mt-2 w-52 bg-white border border-black/[0.06] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] z-30 p-1.5">
                          {["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao"].map((loc) => (
                            <button key={loc} type="button"
                              onClick={() => { setSearchParams(p => ({ ...p, zona: loc })); setActiveDropdown(null); }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${searchParams.zona === loc ? "bg-primary-blue/10 text-primary-blue font-semibold" : "hover:bg-slate-50 text-onyx/80"}`}>
                              <span>{loc}</span>
                              {searchParams.zona === loc && <span className="text-primary-blue text-xs">✓</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* TIPO */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "tipo" ? null : "tipo")}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white border border-black/[0.05] hover:border-primary-blue/40 transition-colors flex items-center gap-3 cursor-pointer group focus:outline-none shadow-sm"
                    >
                      <Home className="w-4 h-4 text-primary-blue shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] text-onyx/40 uppercase tracking-wider font-bold mb-0.5">{t.hero.tipo}</div>
                        <div className="text-sm text-onyx font-semibold flex items-center justify-between">
                          <span className="truncate">{searchParams.tipo}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-onyx/30 shrink-0 ml-1" />
                        </div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "tipo" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white border border-black/[0.06] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] z-30 p-1.5">
                          {["Piso", "Ático", "Local comercial", "Oficina", "Garaje", "Finca/Solar"].map((tp) => (
                            <button key={tp} type="button"
                              onClick={() => { setSearchParams(p => ({ ...p, tipo: tp })); setActiveDropdown(null); }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${searchParams.tipo === tp ? "bg-primary-blue/10 text-primary-blue font-semibold" : "hover:bg-slate-50 text-onyx/80"}`}>
                              <span>{tp}</span>
                              {searchParams.tipo === tp && <span className="text-primary-blue text-xs">✓</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* HABITACIONES */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "hab" ? null : "hab")}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white border border-black/[0.05] hover:border-primary-blue/40 transition-colors flex items-center gap-3 cursor-pointer group focus:outline-none shadow-sm"
                    >
                      <Users className="w-4 h-4 text-primary-blue shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] text-onyx/40 uppercase tracking-wider font-bold mb-0.5">{t.hero.hab}</div>
                        <div className="text-sm text-onyx font-semibold flex items-center justify-between">
                          <span>{searchParams.hab}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-onyx/30 shrink-0 ml-1" />
                        </div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "hab" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          className="absolute top-full left-0 mt-2 w-36 bg-white border border-black/[0.06] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] z-30 p-1.5">
                          {["Cualquiera", "1+", "2+", "3+", "4+", "5+"].map((h) => (
                            <button key={h} type="button"
                              onClick={() => { setSearchParams(p => ({ ...p, hab: h })); setActiveDropdown(null); }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${searchParams.hab === h ? "bg-primary-blue/10 text-primary-blue font-semibold" : "hover:bg-slate-50 text-onyx/80"}`}>
                              <span>{h}</span>
                              {searchParams.hab === h && <span className="text-primary-blue text-xs">✓</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* PRECIO */}
                  <div className="relative flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "precio" ? null : "precio")}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white border border-black/[0.05] hover:border-primary-blue/40 transition-colors flex items-center gap-3 cursor-pointer group focus:outline-none shadow-sm"
                    >
                      <DollarSign className="w-4 h-4 text-primary-blue shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] text-onyx/40 uppercase tracking-wider font-bold mb-0.5">{t.hero.precio}</div>
                        <div className="text-sm text-onyx font-semibold flex items-center justify-between">
                          <span className="truncate">{searchParams.precio}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-onyx/30 shrink-0 ml-1" />
                        </div>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === "precio" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          className="absolute top-full right-0 mt-2 w-52 bg-white border border-black/[0.06] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] z-30 p-1.5">
                          {["Cualquiera", "100.000 €", "200.000 €", "300.000 €", "500.000 €", "750.000 €", "+1.000.000 €"].map((pr) => (
                            <button key={pr} type="button"
                              onClick={() => { setSearchParams(p => ({ ...p, precio: pr })); setActiveDropdown(null); }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${searchParams.precio === pr ? "bg-primary-blue/10 text-primary-blue font-semibold" : "hover:bg-slate-50 text-onyx/80"}`}>
                              <span>{pr}</span>
                              {searchParams.precio === pr && <span className="text-primary-blue text-xs">✓</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* SEARCH BUTTON */}
                <button
                  type="button"
                  onClick={() => alert(`Buscando: ${searchType} — ${searchParams.tipo} en ${searchParams.zona}, ${searchParams.hab} hab., hasta ${searchParams.precio}`)}
                  className="bg-primary-blue text-white font-bold text-[11px] uppercase tracking-[0.18em] px-8 py-3 rounded-xl hover:bg-onyx transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 shrink-0 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.hero.buscarBtn}</span>
                </button>
              </div>
            </motion.div>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="flex flex-col sm:flex-row items-center gap-8 mt-8"
            >
              <a href="#propiedades" className="text-[11px] font-semibold text-onyx/50 uppercase tracking-widest hover:text-primary-blue transition-colors flex items-center gap-2 group">
                <span>{t.cta.findHome}</span>
                <span className="group-hover:translate-x-1.5 transition-transform text-primary-blue">→</span>
              </a>
              <span className="hidden sm:inline text-onyx/15">|</span>
              <a href="#contacto" className="text-[11px] font-semibold text-onyx/50 uppercase tracking-widest hover:text-primary-blue transition-colors flex items-center gap-2 group">
                <span>{t.cta.contact}</span>
                <span className="group-hover:translate-x-1.5 transition-transform text-primary-blue">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROPERTIES SECTION */}
      <section id="propiedades" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.properties.tag}</p>
                <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                  {t.properties.title} <br />
                  <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }} className="text-primary-blue">{t.properties.titleItalic}</span>
                </h2>
              </div>
              <p className="text-onyx/50 max-w-sm text-base leading-relaxed">{t.properties.subtitle}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <PropertyCard img={property1} name="Piso en Gran Vía" location="Madrid Centro" specs="3 hab. · 2 baños · 110 m²" price="320.000 €" type="Piso en venta" />
            </Reveal>
            <Reveal delay={0.1}>
              <PropertyCard img={property2} name="Ático con terraza" location="Salamanca, Madrid" specs="4 hab. · 3 baños · 165 m²" price="590.000 €" type="Ático en venta" />
            </Reveal>
            <Reveal delay={0.2}>
              <PropertyCard img={property3} name="Local comercial" location="Chamberí, Madrid" specs="85 m² · Planta baja" price="195.000 €" type="Local en venta" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex justify-center mt-12">
              <a href="#contacto" className="inline-flex items-center gap-3 border border-primary-blue/30 text-primary-blue px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all duration-300">
                {t.properties.verTodas} →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES – The big 3 pillars */}
      <section id="servicios" className="py-28 md:py-36 px-6 md:px-12 bg-[#F8FAFC] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.services.tag}</p>
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                {t.services.title1}
                {" "}
                <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }} className="text-primary-blue">{t.services.title2}</span>
                {" "}{t.services.title3}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.services.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl p-8 border border-black/[0.06] hover:border-primary-blue/30 hover:shadow-[0_20px_50px_rgba(0,130,200,0.08)] transition-all duration-500 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-all duration-400">
                    {iconMap[card.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-onyx mb-3 leading-snug">{card.title}</h3>
                  <p className="text-onyx/55 text-sm leading-relaxed mb-6">{card.desc}</p>
                  <ul className="mt-auto space-y-2">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm text-onyx/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-blue shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacto" className="mt-8 text-[11px] font-bold uppercase tracking-wider text-primary-blue flex items-center gap-2 group-hover:gap-3 transition-all">
                    Saber más →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY QUOTE */}
      <section className="relative bg-onyx py-28 md:py-40 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={texture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-onyx/50" />
        </div>
        <Reveal className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary-blue font-bold mb-10">{t.philosophy.tag}</p>
          <blockquote key={language} className="text-2xl md:text-4xl lg:text-5xl text-white leading-[1.2]" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }}>
            {t.philosophy.quote}
          </blockquote>
          <div className="w-12 h-px bg-primary-blue mx-auto mt-12" />
        </Reveal>
      </section>

      {/* STATS */}
      <section className="py-24 md:py-32 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-16 text-center">{t.stats.tag}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={350} /></>} label={t.stats.communities} />
            <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={1200} /></>} label={t.stats.sold} />
            <StatBlock value={<><span className="text-primary-blue">+</span><Counter to={15} /></>} label={t.stats.experience} />
            <StatBlock value={<><Counter to={98} /><span className="text-primary-blue">%</span></>} label={t.stats.satisfied} />
          </div>
        </div>
      </section>

      {/* NOSOTROS / WHY US */}
      <section id="nosotros" className="py-28 md:py-36 px-6 md:px-12 bg-[#F8FAFC] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.nosotros.tag}</p>
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight text-onyx">
                {t.nosotros.title1} <br />
                <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }} className="text-primary-blue">{t.nosotros.title2}</span>
                {" "}{t.nosotros.title3}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.nosotros.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-8 border border-black/[0.05] hover:border-primary-blue/25 hover:shadow-[0_15px_40px_rgba(0,130,200,0.07)] transition-all duration-400 flex gap-5 items-start">
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
      </section>

      {/* CTA */}
      <section className="relative bg-primary-blue py-28 md:py-40 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <Reveal className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mb-6">{t.cta.tag}</p>
          <h2 key={language} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
            {t.cta.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#propiedades" className="bg-white text-primary-blue px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-onyx hover:text-white transition-all duration-300 shadow-lg">
              {t.cta.findHome}
            </a>
            <a href="#contacto" className="border-2 border-white/50 text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary-blue transition-all duration-300">
              {t.cta.contact}
            </a>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-28 md:py-36 px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary-blue font-bold mb-4">{t.contact.tag}</p>
              <h2 key={language} className="text-4xl md:text-6xl font-bold leading-tight mb-12">
                {t.contact.title1} <br />
                <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 400 }} className="text-primary-blue">{t.contact.title2}</span>
              </h2>
              <div className="space-y-6">
                <a href="tel:+34900000000" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.phone}</div>
                    <div className="font-semibold text-onyx">+34 900 000 000</div>
                  </div>
                </a>
                <a href="https://wa.me/34600000000" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.whatsapp}</div>
                    <div className="font-semibold text-onyx">+34 600 000 000</div>
                  </div>
                </a>
                <a href="mailto:contacto@gesgrama.com" className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-onyx/40 font-bold mb-0.5">{t.contact.email}</div>
                    <div className="font-semibold text-onyx">contacto@gesgrama.com</div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-black/[0.05]">
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
                    className="w-full bg-primary-blue text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-onyx transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99]"
                  >
                    {t.contact.submit}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12 bg-onyx text-alabaster/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logoImg} alt="Gesgrama" className="h-10 w-auto object-contain opacity-70" />
          <p className="text-[10px] uppercase tracking-[0.25em]">{t.footer.rights}</p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-primary-blue transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-primary-blue transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary-blue transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PropertyCard({ img, name, location, specs, price, type }: {
  img: string; name: string; location: string; specs: string; price: string; type: string;
}) {
  return (
    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1">
      <div className="overflow-hidden relative">
        <img src={img} alt={name} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-blue text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{type}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-base text-onyx mb-1">{name}</h3>
            <p className="text-[11px] text-onyx/45 uppercase tracking-wider font-medium">{location}</p>
          </div>
          <span className="font-bold text-lg text-primary-blue whitespace-nowrap">{price}</span>
        </div>
        <p className="text-[11px] text-onyx/40 mt-3 pt-3 border-t border-black/[0.05]">{specs}</p>
      </div>
    </div>
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
