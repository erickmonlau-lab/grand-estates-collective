import property1 from "@/assets/property-1.webp";
import property2 from "@/assets/property-2.webp";
import property3 from "@/assets/property-3.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import brightAtrium from "@/assets/bright-atrium.webp";

export type PropertyType = "Piso" | "Ático" | "Local comercial" | "Chalet" | "Oficina" | "Todos";

export interface Property {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  location: string;
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
}

export const properties: Property[] = [
  {
    id: "prop-1",
    slug: "piso-en-eixample-barcelona",
    name: "Piso en l'Eixample",
    type: "Piso",
    location: "Eixample",
    price: 1200,
    priceFormatted: "1.200 €/mes",
    specs: "3 hab. · 2 baños · 110 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 110,
    floor: "4ª planta con ascensor",
    description: "Espectacular piso reformado en pleno corazón de l'Eixample, conservando la bóveda catalana y elementos originales. Cuenta con un salón muy luminoso gracias a sus grandes ventanales. La cocina está totalmente equipada con electrodomésticos de alta gama y diseño abierto. Dispone de tres habitaciones espaciosas, dos de ellas con baño en suite. Materiales de primera calidad y aislamiento acústico inmejorable.",
    features: ["Bóveda catalana restaurada", "Aire acondicionado central", "Suelo de parquet natural", "Ventanas Climalit oscilobatientes", "Conserje 24h"],
    image: property1,
    gallery: [property1, gallery1, gallery2],
    operation: "alquilar"
  },
  {
    id: "prop-2",
    slug: "atico-con-terraza-sarria",
    name: "Ático con terraza",
    type: "Ático",
    location: "Sarrià-Sant Gervasi",
    price: 890000,
    priceFormatted: "890.000 €",
    specs: "4 hab. · 3 baños · 165 m²",
    bedrooms: 4,
    bathrooms: 3,
    surface: 165,
    floor: "7ª planta (Ático)",
    description: "Exclusivo ático en el prestigioso distrito de Sarrià-Sant Gervasi. Lo más destacado de esta propiedad es su impresionante terraza de 40m² con vistas despejadas a la ciudad, perfecta para disfrutar del buen tiempo. El inmueble destaca por sus acabados premium, excelente iluminación natural y espacios abiertos. Cuatro amplios dormitorios y tres cuartos de baño de diseño. Plaza de garaje doble incluida.",
    features: ["Terraza privada 40m²", "Plaza de garaje doble", "Acabados premium", "Orientación Sur", "Trastero incluido"],
    image: property2,
    gallery: [property2, gallery3, gallery1],
    operation: "comprar"
  },
  {
    id: "prop-3",
    slug: "local-comercial-gracia",
    name: "Local comercial",
    type: "Local comercial",
    location: "Gràcia",
    price: 1500,
    priceFormatted: "1.500 €/mes",
    specs: "0 hab. · 1 baño · 85 m²",
    bedrooms: 0,
    bathrooms: 1,
    surface: 85,
    floor: "Planta baja",
    description: "Excelente oportunidad de inversión en el dinámico barrio de Gràcia. Este local a pie de calle cuenta con un gran escaparate acristalado de 5 metros que ofrece máxima visibilidad en una zona de mucho tránsito peatonal. Distribuido en una gran sala diáfana, un almacén posterior y un cuarto de baño. Ideal para clínica, boutique, estudio creativo o cafetería de especialidad.",
    features: ["A pie de calle", "Gran escaparate (5m)", "Espacio diáfano", "Paso constante de peatones", "A 2 min del metro"],
    image: property3,
    gallery: [property3, gallery2, gallery3],
    operation: "alquilar"
  },
  {
    id: "prop-4",
    slug: "chalet-independiente-pedralbes",
    name: "Chalet independiente",
    type: "Chalet",
    location: "Pedralbes",
    price: 2250000,
    priceFormatted: "2.250.000 €",
    specs: "5 hab. · 4 baños · 350 m²",
    bedrooms: 5,
    bathrooms: 4,
    surface: 350,
    floor: "Varias plantas",
    description: "Majestuoso chalet independiente situado en la tranquila y exclusiva zona de Pedralbes. Rodeado de zonas verdes, esta propiedad ofrece privacidad absoluta. Dispone de un gran jardín consolidado con piscina privada, zona chill-out y porche. En el interior, encontramos amplios salones, cocina office con isla, cinco dormitorios dobles y sótano con bodega y sala polivalente. Seguridad 24 horas en la urbanización.",
    features: ["Piscina privada", "Jardín 800m²", "Bodega", "Seguridad 24h", "Garaje para 3 coches"],
    image: gallery1,
    gallery: [gallery1, property1, gallery2],
    operation: "comprar"
  },
  {
    id: "prop-5",
    slug: "piso-luminoso-sant-antoni",
    name: "Piso exterior luminoso",
    type: "Piso",
    location: "Sant Antoni",
    price: 450000,
    priceFormatted: "450.000 €",
    specs: "2 hab. · 1 baño · 85 m²",
    bedrooms: 2,
    bathrooms: 1,
    surface: 85,
    floor: "3ª planta con ascensor",
    description: "Precioso piso exterior a escasos metros del Mercado de Sant Antoni. La vivienda destaca por su excelente luminosidad en todas las estancias gracias a sus amplios ventanales. Ha sido reformada recientemente cuidando hasta el más mínimo detalle, combinando lo moderno con el encanto clásico del barrio. Cocina integrada al salón, dos dormitorios muy tranquilos y un baño completo. Una opción perfecta tanto para vivir como para invertir.",
    features: ["Cerca del Mercado", "Mucha luz natural", "Armarios empotrados", "Cocina americana", "Rentabilidad alta"],
    image: brightAtrium,
    gallery: [brightAtrium, gallery1, property2],
    operation: "comprar"
  },
  {
    id: "prop-6",
    slug: "atico-duplex-en-gracia",
    name: "Ático dúplex con solárium",
    type: "Ático",
    location: "Gràcia",
    price: 650000,
    priceFormatted: "650.000 €",
    specs: "3 hab. · 2 baños · 120 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 120,
    floor: "5ª planta (Dúplex)",
    description: "Espectacular ático dúplex en Vila de Gràcia con solárium privado de 30m² y vistas panorámicas. Salón comedor de doble altura con grandes ventanales. Cocina de diseño totalmente equipada y acabados de lujo.",
    features: ["Solárium privado 30m²", "Doble altura", "Vistas despejadas", "Ascensor", "Reformado a estrenar"],
    image: gallery2,
    gallery: [gallery2, gallery3, property1],
    operation: "comprar"
  },
  {
    id: "prop-7",
    slug: "oficina-representativa-diagonal",
    name: "Oficina corporativa",
    type: "Oficina",
    location: "Eixample",
    price: 2100,
    priceFormatted: "2.100 €/mes",
    specs: "0 hab. · 2 baños · 140 m²",
    bedrooms: 0,
    bathrooms: 2,
    surface: 140,
    floor: "1ª planta principal",
    description: "Oficina señorial representativa en la Avenida Diagonal. Techos altos con molduras originales, suelos de mosaico hidráulico restaurado y cableado de red de alta velocidad instalado.",
    features: ["Finca regia", "Excelente ubicación", "Red de fibra instalada", "Mosaico hidráulico", "Luz natural"],
    image: gallery3,
    gallery: [gallery3, property3, gallery1],
    operation: "alquilar"
  },
  {
    id: "prop-8",
    slug: "local-comercial-sagrada-familia",
    name: "Local cerca de Sagrada Família",
    type: "Local comercial",
    location: "Eixample",
    price: 380000,
    priceFormatted: "380.000 €",
    specs: "0 hab. · 1 baño · 95 m²",
    bedrooms: 0,
    bathrooms: 1,
    surface: 95,
    floor: "Planta baja",
    description: "Local comercial en rentabilidad en zona turística privilegiada junto a la Sagrada Família. Salida de humos aprobada, amplia fachada acristalada y excelente afluencia de peatones todo el año.",
    features: ["Alta rentabilidad", "Salida de humos", "Zona muy turística", "Fachada de 6 metros", "Inversión asegurada"],
    image: property1,
    gallery: [property1, gallery2, property3],
    operation: "comprar"
  }
];
