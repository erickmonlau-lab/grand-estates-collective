export function AccreditationBadges() {
  const badges = [
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.jpg",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024",
      imgClass: "max-h-20 sm:max-h-24 w-auto object-contain"
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.jpg",
      alt: "APIS - PERITOS",
      number: "1639",
      imgClass: "max-h-20 sm:max-h-24 w-auto object-contain"
    },
    {
      id: "api",
      logo: "/images/badges/logo-api.jpg",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "A10750",
      imgClass: "max-h-16 sm:max-h-20 w-auto object-contain"
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.jpg",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT)",
      number: "AICAT 5583",
      imgClass: "max-h-14 sm:max-h-18 w-auto object-contain"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-items-center py-6">
      {badges.map((b) => (
        <div key={b.id} className="flex flex-col items-center justify-between w-full max-w-[260px] group">
          {/* Official Clean Corporate White Card */}
          <div className="w-full h-28 sm:h-36 bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-center shadow-lg border border-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
            <img
              src={b.logo}
              alt={b.alt}
              className={b.imgClass}
              loading="lazy"
            />
          </div>
          
          {/* Registration number below card */}
          <span className="text-white text-sm sm:text-base font-black tracking-widest text-center mt-3 font-sans">
            {b.number}
          </span>
        </div>
      ))}
    </div>
  );
}
