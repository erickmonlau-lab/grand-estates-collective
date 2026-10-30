import React from "react";
import { Link } from "@tanstack/react-router";
import { Building2, TrendingUp, Scale, Wrench, Check, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  language: "es" | "ca" | "en";
  t: any;
  isNeighborhoodLanding?: boolean;
}

export function ServicesSection({ language, t, isNeighborhoodLanding = false }: ServicesSectionProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

  const services = [
    {
      title: isCa ? "Administració de Finques" : isEn ? "Property Management" : "Administración de Fincas",
      slug: "administracion-de-fincas",
      icon: Building2,
      image: "/images/service-1.webp", // Edificio residencial moderno en Santa Coloma
      desc: isCa
        ? "Gestió integral de comunitats de veïns, transparència comptable permanent, mediació i reducció de despeses de subministraments."
        : isEn
        ? "Comprehensive community management, ongoing accounting transparency, mediation and utility cost optimization."
        : "Gestión integral de comunidades de vecinos, transparencia contable continua, mediación vecinal y reducción de costes en suministros de la escalera.",
      bullets: [
        isCa ? "Auditoria de comptes i reducció de quotes" : "Auditoría contable y reducción de cuotas",
        isCa ? "Gestió de morositat sense bestreta" : "Reclamación judicial de morosos sin anticipos",
        isCa ? "Gestió àgil i resolutiva d'incidències" : "Gestión ágil y resolutiva de incidencias"
      ]
    },
    {
      title: isCa ? "Gestió Immobiliària" : isEn ? "Real Estate Agency" : "Gestión Inmobiliaria",
      slug: "gestion-inmobiliaria",
      icon: TrendingUp,
      image: "/images/service-2.webp", // Interior residencial moderno
      desc: isCa
        ? "Venda i lloguer segur a Santa Coloma. Valoració real de mercat, filtre estricte de solvència i assegurança d'impagament."
        : isEn
        ? "Safe sales and rentals in Santa Coloma. Real market valuation, tenant solvency screening and rental default insurance."
        : "Venta y alquiler seguro en Santa Coloma. Valoración real de mercado por m², filtro de solvencia y seguro de impago de alquiler.",
      bullets: [
        isCa ? "Valoració gratuïta per m² segons barri" : "Valoración gratuita por m² según barrio exacto",
        isCa ? "Assegurança de cobrament d'alquiler 100%" : "Seguro de cobro de alquiler garantizado",
        isCa ? "Registre oficial AICAT 5583 · API" : "Agencia registrada en AICAT 5583 y API"
      ]
    },
    {
      title: isCa ? "Assessoria Jurídica i Fiscal" : isEn ? "Legal & Tax Advisory" : "Asesoría Jurídica y Fiscal",
      slug: "asesoria-juridica-fiscal",
      icon: Scale,
      image: "/images/service-3.webp", // Despacho profesional jurídico
      desc: isCa
        ? "Especialistes en dret immobiliari i successori a Santa Coloma: tramitació d'herències, liquidació mínima de Plusvàlua i desnonaments."
        : isEn
        ? "Specialists in real estate and succession law: inheritance processing, municipal plusvalia optimization and evictions."
        : "Especialistas en derecho inmobiliario y sucesorio en Santa Coloma: tramitación de herencias, cálculo mínimo de Plusvalía y contratos blindados.",
      bullets: [
        isCa ? "Tramitació d'herències amb pisos locals" : "Tramitación integral de herencias y sucesiones",
        isCa ? "Optimització de Plusvàlua Municipal (IIVTNU)" : "Cálculo mínimo de Plusvalía Municipal (IIVTNU)",
        isCa ? "Contractes d'arres i assessorament fiscal" : "Contratos de arras blindados y demandas"
      ]
    },
    {
      title: isCa ? "Obras, ITE y Mantenimiento" : isEn ? "Building Works & ITE" : "Obras, ITE y Mantenimiento",
      slug: "obras-mantenimiento",
      icon: Wrench,
      image: "/images/service-4.webp", // Rehabilitación de fachadas y obras técnicas
      desc: isCa
        ? "Rehabilitació d'edificis plurifamiliars, superació de la ITE obligatòria, baixada d'ascensors a cota zero i subvencions NextGen."
        : isEn
        ? "Residential building renovation, mandatory ITE inspection, ground-level lift installation and NextGen grants."
        : "Rehabilitación de edificios plurifamiliares, ITE obligatoria, instalación de ascensores a cota cero y tramitación de Fondos NextGen.",
      bullets: [
        isCa ? "ITE i Certificat d'Aptitud de la Generalitat" : "ITE obligatoria y Certificado de Aptitud",
        isCa ? "Ascensors a cota zero i eliminació de barreres" : "Bajada de ascensor a cota cero sin barreras",
        isCa ? "Gestió íntegra de subvencions públiques" : "Gestión integral de subvenciones y ayudas NextGen"
      ]
    }
  ];

  const displayedServices = isNeighborhoodLanding ? services.slice(0, 3) : services;
  const gridClass = isNeighborhoodLanding
    ? "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
    : "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch";

  return (
    <section id="servicios" className="py-6 sm:py-10 md:py-12 bg-[#F8FAFC] text-[#0f172a] scroll-mt-24 font-sans">
      <div className="max-w-[1320px] mx-4 sm:mx-6 md:mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 relative z-10">
        
        {/* Cabecera de Sección Sólida */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-[12px] sm:text-[13px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Building2 className="w-4 h-4 text-white" />
            <span>{t?.servicios?.tag || (isCa ? "Solucions Integrals" : "Soluciones Integrales")}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-tight text-[#0f172a] mb-3 tracking-tight font-sans">
            {t?.servicios?.title1 || (isCa ? "Serveis especialitzats a" : "Servicios especializados en")}{" "}
            <span className="text-[#2563eb]">Santa Coloma</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            {isCa
              ? "Guia completa i atenció directa a cada àrea amb el nostre equip d'advocats, administradors i agents immobiliaris col·legiats."
              : "Guía completa y atención directa en cada área con nuestro equipo de abogados, administradores de fincas y agentes colegiados."}
          </p>
        </div>

        {/* Grid de Tarjetas de Servicios con Banner Fotográfico */}
        <div className={gridClass}>
          {displayedServices.map((srv) => {
            const SrvIcon = srv.icon;
            return (
              <div
                key={srv.slug}
                className="bg-white text-[#0f172a] rounded-[22px] overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
              >
                {/* 1. ZONA SUPERIOR: Banner Fotográfico Real (110-120px) */}
                <div className="relative h-[115px] sm:h-[120px] w-full overflow-hidden bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={120}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle edge overlay to bridge to the card */}
                  <div className="absolute inset-0 bg-[#0f172a]/10" />
                </div>

                {/* 2. ZONA CENTRAL: Contenido, Icono Sólido, Tipografía Grande y Bullets con Ticks Azules Sólidos */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Icono Sólido Azul + Título Contundente (23-25px, font-800) */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-md">
                        <SrvIcon className="w-6 h-6 text-white stroke-[2.4]" />
                      </div>
                      <h3 className="text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] leading-tight group-hover:text-[#2563eb] transition-colors font-sans tracking-tight">
                        {srv.title}
                      </h3>
                    </div>

                    {/* Descripción con buena legibilidad (16-17px) */}
                    <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium leading-relaxed mb-5">
                      {srv.desc}
                    </p>

                    {/* Línea divisoria discreta */}
                    <div className="border-t border-slate-100 pt-4 mb-5">
                      <ul className="space-y-2.5">
                        {srv.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-[14px] sm:text-[15px] font-bold text-slate-800">
                            {/* Tick Sólido Azul con Símbolo Blanco */}
                            <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                            </div>
                            <span className="leading-snug pt-0.5">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 3. ZONA INFERIOR: Botón Azul Corporativo Sólido con Una Única Flecha */}
                  <div className="pt-2">
                    <Link
                      to="/servicios/$slug"
                      params={{ slug: srv.slug }}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white font-extrabold text-[15px] sm:text-[16px] py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 uppercase tracking-wider cursor-pointer font-sans"
                    >
                      <span>{isCa ? "EXPLORAR SERVEI" : isEn ? "EXPLORE SERVICE" : "EXPLORAR SERVICIO"}</span>
                      <ArrowRight className="w-4.5 h-4.5 text-white shrink-0 stroke-[2.8]" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
export default ServicesSection;
