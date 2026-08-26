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

      {/* WhatsApp Floating Button - Official High-Contrast WhatsApp Dark Green #075E54 */}
      <a
        href="https://wa.me/34601259424?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20inmobiliarios."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="WhatsApp Gesgrama 601 25 94 24"
        className="relative group bg-[#075E54] hover:bg-[#054c44] text-white w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(7,94,84,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_30px_rgba(7,94,84,0.65)] cursor-pointer"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#075E54] animate-ping opacity-40 pointer-events-none"></span>
        
        {/* Exact Official WhatsApp Vector (Speech bubble outline + Phone receiver) */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 fill-white group-hover:rotate-12 transition-transform duration-300 relative z-10">
          <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
        </svg>
      </a>
    </div>
  );
}
