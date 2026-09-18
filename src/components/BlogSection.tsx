import { Link } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { homeArticles as articles } from "@/data/homeArticles";

interface BlogSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function BlogSection({ language, t }: BlogSectionProps) {
  return (
    <section id="blog" className="pt-4 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 bg-[#e2e8f0] text-onyx">
      <div className="max-w-[1150px] mx-auto">
        <div className="mb-4 sm:mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-[11px] sm:text-xs font-black tracking-wider uppercase px-3.5 py-1 rounded-xl shadow-xs mb-2">
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>{t.noticias.tag}</span>
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] mb-1.5 font-sans tracking-tight">
            {t.noticias.title1} <span className="text-[#2563eb]">{t.noticias.title2}</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-bold leading-snug font-sans mt-1">
            {t.noticias.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {articles.slice(0, 4).map((art) => {
            const title = art.title[language];
            const summary = art.summary[language];
            const date = art.date;
            return (
              <div key={art.id} className="bg-white rounded-2xl sm:rounded-3xl p-5 flex flex-col h-full border-2 border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/8] overflow-hidden rounded-xl mb-3.5 bg-slate-100 cursor-pointer">
                  <img
                    src={art.image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2">
                    <span className="text-slate-500 font-extrabold">{date}</span>
                  </div>
                  <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-black text-[#0f172a] text-base sm:text-lg leading-snug mb-2.5 group-hover:text-[#2563eb] transition-colors line-clamp-2 font-sans cursor-pointer">
                    {title}
                  </Link>
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-4 flex-1 line-clamp-3">
                    {summary}
                  </p>
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <Link
                      to="/noticias/$slug"
                      params={{ slug: art.slug }}
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#2563eb] hover:text-[#1d4ed8] group-hover:gap-3 transition-all font-sans cursor-pointer"
                    >
                      <span>{t.noticias.seguirLeyendo}</span>
                      <ArrowRight className="w-4.5 h-4.5 text-[#2563eb]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12 mb-2 sm:mb-4">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-9 py-4.5 rounded-full text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 cursor-pointer font-sans"
          >
            <span>{t.noticias.verTodasBtn}</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
