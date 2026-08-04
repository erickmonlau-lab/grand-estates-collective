import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../data/articles";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ChevronRight, BookOpen, Menu, X, Home, Building2, Phone, MapPin, Mail } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { useEffect, useState } from "react";
import { translations } from "../data/translations";

export const Route = createFileRoute("/noticias/$slug")({
  head: ({ params }) => {
    const slug = params.slug as string;
    const article = articles.find((a) => a.slug === slug);
    if (!article) {
      return {
        meta: [
          { title: "Artículo no encontrado | Gesgrama Blog" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const content = article.es; // Default to ES for SSR head
    const canonicalUrl = `${SITE_DOMAIN}/noticias/${article.slug}`;
    const ogImageUrl = typeof article.image === "string" && article.image.startsWith("http")
      ? article.image
      : `https://www.gesgrama.es/og-image.png`;
    return {
      meta: [
        { title: `${content.title} | Blog Gesgrama` },
        { name: "description", content: content.summary.slice(0, 160) },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
        { property: "og:title", content: `${content.title} | Gesgrama` },
        { property: "og:description", content: content.summary },
        { property: "og:image", content: ogImageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Gesgrama Inmobiliaria" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: content.title },
        { name: "twitter:description", content: content.summary },
        { name: "twitter:image", content: ogImageUrl },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": content.title,
            "description": content.summary,
            "image": [ogImageUrl],
            "datePublished": article.datePublished,
            "dateModified": article.dateModified,
            "author": [{ "@type": "Organization", "name": content.author, "url": SITE_DOMAIN }],
            "publisher": {
              "@type": "Organization",
              "name": "Gesgrama",
              "logo": { "@type": "ImageObject", "url": `${SITE_DOMAIN}/logo.png` }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_DOMAIN },
                { "@type": "ListItem", "position": 2, "name": "Noticias", "item": `${SITE_DOMAIN}/#noticias` },
                { "@type": "ListItem", "position": 3, "name": content.title, "item": canonicalUrl }
              ]
            }
          })
        }
      ]
    };
  },
  component: ArticleDetail,
});

const SITE_DOMAIN = "https://www.gesgrama.es";

