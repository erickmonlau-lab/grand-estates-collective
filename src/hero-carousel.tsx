import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Check, Home, Users, ThumbsUp, Award } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_opt_min.webp";
import heroBgMobile from "@/assets/family_barcelona_opt_mobile.webp"; 
import { translations } from './data/translations';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
}

const expo = [0.16, 1, 0.3, 1] as const;

function StatCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1200,
  shouldAnimate = false,
  reduceMotion = false
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  shouldAnimate?: boolean;
  reduceMotion?: boolean;
}) {
  const [count, setCount] = useState(reduceMotion ? target : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setCount(target);
      return;
    }
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, shouldAnimate, reduceMotion]);

  return (
    <span>
      {prefix}
      {target >= 1000 ? new Intl.NumberFormat('es-ES').format(count) : count}
      {suffix}
    </span>
  );
}

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];
  const shouldReduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.1 });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Mount-check: runs only once after hydration, independently of isStatsInView
  useEffect(() => {
    const timer = setTimeout(() => {
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsStatsVisible(true);
        }
      }
    }, 300); // small delay lets SSR hydration settle
    return () => clearTimeout(timer);
  }, []); // intentionally empty: run once on mount

  // InView fallback for when user scrolls into view later
  useEffect(() => {
    if (isStatsInView) setIsStatsVisible(true);
  }, [isStatsInView]);

  const shouldTriggerStats = isStatsVisible;

  return (
    <section id="hero" className="relative text-slate-900 min-h-svh sm:min-h-screen pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] px-4 md:px-8 xl:px-12">
      
      {/* ── Hero Family Photo Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left Architectural Building Sketch */}
        <svg className="absolute -left-10 top-0 h-full w-auto text-slate-300/30 opacity-40 hidden md:block" viewBox="0 0 300 800" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 20 50 L 20 750 M 20 50 L 180 50 L 180 750" />
          <path d="M 40 90 L 80 90 L 80 140 L 40 140 Z M 100 90 L 140 90 L 140 140 L 100 140 Z" />
          <path d="M 40 170 L 80 170 L 80 220 L 40 220 Z M 100 170 L 140 170 L 140 220 L 100 220 Z" />
          <path d="M 40 250 L 80 250 L 80 300 L 40 300 Z M 100 250 L 140 250 L 140 300 L 100 300 Z" />
          <path d="M 40 330 L 80 330 L 80 380 L 40 380 Z M 100 330 L 140 330 L 140 380 L 100 380 Z" />
          <path d="M 40 410 L 80 410 L 80 460 L 40 460 Z M 100 410 L 140 410 L 140 460 L 100 460 Z" />
          <circle cx="100" cy="600" r="40" />
          <path d="M 100 560 L 100 640 M 60 600 L 140 600" />
        </svg>

        {/* Right Architectural Building Sketch */}
        <svg className="absolute -right-10 top-0 h-full w-auto text-slate-300/30 opacity-40 hidden lg:block" viewBox="0 0 300 800" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 120 50 L 120 750 M 120 50 L 280 50 L 280 750" />
          <path d="M 140 90 L 180 90 L 180 140 L 140 140 Z M 200 90 L 240 90 L 240 140 L 200 140 Z" />
          <path d="M 140 170 L 180 170 L 180 220 L 140 220 Z M 200 170 L 240 170 L 240 220 L 200 220 Z" />
          <path d="M 140 250 L 180 250 L 180 300 L 140 300 Z M 200 250 L 240 250 L 240 300 L 200 300 Z" />
        </svg>

        {/* Photography Right Frame with Ken Burns effect */}
        <div className="absolute right-0 top-0 w-full lg:w-[58%] xl:w-[55%] h-full bg-[#E5DDD5]">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobile} />
            <motion.img 
              src={heroBgDesktop} 
              alt="Familia disfrutando su hogar gestionado por Gesgrama" 
              className="w-full h-full object-cover object-[52%_center] sm:object-[58%_center] md:object-[64%_center] lg:object-right"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
              animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 28, repeat: Infinity, ease: "linear" }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 via-35% md:via-45% to-transparent lg:via-[#F8FAFC]/45 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent sm:hidden pointer-events-none" />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between pt-4 sm:pt-6 lg:pt-8 pb-3 sm:pb-5">
        
        {/* Top/Main Hero Content Container */}
        <div className="max-w-[340px] xs:max-w-sm sm:max-w-xl lg:max-w-2xl xl:max-w-[640px] text-left py-2 sm:py-4 my-auto">
          <div className="flex flex-col justify-center h-full">
            
            {/* Eyebrow Pill Badge */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: expo }}
              className="mb-3 sm:mb-4.5"
            >
              <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[10.5px] sm:text-xs font-black uppercase tracking-[0.12em] px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit max-w-full">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white shrink-0 animate-pulse"></span>
                <span className="text-left leading-none">{t.heroCarousel.tag}</span>
              </div>
            </motion.div>

            {/* Main Title H1 */}
            <motion.h1 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: expo }}
              className="text-[32px] xs:text-[38px] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] font-black text-[#0b214a] leading-[1.08] sm:leading-[1.04] tracking-tight mb-3.5 sm:mb-5 font-heading"
            >
              {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}<br />
              <span className="text-[#2563eb] inline-block mt-0.5 sm:mt-1">
                {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: expo }}
              className="text-[#1e293b] text-[13.5px] sm:text-lg md:text-xl mb-5 sm:mb-7 font-bold leading-relaxed font-sans max-w-[540px]"
              style={{ textShadow: "0 0 16px rgba(255, 255, 255, 0.95), 0 1px 4px rgba(255, 255, 255, 0.9)" }}
            >
              {t.heroCarousel.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: expo }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-fit mb-4 sm:mb-6"
            >
              <a
                href="#valuator-form"
                className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_4px_16px_rgba(37,99,235,0.32)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center sm:justify-start gap-2.5 group cursor-pointer shrink-0"
              >
                <Home className="w-4 h-4 text-white shrink-0" />
                <span>{t.heroCarousel.btnValuation}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

              <a
                href="#propiedades"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-[#0f172a] border border-slate-200/90 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_18px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center sm:justify-start gap-2.5 group cursor-pointer shrink-0"
              >
                <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>{t.heroCarousel.btnProperties}</span>
              </a>
            </motion.div>

            {/* Trust Proof */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: expo }}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-[15px] font-extrabold text-[#0f172a]"
            >
              <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-300">
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
              </span>
              <span className="font-extrabold font-sans text-slate-800" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.95)" }}>
                {t.heroCarousel.trustBadge}
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Stat Cards Row ── */}
        <motion.div
          ref={statsRef}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: expo }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5 relative z-20 mt-3 sm:mt-6 lg:mt-7 mb-1"
        >
          {/* Card 1: 4.500+ Clientes */}
          <div className="flex flex-col items-center justify-center text-center px-3 py-4 sm:px-5 sm:py-5 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_20px_rgba(15,23,42,0.18)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.25)]">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B6FE0] mb-1.5 sm:mb-2" />
            <p className="text-[32px] sm:text-[38px] lg:text-[44px] font-black leading-none font-sans tracking-tight mb-1.5 sm:mb-2 text-white">
              <StatCounter target={4500} suffix="+" duration={1200} shouldAnimate={shouldTriggerStats && !shouldReduceMotion} reduceMotion={shouldReduceMotion ?? false} />
            </p>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-slate-300 leading-snug font-sans">{t.heroCarousel.stats.clientesLabel}</p>
          </div>

          {/* Card 2: 98% Satisfacción */}
          <div className="flex flex-col items-center justify-center text-center px-3 py-4 sm:px-5 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-slate-800 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
            <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] mb-1.5 sm:mb-2" />
            <p className="text-[32px] sm:text-[38px] lg:text-[44px] font-black leading-none font-sans tracking-tight mb-1.5 sm:mb-2 text-[#0b214a]">
              <StatCounter target={98} suffix="%" duration={1200} shouldAnimate={shouldTriggerStats && !shouldReduceMotion} reduceMotion={shouldReduceMotion ?? false} />
            </p>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-slate-500 leading-snug font-sans">{t.heroCarousel.stats.satisfaccionLabel}</p>
          </div>

          {/* Card 3: +300 Comunidades */}
          <div className="flex flex-col items-center justify-center text-center px-3 py-4 sm:px-5 sm:py-5 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_20px_rgba(15,23,42,0.18)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.25)]">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B6FE0] mb-1.5 sm:mb-2" />
            <p className="text-[32px] sm:text-[38px] lg:text-[44px] font-black leading-none font-sans tracking-tight mb-1.5 sm:mb-2 text-white">
              <StatCounter target={300} prefix="+" duration={1200} shouldAnimate={shouldTriggerStats && !shouldReduceMotion} reduceMotion={shouldReduceMotion ?? false} />
            </p>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-slate-300 leading-snug font-sans">{t.heroCarousel.stats.comunidadesLabel}</p>
          </div>

          {/* Card 4: 15+ Años */}
          <div className="flex flex-col items-center justify-center text-center px-3 py-4 sm:px-5 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-slate-800 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563eb] mb-1.5 sm:mb-2" />
            <p className="text-[32px] sm:text-[38px] lg:text-[44px] font-black leading-none font-sans tracking-tight mb-1.5 sm:mb-2 text-[#0b214a]">
              <StatCounter target={15} suffix="+" duration={1200} shouldAnimate={shouldTriggerStats && !shouldReduceMotion} reduceMotion={shouldReduceMotion ?? false} />
            </p>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-semibold text-slate-500 leading-snug font-sans">{t.heroCarousel.stats.anosLabel}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
