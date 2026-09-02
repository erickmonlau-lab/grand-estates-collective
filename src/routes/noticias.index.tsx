import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Menu, X, MessageCircle } from "lucide-react";
import { translations } from "../data/translations";

import { Navbar } from "@/components/Navbar";

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
  component: NoticiasCatalogComponent,
});

function NoticiasCatalogComponent() {
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* SHARED CANONICAL NAVY NAVBAR */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      {/* HEADER HERO */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#0b172a] text-white relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 font-sans">
            <Link to="/" className="hover:underline">Inicio</Link>
            <span>/</span>
            <span className="text-white">Blog & Noticias</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 font-sans tracking-tight leading-tight">
            Noticias, Consejos e <span className="text-[#38bdf8]">Información Inmobiliaria</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl font-medium leading-relaxed font-sans">
            Guías profesionales, actualidad sobre comunidades de propietarios, peritajes y consejos legales para compradores e inquilinos en Santa Coloma de Gramenet.
          </p>
        </div>
      </header>

      {/* MAIN CATALOG CONTENT */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
            Todos los Artículos Publicados ({articles.length})
          </h2>
        </div>

        {/* ARTICLES GRID (8 CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art) => {
            const content = art[language] || art.es;
            return (
              <article key={art.id} className="bg-white rounded-2xl p-5 flex flex-col h-full border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-slate-100 cursor-pointer">
                  <img
                    src={art.image}
                    alt={content.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{content.date}</span>
                    <span>•</span>
                    <span>{content.readTime}</span>
                  </div>
                  <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-black text-[#0f172a] text-base leading-snug mb-3 group-hover:text-[#2563eb] transition-colors line-clamp-2 font-sans cursor-pointer">
                    {content.title}
                  </Link>
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
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1221] text-white py-12 border-t border-white/10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/images/logo-gesgrama-text-horizontal.png" alt="Gesgrama" width={424} height={104} className="h-10 w-auto brightness-0 invert" />
          <p className="text-slate-400 text-sm font-medium font-sans">© {new Date().getFullYear()} Gesgrama Inmobiliaria. Todos los derechos reservados. · Sitio web por <a href="https://kovia.es" target="_blank" rel="noopener">Kovia</a></p>
          <div className="flex gap-6 text-sm text-slate-300 font-bold font-sans">
            <Link to="/aviso-legal" className="hover:text-white">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="hover:text-white">Privacidad</Link>
            <Link to="/politica-cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
