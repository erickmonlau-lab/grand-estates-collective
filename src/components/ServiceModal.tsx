import { Building2, TrendingUp, Shield, Paintbrush, X, Check, ArrowRight } from "lucide-react";

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
        {/* Top Brand Color Banner */}
        <div className="relative bg-gradient-to-r from-[#0b214a] via-[#1e3a6e] to-[#2563eb] p-6 sm:p-8 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 hover:scale-105"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center shrink-0 shadow-lg border border-white/80">
              {selectedServiceIndex === 0 && <Building2 className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 1 && <TrendingUp className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 2 && <Shield className="w-7 h-7 stroke-[2.2]" />}
              {selectedServiceIndex === 3 && <Paintbrush className="w-7 h-7 stroke-[2.2]" />}
            </div>
            <div>
              <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 border border-white/20 font-sans">
                {t.servicios.tag}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                {t.serviceModal.items[selectedServiceIndex]?.title}
              </h3>
            </div>
          </div>

          <p className="text-blue-100 text-xs sm:text-sm font-extrabold mt-3 font-sans leading-snug">
            {t.serviceModal.items[selectedServiceIndex]?.tagline}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold font-sans">
            {t.serviceModal.items[selectedServiceIndex]?.description}
          </p>

          {/* Benefits with solid light-blue container and vibrant blue icons */}
          <div className="bg-[#eff6ff] rounded-2xl p-4 sm:p-5 border-2 border-[#bfdbfe] space-y-3 shadow-xs">
            <p className="text-xs font-black uppercase tracking-wider text-[#1e3a6e] mb-2 font-sans">
              {language === "ca" ? "Què inclou el servei:" : language === "en" ? "What's included:" : "Qué incluye el servicio:"}
            </p>
            {t.serviceModal.items[selectedServiceIndex]?.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-extrabold text-[#0f172a] font-sans">
                <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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
