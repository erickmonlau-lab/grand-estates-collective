import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Smile, ShieldCheck, Phone } from "lucide-react";
import heroBg from "@/assets/gesgrama_modern_facade_twilight.jpg"; 

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

const STATS = [
  { icon: Star,        num: 4500, prefix: '',  suffix: '+',  label: 'Clientes satisfechos'   },
  { icon: Building2,   num: 300,  prefix: '+', suffix: '',   label: 'Comunidades gestionadas' },
  { icon: Smile,       num: 98,   prefix: '',  suffix: '%',  label: 'Índice de satisfacción'  },
  { icon: ShieldCheck, num: 15,   prefix: '',  suffix: '+',  label: 'Años de experiencia'     },
];

const expo = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel(_props: HeroCarouselProps) {
  return (
    <div className="w-full flex flex-col justify-between overflow-hidden bg-slate-950" style={{ minHeight: '100dvh' }}>
      
      {/* ── SECCIÓN HERO (Superior - Estilo DISET Dark / Gesgrama Premium) ── */}
      <section
        id="hero"
        className="relative w-full flex-1 flex flex-col justify-between overflow-hidden"
        style={{ minHeight: '85dvh', backgroundColor: '#020617' }}
      >
        {/* 1. Imagen de Fondo de fachada Gesgrama en el atardecer */}
        <img 
          src={heroBg} 
          alt="Fachada moderna Gesgrama en Barcelona" 
          className="absolute inset-0 w-full h-full object-cover object-[right_center] pointer-events-none opacity-80" 
        />

        {/* 2. Degradado Oscuro Lateral y de fondo para legibilidad perfecta (muy fuerte, no transparente) */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to right, #020617 0%, #020617 50%, rgba(2, 6, 23, 0.9) 75%, transparent 100%)'
          }}
        />

        {/* Spacer for fixed navbar */}
        <div className="w-full h-[85px] sm:h-[95px] shrink-0" />

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-10 xl:px-0 w-full max-w-[1200px] mx-auto py-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="w-full max-w-[650px] flex flex-col items-start"
          >
            {/* Eyebrow: 25+ AÑOS DE EXPERIENCIA · BARCELONA con dot azul */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
              className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-700/60 rounded-full pl-3.5 pr-4 py-1.5 mb-4 shadow-md backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#0099ff] animate-pulse shrink-0" />
              <span className="text-[8.5px] md:text-[9.5px] font-bold tracking-[0.15em] uppercase text-white pt-0.5">
                25+ AÑOS DE EXPERIENCIA · BARCELONA
              </span>
            </motion.div>

            {/* Headline: Especialistas en administración y gestión de patrimonio en Barcelona */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="mb-4 w-full"
            >
              <h1
                className="block text-white font-extrabold tracking-tight leading-[1.08]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(2.25rem, 6vw, 4.3rem)',
                }}
              >
                Especialistas<br />
                en <span className="text-[#0099ff] font-extrabold">administración</span><br />
                y <span className="text-[#0099ff] font-extrabold">gestión de patrimonio</span><br />
                en Barcelona
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="text-slate-300 font-normal leading-relaxed mb-6 max-w-[420px] sm:max-w-[480px] font-sans"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
            >
              Administración de comunidades, gestión de alquileres, consultoría jurídica y optimización de inmuebles para propietarios, inversores y comunidades.
            </motion.p>

            {/* Buttons Stack (Stacked vertically - Estilo DISET) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="flex flex-col gap-3.5 w-full max-w-[340px] sm:max-w-[400px] mb-4"
            >
              {/* Button 1: Solicitad Información / Presupuesto (Electric Blue) */}
              <motion.a
                href="#contacto"
                className="group relative flex items-center justify-center w-full bg-[#0099ff] hover:bg-[#0077d6] text-white py-3.5 px-6 rounded-full text-decoration-none shadow-[0_8px_20px_rgba(0,153,255,0.3)] text-center font-bold text-[13px] tracking-wide"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <span>Solicitar Información</span>
              </motion.a>

              {/* Button 2: Llamar Ahora (White with Outline) */}
              <motion.a
                href="tel:+34930000000"
                className="group relative flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-900 py-3.5 px-6 rounded-full text-decoration-none border border-slate-200 text-center font-bold text-[13px] tracking-wide"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-4 h-4 text-slate-800 shrink-0" strokeWidth={2.5} />
                <span>Llamar Ahora</span>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
