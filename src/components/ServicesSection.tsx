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
      desc: isCa
        ? "Gestió integral de comunitats de veïns, transparència comptable 24/7, mediació i reducció de despeses de subministraments."
        : isEn
        ? "Comprehensive community management, 24/7 accounting transparency, mediation and utility cost optimization."
        : "Gestión integral de comunidades de vecinos, transparencia contable 24/7, mediación vecinal y reducción de costes en suministros.",
      bullets: [
        isCa ? "Auditoria de comptes i reducció de quotes" : "Auditoría de cuentas y reducción de cuotas",
        isCa ? "Gestió de morositat sense bestreta" : "Gestión de morosidad sin anticipos",
        isCa ? "Atenció d'urgències comunitàries 24/7" : "Atención de urgencias comunitarias 24/7"
      ]
    },
    {
      title: isCa ? "Gestió Immobiliària" : isEn ? "Real Estate Agency" : "Gestión Inmobiliaria",
      slug: "gestion-inmobiliaria",
      icon: TrendingUp,
      desc: isCa
        ? "Venda i lloguer segur a Santa Coloma. Valoració real de mercat, filtre estricte de solvència i assegurança d'impagament."
        : isEn
        ? "Safe sales and rentals in Santa Coloma. Real market valuation, tenant solvency screening and rental default insurance."
        : "Venta y alquiler seguro en Santa Coloma. Valoración real de mercado por m², filtro de solvencia y seguro de impago.",
      bullets: [
        isCa ? "Valoració gratuïta per m² segons barri" : "Valoración gratuita por m² según barrio",
        isCa ? "Assegurança de cobrament d'alquiler 100%" : "Seguro de cobro de alquiler garantizado",
        isCa ? "Registre oficial AICAT 5583 · API" : "Agencia oficial registrada en AICAT 5583"
      ]
    },
    {
      title: isCa ? "Assessoria Jurídica i Fiscal" : isEn ? "Legal & Tax Advisory" : "Asesoría Jurídica y Fiscal",
      slug: "asesoria-juridica-fiscal",
      icon: Scale,
      desc: isCa
        ? "Especialistes en dret immobiliari i successori a Santa Coloma: tramitació d'herències, liquidació mínima de Plusvàlua i desnonaments."
        : isEn
        ? "Specialists in real estate and succession law: inheritance processing, municipal plusvalia optimization and evictions."
        : "Especialistas en derecho inmobiliario y sucesorio en Santa Coloma: tramitación de herencias, cálculo mínimo de Plusvalía y contratos blindados.",
      bullets: [
        isCa ? "Tramitació d'herències amb pisos locals" : "Tramitación de herencias con inmuebles",
        isCa ? "Optimització de Plusvàlua Municipal (IIVTNU)" : "Cálculo y optimización de Plusvalía Municipal",
        isCa ? "Contractes d'arres i assessorament fiscal" : "Contratos de arras blindados y fiscalidad"
      ]
    },
    {
      title: isCa ? "Obres, ITE i Manteniment" : isEn ? "Building Works & ITE" : "Obras, ITE y Mantenimiento",
      slug: "obras-mantenimiento",
      icon: Wrench,
      desc: isCa
        ? "Rehabilitació d'edificis plurifamiliars, superació de la ITE obligatòria, baixada d'ascensors a cota zero i subvencions NextGen."
        : isEn
        ? "Residential building renovation, mandatory ITE inspection, ground-level lift installation and NextGen grants."
        : "Rehabilitación de edificios plurifamiliares, ITE obligatoria, instalación de ascensores a cota cero y tramitación de Fondos NextGen.",
      bullets: [
        isCa ? "ITE i Certificat d'Aptitud de la Generalitat" : "ITE y Certificado de Aptitud de la Generalitat",
        isCa ? "Ascensors a cota zero i eliminació de barreres" : "Ascensores a cota cero sin barreras",
        isCa ? "Gestió íntegra de subvencions públiques" : "Gestión integral de subvenciones y ayudas"
      ]
    }
  ];

  const displayedServices = isNeighborhoodLanding ? services.slice(0, 3) : services;
  const gridClass = isNeighborhoodLanding
    ? "grid grid-cols-1 md:grid-cols-3 gap-6"
    : "grid grid-cols-1 md:grid-cols-2 gap-6";

  return (
    <section id="servicios" className="relative overflow-hidden bg-[#e2e8f0] text-onyx py-6 md:py-10 scroll-mt-28 md:scroll-mt-32 font-sans">
      <div className="bg-[#0f172a] rounded-[24px] md:rounded-[32px] shadow-xl border border-sky-500/20 p-5 sm:p-7 md:p-9 mx-4 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden text-white">
        
        {/* Cabecera de Sección */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] text-[13px] sm:text-[14px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs border border-slate-200">
            <Building2 className="w-4 h-4 text-[#2563eb]" />
            <span>{t?.servicios?.tag || (isCa ? "Solucions Integrals" : "Soluciones Integrales")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white mb-2 tracking-tight">
            {t?.servicios?.title1 || (isCa ? "Serveis especialitzats a" : "Servicios especializados en")}{" "}
            <span className="text-[#38bdf8]">Santa Coloma</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium mt-2 leading-relaxed">
            {isCa
              ? "Accedeix a la guia completa de cada servei amb metodologia, garanties i atenció presencial a la nostra oficina."
              : "Accede a la guía completa de cada servicio con metodología paso a paso, garantías y atención presencial en nuestra oficina."}
          </p>
        </div>

        {/* Grid Dinámico: 2x2 para 4 servicios (Home), 3 columnas para 3 servicios (Landings) */}
        <div className={gridClass}>
          {displayedServices.map((srv) => {
            const SrvIcon = srv.icon;
            return (
              <div
                key={srv.slug}
                className="bg-white text-[#0f172a] rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-2 border-slate-100 hover:border-[#2563eb] group"
              >
                <div>
                  {/* Top: Icon + Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563eb] border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#2563eb] group-hover:text-white transition-colors shadow-2xs">
                      <SrvIcon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0f172a] group-hover:text-[#2563eb] transition-colors leading-tight">
                      {srv.title}
                    </h3>
                  </div>

                  {/* Description (2 lines concise) */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4 line-clamp-2">
                    {srv.desc}
                  </p>

                  {/* 3 Bullet points con check azul */}
                  <ul className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                    {srv.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-bold text-slate-800">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                        </div>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón Sólido de Alto Contraste directo a la URL dedicada */}
                <div className="pt-2">
                  <Link
                    to="/servicios/$slug"
                    params={{ slug: srv.slug }}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm py-3 px-5 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 uppercase tracking-wider group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>{isCa ? "Explorar servei →" : isEn ? "Explore service →" : "Explorar servicio →"}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
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
