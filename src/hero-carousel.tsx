import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Smile, ShieldCheck, Home, Phone } from "lucide-react";
import heroBg from "@/assets/minimalist_living_room_sagrada_familia.jpg"; 

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
    <div className="w-full flex flex-col justify-between overflow-hidden bg-white" style={{ minHeight: '100dvh' }}>
      
      {/* ── SECCIÓN HERO (Superior - Estilo HOGAR&CO. Minimal) ── */}
      <section
        id="hero"
        className="relative w-full flex-1 flex flex-col justify-between overflow-hidden"
        style={{ minHeight: '85dvh', backgroundColor: '#ffffff' }}
      >
        {/* 1. Imagen de Fondo del salón minimalista y Sagrada Familia */}
        <img 
          src={heroBg} 
          alt="Salón minimalista con vistas a la Sagrada Familia" 
          className="absolute inset-0 w-full h-full object-cover object-[right_center] pointer-events-none" 
        />

        {/* 2. Degradado Blanco Suave desde la izquierda para legibilidad perfecta */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, #ffffff 40%, rgba(255, 255, 255, 0.95) 55%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)'
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
            {/* Eyebrow: MÁS DE 15 AÑOS DE EXPERIENCIA (Estilo Hogar&Co Blanco) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
              className="inline-flex items-center gap-2 bg-white rounded-2xl pl-2 pr-4 py-1.5 mb-3.5 shadow-sm border border-slate-100"
            >
              <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                <Home className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
              </div>
              <span className="text-[8.5px] md:text-[9.5px] font-bold tracking-[0.12em] uppercase text-slate-500 pt-0.5">
                MÁS DE 15 AÑOS DE EXPERIENCIA
              </span>
            </motion.div>

            {/* Headline: Encontramos el hogar que mereces. (Serif / Playfair Display / Hogar en Gris/Plata) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="mb-3.5 w-full"
            >
              <h1
                className="block text-[#2c2c2c] font-medium tracking-tight leading-[1.08]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4.3rem)',
                }}
              >
                Encontramos<br />
                el <span className="italic text-slate-400 font-light font-serif">hogar</span> que<br />
                mereces.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="text-slate-500 font-normal leading-relaxed mb-5 max-w-[420px] sm:max-w-[480px] font-sans"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
            >
              Compra, <span className="text-slate-600 font-semibold">alquila o vende</span> tu propiedad con un equipo experto que te acompaña en cada decisión.
            </motion.p>

            {/* Buttons Stack (Stacked vertically - Estilo Carbón y Gris Claro) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="flex flex-col gap-3.5 w-full max-w-[340px] sm:max-w-[400px] mb-4"
            >
              {/* Button 1: Carbon / Charcoal */}
              <motion.a
                href="#propiedades"
                className="group relative flex items-center justify-between w-full bg-[#454545] hover:bg-[#383838] text-white p-1.5 pr-6 rounded-2xl text-decoration-none shadow-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 relative z-10">
                  <Home className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-white pointer-events-none z-0">
                  VER PROPIEDADES
                </span>
                <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </motion.span>
              </motion.a>

              {/* Button 2: Light Gray borderless outline */}
              <motion.a
                href="#contacto"
                className="group relative flex items-center justify-between w-full bg-[#f8fafc] hover:bg-[#f1f5f9] text-slate-700 p-1.5 pr-6 rounded-2xl text-decoration-none border border-slate-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 relative z-10">
                  <Phone className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-slate-700 pointer-events-none z-0">
                  CONTACTAR
                </span>
                <motion.span className="flex items-center text-slate-600 relative z-10" initial={{ x: 0 }} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </motion.span>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
