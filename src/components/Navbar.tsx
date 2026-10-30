import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { translations } from "@/data/translations";

interface NavbarProps {
  language: "es" | "ca" | "en";
  setLanguage: (lang: "es" | "ca" | "en") => void;
}

export function Navbar({ language, setLanguage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language] || translations.es;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== "undefined") {
      setMobileMenuOpen(false);
      const isHomePage = window.location.pathname === "/" || window.location.pathname === "";
      if (isHomePage) {
        e.preventDefault();
        const el =
          targetId === "propiedades"
            ? (document.getElementById("catalogo-inmuebles") || document.getElementById("propiedades"))
            : document.getElementById(targetId);
        if (el) {
          const navOffset =
            targetId === "propiedades"
              ? (window.innerWidth < 768 ? 75 : 90)
              : (window.innerWidth < 768 ? 95 : 105);
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth"
          });
          window.history.replaceState(null, "", `#${targetId}`);
        }
      }
    }
  };

  return (
    <>
      {/* NAVBAR FLOTANTE CON GEOMETRÍA REDONDEADA Y BORDES DEFINIDOS */}
      <nav
        className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] sm:w-[94%] max-w-[1360px] z-[100] flex items-center justify-between py-2 sm:py-2.5 px-4 sm:px-6 md:px-7 rounded-[20px] sm:rounded-full bg-[#111111] border-2 border-[#111111] shadow-[0_8px_28px_rgba(17,17,17,0.22)] text-white gap-3 lg:gap-6"
      >
        {/* LOGOTIPO OFICIAL GESGRAMA */}
        <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2 pr-2">
          <img
            src="/images/logo-gesgrama-text-horizontal.webp"
            alt="Gesgrama - Inmobiliaria y Administración de Fincas"
            width={212}
            height={52}
            className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* ENLACES PRINCIPALES EN ESCRITORIO */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs sm:text-[13px] font-headline font-bold text-white uppercase tracking-wider shrink">
          <Link
            to="/"
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>{language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}</span>
          </Link>
          <a
            href="/#propiedades"
            onClick={(e) => handleNavClick(e, "propiedades")}
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>{t.nav.propiedades}</span>
          </a>
          <a
            href="/#servicios"
            onClick={(e) => handleNavClick(e, "servicios")}
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>{t.nav.servicios}</span>
          </a>
          <a
            href="/#nosotros"
            onClick={(e) => handleNavClick(e, "nosotros")}
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>{t.nav.nosotros}</span>
          </a>
          <Link
            to="/noticias"
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>Blog</span>
          </Link>
          <a
            href="/#contacto"
            onClick={(e) => handleNavClick(e, "contacto")}
            className="px-3.5 py-1.5 rounded-full text-white hover:text-white transition-all cursor-pointer hover:bg-[#2860F5] whitespace-nowrap"
          >
            <span>{t.nav.contacto}</span>
          </a>
        </div>

        {/* CONTROLES DERECHA: IDIOMAS + WHATSAPP DIRECTO */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* SELECTOR DE IDIOMAS */}
          <div className="flex items-center bg-[#1E1E1E] p-1 rounded-full border border-white/10 text-[11px] sm:text-xs font-data-mono font-bold">
            {(["es", "ca", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-2 sm:px-2.5 py-1 rounded-full transition-all cursor-pointer uppercase ${
                  language === lang
                    ? "bg-[#2860F5] text-white font-black shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* BOTÓN WHATSAPP REDONDEADO */}
          <a
            href="https://wa.me/34601259424"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-3.5 sm:px-4 py-2 rounded-full font-headline font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* BOTÓN HAMBURGUESA EN MÓVIL */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[#1E1E1E] text-white hover:bg-[#2860F5] transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL FLOTANTE CON ESQUINAS REDONDEADAS */}
      {mobileMenuOpen && (
        <div className="fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[500px] bg-[#111111] border-2 border-[#111111] rounded-2xl shadow-[0_16px_40px_rgba(17,17,17,0.35)] z-[99] p-4 text-white lg:hidden animate-in fade-in slide-in-from-top-4 duration-150">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <a
              href="/#propiedades"
              onClick={(e) => handleNavClick(e, "propiedades")}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              {t.nav.propiedades}
            </a>
            <a
              href="/#servicios"
              onClick={(e) => handleNavClick(e, "servicios")}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              {t.nav.servicios}
            </a>
            <a
              href="/#nosotros"
              onClick={(e) => handleNavClick(e, "nosotros")}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              {t.nav.nosotros}
            </a>
            <Link
              to="/noticias"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              Blog
            </Link>
            <a
              href="/#contacto"
              onClick={(e) => handleNavClick(e, "contacto")}
              className="py-2.5 px-4 rounded-xl text-sm font-headline font-bold text-white hover:bg-[#2860F5] transition-colors"
            >
              {t.nav.contacto}
            </a>
          </div>

          <a
            href="https://wa.me/34601259424"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 w-full bg-[#16A34A] text-white py-3 rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      )}
    </>
  );
}

export default Navbar;
