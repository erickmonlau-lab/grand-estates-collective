import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/logo.png";
import { Phone, MessageCircle, Mail, MapPin, Building, Home, Key, Shield, Clock, Star, TrendingUp, Search, X } from "lucide-react";
import { properties, PropertyType } from "../data/properties";

export const Route = createFileRoute("/")({
  component: Index,
});

const easeOut = [0.16, 1, 0.3, 1] as const;

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

function Index() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);

  // Filters State
  const [filterType, setFilterType] = useState<PropertyType | "Todos">("Todos");
  const [filterZone, setFilterZone] = useState<string>("Todas");

  const zones = useMemo(() => ["Todas", ...Array.from(new Set(properties.map(p => p.location)))], []);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (filterType !== "Todos" && p.type !== filterType) return false;
      if (filterZone !== "Todas" && p.location !== filterZone) return false;
      return true;
    });
  }, [filterType, filterZone]);

  return (
    <div className="bg-white text-onyx font-sans selection:bg-primary-blue/30 overflow-x-clip">
      {/* NAVIGATION */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: easeOut }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-md bg-white/90 border-b border-black/5"
      >
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Gesgrama" className="h-8 w-auto object-contain" />
        </div>
        <div className="hidden md:flex gap-8 text-[12px] font-bold text-onyx">
          <a href="#propiedades" className="hover:text-primary-blue transition-colors duration-300">Inmobiliaria</a>
          <a href="#servicios" className="hover:text-primary-blue transition-colors duration-300">Servicios</a>
          <a href="#nosotros" className="hover:text-primary-blue transition-colors duration-300">Nosotros</a>
          <a href="#contacto" className="hover:text-primary-blue transition-colors duration-300">Contacto</a>
        </div>
        <a href="#contacto" className="bg-primary-blue text-white px-6 py-2.5 rounded-full text-[12px] font-bold hover:scale-105 transition-all shadow-md">
          Portal de Clientes
        </a>
      </motion.nav>

      {/* HERO SECTION (DISET VIBES) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 w-full h-[110%] bg-onyx">
          <img src={heroImg} alt="Barcelona Hero" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/90 via-onyx/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1400px] w-full mx-auto">
          <Reveal>
            <div className="inline-flex items-center bg-primary-blue text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(0,130,200,0.5)]">
              <span className="w-2 h-2 rounded-full bg-white mr-3 animate-pulse" />
              +15 Años de Experiencia · Barcelona
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8 max-w-4xl">
              Especialistas en <span className="text-primary-blue">administración de fincas</span> e <span className="text-primary-blue">inmobiliaria</span> en Barcelona
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10">
              Encontramos tu hogar. Nosotros nos ocupamos del resto. Disfruta de la tranquilidad de tu piso mientras gestionamos la complejidad.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a href="#contacto" className="bg-primary-blue text-white px-10 py-4 rounded-full text-[13px] font-bold shadow-[0_8px_20px_rgba(0,130,200,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,130,200,0.5)] transition-all flex items-center justify-center">
                Solicitar Presupuesto
              </a>
              <a href="tel:+34900000000" className="bg-white text-onyx px-10 py-4 rounded-full text-[13px] font-bold shadow-lg hover:-translate-y-1 hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <Phone className="w-4 h-4 text-primary-blue" />
                Llamar Ahora
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-16 flex items-center gap-4 text-white">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-onyx bg-gray-400" />
                <div className="w-10 h-10 rounded-full border-2 border-onyx bg-gray-500" />
                <div className="w-10 h-10 rounded-full border-2 border-onyx bg-gray-600" />
              </div>
              <div>
                <div className="flex text-primary-blue text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-[11px] font-medium text-white/80 mt-1"><span className="font-bold text-white">+4,500</span> proyectos gestionados con éxito</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROPERTIES SECTION WITH FILTERS */}
      <section id="propiedades" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-onyx mb-4">Descubre <span className="text-primary-blue">tu próximo hogar.</span></h2>
              <p className="text-onyx/60 text-lg font-medium">Inmuebles exclusivos en las mejores zonas de Barcelona.</p>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-2xl md:rounded-full border border-black/5 shadow-sm">
              <select 
                value={filterType} 
                onChange={e => setFilterType(e.target.value as PropertyType)}
                className="bg-transparent text-sm font-semibold text-onyx px-6 py-3 outline-none cursor-pointer rounded-full hover:bg-gray-50"
              >
                <option value="Todos">Tipo de inmueble</option>
                <option value="Piso">Piso</option>
                <option value="Ático">Ático</option>
                <option value="Chalet">Chalet</option>
                <option value="Local comercial">Local</option>
              </select>
              <div className="w-px h-8 bg-black/10 self-center hidden md:block" />
              <select 
                value={filterZone} 
                onChange={e => setFilterZone(e.target.value)}
                className="bg-transparent text-sm font-semibold text-onyx px-6 py-3 outline-none cursor-pointer rounded-full hover:bg-gray-50"
              >
                {zones.map(z => <option key={z} value={z}>{z === "Todas" ? "Todas las Zonas" : z}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop, i) => (
                <Reveal key={prop.id} delay={i * 0.1}>
                  <Link to="/inmobiliaria/$slug" params={{ slug: prop.slug }} className="block group bg-white rounded-3xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-xl hover:border-primary-blue/40 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-primary-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">{prop.type}</span>
                      </div>
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-onyx mb-1">{prop.name}</h3>
                          <p className="text-[12px] font-semibold text-onyx/50 uppercase tracking-wider flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {prop.location}
                          </p>
                        </div>
                        <span className="text-xl font-extrabold text-primary-blue">{prop.priceFormatted}</span>
                      </div>
                      <p className="text-sm text-onyx/60 font-medium pt-4 border-t border-black/5 flex gap-4">
                        <span>{prop.bedrooms} Hab</span>
                        <span>{prop.bathrooms} Baños</span>
                        <span>{prop.surface} m²</span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-black/5">
                <Search className="w-12 h-12 text-onyx/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-onyx mb-2">No se encontraron propiedades</h3>
                <p className="text-onyx/60 font-medium">Prueba a ajustar los filtros de búsqueda.</p>
                <button onClick={() => {setFilterType("Todos"); setFilterZone("Todas");}} className="mt-6 text-primary-blue font-bold text-sm hover:underline">Limpiar Filtros</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS & PHILOSOPHY UNIFIED SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[11px] uppercase tracking-widest text-primary-blue font-bold mb-6">Por qué Gesgrama</p>
              <blockquote className="text-2xl md:text-4xl text-onyx leading-snug font-extrabold relative">
                <span className="text-primary-blue text-6xl absolute -top-6 -left-6 opacity-20">"</span>
                Transparencia, profesionalidad y cercanía en cada gestión.
              </blockquote>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-8 md:gap-12 bg-[#F8FAFC] p-8 md:p-12 rounded-3xl border border-black/[0.05] shadow-sm">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-onyx mb-2"><span className="text-primary-blue">+</span><Counter to={350} /></div>
                  <div className="text-[11px] uppercase tracking-wider text-onyx/50 font-bold">Comunidades</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-onyx mb-2"><span className="text-primary-blue">+</span><Counter to={1200} /></div>
                  <div className="text-[11px] uppercase tracking-wider text-onyx/50 font-bold">Ventas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-onyx mb-2"><span className="text-primary-blue">+</span><Counter to={15} /></div>
                  <div className="text-[11px] uppercase tracking-wider text-onyx/50 font-bold">Años Exp.</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-onyx mb-2"><Counter to={98} /><span className="text-primary-blue">%</span></div>
                  <div className="text-[11px] uppercase tracking-wider text-onyx/50 font-bold">Satisfacción</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-onyx py-16 px-6 md:px-12 text-white/60">
        <div className="max-w-[1400px] mx-auto text-center font-medium text-sm">
          <p>© 2026 Gesgrama - Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
