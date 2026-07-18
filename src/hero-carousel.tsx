import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Building2, Smile, ShieldCheck, Shield, Users, TrendingUp, Home, Key } from "lucide-react";
import heroBg from "@/assets/family_barcelona_right.jpg"; 

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
    <div className="w-full flex flex-col justify-between overflow-hidden" style={{ height: '100dvh', backgroundColor: '#ffffff' }}>
      
      {/* ── SECCIÓN HERO (Superior - Estilo Light) ── */}
      <section
        id="hero"
        className="relative w-full h-[64dvh] sm:h-[68dvh] flex flex-col justify-between overflow-hidden rounded-b-[3.5rem] shadow-[0_20px_50px_rgba(15,23,42,0.08)] z-10 shrink-0"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* 1. Imagen de Fondo enfocada a la derecha */}
        <img 
          src={heroBg} 
          alt="Familia en su nuevo hogar" 
          className="absolute inset-0 w-full h-full object-cover object-[right_center] -z-20 pointer-events-none" 
        />

        {/* 2. Degradado Blanco Suave desde la izquierda para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-[75%] md:w-[60%] -z-10 pointer-events-none"></div>

        {/* Spacer for fixed navbar */}
        <div className="w-full h-[70px] sm:h-[80px] shrink-0 z-10" />

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-10 xl:px-0 w-full max-w-[1200px] mx-auto py-1">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="w-full max-w-[650px] flex flex-col items-start"
          >
            {/* Eyebrow */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
              className="inline-flex items-center gap-2 bg-slate-100/90 border border-slate-200/80 rounded-full pl-1.5 pr-3 py-1 mb-2 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
              </div>
              <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-slate-600 pt-0.5">
                Administración & Patrimonio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="mb-2 w-full"
            >
              <h1
                className="block text-[#0a1020] tracking-tight leading-[1.05]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.1rem, 6vw, 4.2rem)',
                }}
              >
                Encontramos<br />
                el <span className="relative inline-block text-[#2563eb] italic font-semibold mr-1">
                  hogar
                  {/* Elegante curva orgánica bajo la palabra hogar */}
                  <svg className="absolute bottom-[-6px] left-0 w-full h-2 text-[#2563eb]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M2 7 C 20 9, 80 9, 98 5 C 70 8, 30 8, 2 7" fill="currentColor" />
                  </svg>
                </span> que<br />
                mereces.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="text-slate-600 font-normal leading-relaxed mb-3 max-w-[400px] sm:max-w-[480px]"
              style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}
            >
              Compra, <span className="text-[#2563eb] font-semibold">alquila o vende</span> tu propiedad con un equipo experto que te acompaña en cada decisión.
            </motion.p>

            {/* Trust features row (Con divisores finos y diseño Light) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="grid grid-cols-3 gap-1 divide-x divide-slate-200/80 mb-4 text-slate-800 w-full max-w-[550px] relative z-10"
            >
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-1.5 text-center min-w-0 pr-2">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-50 border border-blue-100/50 flex items-center justify-center text-[#2563eb] shrink-0">
                  <Shield className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-slate-700">
                  <span className="block">Confianza</span>
                  <span className="block text-slate-500 font-medium">Y Seguridad</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-1.5 text-center min-w-0 px-2">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-50 border border-blue-100/50 flex items-center justify-center text-[#2563eb] shrink-0">
                  <Users className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-slate-700">
                  <span className="block">Acompañamiento</span>
                  <span className="block text-slate-500 font-medium">Personalizado</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-1.5 text-center min-w-0 pl-2">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-50 border border-blue-100/50 flex items-center justify-center text-[#2563eb] shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-slate-700">
                  <span className="block">Mejores</span>
                  <span className="block text-slate-500 font-medium">Oportunidades</span>
                </div>
              </div>
            </motion.div>

            {/* Buttons Stack (Side-by-side) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
              className="flex flex-row gap-3 w-full max-w-[550px] mb-1"
            >
              {/* Button 1: Dark Navy */}
              <motion.a
                href="#propiedades"
                className="group relative flex items-center justify-between bg-[#050c1a] hover:bg-slate-900 text-white p-1 pr-4 sm:p-1.5 sm:pr-6 rounded-full text-decoration-none shadow-xl flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 shadow-sm relative z-10">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[9px] sm:text-[11px] tracking-[0.15em] uppercase text-white pointer-events-none z-0">
                  VER PROPIEDADES
                </span>
                <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </motion.span>
              </motion.a>

              {/* Button 2: Light Gray */}
              <motion.a
                href="#valuator-form"
                className="group relative flex items-center justify-between bg-slate-100 hover:bg-slate-200 text-slate-800 p-1 pr-4 sm:p-1.5 sm:pr-6 rounded-full text-decoration-none shadow-sm border border-slate-200/60 flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-sm relative z-10 border border-slate-200">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
                <span className="absolute left-0 right-0 text-center font-bold text-[9px] sm:text-[11px] tracking-[0.15em] uppercase text-slate-700 pointer-events-none z-0">
                  VALORAR MI INMUEBLE
                </span>
                <motion.span className="flex items-center text-slate-700 relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Small bottom safety spacer inside Hero */}
        <div className="w-full h-4 shrink-0" />
      </section>

      {/* ── 3. Transición Suave y Sección de Estadísticas ── */}
      <div className="relative w-full flex-1 bg-gradient-to-b from-white via-blue-50/40 to-[#f0f7ff] pt-8 pb-10 z-20 flex flex-col justify-center px-4 shrink-0">
        
        {/* Tarjeta de Estadísticas (Card Principal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="-mt-12 z-30 relative w-full max-w-[1150px] mx-auto"
        >
          <div
            className="bg-white rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] flex flex-col items-center border border-white"
          >
            <div className="w-full grid grid-cols-4 divide-x divide-slate-100">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-start gap-2 px-0.5 sm:px-4 text-center min-w-0">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-50 border border-blue-100/50 flex items-center justify-center shrink-0 animate-pulse">
                    <s.icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#2563eb] stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="font-black text-[12px] sm:text-xl md:text-2xl text-[#0f172a] leading-none tracking-tight mb-1 truncate w-full">
                      {s.prefix && <span>{s.prefix}</span>}
                      <Counter to={s.num} />
                      {s.suffix && <span className="text-[0.8em] ml-[1px]">{s.suffix}</span>}
                    </div>
                    <div className="font-bold text-[5.5px] min-[360px]:text-[6.5px] sm:text-[8px] md:text-[9px] tracking-wider uppercase text-slate-500 w-full break-words leading-[1.2] px-0.5 max-h-[2.4em] overflow-hidden">
                      {s.label}
                    </div>
                    <div className="w-4 sm:w-6 h-[1.5px] bg-[#3b82f6] mt-1.5 sm:mt-2.5 rounded-full opacity-60" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Commitment Tag */}
            <div className="w-full mt-4 pt-3 border-t border-slate-100 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#64748b] shrink-0" />
                <span className="font-bold text-[7.5px] sm:text-[9px] tracking-[0.18em] uppercase text-[#64748b] whitespace-nowrap">
                  Tu tranquilidad, nuestro compromiso
                </span>
              </div>
              {/* The elegant thin curved smile line */}
              <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 opacity-50">
                <path d="M0 5 Q 60 10 120 5" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
