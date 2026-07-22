import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  language?: "es" | "en" | "ca";
}

const tooltips = {
  es: "¿Necesitas ayuda? Chatea con nosotros",
  en: "Need help? Chat with us",
  ca: "Necessites ajuda? Xat amb nosaltres"
};

export default function WhatsAppButton({ language = "es" }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const text = tooltips[language] || tooltips.es;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="bg-[#0f172a] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-right-2 duration-200 hidden sm:block">
          {text}
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/34934685656?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20inmobiliarios."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="WhatsApp Gesgrama"
        className="relative group bg-[#25d366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
}
