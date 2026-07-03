import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import texture from "@/assets/texture.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

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
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <div className="bg-onyx text-alabaster font-sans selection:bg-champagne/30 overflow-x-clip">
      {/* NAVIGATION */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: easeOut }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-md bg-onyx/20"
      >
        <a href="#" className="text-xl tracking-[0.35em] font-light">AUREUM</a>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.25em] font-medium">
          <a href="#propiedades" className="hover:text-champagne transition-colors duration-500">Propiedades</a>
          <a href="#servicios" className="hover:text-champagne transition-colors duration-500">Servicios</a>
          <a href="#proceso" className="hover:text-champagne transition-colors duration-500">Proceso</a>
          <a href="#contacto" className="hover:text-champagne transition-colors duration-500">Contacto</a>
        </div>
        <a href="#contacto" className="border border-white/20 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:bg-alabaster hover:text-onyx transition-all duration-500">
          Concierge
        </a>
      </motion.nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-[110%]"
        >
          <img src={heroImg} alt="Villa cinematográfica al atardecer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/60 via-onyx/30 to-onyx/70" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-champagne mb-10"
          >
            Inmobiliaria — desde 2009
          </motion.p>
          <h1 className="font-serif text-5xl md:text-8xl leading-[1] mb-8">
            <LetterReveal text="Donde las mejores propiedades" delay={0.4} />
            <br />
            <span className="italic">
              <LetterReveal text="encuentran a sus nuevos propietarios." delay={0.9} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: easeOut }}
            className="text-alabaster/60 max-w-xl mx-auto text-base md:text-lg font-light mb-12"
          >
            No vendemos viviendas. Creamos oportunidades.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1, ease: easeOut }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <a href="#propiedades" className="group relative overflow-hidden bg-alabaster text-onyx px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-700">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-alabaster">Encontrar mi hogar</span>
              <span className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </a>
            <a href="#vender" className="group relative overflow-hidden border border-white/30 px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] backdrop-blur-sm transition-all duration-700 hover:border-champagne">
              <span className="relative z-10">Quiero vender mi casa</span>
            </a>
          </motion.div>
        </div>

        {/* Glass search bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease: easeOut }}
          className="absolute bottom-8 md:bottom-12 w-full max-w-5xl px-4 z-20"
        >
          <div
            className="rounded-full py-2 px-2 md:px-3 flex items-center justify-between text-[11px] tracking-widest uppercase border border-white/10"
            style={{
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex bg-white/5 rounded-full p-1 mr-2">
              <button className="px-4 md:px-5 py-2 rounded-full bg-alabaster text-onyx text-[10px] font-semibold">Comprar</button>
              <button className="px-4 md:px-5 py-2 rounded-full text-white/70 text-[10px]">Alquilar</button>
            </div>
            <div className="hidden md:flex flex-1 items-center">
              <SearchField label="Zona" value="Costa del Sol" />
              <SearchField label="Tipo" value="Villa" />
              <SearchField label="Hab." value="4+" />
              <SearchField label="Precio" value="€2M+" last />
            </div>
            <button className="bg-champagne text-onyx size-11 md:h-11 md:w-auto md:px-6 rounded-full grid place-items-center hover:scale-105 transition-transform text-[10px] font-semibold">
              <span className="hidden md:inline">Buscar</span>
              <span className="md:hidden">→</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* EDITORIAL PROPERTIES */}
      <section id="propiedades" className="py-32 md:py-48 px-6 md:px-12 bg-alabaster text-onyx">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">Colección 2026</p>
                <h2 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-2xl">
                  Piezas <br /><span className="italic">arquitectónicas.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-onyx/60 pb-4">
                Una selección curada de residencias que redefinen el estándar de la vida contemporánea. Cada propiedad, un manifiesto.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-32">
            <PropertyCard
              className="md:col-span-8"
              img={property1}
              aspect="aspect-[3/2]"
              name="Villa Neos"
              location="Mallorca"
              specs="6 hab. · 8 baños · 1.200 m²"
              price="8.450.000 €"
            />
            <PropertyCard
              className="md:col-span-4 md:mt-24"
              img={property2}
              aspect="aspect-[4/5]"
              name="Aurelia Heights"
              location="Madrid"
              specs="3 hab. · 320 m²"
              price="3.200.000 €"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <PropertyCard
              className="md:col-span-5"
              img={property3}
              aspect="aspect-[4/5]"
              name="Casa del Mar"
              location="Ibiza"
              specs="5 hab. · 720 m²"
              price="6.900.000 €"
            />
            <div className="md:col-span-6 md:col-start-7 md:self-end pb-12">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">Off-market</p>
                <p className="font-serif italic text-3xl md:text-5xl leading-[1.1] mb-10">
                  Más del 40% de las propiedades que gestionamos nunca se publican.
                </p>
                <a href="#contacto" className="inline-flex items-center gap-4 group">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Solicitar acceso privado</span>
                  <span className="w-12 h-px bg-onyx group-hover:w-20 transition-all duration-500" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL QUOTE */}
      <section className="relative min-h-screen bg-onyx flex items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          style={{ scale: useTransform(scrollY, [3000, 5000], [1, 1.15]) }}
          className="absolute inset-0 opacity-30"
        >
          <img src={texture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-onyx/60" />
        </motion.div>
        <Reveal className="relative z-10 max-w-5xl">
          <p className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-12">La filosofía</p>
          <blockquote className="font-serif text-3xl md:text-6xl lg:text-7xl leading-[1.1] italic">
            "No vendemos metros cuadrados. <br className="hidden md:block" />
            Vendemos el lugar donde vivirás <br className="hidden md:block" />
            los mejores momentos de tu vida."
          </blockquote>
          <div className="w-px h-20 bg-champagne/40 mx-auto mt-16" />
        </Reveal>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-32 md:py-48 px-6 md:px-12 bg-alabaster text-onyx">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="mb-24 md:mb-32">
              <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">Servicios</p>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-3xl">
                Una casa. <span className="italic">Un legado.</span> <br />
                Un mismo equipo.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-onyx/10">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-32 md:py-48 bg-onyx text-alabaster">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-16 text-center">Quince años de excelencia</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8">
            <StatBlock value={<><span className="text-champagne">+</span><Counter to={2000} /></>} label="Propiedades vendidas" />
            <StatBlock value={<><Counter to={98} /><span className="text-champagne">%</span></>} label="Clientes satisfechos" />
            <StatBlock value={<><span className="text-champagne">+</span><Counter to={15} /></>} label="Años de experiencia" />
            <StatBlock value={<><span className="text-champagne">+</span><Counter to={250} />M€</>} label="Volumen gestionado" />
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="proceso" className="py-32 md:py-48 px-6 md:px-12 bg-alabaster text-onyx">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="mb-24 md:mb-32 max-w-4xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6" id="vender">Vender con Aureum</p>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.95]">
                Siete pasos. <br />
                <span className="italic">Un resultado</span> excepcional.
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-onyx/10" />
            {process.map((p, i) => (
              <TimelineStep key={p.num} step={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-onyx">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-24 md:mb-32">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">Un estilo de vida</p>
                <h2 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-2xl">
                  Más allá de la <br /><span className="italic">arquitectura.</span>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <Reveal className="col-span-12 md:col-span-5" delay={0}>
              <img src={gallery1} alt="" loading="lazy" className="w-full aspect-[4/5] object-cover" />
            </Reveal>
            <Reveal className="col-span-12 md:col-span-7 md:mt-24" delay={0.1}>
              <img src={gallery2} alt="" loading="lazy" className="w-full aspect-[10/7] object-cover" />
            </Reveal>
            <Reveal className="col-span-12 md:col-span-4 md:col-start-3" delay={0.05}>
              <img src={gallery3} alt="" loading="lazy" className="w-full aspect-[4/5] object-cover" />
            </Reveal>
            <div className="col-span-12 md:col-span-5 md:col-start-8 self-center">
              <Reveal delay={0.1}>
                <p className="font-serif italic text-3xl md:text-4xl leading-[1.15] text-alabaster/80">
                  Interiorismo, arquitectura, luz. Cada detalle contribuye a la sensación de estar en casa.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-onyx py-32 md:py-56 text-center px-6 overflow-hidden">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-champagne mb-10">Un nuevo capítulo</p>
          <h2 className="font-serif italic text-5xl md:text-8xl lg:text-9xl mb-16 text-alabaster leading-[0.95]">
            Tu próxima gran decisión <br />empieza aquí.
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#propiedades" className="group relative overflow-hidden bg-alabaster text-onyx px-12 py-6 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-700">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-alabaster">Encontrar vivienda</span>
              <span className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </a>
            <a href="#contacto" className="border border-white/20 px-12 py-6 text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-champagne hover:text-champagne transition-all duration-500">
              Vender propiedad
            </a>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-32 md:py-48 px-6 md:px-12 bg-alabaster text-onyx">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-champagne mb-6">Contacto</p>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-12">
                Hablemos de <br /><span className="italic">su futuro.</span>
              </h2>
              <div className="space-y-8">
                <ContactLine label="Teléfono" value="+34 900 123 456" />
                <ContactLine label="WhatsApp" value="+34 600 000 000" />
                <ContactLine label="Email" value="concierge@aureum.es" />
                <ContactLine label="Oficinas" value="Madrid — Marbella — Palma" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <form className="space-y-10 pt-4">
                <FormField label="Nombre" placeholder="Su nombre" />
                <FormField label="Email" type="email" placeholder="su@email.com" />
                <FormField label="Teléfono" placeholder="+34" />
                <FormField label="Mensaje" placeholder="Cuéntenos su proyecto" textarea />
                <button
                  type="button"
                  className="group relative overflow-hidden bg-onyx text-alabaster px-12 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-700"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-onyx">Enviar solicitud</span>
                  <span className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-onyx/10 bg-alabaster text-onyx text-[10px] uppercase tracking-[0.25em]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="tracking-[0.4em]">AUREUM</div>
          <div>© 2026 Aureum Estates — Todos los derechos reservados</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-champagne transition-colors">Instagram</a>
            <a href="#" className="hover:text-champagne transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-champagne transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SearchField({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex-1 px-6 py-2 flex flex-col gap-1 ${!last ? "border-r border-white/10" : ""}`}>
      <span className="text-white/40 text-[9px] tracking-[0.2em]">{label}</span>
      <span className="text-alabaster text-[11px] normal-case tracking-normal">{value}</span>
    </div>
  );
}

function PropertyCard({ img, aspect, name, location, specs, price, className = "" }: {
  img: string; aspect: string; name: string; location: string; specs: string; price: string; className?: string;
}) {
  return (
    <Reveal className={`group cursor-pointer ${className}`}>
      <div className="overflow-hidden mb-6 relative">
        <img src={img} alt={name} loading="lazy" className={`w-full ${aspect} object-cover group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]`} />
        <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/10 transition-colors duration-700" />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="min-w-0">
          <h3 className="text-2xl md:text-3xl font-serif italic mb-2">{name}</h3>
          <p className="text-[10px] uppercase tracking-[0.25em] text-onyx/50">{location} · {specs}</p>
        </div>
        <span className="font-serif text-lg md:text-2xl whitespace-nowrap">{price}</span>
      </div>
    </Reveal>
  );
}

const services = [
  { title: "Comprar", desc: "Acceso a inventario off-market y asesoramiento personalizado." },
  { title: "Vender", desc: "Estrategia de marketing de alto impacto para activos singulares." },
  { title: "Valorar", desc: "Análisis riguroso de mercado y precio óptimo defendible." },
  { title: "Invertir", desc: "Gestión de carteras patrimoniales y análisis de rentabilidad." },
  { title: "Obra nueva", desc: "Preventa exclusiva de las promociones más deseadas." },
  { title: "Luxury", desc: "División especializada en propiedades a partir de 3M€." },
];

function ServiceCard({ service, index }: { service: { title: string; desc: string }; index: number }) {
  return (
    <Reveal delay={index * 0.05} className="bg-alabaster">
      <div className="p-10 md:p-14 group hover:bg-white transition-colors duration-500 h-full flex flex-col">
        <div className="flex items-baseline justify-between mb-16">
          <span className="font-serif text-champagne text-lg italic">0{index + 1}</span>
          <span className="w-8 h-px bg-onyx/20 group-hover:bg-champagne group-hover:w-16 transition-all duration-500" />
        </div>
        <h4 className="font-serif text-3xl md:text-4xl italic mb-6">{service.title}</h4>
        <p className="text-sm text-onyx/60 leading-relaxed max-w-[32ch]">{service.desc}</p>
      </div>
    </Reveal>
  );
}

function StatBlock({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <Reveal className="text-center">
      <div className="font-serif italic text-5xl md:text-7xl mb-4">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-alabaster/40">{label}</div>
    </Reveal>
  );
}

const process = [
  { num: "01", title: "Valoración", desc: "Análisis profundo del mercado para determinar el precio óptimo." },
  { num: "02", title: "Estrategia", desc: "Plan de comercialización personalizado para su propiedad." },
  { num: "03", title: "Reportaje", desc: "Producción fotográfica y cinematográfica al nivel de un editorial." },
  { num: "04", title: "Marketing", desc: "Campaña omnicanal en portales premium y redes exclusivas." },
  { num: "05", title: "Visitas", desc: "Filtrado y acompañamiento de compradores cualificados." },
  { num: "06", title: "Negociación", desc: "Defensa del valor real con máxima discreción." },
  { num: "07", title: "Venta", desc: "Cierre jurídico impecable y traspaso sereno." },
];

function TimelineStep({ step, index }: { step: { num: string; title: string; desc: string }; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <Reveal delay={0.05}>
      <div className={`relative flex md:grid md:grid-cols-2 gap-8 md:gap-24 py-10 md:py-16 pl-16 md:pl-0 ${isEven ? "" : "md:[direction:rtl]"}`}>
        <div className={`absolute left-6 md:left-1/2 top-14 w-3 h-3 rounded-full bg-champagne -translate-x-1/2 ring-8 ring-alabaster`} />
        <div className={`${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:[direction:ltr]"}`}>
          <span className="font-serif italic text-champagne text-2xl block mb-3">{step.num}</span>
          <h4 className="font-serif text-3xl md:text-5xl mb-4">{step.title}</h4>
        </div>
        <div className={`${isEven ? "md:pl-12" : "md:pr-12 md:[direction:ltr]"} flex items-center`}>
          <p className="text-sm md:text-base text-onyx/60 leading-relaxed max-w-md">{step.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-8 border-b border-onyx/10 pb-4 group">
      <span className="text-[10px] uppercase tracking-[0.3em] text-onyx/40 w-24 shrink-0">{label}</span>
      <span className="font-serif text-xl md:text-2xl group-hover:text-champagne transition-colors duration-500">{value}</span>
    </div>
  );
}

function FormField({ label, placeholder, type = "text", textarea }: { label: string; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <div className="group">
      <label className="text-[10px] uppercase tracking-[0.3em] text-onyx/40 block mb-3">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-onyx/20 pb-3 outline-none text-lg font-serif focus:border-champagne transition-colors duration-500 resize-none placeholder:text-onyx/25"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-onyx/20 pb-3 outline-none text-lg font-serif focus:border-champagne transition-colors duration-500 placeholder:text-onyx/25"
        />
      )}
    </div>
  );
}
