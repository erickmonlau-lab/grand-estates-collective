import { getTranslatedProperty, autoTranslateText } from "../src/lib/translateProperty.ts";

const testProperty = {
  id: "prop-test-100",
  slug: "piso-reformado-con-gran-terraza-en-centro",
  ref: "API A10750",
  name: "Piso reformado con gran terraza en Centro",
  type: "Piso",
  location: "Centro",
  city: "Santa Coloma de Gramenet",
  price: 210000,
  priceFormatted: "210.000 €",
  specs: "3 hab. · 2 baños · 85 m²",
  bedrooms: 3,
  bathrooms: 2,
  surface: 85,
  description: "Magnífica vivienda luminosa y reformada con vistas despejadas.",
  features: ["Ascensor", "Terraza", "Calefacción"],
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  gallery: [],
  operation: "comprar",
  status: "disponible"
};

console.log("=== PRUEBA DE TRADUCCIÓN AUTOMÁTICA ===");
console.log("ES (Español):", getTranslatedProperty(testProperty, "es"));
console.log("CA (Català):", getTranslatedProperty(testProperty, "ca"));
console.log("EN (English):", getTranslatedProperty(testProperty, "en"));
