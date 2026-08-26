export function AccreditationBadges() {
  const badges = [
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.jpg",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024",
      cardBg: "bg-white",
      imgClass: "h-28 sm:h-36 md:h-40 w-auto object-contain"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.jpg",
      alt: "APIS - PERITOS",
      number: "1639",
      cardBg: "bg-white",
      imgClass: "h-28 sm:h-34 md:h-38 w-auto object-contain"
    },
    {
      id: "api",
      logo: "/images/badges/logo-api.jpg",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "A10750",
      cardBg: "bg-white",
      imgClass: "h-22 sm:h-28 md:h-32 w-auto object-contain"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.jpg",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT)",
      number: "AICAT 5583",
      cardBg: "bg-white",
      imgClass: "w-full max-w-[260px] h-auto max-h-22 sm:max-h-28 md:max-h-32 object-contain rounded-xl shadow-xs"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 items-stretch justify-items-center py-6">
      {badges.map((b) => (
        <div key={b.id} className="flex flex-col items-center justify-between w-full max-w-[320px] group">
          {/* Official Clean White Corporate Card */}
          <div className="w-full h-36 sm:h-44 md:h-48 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center justify-center shadow-xl border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
            <img
              src={b.logo}
              alt={b.alt}
              className={b.imgClass}
              loading="lazy"
            />
          </div>
          
          {/* Registration number below card */}
          <span className="text-white text-base sm:text-lg font-black tracking-widest text-center mt-3 font-sans">
            {b.number}
          </span>
        </div>
      ))}
    </div>
  );
}
