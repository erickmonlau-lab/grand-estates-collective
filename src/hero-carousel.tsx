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
      className={`relative text-slate-900 min-h-[100dvh] sm:min-h-screen ${
        customHeadline
          ? "pt-24 sm:pt-28 lg:pt-32"
          : "pt-24 sm:pt-28 lg:pt-32"
      } pb-0 flex flex-col justify-between overflow-hidden select-none bg-[#F8FAFC] px-4 md:px-8 xl:px-12`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* On desktop: right half. On mobile: generous vertical height, slightly lowered (top-6) */}
        <div className="absolute right-0 top-6 sm:top-0 w-[64%] sm:w-[65%] lg:w-[50%] xl:w-[46%] h-[74%] sm:h-full pointer-events-none bg-[#F8FAFC] sm:bg-transparent overflow-hidden">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgDesktop} />
            <motion.img
              src={heroBgDesktop}
              alt="Pareja feliz entrando a su nuevo hogar con las llaves y celebrando con Gesgrama"
              className="w-full h-full object-cover object-[center_top] sm:object-[right_top] block"
              loading="eager"
              fetchPriority="high"
              width={2560}
              height={1440}
              animate={{ scale: [1.02, 1.05, 1.02] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
          </picture>

          {/* Feathering: left edge */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-36 md:w-48 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none" />
          {/* Feathering: top edge down to the heads — mobile only */}
          <div className="sm:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F8FAFC] from-[20%] via-[#F8FAFC]/75 to-transparent pointer-events-none" />
          {/* Feathering: right edge — mobile only */}
          <div className="sm:hidden absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none" />
          {/* Feathering: extra-tall bottom fade that transitions ultra-smoothly over the lower half */}
          <div className="absolute inset-x-0 -bottom-1 h-60 sm:h-44 bg-gradient-to-t from-[#F8FAFC] from-[25%] via-[#F8FAFC]/85 via-[55%] to-transparent pointer-events-none" />
        </div>

        {/* Mobile: solid white text backdrop, crisp short fade */}
        <div className="sm:hidden absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#F8FAFC] from-[85%] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1360px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between pt-1 sm:pt-2 pb-2 sm:pb-3">
        {/* Mobile text container: comfortable width, clean readability */}
        <div className="max-w-[54%] xs:max-w-[52%] sm:max-w-2xl lg:max-w-3xl xl:max-w-[720px] text-left py-1 sm:py-2 my-auto">
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: expo }}
              className="mb-2 sm:mb-3"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#2563eb] text-white text-[10px] xs:text-[11px] sm:text-[13px] font-black uppercase tracking-[0.08em] sm:tracking-[0.12em] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-[0_4px_14px_rgba(37,99,235,0.28)] font-sans w-fit max-w-full animate-float">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shrink-0 animate-pulse" />
                <span className="text-left leading-none">{customTag || t.heroCarousel.tag}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: expo }}
              className="text-[25px] xs:text-[28px] sm:text-5xl md:text-[3.35rem] lg:text-[4rem] leading-[1.12] sm:leading-[1.04] mb-2 sm:mb-3.5 font-black text-[#0b214a] tracking-tight font-heading"
            >
              {customHeadline ? (
                customHeadline
              ) : (
                <>
                  {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}<br />
                  <span className="text-[#2563eb] inline-block mt-0.5 sm:mt-1">
                    {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: expo }}
              className="text-[#1e293b] text-[13px] xs:text-[14px] sm:text-lg md:text-[1.25rem] mb-3 sm:mb-5 font-bold leading-snug sm:leading-relaxed font-sans"
            >
              {customSubtitle || t.heroCarousel.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: expo }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3.5 w-full sm:w-fit mb-3 sm:mb-4.5"
            >
              <a href={customValuationHref || "#valuator-form"} className="btn-lift w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 sm:px-7 py-2 sm:py-3.5 rounded-full font-black text-[11.5px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 group cursor-pointer shrink-0 shadow-md">
                <Home className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 shrink-0" />
                <span>{t.heroCarousel.btnValuation}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
              <a href="#propiedades" className="btn-lift w-full sm:w-auto bg-white/95 backdrop-blur-xs hover:bg-slate-50 text-[#0f172a] border border-slate-300 px-4 sm:px-7 py-2 sm:py-3.5 rounded-full font-black text-[11.5px] sm:text-base tracking-wide flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 group cursor-pointer shrink-0 shadow-xs">
                <Building2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#2563eb] shrink-0" />
                <span>{t.heroCarousel.btnProperties}</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: expo }}
              className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-base font-extrabold text-[#0f172a]"
            >
              {/* Overlapping customer avatars stack */}
              <div className="flex items-center -space-x-2 shrink-0">
                <img
                  src="/images/avatar-1.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-2.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-3.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <img
                  src="/images/avatar-4.webp"
                  alt="Cliente Gesgrama"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200/60"
                  loading="lazy"
                  width={32}
                  height={32}
                />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white stroke-[3.5]" />
                </span>
                <span className="font-extrabold font-sans text-slate-900 text-xs sm:text-[15px] leading-tight">
                  {customTrustBadge || t.heroCarousel.trustBadge}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: expo }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-4 relative z-20 mt-3 sm:mt-4 mb-0"
        >
          {/* Mobile: fade the right column into the background */}
          <div className="flex flex-col items-center justify-center text-center px-2 py-2.5 xs:py-3 sm:py-4.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_24px_rgba(15,23,42,0.22)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Users className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#6C96F7] mb-1 sm:mb-2" />
            <p className="text-[22px] xs:text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              <StatCounter target={4500} suffix="+" />
            </p>
            <p className="text-[11px] xs:text-xs sm:text-[14.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.clientesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2.5 xs:py-3 sm:py-4.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5">
            <ThumbsUp className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#2563eb] mb-1 sm:mb-2" />
            <p className="text-[22px] xs:text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-[#0b214a]">
              <StatCounter target={98} suffix="%" />
            </p>
            <p className="text-[11px] xs:text-xs sm:text-[14.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.satisfaccionLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2.5 xs:py-3 sm:py-4.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0f172a] text-white shadow-[0_4px_24px_rgba(15,23,42,0.22)] border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5">
            <Building2 className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#6C96F7] mb-1 sm:mb-2" />
            <p className="text-[22px] xs:text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              <StatCounter target={300} prefix="+" />
            </p>
            <p className="text-[11px] xs:text-xs sm:text-[14.5px] font-bold text-slate-200 leading-tight font-sans">{t.heroCarousel.stats.comunidadesLabel}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2 py-2.5 xs:py-3 sm:py-4.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white text-[#0b214a] border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5">
            <Award className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#2563eb] mb-1 sm:mb-2" />
            <p className="text-[22px] xs:text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-[#0b214a]">
              <StatCounter target={15} suffix="+" />
            </p>
            <p className="text-[11px] xs:text-xs sm:text-[14.5px] font-bold text-slate-700 leading-tight font-sans">{t.heroCarousel.stats.anosLabel}</p>
          </div>
        </motion.div>
      </div>

      {/* ── CONTINUOUS AUTHORITY MARQUEE INTEGRATED AS HERO BASE ── */}
      <div className={`w-full relative z-20 ${customHeadline ? "mt-2 sm:mt-3" : "mt-3 sm:mt-5"}`}>
        <MarqueeRibbon language={language} className="-mx-4 md:-mx-8 xl:-mx-12" />
      </div>
    </section>
  );
}