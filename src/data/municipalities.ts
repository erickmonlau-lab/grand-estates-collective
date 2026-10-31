/**
 * Sistema Unificado de Zonas, Barrios y Municipios de Gesgrama
 * Permite seleccionar municipios principales y barrios preconfigurados,
 * o dar de alta zonas personalizadas sobre la marcha.
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
  }
};

export const DEFAULT_MUNICIPALITY = "Santa Coloma de Gramenet";

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
