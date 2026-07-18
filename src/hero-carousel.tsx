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
        className="absolute inset-0 w-full h-full object-cover pointer-events-none object-[80%_36%] md:object-center"
      />

      {/* Degradado oscuro para que contraste perfectamente el texto, pero suave sin líneas de corte */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(15,15,20,0.65) 0%, rgba(15,15,20,0.4) 35%, rgba(15,15,20,0.05) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to top, rgba(15,15,20,0.55) 0%, transparent 25%)',
        }}
      />

      {/* ── Spacer for fixed navbar ── */}
      <div className="w-full h-[90px] md:h-[110px] shrink-0 z-10" />

      {/* ── Main Content Area - Perfectamente alineado al ancho de las métricas ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-8 xl:px-0 w-full max-w-[1150px] mx-auto py-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
          }}
          className="w-full max-w-[720px]"
        >
          {/* Eyebrow */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
            className="inline-flex items-center gap-2 bg-[#0b1221]/60 border border-white/10 rounded-full px-4 py-2 mb-6"
          >
            <div className="w-6 h-6 rounded-full bg-[#0082c8] flex items-center justify-center text-white shrink-0">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-white/95 pr-1">
              Administración & Patrimonio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="mb-8"
          >
            <h1
              className="block text-white tracking-tight leading-[1.05]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3.5rem, 6.5vw, 6rem)',
                textShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              Encontramos<br />
              el <span className="italic font-medium text-[#0082c8]">hogar</span> que<br />
              mereces<span className="text-[#0082c8]">.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="text-white/80 font-light leading-relaxed mb-6 max-w-[480px]"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.1rem)' }}
          >
            Compra, alquila <span className="text-[#0082c8] font-semibold">o</span> vende tu propiedad con un equipo experto que te acompaña en cada decisión.
          </motion.p>

          {/* Trust features row */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="flex flex-row items-start justify-start gap-4 sm:gap-8 mb-8 lg:mb-10 text-white w-full max-w-[550px] relative z-10"
          >
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center gap-2 min-w-[70px] sm:min-w-[100px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e293b]/60 border border-white/10 flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wide leading-[1.2] text-white/95">
                <span>Confianza</span>
                <span className="text-white/60">y seguridad</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center gap-2 min-w-[70px] sm:min-w-[100px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e293b]/60 border border-white/10 flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wide leading-[1.2] text-white/95">
                <span>Acompañamiento</span>
                <span className="text-white/60">personalizado</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center gap-2 min-w-[70px] sm:min-w-[100px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e293b]/60 border border-white/10 flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wide leading-[1.2] text-white/95">
                <span>Mejores</span>
                <span className="text-white/60">oportunidades</span>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md sm:max-w-none"
          >
            <motion.a
              href="#propiedades"
              className="group flex items-center justify-between sm:justify-center gap-4 bg-[#f1f5f9] hover:bg-slate-200 text-[#0f172a] pl-2.5 pr-8 py-2.5 rounded-full text-decoration-none shadow-md"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#0082c8] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Home className="w-4.5 h-4.5" />
                </div>
                <span className="font-bold text-[11px] tracking-[0.15em] uppercase">Ver propiedades</span>
              </div>
              <motion.span className="flex items-center" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#valuator-form"
              className="group flex items-center justify-between sm:justify-center gap-4 bg-gradient-to-r from-[#0082c8] to-[#8b5cf6] text-white pl-2.5 pr-8 py-2.5 rounded-full text-decoration-none shadow-[0_8px_24px_rgba(139,92,246,0.25)]"
              whileHover={{ scale: 1.02, y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <span className="font-bold text-[11px] tracking-[0.12em] uppercase">Valorar mi inmueble</span>
              </div>
              <motion.span className="flex items-center text-white" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Curved Bottom Divider ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-[5] pointer-events-none drop-shadow-[0_-20px_45px_rgba(56,189,248,0.5)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
        >
          {/* Subtle glowing edge */}
          <path
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="6"
            d="M0,400 C 400,500 800,100 1440,0"
          />
          {/* Main filled wave */}
          <path
            fill="#eef2f6"
            d="M0,400 C 400,500 800,100 1440,0 L1440,500 L0,500 Z"
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
          className="w-full max-w-[1150px] bg-white rounded-[2.5rem] p-6 md:p-8 border border-white shadow-[0_25px_50px_rgba(0,0,0,0.05)] flex flex-col items-center"
        >
          <div className="w-full grid grid-cols-4 divide-x divide-slate-200/60 pb-2">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-2 md:px-6 lg:px-8 text-center min-w-0">
                <div className="shrink-0 flex items-center justify-center">
                  <s.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#1e3a8a] stroke-[1.5]" />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="font-black text-[13px] min-[380px]:text-[15px] sm:text-xl md:text-2xl lg:text-3xl text-slate-900 leading-none tracking-tight mb-1 truncate w-full" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {s.prefix && <span>{s.prefix}</span>}
                    <Counter to={s.num} />
                    {s.suffix && <span className="text-[0.7em] ml-0.5">{s.suffix}</span>}
                  </div>
                  <div className="font-bold text-[6px] min-[380px]:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] tracking-normal sm:tracking-[0.12em] uppercase text-slate-500 w-full break-words leading-[1.2] px-0.5 max-h-[2.4em] overflow-hidden">
                    {s.label}
                  </div>
                  {/* Small blue underline helper */}
                  <div className="w-4 sm:w-8 h-[2px] sm:h-[2.5px] bg-[#0082c8]/60 mt-1.5 sm:mt-3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Commitment Tag */}
          <div className="w-full border-t border-slate-200/60 mt-5 pt-4 flex flex-col items-center justify-center">
            <div className="relative pb-1 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0082c8] shrink-0" />
              <span className="font-bold text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.04em] min-[360px]:tracking-[0.08em] sm:tracking-[0.25em] uppercase text-slate-700 whitespace-nowrap">
                Tu tranquilidad, nuestro compromiso
              </span>
              <div className="absolute -bottom-px left-1/4 right-1/4 h-[2px] bg-[#0082c8] rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
