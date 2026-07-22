import gesgramaFacade from "@/assets/gesgrama_modern_facade_twilight.webp";
import property1Img from "@/assets/property-1.webp";
import realExteriorImg from "@/assets/real_exterior_white_1783264881525.webp";
import brightAtriumImg from "@/assets/bright-atrium.webp";

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
  es: ArticleContent;
  ca: ArticleContent;
  en: ArticleContent;
}

export const articles: Article[] = [
  {
    id: "art-1",
    slug: "que-es-un-asesor-inmobiliario-y-por-que-podrias-necesitarlo",
    image: property1Img,
    es: {
      title: "¿Qué es un asesor inmobiliario y por qué podrías necesitarlo?",
      summary: "El asesor inmobiliario puede ser clave para comprar, vender o alquilar con éxito en el mercado actual de Barcelona.",
      category: "Inmobiliaria",
      date: "9 marzo, 2025",
      readTime: "5 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "En un mercado tan dinámico y competitivo como el de Barcelona y su área metropolitana, llevar a cabo una operación de compraventa o arrendamiento puede convertirse en un proceso complejo. Es aquí donde la figura del asesor inmobiliario cobra un valor estratégico imprescindible.",
      sections: [
        {
          heading: "¿Qué hace exactamente un asesor inmobiliario profesional?",
          level: "h2",
          content: [
            "Un asesor inmobiliario no es simplemente un intermediario entre comprador y vendedor. Su función principal es guiar, proteger y optimizar la transacción patrimonial en todas sus fases: técnica, jurídica, fiscal y comercial.",
            "Desde la valoración inicial basada en datos reales de mercado hasta la negociación del precio final y la preparación de las escrituras notariadas, el asesor cualificado asegura la máxima rentabilidad reduciendo los tiempos de cierre."
          ],
          bulletPoints: [
            "Estudio comparativo de mercado (ACM) con datos registrales actualizados.",
            "Plan de marketing integral: fotografía profesional, Home Staging y difusión en portales clave.",
            "Filtrado exhaustivo de compradores e inquilinos verificando su capacidad financiera.",
            "Asesoramiento contractual y revisión legal de cargas patrimoniales."
          ]
        },
        {
          heading: "Principales beneficios de contar con un asesor cualificado",
          level: "h2",
          content: [
            "Ahorro de tiempo y tranquilidad emocional son las ventajas más valoradas por nuestros clientes. Gestionar llamadas, coordinar visitas con perfiles no cualificados y negociar ofertas requiere dedicación plena.",
            "Además, el asesor inmobiliario evita errores legales habituales en redactado de arras o vicios ocultos que podrían acarrear sanciones o litigios futuros."
          ]
        },
        {
          heading: "¿Cuándo es imprescindible solicitar su ayuda?",
          level: "h3",
          content: [
            "Si vas a vender una vivienda heredada, si buscas invertir en activos residenciales con alta rentabilidad, o si necesitas alquilar con totales garantías de cobro, la intermediación profesional de Gesgrama marca la diferencia."
          ]
        }
      ],
      conclusion: "Contar con un asesor inmobiliario de confianza no representa un gasto, sino una inversión orientada a maximizar el valor de tu patrimonio con total seguridad jurídica."
    },
    ca: {
      title: "Què és un assessor immobiliari i per què podries necessitar-ho?",
      summary: "L'assessor immobiliari pot ser clau per comprar, vendre o llogar amb èxit en el mercat actual de Barcelona.",
      category: "Immobiliària",
      date: "9 març, 2025",
      readTime: "5 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "En un mercat tan dinàmic i competitiu com el de Barcelona i la seva àrea metropolitana, dur a terme una operació de compravenda o arrendament pot convertir-se en un procés complex. És aquí on la figura de l'assessor immobiliari pren un valor estratègic imprescindible.",
      sections: [
        {
          heading: "Què fa exactament un assessor immobiliari professional?",
          level: "h2",
          content: [
            "Un assessor immobiliari no és simplement un intermediari entre comprador i venedor. La seva funció principal és guiar, protegir i optimitzar la transacció patrimonial en totes les seves fases: tècnica, jurídica, fiscal i comercial.",
            "Des de la valoració inicial basada en dades reals de mercat fins a la negociació del preu final i la preparació de les escriptures notarials, l'assessor qualificat assegura la màxima rendibilitat reduint els temps de tancament."
          ],
          bulletPoints: [
            "Estudi comparatiu de mercat (ACM) amb dades registrals actualitzades.",
            "Pla de màrqueting integral: fotografia professional, Home Staging i difusió en portals clau.",
            "Filtrat exhaustiu de compradors i llogaters verificant la seva capacitat financera.",
            "Assessorament contractual i revisió legal de càrregues patrimonials."
          ]
        },
        {
          heading: "Principals beneficis de comptar amb un assessor qualificat",
          level: "h2",
          content: [
            "Estalvi de temps i tranquil·litat emocional són els avantatges més valorats pels nostres clients. Gestionar trucades, coordinar visites amb perfils no qualificats i negociar ofertes requereix dedicació plena.",
            "A més, l'assessor immobiliari evita errors legals habituals en redactat d'arres o vicis ocults que podrien comportar sancions o litigis futurs."
          ]
        },
        {
          heading: "Quan és imprescindible sol·licitar la seva ajuda?",
          level: "h3",
          content: [
            "Si vas a vendre un habitatge heretat, si busques invertir en actius residencials amb alta rendibilitat, o si necessites llogar amb totals garanties de cobrament, la intermediació professional de Gesgrama marca la diferència."
          ]
        }
      ],
      conclusion: "Comptar amb un assessor immobiliari de confiança no representa una despesa, sinó una inversió orientada a maximitzar el valor del teu patrimoni amb total seguretat jurídica."
    },
    en: {
      title: "What is a real estate advisor and why might you need one?",
      summary: "A real estate advisor can be key to buying, selling, or renting successfully in today's Barcelona market.",
      category: "Real Estate",
      date: "March 9, 2025",
      readTime: "5 min read",
      author: "Gesgrama Real Estate Team",
      intro: "In a dynamic and competitive market like Barcelona and its metropolitan area, executing a property sale or lease can become a complex undertaking. This is where a expert real estate advisor provides essential strategic value.",
      sections: [
        {
          heading: "What exactly does a professional real estate advisor do?",
          level: "h2",
          content: [
            "A real estate advisor is far more than a simple middleman. Their core role is to guide, safeguard, and optimize your transaction across technical, legal, tax, and commercial dimensions.",
            "From initial valuation based on real transaction data to final price negotiation and notary deed preparation, a qualified advisor secures maximum yield while shortening closing times."
          ],
          bulletPoints: [
            "Comparative Market Analysis (CMA) with updated registry data.",
            "Comprehensive marketing plan: professional photography, Home Staging, and portal distribution.",
            "Rigorous screening of buyers and tenants to verify financial capability.",
            "Contractual guidance and legal review of property encumbrances."
          ]
        },
        {
          heading: "Key benefits of hiring a qualified advisor",
          level: "h2",
          content: [
            "Time savings and emotional peace of mind are the advantages most valued by our clients. Managing calls, coordinating viewings with unverified leads, and negotiating offers requires dedicated focus.",
            "Furthermore, an experienced advisor prevents common legal errors in deposit agreements or hidden defect disputes that could cause future penalties."
          ]
        },
        {
          heading: "When is expert guidance essential?",
          level: "h3",
          content: [
            "Whether selling an inherited estate, investing in high-yield residential assets, or leasing with guaranteed rent collection, Gesgrama's professional advisory makes all the difference."
          ]
        }
      ],
      conclusion: "Partnering with a trusted real estate advisor is not an expense, but an investment aimed at maximizing the value of your assets with complete legal certainty."
    }
  },
  {
    id: "art-2",
    slug: "que-es-un-contrato-de-exclusividad-inmobiliaria",
    image: realExteriorImg,
    es: {
      title: "¿Qué es un contrato de exclusividad inmobiliaria?",
      summary: "Descubre cómo la nota de encargo en exclusiva acelera la venta y garantiza la máxima inversión publicitaria en tu inmueble.",
      category: "Inmobiliaria",
      date: "4 marzo, 2025",
      readTime: "6 min de lectura",
      author: "Departamento Jurídico Gesgrama",
      intro: "Al poner a la venta una vivienda, una de las dudas más frecuentes entre los propietarios es si conviene encargar la venta a múltiples agencias o firmar un acuerdo de exclusividad con una única entidad de confianza.",
      sections: [
        {
          heading: "Definición y funcionamiento de la nota de encargo en exclusiva",
          level: "h2",
          content: [
            "El contrato de exclusividad inmobiliaria es un acuerdo mediante el cual el propietario concede a una sola agencia el derecho de comercializar su propiedad durante un periodo determinado (habitualmente entre 3 y 6 meses).",
            "A cambio, la agencia asume un compromiso firme de inversión en marketing premium, asignación de recursos dedicados y máxima transparencia en el reporte de visitas."
          ]
        },
        {
          heading: "Ventajas de vender en exclusiva con Gesgrama",
          level: "h2",
          content: [
            "Contrario al mito urbano de que la exclusividad limita la difusión, vender con una única agencia seria multiplica las posibilidades de éxito:",
            "Evita la devaluación del inmueble que ocurre cuando aparece anunciado en portales con precios dispares o descripciones contradictorias por parte de varios intermediarios."
          ],
          bulletPoints: [
            "Mayor inversión publicitaria: tours virtuales 360°, destacos en portales y campañas de retargeting.",
            "Defensa firme del precio pactado sin prisas por comisiones rápidas.",
            "Un único interlocutor que centraliza y filtra las ofertas reales de compra.",
            "Compromiso contractual de valoración profesional gratuita."
          ]
        },
        {
          heading: "Cláusulas clave que debes revisar antes de firmar",
          level: "h3",
          content: [
            "Es fundamental comprobar la duración fijada, las condiciones de prórroga automática y los honorarios pactados. En Gesgrama ofrecemos contratos 100% transparentes, adaptados a la normativa de consumo vigente."
          ]
        }
      ],
      conclusion: "La exclusividad bien gestionada transforma la venta en una operación ordenada, rápida y rentable para el propietario."
    },
    ca: {
      title: "Què és un contracte d'exclusivitat immobiliària?",
      summary: "Descobreix com la nota d'encàrrec en exclusiva accelera la venda i garanteix la màxima inversió publicitària en el teu immoble.",
      category: "Immobiliària",
      date: "4 març, 2025",
      readTime: "6 min de lectura",
      author: "Departament Jurídic Gesgrama",
      intro: "En posar a la venda un habitatge, un dels dubtes més freqüents entre els propietaris és si convé encarregar la venda a múltiples agències o signar un acord d'exclusivitat amb una única entitat de confiança.",
      sections: [
        {
          heading: "Definició i funcionament de la nota d'encàrrec en exclusiva",
          level: "h2",
          content: [
            "El contracte d'exclusivitat immobiliària és un acord mitjançant el qual el propietari concedeix a una sola agència el dret de comercialitzar la seva propietat durant un període determinat (habitualment entre 3 i 6 mesos).",
            "A canvi, l'agència assumeix un compromís ferm d'inversió en màrqueting pòstum, assignació de recursos dedicats i màxima transparència en el repositori de visites."
          ]
        },
        {
          heading: "Avantatges de vendre en exclusiva amb Gesgrama",
          level: "h2",
          content: [
            "Contrari al mite urbà que l'exclusivitat limita la difusió, vendre amb una única agència seria multiplica les possibilitats d'èxit:",
            "Evita la devaluació de l'immoble que passa quan apareix anunciat en portals amb preus dispars o descripcions contradictòries per part de diversos intermediaris."
          ],
          bulletPoints: [
            "Major inversió publicitària: tours virtuals 360°, destacats en portals i campanyes de màrqueting directament dirigit.",
            "Defensa ferma del preu pactat sense presses per comissions ràpides.",
            "Un únic interlocutor que centralitza i filtra les ofertes reals de compra.",
            "Compromís contractual de valoració professional gratuïta."
          ]
        },
        {
          heading: "Clàusules clau que has de revisar abans de signar",
          level: "h3",
          content: [
            "És fonamental comprovar la durada fixada, les condicions de pròrroga automàtica i els honoraris pactats. A Gesgrama oferim contractes 100% transparents, adaptats a la normativa de consum vigent."
          ]
        }
      ],
      conclusion: "L'exclusivitat ben gestionada transforma la venda en una operació ordenada, ràpida i rendible per al propietari."
    },
    en: {
      title: "What is an exclusive real estate contract?",
      summary: "Discover how exclusive listing agreements speed up sales and guarantee maximum advertising investment in your property.",
      category: "Real Estate",
      date: "March 4, 2025",
      readTime: "6 min read",
      author: "Gesgrama Legal Department",
      intro: "When listing a home for sale, a common question among property owners is whether to work with multiple agencies or enter into an exclusive listing agreement with a single trusted firm.",
      sections: [
        {
          heading: "Definition and mechanics of exclusive listing agreements",
          level: "h2",
          content: [
            "An exclusive real estate contract is an agreement granting a single agency the sole right to market a property for a fixed period (typically 3 to 6 months).",
            "In exchange, the agency commits significant capital towards premium marketing, dedicated account management, and transparent reporting."
          ]
        },
        {
          heading: "Key advantages of selling exclusively with Gesgrama",
          level: "h2",
          content: [
            "Contrary to the myth that exclusivity restricts reach, listing with a top-tier firm maximizes success rates:",
            "It avoids property devaluation caused by duplicate listings with conflicting asking prices or descriptions across competing portals."
          ],
          bulletPoints: [
            "Greater marketing budget: 360° virtual tours, featured portal placements, and targeted ad campaigns.",
            "Strong protection of your asking price without pressure for quick commissions.",
            "A single point of contact centralizing and vetting serious inquiries.",
            "Contractual guarantee of free professional property appraisal."
          ]
        },
        {
          heading: "Critical clauses to inspect before signing",
          level: "h3",
          content: [
            "Always inspect the agreement duration, auto-renewal terms, and commission breakdown. Gesgrama contracts are 100% transparent and fully compliant with consumer rights legislation."
          ]
        }
      ],
      conclusion: "Well-managed exclusivity transforms a property sale into a structured, swift, and highly profitable transaction."
    }
  },
  {
    id: "art-3",
    slug: "que-es-un-perito-judicial-inmobiliario",
    image: gesgramaFacade,
    es: {
      title: "¿Qué es un perito judicial inmobiliario?",
      summary: "Un perito judicial inmobiliario aporta valor, rigor técnico y objetividad imparcial en procesos legales, herencias y dictámenes de tasación.",
      category: "Inmobiliaria",
      date: "20 febrero, 2025",
      readTime: "7 min de lectura",
      author: "Gabinete Técnico Gesgrama",
      intro: "En situaciones de litigio legal, repartos de herencia o procedimientos tributarios, disponer de una valoración imparcial respaldada por validez judicial es fundamental para defender los intereses patrimoniales.",
      sections: [
        {
          heading: "Función y competencias del perito judicial inmobiliario",
          level: "h2",
          content: [
            "El perito judicial inmobiliario es un profesional experto acreditado ante los tribunales de justicia con capacidad técnica para emitir informes periciales y dictámenes sobre el valor real de bienes inmuebles.",
            "Sus valoraciones no son meras estimaciones comerciales, sino dictámenes motivados basados en metodologías oficializadas (Orden ECO/805/2003) aplicables ante jueces y administraciones públicas."
          ]
        },
        {
          heading: "Ámbitos habituales de actuación",
          level: "h2",
          content: [
            "Las intervenciones periciales son requeridas habitualmente en diversos escenarios civiles, fiscales y mercantiles:",
            "En repartos de herencias familiares, el perito determina el valor exacto de los inmuebles para evitar desacuerdos y asegurar un reparto equitativo entre herederos."
          ],
          bulletPoints: [
            "Procedimientos de divorcio o disolución de regímenes de gananciales.",
            "Reclamaciones de plusvalía municipal y tasaciones periciales contradictorias frente a Hacienda.",
            "Dictámenes sobre patologías constructivas y vicios ocultos en edificaciones.",
            "Subastas judiciales y ejecuciones hipotecarias."
          ]
        },
        {
          heading: "Requisitos para que un dictamen pericial tenga validez judicial",
          level: "h3",
          content: [
            "El profesional debe contar con titulación adecuada, colegiación y estar inscrito en las listas oficiales de peritos de los Juzgados. En Gesgrama disponemos de técnicos cualificados con amplia experiencia procesal."
          ]
        }
      ],
      conclusion: "Un informe pericial riguroso es la mejor garantía documental para proteger la verdad económica de tus propiedades ante cualquier instancia judicial."
    },
    ca: {
      title: "Què és un perit judicial immobiliari?",
      summary: "Un perit judicial immobiliari aporta valor, rigor tècnic i objectivitat imparcial en processos legals, herències i dictàmens de taxació.",
      category: "Immobiliària",
      date: "20 febrer, 2025",
      readTime: "7 min de lectura",
      author: "Gabinet Tècnic Gesgrama",
      intro: "En situacions de litigi legal, repartiments d'herència o procediments tributaris, disposar d'una valoració imparcial avalada per validesa judicial és fonamental per defensar els interessos patrimonials.",
      sections: [
        {
          heading: "Funció i competències del perit judicial immobiliari",
          level: "h2",
          content: [
            "El perit judicial immobiliari és un professional expert acreditat davant els tribunals de justícia amb capacitat tècnica per emetre informes pericials i dictàmens sobre el valor real de béns immobles.",
            "Les seves valoracions no són meres estimacions comercials, sinó dictàmens motivats basats en metodologies oficialitzades aplicables davant jutges i administracions públiques."
          ]
        },
        {
          heading: "Àmbits habituals d'actuació",
          level: "h2",
          content: [
            "Les intervencions pericials són requerides habitualment en diversos escenaris civils, fiscals i mercantils:",
            "En repartiments d'herències familiars, el perit determina el valor exacte dels immobles per evitar desacords i assegurar un repartiment equitatiu entre hereus."
          ],
          bulletPoints: [
            "Procediments de divorci o dissolució de règims de guanyals.",
            "Reclamacions de plusvàlua municipal i taxacions pericials contradictòries enfront de Hisenda.",
            "Dictàmens sobre patologies constructives i vicis ocults en edificacions.",
            "Subastes judicials i execucions hipotecàries."
          ]
        },
        {
          heading: "Requisits perquè un dictamen pericial tingui validesa judicial",
          level: "h3",
          content: [
            "El professional ha de comptar amb titulació adequada, col·legiació i estar inscrit a les llistes oficials de perits dels Jutjats. A Gesgrama disposem de tècnics qualificats amb àmplia experiència processal."
          ]
        }
      ],
      conclusion: "Un informe pericial rigorós és la millor garantia documental per protegir la veritat econòmica de les teves propietats davant qualsevol instància judicial."
    },
    en: {
      title: "What is a judicial real estate appraiser?",
      summary: "A judicial real estate appraiser brings technical rigor, expert value, and objective testimony to court cases and inheritance divisions.",
      category: "Real Estate",
      date: "February 20, 2025",
      readTime: "7 min read",
      author: "Gesgrama Technical Department",
      intro: "In legal disputes, inheritance proceedings, or tax audits, having an impartial property valuation backed by full judicial validity is essential to protect your asset interests.",
      sections: [
        {
          heading: "Roles and qualifications of a judicial real estate appraiser",
          level: "h2",
          content: [
            "A judicial real estate appraiser is a court-certified technical expert accredited to issue official expert reports and testify on property valuations.",
            "Their appraisals are not casual commercial estimates, but formal technical reports based on regulatory frameworks accepted by courts and tax authorities."
          ]
        },
        {
          heading: "Common scenarios requiring judicial appraisal",
          level: "h2",
          content: [
            "Expert appraisal reports are routinely required across civil, corporate, and probate legal matters:",
            "In family inheritance proceedings, the appraiser establishes exact property market values to prevent disputes and facilitate equitable asset distribution."
          ],
          bulletPoints: [
            "Divorce proceedings and marital asset liquidation.",
            "Municipal capital gains tax appeals and tax authority valuation counter-reports.",
            "Building defect analyses and latent construction liability assessments.",
            "Judicial auctions and foreclosure proceedings."
          ]
        },
        {
          heading: "Legal requirements for admissible expert reports",
          level: "h3",
          content: [
            "The appraiser must hold recognized professional credentials, professional association membership, and active listing in court registries. Gesgrama's technical team offers certified litigation support."
          ]
        }
      ],
      conclusion: "A rigorous expert appraisal report is your strongest documentary defense for property values before judicial authorities."
    }
  },
  {
    id: "art-4",
    slug: "descubre-todo-sobre-una-vivienda-de-obra-nueva",
    image: brightAtriumImg,
    es: {
      title: "Descubre todo sobre una vivienda de obra nueva",
      summary: "Ventajas energéticas, proceso de compra sobre plano, garantías decenales y claves para elegir tu nueva vivienda a estrenar.",
      category: "Inmobiliaria",
      date: "28 enero, 2025",
      readTime: "5 min de lectura",
      author: "Asesoría de Desarrollo Gesgrama",
      intro: "Comprar una vivienda de obra nueva es uno de los hitos vitales más ilusionantes. La posibilidad de estrenar espacio, disfrutar de alta eficiencia energética y contar con acabados de vanguardia convierten a los desarrollos recién construidos en la opción preferida por muchos compradores.",
      sections: [
        {
          heading: "Principales ventajas de apostar por la obra nueva",
          level: "h2",
          content: [
            "Frente al mercado de segunda mano, las promociones de obra nueva destacan por incorporar innovaciones constructivas que impactan directamente en la calidad de vida y el ahorro mensual.",
            "Los aislamientos térmicos y acústicos de última generación, junto con sistemas de climatización por aerotermia, reducen el consumo energético hasta en un 70% en comparación con edificaciones de más de 20 años."
          ],
          bulletPoints: [
            "Calificación energética A o B con sistemas de aerotermia y ventilación de doble flujo.",
            "Garantías legales garantizadas por la Ley de Ordenación de la Edificación (LOE).",
            "Personalización de distribuciones y materiales durante la fase de construcción.",
            "Zonas comunitarias modernas: piscinas, gimnasio, jardines y garajes con preinstalación eléctrica."
          ]
        },
        {
          heading: "Garantías legales que protegen al comprador de obra nueva",
          level: "h2",
          content: [
            "La normativa española fija un esquema de coberturas escalonadas para salvaguardar la inversión del comprador:",
            "1 año para vicios de acabado o remates; 3 años para fallos de habitabilidad (humedades, instalaciones); y 10 años (Seguro Decenal) para defectos estructurales que afecten a cimientos o forjados."
          ]
        },
        {
          heading: "El proceso de compra paso a paso: de la reserva a la entrega de llaves",
          level: "h3",
          content: [
            "El itinerario comprende el contrato de reserva, la firma del contrato de compraventa con entregas a cuenta avaladas bancariamente, y la posterior inspección final previa a la escritura pública."
          ]
        }
      ],
      conclusion: "Adquirir obra nueva con el acompañamiento experto de Gesgrama te garantiza transparencia jurídica, control de plazos y la máxima revalorización de tu vivienda."
    },
    ca: {
      title: "Descobreix tot sobre un habitatge d'obra nova",
      summary: "Avantatges energètics, procés de compra sobre plànol, garanties decennals i claus per triar la teva nova habitatge a estrenar.",
      category: "Immobiliària",
      date: "28 gener, 2025",
      readTime: "5 min de lectura",
      author: "Assessorai de Desenvolupament Gesgrama",
      intro: "Comprar un habitatge d'obra nova és una de les fites vitals més il·lusionants. La possibilitat d'estrenar espai, gaudir d'alta eficiència energètica i comptar amb acabats de meitat de segle converteixen els desenvolupaments recentment construïts en l'opció preferida per molts compradors.",
      sections: [
        {
          heading: "Principals avantatges d'apostar per l'obra nova",
          level: "h2",
          content: [
            "Frontera al mercat de segona mà, les promocions d'obra nova destaquen per incorporar innovacions constructives que impacten directament en la qualitat de vida i l'estalvi mensual.",
            "Els aïllaments tèrmics i acústics d'última generació, juntament amb sistemes de climatització per aerotèrmia, redueixen el consum energètic fins a un 70% en comparació amb edificacions de més de 20 anys."
          ],
          bulletPoints: [
            "Qualificació energètica A o B amb sistemes d'aerotèrmia i ventilació de doble flux.",
            "Garanties legals garantides per la Llei d'Ordenació de l'Edificació (LOE).",
            "Personalització de distribucions i materials durant la fase de construcció.",
            "Zones comunitàries modernes: piscines, gimnàs, jardins i garatges amb preinstal·lació elèctrica."
          ]
        },
        {
          heading: "Garanties legals que protegeixen al comprador d'obra nova",
          level: "h2",
          content: [
            "La normativa espanyola fixa un esquema de cobertures escalonades per salvaguardar la inversió del comprador:",
            "1 any per vicis d'acabat; 3 anys per fallades d'habitabilitat; i 10 anys (Assegurança Decennal) per defectes estructurals que afectin fonaments o forjats."
          ]
        },
        {
          heading: "El procés de compra pas a pas: de la reserva a la lliurament de claus",
          level: "h3",
          content: [
            "L'itinerari comprèn el contracte de reserva, la signatura del contracte de compravenda amb lliuraments a compte avalats bancàriament, i la posterior inspecció final prèvia a l'escriptura pública."
          ]
        }
      ],
      conclusion: "Adquirir obra nova amb l'acompanyament expert de Gesgrama et garanteix transparència jurídica, control de terminis i la màxima revalorització del teu habitatge."
    },
    en: {
      title: "Discover everything about new construction homes",
      summary: "Energy benefits, buying off-plan, 10-year warranties, and keys to choosing your brand-new dream residence.",
      category: "Real Estate",
      date: "January 28, 2025",
      readTime: "5 min read",
      author: "Gesgrama Development Advisory",
      intro: "Purchasing a brand-new home is an exciting life milestone. The opportunity to enjoy pristine spaces, top-tier energy efficiency, and modern finishes makes new construction developments the top choice for discerning buyers.",
      sections: [
        {
          heading: "Core advantages of investing in new developments",
          level: "h2",
          content: [
            "Compared to resale properties, new construction offers architectural innovations that directly enhance quality of life and monthly utility savings.",
            "State-of-the-art thermal and acoustic insulation paired with aerothermal climate systems cut energy consumption by up to 70% versus 20-year-old buildings."
          ],
          bulletPoints: [
            "A or B energy ratings with aerothermal heating and dual-flow ventilation.",
            "Statutory warranties guaranteed under Building Regulation Laws (LOE).",
            "Customization options for layouts and finishes during initial build phases.",
            "Modern amenities: pools, gyms, landscaped gardens, and EV-ready parking."
          ]
        },
        {
          heading: "Legal warranties safeguarding new build buyers",
          level: "h2",
          content: [
            "Spanish real estate law sets clear tiered coverage periods to protect buyer capital:",
            "1-year cosmetic/finish defect coverage; 3-year habitability fault coverage (plumbing, humidity); and a 10-year structural warranty (Decennial Insurance)."
          ]
        },
        {
          heading: "The buying process step-by-step: reservation to handover",
          level: "h3",
          content: [
            "The journey includes reservation deposit, sales contract signing with bank-guaranteed installment payments, and final pre-closing walk-through inspection."
          ]
        }
      ],
      conclusion: "Acquiring new construction with Gesgrama's guidance ensures legal safety, strict timeline tracking, and maximum long-term asset value."
    }
  }
];
