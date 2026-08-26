import type { ExtendedProperty } from "./propertyStore";
import { formatLocation } from "@/data/properties";

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

  return {
    id: property.id,
    name,
    type: typeStr,
    location: formatLocation(property.location, language),
    description,
    features: property.features || []
  };
}
