import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { articles } from "../data/articles";
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  BookOpen, 
  Home, 
  Building2, 
  Phone, 
  MapPin, 
  Mail, 
  AlertTriangle, 
  Share2, 
  Check, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { translations, loadLanguage } from "../data/translations";
import { Navbar } from "@/components/Navbar";
import { DrawnUnderline } from "@/components/DrawnUnderline";
import { EditorialCallout } from "@/components/EditorialCallout";

function WhatsAppIcon({ className = "w-4 h-4 fill-white shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.553 4.197 1.604 6.015L.057 24l6.11-1.603a11.977 11.977 0 005.864 1.534h.005c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm.005 22.028H12.03a9.98 9.98 0 01-5.088-1.39l-.365-.217-3.782.992 1.009-3.687-.238-.379a9.957 9.957 0 01-1.528-5.316c0-5.534 4.502-10.036 10.039-10.036 2.68 0 5.199 1.044 7.093 2.939s2.937 4.414 2.937 7.094c0 5.535-4.502 10.036-10.038 10.036zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.201.302-.781.983-.957 1.184-.176.201-.352.226-.654.075-.302-.151-1.277-.47-2.432-1.5-.899-.801-1.506-1.792-1.682-2.093-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.68-1.636-.931-2.24-.244-.588-.492-.508-.68-.517-.176-.008-.377-.009-.578-.009s-.528.075-.805.377c-.277.302-1.057 1.032-1.057 2.516s1.082 2.918 1.233 3.119c.151.201 2.129 3.252 5.159 4.56.719.31 1.28.496 1.718.636.722.23 1.379.197 1.9.12.581-.087 1.787-.73 2.039-1.434.252-.704.252-1.308.176-1.434-.075-.126-.276-.201-.578-.352z" />
    </svg>
  );
}

const SITE_DOMAIN = "https://gesgrama.com";

const ARTICLE_ALIASES: Record<string, string> = {
  "guia-itp-2026-cataluna": "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
  "ley-vivienda-limites-alquiler-santa-coloma": "guia-alquilar-vender-piso-singuerlin-centre-santa-coloma",
  "eficiencia-energetica-subvenciones-comunidades": "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
  "como-elegir-buen-administrador-fincas": "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
};

