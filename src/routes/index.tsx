import { createFileRoute, Link } from "@tanstack/react-router";
import HeroCarousel from '../hero-carousel';
import { properties } from "../data/properties";
import { articles } from "../data/articles";
import { motion, useScroll, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Home, Building2, Scale, Phone, Mail, MessageCircle, Star, Clock, Shield, TrendingUp, Menu, X, ChevronRight, Calendar, ChevronDown, ArrowRight, Send, Check, Paintbrush } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import gesgramaOffice from "@/assets/gesgrama_storefront_final.webp";
import handKeysImg from "@/assets/hand_keys_blue.jpg";
import gallery1 from "@/assets/gallery-1.webp";
import { FooterAnimationGSAP } from '@/components/FooterAnimationGSAP';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';

export const Route = createFileRoute("/")(  {
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// TRANSLATIONS (es / en / ca)
// ---------------------------------------------------------------------------
import { translations } from "../data/translations";

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
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gesgrama_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try {
        localStorage.setItem('gesgrama_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving favorites:', e);
      }
      return updated;
    });
  };
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
  const tipos = ["Piso", "Ático", "Chalet", "Local comercial", "Oficina"];

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

  let displayProperties = filteredProperties.slice(0, visibleCount);
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
    <div className="bg-white text-onyx font-sans selection:bg-[#2563eb]/20 overflow-x-clip">
      <title>Gesgrama — Administración de Fincas, Inmobiliaria y Asesoría Jurídica en Barcelona</title>
      <meta name="description" content="Gestión profesional y transparente de comunidades, compraventa de pisos y asesoría jurídica experta en Barcelona, Santa Coloma y área metropolitana." />
      <link rel="canonical" href="https://www.gesgrama.es/" />
      <meta property="og:title" content="Gesgrama — Inmobiliaria y Administración de Fincas en Barcelona" />
      <meta property="og:description" content="Gestión profesional, transparente y cercana para tu comunidad y propiedad en Barcelona." />
      <meta property="og:url" content="https://www.gesgrama.es/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.gesgrama.es/logo.webp" />
      <meta name="twitter:card" content="summary_large_image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Gesgrama",
            "image": "https://www.gesgrama.es/logo.webp",
            "@id": "https://www.gesgrama.es",
            "url": "https://www.gesgrama.es",
            "telephone": "+34934685656",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. dels Banús, 49",
              "addressLocality": "Santa Coloma de Gramenet",
              "postalCode": "08923",
              "addressRegion": "Barcelona",
              "addressCountry": "ES"
            },
            "areaServed": ["Barcelona", "Santa Coloma de Gramenet", "Badalona", "Maresme", "Vallès"]
          })
        }}
      />

