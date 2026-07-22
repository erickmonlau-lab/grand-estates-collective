import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

interface CookieBannerProps {
  language?: "es" | "en" | "ca";
}

const content = {
  es: {
    title: "Política de Cookies",
    text: "Utilizamos cookies propias y de terceros para analizar la navegación y ofrecerte una experiencia personalizada.",
    accept: "Aceptar todas",
    reject: "Rechazar"
  },
  en: {
    title: "Cookie Policy",
    text: "We use our own and third-party cookies to analyze navigation and offer you a personalized experience.",
    accept: "Accept all",
    reject: "Reject"
  },
  ca: {
    title: "Política de Cookies",
    text: "Utilitzem cookies pròpies i de tercers per analitzar la navegació i oferir-te una experiència personalitzada.",
    accept: "Acceptar totes",
    reject: "Rebutjar"
  }
};

export default function CookieBanner({ language = "es" }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("gesgrama_cookies_accepted");
    if (!accepted) {
      // Small delay for smooth entry after load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gesgrama_cookies_accepted", "true");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("gesgrama_cookies_accepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  const t = content[language] || content.es;

  return (
    <div className="fixed bottom-5 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-white relative">
        {/* Close Icon */}
        <button
          onClick={handleReject}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close cookies"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#2563eb]/20 text-[#60a5fa] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white mb-1">{t.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium pr-4">
              {t.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
          <button
            onClick={handleAccept}
            className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            {t.accept}
          </button>
          <button
            onClick={handleReject}
            className="flex-1 bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
          >
            {t.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
