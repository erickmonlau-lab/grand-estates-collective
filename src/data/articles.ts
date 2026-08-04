import gesgramaFacade from "@/assets/gesgrama_modern_facade_twilight.webp";
import property1Img from "@/assets/real_exterior_white_1783264881525.webp";
import obraNuevaRealImg from "@/assets/art4_obra_nueva.webp";
import gallery1 from "@/assets/gallery-1.webp";
import gallery2 from "@/assets/gallery-2.webp";
import gallery3 from "@/assets/gallery-3.webp";
import property2 from "@/assets/property-2.webp";

export interface ArticleContent {
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  intro: string;
  sections: {
    heading: string;
    level: "h2" | "h3";
    content: string[];
    bulletPoints?: string[];
  }[];
  conclusion: string;
}

export interface Article {
  id: string;
  slug: string;
  image: string;
  datePublished: string;  // ISO 8601
  dateModified: string;   // ISO 8601
  es: ArticleContent;
  ca: ArticleContent;
  en: ArticleContent;
}

export const articles: Article[] = [
  {
    id: "art-1",
    slug: "que-es-un-asesor-inmobiliario-y-por-que-podrias-necesitarlo",
    image: property1Img,
    datePublished: "2025-03-09T08:00:00+01:00",
    dateModified: "2025-03-09T08:00:00+01:00",
    es: {
      title: "¿Qué es un asesor inmobiliario y por qué podrías necesitarlo en Santa Coloma?",
      summary: "Guía completa sobre las funciones, ventajas y valor estratégico de contar con un asesor inmobiliario profesional para vender o comprar un piso en Santa Coloma de Gramenet.",
      category: "Inmobiliaria",
      date: "9 marzo, 2025",
      readTime: "8 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "En un mercado tan activo y con singularidades propias como el de Santa Coloma de Gramenet y el área metropolitana de Barcelona, llevar a cabo una operación inmobiliaria exige mucho más que publicar un anuncio en internet. La figura del asesor inmobiliario se ha consolidado como un aliado imprescindible para proteger tu patrimonio, evitar errores legales costosos y optimizar el precio de compra o venta.",
      sections: [
        {
          heading: "¿Qué funciones desempeña exactamente un asesor inmobiliario profesional?",
          level: "h2",
          content: [
            "A diferencia de un intermediario ocasional, un asesor inmobiliario cualificado actúa como un consultor patrimonial de principio a fin. Su labor integra cuatro pilares fundamentales: análisis técnico-mercantil, estrategia publicitaria, gestión comercial y asesoramiento jurídico-fiscal.",
            "En la práctica diaria en Santa Coloma, el asesor realiza un estudio comparativo de mercado (ACM) utilizando cierres notariales reales en el barrio (Singuerlín, Centre, Fondo, etc.), lo que permite fijar un precio justo y competitivo que atraiga compradores cualificados sin perder rentabilidad."
          ],
          bulletPoints: [
            "Valoración profesional precisa basada en ventas reales y datos del Registro de la Propiedad.",
            "Elaboración de plan de comercialización con fotografía profesional, recorrido virtual y Home Staging.",
            "Filtrado riguroso de interesados: comprobación de solvencia económica y capacidad de financiación previa a la visita.",
            "Gestión documental completa: Cédula de Habitabilidad, Certificado Energético (CEE), nota simple registral y certificado de estar al corriente de pago de la comunidad."
          ]
        },
        {
          heading: "Fases clave del proceso de compraventa acompañado por Gesgrama",
          level: "h2",
          content: [
            "El acompañamiento profesional de Gesgrama se divide en etapas estructuradas para dar total seguridad al propietario y al comprador:",
            "1. Auditoría inicial del inmueble: comprobación de cargas, hipotecas pendientes, servidumbres y situación en el catastro municipal.",
            "2. Comercialización y negociación activa: recepción de ofertas por escrito con entrega de paga y señal, evitando especulaciones o reservas sin compromiso real.",
            "3. Redacción e intermediación del contrato de arras: asegurando cláusulas claras ajustadas a la normativa catalana.",
            "4. Coordinación notarial e hipotecaria: acompañamiento físico en la firma de la Escritura Pública y liquidación de impuestos asociados."
          ]
        },
        {
          heading: "¿Cuándo es imprescindible solicitar la ayuda de un experto?",
          level: "h2",
          content: [
            "Existen escenarios donde la complejidad de la operación hace casi indispensable la asistencia profesional:",
            "Venta de viviendas procedentes de herencias con múltiples herederos o herederos no residentes; transmisiones de pisos con inquilinos con contrato vigente; venta de inmuebles con afección de vicios ocultos o necesidad de liquidar una hipoteca puente."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones fiscales de IRPF aplicables a los honorarios de intermediación como gasto deducible para determinar la ganancia patrimonial neta].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el régimen de inscripción en el Registro de Agentes Inmobiliarios de Cataluña (AICAT) y las garantías exigidas en seguros de caución y responsabilidad civil profesional]."
          ]
        },
        {
          heading: "Preguntas Frecuentes sobre el Asesor Inmobiliario (FAQ)",
          level: "h3",
          content: [
            "¿Cuánto tarda de media en venderse un piso con asesor en Santa Coloma? Con una valoración correcta de mercado, el plazo medio de venta oscila entre 45 y 90 días.",
            "¿Quién asume el coste de la cédula y certificado energético? Corresponde al propietario vendedor, aunque en Gesgrama nos encargamos de su tramitación directa."
          ]
        }
      ],
      conclusion: "Contar con la experiencia de Gesgrama no representa un gasto adicional, sino una inversión inteligente que garantiza tranquilidad legal, ahorro de tiempo y el precio óptimo para tu inmueble."
    },
    ca: {
      title: "Què és un assessor immobiliari i per què podries necessitar-ho a Santa Coloma?",
      summary: "Guia completa sobre les funcions, avantatges i valor estratègic de comptar amb un assessor immobiliari professional per vendre o comprar a Santa Coloma.",
      category: "Immobiliària",
      date: "9 març, 2025",
      readTime: "8 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "En un mercat tan actiu com el de Santa Coloma de Gramenet i l'àrea metropolitana de Barcelona, dur a terme una operació immobiliària exigeix molt més que publicar un anunci a internet. La figura de l'assessor immobiliari és clau per protegir el teu patrimoni.",
      sections: [
        {
          heading: "Quines funcions desenvolupa exactament un assessor professional?",
          level: "h2",
          content: [
            "Un assessor immobiliari qualificat actua com a consultor patrimonial. A la pràctica diària a Santa Coloma, l'assessor realitza un estudi comparatiu de mercat utilitzant dades reals per fixar un preu competitiu."
          ],
          bulletPoints: [
            "Valoració professional basada en vendes reals.",
            "Pla de comercialització amb fotografia i difusió.",
            "Filtrat de compradors i comprovació de solvència.",
            "Gestió documental completa (Cèdula, CEE, nota simple)."
          ]
        },
        {
          heading: "Fases del procés acompanyat per Gesgrama",
          level: "h2",
          content: [
            "Auditoria inicial de l'immoble, comercialització, redacció de contracte d'arres i coordinació notarial."
          ]
        }
      ],
      conclusion: "Comptar amb l'experiència de Gesgrama et garanteix tranquil·litat legal, estalvi de temps i el millor preu."
    },
    en: {
      title: "What is a real estate advisor and why do you need one in Santa Coloma?",
      summary: "Comprehensive guide on the roles, benefits, and strategic value of hiring a professional real estate advisor in Santa Coloma de Gramenet.",
      category: "Real Estate",
      date: "March 9, 2025",
      readTime: "8 min read",
      author: "Gesgrama Real Estate Team",
      intro: "In an active property market like Santa Coloma de Gramenet, closing a real estate deal requires far more than posting an online listing. A expert real estate advisor protects your assets and optimizes sale outcomes.",
      sections: [
        {
          heading: "What does a professional real estate advisor do?",
          level: "h2",
          content: [
            "A qualified advisor acts as a comprehensive property consultant providing valuation, marketing, client screening, and legal support."
          ],
          bulletPoints: [
            "Accurate pricing based on registered comparative sales.",
            "Full marketing strategy: photography, virtual tours, staging.",
            "Pre-screening buyers for mortgage pre-approval.",
            "Complete document prep: occupancy license, energy certificate, registry note."
          ]
        }
      ],
      conclusion: "Working with Gesgrama is an investment in legal peace of mind, time savings, and maximum property return."
    }
  },
  {
    id: "art-2",
    slug: "que-es-un-contrato-de-exclusividad-inmobiliaria",
    image: gesgramaFacade,
    datePublished: "2025-03-04T08:00:00+01:00",
    dateModified: "2025-03-04T08:00:00+01:00",
    es: {
      title: "¿Qué es un contrato de exclusividad inmobiliaria y qué ventajas aporta al vendedor?",
      summary: "Descubre en qué consiste el encargo en exclusiva, qué obligaciones asume la agencia y por qué la venta en exclusiva suele lograr un mayor precio final.",
      category: "Inmobiliaria",
      date: "4 marzo, 2025",
      readTime: "7 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "Al momento de vender un piso en Santa Coloma de Gramenet, una de las decisiones más determinantes es elegir entre encargar la gestión a varias agencias de forma abierta o trabajar bajo un contrato de exclusiva compartida o dedicada. Aunque a primera vista pueda parecer que tener varias agencias publicando el piso aumenta las posibilidades de venta, la realidad del mercado demuestra lo contrario.",
      sections: [
        {
          heading: "¿En qué consiste exactamente el encargo de venta en exclusiva?",
          level: "h2",
          content: [
            "El contrato de encargo de venta en exclusiva es un acuerdo mercantil mediante el cual el propietario otorga a una única agencia de confianza la responsabilidad de gestionar la comercialización de su vivienda durante un periodo determinado.",
            "A cambio de esta dedicación única, la agencia asume un compromiso firme de inversión publicitaria, atención personalizada y defensa incondicional del precio fijado, evitando que el inmueble se devalúe al aparecer anunciado en internet con precios o datos discrepantes por parte de múltiples intermediarios."
          ],
          bulletPoints: [
            "Inversión publicitaria máxima: posicionamiento destacado en portales, tour 3D y campañas en redes sociales.",
            "Unidad de mensaje y control del precio: el piso no sufre quemado publicitario ni bajadas de precio desordenadas.",
            "Único interlocutor de confianza: el propietario trata siempre con el mismo asesor responsable.",
            "Filtro de seguridad: se registran los datos de identidad de todas las personas que realizan visitas a la vivienda."
          ]
        },
        {
          heading: "Mitos y realidades de la venta en exclusiva",
          level: "h2",
          content: [
            "Existe el mito de que la exclusiva 'bloquea' la venta a compradores de otras agencias. En Gesgrama trabajamos con exclusivas compartidas con la red inmobiliaria local, lo que significa que cualquier otra agencia seria con un comprador interesado puede colaborar con nosotros, mientras nosotros seguimos coordinando y protegiendo los intereses del vendedor.",
            "Esto multiplica la difusión del piso sin perder el control de la negociación ni el rigor contractual."
          ]
        },
        {
          heading: "Cláusulas esenciales y marco normativo del contrato",
          level: "h2",
          content: [
            "Un contrato de exclusiva transparente debe detallar con precisión la duración del encargo, los honorarios profesionales pactados, las acciones de marketing comprometidas y las condiciones de prórroga.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el plazo estándar del contrato de encargo (habitualmente entre 3 y 6 meses renovables por mutuo acuerdo) y el derecho de desistimiento de 14 días en contratos formalizados fuera de establecimiento mercantil (RDL 1/2007)].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar que la cláusula de penalización por venta directa por parte del propietario cumpla con la jurisprudencia de protección a consumidores y usuarios]."
          ]
        }
      ],
      conclusion: "El contrato de exclusiva con Gesgrama es un pacto de confianza recíproca diseñado para defender el valor real de tu vivienda y lograr la venta en el menor tiempo posible."
    },
    ca: {
      title: "Què és un contracte d'exclusivitat immobiliària i quines avantatges aporta?",
      summary: "Descobreix en què consisteix l'encàrrec en exclusiva, quines obligacions assumeix l'agència i per què s'assoleix un major preu final.",
      category: "Immobiliària",
      date: "4 març, 2025",
      readTime: "7 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "En vendre un pis a Santa Coloma de Gramenet, triar entre encarregar la gestió a diverses agències o treballar en exclusiva és decisiu. Treballar en exclusiva defensa el valor de l'habitatge.",
      sections: [
        {
          heading: "En què consisteix l'encàrrec de venda en exclusiva?",
          level: "h2",
          content: [
            "El contracte atorga a una única agència de confiança la responsabilitat de gestionar la comercialització durant un temps determinat."
          ]
        }
      ],
      conclusion: "El contracte d'exclusiva amb Gesgrama és un pacte de confiança dissenyat per defensar el valor de la teva meitat."
    },
    en: {
      title: "What is an exclusive real estate contract and how does it benefit sellers?",
      summary: "Learn what exclusive listings involve, agency commitments, and why exclusive management yields higher final sales prices.",
      category: "Real Estate",
      date: "March 4, 2025",
      readTime: "7 min read",
      author: "Gesgrama Real Estate Team",
      intro: "Choosing between multiple open non-exclusive listings or an exclusive representation agreement is crucial when selling a home in Santa Coloma. Exclusive listings preserve property value.",
      sections: [
        {
          heading: "What does an exclusive listing contract entail?",
          level: "h2",
          content: [
            "The agreement grants a single trusted agency full responsibility for managing the marketing and sale over a set duration."
          ]
        }
      ],
      conclusion: "An exclusive agreement with Gesgrama represents a mutual trust commitment focused on maximizing net seller proceed."
    }
  },
  {
    id: "art-3",
    slug: "que-es-un-perito-judicial-inmobiliario",
    image: obraNuevaRealImg,
    datePublished: "2025-02-20T08:00:00+01:00",
    dateModified: "2025-02-20T08:00:00+01:00",
    es: {
      title: "¿Qué es un perito judicial inmobiliario y cuándo es necesario su dictamen?",
      summary: "Funciones, metodología y utilidad de las valoraciones periciales judiciales en procesos de herencias, divorcios, deslindes o contenciosos en Santa Coloma.",
      category: "Servicios Jurídicos & Peritaje",
      date: "20 febrero, 2025",
      readTime: "8 min de lectura",
      author: "Gabinete Técnico Gesgrama",
      intro: "En situaciones de litigio, discrepancias familiares o requerimientos tributarios, determinar el valor objetivo e inobjetable de un bien inmueble es fundamental. La figura del perito judicial inmobiliario aporta rigor imparcial y validez legal ante los Tribunales de Justicia y las Administraciones Públicas.",
      sections: [
        {
          heading: "¿Qué es y qué funciones realiza un perito judicial inmobiliario?",
          level: "h2",
          content: [
            "Un perito judicial inmobiliario es un profesional experto con titulación técnica y formación especializada en valoración de bienes inmuebles, inscrito en los listados oficiales de los juzgados y colegios profesionales.",
            "Su cometido principal es emitir dictámenes periciales e informes técnicos que sirvan como prueba pericial en procedimientos judiciales (herencias, divorcios, ejecuciones hipotecarias) o en tasaciones contradictorias con la Administración."
          ],
          bulletPoints: [
            "Verificación presencial y examen detallado de la finca: estado de conservación, reformas, distribución y vicios ocultos.",
            "Análisis del entorno urbanístico en Santa Coloma de Gramenet y afectaciones del Plan General Metropolitano (PGM).",
            "Aplicación de métodos normalizados de valoración: coste de reemplazamiento, comparación de cierres reales y capitalización de rentas.",
            "Defensa y ratificación oral del dictamen ante el Juez en la vista de juicio."
          ]
        },
        {
          heading: "Casos habituales donde se requiere un peritaje judicial inmobiliario",
          level: "h2",
          content: [
            "1. Reparto de herencias familiares: para determinar el valor real de los pisos y evitar conflictos entre coherederos.",
            "2. Liquidación de sociedad de gananciales en divorcios: fijando el valor de mercado actualizado de la vivienda conyugal.",
            "3. Tasación Pericial Contradictoria (TPC): para impugnar la comprobación de valores realizada por la Agencia Tributaria de Cataluña cuando reclama un exceso de Impuesto de Transmisiones Patrimoniales (ITP).",
            "4. Procedimientos de incapacitación patrimonial o tutelas judiciales."
          ]
        },
        {
          heading: "Marco legal y validez del informe pericial",
          level: "h2",
          content: [
            "El dictamen emitiendo por el perito tiene carácter de medio de prueba documental y testimonial de máxima trascendencia procesal.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el cumplimiento de los Artículos 335 a 352 de la Ley de Enjuiciamiento Civil (LEC) relativos a la tacha de peritos, juramento de objetividad y procedimiento de aportación de dictámenes].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar los plazos legales para la solicitud e impugnación de la Tasación Pericial Contradictoria en el ámbito de la Ley General Tributaria (Ley 58/2003 Art. 135)]."
          ]
        }
      ],
      conclusion: "En Gesgrama contamos con peritos judiciales inscritos oficialmente para defender el valor justo de tus inmuebles con total rigor ante cualquier instancia."
    },
    ca: {
      title: "Què és un perit judicial immobiliari i quan és necessari el seu dictamen?",
      summary: "Funcions, metodologia i utilitat de les valoracions pericials en herències, divorcis i processos judicials a Santa Coloma.",
      category: "Serveis Jurídics & Peritatge",
      date: "20 febrer, 2025",
      readTime: "8 min de lectura",
      author: "Gabinet Tècnic Gesgrama",
      intro: "En situacions de litigi o discrepàncies familiars, determinar el valor d'un immoble és fonamental. El perit judicial aporta rigor imparcial i validesa legal.",
      sections: [
        {
          heading: "Què és i quines funcions realitza un perit judicial?",
          level: "h2",
          content: [
            "Un perit judicial immobiliari és un professional expert que emet dictàmens tècnics com a prova en procediments judicials o administratius."
          ]
        }
      ],
      conclusion: "A Gesgrama comptem amb perits judicials oficials per defensar el valor dels teus immobles."
    },
    en: {
      title: "What is a judicial real estate appraiser and when do you need an expert report?",
      summary: "Roles, methodology, and applications of expert judicial real estate valuations in inheritances, divorces, and court cases.",
      category: "Legal & Valuation Services",
      date: "February 20, 2025",
      readTime: "8 min read",
      author: "Gesgrama Technical Advisory",
      intro: "During dispute resolutions, inheritance settlements, or tax audits, determining exact real estate value requires impartial judicial expertise.",
      sections: [
        {
          heading: "What does a judicial real estate appraiser do?",
          level: "h2",
          content: [
            "A court-appointed or private expert appraiser produces formal legal valuation reports for judicial and tax proceedings."
          ]
        }
      ],
      conclusion: "Gesgrama provides certified expert appraisers to defend the true market value of your property in court."
    }
  },
  {
    id: "art-4",
    slug: "descubre-todo-sobre-una-vivienda-de-obra-nueva",
    image: obraNuevaRealImg,
    datePublished: "2025-01-28T08:00:00+01:00",
    dateModified: "2025-01-28T08:00:00+01:00",
    es: {
      title: "Descubre todo sobre una vivienda de obra nueva en el área metropolitana",
      summary: "Ventajas energéticas, compra sobre plano, garantías legales decenales y claves para elegir tu residencia a estrenar con total seguridad.",
      category: "Inmobiliaria",
      date: "28 enero, 2025",
      readTime: "8 min de lectura",
      author: "Departamento de Obra Nueva Gesgrama",
      intro: "Adquirir una vivienda de obra nueva es uno de los hitos más ilusionantes. La posibilidad de estrenar espacios diseñados bajo criterios arquitectónicos modernos, con máxima eficiencia energética y acabados de última generación, convierte a las promociones de obra nueva en una opción residencial altamente demandada en Santa Coloma de Gramenet y municipios colindantes.",
      sections: [
        {
          heading: "Principales ventajas de invertir en promociones de obra nueva",
          level: "h2",
          content: [
            "Frente a las viviendas de segunda mano que a menudo requieren reformas sustanciales e imprevistas, la obra nueva ofrece un estándar de confort inigualable desde el primer día.",
            "Las nuevas edificaciones incorporan sistemas de aislamiento térmico y acústico continuo (SATE), ventanales con rotura de puente térmico y climatización por aerotermia, lo que permite ahorros de hasta un 70% en las facturas mensuales de suministros."
          ],
          bulletPoints: [
            "Calificación energética A o B: menor huella de carbono y facturas reducidas.",
            "Garantías legales estructuradas conforme a la Ley de Ordenación de la Edificación (LOE).",
            "Posibilidad de personalización de distribuciones, suelos y acabados durante la construcción.",
            "Zonas comunitarias modernas: ascensores de alta velocidad, garaje adaptado a vehículos eléctricos y trasteros."
          ]
        },
        {
          heading: "Garantías legales que protegen al comprador de obra nueva",
          level: "h2",
          content: [
            "La legislación española establece tres niveles de cobertura obligatoria que la promotora debe garantizar:",
            "1. Garantía de 1 año para acabados y elementos de remate (pintura, ajuste de puertas, alicatados).",
            "2. Garantía de 3 años para elementos de habitabilidad e instalaciones (fontanería, electricidad, humedades, climatización).",
            "3. Garantía decenal (10 años) mediante Seguro Decenal para daños estructurales que afecten a la cimentación, vigas o muros de carga."
          ]
        },
        {
          heading: "Aspectos tributarios y proceso de compra sobre plano",
          level: "h2",
          content: [
            "La compra de obra nueva difiere fiscalmente de la vivienda de segunda mano. Al ser primera transmisión, la compraventa está sujeta a IVA y al Impuesto sobre Actos Jurídicos Documentados (IAJD).",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el tipo del IVA aplicable (10% con carácter general en vivienda libre, 4% en viviendas de protección oficial de régimen especial o promoción pública)].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el tipo de IAJD aplicable en Cataluña (1,5% general, con reducciones para jóvenes o personas con discapacidad)].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar que todas las entregas a cuenta realizadas durante la fase de construcción sobre plano estén avaladas o garantizadas mediante seguro o cuenta especial congelada conforme a la Ley 57/1968 y LOE]."
          ]
        }
      ],
      conclusion: "Adquirir obra nueva con el asesoramiento de Gesgrama te garantiza rigurosa verificación de avales promotores, control de plazos de entrega y la máxima revalorización futura."
    },
    ca: {
      title: "Descobreix tot sobre un habitatge d'obra nova",
      summary: "Avantatges energètics, compra sobre plànol, garanties legals i claus per triar la teva residència a estrenar.",
      category: "Immobiliària",
      date: "28 gener, 2025",
      readTime: "8 min de lectura",
      author: "Departament d'Obra Nova Gesgrama",
      intro: "Adquirir un habitatge d'obra nova és una opció excel·lent per gaudir de la màxima eficiència energètica i acabats moderns a Santa Coloma.",
      sections: [
        {
          heading: "Principals avantatges d'invertir en obra nova",
          level: "h2",
          content: [
            "Aïllaments tèrmics, aerotèrmia i estalvis de fins al 70% a les factures de subministraments."
          ]
        }
      ],
      conclusion: "Adquirir obra nova amb Gesgrama et garanteix seguretat jurídica i control de terminis."
    },
    en: {
      title: "Discover everything about new construction homes",
      summary: "Energy benefits, buying off-plan, 10-year warranties, and keys to choosing your brand-new dream residence.",
      category: "Real Estate",
      date: "January 28, 2025",
      readTime: "8 min read",
      author: "Gesgrama Development Advisory",
      intro: "Purchasing a brand-new home is an exciting life milestone. Enjoy pristine spaces, top-tier energy efficiency, and modern finishes in Santa Coloma.",
      sections: [
        {
          heading: "Core advantages of investing in new developments",
          level: "h2",
          content: [
            "Aerothermal climate systems and superior insulation cut utility bills by up to 70% compared to older resale buildings."
          ]
        }
      ],
      conclusion: "Acquiring new construction with Gesgrama's guidance ensures legal safety and maximum long-term asset value."
    }
  },
  {
    id: "art-5",
    slug: "guia-alquilar-vender-piso-singuerlin-centre-santa-coloma",
    image: gallery1,
    datePublished: "2025-03-15T09:00:00+01:00",
    dateModified: "2025-03-15T09:00:00+01:00",
    es: {
      title: "Guía para alquilar o vender tu piso en Singuerlín y Centre (Santa Coloma)",
      summary: "Análisis exhaustivo del mercado inmobiliario, precios por metro cuadrado, perfil de demanda y requisitos tributarios para propietarios en Singuerlín y el Centre.",
      category: "Inmobiliaria Local",
      date: "15 marzo, 2025",
      readTime: "9 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "Los barrios de Singuerlín y el Centre constituyen dos de los pilares residenciales más representativos de Santa Coloma de Gramenet. Mientras que Singuerlín atrae a familias por sus zonas tranquilas, vistas panorámicas y la conectividad de la línea L9N de metro, el Centre destaca por su vibrante tejido comercial, plazas históricas y cercanía al Ayuntamiento con acceso a la línea L1.",
      sections: [
        {
          heading: "Análisis del mercado inmobiliario en Singuerlín y Centre",
          level: "h2",
          content: [
            "En Singuerlín, la tipología predominante abarca pisos de 3 dormitorios con balcón exterior, muy valorados por compradores jóvenes procedentes de la propia localidad y de Barcelona. Las viviendas rehabilitadas con ascensor experimentan una rotación rápida en el mercado.",
            "Por su parte, en el Centre existe una alta concentración de edificios con solera y promociones reformadas. La escasez de oferta de alquiler en este distrito genera una fuerte presión de demanda por parte de profesionales e inquilinos solventes."
          ],
          bulletPoints: [
            "Singuerlín: excelente ratio calidad-precio y accesibilidad directa a la ronda y parque fluvial.",
            "Centre: máxima revalorización patrimonial y alta rentabilidad bruta de alquiler.",
            "Demanda compradora consolidada con necesidad de financiación hipotecaria entre el 80% y 90%."
          ]
        },
        {
          heading: "Pasos fundamentales para vender al mejor precio en ambos barrios",
          level: "h2",
          content: [
            "1. Realización de un Análisis Comparativo de Mercado (ACM) riguroso con datos de cierres reales en el barrio.",
            "2. Preparación documental previa: verificación de escrituras, cédula de habitabilidad e Inspección Técnica del Edificio (ITE) si la finca supera los 45 años.",
            "3. Presentación visual cuidada: despersonalización, pequeñas reparaciones de pintura y reportaje fotográfico de alta resolución."
          ]
        },
        {
          heading: "Marco normativo del alquiler e impuestos al propietario",
          level: "h2",
          content: [
            "Para los propietarios que optan por el arrendamiento de larga estancia, es imprescindible conocer la normativa de zonas tensionadas y las garantías de depósito de fianza.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la aplicación del índice de contención de rentas previsto en la Ley 12/2023 de Vivienda para zonas tensionadas en Santa Coloma de Gramenet, diferenciando entre pequeños y grandes tenedores].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el ingreso obligatorio de la fianza (1 mes en vivienda habitual) ante el Institut Català del Sòl (INCASÒL) en el plazo de 2 meses desde la firma del contrato para evitar sanciones].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones autonómicas en IRPF por rendimientos del capital inmobiliario y gastos de conservación y reparación de la vivienda arrendada]."
          ]
        },
        {
          heading: "Preguntas Frecuentes de propietarios en Singuerlín y Centre",
          level: "h3",
          content: [
            "¿Es obligatorio el certificado energético para alquilar? Sí, debe incluirse en los anuncios publicitarios y adjuntarse al contrato.",
            "¿Cuánto cuesta el trámite del depósito de fianza en INCASÒL? La tramitación ante el portal de INCASÒL es gratuita, y en Gesgrama la realizamos por ti."
          ]
        }
      ],
      conclusion: "Tanto si deseas vender como alquilar en Singuerlín o el Centre, Gesgrama te ofrece un acompañamiento local integral para asegurar la máxima rentabilidad y seguridad legal."
    },
    ca: {
      title: "Guia per llogar o vendre el teu pis a Singuerlín i Centre (Santa Coloma)",
      summary: "Anàlisi del mercat immobiliari, preus, demanda i requisits tributaris per a propietaris a Singuerlín i el Centre.",
      category: "Immobiliària Local",
      date: "15 març, 2025",
      readTime: "9 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "Els barris de Singuerlín i el Centre constitueixen dos dels pilars residencials més representatius de Santa Coloma de Gramenet. Conèixer el mercat local és essencial.",
      sections: [
        {
          heading: "Anàlisi del mercat a Singuerlín i Centre",
          level: "h2",
          content: [
            "A Singuerlín destaquen els pisos familiars amb balcó, mentre que al Centre hi ha una alta demanda d'alquiler per la seva activitat comercial."
          ]
        }
      ],
      conclusion: "Vendre o llogar a Singuerlín o Centre amb Gesgrama et garanteix la màxima rendibilitat i seguretat."
    },
    en: {
      title: "Guide to renting or selling your flat in Singuerlín and Centre (Santa Coloma)",
      summary: "In-depth property market analysis, pricing trends, buyer profiles, and tax rules for landlords in Singuerlín and Centre.",
      category: "Local Real Estate",
      date: "March 15, 2025",
      readTime: "9 min read",
      author: "Gesgrama Real Estate Team",
      intro: "Singuerlín and Centre are key residential hubs in Santa Coloma. Singuerlín appeals to families via L9N Metro access, while Centre is famous for historic charm and L1 Metro connection.",
      sections: [
        {
          heading: "Property market analysis in Singuerlín and Centre",
          level: "h2",
          content: [
            "Renovated 3-bedroom family flats with balconies move fast in Singuerlín, while Centre rental demand remains consistently high."
          ]
        }
      ],
      conclusion: "Renting or selling in Singuerlín or Centre with Gesgrama guarantees optimal market positioning and complete legal peace of mind."
    }
  },
  {
    id: "art-6",
    slug: "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
    image: gallery2,
    datePublished: "2025-03-22T09:00:00+01:00",
    dateModified: "2025-03-22T09:00:00+01:00",
    es: {
      title: "ITE y rehabilitación de edificios en Fondo, Santa Rosa y Can Mariner",
      summary: "Guía técnica integral sobre la Inspección Técnica de Edificios (ITE), conservación de fincas antiguas y subvenciones de rehabilitación en Santa Coloma.",
      category: "Administración de Fincas",
      date: "22 marzo, 2025",
      readTime: "9 min de lectura",
      author: "Departamento Técnico Gesgrama",
      intro: "Los barrios de Fondo, Santa Rosa y Can Mariner albergan una importante masa de edificios comunitarios construidos mayoritariamente durante el auge demográfico de las décadas de 1960 y 1970. Garantizar la solidez estructural, la seguridad de las fachadas y la eficiencia energética de estos inmuebles es una obligación legal y una oportunidad de revalorización patrimonial.",
      sections: [
        {
          heading: "¿Cuándo es obligatoria la ITE y qué elementos examina?",
          level: "h2",
          content: [
            "La Inspección Técnica del Edificio (ITE) es un examen de carácter preventivo realizado por un técnico competente (arquitecto o aparejador colegiado) que evalúa el estado general de conservación del inmueble.",
            "La inspección abarca la estructura horizontal y vertical, cimentación, fachadas exteriores y patios de luces, cubiertas y tejados, así como las redes comunitarias de saneamiento, agua y electricidad."
          ],
          bulletPoints: [
            "Inspección visual detallada y emisión de informe técnico oficial.",
            "Clasificación de deficiencias: Muy Graves, Graves, Leves o Sin Deficiencias.",
            "Redacción obligatoria del Libro del Edificio Existente y Plan de Mantenimiento.",
            "Obtención del Certificado de Aptitud emitido por la Agència de l'Habitatge de Catalunya."
          ]
        },
        {
          heading: "Consecuencias de no pasar la ITE o ignorar las deficiencias",
          level: "h2",
          content: [
            "No tramitar la ITE en el plazo correspondiente acarrea sanciones administrativas por parte del Ayuntamiento de Santa Coloma y dificulta seriamente la venta o contratación de hipotecas sobre los pisos de la finca.",
            "Además, en caso de deficiencias graves con riesgo de desprendimiento en fachada o grietas estructurales, la comunidad está obligada a ejecutar las obras de conservación de manera urgente."
          ]
        },
        {
          heading: "Subvenciones europeas Next Generation y ayudas públicas",
          level: "h2",
          content: [
            "Actualmente existen líneas extraordinarias de ayuda pública para subvencionar hasta el 80% del coste de obras de aislamiento térmico (SATE), renovación de cubiertas e instalación de ascensores en fincas que reduzcan el consumo energético.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el Decreto 67/2015 de la Generalitat de Catalunya sobre ITE y la obligatoriedad para edificios con más de 45 años de antigüedad].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones de IRPF por obras de rehabilitación energética (20%, 40% o 60% según la reducción del indicador de consumo de energía primaria no renovable)].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el régimen de mayorías simples o cualificadas requeridas en el Codi Civil de Catalunya para aprobar obras de rehabilitación y solicitud de subvenciones]."
          ]
        },
        {
          heading: "Preguntas Frecuentes sobre la ITE",
          level: "h3",
          content: [
            "¿Cada cuántos años debe renovarse el Certificado de Aptitud? Si el certificado es apto sin deficiencias, la vigencia es de 10 años.",
            "¿Quién debe pagar la ITE y las obras derivadas? Todos los propietarios de la comunidad según su coeficiente de participación."
          ]
        }
      ],
      conclusion: "El equipo de administración de fincas de Gesgrama coordina a los técnicos, tramita licencias y solicita las subvenciones máximas para que tu comunidad luzca segura y renovada."
    },
    ca: {
      title: "ITE i rehabilitació d'edificis a Fondo, Santa Rosa i Can Mariner",
      summary: "Guia tècnica sobre la Inspecció Tècnica d'Edificis (ITE), conservació de finques i subvencions a Santa Coloma.",
      category: "Administració de Finques",
      date: "22 març, 2025",
      readTime: "9 min de lectura",
      author: "Departament Tècnic Gesgrama",
      intro: "Els barris de Fondo, Santa Rosa i Can Mariner tenen edictis que requereixen manteniment estructural. Passar la ITE és una obligació legal i una oportunitat.",
      sections: [
        {
          heading: "Quan és obligatòria la ITE i què examina?",
          level: "h2",
          content: [
            "La ITE avalua l'estat de conservació de l'estructura, façanes, cobertes i instal·lacions comunitàries."
          ]
        }
      ],
      conclusion: "L'equip de Gesgrama coordina els tècnics i tramita les subvencions per a la teva comunitat."
    },
    en: {
      title: "Building Inspection (ITE) and renovation in Fondo, Santa Rosa, and Can Mariner",
      summary: "Comprehensive technical guide on mandatory building inspections, structural maintenance, and renovation grants in Santa Coloma.",
      category: "Property Management",
      date: "March 22, 2025",
      readTime: "9 min read",
      author: "Gesgrama Technical Department",
      intro: "Fondo, Santa Rosa, and Can Mariner feature established buildings that require periodic structural inspections to maintain safety and compliance.",
      sections: [
        {
          heading: "When is the ITE mandatory and what does it check?",
          level: "h2",
          content: [
            "The Technical Building Inspection evaluates structural integrity, facade safety, roofs, and communal utilities."
          ]
        }
      ],
      conclusion: "Gesgrama manages technical inspections, permits, and subsidy applications for homeowner associations."
    }
  },
  {
    id: "art-7",
    slug: "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
    image: gallery3,
    datePublished: "2025-03-28T09:00:00+01:00",
    dateModified: "2025-03-28T09:00:00+01:00",
    es: {
      title: "Plusvalía municipal y gastos al vender piso en Riera Alta-Llatí y El Raval",
      summary: "Desglose pormenorizado de la Plusvalía Municipal (IIVTNU), IRPF, aranceles notariales y costes registrales al vender en Santa Coloma de Gramenet.",
      category: "Asesoría Jurídica & Fiscal",
      date: "28 marzo, 2025",
      readTime: "8 min de lectura",
      author: "Área Jurídica Gesgrama",
      intro: "Al planificar la venta de una propiedad en barrios como Riera Alta-Llatí o El Raval de Santa Coloma de Gramenet, uno de los factores clave para calcular el beneficio neto real es anticipar los tributos y gastos obligatorios asociados a la transmisión inmobiliaria.",
      sections: [
        {
          heading: "La Plusvalía Municipal (IIVTNU) en Santa Coloma de Gramenet",
          level: "h2",
          content: [
            "El Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IIVTNU), conocido como Plusvalía Municipal, es un tributo local a favor del Ayuntamiento de Santa Coloma que grava el aumento de valor del suelo durante los años de tenencia.",
            "Tras la reforma legal introducida por el Real Decreto-ley 26/2021, los contribuyentes disponen de dos métodos alternativos para calcular la cuota tributaria, pudiendo elegir la opción económicamente más ventajosa:"
          ],
          bulletPoints: [
            "Método Objetivo: aplica unos coeficientes fijados en la ordenanza municipal sobre el valor catastral del suelo.",
            "Método Real: calcula la diferencia real entre el precio de venta del terreno y su precio de adquisición original.",
            "Exención por Pérdida Patrimonial: si se demuestra que la venta se realiza a pérdidas (precio de transmisión inferior al de compra), la operación está totalmente exenta del pago de plusvalía."
          ]
        },
        {
          heading: "IRPF por Ganancia Patrimonial e Impuestos Estatales",
          level: "h2",
          content: [
            "La ganancia patrimonial obtenida en la venta de un piso se integra en la base imponible del ahorro en la declaración de IRPF.",
            "La ganancia se calcula restando del valor de transmisión neto (precio de venta menos gastos e impuestos pagados) el valor de adquisición actualizado (precio de compra más gastos, notarías y reformas justificadas)."
          ]
        },
        {
          heading: "Gastos adicionales de gestión y exenciones aplicables",
          level: "h2",
          content: [
            "Otros costes a considerar son los gastos de cancelación registral de hipoteca anterior, honorarios de la agencia inmobiliaria y obtención de certificados.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el plazo de autoliquidación del IIVTNU (30 días hábiles para actos inter vivos y 6 meses en transmisiones por herencia)].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la exención total del IRPF por reinversión en vivienda habitual en un plazo máximo de 2 años anteriores o posteriores a la venta].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la exención total en IRPF por venta de vivienda habitual para personas mayores de 65 años o en situación de gran dependencia]."
          ]
        },
        {
          heading: "Preguntas Frecuentes sobre Plusvalía y Gastos",
          level: "h3",
          content: [
            "¿Quién debe pagar la plusvalía municipal en una compraventa? Corresponde por ley al vendedor, salvo pacto en contrario (inválido frente a Hacienda).",
            "¿Se pueden deducir los honorarios de la inmobiliaria? Sí, las facturas con IVA de la comisión inmobiliaria minoran la ganancia patrimonial en el IRPF."
          ]
        }
      ],
      conclusion: "En Gesgrama realizamos la simulación tributaria exacta antes de vender para que conozcas al céntimo tus beneficios netos de la venta."
    },
    ca: {
      title: "Plusvàlua municipal i despeses en vendre pis a Riera Alta-Llatí i El Raval",
      summary: "Desglossament de la Plusvàlua Municipal (IIVTNU), IRPF i despeses notarials a Santa Coloma de Gramenet.",
      category: "Assessorament Jurídic & Fiscal",
      date: "28 març, 2025",
      readTime: "8 min de lectura",
      author: "Àrea Jurídica Gesgrama",
      intro: "En vendre una propietat a Riera Alta-Llatí o El Raval de Santa Coloma, és clau calcular els impostos per conèixer el benefici net.",
      sections: [
        {
          heading: "La Plusvàlua Municipal (IIVTNU) a Santa Coloma",
          level: "h2",
          content: [
            "El IIVTNU és un tribut municipal sobre l'increment de valor del terreny. Es pot triar entre el mètode objectiu o real."
          ]
        }
      ],
      conclusion: "A Gesgrama realitzem la simulació tributària exacta abans de vendre."
    },
    en: {
      title: "Municipal capital gains tax and selling costs in Riera Alta-Llatí and El Raval",
      summary: "Detailed breakdown of the Municipal Plusvalía tax (IIVTNU), income tax (IRPF), notary, and registry fees in Santa Coloma.",
      category: "Legal & Tax Advisory",
      date: "March 28, 2025",
      readTime: "8 min read",
      author: "Gesgrama Legal Department",
      intro: "Selling a home in Riera Alta-Llatí or El Raval requires pre-calculating municipal and state tax obligations to determine exact net earnings.",
      sections: [
        {
          heading: "Municipal Plusvalía Tax in Santa Coloma de Gramenet",
          level: "h2",
          content: [
            "Sellers can choose between Objective Coefficient or Real Gain tax methods, with zero tax due if sold at a financial loss."
          ]
        }
      ],
      conclusion: "Gesgrama provides comprehensive pre-sale tax simulations to guarantee full legal and financial clarity."
    }
  },
  {
    id: "art-8",
    slug: "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
    image: property2,
    datePublished: "2025-04-02T09:00:00+01:00",
    dateModified: "2025-04-02T09:00:00+01:00",
    es: {
      title: "Claves para administrar tu comunidad en Riu Nord, Riu Sud y Oliveres-Can Serra",
      summary: "Guía práctica sobre gestión de fincas, quórums de votación bajo el Codi Civil de Catalunya, eficiencia de suministros y lucha contra la morosidad.",
      category: "Administración de Fincas",
      date: "2 abril, 2025",
      readTime: "9 min de lectura",
      author: "Administración de Fincas Gesgrama",
      intro: "Las comunidades de propietarios en los barrios de Riu Nord, Riu Sud y Oliveres-Can Serra comparten retos cotidianos en materia de mantenimiento preventivo, acuerdos en juntas de vecinos, optimización de costes energéticos y reclamación de impagados.",
      sections: [
        {
          heading: "El Codi Civil de Catalunya: marco legal de la propiedad horizontal",
          level: "h2",
          content: [
            "A diferencia del resto de España donde rige la Ley de Propiedad Horizontal estatal, en Cataluña las comunidades de propietarios se regulan por el Llibre Cinquè del Codi Civil de Catalunya (Articles 553-1 a 553-60).",
            "Esta normativa establece reglas específicas en cuanto a la convocatoria de juntas, cómputo de mayorías por doble quórum (propietarios y cuotas) y validez de acuerdos aprobados."
          ],
          bulletPoints: [
            "Mayoría simple: para acuerdos ordinarios de gestión, mantenimiento y reparaciones no suntuarias.",
            "Mayoría de cuatro quintos (4/5): para innovación de estatutos, desafectación de elementos comunes o cambios en la estructura.",
            "Unanimidad: requerida únicamente para modificaciones de cuotas de participación o extinción del régimen."
          ]
        },
        {
          heading: "Prevención y erradicación de la morosidad en la comunidad",
          level: "h2",
          content: [
            "El impago de cuotas ordinarias o derramas extraordinarias por parte de algún vecino desequilibra las cuentas comunitarias y paraliza obras necesarias.",
            "Una gestión profesional por parte de Gesgrama exige el control mensual de saldos e iniciar requerimientos de pago inmediatos antes de recurrir a la vía judicial mediante el procedimiento monitorio especial."
          ]
        },
        {
          heading: "Obligaciones comunitarias y garantía de cobro",
          level: "h2",
          content: [
            "La ley catalana otorga una fuerte protección a las comunidades frente a pisos deudores mediante la afección real del inmueble.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el Artículo 553-5 del Codi Civil de Catalunya sobre la afección real del piso por deudas comunitarias del año en curso y los 4 años anteriores con carácter preferente].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las mayorías para la aprobación de instalaciones de autoconsumo fotovoltaico o puntos de recarga de vehículos eléctricos en garajes comunitarios].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el régimen de conservación obligatoria de elementos comunes y eliminación de barreras arquitectónicas para personas con discapacidad o mayores de 70 años]."
          ]
        },
        {
          heading: "Preguntas Frecuentes sobre la Administración de Fincas",
          level: "h3",
          content: [
            "¿Quién puede ser Presidente de la Comunidad? Cualquier propietario elegido por turno rotatorio, sorteo o elección directa.",
            "¿Cómo solicitar presupuesto para cambiar de administrador? Gesgrama ofrece estudio económico sin compromiso e inclusión del punto en el orden del día."
          ]
        }
      ],
      conclusion: "Con la administración de Gesgrama, tu comunidad en Riu Nord, Riu Sud o Oliveres dispondrá de cuentas transparentes en línea, atención inmediata a averías y la máxima paz vecinal."
    },
    ca: {
      title: "Claus per administrar la teva comunitat a Riu Nord, Riu Sud i Oliveres-Can Serra",
      summary: "Guia sobre gestió de finques, quòrums de votació sota el Codi Civil de Catalunya i lluita contra la morositat.",
      category: "Administració de Finques",
      date: "2 d'abril, 2025",
      readTime: "9 min de lectura",
      author: "Administració de Finques Gesgrama",
      intro: "Les comunitats a Riu Nord, Riu Sud i Oliveres tenen reptes diaris en manteniment i convivència. El Codi Civil de Catalunya és el marc legal aplicable.",
      sections: [
        {
          heading: "El Codi Civil de Catalunya",
          level: "h2",
          content: [
            "A Catalunya les comunitats es regulen pel Llibre Cinquè del Codi Civil català."
          ]
        }
      ],
      conclusion: "Gesgrama ofereix administració transparent i atenció immediata a les averies."
    },
    en: {
      title: "Keys to managing your HOA in Riu Nord, Riu Sud, and Oliveres-Can Serra",
      summary: "Practical guide on property management, voting majorities under Catalan Civil Code, energy efficiency, and delinquency prevention.",
      category: "Property Management",
      date: "April 2, 2025",
      readTime: "9 min read",
      author: "Gesgrama Property Management",
      intro: "HOAs in Riu Nord, Riu Sud, and Oliveres-Can Serra face ongoing challenges in maintenance, budgeting, and debt collection under the Catalan Civil Code.",
      sections: [
        {
          heading: "The Catalan Civil Code: Legal HOA framework",
          level: "h2",
          content: [
            "In Catalonia, homeowner associations are governed by Book Five of the Catalan Civil Code setting specific double-majority rules."
          ]
        }
      ],
      conclusion: "Gesgrama provides transparent financial accounting, 24-hour incident response, and peaceful neighbor coexistence."
    }
  }
];
