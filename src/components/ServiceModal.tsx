import { useEffect } from "react";
import { Building2, TrendingUp, Scale, Wrench, X, Check, ArrowRight } from "lucide-react";

interface ServiceModalProps {
  selectedServiceIndex: number | null;
  onClose: () => void;
  language: "es" | "en" | "ca";
  t: any;
  onSelectServiceContact: (asunto: string) => void;
}

export default function ServiceModal({
  selectedServiceIndex,
  onClose,
  language,
  t,
  onSelectServiceContact
}: ServiceModalProps) {
  // ESC key handler for accessibility
  useEffect(() => {
    if (selectedServiceIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedServiceIndex, onClose]);

  if (selectedServiceIndex === null) return null;

  const currentItem = t.serviceModal?.items?.[selectedServiceIndex] || t.servicios?.items?.[selectedServiceIndex];

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-3.5 sm:p-5 bg-[#0b172a]/80 animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-[620px] w-full shadow-2xl relative border-2 border-slate-200 overflow-hidden my-auto text-[#0f172a] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Cabecera Navy Sólida y Compacta */}
        <div className="relative bg-[#0b214a] p-4.5 sm:p-5 text-white overflow-hidden shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15 z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-sm border border-white/90">
              {selectedServiceIndex === 0 && <Building2 className="w-6 h-6 stroke-[2.2]" />}
              {selectedServiceIndex === 1 && <TrendingUp className="w-6 h-6 stroke-[2.2]" />}
              {selectedServiceIndex === 2 && <Scale className="w-6 h-6 stroke-[2.2]" />}
              {selectedServiceIndex === 3 && <Wrench className="w-6 h-6 stroke-[2.2]" />}
            </div>
            <div className="min-w-0">
              <span className="inline-block bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 font-sans">
                {t.servicios.tag}
              </span>
              <h2 id="service-modal-title" className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight font-sans tracking-tight truncate">
                {currentItem?.title}
              </h2>
            </div>
          </div>

          {currentItem?.tagline && (
            <p className="text-blue-100 text-xs sm:text-[13px] font-normal mt-2 font-sans leading-snug">
              {currentItem.tagline}
            </p>
          )}
        </div>

        {/* Content Body Compacto */}
        <div className="p-4.5 sm:p-6 overflow-y-auto space-y-4">
          {/* Descripción Breve (2-3 líneas) */}
          <p className="text-slate-700 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-normal font-sans">
            {currentItem?.description || t.servicios.items[selectedServiceIndex]?.desc}
          </p>

          {/* Bloque Navy “Qué incluye el servicio” con espaciado equilibrado y respiración */}
          <div className="bg-[#0b214a] rounded-xl sm:rounded-2xl p-5 sm:py-6 sm:px-6 text-white shadow-xs">
            <div className="flex items-center gap-2 mb-3.5 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
              <p className="text-[11.5px] sm:text-xs font-bold uppercase tracking-wider text-white font-sans">
                {language === "ca" ? "Què inclou el servei:" : language === "en" ? "What's included:" : "Qué incluye el servicio:"}
              </p>
            </div>
            <div className="space-y-3 sm:space-y-3.5">
              {(currentItem?.benefits || t.servicios.items[selectedServiceIndex]?.features || []).map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] font-normal text-slate-100 font-sans">
                  <div className="w-4.5 h-4.5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="leading-normal">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons: Solicitar servicio + Cerrar */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                const currentIdx = selectedServiceIndex;
                let asunto = t.contacto.form.asuntoOpciones.comunidad;
                if (currentIdx === 1 || currentIdx === 2) {
                  asunto = t.contacto.form.asuntoOpciones.venta;
                } else if (currentIdx === 3) {
                  asunto = t.contacto.form.asuntoOpciones.otro;
                }
                onSelectServiceContact(asunto);
              }}
              className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full text-center transition-colors shadow-sm flex items-center justify-center gap-2 font-sans uppercase tracking-wider cursor-pointer"
            >
              <span>{t.serviceModal?.contactBtn || "Solicitar este servicio"}</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-[#0f172a] border border-slate-300 font-bold text-xs sm:text-sm py-3 px-6 rounded-full transition-colors cursor-pointer font-sans uppercase tracking-wider"
            >
              {t.serviceModal?.close || "Cerrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
