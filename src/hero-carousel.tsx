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
          className="absolute inset-0 w-full h-[100dvh] object-cover object-[center_right] pointer-events-none z-[1]" 
        />

        {/* 2. Degradado Azul Oscuro Lateral para texto */}
        <div 
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'linear-gradient(to right, #0b1221 0%, #0b1221 35%, rgba(11, 18, 33, 0.8) 55%, transparent 100%)'
          }}
        />

        {/* Spacer for fixed navbar */}
        <div className="w-full h-[85px] sm:h-[95px] shrink-0" />

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-start md:justify-center px-6 lg:px-10 xl:px-0 w-full max-w-[1200px] mx-auto py-2 pt-16 md:pt-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="w-full max-w-[650px] flex flex-col items-start"
          >
            {/* Eyebrow: ADMINISTRACIÓN & PATRIMONIO */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></div>
              <span className="text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase text-white">
                ADMINISTRACIÓN & PATRIMONIO
              </span>
            </motion.div>

            {/* Headline: Encontramos el hogar que mereces. */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="mb-8 w-full"
            >
              <h1
                className="block text-white font-medium tracking-tight leading-[1.1]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                }}
              >
                Encontramos<br />
                el <span className="text-[#2563eb] font-bold italic">hogar</span> que<br />
                mereces.
              </h1>
              <div className="w-20 h-1 bg-[#2563eb] mt-6"></div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="text-slate-300 font-medium leading-relaxed mb-10 max-w-[420px] sm:max-w-[450px] font-sans"
              style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}
            >
              Compra, alquila o vende tu propiedad<br/>
              con un equipo experto que te<br/>
              acompaña en cada decisión.
            </motion.p>

            {/* Buttons Stack */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="flex flex-col gap-4 w-full max-w-[360px] sm:max-w-[420px] mb-6"
            >
              {/* Button 1: Valorar mi inmueble */}
              <motion.a
                href="#valuator-form"
                className="group relative flex items-center justify-between w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white p-4 px-6 rounded-2xl text-decoration-none shadow-[0_8px_20px_rgba(29,78,216,0.3)]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <Home className="w-6 h-6 text-white" strokeWidth={1.5} />
                  <span className="font-bold text-[13px] tracking-wide uppercase text-white pointer-events-none z-0">
                    VALORAR MI INMUEBLE
                  </span>
                </div>
                <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </motion.span>
              </motion.a>

              {/* Button 2: Ver propiedades */}
              <motion.a
                href="#propiedades"
                className="group relative flex items-center justify-between w-full bg-white hover:bg-slate-50 text-[#0b1221] p-4 px-6 rounded-2xl text-decoration-none shadow-md"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <Building2 className="w-6 h-6 text-[#0b1221]" strokeWidth={1.5} />
                  <span className="font-bold text-[13px] tracking-wide uppercase text-[#0b1221] pointer-events-none z-0">
                    VER PROPIEDADES
                  </span>
                </div>
                <motion.span className="flex items-center text-[#0b1221] relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </motion.span>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>

        {/* 3. Trust Badges Floating (Dark Navy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: expo, delay: 0.4 }}
          className="w-full max-w-[1200px] mx-auto bg-[#0f172a] rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-20 mb-8 mt-auto mx-4 md:mx-auto border border-slate-800"
          style={{ width: 'calc(100% - 2rem)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-center">
            
            {/* Clientes satisfechos */}
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <Star className="w-10 h-10 text-[#3b82f6] mb-4" strokeWidth={1.5} />
              <div className="text-3xl font-black text-white mb-2 tracking-tight">4500+</div>
              <span className="text-[13px] text-slate-400 font-medium leading-tight">Clientes<br/>satisfechos</span>
            </div>

            {/* Comunidades gestionadas */}
            <div className="flex flex-col items-center pt-4 md:pt-0 border-t-0 md:border-l border-slate-800">
              <Building2 className="w-10 h-10 text-[#3b82f6] mb-4" strokeWidth={1.5} />
              <div className="text-3xl font-black text-white mb-2 tracking-tight">+300</div>
              <span className="text-[13px] text-slate-400 font-medium leading-tight">Comunidades<br/>gestionadas</span>
            </div>

            {/* Índice de satisfacción */}
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <svg className="w-10 h-10 text-[#3b82f6] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-3xl font-black text-white mb-2 tracking-tight">98%</div>
              <span className="text-[13px] text-slate-400 font-medium leading-tight">Índice de<br/>satisfacción</span>
            </div>

            {/* Años de experiencia */}
            <div className="flex flex-col items-center pt-6 md:pt-0 border-t-0 md:border-l border-slate-800">
              <ShieldCheck className="w-10 h-10 text-[#3b82f6] mb-4" strokeWidth={1.5} />
              <div className="text-3xl font-black text-white mb-2 tracking-tight">15+</div>
              <span className="text-[13px] text-slate-400 font-medium leading-tight">Años de<br/>experiencia</span>
            </div>

          </div>
        </motion.div>

      </section>

    </div>
  );
}
