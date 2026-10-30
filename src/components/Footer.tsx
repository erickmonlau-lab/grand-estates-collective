import React, { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { AccreditationBadges } from "@/components/AccreditationBadges";

interface FooterProps {
  language?: "es" | "ca" | "en";
}

const BARRIOS_14 = [
  { name: "Centre", slug: "centre" },
  { name: "Santa Rosa", slug: "santa-rosa" },
  { name: "Can Mariner", slug: "can-mariner" },
  { name: "Fondo", slug: "fondo" },
  { name: "Singuerlín", slug: "singuerlin" },
  { name: "Riera Alta", slug: "riera-alta" },
  { name: "Llatí", slug: "llati" },
  { name: "El Raval", slug: "el-raval" },
  { name: "Riu Nord", slug: "riu-nord" },
  { name: "Riu Sud", slug: "riu-sud" },
  { name: "Can Franquesa", slug: "can-franquesa" },
  { name: "Les Oliveres", slug: "les-oliveres" },
  { name: "La Guinardera", slug: "la-guinardera" },
  { name: "Cementiri Vell", slug: "cementiri-vell" }
];

export function Footer({ language = "es" }: FooterProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

  return (
    <footer className="bg-[#111111] text-white relative z-20 border-t-2 border-[#111111]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-12 flex flex-col gap-10 relative">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 pb-6 border-b-2 border-white/20">
          {/* 1. Logo & Resumen */}
          <div>
            <div className="inline-block mb-5">
              <img
                src="/images/logo-gesgrama-text-horizontal.webp"
                alt="Gesgrama - Inmobiliaria y Administración de Fincas"
                width={212}
                height={52}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
              {isCa
                ? "Administració de finques, agència immobiliària i assessoria jurídica a Santa Coloma de Gramenet. Més de 15 anys d'experiència al servei de comunitats i propietaris."
                : isEn
                ? "Property management, real estate agency and legal advisory in Santa Coloma de Gramenet. Over 15 years of certified local experience."
                : "Administración de fincas, agencia inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet. Más de 15 años de experiencia colegiada."}
            </p>
          </div>

          {/* 2. Navegación y Servicios Directos */}
          <div>
            <h3 className="text-lg sm:text-xl font-headline font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#2860F5] shrink-0" />
              <span>{isCa ? "Serveis Principals" : isEn ? "Core Services" : "Servicios Principales"}</span>
            </h3>
            <ul className="space-y-3 font-headline font-bold text-sm sm:text-base">
              {[
                { slug: "administracion-de-fincas", label: isCa ? "Administració de Finques" : "Administración de Fincas" },
                { slug: "gestion-inmobiliaria", label: isCa ? "Gestió Immobiliària" : "Gestión Inmobiliaria" },
                { slug: "asesoria-juridica-fiscal", label: isCa ? "Assessoria Jurídica i Fiscal" : "Asesoría Jurídica y Fiscal" },
                { slug: "obras-mantenimiento", label: isCa ? "Obres, ITE i Manteniment" : "Obras, ITE y Mantenimiento" }
              ].map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: s.slug }}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#2860F5] group-hover:text-white transition-colors" />
                    <span>{s.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/noticias"
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#2860F5] group-hover:text-white transition-colors" />
                  <span>{isCa ? "Blog i Notícies" : "Blog y Noticias"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contacto y Ubicación */}
          <div>
            <h3 className="text-lg sm:text-xl font-headline font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#2860F5] shrink-0" />
              <span>{isCa ? "Contacte" : isEn ? "Contact" : "Contacto"}</span>
            </h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-300 font-bold">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </span>
                <span>
                  Av. dels Banús, 49
                  <br />
                  08923 Santa Coloma de Gramenet
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </span>
                <a href="tel:934685656" className="hover:text-white text-white font-data-mono font-black transition-colors">
                  93 468 56 56
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </span>
                <a href="mailto:info@gesgrama.com" className="hover:text-white transition-colors">
                  info@gesgrama.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white">
                  <Clock className="w-3.5 h-3.5 text-white" />
                </span>
                <span>Lun - Vie: 9:00 a 14:00 y 16:00 a 19:30</span>
              </li>
            </ul>
          </div>

          {/* 4. Garantías y Compromiso */}
          <div>
            <h3 className="text-lg sm:text-xl font-headline font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#2860F5] shrink-0" />
              <span>{isCa ? "Compromís Gesgrama" : isEn ? "Our Commitment" : "Compromiso Gesgrama"}</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 font-medium mb-4">
              {isCa
                ? "Col·legiats oficials amb cobertura jurídica, assegurança de responsabilitat civil i resposta àgil i prioritària a incidències."
                : isEn
                ? "Official chartered members with legal coverage, civil liability insurance and agile priority incident response."
                : "Colegiados oficiales con cobertura jurídica, seguro de responsabilidad civil y respuesta ágil y prioritaria ante incidencias."}
            </p>
            <div className="bg-[#1a1a1a] border-2 border-white/20 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-headline font-bold text-white">
                <span className="w-2 h-2 bg-[#2860F5] shrink-0" />
                <span>AICAT Nº 5583 · API Catalunya</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-headline font-bold text-white">
                <span className="w-2 h-2 bg-[#2860F5] shrink-0" />
                <span>Col·legi Administradors de Finques (CAFBL)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-headline font-bold text-white">
                <span className="w-2 h-2 bg-[#2860F5] shrink-0" />
                <span>Peritos Judiciales Inmobiliarios Oficiales</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cobertura en Santa Coloma de Gramenet (14 Barrios Rejilla Rectangular Sólida) */}
        <div className="border-b-2 border-white/20 pb-8">
          <h3 className="text-sm sm:text-base font-headline font-black text-white uppercase tracking-wider mb-4 text-center md:text-left flex items-center gap-2">
            <span className="w-2 h-2 bg-[#2860F5]" />
            <span>{isCa ? "COBERTURA A SANTA COLOMA DE GRAMENET (14 BARRIS)" : isEn ? "COVERAGE IN SANTA COLOMA DE GRAMENET (14 DISTRICTS)" : "COBERTURA EN SANTA COLOMA DE GRAMENET (14 BARRIOS)"}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {BARRIOS_14.map((zone) => (
              <Link
                key={zone.slug}
                to="/administrador-fincas/$city"
                params={{ city: zone.slug }}
                className="p-2 bg-[#1a1a1a] hover:bg-[#2860F5] text-white border border-white/20 hover:border-white text-xs font-headline font-bold transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-[#2860F5] group-hover:bg-white shrink-0" />
                <span className="truncate">{zone.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Block: Acreditaciones Profesionales */}
        <div>
          <h3 className="text-base sm:text-lg font-headline font-black text-white uppercase tracking-wider mb-5 text-center md:text-left flex items-center gap-2">
            <span className="w-2 h-2 bg-[#2860F5]" />
            <span>{isCa ? "ACREDITACIONS PROFESSIONALS" : isEn ? "PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES"}</span>
          </h3>
          <AccreditationBadges language={language} />
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t-2 border-white/20 bg-[#0a0a0a] pb-6 sm:pb-5">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs sm:text-sm text-slate-200 font-headline font-extrabold tracking-wide">
              © 2026 Gesgrama. {isCa ? "Tots els drets reservats." : isEn ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
              Desarrollado por{" "}
              <a href="https://kovia.es" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[#2860F5] font-bold">
                Kovia
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300 font-headline font-bold">
            <Link to="/aviso-legal" className="hover:text-white transition-colors">
              {isCa ? "Avís Legal" : isEn ? "Legal Notice" : "Aviso Legal"}
            </Link>
            <span className="text-slate-600">·</span>
            <Link to="/politica-privacidad" className="hover:text-white transition-colors">
              {isCa ? "Privacitat" : isEn ? "Privacy" : "Privacidad"}
            </Link>
            <span className="text-slate-600">·</span>
            <Link to="/politica-cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span className="text-slate-600">·</span>
            <Link to="/admin" className="hover:text-[#2860F5] text-slate-400 transition-colors">
              {isCa ? "Accés Gestor" : isEn ? "Staff Login" : "Acceso Gestor"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
