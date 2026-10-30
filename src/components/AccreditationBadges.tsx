interface AccreditationBadgesProps {
  language?: string;
}

export function AccreditationBadges({ language }: AccreditationBadgesProps) {
  const badges = [
    {
      id: "pji",
      logo: "/images/badges/logo-pji-escudo.webp",
      alt: "Peritos Judiciales Inmobiliarios",
      number: "PJI 2024",
      url: "https://www.apis.casa",
      title: "Asociación de Peritos Judiciales de España (PJI)",
      imgClass: "h-24 sm:h-28 md:h-32 w-auto object-contain",
      width: 767,
      height: 975
    },
    {
      id: "apis-peritos",
      logo: "/images/badges/logo-apis-peritos.webp",
      alt: "APIS - PERITOS",
      number: "1639",
      url: "https://www.apis.casa",
      title: "Colegio Oficial y Consejo General de Agentes de la Propiedad Inmobiliaria y Peritos (APIS)",
      imgClass: "h-24 sm:h-28 md:h-32 w-auto object-contain",
      width: 923,
      height: 927
    },
    {
      id: "api",
      logo: "/images/badges/logo-api.webp",
      alt: "API - Col·legis i associació d'agents immobiliaris",
      number: "A10750",
      url: "https://consejocoapis.org",
      title: "Col·legi Oficial d'Agents de la Propietat Immobiliària (API Catalunya)",
      imgClass: "h-20 sm:h-24 md:h-28 w-auto object-contain",
      width: 984,
      height: 347
    },
    {
      id: "aicat",
      logo: "/images/badges/logo-aicat.webp",
      alt: "Registre d'Agents Immobiliaris de Catalunya (AICAT)",
      number: "AICAT 5583",
      url: "https://aicat.barcelona/blog/el-registro-de-agentes-inmobiliarios-de-catalunya-aicat/?gad_source=1&gad_campaignid=20992631973&gbraid=0AAAAADLV_c8CaVxYDF85V36AVJ-K-hhx6",
      title: "Registre d'Agents Immobiliaris de Catalunya — Agència de l'Habitatge de Catalunya (Generalitat)",
      imgClass: "w-full max-w-[240px] h-auto max-h-20 sm:max-h-24 md:max-h-28 object-contain",
      width: 1024,
      height: 216
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-items-center py-4">
      {badges.map((b) => (
        <a
          key={b.id}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${b.title} (${b.number})`}
          className="flex flex-col items-center justify-between w-full max-w-[320px] group cursor-pointer"
        >
          {/* Neo-Brutalist White Card with 2px solid black border and 3px black shadow */}
          <div className="w-full h-32 sm:h-38 md:h-40 bg-white border-2 border-[#111111] shadow-[3px_3px_0px_#2860F5] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[4px_4px_0px_#2860F5] p-3 sm:p-4 flex items-center justify-center transition-all overflow-hidden relative">
            <img
              src={b.logo}
              alt={b.alt}
              width={b.width}
              height={b.height}
              className={b.imgClass}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
          
          {/* Registration number below card in JetBrains Mono / Space Grotesk */}
          <span className="text-white text-sm sm:text-base font-data-mono font-black tracking-widest text-center mt-2.5 group-hover:text-[#2860F5] transition-colors">
            {b.number}
          </span>
        </a>
      ))}
    </div>
  );
}
