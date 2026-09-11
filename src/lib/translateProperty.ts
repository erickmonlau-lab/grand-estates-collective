import type { ExtendedProperty } from "./propertyStore";

function formatLocationDirect(loc: string, language: string): string {
  if (!loc) return "";
  const normalized = loc.trim();
  if (normalized === "Centre" || normalized === "Centro" || normalized === "Center") {
    if (language === "ca") return "Centre";
    if (language === "en") return "Center";
    return "Centro";
  }
  return loc;
}

// ==========================================
// 1. COMPREHENSIVE REAL ESTATE PHRASES & VOCABULARY
// ==========================================

// Ordered from longest multi-word phrases to individual words to avoid partial matching bugs
const ES_TO_CA_RULES: [RegExp, string][] = [
  // Specific compound sentences & descriptions seen in properties
  [/\bsobre la ciudad y la sierra de Marina\b/gi, "sobre la ciutat i la serralada de Marina"],
  [/\bsobre la ciudad\b/gi, "sobre la ciutat"],
  [/\bla sierra de Marina\b/gi, "la serralada de Marina"],
  [/\ben pleno centro de\b/gi, "en ple centre de"],
  [/\ben pleno centro\b/gi, "en ple centre"],
  [/\ben pleno corazón de\b/gi, "en ple cor de"],
  [/\blista para entrar a vivir\b/gi, "a punt per entrar a viure"],
  [/\blisto para entrar a vivir\b/gi, "a punt per entrar a viure"],
  [/\ba entrar a vivir\b/gi, "per entrar a viure"],
  [/\bpara entrar a vivir\b/gi, "per entrar a viure"],
  [/\ba 2 minutos de la parada de metro\b/gi, "a 2 minuts de la parada de metro"],
  [/\ba escasos metros del\b/gi, "a pocs metres del"],
  [/\ba pocos metros del\b/gi, "a pocs metres del"],
  [/\ba pie de calle en zona de alto tránsito comercial\b/gi, "a peu de carrer en zona d'alt trànsit comercial"],
  [/\ba pie de calle\b/gi, "a peu de carrer"],
  [/\balto tránsito comercial\b/gi, "alt trànsit comercial"],
  [/\bgran escaparate acristalado\b/gi, "gran aparador de vidre"],
  [/\bgran escaparate\b/gi, "gran aparador"],
  [/\bfachada de\b/gi, "façana de"],
  [/\bjunto al parque fluvial\b/gi, "al costat del parc fluvial"],
  [/\bjunto al\b/gi, "al costat del"],
  [/\bjunto a la\b/gi, "al costat de la"],
  [/\bvistas abiertas\b/gi, "vistes obertes"],
  [/\bvistas despejadas\b/gi, "vistes clares"],
  [/\bvistas panorámicas despejadas\b/gi, "vistes panoràmiques clares"],
  [/\bvistas panorámicas\b/gi, "vistes panoràmiques"],
  [/\bvistas a la ciudad\b/gi, "vistes a la ciutat"],
  [/\bcon vistas panorámicas\b/gi, "amb vistes panoràmiques"],
  [/\bcon vistas\b/gi, "amb vistes"],
  [/\bcon vistas al\b/gi, "amb vistes al"],
  [/\bterraza solárium de\b/gi, "terrassa solàrium de"],
  [/\bterraza solárium\b/gi, "terrassa solàrium"],
  [/\bterraza solarium\b/gi, "terrassa solàrium"],
  [/\bterraza privada de\b/gi, "terrassa privada de"],
  [/\bterraza privada\b/gi, "terrassa privada"],
  [/\bgran terraza\b/gi, "gran terrassa"],
  [/\bcon gran terraza\b/gi, "amb gran terrassa"],
  [/\bcon terraza\b/gi, "amb terrassa"],
  [/\bcon balcón orientado al sur\b/gi, "amb balcó orientat al sud"],
  [/\borientado al sol\b/gi, "orientat al sol"],
  [/\borientado al sur\b/gi, "orientat al sud"],
  [/\borientada al sol\b/gi, "orientada al sol"],
  [/\borientada al sur\b/gi, "orientada al sud"],
  [/\bcon balcón\b/gi, "amb balcó"],
  [/\bcon balcon\b/gi, "amb balcó"],
  [/\bcon ascensor\b/gi, "amb ascensor"],
  [/\bcon parking\b/gi, "amb pàrquing"],
  [/\ben la misma finca\b/gi, "a la mateixa finca"],
  [/\bfinca semi-nueva\b/gi, "finca seminova"],
  [/\bfinca seminueva\b/gi, "finca seminova"],
  [/\bfinca con ascensor\b/gi, "finca amb ascensor"],
  [/\bfinca cuidada\b/gi, "finca cuidada"],
  [/\bexcelente distribución\b/gi, "excel·lent distribució"],
  [/\bexcelente orientación solar\b/gi, "excel·lent orientació solar"],
  [/\bexcelente orientación\b/gi, "excel·lent orientació"],
  [/\bexcelente iluminación natural\b/gi, "excel·lent il·luminació natural"],
  [/\bexcelente ubicación\b/gi, "excel·lent ubicació"],
  [/\bmuy luminoso gracias a sus grandes ventanales\b/gi, "molt lluminós gràcies als seus grans finestrals"],
  [/\bgracias a sus grandes ventanales\b/gi, "gràcies als seus grans finestrals"],
  [/\bgrandes ventanales\b/gi, "grans finestrals"],
  [/\bsalón muy luminoso\b/gi, "saló molt lluminós"],
  [/\bsalón-comedor amplio\b/gi, "saló-menjador ampli"],
  [/\bamplio salón-comedor\b/gi, "ampli saló-menjador"],
  [/\bsalón comedor\b/gi, "saló menjador"],
  [/\bsalón-comedor\b/gi, "saló-menjador"],
  [/\bsalón\b/gi, "saló"],
  [/\bcocina office independiente\b/gi, "cuina office independent"],
  [/\bcocina office\b/gi, "cuina office"],
  [/\bcocina reformada\b/gi, "cuina reformada"],
  [/\bcocina totalmente equipada\b/gi, "cuina totalment equipada"],
  [/\bcocina equipada\b/gi, "cuina equipada"],
  [/\bcocina americana\b/gi, "cuina americana"],
  [/\bcocina\b/gi, "cuina"],
  [/\barmarios empotrados\b/gi, "armaris encastats"],
  [/\barmarios de pared\b/gi, "armaris encastats"],
  [/\bacabados de primera calidad\b/gi, "acabats de primera qualitat"],
  [/\bacabados de calidad\b/gi, "acabats de qualitat"],
  [/\bacabados de lujo\b/gi, "acabats de luxe"],
  [/\bacabados premium\b/gi, "acabats prèmium"],
  [/\bluz natural todo el día\b/gi, "llum natural tot el dia"],
  [/\bluz natural\b/gi, "llum natural"],
  [/\bcerca de colegios y comercios\b/gi, "a prop d'escoles i comerços"],
  [/\bcerca de colegios\b/gi, "a prop d'escoles"],
  [/\bcerca de comercios\b/gi, "a prop de comerços"],
  [/\bcerca de metro\b/gi, "a prop del metro"],
  [/\bcalefacción por radiadores\b/gi, "calefacció per radiadors"],
  [/\bcalefacción central\b/gi, "calefacció central"],
  [/\bcalefacción\b/gi, "calefacció"],
  [/\baire acondicionado central\b/gi, "aire condicionat central"],
  [/\baire acondicionado\b/gi, "aire condicionat"],
  [/\bsuelo de parquet natural\b/gi, "terra de parquet natural"],
  [/\bsuelo de parquet\b/gi, "terra de parquet"],
  [/\bsuelos de mosaico hidráulico restaurado\b/gi, "terres de mosaic hidràulic restaurat"],
  [/\bmosaico hidráulico\b/gi, "mosaic hidràulic"],
  [/\bbóveda catalana restaurada\b/gi, "volta catalana restaurada"],
  [/\bbóveda catalana\b/gi, "volta catalana"],
  [/\bconserje 24h\b/gi, "conserge 24h"],
  [/\bseguridad 24h\b/gi, "seguretat 24h"],
  [/\bgaraje en la misma finca\b/gi, "garatge a la mateixa finca"],
  [/\bplaza de garaje doble incluida\b/gi, "plaça de garatge doble inclosa"],
  [/\bplaza de parking opcional\b/gi, "plaça de pàrquing opcional"],
  [/\bplaza de parking\b/gi, "plaça de pàrquing"],
  [/\bplaza de garaje\b/gi, "plaça de garatge"],
  [/\bascensor directo\b/gi, "ascensor directe"],
  [/\bsuite principal con vestidor\b/gi, "suite principal amb vestidor"],
  [/\bcon baño en suite\b/gi, "amb bany en suite"],
  [/\bgarantía de alquiler asegurada\b/gi, "garantia de lloguer assegurada"],
  [/\bpersiana motorizada\b/gi, "persiana motoritzada"],
  [/\bacceso pmr\b/gi, "accés PMR"],
  [/\bsalida de humos\b/gi, "sortida de fums"],
  [/\bzona tranquila\b/gi, "zona tranquil·la"],
  [/\bzona céntrica\b/gi, "zona cèntrica"],
  [/\bobra nueva\b/gi, "obra nova"],
  [/\ben venta\b/gi, "en venda"],
  [/\ben alquiler\b/gi, "en lloguer"],
  [/\bpara comprar\b/gi, "per comprar"],
  [/\bpara alquilar\b/gi, "per llogar"],

  // Common verbs and transitions
  [/\bExclusivo ático dúplex\b/gi, "Exclusiu àtic dúplex"],
  [/\bExclusivo ático\b/gi, "Exclusiu àtic"],
  [/\bExclusivo piso\b/gi, "Exclusiu pis"],
  [/\bExclusivo\b/gi, "Exclusiu"],
  [/\bExclusiva\b/gi, "Exclusiva"],
  [/\bEspectacular piso reformado\b/gi, "Espectacular pis reformat"],
  [/\bEspectacular piso\b/gi, "Espectacular pis"],
  [/\bEspectacular ático dúplex\b/gi, "Espectacular àtic dúplex"],
  [/\bEspectacular ático\b/gi, "Espectacular àtic"],
  [/\bEspectacular\b/gi, "Espectacular"],
  [/\bAcogedor apartamento\b/gi, "Acollidor apartament"],
  [/\bAcogedor\b/gi, "Acollidor"],
  [/\bAcogedora\b/gi, "Acollidora"],
  [/\bMagnífica vivienda\b/gi, "Magnífica vivenda"],
  [/\bMagnífico piso\b/gi, "Magnífic pis"],
  [/\bMagnífico\b/gi, "Magnífic"],
  [/\bMagnífica\b/gi, "Magnífica"],
  [/\bVivienda familiar espaciosa\b/gi, "Vivenda familiar espaiosa"],
  [/\bVivienda familiar\b/gi, "Vivenda familiar"],
  [/\bVivienda\b/gi, "Vivenda"],
  [/\bPrecioso piso exterior\b/gi, "Preciós pis exterior"],
  [/\bPrecioso piso\b/gi, "Preciós pis"],
  [/\bPrecioso\b/gi, "Preciós"],
  [/\bPreciosa\b/gi, "Preciosa"],
  [/\bMajestuoso chalet\b/gi, "Majestuós xalet"],
  [/\bMajestuoso\b/gi, "Majestuós"],

  [/\bDispone de\b/gi, "Disposa de"],
  [/\bdispone de\b/gi, "disposa de"],
  [/\bDisponen de\b/gi, "Disposen de"],
  [/\bdisponen de\b/gi, "disposen de"],
  [/\bCuenta con\b/gi, "Compta amb"],
  [/\bcuenta con\b/gi, "compta amb"],
  [/\bCuentan con\b/gi, "Compten amb"],
  [/\bcuentan con\b/gi, "compten amb"],
  [/\bOfrece\b/gi, "Ofereix"],
  [/\bofrece\b/gi, "ofereix"],
  [/\bConsta de\b/gi, "Consta de"],
  [/\bconsta de\b/gi, "consta de"],
  [/\bEncontramos\b/gi, "Trobem"],
  [/\bencontramos\b/gi, "trobem"],
  [/\bDestaca por\b/gi, "Destaca per"],
  [/\bdestaca por\b/gi, "destaca per"],

  // Adjectives & nouns
  [/\bcompletamente exterior\b/gi, "completament exterior"],
  [/\btotalmente exterior\b/gi, "totalment exterior"],
  [/\bcompletamente reformado\b/gi, "completament reformat"],
  [/\bcompletamente reformada\b/gi, "completament reformada"],
  [/\btotalmente reformado\b/gi, "totalment reformat"],
  [/\btotalmente reformada\b/gi, "totalment reformada"],
  [/\breformado recientemente\b/gi, "reformat recentment"],
  [/\breformada recientemente\b/gi, "reformada recentment"],
  [/\breformado a estrenar\b/gi, "reformat a estrenar"],
  [/\ba estrenar\b/gi, "a estrenar"],
  [/\ba reformar\b/gi, "per reformar"],
  [/\bpara reformar\b/gi, "per reformar"],
  [/\breformado\b/gi, "reformat"],
  [/\breformada\b/gi, "reformada"],
  [/\breformados\b/gi, "reformats"],
  [/\breformadas\b/gi, "reformades"],
  [/\bclimatizado\b/gi, "climatitzat"],
  [/\bamueblado\b/gi, "moblat"],
  [/\bamueblada\b/gi, "moblada"],
  [/\bdespacho\b/gi, "despatx"],
  [/\btrastero incluido\b/gi, "traster inclòs"],
  [/\btrastero\b/gi, "traster"],
  [/\bgaraje\b/gi, "garatge"],
  [/\bparking\b/gi, "pàrquing"],
  [/\bbalcón\b/gi, "balcó"],
  [/\bbalcon\b/gi, "balcó"],
  [/\bterraza\b/gi, "terrassa"],
  [/\bterrazas\b/gi, "terrasses"],
  [/\bbaño\b/gi, "bany"],
  [/\bbaños\b/gi, "banys"],
  [/\bdormitorio\b/gi, "dormitori"],
  [/\bdormitorios dobles\b/gi, "dormitoris dobles"],
  [/\bdormitorios\b/gi, "dormitoris"],
  [/\bhabitación doble\b/gi, "habitació doble"],
  [/\bhabitaciones dobles\b/gi, "habitacions dobles"],
  [/\bhabitaciones\b/gi, "habitacions"],
  [/\bhabitación\b/gi, "habitació"],
  [/\bhabitacion\b/gi, "habitació"],
  [/\bplanta baja\b/gi, "planta baixa"],
  [/\bprimera planta\b/gi, "primera planta"],
  [/\bsegunda planta\b/gi, "segona planta"],
  [/\btercera planta\b/gi, "tercera planta"],
  [/\bcuarta planta\b/gi, "quarta planta"],
  [/\bquinta planta\b/gi, "cinquena planta"],
  [/\bplanta principal\b/gi, "planta principal"],
  [/\bplanta\b/gi, "planta"],
  [/\bático dúplex\b/gi, "àtic dúplex"],
  [/\bático\b/gi, "àtic"],
  [/\batico\b/gi, "àtic"],
  [/\bduplex\b/gi, "dúplex"],
  [/\bpiso\b/gi, "pis"],
  [/\bpisos\b/gi, "pisos"],
  [/\bapartamento\b/gi, "apartament"],
  [/\bapartamentos\b/gi, "apartaments"],
  [/\blocal comercial\b/gi, "local comercial"],
  [/\blocal\b/gi, "local"],
  [/\bchalet independiente\b/gi, "xalet independent"],
  [/\bchalet\b/gi, "xalet"],
  [/\boficina\b/gi, "oficina"],
  [/\boficinas\b/gi, "oficines"],

  // Modifiers and prepositions
  [/\bluminoso\b/gi, "lluminós"],
  [/\bluminosa\b/gi, "lluminosa"],
  [/\bmuy luminoso\b/gi, "molt lluminós"],
  [/\bmuy luminosa\b/gi, "molt lluminosa"],
  [/\bamplio\b/gi, "ampli"],
  [/\bamplia\b/gi, "àmplia"],
  [/\bamplios\b/gi, "amplis"],
  [/\bamplias\b/gi, "àmplies"],
  [/\bespacioso\b/gi, "espaiós"],
  [/\bespaciosa\b/gi, "espaiosa"],
  [/\bespaciosos\b/gi, "espaiosos"],
  [/\bespaciosas\b/gi, "espaioses"],
  [/\bexterior\b/gi, "exterior"],
  [/\bexteriores\b/gi, "exteriors"],
  [/\binterior\b/gi, "interior"],
  [/\binteriores\b/gi, "interiors"],
  [/\bsoleado\b/gi, "assolellat"],
  [/\bsoleada\b/gi, "assolellada"],
  [/\btranquilo\b/gi, "tranquil"],
  [/\btranquila\b/gi, "tranquil·la"],
  [/\bcéntrico\b/gi, "cèntric"],
  [/\bcéntrica\b/gi, "cèntrica"],
  [/\bcalidad\b/gi, "qualitat"],
  [/\bmateriales de primera calidad\b/gi, "materials de primera qualitat"],
  [/\ben el barrio de\b/gi, "al barri de"],
  [/\ben la zona de\b/gi, "a la zona de"],
  [/\ben la zona\b/gi, "a la zona"],
  [/\ben el centro de\b/gi, "al centre de"],
  [/\ben el centro\b/gi, "al centre"],
  [/\bCentro\b/gi, "Centre"],
  [/\bcon\b/gi, "amb"],
  [/\by\b/gi, "i"]
];

