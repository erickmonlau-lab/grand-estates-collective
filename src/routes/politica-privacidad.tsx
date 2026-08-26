import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { legalTranslations } from "@/data/legalTranslations";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad | Gesgrama" },
      { name: "description", content: "Política de privacidad y protección de datos conforme al RGPD de Gesgrama." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://www.gesgrama.es/politica-privacidad" }
    ]
  }),
  component: PoliticaPrivacidadComponent
});

function PoliticaPrivacidadComponent() {
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

  const t = legalTranslations[language] || legalTranslations.es;
  const doc = t.politicaPrivacidad;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* SHARED CANONICAL NAVY NAVBAR */}
      <Navbar language={language} setLanguage={handleLanguageChange} />

      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1d4ed8] hover:text-[#1e40af] mb-6 transition-colors bg-white px-5 py-2.5 rounded-full border-2 border-slate-300 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#1d4ed8]" />
          {t.backHome}
        </Link>

        {/* Header Banner - COLOR FUERTE SÓLIDO (NO TRASLÚCIDO) */}
        <div className="bg-[#0f172a] text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex items-center gap-4 sm:gap-6 border-2 border-slate-700">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-lg">
            <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-wider text-white bg-[#1e40af] px-3.5 py-1 rounded-full mb-1.5 border-2 border-blue-500 shadow-xs">
              {doc.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
              {doc.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-bold mt-1">
              {doc.subtitle}
            </p>
          </div>
        </div>

        {/* Content Box - SÓLIDO Y TOTALMENTE TRADUCIDO */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-lg space-y-8 text-slate-800 leading-relaxed text-base sm:text-lg">
          <section className="bg-slate-50 p-6 sm:p-7 rounded-2xl border-2 border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-3 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#1d4ed8] shrink-0" />
              {doc.s1_title}
            </h2>
            <p className="text-slate-800 font-medium">
              {doc.s1_intro}
            </p>
            <div className="mt-4 p-5 bg-white rounded-xl border-2 border-slate-200 text-sm sm:text-base space-y-2 text-slate-800 shadow-xs font-medium">
              <p><strong className="text-slate-900 font-black">{doc.entidadLabel}</strong> {doc.entidadVal}</p>
              <p><strong className="text-slate-900 font-black">{doc.direccionLabel}</strong> {doc.direccionVal}</p>
              <p><strong className="text-slate-900 font-black">{doc.contactoLabel}</strong> {doc.contactoVal}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-3">{doc.s2_title}</h2>
            <p className="text-slate-800 font-medium">{doc.s2_intro}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-800 font-bold mt-3">
              {doc.finalidades.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-3">{doc.s3_title}</h2>
            <p className="text-slate-800 font-medium">
              {doc.s3_text}
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-3">{doc.s4_title}</h2>
            <p className="text-slate-800 font-medium">{doc.s4_text}</p>
            <div className="mt-4 flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 text-slate-800 font-medium">
              <Mail className="w-6 h-6 text-[#1d4ed8] shrink-0" />
              <span className="text-sm sm:text-base">{doc.emailProteccionLabel} <strong className="text-[#0f172a] font-black">info@gesgrama.com</strong></span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
