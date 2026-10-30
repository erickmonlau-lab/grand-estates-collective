import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
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
          const navOffset = 90;
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
      <nav
        className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#111111] border-b-2 border-[#111111] text-white"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo Gesgrama */}
          <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2">
            <img
              src="/images/logo-gesgrama-text-horizontal.webp"
              alt="Gesgrama - Inmobiliaria y Administración de Fincas"
              width={212}
              height={52}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Enlaces de Escritorio: 15-16px, Space Grotesk, distribución equilibrada */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-[15px] xl:text-[16px] font-headline font-bold text-white tracking-wide uppercase">
            <Link
              to="/"
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}</span>
            </Link>
            <a
              href="/#propiedades"
              onClick={(e) => handleNavClick(e, "propiedades")}
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.propiedades}</span>
            </a>
            <a
              href="/#servicios"
              onClick={(e) => handleNavClick(e, "servicios")}
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.servicios}</span>
            </a>
            <a
              href="/#nosotros"
              onClick={(e) => handleNavClick(e, "nosotros")}
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.nosotros}</span>
            </a>
            <Link
              to="/noticias"
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{language === "ca" ? "Blog" : language === "en" ? "Blog" : "Blog"}</span>
            </Link>
            <a
              href="/#contacto"
              onClick={(e) => handleNavClick(e, "contacto")}
              className="px-3.5 py-2 text-white hover:bg-[#2860F5] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.contacto}</span>
            </a>
          </div>

          {/* Selector de Idioma & Botón WhatsApp Integrado */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Selector de idioma rectangular y sólido */}
            <div className="flex items-center bg-[#111111] border-2 border-white/60 p-0.5 text-xs font-headline font-bold tracking-wider">
              {(["es", "ca", "en"] as const).map((lang, idx) => (
                <div key={lang} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      if (typeof window !== "undefined") {
                        localStorage.setItem("language", lang);
                        window.dispatchEvent(new Event("languagechange"));
                      }
                    }}
                    className={`px-2 sm:px-2.5 py-1 transition-all cursor-pointer font-bold ${
                      language === lang ? "bg-[#2860F5] text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                  {idx < 2 && <div className="w-px h-3.5 bg-white/30 mx-0.5"></div>}
                </div>
              ))}
            </div>

            {/* WhatsApp integrado en sistema sólido con borde y flecha */}
            <a
              href="https://wa.me/34601259424"
              target="_blank"
              rel="noopener noreferrer"
              title="Contactar por WhatsApp (+34 601 25 94 24)"
              aria-label="Contactar por WhatsApp"
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#2860F5] hover:bg-[#174bcb] text-white h-[38px] px-3.5 border-2 border-white font-headline font-black text-xs uppercase tracking-wider transition-all shadow-[2px_2px_0px_#FFFFFF] cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 bg-[#2860F5] text-white border-2 border-white cursor-pointer ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU: Contenedor Sólido con Botones Grandes Rectangulares */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#111111]/80 z-[95] lg:hidden"
        />
      )}
      <div
        className={`fixed left-0 right-0 top-[60px] bg-[#111111] text-white border-b-4 border-[#2860F5] p-5 shadow-[0_10px_0px_#111111] flex flex-col gap-2 z-[100] lg:hidden transition-all duration-200 ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1.5 font-headline font-black uppercase tracking-wider">
          {[
            { to: "/", label: language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio", num: "01" },
            { id: "propiedades", label: t.nav.propiedades, num: "02" },
            { id: "servicios", label: t.nav.servicios, num: "03" },
            { id: "nosotros", label: t.nav.nosotros, num: "04" },
            { to: "/noticias", label: language === "ca" ? "Blog" : language === "en" ? "Blog" : "Blog", num: "05" },
            { id: "contacto", label: t.nav.contacto, num: "06" }
          ].map((item) => {
            if (item.to) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[17px] text-white bg-[#1a1a1a] hover:bg-[#2860F5] p-3.5 border-2 border-white/20 transition-all cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-[13px] font-data-mono text-[#2860F5] bg-white px-2 py-0.5 border border-[#111111]">{item.num}</span>
                </Link>
              );
            }
            return (
              <a
                key={item.label}
                href={`/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id!)}
                className="flex items-center justify-between text-[17px] text-white bg-[#1a1a1a] hover:bg-[#2860F5] p-3.5 border-2 border-white/20 transition-all cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-[13px] font-data-mono text-[#2860F5] bg-white px-2 py-0.5 border border-[#111111]">{item.num}</span>
              </a>
            );
          })}
        </div>
        
        <a
          href="https://wa.me/34601259424"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-3 text-center bg-[#2860F5] hover:bg-[#174bcb] text-white py-3.5 border-2 border-white font-headline font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_#FFFFFF]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white">
            <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
          </svg>
          <span>WhatsApp (+34 601 25 94 24)</span>
        </a>
      </div>
    </>
  );
}

export default Navbar;
