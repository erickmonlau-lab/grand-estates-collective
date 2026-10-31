/**
 * Sistema Unificado de Zonas, Barrios y Municipios de Gesgrama
 * Incluye los municipios autorizados del área de Barcelona y su corona metropolitana,
 * además de soporte nativo para seleccionar "Otro municipio" e introducir cualquier municipio personalizado.
 */

export interface MunicipalityConfig {
  name: string;
  defaultZones: string[];
}

export const MUNICIPALITIES: Record<string, MunicipalityConfig> = {
  "Santa Coloma de Gramenet": {
    name: "Santa Coloma de Gramenet",
    defaultZones: [
      "Centre",
      "Santa Rosa",
      "Can Mariner",
      "Fondo",
      "Singuerlín",
      "Riera Alta",
      "Llatí",
      "El Raval",
      "Riu Nord",
      "Riu Sud",
      "Can Franquesa",
      "Les Oliveres",
      "La Guinardera",
      "Cementiri Vell"
    ]
  },
  "Barcelona": {
    name: "Barcelona",
    defaultZones: [
      "Sant Andreu",
      "Sagrera",
      "Nou Barris",
      "Horta-Guinardó",
      "Sant Martí",
      "Clot",
      "Poblenou",
      "Eixample",
      "Gràcia",
      "Ciutat Vella",
      "Sants-Montjuïc",
      "Sarrià-Sant Gervasi",
      "Les Corts"
    ]
  },
  "Badalona": {
    name: "Badalona",
    defaultZones: [
      "Centre Badalona",
      "Progrés",
      "Llefià",
      "La Salut",
      "Sistrells",
      "Bufalà",
      "Morera",
      "Montigalà",
      "Pomar",
      "Canyadó",
      "Casagemes",
      "Port de Badalona",
      "Gorg"
    ]
  },
  "Sant Adrià de Besòs": {
    name: "Sant Adrià de Besòs",
    defaultZones: [
      "Sant Adrià Nord",
      "Sant Joan Baptista",
      "La Catalana",
      "Besòs",
      "La Mina"
    ]
  },
  "Montcada i Reixac": {
    name: "Montcada i Reixac",
    defaultZones: [
      "Montcada Centre",
      "Can Sant Joan",
      "Terra Nostra",
      "Mas Rampinyo"
    ]
  },
  "L'Hospitalet de Llobregat": {
    name: "L'Hospitalet de Llobregat",
    defaultZones: [
      "Centre",
      "Collblanc",
      "Santa Eulàlia",
      "Bellvitge",
      "Pubilla Cases",
      "La Florida"
    ]
  },
  "Cornellà de Llobregat": {
    name: "Cornellà de Llobregat",
    defaultZones: [
      "Centre",
      "Almeda",
      "Riera",
      "Gavarra",
      "Sant Ildefons"
    ]
  },
  "Esplugues de Llobregat": {
    name: "Esplugues de Llobregat",
    defaultZones: [
      "Centre",
      "La Plana",
      "Can Vidalet",
      "Finestrelles",
      "Ciutat Diagonal"
    ]
  },
  "Sant Cugat del Vallès": {
    name: "Sant Cugat del Vallès",
    defaultZones: [
      "Centre",
      "Valldoreix",
      "Mirassol",
      "La Floresta",
      "Volpelleres"
    ]
  },
  "Sabadell": {
    name: "Sabadell",
    defaultZones: [
      "Centre",
      "Creu Alta",
      "Gràcia",
      "Can Rull",
      "Ca n'Oriac"
    ]
  },
  "Terrassa": {
    name: "Terrassa",
    defaultZones: [
      "Centre",
      "Ca n'Aurell",
      "Sant Pere",
      "Vallparadís",
      "Can Roca"
    ]
  },
  "Mataró": {
    name: "Mataró",
    defaultZones: [
      "Centre",
      "Havana",
      "Pla d'en Boet",
      "Cerdanyola",
      "Cirera"
    ]
  }
};

export const DEFAULT_MUNICIPALITY = "Santa Coloma de Gramenet";

/**
 * Obtiene la lista combinada de municipios autorizados y existentes en propiedades.
 */
export function getAllAvailableMunicipalities(existingPropertiesCities: string[] = []): string[] {
  const set = new Set<string>(Object.keys(MUNICIPALITIES));
  existingPropertiesCities.forEach((c) => {
    if (c && typeof c === "string" && c.trim()) {
      set.add(c.trim());
    }
  });
  return Array.from(set);
}

/**
 * Obtiene la lista combinada de zonas sugeridas para un municipio,
 * combinando las zonas predeterminadas con las que ya existan en las propiedades.
 */
export function getAvailableZonesForMunicipality(
  municipalityName: string,
  existingPropertiesLocations: string[] = []
): string[] {
  const predefined = MUNICIPALITIES[municipalityName]?.defaultZones || [];
  const set = new Set<string>(predefined);
  
  // Agregar cualquier ubicación ya existente que pertenezca a este municipio
  existingPropertiesLocations.forEach((loc) => {
    if (loc && typeof loc === "string" && loc.trim()) {
      set.add(loc.trim());
    }
  });

  return Array.from(set).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
}
