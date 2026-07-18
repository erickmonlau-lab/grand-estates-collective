import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { ArrowRight, Star, Building2, Smile, ShieldCheck, Shield, Users, TrendingUp, Home, Key } from "lucide-react";
import heroBg from "@/assets/family_barcelona_right.jpg"; 

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
}

// ── Animated Counter ──
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    let startTime: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(easeOut * to);
      
      setDisplay(currentCount.toString());

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplay(to.toString());
      }
    };

    requestAnimationFrame(animateCount);
  }, [inView, to]);

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
    <section
      id="hero"
      className="relative w-full flex flex-col justify-between overflow-clip"
      style={{ minHeight: '100dvh', backgroundColor: '#0f172a' }}
    >
      {/* ── Background Image & Overlays ── */}
      <motion.img
        src={heroBg}
        alt="Familia en su nuevo hogar con vistas a la Sagrada Familia"
        aria-hidden="true"
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0 }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none object-[98%_36%] md:object-center"
      />

      {/* Degradado oscuro para contrastar el texto */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(10,18,35,0.95) 0%, rgba(10,18,35,0.85) 30%, rgba(10,18,35,0.3) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to top, rgba(10,18,35,0.6) 0%, transparent 40%)',
        }}
      />

      {/* ── Spacer for fixed navbar ── */}
      <div className="w-full h-[100px] md:h-[110px] shrink-0 z-10" />

      {/* ── Main Content Area ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-8 xl:px-0 w-full max-w-[1150px] mx-auto py-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="w-full max-w-[720px] flex flex-col items-start"
        >
          {/* Eyebrow */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
            className="inline-flex items-center gap-2 bg-[#0b1221]/60 backdrop-blur-md border border-white/5 rounded-full pl-1.5 pr-4 py-1.5 mb-5 md:mb-6 shadow-xl"
          >
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0f172a] shrink-0">
              <Home className="w-3 h-3" strokeWidth={2.5} />
            </div>
            <span className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-white/95">
              Administración & Patrimonio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="mb-5 md:mb-7"
          >
            <h1
              className="block text-white tracking-tight leading-[1.05]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 11vw, 6rem)',
                textShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              Encontramos<br />
              el <span className="italic font-medium text-[#3b82f6]">hogar</span> que<br />
              mereces<span className="text-[#3b82f6] leading-[0.5]">.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="text-[#e2e8f0] font-normal leading-relaxed mb-8 max-w-[340px] sm:max-w-[480px]"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)' }}
          >
            Compra, alquila <span className="text-[#3b82f6]">o</span> vende tu propiedad con un equipo experto que te acompaña en cada decisión.
          </motion.p>

          {/* Trust features row (Horizontal layout, Icon Left, Text Right) */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="grid grid-cols-3 gap-2 sm:gap-6 mb-8 text-white w-full max-w-[620px] relative z-10"
          >
            {/* Feature 1 */}
            <div className="flex flex-row items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-sm">
                <Shield className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-[1.2] text-white/90 min-w-0">
                <span className="block truncate">Confianza</span>
                <span className="block text-white/60 truncate">Y Seguridad</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-row items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-sm">
                <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-[1.2] text-white/90 min-w-0">
                <span className="block truncate">Acompañamiento</span>
                <span className="block text-white/60 truncate">Personalizado</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-row items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/25 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-[1.2] text-white/90 min-w-0">
                <span className="block truncate">Mejores</span>
                <span className="block text-white/60 truncate">Oportunidades</span>
              </div>
            </div>
          </motion.div>

          {/* Buttons Stack */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="flex flex-col gap-3.5 w-full max-w-[340px] sm:max-w-[380px] pb-10"
          >
            <motion.a
              href="#propiedades"
              className="group relative flex items-center justify-between w-full bg-white hover:bg-slate-50 text-[#0f172a] pl-2 pr-6 py-2 rounded-full text-decoration-none shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white shrink-0 shadow-sm relative z-10">
                <Home className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="absolute left-0 right-0 text-center font-bold text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-[#0f172a] pointer-events-none z-0">Ver propiedades</span>
              <motion.span className="flex items-center text-[#0f172a] relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#valuator-form"
              className="group relative flex items-center justify-between w-full bg-gradient-to-r from-[#2563eb] to-[#8b5cf6] text-white pl-2 pr-6 py-2 rounded-full text-decoration-none shadow-[0_10px_30px_rgba(139,92,246,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner relative z-10">
                <Key className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="absolute left-0 right-0 text-center font-bold text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white pointer-events-none z-0">Valorar mi inmueble</span>
              <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Curved Bottom Divider ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-[5] pointer-events-none drop-shadow-[0_-30px_50px_rgba(56,189,248,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[140px] sm:h-[180px] md:h-[250px]"
        >
          {/* Main filled wave */}
          <path
            fill="#eff6ff"
            d="M0,250 C 350,350 1000,50 1440,150 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* ── Metrics Banner (Bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        className="relative z-20 w-full shrink-0 flex items-end justify-center px-4 pb-6"
      >
        <div
          className="w-full max-w-[1150px] bg-white rounded-3xl p-6 md:p-8 border border-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col items-center"
        >
          <div className="w-full grid grid-cols-4 divide-x divide-slate-100 pb-4">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-2 sm:gap-3 px-1 sm:px-2 md:px-6 lg:px-8 text-center min-w-0">
                <div className="shrink-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f8fafc] border border-[#e2e8f0] shadow-sm flex items-center justify-center">
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] stroke-[1.5]" />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="font-black text-[14px] min-[380px]:text-[17px] sm:text-xl md:text-2xl lg:text-3xl text-[#0f172a] leading-none tracking-tight mb-2 truncate w-full" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {s.prefix && <span>{s.prefix}</span>}
                    <Counter to={s.num} />
                    {s.suffix && <span className="text-[0.7em] ml-[1px]">{s.suffix}</span>}
                  </div>
                  <div className="font-bold text-[6px] min-[380px]:text-[7px] sm:text-[9px] lg:text-[10px] tracking-widest uppercase text-slate-500 w-full break-words leading-[1.4] px-0.5 max-h-[3em] overflow-hidden">
                    {s.label}
                  </div>
                  {/* Small blue underline helper */}
                  <div className="w-6 sm:w-8 h-[2px] bg-[#3b82f6] mt-3 rounded-full opacity-60" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Commitment Tag */}
          <div className="w-full mt-2 pt-5 flex flex-col items-center justify-center relative">
            <div className="flex items-center justify-center gap-2 z-10 bg-white px-4">
              <ShieldCheck className="w-4 h-4 text-[#64748b] shrink-0" />
              <span className="font-bold text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#64748b] whitespace-nowrap">
                Tu tranquilidad, nuestro compromiso
              </span>
            </div>
            {/* The thin curved line underneath */}
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 opacity-50">
              <path d="M0 6 Q 60 12 120 6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
