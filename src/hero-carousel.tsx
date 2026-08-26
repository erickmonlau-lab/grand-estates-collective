import { useRef, useEffect, useState } from 'react';

import { ArrowRight, Star, Building2, Shield, Check, Home, Users, ThumbsUp, Award } from "lucide-react";
import heroBgDesktop from "@/assets/family_barcelona_opt_min.webp";
import heroBgMobile from "@/assets/family_barcelona_opt_mobile.webp"; 
import { translations } from './data/translations';

interface HeroCarouselProps {
  onPerformSearch?: (p: { mode: string; zona: string; tipo: string; precio: string }) => void;
  language?: "es" | "en" | "ca";
}



const expo = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel({ language = 'es' }: HeroCarouselProps) {
  const t = translations[language];

  return (
    <section id="hero" className="relative text-slate-900 min-h-svh sm:min-h-screen pt-16 sm:pt-24 lg:pt-26 pb-4 sm:pb-6 flex flex-col justify-between overflow-hidden select-none bg-[#F3F4F6] px-4 md:px-8 xl:px-12">
      
      {/* ── Hero Family Photo Background (Full Section Backdrop with White Overlay) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Left Architectural Building Sketch */}
        <svg className="absolute -left-10 top-0 h-full w-auto text-slate-300/40 opacity-50 hidden md:block" viewBox="0 0 300 800" fill="none" stroke="currentColor" strokeWidth="1">
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
        <svg className="absolute -right-10 top-0 h-full w-auto text-slate-300/40 opacity-50 hidden lg:block" viewBox="0 0 300 800" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 120 50 L 120 750 M 120 50 L 280 50 L 280 750" />
          <path d="M 140 90 L 180 90 L 180 140 L 140 140 Z M 200 90 L 240 90 L 240 140 L 200 140 Z" />
          <path d="M 140 170 L 180 170 L 180 220 L 140 220 Z M 200 170 L 240 170 L 240 220 L 200 220 Z" />
          <path d="M 140 250 L 180 250 L 180 300 L 140 300 Z M 200 250 L 240 250 L 240 300 L 200 300 Z" />
        </svg>

        <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full bg-[#E5DDD5]">
          <picture className="w-full h-full block">
            <source media="(max-width: 640px)" srcSet={heroBgMobile} />
            <img 
              src={heroBgDesktop} 
              alt="Familia disfrutando su hogar gestionado por Gesgrama" 
              className="w-full h-full object-cover object-[58%_center] md:object-right"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
          </picture>
          {/* Soft White Gradient Overlay (Horizontal): Smooth transition from text to photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6] via-[#F3F4F6]/75 via-45% to-transparent lg:via-[#F3F4F6]/50 lg:to-transparent" />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between pt-16 sm:pt-6 lg:pt-8 pb-2 sm:pb-4">
        
        {/* Top/Main Hero Content Container */}
        <div className="max-w-[285px] xs:max-w-xs sm:max-w-xl lg:max-w-2xl xl:max-w-3xl text-left py-0 sm:py-2 mt-1 sm:mt-0">
          <div className="flex flex-col justify-start h-full py-0 sm:py-0">
            {/* Eyebrow Pill Badge */}
            <div
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#2563eb] text-white text-[11px] sm:text-sm font-extrabold uppercase tracking-wider sm:tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-2xl mb-2.5 sm:mb-5 shadow-md font-sans w-fit max-w-full"
            >
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white shrink-0"></span>
              <span className="text-left leading-snug sm:leading-normal">{t.heroCarousel.tag}</span>
            </div>

            {/* Main Title H1 - INSTANT SSR/HTML PAINT WITHOUT JS OPACITY DELAY */}
            <h1 className="text-[26px] xs:text-[28px] sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0b214a] leading-[1.1] sm:leading-[1.05] tracking-tight mb-2.5 sm:mb-5 font-heading">
              {language === 'ca' ? 'La teva propera llar,' : language === 'en' ? 'Your next home,' : 'Tu próximo hogar,'}<br />
              <span className="text-[#2563eb]">
                {language === 'ca' ? 'més a prop.' : language === 'en' ? 'closer than ever.' : 'más cerca.'}
              </span>
            </h1>

            {/* Subtitle (LCP Element) - INSTANT HTML RENDER WITHOUT HYDRATION BLOCK */}
            <p
              className="text-[#0f172a] text-sm sm:text-xl md:text-2xl mb-3.5 sm:mb-8 font-extrabold leading-snug sm:leading-relaxed font-sans"
              style={{ textShadow: "0 0 16px rgba(255, 255, 255, 0.98), 0 1px 6px rgba(255, 255, 255, 0.95)" }}
            >
              {t.heroCarousel.subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-fit mb-3 sm:mb-6"
            >
              {/* Button 1: Solid Blue Pill */}
              <a
                href="#valuator-form"
                className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-bold text-xs sm:text-base transition-all shadow-md flex items-center justify-center sm:justify-start gap-2 group cursor-pointer shrink-0"
              >
                <Home className="w-4 h-4 text-white" />
                <span>{t.heroCarousel.btnValuation}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Button 2: Solid White Pill */}
              <a
                href="#propiedades"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0f172a] border border-slate-200 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-bold text-xs sm:text-base transition-all shadow-sm flex items-center justify-center sm:justify-start gap-2 group cursor-pointer shrink-0"
              >
                <Building2 className="w-4 h-4 text-[#2563eb]" />
                <span>{t.heroCarousel.btnProperties}</span>
              </a>
            </div>

            {/* Trust Proof */}
            <div
              className="flex items-center gap-2.5 sm:gap-3.5 text-xs sm:text-lg md:text-xl font-extrabold text-[#0f172a]"
            >
              <Check className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 text-emerald-600 stroke-[3] shrink-0" />
              <span className="font-extrabold font-sans" style={{ textShadow: "0 0 12px rgba(255, 255, 255, 0.98)" }}>
                {t.heroCarousel.trustBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Integrated Stat Cards Row (Lifted up closer to trust badge) */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 relative z-20 mt-0 sm:mt-8 lg:mt-10 mb-1"
        >
          {/* Card 1 (4500+): Fondo carbón oscuro / texto blanco */}
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2.5 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl bg-[#374353]/95 sm:bg-[#374353] text-white shadow-md backdrop-blur-xs transition-all duration-200">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B6FE0] mb-1 sm:mb-2" />
            <p className="text-lg sm:text-3xl lg:text-4xl font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              4500+
            </p>
            <p className="text-[10px] sm:text-base font-semibold text-slate-200 leading-tight font-body">{t.heroCarousel.stats.clientesLabel}</p>
          </div>

          {/* Card 2 (98%): Fondo blanco sólido / texto carbón oscuro */}
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2.5 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/95 sm:bg-white text-slate-800 border border-slate-200 shadow-md backdrop-blur-xs transition-all duration-200">
            <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B6FE0] mb-1 sm:mb-2" />
            <p className="text-lg sm:text-3xl lg:text-4xl font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-slate-800">
              98%
            </p>
            <p className="text-[10px] sm:text-base font-semibold text-slate-600 leading-tight font-body">{t.heroCarousel.stats.satisfaccionLabel}</p>
          </div>

          {/* Card 3 (+300): Fondo carbón oscuro / texto blanco */}
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2.5 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl bg-[#374353]/95 sm:bg-[#374353] text-white shadow-md backdrop-blur-xs transition-all duration-200">
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B6FE0] mb-1 sm:mb-2" />
            <p className="text-lg sm:text-3xl lg:text-4xl font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-white">
              +300
            </p>
            <p className="text-[10px] sm:text-base font-semibold text-slate-200 leading-tight font-body">{t.heroCarousel.stats.comunidadesLabel}</p>
          </div>

          {/* Card 4 (15+): Fondo blanco sólido / texto carbón oscuro */}
          <div className="flex flex-col items-center justify-center text-center px-2.5 py-2.5 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white/95 sm:bg-white text-slate-800 border border-slate-200 shadow-md backdrop-blur-xs transition-all duration-200">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B6FE0] mb-1 sm:mb-2" />
            <p className="text-lg sm:text-3xl lg:text-4xl font-black leading-none font-sans tracking-tight mb-0.5 sm:mb-1 text-slate-800">
              <span className="tabular-nums tracking-widest inline-flex items-center justify-center gap-1 font-extrabold">15+</span>
            </p>
            <p className="text-[10px] sm:text-base font-semibold text-slate-600 leading-tight font-body">{t.heroCarousel.stats.anosLabel}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
