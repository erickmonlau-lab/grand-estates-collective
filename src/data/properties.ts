import property1 from "@/assets/property-1.webp";
import property2 from "@/assets/property-2_min.webp";
import property3 from "@/assets/property-3_min.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import brightAtrium from "@/assets/bright_atrium_opt.webp";
import modernOfficeImg from "/images/modern_office_space.webp";

export type PropertyType = "Piso" | "Apartamento" | "Ático" | "Local comercial" | "Chalet" | "Oficina" | "Todos";

export interface Property {
  id: string;
  slug: string;
  ref: string;
  name: string;
  type: PropertyType;
  location: string;
  city?: string;
  price: number;
  priceFormatted: string;
  specs: string;
  bedrooms: number;
  bathrooms: number;
  surface: number; // m2
  floor?: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  operation?: "comprar" | "alquilar";
  videoUrl?: string;
}

export const SANTA_COLOMA_ZONES = [
  "Santa Rosa - Can Mariner",
  "Fondo",
  "Riu",
  "Centro",
  "El Raval",
  "Riera Alta - Llatí",
  "Singuerlín"
];

export const ALL_LOCATIONS = [...SANTA_COLOMA_ZONES];

export function formatLocation(loc: string, language: string): string {
  if (!loc) return "";
  const normalized = loc.trim();
  if (normalized.startsWith("Santa Rosa")) {
    return "Santa Rosa";
  }
  if (normalized === "Centre" || normalized === "Centro" || normalized === "Center") {
    if (language === "ca") return "Centre";
    if (language === "en") return "Center";
    return "Centro";
  }
  return loc;
}

export const properties: Property[] = [
  {
    id: "prop-1",
    slug: "piso-reformado-riera-alta-llati",
    ref: "API A10750",
    name: "Piso reformado en Riera Alta - Llatí",
    type: "Piso",
    location: "Riera Alta - Llatí",
    city: "Santa Coloma de Gramenet",
    price: 1200,
    priceFormatted: "1.200 €/mes",
    specs: "3 hab. · 2 baños · 110 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 110,
    floor: "4ª planta con ascensor",
    description: "Espectacular piso reformado en la zona de Riera Alta - Llatí en Santa Coloma de Gramenet. Cuenta con un salón muy luminoso gracias a sus grandes ventanales.",
    features: ["Bóveda catalana restaurada", "Aire acondicionado central", "Suelo de parquet natural", "Conserje 24h"],
    image: property1,
    gallery: [property1, gallery1, gallery2],
    operation: "alquilar"
  },
  {
    id: "prop-2",
    slug: "apartamento-exterior-singuerlin",
    ref: "AE13639",
    name: "Apartamento exterior reformado",
    type: "Apartamento",
    location: "Singuerlín",
    city: "Santa Coloma de Gramenet",
    price: 150000,
    priceFormatted: "150.000 €",
    specs: "2 hab. · 1 baño · 68 m²",
    bedrooms: 2,
    bathrooms: 1,
    surface: 68,
    floor: "2ª planta con ascensor",
    description: "Acogedor apartamento completamente exterior en el barrio de Singuerlín (Santa Coloma). Reformado con acabados de calidad, cocina equipada y balcón orientado al sur.",
    features: ["Totalmente reformado", "Balcón exterior", "Calefacción por radiadores", "Cerca de metro L9N"],
    image: property2,
    gallery: [property2, gallery3, gallery1],
    operation: "comprar",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "prop-3",
    slug: "atico-duplex-centro-santa-coloma",
    ref: "PJ2024",
    name: "Ático dúplex con gran terraza",
    type: "Ático",
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 395000,
    priceFormatted: "395.000 €",
    specs: "3 hab. · 2 baños · 105 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 105,
    floor: "Ático 4ª planta",
    description: "Exclusivo ático en la zona Centre de Santa Coloma de Gramenet. Dispone de terraza privada de 35 m² orientada al sol con vistas panorámicas despejadas.",
    features: ["Terraza privada 35m²", "Finca semi-nueva", "Ascensor", "Garaje en la misma finca"],
    image: property3,
    gallery: [property3, gallery2, gallery3],
    operation: "comprar"
  },
  {
    id: "prop-4",
    slug: "piso-luminoso-santa-rosa-can-mariner",
    ref: "API A20892",
    name: "Piso luminoso en Santa Rosa",
    type: "Piso",
    location: "Santa Rosa - Can Mariner",
    city: "Santa Coloma de Gramenet",
    price: 950,
    priceFormatted: "950 €/mes",
    specs: "3 hab. · 2 baños · 92 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 92,
    floor: "3ª planta con ascensor",
    description: "Vivienda familiar lista para entrar a vivir en Santa Rosa - Can Mariner. Excelente distribución con amplio salón-comedor, cocina office y armarios empotrados.",
    features: ["Garantía de alquiler asegurada", "Cocina office", "Aire acondicionado", "Zona tranquila"],
    image: gallery1,
    gallery: [gallery1, property1, gallery2],
    operation: "alquilar"
  },
  {
    id: "prop-5",
    slug: "piso-familiar-fondo",
    ref: "AEI1780",
    name: "Piso familiar amplio en Fondo",
    type: "Piso",
    location: "Fondo",
    city: "Santa Coloma de Gramenet",
    price: 149000,
    priceFormatted: "149.000 €",
    specs: "3 hab. · 1 baño · 82 m²",
    bedrooms: 3,
    bathrooms: 1,
    surface: 82,
    floor: "1ª planta con ascensor",
    description: "Vivienda familiar espaciosa en Fondo, a 2 minutos de la parada de metro L1 y L9N. Dispone de salón-comedor amplio, 3 dormitorios y cocina reformada.",
    features: ["3 dormitorios", "Finca con ascensor", "Cocina reformada", "Luz natural todo el día", "Cerca de colegios y comercios"],
    image: brightAtrium,
    gallery: [brightAtrium, gallery1, property2],
    operation: "comprar"
  },
  {
    id: "prop-6",
    slug: "local-comercial-avenida-banus",
    ref: "PJ2029",
    name: "Local comercial céntrico",
    type: "Local comercial",
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 1800,
    priceFormatted: "1.800 €/mes",
    specs: "0 hab. · 1 baño · 75 m²",
    bedrooms: 0,
    bathrooms: 1,
    surface: 75,
    floor: "Planta baja",
    description: "Local comercial céntrico en Santa Coloma de Gramenet, a pie de calle en zona de alto tránsito comercial. Fachada de 4 metros con gran escaparate acristalado.",
    features: ["Pie de calle", "Gran escaparate", "Persiana motorizada", "Acceso PMR", "Salida de humos"],
    image: gallery2,
    gallery: [gallery2, gallery3, property1],
    operation: "alquilar"
  },
  {
    id: "prop-7",
    slug: "piso-con-vistas-al-riu",
    ref: "API A11020",
    name: "Piso luminoso con terraza junto al Riu",
    type: "Piso",
    location: "Riu",
    city: "Santa Coloma de Gramenet",
    price: 215000,
    priceFormatted: "215.000 €",
    specs: "3 hab. · 1 baño · 82 m²",
    bedrooms: 3,
    bathrooms: 1,
    surface: 82,
    floor: "3ª planta con ascensor",
    description: "Magnífica vivienda en el barrio de Riu, junto al parque fluvial. Vistas abiertas, excelente orientación solar y finca cuidada con ascensor.",
    features: ["Vistas despejadas", "Parque fluvial cercano", "Ascensor", "Cocina reformada"],
    image: modernOfficeImg,
    gallery: [modernOfficeImg, property3, gallery1],
    operation: "comprar"
  }
];
