import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { articles } from "../data/articles";
import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, ArrowRight, BookOpen, Search, Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { DrawnUnderline } from "@/components/DrawnUnderline";

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
  const [language, setLanguage] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") return stored;
    }
    return "es";
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguage(stored);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("languagechange", handleLangChange);
      window.addEventListener("storage", handleLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("languagechange", handleLangChange);
        window.removeEventListener("storage", handleLangChange);
      }
    };
  }, []);

  // Category labels based on language
  const categories = useMemo(() => {
    if (language === "ca") {
      return [
        { id: "all", label: "Tots els articles" },
        { id: "inmobiliaria", label: "Gestió Immobiliària" },
        { id: "fincas", label: "Administració de Finques" },
        { id: "juridica", label: "Legal i Fiscal" },
        { id: "obras", label: "Obres i ITE" }
      ];
    }
    if (language === "en") {
      return [
        { id: "all", label: "All Articles" },
        { id: "inmobiliaria", label: "Real Estate" },
        { id: "fincas", label: "Property Management" },
        { id: "juridica", label: "Legal & Tax" },
        { id: "obras", label: "Renovations & ITE" }
      ];
    }
    return [
      { id: "all", label: "Todos los artículos" },
      { id: "inmobiliaria", label: "Gestión Inmobiliaria" },
      { id: "fincas", label: "Administración de Fincas" },
      { id: "juridica", label: "Legal y Fiscal" },
      { id: "obras", label: "Obras e ITE" }
    ];
  }, [language]);

  // Featured article is the first one or the most relevant
  const featuredArticle = articles[0];
  const featuredContent = featuredArticle[language] || featuredArticle.es;

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const content = art[language] || art.es;
      const cat = content.category.toLowerCase();

      // Category filter matching
      let matchesCat = true;
      if (selectedCategory === "inmobiliaria") {
        matchesCat = cat.includes("inmobiliari") || cat.includes("mercado") || cat.includes("vivienda");
      } else if (selectedCategory === "fincas") {
        matchesCat = cat.includes("finca") || cat.includes("comunidad") || cat.includes("comunitat");
      } else if (selectedCategory === "juridica") {
        matchesCat = cat.includes("jurídic") || cat.includes("fiscal") || cat.includes("plusval") || cat.includes("peritaje") || cat.includes("contrato");
      } else if (selectedCategory === "obras") {
        matchesCat = cat.includes("obra") || cat.includes("ite") || cat.includes("rehabilitaci");
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchesSearch = content.title.toLowerCase().includes(q) ||
                        content.summary.toLowerCase().includes(q) ||
                        content.category.toLowerCase().includes(q);
      }

      return matchesCat && matchesSearch;
    });
  }, [articles, language, selectedCategory, searchQuery]);

  const headerTag = language === "ca" ? "EDITORIAL & NOTÍCIES" : language === "en" ? "EDITORIAL & NEWS" : "EDITORIAL & NOTICIAS";
  const headerTitlePre = language === "ca" ? "Notícies, guies i actualitat " : language === "en" ? "News, guides and practical " : "Noticias, guías y actualidad ";
  const headerTitleWord = language === "ca" ? "immobiliària." : language === "en" ? "insights." : "inmobiliaria.";
  const headerDesc = language === "ca"
    ? "Anàlisi tècnica, guies legals i informació pràctica sobre comunitats de veïns, compravenda i normativa a Santa Coloma de Gramenet."
    : language === "en"
    ? "Technical analysis, legal guides and practical advice on homeowners communities, property transactions and local regulations."
    : "Análisis técnico, guías legales e información práctica sobre comunidades de propietarios, compraventa y normativa en Santa Coloma de Gramenet.";

  const searchPlaceholder = language === "ca" ? "Cercar guies o articles..." : language === "en" ? "Search guides or articles..." : "Buscar guías o artículos...";
  const featuredTag = language === "ca" ? "ARTICLE DESTACAT" : language === "en" ? "FEATURED ARTICLE" : "ARTÍCULO DESTACADO";
  const readArticleBtn = language === "ca" ? "Llegir article complet" : language === "en" ? "Read full article" : "Leer artículo completo";

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#111111] font-sans selection:bg-[#2860F5] selection:text-white">
      {/* NAVBAR OFICIAL */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* CABECERA EDITORIAL PRINCIPAL CON FONDO BLANCO SÓLIDO */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-14 border-b-2 border-[#111111] bg-white">
        <div className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto">
          {/* Breadcrumb discreto */}
          <nav aria-label="Migas de pan" className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-500 font-sans">
            <Link to="/" className="hover:text-[#2860F5] transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#111111] font-black">{language === "ca" ? "Notícies i Guies" : language === "en" ? "News & Guides" : "Noticias y Guías"}</span>
          </nav>

          <div className="max-w-4xl">
            {/* Tag badge redondeado azul sólido */}
            <div className="inline-flex items-center gap-2 bg-[#2860F5] text-white text-[12px] sm:text-[13px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mb-4">
              <BookOpen className="w-3.5 h-3.5 text-white" />
              <span>{headerTag}</span>
            </div>

            {/* H1 grande con trazo orgánico Drawn */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-headline font-black text-[#111111] mb-5 tracking-tight leading-[1.12] [text-wrap:balance]">
              <span>{headerTitlePre}</span>
              <span className="relative inline-block text-[#2860F5] whitespace-nowrap">
                {headerTitleWord}
                <DrawnUnderline color="#2860F5" />
              </span>
            </h1>

            {/* Descripción principal de 18-19 px en negro sólido */}
            <p className="text-[#111111] text-[18px] sm:text-[19px] leading-relaxed font-sans font-medium max-w-3xl">
              {headerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-[1360px] mx-4 sm:mx-6 md:mx-auto py-10 sm:py-14">
        
        {/* BARRA DE FILTROS Y BUSCADOR */}
        <div className="bg-white border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] p-4 sm:p-5 mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Categorías como píldoras sólidas */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-headline font-black transition-all border-2 border-[#111111] cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#2860F5] text-white shadow-[2px_2px_0px_#111111]"
                      : "bg-[#FAF9FC] text-[#111111] hover:bg-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Campo de búsqueda */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-11 pl-10 pr-4 bg-[#FAF9FC] border-2 border-[#111111] rounded-xl text-xs sm:text-sm font-sans font-bold text-[#111111] placeholder:text-slate-500 focus:outline-none focus:border-[#2860F5] transition-colors shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500 hover:text-[#111111]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* NOTICIA DESTACADA (Solo cuando no hay búsqueda ni filtro activo) */}
        {selectedCategory === "all" && !searchQuery.trim() && (
          <div className="mb-12 bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Imagen destacada editorial */}
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] bg-slate-100 border-b-2 lg:border-b-0 lg:border-r-2 border-[#111111] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredContent.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#2860F5] text-white text-[11px] sm:text-xs font-headline font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    {featuredTag}
                  </span>
                </div>
              </div>

              {/* Contenido destacado */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-data-mono font-bold text-[#2860F5] mb-3 uppercase">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#111111] text-white text-[10px] font-headline font-black tracking-wider">
                      {featuredContent.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2860F5]" />
                      {featuredContent.readTime}
                    </span>
                  </div>

                  <Link
                    to="/noticias/$slug"
                    params={{ slug: featuredArticle.slug }}
                    className="block text-2xl sm:text-3xl md:text-[32px] font-headline font-black text-[#111111] leading-tight mb-4 group-hover:text-[#2860F5] transition-colors cursor-pointer"
                  >
                    {featuredContent.title}
                  </Link>

                  <p className="text-[#111111] text-base sm:text-[17px] font-medium leading-relaxed mb-6 line-clamp-3">
                    {featuredContent.summary}
                  </p>
                </div>

                <div>
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: featuredArticle.slug }}
                    className="inline-flex items-center gap-2.5 bg-[#2860F5] text-white font-headline font-black text-sm sm:text-base py-3.5 px-6 rounded-xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#174bcb] transition-all cursor-pointer"
                  >
                    <span>{readArticleBtn}</span>
                    <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LISTADO DE ARTÍCULOS EN REJILLA EDITORIAL (3 COLUMNAS EN ESCRITORIO) */}
        <div className="mb-6 flex items-center justify-between pb-3 border-b-2 border-[#111111]">
          <h2 className="text-xl sm:text-2xl font-headline font-black text-[#111111] uppercase tracking-tight">
            {language === "ca"
              ? `Articles disponibles (${filteredArticles.length})`
              : language === "en"
              ? `Available Articles (${filteredArticles.length})`
              : `Artículos disponibles (${filteredArticles.length})`}
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white border-2 border-[#111111] rounded-2xl p-10 text-center my-8 shadow-[3px_3px_0px_#111111]">
            <p className="text-lg font-headline font-bold text-[#111111] mb-2">
              {language === "ca" ? "No s'han trobat articles" : language === "en" ? "No articles found" : "No se han encontrado artículos"}
            </p>
            <p className="text-sm text-slate-600 mb-4">
              {language === "ca"
                ? "Prova d'ajustar la cerca o selecciona una altra categoria."
                : language === "en"
                ? "Try adjusting your search terms or selecting another category."
                : "Prueba a ajustar la búsqueda o selecciona otra categoría."}
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="neo-btn-primary px-5 py-2.5 text-xs font-headline font-black rounded-xl cursor-pointer"
            >
              {language === "ca" ? "Restablir filtres" : language === "en" ? "Reset filters" : "Restablecer filtros"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredArticles.map((art) => {
              const content = art[language] || art.es;
              return (
                <article
                  key={art.id}
                  className="bg-white border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] p-5 sm:p-6 flex flex-col h-full transition-all group overflow-hidden"
                >
                  {/* Fotografía rectangular */}
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: art.slug }}
                    className="block relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-[#111111] mb-4 bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={art.image}
                      alt={content.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[#111111] text-white text-[11px] font-headline font-black uppercase tracking-wider border border-white/20">
                        {content.category}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      {/* Metadatos fecha y lectura */}
                      <div className="flex items-center gap-2 text-xs font-data-mono font-bold text-[#2860F5] mb-2.5 uppercase">
                        <Calendar className="w-3.5 h-3.5 text-[#2860F5]" />
                        <span>{content.date}</span>
                        <span>•</span>
                        <span>{content.readTime}</span>
                      </div>

                      {/* Título de 19-21 px */}
                      <Link
                        to="/noticias/$slug"
                        params={{ slug: art.slug }}
                        className="block font-headline font-black text-[#111111] text-lg sm:text-[20px] leading-snug mb-3 group-hover:text-[#2860F5] transition-colors line-clamp-2 cursor-pointer"
                      >
                        {content.title}
                      </Link>

                      {/* Descripción de 16-17 px */}
                      <p className="text-[15px] sm:text-[16px] text-[#111111] font-medium leading-relaxed mb-6 line-clamp-3">
                        {content.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        to="/noticias/$slug"
                        params={{ slug: art.slug }}
                        className="w-full neo-btn-primary py-3 px-4 text-xs sm:text-sm font-headline font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#111111]"
                      >
                        <span>{readArticleBtn}</span>
                        <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </main>

      {/* FOOTER OFICIAL CON IDENTIDAD AZUL */}
      <Footer language={language} />
    </div>
  );
}
