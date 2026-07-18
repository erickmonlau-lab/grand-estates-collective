import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, TrendingUp, Building2, Phone } from "lucide-react";
import heroBg from "@/assets/family_barcelona_penthouse.jpg"; 

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
}

// ── Animated Counter ──
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(easeOut * to);
      setDisplay(currentCount.toString());
      if (percentage < 1) requestAnimationFrame(animateCount);
      else setDisplay(to.toString());
    };
    requestAnimationFrame(animateCount);
  }, [inView, to]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay((current) => {
        if (current === '0') {
          let startTime: number;
          const duration = 2000;
          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 3);
            const currentCount = Math.floor(easeOut * to);
            setDisplay(currentCount.toString());
            if (percentage < 1) requestAnimationFrame(animateCount);
            else setDisplay(to.toString());
          };
          requestAnimationFrame(animateCount);
        }
        return current;
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [to]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const expo = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel(_props: HeroCarouselProps) {
  return (
    <div className="w-full flex flex-col justify-between overflow-hidden bg-white relative" style={{ minHeight: '100dvh' }}>
      
      {/* ── SECCIÓN HERO (Superior - Estilo Gesgrama Premium Light) ── */}
      <section
        id="hero"
        className="relative w-full flex-1 flex flex-col justify-between overflow-hidden"
        style={{ minHeight: '85dvh', backgroundColor: '#ffffff' }}
      >
        {/* 1. Imagen de Fondo de familia en salón con vistas a Sagrada Familia */}
        <img 
          src={heroBg} 
          alt="Familia en ático con vistas a la Sagrada Familia" 
          className="absolute bottom-[80px] md:bottom-0 left-0 w-full h-[40dvh] md:h-full md:w-[50%] md:left-auto md:right-0 object-cover object-[center_top] md:object-center pointer-events-none z-[1]" 
        />

        {/* 2. Degradado Blanco Suave Lateral y Vertical para legibilidad perfecta y mezcla */}
        {/* Mobile vertical fade */}
        <div 
          className="absolute inset-0 pointer-events-none z-[2] md:hidden"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 42%, rgba(255, 255, 255, 0.95) 48%, rgba(255, 255, 255, 0) 58%, rgba(255, 255, 255, 0) 80%, #ffffff 94%, #ffffff 100%)'
          }}
        />
        {/* Desktop horizontal fade */}
        <div 
          className="absolute inset-0 pointer-events-none z-[2] hidden md:block"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, #ffffff 50%, rgba(255, 255, 255, 0.9) 70%, transparent 100%)'
          }}
        />

        {/* Spacer for fixed navbar */}
        <div className="w-full h-[85px] sm:h-[95px] shrink-0" />

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-start md:justify-center px-6 lg:px-10 xl:px-0 w-full max-w-[1200px] mx-auto py-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="w-full max-w-[650px] flex flex-col items-start"
          >
            {/* Eyebrow: 25+ AÑOS DE EXPERIENCIA EN BARCELONA */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
              className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full pl-2 pr-4.5 py-1.5 mb-3.5 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" strokeWidth={2.5} />
              </div>
              <span className="text-[8.5px] md:text-[9.5px] font-bold tracking-[0.12em] uppercase text-slate-500 pt-0.5">
                25+ AÑOS DE EXPERIENCIA EN BARCELONA
              </span>
            </motion.div>

            {/* Headline: Especialistas en administración y gestión de patrimonio en Barcelona */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="mb-3.5 w-full"
            >
              <h1
                className="block text-slate-800 font-extrabold tracking-tight leading-[1.08]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(2.15rem, 5.5vw, 4.3rem)',
                }}
              >
                Especialistas en<br />
                <span className="text-[#2563eb] font-extrabold">administración</span><br />
                y <span className="text-[#2563eb] font-extrabold">gestión de</span><br />
                <span className="text-[#2563eb] font-extrabold">patrimonio</span><br />
                en Barcelona
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="text-slate-500 font-normal leading-relaxed mb-5.5 max-w-[420px] sm:max-w-[480px] font-sans"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
            >
              Administración de comunidades, gestión de alquileres, consultoría jurídica y optimización de inmuebles para propietarios, inversores y comunidades.
            </motion.p>

            {/* Buttons Stack (Stacked vertically - Estilo Gesgrama) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="flex flex-col gap-3.5 w-full max-w-[340px] sm:max-w-[400px] mb-6"
            >
              {/* Button 1: Solicitar Información (Solid Blue) */}
              <motion.a
                href="#contacto"
                className="group relative flex items-center justify-between w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white p-1.5 pr-6 rounded-2xl text-decoration-none shadow-[0_8px_20px_rgba(37,99,235,0.2)]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 relative z-10">
                  <Building2 className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-white pointer-events-none z-0">
                  Solicitar Información
                </span>
                <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </motion.span>
              </motion.a>

              {/* Button 2: Llamar Ahora (Light Gray borderless outline) */}
              <motion.a
                href="tel:+34934685656"
                className="group relative flex items-center justify-between w-full bg-[#f8fafc] hover:bg-[#f1f5f9] text-slate-700 p-1.5 pr-6 rounded-2xl text-decoration-none border border-slate-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 relative z-10">
                  <Phone className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-slate-700 pointer-events-none z-0">
                  Llamar Ahora
                </span>
                <motion.span className="flex items-center text-slate-600 relative z-10" initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </motion.span>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>

        {/* 3. Trust Badges en la base de la pantalla (Flotando como tarjeta redondeada en móvil) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo, delay: 0.4 }}
          className="w-full bg-white rounded-t-[2.2rem] border-t border-slate-100/80 pt-6 pb-8 px-6 shadow-[0_-15px_35px_rgba(0,0,0,0.03)] mt-auto relative z-20 md:border-none md:shadow-none md:bg-transparent md:pt-4 md:pb-6 md:px-0 md:rounded-none md:w-full md:max-w-[1200px] md:mx-auto"
        >
          <div className="grid grid-cols-3 divide-x divide-slate-200/80 text-center">
            {/* Confianza */}
            <div className="flex flex-col items-center px-2">
              <ShieldCheck className="w-5 h-5 text-[#2563eb] mb-1.5 shrink-0" strokeWidth={2} />
              <span className="font-bold text-[11px] text-slate-800 tracking-tight leading-none mb-1">Confianza</span>
              <span className="text-[9px] text-slate-400 font-medium leading-tight">Transparencia y compromiso</span>
            </div>

            {/* Experiencia */}
            <div className="flex flex-col items-center px-2">
              <Users className="w-5 h-5 text-[#2563eb] mb-1.5 shrink-0" strokeWidth={2} />
              <span className="font-bold text-[11px] text-slate-800 tracking-tight leading-none mb-1">Experiencia</span>
              <span className="text-[9px] text-slate-400 font-medium leading-tight">Más de 25 años a tu lado</span>
            </div>

            {/* Resultados */}
            <div className="flex flex-col items-center px-2">
              <TrendingUp className="w-5 h-5 text-[#2563eb] mb-1.5 shrink-0" strokeWidth={2} />
              <span className="font-bold text-[11px] text-slate-800 tracking-tight leading-none mb-1">Resultados</span>
              <span className="text-[9px] text-slate-400 font-medium leading-tight">Eficiencia y rentabilidad</span>
            </div>
          </div>
        </motion.div>

      </section>

    </div>
  );
}
