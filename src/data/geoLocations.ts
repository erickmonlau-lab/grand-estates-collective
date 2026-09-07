export interface NeighborhoodDetail {
  slug: string;
  name: string;
  district: string;
  postalCode: string;
  buildingTypology: string;
  commonIssues: string[];
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  emergencyResponseMinutes: number;
  testimonial: {
    author: string;
    role: string;
    street: string;
    quote: string;
    year: number;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

// 14 BARRIS OFICIALS DE SANTA COLOMA DE GRAMENET (100% EXCLUSIVO SANTA COLOMA)
export const SANTA_COLOMA_BARRIOS: Record<string, NeighborhoodDetail> = {
  "centre": {
    slug: "centre",
    name: "Centre",
    district: "Districte 1",
    postalCode: "08921",
    buildingTypology: "Fincas clásicas y modernistas, edificios plurifamiliares consolidados con locales comerciales en planta baja y viviendas señoriales.",
    commonIssues: [
      "Rehabilitación y mantenimiento de balcones antiguos",
      "Modernización de ascensores antiguos adaptados a normativa",
      "Gestión de coeficientes de participación con locales de hostelería y comercio",
      "Control de ruidos y normativa de terrazas"
    ],
    metaTitle: "Administrador de Fincas en el Centre de Santa Coloma · Gesgrama",
    metaDescription: "Administración de comunidades en el Centre de Santa Coloma de Gramenet. Auditoría contable, conservación de fincas clásicas y mediación vecinal.",
    heroHeadline: "Administrador de Fincas en el Centre de Santa Coloma de Gramenet",
    heroSubtitle: "Gestión experta para comunidades en el núcleo histórico y comercial de Santa Coloma: Plaça de la Vila, Rambla de Sant Sebastià y calles peatonales. Máxima transparencia contable y atención presencial inmediata.",
    geo: { latitude: 41.4516, longitude: 2.2081 },
    emergencyResponseMinutes: 10,
    testimonial: {
      author: "Josep Maria Vidal",
      role: "Presidente de Comunidad",
      street: "Rambla Sant Sebastià",
      quote: "Llevamos más de 30 años en esta finca. Gesgrama solucionó el conflicto con los locales de la planta baja por los gastos de portal y rehabilitamos la fachada con una subvención que gestionaron ellos al 100%.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Cómo se gestionan los gastos de portal y ascensor con los locales del Centre?",
        answer: "Aplicamos estrictamente la Ley de Propiedad Horizontal y los estatutos de la finca, clarificando qué gastos corresponden por coeficiente general y cuáles están exentos según el título constitutivo, evitando litigios entre comerciantes y vecinos."
      },
      {
        question: "¿Cuál es el tiempo de respuesta ante una avería en el Centre?",
        answer: "Nuestra oficina está a escasos minutos: ante una fuga de agua, corte de luz o bloqueo de ascensor, un operario o técnico de Gesgrama se persona en menos de 10-15 minutos."
      },
      {
        question: "¿Cómo tramitáis las subvenciones de rehabilitación de fachadas en fincas clásicas del Centre?",
        answer: "Gestionamos el expediente integral ante el Consorci de l'Habitatge y el Ayuntamiento de Santa Coloma, coordinando proyecto técnico colegiado, licencias de ocupación de vía pública y andamios sin molestias para los propietarios."
      },
      {
        question: "¿Qué control y acceso tienen los vecinos a las cuentas bancarias de la comunidad?",
        answer: "Transparencia absoluta: entregamos balances periódicos claros donde cada céntimo está justificado con su factura original y extracto bancario digital accesible 24/7 sin comisiones opacas ni letra pequeña."
      }
    ]
  },

  "santa-rosa": {
    slug: "santa-rosa",
    name: "Santa Rosa",
    district: "Districte 5",
    postalCode: "08923",
    buildingTypology: "Fincas de gran densidad residencial construidas entre 1960 y 1975, muchas de ellas originariamente sin ascensor.",
    commonIssues: [
      "Instalación y bajada de ascensores a cota cero eliminando barreras arquitectónicas",
      "Inspección Técnica de Edificios (ITE) obligatoria y deficiencias en patios de luces",
      "Control exhaustivo de impagos y morosidad comunitaria",
      "Renovación de bajantes comunitarias de fecales"
    ],
    metaTitle: "Administrador de Fincas en Santa Rosa (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de comunidades en Santa Rosa, Santa Coloma. Especialistas en instalación de ascensor a cota cero, ITE y reducción de morosidad.",
    heroHeadline: "Administración de Comunidades en Santa Rosa (Santa Coloma)",
    heroSubtitle: "A escasos metros de nuestra sede en Av. dels Banús, 49. Especialistas en fincas de Santa Rosa: instalación de ascensores a cota cero, tramitación de ITEs y rescate de comunidades con alta morosidad.",
    geo: { latitude: 41.4445, longitude: 2.2136 },
    emergencyResponseMinutes: 5,
    testimonial: {
      author: "M. Carmen Rodríguez",
      role: "Presidenta de Escalera",
      street: "Carrer de Santa Rosa",
      quote: "Teníamos 7.000€ de morosidad y no podíamos afrontar la ITE. Gesgrama recuperó el dinero con acuerdos de pago y conseguimos la ayuda municipal para poner el ascensor a pie de calle.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Qué mayoría se necesita en Santa Rosa para instalar ascensor a cota cero?",
        answer: "Conforme al artículo 10.1.b de la LPH, la instalación de ascensor o rampa de accesibilidad es obligatoria cuando la solicite un propietario mayor de 70 años o con discapacidad, si el importe anual no excede de doce mensualidades ordinarias descontadas las subvenciones."
      },
      {
        question: "¿Cómo ayudáis a cobrar las cuotas a vecinos que no pagan en Santa Rosa?",
        answer: "Iniciamos reclamación fehaciente inmediata, mediamos planes de pago aplazados y, si no hay voluntad de pago, activamos el procedimiento monitorio judicial con nuestro equipo de asesoría jurídica propio sin sobrecoste de honorarios."
      },
      {
        question: "¿Qué ocurre si nuestra finca en Santa Rosa aún no ha superado la ITE obligatoria?",
        answer: "Coordinamos la visita del arquitecto colegiado, solicitamos prórroga legal ante el Ayuntamiento para evitar sanciones y calendarizamos las obras prioritarias de patios de luces o balcones con presupuestos comparativos contrastados."
      },
      {
        question: "¿Cómo cambiamos de administrador si el actual no rinde cuentas en Santa Rosa?",
        answer: "Os asesoramos para convocar una Junta Extraordinaria con orden del día legal. En cuanto se aprueba por mayoría simple, nosotros nos personamos en 48h para recoger toda la documentación, claves y cuentas sin fricciones."
      }
    ]
  },

  "can-mariner": {
    slug: "can-mariner",
    name: "Can Mariner",
    district: "Districte 5",
    postalCode: "08923",
    buildingTypology: "Edificios residenciales de media y alta densidad alrededor de la histórica masía de Can Mariner.",
    commonIssues: [
      "Mantenimiento de cubiertas y filtraciones de lluvia",
      "Modernización de cuadros eléctricos comunitarios",
      "Optimización de tarifas de luz comunitaria y seguro de incendios"
    ],
    metaTitle: "Administrador de Fincas en Can Mariner (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de fincas en Can Mariner, Santa Coloma de Gramenet. Auditoría de costes comunitarios, resolución de incidencias en minutos y cercanía total.",
    heroHeadline: "Administrador de Fincas en Can Mariner (Santa Coloma)",
    heroSubtitle: "Servicio ultra-cercano y presencial para las comunidades de Can Mariner. Control riguroso de cada euro de la comunidad y respuesta técnica en menos de 10 minutos.",
    geo: { latitude: 41.4472, longitude: 2.2114 },
    emergencyResponseMinutes: 8,
    testimonial: {
      author: "Francesc Llopis",
      role: "Presidente",
      street: "Carrer Milà i Fontanals",
      quote: "Desde que Gesgrama lleva la finca, las cuentas se entienden a la primera. Renegociaron el contrato de la luz de la escalera y el seguro y nos ahorramos más de 600€ al año.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Cómo se hace el traspaso si cambiamos de administrador en Can Mariner?",
        answer: "Nosotros nos encargamos de todo: enviamos la comunicación oficial al administrador saliente, recogemos los libros de actas, contratos y cuentas bancarias, y realizamos una auditoría inicial sin coste alguno."
      },
      {
        question: "¿Qué ahorro medio conseguís al revisar contratos de luz y seguro en Can Mariner?",
        answer: "En fincas de Can Mariner solemos detectar pólizas desfasadas con coberturas duplicadas o potencias eléctricas mal dimensionadas, logrando reducir entre 400€ y 800€ anuales directos en el presupuesto ordinario."
      },
      {
        question: "¿Cómo se abordan las humedades y filtraciones de las cubiertas en Can Mariner?",
        answer: "Realizamos peritaje con empresas impermeabilizadoras homologadas de Santa Coloma, emitimos tres presupuestos ciegos comparativos y gestionamos el siniestro con la compañía aseguradora comunitaria para cubrir el coste indemnizable."
      },
      {
        question: "¿Se realizan visitas periódicas de control al edificio?",
        answer: "Sí, revisamos presencialmente el estado del vestíbulo, iluminación comunitaria, cuartos de contadores y limpieza mensual para certificar la calidad de los proveedores contratados."
      }
    ]
  },

  "fondo": {
    slug: "fondo",
    name: "Fondo",
    district: "Districte 6",
    postalCode: "08922",
    buildingTypology: "Edificaciones plurifamiliares con gran rotación de inquilinos, locales comerciales densos y comunidades de vecinos heterogéneas.",
    commonIssues: [
      "Gestión de la convivencia y regularización urgente de cuotas comunitarias",
      "Reparación urgente de bajantes generales y atascos de fecales",
      "Instalación de cerraduras de seguridad en portales",
      "Actas claras bilingües y canales ágiles de WhatsApp"
    ],
    metaTitle: "Administrador de Fincas en Fondo (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de comunidades en Fondo, Santa Coloma de Gramenet. Cobro de morosidad, resolución urgente de averías y mediación vecinal eficaz.",
    heroHeadline: "Administración de Fincas y Comunidades en el Fondo (Santa Coloma)",
    heroSubtitle: "Especialistas en la gestión de comunidades complejas en el barrio de Fondo. Cobro riguroso de cuotas, control de accesos al portal y resolución de averías en menos de 20 minutos.",
    geo: { latitude: 41.4485, longitude: 2.2185 },
    emergencyResponseMinutes: 12,
    testimonial: {
      author: "Manuel Santos",
      role: "Presidente de Comunidad",
      street: "Carrer Mossèn Camil Rosell",
      quote: "Nadie quería ser presidente en nuestra escalera porque nadie pagaba y el portal estaba destrozado. Gesgrama puso orden, instaló puerta blindada y hoy la escalera está limpia y al día de pagos.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Qué hacéis si en una comunidad del Fondo hay impagos generalizados?",
        answer: "Auditamos la deuda de cada vivienda, enviamos requerimientos con valor probatorio legal, ofrecemos facilidades de fraccionamiento a familias con dificultad real y demandamos judicialmente a los morosos recalcitrantes con nuestro propio abogado colegiado."
      },
      {
        question: "¿Cómo gestionáis la mediación vecinal y convivencia en fincas de alta rotación?",
        answer: "Disponemos de protocolos de convivencia claros, información comunitaria explicativa en varios idiomas y mediación directa vecinal presencial para resolver ruidos, basuras en zonas comunes y uso de rellanos."
      },
      {
        question: "¿Qué solución aplicáis a las averías recurrentes de bajantes e instalaciones viejas en Fondo?",
        answer: "Trabajamos con lampistas y fontaneros homologados con servicio de desatasco urgente 24h. Negociamos tarifas fijas anuales que abaratan el coste por intervención frente a avisos particulares de urgencia."
      },
      {
        question: "¿Por qué elegir Gesgrama para una comunidad en el barrio de Fondo?",
        answer: "Porque estamos físicamente al lado en Av. dels Banús, 49. Conocemos las particularidades urbanísticas de cada calle del barrio y no somos una agencia impersonal en Barcelona: estamos a pie de calle."
      }
    ]
  },

  "singuerlin": {
    slug: "singuerlin",
    name: "Singuerlín",
    district: "Districte 3",
    postalCode: "08924",
    buildingTypology: "Edificios en desnivel pronunciado, torres aisladas, viviendas con terrazas y garajes comunitarios.",
    commonIssues: [
      "Humedades por filtración y contención de tierras en laderas",
      "Mantenimiento de muros perimetrales y canalizaciones de aguas pluviales",
      "Eficiencia energética en cubiertas expuestas al viento",
      "Mantenimiento de puertas automáticas de garaje"
    ],
    metaTitle: "Administrador de Fincas en Singuerlín (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de comunidades y edificios en Singuerlín, Santa Coloma. Expertos en filtraciones de laderas, garajes, ITE y control contable transparente.",
    heroHeadline: "Administración de Fincas y Comunidades en Singuerlín (Santa Coloma)",
    heroSubtitle: "Gestión técnica adaptada a la orografía de Singuerlín: resolución de humedades por contención de tierras, mantenimiento de garajes colectivos y control estricto de presupuestos de obra.",
    geo: { latitude: 41.4589, longitude: 2.2118 },
    emergencyResponseMinutes: 15,
    testimonial: {
      author: "Rosa Maria Torres",
      role: "Presidenta de Escalera",
      street: "Avinguda de Catalunya",
      quote: "Teníamos filtraciones en el muro del garaje que ningún técnico solucionaba. El perito de Gesgrama vino en persona, redactó el informe pericial y la constructora se hizo cargo de la reparación.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Disponéis de arquitectos técnicos propios para fincas con humedades en Singuerlín?",
        answer: "Sí, en Gesgrama contamos con la titulación oficial de Perito Judicial Inmobiliario colegiado, lo que nos permite diagnosticar el origen exacto de las filtraciones y defender a la comunidad ante aseguradoras o constructoras."
      },
      {
        question: "¿Cómo se resuelven las deficiencias de presión de agua y grupos de bombeo en Singuerlín?",
        answer: "Por la orografía y desniveles de Singuerlín, muchos edificios requieren grupos de presión y aljibes. Contratamos empresas de mantenimiento preventivo para evitar cortes de suministro a plantas altas."
      },
      {
        question: "¿Qué subvenciones existen para rehabilitación energética en fincas de Singuerlín?",
        answer: "Tramitamos las ayudas de los fondos Next Generation y convocatorias autonómicas de eficiencia térmica en envolventes y fachadas, consiguiendo hasta un 60-80% de subvención a fondo perdido para la comunidad."
      },
      {
        question: "¿Tenéis atención presencial si el presidente necesita firmar documentos o aclarar dudas?",
        answer: "Totalmente. Singuerlín cuenta con atención inmediata de nuestro equipo colegiado y desplazamientos continuos a las fincas administradas."
      }
    ]
  },

  "riera-alta": {
    slug: "riera-alta",
    name: "Riera Alta",
    district: "Districte 2",
    postalCode: "08921",
    buildingTypology: "Fincas de altura media con viviendas amplias y locales en planta baja.",
    commonIssues: [
      "Renovación de acometidas comunitarias de agua",
      "Inspección de cubiertas comunitarias y terrazas privativas",
      "Aislamiento térmico y subvenciones NextGen"
    ],
    metaTitle: "Administrador de Fincas en Riera Alta (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de fincas en Riera Alta, Santa Coloma de Gramenet. Transparencia en cuentas, control de proveedores y atención de urgencias en 15 min.",
    heroHeadline: "Administrador de Fincas en Riera Alta (Santa Coloma)",
    heroSubtitle: "Atención directa y cercana en el barrio de Riera Alta. Auditoría gratuita de gastos comunitarios, respuesta inmediata a siniestros de agua y total transparencia bancaria.",
    geo: { latitude: 41.4542, longitude: 2.2045 },
    emergencyResponseMinutes: 12,
    testimonial: {
      author: "Albert Gómez",
      role: "Vocal de Comunidad",
      street: "Carrer Riera Alta",
      quote: "Excelente comunicación. Cualquier avería se reporta por WhatsApp y la atienden el mismo día. Las juntas son ágiles y las actas llegan a casa al día siguiente.",
      year: 2026
    },
    faqs: [
      {
        question: "¿Cómo supervisáis las obras de la comunidad en Riera Alta?",
        answer: "No cobramos comisiones de industriales. Solicitamos siempre 3 presupuestos ciegos de empresas contrastadas, supervisamos la ejecución y no liberamos el pago final hasta que la obra está formalmente recibida a satisfacción de la junta."
      },
      {
        question: "¿Cómo se solucionan las humedades por capilaridad en plantas bajas de Riera Alta?",
        answer: "Diagnosticamos el origen exacto del nivel freático o filtración con técnicos especialistas, aplicando tratamientos definitivos de inyección de resinas o drenajes perimetrales avalados con garantía."
      },
      {
        question: "¿Qué criterio se sigue para la elección de empresas de limpieza y conservación en Riera Alta?",
        answer: "Presentamos siempre 3 presupuestos de empresas locales verificadas, con contratos que exigen fichajes y auditorías de servicio periódicas por parte de nuestro despacho."
      },
      {
        question: "¿Cuánto cobra Gesgrama por administrar una finca en Riera Alta?",
        answer: "Nuestros honorarios son transparentes, sin costes sorpresa por emisión de certificados ordinarios o fotocopias. Ofrecemos cotización cerrada adaptada al número de entidades."
      }
    ]
  },

  "llati": {
    slug: "llati",
    name: "Llatí",
    district: "Districte 2",
    postalCode: "08921",
    buildingTypology: "Comunidades residenciales tranquilas, bloques de vecinos de 3 a 5 plantas con reformas recientes.",
    commonIssues: [
      "Pintura y mantenimiento preventivo de patios de luces",
      "Sustitución de bajantes de fibrocemento / plomo",
      "Instalación de iluminación LED con detector de presencia para ahorro de luz"
    ],
    metaTitle: "Administrador de Fincas en el Llatí (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de comunidades en el barrio del Llatí, Santa Coloma de Gramenet. Ahorro en suministros, ITE de edificios y atención telefónica directa.",
    heroHeadline: "Administración de Comunidades de Propietarios en el Llatí",
    heroSubtitle: "Tranquilidad y orden contable para las escaleras del barrio del Llatí. Traspaso gratuito de administración, revisión de contratos y trato familiar.",
    geo: { latitude: 41.4528, longitude: 2.2012 },
    emergencyResponseMinutes: 12,
    testimonial: {
      author: "Montserrat Esteve",
      role: "Presidenta de Escalera",
      street: "Carrer del Llatí",
      quote: "Cambiamos a Gesgrama porque el anterior administrador cobraba por cada fotocopia y certificado. Con ellos la tarifa es fija, clara y el trato es inmejorable.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Hay costes ocultos o comisiones por tramitar siniestros del seguro en el Llatí?",
        answer: "Cero. Nuestra tarifa de administración es cerrada: incluye tramitación integral de partes al seguro de la finca sin comisión alguna por siniestro."
      },
      {
        question: "¿Cómo se coordina el mantenimiento de zonas comunitarias y patios en el Llatí?",
        answer: "Establecemos un calendario preventivo de conservación de sumideros, impermeabilización de azoteas comunitarias y revisión de claraboyas para prevenir goteras estacionales."
      },
      {
        question: "¿Cómo afrontamos la instalación de ascensor si la escalera es muy estrecha en el Llatí?",
        answer: "Estudiamos con arquitectos soluciones por patio interior de luces o modificación del ojo de la escalera, aprovechando ayudas públicas para garantizar la viabilidad técnica y económica."
      },
      {
        question: "¿Cómo se tramita una avería urgente fuera de horario de oficina en el Llatí?",
        answer: "Disponemos de un teléfono y canal de emergencias activo las 24 horas y los 365 días del año con derivación inmediata a industriales homologados de Santa Coloma."
      }
    ]
  },

  "el-raval": {
    slug: "el-raval",
    name: "El Raval",
    district: "Districte 4",
    postalCode: "08923",
    buildingTypology: "Fincas tradicionales y bloques de viviendas cerca del parque fluvial del Besòs.",
    commonIssues: [
      "Tratamiento de humedades por proximidad freática al río Besòs",
      "Rehabilitación de fachadas posteriores",
      "Gestión de certificados de aptitud ITE"
    ],
    metaTitle: "Administrador de Fincas en El Raval (Santa Coloma) · Gesgrama",
    metaDescription: "Administrador colegiado en El Raval de Santa Coloma. Protección de edificios cerca del Besòs, ITE, asesoría jurídica y cuentas claras.",
    heroHeadline: "Administración de Fincas en El Raval (Santa Coloma de Gramenet)",
    heroSubtitle: "Especialistas en la conservación y gestión de edificios en El Raval de Santa Coloma. Cuentas claras, control de humedad freática y asesoramiento técnico permanente.",
    geo: { latitude: 41.4429, longitude: 2.2064 },
    emergencyResponseMinutes: 10,
    testimonial: {
      author: "Carlos Méndez",
      role: "Presidente",
      street: "Carrer Montcada",
      quote: "Gestionaron el cambio de acometida general y el saneamiento del patio de luces sin derramas imprevistas, financiando la obra con los fondos propios de la comunidad.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Cómo combatís los problemas de humedad en fincas de El Raval?",
        answer: "Analizamos si el origen es condensación, capilaridad o filtración del nivel freático, redactando dictamen pericial e implementando soluciones definitivas con aislamiento de solera y ventilación mecánica."
      },
      {
        question: "¿Cómo combatimos la morosidad persistente en comunidades del Raval?",
        answer: "Aplicamos el protocolo judicial exprés: certificación fehaciente de deuda en Junta, burofax con acuse de recibo y ejecución monitoria judicial sin adelanto de costas abusivas."
      },
      {
        question: "¿Qué trámites realizáis ante ruidos o molestias vecinales en el Raval?",
        answer: "Intervenimos mediante requerimiento formal firmado por la presidencia bajo el amparo del artículo 7.2 de la LPH, coordinando mediación directa con los propietarios y la Policía Local."
      },
      {
        question: "¿Podemos consultar las facturas y saldos de la comunidad por internet?",
        answer: "Sí, disponéis de portal digital y liquidaciones trimestrales detalladas donde se reflejan ingresos, gastos y saldos bancarios conciliados céntimo a céntimo."
      }
    ]
  },

  "riu-nord": {
    slug: "riu-nord",
    name: "Riu Nord",
    district: "Districte 4",
    postalCode: "08921",
    buildingTypology: "Grandes bloques de viviendas con espacios comunitarios, cercanos al río Besòs y paseo fluvial.",
    commonIssues: [
      "Mantenimiento de zonas ajardinadas y pasajes comunes",
      "Control de derramas para impermeabilización de cubiertas",
      "Optimización de costes energéticos"
    ],
    metaTitle: "Administrador de Fincas en Riu Nord (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de comunidades en Riu Nord, Santa Coloma de Gramenet. Auditoría energética, mantenimiento de zonas comunes y gestión transparente.",
    heroHeadline: "Administrador de Fincas en Riu Nord (Santa Coloma de Gramenet)",
    heroSubtitle: "Gestión profesional y transparente para las comunidades del Riu Nord. Optimización de contratos colectivos, mantenimiento de zonas comunes y app 24/7 para propietarios.",
    geo: { latitude: 41.4482, longitude: 2.2031 },
    emergencyResponseMinutes: 10,
    testimonial: {
      author: "Elena Navarro",
      role: "Presidenta de Comunidad",
      street: "Passeig Llorenç Serra",
      quote: "Con Gesgrama cada vecino puede ver las facturas en la aplicación móvil antes de que se paguen. La transparencia es total y se acabaron las sospechas en las juntas.",
      year: 2026
    },
    faqs: [
      {
        question: "¿Tienen los vecinos acceso a las facturas y extractos bancarios de Riu Nord?",
        answer: "Sí, a través de nuestra plataforma online y app móvil exclusiva, accesible 24 horas al día, 365 días al año."
      },
      {
        question: "¿Qué mantenimiento preventivo necesitan los garajes y pasajes en Riu Nord?",
        answer: "Inspecciones periódicas de ventilación forzada, detección de monóxido de carbono, extintores reglamentarios y mantenimiento de puertas motorizadas con marcado CE."
      },
      {
        question: "¿Cómo se resuelven las filtraciones producidas por bajantes pluviales en Riu Nord?",
        answer: "Acudimos en menos de una hora para contener siniestros activos y tramitamos la sustitución con cargo a la póliza del seguro comunitario o causante directo."
      },
      {
        question: "¿Qué mayoría hace falta para cambiar a Gesgrama en una comunidad de Riu Nord?",
        answer: "Solo mayoría simple de los propietarios presentes y representados en Junta convocada. Nosotros nos encargamos de redactar el punto del día y tramitar el traspaso completo."
      }
    ]
  },

  "riu-sud": {
    slug: "riu-sud",
    name: "Riu Sud",
    district: "Districte 4",
    postalCode: "08923",
    buildingTypology: "Bloques plurifamiliares con portales múltiples y aparcamientos subterráneos en la zona sur del paseo fluvial.",
    commonIssues: [
      "Mantenimiento de colectores de pluviales y vados de garaje",
      "Seguridad en portales y telefonillos comunitarios",
      "Inspección periódica de ITE"
    ],
    metaTitle: "Administrador de Fincas en Riu Sud (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de comunidades en Riu Sud, Santa Coloma. Especialistas en garajes comunitarios, ITE y control riguroso de morosidad.",
    heroHeadline: "Administración de Fincas y Comunidades en Riu Sud (Santa Coloma)",
    heroSubtitle: "Servicio ágil y resolutivo para las comunidades de Riu Sud. Gestión experta de garajes comunitarios, mantenimiento de colectores y asesoramiento legal sin intermediarios.",
    geo: { latitude: 41.4402, longitude: 2.2089 },
    emergencyResponseMinutes: 10,
    testimonial: {
      author: "Javier Moreno",
      role: "Presidente de Mancomunidad",
      street: "Carrer de les Balmes",
      quote: "Llevamos dos años con Gesgrama gestionando nuestro bloque y el garaje de 45 plazas. Muy eficientes con el mantenimiento de la puerta automática y la limpieza.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Gestionáis también mancomunidades de garajes en Riu Sud?",
        answer: "Sí, administramos garajes independientes y mancomunados, gestionando vados, revisiones de extintores, bombas de achique y emisión de mandos a distancia."
      },
      {
        question: "¿Cómo se optimizan los gastos de fincas con amplios portales en Riu Sud?",
        answer: "Revisamos contratos de limpieza por horas efectivas y sustitución de luminarias tradicionales por detectores microondas con LED, bajando el consumo eléctrico hasta un 45%."
      },
      {
        question: "¿Cómo se actúa ante ocupaciones ilegales o usurpación de zonas comunes?",
        answer: "Acción preventiva y legal contundente: blindaje de accesos, cámaras de seguridad homologadas conforme a la AEPD y personación legal inmediata ante los juzgados."
      },
      {
        question: "¿Presentáis los impuestos obligatorios de la comunidad en Riu Sud?",
        answer: "Sí, cumplimentamos y presentamos todas las obligaciones tributarias (modelo 347, retenciones IRPF) en plazo legal, evitando recargos y sanciones a los propietarios."
      }
    ]
  },

  "can-franquesa": {
    slug: "can-franquesa",
    name: "Can Franquesa",
    district: "Districte 3",
    postalCode: "08924",
    buildingTypology: "Grandes bloques en altura ubicados en la parte alta de la ciudad, con vistas panorámicas y accesos en rampa.",
    commonIssues: [
      "Mantenimiento de ascensores de largo recorrido y maquinaria",
      "Impermeabilización de cubiertas expuestas a inclemencias",
      "Gestión de ayudas para aislamiento de fachadas SATE"
    ],
    metaTitle: "Administrador de Fincas en Can Franquesa (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de grandes bloques en Can Franquesa, Santa Coloma de Gramenet. Mantenimiento de ascensores, fachadas, subvenciones NextGen y morosidad.",
    heroHeadline: "Administración de Comunidades en Can Franquesa (Santa Coloma)",
    heroSubtitle: "Gestión especializada para los grandes bloques de Can Franquesa. Control riguroso de contratos de mantenimiento de ascensores, fachadas y planes de ahorro en calefacción y luz.",
    geo: { latitude: 41.4651, longitude: 2.2152 },
    emergencyResponseMinutes: 15,
    testimonial: {
      author: "Antonio Ramos",
      role: "Presidente de Bloque",
      street: "Carrer de Còrdova",
      quote: "En un bloque de 40 vecinos los problemas se multiplican si el gestor no está encima. Con Gesgrama tenemos respuesta inmediata y logramos rebajar la factura del ascensor un 25%.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Cómo auditáis los contratos de ascensores en Can Franquesa?",
        answer: "Revisamos las cláusulas de permanencia, excluimos conceptos abusivos y negociamos precios corporativos con las principales empresas mantenedoras aprovechando nuestro volumen de comunidades."
      },
      {
        question: "¿Cómo se gestiona el mantenimiento de las grandes torres y grupos de presión en Can Franquesa?",
        answer: "Supervisión especializada de grupos de bombeo de agua sanitaria, pararrayos, sistemas de ventilación de emergencia y doble línea de ascensores de alta velocidad."
      },
      {
        question: "¿Cómo se tramita la ITE y rehabilitación de fachadas en altura en Can Franquesa?",
        answer: "Gestionamos proyectos técnicos con andamios colgantes o trabajos verticales homologados, tramitando subvenciones públicas que alivian el coste para las familias del bloque."
      },
      {
        question: "¿Cómo contactar con Gesgrama en caso de avería durante el fin de semana?",
        answer: "A través de nuestra línea directa de emergencias 24/7 que moviliza a los técnicos homologados de guardia de manera inmediata sin esperas."
      }
    ]
  },

  "les-oliveres": {
    slug: "les-oliveres",
    name: "Les Oliveres",
    district: "Districte 3",
    postalCode: "08924",
    buildingTypology: "Complejos residenciales plurifamiliares con espacios peatonales y áreas comunitarias en la ladera de la Serralada de Marina.",
    commonIssues: [
      "Conservación de elementos estructurales y escalinatas exteriores",
      "Gestión de canalizaciones de pluviales en pendiente",
      "Control de presupuestos comunitarios de pintura y portería"
    ],
    metaTitle: "Administrador de Fincas en Les Oliveres (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de fincas en Les Oliveres, Santa Coloma. Especialistas en conservación de zonas comunes, pluviales, ITE y contabilidad transparente.",
    heroHeadline: "Administrador de Fincas en Les Oliveres (Santa Coloma de Gramenet)",
    heroSubtitle: "Cuidado patrimonial y gestión transparente para las comunidades de Les Oliveres. Conservación preventiva de estructuras, tramitación de ITEs y solución a la morosidad.",
    geo: { latitude: 41.4632, longitude: 2.2084 },
    emergencyResponseMinutes: 15,
    testimonial: {
      author: "Nuria Martí",
      role: "Presidenta de Escalera",
      street: "Carrer de les Oliveres",
      quote: "Gran rigor y profesionalidad. Tuvimos un problema con la bajante principal que afectaba a varios vecinos y lo gestionaron en pocas horas con el seguro.",
      year: 2026
    },
    faqs: [
      {
        question: "¿Qué ocurre con las ITEs en comunidades de Les Oliveres?",
        answer: "Coordinamos la inspección técnica obligatoria con arquitectos técnicos especializados, tramitamos el Certificado de Aptitud ante la Generalitat y gestionamos las obras necesarias si hay deficiencias."
      },
      {
        question: "¿Qué tratamiento damos a las filtraciones provocadas por el desnivel del terreno?",
        answer: "Inspección de muros de contención perimetrales, canalizaciones de aguas pluviales y reparación de juntas de dilatación para asegurar la estabilidad del inmueble."
      },
      {
        question: "¿Cómo se estructuran los pagos de derramas para obras grandes en Les Oliveres?",
        answer: "Planes fraccionados a medida y negociación de financiación bancaria comunitaria sin necesidad de avales personales de los vecinos."
      },
      {
        question: "¿Qué experiencia tiene Gesgrama en comunidades de Les Oliveres?",
        answer: "Más de 30 años en Santa Coloma de Gramenet administrando fincas en todas las zonas de la ciudad, conociendo a la perfección sus singularidades urbanas."
      }
    ]
  },

  "la-guinardera": {
    slug: "la-guinardera",
    name: "La Guinardera",
    district: "Districte 3",
    postalCode: "08924",
    buildingTypology: "Zona residencial mixta con fincas plurifamiliares y proximidad a equipamientos deportivos y naturales.",
    commonIssues: [
      "Mantenimiento de instalaciones de gas y electricidad comunitaria",
      "Revisión de cubiertas y aislamiento acústico",
      "Control de gastos ordinarios y fondo de reserva"
    ],
    metaTitle: "Administrador de Fincas en La Guinardera (Santa Coloma) · Gesgrama",
    metaDescription: "Administración de comunidades en La Guinardera, Santa Coloma de Gramenet. Cuentas claras, mantenimiento ágil y atención de averías en 15 min.",
    heroHeadline: "Administración de Comunidades en La Guinardera (Santa Coloma)",
    heroSubtitle: "Gestión clara, eficiente y cercana para las fincas de La Guinardera. Mantenimiento preventivo, optimización de cuotas y asesoramiento jurídico inmobiliario.",
    geo: { latitude: 41.4598, longitude: 2.2041 },
    emergencyResponseMinutes: 15,
    testimonial: {
      author: "Daniel Castro",
      role: "Presidente de Comunidad",
      street: "Carrer de la Guinardera",
      quote: "Muy satisfechos con el trato de Gesgrama. Son puntuales, explican las cuentas con total claridad y no hay sorpresas a fin de año.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Cómo se gestiona el fondo de reserva de la comunidad?",
        answer: "Conforme a la ley catalana de propiedad horizontal, mantenemos el fondo de reserva legal (mínimo el 5% del presupuesto ordinario) en cuenta bancaria separada y remunerada a nombre exclusivo de la comunidad."
      },
      {
        question: "¿Cómo se gestiona la convivencia entre viviendas y naves o locales en La Guinardera?",
        answer: "Delimitación rigurosa de cuotas de participación, control de pesos y ruidos en accesos rodados y vigilancia de horarios de carga y descarga conforme a ordenanzas locales."
      },
      {
        question: "¿Qué mantenimiento preventivo se aplica a bajantes y canalones expuestos?",
        answer: "Limpieza de arquetas y bajantes dos veces al año (especialmente en otoño y primavera) para evitar desbordamientos e inundaciones de portales o sótanos."
      },
      {
        question: "¿Cómo fiscaliza Gesgrama a las empresas de mantenimiento contratadas?",
        answer: "Revisión presencial de partes de trabajo y retención de pagos de liquidación hasta comprobar que la avería u obra ha quedado 100% resuelta."
      }
    ]
  },

  "cementiri-vell": {
    slug: "cementiri-vell",
    name: "Cementiri Vell",
    district: "Districte 1",
    postalCode: "08921",
    buildingTypology: "Edificaciones residenciales consolidadas en el entorno tradicional de Santa Coloma.",
    commonIssues: [
      "Rehabilitación de cornisas y elementos de fachada",
      "Adecuación de portales a normativa de accesibilidad",
      "Auditoría de suministros de agua y luz de escalera"
    ],
    metaTitle: "Administrador de Fincas en Cementiri Vell (Santa Coloma) · Gesgrama",
    metaDescription: "Gestión de fincas en el Cementiri Vell, Santa Coloma de Gramenet. Auditoría de gastos, mantenimiento de fachadas y atención inmediata.",
    heroHeadline: "Administrador de Fincas en Cementiri Vell (Santa Coloma)",
    heroSubtitle: "Administración profesional y cercana para las comunidades del barrio de Cementiri Vell. Máxima transparencia contable, respuesta rápida y peritaje judicial propio.",
    geo: { latitude: 41.4504, longitude: 2.2058 },
    emergencyResponseMinutes: 10,
    testimonial: {
      author: "Pilar Sánchez",
      role: "Presidenta de Escalera",
      street: "Carrer Sant Jeroni",
      quote: "Nos cambiamos a Gesgrama cansados de presupuestos inflados. En el primer trimestre nos bajaron la cuota de la comunidad 15€ por vecino negociando con el seguro y el ascensor.",
      year: 2025
    },
    faqs: [
      {
        question: "¿Con cuánta antelación se entregan las cuentas antes de la junta ordinaria?",
        answer: "Enviamos la convocatoria formal con el estado de cuentas detallado, facturas desglosadas y presupuesto del nuevo ejercicio al menos 15 días antes de la reunión para que todos los vecinos puedan revisarlo con calma."
      },
      {
        question: "¿Cómo se gestiona el cambio de ascensor en fincas consolidadas de Cementiri Vell?",
        answer: "Elaboración de pliego técnico de condiciones, solicitud de presupuestos a las principales marcas y dirección de obra hasta la legalización en el Departament d'Indústria."
      },
      {
        question: "¿Qué tratamiento damos a las plagas o salubridad en patios y alcantarillado?",
        answer: "Convenios directos con empresas de desinfección y desratización autorizadas de Santa Coloma para intervenciones de choque y revisiones preventivas anuales."
      },
      {
        question: "¿Cómo resolvemos disputas vecinales sin llegar a los tribunales?",
        answer: "Mediación vecinal activa en nuestro despacho de Av. dels Banús o en la propia finca, basándonos en la normativa vigente y el sentido común comunitario."
      }
    ]
  }
};
