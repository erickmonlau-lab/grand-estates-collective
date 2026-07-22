import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ChevronRight, Share2, BookOpen } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useEffect, useState } from "react";
import { translations } from "../data/translations";

export const Route = createFileRoute("/noticias/$slug")({
  component: ArticleDetail,
});

const SITE_DOMAIN = "https://www.gesgrama.es";

function ArticleDetail() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);
  const [language, setLanguage] = useState<"es" | "en" | "ca">("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguage(stored);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const t = translations[language];

  // 404 NOT FOUND STATE WITH FULL UI BRANDING & BUBBLE LAYOUT
  if (!article) {
    return (
      <div className="bg-slate-50 text-onyx font-sans min-h-screen flex flex-col justify-between">
        {/* NAV HEADER */}
        <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Gesgrama Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-onyx/60 hover:text-primary-blue transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.detail.back}
          </Link>
        </nav>

        {/* BUBBLE 404 CARD */}
        <main className="pt-28 pb-16 px-4 md:px-8 flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white rounded-[28px] md:rounded-[36px] p-8 md:p-12 text-center shadow-xl border border-slate-100">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              Error 404
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-onyx mb-4">
              {language === "ca" ? "Article no trobat" : language === "en" ? "Article Not Found" : "Artículo no encontrado"}
            </h1>
            <p className="text-onyx/60 text-base md:text-lg mb-8 leading-relaxed">
              {language === "ca" 
                ? "El contingut que estàs buscant no existeix o ha estat traslladat." 
                : language === "en" 
                ? "The content you are looking for does not exist or has been moved." 
                : "El artículo que estás buscando no existe o ha sido trasladado a otra dirección."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto bg-primary-blue text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-onyx transition-colors shadow-md">
                {t.detail.backHome}
              </Link>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-onyx text-white py-8 px-6 text-center text-xs text-white/50 border-t border-white/10">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.derechos}</p>
        </footer>
      </div>
    );
  }

  const content = article[language];
  const canonicalUrl = `${SITE_DOMAIN}/noticias/${article.slug}`;

  // Structured Data (JSON-LD) for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.summary,
    "image": [article.image],
    "datePublished": "2025-03-09T08:00:00+01:00",
    "dateModified": "2025-03-09T08:00:00+01:00",
    "author": [{
      "@type": "Organization",
      "name": content.author,
      "url": SITE_DOMAIN
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Gesgrama",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_DOMAIN}/logo.webp`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  // Get 2 related articles
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-slate-100 text-onyx font-sans min-h-screen">
      {/* Dynamic SEO Meta & Head Tags */}
      <title>{`${content.title} | Blog Gesgrama`}</title>
      <meta name="description" content={content.summary.slice(0, 160)} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${content.title} | Gesgrama`} />
      <meta property="og:description" content={content.summary} />
      <meta property="og:image" content={article.image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Gesgrama Inmobiliaria" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.summary} />
      <meta name="twitter:image" content={article.image} />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FIXED NAVIGATION HEADER */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src={logoImg} alt="Gesgrama Logo - Inmobiliaria Barcelona" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-onyx/60 hover:text-primary-blue transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.detail.back}
          </Link>
        </div>
      </nav>

      {/* MAIN ARTICLE CONTENT WRAPPED IN BUBBLE CONTAINER */}
      <main className="pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 overflow-hidden p-6 sm:p-10 md:p-14">
          
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-2 text-xs font-semibold text-onyx/50">
            <Link to="/" className="hover:text-primary-blue transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-onyx/30" />
            <span className="text-onyx/50">Noticias</span>
            <ChevronRight className="w-3.5 h-3.5 text-onyx/30" />
            <span className="text-primary-blue font-bold truncate max-w-[200px] sm:max-w-[400px]">
              {content.title}
            </span>
          </nav>

          {/* ARTICLE META BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
            <span className="bg-primary-blue/10 text-primary-blue font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              {content.category}
            </span>
            <span className="flex items-center gap-1.5 text-onyx/60 font-medium">
              <Calendar className="w-3.5 h-3.5 text-primary-blue" />
              {content.date}
            </span>
            <span className="flex items-center gap-1.5 text-onyx/60 font-medium">
              <Clock className="w-3.5 h-3.5 text-primary-blue" />
              {content.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-onyx/60 font-medium ml-auto hidden sm:flex">
              <User className="w-3.5 h-3.5 text-primary-blue" />
              {content.author}
            </span>
          </div>

          {/* TITLE (H1) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-onyx leading-tight mb-8">
            {content.title}
          </h1>

          {/* FEATURED HERO IMAGE WITH WEBP & EAGER LOADING */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-12 shadow-lg h-[300px] sm:h-[420px] md:h-[500px]">
            <img
              src={article.image}
              alt={content.title}
              loading="eager"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* INTRO SUMMARY CALLOUT */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border-l-4 border-primary-blue text-onyx/80 font-medium text-lg md:text-xl leading-relaxed mb-10">
            {content.intro}
          </div>

          {/* ARTICLE BODY SECTIONS (H2 / H3 HIERARCHY) */}
          <div className="prose prose-lg max-w-none text-onyx/80 space-y-10">
            {content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                {sec.level === "h2" ? (
                  <h2 className="text-2xl md:text-3xl font-bold text-onyx border-b border-slate-100 pb-3">
                    {sec.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl md:text-2xl font-bold text-onyx">
                    {sec.heading}
                  </h3>
                )}

                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-base md:text-lg leading-relaxed text-onyx/75">
                    {p}
                  </p>
                ))}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 list-none">
                    {sec.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start gap-2.5 text-sm md:text-base font-medium text-onyx/85">
                        <span className="w-2 h-2 rounded-full bg-primary-blue mt-2 flex-shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* CONCLUSION BOX */}
            <div className="p-6 md:p-8 rounded-2xl bg-primary-blue/5 border border-primary-blue/20 text-onyx font-medium text-base md:text-lg leading-relaxed">
              <div className="flex items-center gap-2 text-primary-blue font-bold uppercase tracking-wider text-xs mb-2">
                <BookOpen className="w-4 h-4" />
                {language === "ca" ? "Conclusió" : language === "en" ? "Conclusion" : "Conclusión"}
              </div>
              <p>{content.conclusion}</p>
            </div>
          </div>

          {/* SHARE & AUTHOR FOOTER */}
          <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center font-bold text-sm">
                G
              </div>
              <div>
                <p className="text-sm font-bold text-onyx">{content.author}</p>
                <p className="text-xs text-onyx/50">Gesgrama Barcelona</p>
              </div>
            </div>

            <Link
              to="/#contacto"
              className="inline-flex items-center gap-2 bg-primary-blue text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-onyx transition-colors shadow-md"
            >
              {language === "ca" ? "Consultar amb un assessor" : language === "en" ? "Consult an advisor" : "Consultar con un asesor"}
            </Link>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-onyx mb-8 px-2">
            {language === "ca" ? "Articles relacionats" : language === "en" ? "Related Articles" : "Artículos relacionados"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relArt) => {
              const relContent = relArt[language];
              return (
                <div
                  key={relArt.id}
                  className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={relArt.image}
                      alt={relContent.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary-blue text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {relContent.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-onyx/50 font-medium mb-2">{relContent.date}</p>
                      <h3 className="font-bold text-lg text-onyx group-hover:text-primary-blue transition-colors line-clamp-2 mb-3">
                        {relContent.title}
                      </h3>
                      <p className="text-xs text-onyx/70 line-clamp-3 leading-relaxed mb-6">
                        {relContent.summary}
                      </p>
                    </div>

                    <Link
                      to="/noticias/$slug"
                      params={{ slug: relArt.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-blue hover:text-onyx transition-colors mt-auto"
                    >
                      {t.noticias.seguirLeyendo} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-onyx text-white py-12 px-6 md:px-12 border-t border-white/10 text-center text-xs text-white/50">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.derechos}</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">{t.nav.propiedades}</Link>
            <Link to="/" className="hover:text-white transition-colors">{t.nav.servicios}</Link>
            <Link to="/" className="hover:text-white transition-colors">{t.nav.contacto}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