{/* â”€â”€ NAVIGATION (DARK PILL MOCKUP) â”€â”€ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[94%] max-w-[1300px] z-[100] flex items-center justify-between py-2 md:py-2.5 px-5 md:px-7 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
      >
        <a href="#" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2">
          <img src={logoImg} alt="Gesgrama" className="h-7 sm:h-9 md:h-10 w-auto max-w-[120px] sm:max-w-[150px] object-contain" />
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
            <>
              {/* Backdrop Overlay to close menu when touching outside */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                className="absolute top-full left-0 right-0 mt-4 bg-[#151f32] rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col gap-2 z-[100] lg:hidden"
              >
                <a href="#propiedades" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-white hover:text-[#60a5fa] hover:bg-white/5 py-3 px-4 rounded-xl transition-colors">{t.nav.propiedades}</a>
                <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-white hover:text-[#60a5fa] hover:bg-white/5 py-3 px-4 rounded-xl transition-colors">{t.nav.servicios}</a>
                <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-white hover:text-[#60a5fa] hover:bg-white/5 py-3 px-4 rounded-xl transition-colors">{t.nav.nosotros}</a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-white hover:text-[#60a5fa] hover:bg-white/5 py-3 px-4 rounded-xl transition-colors">{t.nav.contacto}</a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="mt-2 text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {t.nav.portal}
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <HeroCarousel onPerformSearch={handleHeroSearch} language={language} />

      {/* ── VALORADOR DE INMUEBLES (BG SWAPPED TO BLUE - POINT 4) ── */}
      <section id="valuator-form" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14">
        <div className="bg-[#005c99] rounded-[28px] md:rounded-[36px] shadow-xl p-6 sm:p-8 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white border border-white/20 text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 w-fit shadow-xs backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                {t.valorador.tag}
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight font-sans">
                {t.valorador.title} <span className="text-blue-200">{t.valorador.titleAccent}</span>
              </h2>

              <p className="text-blue-100 text-base md:text-17px max-w-[500px] mb-8 leading-relaxed font-semibold">
                {t.valorador.subtitle}
              </p>

              <div className="w-full max-w-xl">
                {valuatorSubmitted ? (
                  <div className="bg-white text-[#0f172a] rounded-3xl p-8 shadow-md">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <h3 className="font-bold text-2xl mb-2">{t.valorador.enviada}</h3>
                    <p className="text-slate-500 mb-6">{t.valorador.enviadaDesc}</p>
                    <button 
                      onClick={() => { setValuatorSubmitted(false); setValuatorData({ zona: "", tipo: "", metros: "", contacto: "" }); }} 
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-sm cursor-pointer"
                    >
                      {t.valorador.nuevaValoracion}
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Inputs Row */}
                    <div className="flex flex-col sm:flex-row gap-3.5 mb-4">
                      {/* Select Zona */}
                      <div className="flex-1 bg-white rounded-full px-5 py-3.5 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3 w-full">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                          <select
                            value={valuatorData.zona}
                            onChange={e => setValuatorData(d => ({ ...d, zona: e.target.value }))}
                            className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-[#0f172a] focus:ring-0 appearance-none cursor-pointer outline-none font-sans"
                          >
                            <option value="" disabled hidden>{t.valorador.seleccionaZona}</option>
                            {zonas.map(z => <option key={z} value={z}>{z}</option>)}
                          </select>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>

                      {/* Input Superficie */}
                      <div className="flex-1 bg-white rounded-full px-5 py-3.5 flex items-center gap-3 shadow-xs">
                        <Home className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder={t.valorador.superficieLabel}
                          value={valuatorData.metros}
                          onChange={e => setValuatorData(d => ({ ...d, metros: e.target.value }))}
                          className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-[#0f172a] focus:ring-0 outline-none placeholder:text-slate-400 font-sans"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      onClick={() => { if (valuatorData.zona || valuatorData.metros) setValuatorSubmitted(true); }}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mb-6"
                    >
                      <Home className="w-4 h-4" />
                      {t.valorador.botonCalcular} <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Footer Badges */}
                    <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-bold">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                        {t.valorador.sinCompromiso}
                      </span>
                      <span className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                        {t.valorador.resultadoInmediato}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: White Floating Price Card */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="bg-white text-[#0f172a] rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-[380px] border border-slate-100">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">{t.valorador.ejemploResultado}</div>
                <div className="text-xs font-extrabold text-[#2563eb] uppercase tracking-wider mb-2 font-sans">{t.valorador.valorEstimado}</div>
                
                <div className="text-4xl md:text-[44px] font-black text-[#0f172a] mb-3 leading-none tracking-tight font-sans">
                  245<span className="text-slate-400 font-normal">.000€</span>
                </div>
                
                <div className="text-xs md:text-sm font-bold text-slate-500 mb-1 font-sans">
                  {t.valorador.rangoEstimado} <span className="text-[#0f172a]">230.000€ – 260.000€</span>
                </div>
                <div className="text-[11px] leading-tight text-slate-400 mb-8 font-medium">
                  {t.valorador.estimacionAutomatizada}
                </div>
                
                {/* Sparkline Price Trend Chart */}
                <div className="mb-6 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2 font-sans">
                    <span>Tendencia de precios (6 meses)</span>
                    <span className="text-emerald-600 flex items-center gap-0.5 font-sans"><TrendingUp className="w-3.5 h-3.5" /> +4.2%</span>
                  </div>
                  <div className="w-full h-12 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" fill="none">
                      <defs>
                        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 L 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4 L 200 40 L 0 40 Z" fill="url(#sparklineGrad)" />
                      <path d="M 0 30 Q 30 28 40 22 T 80 20 T 120 14 T 160 10 L 200 4" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="0" cy="30" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="40" cy="22" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="80" cy="20" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="120" cy="14" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="160" cy="10" r="2.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                      <circle cx="200" cy="4" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  {t.valorador.actualizadoHoy}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROPERTIES GRID (REFERENCE IMAGE 1 STYLE) ── */}
      <section id="propiedades" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/60 p-5 sm:p-8 md:p-12 mx-4 md:mx-auto max-w-[1300px] relative z-10">
          <Reveal>
            <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 w-fit">
                  <Home className="w-3.5 h-3.5" />
                  {t.properties.tag}
                </span>
                <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-[#0f172a] tracking-tight mb-4 font-sans">
                  {t.properties.title} <span className="text-[#2563eb]">{t.properties.titleAccent}</span>
                </h2>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                  {t.properties.subtitle}
                </p>
              </div>
              
              {/* Stat Card */}
              <div className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl md:rounded-3xl p-5 md:pr-8 shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 text-[#2563eb]">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-black text-[#0f172a] mb-0.5">{filteredProperties.length}</p>
                  <p className="text-xs text-slate-500 font-semibold leading-tight">{t.properties.availableCount}</p>
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
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.propertyType}</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.tipo}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "tipo" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: t.properties.anyType, value: "Cualquier tipo" },
                      { label: "Piso", value: "Piso" },
                      { label: "Á tico", value: "Á tico" },
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
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.zone}</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.zona}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "zona" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: t.properties.allZones, value: "Cualquier zona" },
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
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.bedrooms}</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.habitaciones}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "habitaciones" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {[
                      { label: t.properties.anyBedrooms, value: "Cualquier número" },
                      { label: "1+ " + t.properties.bedrooms.toLowerCase(), value: "1+" },
                      { label: "2+ " + t.properties.bedrooms.toLowerCase(), value: "2+" },
                      { label: "3+ " + t.properties.bedrooms.toLowerCase(), value: "3+" },
                      { label: "4+ " + t.properties.bedrooms.toLowerCase(), value: "4+" }
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
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 font-sans">{t.properties.maxPrice}</div>
                      <div className="text-sm font-bold text-onyx leading-none font-sans">{consoleFilters.precio}</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-onyx transition-colors" />
                </button>

                {openDropdown === "precio" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 py-3">
                    {(searchParams.mode === "alquilar" 
                      ? [t.properties.anyPrice, "Hasta 1.500 €", "Hasta 2.000 €", "Hasta 3.000 €"]
                      : [t.properties.anyPrice, "Hasta 500.000 €", "Hasta 1.000.000 €", "Hasta 2.000.000 €"]
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
                {t.hero.buscarBtn}
              </button>
            </div>

            {/* Quick access chips for zones */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2 font-sans">{t.properties.popularZones}:</span>
              {[
                { label: t.properties.allZones, value: "Cualquier zona" },
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

            const renderPropertyCard = (property: any, idx: number) => {
              const isFav = favorites.includes(property.id);

              return (
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
                      
                      {/* Heart Favorite Button with LocalStorage Persistence */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(property.id);
                        }}
                        aria-label="Guardar en favoritos"
                        className={`absolute top-4 right-4 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md z-20 ${
                          isFav 
                            ? 'bg-red-500 text-white scale-110 shadow-red-500/30' 
                            : 'bg-white/90 text-slate-700 hover:text-red-500 hover:scale-110'
                        }`}
                      >
                        <svg 
                          className="w-5 h-5 transition-transform duration-300" 
                          fill={isFav ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
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
                        if (type === "Á tico") {
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
          };

            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60">
                  <p className="text-sm font-bold text-slate-500">
                    <strong className="text-[#005c99]">{filteredProperties.length}</strong> {t.properties.availableCount}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500 font-bold">{t.properties.sortBy}:</span>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-onyx hover:bg-slate-50 transition-colors shadow-sm">
                      {t.properties.mostRecent} <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {isFallback && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-amber-800 text-sm font-medium">
                    {t.properties.fallbackMsg}
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
              {visibleCount < filteredProperties.length ? (
                <button 
                  onClick={() => setVisibleCount(filteredProperties.length)}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto hover:scale-105 mb-2 cursor-pointer"
                >
                  {t.properties.verTodas} ({filteredProperties.length - visibleCount} {t.properties.disponibles})
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setSearchParams({
                      mode: "comprar",
                      zona: "Cualquier zona",
                      tipo: "Cualquier tipo",
                      precio: "Cualquier precio",
                      habitaciones: "Cualquier número"
                    });
                    setVisibleCount(properties.length);
                  }}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto hover:scale-105 mb-2 cursor-pointer"
                >
                  {t.properties.verTodas}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <p className="text-xs text-slate-500 font-semibold">{t.properties.showingAll}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES SECTION (LIGHT GRAY BUBBLE CARD #f1f5f9 - POINT 1 FIX) ── */}
      <section id="servicios" className="relative overflow-hidden bg-white text-onyx py-6 md:py-14">
        <div className="bg-[#f1f5f9] rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/80 p-5 sm:p-8 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden">
          <div className="text-center mb-14">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 shadow-xs">
                <Building2 className="w-3.5 h-3.5" />
                {t.servicios.tag}
              </span>
            </Reveal>
            <Reveal>
              <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] mb-4 tracking-tight font-sans">
                {t.servicios.title1} <span className="text-[#2563eb]">{t.servicios.title2}</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                {t.servicios.subtitle}
              </p>
            </Reveal>
          </div>

          {/* Grid de 4 tarjetas Bubble blancas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {t.servicios.items.map((item, i) => {
              const icons = [
                <Building2 key={0} className="w-5 h-5" />,
                <TrendingUp key={1} className="w-5 h-5" />,
                <Shield key={2} className="w-5 h-5" />,
                <Paintbrush key={3} className="w-5 h-5" />
              ];
              const bgs = [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
              ];
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group bg-white rounded-3xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-[420px]">
                    {/* Superior: Imagen */}
                    <div className="relative h-[55%] w-full rounded-2xl mb-8">
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img src={bgs[i]} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      {/* Icono circular superpuesto en esquina inferior */}
                      <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-full bg-[#2563eb] text-white shadow-md flex items-center justify-center z-10">
                        {icons[i]}
                      </div>
                    </div>

                    {/* Inferior: Contenido */}
                    <div className="flex-1 flex flex-col justify-between px-2">
                      <div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="pt-4">
                        <button 
                          onClick={() => setSelectedServiceIndex(i)}
                          className="text-[#2563eb] hover:text-[#1d4ed8] text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all cursor-pointer border-0 bg-transparent p-0"
                        >
                          {t.servicios.saberMas} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS / PHILOSOPHY ── */}
      <section id="testimonios" className="py-10 md:py-32 px-4 sm:px-6 md:px-12 bg-white text-onyx relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <Reveal>
            <div className="mb-8 md:mb-16 text-center">
              <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                {t.testimonios.tag}
              </span>
              <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0f172a] tracking-tight mb-4 font-serif">
                {t.testimonios.title1} <span className="text-[#2563eb] italic font-serif">{t.testimonios.title1Accent}</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium">
                {t.testimonios.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonios.items.slice(0, 3).map((item, i) => {
              const avatars = [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              ];
              return (
                <Reveal key={item.author} delay={i * 0.1}>
                  <div className="bg-[#eef2f7] rounded-3xl p-8 md:p-10 flex flex-col items-center text-center h-full border border-slate-200/60 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    {/* Estrellas */}
                    <div className="flex justify-center gap-1.5 mb-6">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-5 h-5 fill-[#2563eb] text-[#2563eb]" />
                      ))}
                    </div>
                    
                    {/* Cita */}
                    <p className="text-slate-600 text-base md:text-17px leading-relaxed italic flex-1 mb-8 font-medium">"{item.quote}"</p>
                    
                    {/* Autor */}
                    <div className="flex flex-col items-center gap-3 mt-auto">
                      <img src={avatars[i % avatars.length]} alt={item.author} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shrink-0 shadow-sm" />
                      <div>
                        <div className="font-bold text-base text-[#0f172a] mb-0.5">{item.author}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.location}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY (COBERTURA / PROYECTOS EXCLUSIVOS - POINT 5 LIGHT GRAY BG) ── */}
      <section id="cobertura" className="py-6 md:py-14 px-4 md:px-8 bg-white text-onyx">
        <div className="bg-[#f1f5f9] rounded-[28px] md:rounded-[36px] shadow-sm border border-slate-200/80 p-5 sm:p-8 md:p-12 mx-auto max-w-[1300px] relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 bg-[#dbeafe] text-[#2563eb] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {t.cobertura.tag}
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-[#0f172a] mb-4 font-sans">
                  {t.cobertura.title1} {t.cobertura.title2}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-lg mb-6 font-medium leading-relaxed">
                  {t.cobertura.subtitle}
                </p>
              </Reveal>

              {/* Help Bubble Card */}
              <Reveal delay={0.1} className="w-full">
                <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 text-white shadow-sm">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#0f172a]">{t.cobertura.necesitasAyuda}</h4>
                      <p className="text-slate-500 text-xs font-medium">{t.cobertura.estamosAqui}</p>
                    </div>
                  </div>
                  <a href="#contacto" className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-sm flex items-center justify-center gap-2 shrink-0">
                    {t.cobertura.contactarAhora} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT CONTENT: MAP (POINT 1 MOBILE BUG FIX) */}
            <div 
              className="w-full lg:w-1/2 relative h-[320px] sm:h-[380px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/60 bg-slate-100 group shadow-xs"
            >
              <Reveal delay={0.2} className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
                ></iframe>

                {/* Floating Card Bottom Right */}
                <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-lg border border-slate-100 z-30 pointer-events-auto max-w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0f172a] text-sm">{t.cobertura.sedeCentral}</h4>
                      <p className="text-slate-500 text-xs">{t.cobertura.direccionSede}</p>
                    </div>
                  </div>
                </div>

              </Reveal>
            </div>

          </div>
        </div>
      </section>

{/* â”€â”€ CTA (FLOATING DARK NAVY BUBBLE CARD) â”€â”€ */}
      <section className="py-10 md:py-14 px-4 md:px-8 bg-white text-white">
        <div className="bg-[#0b172a] rounded-[28px] md:rounded-[36px] shadow-sm border border-white/10 p-8 md:p-14 mx-auto max-w-[1300px] relative z-10 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center text-center justify-center gap-1.5 bg-[#2563eb] text-white text-[9.5px] sm:text-[11px] font-bold tracking-wider uppercase px-3.5 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 w-fit max-w-full leading-tight">
                  {t.hero.tag}
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white mb-6 font-sans">
                  {t.hero.heroTitle}
                </h2>
                
                <p className="text-slate-300 text-base md:text-lg max-w-md mb-8 font-medium">
                  {t.hero.heroSub}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                  <a href="#propiedades" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 group w-full sm:w-auto">
                    {t.hero.verPropiedades}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contacto" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 group w-full sm:w-auto">
                    {t.hero.hablarAsesor}
                  </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-white mb-0.5">300+</p>
                    <p className="text-xs text-slate-400 font-medium">{t.hero.stats.comunidades}</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-white mb-0.5">15+</p>
                    <p className="text-xs text-slate-400 font-medium">{t.hero.stats.anos}</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-white mb-0.5">98%</p>
                    <p className="text-xs text-slate-400 font-medium">{t.hero.stats.satisfaccion}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md">
              <Reveal delay={0.2} className="w-full h-full">
                <img 
                  src={gesgramaOffice} 
                  alt="Oficina principal Gesgrama" 
                  className="absolute inset-0 w-full h-full object-cover object-center" 
                />
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── ÚLTIMAS NOTICIAS (BLOG) ── */}
      <section id="blog" className="py-10 md:py-32 px-4 sm:px-6 md:px-12 bg-[#e2e8f0] text-onyx">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="mb-14 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/10 flex items-center justify-center mx-auto mb-4 text-[#2563eb]">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                {t.noticias.tag}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 font-serif">
                {t.noticias.title1} <span className="text-[#2563eb] italic font-serif">{t.noticias.title2}</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg max-w-lg mx-auto font-medium">
                {t.noticias.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {articles.map((art, i) => {
              const artContent = art[language];
              return (
                <Reveal key={art.id} delay={i * 0.1}>
                  <div className="bg-white rounded-3xl p-5 flex flex-col h-full border border-slate-200/60 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                      <img
                        src={art.image}
                        alt={artContent.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] font-bold mb-2.5">
                        <span className="bg-[#2563eb]/10 text-[#2563eb] px-3 py-1 rounded-full">{artContent.category}</span>
                        <span className="text-slate-400 font-medium">{artContent.date}</span>
                      </div>
                      <h3 className="font-bold text-[#0f172a] text-base leading-snug mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                        {artContent.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                        {artContent.summary}
                      </p>
                      <div className="mt-auto pt-2">
                        <Link
                          to="/noticias/$slug"
                          params={{ slug: art.slug }}
                          className="text-[#2563eb] text-xs font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                        >
                          {t.noticias.seguirLeyendo} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="text-center">
            <a href="#" className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md">
              {t.noticias.verTodasBtn}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ (FLOATING DARK NAVY BUBBLE CARD - POINT 3 FIX) ── */}
      <section 
        id="faq" 
        className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-14"
      >
        <div className="bg-[#0f172a] rounded-[28px] md:rounded-[36px] shadow-xl border border-white/10 p-6 sm:p-8 md:p-14 mx-4 md:mx-auto max-w-[1300px] relative z-10 overflow-hidden text-white flex flex-col items-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center w-full">
            <Reveal>
              <div className="text-center mb-14">
                <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/20 flex items-center justify-center mx-auto mb-4 text-[#60a5fa]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 bg-[#2563eb]/20 text-[#60a5fa] text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                  {t.faq.tag}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight font-serif mb-3">
                  {t.faq.title} <span className="text-[#60a5fa] italic font-serif">{t.faq.titleAccent}</span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg font-medium">
                  {t.faq.subtitle}
                </p>
              </div>
            </Reveal>

            <div className="w-full flex flex-col gap-4 mb-10">
              {t.faq.items.map((item, i) => {
                const isActive = activeFaq === i;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div 
                      onClick={() => setActiveFaq(isActive ? null : i)}
                      className="cursor-pointer bg-[#1e293b]/70 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:px-8 md:py-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-white/20 group"
                    >
                      <div className="flex justify-between items-center gap-6">
                        <h3 className="font-bold text-white text-base md:text-lg pr-4">{item.q}</h3>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-[#2563eb] text-white rotate-45' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>
                          <span className="text-lg font-bold leading-none">+</span>
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
                            <p className="pt-4 text-slate-300 leading-relaxed font-medium text-sm md:text-base border-t border-white/10 mt-4">
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

            <div className="text-center">
              <a href="#contacto" className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-white font-semibold text-sm hover:gap-3 transition-all">
                {t.faq.askDoubt} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contacto" className="py-10 md:py-32 px-4 sm:px-6 md:px-12 bg-white text-onyx">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
                {t.contacto.badge}
              </span>
              <h2 key={language} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 font-serif text-[#0f172a]">
                {t.contacto.title1} <br />
                <span className="text-[#2563eb] italic font-serif">{t.contacto.title2}</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg mb-8 font-medium leading-relaxed">
                {t.contacto.subtitle}
              </p>
              
              {/* Image Card with Central Office Overlay */}
              <div className="relative rounded-3xl overflow-hidden shadow-md aspect-[16/10] mb-8 border border-slate-200/60">
                <img 
                  src={gesgramaOffice} 
                  alt="Gesgrama oficina principal" 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
                
                {/* Floating Office Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100 max-w-[260px]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0 text-[#2563eb] mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f172a]">{t.cobertura.sedeCentral}</div>
                      <div className="text-xs text-slate-500">Av. dels Banús, 49<br />08923 Santa Coloma de Gramenet, Barcelona</div>
                      <a href="tel:+34934685656" className="inline-flex items-center gap-1.5 text-[#2563eb] font-bold text-xs mt-2">
                        <Phone className="w-3.5 h-3.5" /> 934 685 656
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="bg-white border border-slate-200/60 p-8 md:p-12 rounded-3xl shadow-[0_2px_8px_rgba(15,23,42,0.04),0_8px_32px_rgba(15,23,42,0.06)]">
                <h3 className="font-bold text-2xl md:text-3xl text-[#0f172a] mb-8 tracking-tight">{t.contacto.form.formTitle}</h3>
                <form key={language} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-slate-500 font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contacto.form.nombre}</label>
                      <input type="text" placeholder={t.contacto.form.nombrePlaceholder} className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="text-slate-500 font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contacto.form.telefono}</label>
                      <input type="text" placeholder="600 000 000" className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-slate-500 font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contacto.form.email}</label>
                    <input type="email" placeholder="tu-correo@ejemplo.com" className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors" />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contacto.form.asunto}</label>
                    <div className="relative">
                      <select className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 sm:px-5 py-3.5 text-xs sm:text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors appearance-none pr-9 cursor-pointer truncate font-sans">
                        {Object.values(t.contacto.form.asuntoOpciones).map(opt => <option key={opt as string} className="text-xs sm:text-sm">{opt as string}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold uppercase tracking-wider block mb-2 text-[11px]">{t.contacto.form.mensaje}</label>
                    <textarea rows={3} placeholder={t.contacto.form.mensajePlaceholder} className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-medium text-[#0f172a] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-colors resize-none" />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="privacy" className="rounded text-[#2563eb] focus:ring-[#2563eb]" />
                    <label htmlFor="privacy" className="text-xs text-slate-500 font-medium">{t.contacto.form.privacidad}</label>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <span>{t.contacto.form.botonEnviar}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FINAL CLOSING CTA BANNER (POINT 3 & 4 MOBILE FIX) ── */}
      <section id="final-cta" className="py-6 md:py-14 px-4 md:px-8 bg-white text-white">
        <div className="bg-gradient-to-r from-[#005c99] to-[#2563eb] rounded-[28px] md:rounded-[36px] shadow-xl border border-white/20 px-5 py-12 sm:px-10 sm:py-16 md:p-16 mx-auto max-w-[1300px] relative z-10 overflow-hidden text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              {t.finalCta.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight font-sans max-w-3xl mx-auto px-2">
              {t.finalCta.title}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-8 font-medium leading-relaxed px-2">
              {t.finalCta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href="#valuator-form"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#005c99] px-8 py-4 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#005c99]" />
                <span>{t.finalCta.btnPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contacto"
                className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>{t.finalCta.btnSecondary}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

{/* â”€â”€ FOOTER GSAP â”€â”€ */}
      <footer className="bg-[#0b1221] text-slate-300 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-0 flex flex-col lg:flex-row gap-12 relative">
          
          {/* Text Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8">
            {/* Logo + tagline */}
            <div className="lg:col-span-1">
              <img src={logoImg} alt="Gesgrama" className="h-12 w-auto object-contain opacity-100 mb-4" />
              <p className="text-[13px] leading-relaxed text-slate-300 max-w-[200px]">
                {t.footer.descripcion}
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

      {/* Floating Utilities (Point 7 Fix) */}
      <WhatsAppButton language={language} />
      <CookieBanner language={language} />

      {/* Service Detail Modal (Point 3 Fix) */}
      <AnimatePresence>
        {selectedServiceIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedServiceIndex(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] mb-2 font-sans">
                {t.serviceModal.items[selectedServiceIndex]?.title}
              </h3>
              <p className="text-[#2563eb] text-sm font-bold mb-4">
                {t.serviceModal.items[selectedServiceIndex]?.tagline}
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {t.serviceModal.items[selectedServiceIndex]?.description}
              </p>

              <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-200/70 mb-8 space-y-3">
                {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#contacto"
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {t.serviceModal.contactBtn} <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedServiceIndex(null)}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3.5 px-6 rounded-full transition-all cursor-pointer"
                >
                  {t.serviceModal.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

