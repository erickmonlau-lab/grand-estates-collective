import art1Img from "@/assets/art1_asesor_inmobiliario.jpg";
import art2Img from "@/assets/art2_contrato_exclusividad.jpg";
import art3Img from "@/assets/art3_perito_judicial.jpg";
import art4Img from "@/assets/art4_obra_nueva.webp";

export interface HomeArticle {
  id: string;
  slug: string;
  category: { es: string; en: string; ca: string };
  date: string;
  readTime: { es: string; en: string; ca: string };
  image: string;
  title: { es: string; en: string; ca: string };
  summary: { es: string; en: string; ca: string };
}

export const homeArticles: HomeArticle[] = [
  {
    id: "art-1",
    slug: "asesor-inmobiliario-santa-coloma-riera-alta-llati-el-raval",
    category: { es: "Servicios Inmobiliarios", en: "Real Estate Services", ca: "Serveis Inmobiliari" },
    date: "14 Feb 2026",
    readTime: { es: "5 min de lectura", en: "5 min read", ca: "5 min de lectura" },
    image: art1Img,
    title: {
      es: "¿Por qué necesitas un asesor inmobiliario local en Riera Alta-Llatí y El Raval?",
      ca: "Per què necessites un assessor immobiliari local a Riera Alta-Llatí i El Raval?",
      en: "Why do you need a local real estate advisor in Riera Alta-Llatí and El Raval?"
    },
    summary: {
      es: "Descubre cómo la experiencia de un agente colegiado AICAT maximiza el valor patrimonial de tu vivienda en Santa Coloma de Gramenet.",
      ca: "Descobreix com l'experiència d'un agent col·legiat AICAT maximitza el valor patrimonial del teu habitatge a Santa Coloma de Gramenet.",
      en: "Discover how the expertise of an AICAT registered agent maximizes the property value of your home in Santa Coloma de Gramenet."
    }
  },
  {
    id: "art-2",
    slug: "contrato-exclusividad-inmobiliaria-ventajas-propietarios-santa-coloma",
    category: { es: "Guía de Venta", en: "Selling Guide", ca: "Guia de Venda" },
    date: "02 Feb 2026",
    readTime: { es: "6 min de lectura", en: "6 min read", ca: "6 min de lectura" },
    image: art2Img,
    title: {
      es: "Mitos y realidades sobre el contrato de exclusividad inmobiliaria en Santa Coloma",
      ca: "Mites i realitats sobre el contracte d'exclusivitat immobiliària a Santa Coloma",
      en: "Myths and facts about exclusive real estate representation contracts in Santa Coloma"
    },
    summary: {
      es: "Analizamos qué implica firmar una exclusiva de venta, cómo protege tus derechos como propietario y por qué acelera la operación.",
      ca: "Analitzem què implica signar una exclusiva de venda, com protegeix els teus drets com a propietari i per què accelera l'operació.",
      en: "We analyze what signing an exclusive listing agreement entails, how it protects your owner rights, and why it speeds up the sale."
    }
  },
  {
    id: "art-3",
    slug: "perito-judicial-inmobiliario-tasaciones-oficiales-herencias-divorcios",
    category: { es: "Asesoría Jurídica", en: "Legal Advisory", ca: "Assessoria Jurídica" },
    date: "28 Ene 2026",
    readTime: { es: "7 min de lectura", en: "7 min read", ca: "7 min de lectura" },
    image: art3Img,
    title: {
      es: "El papel clave del perito judicial inmobiliario en herencias y valoraciones periciales",
      ca: "El paper clau del pèrit judicial immobiliari en herències i valoracions pericials",
      en: "The key role of the real estate judicial expert witness in inheritance and appraisal disputes"
    },
    summary: {
      es: "Garantiza informes periciales con validez ante juzgados y Hacienda para resolver repartos hereditarios y liquidaciones tributarias.",
      ca: "Garanteix informes pericials amb validesa davant jutjats i Hisenda per resoldre repartiments hereditaris i liquidacions tributàries.",
      en: "Ensures legally binding expert appraisal reports before courts and tax authorities for inheritance divisions and tax settlements."
    }
  },
  {
    id: "art-4",
    slug: "promociones-obra-nueva-vs-segunda-mano-inversion-santa-coloma",
    category: { es: "Inversión Inmobiliaria", en: "Real Estate Investment", ca: "Inversió Immobiliària" },
    date: "15 Ene 2026",
    readTime: { es: "5 min de lectura", en: "5 min read", ca: "5 min de lectura" },
    image: art4Img,
    title: {
      es: "Obra nueva vs. Segunda mano: ¿Dónde rentabilizar mejor tu inversión en Santa Coloma?",
      ca: "Obra nova vs. Segona mà: On rendabilitzar millor la teva inversió a Santa Coloma?",
      en: "New construction vs. Resale homes: Where to achieve higher ROI in Santa Coloma?"
    },
    summary: {
      es: "Comparativa de costes de reforma, eficiencia energética e ITP frente a IVA para compradores e inversores inmobiliarios.",
      ca: "Comparativa de costos de reforma, eficiència energètica i ITP enfront d'IVA per a compradors i inversors immobiliaris.",
      en: "Comparison of renovation costs, energy efficiency, and ITP versus VAT for homebuyers and real estate investors."
    }
  }
];
