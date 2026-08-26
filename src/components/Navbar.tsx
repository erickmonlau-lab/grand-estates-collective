import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { translations } from "@/data/translations";

interface NavbarProps {
  language: "es" | "ca" | "en";
  setLanguage: (lang: "es" | "ca" | "en") => void;
}

export function Navbar({ language, setLanguage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language] || translations.es;

  return (
    <>
      <nav
        className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] sm:w-[95%] max-w-[1360px] z-[100] flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-3.5 sm:px-5 md:px-7 lg:px-8 rounded-full bg-[#0f172a]/95 backdrop-blur-md border border-slate-700/80 shadow-[0_12px_40px_rgba(15,23,42,0.4)] text-white gap-3 lg:gap-6"
        style={{ opacity: 1, transform: 'none' }}
      >
        <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2 pr-2">
          <img
            src="/images/logo-gesgrama-text-horizontal.webp"
            alt="Gesgrama - Inmobiliaria y Administración de Fincas"
            width={212}
            height={52}
            className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs sm:text-sm font-black text-white tracking-widest uppercase font-sans shrink">
          <Link
            to="/"
            className="relative px-4 py-2 rounded-full text-white font-black hover:text-white transition-all duration-300 group hover:bg-[#2563eb] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10 text-white font-extrabold">{language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}</span>
          </Link>
          <a
            href="/#propiedades"
            className="relative px-4 py-2 rounded-full text-white font-black hover:text-white transition-all duration-300 group hover:bg-[#2563eb] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10 text-white font-extrabold">{t.nav.propiedades}</span>
          </a>
          <a
            href="/#servicios"
            className="relative px-4 py-2 rounded-full text-white font-black hover:text-white transition-all duration-300 group hover:bg-[#2563eb] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10 text-white font-extrabold">{t.nav.servicios}</span>
          </a>
          <a
            href="/#nosotros"
            className="relative px-4 py-2 rounded-full text-white font-black hover:text-white transition-all duration-300 group hover:bg-[#2563eb] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10 text-white font-extrabold">{t.nav.nosotros}</span>
          </a>
          <a
            href="/#contacto"
            className="relative px-4 py-2 rounded-full text-white font-black hover:text-white transition-all duration-300 group hover:bg-[#2563eb] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span className="relative z-10 text-white font-extrabold">{t.nav.contacto}</span>
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-full p-0.5 text-xs font-black tracking-wider">
            {(["es", "ca", "en"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 sm:px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                    language === lang ? "bg-[#2563eb] text-white shadow-xs" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
                {idx < 2 && <div className="w-px h-3.5 bg-white/30 mx-0.5"></div>}
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/34601259424"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#075E54] text-white hover:bg-[#054c44] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs uppercase tracking-wider font-black transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white shrink-0">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            className="xl:hidden p-1.5 text-white hover:text-blue-200 cursor-pointer ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <>
          {/* Translucent Blurred Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed left-0 right-0 top-0 bottom-0 bg-slate-950/60 backdrop-blur-md z-[95] lg:hidden transition-opacity duration-300"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          />
          {/* Menu panel */}
          <div
            className="fixed left-[10px] right-[10px] sm:left-[2.5%] sm:right-[2.5%] top-[72px] sm:top-[80px] bg-[#0f172a] text-white rounded-3xl p-5 shadow-2xl border border-slate-700/80 flex flex-col gap-1.5 z-[100] lg:hidden overflow-y-auto"
            style={{ maxHeight: 'calc(100dvh - 72px - env(safe-area-inset-bottom) - 64px)' }}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/80 py-2.5 px-4 rounded-xl transition-colors"
            >
              {language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}
            </Link>
            <a
              href="/#propiedades"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/80 py-2.5 px-4 rounded-xl transition-colors"
            >
              {t.nav.propiedades}
            </a>
            <a
              href="/#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/80 py-2.5 px-4 rounded-xl transition-colors"
            >
              {t.nav.servicios}
            </a>
            <a
              href="/#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/80 py-2.5 px-4 rounded-xl transition-colors"
            >
              {t.nav.nosotros}
            </a>
            <a
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-extrabold text-slate-200 hover:text-white hover:bg-slate-800/80 py-2.5 px-4 rounded-xl transition-colors"
            >
              {t.nav.contacto}
            </a>
            
            <a
              href="https://wa.me/34601259424"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 text-center bg-[#075E54] hover:bg-[#054c44] text-white py-3 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0 shadow-[0_4px_14px_rgba(7,94,84,0.4)]"
            >
              <MessageCircle className="w-4.5 h-4.5 shrink-0 fill-current text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </>
      )}
    </>
  );
}
