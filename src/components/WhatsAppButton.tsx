import { useState, useEffect } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false);
  const text = tooltips[language] || tooltips.es;

  // Temporarily fade/scale down WhatsApp button during active user scrolling on mobile
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-2.5 right-2.5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 transition-all duration-300 ${
        isScrolling ? "opacity-20 scale-90 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
      }`}
    >
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="bg-[#0f172a] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-right-2 duration-200 hidden sm:block">
          {text}
        </div>
      )}

      {/* WhatsApp Floating Button - Scaled appropriately for mobile viewports */}
      <a
        href="https://wa.me/34934685656?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20inmobiliarios."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="WhatsApp Gesgrama"
        className="relative group bg-[#25d366] hover:bg-[#20ba5a] text-white w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-4 h-4 sm:w-7 sm:h-7 fill-white stroke-none group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
}
