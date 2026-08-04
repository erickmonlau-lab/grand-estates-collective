import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Search, BookOpen, ChevronRight, Home, Building2, Phone, MapPin, Mail, MessageCircle, Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { translations } from "../data/translations";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      { title: "Noticias y Artículos Inmobiliarios | Blog Gesgrama" },
      { name: "description", content: "Consejos inmobiliarios, guías sobre administración de fincas, contratos de exclusividad, peritaje judicial y obra nueva en Santa Coloma de Gramenet." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Noticias y Artículos Inmobiliarios | Gesgrama" },
      { property: "og:description", content: "Todas las noticias y guías actualizadas sobre el sector inmobiliario y la gestión de comunidades en Santa Coloma de Gramenet." },
      { property: "og:url", content: "https://www.gesgrama.es/noticias" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://www.gesgrama.es/noticias" }
    ]
  }),
  component: NoticiasIndexComponent,
});

function NoticiasIndexComponent() {
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "es" | "en" | "ca";
    if (savedLang && ["es", "en", "ca"].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: "es" | "en" | "ca") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(new Event("languagechange"));
  };

  const t = translations[language] || translations.es;

  const filteredArticles = articles.filter((art) => {
    const content = art[language] || art.es;
    return content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           content.summary.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] sm:w-[95%] max-w-[1360px] z-[100] flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-3.5 sm:px-5 md:px-7 lg:px-8 rounded-full bg-[#757989]/95 backdrop-blur-md border border-white/30 shadow-[0_12px_40px_rgba(15,23,42,0.25)] text-white gap-3 lg:gap-6">
        <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2 pr-2">
          <img src="/images/logo-gesgrama-text-horizontal.png" alt="Gesgrama - Inmobiliaria y Administración de Fincas" width={424} height={104} className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert" />
        </Link>

        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs sm:text-sm font-black text-white tracking-widest uppercase font-sans shrink">
          <Link to="/" className="px-4 py-2 rounded-full text-white hover:bg-[#2563eb] transition-all">Inicio</Link>
          <a href="/#propiedades" className="px-4 py-2 rounded-full text-white hover:bg-[#2563eb] transition-all">Propiedades</a>
          <a href="/#servicios" className="px-4 py-2 rounded-full text-white hover:bg-[#2563eb] transition-all">Servicios</a>
          <Link to="/noticias" className="px-4 py-2 rounded-full bg-[#2563eb] text-white font-black">Noticias</Link>
          <a href="/#contacto" className="px-4 py-2 rounded-full text-white hover:bg-[#2563eb] transition-all">Contacto</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="flex items-center bg-[#5c6070] border border-white/20 rounded-full p-0.5 text-xs font-black tracking-wider">
            {(["es", "ca", "en"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2 sm:px-2.5 py-1 rounded-full transition-all ${language === lang ? 'bg-[#2563eb] text-white' : 'text-slate-200'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="lg:hidden p-1.5 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* HEADER HERO */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#0b172a] text-white relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
            <Link to="/" className="hover:underline">Inicio</Link>
            <span>/</span>
            <span className="text-white">Blog & Noticias</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 font-sans tracking-tight leading-tight">
            Noticias, Consejos e <span className="text-[#38bdf8]">Información Inmobiliaria</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl font-medium leading-relaxed font-sans mb-8">
            Guías profesionales, actualidad sobre comunidades de propietarios, peritajes y consejos legales para compradores e inquilinos en Santa Coloma de Gramenet.
          </p>

          {/* SEARCH BAR */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-3 rounded-2xl max-w-xl flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-400 shrink-0 ml-2" />
            <input
              type="text"
              placeholder="Buscar por título o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-0 text-white placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none font-sans"
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
            Todos los Artículos Publicados ({filteredArticles.length})
          </h2>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.map((art) => {
              const content = art[language] || art.es;
              return (
                <article key={art.id} className="bg-white rounded-2xl p-5 flex flex-col h-full border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-slate-100">
                    <img
                      src={art.image}
                      alt={content.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>{content.date}</span>
                      <span>•</span>
                      <span>{content.readTime}</span>
                    </div>
                    <h3 className="font-black text-[#0f172a] text-base leading-snug mb-3 group-hover:text-[#2563eb] transition-colors line-clamp-2 font-sans">
                      {content.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6 flex-1 line-clamp-3 font-sans">
                      {content.summary}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to="/noticias/$slug"
                        params={{ slug: art.slug }}
                        className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
                      >
                        <span>{t.noticias.seguirLeyendo}</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2 font-sans">No se encontraron artículos</h3>
            <p className="text-slate-500 text-sm font-medium mb-6 font-sans">Intenta ajustar tu término de búsqueda.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-[#2563eb] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider font-sans"
            >
              Ver todos los artículos
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1221] text-white py-12 border-t border-white/10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/images/logo-gesgrama-text-horizontal.png" alt="Gesgrama" width={424} height={104} className="h-10 w-auto brightness-0 invert" />
          <p className="text-slate-400 text-sm font-medium font-sans">© {new Date().getFullYear()} Gesgrama Inmobiliaria. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm text-slate-300 font-bold">
            <Link to="/aviso-legal" className="hover:text-white">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="hover:text-white">Privacidad</Link>
            <Link to="/politica-cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
