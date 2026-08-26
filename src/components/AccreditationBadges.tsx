export function AccreditationBadges() {
  const badges = [
    {
      id: "api",
      logo: "/images/badges/logo-api.jpg",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "A10750"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.jpg",
      alt: "Registre d'Agents Immobiliaris de Catalunya AICAT",
      number: "" // Already embedded inside the image logo
    },
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.jpg",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.jpg",
      alt: "APIS - PERITOS",
      number: "1639"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-start">
      {badges.map((b) => (
        <div key={b.id} className="flex flex-col items-center group">
          {/* Direct clean logo container - No extra UI wrappers or side texts */}
          <div className="w-full bg-white rounded-2xl p-3 sm:p-4 h-24 sm:h-28 md:h-32 flex items-center justify-center shadow-lg border-2 border-slate-300 transition-transform duration-300 group-hover:scale-105">
            <img
              src={b.logo}
              alt={b.alt}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
          {/* Number underneath the logo (only for those requiring it) */}
          {b.number ? (
            <span className="text-white text-sm sm:text-base md:text-lg font-black tracking-widest text-center mt-2 font-sans">
              {b.number}
            </span>
          ) : (
            <span className="h-5 sm:h-6 md:h-7 mt-2 block" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
