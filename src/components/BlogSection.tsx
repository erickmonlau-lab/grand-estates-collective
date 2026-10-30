import { Link } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { homeArticles as articles } from "@/data/homeArticles";

interface BlogSectionProps {
  language: "es" | "en" | "ca";
  t: any;
}

export default function BlogSection({ language, t }: BlogSectionProps) {
  const isCa = language === "ca";
  const isEn = language === "en";

  return (
    <section id="blog" className="py-14 sm:py-18 bg-[#FFFFFF] text-[#111111] border-b-2 border-[#111111]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-[#111111]">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-[#111111] text-white text-[13px] sm:text-[14px] font-headline font-black tracking-widest uppercase px-3.5 py-1.5 shadow-[2px_2px_0px_#2860F5] mb-4">
              <span className="w-2 h-2 bg-[#2860F5]" />
              <span>{t.noticias.tag}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-[#111111] tracking-tight leading-tight">
              {t.noticias.title1} <span className="text-[#2860F5] underline decoration-[#111111] decoration-4 underline-offset-4">{t.noticias.title2}</span>
            </h2>
          </div>
          
          <div className="lg:max-w-md">
            <p className="text-[17px] text-[#111111] font-bold leading-relaxed bg-[#FAF9FC] p-4 border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
              {t.noticias.subtitle}
            </p>
          </div>
        </div>

        {/* Grid de Noticias: Tarjetas rectangulares con bordes negros de 2px, fechas en JetBrains Mono y flechas SVG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 items-stretch">
          {articles.slice(0, 4).map((art) => {
            const title = art.title[language];
            const summary = art.summary[language];
            const date = art.date;
            return (
              <div 
                key={art.id} 
                className="bg-[#FFFFFF] text-[#111111] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:shadow-[5px_5px_0px_#2860F5] hover:border-[#2860F5] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border-b-2 border-[#111111]">
                    <img
                      src={art.image}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="p-5 flex flex-col">
                    {/* Fecha en JetBrains Mono */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-2 h-2 bg-[#2860F5]" />
                      <span className="text-[13px] font-data-mono font-black text-[#111111] uppercase tracking-wider">{date}</span>
                    </div>

                    <Link to="/noticias/$slug" params={{ slug: art.slug }} className="block font-headline font-black text-[#111111] text-[18px] sm:text-[19px] leading-snug mb-3 group-hover:text-[#2860F5] transition-colors line-clamp-2">
                      {title}
                    </Link>

                    <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium leading-relaxed line-clamp-3">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto">
                  <div className="pt-3 border-t-2 border-[#111111] flex items-center justify-between">
                    <Link
                      to="/noticias/$slug"
                      params={{ slug: art.slug }}
                      className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-headline font-black text-[#2860F5] uppercase tracking-wider group-hover:underline"
                    >
                      <span>{t.noticias.seguirLeyendo}</span>
                      <ArrowRight className="w-4 h-4 text-[#2860F5] stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Ver Todas las Noticias */}
        <div className="text-center pt-2">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-3 bg-[#111111] hover:bg-[#2860F5] text-white px-8 py-4 border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] text-sm sm:text-base font-headline font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>{t.noticias.verTodasBtn}</span>
            <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
