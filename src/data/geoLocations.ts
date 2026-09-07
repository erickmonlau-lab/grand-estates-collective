export interface NeighborhoodContext {
  name: string;
  postalCode: string;
  buildingTypology: string;
  commonIssues: string[];
}

export interface LocalFaq {
  question: string;
  answer: string;
}

export interface GeoLocationData {
  slug: string;
  cityName: string;
  officialName: string;
  province: string;
  comarca: string;
  postalCodes: string[];
  geo: {
    latitude: number;
    longitude: number;
  };
  officeDistanceKm: number;
  emergencyResponseTimeMinutes: number;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  neighborhoods: NeighborhoodContext[];
  localRegulations: {
    plusvaliaInfo: string;
    subsidiesInfo: string;
    iteStatus: string;
  };
  faqs: LocalFaq[];
  satisfiedCommunitiesCount: number;
  managedUnitsCount: number;
  testimonial: {
    author: string;
    role: string;
    neighborhood: string;
    quote: string;
    year: number;
  };
  priceRange: string;
}

export const GEO_LOCATIONS: Record<string, GeoLocationData> = {
  "santa-coloma-de-gramenet": {
    slug: "santa-coloma-de-gramenet",
    cityName: "Santa Coloma de Gramenet",
    officialName: "Santa Coloma de Gramenet",
    province: "Barcelona",
    comarca: "Barcelonès",
    postalCodes: ["08921", "08922", "08923", "08924"],
    geo: {
      latitude: 41.4516,
      longitude: 2.2081
    },
    officeDistanceKm: 0,
    emergencyResponseTimeMinutes: 20,
    metaTitle: "Administrador de Fincas en Santa Coloma · Gesgrama",
    metaDescription: "Gestión experta de comunidades en Santa Coloma de Gramenet. Auditoría gratis de cuentas, resolución de incidencias en 20 min y control de morosidad.",
    heroHeadline: "Administración de Fincas y Comunidades en Santa Coloma de Gramenet",
    heroSubtitle: "Sede central en Av. dels Banús, 49. Más de 15 años gestionando comunidades con transparencia contable total, atención de urgencias en 20 minutos y peritos judiciales colegiados.",
    neighborhoods: [
      {
        name: "Centre",
        postalCode: "08921",
        buildingTypology: "Fincas residenciales consolidadas y plurifamiliares con locales comerciales.",
        commonIssues: ["Rehabilitación de balcones antiguos", "Modernización de ascensores", "Gestión de coeficientes con locales"]
      },
      {
        name: "Singuerlín",
        postalCode: "08924",
        buildingTypology: "Edificaciones en pendiente, torres plurifamiliares y complejos con garajes.",
        commonIssues: ["Humedades por filtración y contención", "Muros perimetrales", "Eficiencia energética en cubiertas"]
      },
      {
        name: "Santa Rosa - Can Mariner",
        postalCode: "08923",
        buildingTypology: "Alta densidad residencial construida entre 1960 y 1980.",
        commonIssues: ["Bajar ascensores a cota cero", "Inspección Técnica de Edificios (ITE)", "Optimización de morosidad"]
      },
      {
        name: "Fondo",
        postalCode: "08922",
        buildingTypology: "Bloques de gran rotación residencial y convivencia multicultural.",
        commonIssues: ["Resolución de impagos de cuotas", "Sustitución urgente de bajantes", "Mediación vecinal y actas claras"]
      },
      {
        name: "Riera Alta - Llatí",
        postalCode: "08921",
        buildingTypology: "Comunidades medianas y viviendas con reformas recientes.",
        commonIssues: ["Renovación de acometidas comunitarias", "Mantenimiento preventivo de cubiertas"]
      },
      {
        name: "El Raval",
        postalCode: "08923",
        buildingTypology: "Edificios tradicionales plurifamiliares cercanos al río Besòs.",
        commonIssues: ["Aislamiento de fachadas", "Subvenciones comunitarias Next Generation"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Bonificación de hasta el 95% en la plusvalía municipal del Ajuntament de Santa Coloma para transmisiones mortis causa de vivienda habitual.",
      subsidiesInfo: "Gestión activa de ayudas del Consorci Metropolità de l'Habitatge para rehabilitación energética y eliminación de barreras arquitectónicas.",
      iteStatus: "Campaña municipal activa para fincas construidas antes de 1975 obligadas a presentar el Certificado de Aptitud ITE."
    },
    faqs: [
      {
        question: "¿Cómo tramitamos el cambio de administrador en Santa Coloma de Gramenet?",
        answer: "En Gesgrama nos encargamos del 100% de la transición sin coste alguno para la comunidad: redactamos la convocatoria de junta conforme a la LPH, solicitamos toda la documentación contable y técnica al administrador saliente y realizamos una auditoría inicial de las cuentas."
      },
      {
        question: "¿Cuál es el tiempo de respuesta ante una urgencia comunitaria?",
        answer: "Al tener nuestra sede principal en la Av. dels Banús 49 de Santa Coloma, nuestro equipo técnico o un operario homologado se presenta en la finca en menos de 20 minutos ante escapes de agua, averías de cerrajería o paradas de ascensor."
      },
      {
        question: "¿Cómo lográis reducir la morosidad en las comunidades de vecinos?",
        answer: "Aplicamos un protocolo estricto y conciliador: comunicación amistosa a los 15 días del impago, plan de pagos fraccionados si existe dificultad real y, en caso necesario, reclamación judicial monitoria con nuestro equipo de asesoría jurídica propio sin sobrecoste de honorarios."
      },
      {
        question: "¿Qué ahorro medio consigue una comunidad con Gesgrama?",
        answer: "Al renegociar contratos colectivos de luz comunitaria, mantenimiento de ascensor, seguro multirriesgo y limpieza, logramos reducir los gastos ordinarios entre un 15% y un 28% durante el primer año de gestión."
      }
    ],
    satisfiedCommunitiesCount: 320,
    managedUnitsCount: 4850,
    testimonial: {
      author: "M. Carmen Rodríguez",
      role: "Presidenta de Comunidad",
      neighborhood: "Santa Rosa",
      quote: "Llevábamos años con un administrador que no atendía urgencias y teníamos 6.000€ de morosidad. Con Gesgrama recuperamos la deuda en 4 meses y conseguimos la subvención para instalar el ascensor a cota cero.",
      year: 2025
    },
    priceRange: "€€"
  },

  "badalona": {
    slug: "badalona",
    cityName: "Badalona",
    officialName: "Badalona",
    province: "Barcelona",
    comarca: "Barcelonès Nord",
    postalCodes: ["08911", "08912", "08913", "08914", "08915", "08917", "08918"],
    geo: {
      latitude: 41.4469,
      longitude: 2.2450
    },
    officeDistanceKm: 3.5,
    emergencyResponseTimeMinutes: 30,
    metaTitle: "Administrador de Fincas en Badalona · Gesgrama",
    metaDescription: "Administración profesional de comunidades en Badalona. Atención rápida en Llefià, La Salut, Centre y Bufalà. Reducción de gastos y control de morosidad.",
    heroHeadline: "Administración Profesional de Fincas y Comunidades en Badalona",
    heroSubtitle: "Cobertura completa en todos los distritos de Badalona: Llefià, La Salut, Centre, Bufalà y Morera. Gestión transparente, auditoría de contratos y respuesta presencial en 30 minutos.",
    neighborhoods: [
      {
        name: "Llefià (Sant Antoni, Baix i Alt)",
        postalCode: "08913",
        buildingTypology: "Grandes bloques de viviendas con escaleras múltiples y fincas de alta densidad.",
        commonIssues: ["Control de presupuestos de mantenimiento", "Reparación de filtraciones en terrados", "Instalación de videointerfonos"]
      },
      {
        name: "La Salut",
        postalCode: "08914",
        buildingTypology: "Fincas de los años 70 que requieren mejoras de accesibilidad.",
        commonIssues: ["ITE pendiente con deficiencias leves en fachadas", "Negociación con vecinos morosos"]
      },
      {
        name: "Centre / Progrés",
        postalCode: "08911",
        buildingTypology: "Edificios modernistas protegidos, fincas señoriales y promociones recientes.",
        commonIssues: ["Mantenimiento preventivo contra corrosión marina", "Gestión de vados y garajes comunitarios"]
      },
      {
        name: "Bufalà",
        postalCode: "08915",
        buildingTypology: "Conjuntos residenciales con zonas ajardinadas y aparcamientos subterráneos.",
        commonIssues: ["Mantenimiento de puertas de garaje y bombeo", "Gestión de contratos de jardinería y piscinas"]
      },
      {
        name: "La Morera / Pomar",
        postalCode: "08915",
        buildingTypology: "Comunidades amplias con zonas comunitarias.",
        commonIssues: ["Reparto de gastos de calefacción central", "Eficiencia energética"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Aplicación de la normativa fiscal del Ajuntament de Badalona y tramitación de bonificaciones por transmisiones hereditarias.",
      subsidiesInfo: "Coordinación con los planes de regeneración urbana del Barcelonès Nord para aislamiento de fachadas SATE.",
      iteStatus: "Obligación de ITE para edificios plurifamiliares con más de 45 años de antigüedad en el término municipal de Badalona."
    },
    faqs: [
      {
        question: "¿Prestan servicio presencial directo a comunidades de Badalona?",
        answer: "Sí, nuestra sede está situada a escasos minutos de Llefià y La Salut. Acudimos presencialmente a todas las juntas ordinarias y extraordinarias, y realizamos inspecciones visuales periódicas de la finca cada trimestre."
      },
      {
        question: "¿Cómo controláis los costes de los proveedores en Badalona?",
        answer: "Auditamos los contratos vigentes de limpieza, mantenimiento de ascensor y seguros. Solicitamos siempre 3 presupuestos ciegos de empresas locales verificadas y la comunidad decide democráticamente en junta."
      },
      {
        question: "¿Disponen los vecinos de acceso online a las cuentas?",
        answer: "Absolutamente. Todos los propietarios disponen de acceso 24/7 al portal digital y app para consultar recibos, liquidaciones bancarias, actas de juntas y el estado de cualquier incidencia en tiempo real."
      },
      {
        question: "¿Tenéis servicio para comunidades con problemas graves de morosidad en Badalona?",
        answer: "Sí, contamos con un departamento jurídico propio colegiado en derecho inmobiliario que tramita los procedimientos judiciales con la máxima celeridad sin que la comunidad tenga que adelantar fondos a despachos externos."
      }
    ],
    satisfiedCommunitiesCount: 165,
    managedUnitsCount: 2350,
    testimonial: {
      author: "Jordi Puigdomènech",
      role: "Vicepresidente de Escalera",
      neighborhood: "Llefià",
      quote: "Nuestro anterior administrador tardaba semanas en responder. Cambiamos a Gesgrama y la diferencia es abismal: cuentas transparentes cada mes y resolvieron un siniestro grave de bajantes en menos de 24 horas.",
      year: 2025
    },
    priceRange: "€€"
  },

  "sant-adria-de-besos": {
    slug: "sant-adria-de-besos",
    cityName: "Sant Adrià de Besòs",
    officialName: "Sant Adrià de Besòs",
    province: "Barcelona",
    comarca: "Barcelonès",
    postalCodes: ["08930"],
    geo: {
      latitude: 41.4304,
      longitude: 2.2189
    },
    officeDistanceKm: 2.8,
    emergencyResponseTimeMinutes: 25,
    metaTitle: "Administrador de Fincas en Sant Adrià de Besòs · Gesgrama",
    metaDescription: "Administración de comunidades en Sant Adrià de Besòs. Gestión en Sant Joan Baptista, La Catalana y Besòs. Control de gastos y atención 24h.",
    heroHeadline: "Administración de Fincas y Comunidades en Sant Adrià de Besòs",
    heroSubtitle: "Cercanía inmediata desde Santa Coloma. Gestión profesional para comunidades en Sant Joan Baptista, La Catalana, Besòs y La Mina con máxima transparencia y resolución ágil.",
    neighborhoods: [
      {
        name: "Sant Joan Baptista",
        postalCode: "08930",
        buildingTypology: "Núcleo histórico y edificios residenciales familiares consolidados.",
        commonIssues: ["Instalación de rampas salvaescaleras", "Renovación de bajantes y tejados"]
      },
      {
        name: "La Catalana",
        postalCode: "08930",
        buildingTypology: "Nuevas promociones con zonas comunitarias, placas solares y aparcamientos.",
        commonIssues: ["Reclamación de vicios ocultos a promotoras", "Mantenimiento de aerotermia comunitaria"]
      },
      {
        name: "Besòs / Trajana",
        postalCode: "08930",
        buildingTypology: "Fincas de tipología obrera tradicional de media y alta densidad.",
        commonIssues: ["Gestión rigurosa de cuotas", "Tramitación de subvenciones de rehabilitación"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Bonificaciones del Ajuntament de Sant Adrià de Besòs en transmisiones de vivienda habitual entre familiares de primer grado.",
      subsidiesInfo: "Planes metropolitanos del Consorci del Besòs para eficiencia térmica y acústica en edificios próximos a rondas.",
      iteStatus: "Seguimiento riguroso de las ITEs en fincas con más de cuatro décadas de antigüedad."
    },
    faqs: [
      {
        question: "¿Por qué elegir a Gesgrama para una comunidad en Sant Adrià?",
        answer: "Por nuestra cercanía física inmediata (a 5 minutos reales de Sant Adrià), nuestro doble perfil de administradores colegiados y peritos judiciales inmobiliarios, y nuestra política de cero comisiones ocultas."
      },
      {
        question: "¿Qué ocurre con las comunidades de nueva construcción en La Catalana?",
        answer: "Asesoramos en la constitución de la primera comunidad de propietarios, recepción del edificio, revisión de zonas comunes y reclamación fehaciente de cualquier defecto constructivo a la promotora antes de que expire la garantía legal."
      },
      {
        question: "¿Podemos celebrar las juntas de vecinos de forma telemática o híbrida?",
        answer: "Sí, facilitamos juntas presenciales o mediante videoconferencia oficial con sistema de votación telemática legalmente validado para facilitar la asistencia de todos los propietarios."
      }
    ],
    satisfiedCommunitiesCount: 88,
    managedUnitsCount: 1280,
    testimonial: {
      author: "David Soler",
      role: "Presidente de Comunidad",
      neighborhood: "Sant Joan Baptista",
      quote: "Excelente gestión. Nos auditaron el seguro de la finca y ahorramos 800€ al año con mejores coberturas. Las actas están siempre listas al día siguiente de la junta.",
      year: 2026
    },
    priceRange: "€€"
  },

  "barcelona": {
    slug: "barcelona",
    cityName: "Barcelona (Sant Andreu / Nou Barris)",
    officialName: "Barcelona",
    province: "Barcelona",
    comarca: "Barcelonès",
    postalCodes: ["08030", "08031", "08033", "08042"],
    geo: {
      latitude: 41.4357,
      longitude: 2.1912
    },
    officeDistanceKm: 4.2,
    emergencyResponseTimeMinutes: 30,
    metaTitle: "Administrador de Fincas en Barcelona (Sant Andreu / Nou Barris)",
    metaDescription: "Gestión de comunidades en Barcelona: Sant Andreu, Nou Barris y Horta. Expertos en ITE, fincas sin ascensor, morosidad y auditoría contable.",
    heroHeadline: "Administración de Fincas en Barcelona: Sant Andreu, Nou Barris y Sagrera",
    heroSubtitle: "Atención directa en los distritos de Sant Andreu, Nou Barris, Horta y La Sagrera. Más de 15 años resolviendo problemas en fincas de Barcelona con cercanía, agilidad y transparencia contable.",
    neighborhoods: [
      {
        name: "Sant Andreu de Palomar",
        postalCode: "08030",
        buildingTypology: "Fincas centenarias entre medianeras y edificios plurifamiliares con locales comerciales.",
        commonIssues: ["Refuerzo estructural de techos y vigas", "Supresión de barreras arquitectónicas", "Gestión de ITEs complejas"]
      },
      {
        name: "Nou Barris (Prosperitat, Roquetes, Verdum)",
        postalCode: "08042",
        buildingTypology: "Fincas de gran altura construidas con celeridad en las décadas de los 50 y 60.",
        commonIssues: ["Revisión de aluminosis", "Instalación de ascensores exteriores o por patio de luces", "Planes de pago contra morosidad"]
      },
      {
        name: "La Sagrera",
        postalCode: "08027",
        buildingTypology: "Combinación de fincas clásicas y complejos residenciales modernos junto a la estación.",
        commonIssues: ["Impacto acústico de obras ferroviarias", "Mantenimiento preventivo de garajes comunitarios"]
      },
      {
        name: "Horta - Guinardó",
        postalCode: "08031",
        buildingTypology: "Edificios en pendientes pronunciadas y comunidades pequeñas.",
        commonIssues: ["Impermeabilización de muros contra el terreno", "Reparación de terrazas comunitarias de uso privativo"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Aplicación de las ordenanzas del Ajuntament de Barcelona con exenciones en casos de dación en pago y bonificación del 95% en herencias de vivienda habitual.",
      subsidiesInfo: "Gestión directa con el Consorci de l'Habitatge de Barcelona para subvenciones a la instalación de ascensores e ITEs con calificación deficiente.",
      iteStatus: "Inspecciones técnicas obligatorias para todo el parque de viviendas de Barcelona previo a 1975."
    },
    faqs: [
      {
        question: "¿Por qué contratar a Gesgrama para fincas en Sant Andreu o Nou Barris?",
        answer: "Porque ofrecemos una atención mucho más cercana y personalizada que los macrodespachos del Eixample, con visitas presenciales regulares, línea directa con el administrador colegiado y tarifas muy competitivas."
      },
      {
        question: "¿Cómo gestionáis las obras para instalar ascensor en edificios antiguos de Nou Barris?",
        answer: "Nuestro equipo de arquitectos técnicos y peritos realiza el estudio de viabilidad (por patio de luces o fachada), solicita las licencias ante el distrito de Barcelona y tramita las subvenciones municipales de accesibilidad."
      },
      {
        question: "¿Qué garantías ofrecemos ante impagos de cuotas en Barcelona?",
        answer: "Reclamación fehaciente inmediata y demanda monitoria judicial con abogado propio, recuperando las cantidades adeudadas junto con las costas e intereses devengados."
      }
    ],
    satisfiedCommunitiesCount: 110,
    managedUnitsCount: 1950,
    testimonial: {
      author: "Laura Benítez",
      role: "Vocal de Junta",
      neighborhood: "Sant Andreu",
      quote: "Estábamos atrapados en un conflicto por una obra de ascensor que el antiguo administrador no sabía tramitar. Gesgrama desatascó los permisos en el distrito y consiguió el acuerdo de todos los vecinos.",
      year: 2025
    },
    priceRange: "€€"
  },

  "montcada-i-reixac": {
    slug: "montcada-i-reixac",
    cityName: "Montcada i Reixac",
    officialName: "Montcada i Reixac",
    province: "Barcelona",
    comarca: "Vallès Occidental",
    postalCodes: ["08110"],
    geo: {
      latitude: 41.4883,
      longitude: 2.1873
    },
    officeDistanceKm: 5.1,
    emergencyResponseTimeMinutes: 30,
    metaTitle: "Administrador de Fincas en Montcada i Reixac · Gesgrama",
    metaDescription: "Gestión de comunidades en Montcada i Reixac: Can Sant Joan, Terra Nostra y Centre. Auditoría de costes, ITE y solución a problemas de morosidad.",
    heroHeadline: "Administración de Fincas y Comunidades en Montcada i Reixac",
    heroSubtitle: "Servicio ágil y cercano en Montcada Centro, Can Sant Joan, Terra Nostra y Mas Rampinyo. Auditoría integral de suministros y resolución eficaz de incidencias comunitarias.",
    neighborhoods: [
      {
        name: "Montcada Centre",
        postalCode: "08110",
        buildingTypology: "Fincas plurifamiliares con comercios en planta baja y viviendas familiares.",
        commonIssues: ["Renovación de bajantes comunitarias", "ITE de edificios de más de 45 años"]
      },
      {
        name: "Can Sant Joan",
        postalCode: "08110",
        buildingTypology: "Edificios de origen obrero y comunidades de tamaño medio.",
        commonIssues: ["Control de morosidad y regularización de recibos", "Mejora de accesibilidad"]
      },
      {
        name: "Mas Rampinyo",
        postalCode: "08110",
        buildingTypology: "Edificaciones más recientes con zonas de aparcamiento y trasteros.",
        commonIssues: ["Mantenimiento preventivo de garajes y ventilación forzada"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Gestión tributaria municipal ante el Ajuntament de Montcada i Reixac para compraventas y sucesiones.",
      subsidiesInfo: "Acceso a subvenciones del Vallès Occidental para rehabilitación energética de envolventes.",
      iteStatus: "Control y seguimiento del libro del edificio y revisiones periódicas obligatorias."
    },
    faqs: [
      {
        question: "¿Cómo gestionáis las incidencias urgentes en Montcada i Reixac?",
        answer: "Por proximidad por la C-17 y la B-20, nuestro tiempo de llegada ante emergencias comprobadas es inferior a 30 minutos, coordinando directamente con industriales locales homologados."
      },
      {
        question: "¿Qué documentación necesita la comunidad para cambiar de administrador?",
        answer: "Únicamente la aprobación en junta por mayoría simple de los presentes. Gesgrama se encarga de solicitar el libro de actas, contratos de suministros y saldos bancarios al gestor saliente."
      }
    ],
    satisfiedCommunitiesCount: 45,
    managedUnitsCount: 720,
    testimonial: {
      author: "Antoni Morales",
      role: "Presidente de Comunidad",
      neighborhood: "Montcada Centre",
      quote: "Muy contentos con el cambio. El anterior administrador nunca venía por aquí; Gesgrama visita la finca periódicamente y las cuentas están siempre claras al céntimo.",
      year: 2026
    },
    priceRange: "€€"
  },

  "tiana": {
    slug: "tiana",
    cityName: "Tiana",
    officialName: "Tiana",
    province: "Barcelona",
    comarca: "Maresme",
    postalCodes: ["08391"],
    geo: {
      latitude: 41.4831,
      longitude: 2.2694
    },
    officeDistanceKm: 7.2,
    emergencyResponseTimeMinutes: 35,
    metaTitle: "Administrador de Fincas en Tiana · Gesgrama",
    metaDescription: "Administración de comunidades y complejos residenciales en Tiana. Control de zonas ajardinadas, piscinas y máxima transparencia en cuentas.",
    heroHeadline: "Administración de Fincas y Complejos Residenciales en Tiana",
    heroSubtitle: "Especialistas en comunidades residenciales, urbanizaciones con piscina, garajes y zonas verdes en Tiana y comarca del Maresme.",
    neighborhoods: [
      {
        name: "Tiana Centre / Creu de Terme",
        postalCode: "08391",
        buildingTypology: "Fincas unifamiliares adosadas y pequeños complejos plurifamiliares con zonas comunitarias.",
        commonIssues: ["Mantenimiento de piscinas y depuración", "Conservación de pavimentos exteriores y jardinería"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Ordenanzas fiscales del Ajuntament de Tiana para plusvalías y transmisiones patrimoniales.",
      subsidiesInfo: "Líneas de ayuda para autoconsumo fotovoltaico en comunidades de propietarios.",
      iteStatus: "Certificación ITE según la normativa de la Generalitat de Catalunya."
    },
    faqs: [
      {
        question: "¿Tenéis experiencia en urbanizaciones con piscina comunitaria y jardines?",
        answer: "Sí, gestionamos complejos residenciales con exigentes requisitos de mantenimiento técnico de piscinas, fitosanitarios de jardinería y optimización de iluminación LED perimetral."
      }
    ],
    satisfiedCommunitiesCount: 28,
    managedUnitsCount: 410,
    testimonial: {
      author: "Elisabet Valls",
      role: "Presidenta de Mancomunidad",
      neighborhood: "Tiana",
      quote: "Consiguieron renegociar el contrato de jardinería y mantenimiento de la piscina reduciendo un 20% la cuota mensual sin perder un ápice de calidad.",
      year: 2025
    },
    priceRange: "€€"
  },

  "montgat": {
    slug: "montgat",
    cityName: "Montgat",
    officialName: "Montgat",
    province: "Barcelona",
    comarca: "Maresme",
    postalCodes: ["08390"],
    geo: {
      latitude: 41.4678,
      longitude: 2.2797
    },
    officeDistanceKm: 6.5,
    emergencyResponseTimeMinutes: 30,
    metaTitle: "Administrador de Fincas en Montgat · Gesgrama",
    metaDescription: "Gestión de comunidades y fincas en Montgat (Maresme). Protección contra ambiente marino, ITE, auditoría contable y resolución de incidencias.",
    heroHeadline: "Administración de Comunidades de Propietarios en Montgat",
    heroSubtitle: "Protección técnica y patrimonial para fincas costeras en Montgat. Tratamiento preventivo frente al salitre, mantenimiento de fachadas y gestión contable rigurosa.",
    neighborhoods: [
      {
        name: "Montgat Platja / Les Mallorquines",
        postalCode: "08390",
        buildingTypology: "Bloques residenciales con vistas al mar y complejos plurifamiliares.",
        commonIssues: ["Corrosión de carpinterías y armaduras por salinidad marina", "Filtraciones en cubiertas"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Normativa fiscal del Ajuntament de Montgat en transmisiones patrimoniales.",
      subsidiesInfo: "Ayudas para la rehabilitación integral de envolventes de edificios residenciales en el Maresme.",
      iteStatus: "Inspecciones de conservación estructural en ambientes de alta humedad marina."
    },
    faqs: [
      {
        question: "¿Cómo afecta el ambiente costero a las comunidades de Montgat y cómo lo tratáis?",
        answer: "El salitre acelera la oxidación del hormigón y las barandillas. Como peritos judiciales inmobiliarios colegiados, auditamos los planes de mantenimiento preventivo para evitar costosas derramas futuras por desprendimientos."
      }
    ],
    satisfiedCommunitiesCount: 34,
    managedUnitsCount: 520,
    testimonial: {
      author: "Marc Sala",
      role: "Presidente de Comunidad",
      neighborhood: "Les Mallorquines",
      quote: "Excelente gestión en la rehabilitación de nuestra fachada marina. Consiguieron una subvención del 40% y coordinaron a los industriales sin problemas para los vecinos.",
      year: 2025
    },
    priceRange: "€€"
  },

  "ripollet": {
    slug: "ripollet",
    cityName: "Ripollet",
    officialName: "Ripollet",
    province: "Barcelona",
    comarca: "Vallès Occidental",
    postalCodes: ["08291"],
    geo: {
      latitude: 41.4967,
      longitude: 2.1558
    },
    officeDistanceKm: 7.8,
    emergencyResponseTimeMinutes: 35,
    metaTitle: "Administrador de Fincas en Ripollet · Gesgrama",
    metaDescription: "Administración de fincas y comunidades en Ripollet. Control de morosidad, optimización de suministros y atención rápida a emergencias.",
    heroHeadline: "Administración de Fincas y Comunidades en Ripollet",
    heroSubtitle: "Gestión clara y eficiente para comunidades de propietarios en Ripollet. Reducción de costes de suministros comunitarios y asesoramiento legal sin comisiones ocultas.",
    neighborhoods: [
      {
        name: "Ripollet Centre / Can Mas",
        postalCode: "08291",
        buildingTypology: "Comunidades plurifamiliares de media densidad con garajes en sótano.",
        commonIssues: ["Mantenimiento de bombas de achique y fosos de ascensor", "Morosidad en cuotas ordinarias"]
      }
    ],
    localRegulations: {
      plusvaliaInfo: "Bonificaciones del Ajuntament de Ripollet para herencias familiares directas.",
      subsidiesInfo: "Subvenciones para instalación de placas solares comunitarias en el Vallès Occidental.",
      iteStatus: "Inspección técnica periódica obligatoria conforme a los plazos autonómicos."
    },
    faqs: [
      {
        question: "¿Qué incluye la cuota mensual de administración de Gesgrama?",
        answer: "Incluye contabilidad completa con conciliación bancaria mensual, emisión y cobro de recibos, tramitación de siniestros con el seguro sin coste extra, 1 junta ordinaria anual con acta oficial y visitas de control periódico a la finca."
      }
    ],
    satisfiedCommunitiesCount: 31,
    managedUnitsCount: 460,
    testimonial: {
      author: "Sonia Giménez",
      role: "Presidenta de Escalera",
      neighborhood: "Can Mas",
      quote: "Llevamos dos años con Gesgrama y todo funciona como un reloj suizo. Se acabaron las discusiones en las juntas porque las cuentas están totalmente detalladas y transparentes.",
      year: 2026
    },
    priceRange: "€€"
  }
};
