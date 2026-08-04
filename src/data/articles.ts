import art1Img from "@/assets/art1_asesor_inmobiliario.jpg";
import art2Img from "@/assets/art2_contrato_exclusividad.jpg";
import art3Img from "@/assets/art3_perito_judicial.jpg";
import obraNuevaRealImg from "@/assets/art4_obra_nueva.webp";
import art5Img from "@/assets/art5_singuerlin_centre.jpg";
import art6Img from "@/assets/art6_ite_rehabilitacion.jpg";
import art7Img from "@/assets/art7_plusvalia_fiscal.jpg";
import art8Img from "@/assets/art8_comunidad_propietarios.jpg";

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
  datePublished: string;
  dateModified: string;
  es: ArticleContent;
  ca: ArticleContent;
  en: ArticleContent;
}

export const articles: Article[] = [
  // ─────────────────────────────────────────────
  // ARTÍCULO 1 — Asesor inmobiliario
  // ─────────────────────────────────────────────
  {
    id: "art-1",
    slug: "que-es-un-asesor-inmobiliario-y-por-que-podrias-necesitarlo",
    image: art1Img,
    datePublished: "2025-03-09T08:00:00+01:00",
    dateModified: "2025-03-09T08:00:00+01:00",
    es: {
      title: "¿Qué es un asesor inmobiliario y por qué podrías necesitarlo?",
      summary: "Descubre en qué consiste el trabajo real de un asesor inmobiliario profesional, qué ventajas aporta al comprador y vendedor, y por qué en el mercado de Santa Coloma de Gramenet su papel es más decisivo que nunca.",
      category: "Inmobiliaria",
      date: "9 marzo, 2025",
      readTime: "9 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "En los últimos años, el mercado inmobiliario en Santa Coloma de Gramenet ha experimentado una transformación profunda. Los precios de compraventa se han ajustado, la demanda de alquiler ha crecido con fuerza y los compradores son cada vez más exigentes e informados. En este escenario, la figura del asesor inmobiliario profesional ha dejado de ser un lujo para convertirse en una necesidad real para cualquier persona que quiera vender, comprar o arrendar un inmueble con garantías.",
      sections: [
        {
          heading: "Más allá del intermediario: qué hace realmente un asesor inmobiliario",
          level: "h2",
          content: [
            "Existe una confusión frecuente entre el concepto de 'intermediario' y el de 'asesor inmobiliario'. El primero se limita a poner en contacto a comprador y vendedor y cobrar una comisión. El asesor inmobiliario profesional va mucho más lejos: actúa como consultor estratégico que acompaña al cliente en cada fase del proceso, desde la primera valoración del inmueble hasta la firma de la escritura ante notario.",
            "En la práctica diaria, esto significa que el asesor de Gesgrama realiza un Análisis Comparativo de Mercado (ACM) exhaustivo, cruzando datos de ventas cerradas recientes en el barrio específico donde se ubica el inmueble —ya sea en Singuerlín, Fondo, Centre o Riera Alta-Llatí— para determinar un precio de salida competitivo que atraiga compradores cualificados sin sacrificar el margen del propietario.",
            "Además, el asesor se convierte en el filtro de seguridad de toda la operación. Comprueba la solvencia financiera de los interesados antes de concertar visitas, verifica que el inmueble no presenta cargas ocultas mediante la nota simple registral, coordina la obtención de la Cédula de Habitabilidad y el Certificado de Eficiencia Energética (CEE), y revisa cada cláusula del contrato de arras para garantizar que los intereses del cliente están completamente protegidos."
          ],
          bulletPoints: [
            "Valoración profesional precisa basada en cierres registrales reales del barrio, no en precios de oferta de portales.",
            "Plan de comercialización completo: fotografía con cámara profesional, vídeo de recorrido virtual 360° y Home Staging.",
            "Filtrado de compradores: comprobación de hipoteca preaprobada o capacidad de pago documentada antes de la visita.",
            "Gestión documental: Cédula de Habitabilidad, CEE, nota simple, certificado de deudas de la comunidad y últimos recibos de IBI.",
            "Acompañamiento jurídico: revisión del contrato de arras, coordinación notarial y liquidación de impuestos."
          ]
        },
        {
          heading: "Por qué intentar vender solo es más caro de lo que parece",
          level: "h2",
          content: [
            "Muchos propietarios calculan el coste de un asesor mirando únicamente el porcentaje de honorarios y deciden que es mejor ahorrar ese importe gestionando la venta por su cuenta. Este razonamiento, aunque comprensible, suele ser un error financiero.",
            "El primer problema es el precio de salida. Sin acceso a datos reales de mercado, los propietarios tienden a sobrevalorar su vivienda —un fenómeno conocido como 'sesgo de propietario'— lo que genera un largo periodo de exposición sin ofertas, el temido 'quemado' del inmueble. Cuando finalmente bajan el precio, lo hacen más de lo necesario, perdiendo más margen que si hubieran contratado un asesor desde el principio.",
            "El segundo problema es el tiempo. Gestionar llamadas de curiosos no cualificados, coordinar visitas a deshoras, negociar con compradores que no tienen financiación aprobada y redactar correctamente un contrato de arras son tareas que consumen decenas de horas y generan un estrés considerable. El asesor profesional absorbe toda esa carga operativa.",
            "El tercer problema, y el más grave, es el legal. Una cláusula mal redactada en el contrato de arras puede acarrear la pérdida de la señal o abrir la puerta a reclamaciones judiciales por vicios ocultos. En Santa Coloma, donde una parte significativa de los inmuebles tiene décadas de antigüedad, la revisión técnica y legal previa es absolutamente indispensable."
          ]
        },
        {
          heading: "Situaciones donde el asesor es imprescindible",
          level: "h2",
          content: [
            "Aunque toda compraventa se beneficia de un acompañamiento profesional, hay escenarios donde su presencia pasa de ser recomendable a ser imprescindible:",
            "Venta de viviendas procedentes de herencias: cuando hay varios herederos involucrados —especialmente si alguno reside en el extranjero o tiene intereses contrapuestos—, la gestión del proceso requiere una coordinación neutral y experta que evite conflictos y acelere los plazos.",
            "Venta de pisos con inquilino: la normativa sobre el derecho de tanteo y retracto del arrendatario está regulada de forma específica en Cataluña y exige un procedimiento muy preciso que el asesor conoce en detalle.",
            "Compra de primera vivienda con financiación hipotecaria: el asesor acompaña al comprador en la negociación con varias entidades bancarias, en la comprensión del FEIN (Ficha Europea de Información Normalizada) y en la coordinación con el notario y el banco para que la firma se produzca de forma fluida."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Los honorarios de la agencia inmobiliaria pagados por el vendedor pueden deducirse como gasto de la transmisión para calcular la ganancia patrimonial en el IRPF. Confirmar con asesor fiscal].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: En Cataluña, los agentes inmobiliarios que ejercen la intermediación deben estar inscritos en el Registro de Agentes Inmobiliarios de Cataluña (AICAT). Verificar la inscripción del agente antes de firmar cualquier encargo de gestión]."
          ]
        },
        {
          heading: "Cuánto tarda una venta bien gestionada en Santa Coloma",
          level: "h3",
          content: [
            "Según nuestra experiencia operativa en los barrios de Santa Coloma de Gramenet, una vivienda correctamente valorada, presentada con fotografía profesional y publicitada en los canales adecuados recibe las primeras visitas cualificadas en la primera o segunda semana desde su publicación.",
            "El plazo medio para cerrar una operación de compraventa con un comprador que tiene financiación hipotecaria aprobada oscila entre los 45 y los 90 días desde la firma del contrato de arras hasta la escritura notarial. Este plazo varía en función de la agilidad del banco y de los trámites registrales previos.",
            "En el segmento del alquiler, un piso bien presentado en Fondo o Singuerlín se alquila habitualmente en un plazo de 7 a 21 días desde su publicación, siempre que el precio sea coherente con el mercado y se haga un filtrado adecuado de los candidatos."
          ]
        },
        {
          heading: "Preguntas frecuentes sobre los asesores inmobiliarios",
          level: "h3",
          content: [
            "¿Es obligatorio contratar una agencia para vender un piso? No, cualquier propietario puede vender directamente. Sin embargo, según los datos del sector, las operaciones gestionadas por profesionales cierran a un precio medio superior y en menor tiempo que las ventas particulares.",
            "¿Quién paga los honorarios de la agencia? En España, lo habitual es que el vendedor asuma los honorarios de intermediación. En el caso de los alquileres, desde 2023 la normativa establece que los gastos de la agencia corresponden al arrendador, no al inquilino.",
            "¿Qué pasa si el piso no se vende durante el periodo de exclusiva? En Gesgrama, el encargo en exclusiva lleva aparejado un compromiso formal de inversión publicitaria y actividad comercial. Si a pesar de ello no se produce la venta en el plazo acordado, se revisa conjuntamente la estrategia de precio y el contrato puede resolverse de mutuo acuerdo."
          ]
        }
      ],
      conclusion: "Contar con un asesor inmobiliario de confianza en Santa Coloma de Gramenet no es un gasto, es una decisión estratégica que protege el valor de tu patrimonio, reduce el tiempo de la operación y te da la tranquilidad de saber que cada detalle legal, fiscal y comercial está correctamente gestionado. En Gesgrama llevamos más de tres décadas siendo ese aliado de confianza."
    },
    ca: {
      title: "Què és un assessor immobiliari i per què podries necessitar-ho?",
      summary: "Descobreix en què consisteix la feina real d'un assessor immobiliari professional i per què al mercat de Santa Coloma de Gramenet el seu paper és més decisiu que mai.",
      category: "Immobiliària",
      date: "9 març, 2025",
      readTime: "9 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "El mercat immobiliari a Santa Coloma de Gramenet viu una transformació profunda. Els preus s'han ajustat, la demanda de lloguer creix i els compradors són cada vegada més exigents. En aquest escenari, la figura de l'assessor immobiliari professional s'ha convertit en una necessitat real per a qualsevol persona que vulgui vendre, comprar o arrendar un immoble amb garanties.",
      sections: [
        {
          heading: "Més enllà de l'intermediari: què fa realment un assessor immobiliari",
          level: "h2",
          content: [
            "L'assessor immobiliari professional actua com a consultor estratègic que acompanya el client en cada fase del procés: des de la valoració inicial fins a la firma de l'escriptura davant notari. Realitza un Anàlisi Comparatiu de Mercat (ACM) exhaustiu, comprovant dades de vendes tancades recentment al barri específic per determinar un preu de sortida competitiu.",
            "A més, l'assessor es converteix en el filtre de seguretat de tota l'operació. Comprova la solvència financera dels interessats, verifica que l'immoble no presenta càrregues ocultes, coordina la Cèdula d'Habitabilitat i el Certificat d'Eficiència Energètica, i revisa cada clàusula del contracte d'arres."
          ],
          bulletPoints: [
            "Valoració professional precisa basada en tancaments registrals reals del barri.",
            "Pla de comercialització complet: fotografia professional, vídeo 360° i Home Staging.",
            "Filtratge de compradors: comprovació de hipoteca preaprovada o capacitat de pagament.",
            "Gestió documental completa: Cèdula, CEE, nota simple i certificat de deutes de la comunitat."
          ]
        },
        {
          heading: "Per què intentar vendre sol és més car del que sembla",
          level: "h2",
          content: [
            "Sense accés a dades reals de mercat, els propietaris tendeixen a sobrevalorar el seu habitatge, generant un llarg període d'exposició sense ofertes. Quan finalment baixen el preu, ho fan més del necessari. L'assessor evita aquest error freqüent.",
            "La gestió de visites, la negociació i la redacció del contracte d'arres consumeixen desenes d'hores i generen un estrès considerable. L'assessor professional absorbeix tota aquesta càrrega operativa amb experiència i seguretat jurídica."
          ]
        }
      ],
      conclusion: "Comptar amb un assessor immobiliari de confiança a Santa Coloma no és una despesa, és una decisió estratègica que protegeix el valor del teu patrimoni i et dona tranquil·litat en cada detall legal i comercial."
    },
    en: {
      title: "What is a real estate advisor and why might you need one?",
      summary: "Find out what a professional real estate advisor actually does, what advantages they bring to buyers and sellers, and why their role in the Santa Coloma de Gramenet market is more decisive than ever.",
      category: "Real Estate",
      date: "March 9, 2025",
      readTime: "9 min read",
      author: "Gesgrama Real Estate Team",
      intro: "In recent years, the real estate market in Santa Coloma de Gramenet has undergone a profound transformation. Sale prices have adjusted, rental demand has grown strongly, and buyers are increasingly demanding and informed. In this scenario, the professional real estate advisor has become a real necessity for anyone who wants to sell, buy, or rent a property with proper guarantees.",
      sections: [
        {
          heading: "Beyond the middleman: what a real estate advisor actually does",
          level: "h2",
          content: [
            "A professional real estate advisor acts as a strategic consultant accompanying the client through every stage of the process: from the initial property valuation through to signing at the notary. They conduct a thorough Comparative Market Analysis (CMA), cross-referencing recent closed sale data in the specific neighborhood to set a competitive listing price.",
            "The advisor also becomes the security filter for the entire transaction: verifying buyer financial capacity, checking for hidden encumbrances, coordinating the occupancy license and energy certificate, and reviewing every clause of the deposit contract."
          ],
          bulletPoints: [
            "Precise professional valuation based on actual registered sales in the neighborhood.",
            "Full marketing plan: professional photography, virtual tour video, and home staging.",
            "Buyer screening: mortgage pre-approval or documented payment capacity verified before viewings.",
            "Full document management: occupancy license, EPC, land registry note, community debt certificate."
          ]
        },
        {
          heading: "Why selling alone costs more than it seems",
          level: "h2",
          content: [
            "Without access to real market data, owners tend to overprice their property, generating long exposure periods without offers. When they finally reduce the price, they do so by more than necessary.",
            "Managing calls, visits, negotiations and drafting the deposit contract correctly consumes dozens of hours. The professional advisor absorbs this entire operational burden with expertise and legal security."
          ]
        }
      ],
      conclusion: "Working with a trusted real estate advisor in Santa Coloma de Gramenet is not a cost — it is a strategic decision that protects your property's value and gives you complete peace of mind on every legal, fiscal, and commercial detail."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 2 — Contrato de exclusividad
  // ─────────────────────────────────────────────
  {
    id: "art-2",
    slug: "que-es-un-contrato-de-exclusividad-inmobiliaria",
    image: art2Img,
    datePublished: "2025-03-04T08:00:00+01:00",
    dateModified: "2025-03-04T08:00:00+01:00",
    es: {
      title: "¿Qué es un contrato de exclusividad inmobiliaria y qué ventajas tiene?",
      summary: "Analizamos en profundidad en qué consiste el encargo de venta en exclusiva, qué obligaciones asume la agencia, qué cláusulas debe contener y por qué estadísticamente logra un precio final más alto para el vendedor.",
      category: "Inmobiliaria",
      date: "4 marzo, 2025",
      readTime: "8 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "Cuando un propietario decide poner su piso en venta, una de las primeras decisiones que debe tomar es si va a gestionar la comercialización a través de una única agencia en exclusiva o si va a dar el encargo a varias agencias de forma simultánea. A primera vista, puede parecer que tener más agencias trabajando en paralelo aumenta las probabilidades de venta. La realidad del mercado, sin embargo, demuestra exactamente lo contrario, y entender por qué es fundamental para tomar la decisión correcta.",
      sections: [
        {
          heading: "Qué es exactamente un contrato de encargo de venta en exclusiva",
          level: "h2",
          content: [
            "El contrato de encargo de venta en exclusiva es un acuerdo mercantil mediante el cual el propietario de un inmueble otorga a una única agencia inmobiliaria el derecho exclusivo de gestionar y comercializar su venta durante un período determinado, habitualmente entre tres y seis meses.",
            "A cambio de este compromiso de exclusividad por parte del propietario, la agencia asume obligaciones concretas y ejecutables: una inversión publicitaria máxima en los portales inmobiliarios más relevantes, la realización de reportaje fotográfico profesional y tour virtual, la elaboración de un plan de difusión específico para el inmueble y la defensa activa del precio de venta frente a los compradores.",
            "Es importante entender que la exclusiva no significa que solo los compradores que contacten directamente con la agencia puedan adquirir el inmueble. En Gesgrama trabajamos con un modelo de exclusiva colaborativa: si otra agencia seria tiene un comprador interesado y cualificado, colaboramos con ella compartiendo los honorarios, mientras seguimos coordinando y protegiendo los intereses del propietario. El resultado es la máxima difusión sin perder el control de la negociación."
          ],
          bulletPoints: [
            "Inversión publicitaria máxima y posicionamiento destacado en los principales portales inmobiliarios.",
            "Unidad de mensaje y precio: el inmueble no aparece con precios discrepantes en distintos anuncios.",
            "Control total de la negociación: solo se lleva al propietario ofertas verificadas y con financiación aprobada.",
            "Registro de visitas: se identifican todas las personas que acceden al inmueble por seguridad.",
            "Colaboración con otras agencias cuando aportan un comprador cualificado."
          ]
        },
        {
          heading: "Por qué la multiagencia quema el piso: el coste invisible de trabajar con todos",
          level: "h2",
          content: [
            "Cuando un propietario da el encargo a cinco agencias distintas, ocurre algo paradójico: ninguna de ellas invierte a fondo en la comercialización del inmueble. La razón es sencilla: si la agencia dedica dinero a fotografía profesional, vídeo y publicidad de pago y otra agencia cierra la operación, esa inversión se pierde íntegramente. Por eso, ninguna agencia en un sistema de multiagencia está dispuesta a asumir ese riesgo, y el resultado es que todas publican el piso con fotografías de móvil y una descripción genérica.",
            "El segundo problema es la proliferación de anuncios discrepantes. Si cinco agencias publican el mismo piso a precios ligeramente distintos —lo cual es habitual porque cada una aplica su margen sobre el precio del propietario—, el comprador percibe inmediatamente que el piso está 'a la venta desesperada' y siente que puede negociar a la baja de forma agresiva. Este efecto, conocido como 'quemado del inmueble', puede hacer perder entre un 5% y un 15% del valor de mercado real en la negociación final.",
            "Con la exclusiva, hay un único precio en el mercado, un único mensaje y una única estrategia de negociación controlada. Los compradores saben que no pueden jugar con la urgencia del propietario ni especular con precios distintos."
          ]
        },
        {
          heading: "Qué debe incluir un contrato de exclusiva para ser justo y transparente",
          level: "h2",
          content: [
            "Un contrato de encargo en exclusiva bien redactado debe establecer con total claridad los siguientes elementos: la duración del encargo y las condiciones de prórroga, el precio de venta acordado y el rango de negociación autorizado por el propietario, las acciones de marketing concretas que se compromete a ejecutar la agencia y en qué plazos, los honorarios profesionales pactados y el momento en que son exigibles.",
            "También debe incluir cláusulas de protección para ambas partes: una cláusula de penalización razonable si el propietario vende directamente a un comprador presentado por la agencia durante la vigencia del contrato, y una cláusula de resolución anticipada si la agencia no cumple con los compromisos de marketing asumidos.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el plazo estándar legalmente establecido y las condiciones del derecho de desistimiento en contratos formalizados fuera de establecimiento mercantil según el RDL 1/2007 de defensa de consumidores y usuarios].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar que las cláusulas de penalización por venta directa del propietario no resulten abusivas conforme a la jurisprudencia de protección al consumidor y puedan resistir una posible impugnación judicial]."
          ]
        },
        {
          heading: "¿Qué datos respaldan la eficacia de la exclusiva?",
          level: "h3",
          content: [
            "Desde nuestra experiencia en el mercado de Santa Coloma de Gramenet, las operaciones gestionadas en exclusiva cierran a un precio medio entre un 4% y un 8% superior a operaciones equivalentes gestionadas en multiagencia. Esto se debe principalmente a que la exclusiva permite defender el precio con una estrategia coherente y a que los compradores perciben el inmueble como un activo bien gestionado, lo que reduce el margen de negociación a la baja.",
            "Además, el tiempo medio hasta la firma de arras se reduce significativamente: mientras una operación en multiagencia puede alargarse más de seis meses sin recibir una oferta seria, una operación en exclusiva bien ejecutada suele generar la primera oferta cualificada en cuatro a ocho semanas desde el inicio de la comercialización."
          ]
        }
      ],
      conclusion: "El contrato de exclusiva con Gesgrama no es un documento que limita al propietario; es un pacto de confianza recíproca que nos obliga a dar el máximo para defender el valor de tu vivienda. Si buscas vender al mejor precio posible en el menor tiempo y con la máxima seguridad jurídica, la exclusiva es la única estrategia que lo garantiza de forma consistente."
    },
    ca: {
      title: "Què és un contracte d'exclusivitat immobiliària i quins avantatges té?",
      summary: "Analitzem en profunditat l'encàrrec de venda en exclusiva, les obligacions de l'agència, les clàusules essencials i per què estadísticament assoleix un preu final més alt.",
      category: "Immobiliària",
      date: "4 març, 2025",
      readTime: "8 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "Quan un propietari decideix posar el seu pis a la venda, una de les primeres decisions és si gestionarà la comercialització a través d'una única agència en exclusiva o si donarà l'encàrrec a diverses agències simultàniament. La realitat del mercat demostra que la multiagència perjudica el venedor.",
      sections: [
        {
          heading: "Què és exactament un contracte d'encàrrec de venda en exclusiva",
          level: "h2",
          content: [
            "El contracte d'encàrrec de venda en exclusiva és un acord mercantil pel qual el propietari atorga a una única agència el dret exclusiu de gestionar i comercialitzar la venda del seu immoble durant un període determinat, habitualment entre tres i sis mesos.",
            "A canvi, l'agència assumeix obligacions concretes: inversió publicitària màxima, reportatge fotogràfic professional, pla de difusió específic i defensa activa del preu de venda."
          ],
          bulletPoints: [
            "Màxima inversió publicitaria i posicionament destacat als portals principals.",
            "Unitat de preu: l'immoble no apareix amb preus discrepants a diferents anuncis.",
            "Control total de la negociació i filtratge de compradors qualificats.",
            "Col·laboració amb altres agències quan aporten compradors qualificats."
          ]
        },
        {
          heading: "Per què la multiagència crema el pis",
          level: "h2",
          content: [
            "Quan diverses agències publiquen el mateix pis a preus lleugerament diferents, el comprador percep que el pis 'es ven desesperadament' i negocia a la baixa de forma agressiva. Aquest efecte pot fer perdre entre un 5% i un 15% del valor de mercat real.",
            "Amb l'exclusiva, hi ha un únic preu al mercat, un únic missatge i una única estratègia de negociació controlada, la qual cosa protegeix el valor de l'immoble."
          ]
        }
      ],
      conclusion: "El contracte d'exclusiva amb Gesgrama és un pacte de confiança recíproca que ens obliga a donar el màxim per defensar el valor del teu habitatge i vendre al millor preu possible."
    },
    en: {
      title: "What is an exclusive real estate listing and what are its advantages?",
      summary: "In-depth look at exclusive listing agreements: what they involve, agency obligations, key contract clauses, and why they statistically achieve higher final sale prices for sellers.",
      category: "Real Estate",
      date: "March 4, 2025",
      readTime: "8 min read",
      author: "Gesgrama Real Estate Team",
      intro: "When a property owner decides to sell, one of the first decisions is whether to manage the sale through a single exclusive agency or give the listing to several agencies simultaneously. The market reality shows clearly that multiple non-exclusive listings harm sellers.",
      sections: [
        {
          heading: "What an exclusive listing agreement actually involves",
          level: "h2",
          content: [
            "An exclusive listing contract grants a single trusted agency the exclusive right to manage and market a property's sale for a set period, usually three to six months. In return, the agency takes on concrete commitments: maximum advertising investment, professional photography, a dedicated marketing plan and active price defense.",
            "At Gesgrama we use a collaborative exclusivity model: if another reputable agency has a qualified buyer, we collaborate and share the fee, while we continue coordinating and protecting the owner's interests."
          ],
          bulletPoints: [
            "Maximum advertising investment and featured positioning on major portals.",
            "Price unity: the property never appears with discrepant prices across multiple listings.",
            "Full negotiation control and verified buyer screening.",
            "Collaboration with other agencies when they bring qualified buyers."
          ]
        },
        {
          heading: "Why multiple listings burn your property's value",
          level: "h2",
          content: [
            "When five agencies list the same property at slightly different prices, buyers immediately perceive the property as desperate to sell and negotiate aggressively downward. This 'burned listing' effect can destroy 5-15% of the property's real market value.",
            "With exclusivity, there is one price, one message and one controlled negotiation strategy — protecting the property's full market value."
          ]
        }
      ],
      conclusion: "An exclusive agreement with Gesgrama is a mutual trust pact that obligates us to give maximum effort to defend your property's value. If you want to sell at the best price in the shortest time with full legal security, exclusivity is the only strategy that delivers this consistently."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 3 — Perito judicial
  // ─────────────────────────────────────────────
  {
    id: "art-3",
    slug: "que-es-un-perito-judicial-inmobiliario",
    image: art3Img,
    datePublished: "2025-02-20T08:00:00+01:00",
    dateModified: "2025-02-20T08:00:00+01:00",
    es: {
      title: "¿Qué es un perito judicial inmobiliario y cuándo necesitas uno?",
      summary: "Guía completa sobre el rol del perito judicial inmobiliario en herencias, divorcios, tasaciones contradictorias y procedimientos tributarios. Qué metodología aplica y qué validez legal tiene su informe.",
      category: "Servicios Jurídicos & Peritaje",
      date: "20 febrero, 2025",
      readTime: "9 min de lectura",
      author: "Gabinete Técnico Gesgrama",
      intro: "En determinadas situaciones de la vida —un divorcio, el reparto de una herencia, un litigio con Hacienda por el valor de una vivienda, o un procedimiento judicial por daños estructurales en un edificio— se hace imprescindible contar con un profesional que sea capaz de determinar de forma objetiva, rigurosa e imparcial el valor real de un bien inmueble. Esa es precisamente la función del perito judicial inmobiliario: un experto técnico cuyo dictamen tiene plena validez como prueba ante los tribunales de justicia y las administraciones públicas.",
      sections: [
        {
          heading: "Quién es y qué titulación debe tener un perito judicial inmobiliario",
          level: "h2",
          content: [
            "Un perito judicial inmobiliario es un profesional con titulación técnica superior —habitualmente arquitecto, arquitecto técnico, aparejador o ingeniero de edificación— que ha recibido formación específica en metodologías de valoración inmobiliaria y está inscrito en los listados de peritos de los Juzgados Decanos o de los Colegios Profesionales correspondientes.",
            "La inscripción en el listado oficial de peritos judiciales es el aval que garantiza que el profesional tiene los conocimientos técnicos necesarios para emitir un dictamen con validez procesal. Además, el perito está obligado a emitir su informe con total objetividad e imparcialidad, sin importar quién lo haya contratado, y debe comprometerse bajo juramento a actuar conforme a la verdad.",
            "Es importante distinguir entre el perito de parte —contratado directamente por una de las partes del procedimiento— y el perito judicial designado por el propio Juzgado de oficio. Ambas figuras tienen validez en el proceso, aunque el peso probatorio puede variar en función de las circunstancias del caso."
          ],
          bulletPoints: [
            "Titulación técnica superior (arquitecto, aparejador, ingeniero de edificación) obligatoria.",
            "Inscripción en los listados de peritos de los Juzgados o Colegios Profesionales.",
            "Obligación de objetividad e imparcialidad bajo juramento.",
            "Experiencia acreditada en valoraciones periciales para procedimientos judiciales y tributarios."
          ]
        },
        {
          heading: "En qué situaciones es necesario solicitar un peritaje inmobiliario",
          level: "h2",
          content: [
            "La casuística donde el dictamen pericial inmobiliario resulta necesario o muy recomendable es amplia. Las situaciones más frecuentes en Santa Coloma de Gramenet y su área metropolitana son las siguientes:",
            "Reparto de herencias: cuando los herederos no se ponen de acuerdo sobre el valor real de los inmuebles que forman parte del caudal hereditario, el dictamen pericial es la herramienta para obtener una valoración objetiva que sirva de base al notario o al juez para distribuir el patrimonio de forma equitativa.",
            "Liquidación de la sociedad de gananciales en divorcios: en los procedimientos de divorcio contencioso donde existe vivienda habitual u otros inmuebles en copropiedad, el perito fija el valor de mercado actualizado que servirá de base para el reparto o la compensación económica.",
            "Tasación Pericial Contradictoria (TPC): este es uno de los usos más frecuentes en la práctica fiscal. Cuando la Agència Tributaria de Catalunya (ATC) realiza una comprobación de valores y concluye que la vivienda se compró o vendió por debajo de su valor real —exigiendo al contribuyente pagar un Impuesto de Transmisiones Patrimoniales (ITP) o un Impuesto de Sucesiones adicional—, el contribuyente puede impugnar esa valoración mediante una Tasación Pericial Contradictoria. Si el dictamen del perito difiere en más de un determinado porcentaje de la valoración de Hacienda, se nombra un tercer perito dirimente.",
            "Procedimientos por vicios ocultos y daños estructurales: cuando un comprador descubre defectos graves en la vivienda adquirida que no fueron declarados por el vendedor, el informe pericial acredita la existencia, extensión y cuantificación económica de esos vicios para sustentar la reclamación judicial."
          ]
        },
        {
          heading: "Metodología que aplica el perito: cómo se calcula el valor de un inmueble",
          level: "h2",
          content: [
            "El perito inmobiliario no opera con datos de portales de anuncios ni con intuiciones de mercado. Aplica metodologías normalizadas de valoración reconocidas por los Juzgados y por la Administración Tributaria:",
            "Método de comparación: analiza transacciones reales cerradas de inmuebles similares en la misma zona y período, obteniendo datos del Registro de la Propiedad, notarías y otras fuentes oficiales. Es el método más habitual para viviendas residenciales.",
            "Método del coste de reemplazamiento: calcula cuánto costaría reproducir el inmueble a día de hoy, descontando la depreciación por antigüedad y estado de conservación. Se utiliza especialmente para edificios singulares o inmuebles industriales.",
            "Método de capitalización de rentas: aplica sobre los ingresos actuales o potenciales de alquiler del inmueble una tasa de capitalización adecuada al mercado. Indicado para inmuebles con rentabilidad acreditada."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el cumplimiento de los Artículos 335 a 352 de la Ley de Enjuiciamiento Civil (LEC) sobre la forma de aportación de dictámenes periciales, el deber de ratificación oral y las causas de tacha del perito].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar el plazo legal para solicitar la Tasación Pericial Contradictoria en el ámbito del procedimiento tributario conforme a la Ley General Tributaria (LGT Art. 135) y la normativa autonómica catalana aplicable]."
          ]
        },
        {
          heading: "Por qué la calidad del informe pericial marca la diferencia",
          level: "h3",
          content: [
            "En un procedimiento judicial o tributario, la calidad técnica y argumentativa del dictamen pericial puede determinar el resultado del caso. Un informe bien estructurado, con metodología clara, fuentes documentadas y una conclusión de valor sólidamente justificada tiene mucho más peso probatorio que uno genérico.",
            "En Gesgrama colaboramos con peritos judiciales inscritos oficialmente que conocen en profundidad el mercado inmobiliario de Santa Coloma de Gramenet y que han comparecido en múltiples procedimientos ante los Juzgados de Santa Coloma y del Partido Judicial de Barcelona, lo que nos permite ofrecer un servicio de peritaje con máximas garantías técnicas y procesales."
          ]
        }
      ],
      conclusion: "Si te enfrentas a una herencia conflictiva, un divorcio con bienes comunes, una notificación de comprobación de valores de Hacienda o un litigio por defectos constructivos, solicitar el informe de un perito judicial inmobiliario es la decisión más inteligente que puedes tomar para defender tus intereses con rigor y con plenas garantías legales."
    },
    ca: {
      title: "Què és un perit judicial immobiliari i quan necessites un?",
      summary: "Guia completa sobre el rol del perit judicial immobiliari en herències, divorcis, taxacions contradictòries i procediments tributaris.",
      category: "Serveis Jurídics & Peritatge",
      date: "20 febrer, 2025",
      readTime: "9 min de lectura",
      author: "Gabinet Tècnic Gesgrama",
      intro: "En situacions com un divorci, el repartiment d'una herència o un litigi amb Hisenda pel valor d'un habitatge, és imprescindible comptar amb un perit judicial immobiliari: un expert tècnic el dictamen del qual té plena validesa com a prova davant dels tribunals.",
      sections: [
        {
          heading: "Qui és i quina titulació ha de tenir un perit judicial immobiliari",
          level: "h2",
          content: [
            "Un perit judicial immobiliari és un professional amb titulació tècnica superior —habitualment arquitecte o aparellador— inscrit als llistats de perits dels Jutjats o dels Col·legis Professionals.",
            "El perit ha d'emetre el seu informe amb total objectivitat i imparcialitat, sota jurament, independentment de qui l'hagi contractat."
          ],
          bulletPoints: [
            "Titulació tècnica superior obligatòria.",
            "Inscripció als llistats oficials de perits judicials.",
            "Obligació d'objectivitat i imparcialitat sota jurament.",
            "Experiència acreditada en valoracions per a procediments judicials i tributaris."
          ]
        },
        {
          heading: "En quines situacions cal sol·licitar un peritatge immobiliari",
          level: "h2",
          content: [
            "Les situacions més freqüents a Santa Coloma de Gramenet: repartiment d'herències, liquidació de la societat de guanys en divorcis, Taxació Pericial Contradictòria (TPC) davant l'ATC, i procediments per vicis ocults o danys estructurals."
          ]
        }
      ],
      conclusion: "Si t'enfrontes a una herència conflictiva, un divorci o una notificació de comprovació de valors d'Hisenda, sol·licitar l'informe d'un perit judicial immobiliari és la decisió més intel·ligent per defensar els teus interessos."
    },
    en: {
      title: "What is a judicial real estate expert and when do you need one?",
      summary: "Complete guide to the judicial property expert's role in inheritances, divorces, tax contestations, and structural damage proceedings.",
      category: "Legal & Valuation Services",
      date: "February 20, 2025",
      readTime: "9 min read",
      author: "Gesgrama Technical Advisory",
      intro: "In situations such as divorce, inheritance disputes, or tax authority challenges to a property's declared value, a judicial real estate expert becomes essential: a technical professional whose formal appraisal report carries full legal weight in court and before administrative bodies.",
      sections: [
        {
          heading: "Who is a judicial real estate expert and what qualifications are required?",
          level: "h2",
          content: [
            "A judicial real estate expert is a technically qualified professional — typically an architect or building engineer — registered on official court expert lists. They must issue their appraisal with complete objectivity and impartiality under oath, regardless of which party engaged them.",
            "Their report applies recognized valuation methodologies: comparative sales analysis using registered transaction data, replacement cost method, or income capitalization — never portal listing prices or market intuition."
          ],
          bulletPoints: [
            "Mandatory higher technical qualification (architect, building engineer).",
            "Registration on official court or professional college expert lists.",
            "Sworn objectivity and impartiality obligations.",
            "Proven experience in judicial and tax procedure valuations."
          ]
        },
        {
          heading: "When is a judicial property appraisal needed?",
          level: "h2",
          content: [
            "Key situations: estate inheritance distribution, divorce community property liquidation, Contradictory Expert Appraisal (TPC) to contest tax authority valuation, and construction defect/hidden defect litigation."
          ]
        }
      ],
      conclusion: "Facing an inheritance dispute, a contested divorce, a tax authority valuation challenge, or a construction defect claim? A qualified judicial real estate expert's report is the most effective tool to defend your interests with rigor and full legal guarantees."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 4 — Obra nueva
  // ─────────────────────────────────────────────
  {
    id: "art-4",
    slug: "descubre-todo-sobre-una-vivienda-de-obra-nueva",
    image: obraNuevaRealImg,
    datePublished: "2025-01-28T08:00:00+01:00",
    dateModified: "2025-01-28T08:00:00+01:00",
    es: {
      title: "Descubre todo sobre una vivienda de obra nueva",
      summary: "Todo lo que debes saber antes de comprar una vivienda de obra nueva: ventajas energéticas, compra sobre plano, garantías legales decenales, impuestos aplicables y las claves para elegir una promoción con total seguridad.",
      category: "Inmobiliaria",
      date: "28 enero, 2025",
      readTime: "10 min de lectura",
      author: "Departamento de Obra Nueva Gesgrama",
      intro: "Comprar una vivienda de obra nueva es una de las decisiones patrimoniales más ilusionantes y, a la vez, más complejas a las que puede enfrentarse una persona. La posibilidad de estrenar un espacio diseñado con criterios arquitectónicos modernos, con los más altos estándares de eficiencia energética y con acabados personalizables, convierte a las promociones de obra nueva en una opción residencial altamente demandada. Sin embargo, el proceso de compra sobre plano tiene particularidades que es fundamental conocer en profundidad antes de comprometerse.",
      sections: [
        {
          heading: "Las ventajas reales de la obra nueva frente a la vivienda de segunda mano",
          level: "h2",
          content: [
            "La decisión entre obra nueva y segunda mano no es solo una cuestión de precio por metro cuadrado. Es una elección de estilo de vida y de estrategia patrimonial a largo plazo. La obra nueva ofrece ventajas que van mucho más allá de estrenar el inmueble.",
            "La eficiencia energética es, probablemente, la ventaja más tangible y económicamente medible. Las nuevas edificaciones incorporan sistemas de aislamiento térmico y acústico continuo (SATE), carpintería exterior con doble o triple acristalamiento y rotura de puente térmico, y sistemas de climatización de alta eficiencia como la aerotermia. El resultado es que una vivienda de obra nueva obtiene habitualmente una calificación energética A o B, lo que se traduce en ahorros reales de hasta el 70% en las facturas de calefacción y refrigeración en comparación con una vivienda de los años 70 o 80.",
            "La personalización durante la fase de construcción es otra ventaja exclusiva de la obra nueva. Muchas promotoras permiten al comprador elegir la distribución interior, los suelos, los revestimientos de baño y cocina, y los acabados generales dentro de una gama de opciones predefinidas. Esta capacidad de personalización es completamente imposible en una vivienda de segunda mano.",
            "Finalmente, las zonas comunitarias de las nuevas promociones suelen incluir elementos que elevan significativamente la calidad de vida: ascensores panorámicos de última generación, garaje con puntos de recarga para vehículos eléctricos, trasteros amplios, y en algunas promociones, piscina comunitaria, zona de coworking o jardín privado."
          ],
          bulletPoints: [
            "Calificación energética A o B: facturas hasta un 70% más bajas que en viviendas antiguas.",
            "Personalización de distribución y acabados durante la fase de construcción.",
            "Tecnología domótica integrada: control de iluminación, climatización y seguridad desde el móvil.",
            "Zonas comunitarias modernas: ascensores, garaje con puntos de recarga y trasteros amplios.",
            "Sin reformas imprevistas: todo es nuevo y está en perfecto estado desde el primer día."
          ]
        },
        {
          heading: "Comprar sobre plano: proceso, avales y riesgos a conocer",
          level: "h2",
          content: [
            "La compra sobre plano —es decir, adquirir la vivienda antes de que esté construida, únicamente a partir de los planos del proyecto— es la modalidad más habitual en las promociones de obra nueva. Ofrece la ventaja de poder elegir la unidad preferida (orientación, planta, vistas) y de beneficiarse del precio más bajo del ciclo, ya que la promotora vende a un precio inferior durante la fase de preventa para financiar parcialmente la construcción.",
            "Sin embargo, la compra sobre plano también entraña riesgos que hay que gestionar con rigor. El principal es el riesgo de promotora: si la empresa promotora entra en concurso de acreedores antes de finalizar la obra, el comprador podría perder las cantidades entregadas a cuenta si estas no están correctamente garantizadas.",
            "La legislación española obliga a las promotoras a garantizar todas las cantidades entregadas a cuenta por los compradores mediante un aval bancario solidario o un seguro específico de devolución de cantidades anticipadas. Esto significa que si la promotora quiebra, el comprador puede reclamar la devolución íntegra de su dinero directamente al banco avalista o a la aseguradora.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar que las cantidades entregadas a cuenta durante la fase de construcción estén garantizadas mediante aval bancario o seguro conforme a la LOE y normativa vigente. Exigir el certificado de aval individual por cada entrega].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el tipo de IVA aplicable a la compra de obra nueva (10% general para vivienda libre, 4% para VPO de régimen especial) y el tipo del Impuesto de Actos Jurídicos Documentados (IAJD) vigente en Cataluña (actualmente 1,5% con carácter general, con reducciones para colectivos específicos)]."
          ]
        },
        {
          heading: "Las tres garantías legales que protegen al comprador de obra nueva",
          level: "h2",
          content: [
            "La Ley de Ordenación de la Edificación (LOE) establece un sistema de garantías obligatorias que la promotora debe constituir a favor de los compradores y que cubren tres niveles de responsabilidad técnica:",
            "Garantía de un año para acabados y elementos de remate: cubre defectos en pinturas, alicatados, solados, carpintería interior y cualquier otro elemento de terminación que no afecte a la habitabilidad del inmueble. Es la más frecuente y la que genera más reclamaciones en los primeros meses tras la entrega.",
            "Garantía de tres años para elementos de habitabilidad e instalaciones: cubre defectos que afectan a la habitabilidad de la vivienda, es decir, problemas de impermeabilización que generan humedades, defectos en las instalaciones de fontanería, calefacción y electricidad, y cualquier problema que haga el inmueble inadecuado para su uso como vivienda.",
            "Garantía decenal para daños estructurales: esta es la garantía más importante. Cubre durante diez años desde la recepción de la obra cualquier defecto que afecte a la cimentación, los pilares, las vigas o los muros de carga del edificio. Está instrumentada mediante un Seguro Decenal de Daños obligatorio para toda edificación de uso residencial de nueva construcción."
          ]
        },
        {
          heading: "Preguntas frecuentes sobre la compra de obra nueva",
          level: "h3",
          content: [
            "¿Cuándo empieza a contar el plazo de garantía decenal? Desde la fecha de recepción de la obra por parte del promotor, que coincide aproximadamente con la expedición de la Licencia de Primera Ocupación.",
            "¿Puedo negociar el precio de una obra nueva? En la fase inicial de preventa, existe cierto margen de negociación, especialmente en las unidades de menor demanda. Una vez avanzada la comercialización, el precio suele estar más fijado.",
            "¿Qué documentación debo exigir en el momento de la entrega? El promotor está obligado a entregar el Libro del Edificio, que incluye el proyecto ejecutivo, las instrucciones de uso y mantenimiento de todos los sistemas, y los certificados de garantía."
          ]
        }
      ],
      conclusion: "La obra nueva representa la opción más moderna, eficiente y personalizable del mercado residencial. Con el acompañamiento de Gesgrama, te aseguramos que cada promoción que te recomendamos ha pasado por un riguroso análisis de la solvencia de la promotora, la solidez técnica del proyecto y las garantías legales vigentes para que tu inversión esté completamente protegida."
    },
    ca: {
      title: "Descobreix tot sobre un habitatge d'obra nova",
      summary: "Tot el que has de saber abans de comprar un habitatge d'obra nova: avantatges energètics, compra sobre plànol, garanties legals i impostos aplicables.",
      category: "Immobiliària",
      date: "28 gener, 2025",
      readTime: "10 min de lectura",
      author: "Departament d'Obra Nova Gesgrama",
      intro: "Comprar un habitatge d'obra nova és una de les decisions patrimonials més importants. La possibilitat d'estrenar un espai dissenyat amb criteris moderns i màxima eficiència energètica el converteix en una opció molt demandada, però el procés de compra sobre plànol té particularitats fonamentals que cal conèixer.",
      sections: [
        {
          heading: "Els avantatges reals de l'obra nova davant la segona mà",
          level: "h2",
          content: [
            "L'eficiència energètica és l'avantatge més tangible i econòmicament mesurable. Les noves edificacions incorporen aïllament tèrmic continu (SATE), fusteria exterior amb trencament de pont tèrmic i aerotèrmia. Resultat: estalvis reals de fins al 70% a les factures d'energia.",
            "La personalització durant la fase de construcció permet triar distribució, paviments, revestiments de banys i cuines i acabats generals. Aquesta capacitat és completament impossible en un habitatge de segona mà."
          ],
          bulletPoints: [
            "Qualificació energètica A o B: factures fins a un 70% més baixes.",
            "Personalització de distribució i acabats durant la construcció.",
            "Tecnologia domòtica integrada.",
            "Zones comunitàries modernes: ascensors, garatge amb punts de recàrrega i trasters."
          ]
        },
        {
          heading: "Les tres garanties legals que protegeixen el comprador d'obra nova",
          level: "h2",
          content: [
            "La Llei d'Ordenació de l'Edificació (LOE) estableix tres nivells de garantia obligatòria: 1 any per a acabats, 3 anys per a habitabilitat i instal·lacions, i 10 anys per a danys estructurals mitjançant el Segur Decenal obligatori."
          ]
        }
      ],
      conclusion: "L'obra nova representa l'opció més moderna i eficient del mercat residencial. Amb Gesgrama, cada promoció recomanada ha passat per una anàlisi rigorosa de la solvència del promotor i les garanties legals vigents."
    },
    en: {
      title: "Discover everything about a new construction home",
      summary: "Everything you need to know before buying new construction: energy advantages, off-plan purchase process, legal warranties, applicable taxes, and how to choose a development with full confidence.",
      category: "Real Estate",
      date: "January 28, 2025",
      readTime: "10 min read",
      author: "Gesgrama New Development Advisory",
      intro: "Buying a new construction home is one of the most exciting and complex property decisions you can make. The opportunity to live in a space designed to modern architectural standards with top-tier energy efficiency and customizable finishes makes new developments highly sought-after, but the off-plan purchase process has crucial specifics worth understanding thoroughly.",
      sections: [
        {
          heading: "Real advantages of new construction versus resale properties",
          level: "h2",
          content: [
            "Energy efficiency is the most tangible and economically measurable advantage. New buildings incorporate continuous thermal insulation (SATE), triple glazing with thermal break, and aerothermal climate systems. Result: real energy bill savings of up to 70% versus 1970s-era buildings.",
            "Customization during construction is another exclusive benefit: buyers can choose interior layouts, flooring, bathroom and kitchen finishes within predefined option ranges — completely impossible with a resale property."
          ],
          bulletPoints: [
            "Energy rating A or B: utility bills up to 70% lower than in older buildings.",
            "Customization of layout and finishes during construction.",
            "Integrated smart home technology.",
            "Modern communal areas: elevators, EV charging garage, storage rooms."
          ]
        },
        {
          heading: "The three legal warranties protecting new construction buyers",
          level: "h2",
          content: [
            "Spain's Building Management Act (LOE) mandates three warranty tiers: 1 year for finishes, 3 years for habitability and systems, and a 10-year structural warranty covered by mandatory Decennial Insurance — protecting buyers against cracks, settlement, or structural failure."
          ]
        }
      ],
      conclusion: "New construction represents the most modern and efficient option in the residential market. With Gesgrama, every development we recommend has undergone rigorous analysis of developer solvency and legal warranty compliance to fully protect your investment."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 5 — Singuerlín y Centre
  // ─────────────────────────────────────────────
  {
    id: "art-5",
    slug: "guia-alquilar-vender-piso-singuerlin-centre-santa-coloma",
    image: art5Img,
    datePublished: "2025-03-15T09:00:00+01:00",
    dateModified: "2025-03-15T09:00:00+01:00",
    es: {
      title: "Guía completa para alquilar o vender tu piso en Singuerlín y Centre",
      summary: "Análisis detallado del mercado inmobiliario en los barrios de Singuerlín y Centre de Santa Coloma de Gramenet: precios por metro cuadrado, perfil de demanda, tipología de viviendas y todo lo que debes saber antes de vender o alquilar.",
      category: "Inmobiliaria Local",
      date: "15 marzo, 2025",
      readTime: "9 min de lectura",
      author: "Equipo Inmobiliario Gesgrama",
      intro: "Si tienes un piso en Singuerlín o en el Centre de Santa Coloma de Gramenet y estás pensando en venderlo o alquilarlo, estás en una posición privilegiada dentro del mercado inmobiliario metropolitano. Estos dos barrios concentran algunas de las características más demandadas por los compradores e inquilinos del área: buena conectividad con Barcelona, oferta comercial y de servicios consolidada, y una relación calidad-precio que sigue siendo competitiva frente a los municipios limítrofes.",
      sections: [
        {
          heading: "Análisis del mercado en Singuerlín: familias, metro L9N y precio de la tranquilidad",
          level: "h2",
          content: [
            "El barrio de Singuerlín ocupa la franja norte de Santa Coloma de Gramenet y se ha consolidado en los últimos años como uno de los destinos residenciales preferidos por las familias jóvenes que buscan salir de Barcelona sin renunciar a la conectividad. La apertura de la línea L9N de metro y su conexión con el aeropuerto y la zona universitaria de Bellvitge ha sido un factor determinante en la revalorización del barrio.",
            "La tipología predominante en Singuerlín son los pisos de tres dormitorios con balcón o terraza exterior, construidos en su mayoría durante los años 70 y 80. Muchos de estos inmuebles han sido reformados en los últimos diez años, incorporando cocinas abiertas, baños modernizados y doble acristalamiento. Los edificios con ascensor instalado recientemente son los que presentan mayor rotación en el mercado y logran los precios por metro cuadrado más altos del barrio.",
            "El perfil del comprador en Singuerlín es mayoritariamente una pareja joven o familia de primer acceso a la propiedad, con capacidad de endeudamiento hipotecario del 80-90% del valor de tasación. La demanda de alquiler también es sólida, especialmente de trabajadores que acceden a los polígonos industriales del norte del Barcelonès o a los centros logísticos de la zona."
          ],
          bulletPoints: [
            "Alta demanda de pisos de 3 dormitorios con balcón y con ascensor instalado.",
            "Conectividad directa con Barcelona vía L9N de metro.",
            "Perfil de comprador joven con hipoteca del 80-90% del valor de tasación.",
            "Fuerte demanda de alquiler por trabajadores de polígonos industriales del norte."
          ]
        },
        {
          heading: "El Centre de Santa Coloma: el corazón comercial con máxima rentabilidad de alquiler",
          level: "h2",
          content: [
            "El barrio del Centre es el núcleo histórico y comercial de Santa Coloma de Gramenet. Concentra la mayor oferta de comercios de proximidad, restaurantes, servicios municipales y equipamientos educativos y sanitarios. La presencia de la línea L1 de metro (parada de Santa Coloma) y el acceso directo al Passeig de Torres i Bages y la ronda lo convierten en un punto de extraordinaria accesibilidad.",
            "En el Centre, la escasez de pisos disponibles en alquiler es una constante que genera una presión de demanda muy alta. Los inquilinos que buscan vivir en esta zona tienen un perfil más heterogéneo que en Singuerlín: jóvenes profesionales, parejas sin hijos, personas mayores que quieren acceso a servicios de proximidad y familias monoparentales.",
            "Para el propietario inversor, el Centre ofrece las rentabilidades brutas de alquiler más altas de Santa Coloma, gracias a la combinación de alta demanda y cierta escasez de oferta de calidad. Un piso reformado de dos dormitorios bien ubicado puede alcanzar una rentabilidad bruta del 5% al 7% anual, un retorno muy competitivo en el contexto del mercado metropolitano de Barcelona."
          ]
        },
        {
          heading: "Pasos para vender tu piso al mejor precio en ambos barrios",
          level: "h2",
          content: [
            "Tanto en Singuerlín como en el Centre, vender al mejor precio posible requiere una preparación cuidadosa que va más allá de publicar el piso en un portal de internet.",
            "El primer paso es realizar una valoración profesional basada en comparativas reales de cierres notariales en el barrio concreto. Usar el precio de oferta de pisos similares publicados en portales es un error frecuente: lo que está publicado no necesariamente se ha vendido a ese precio.",
            "El segundo paso es la preparación visual del inmueble. En ambos barrios, los pisos que se venden más rápido y al mejor precio son aquellos que aparecen en los portales con fotografía de alta resolución, el espacio ordenado y sin objetos personales, y en algunos casos con aplicación de Home Staging básico.",
            "El tercer paso es la verificación documental previa: nota simple actualizada, comprobación de si la finca requiere ITE (para edificios de más de 45 años), Cédula de Habitabilidad vigente o tramitación de renovación, y Certificado de Eficiencia Energética."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la aplicación del índice de referencia de precios de alquiler en zonas tensionadas de Santa Coloma según la Ley 12/2023 de Vivienda, diferenciando entre pequeño y gran tenedor].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el plazo de depósito obligatorio de la fianza (1 mensualidad en vivienda habitual) ante el Institut Català del Sòl (INCASÒL) dentro de los 2 meses siguientes a la firma del contrato].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones en el IRPF del arrendador por gastos de conservación, amortización del inmueble y seguro de impago de alquiler sobre los rendimientos netos del capital inmobiliario]."
          ]
        }
      ],
      conclusion: "Singuerlín y el Centre son dos de los barrios con mayor dinamismo del mercado inmobiliario de Santa Coloma de Gramenet. Tanto si quieres vender como si prefieres alquilar, Gesgrama te ofrece el conocimiento local específico del barrio, los datos de mercado reales y el acompañamiento profesional para que tu operación sea un éxito en tiempo y precio."
    },
    ca: {
      title: "Guia completa per llogar o vendre el teu pis a Singuerlín i Centre",
      summary: "Anàlisi detallada del mercat immobiliari a Singuerlín i Centre de Santa Coloma de Gramenet: preus, demanda, tipologies d'habitatge i tot el que has de saber.",
      category: "Immobiliària Local",
      date: "15 març, 2025",
      readTime: "9 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "Si tens un pis a Singuerlín o al Centre de Santa Coloma i vols vendre'l o llogar-lo, estàs en una posició privilegiada dins el mercat metropolità. Aquests dos barris concentren les característiques més demandades pels compradors i llogatadors.",
      sections: [
        {
          heading: "Anàlisi del mercat a Singuerlín: famílies, metro L9N i preu de la tranquil·litat",
          level: "h2",
          content: [
            "Singuerlín s'ha consolidat com un dels destins residencials preferits per les famílies joves que busquen sortir de Barcelona sense renunciar a la connectivitat. La línia L9N de metro ha estat un factor determinant en la revaloització del barri.",
            "La tipologia predominant és la de pisos de tres dormitoris amb balcó o terrassa, molts d'ells reformats. Els edificis amb ascensor instal·lat recentment presenten la major rotació i els preus per metre quadrat més alts."
          ],
          bulletPoints: [
            "Alta demanda de pisos de 3 dormitoris amb balcó i ascensor.",
            "Connectivitat directa amb Barcelona via L9N.",
            "Perfil de comprador jove amb hipoteca del 80-90%.",
            "Forta demanda de lloguer per treballadors de polígons industrials."
          ]
        },
        {
          heading: "El Centre: el cor comercial amb màxima rendibilitat de lloguer",
          level: "h2",
          content: [
            "Al Centre, l'escassetat de pisos disponibles en lloguer genera una pressió de demanda molt alta. Per al propietari inversor, el Centre ofereix les rendibilitats brutes de lloguer més altes de Santa Coloma, entre el 5% i el 7% anual."
          ]
        }
      ],
      conclusion: "Singuerlín i el Centre són els barris amb major dinamisme del mercat immobiliari de Santa Coloma. Gesgrama t'ofereix el coneixement local específic per a que la teva operació sigui un èxit."
    },
    en: {
      title: "Complete guide to renting or selling your flat in Singuerlín and Centre",
      summary: "Detailed analysis of the real estate market in Singuerlín and Centre, Santa Coloma de Gramenet: price trends, demand profiles, property types and everything you need to know.",
      category: "Local Real Estate",
      date: "March 15, 2025",
      readTime: "9 min read",
      author: "Gesgrama Real Estate Team",
      intro: "If you own a property in Singuerlín or Centre in Santa Coloma de Gramenet and are thinking about selling or renting it, you are in a privileged position within the metropolitan market. Both neighborhoods concentrate the features most sought-after by buyers and tenants.",
      sections: [
        {
          heading: "Singuerlín market: families, L9N metro and competitive pricing",
          level: "h2",
          content: [
            "Singuerlín has become the preferred residential destination for young families moving out of Barcelona without sacrificing connectivity. The L9N metro line has been a key driver of the neighborhood's value appreciation.",
            "The dominant property type is 3-bedroom flats with balcony or terrace, many recently renovated. Buildings with recently installed lifts see the highest market turnover and achieve the highest prices per square meter."
          ],
          bulletPoints: [
            "High demand for 3-bedroom flats with balcony and lift.",
            "Direct metro connectivity to Barcelona via L9N.",
            "Young buyer profile with 80-90% mortgage financing.",
            "Strong rental demand from industrial park workers."
          ]
        },
        {
          heading: "Centre: the commercial heart with maximum rental yields",
          level: "h2",
          content: [
            "In Centre, the shortage of available rental flats generates consistently high demand pressure. For investor landlords, Centre offers Santa Coloma's highest gross rental yields — 5% to 7% annually on well-positioned renovated flats."
          ]
        }
      ],
      conclusion: "Singuerlín and Centre are Santa Coloma's most dynamic real estate markets. Gesgrama brings you neighborhood-specific local market knowledge and professional support to make your sale or rental a success in time and price."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 6 — ITE y rehabilitación
  // ─────────────────────────────────────────────
  {
    id: "art-6",
    slug: "ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner",
    image: art6Img,
    datePublished: "2025-03-22T09:00:00+01:00",
    dateModified: "2025-03-22T09:00:00+01:00",
    es: {
      title: "ITE y rehabilitación de edificios en Fondo, Santa Rosa y Can Mariner",
      summary: "Guía técnica y práctica sobre la Inspección Técnica de Edificios (ITE), las obligaciones de conservación de fincas en Santa Coloma y cómo acceder a las subvenciones europeas para rehabilitación energética.",
      category: "Administración de Fincas",
      date: "22 marzo, 2025",
      readTime: "10 min de lectura",
      author: "Departamento Técnico Gesgrama",
      intro: "Los barrios de Fondo, Santa Rosa y Can Mariner albergan una parte muy significativa del parque edificatorio más antiguo de Santa Coloma de Gramenet. Muchos de estos edificios fueron construidos entre las décadas de 1960 y 1975, en el contexto del gran auge demográfico que transformó el municipio. Hoy, esas fincas están llegando o han superado los 50 años de antigüedad, lo que las sitúa en la zona de obligatoriedad de la Inspección Técnica del Edificio (ITE) y, en muchos casos, en la necesidad de acometer obras de rehabilitación estructural o energética.",
      sections: [
        {
          heading: "Qué es la ITE y por qué es una obligación legal y no una opción",
          level: "h2",
          content: [
            "La Inspección Técnica del Edificio (ITE) es un examen técnico de carácter preventivo que debe ser realizado por un técnico competente —arquitecto o arquitecto técnico colegiado— y que evalúa el estado de conservación del inmueble en sus aspectos más críticos: estructura portante, fachadas exteriores y medianeras, cubiertas y terrazas accesibles, redes de saneamiento e instalaciones comunitarias.",
            "En Cataluña, la ITE está regulada por el Decreto 67/2015 de la Generalitat y por la normativa municipal de cada ayuntamiento. La obligatoriedad de la inspección comienza a los 45 años de antigüedad del edificio y debe renovarse cada 10 años si el resultado es de aptitud sin deficiencias graves.",
            "El resultado de la ITE puede ser de cuatro tipos: Sin Deficiencias, Con Deficiencias Leves (que deben subsanarse en el plazo indicado por el técnico), Con Deficiencias Graves (que requieren la ejecución inmediata de las obras de reparación) y Con Deficiencias Muy Graves (que pueden implicar el desalojo cautelar del edificio hasta que se subsanen las deficiencias estructurales de riesgo inmediato).",
            "No pasar la ITE en el plazo obligatorio o no subsanar las deficiencias detectadas acarrea consecuencias muy concretas: sanciones administrativas del Ayuntamiento de Santa Coloma, imposibilidad práctica de escriturar la venta de cualquier piso de la finca, y dificultades para contratar seguros del hogar o renovar contratos de suministros."
          ],
          bulletPoints: [
            "Obligatoria a partir de los 45 años de antigüedad del edificio según normativa catalana.",
            "Debe ser realizada por un arquitecto o aparejador colegiado con seguro de responsabilidad civil.",
            "El Certificado de Aptitud obtenido tiene validez de 10 años si el resultado es sin deficiencias.",
            "El incumplimiento genera sanciones administrativas y bloquea la venta de pisos de la finca."
          ]
        },
        {
          heading: "Las obras de rehabilitación más frecuentes en Fondo, Santa Rosa y Can Mariner",
          level: "h2",
          content: [
            "La inspección de edificios en estos tres barrios revela una tipología bastante homogénea de deficiencias. Las más frecuentes que encontramos en las fincas que gestionamos en esta zona son:",
            "Fachadas con problemas de desprendimiento de revocos o aplacados: los cambios de temperatura y la expansión del hormigón armado de las décadas de los 70 generan microfisuras que con el tiempo se convierten en riesgo de caída de fragmentos sobre la vía pública. La solución habitual es la aplicación de un sistema SATE (sistema de aislamiento térmico exterior por el exterior) que al mismo tiempo que rehabilita la fachada, mejora radicalmente la eficiencia energética del edificio.",
            "Cubiertas con pérdidas de estanqueidad: la impermeabilización original de los terrados planos catalanes tiene una vida útil de 20-25 años. En edificios de los años 70, es habitual que hayan sido impermeabilizados una o dos veces, pero en malas condiciones o con materiales ya obsoletos. Las humedades que llegan a las viviendas de las últimas plantas son una señal clara de que la cubierta necesita una rehabilitación integral.",
            "Instalación de ascensor en edificios sin él: la instalación de ascensor en fincas antiguas sin este elemento es la obra que más valor añade a los pisos y que más mejora la calidad de vida de los residentes, especialmente en barrios con alto porcentaje de población mayor."
          ]
        },
        {
          heading: "Subvenciones Next Generation EU y otras ayudas para la rehabilitación",
          level: "h2",
          content: [
            "El contexto actual de subvenciones europeas para la rehabilitación energética de edificios es excepcionalmente favorable. Los fondos Next Generation EU, canalizados a través del Plan de Recuperación, Transformación y Resiliencia del Gobierno de España, incluyen líneas de ayuda que pueden cubrir entre el 40% y el 80% del coste de las obras de mejora energética en edificios residenciales.",
            "Las actuaciones subvencionadas son principalmente aquellas que reducen la demanda energética del edificio: aplicación de SATE en fachadas, sustitución de cubiertas mejorando el aislamiento, instalación de sistemas de ventilación mecánica controlada y sustitución de instalaciones de calefacción centralizada por sistemas más eficientes.",
            "La tramitación de estas ayudas requiere una solicitud colectiva a nombre de la comunidad de propietarios, previa presentación de un proyecto técnico firmado y de un Informe de Evaluación del Edificio (IEE) que certifique el estado actual y la mejora energética prevista.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el Decreto 67/2015 de la Generalitat de Catalunya sobre la ITE y los plazos de obligatoriedad para edificios con más de 45 años de antigüedad en el ámbito municipal de Santa Coloma de Gramenet].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones de IRPF por obras de rehabilitación energética (20% por reducción del 7% de la demanda de calefacción y refrigeración, 40% por reducción del 30%, y 60% en rehabilitación integral del edificio) y los plazos de convocatoria de subvenciones Next Generation vigentes]."
          ]
        }
      ],
      conclusion: "Gestionar la ITE y las obras de rehabilitación de una finca de Fondo, Santa Rosa o Can Mariner no tiene por qué ser una carga insoportable para la comunidad. En Gesgrama coordinamos todo el proceso: selección del técnico competente, tramitación de licencias municipales, solicitud de subvenciones europeas y seguimiento de las obras hasta su finalización, para que vuestra comunidad luzca segura, moderna y revalorizada."
    },
    ca: {
      title: "ITE i rehabilitació d'edificis a Fondo, Santa Rosa i Can Mariner",
      summary: "Guia tècnica i pràctica sobre la ITE, les obligacions de conservació de finques a Santa Coloma i com accedir a les subvencions europees per a rehabilitació energètica.",
      category: "Administració de Finques",
      date: "22 març, 2025",
      readTime: "10 min de lectura",
      author: "Departament Tècnic Gesgrama",
      intro: "Els barris de Fondo, Santa Rosa i Can Mariner alberguen una part molt significativa del parc edificatori més antic de Santa Coloma de Gramenet, construït principalment entre els anys 60 i 75. Avui, molts d'aquests edificis estan en l'obligatorietat de la ITE i sovint necessiten obres de rehabilitació.",
      sections: [
        {
          heading: "Què és la ITE i per què és una obligació legal i no una opció",
          level: "h2",
          content: [
            "La ITE és un examen tècnic preventiu realitzat per un arquitecte o aparellador col·legiat que avalua l'estat de conservació de l'immoble en els seus aspectes crítics. A Catalunya, la ITE és obligatòria a partir dels 45 anys d'antiguitat de l'edifici.",
            "El resultat pot ser: Sense Deficiències, Amb Deficiències Lleus, Greus o Molt Greus. El Certificat d'Aptitud té una validesa de 10 anys si no hi ha deficiències greus."
          ],
          bulletPoints: [
            "Obligatòria a partir dels 45 anys d'antiguitat.",
            "Ha de ser realitzada per un arquitecte o aparellador col·legiat.",
            "L'incompliment genera sancions i bloqueja la venda de pisos de la finca."
          ]
        },
        {
          heading: "Subvencions Next Generation EU per a la rehabilitació",
          level: "h2",
          content: [
            "Els fons Next Generation EU poden cobrir entre el 40% i el 80% del cost de les obres de millora energètica: aplicació de SATE a façanes, substitució de cobertes millorant l'aïllament i instal·lació de ventilació mecànica controlada."
          ]
        }
      ],
      conclusion: "A Gesgrama coordinem tot el procés de la ITE i la rehabilitació: selecció del tècnic, tràmit de llicències, sol·licitud de subvencions europees i seguiment de les obres."
    },
    en: {
      title: "Building inspection (ITE) and renovation in Fondo, Santa Rosa, and Can Mariner",
      summary: "Practical technical guide to mandatory building inspections, conservation obligations, and how to access European renovation grants in Santa Coloma.",
      category: "Property Management",
      date: "March 22, 2025",
      readTime: "10 min read",
      author: "Gesgrama Technical Department",
      intro: "The neighborhoods of Fondo, Santa Rosa, and Can Mariner contain Santa Coloma de Gramenet's oldest residential building stock, mostly built between 1960 and 1975. Many of these buildings are now approaching or exceeding 50 years, placing them firmly within mandatory inspection territory.",
      sections: [
        {
          heading: "What the ITE is and why it is a legal obligation, not an option",
          level: "h2",
          content: [
            "The Technical Building Inspection (ITE) is a preventive technical review carried out by a registered architect or building engineer evaluating the building's structural integrity, facades, roofs, and communal systems. In Catalonia, it is mandatory for buildings over 45 years old.",
            "The result can be: No Deficiencies, Minor Deficiencies, Serious Deficiencies, or Very Serious Deficiencies. The Aptitude Certificate is valid for 10 years if there are no serious deficiencies. Non-compliance results in municipal sanctions and blocks property sales within the building."
          ],
          bulletPoints: [
            "Mandatory from 45 years of building age under Catalan regulations.",
            "Must be carried out by a registered architect or building engineer.",
            "Non-compliance generates sanctions and blocks flat sales within the building."
          ]
        },
        {
          heading: "European Next Generation EU renovation grants",
          level: "h2",
          content: [
            "Current EU Next Generation funds can cover 40-80% of the cost of energy improvement works: external thermal insulation (SATE), roof replacement with improved insulation, and controlled mechanical ventilation installation."
          ]
        }
      ],
      conclusion: "Gesgrama coordinates the entire ITE and renovation process: technical expert selection, permits, European grant applications, and works supervision until completion."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 7 — Plusvalía y gastos de venta
  // ─────────────────────────────────────────────
  {
    id: "art-7",
    slug: "plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval",
    image: art7Img,
    datePublished: "2025-03-28T09:00:00+01:00",
    dateModified: "2025-03-28T09:00:00+01:00",
    es: {
      title: "Plusvalía municipal y gastos al vender un piso en Santa Coloma",
      summary: "Guía fiscal completa para vendedores de pisos en Riera Alta-Llatí y El Raval: cómo se calcula la Plusvalía Municipal, qué IRPF pagarás por la ganancia patrimonial, y todos los gastos e impuestos que debes anticipar.",
      category: "Asesoría Jurídica & Fiscal",
      date: "28 marzo, 2025",
      readTime: "9 min de lectura",
      author: "Área Jurídica Gesgrama",
      intro: "Vender un piso en Riera Alta-Llatí, El Raval o cualquier otro barrio de Santa Coloma de Gramenet genera una serie de obligaciones fiscales y costes que el propietario debe conocer con precisión antes de cerrar la operación. Confundir el precio de venta con el beneficio neto real es uno de los errores más frecuentes y costosos que cometen los vendedores particulares. Una planificación fiscal previa adecuada puede suponer diferencias de miles de euros.",
      sections: [
        {
          heading: "La Plusvalía Municipal (IIVTNU): cómo se calcula y cuánto se paga",
          level: "h2",
          content: [
            "El Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana, conocido popularmente como Plusvalía Municipal, es un tributo local que grava el aumento de valor del suelo urbano durante el tiempo que el propietario ha tenido el inmueble en su poder. Es un impuesto a favor del Ayuntamiento del municipio donde se ubica el inmueble —en este caso, el Ayuntamiento de Santa Coloma de Gramenet— y lo debe liquidar el vendedor.",
            "Tras la sentencia del Tribunal Constitucional de 2021 y la reforma posterior del Real Decreto-ley 26/2021, el sistema de cálculo de la Plusvalía Municipal cambió sustancialmente. Ahora el contribuyente puede elegir entre dos métodos y pagar por el que resulte más favorable económicamente:",
            "Método Objetivo: multiplica el valor catastral del suelo (no la construcción, solo el suelo) por un coeficiente fijado por el propio Ayuntamiento de Santa Coloma en función del número de años de tenencia. Este coeficiente va aumentando con los años, por lo que las tenencias largas generan bases imponibles más altas.",
            "Método Real: calcula la diferencia real entre el precio de venta de la parte del suelo (proporcional al valor catastral del suelo sobre el total catastral del inmueble) y el precio de compra de esa misma parte. Si la vivienda se ha revalorizado, este método puede ser más ventajoso para tenencias cortas. Si no ha habido revalorización real —es decir, si se vende al mismo precio o a pérdidas— la operación está exenta del impuesto."
          ],
          bulletPoints: [
            "El vendedor puede elegir entre Método Objetivo y Método Real para calcular la plusvalía.",
            "Si se vende a pérdidas (precio de venta inferior al de compra), la operación está exenta de Plusvalía Municipal.",
            "El plazo de autoliquidación y pago es de 30 días hábiles desde la fecha de la escritura de compraventa.",
            "La cuota tributaria se calcula sobre la base imponible obtenida aplicando el tipo impositivo del Ayuntamiento de Santa Coloma."
          ]
        },
        {
          heading: "IRPF por ganancia patrimonial: cuánto te queda realmente después de vender",
          level: "h2",
          content: [
            "Además de la Plusvalía Municipal, el vendedor debe declarar en su Declaración de la Renta (IRPF) la ganancia patrimonial obtenida con la venta. Esta ganancia se integra en la base imponible del ahorro y tributa a tipos progresivos.",
            "La ganancia patrimonial se calcula de la siguiente manera: al valor de transmisión (precio de venta escriturado menos los gastos e impuestos que asumió el vendedor en la venta, incluyendo honorarios de agencia y Plusvalía Municipal) se le resta el valor de adquisición (precio de compra original más todos los gastos e impuestos pagados en su momento al comprar: ITP o IVA, Notaría, Registro, IAJD, honorarios de agencia si los hubo, y el coste de reformas o mejoras realizadas en el inmueble que estén debidamente justificadas con facturas).",
            "Es importante incluir en el valor de adquisición todas las inversiones realizadas en el inmueble que sean mejoras —no simples reparaciones— porque reducen la ganancia patrimonial y, por tanto, el IRPF a pagar.",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la exención total del IRPF por reinversión en vivienda habitual, disponible cuando el importe total obtenido en la venta se reinvierte en la adquisición de otra vivienda habitual en un plazo máximo de 2 años anteriores o 2 años posteriores a la venta].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar la exención total del IRPF por venta de vivienda habitual para personas mayores de 65 años o personas en situación de dependencia severa o gran dependencia, sin necesidad de reinversión].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar los tipos impositivos del ahorro vigentes en el momento de la declaración para el cálculo del IRPF sobre la ganancia patrimonial]."
          ]
        },
        {
          heading: "Todos los gastos que debe asumir el vendedor: el resumen completo",
          level: "h2",
          content: [
            "Además de los impuestos, el vendedor debe prever una serie de gastos de gestión que habitualmente se detraen del precio final de venta. Los más relevantes son: honorarios de la agencia inmobiliaria (si se ha trabajado con un profesional), gastos de cancelación registral de la hipoteca si el inmueble tiene una carga pendiente (honorarios del banco para emitir el certificado de deuda cero, honorarios notariales de la escritura de cancelación y gastos del Registro de la Propiedad), y el coste de obtención de los certificados y documentos obligatorios para la venta."
          ],
          bulletPoints: [
            "Honorarios de agencia inmobiliaria: deducibles de la ganancia patrimonial en el IRPF.",
            "Gastos de cancelación registral de hipoteca: notaría, Registro y gestión bancaria.",
            "Cédula de Habitabilidad: renovación si ha caducado.",
            "Certificado de Eficiencia Energética (CEE): obligatorio incluirlo en los anuncios y entregarlo al comprador.",
            "Certificado de deudas de la comunidad de propietarios: obligatorio en el momento de la firma."
          ]
        }
      ],
      conclusion: "En Gesgrama realizamos para nuestros clientes vendedores una simulación tributaria personalizada y gratuita antes de firmar nada. Conocer de antemano el importe exacto de Plusvalía Municipal, IRPF y gastos asociados te permite negociar el precio de venta con total seguridad y evitar sorpresas desagradables después de la firma. Solicita tu simulación sin compromiso."
    },
    ca: {
      title: "Plusvàlua municipal i despeses en vendre un pis a Santa Coloma",
      summary: "Guia fiscal completa per a venedors de pisos a Riera Alta-Llatí i El Raval: càlcul de la Plusvàlua Municipal, IRPF per guany patrimonial i tots els costos a anticipar.",
      category: "Assessorament Jurídic & Fiscal",
      date: "28 març, 2025",
      readTime: "9 min de lectura",
      author: "Àrea Jurídica Gesgrama",
      intro: "Vendre un pis a Santa Coloma de Gramenet genera una sèrie d'obligacions fiscals i costos que el propietari ha de conèixer amb precisió. Confondre el preu de venda amb el benefici net real és un dels errors més freqüents i costosos dels venedors particulars.",
      sections: [
        {
          heading: "La Plusvàlua Municipal (IIVTNU): com es calcula i quant es paga",
          level: "h2",
          content: [
            "La Plusvàlua Municipal grava l'augment de valor del sòl urbà durant el temps de tinença. Des de 2021, el contribuent pot triar entre el Mètode Objectiu i el Mètode Real, pagant pel que resulti més favorable.",
            "Si es ven a pèrdues (preu de venda inferior al de compra), l'operació està exempta de Plusvàlua Municipal."
          ],
          bulletPoints: [
            "El venedor pot triar entre Mètode Objectiu i Mètode Real.",
            "Si es ven a pèrdues, l'operació està exempta.",
            "El termini d'autoliquidació és de 30 dies hàbils des de l'escriptura."
          ]
        },
        {
          heading: "IRPF per guany patrimonial: quant et queda realment",
          level: "h2",
          content: [
            "El guany patrimonial es calcula restant al valor de transmissió net el valor d'adquisició (preu de compra més tots els despeses i impostos pagats en comprar i el cost de reformes justificades). Les inversions en millores redueixen el guany i per tant l'IRPF a pagar."
          ]
        }
      ],
      conclusion: "A Gesgrama realitzem per als nostres clients venedors una simulació tributària personalitzada i gratuïta abans de signar res. Sol·licita la teva simulació sense compromís."
    },
    en: {
      title: "Municipal capital gains tax and selling costs in Santa Coloma",
      summary: "Complete fiscal guide for property sellers in Riera Alta-Llatí and El Raval: how the Municipal Plusvalía is calculated, income tax on capital gains, and all costs to anticipate.",
      category: "Legal & Tax Advisory",
      date: "March 28, 2025",
      readTime: "9 min read",
      author: "Gesgrama Legal Department",
      intro: "Selling a property in Santa Coloma de Gramenet triggers a series of tax obligations and costs that the owner must understand precisely before completing the transaction. Confusing the sale price with actual net proceeds is one of the most common and costly mistakes private sellers make.",
      sections: [
        {
          heading: "Municipal Plusvalía (IIVTNU): how it's calculated and how much you'll pay",
          level: "h2",
          content: [
            "The Municipal Land Value Increment Tax (Plusvalía Municipal) taxes the increase in urban land value during the period of ownership. Since 2021, taxpayers can choose between the Objective Method and the Real Gain Method, paying whichever is more favorable.",
            "If the property sells at a loss (sale price below purchase price), the transaction is fully exempt from Municipal Plusvalía."
          ],
          bulletPoints: [
            "Sellers can choose between Objective Method and Real Gain Method.",
            "If sold at a loss, the transaction is fully exempt.",
            "Self-assessment payment deadline is 30 working days from the deed signing date."
          ]
        },
        {
          heading: "Income tax on capital gains: what you actually keep",
          level: "h2",
          content: [
            "Capital gain is calculated by subtracting the net acquisition cost (original purchase price plus all purchase taxes, notary fees, registry costs, and documented improvement costs) from the net transfer value (sale price minus selling costs and taxes).",
            "All documented improvement investments reduce the taxable gain and therefore the income tax payable."
          ]
        }
      ],
      conclusion: "At Gesgrama we provide sellers with a personalized and free tax simulation before signing anything. Request yours with no commitment."
    }
  },
  // ─────────────────────────────────────────────
  // ARTÍCULO 8 — Administración de comunidades
  // ─────────────────────────────────────────────
  {
    id: "art-8",
    slug: "claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra",
    image: art8Img,
    datePublished: "2025-04-02T09:00:00+01:00",
    dateModified: "2025-04-02T09:00:00+01:00",
    es: {
      title: "Claves para administrar tu comunidad en Riu Nord, Riu Sud y Oliveres",
      summary: "Guía práctica completa sobre la gestión profesional de comunidades de propietarios en Santa Coloma de Gramenet: marco legal catalán, juntas de propietarios, presupuestos, morosidad y eficiencia energética.",
      category: "Administración de Fincas",
      date: "2 abril, 2025",
      readTime: "10 min de lectura",
      author: "Administración de Fincas Gesgrama",
      intro: "Las comunidades de propietarios en los barrios de Riu Nord, Riu Sud y Oliveres-Can Serra se enfrentan cada año a los mismos desafíos que cualquier comunidad de una ciudad con un parque edificatorio maduro: mantenimiento preventivo, aprobación de presupuestos anuales, gestión de derramas extraordinarias para obras necesarias, control de la morosidad y cumplimiento de las obligaciones legales vigentes. La diferencia entre una comunidad bien gestionada y una que acumula problemas está, casi siempre, en la calidad de la administración profesional que la gestiona.",
      sections: [
        {
          heading: "El Codi Civil de Catalunya: el marco legal específico de Cataluña",
          level: "h2",
          content: [
            "A diferencia de la gran mayoría del territorio español, donde las comunidades de propietarios se rigen por la Ley de Propiedad Horizontal de 1960 (modificada en varias ocasiones), en Cataluña el régimen de la propiedad horizontal está regulado por el Libro Quinto del Codi Civil de Catalunya (CCC), concretamente en sus artículos 553-1 a 553-66.",
            "Esta especificidad normativa tiene implicaciones prácticas muy relevantes. El Codi Civil de Catalunya establece un sistema de adopción de acuerdos basado en el doble quórum: en la mayoría de las decisiones, se requiere simultáneamente una determinada mayoría del número de propietarios que votan Y una determinada mayoría de las cuotas de participación que representan esos propietarios. Esto difiere del sistema estatal donde en algunos casos basta con la mayoría de cuotas.",
            "Los tipos de mayoría más relevantes en la práctica cotidiana de la administración de fincas en Cataluña son: la mayoría simple (más de la mitad de los propietarios presentes o representados y más de la mitad de las cuotas que representan) para los acuerdos ordinarios; la mayoría de cuatro quintos (4/5) de los propietarios y cuotas para la modificación de estatutos o la desafectación de elementos comunes; y la unanimidad, requerida únicamente para la extinción del régimen de propiedad horizontal."
          ],
          bulletPoints: [
            "En Cataluña aplica el Codi Civil de Catalunya (Libro V), no la Ley de Propiedad Horizontal estatal.",
            "Sistema de doble quórum: se requiere mayoría de propietarios Y mayoría de cuotas simultáneamente.",
            "Mayoría simple: para acuerdos ordinarios de gestión y mantenimiento.",
            "Mayoría de 4/5: para modificación de estatutos y desafectación de elementos comunes.",
            "Unanimidad: solo para extinción del régimen de propiedad horizontal."
          ]
        },
        {
          heading: "El presupuesto anual y las derramas: cómo gestionarlos correctamente",
          level: "h2",
          content: [
            "El presupuesto anual de la comunidad es el documento que más frecuentemente genera conflictos entre propietarios si no está bien elaborado y bien presentado. Un presupuesto transparente, detallado y realista es la base de la confianza de los vecinos en la administración.",
            "El presupuesto ordinario debe incluir todos los gastos previsibles del ejercicio: seguros del edificio (multirriesgo y responsabilidad civil), gastos de mantenimiento de ascensores, portería y jardinería, suministros de zonas comunes (luz de escalera, agua de cisterna), honorarios de la administración y dotación al fondo de reserva.",
            "El fondo de reserva es un concepto especialmente importante en Cataluña: el Codi Civil de Catalunya obliga a las comunidades a mantener un fondo de reserva mínimo del 5% del presupuesto ordinario del año anterior. Este fondo es la garantía de que la comunidad puede hacer frente a gastos imprevistos urgentes —como la reparación de una avería del ascensor o la sustitución de una tubería reventada— sin necesidad de convocar de urgencia una junta extraordinaria para aprobar una derrama.",
            "Las derramas extraordinarias son necesarias cuando el importe de una obra o reparación supera los recursos del fondo de reserva. Para su aprobación, la cuantía máxima que puede imponerse sin voto favorable de la junta está establecida por el Codi Civil de Catalunya: si la obra o reparación es urgente y necesaria para la seguridad del edificio, el president puede ordenarla sin junta previa, con cargo a posteriori a la comunidad."
          ]
        },
        {
          heading: "Morosidad: cómo prevenirla y cómo reclamarla efectivamente",
          level: "h2",
          content: [
            "La morosidad en las comunidades de propietarios es uno de los problemas más frecuentes y desestabilizadores de la gestión comunitaria. En los barrios de Riu Nord, Riu Sud y Oliveres-Can Serra, como en cualquier zona con un parque de viviendas de alquiler significativo, es habitual que algunos propietarios atraviesen dificultades económicas que se trasladan al pago de las cuotas comunitarias.",
            "El primer paso de una gestión eficaz de la morosidad es la prevención: mantener un control mensual de los cobros, enviar avisos de impago de forma inmediata en cuanto se produce el incumplimiento y mantener una comunicación directa con el propietario moroso para intentar llegar a un acuerdo de pago fraccionado antes de recurrir a la vía judicial.",
            "Si la vía amistosa fracasa, el ordenamiento jurídico catalán ofrece herramientas muy eficaces para el cobro de deudas comunitarias. El procedimiento monitorio especial de la Ley de Propiedad Horizontal (aplicable en Cataluña con las adaptaciones del Codi Civil) permite al administrador de la finca instar la reclamación judicial de la deuda de forma ágil, sin necesidad de abogado ni procurador hasta un determinado importe."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el Art. 553-5 del Codi Civil de Catalunya sobre la afección real del piso por deudas comunitarias del año en curso y los 4 anteriores con carácter preferente frente a terceros adquirentes].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las mayorías requeridas por el CCC para la aprobación de instalaciones de autoconsumo fotovoltaico compartido o puntos de recarga de vehículos eléctricos en garajes comunitarios].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar la obligación de eliminar barreras arquitectónicas para propietarios o inquilinos mayores de 70 años o con discapacidad, y el régimen de mayorías especiales aplicable a estas obras en Cataluña]."
          ]
        },
        {
          heading: "Qué esperar de una administración de fincas profesional en 2025",
          level: "h3",
          content: [
            "La administración de fincas ha evolucionado enormemente en los últimos años. Los propietarios del siglo XXI esperan de su administrador mucho más que la mera gestión de cobros y pagos. En Gesgrama, la gestión de comunidades en Riu Nord, Riu Sud y Oliveres-Can Serra incluye:",
            "Acceso a una plataforma digital donde cada propietario puede consultar en tiempo real el estado de las cuentas comunitarias, las actas de las juntas, las facturas abonadas y las incidencias en curso.",
            "Servicio de atención de averías e incidencias urgentes con respuesta inmediata para instalaciones críticas del edificio (ascensores, suministros, portería).",
            "Asesoramiento proactivo sobre subvenciones disponibles para mejoras del edificio y tramitación completa de las solicitudes."
          ]
        }
      ],
      conclusion: "Una administración de fincas profesional no es un gasto para la comunidad: es la inversión que garantiza que el edificio esté correctamente mantenido, que las cuentas sean transparentes, que los morosos paguen y que los vecinos vivan en paz. En Gesgrama llevamos décadas siendo el administrador de confianza de comunidades de propietarios en Riu Nord, Riu Sud, Oliveres-Can Serra y el resto de barrios de Santa Coloma de Gramenet."
    },
    ca: {
      title: "Claus per administrar la teva comunitat a Riu Nord, Riu Sud i Oliveres",
      summary: "Guia pràctica completa sobre la gestió professional de comunitats de propietaris a Santa Coloma: marc legal català, juntes, pressupostos, morositat i eficiència energètica.",
      category: "Administració de Finques",
      date: "2 d'abril, 2025",
      readTime: "10 min de lectura",
      author: "Administració de Finques Gesgrama",
      intro: "Les comunitats de propietaris a Riu Nord, Riu Sud i Oliveres-Can Serra s'enfronten cada any als mateixos reptes: manteniment preventiu, aprovació de pressupostos, gestió de derrames, control de la morositat i compliment de les obligacions legals. La diferència entre una comunitat ben gestionada i una que acumula problemes és, gairebé sempre, la qualitat de l'administració professional.",
      sections: [
        {
          heading: "El Codi Civil de Catalunya: el marc legal específic de Catalunya",
          level: "h2",
          content: [
            "A Catalunya, les comunitats de propietaris es regeixen pel Llibre Cinquè del Codi Civil de Catalunya (CCC, Art. 553-1 a 553-66), no per la Llei de Propietat Horitzontal estatal.",
            "El CCC estableix un sistema de doble quòrum: en la majoria de decisions es requereix simultàniament una determinada majoria del nombre de propietaris i una determinada majoria de les quotes de participació."
          ],
          bulletPoints: [
            "A Catalunya aplica el Codi Civil de Catalunya, no la LPH estatal.",
            "Sistema de doble quòrum: majoria de propietaris I majoria de quotes simultàniament.",
            "Majoria simple per a acords ordinaris de gestió.",
            "Majoria de 4/5 per a modificació d'estatuts."
          ]
        },
        {
          heading: "Morositat: com prevenir-la i reclamar-la efectivament",
          level: "h2",
          content: [
            "El primer pas és la prevenció: control mensual dels cobraments, avisos d'impagament immediats i comunicació directa amb el propietari morós. Si la via amistosa fracassa, el procediment monitorio especial permet reclamar la deuda de forma àgil i sense advocat fins a un determinat import."
          ]
        }
      ],
      conclusion: "Una administració de finques professional garanteix que l'edifici estigui ben mantingut, les comptes siguin transparents, els morosos paguin i els veïns visquin en pau. Gesgrama porta dècades sent l'administrador de confiança a Riu Nord, Riu Sud i Oliveres."
    },
    en: {
      title: "Keys to managing your HOA in Riu Nord, Riu Sud and Oliveres",
      summary: "Complete practical guide to professional homeowner association management in Santa Coloma: Catalan legal framework, meetings, budgets, debt collection and energy efficiency.",
      category: "Property Management",
      date: "April 2, 2025",
      readTime: "10 min read",
      author: "Gesgrama Property Management",
      intro: "HOAs in Riu Nord, Riu Sud and Oliveres-Can Serra face the same annual challenges as any community in a mature urban housing stock: preventive maintenance, budget approval, extraordinary levies for necessary works, debt collection and legal compliance. The difference between a well-managed community and one that accumulates problems is almost always the quality of its professional administration.",
      sections: [
        {
          heading: "The Catalan Civil Code: Catalonia's specific legal framework for HOAs",
          level: "h2",
          content: [
            "Unlike the rest of Spain where HOAs are governed by the 1960 Horizontal Property Act, in Catalonia the regime is regulated by Book Five of the Catalan Civil Code (CCC, Articles 553-1 to 553-66).",
            "The CCC establishes a double-quorum system: most decisions require a majority of both the number of owners AND the participation quotas they represent simultaneously."
          ],
          bulletPoints: [
            "Catalonia applies the Catalan Civil Code (Book V), not the national Horizontal Property Act.",
            "Double quorum system: majority of owners AND majority of participation quotas required simultaneously.",
            "Simple majority for ordinary management and maintenance decisions.",
            "4/5 majority to modify statutes or declassify common elements."
          ]
        },
        {
          heading: "Debt collection: preventing and recovering unpaid community fees",
          level: "h2",
          content: [
            "The first step is prevention: monthly payment tracking, immediate non-payment notices, and direct communication with the defaulting owner. If amicable resolution fails, the monitorio procedure allows recovering community debts quickly and without legal representation up to a certain threshold."
          ]
        }
      ],
      conclusion: "Professional property management is not a cost for the community — it is the investment that ensures the building is properly maintained, accounts are transparent, debtors pay, and residents live in peace. Gesgrama has been the trusted HOA administrator across Riu Nord, Riu Sud, Oliveres-Can Serra and all of Santa Coloma's neighborhoods for decades."
    }
  }
];
