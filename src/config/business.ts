/**
 * CONFIGURACIÓN CENTRAL DE NEGOCIO — GESGRAMA
 * Fuente única de la verdad para datos corporativos, SEO y esquemas estructurados.
 */

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
    countryCode: string;
    fullFormatted: string;
    geo: {
      latitude: number;
      longitude: number;
    };
  };
  // TODO: Confirmar número único de WhatsApp oficial si cambia del actual 601259424
  whatsapp: {
    number: string;
    formatted: string;
    cleanNumber: string;
    defaultUrl: string;
    valuationsNumber: string;
    valuationsFormatted: string;
    valuationsClean: string;
  };
  // TODO: Confirmar denominación colegial exacta (CAFBL - Barcelona / CAFBLL - Barcelona-Lleida)
  colegio: {
    code: string;
    fullName: string;
    shortName: string;
  };
  // TODO: Proporcionar URL oficial de la ficha Google Business Profile (GBP)
  googleBusinessProfileUrl: string;
  openingHours: {
    raw: string;
    days: string[];
    morning: { opens: string; closes: string };
    afternoon: { opens: string; closes: string };
    schema: Array<{
      dayOfWeek: string[];
      opens: string;
      closes: string;
    }>;
  };
  registrations: {
    aicat: string;
    api: string;
    summary: string;
  };
  // Cifras confirmadas
  stats: {
    clients: string;
    satisfaction: string;
    communities: string;
    experienceYears: string;
    // Cifras dudosas / operativas sin tocar (pendientes de confirmación por cliente)
    urgentResponseTime: string;
    marketVariation: string;
  };
  serviceArea: {
    city: string;
    fullArea: string;
    allBarrios: string[];
  };
  siteDomain: string;
}

export const BUSINESS: BusinessConfig = {
  name: "Gesgrama",
  legalName: "Gesgrama Gestiones Inmobiliarias y Administración de Fincas",
  tagline: "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet",
  phone: "+34934685656",
  phoneFormatted: "93 468 56 56",
  email: "info@gesgrama.com",
  address: {
    street: "Av. dels Banús, 49",
    city: "Santa Coloma de Gramenet",
    postalCode: "08923",
    region: "Barcelona",
    country: "España",
    countryCode: "ES",
    fullFormatted: "Av. dels Banús, 49, 08923 Santa Coloma de Gramenet",
    geo: {
      latitude: 41.446201,
      longitude: 2.213026,
    },
  },
  whatsapp: {
    number: "+34601259424",
    formatted: "601 25 94 24",
    cleanNumber: "34601259424",
    defaultUrl: "https://wa.me/34601259424?text=Hola%20Gesgrama,%20quisiera%20m%C3%A1s%20informaci%C3%B3n",
    valuationsNumber: "+34613069884",
    valuationsFormatted: "613 06 98 84",
    valuationsClean: "34613069884",
  },
  colegio: {
    // CAFBL es la sigla oficial del Col·legi d'Administradors de Finques de Barcelona-Lleida
    code: "CAFBL",
    fullName: "Col·legi d'Administradors de Finques de Barcelona-Lleida",
    shortName: "Col·legi d'Administradors de Finques (CAFBL)",
  },
  // TODO: Pendiente URL real de la ficha Google Business Profile
  googleBusinessProfileUrl: "",
  openingHours: {
    raw: "Lunes a Viernes: 9:30 - 13:30 y 16:30 - 19:30",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    morning: { opens: "09:30", closes: "13:30" },
    afternoon: { opens: "16:30", closes: "19:30" },
    schema: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "16:30",
        closes: "19:30",
      },
    ],
  },
  registrations: {
    aicat: "AICAT nº 5583",
    api: "API A10750",
    summary: "AICAT nº 5583 · API A10750",
  },
  stats: {
    clients: "4.500+",
    satisfaction: "98%",
    communities: "+300",
    experienceYears: "15+",
    // Promesa de atención ágil y profesional (sin compromiso temporal fijado)
    urgentResponseTime: "Inmediata y directa",
    marketVariation: "+4.2%",
  },
  serviceArea: {
    city: "Santa Coloma de Gramenet",
    fullArea: "Santa Coloma de Gramenet y área metropolitana",
    allBarrios: [
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
      "Cementiri Vell",
    ],
  },
  siteDomain: "https://gesgrama.com",
};

export default BUSINESS;
