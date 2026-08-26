export function AccreditationBadges() {
  const badges = [
    {
      id: "api",
      logo: "/images/badges/logo-api.png",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "" // Already embedded inside the graphic in large bold font as "Agent immobiliari / A10750"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.png",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT 5583)",
      number: "", // Already embedded inside the blue banner graphic
      isBanner: true
    },
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.png",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.png",
      alt: "APIS - PERITOS",
      number: "1639"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 items-center justify-items-center py-4">
      {badges.map((b) => (
        <div key={b.id} className="flex flex-col items-center justify-center w-full max-w-[320px] group">
          {/* Direct Transparent Logo - Prominent and Large Scale */}
          <div className="w-full h-28 sm:h-36 md:h-44 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={b.logo}
              alt={b.alt}
              className={`max-h-full max-w-full object-contain ${b.isBanner ? 'rounded-2xl shadow-lg border border-white/20' : 'drop-shadow-lg'}`}
              loading="lazy"
            />
          </div>
          
          {/* Registration number directly below logo */}
          {b.number ? (
            <span className="text-white text-base sm:text-xl font-black tracking-widest text-center mt-3 font-sans">
              {b.number}
            </span>
          ) : (
            <span className="h-6 sm:h-8 mt-3 block" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