const ES_TO_EN_RULES: [RegExp, string][] = [
  // Specific compound sentences & descriptions seen in properties
  [/\bsobre la ciudad y la sierra de Marina\b/gi, "over the city and the Marina mountain range"],
  [/\bsobre la ciudad\b/gi, "over the city"],
  [/\bla sierra de Marina\b/gi, "the Marina mountain range"],
  [/\ben pleno centro de\b/gi, "in the heart of"],
  [/\ben pleno centro\b/gi, "in the heart of town"],
  [/\ben pleno corazón de\b/gi, "in the heart of"],
  [/\blista para entrar a vivir\b/gi, "ready to move in"],
  [/\blisto para entrar a vivir\b/gi, "ready to move in"],
  [/\ba entrar a vivir\b/gi, "ready to move in"],
  [/\bpara entrar a vivir\b/gi, "ready to move in"],
  [/\ba 2 minutos de la parada de metro\b/gi, "2 minutes away from the metro station"],
  [/\ba escasos metros del\b/gi, "just steps away from"],
  [/\ba pocos metros del\b/gi, "a few meters from"],
  [/\ba pie de calle en zona de alto tránsito comercial\b/gi, "at street level in a prime high-footfall shopping area"],
  [/\ba pie de calle\b/gi, "at street level"],
  [/\balto tránsito comercial\b/gi, "high commercial footfall"],
  [/\bgran escaparate acristalado\b/gi, "large glazed showcase window"],
  [/\bgran escaparate\b/gi, "large showcase window"],
  [/\bfachada de\b/gi, "facade of"],
  [/\bjunto al parque fluvial\b/gi, "next to the river park"],
  [/\bjunto al\b/gi, "next to"],
  [/\bjunto a la\b/gi, "next to"],
  [/\bvistas abiertas\b/gi, "open views"],
  [/\bvistas despejadas\b/gi, "unobstructed views"],
  [/\bvistas panorámicas despejadas\b/gi, "unobstructed panoramic views"],
  [/\bvistas panorámicas\b/gi, "panoramic views"],
  [/\bvistas a la ciudad\b/gi, "city views"],
  [/\bcon vistas panorámicas\b/gi, "with panoramic views"],
  [/\bcon vistas\b/gi, "with views"],
  [/\bcon vistas al\b/gi, "with views of"],
  [/\bterraza solárium de\b/gi, "solarium terrace of"],
  [/\bterraza solárium\b/gi, "solarium terrace"],
  [/\bterraza solarium\b/gi, "solarium terrace"],
  [/\bterraza privada de\b/gi, "private terrace of"],
  [/\bterraza privada\b/gi, "private terrace"],
  [/\bgran terraza\b/gi, "large terrace"],
  [/\bcon gran terraza\b/gi, "with large terrace"],
  [/\bcon terraza\b/gi, "with terrace"],
  [/\bcon balcón orientado al sur\b/gi, "with south-facing balcony"],
  [/\borientado al sol\b/gi, "sun-facing"],
  [/\borientado al sur\b/gi, "south-facing"],
  [/\borientada al sol\b/gi, "sun-facing"],
  [/\borientada al sur\b/gi, "south-facing"],
  [/\bcon balcón\b/gi, "with balcony"],
  [/\bcon balcon\b/gi, "with balcony"],
  [/\bcon ascensor\b/gi, "with elevator"],
  [/\bcon parking\b/gi, "with parking"],
  [/\ben la misma finca\b/gi, "in the same building"],
  [/\bfinca semi-nueva\b/gi, "semi-new building"],
  [/\bfinca seminueva\b/gi, "semi-new building"],
  [/\bfinca con ascensor\b/gi, "building with elevator"],
  [/\bfinca cuidada\b/gi, "well-maintained building"],
  [/\bexcelente distribución\b/gi, "excellent layout"],
  [/\bexcelente orientación solar\b/gi, "excellent solar orientation"],
  [/\bexcelente orientación\b/gi, "excellent orientation"],
  [/\bexcelente iluminación natural\b/gi, "excellent natural light"],
  [/\bexcelente ubicación\b/gi, "prime location"],
  [/\bmuy luminoso gracias a sus grandes ventanales\b/gi, "very bright thanks to its large picture windows"],
  [/\bgracias a sus grandes ventanales\b/gi, "thanks to its large windows"],
  [/\bgrandes ventanales\b/gi, "large picture windows"],
  [/\bsalón muy luminoso\b/gi, "very bright living room"],
  [/\bsalón-comedor amplio\b/gi, "spacious living-dining room"],
  [/\bamplio salón-comedor\b/gi, "spacious living-dining room"],
  [/\bsalón comedor\b/gi, "living-dining room"],
  [/\bsalón-comedor\b/gi, "living-dining room"],
  [/\bsalón\b/gi, "living room"],
  [/\bcocina office independiente\b/gi, "independent eat-in kitchen"],
  [/\bcocina office\b/gi, "eat-in kitchen"],
  [/\bcocina reformada\b/gi, "renovated kitchen"],
  [/\bcocina totalmente equipada\b/gi, "fully equipped kitchen"],
  [/\bcocina equipada\b/gi, "equipped kitchen"],
  [/\bcocina americana\b/gi, "open-plan kitchen"],
  [/\bcocina\b/gi, "kitchen"],
  [/\barmarios empotrados\b/gi, "built-in wardrobes"],
  [/\bacabados de primera calidad\b/gi, "top-quality finishes"],
  [/\bacabados de calidad\b/gi, "quality finishes"],
  [/\bacabados de lujo\b/gi, "luxury finishes"],
  [/\bacabados premium\b/gi, "premium finishes"],
  [/\bluz natural todo el día\b/gi, "natural light all day"],
  [/\bluz natural\b/gi, "natural light"],
  [/\bcerca de colegios y comercios\b/gi, "close to schools and shops"],
  [/\bcerca de colegios\b/gi, "close to schools"],
  [/\bcerca de comercios\b/gi, "close to shops"],
  [/\bcerca de metro\b/gi, "near subway station"],
  [/\bcalefacción por radiadores\b/gi, "radiator heating"],
  [/\bcalefacción central\b/gi, "central heating"],
  [/\bcalefacción\b/gi, "heating"],
  [/\baire acondicionado central\b/gi, "central air conditioning"],
  [/\baire acondicionado\b/gi, "air conditioning"],
  [/\bsuelo de parquet natural\b/gi, "natural parquet flooring"],
  [/\bsuelo de parquet\b/gi, "parquet flooring"],
  [/\bsuelos de mosaico hidráulico restaurado\b/gi, "restored hydraulic tile floors"],
  [/\bmosaico hidráulico\b/gi, "hydraulic tile"],
  [/\bbóveda catalana restaurada\b/gi, "restored Catalan vault"],
  [/\bbóveda catalana\b/gi, "Catalan vault"],
  [/\bconserje 24h\b/gi, "24h concierge"],
  [/\bseguridad 24h\b/gi, "24h security"],
  [/\bgaraje en la misma finca\b/gi, "garage in the same building"],
  [/\bplaza de garaje doble incluida\b/gi, "double parking space included"],
  [/\bplaza de parking opcional\b/gi, "optional parking space"],
  [/\bplaza de parking\b/gi, "parking space"],
  [/\bplaza de garaje\b/gi, "garage space"],
  [/\bascensor directo\b/gi, "direct elevator"],
  [/\bsuite principal con vestidor\b/gi, "master suite with walk-in closet"],
  [/\bcon baño en suite\b/gi, "with en-suite bathroom"],
  [/\bgarantía de alquiler asegurada\b/gi, "secured rental guarantee"],
  [/\bpersiana motorizada\b/gi, "motorized shutter"],
  [/\bacceso pmr\b/gi, "disabled accessible"],
  [/\bsalida de humos\b/gi, "smoke vent extraction"],
  [/\bzona tranquila\b/gi, "quiet area"],
  [/\bzona céntrica\b/gi, "downtown area"],
  [/\bobra nueva\b/gi, "new construction"],
  [/\ben venta\b/gi, "for sale"],
  [/\ben alquiler\b/gi, "for rent"],
  [/\bpara comprar\b/gi, "for sale"],
  [/\bpara alquilar\b/gi, "for rent"],

  // Common verbs and transitions
  [/\bExclusivo ático dúplex\b/gi, "Exclusive duplex penthouse"],
  [/\bExclusivo ático\b/gi, "Exclusive penthouse"],
  [/\bExclusivo piso\b/gi, "Exclusive flat"],
  [/\bExclusivo\b/gi, "Exclusive"],
  [/\bExclusiva\b/gi, "Exclusive"],
  [/\bEspectacular piso reformado\b/gi, "Spectacular renovated flat"],
  [/\bEspectacular piso\b/gi, "Spectacular flat"],
  [/\bEspectacular ático dúplex\b/gi, "Spectacular duplex penthouse"],
  [/\bEspectacular ático\b/gi, "Spectacular penthouse"],
  [/\bEspectacular\b/gi, "Spectacular"],
  [/\bAcogedor apartamento\b/gi, "Cozy apartment"],
  [/\bAcogedor\b/gi, "Cozy"],
  [/\bAcogedora\b/gi, "Cozy"],
  [/\bMagnífica vivienda\b/gi, "Magnificent property"],
  [/\bMagnífico piso\b/gi, "Magnificent flat"],
  [/\bMagnífico\b/gi, "Magnificent"],
  [/\bMagnífica\b/gi, "Magnificent"],
  [/\bVivienda familiar espaciosa\b/gi, "Spacious family home"],
  [/\bVivienda familiar\b/gi, "Family home"],
  [/\bVivienda\b/gi, "Home"],
  [/\bPrecioso piso exterior\b/gi, "Beautiful exterior flat"],
  [/\bPrecioso piso\b/gi, "Beautiful flat"],
  [/\bPrecioso\b/gi, "Beautiful"],
  [/\bPreciosa\b/gi, "Beautiful"],
  [/\bMajestuoso chalet\b/gi, "Majestic villa"],
  [/\bMajestuoso\b/gi, "Majestic"],

  [/\bDispone de\b/gi, "It features"],
  [/\bdispone de\b/gi, "features"],
  [/\bDisponen de\b/gi, "They feature"],
  [/\bdisponen de\b/gi, "feature"],
  [/\bCuenta con\b/gi, "It has"],
  [/\bcuenta con\b/gi, "has"],
  [/\bCuentan con\b/gi, "They have"],
  [/\bcuentan con\b/gi, "have"],
  [/\bOfrece\b/gi, "It offers"],
  [/\bofrece\b/gi, "offers"],
  [/\bConsta de\b/gi, "It consists of"],
  [/\bconsta de\b/gi, "consists of"],
  [/\bEncontramos\b/gi, "We find"],
  [/\bencontramos\b/gi, "we find"],
  [/\bDestaca por\b/gi, "It stands out for"],
  [/\bdestaca por\b/gi, "stands out for"],

  // Adjectives & nouns
  [/\bcompletamente exterior\b/gi, "completely exterior"],
  [/\btotalmente exterior\b/gi, "fully exterior"],
  [/\bcompletamente reformado\b/gi, "completely renovated"],
  [/\bcompletamente reformada\b/gi, "completely renovated"],
  [/\btotalmente reformado\b/gi, "fully renovated"],
  [/\btotalmente reformada\b/gi, "fully renovated"],
  [/\breformado recientemente\b/gi, "recently renovated"],
  [/\breformada recientemente\b/gi, "recently renovated"],
  [/\breformado a estrenar\b/gi, "brand new renovated"],
  [/\ba estrenar\b/gi, "brand new"],
  [/\ba reformar\b/gi, "to renovate"],
  [/\bpara reformar\b/gi, "to renovate"],
  [/\breformado\b/gi, "renovated"],
  [/\breformada\b/gi, "renovated"],
  [/\breformados\b/gi, "renovated"],
  [/\breformadas\b/gi, "renovated"],
  [/\bclimatizado\b/gi, "air-conditioned"],
  [/\bamueblado\b/gi, "furnished"],
  [/\bamueblada\b/gi, "furnished"],
  [/\bdespacho\b/gi, "office room"],
  [/\btrastero incluido\b/gi, "storage room included"],
  [/\btrastero\b/gi, "storage room"],
  [/\bgaraje\b/gi, "garage"],
  [/\bparking\b/gi, "parking"],
  [/\bbalcón\b/gi, "balcony"],
  [/\bbalcon\b/gi, "balcony"],
  [/\bterraza\b/gi, "terrace"],
  [/\bterrazas\b/gi, "terraces"],
  [/\bbaño\b/gi, "bathroom"],
  [/\bbaños\b/gi, "bathrooms"],
  [/\bdormitorio\b/gi, "bedroom"],
  [/\bdormitorios dobles\b/gi, "double bedrooms"],
  [/\bdormitorios\b/gi, "bedrooms"],
  [/\bhabitación doble\b/gi, "double bedroom"],
  [/\bhabitaciones dobles\b/gi, "double bedrooms"],
  [/\bhabitaciones\b/gi, "rooms"],
  [/\bhabitación\b/gi, "room"],
  [/\bhabitacion\b/gi, "room"],
  [/\bplanta baja\b/gi, "ground floor"],
  [/\bprimera planta\b/gi, "first floor"],
  [/\bsegunda planta\b/gi, "second floor"],
  [/\btercera planta\b/gi, "third floor"],
  [/\bcuarta planta\b/gi, "fourth floor"],
  [/\bquinta planta\b/gi, "fifth floor"],
  [/\bplanta principal\b/gi, "main floor"],
  [/\bplanta\b/gi, "floor"],
  [/\bático dúplex\b/gi, "duplex penthouse"],
  [/\bático\b/gi, "penthouse"],
  [/\batico\b/gi, "penthouse"],
  [/\bduplex\b/gi, "duplex"],
  [/\bpiso\b/gi, "flat"],
  [/\bpisos\b/gi, "flats"],
  [/\bapartamento\b/gi, "apartment"],
  [/\bapartamentos\b/gi, "apartments"],
  [/\blocal comercial\b/gi, "commercial premises"],
  [/\blocal\b/gi, "premises"],
  [/\bchalet independiente\b/gi, "detached villa"],
  [/\bchalet\b/gi, "villa"],
  [/\boficina\b/gi, "office"],
  [/\boficinas\b/gi, "offices"],

  // Modifiers and prepositions
  [/\bluminoso\b/gi, "bright"],
  [/\bluminosa\b/gi, "bright"],
  [/\bmuy luminoso\b/gi, "very bright"],
  [/\bmuy luminosa\b/gi, "very bright"],
  [/\bamplio\b/gi, "spacious"],
  [/\bamplia\b/gi, "spacious"],
  [/\bamplios\b/gi, "spacious"],
  [/\bamplias\b/gi, "spacious"],
  [/\bespacioso\b/gi, "spacious"],
  [/\bespaciosa\b/gi, "spacious"],
  [/\bespaciosos\b/gi, "spacious"],
  [/\bespaciosas\b/gi, "spacious"],
  [/\bexterior\b/gi, "exterior"],
  [/\bexteriores\b/gi, "exterior"],
  [/\binterior\b/gi, "interior"],
  [/\binteriores\b/gi, "interior"],
  [/\bsoleado\b/gi, "sunny"],
  [/\bsoleada\b/gi, "sunny"],
  [/\btranquilo\b/gi, "quiet"],
  [/\btranquila\b/gi, "quiet"],
  [/\bcéntrico\b/gi, "central"],
  [/\bcéntrica\b/gi, "central"],
  [/\bcalidad\b/gi, "quality"],
  [/\bmateriales de primera calidad\b/gi, "top quality materials"],
  [/\ben el barrio de\b/gi, "in the neighborhood of"],
  [/\ben la zona de\b/gi, "in the area of"],
  [/\ben la zona\b/gi, "in the area"],
  [/\ben el centro de\b/gi, "in the center of"],
  [/\ben el centro\b/gi, "in the center"],
  [/\bCentro\b/gi, "Center"],
  [/\bcon\b/gi, "with"],
  [/\by\b/gi, "and"],
  [/\ben\b/gi, "in"]
];

