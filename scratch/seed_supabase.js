import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goqgzuhffngtxoijoveb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWd6dWhmZm5ndHhvaWpvdmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NjE5MTQsImV4cCI6MjEwMzMzNzkxNH0.33sWLpPpzkxgkEceevYWrREpGtUJEn2fOwKnKevYXUs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initialProperties = [
  {
    id: "prop-1",
    slug: "piso-reformado-riera-alta-llati",
    ref: "API A10750",
    name: "Piso reformado en Riera Alta - Llatí",
    type: "Piso",
    location: "Riera Alta - Llatí",
    city: "Santa Coloma de Gramenet",
    price: 1200,
    price_formatted: "1.200 €/mes",
    specs: "3 hab. · 2 baños · 110 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 110,
    description: "Vivienda completamente reformada con acabados de primera calidad en Riera Alta - Llatí. Espacioso salón-comedor con salida a terraza, cocina office independiente totalmente equipada y tres habitaciones dobles con armarios empotrados.",
    features: ["Terraza exterior", "Calefacción por radiadores", "Aire acondicionado", "Suelos de parquet", "Finca con ascensor", "Trastero incluido"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "alquilar",
    status: "disponible"
  },
  {
    id: "prop-2",
    slug: "apartamento-exterior-singuerlin",
    ref: "AE13639",
    name: "Apartamento exterior reformado",
    type: "Apartamento",
    location: "Singuerlín",
    city: "Santa Coloma de Gramenet",
    price: 175000,
    price_formatted: "175.000 €",
    specs: "2 hab. · 1 baño · 68 m²",
    bedrooms: 2,
    bathrooms: 1,
    surface: 68,
    description: "Acogedor apartamento reformado en Singuerlín, a solo 3 minutos de la estación de metro L9N. Muy luminoso gracias a su orientación este, cuenta con salón con salida a balcón, cocina americana abierta y dos dormitorios.",
    features: ["Balcón con vistas", "Cocina americana", "Cerramientos Climalit", "Orientación este", "Muy cerca del metro"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "comprar",
    status: "disponible"
  },
  {
    id: "prop-3",
    slug: "atico-duplex-centro-santa-coloma",
    ref: "PJ2024",
    name: "Ático dúplex con gran terraza",
    type: "Ático",
    location: "Centro",
    city: "Santa Coloma de Gramenet",
    price: 295000,
    price_formatted: "295.000 €",
    specs: "3 hab. · 2 baños · 105 m²",
    bedrooms: 3,
    bathrooms: 2,
    surface: 105,
    description: "Exclusivo ático dúplex en pleno centro de Santa Coloma. Dispone de terraza solárium de 35 m² con vistas panorámicas sobre la ciudad y la sierra de Marina.",
    features: ["Terraza solárium 35 m²", "Vistas panorámicas", "Plaza de parking opcional", "Ascensor directo", "Suite principal con vestidor"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "comprar",
    status: "disponible"
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
    price_formatted: "950 €/mes",
    specs: "2 hab. · 1 baño · 62 m²",
    bedrooms: 2,
    bathrooms: 1,
    surface: 62,
    description: "Piso coqueto y funcional en Santa Rosa - Can Mariner, zona consolidada con todos los servicios y comercios a pie de calle.",
    features: ["Totalmente amueblado", "Aire acondicionado con bomba de calor", "Ascensor", "Galería / lavadero", "Excelente conexión de bus y metro"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "alquilar",
    status: "disponible"
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
    price_formatted: "149.000 €",
    specs: "3 hab. · 1 baño · 82 m²",
    bedrooms: 3,
    bathrooms: 1,
    surface: 82,
    description: "Vivienda familiar espaciosa en Fondo, a 2 minutos de la parada de metro L1 y L9N. Dispone de salón-comedor amplio, 3 dormitorios y cocina reformada.",
    features: ["3 dormitorios", "Finca con ascensor", "Cocina reformada", "Luz natural todo el día", "Cerca de colegios y comercios"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "comprar",
    status: "disponible"
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
    price_formatted: "1.800 €/mes",
    specs: "2 estancias · 1 aseo · 140 m²",
    bedrooms: 0,
    bathrooms: 1,
    surface: 140,
    description: "Local comercial a pie de calle en zona de alto tránsito peatonal y rodado en el centro de Santa Coloma. Gran escaparate acristalado de 6 metros.",
    features: ["Escaparate acristalado 6m", "Salida de humos", "Persiana motorizada", "Aseo adaptado", "Aire acondicionado centralizado", "Apto para cualquier actividad"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "alquilar",
    status: "disponible"
  },
  {
    id: "prop-7",
    slug: "casa-unifamiliar-singuerlin",
    ref: "API A30114",
    name: "Casa unifamiliar con jardín y garaje",
    type: "Chalet",
    location: "Singuerlín",
    city: "Santa Coloma de Gramenet",
    price: 380000,
    price_formatted: "380.000 €",
    specs: "4 hab. · 2 baños · 195 m²",
    bedrooms: 4,
    bathrooms: 2,
    surface: 195,
    description: "Magnífica casa unifamiliar en la zona alta de Singuerlín con vistas despejadas a la montaña y al mar. Parcela de 250 m² con jardín privado y zona de barbacoa.",
    features: ["Jardín privado 80 m²", "Garaje privado para 2 coches", "Zona de barbacoa", "Vistas despejadas mar y montaña", "Calefacción y aire acondicionado", "Bodega / trastero"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    operation: "comprar",
    status: "disponible"
  }
];

async function seedData() {
  console.log("Inserting properties to Supabase...");
  for (const p of initialProperties) {
    const { error } = await supabase.from("properties").upsert(p);
    if (error) console.error("Error inserting", p.id, error);
    else console.log("OK:", p.name);
  }
  console.log("ALL PROPERTIES SEEDED SUCCESSFULLY IN SUPABASE CLOUD!");
}

seedData();
