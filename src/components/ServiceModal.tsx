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
  if (selectedServiceIndex === null) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[28px] max-w-xl w-full shadow-2xl relative border-2 border-slate-200 max-h-[90vh] overflow-hidden my-auto text-[#0f172a] animate-in fade-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Top Brand Color Banner with Solid Navy Background and Clear Iconography */}
        <div className="relative bg-[#0b214a] p-6 sm:p-8 text-white overflow-hidden">
          {/* Subtle architectural background decoration */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:scale-105 z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-lg border border-white/90">
              {selectedServiceIndex === 0 && <Building2 className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 1 && <TrendingUp className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 2 && <Scale className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 3 && <Wrench className="w-7 h-7 stroke-[2.2]" />}
            </div>
            <div>
              <span className="inline-block bg-[#2563eb] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full mb-1 font-sans shadow-xs">
                {t.servicios.tag}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                {t.serviceModal.items[selectedServiceIndex]?.title}
              </h3>
            </div>
          </div>

          <p className="text-blue-100 text-xs sm:text-sm font-semibold mt-3 font-sans leading-snug relative z-10">
            {t.serviceModal.items[selectedServiceIndex]?.tagline}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium font-sans">
            {t.serviceModal.items[selectedServiceIndex]?.description}
          </p>

          {/* Benefits with SOLID container and high contrast white title & distinct checkmarks */}
          <div className="bg-[#0b214a] rounded-2xl p-5 sm:p-6 text-white space-y-3.5 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
              <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-sans">
                {language === "ca" ? "Què inclou el servei:" : language === "en" ? "What's included:" : "Qué incluye el servicio:"}
              </p>
            </div>
            {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-100 font-sans">
                <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                </div>
                <span className="leading-snug pt-0.5">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
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
              className="w-full sm:flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-full text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-sans uppercase tracking-wider cursor-pointer"
            >
              <span>{t.serviceModal.contactBtn}</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-[#0f172a] border border-slate-300 font-black text-xs sm:text-sm py-3.5 px-7 rounded-full transition-all cursor-pointer font-sans uppercase tracking-wider"
            >
              {t.serviceModal.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
