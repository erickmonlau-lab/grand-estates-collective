import React from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AccreditationBadges } from "@/components/AccreditationBadges";
import { FooterMascot } from "@/components/FooterMascot";

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
    <footer className="bg-[#2860F5] text-white relative z-20 border-t-2 border-[#111111]" style={{ backgroundColor: "#2860F5" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col gap-10 relative">
        
        {/* Top Section: Columnas de Contenido + Mascota Animada */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8 lg:gap-12 pb-4">
          
          {/* 3 Columnas de Texto */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            
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
              <p className="text-sm sm:text-base leading-relaxed text-blue-50 font-bold max-w-[300px]">
                {isCa
                  ? "Administració de finques, agència immobiliària i assessoria jurídica a Santa Coloma de Gramenet. 15+ anys d'experiència al servei de propietaris i veïns."
                  : isEn
                  ? "Property management, real estate agency and legal advisory in Santa Coloma de Gramenet. 15+ years of experience serving owners and communities."
                  : "Administración de fincas, agencia inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet. 15+ años de experiencia al servicio de propietarios y vecinos."}
              </p>
            </div>

            {/* 2. Navegación y Servicios Directos */}
            <div>
              <h3 className="text-base sm:text-lg font-headline font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                {isCa ? "Serveis Principals" : isEn ? "Core Services" : "Servicios Principales"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: "administracion-de-fincas" }}
                    className="text-sm sm:text-base text-blue-50 hover:text-white transition-colors flex items-center gap-2.5 font-bold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {isCa ? "Administració de Finques" : "Administración de Fincas"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: "gestion-inmobiliaria" }}
                    className="text-sm sm:text-base text-blue-50 hover:text-white transition-colors flex items-center gap-2.5 font-bold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {isCa ? "Gestió Immobiliària" : "Gestión Inmobiliaria"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: "asesoria-juridica-fiscal" }}
                    className="text-sm sm:text-base text-blue-50 hover:text-white transition-colors flex items-center gap-2.5 font-bold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {isCa ? "Assessoria Jurídica i Fiscal" : "Asesoría Jurídica y Fiscal"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: "obras-mantenimiento" }}
                    className="text-sm sm:text-base text-blue-50 hover:text-white transition-colors flex items-center gap-2.5 font-bold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {isCa ? "Obres i Rehabilitació" : "Obras y Mantenimiento"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/noticias"
                    className="text-sm sm:text-base text-blue-50 hover:text-white transition-colors flex items-center gap-2.5 font-bold"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {isCa ? "Blog i Actualitat" : isEn ? "News & Guides" : "Blog y Actualidad"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. Datos de Contacto y Sede Física */}
            <div>
              <h3 className="text-base sm:text-lg font-headline font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                {isCa ? "Seu i Contacte" : isEn ? "Office & Contact" : "Sede y Contacto"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 mt-0.5 text-[#2860F5] shadow-[2px_2px_0px_#111111]">
                    <MapPin className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-extrabold text-white leading-tight">
                      Av. dels Banús, 49
                    </p>
                    <p className="text-xs sm:text-sm text-blue-100 font-bold">
                      08923 Santa Coloma de Gramenet, Barcelona
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 text-[#2860F5] shadow-[2px_2px_0px_#111111]">
                    <Phone className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                  </div>
                  <a href="tel:+34934685656" className="text-sm sm:text-base font-data-mono font-bold text-white hover:underline transition-colors">
                    934 68 56 56
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 text-[#2860F5] shadow-[2px_2px_0px_#111111]">
                    <Mail className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                  </div>
                  <a href="mailto:info@gesgrama.com" className="text-sm sm:text-base font-bold text-white hover:underline transition-colors truncate">
                    info@gesgrama.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#111111] flex items-center justify-center shrink-0 mt-0.5 text-[#2860F5] shadow-[2px_2px_0px_#111111]">
                    <Clock className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100 font-bold leading-snug">
                    {isCa ? "Dilluns a Divendres: 9:30 - 13:30 i 16:30 - 19:30" : "Lunes a Viernes: 9:30 - 13:30 y 16:30 - 19:30"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Mascota Animada Oficial de Gesgrama */}
          <div className="w-full md:w-[260px] lg:w-[290px] xl:w-[320px] flex items-center justify-center shrink-0 self-center">
            <FooterMascot className="w-full max-h-[240px] lg:max-h-[260px] object-contain drop-shadow-xl" />
          </div>

        </div>

        {/* Cobertura en Santa Coloma de Gramenet (14 Barrios) */}
        <div className="border-t-2 border-white/20 pt-8 pb-2">
          <h3 className="text-sm sm:text-base font-headline font-black text-white uppercase tracking-wider mb-4 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            {isCa ? "COBERTURA A SANTA COLOMA DE GRAMENET" : isEn ? "COVERAGE IN SANTA COLOMA DE GRAMENET" : "COBERTURA EN SANTA COLOMA DE GRAMENET"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {BARRIOS_14.map((zone) => (
              <Link
                key={zone.slug}
                to="/administrador-fincas/$city"
                params={{ city: zone.slug }}
                className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#111111] text-[#111111] hover:text-white border-2 border-[#111111] text-xs font-headline font-bold shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#FFFFFF] transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-[#2860F5] group-hover:bg-white shrink-0" />
                <span className="truncate">{zone.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sección Única Oficial de Acreditaciones Profesionales */}
        <div className="border-t-2 border-white/20 pt-8">
          <h3 className="text-base sm:text-lg font-headline font-black text-white uppercase tracking-wider mb-5 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            {isCa ? "ACREDITACIONS PROFESSIONALS" : isEn ? "PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES"}
          </h3>
          <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
            <AccreditationBadges language={language} />
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t-2 border-[#111111] bg-[#111111] pb-6 sm:pb-5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs sm:text-sm text-white font-headline font-bold tracking-wide">
              © 2026 Gesgrama. {isCa ? "Tots els drets reservats." : isEn ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
              Desarrollado por{" "}
              <a href="https://kovia.es" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[#60A5FA] font-bold">
                Kovia
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-white font-headline font-bold">
            <Link to="/aviso-legal" className="hover:text-[#60A5FA] hover:underline transition-colors">
              {isCa ? "Avís Legal" : isEn ? "Legal Notice" : "Aviso Legal"}
            </Link>
            <span className="text-slate-500">·</span>
            <Link to="/politica-privacidad" className="hover:text-[#60A5FA] hover:underline transition-colors">
              {isCa ? "Privacitat" : isEn ? "Privacy" : "Privacidad"}
            </Link>
            <span className="text-slate-500">·</span>
            <Link to="/politica-cookies" className="hover:text-[#60A5FA] hover:underline transition-colors">
              Cookies
            </Link>
            <span className="text-slate-500">·</span>
            <Link to="/admin" className="hover:text-white text-slate-300 transition-colors">
              {isCa ? "Accés Gestor" : isEn ? "Staff Login" : "Acceso Gestor"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
