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
    <section
      id="hero"
      className="relative w-full flex flex-col justify-between overflow-hidden"
      style={{ height: '100dvh', backgroundColor: '#0b1221' }}
    >
      {/* ── Background Image ── */}
      <motion.img
        src={heroBg}
        alt="Familia en su nuevo hogar"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none object-[70%_center] sm:object-center"
      />

      {/* ── Soft Gradients ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(11,18,33,0.55) 0%, rgba(11,18,33,0.35) 30%, rgba(11,18,33,0.05) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to top, rgba(11,18,33,0.55) 0%, transparent 35%)',
        }}
      />

      {/* ── Spacer for fixed navbar ── */}
      <div className="w-full h-[70px] sm:h-[80px] shrink-0 z-10" />

      {/* ── Main Content Area (Compact spacing for above-the-fold) ── */}
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
          {/* Eyebrow */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } } }}
            className="inline-flex items-center gap-2 bg-[#1a2332]/80 backdrop-blur-md border border-white/10 rounded-full pl-1.5 pr-3 py-1 mb-2 md:mb-3 shadow-xl"
          >
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0f172a] shrink-0">
              <Home className="w-3 h-3" strokeWidth={2.5} />
            </div>
            <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-white/95 pt-0.5">
              Administración & Patrimonio
            </span>
          </motion.div>

          {/* Headline (Compact font size & clamp) */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="mb-2 md:mb-3 w-full"
          >
            <h1
              className="block text-white tracking-tight leading-[1.05]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.3rem, 6.5vw, 4.5rem)',
                textShadow: '0 8px 30px rgba(0,0,0,0.5)'
              }}
            >
              Encontramos<br />
              el <span className="italic font-medium text-[#3b76f6]">hogar</span> que<br />
              mereces<span className="text-[#3b76f6]">.</span>
            </h1>
          </motion.div>

          {/* Subtitle (More compact on mobile) */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="text-white/80 font-light leading-relaxed mb-3 md:mb-4 max-w-[400px] sm:max-w-[480px]"
            style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)' }}
          >
            Compra, alquila <span className="text-[#3b76f6]">o</span> vende tu propiedad con un equipo experto que te acompaña en cada decisión.
          </motion.p>

          {/* Trust features row (Compact gap & text sizes) */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="grid grid-cols-3 gap-2 mb-4 text-white w-full max-w-[550px] relative z-10"
          >
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-1.5 text-center min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Shield className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-white/90">
                <span className="block">Confianza</span>
                <span className="block text-white/60">Y Seguridad</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-1.5 text-center min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Users className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-white/90">
                <span className="block">Acompañamiento</span>
                <span className="block text-white/60">Personalizado</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-1.5 text-center min-w-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider leading-[1.3] text-white/90">
                <span className="block">Mejores</span>
                <span className="block text-white/60">Oportunidades</span>
              </div>
            </div>
          </motion.div>

          {/* Buttons Stack (Compact height and padding for above-the-fold) */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } } }}
            className="flex flex-col gap-2.5 w-full max-w-[340px] sm:max-w-[400px] mb-2"
          >
            {/* Button 1: White */}
            <motion.a
              href="#propiedades"
              className="group relative flex items-center justify-between w-full bg-white hover:bg-slate-50 text-[#0f172a] p-1 pr-4 sm:p-1.5 sm:pr-6 rounded-full text-decoration-none shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0b1221] flex items-center justify-center text-white shrink-0 shadow-sm relative z-10">
                <Home className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </div>
              <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[12px] tracking-[0.15em] uppercase text-[#0f172a] pointer-events-none z-0">
                VER PROPIEDADES
              </span>
              <motion.span className="flex items-center text-[#0f172a] relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </motion.span>
            </motion.a>

            {/* Button 2: Gradient */}
            <motion.a
              href="#valuator-form"
              className="group relative flex items-center justify-between w-full bg-gradient-to-r from-[#8b5cf6] to-[#0b1221] text-white p-1 pr-4 sm:p-1.5 sm:pr-6 rounded-full text-decoration-none shadow-[0_10px_30px_rgba(139,92,246,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#3b76f6] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner relative z-10">
                <Key className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              </div>
              <span className="absolute left-0 right-0 text-center font-bold text-[10px] sm:text-[12px] tracking-[0.15em] uppercase text-white pointer-events-none z-0">
                VALORAR MI INMUEBLE
              </span>
              <motion.span className="flex items-center text-white relative z-10" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Soft Wave Divider (Lower height on mobile) ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-[5] pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
          className="w-full h-[60px] sm:h-[120px] md:h-[180px]"
        >
          {/* Subtle glowing stroke */}
          <path
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            d="M0,150 C 350,250 1000,50 1440,150"
          />
          {/* Light blue fill matching the bottom area */}
          <path
            fill="#e8f2ff"
            d="M0,150 C 350,250 1000,50 1440,150 L1440,250 L0,250 Z"
          />
        </svg>
      </div>

      {/* ── Metrics Banner (Bottom - Compact dimensions, perfectly anchored) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        className="relative z-20 w-full shrink-0 flex items-end justify-center px-4 pb-4 sm:pb-6 pt-0 bg-gradient-to-b from-transparent to-[#e8f2ff] -mt-4"
      >
        <div
          className="w-full max-w-[1150px] bg-white rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col items-center border border-white"
        >
          <div className="w-full grid grid-cols-4 divide-x divide-slate-100">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-start gap-2 px-0.5 sm:px-4 text-center min-w-0">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#e8f2ff] border border-blue-100 flex items-center justify-center shrink-0">
                  <s.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#2563eb] stroke-[1.5]" />
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
    </section>
  );
}
