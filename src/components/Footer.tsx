import React, { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
    <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10" style={{ backgroundColor: "#0b1221" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-4">
          {/* 1. Logo & Resumen */}
          <div>
            <div className="inline-block mb-4">
              <img
                src="/images/logo-gesgrama-text-horizontal.webp"
                alt="Gesgrama - Inmobiliaria y Administración de Fincas"
                width={212}
                height={52}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[280px]">
              {isCa
                ? "Administració de finques, agència immobiliària i assessoria jurídica a Santa Coloma de Gramenet. 15+ anys d'experiència al servei de propietaris i veïns."
                : isEn
                ? "Property management, real estate agency and legal advisory in Santa Coloma de Gramenet. 15+ years of experience serving owners and communities."
                : "Administración de fincas, agencia inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet. 15+ años de experiencia al servicio de propietarios y vecinos."}
            </p>
          </div>

          {/* 2. Navegación y Servicios Directos */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
              {isCa ? "Serveis Principals" : isEn ? "Core Services" : "Servicios Principales"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/servicios/$slug"
                  params={{ slug: "administracion-de-fincas" }}
                  className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                  {isCa ? "Administració de Finques" : "Administración de Fincas"}
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/$slug"
                  params={{ slug: "gestion-inmobiliaria" }}
                  className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                  {isCa ? "Gestió Immobiliària" : "Gestión Inmobiliaria"}
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/$slug"
                  params={{ slug: "asesoria-juridica-fiscal" }}
                  className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                  {isCa ? "Assessoria Jurídica i Fiscal" : "Asesoría Jurídica y Fiscal"}
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/$slug"
                  params={{ slug: "obras-mantenimiento" }}
                  className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                  {isCa ? "Obres, ITE i Manteniment" : "Obras, ITE y Mantenimiento"}
                </Link>
              </li>
              <li>
                <Link
                  to="/noticias"
                  className="text-sm sm:text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                  {isCa ? "Blog i Notícies" : "Blog y Noticias"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contacto y Ubicación */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
              {isCa ? "Contacte" : isEn ? "Contact" : "Contacto"}
            </h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-300 font-bold">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
                <span>
                  Av. dels Banús, 49
                  <br />
                  08923 Santa Coloma de Gramenet
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                <a href="tel:934685656" className="hover:text-white transition-colors">
                  93 468 56 56
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#2563eb] shrink-0" />
                <a href="mailto:info@gesgrama.com" className="hover:text-white transition-colors">
                  info@gesgrama.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#2563eb] shrink-0" />
                <span>Lun - Vie: 9:00 a 14:00 y 16:00 a 19:30</span>
              </li>
            </ul>
          </div>

          {/* 4. Garantías y Compromiso */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">
              {isCa ? "Compromís Gesgrama" : isEn ? "Our Commitment" : "Compromiso Gesgrama"}
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 font-medium mb-4">
              {isCa
                ? "Col·legiats oficials amb cobertura jurídica, assegurança de responsabilitat civil i resposta àgil i prioritària a incidències."
                : isEn
                ? "Official chartered members with legal coverage, civil liability insurance and agile priority incident response."
                : "Colegiados oficiales con cobertura jurídica, seguro de responsabilidad civil y respuesta ágil y prioritaria ante incidencias."}
            </p>
            <div className="bg-[#131d33] border border-white/10 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span>AICAT Nº 5583 · API Catalunya</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span>Col·legi Administradors de Finques</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span>Peritos Judiciales Inmobiliarios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cobertura en Santa Coloma de Gramenet (14 Barrios) */}
        <div className="border-t border-white/10 pt-8 pb-2">
          <h3 className="text-sm sm:text-base font-black text-[#38bdf8] uppercase tracking-wider mb-4 font-sans text-center md:text-left">
            {isCa ? "COBERTURA A SANTA COLOMA DE GRAMENET" : isEn ? "COVERAGE IN SANTA COLOMA DE GRAMENET" : "COBERTURA EN SANTA COLOMA DE GRAMENET"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5">
            {BARRIOS_14.map((zone) => (
              <Link
                key={zone.slug}
                to="/administrador-fincas/$city"
                params={{ city: zone.slug }}
                className="px-2.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-900 hover:text-[#2563eb] text-xs font-extrabold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                <span className="truncate">{zone.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Block: Acreditaciones Profesionales */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-base sm:text-lg font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans text-center md:text-left">
            {isCa ? "ACREDITACIONS PROFESSIONALS" : isEn ? "PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES"}
          </h3>
          <AccreditationBadges language={language} />
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-[#060c18] pb-6 sm:pb-5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs sm:text-sm text-slate-200 font-extrabold tracking-wide">
              © 2026 Gesgrama. {isCa ? "Tots els drets reservats." : isEn ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">
              Desarrollado por{" "}
              <a href="https://kovia.es" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-300 font-bold">
                Kovia
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-slate-300 font-extrabold">
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
            <Link to="/admin" className="hover:text-amber-300 text-slate-400 transition-colors">
              {isCa ? "Accés Gestor" : isEn ? "Staff Login" : "Acceso Gestor"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