function ArticleDetail() {
  const { slug } = Route.useParams();
  const article = articles.find((a) => a.slug === slug);
  const [language, setLanguage] = useState<"es" | "en" | "ca">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        return stored;
      }
    }
    return "es";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lang: "es" | "en" | "ca") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      window.dispatchEvent(new Event("languagechange"));
    }
  };

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "es" || stored === "en" || stored === "ca") {
        setLanguage(stored);
      }
    };
    if (typeof window !== "undefined") {
      handleLangChange();
      window.addEventListener("languagechange", handleLangChange);
      window.addEventListener("storage", handleLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("languagechange", handleLangChange);
        window.removeEventListener("storage", handleLangChange);
      }
    };
  }, [slug]);

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
      {/* JSON-LD now served via Route.head() for SSR — removed from JSX */}

      {/* FLOATING CAPSULE NAVIGATION HEADER */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] sm:w-[95%] max-w-[1360px] z-[100] flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-3.5 sm:px-5 md:px-7 lg:px-8 rounded-full bg-[#757989]/95 backdrop-blur-md border border-white/30 shadow-[0_12px_40px_rgba(15,23,42,0.25)] text-white gap-3 lg:gap-6"
      >
        <Link to="/" className="hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2 pr-2">
          <img src="/images/logo-gesgrama-text-horizontal.png" alt="Gesgrama - Inmobiliaria y Administración de Fincas" className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert" />
        </Link>

        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs sm:text-sm font-black text-white tracking-widest uppercase font-sans shrink">
          <Link to="/" className="relative px-4 py-2 rounded-full text-white hover:text-white transition-all duration-300 group hover:bg-[#2563eb] cursor-pointer whitespace-nowrap">{language === 'ca' ? 'Inici' : language === 'en' ? 'Home' : 'Inicio'}</Link>
          <a href="/#propiedades" className="relative px-4 py-2 rounded-full text-white hover:text-white transition-all duration-300 group hover:bg-[#2563eb] cursor-pointer whitespace-nowrap">{t.nav.propiedades}</a>
          <a href="/#servicios" className="relative px-4 py-2 rounded-full text-white hover:text-white transition-all duration-300 group hover:bg-[#2563eb] cursor-pointer whitespace-nowrap">{t.nav.servicios}</a>
          <a href="/#contacto" className="relative px-4 py-2 rounded-full text-white hover:text-white transition-all duration-300 group hover:bg-[#2563eb] cursor-pointer whitespace-nowrap">{t.nav.contacto}</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="flex items-center bg-[#5c6070] border border-white/20 rounded-full p-0.5 text-xs font-black tracking-wider">
            {(["es", "ca", "en"] as const).map((lang, idx) => (
              <div key={lang} className="flex items-center">
                <button
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 sm:px-2.5 py-1 rounded-full transition-all duration-200 ${language === lang ? 'bg-[#2563eb] text-white shadow-xs' : 'text-slate-200 hover:text-white'}`}
                >
                  {lang.toUpperCase()}
                </button>
                {idx < 2 && <div className="w-px h-3.5 bg-white/30 mx-0.5"></div>}
              </div>
            ))}
          </div>
          <a
            href="/#contacto"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-3.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs uppercase tracking-wider font-black transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t.nav.portal}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-white hover:text-blue-200 cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
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
            className="fixed inset-0 z-[99] bg-[#0f172a] flex flex-col pt-28 px-6 pb-10"
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
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-2.5 rounded-full shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4 text-white" /> {t.detail.back}
            </Link>
            <span className="text-xs font-black text-[#2563eb] uppercase tracking-widest">Blog Gesgrama</span>
          </div>

          {/* BREADCRUMB - FULL UNTRUNCATED WITHOUT UNDERLINE */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center flex-wrap gap-1.5 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-500 font-sans">
            <Link to="/" className="hover:text-[#2563eb] transition-colors">
              {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a href="/#noticias" className="text-slate-500 hover:text-[#2563eb] transition-colors">
              {language === "ca" ? "Notícies" : language === "en" ? "News" : "Noticias"}
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-bold text-[#2563eb] break-words text-xs sm:text-sm leading-snug">
              {content.title}
            </span>
          </nav>

          {/* ARTICLE META BADGES - SPACED & ENLARGED */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 my-6 sm:my-8 text-xs sm:text-sm border-y border-slate-100 py-3.5 sm:py-4">
            <span className={`text-white font-extrabold uppercase tracking-wider px-4 sm:px-5 py-2 rounded-full shadow-xs text-xs sm:text-sm ${
              content.category.toLowerCase().includes("inmobiliari") ? "bg-[#2563eb]" :
              content.category.toLowerCase().includes("finca") || content.category.toLowerCase().includes("comunidad") ? "bg-[#0f172a]" : "bg-slate-700"
            }`}>
              {content.category}
            </span>
            <span className="flex items-center gap-2 text-slate-600 font-semibold">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              {content.date}
            </span>
            <span className="flex items-center gap-2 text-slate-600 font-semibold">
              <Clock className="w-4 h-4 text-[#2563eb]" />
              {content.readTime}
            </span>
            <span className="flex items-center gap-2 text-slate-600 font-semibold ml-auto hidden sm:flex">
              <User className="w-4 h-4 text-[#2563eb]" />
              {content.author}
            </span>
          </div>

          {/* TITLE (H1) WITH EXACT SOLID BLUE PILL CONTAINER MATCHING MAIN SITE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.25] sm:leading-[1.2] mb-8 font-sans">
            {(() => {
              const words = content.title.split(" ");
              if (words.length <= 3) return content.title;
              const mainPart = words.slice(0, words.length - 2).join(" ");
              const pillPart = words.slice(words.length - 2).join(" ");
              return (
                <>
                  <span>{mainPart}</span>{" "}
                  <span className="inline-block bg-[#2563eb] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-sm mt-1 sm:mt-0 font-sans font-black">
                    {pillPart}
                  </span>
                </>
              );
            })()}
          </h1>

          {/* FEATURED HERO IMAGE WITH COMPACT ACCESSIBLE HEIGHT (NO UNNECESSARY INITIAL SCROLL) */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-8 shadow-md border border-slate-200/80 h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
            <img
              src={article.image}
              alt={content.title}
              loading="eager"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* INTRO SUMMARY CALLOUT */}
          <div className="p-6 md:p-8 lg:p-10 rounded-2xl bg-slate-50 border-l-4 border-[#2563eb] text-slate-800 font-medium text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 font-sans shadow-xs">
            {content.intro}
          </div>

          {/* ARTICLE BODY SECTIONS (H2 / H3 HIERARCHY) WITH EXACT SOLID BLUE PILL CONTAINERS */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-10 font-sans">
            {content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                {sec.level === "h2" ? (
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 pb-2 font-sans flex flex-wrap items-center gap-2">
                    {(() => {
                      const words = sec.heading.split(" ");
                      if (words.length <= 2) return sec.heading;
                      const splitIdx = Math.max(1, words.length - 2);
                      const mainPart = words.slice(0, splitIdx).join(" ");
                      const pillPart = words.slice(splitIdx).join(" ");
                      return (
                        <>
                          <span>{mainPart}</span>
                          <span className="inline-block bg-[#2563eb] text-white px-3 sm:px-4 py-1 rounded-xl sm:rounded-2xl shadow-sm font-sans font-black">
                            {pillPart}
                          </span>
                        </>
                      );
                    })()}
                  </h2>
                ) : (
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 font-sans">
                    {sec.heading}
                  </h3>
                )}

                {sec.content.map((p, pIdx) => {
                  const isDefinitionBlock = p.includes("contrato de exclusividad inmobiliaria") || p.includes("compromiso firme de inversión");
                  if (isDefinitionBlock) {
                    return (
                      <div 
                        key={pIdx} 
                        className="my-7 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#EEF2FA] to-[#F4F7fc] border-l-8 border-[#2563eb] border-y border-r border-[#dce4f5] shadow-sm relative overflow-hidden"
                      >
                        <div className="flex items-start gap-4 sm:gap-5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 font-black shadow-md mt-0.5">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex-1">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-slate-900 leading-relaxed sm:leading-loose">
                              {p}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-base md:text-lg lg:text-xl leading-relaxed text-slate-700">
                      {p}
                    </p>
                  );
                })}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <div className="my-10 bg-[#EEF2FA] p-6 sm:p-8 md:p-10 rounded-3xl border border-[#dce4f5] shadow-sm">
                    <div className="grid grid-cols-1 gap-5">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <div 
                          key={bpIdx} 
                          className="flex items-start gap-4 sm:gap-5 bg-white p-5 sm:p-6 md:p-7 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 font-black text-base sm:text-lg shadow-md">
                            ✓
                          </div>
                          <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug sm:leading-relaxed pt-0.5">
                            {bp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* CONCLUSION BOX - MARKS DISTINCT BACKGROUND WITH HIGH LEGIBILITY DARK TEXT */}
            <div className="my-10 p-7 sm:p-9 md:p-11 rounded-3xl bg-[#eef2fa] border-l-8 border-l-[#2563eb] border-y border-r border-[#dce4f5] text-slate-900 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#2563eb] font-black uppercase tracking-wider text-xs sm:text-sm mb-3.5">
                <BookOpen className="w-5 h-5 text-[#2563eb]" />
                <span>{language === "ca" ? "Conclusió" : language === "en" ? "Conclusion" : "Conclusión"}</span>
              </div>
              <p className="text-slate-900 font-extrabold text-lg sm:text-xl md:text-2xl leading-relaxed">{content.conclusion}</p>
            </div>
          </div>

          {/* SHARE & AUTHOR FOOTER - ENLARGED FOR HIGH VISUAL PROMINENCE */}
          <div className="mt-16 pt-10 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6 bg-[#f8fafc] p-6 sm:p-8 rounded-3xl border shadow-xs">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0f172a] border-4 border-[#2563eb] p-3 flex items-center justify-center shadow-lg shrink-0">
                <img 
                  src="/images/logo-gesgrama-text-horizontal.png" 
                  alt="Gesgrama" 
                  className="w-full h-full object-contain brightness-0 invert" 
                />
              </div>
              <div>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight mb-1">{content.author}</p>
                <p className="text-xs sm:text-sm text-[#2563eb] font-black uppercase tracking-wider">Gesgrama — Santa Coloma de Gramenet</p>
              </div>
            </div>

            <a
              href="/#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 py-4 rounded-2xl sm:rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.5)] hover:scale-[1.02]"
            >
              <span>{language === "ca" ? "Consultar amb un assessor" : language === "en" ? "Consult an advisor" : "Consultar con un asesor"}</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BLOCK TO KEEP EXPLORING THE WEBSITE */}
        <div className="mt-12 bg-[#f5f6f8] rounded-[28px] md:rounded-[36px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-sm font-sans">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563eb] text-white text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
                ★ {language === "ca" ? "Serveis Destacats Gesgrama" : language === "en" ? "Gesgrama Featured Services" : "Servicios Destacados Gesgrama"}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-sans">
                {language === 'ca' ? 'Continua explorant Gesgrama' : language === 'en' ? 'Keep Exploring Gesgrama' : 'Sigue explorando Gesgrama'}
              </h3>
            </div>
            <p className="text-slate-700 text-base md:text-lg lg:text-xl font-bold max-w-lg leading-relaxed font-sans">
              {language === 'ca' 
                ? 'Trobem la propietat ideal per a tu o gestionem la teva comunitat a Santa Coloma de Gramenet i àrea metropolitana.' 
                : language === 'en'
                ? 'Find your ideal property or manage your community in Santa Coloma de Gramenet and metropolitan area.'
                : 'Encontramos la propiedad ideal para ti o gestionamos tu comunidad de propietarios en Santa Coloma de Gramenet y área metropolitana.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Propiedades */}
            <a
              href="/#propiedades"
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[280px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/modern_office_space.jpg"
                  alt="Nuestros Inmuebles"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              </div>
              
              <div className="relative z-10 p-5 flex items-start justify-between">
                <span className="bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-sans">
                  {language === "ca" ? "Catàleg Actiu" : language === "en" ? "Active Portfolio" : "Catálogo Activo"}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all duration-300">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 p-5 text-white font-sans">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">{language === "ca" ? "Immobiliària i Lloguer" : language === "en" ? "Real Estate & Rentals" : "Inmobiliaria & Alquiler"}</p>
                <h4 className="text-xl font-black mb-3">
                  {language === 'ca' ? 'Veure Propietats' : language === 'en' ? 'View Properties' : 'Ver Propiedades'}
                </h4>
                <div className="inline-flex items-center gap-2 bg-[#2563eb] group-hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all group-hover:translate-x-1 shadow-md w-fit">
                  <span>{language === 'ca' ? 'Explorar Catàleg' : language === 'en' ? 'Browse Properties' : 'Ver Propiedades'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Card 2: Valoración Gratuita */}
            <a
              href="/#valuator-form"
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[280px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/happy_couple_laptop.jpg"
                  alt="Valoración Gratuita"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              </div>
              
              <div className="relative z-10 p-5 flex items-start justify-between">
                <span className="bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-sans">
                  {language === "ca" ? "Valoració IA Gratuïta" : language === "en" ? "Free AI Valuation" : "Valoración IA Gratuita"}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all duration-300">
                  <Home className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 p-5 text-white font-sans">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">{language === "ca" ? "Vols vendre o llogar?" : language === "en" ? "Looking to sell or rent?" : "¿Quieres vender o alquilar?"}</p>
                <h4 className="text-xl font-black mb-3">
                  {language === 'ca' ? 'Valoració Gratuïta' : language === 'en' ? 'Free Valuation' : 'Valoración Gratuita'}
                </h4>
                <div className="inline-flex items-center gap-2 bg-[#2563eb] group-hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all group-hover:translate-x-1 shadow-md w-fit">
                  <span>{language === 'ca' ? 'Valorar Immoble' : language === 'en' ? 'Value Property' : 'Valoración Gratuita'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>

            {/* Card 3: Contactar */}
            <a
              href="/#contacto"
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[280px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/cta_advisors_closed_laptop.jpg"
                  alt="Contactar Asesores"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.65]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              </div>
              
              <div className="relative z-10 p-5 flex items-start justify-between">
                <span className="bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md font-sans">
                  Santa Coloma de Gramenet
                </span>
                <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 p-5 text-white font-sans">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">{language === "ca" ? "Administració de Finques" : language === "en" ? "Estates Management" : "Administración de Fincas"}</p>
                <h4 className="text-xl font-black mb-3">
                  {language === 'ca' ? 'Parlar amb un assessor' : language === 'en' ? 'Talk to an advisor' : 'Hablar con un asesor'}
                </h4>
                <div className="inline-flex items-center gap-2 bg-[#2563eb] group-hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all group-hover:translate-x-1 shadow-md w-fit">
                  <span>{language === 'ca' ? 'Contactar Ara' : language === 'en' ? 'Contact Us' : 'Contactar Ahora'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 px-2 font-sans flex items-center gap-3">
            <span className="w-2.5 h-7 bg-[#2563eb] rounded-full shrink-0 inline-block" />
            <span>{language === "ca" ? "Articles relacionats" : language === "en" ? "Related Articles" : "Artículos relacionados"}</span>
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
                  </div>

                  <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                        <span>{relContent.date}</span>
                        <span>•</span>
                        <span>{relContent.readTime}</span>
                      </div>
                      <h3 className="font-black text-xl md:text-2xl text-slate-900 leading-snug group-hover:text-[#2563eb] transition-colors line-clamp-2 mb-3 font-sans">
                        {relContent.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 font-medium line-clamp-3 leading-relaxed mb-4">
                        {relContent.summary}
                      </p>
                    </div>

                    <Link
                      to="/noticias/$slug"
                      params={{ slug: relArt.slug }}
                      className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#2563eb] hover:bg-[#1d4ed8] py-3 px-5 rounded-xl sm:rounded-2xl transition-all shadow-md mt-auto group-hover:shadow-lg group-hover:translate-x-0.5"
                    >
                      {t.noticias.seguirLeyendo} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1221] text-white relative z-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-0 flex flex-col lg:flex-row gap-12 relative">

          {/* Text Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8">
            {/* Logo + tagline */}
            <div className="lg:col-span-1">
              <div className="inline-block mb-4">
                <img src="/images/logo-gesgrama-text-horizontal.png" alt="Gesgrama - Inmobiliaria y Administración de Fincas" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium max-w-[260px]">
                {t.footer.descripcion}
              </p>
            </div>

            {/* Navegación rápida */}
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.quickLinks}</h4>
              <ul className="space-y-3.5">
                {[
                  { label: t.nav.propiedades, href: "/#propiedades" },
                  { label: t.nav.servicios, href: "/#servicios" },
                  { label: t.nav.nosotros, href: "/#nosotros" },
                  { label: t.nav.contacto, href: "/#contacto" },
                ].map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                      <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.contactInfo}</h4>
              <ul className="space-y-4 text-base text-slate-300 font-bold">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2563eb] shrink-0 mt-1" />
                  <span className="text-slate-300">Av. dels Banús, 49<br />08923 Sta. Coloma de Gramenet (Barcelona)</span>
                </li>
                <li>
                  <a href="tel:+34934685656" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold whitespace-nowrap">
                    <Phone className="w-5 h-5 text-[#2563eb] shrink-0" />
                    {language === "en" ? "Office:" : "Oficina:"} 934 685 656
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/34601259424" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 font-bold transition-colors whitespace-nowrap">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-400 shrink-0">
                      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
                    </svg>
                    WhatsApp: 601 259 424
                  </a>
                </li>
                <li>
                  <a href="mailto:info@gesgrama.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors font-bold">
                    <Mail className="w-5 h-5 text-[#2563eb] shrink-0" />
                    info@gesgrama.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{t.footer.legal}</h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/aviso-legal" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                    <div className="w-2 h-2 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                    {t.footer.legalNotice}
                  </Link>
                </li>
                <li>
                  <Link to="/politica-privacidad" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link to="/politica-cookies" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2.5 group font-bold">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] group-hover:scale-125 transition-transform shrink-0" />
                    {t.footer.cookies}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Acreditaciones Profesionales */}
          <div className="w-full lg:w-[340px] flex flex-col justify-start pb-8">
            <h4 className="text-lg sm:text-xl font-black text-[#38bdf8] uppercase tracking-wider mb-5 font-sans">{language === "ca" ? "ACREDITACIONS PROFESSIONALS" : language === "en" ? "PROFESSIONAL ACCREDITATIONS" : "ACREDITACIONES PROFESIONALES"}</h4>
            <div className="flex flex-col gap-3.5">
              <div className="bg-white/5 border border-white/15 p-4 rounded-xl flex items-center gap-3.5 shadow-md">
                <div className="w-11 h-11 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                  AICAT
                </div>
                <div>
                  <strong className="text-sm sm:text-base text-white block font-black">{language === "ca" ? "Registre d'Agents Immobiliaris" : language === "en" ? "Registry of Real Estate Agents" : "Registro de Agentes Inmobiliarios"}</strong>
                  <span className="text-xs sm:text-sm text-slate-100 font-extrabold">{language === "ca" ? "Inscripció AICAT Nº 5583" : language === "en" ? "AICAT Reg. No. 5583" : "Inscripción AICAT Nº 5583"}</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/15 p-4 rounded-xl flex items-center gap-3.5 shadow-md">
                <div className="w-11 h-11 rounded-lg bg-amber-500 text-white font-black text-sm flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                  API
                </div>
                <div>
                  <strong className="text-sm sm:text-base text-white block font-black">{language === "ca" ? "Col·legi de la Propietat Immobiliària" : language === "en" ? "Real Estate Association" : "Colegio de la Propiedad Inmobiliaria"}</strong>
                  <span className="text-xs sm:text-sm text-slate-100 font-extrabold">{language === "ca" ? "Agent Col·legiat Oficial" : language === "en" ? "Official Registered Agent" : "Agente Colegiado Oficial"}</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/15 p-4 rounded-xl flex items-center gap-3.5 shadow-md">
                <div className="w-11 h-11 rounded-lg bg-emerald-500 text-white font-black text-sm flex items-center justify-center border border-white/30 shrink-0 shadow-xs">
                  ADM
                </div>
                <div>
                  <strong className="text-sm sm:text-base text-white block font-black">{language === "ca" ? "Administradors de Finques" : language === "en" ? "Property Administrators" : "Administradores de Fincas"}</strong>
                  <span className="text-xs sm:text-sm text-slate-100 font-extrabold">{language === "ca" ? "Associació de Finques i Comunitats" : language === "en" ? "Estates & Communities Association" : "Asociación de Fincas y Comunidades"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-[#060c18]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm sm:text-base text-white font-extrabold">© {new Date().getFullYear()} Gesgrama. {t.footer.rights}</p>
            <div className="flex gap-4 text-sm sm:text-base text-white font-extrabold">
              <Link to="/aviso-legal" className="hover:text-blue-200">{t.footer.legalNotice}</Link>
              <span>·</span>
              <Link to="/politica-privacidad" className="hover:text-blue-200">{t.footer.privacy}</Link>
              <span>·</span>
              <Link to="/politica-cookies" className="hover:text-blue-200">{t.footer.cookies}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
