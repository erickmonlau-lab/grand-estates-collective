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

// Real-estate keyword dictionary for automated title and description translations
const ES_TO_CA_RULES: [RegExp, string][] = [
  [/\bPiso\b/gi, "Pis"],
  [/\bÁtico\b/gi, "Àtic"],
  [/\bAtico\b/gi, "Àtic"],
  [/\bApartamento\b/gi, "Apartament"],
  [/\bLocal comercial\b/gi, "Local comercial"],
  [/\bChalet\b/gi, "Xalet"],
  [/\bOficina\b/gi, "Oficina"],
  [/\breformado\b/gi, "reformat"],
  [/\breformada\b/gi, "reformada"],
  [/\bluminoso\b/gi, "lluminós"],
  [/\bluminosa\b/gi, "lluminosa"],
  [/\bamplio\b/gi, "ampli"],
  [/\bamplia\b/gi, "àmplia"],
  [/\bcon gran terraza\b/gi, "amb gran terrassa"],
  [/\bcon terraza\b/gi, "amb terrassa"],
  [/\bcon balcón\b/gi, "amb balcó"],
  [/\bcon balcon\b/gi, "amb balcó"],
  [/\bcon ascensor\b/gi, "amb ascensor"],
  [/\bcon parking\b/gi, "amb pàrquing"],
  [/\bcon vistas\b/gi, "amb vistes"],
  [/\bexterior\b/gi, "exterior"],
  [/\bobra nueva\b/gi, "obra nova"],
  [/\ben venta\b/gi, "en venda"],
  [/\ben alquiler\b/gi, "en lloguer"],
  [/\bCentro\b/gi, "Centre"],
  [/\ben\b/gi, "a"]
];

const ES_TO_EN_RULES: [RegExp, string][] = [
  [/\bPiso\b/gi, "Flat"],
  [/\bÁtico\b/gi, "Penthouse"],
  [/\bAtico\b/gi, "Penthouse"],
  [/\bApartamento\b/gi, "Apartment"],
  [/\bLocal comercial\b/gi, "Commercial premises"],
  [/\bChalet\b/gi, "Villa"],
  [/\bOficina\b/gi, "Office"],
  [/\breformado\b/gi, "renovated"],
  [/\breformada\b/gi, "renovated"],
  [/\bluminoso\b/gi, "bright"],
  [/\bluminosa\b/gi, "bright"],
  [/\bamplio\b/gi, "spacious"],
  [/\bamplia\b/gi, "spacious"],
  [/\bcon gran terraza\b/gi, "with large terrace"],
  [/\bcon terraza\b/gi, "with terrace"],
  [/\bcon balcón\b/gi, "with balcony"],
  [/\bcon balcon\b/gi, "with balcony"],
  [/\bcon ascensor\b/gi, "with elevator"],
  [/\bcon parking\b/gi, "with parking"],
  [/\bcon vistas\b/gi, "with views"],
  [/\bexterior\b/gi, "exterior"],
  [/\bobra nueva\b/gi, "new construction"],
  [/\ben venta\b/gi, "for sale"],
  [/\ben alquiler\b/gi, "for rent"],
  [/\bCentro\b/gi, "Center"],
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

  return result;
}

