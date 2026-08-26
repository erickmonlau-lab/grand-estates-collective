interface AccreditationBadgesProps {
  language?: "es" | "ca" | "en";
}

export function AccreditationBadges({ language = "es" }: AccreditationBadgesProps) {
  const badges = [
    {
      id: "api",
      logo: "/images/badges/logo-api.jpg",
      alt: "Col·legi Oficial API",
      title: language === "ca" ? "Col·legi Oficial API" : language === "en" ? "Official API College" : "Colegio Oficial API",
      number: language === "ca" ? "Col·legiat A10750" : language === "en" ? "Member No. A10750" : "Colegiado A10750",
      accent: "hover:border-amber-400"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.jpg",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT)",
      title: language === "ca" ? "Registre d'Agents AICAT" : language === "en" ? "AICAT Real Estate Registry" : "Registro de Agentes AICAT",
      number: language === "ca" ? "Inscripció Nº 5583" : language === "en" ? "Registration No. 5583" : "Inscripción Nº 5583",
      accent: "hover:border-blue-400"
    },
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.jpg",
      alt: "Peritos Judiciales Inmobiliarios",
      title: language === "ca" ? "Perits Judicials Immobiliaris" : language === "en" ? "Judicial Real Estate Experts" : "Peritos Judiciales Inmobiliarios",
      number: language === "ca" ? "Acreditació PJI 2024" : language === "en" ? "PJI 2024 Certification" : "Acreditación PJI 2024",
      accent: "hover:border-indigo-400"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.jpg",
      alt: "Asociación de Peritos Judiciales Inmobiliarios",
      title: language === "ca" ? "Associació APIS - Perits" : language === "en" ? "APIS - Experts Association" : "Asociación APIS - Peritos",
      number: language === "ca" ? "Associat Nº 1639" : language === "en" ? "Member No. 1639" : "Asociado Nº 1639",
      accent: "hover:border-emerald-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {badges.map((b) => (
        <div
          key={b.id}
          className={`bg-[#1e293b] border-2 border-slate-600 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3.5 shadow-lg ${b.accent} transition-all duration-300 hover:scale-[1.02]`}
        >
          {/* Logo container with white background and crisp contrast */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border-2 border-slate-300 shadow-md overflow-hidden">
            <img
              src={b.logo}
              alt={b.alt}
              className="w-full h-full object-contain"
              loading="lazy"
              width={64}
              height={64}
            />
          </div>
          <div className="min-w-0 flex-1">
            <strong className="text-sm sm:text-base text-white block font-black leading-snug tracking-tight font-sans">
              {b.title}
            </strong>
            <span className="text-xs sm:text-sm text-[#38bdf8] font-black block mt-0.5 font-sans tracking-wide">
              {b.number}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
