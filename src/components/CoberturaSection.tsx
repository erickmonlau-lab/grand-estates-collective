import { useState, useEffect, useRef } from "react";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { formatLocation } from "@/data/properties";

interface CoberturaSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function CoberturaSection({ language, t }: CoberturaSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInView, setMapInView] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMapInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMapInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cobertura" className="py-4 md:py-8 px-4 md:px-8 bg-[#e2e8f0] text-white scroll-mt-28 md:scroll-mt-32">
      <div className="bg-[#0b172a] rounded-[22px] md:rounded-[28px] shadow-xl border border-white/10 p-4 sm:p-7 md:p-8 mx-auto max-w-[1150px] relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            <span className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] text-[11px] font-black tracking-wider uppercase px-3 py-1.5 rounded-xl shadow-xs mb-3 border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{language === "ca" ? "ÀREA DE COBERTURA" : language === "en" ? "COVERAGE AREA" : "ÁREA DE COBERTURA"}</span>
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-3 font-sans flex flex-col items-start gap-1">
              <span>{language === "ca" ? "Experts a" : language === "en" ? "Experts in" : "Expertos en"}</span>
              <span className="inline-block bg-[#2563eb] text-white px-3.5 py-1 rounded-xl shadow-md mt-0.5 whitespace-nowrap">
                Santa Coloma de
              </span>
              <span className="inline-block bg-[#2563eb] text-white px-3.5 py-1 rounded-xl shadow-md whitespace-nowrap">
                Gramenet
              </span>
            </h2>
            
            <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-lg mb-3 font-bold leading-snug font-sans">
              {language === "ca" ? "Equip propi amb atenció personalitzada a tots els barris de Santa Coloma de Gramenet." : language === "en" ? "Our own team with personalized service in all neighborhoods of Santa Coloma de Gramenet." : "Equipo propio con atención personalizada en todos los barrios de Santa Coloma de Gramenet."}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 max-w-lg">
              {[
                "Centro",
                "Singuerlín",
                "Santa Rosa - Can Mariner",
                "Fondo",
                "Riera Alta - Llatí",
                "El Raval",
                "Riu Nord / Riu Sud",
                "Oliveres - Can Serra"
              ].map((barrio) => (
                <span key={barrio} className="bg-white text-slate-950 text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1 rounded-full border border-slate-300 shadow-2xs hover:border-white hover:bg-blue-50 transition-all flex items-center gap-1 cursor-default">
                  <MapPin className="w-3 h-3 text-[#2563eb] shrink-0" />
                  <span>{formatLocation(barrio, language)}</span>
                </span>
              ))}
            </div>

            {/* Help Bubble Card */}
            <div className="w-full">
              <div className="bg-white border-2 border-[#2563eb] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 shadow-lg text-[#0f172a]">
                <div className="flex items-center gap-3 sm:gap-3.5 flex-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] flex items-center justify-center shrink-0 text-white shadow-xs">
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
                  className="w-full md:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer font-sans whitespace-nowrap group hover:scale-[1.02]"
                >
                  <span>{t.hero.contacto}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: MAP WITH PROMINENT BLUE BORDER */}
          <div 
            ref={mapContainerRef}
            className="w-full lg:w-1/2 relative h-[280px] sm:h-[330px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden border-[3px] border-[#2563eb] bg-[#e8ecf1] shadow-lg group"
          >
            {/* Skeleton placeholder */}
            <div 
              className={`absolute inset-0 bg-[#e8ecf1] flex flex-col items-center justify-center transition-opacity duration-700 z-10 pointer-events-none ${
                mapLoaded ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/15 flex items-center justify-center mb-2 animate-pulse">
                <MapPin className="w-5 h-5 text-[#2563eb]" />
              </div>
              <span className="text-[11px] font-black text-slate-600 font-sans tracking-wide">
                {language === "ca" ? "Carregant mapa de la seu..." : language === "en" ? "Loading headquarters map..." : "Cargando mapa de la sede..."}
              </span>
            </div>

            {/* Iframe rendered on demand */}
            {mapInView && (
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
                className={`absolute inset-0 w-full h-full object-cover pointer-events-auto transition-opacity duration-700 ease-out ${
                  mapLoaded ? "opacity-100" : "opacity-0"
                }`}
              ></iframe>
            )}

            {/* Floating Card Bottom Right */}
            <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 bg-[#0b172a] text-white rounded-xl p-3 sm:p-3.5 shadow-lg border border-white/20 z-30 pointer-events-auto max-w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-white text-[10px] sm:text-xs uppercase tracking-wider font-sans">{language === "ca" ? "SEU CENTRAL" : language === "en" ? "HEADQUARTERS" : "SEDE CENTRAL"}</h3>
                  <p className="text-white text-xs sm:text-sm font-black font-sans leading-tight">Av. dels Banús, 49</p>
                  <p className="text-slate-300 text-[11px] sm:text-xs font-bold font-sans">08923 Santa Coloma de Gramenet</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
