import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { formatLocation } from "@/data/properties";

interface CoberturaSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function CoberturaSection({ language, t }: CoberturaSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="cobertura" className="py-6 sm:py-10 md:py-12 bg-[#F8FAFC] text-[#0f172a] scroll-mt-28 md:scroll-mt-32">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-200/90 p-5 sm:p-8 md:p-10 mx-4 sm:mx-6 md:mx-auto max-w-[1320px] relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <span className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-xs mb-3">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>{language === "ca" ? "ÀREA DE COBERTURA" : language === "en" ? "COVERAGE AREA" : "ÁREA DE COBERTURA"}</span>
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-[#0f172a] mb-3 font-sans flex flex-col items-start gap-1">
              <span>{language === "ca" ? "Experts a" : language === "en" ? "Experts in" : "Expertos en"}</span>
              <span className="inline-block text-[#2563EB]">
                Santa Coloma de Gramenet
              </span>
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mb-4 font-bold leading-snug font-sans">
              {language === "ca" ? "Equip propi amb atenció personalitzada a tots els barris de Santa Coloma de Gramenet." : language === "en" ? "Our own team with personalized service in all neighborhoods of Santa Coloma de Gramenet." : "Equipo propio con atención personalizada en todos los barrios de Santa Coloma de Gramenet."}
            </p>
            
            {/* 14 Pills Elegantes de Barrios */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 max-w-lg">
              {[
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
              ].map((barrio) => (
                <Link
                  key={barrio.slug}
                  to="/administrador-fincas/$city"
                  params={{ city: barrio.slug }}
                  title={`Administrador de fincas en ${barrio.name}, Santa Coloma de Gramenet`}
                  className="bg-[#EFF6FF] hover:bg-[#2563EB] text-[#0f172a] hover:text-white border border-blue-200 hover:border-[#2563EB] rounded-xl px-3 py-1.5 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MapPin className="w-3 h-3 text-[#2563EB] group-hover:text-white shrink-0" />
                  <span>{formatLocation(barrio.name, language)}</span>
                </Link>
              ))}
            </div>

            {/* Help Bubble Card */}
            <div className="w-full">
              <div className="bg-[#EFF6FF] border-2 border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 shadow-sm text-[#0f172a]">
                <div className="flex items-center gap-3 sm:gap-3.5 flex-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0 text-white shadow-xs">
                    <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-black text-[#0f172a] leading-tight font-sans tracking-tight">
                      {language === "ca" ? "¿Necessites ajuda?" : language === "en" ? "Need help?" : "¿Necesitas ayuda?"}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-bold leading-tight mt-0.5 font-sans">
                      {language === "ca" ? "Som aquí per ajudar-te, sense compromís." : language === "en" ? "We are here to help you, no obligation." : "Estamos aquí para ayudarte, sin compromiso."}
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
                  className="w-full md:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans whitespace-nowrap group hover:scale-[1.02]"
                >
                  <span>{t.hero.contacto}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: MAP WITH RELIABLE EMBED & FLOATING CENTRAL OFFICE BADGE EN AZUL MARINO SÓLIDO */}
          <div className="w-full lg:w-1/2 relative h-[320px] sm:h-[360px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-slate-200 bg-[#e8ecf1] shadow-md group">
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

            {/* Floating Card Top Right - Sede Central en Azul Marino Sólido #0F172A */}
            <div className="absolute top-3 right-3 bg-[#0F172A] text-white rounded-xl p-3.5 shadow-xl border border-slate-700 z-20 pointer-events-auto max-w-[270px]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-black text-white text-[11px] uppercase tracking-wider font-sans">
                    {language === "ca" ? "SEU CENTRAL GESGRAMA" : language === "en" ? "GESGRAMA HEADQUARTERS" : "SEDE CENTRAL GESGRAMA"}
                  </h3>
                  <p className="text-white text-xs font-black font-sans leading-tight mt-0.5">Av. dels Banús, 49</p>
                  <p className="text-slate-300 text-[11px] font-medium font-sans">08923 Santa Coloma de Gramenet</p>
                  <a href="tel:+34934685656" className="text-[#60A5FA] hover:text-white transition-colors text-[11px] font-bold font-sans mt-1 block">
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