export function autoTranslateText(text: string, targetLang: "es" | "ca" | "en"): string {
  if (!text) return "";
  if (targetLang === "es") return text;

  let result = text;
  const rules = targetLang === "ca" ? ES_TO_CA_RULES : ES_TO_EN_RULES;

  for (const [regex, replacement] of rules) {
    result = result.replace(regex, replacement);
  }

  // Capitalize the first letter if needed
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

// ==========================================
// 2. COMPREHENSIVE FEATURES MAP
// ==========================================
const FEATURE_MAP: Record<string, { ca: string; en: string }> = {
  // Elevators & Building
  "Ascensor": { ca: "Ascensor", en: "Elevator" },
  "Finca con ascensor": { ca: "Finca amb ascensor", en: "Building with elevator" },
  "Finca semi-nueva": { ca: "Finca seminova", en: "Semi-new building" },
  "Finca seminueva": { ca: "Finca seminova", en: "Semi-new building" },
  "Finca cuidada": { ca: "Finca cuidada", en: "Well-kept building" },
  "Finca règia": { ca: "Finca règia", en: "Stately building" },
  "Finca regia": { ca: "Finca règia", en: "Stately building" },
  "Ascensor directo": { ca: "Ascensor directe", en: "Direct elevator" },
  "Conserje 24h": { ca: "Conserge 24h", en: "24h Concierge" },
  "Seguridad 24h": { ca: "Seguretat 24h", en: "24h Security" },

  // Balconies & Terraces
  "Balcón": { ca: "Balcó", en: "Balcony" },
  "Balcon": { ca: "Balcó", en: "Balcony" },
  "Balcón exterior": { ca: "Balcó exterior", en: "Exterior balcony" },
  "Terraza": { ca: "Terrassa", en: "Terrace" },
  "Gran terraza": { ca: "Gran terrassa", en: "Large terrace" },
  "Terraza privada": { ca: "Terrassa privada", en: "Private terrace" },
  "Terraza privada 35m²": { ca: "Terrassa privada 35m²", en: "35m² Private terrace" },
  "Terraza privada 40m²": { ca: "Terrassa privada 40m²", en: "40m² Private terrace" },
  "Solárium privado 30m²": { ca: "Solàrium privat 30m²", en: "30m² Private solarium" },
  "Terraza solárium 35 m²": { ca: "Terrassa solàrium 35 m²", en: "35 m² Solarium terrace" },
  "Terraza solárium": { ca: "Terrassa solàrium", en: "Solarium terrace" },
  "Terraza solarium": { ca: "Terrassa solàrium", en: "Solarium terrace" },

  // Parking & Garage
  "Parking": { ca: "Pàrquing", en: "Parking" },
  "Plaza de parking": { ca: "Plaça de pàrquing", en: "Parking space" },
  "Plaza de parking opcional": { ca: "Plaça de pàrquing opcional", en: "Optional parking space" },
  "Plaza de garaje": { ca: "Plaça de garatge", en: "Garage space" },
  "Plaza de garaje doble": { ca: "Plaça de garatge doble", en: "Double garage space" },
  "Garaje en la misma finca": { ca: "Garatge a la mateixa finca", en: "Garage in the same building" },
  "Garaje para 3 coches": { ca: "Garatge per a 3 cotxes", en: "3-Car garage" },
  "Garaje": { ca: "Garatge", en: "Garage" },

  // Views & Orientation
  "Vistas despejadas": { ca: "Vistes clares", en: "Open views" },
  "Vistas buidades": { ca: "Vistes clares", en: "Open views" },
  "Vistas panorámicas": { ca: "Vistes panoràmiques", en: "Panoramic views" },
  "Vistas a la ciudad": { ca: "Vistes a la ciutat", en: "City views" },
  "Orientación Sur": { ca: "Orientació Sud", en: "South facing" },
  "Parque fluvial cercano": { ca: "Parc fluvial proper", en: "Nearby river park" },

  // Comfort & Climate
  "Piscina": { ca: "Piscina", en: "Swimming pool" },
  "Piscina comunitaria": { ca: "Piscina comunitària", en: "Community pool" },
  "Piscina privada": { ca: "Piscina privada", en: "Private pool" },
  "Calefacción": { ca: "Calefacció", en: "Heating" },
  "Calefaccion": { ca: "Calefacció", en: "Heating" },
  "Calefacción por radiadores": { ca: "Calefacció per radiadors", en: "Radiator heating" },
  "Calefacción central": { ca: "Calefacció central", en: "Central heating" },
  "Aire acondicionado": { ca: "Aire condicionat", en: "Air conditioning" },
  "Aire acondicionado central": { ca: "Aire condicionat central", en: "Central air conditioning" },
  "Trastero": { ca: "Traster", en: "Storage room" },
  "Trastero incluido": { ca: "Traster inclòs", en: "Storage room included" },

  // Quality & Features
  "Exterior": { ca: "Exterior", en: "Exterior" },
  "Luminoso": { ca: "Lluminós", en: "Bright" },
  "Muy luminoso": { ca: "Molt lluminós", en: "Very bright" },
  "Luz natural": { ca: "Llum natural", en: "Natural light" },
  "Luz natural todo el día": { ca: "Llum natural tot el dia", en: "Natural light all day" },
  "Mucha luz natural": { ca: "Molta llum natural", en: "Abundant natural light" },
  "Totalmente reformado": { ca: "Totalment reformat", en: "Fully renovated" },
  "Reformado": { ca: "Reformat", en: "Renovated" },
  "Reformado a estrenar": { ca: "Reformat a estrenar", en: "Brand new renovation" },
  "Reformat per estrenar": { ca: "Reformat a estrenar", en: "Brand new renovation" },
  "A reformar": { ca: "Per reformar", en: "To renovate" },
  "Amueblado": { ca: "Moblat", en: "Furnished" },
  "Cocina equipada": { ca: "Cuina equipada", en: "Equipped kitchen" },
  "Cocina office": { ca: "Cuina office", en: "Eat-in kitchen" },
  "Cocina reformada": { ca: "Cuina reformada", en: "Renovated kitchen" },
  "Cocina americana": { ca: "Cuina americana", en: "Open kitchen" },
  "Armarios empotrados": { ca: "Armaris encastats", en: "Built-in wardrobes" },
  "Armaris de paret": { ca: "Armaris encastats", en: "Built-in wardrobes" },
  "Suelo de parquet": { ca: "Terra de parquet", en: "Parquet floor" },
  "Suelo de parquet natural": { ca: "Terra de parquet natural", en: "Natural parquet floor" },
  "Carpintería de aluminio": { ca: "Fusteria d'alumini", en: "Aluminum carpentry" },
  "Puerta blindada": { ca: "Porta blindada", en: "Reinforced door" },
  "Ventanas Climalit oscilobatientes": { ca: "Finestres Climalit oscil·lobatents", en: "Tilt-and-turn double glazed windows" },
  "Bóveda catalana restaurada": { ca: "Volta catalana restaurada", en: "Restored Catalan vault" },
  "Acabados premium": { ca: "Acabats prèmium", en: "Premium finishes" },
  "Acabats prèmium": { ca: "Acabats prèmium", en: "Premium finishes" },
  "Doble altura": { ca: "Doble alçada", en: "Double height ceiling" },
  "Suite principal con vestidor": { ca: "Suite principal amb vestidor", en: "Master suite with walk-in closet" },

  // Location & Commercial
  "Cerca de metro": { ca: "A prop del metro", en: "Near subway" },
  "Cerca de metro L9N": { ca: "A prop del metro L9N", en: "Near subway L9N" },
  "A prop de metro": { ca: "A prop del metro", en: "Near subway" },
  "Zona céntrica": { ca: "Zona cèntrica", en: "Downtown area" },
  "Zona tranquila": { ca: "Zona tranquil·la", en: "Quiet area" },
  "Cerca de colegios y comercios": { ca: "A prop d'escoles i comerços", en: "Near schools and shops" },
  "Garantía de alquiler asegurada": { ca: "Garantia de lloguer assegurada", en: "Secured rental guarantee" },
  "Pie de calle": { ca: "A peu de carrer", en: "Street level" },
  "Gran escaparate": { ca: "Gran aparador", en: "Large showcase window" },
  "Persiana motorizada": { ca: "Persiana motoritzada", en: "Motorized shutter" },
  "Acceso PMR": { ca: "Accés PMR", en: "Disabled access" },
  "Salida de humos": { ca: "Sortida de fums", en: "Smoke extraction" },
  "Alta rentabilidad": { ca: "Alta rendibilitat", en: "High yield" },
  "Alta rendibilitat": { ca: "Alta rendibilitat", en: "High yield" },
  "Zona muy turística": { ca: "Zona molt turística", en: "Touristic hotspot" },
  "Fachada de 6 metros": { ca: "Façana de 6 metres", en: "6-meter facade" },
  "Inversión asegurada": { ca: "Inversió assegurada", en: "Secure investment" },
  "Inversió segura": { ca: "Inversió segura", en: "Secure investment" },
  "Red de fibra instalada": { ca: "Xarxa de fibra instal·lada", en: "Fiber network installed" },
  "Mosaic hidràulic": { ca: "Mosaic hidràulic", en: "Hydraulic mosaic" },
  "Mosaico hidráulico": { ca: "Mosaic hidràulic", en: "Hydraulic mosaic" },
  "3 dormitorios": { ca: "3 dormitoris", en: "3 bedrooms" },
  "Jardín 800m²": { ca: "Jardí 800m²", en: "800m² Garden" },
  "Bodega": { ca: "Celler", en: "Wine cellar" },
  "Celler": { ca: "Celler", en: "Wine cellar" }
};

export function translateFeature(feat: string, language: "es" | "ca" | "en"): string {
  if (!feat || language === "es") return feat;
  const match = FEATURE_MAP[feat.trim()];
  if (match) {
    return language === "ca" ? match.ca : match.en;
  }
  return autoTranslateText(feat, language);
}

// Floor / height translation helper
function translateFloor(floor: string | undefined, language: "es" | "ca" | "en"): string | undefined {
  if (!floor || language === "es") return floor;
  return autoTranslateText(floor, language);
}

export function getTranslatedProperty(
  property: ExtendedProperty,
  language: "es" | "ca" | "en",
  translationsDict?: Record<string, any>
): {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  floor?: string;
  features: string[];
} {
  let name = property.name;
  let description = property.description;

  // 1. Look up explicitly saved translations or translationsDict if available
  const dictItem = translationsDict && translationsDict[property.id];

  if (language === "ca") {
    if (property.name_ca && property.name_ca.trim() !== "" && property.name_ca !== property.name) {
      name = property.name_ca;
    } else if (dictItem && dictItem.name) {
      name = dictItem.name;
    } else {
      name = autoTranslateText(property.name, "ca");
    }

    if (property.description_ca && property.description_ca.trim() !== "" && property.description_ca !== property.description) {
      description = property.description_ca;
    } else if (dictItem && dictItem.description) {
      description = dictItem.description;
    } else {
      description = autoTranslateText(property.description, "ca");
    }
  } else if (language === "en") {
    if (property.name_en && property.name_en.trim() !== "" && property.name_en !== property.name) {
      name = property.name_en;
    } else if (dictItem && dictItem.name) {
      name = dictItem.name;
    } else {
      name = autoTranslateText(property.name, "en");
    }

    if (property.description_en && property.description_en.trim() !== "" && property.description_en !== property.description) {
      description = property.description_en;
    } else if (dictItem && dictItem.description) {
      description = dictItem.description;
    } else {
      description = autoTranslateText(property.description, "en");
    }
  }

  let typeStr = property.type as string;
  if (language === "ca") {
    if (typeStr === "Piso") typeStr = "Pis";
    else if (typeStr === "Ático" || typeStr === "Atico") typeStr = "Àtic";
    else if (typeStr === "Apartamento") typeStr = "Apartament";
    else if (typeStr === "Local comercial") typeStr = "Local comercial";
    else if (typeStr === "Chalet") typeStr = "Xalet";
    else if (typeStr === "Oficina") typeStr = "Oficina";
  } else if (language === "en") {
    if (typeStr === "Piso") typeStr = "Flat";
    else if (typeStr === "Ático" || typeStr === "Atico") typeStr = "Penthouse";
    else if (typeStr === "Apartamento") typeStr = "Apartment";
    else if (typeStr === "Local comercial") typeStr = "Commercial premises";
    else if (typeStr === "Chalet") typeStr = "Villa";
    else if (typeStr === "Oficina") typeStr = "Office";
  }

  // Translate features list
  let translatedFeatures: string[] = [];
  if (language !== "es" && dictItem && Array.isArray(dictItem.features) && dictItem.features.length > 0) {
    translatedFeatures = dictItem.features;
  } else {
    const rawFeatures = property.features || [];
    translatedFeatures = rawFeatures.map((feat) => translateFeature(feat, language));
  }

  // Translate floor
  const floorTranslated = translateFloor(property.floor, language);

  return {
    id: property.id,
    name,
    type: typeStr,
    location: formatLocationDirect(property.location, language),
    description,
    floor: floorTranslated,
    features: translatedFeatures
  };
}