const FEATURE_MAP: Record<string, { ca: string; en: string }> = {
  "Ascensor": { ca: "Ascensor", en: "Elevator" },
  "Finca con ascensor": { ca: "Finca amb ascensor", en: "Building with elevator" },
  "Balcón": { ca: "Balcó", en: "Balcony" },
  "Balcon": { ca: "Balcó", en: "Balcony" },
  "Terraza": { ca: "Terrassa", en: "Terrace" },
  "Gran terraza": { ca: "Gran terrassa", en: "Large terrace" },
  "Terraza privada": { ca: "Terrassa privada", en: "Private terrace" },
  "Parking": { ca: "Pàrquing", en: "Parking" },
  "Garaje": { ca: "Garatge", en: "Garage" },
  "Piscina": { ca: "Piscina", en: "Swimming pool" },
  "Piscina comunitaria": { ca: "Piscina comunitària", en: "Community pool" },
  "Calefacción": { ca: "Calefacció", en: "Heating" },
  "Calefaccion": { ca: "Calefacció", en: "Heating" },
  "Aire acondicionado": { ca: "Aire condicionat", en: "Air conditioning" },
  "Trastero": { ca: "Traster", en: "Storage room" },
  "Exterior": { ca: "Exterior", en: "Exterior" },
  "Luminoso": { ca: "Lluminós", en: "Bright" },
  "Muy luminoso": { ca: "Molt lluminós", en: "Very bright" },
  "Reformado": { ca: "Reformat", en: "Renovated" },
  "A reformar": { ca: "Per reformar", en: "To renovate" },
  "Amueblado": { ca: "Moblat", en: "Furnished" },
  "Cocina equipada": { ca: "Cuina equipada", en: "Equipped kitchen" },
  "Vistas despejadas": { ca: "Vistes clares", en: "Open views" },
  "Cerca de metro": { ca: "A prop de metro", en: "Near subway" },
  "Zona céntrica": { ca: "Zona cèntrica", en: "Downtown area" },
  "Armarios empotrados": { ca: "Armaris encastats", en: "Built-in wardrobes" },
  "Suelo de parquet": { ca: "Terra de parquet", en: "Parquet floor" },
  "Carpintería de aluminio": { ca: "Fusteria d'alumini", en: "Aluminum carpentry" },
  "Puerta blindada": { ca: "Porta blindada", en: "Reinforced door" },
};

export function translateFeature(feat: string, language: "es" | "ca" | "en"): string {
  if (!feat || language === "es") return feat;
  const match = FEATURE_MAP[feat.trim()];
  if (match) {
    return language === "ca" ? match.ca : match.en;
  }
  return autoTranslateText(feat, language);
}

export function getTranslatedProperty(
  property: ExtendedProperty,
  language: "es" | "ca" | "en",
  _translationsDict?: Record<string, any>
): {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  features: string[];
} {
  let name = property.name;
  let description = property.description;

  if (language === "ca") {
    name = property.name_ca && property.name_ca !== property.name 
      ? property.name_ca 
      : autoTranslateText(property.name, "ca");
    description = property.description_ca && property.description_ca !== property.description
      ? property.description_ca
      : autoTranslateText(property.description, "ca");
  } else if (language === "en") {
    name = property.name_en && property.name_en !== property.name
      ? property.name_en
      : autoTranslateText(property.name, "en");
    description = property.description_en && property.description_en !== property.description
      ? property.description_en
      : autoTranslateText(property.description, "en");
  }

  let typeStr = property.type as string;
  if (language === "ca") {
    if (typeStr === "Piso") typeStr = "Pis";
    else if (typeStr === "Ático" || typeStr === "Atico") typeStr = "Àtic";
    else if (typeStr === "Apartamento") typeStr = "Apartament";
    else if (typeStr === "Chalet") typeStr = "Xalet";
  } else if (language === "en") {
    if (typeStr === "Piso") typeStr = "Flat";
    else if (typeStr === "Ático" || typeStr === "Atico") typeStr = "Penthouse";
    else if (typeStr === "Apartamento") typeStr = "Apartment";
    else if (typeStr === "Local comercial") typeStr = "Commercial premises";
    else if (typeStr === "Chalet") typeStr = "Villa";
    else if (typeStr === "Oficina") typeStr = "Office";
  }

  const rawFeatures = property.features || [];
  const translatedFeatures = rawFeatures.map(feat => translateFeature(feat, language));

  return {
    id: property.id,
    name,
    type: typeStr,
    location: formatLocationDirect(property.location, language),
    description,
    features: translatedFeatures
  };
}