export const Route = createFileRoute("/noticias_/$slug")({
  loader: ({ params }) => {
    const rawSlug = params.slug as string;
    const resolvedSlug = ARTICLE_ALIASES[rawSlug];
    if (resolvedSlug) {
      throw redirect({
        to: "/noticias/$slug",
        params: { slug: resolvedSlug },
        statusCode: 301,
      });
    }
    return { slug: rawSlug };
  },
  head: ({ params }) => {
    const rawSlug = params.slug as string;
    const resolvedSlug = ARTICLE_ALIASES[rawSlug] || rawSlug;
    const article = articles.find((a) => a.slug === resolvedSlug);
    if (!article) {
      return {
        meta: [
          { title: "Artículo no encontrado | Gesgrama Blog" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const content = article.es;
    const canonicalUrl = `${SITE_DOMAIN}/noticias/${article.slug}`;
    const ogImageUrl = typeof article.image === "string" && article.image.startsWith("http")
      ? article.image
      : `https://gesgrama.com/og-image.png`;
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
                { "@type": "ListItem", "position": 2, "name": "Noticias", "item": `${SITE_DOMAIN}/noticias` },
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

function ArticleDetail() {
  const { slug: rawSlug } = Route.useParams();
  const slug = ARTICLE_ALIASES[rawSlug] || rawSlug;
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

  const changeLanguage = (lang: "es" | "en" | "ca") => {
    if (lang === "es") {
      setLanguage("es");
      if (typeof window !== "undefined") {
        localStorage.setItem("language", "es");
        window.dispatchEvent(new Event("languagechange"));
      }
    } else {
      loadLanguage(lang).then(() => {
        setLanguage(lang);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
          window.dispatchEvent(new Event("languagechange"));
        }
      });
    }
  };

  useEffect(() => {
    const handleLangChange = () => {
      const stored = localStorage.getItem("language");
      if (stored === "ca" || stored === "en") {
        loadLanguage(stored).then(() => {
          setLanguage(stored);
        });
      } else if (stored === "es") {
        setLanguage("es");
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

  // 404 NOT FOUND STATE WITH SOLID UI
  if (!article) {
    return (
      <div className="bg-[#FAF9FC] text-[#111111] font-sans min-h-screen flex flex-col justify-between">
        <Navbar language={language} setLanguage={changeLanguage} />

        <main className="pt-32 pb-16 px-4 md:px-8 flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white rounded-2xl p-8 md:p-12 text-center shadow-[4px_4px_0px_#111111] border-2 border-[#111111]">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#111111] text-white text-xs font-black uppercase tracking-wider mb-4 border border-[#111111]">
              Error 404
            </span>
            <h1 className="text-3xl md:text-4xl font-headline font-black text-[#111111] mb-4">
              {language === "ca" ? "Article no trobat" : language === "en" ? "Article Not Found" : "Artículo no encontrado"}
            </h1>
            <p className="text-[#111111] text-base md:text-lg mb-8 leading-relaxed font-medium">
              {language === "ca" 
                ? "El contingut que estàs buscant no existeix o ha estat traslladat." 
                : language === "en" 
                ? "The content you are looking for does not exist or has been moved." 
                : "El artículo que estás buscando no existe o ha sido trasladado a otra dirección."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/noticias" className="neo-btn-primary px-8 py-3.5 rounded-xl font-headline font-black uppercase tracking-wider text-xs">
                {language === "ca" ? "Tornar al Blog" : language === "en" ? "Back to Blog" : "Volver al Blog"}
              </Link>
            </div>
          </div>
        </main>

        <Footer language={language} />
      </div>
    );
  }

  const content = article[language] || article.es;
  const canonicalUrl = `${SITE_DOMAIN}/noticias/${article.slug}`;

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : canonicalUrl;
    const shareTitle = `${content.title} — Gesgrama`;
    const shareText = content.summary || content.title;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: url,
        });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        return;
      } catch (err: any) {
        if (err?.name === "AbortError") {
          return;
        }
      }
    }

    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Get 3 related articles (single consolidated recommended section)
  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  // Helper function to highlight key data cleanly without pastel washes
  const highlightKeyText = (text: string, isDarkBg: boolean = false) => {
    const keyPatterns = [
      /(\b30 días hábiles\b|\b30 dies hàbils\b|\b30 working days\b)/gi,
      /(\b2 años\b|\b2 anys\b|\b2 years\b)/gi,
      /(\b45 a 90 días\b|\b45 a 90 dies\b|\b45 to 90 days\b)/gi,
      /(\b7 a 21 días\b|\b7 a 21 dies\b|\b7 to 21 days\b)/gi,
      /(\b65 años\b|\b65 anys\b|\bage 65\b)/gi,
      /(\b10 años\b|\b10 anys\b|\b10 years\b|\b3 años\b|\b3 anys\b|\b3 years\b|\b1 año\b|\b1 any\b|\b1 year\b)/gi,
      /(\bexenta del impuesto\b|\bexento del impuesto\b|\bexempta de l'impost\b|\bfully exempt\b|\bexención total\b|\bexempció total\b|\bfull exemption\b)/gi,
      /(\b10%\b|\b4%\b|\b1,5%\b|\b80%\b|\b70%\b|\b5%\b|\b7%\b|\b15%\b|\b80-90%\b|\b5% a 7%\b|\b4% y un 8%\b|\b4% i un 8%\b|\b4% to 8%\b)/g
    ];

    let parts: (string | React.ReactNode)[] = [text];

    keyPatterns.forEach((pattern) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach((part) => {
        if (typeof part !== "string") {
          newParts.push(part);
          return;
        }
        const matches = Array.from(part.matchAll(pattern));
        if (matches.length === 0) {
          newParts.push(part);
          return;
        }
        let lastIndex = 0;
        matches.forEach((match, matchIdx) => {
          const matchString = match[0];
          const matchIndex = match.index || 0;
          if (matchIndex > lastIndex) {
            newParts.push(part.substring(lastIndex, matchIndex));
          }
          if (isDarkBg) {
            newParts.push(
              <strong 
                key={`${matchIndex}-${matchIdx}`} 
                className="font-black text-[#60A5FA]"
              >
                {matchString}
              </strong>
            );
          } else {
            newParts.push(
              <strong 
                key={`${matchIndex}-${matchIdx}`} 
                className="font-black text-[#2860F5] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200"
              >
                {matchString}
              </strong>
            );
          }
          lastIndex = matchIndex + matchString.length;
        });
        if (lastIndex < part.length) {
          newParts.push(part.substring(lastIndex));
        }
      });
      parts = newParts;
    });

    return <>{parts}</>;
  };

  return (
    <div className="bg-[#FAF9FC] text-[#111111] font-sans selection:bg-[#2860F5] selection:text-white min-h-screen">
      {/* NAVBAR */}
      <Navbar language={language} setLanguage={changeLanguage} />

      {/* MAIN ARTICLE CONTAINER */}
      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-12 lg:p-14 relative z-10">
          
          {/* 1. CABECERA INTEGRADA: REGRESO, BREADCRUMB Y ACCIONES */}
          <div className="mb-8 pb-6 border-b-2 border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link 
                to="/noticias" 
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-headline font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-[#2860F5] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] px-4 py-2 transition-all cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-[#60A5FA] group-hover:text-white group-hover:-translate-x-1 transition-all" />
                <span>{language === "ca" ? "Tornar al Blog" : language === "en" ? "Back to Blog" : "Volver al Blog"}</span>
              </Link>

              <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 font-sans">
                <Link to="/" className="hover:text-[#2860F5] transition-colors">
                  {language === "ca" ? "Inici" : language === "en" ? "Home" : "Inicio"}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <Link to="/noticias" className="text-slate-500 hover:text-[#2860F5] transition-colors">
                  {language === "ca" ? "Notícies" : language === "en" ? "News" : "Noticias"}
                </Link>
              </nav>
            </div>

            {/* Acciones de Compartir y WhatsApp Integradas */}
            <div className="flex items-center gap-2.5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${content.title} — ${typeof window !== "undefined" ? window.location.href : canonicalUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-headline font-black uppercase tracking-wider text-white bg-[#16A34A] hover:bg-[#15803d] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] px-3.5 py-2 transition-all cursor-pointer"
                title="Compartir por WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyShare}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-headline font-black uppercase tracking-wider text-white bg-[#111111] hover:bg-[#2860F5] border-2 border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] px-3.5 py-2 transition-all cursor-pointer"
                title={t.detail.shareTitle}
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400 stroke-[3]" /> : <Share2 className="w-4 h-4 text-blue-200" />}
                <span>{copiedLink ? t.detail.linkCopied : t.detail.share}</span>
              </button>
            </div>
          </div>

          {/* 2. CATEGORÍA Y METADATOS INTEGRADOS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-[#2860F5] text-white text-xs font-headline font-black uppercase tracking-wider px-3.5 py-1.5 border-2 border-[#111111] rounded-lg shadow-[2px_2px_0px_#111111]">
              {content.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-data-mono font-bold text-[#111111]">
              <Calendar className="w-3.5 h-3.5 text-[#2860F5]" />
              {content.date}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-data-mono font-bold text-[#111111]">
              <Clock className="w-3.5 h-3.5 text-[#2860F5]" />
              {content.readTime}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-headline font-bold text-[#111111]">
              <User className="w-3.5 h-3.5 text-[#2860F5]" />
              {content.author}
            </span>
          </div>

          {/* 3. TÍTULO PRINCIPAL (H1) DE IMPACTO EDITORIAL */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] leading-[1.15] mb-6 tracking-tight [text-wrap:balance]">
            {content.title}
          </h1>

          {/* 4. ENTRADILLA / IDEA CLAVE DESTACADA (100% ANCHO, ESCALA COMPLETA) */}
          <EditorialCallout
            variant="idea-clave"
            label={language === "ca" ? "IDEA CLAU" : language === "en" ? "KEY TAKEAWAY" : "IDEA CLAVE"}
            className="mb-10"
          >
            <p className="text-[18px] sm:text-[20px] font-headline font-bold text-[#111111] leading-[1.65]">
              {content.summary}
            </p>
          </EditorialCallout>

        </div>

        {/* 9. ÚNICA SECCIÓN DE RECOMENDACIONES EDITORIALES CONSOLIDADAS */}
        <div className="mt-12 bg-white border-2 border-[#111111] rounded-[24px] shadow-[4px_4px_0px_#111111] p-6 sm:p-9 md:p-10 font-sans">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-slate-100 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2860F5] text-white text-xs font-headline font-black uppercase tracking-wider mb-2.5 border border-[#111111] shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-white" />
                <span>{language === "ca" ? "Guies Recomanades" : language === "en" ? "Recommended Guides" : "Guías Recomendadas"}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-headline font-black text-[#111111] tracking-tight">
                {language === "ca" ? "Articles i consells que et poden interessar" : language === "en" ? "Articles and tips you might like" : "Artículos y consejos que te pueden interesar"}
              </h3>
            </div>
            <Link
              to="/noticias"
              className="text-xs sm:text-sm font-headline font-black text-[#2860F5] hover:underline flex items-center gap-1.5 shrink-0"
            >
              <span>{language === "ca" ? "Veure tots els articles" : language === "en" ? "View all articles" : "Ver todos los artículos"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArt) => {
              const relContent = relArt[language] || relArt.es;
              return (
                <article 
                  key={relArt.id} 
                  className="bg-[#FAF9FC] border-2 border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] p-5 flex flex-col h-full transition-all group overflow-hidden"
                >
                  <Link to="/noticias/$slug" params={{ slug: relArt.slug }} className="block aspect-[16/10] overflow-hidden rounded-xl border-2 border-[#111111] mb-3.5 bg-slate-200 cursor-pointer">
                    <img
                      src={relArt.image}
                      alt={relContent.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex items-center gap-2 text-xs font-data-mono font-bold text-[#2860F5] mb-2 uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#2860F5]" />
                    <span>{relContent.date}</span>
                  </div>

                  <Link
                    to="/noticias/$slug"
                    params={{ slug: relArt.slug }}
                    className="block font-headline font-black text-[#111111] text-base sm:text-lg leading-snug mb-2 group-hover:text-[#2860F5] transition-colors line-clamp-2 cursor-pointer"
                  >
                    {relContent.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-[#111111] font-medium leading-relaxed mb-4 flex-1 line-clamp-3">
                    {relContent.summary}
                  </p>

                  <div className="mt-auto pt-2 border-t border-slate-200">
                    <Link
                      to="/noticias/$slug"
                      params={{ slug: relArt.slug }}
                      className="w-full neo-btn-primary py-2.5 px-3.5 text-xs font-headline font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#111111]"
                    >
                      <span>{language === "ca" ? "Llegir article" : language === "en" ? "Read article" : "Leer artículo"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </main>

      {/* FOOTER GLOBAL OFICIAL */}
      <Footer language={language} />
    </div>
  );
}
