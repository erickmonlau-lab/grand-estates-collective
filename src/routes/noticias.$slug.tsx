import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ChevronRight, BookOpen, Menu, X, Home, Building2, Phone } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <nav className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[94%] max-w-[1300px] z-[100] flex items-center justify-between py-2 md:py-2.5 px-4 md:px-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-slate-900">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="Gesgrama Logo" className="h-9 sm:h-11 w-auto object-contain" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#2563eb] transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.detail.backHome}
          </Link>
        </nav>

        {/* BUBBLE 404 CARD */}
        <main className="pt-32 pb-16 px-4 md:px-8 flex-1 flex items-center justify-center">
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
              <Link to="/" className="w-full sm:w-auto bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1d4ed8] transition-colors shadow-md">
                {t.detail.backHome}
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-[#0b1221] text-white py-8 px-6 text-center text-xs text-slate-400 border-t border-slate-800">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
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

  // Get 3 related articles
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

      {/* FLOATING CAPSULE NAVIGATION HEADER */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[94%] max-w-[1300px] z-[100] flex items-center justify-between py-2 md:py-2.5 px-4 md:px-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-slate-900"
      >
        <Link to="/" className="hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 pl-1 md:pl-2">
          <img src={logoImg} alt="Gesgrama" className="h-9 sm:h-11 md:h-12 w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[220px] object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-[13px] md:text-[14px] font-bold text-slate-700 tracking-widest uppercase">
          <Link to="/" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
          <a href="/#propiedades" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.propiedades}</a>
          <a href="/#servicios" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.servicios}</a>
          <a href="/#contacto" className="hover:text-[#2563eb] transition-colors duration-200 py-1">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-6 shrink-0 pr-1">
          <div className="flex items-center bg-slate-100/90 border border-slate-200 rounded-full p-1 text-[10px] md:text-[12px] font-bold shadow-inner">
            {(["es", "ca", "en"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-full transition-all duration-200 ${language === lang ? 'bg-[#2563eb] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {lang.toUpperCase()}
                </button>
                {idx < 2 && <div className="w-px h-3 bg-slate-300 mx-0.5"></div>}
              </div>
            ))}
          </div>
          <a
            href="/#contacto"
            className="hidden sm:inline-flex items-center gap-2 bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-bold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t.nav.portal}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[99] bg-slate-950/90 backdrop-blur-xl flex flex-col pt-28 px-6 pb-10"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6 text-xl font-bold text-white uppercase tracking-wider my-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
              <a href="/#propiedades" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.propiedades}</a>
              <a href="/#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.servicios}</a>
              <a href="/#contacto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#2563eb] transition-colors">{t.nav.contacto}</a>
            </div>
            <a
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#2563eb] text-white font-bold py-4 rounded-full text-center uppercase tracking-widest text-sm shadow-lg mt-auto"
            >
              {t.nav.portal}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN ARTICLE CONTENT WRAPPED IN BUBBLE CONTAINER */}
      <main className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-[1300px] mx-auto">
        <div className="bg-white rounded-[28px] md:rounded-[36px] shadow-xl border border-slate-200/80 overflow-hidden p-6 sm:p-10 md:p-14">
          
          {/* HEADER BACK BUTTON INSIDE CONTENT CARD */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#2563eb] transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-200/70"
            >
              <ArrowLeft className="w-4 h-4 text-[#2563eb]" /> {t.detail.back}
            </Link>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Blog Gesgrama</span>
          </div>

          {/* BREADCRUMB - FULL TITLE UNTRUNCATED */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center flex-wrap gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-[#2563eb] transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-500">Noticias</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#2563eb] font-bold break-words">
              {content.title}
            </span>
          </nav>

          {/* ARTICLE META BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
            <span className="bg-[#2563eb]/10 text-[#2563eb] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              {content.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
              {content.date}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
              {content.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium ml-auto hidden sm:flex">
              <User className="w-3.5 h-3.5 text-[#2563eb]" />
              {content.author}
            </span>
          </div>

          {/* TITLE (H1) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8 font-sans">
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
          <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border-l-4 border-[#2563eb] text-slate-800 font-medium text-lg md:text-xl leading-relaxed mb-10 font-sans">
            {content.intro}
          </div>

          {/* ARTICLE BODY SECTIONS (H2 / H3 HIERARCHY) */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-10 font-sans">
            {content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                {sec.level === "h2" ? (
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 font-sans">
                    {sec.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 font-sans">
                    {sec.heading}
                  </h3>
                )}

                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-base md:text-lg leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 list-none">
                    {sec.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start gap-2.5 text-sm md:text-base font-medium text-slate-800">
                        <span className="w-2 h-2 rounded-full bg-[#2563eb] mt-2 flex-shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* CONCLUSION BOX */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#2563eb]/5 border border-[#2563eb]/20 text-slate-800 font-medium text-base md:text-lg leading-relaxed">
              <div className="flex items-center gap-2 text-[#2563eb] font-extrabold uppercase tracking-wider text-xs mb-2">
                <BookOpen className="w-4 h-4" />
                {language === "ca" ? "Conclusió" : language === "en" ? "Conclusion" : "Conclusión"}
              </div>
              <p>{content.conclusion}</p>
            </div>
          </div>

          {/* SHARE & AUTHOR FOOTER */}
          <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center font-black text-sm">
                G
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{content.author}</p>
                <p className="text-xs text-slate-500">Gesgrama Barcelona</p>
              </div>
            </div>

            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-colors shadow-md"
            >
              {language === "ca" ? "Consultar amb un assessor" : language === "en" ? "Consult an advisor" : "Consultar con un asesor"}
            </a>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BLOCK TO KEEP EXPLORING THE WEBSITE */}
        <div className="mt-12 bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-lg border border-slate-200/80">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 font-sans">
            {language === 'ca' ? 'Continua explorant Gesgrama' : language === 'en' ? 'Keep Exploring Gesgrama' : 'Sigue explorando Gesgrama'}
          </h3>
          <p className="text-slate-500 text-sm md:text-base font-medium mb-6">
            {language === 'ca' 
              ? 'Trobem la propietat ideal per a tu o gestionem la teva comunitat a Barcelona.' 
              : language === 'en'
              ? 'Find your ideal property or manage your community in Barcelona.'
              : 'Encontramos la propiedad ideal para ti o gestionamos tu comunidad de propietarios en Barcelona.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/#propiedades"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  {language === 'ca' ? 'Veure Propietats' : language === 'en' ? 'View Properties' : 'Ver Propiedades'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Comprar o alquilar</p>
              </div>
            </a>

            <a
              href="/#valuator-form"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  {language === 'ca' ? 'Valoració Gratuïta' : language === 'en' ? 'Free Valuation' : 'Valoración Gratuita'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Tasación inmediata</p>
              </div>
            </a>

            <a
              href="/#contacto"
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#2563eb] transition-colors">
                  {language === 'ca' ? 'Contactar' : language === 'en' ? 'Contact Us' : 'Contactar'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Asesoramiento local</p>
              </div>
            </a>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 px-2 font-sans">
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
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#2563eb] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {relContent.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-2">{relContent.date}</p>
                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#2563eb] transition-colors line-clamp-2 mb-3 font-sans">
                        {relContent.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                        {relContent.summary}
                      </p>
                    </div>

                    <Link
                      to="/noticias/$slug"
                      params={{ slug: relArt.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2563eb] hover:text-slate-900 transition-colors mt-auto"
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
      <footer className="bg-[#0b1221] text-white py-12 px-6 md:px-12 border-t border-slate-800 text-center text-xs text-slate-400">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
            <a href="/#propiedades" className="hover:text-white transition-colors">{t.nav.propiedades}</a>
            <a href="/#servicios" className="hover:text-white transition-colors">{t.nav.servicios}</a>
            <a href="/#contacto" className="hover:text-white transition-colors">{t.nav.contacto}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
