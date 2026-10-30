import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { formatLocation } from "@/data/properties";

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
      <div className="bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111] p-5 sm:p-8 md:p-10 mx-4 sm:mx-6 md:mx-auto max-w-[1360px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT CONTENT: REJILLA TÉCNICA RECTANGULAR 14 BARRIOS */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between text-left z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-wider uppercase px-3.5 py-1.5 shadow-[2px_2px_0px_#2860F5] mb-3">
                <span className="w-2 h-2 bg-[#2860F5]" />
                <span>{language === "ca" ? "ÀREA DE COBERTURA INTEGRAL" : language === "en" ? "FULL COVERAGE AREA" : "ÁREA DE COBERTURA INTEGRAL"}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black leading-tight tracking-tight text-[#111111] mb-3">
                <span>{language === "ca" ? "Presència activa a" : language === "en" ? "Active presence in" : "Presencia activa en"}&nbsp;</span>
                <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">
                  Santa Coloma de Gramenet
                </span>
              </h2>
              
              <p className="text-[#111111] text-base sm:text-lg mb-6 font-bold leading-relaxed max-w-xl">
                {language === "ca" 
                  ? "Equip propi col·legiat amb atenció directa i presencial als 14 barris oficials de la ciutat." 
                  : language === "en" 
                  ? "Official chartered team with local and direct presence in all 14 city districts." 
                  : "Equipo propio colegiado con atención directa y presencial en los 14 barrios oficiales de la ciudad."}
              </p>
              
              {/* Rejilla técnica rectangular de 14 barrios (sin burbujas ni pasteles) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {BARRIOS.map((barrio) => (
                  <Link
                    key={barrio.slug}
                    to="/administrador-fincas/$city"
                    params={{ city: barrio.slug }}
                    title={`Administrador de fincas en ${barrio.name}, Santa Coloma de Gramenet`}
                    className="bg-[#FFFFFF] hover:bg-[#FAF9FC] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:shadow-[3px_3px_0px_#2860F5] hover:border-[#2860F5] p-2.5 text-[14px] sm:text-[15px] font-headline font-bold transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-[#111111]">
                        <MapPin className="w-3 h-3 text-white" />
                      </span>
                      <span className="truncate">{formatLocation(barrio.name, language)}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#111111] group-hover:text-[#2860F5] group-hover:translate-x-0.5 transition-all shrink-0 stroke-[2.5]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Block Solid */}
            <div className="mt-4 pt-4 border-t-2 border-[#111111]">
              <div className="bg-[#FAF9FC] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#111111]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#2860F5] border-2 border-[#111111] flex items-center justify-center shrink-0 text-white shadow-[2px_2px_0px_#111111]">
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
                  className="w-full sm:w-auto h-[48px] bg-[#111111] hover:bg-[#2860F5] text-white font-headline font-black text-[14px] sm:text-[15px] px-5 border-2 border-[#111111] shadow-[2px_2px_0px_#111111] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer uppercase tracking-wider whitespace-nowrap"
                >
                  <span>{t.hero.contacto}</span>
                  <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: MAP WITH NEO-BRUTALIST BORDER & SOLID ACCENT BADGE */}
          <div className="w-full lg:w-5/12 relative min-h-[360px] lg:min-h-[440px] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] bg-[#FAF9FC] overflow-hidden flex flex-col">
            <iframe
              title="Ubicación de Gesgrama en Santa Coloma de Gramenet"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.077202353112!2d2.2104523154273864!3d41.44840897925842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bcccdcd86551%3A0xc3dfbb0e816a761e!2sAv.%20dels%20Ban%C3%BAs%2C%2049%2C%2008923%20Santa%20Coloma%20de%20Gramenet%2C%20Barcelona!5e0!3m2!1s${language}!2ses!4v1700000000000!5m2!1s${language}!2ses`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              onLoad={() => setMapLoaded(true)}
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>

            {/* Sede Central Badge Neo-Brutalist */}
            <div className="absolute top-3 right-3 bg-[#111111] text-white p-3.5 border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] z-20 max-w-[270px]">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 bg-[#2860F5] text-white flex items-center justify-center shrink-0 border border-white mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </span>
                <div>
                  <h3 className="font-headline font-black text-white text-[11px] uppercase tracking-wider">
                    {language === "ca" ? "SEU CENTRAL GESGRAMA" : language === "en" ? "GESGRAMA HEADQUARTERS" : "SEDE CENTRAL GESGRAMA"}
                  </h3>
                  <p className="text-white text-xs font-headline font-extrabold leading-tight mt-0.5">Av. dels Banús, 49</p>
                  <p className="text-slate-300 text-[11px] font-medium font-sans">08923 Santa Coloma de Gramenet</p>
                  <a href="tel:+34934685656" className="text-[#2860F5] bg-white px-2 py-0.5 border border-[#111111] hover:bg-[#FAF9FC] transition-colors text-[12px] font-data-mono font-black mt-1.5 inline-block">
                    Tel: 93 468 56 56
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
