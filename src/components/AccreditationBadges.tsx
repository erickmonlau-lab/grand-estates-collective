export function AccreditationBadges() {
  // Ordered progressively from largest / most prominent to compact for harmonious visual balance
  const badges = [
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.png",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024",
      imgClass: "h-28 sm:h-36 md:h-40 w-auto object-contain drop-shadow-xl"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.png",
      alt: "APIS - PERITOS",
      number: "1639",
      imgClass: "h-26 sm:h-32 md:h-36 w-auto object-contain drop-shadow-xl"
    },
    {
      id: "api",
      logo: "/images/badges/logo-api.png",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "A10750",
      imgClass: "h-20 sm:h-26 md:h-30 w-auto object-contain drop-shadow-xl"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.png",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT)",
      number: "AICAT 5583",
      imgClass: "h-14 sm:h-18 md:h-22 w-auto object-contain rounded-xl shadow-lg border border-white/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 items-end justify-items-center py-6">
      {badges.map((b) => (
        <div key={b.id} className="flex flex-col items-center justify-end w-full max-w-[280px] group">
          {/* Logo container with bottom alignment for consistent optical rhythm */}
          <div className="w-full h-32 sm:h-40 md:h-44 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={b.logo}
              alt={b.alt}
              className={b.imgClass}
              loading="lazy"
            />
          </div>
          
          {/* Registration number directly below each logo in a consistent row */}
          <span className="text-white text-base sm:text-xl font-black tracking-widest text-center mt-3 font-sans">
            {b.number}
          </span>
        </div>
      ))}
    </div>
  );
}
