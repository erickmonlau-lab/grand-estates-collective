import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from '@/components/Footer';
import { articles } from "../data/articles";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { translations, loadLanguage } from "../data/translations";

import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      { title: "Noticias y Artículos Inmobiliarios | Blog Gesgrama" },
      { name: "description", content: "Consejos inmobiliarios, guías sobre administración de fincas, contratos de exclusividad, peritaje judicial y obra nueva en Santa Coloma de Gramenet." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Noticias y Artículos Inmobiliarios | Gesgrama" },
      { property: "og:description", content: "Todas las noticias y guías actualizadas sobre el sector inmobiliario y la gestión de comunidades en Santa Coloma de Gramenet." },
      { property: "og:url", content: "https://gesgrama.com/noticias" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://gesgrama.com/noticias" }
    ]
  }),
  component: NoticiasCatalogComponent,
});

function NoticiasCatalogComponent() {
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "es" | "en" | "ca";
    if (savedLang === "ca" || savedLang === "en") {
      loadLanguage(savedLang).then(() => {
        setLanguage(savedLang);
      });
    } else if (savedLang === "es") {
      setLanguage("es");
    }
  }, []);

  const handleLanguageChange = (lang: "es" | "en" | "ca") => {
    if (lang === "es") {
      setLanguage("es");
      localStorage.setItem("language", "es");
      window.dispatchEvent(new Event("languagechange"));
    } else {
      loadLanguage(lang).then(() => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        window.dispatchEvent(new Event("languagechange"));
      });
    }
  };

  const t = translations[language] || translations.es;

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#111111] font-sans selection:bg-[#2860F5] selection:text-white">
      {/* NAVBAR */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      {/* HEADER HERO NEO-BRUTALIST */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#111111] text-white border-b-2 border-[#111111] relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-headline font-bold text-[#60A5FA] uppercase tracking-widest mb-4">
            <Link to="/" className="hover:underline">Inicio</Link>
            <span>/</span>
            <span className="text-white">Blog & Noticias</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-headline font-black mb-4 tracking-tight leading-tight">
            Noticias, Consejos e <span className="text-[#2860F5]">Información Inmobiliaria</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl font-medium leading-relaxed">
            Guías profesionales, actualidad sobre comunidades de propietarios, peritajes y consejos legales para compradores e inquilinos en Santa Coloma de Gramenet.
          </p>
        </div>
      </header>

      {/* MAIN CATALOG CONTENT */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#111111]">
          <h2 className="text-xl sm:text-2xl font-headline font-black text-[#111111] uppercase tracking-tight">
            Todos los Artículos Publicados ({articles.length})
          </h2>
        </div>

        {/* ARTICLES GRID (8 CARDS NEO-BRUTALIST) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art) => {
            const content = art[language] || art.es;
            return (
              <article key={art.id} className="bg-white border-2 border-[#111111] neo-shadow hover:shadow-[6px_6px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] p-5 flex flex-col h-full transition-all group">
                <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/10] overflow-hidden border-2 border-[#111111] mb-4 bg-slate-100 cursor-pointer">
                  <img
                    src={art.image}
                    alt={content.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-data-mono font-bold text-[#2860F5] mb-2 uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#2860F5]" />
                    <span>{content.date}</span>
                    <span>•</span>
                    <span>{content.readTime}</span>
                  </div>
                  <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-headline font-black text-[#111111] text-base sm:text-lg leading-snug mb-3 group-hover:text-[#2860F5] transition-colors line-clamp-2 cursor-pointer">
                    {content.title}
                  </Link>
                  <p className="text-sm text-[#111111] font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                    {content.summary}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to="/noticias/$slug"
                      params={{ slug: art.slug }}
                      className="w-full neo-btn-primary py-3 px-4 text-xs font-headline font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t.noticias.seguirLeyendo}</span>
                      <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <Footer language={language} />
    </div>
  );
}
