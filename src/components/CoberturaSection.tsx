import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { formatLocation } from "@/data/properties";
import { DrawnUnderline } from "@/components/DrawnUnderline";

interface CoberturaSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function CoberturaSection({ language, t }: CoberturaSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const BARRIOS = [
    { name: "Centre", slug: "centre" },
    { name: "Singuerlín", slug: "singuerlin" },
    { name: "Santa Rosa", slug: "santa-rosa" },
    { name: "Can Mariner", slug: "can-mariner" },
    { name: "Fondo", slug: "fondo" },
    { name: "Riera Alta", slug: "riera-alta" },
    { name: "Llatí", slug: "llati" },
    { name: "El Raval", slug: "el-raval" },
    { name: "Riu Nord", slug: "riu-nord" },
    { name: "Riu Sud", slug: "riu-sud" },
    { name: "Les Oliveres", slug: "les-oliveres" },
    { name: "Can Franquesa", slug: "can-franquesa" },
    { name: "La Guinardera", slug: "la-guinardera" },
    { name: "Cementiri Vell", slug: "cementiri-vell" }
  ];

  return (
    <section id="cobertura" className="py-12 sm:py-16 bg-[#FAF9FC] text-[#111111] scroll-mt-28 border-b-2 border-[#111111]">
      <div className="bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-5 sm:p-8 md:p-10 mx-4 sm:mx-6 md:mx-auto max-w-[1360px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT CONTENT: REJILLA TÉCNICA ROUNDED 14 BARRIOS */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between text-left z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-[2px_2px_0px_#2860F5] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#2860F5]" />
                <span>{language === "ca" ? "ÀREA DE COBERTURA INTEGRAL" : language === "en" ? "FULL COVERAGE AREA" : "ÁREA DE COBERTURA INTEGRAL"}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight tracking-tight text-[#111111] mb-3">
                <span>{language === "ca" ? "Presència activa a" : language === "en" ? "Active presence in" : "Presencia activa en"}&nbsp;</span>
                <span className="relative inline-block text-[#2860F5]">
                  Santa Coloma de Gramenet
                  <DrawnUnderline color="#2860F5" />
                </span>
              </h2>
              
              <p className="text-[#111111] text-base sm:text-lg mb-6 font-bold leading-relaxed max-w-xl">
                {language === "ca" 
                  ? "Equip propi col·legiat amb atenció directa i presencial als 14 barris oficials de la ciutat." 
                  : language === "en" 
                  ? "Official chartered team with local and direct presence in all 14 city districts." 
                  : "Equipo propio colegiado con atención directa y presencial en los 14 barrios oficiales de la ciudad."}
              </p>
              
              {/* Rejilla de 14 barrios con tarjetas redondeadas (rounded-xl) y fondos sólidos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {BARRIOS.map((barrio) => (
                  <Link
                    key={barrio.slug}
                    to="/administrador-fincas/$city"
                    params={{ city: barrio.slug }}
                    title={`Administrador de fincas en ${barrio.name}, Santa Coloma de Gramenet`}
                    className="bg-[#FFFFFF] hover:bg-[#2860F5] text-[#111111] hover:text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#111111] p-2.5 text-[14px] sm:text-[15px] font-headline font-bold transition-all flex items-center justify-between group cursor-pointer hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 bg-[#2860F5] group-hover:bg-white text-white group-hover:text-[#2860F5] rounded-full flex items-center justify-center shrink-0 border border-[#111111] transition-colors">
                        <MapPin className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span className="truncate">{formatLocation(barrio.name, language)}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#111111] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 stroke-[2.5]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Block Solid */}
            <div className="mt-4 pt-4 border-t-2 border-[#111111]">
              <div className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#111111]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#2860F5] border-2 border-[#111111] rounded-xl flex items-center justify-center shrink-0 text-white shadow-[2px_2px_0px_#111111]">
                    <MessageCircle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-headline font-black text-[#111111] leading-tight">
                      {language === "ca" ? "¿Necessites assessorament tècnic?" : language === "en" ? "Need technical advice?" : "¿Necesitas asesoramiento técnico?"}
                    </h3>
                    <p className="text-slate-700 text-sm font-bold leading-tight mt-0.5">
                      {language === "ca" ? "Consulta amb un perit o administrador col·legiat." : language === "en" ? "Consult a chartered manager or certified appraiser." : "Consulta con un perito o administrador colegiado."}
                    </p>
                  </div>
                </div>
                <a 
                  href="#formulario-contacto" 
                  onClick={(e) => {
                    e.preventDefault();
                    const formEl = document.getElementById("formulario-contacto");
                    if (formEl) {
                      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      const inputEl = document.getElementById("contacto-nombre-input") || formEl.querySelector("input");
                      if (inputEl) setTimeout(() => (inputEl as HTMLInputElement).focus({ preventScroll: true }), 400);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-[#111111] hover:bg-[#2860F5] text-white border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#2860F5] font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>{language === "ca" ? "Contactar ara" : language === "en" ? "Contact now" : "Contactar ahora"}</span>
                  <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT MAP CONTAINER ROUNDED */}
          <div className="w-full lg:w-5/12 h-[340px] sm:h-[400px] lg:h-auto min-h-[340px] relative border-2 border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] overflow-hidden bg-slate-100">
            <iframe
              title="Mapa de cobertura Gesgrama en Santa Coloma de Gramenet"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11964.881268303884!2d2.2036665796277255!3d41.45071197925828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb42010cfa0b%3A0x6b403d6d539ecb7!2sAv.+dels+Ban%C3%BAs%2C+49%2C+08923+Santa+Coloma+de+Gramenet%2C+Barcelona!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
              onLoad={() => setMapLoaded(true)}
            />
            {/* Overlay badge sede central */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-[#111111] text-white p-3 rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#2860F5] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-headline font-black text-slate-300 uppercase tracking-wider block">Sede Central</span>
                <span className="text-xs font-bold text-white block">Av. dels Banús, 49 · Santa Coloma</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
