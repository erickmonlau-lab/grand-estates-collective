import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Check, Home, Users, ThumbsUp, Award } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_master_2k.webp";
import heroBgMobile from "@/assets/family_barcelona_opt_mobile.webp";
import { translations } from './data/translations';
import MarqueeRibbon from '@/components/MarqueeRibbon';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
  customTag?: string;
  customHeadline?: React.ReactNode;
  customSubtitle?: string;
  customTrustBadge?: string;
  customValuationHref?: string;
}

const expo = [0.16, 1, 0.3, 1] as const;

// Self-contained: fires count-up on mount after 400ms. Always animates.
function StatCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 400ms delay gives SSR hydration time to settle before starting RAF
    const delay = setTimeout(() => {
      let startTime: number | null = null;
      let raf: number;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        // Cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(ease * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, 400);
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // runs once on mount

  const display = target >= 1000 ? new Intl.NumberFormat('es-ES').format(count) : count;
  return <span>{prefix}{display}{suffix}</span>;
}

export default function HeroCarousel({
  language = 'es',
  customTag,
  customHeadline,
  customSubtitle,
  customTrustBadge,
  customValuationHref,
}: HeroCarouselProps) {
  const t = translations[language];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative text-slate-900 pt-16 sm:pt-20 lg:pt-22 pb-0 flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] px-4 md:px-8 xl:px-12"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Strictly right-anchored image block: fills only right half on desktop */}
        <div className="absolute right-0 top-0 w-full sm:w-[65%] lg:w-[50%] xl:w-[46%] h-full">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobile} />
            <motion.img
              src={heroBgDesktop}
              alt="Pareja feliz en su nuevo hogar con Gesgrama"
              className="w-full h-full object-cover object-[center_top] sm:object-[center_12%]"
              loading="eager"
              fetchPriority="high"
              width={2560}
              height={1440}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
          </picture>
          {/* Subtle gradient feathering only on the left edge of the right image */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-36 md:w-48 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between pt-1 pb-1">
        <div className="max-w-[360px] xs:max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-[700px] text-left py-0.5 my-1 sm:my-2">
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: expo }}
              className="mb-1 sm:mb-2"
            >
              <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[10.5px] sm:text-[12px] font-black uppercase tracking-[0.12em] px-3 sm:px-3.5 py-1 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit max-w-full animate-float">
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                <span className="text-left leading-none">{customTag || t.heroCarousel.tag}</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: expo }}
              className="text-[26px] xs:text-[30px] sm:text-4xl md:text-[2.75rem] lg:text-[3.2rem] font-black text-[#0b214a] leading-[1.06] tracking-tight mb-1.5 sm:mb-2 font-heading"
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}<br />
                  <span className="text-[#2563eb] inline-block mt-0.5">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: expo }}
              className="text-[#1e293b] text-[13.5px] sm:text-[15px] md:text-[16px] mb-2 sm:mb-3 font-bold leading-snug font-sans max-w-[580px] text-pretty"
              style={{ textShadow: "0 0 16px rgba(255,255,255,0.95), 0 1px 4px rgba(255,255,255,0.9)" }}
            >
              {customSubtitle || t.heroCarousel.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: expo }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-fit mb-2 sm:mb-2.5"
            >
              <a href={customValuationHref || "#valuator-form"} className="btn-lift w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center sm:justify-start gap-2 group cursor-pointer shrink-0">
                <Home className="w-4 h-4 shrink-0" />
                <span>{t.heroCarousel.btnValuation}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
              <a href="#propiedades" className="btn-lift w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0f172a] border border-slate-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center sm:justify-start gap-2 group cursor-pointer shrink-0">
                <Building2 className="w-4 h-4 text-[#2563eb] shrink-0" />
                <span>{t.heroCarousel.btnProperties}</span>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: expo }}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-[#0f172a]"
            >
              {/* Overlapping customer avatars stack */}
              <div className="flex items-center -space-x-2 shrink-0">
                <img
                  src="/images/avatar-1.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={28}
                  height={28}
                />
                <img
                  src="/images/avatar-2.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={28}
                  height={28}
                />
                <img
                  src="/images/avatar-3.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={28}
                  height={28}
                />
                <img
                  src="/images/avatar-4.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={28}
                  height={28}
                />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                </span>
                <span className="font-extrabold font-sans text-slate-900 text-[12.5px] sm:text-[13.5px]" style={{ textShadow: "0 0 10px rgba(255,255,255,0.95)" }}>
                  {customTrustBadge || t.heroCarousel.trustBadge}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: expo }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-3.5 relative z-20 mt-1 mb-0"
        >
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-[#0f172a] text-white shadow-[0_4px_20px_rgba(15,23,42,0.18)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Users className="w-4 h-4 text-[#6C96F7] mb-0.5" />
            <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-black leading-none font-sans tracking-tight mb-0.5 text-white">
              <StatCounter target={4500} suffix="+" />
            </p>
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.clientesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5">
            <ThumbsUp className="w-4 h-4 text-[#2563eb] mb-0.5" />
            <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-black leading-none font-sans tracking-tight mb-0.5 text-[#0b214a]">
              <StatCounter target={98} suffix="%" />
            </p>
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.satisfaccionLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-[#0f172a] text-white shadow-[0_4px_20px_rgba(15,23,42,0.18)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Building2 className="w-4 h-4 text-[#6C96F7] mb-0.5" />
            <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-black leading-none font-sans tracking-tight mb-0.5 text-white">
              <StatCounter target={300} prefix="+" />
            </p>
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.comunidadesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5">
            <Award className="w-4 h-4 text-[#2563eb] mb-0.5" />
            <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-black leading-none font-sans tracking-tight mb-0.5 text-[#0b214a]">
              <StatCounter target={15} suffix="+" />
            </p>
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.anosLabel}</p>
          </div>
        </motion.div>
      </div>

      {/* ── CONTINUOUS AUTHORITY MARQUEE INTEGRATED AS HERO BASE ── */}
      <div className="w-full relative z-20 mt-1.5 sm:mt-2">
        <MarqueeRibbon language={language} className="-mx-4 md:-mx-8 xl:-mx-12" />
      </div>
    </section>
  );
}