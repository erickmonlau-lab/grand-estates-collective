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
      summary: "Descobreix en què consisteix la feina real d'un assessor immobiliari professional, quins avantatges aporta al comprador i venedor, i per què al mercat de Santa Coloma de Gramenet el seu paper és més decisiu que mai.",
      category: "Immobiliària",
      date: "9 març, 2025",
      readTime: "9 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "En els darrers anys, el mercat immobiliari a Santa Coloma de Gramenet ha experimentat una transformació profunda. Els preus de compravenda s'han ajustat, la demanda de lloguer ha crescut amb força i els compradors són cada vegada més exigents i informats. En aquest escenari, la figura de l'assessor immobiliari professional ha deixat de ser un luxe per convertir-se en una necessitat real per a qualsevol persona que vulgui vendre, comprar o arrendar un immoble amb garanties.",
      sections: [
        {
          heading: "Més enllà de l'intermediari: què fa realment un assessor immobiliari",
          level: "h2",
          content: [
            "Existeix una confusió freqüent entre el concepte d'intermediari i el d'assessor immobiliari. El primer es limita a posar en contacte comprador i venedor i cobrar una comissió. L'assessor immobiliari professional va molt més enllà: actua com a consultor estratègic que acompanya el client en cada fase del procés, des de la primera valoració de l'immoble fins a la signatura de l'escriptura davant notari.",
            "En la pràctica diària, això significa que l'assessor de Gesgrama realitza un Anàlisi Comparatiu de Mercat (ACM) exhaustiu, creuant dades de vendes tancades recentment al barri específic on s'ubica l'immoble —ja sigui a Singuerlín, Fondo, Centre o Riera Alta-Llatí— per determinar un preu de sortida competitiu que atregui compradors qualificats sense sacrificar el marge del propietari.",
            "A més, l'assessor es converteix en el filtre de seguretat de tota l'operació. Comprova la solvència financera dels interessats abans de concertar visites, verifica que l'immoble no presenta càrregues ocultes mitjançant la nota simple registral, coordina l'obtenció de la Cèdula d'Habitabilitat i el Certificat d'Eficiència Energètica (CEE), i revisa cada clàusula del contracte d'arres per garantir que els interessos del client estan completament protegits."
          ],
          bulletPoints: [
            "Valoració professional precisa basada en tancaments registrals reals del barri, no en preus d'oferta de portals.",
            "Pla de comercialització complet: fotografia amb càmera professional, vídeo de recorregut virtual 360° i Home Staging.",
            "Filtratge de compradors: comprovació d'hipoteca preaprovada o capacitat de pagament documentada abans de la visita.",
            "Gestió documental: Cèdula d'Habitabilitat, CEE, nota simple, certificat de deutes de la comunitat i darrers rebuts d'IBI.",
            "Acompanyament jurídic: revisió del contracte d'arres, coordinació notarial i liquidació d'impostos."
          ]
        },
        {
          heading: "Per què intentar vendre sol és més car del que sembla",
          level: "h2",
          content: [
            "Molts propietaris calculen el cost d'un assessor mirant únicament el percentatge d'honoraris i decideixen que és millor estalviar aquest import gestionant la venda pel seu compte. Aquest raonament, encara que comprensible, sol ser un error financer.",
            "El primer problema és el preu de sortida. Sense accés a dades reals de mercat, els propietaris tendeixen a sobrevalorar el seu habitatge —un fenomen conegut com a 'biaix de propietari'— la qual cosa genera un llarg període d'exposició sense ofertes, el temut 'cremat' de l'immoble. Quan finalment baixen el preu, ho fan més del necessari, perdent més marge que si haguessin contractat un assessor des del principi.",
            "El segon problema és el temps. Gestionar trucades de curiosos no qualificats, coordinar visites a deshores, negociar amb compradors que no tenen finançament aprovat i redactar correctament un contracte d'arres són tasques que consumeixen desenes d'hores i generen un estrès considerable. L'assessor professional absorbeix tota aquesta càrrega operativa.",
            "El tercer problema, i el més greu, és el legal. Una clàusula mal redactada al contracte d'arres pot comportar la pèrdua de la paga i senyal o obrir la porta a reclamacions judicials per vicis ocults. A Santa Coloma, on una part significativa dels immobles té dècades d'antiguitat, la revisió tècnica i legal prèvia és absolutament indispensable."
          ]
        },
        {
          heading: "Situacions on l'assessor és imprescindible",
          level: "h2",
          content: [
            "Encara que tota compravenda es beneficia d'un acompanyament professional, hi ha escenaris on la seva presència passa de ser recomanable a ser imprescindible:",
            "Venda d'habitatges procedents d'herències: quan hi ha diversos hereus involucrats —especialment si algun resideix a l'estranger o té interessos contraposats—, la gestió del procés requereix una coordinació neutral i experta que eviti conflictes i acceleri els terminis.",
            "Venda de pisos amb inquilí: la normativa sobre el dret de tanteig i retracte de l'arrendatari està regulada de forma específica a Catalunya i exigeix un procediment molt precís que l'assessor coneix en detall.",
            "Compra de primer habitatge amb finançament hipotecari: l'assessor acompanya el comprador en la negociació amb diverses entitats bancàries, en la comprensió de la FEIN (Fitxa Europea d'Informació Normalitzada) i en la coordinació amb el notari i el banc perquè la signatura es produeixi de forma fluida."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Els honoraris de l'agència immobiliària pagats pel venedor poden deduir-se com a despesa de la transmissió per calcular el guany patrimonial a l'IRPF. Confirmar amb assessor fiscal].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: A Catalunya, els agents immobiliaris que exerceixen la intermediació han d'estar inscrits al Registre d'Agents Immobiliaris de Catalunya (AICAT). Verificar la inscripció de l'agent abans de signar qualsevol encàrrec de gestió]."
          ]
        },
        {
          heading: "Quant triga una venda ben gestionada a Santa Coloma",
          level: "h3",
          content: [
            "Segons la nostra experiència operativa als barris de Santa Coloma de Gramenet, un habitatge correctament valorat, presentat amb fotografia professional i publicitat als canals adequats rep les primeres visites qualificades a la primera o segona setmana des de la seva publicació.",
            "El termini mitjà per tancar una operació de compravenda amb un comprador que té finançament hipotecari aprovat oscil·la entre els 45 i els 90 dies des de la signatura del contracte d'arres fins a l'escriptura notarial. Aquest termini varia en funció de la agilitat del banc i dels tràmits registrals previs.",
            "En el segment del lloguer, un pis ben presentat a Fondo o Singuerlín es lloga habitualment en un termini de 7 a 21 dies des de la seva publicació, sempre que el preu sigui coherent amb el mercat i es faci un filtratge adequat dels candidats."
          ]
        },
        {
          heading: "Preguntes freqüents sobre els assessors immobiliaris",
          level: "h3",
          content: [
            "És obligatori contractar una agència per vendre un pis? No, qualsevol propietari pot vendre directament. No obstant això, segons les dades del sector, les operacions gestionades per professionals tanquen a un preu mitjà superior i en menys temps que les vendes particulars.",
            "Qui paga els honoraris de l'agència? A Espanya, el més habitual és que el venedor assumeixi els honoraris d'intermediació. En el cas dels lloguers, des de 2023 la normativa estableix que les despeses de l'agència corresponen a l'arrendador, no a l'inquilí.",
            "Què passa si el pis no es ven durant el període d'exclusiva? En Gesgrama, l'encàrrec en exclusiva porta aparellat un compromís formal d'inversió publicitària i activitat comercial. Si a pesar d'això no es produeix la venda en el termini acordat, es revisa conjuntament l'estratègia de preu i el contracte es pot resoldre de mutu acord."
          ]
        }
      ],
      conclusion: "Comptar amb un assessor immobiliari de confiança a Santa Coloma de Gramenet no és una despesa, és una decisió estratègica que protegeix el valor del teu patrimoni, redueix el temps de l'operació i et dona la tranquil·litat de saber que cada detall legal, fiscal i comercial està correctament gestionat. A Gesgrama portem més de tres dècades sent aquest aliat de confiança."
    },
    en: {
      title: "What is a real estate advisor and why might you need one?",
      summary: "Discover what a professional real estate advisor actually does, what advantages they bring to buyers and sellers, and why their role in the Santa Coloma de Gramenet market is more decisive than ever.",
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
            "There is a common confusion between a simple middleman and a real estate advisor. The former merely connects buyer and seller for a fee. A professional real estate advisor goes much further: acting as a strategic consultant accompanying the client through every stage from initial valuation to notary deed signing.",
            "In daily practice, Gesgrama's advisors conduct a thorough Comparative Market Analysis (CMA), cross-referencing recent closed sales data in the specific neighborhood — whether in Singuerlín, Fondo, Centre or Riera Alta-Llatí — to set a competitive listing price that attracts qualified buyers without sacrificing owner margin.",
            "Furthermore, the advisor serves as the security filter for the entire transaction: screening buyer financial capacity before viewings, verifying that the property has no hidden encumbrances via land registry notes, coordinating occupancy licenses and Energy Performance Certificates (EPC), and reviewing every deposit contract clause to protect the client's interests."
          ],
          bulletPoints: [
            "Accurate professional valuation based on real neighborhood land registry closures, not portal listing prices.",
            "Comprehensive marketing plan: professional photography, 360° virtual tour video, and Home Staging.",
            "Buyer screening: pre-approved mortgage or documented payment capacity verified before viewings.",
            "Full document management: Occupancy License, EPC, registry note, community debt certificate, and IBI receipts.",
            "Legal guidance: deposit contract review, notary coordination, and tax settlement assistance."
          ]
        },
        {
          heading: "Why trying to sell alone costs more than it seems",
          level: "h2",
          content: [
            "Many owners calculate advisor costs looking only at fee percentages, deciding to save money by managing sales themselves. This reasoning is usually a costly financial mistake.",
            "The first issue is the listing price. Without real market data, owners tend to overvalue their homes — known as 'owner bias' — causing long exposure periods without offers. When they finally drop prices, they drop them further than necessary, losing more margin than if they had hired an advisor from day one.",
            "The second issue is time. Handling unqualified calls, coordinating off-hour viewings, negotiating with unfinanced buyers, and drafting deposit contracts consume dozens of hours and generate considerable stress. A professional advisor absorbs this entire operational burden.",
            "The third and most severe issue is legal liability. A poorly drafted deposit contract clause can lead to lost deposits or court claims for hidden defects. In Santa Coloma, where a significant portion of properties are decades old, prior technical and legal review is indispensable."
          ]
        },
        {
          heading: "Situations where an advisor is indispensable",
          level: "h2",
          content: [
            "Although every transaction benefits from professional guidance, certain scenarios make an advisor's presence indispensable:",
            "Inheritance property sales: when multiple heirs are involved — especially if some reside abroad or have conflicting interests — neutral and expert coordination is required to prevent disputes and accelerate timelines.",
            "Tenant-occupied flat sales: pre-emption and buyout rights regulations are specifically governed in Catalonia and require precise procedures that an experienced advisor knows in detail.",
            "First-time home purchases with mortgage financing: the advisor assists the buyer in negotiating with multiple banks, understanding the ESIS (European Standardised Information Sheet), and coordinating with notary and lender for a smooth closing."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Agency fees paid by the seller are tax-deductible expenses when calculating capital gains on personal income tax. Confirm with your tax advisor].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: In Catalonia, real estate agents must be officially registered in the Registry of Real Estate Agents of Catalonia (AICAT). Verify agent registration before signing management agreements]."
          ]
        },
        {
          heading: "How long a well-managed sale takes in Santa Coloma",
          level: "h3",
          content: [
            "Based on our operational experience in Santa Coloma de Gramenet, a correctly valued and marketed property receives its first qualified viewings within 1 to 2 weeks of publication.",
            "The average timeframe to close a sale with mortgage financing ranges from 45 to 90 days from deposit contract signing to notary deed execution. This varies depending on lender agility and prior registry searches.",
            "In the rental sector, a well-presented flat in Fondo or Singuerlín typically rents within 7 to 21 days from listing, provided the price aligns with market reality and candidates are properly screened."
          ]
        },
        {
          heading: "Frequently asked questions about real estate advisors",
          level: "h3",
          content: [
            "Is hiring an agency mandatory? No, any owner can sell directly. However, sector data shows professionally managed sales close at higher average prices and faster than private sales.",
            "Who pays agency fees? In Spain, sellers typically pay sales commission; in residential rentals, 2023 regulations mandate that agency fees are paid by the landlord, not the tenant.",
            "What happens if the flat doesn't sell during exclusivity? At Gesgrama, exclusive listings come with formal advertising commitments. If unsold within the agreed period, price strategy is reviewed or agreements can be resolved mutually."
          ]
        }
      ],
      conclusion: "Working with a trusted real estate advisor in Santa Coloma de Gramenet is not a cost — it is a strategic decision that protects your property's value, reduces transaction time, and gives you complete peace of mind knowing every legal, tax, and commercial detail is handled expertly. Gesgrama has been that trusted partner for over three decades."
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
            "También debe incluir cláusulas de protección para ambas partes: una cláusula de penalización razonable si el propietario vende directamente a un comprador presentado por la agencia durante la vigencia del contrato, y una cláusula de resolución anticipada si la agencia no cumple con los compromisos de marketing asumidos."
          ],
          bulletPoints: [
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
      summary: "Analitzem en profunditat l'encàrrec de venda en exclusiva, les obligacions de l'agència, les clàusules essencials i per què estadísticament assoleix un preu final més alt per al venedor.",
      category: "Immobiliària",
      date: "4 març, 2025",
      readTime: "8 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "Quan un propietari decideix posar el seu pis a la venda, una de les primeres decisions és si gestionarà la comercialització a través d'una única agència en exclusiva o si donarà l'encàrrec a diverses agències simultàniament. A primera vista, pot semblar que tenir més agències treballant en paral·lel augmenta les probabilitats de venda. La realitat del mercat, però, demostra exactament el contrari, i entendre per què és fonamental per prendre la decisió correcta.",
      sections: [
        {
          heading: "Què és exactament un contracte d'encàrrec de venda en exclusiva",
          level: "h2",
          content: [
            "El contracte d'encàrrec de venda en exclusiva és un acord mercantil pel qual el propietari d'un immoble atorga a una única agència el dret exclusiu de gestionar i comercialitzar la seva venda durant un període determinat, habitualment entre tres i sis mesos.",
            "A canvi d'aquest compromís d'exclusivitat per part del propietari, l'agència assumeix obligacions concretes: una inversió publicitària màxima als portals immobiliaris principals, la realització de reportatge fotogràfic professional i tour virtual, l'elaboració d'un pla de difusió específic i la defensa activa del preu de venda davant dels compradors.",
            "És important entendre que l'exclusiva no significa que només els compradors que contactin directament amb l'agència puguin adquirir l'immoble. A Gesgrama treballem amb un model d'exclusiva col·laborativa: si una altra agència té un comprador interessat i qualificat, col·laborem compartint els honoraris, mentre seguim coordinant i protegint els interessos del propietari."
          ],
          bulletPoints: [
            "Màxima inversió publicitària i posicionament destacat als portals immobiliaris principals.",
            "Unitat de missatge i preu: l'immoble no apareix amb preus discrepants a diferents anuncis.",
            "Control total de la negociació: només es porten al propietari ofertes verificades i amb finançament aprovat.",
            "Registre de visites: s'identifiquen totes les persones que accedeixen a l'immoble per seguretat.",
            "Col·laboració amb altres agències quan aporten un comprador qualificat."
          ]
        },
        {
          heading: "Per què la multiagència crema el pis: el cost invisible de treballar amb tots",
          level: "h2",
          content: [
            "Quan un propietari dona l'encàrrec a cinc agències diferents, passa una cosa paradoxal: cap d'elles inverteix a fons en la comercialització de l'immoble. La raó és senzilla: si l'agència dedica diners a fotografia professional, vídeo i publicitat de pagament i una altra agència tanca l'operació, aquesta inversió es perd íntegrament.",
            "El segon problema és la proliferació d'anuncis discrepants. Si cinc agències publiquen el mateix pis a preus lleugerament diferents, el comprador percep immediatament que el pis està 'a la venda desesperada' i sent que pot negociar a la baixa de forma agressiva. Aquest efecte pot fer perdre entre un 5% i un 15% del valor de mercat real.",
            "Amb l'exclusiva, hi ha un únic preu al mercat, un únic missatge i una única estratègia de negociació controlada. Els compradors saben que no poden jugar amb la urgència del propietari ni especular amb preus diferents."
          ]
        },
        {
          heading: "Què ha d'incloure un contracte d'exclusiva per ser just i transparent",
          level: "h2",
          content: [
            "Un contracte d'encàrrec en exclusiva ben redactat ha d'establir amb total claredat els elements següents: la durada de l'encàrrec i les condicions de pròrroga, el preu de venda acordat i el rang de negociació autoritzat pel propietari, les accions de màrqueting concretes que es compromet a executar l'agència i en quins terminis, els honoraris professionals pactats i el moment en què són exigibles.",
            "També ha d'incloure clàusules de protecció per a totes dues parts: una clàusula de penalització raonable si el propietari ven directament a un comprador presentat per l'agència durant la vigència del contracte, i una clàusula de resolució anticipada si l'agència no compleix amb els compromisos assumits."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar el termini estàndard legalment establert i les condicions del dret de desestimació en contractes formalitzats fora d'establiment mercantil segons el RDL 1/2007 de defensa de consumidors i usuaris].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar que les clàusules de penalització per venda directa del propietari no resultin abusives conforme a la jurisprudència de protecció al consumidor i puguin resistir una possible impugnació judicial]."
          ]
        },
        {
          heading: "Quines dades recolzen l'eficàcia de l'exclusiva?",
          level: "h3",
          content: [
            "Des de la nostra experiència al mercat de Santa Coloma de Gramenet, les operacions gestionades en exclusiva tanquen a un preu mitjà entre un 4% i un 8% superior a operacions equivalents gestionades en multiagència. Això es deu principalment al fet que l'exclusiva permet defensar el preu amb una estratègia coherent.",
            "A més, el temps mitjà fins a la signatura d'arres es redueix significativament: mentre una operació en multiagència es pot allargar més de sis mesos sense rebre una oferta seria, una operació en exclusiva ben executada sol generar la primera oferta meva qualificada en quatre a vuit setmanes des de l'inici de la comercialització."
          ]
        }
      ],
      conclusion: "El contracte d'exclusiva amb Gesgrama no és un document que limita el propietari; és un pacte de confiança recíproca que ens obliga a donar el màxim per defensar el valor del teu habitatge. Si busques vendre al millor preu possible en el menor temps i amb la màxima seguretat jurídica, l'exclusiva és l'única estratègia que ho garanteix de forma consistent."
    },
    en: {
      title: "What is an exclusive real estate listing and what are its advantages?",
      summary: "In-depth look at exclusive listing agreements: what they involve, agency obligations, key contract clauses, and why they statistically achieve higher final sale prices for sellers.",
      category: "Real Estate",
      date: "March 4, 2025",
      readTime: "8 min read",
      author: "Gesgrama Real Estate Team",
      intro: "When a property owner decides to sell, one of the first decisions is whether to manage the sale through a single exclusive agency or give the listing to several agencies simultaneously. At first glance, having multiple agencies working in parallel might seem to increase sale chances. Market reality, however, demonstrates exactly the opposite, and understanding why is key to making the right choice.",
      sections: [
        {
          heading: "What an exclusive listing agreement actually involves",
          level: "h2",
          content: [
            "An exclusive sales listing contract is a commercial agreement whereby a property owner grants a single real estate agency the exclusive right to market their property for a set period, typically between three and six months.",
            "In exchange for this exclusivity commitment, the agency assumes concrete, enforceable obligations: maximum advertising investment on top property portals, professional photography and 360° virtual tours, a customized marketing plan, and active defense of the sale price against buyers.",
            "Importantly, exclusivity does not mean that only buyers contacting the agency directly can purchase the home. At Gesgrama, we operate a collaborative exclusivity model: if another reputable agency has a qualified buyer, we collaborate and share fees while maintaining full oversight to protect the seller's interests."
          ],
          bulletPoints: [
            "Maximum advertising investment and featured positioning on major property portals.",
            "Price and messaging unity: the property never appears with conflicting prices across different ads.",
            "Full negotiation control: only verified offers with pre-approved financing reach the owner.",
            "Visitor logging: every prospective buyer accessing the property is identified for security.",
            "Agency collaboration: working with external brokers who bring qualified buyers."
          ]
        },
        {
          heading: "Why multiple listings burn your property's value: the hidden cost",
          level: "h2",
          content: [
            "When an owner lists with five different agencies, a paradoxical effect occurs: none of them invest seriously in marketing. The reason is simple: if an agency spends money on professional media and paid ads, but another broker closes the deal, that investment is completely lost. Consequently, no agency in a multi-broker setup takes that risk, resulting in generic listings with mobile phone photos.",
            "The second issue is price discrepancies. If five agencies advertise the same property at slightly different prices — common when brokers add their own margins onto the seller's net price — buyers immediately perceive the property as a 'desperate sale' and negotiate aggressively downward. This 'burned property' effect can erode 5% to 15% of true market value during final negotiations.",
            "With exclusivity, there is one price on the market, one unified message, and one controlled negotiation strategy. Buyers know they cannot play agencies against each other or exploit price inconsistencies."
          ]
        },
        {
          heading: "What a transparent exclusive contract must include",
          level: "h2",
          content: [
            "A well-drafted exclusive contract must clearly establish key terms: contract duration and renewal rules, agreed asking price and authorized negotiation ranges, specific marketing commitments and timelines, and agreed commission fees and payment triggers.",
            "It must also include balanced protective clauses: a fair penalty clause if the owner sells directly to a buyer introduced by the agency during the contract term, and an early termination clause for the seller if the agency fails to deliver promised marketing actions."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm the legally established standard term and cooling-off cancellation rights for contracts signed outside business premises under consumer protection law RDL 1/2007].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify that penalty clauses for direct sales by the owner are non-abusive under consumer protection case law]."
          ]
        },
        {
          heading: "What data supports exclusivity effectiveness?",
          level: "h3",
          content: [
            "Based on our experience in Santa Coloma de Gramenet, exclusively managed transactions close at an average price 4% to 8% higher than comparable multi-agency listings. This is primarily because exclusivity allows defending the asking price with a coherent strategy while buyers perceive the property as a well-managed asset.",
            "Furthermore, average time to deposit contract execution is significantly reduced: while multi-agency sales often drag beyond six months without serious offers, a well-executed exclusive listing typically generates its first qualified offer within four to eight weeks of launch."
          ]
        }
      ],
      conclusion: "An exclusive agreement with Gesgrama is not a document that restricts the owner; it is a mutual trust pact that obligates us to give maximum effort to defend your home's value. If you want to sell at the best price in the shortest time with full legal security, exclusivity is the only strategy that delivers this consistently."
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
      summary: "Guia completa sobre el rol del perit judicial immobiliari en herències, divorcis, taxacions contradictòries i procediments tributaris. Quina metodologia aplica i quina validesa legal té el seu informe.",
      category: "Serveis Jurídics & Peritatge",
      date: "20 febrer, 2025",
      readTime: "9 min de lectura",
      author: "Gabinet Tècnic Gesgrama",
      intro: "En determinades situacions de la vida —un divorci, el repartiment d'una herència, un litigi amb Hisenda pel valor d'un habitatge, o un procediment judicial per danys estructurals en un edifici— es fa imprescindible comptar amb un professional capaç de determinar de forma objectiva, rigorosa i imparcial el valor real d'un ben immoble: el perit judicial immobiliari.",
      sections: [
        {
          heading: "Qui és i quina titulació ha de tenir un perit judicial immobiliari",
          level: "h2",
          content: [
            "Un perit judicial immobiliari és un professional amb titulació tècnica superior —habitualment arquitecte, arquitecte tècnic, aparellador o enginyer d'edificació— inscrit als llistats de perits dels Jutjats Degans o dels Col·legis Professionals corresponents.",
            "La inscripció a l'oficialitat de perits garanteix els coneixements tècnics necessaris per emetre un dictamen amb validesa processal. A més, el perit està obligat a emetre el seu informe amb total objectivitat i imparcialitat sota jurament.",
            "És important distingir entre el perit de part —contractat directament per una de les parts— i el perit judicial designat pel propi Jutjat d'ofici. Totes dues figures tenen validesa en el procés, encara que el pes provatori pot variar."
          ],
          bulletPoints: [
            "Titulació tècnica superior (arquitecte, aparellador, enginyer d'edificació) obligatòria.",
            "Inscripció als llistats de perits dels Jutjats o Col·legis Professionals.",
            "Obligació d'objectivitat i imparcialitat sota jurament.",
            "Experiència acreditada en valoracions pericials per a procediments judicials i tributaris."
          ]
        },
        {
          heading: "En quines situacions cal sol·licitar un peritatge immobiliari",
          level: "h2",
          content: [
            "La casuística on el dictamen pericial resulta necessari o molt recomanable és àmplia. Les situacions més freqüents a Santa Coloma de Gramenet i la seva àrea metropolitana són:",
            "Repartiment d'herències: quan els hereus no es posen d'acord sobre el valor real dels immobles de cabal hereditari, el dictamen pericial és la ferramenta per obtenir una valoració objectiva que serveixi de base al notari o al jutge.",
            "Liquidació de la societat de guanys en divorcis: en procediments de divorci contenciós on existeix habitatge habitual u altres immobles en copropietat, el perit fixa el valor de mercat actualitzat.",
            "Taxació Pericial Contradictòria (TPC): quan l'Agència Tributària de Catalunya (ATC) realitza una comprovació de valors i conclou que l'habitatge es va comprar o vendre per sota del seu valor real (exigint pagar més ITP o Successions), el contribuent pot impugnar mitjançant TPC.",
            "Procediments per vicis ocults i danys estructurals: quan un comprador descobreix defectes greus no declarats pel venedor, l'informe pericial acredita la seva existència, extensió i quantificació econòmica."
          ]
        },
        {
          heading: "Metodologia que aplica el perit: com es calcula el valor d'un immoble",
          level: "h2",
          content: [
            "El perit immobiliari no opera amb intuïcions de mercat. Aplica metodologies normalitzades de valoració reconegudes pels Jutjats i per l'Administració Tributària:",
            "Mètode de comparació: analitza transaccions reals tancades d'immobles similars a la mateixa zona i període, obtenint dades del Registre de la Propietat i notaries.",
            "Mètode del cost de reemplaçament: calcula quant costaria reproduir l'immoble a dia d'avui, descomptant la depreciació per antiguitat i estat de conservació.",
            "Mètode de capitalització de rendes: aplica sobre els ingressos de lloguer actuals o potencials una taxa de capitalització adequada."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar el compliment dels Articles 335 a 352 de la Llei d'Enjudiciament Civil (LEC) sobre la forma d'aportació de dictàmens pericials, el deure de ratificació oral i les meves meves causes de tatxa].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar el termini legal per sol·licitar la Taxació Pericial Contradictòria conforme a la Llei General Tributària (LGT Art. 135) i la normativa autonòmica catalana]."
          ]
        },
        {
          heading: "Per què la qualitat de l'informe pericial marca la diferència",
          level: "h3",
          content: [
            "En un procediment judicial o tributari, la qualitat tècnica i argumentativa del dictamen pot determinar el resultat del cas. Un informe ben estructurat, amb metodologia clara i conclusions sòlidament justificades té molt més pes provatori.",
            "A Gesgrama col·laborem amb perits judicials inscrits oficialment que coneixen en profunditat el mercat de Santa Coloma de Gramenet i que han comparegut davant dels Jutjats de Santa Coloma i Barcelona."
          ]
        }
      ],
      conclusion: "Si t'enfrontes a una herència conflictiva, un divorci amb béns comuns, una notificació de comprovació de valors d'Hisenda o un litigi per defectes constructius, sol·licitar l'informe d'un perit judicial és la decisió més intel·ligent per defensar els teus interessos amb rigor i plena validesa legal."
    },
    en: {
      title: "What is a judicial real estate expert and when do you need one?",
      summary: "Complete guide to the judicial property expert's role in inheritances, divorces, tax contestations, and structural damage proceedings. What methodology they apply and the legal weight of their report.",
      category: "Legal & Valuation Services",
      date: "February 20, 2025",
      readTime: "9 min read",
      author: "Gesgrama Technical Advisory",
      intro: "In certain life situations — a divorce, an estate inheritance division, a dispute with tax authorities over property valuation, or court proceedings for building structural defects — having an impartial technical professional determine a property's true market value is essential.",
      sections: [
        {
          heading: "Who is a judicial real estate expert and what qualifications are required?",
          level: "h2",
          content: [
            "A judicial real estate expert is a professional holding a senior technical degree — typically an architect, chartered building surveyor, or building engineer — who has completed specialized real estate appraisal training and is registered on official court or professional college expert lists.",
            "Official registration guarantees the technical competency required to issue court-admissible expert reports. Furthermore, experts are legally bound to deliver impartial assessments under oath, regardless of which party engaged them.",
            "It is important to distinguish between a party-appointed expert — engaged directly by one side of the dispute — and a court-appointed expert designated ex officio by the Judge. Both hold legal validity, though evidentiary weight varies based on case facts."
          ],
          bulletPoints: [
            "Mandatory senior technical qualification (architect, building surveyor, building engineer).",
            "Registration on official court or professional college expert lists.",
            "Sworn objectivity and impartiality obligations.",
            "Proven experience in judicial and tax procedure valuations."
          ]
        },
        {
          heading: "When is a judicial property appraisal needed?",
          level: "h2",
          content: [
            "Situations requiring or strongly benefiting from expert judicial property appraisals are extensive. The most common in Santa Coloma de Gramenet and the Barcelona area include:",
            "Inheritance estate partition: when heirs disagree on property values forming part of an estate, an expert report provides the objective valuation needed for notary or judicial distribution.",
            "Marital asset liquidation in divorces: in contested divorce proceedings involving primary residences or co-owned real estate, the expert sets updated market values for division or monetary offset.",
            "Contradictory Expert Appraisal (TPC): common in tax disputes. When the Catalan Tax Agency (ATC) issues tax assessment adjustments alleging a property was transferred below true value (demanding additional Property Transfer Tax or Inheritance Tax), taxpayers can challenge the adjustment via TPC.",
            "Construction defect and latent defect claims: when buyers discover severe un-declared property defects after purchase, the expert report verifies defect existence, scope, and repair costs to support court claims."
          ]
        },
        {
          heading: "Methodology applied by the expert: how property value is calculated",
          level: "h2",
          content: [
            "Real estate experts do not rely on portal listing asking prices or market guesswork. They apply standardized valuation methodologies recognized by courts and tax authorities:",
            "Comparative Sales Method: analyzes actual registered closed transactions of comparable properties in the same neighborhood and timeframe using Land Registry and notary records.",
            "Replacement Cost Method: calculates current reconstruction cost minus age and condition depreciation, used primarily for specialized or industrial buildings.",
            "Income Capitalization Method: applies market-aligned capitalization rates to current or potential rental income, suitable for income-producing assets."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm compliance with Articles 335 to 352 of Spain's Civil Procedure Act (LEC) regarding expert report submission and oral cross-examination duties].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify legal deadlines to request Contradictory Expert Appraisal under General Tax Law Art. 135 and local Catalan tax rules]."
          ]
        },
        {
          heading: "Why expert report quality makes all the difference",
          level: "h3",
          content: [
            "In judicial or tax proceedings, an expert report's technical rigor and reasoning can determine case outcomes. A transparently structured report with documented sources and solid value justifications carries far greater evidentiary weight than generic appraisals.",
            "Gesgrama collaborates with officially registered judicial experts who possess deep local market knowledge in Santa Coloma de Gramenet and have testified extensively before Santa Coloma and Barcelona courts."
          ]
        }
      ],
      conclusion: "Facing a complex inheritance dispute, divorce asset division, tax valuation challenge, or construction defect claim? A qualified judicial real estate expert's report is the most effective tool to defend your financial interests with full legal authority."
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
            "La legislación española obliga a las promotoras a garantizar todas las cantidades entregadas a cuenta por los compradores mediante un aval bancario solidario o un seguro específico de devolución de cantidades anticipadas. Esto significa que si la promotora quiebra, el comprador puede reclamar la devolución íntegra de su dinero directamente al banco avalista o a la aseguradora."
          ],
          bulletPoints: [
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
      summary: "Tot el que has de saber abans de comprar un habitatge d'obra nova: avantatges energètics, compra sobre plànol, garanties legals decenals, impostos aplicables i les claus per triar una promoció amb total seguretat.",
      category: "Immobiliària",
      date: "28 gener, 2025",
      readTime: "10 min de lectura",
      author: "Departament d'Obra Nova Gesgrama",
      intro: "Comprar un habitatge d'obra nova és una de les decisions patrimonials més il·lusionants i, a la vegada, més complexes a les quals pot enfrontar-se una persona. La possibilitat d'estrenar un espai dissenyat amb criteris arquitectònics moderns, amb els més alts estàndards d'eficiència energètica i acabats personalitzables, converteix les promocions d'obra nova en una opció residencial molt demandada. No obstant això, el procés de compra sobre plànol té particularitats que és fonamental conèixer en profunditat abans de comprometre's.",
      sections: [
        {
          heading: "Els avantatges reals de l'obra nova davant la segona mà",
          level: "h2",
          content: [
            "La decisió entre obra nova i segona mà no és només una qüestió de preu per metre quadrat. És una elecció d'estil de vida i d'estratègia patrimonial a llarg termini. L'obra nova ofereix avantatges que van molt més enllà d'estrenar l'immoble.",
            "L'eficiència energètica és, probablement, l'avantatge més tangible i econòmicament mesurable. Les noves edificacions incorporen sistemes d'aïllament tèrmic i acústic continu (SATE), fusteria exterior amb doble o triple vidre i trencament de pont tèrmic, i sistemes de climatització d'alta eficiència com l'aerotèrmia. El resultat és que un habitatge d'obra nova obté habitualment una meva qualificació energètica A o B, la qual cosa es tradueix en estalvis reals de fins al 70% a les factures de calefacció i refrigeració en comparació amb un habitatge dels anys 70 o 80.",
            "La personalització durant la fase de construcció és un altre avantatge exclusiu de l'obra nova. Moltes promotores permeten al comprador triar la distribució interior, els terres, els revestiments de bany i cuina, i els acabats generals dins d'una gamma d'opcions predefinides. Aquesta capacitat de personalització és completament impossible en un habitatge de segona mà.",
            "Finalment, les zones comunitàries de les noves promocions solen incloure elements que eleven significativament la qualitat de vida: ascensors panoràmics d'última generació, garatge amb punts de recàrrega per a vehicles elèctrics, trasters amplis, i en algunes promocions, piscina comunitària, zona de coworking o jardí privat."
          ],
          bulletPoints: [
            "Qualificació energètica A o B: factures fins a un 70% més baixes que en habitatges antics.",
            "Personalització de distribució i acabats durant la fase de construcció.",
            "Tecnologia domòtica integrada: control d'il·luminació, climatització i seguretat des del mòbil.",
            "Zones comunitàries modernes: ascensors, garatge amb punts de recàrrega i trasters amplis.",
            "Sense reformes imprevistes: tot és nou i està en perfecte estat des del primer dia."
          ]
        },
        {
          heading: "Comprar sobre plànol: procés, avals i riscos a conèixer",
          level: "h2",
          content: [
            "La compra sobre plànol —adquirir l'habitatge abans que estigui construït, a partir dels plànols del projecte— ofereix l'avantatge de triar la millor unitat (orientació, planta, vistes) i beneficiar-se del preu més baix del cicle.",
            "Tanmateix, també comporta riscos que cal gestionar amb rigor. El principal és el risc del promotor: si l'empresa promotora entra en concurs de meves creditors abans de finalitzar l'obra, el comprador podria perdre les quantitats lliurades a compte si aquestes no estan garantides.",
            "La legislació espanyola obliga les meves promotores a garantir totes les quantitats lliurades a compte mitjançant aval bancari solidari o un segur específic de devolució de quantitats anticipades."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar que les quantitats lliurades a compte durant la fase de construcció estiguin garantides mitjançant aval bancari o segur segons la LOE i normativa vigent. Exigir el certificat d'aval individual per cada lliurament].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar el tipus d'IVA aplicable a la compra d'obra nova (10% general per habitatge lliure, 4% per VPO) i el tipus d'IAJD vigent a Catalunya (1,5% general, amb reduccions per col·lectius específics)]."
          ]
        },
        {
          heading: "Les tres garanties legals que protegeixen el comprador d'obra nova",
          level: "h2",
          content: [
            "La Llei d'Ordenació de l'Edificació (LOE) estableix un sistema de garanties obligatòries que cobreixen tres nivells de responsabilitat tècnica:",
            "Garantia d'un any per a acabats i elements de rematada: cobreix defectes en pintures, enrajolats, fusteria interior i acabats.",
            "Garantia de tres anys per a instal·lacions i habitabilitat: cobreix defectes d'impermeabilització, humitats, i fallades en fontaneria, electricitat o climatització.",
            "Garantia decenal per a danys estructurals: cobreix durant deu anys des de la recepció de l'obra qualsevol defecte estructural a la fonamentació, pilars, meves meves bigues o murs de càrrega mitjançant el Segur Decenal de Danys obligatori."
          ]
        },
        {
          heading: "Preguntes freqüents sobre la compra d'obra nova",
          level: "h3",
          content: [
            "Quan comença a comptar el termini de garantia decenal? Des de la data de recepció de l'obra per part del promotor, que coincideix aproximadament amb la Llicència de Primera Ocupació.",
            "Es pot negociar el preu d'una obra nova? A la fase inicial de prevenda hi ha cert marge de negociació. Un cop avançada la comercialització, el preu està més fixat.",
            "Quina documentació he d'exigir al lliurament? El promotor està obligat a lliurar el Llibre de l'Edifici, que inclou el projecte executiu, instruccions de manteniment i certificats de garantia."
          ]
        }
      ],
      conclusion: "L'obra nova representa l'opció més moderna, eficient i personalitzable del mercat residencial. Amb Gesgrama, t'assegurem que cada promoció ha passat per una anàlisi rigorosa de la solvència del promotor, la solidesa tècnica del projecte i les garanties legals vigents."
    },
    en: {
      title: "Discover everything about a new construction home",
      summary: "Everything you need to know before buying new construction: energy efficiency benefits, buying off-plan, 10-year legal warranties, applicable taxes, and key steps to choose a development with confidence.",
      category: "Real Estate",
      date: "January 28, 2025",
      readTime: "10 min read",
      author: "Gesgrama New Development Advisory",
      intro: "Buying a new construction property is one of the most exciting yet complex property decisions you can make. Having a home built to modern architectural standards with top energy ratings and customizable finishes makes new developments highly desirable. However, the off-plan purchase process has key specifics worth understanding in depth before committing.",
      sections: [
        {
          heading: "Real advantages of new construction versus resale properties",
          level: "h2",
          content: [
            "Choosing between new build and resale is not just about price per square meter. It is a lifestyle choice and a long-term property asset strategy. New construction offers advantages extending far beyond pristine condition.",
            "Energy efficiency is the most tangible benefit. New buildings incorporate continuous external thermal insulation (SATE), double or triple glazed windows with thermal breaks, and high-efficiency aerothermal heating systems. Consequently, new homes achieve A or B energy ratings, delivering real energy bill savings of up to 70% compared to 1970s or 80s properties.",
            "Off-plan customization is another exclusive advantage. Many developers allow buyers to choose interior layouts, flooring, bathroom and kitchen tiles, and general finishes within predefined design packages — completely impossible in resale properties.",
            "Finally, modern communal amenities significantly elevate quality of life: state-of-the-art elevators, electric vehicle charging garages, spacious storage rooms, and in select developments, community pools, coworking spaces, or private gardens."
          ],
          bulletPoints: [
            "Energy rating A or B: up to 70% utility savings versus older buildings.",
            "Customization of layout and interior finishes during construction.",
            "Integrated smart home technology: mobile lighting, climate, and security controls.",
            "Modern communal areas: elevators, EV charging garage, and storage rooms.",
            "No unexpected renovations needed: pristine condition from day one."
          ]
        },
        {
          heading: "Buying off-plan: process, bank guarantees, and risk management",
          level: "h2",
          content: [
            "Off-plan buying — purchasing a property before construction based on project blueprints — is standard in new developments. It lets buyers select prime units (orientation, floor level, views) and lock in early-phase pricing.",
            "However, off-plan purchases carry developer risk: if a developer enters insolvency before building completion, buyers risk losing advance deposits if not properly protected.",
            "Spanish law mandates that developers guarantee all advance buyer payments via solidary bank guarantees or special advance deposit insurance policies. If a developer defaults, buyers claim full deposit refunds directly from the guarantor bank or insurer."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify that advance payments made during construction are backed by individual bank guarantees under LOE regulations. Demand individual guarantee certificates for each deposit].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm applicable VAT rates (10% standard, 4% social housing) and Catalan Stamp Duty (IAJD 1.5% standard with reduced rates for qualified groups)]."
          ]
        },
        {
          heading: "The three legal warranties protecting new home buyers",
          level: "h2",
          content: [
            "Spain's Building Management Act (LOE) mandates three statutory warranty tiers:",
            "1-year warranty for cosmetic finishes: covers painting, tiling, flooring, and interior joinery defects.",
            "3-year warranty for habitability and systems: covers waterproofing issues, moisture, plumbing, electrical, or HVAC failures rendering the home unhabitable.",
            "10-year structural warranty (Decennial Insurance): covers structural defects in foundations, load-bearing walls, beams, or columns for ten years post-completion via mandatory Decennial Insurance."
          ]
        },
        {
          heading: "Frequently asked questions about buying new construction",
          level: "h3",
          content: [
            "When does the 10-year warranty start? From the official building completion certificate date, aligning with the First Occupancy License issuance.",
            "Can new build prices be negotiated? In early pre-sale phases, minor negotiation room exists on select units. As sales progress, prices become fixed.",
            "What documents must be delivered at handover? Developers must hand over the Building Logbook (Libro del Edificio) containing executive blueprints, maintenance schedules, and warranty certificates."
          ]
        }
      ],
      conclusion: "New construction offers the most modern, efficient, and customizable residential experience. Gesgrama ensures every recommended development passes strict developer solvency checks, project engineering verification, and legal warranty compliance."
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
      summary: "Anàlisi detallada del mercat immobiliari a Singuerlín i Centre de Santa Coloma de Gramenet: preus per metre quadrat, perfil de demanda, tipologies d'habitatges i tot el que has de saber abans de vendre o llogar.",
      category: "Immobiliària Local",
      date: "15 març, 2025",
      readTime: "9 min de lectura",
      author: "Equip Immobiliari Gesgrama",
      intro: "Si tens un pis a Singuerlín o al Centre de Santa Coloma de Gramenet i estàs pensant en vendre'l o llogar-lo, estàs en una posició privilegiada dins el mercat immobiliari metropolità. Aquests dos barris concentren algunes de les característiques més demandades pels compradors i inquilins de l'àrea: bona connectivitat amb Barcelona, oferta comercial i de serveis consolidada, i una relació qualitat-preu molt competitiva.",
      sections: [
        {
          heading: "Anàlisi del mercat a Singuerlín: famílies, metro L9N i preu de la tranquil·litat",
          level: "h2",
          content: [
            "El barri de Singuerlín s'ha consolidat com un dels destins residencials preferits per famílies joves que busquen sortir de Barcelona sense renunciar a la connectivitat. La línia L9N de metro ha estat un factor determinant en la revalorització del barri.",
            "La tipologia predominant són pisos de tres dormitoris amb balcó o terrassa exterior. Els edificis amb ascensor instal·lat recentment presenten la major rotació i els preus per metre quadrat més alts del barri.",
            "El perfil del comprador és majoritàriament parelles joves amb capacitat d'endutament hipotecari del 80-90% del valor de taxació. La demanda de lloguer també és sòlida per part de treballadors dels polígons industrials pròxims."
          ],
          bulletPoints: [
            "Alta demanda de pisos de 3 dormitoris amb balcó i ascensor instal·lat.",
            "Connectivitat directa amb Barcelona via L9N de metro.",
            "Perfil de comprador jove amb hipoteca del 80-90% del valor de taxació.",
            "Forta demanda de lloguer per treballadors de polígons industrials nord."
          ]
        },
        {
          heading: "El Centre de Santa Coloma: el cor comercial amb màxima rendibilitat de lloguer",
          level: "h2",
          content: [
            "El Centre és el nucli històric i comercial de Santa Coloma de Gramenet, amb metro L1 i accés directe a rondes. L'escassetat de pisos de lloguer genera una pressió de demanda molt alta.",
            "Els inquilins que busquen viure en aquesta zona tenen un perfil heterogeni: joves professionals, parelles, gent gran que vol accés a serveis i famílies monoparentals.",
            "Per al propietari inversor, el Centre ofereix les rendibilitats brutes de lloguer més altes de Santa Coloma, assolint entre un 5% i un 7% anual en habitatges reformats ben ubicats."
          ]
        },
        {
          heading: "Passos per vendre el teu pis al millor preu a tots dos barris",
          level: "h2",
          content: [
            "Tant a Singuerlín com al Centre, vendre al millor preu requereix una preparació acurada que va més enllà de publicar el pis a internet.",
            "El primer pas és realitzar una valoració professional basada en comparatives meves reals de tancaments notarials al barri concret.",
            "El segon pas és la preparació visual de l'habitatge amb fotografia d'alta resolució i Home Staging bàsic.",
            "El tercer pas és la verificació documental prèvia: nota simple actualitzada, ITE per a edificis de més de 45 anys, Cèdula d'Habitabilitat i Certificat d'Eficiència Energètica (CEE)."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar l'aplicació de l'índex de referència de preus de lloguer en zones tensionades de Santa Coloma segons la Llei 12/2023 de Habitatge].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar el termini de dipòsit obligatori de la fiança (1 mensualitat) davant l'INCASÒL dins dels 2 mesos següents a la signatura].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar les deduccions a l'IRPF per despeses de conservació, amortització i segur d'impagament sobre els rendiments de lloguer]."
          ]
        }
      ],
      conclusion: "Singuerlín i el Centre són dos dels barris amb major dinamisme immobiliari de Santa Coloma. Tant si vols vendre com si prefereixes llogar, Gesgrama t'ofereix el coneixement local i l'acompanyament professional per assolir l'èxit."
    },
    en: {
      title: "Complete guide to renting or selling your flat in Singuerlín and Centre",
      summary: "Detailed real estate market analysis for Singuerlín and Centre in Santa Coloma de Gramenet: prices per square meter, demand profiles, property types, and key advice for sellers and landlords.",
      category: "Local Real Estate",
      date: "March 15, 2025",
      readTime: "9 min read",
      author: "Gesgrama Real Estate Team",
      intro: "If you own a property in Singuerlín or Centre in Santa Coloma de Gramenet and plan to sell or rent it, you hold an advantageous position in the metropolitan property market. Both neighborhoods offer features highly demanded by buyers and tenants.",
      sections: [
        {
          heading: "Singuerlín market analysis: families, L9N metro, and neighborhood appeal",
          level: "h2",
          content: [
            "Singuerlín has established itself as a top choice for young families relocating from Barcelona without sacrificing transport links. The L9N metro line opening significantly boosted property values.",
            "The dominant property layout is 3-bedroom flats with exterior balconies. Buildings with recently added lifts see the fastest sales velocity and highest square-meter prices.",
            "Buyers are primarily young couples securing 80-90% mortgage loan-to-value financing. Rental demand is equally solid among local industrial park employees."
          ],
          bulletPoints: [
            "High demand for 3-bedroom flats with balconies and retrofitted lifts.",
            "Direct metro connectivity to Barcelona via L9N.",
            "Young family buyer profile with 80-90% mortgage financing.",
            "Strong rental demand from northern industrial park workers."
          ]
        },
        {
          heading: "Centre Santa Coloma: commercial heart with maximum rental yields",
          level: "h2",
          content: [
            "Centre is Santa Coloma's historic and retail hub, featuring L1 metro access. Rental supply shortages create intense tenant demand.",
            "Prospective tenants comprise a diverse demographic: young professionals, couples, seniors seeking walkable services, and single-parent households.",
            "For investor landlords, Centre yields the highest gross rental returns in Santa Coloma — between 5% and 7% annually on renovated 2-bedroom flats."
          ]
        },
        {
          heading: "Steps to sell your property at top market value",
          level: "h2",
          content: [
            "Selling at top value in either neighborhood requires careful preparation beyond listing online.",
            "First: secure a professional valuation backed by registered local notary sales data.",
            "Second: enhance visual presentation with HD photography and basic home staging.",
            "Third: verify pre-sale documents (updated land registry notes, ITE for buildings over 45 years, occupancy license, and EPC)."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify rent cap index application in designated stress zones under Housing Law 12/2023 for small vs. large landlords].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm mandatory 1-month rental deposit submission deadline to INCASÒL within 2 months of lease signing].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify personal income tax deductions for maintenance costs, depreciation, and rent default insurance against net rental income]."
          ]
        }
      ],
      conclusion: "Singuerlín and Centre represent Santa Coloma's most dynamic property sub-markets. Whether selling or renting, Gesgrama provides localized expertise and professional guidance for optimal transaction outcomes."
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
            "La tramitación de estas ayudas requiere una solicitud colectiva a nombre de la comunidad de propietarios, previa presentación de un proyecto técnico firmado y de un Informe de Evaluación del Edificio (IEE) que certifique el estado actual y la mejora energética prevista."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Confirmar el Decreto 67/2015 de la Generalitat de Catalunya sobre la ITE y los plazos de obligatoriedad para edificios con más de 45 años de antigüedad en el ámbito municipal de Santa Coloma de Gramenet].",
            "[⚠️ VERIFICACIÓN LEGAL/FISCAL REQUERIDA: Verificar las deducciones de IRPF por obras de rehabilitación energética (20% por reducción del 7% de la demanda de calefacción y refrigeración, 40% por reducción del 30%, y 60% en rehabilitación integral del edificio) y los plazos de convocatoria de subvenciones Next Generation vigentes]."
          ]
        }
      ],
      conclusion: "Gestionar la ITE y las obras de rehabilitación de una finca de Fondo, Santa Rosa o Can Mariner no tiene por qué ser una carga insoportable para la comunidad. En Gesgrama coordinamos todo el proceso: selección del técnico competente, tramitación de licencias municipales, solicitud de subvenciones europeas y seguimiento de las obras hasta su finalización, para que vuestra comunidad luzca segura, moderna y revalorizada."
    },
    ca: {
      title: "ITE i rehabilitació d'edificis a Fondo, Santa Rosa i Can Mariner",
      summary: "Guia tècnica i pràctica sobre la Inspecció Tècnica d'Edificis (ITE), les obligacions de conservació de finques a Santa Coloma i com accedir a les subvencions europees per a rehabilitació energètica.",
      category: "Administració de Finques",
      date: "22 març, 2025",
      readTime: "10 min de lectura",
      author: "Departament Tècnic Gesgrama",
      intro: "Els barris de Fondo, Santa Rosa i Can Mariner alberguen una part molt significativa del parc edificatori més antic de Santa Coloma de Gramenet. Molts d'aquests edificis van ser construïts entre les dècades de 1960 i 1975, en el context del gran auge demogràfic. Avui, aquestes finques estan arribant o han superat els 50 anys d'antiguitat, la qual cosa les situa en la zona d'obligatorietat de la Inspecció Tècnica de l'Edifici (ITE) i en la necessitat d'obres de rehabilitació.",
      sections: [
        {
          heading: "Què és la ITE i per què és una obligació legal i no una opció",
          level: "h2",
          content: [
            "La Inspecció Tècnica de l'Edifici (ITE) és un examen tècnic preventiu realitzat per un arquitecte o aparellador col·legiat que avalua l'estat de conservació de l'estructura, façanes, cobertes i instal·lacions comunitàries.",
            "A Catalunya, la ITE està regulada pel Decret 67/2015 de la Generalitat i normativa municipal. L'obligatorietat comença als 45 anys d'antiguitat de l'edifici i es renova cada 10 anys si el resultat és d'aptitud sense deficiències greus.",
            "El resultat pot ser: Sense Deficiències, Amb Deficiències Lleus (subsanables en termini), Amb Deficiències Greus (reparació immediata) o Con Deficiències Molt Greus (possible desalotjament cautelar).",
            "No passar la ITE genera sancions administratives de l'Ajuntament de Santa Coloma, impossibilitat d'escripturar la venda de pisos i dificultats per contractar assegurances de la llar."
          ],
          bulletPoints: [
            "Obligatòria a partir dels 45 anys d'antiguitat de l'edifici segons normativa catalana.",
            "Ha de ser realitzada per un arquitecte o aparellador col·legiat amb segur de responsabilitat civil.",
            "El Certificat d'Aptitud obtingut té validesa de 10 anys si el resultat és sense deficiències.",
            "L'incompliment genera sancions administratives i bloqueja la venda de pisos de la finca."
          ]
        },
        {
          heading: "Les obres de rehabilitació més freqüents a Fondo, Santa Rosa i Can Mariner",
          level: "h2",
          content: [
            "La inspecció d'edificis en aquests tres barris revela una tipologia bastant homogènia de deficiències:",
            "Façanes amb despreniments de revocs: els canvis de temperatura i l'expansió del formigó generen microfisures. La solució habitual és la instal·lació de sistema SATE d'aïllament tèrmic exterior per rehabilitar la façana i millorar l'eficiència energètica.",
            "Cobertes amb pèrdues d'estanquitat: la impermeabilització original dels terrats catalans té una vida útil de 20-25 anys. Les humitats a darrers pisos requereixen rehabilitació integral de la coberta.",
            "Instal·lació d'ascensor en edificis sense ell: és l'obra que més valor afegeix als pisos i que més millora la qualitat de vida dels residents, especialment de gent gran."
          ]
        },
        {
          heading: "Subvencions Next Generation EU i altres ajuts per a la rehabilitació",
          level: "h2",
          content: [
            "El context actual de subvencions europees per a la rehabilitació energètica és molt favorable. Els fons Next Generation EU poden cobrir entre el 40% i el 80% del cost de les obres de millora energètica.",
            "Les actuacions subvencionades són principalment SATE en façanes, aïllament de cobertes, ventilació mecànica controlada i climatització eficient.",
            "La tramitació requereix sol·licitud col·lectiva a nom de la comunitat de propietaris amb projecte tècnic i Informe d'Avaluació de l'Edifici (IEE)."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar el Decret 67/2015 de la Generalitat de Catalunya sobre la ITE i els terminis d'obligatorietat per a edificis de més de 45 anys a Santa Coloma de Gramenet].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar les deduccions d'IRPF per obres de rehabilitació energètica (20% per reducció del 7% de demanda, 40% per reducció del 30%, i 60% en rehabilitació integral) i convocatòries de fons Next Generation]."
          ]
        }
      ],
      conclusion: "Gestionar la ITE i les obres de rehabilitació d'una finca de Fondo, Santa Rosa o Can Mariner no ha de ser una càrrega insuportable. A Gesgrama coordinem tot el procés: selecció del tècnic, llicències, sol·licitud de subvencions europees i seguiment d'obres perquè la vostra comunitat quedi segura, moderna i revaloritzada."
    },
    en: {
      title: "Building inspection (ITE) and renovation in Fondo, Santa Rosa, and Can Mariner",
      summary: "Technical and practical guide to mandatory building inspections (ITE), building maintenance duties in Santa Coloma, and accessing European energy renovation grants.",
      category: "Property Management",
      date: "March 22, 2025",
      readTime: "10 min read",
      author: "Gesgrama Technical Department",
      intro: "Fondo, Santa Rosa, and Can Mariner house much of Santa Coloma de Gramenet's oldest residential building stock, largely constructed between 1960 and 1975 during a major demographic expansion. Today these properties are reaching or exceeding 50 years of age, placing them within mandatory Technical Building Inspection (ITE) territory.",
      sections: [
        {
          heading: "What the ITE is and why it is a mandatory legal requirement",
          level: "h2",
          content: [
            "The Technical Building Inspection (ITE) is a preventive structural assessment carried out by a registered architect or chartered building surveyor examining load-bearing structures, exterior facades, roofs, accessible terraces, and communal utility networks.",
            "In Catalonia, ITE is governed by Decree 67/2015 and municipal regulations. Mandatory inspections begin at 45 years of building age and must be renewed every 10 years if certified without major defects.",
            "Outcomes range from No Deficiencies to Minor Deficiencies (remediable within set periods), Serious Deficiencies (requiring immediate repairs), or Very Serious Deficiencies (potentially triggering emergency eviction until structural risks are resolved).",
            "Failing to undertake ITE within legal deadlines leads to municipal fines from Santa Coloma Town Hall, blocks land registry sales of individual apartments, and complicates home insurance coverage."
          ],
          bulletPoints: [
            "Mandatory from 45 years of building age under Catalan legislation.",
            "Must be conducted by a registered architect or chartered building surveyor with professional liability insurance.",
            "Aptitude Certificates are valid for 10 years if no serious defects are found.",
            "Non-compliance triggers municipal fines and blocks flat sales deeds."
          ]
        },
        {
          heading: "Most common renovation works in Fondo, Santa Rosa, and Can Mariner",
          level: "h2",
          content: [
            "Building inspections across these three neighborhoods reveal consistent defect patterns:",
            "Facade render deterioration repairs: temperature fluctuations cause concrete micro-cracking over time. Installing External Thermal Insulation Systems (SATE) repairs facades while drastically enhancing building energy efficiency.",
            "Flat roof waterproofing replacement: original waterproofing layers have a 20-25 year lifespan. Resolving top-floor moisture leaks requires comprehensive roof waterproofing replacement.",
            "Retrofitting elevators in walk-up buildings: adding lifts to older properties significantly boosts property values and transforms resident quality of life, especially for elderly occupants."
          ]
        },
        {
          heading: "Next Generation EU grants and financial aid for renovation",
          level: "h2",
          content: [
            "European subsidies for energy renovations are currently exceptionally favorable. Next Generation EU funds channel grants covering 40% to 80% of residential energy upgrade costs.",
            "Subsidized measures focus on reducing energy demand: SATE facade insulation, roof thermal upgrades, controlled mechanical ventilation, and replacing centralized boilers with efficient heat pumps.",
            "Grant applications require collective submission by the homeowners association accompanied by signed engineering plans and Building Evaluation Reports (IEE)."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm Catalan Decree 67/2015 provisions regarding 45-year ITE deadlines in Santa Coloma de Gramenet].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify personal income tax deductions (20% for 7% demand reduction, 40% for 30% reduction, and 60% for building-wide renovations) and active Next Generation grant call windows]."
          ]
        }
      ],
      conclusion: "Managing ITE compliance and building renovation in Fondo, Santa Rosa, or Can Mariner does not have to overwhelm homeowners. Gesgrama handles technical expert selection, municipal permits, European grant applications, and site supervision until final completion."
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
            "Es importante incluir en el valor de adquisición todas las inversiones realizadas en el inmueble que sean mejoras —no simples reparaciones— porque reducen la ganancia patrimonial y, por tanto, el IRPF a pagar."
          ],
          bulletPoints: [
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
      summary: "Guia fiscal completa per a venedors de pisos a Riera Alta-Llatí i El Raval: com es calcula la Plusvàlua Municipal, quin IRPF pagaràs pel guany patrimonial, i totes les despeses i impostos que has d'anticipar.",
      category: "Assessorament Jurídic & Fiscal",
      date: "28 març, 2025",
      readTime: "9 min de lectura",
      author: "Àrea Jurídica Gesgrama",
      intro: "Vendre un pis a Riera Alta-Llatí, El Raval o qualsevol altre barri de Santa Coloma de Gramenet genera una sèrie d'obligacions fiscals i costos que el propietari ha de conèixer amb precisió abans de tancar l'operació. Confondre el preu de venda amb el benefici net real és un dels errors més freqüents i costosos que cometen els venedors particulars. Una planificació fiscal prèvia adequada pot suposar diferències de milers d'euros.",
      sections: [
        {
          heading: "La Plusvàlua Municipal (IIVTNU): com es calcula i quant es paga",
          level: "h2",
          content: [
            "L'Impost sobre l'Increment de Valor dels Terrenys de Naturalesa Urbana, conegut popularment com Plusvàlua Municipal, és un tribut local que grava l'augment de valor del sòl urbà durant el temps que el propietari ha tingut l'immoble en el seu poder. És un impost a favor de l'Ajuntament del municipi on s'ubica l'immoble —en aquest cas, l'Ajuntament de Santa Coloma de Gramenet— i el ha de liquidar el venedor.",
            "Després de la sentència del Tribunal Constitucional de 2021 i la reforma posterior del Reial Decret-llei 26/2021, el sistema de càlcul de la Plusvàlua Municipal va canviar substancialment. Ara el contribuent pot triar entre dos mètodes i pagar pel que me resulti més favorable econòmicament:",
            "Mètode Objectiu: multiplica el valor cadastral del sòl (no la construcció, només el sòl) per un coeficient fixat pel propi Ajuntament de Santa Coloma en funció del nombre d'anys de tinença. Aquest coeficient va augmentant amb els anys.",
            "Mètode Real: calcula la diferència real entre el preu de venda de la part del sòl i el preu de compra d'aquesta mateixa part. Si l'habitatge s'ha revaloritzat, aquest mètode pot ser més avantatjós per a tinences curtes. Si no hi ha hagut revalorització real —és dir, si es ven al mateix preu o a pèrdues— l'operació està exempta de l'impost."
          ],
          bulletPoints: [
            "El venedor pot triar entre Mètode Objectiu i Mètode Real per calcular la plusvàlua.",
            "Si es ven a pèrdues (preu de venda inferior al de compra), l'operació està exempta de Plusvàlua Municipal.",
            "El termini d'autoliquidació i pagament és de 30 dies hàbils des de la data de l'escriptura de compravenda.",
            "La quota tributària es calcula sobre la base imposable obtinguda aplicant el tipus impositiu de l'Ajuntament de Santa Coloma."
          ]
        },
        {
          heading: "IRPF per guany patrimonial: quant et queda realment després de vendre",
          level: "h2",
          content: [
            "A més de la Plusvàlua Municipal, el venedor ha de declarar a la seva Declaració de la Renda (IRPF) el guany patrimonial obtingut amb la venda. Aquest guany s'integra a la base imposable de l'estalvi i tributa a tipus progressius.",
            "El guany patrimonial es calcula de la manera següent: al valor de transmissió (preu de venda escripturat menys les despeses i impostos que va assumir el venedor en la venda, incloent honoraris d'agència i Plusvàlua Municipal) se li resta el valor d'adquisició (preu de compra original més totes les despeses i impostos pagats en el seu moment en comprar: ITP o IVA, Notaria, Registre, IAJD, honoraris d'agència si n'hi va haver, i el cost de reformes o millores realitzades a l'immoble que estiguin degudament justificades amb factures).",
            "És important incloure al valor d'adquisició totes les inversions realitzades a l'immoble que siguin millores —no simples reparacions— perquè redueixen el guany patrimonial i, per tant, l'IRPF a pagar."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar l'exempció total de l'IRPF per reinversió en habitatge habitual, disponible quan l'import total obtingut en la venda es reinverteix en l'adquisició d'un altre habitatge habitual en un termini màxim de 2 anys anteriors o 2 anys posteriors a la venda].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar l'exempció total de l'IRPF per venda d'habitatge habitual per a persones majors de 65 anys o persones en situació de dependència severa o gran dependència, sense necessitat de reinversió].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar els tipus impositius de l'estalvi vigents en el moment de la declaració per al càlcul de l'IRPF sobre el guany patrimonial]."
          ]
        },
        {
          heading: "Totes les despeses que ha d'assumir el venedor: el resum complet",
          level: "h2",
          content: [
            "A més dels impostos, el venedor ha de preveure una sèrie de despeses de gestió que habitualment es detreuen del preu final de venda. Les més rellevants són: honoraris de l'agència immobiliària (si s'ha treballat amb un professional), despeses de cancel·lació registral de la hipoteca si l'immoble té una càrrega pendent (honoraris del banc per emetre el certificat de deute zero, honoraris notarials de l'escriptura de cancel·lació i despeses del Registre de la Propietat), i el cost d'obtenció dels certificats i documents obligatoris per a la venda."
          ],
          bulletPoints: [
            "Honoraris d'agència immobiliària: deduïbles del guany patrimonial a l'IRPF.",
            "Despeses de cancel·lació registral de hipoteca: notaria, Registre i gestió bancària.",
            "Cèdula d'Habitabilitat: renovació si ha caducat.",
            "Certificat d'Eficiència Energètica (CEE): obligatori incloure'l als anuncis i lliurar-lo al comprador.",
            "Certificat de deutes de la comunitat de propietaris: obligatori en el moment de la signatura."
          ]
        }
      ],
      conclusion: "A Gesgrama realitzem per als nostres clients venedors una simulació tributària personalitzada i gratuïta abans de signar res. Conèixer d'avançat l'import exacte de Plusvàlua Municipal, IRPF i despeses associades et permet negociar el preu de venda amb total seguretat i evitar sorpreses desagradables després de la signatura. Sol·licita la teva simulació sense compromís."
    },
    en: {
      title: "Municipal capital gains tax and selling costs in Santa Coloma",
      summary: "Complete fiscal guide for flat sellers in Riera Alta-Llatí and El Raval: how Municipal Plusvalía is calculated, personal income tax (IRPF) on capital gains, and all costs to budget for.",
      category: "Legal & Tax Advisory",
      date: "March 28, 2025",
      readTime: "9 min read",
      author: "Gesgrama Legal Department",
      intro: "Selling an apartment in Riera Alta-Llatí, El Raval, or any Santa Coloma de Gramenet neighborhood incurs tax liabilities and fees that sellers must budget for accurately before closing deals. Confusing gross sale prices with net profit is a frequent, costly mistake made by private sellers. Proper advance tax planning can make a difference of thousands of euros.",
      sections: [
        {
          heading: "Municipal Plusvalía Tax (IIVTNU): calculation methods and amounts due",
          level: "h2",
          content: [
            "The Municipal Land Value Increment Tax (IIVTNU), popularly known as Municipal Plusvalía, is a local tax taxing land value appreciation during the seller's period of ownership. It is payable to Santa Coloma de Gramenet Town Hall and is settled by the seller.",
            "Following the Constitutional Court ruling of 2021 and subsequent Royal Decree-Law 26/2021 reform, the calculation system changed substantially. Taxpayers can now choose between two calculation methods and pay whichever produces a lower tax bill:",
            "Objective Method: multiplies land cadastral value (excluding building value) by municipal annual ownership coefficients set by Santa Coloma Town Hall based on years of ownership.",
            "Real Method: calculates the actual net gain on the land portion (proportional to land cadastral value vs total property value) between original purchase and sale deeds. If the property appreciated moderately over a short hold period, this method may be advantageous. If sold at a loss or break-even price, the sale is fully exempt from the tax."
          ],
          bulletPoints: [
            "Sellers choose between Objective and Real calculation methods for lower tax burden.",
            "Sales executed at a financial loss are fully exempt from Municipal Plusvalía tax.",
            "Self-assessment payment deadline is 30 working days from notary deed execution.",
            "Final tax due applies Santa Coloma municipal tax rates to the calculated tax base."
          ]
        },
        {
          heading: "IRPF capital gains tax: calculating net sale proceeds",
          level: "h2",
          content: [
            "In addition to Municipal Plusvalía, sellers must declare capital gains on their annual personal income tax return (IRPF). This capital gain is integrated into savings tax bases and taxed at progressive rates.",
            "Capital gain is calculated as follows: net transfer value (deed sale price minus seller-paid sales expenses and taxes, including agency commission and Plusvalía tax) minus net acquisition value (original deed purchase price plus all purchase-related taxes and fees: ITP/VAT, notary fees, registry fees, stamp duty, original agency fees, and documented structural improvement costs).",
            "It is crucial to include all documented property improvement investments — as opposed to simple maintenance repairs — in the acquisition base, as they directly reduce taxable capital gains and final income tax payable."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify complete IRPF personal income tax exemption for primary residence reinvestment when full sale proceeds are reinvested in a new primary residence within 2 years before or after the sale date].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify complete IRPF exemption for primary residence sales by individuals over age 65 or severely dependent persons, with no reinvestment required].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm active tax savings brackets applicable at declaration time for capital gains calculation]."
          ]
        },
        {
          heading: "All seller expenses: complete itemized breakdown",
          level: "h2",
          content: [
            "Beyond taxes, sellers must budget for management expenses typically deducted from net sale proceeds. Key costs include: real estate agency commissions (if engaged), mortgage registry cancellation fees (bank debt-free certificate fees, notary cancellation deed fees, and Land Registry filing fees), and required pre-sale certificates."
          ],
          bulletPoints: [
            "Real estate agency fees: fully tax-deductible from capital gains on IRPF returns.",
            "Mortgage registry cancellation expenses: notary, registry, and bank administration fees.",
            "Occupancy License (Cédula de Habitabilidad): renewal if expired.",
            "Energy Performance Certificate (EPC): mandatory in listings and handed to buyers at closing.",
            "Community debt-free certificate: mandatory at notary deed signing."
          ]
        }
      ],
      conclusion: "At Gesgrama, we provide sellers with a free customized pre-sale tax simulation before any contract signing. Knowing exact Municipal Plusvalía, IRPF, and closing costs lets you negotiate sales prices with confidence and avoid post-closing surprises. Request your free simulation today."
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
            "El fondo de reserva es un concepto especialmente importante en Cataluña: el Codi Civil de Catalunya obliga a las comunidades a mantener un fondo de reserva mínimo del 5% del presupuesto ordinario del año anterior. Este fondo es la garantía de que la comunidad puede hacer frente a gastos imprevistos urgentes —como la reparación de una avería del ascensor o la sustitución de una tubería reventada— sin necesidad de convocar de urgencia una junta extraordinaria para aprobar una derrama."
          ]
        },
        {
          heading: "Morosidad: cómo prevenirla y cómo reclamarla efectivamente",
          level: "h2",
          content: [
            "La morosidad en las comunidades de propietarios es uno de los problemas más frecuentes y desestabilizadores de la gestión comunitaria. En los barrios de Riu Nord, Riu Sud y Oliveres-Can Serra, como en cualquier zona con un parque de viviendas de alquiler significativo, es habitual que algunos propietarios atraviesen dificultades económicas que se trasladan al pago de las cuotas comunitarias.",
            "El primer paso de una gestión eficaz de la morosidad es la prevención: mantener un control mensual de los cobros, enviar avisos de impago de forma inmediata en cuanto se produce el incumplimiento y mantener una comunicación directa con el propietario moroso para intentar llegar a un acuerdo de pago fraccionado antes de recurrir a la vía judicial.",
            "Si la vía amistosa fracasa, el ordenamiento jurídico catalán ofrece herramientas muy eficaces para el cobro de deudas comunitarias. El procedimiento monitorio especial de la Ley de Propiedad Horizontal (aplicable en Cataluña con las adaptaciones del Codi Civil) permite al administrador de la finca instar la reclamación judicial de la deuda de forma ágil."
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
      summary: "Guia pràctica completa sobre la gestió professional de comunitats de propietaris a Santa Coloma de Gramenet: marc legal català, juntes de propietaris, pressupostos, morositat i eficiència energètica.",
      category: "Administració de Finques",
      date: "2 d'abril, 2025",
      readTime: "10 min de lectura",
      author: "Administració de Finques Gesgrama",
      intro: "Les comunitats de propietaris als barris de Riu Nord, Riu Sud i Oliveres-Can Serra s'enfronten cada any als mateixos reptes que qualsevol comunitat d'una ciutat amb un parc edificatori madur: manteniment preventiu, aprovació de pressupostos anuals, gestió de derrames extraordinàries per a obres necessàries, control de la morositat i compliment de les obligacions legals vigents. La diferència entre una comunitat ben gestionada i una que acumula problemes està en la qualitat de l'administració professional.",
      sections: [
        {
          heading: "El Codi Civil de Catalunya: el marc legal específic de Catalunya",
          level: "h2",
          content: [
            "A diferència de la gran majoria del territori espanyol, on les comunitats es regeixen per la Llei de Propietat Horitzontal de 1960, a Catalunya el règim està regulat pel Llibre Cinquè del Codi Civil de Catalunya (CCC, Articles 553-1 a 553-66).",
            "Aquesta especificitat normativa té implicacions pràctiques molt rellevants. El Codi Civil de Catalunya estableix un sistema d'adopció d'acords basat en el doble quòrum: en la majoria de decisions, es requereix simultàniament una determinada majoria del nombre de propietaris que voten I una determinada majoria de les quotes de participació.",
            "Els tipus de majoria més rellevants en la pràctica quotidiana són: la majoria simple (més de la meitat de propietaris i quotes) per a acords ordinaris; la majoria de quatre cinquens (4/5) de propietaris i quotes per a modificació d'estatuts o desafectació d'elements comuns; i la unanimitat, requerida únicament per a l'extinció del règim de propietat horitzontal."
          ],
          bulletPoints: [
            "A Catalunya aplica el Codi Civil de Catalunya (Llibre V), no la Llei de Propietat Horitzontal estatal.",
            "Sistema de doble quòrum: es requereix majoria de propietaris I majoria de quotes simultàniament.",
            "Majoria simple: per a acords ordinaris de gestió i manteniment.",
            "Majoria de 4/5: per a modificació d'estatuts i desafectació d'elements comuns.",
            "Unanimitat: només per a l'extinció del règim de propietat horitzontal."
          ]
        },
        {
          heading: "El pressupost anual i les derrames: com gestionar-los correctament",
          level: "h2",
          content: [
            "El pressupost anual de la comunitat és el document que més freqüentment genera conflictes si no està ben elaborat i presentat. Un pressupost transparent i realista és la base de la confiança de la veïnatge.",
            "El pressupost ordinari ha d'incloure totes les despeses previsibles de l'exercici: assegurances de l'edifici, manteniment d'ascensors, neteja, subministraments de zones comunes, honoraris d'administració i dotació al fons de reserva.",
            "El fons de reserva és un concepte especialment important: el Codi Civil de Catalunya obliga les comunitats a mantenir un fons de reserva mínim del 5% del pressupost ordinari de l'any anterior per respondre a urgències de forma immediata."
          ]
        },
        {
          heading: "Morositat: com prevenir-la i com reclamar-la efectivament",
          level: "h2",
          content: [
            "La morositat a les comunitats de propietaris és un dels problemes més freqüents. Als barris de Riu Nord, Riu Sud i Oliveres-Can Serra és habitual que alguns propietaris travessin dificultats econòmiques que es traslladen al pagament de les quotes.",
            "El primer pas és la prevenció: mantenir un control mensual dels cobraments, enviar avisos d'impagament immediats i mantenir una comunicació directa amb el propietari morós per intentar un acord de pagament fraccionat.",
            "Si la via amistosa fracassa, el procediment monitori especial permet a l'administrador instar la reclamació judicial de la deute de forma àgil."
          ],
          bulletPoints: [
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar l'Art. 553-5 del Codi Civil de Catalunya sobre l'afecció real del pis per deutes comunitaris de l'any en curs i els 4 anteriors amb caràcter preferent davant tercers].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Verificar les majories requerides pel CCC per a l'aprovació d'instal·lacions d'autoconsum fotovoltaic compartit o punts de recàrrega elèctrics].",
            "[⚠️ VERIFICACIÓ LEGAL/FISCAL REQUERIDA: Confirmar l'obligació d'eliminar barreres arquitectòniques per a propietaris o inquilins majors de 70 anys o amb discapacitat]."
          ]
        },
        {
          heading: "Què esperar d'una administració de finques professional el 2025",
          level: "h3",
          content: [
            "L'administració de finques ha evolucionat enormement. Els propietaris del segle XXI esperen molt més que la mera gestió de cobraments. A Gesgrama la gestió inclou:",
            "Accés a una plataforma digital on cada propietari pot consultar en temps real l'estat dels comptes comunitaris, actes de juntes i factures.",
            "Servei d'atenció d'averies i incidències urgents amb resposta immediata per a instal·lacions crítiques de l'edifici.",
            "Assegurament proactiu sobre subvencions disponibles per a millores de l'edifici i tramitació completa de sol·licituds."
          ]
        }
      ],
      conclusion: "Una administració de finques professional no és una despesa per a la comunitat: és la inversió que garanteix que l'edifici estigui correctament mantingut, que els comptes siguin transparents, que els morosos paguin i que els veïns visquin en pau. A Gesgrama portem dècades sent l'administrador de confiança a Riu Nord, Riu Sud, Oliveres-Can Serra i la resta de barris de Santa Coloma de Gramenet."
    },
    en: {
      title: "Keys to managing your HOA in Riu Nord, Riu Sud and Oliveres",
      summary: "Complete practical guide to professional homeowner association management in Santa Coloma de Gramenet: Catalan legal framework, owner meetings, budgets, debt collection, and energy efficiency.",
      category: "Property Management",
      date: "April 2, 2025",
      readTime: "10 min read",
      author: "Gesgrama Property Management",
      intro: "Homeowners associations (HOAs) in Riu Nord, Riu Sud, and Oliveres-Can Serra face annual challenges typical of mature urban housing: preventive maintenance, annual budget approvals, extraordinary levies for structural repairs, debt recovery, and legal compliance. The difference between a thriving community and a troubled one lies in professional management quality.",
      sections: [
        {
          heading: "The Catalan Civil Code: Catalonia's specific legal framework for HOAs",
          level: "h2",
          content: [
            "Unlike most of Spain where HOAs operate under the 1960 national Horizontal Property Act, in Catalonia real estate communities are governed by Book Five of the Catalan Civil Code (CCC, Articles 553-1 to 553-66).",
            "This statutory framework introduces crucial practical distinctions. The Catalan Civil Code mandates a double-quorum voting system: most decisions require a majority of voting owners AND a majority of participation quotas simultaneously.",
            "Key voting majorities in Catalan HOA management include: simple majority (over half of voting owners and participation quotas) for ordinary operational decisions; 4/5 majority of owners and quotas to amend bylaws or alter common elements; and unanimity, reserved strictly for HOA dissolution."
          ],
          bulletPoints: [
            "Catalonia applies the Catalan Civil Code (Book V), not the national Horizontal Property Act.",
            "Double quorum requirement: majority of owners AND majority of participation quotas simultaneously.",
            "Simple majority for ordinary maintenance and operational resolutions.",
            "4/5 majority to modify bylaws or common element status.",
            "Unanimity required only for HOA dissolution."
          ]
        },
        {
          heading: "Annual budgets and extraordinary levies: proper management",
          level: "h2",
          content: [
            "The annual HOA budget is the document most prone to causing neighbor friction if poorly prepared. Transparent, detailed, and realistic budgeting builds owner trust in management.",
            "Ordinary budgets must cover all predictable annual expenses: building multirisk and liability insurance, elevator servicing, janitorial work, common lighting, management fees, and statutory reserve fund contributions.",
            "Reserve funds hold special statutory importance in Catalonia: the Catalan Civil Code obligates communities to maintain a minimum reserve fund of 5% of the prior year's ordinary budget. This ensures immediate funding for urgent repairs without emergency levy meetings."
          ]
        },
        {
          heading: "Debt collection: preventing and recovering unpaid community fees",
          level: "h2",
          content: [
            "Unpaid community dues disrupt HOA financial stability. In Riu Nord, Riu Sud, and Oliveres-Can Serra, rental housing prevalence means some owners periodically face economic hardships affecting fee payments.",
            "Effective debt prevention involves monthly collection auditing, instant default notices, and direct communication to establish installment payment plans before initiating litigation.",
            "When amicable resolution fails, Catalan procedural law provides swift legal remedies: the special monitorio court procedure enables property managers to file expedited judicial debt recovery claims."
          ],
          bulletPoints: [
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm Catalan Civil Code Art. 553-5 regarding super-priority property lien for current year plus 4 prior years of unpaid HOA dues].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Verify CCC voting majorities for shared solar PV or EV charger installation in community garages].",
            "[⚠️ LEGAL/TAX VERIFICATION REQUIRED: Confirm mandatory architectural barrier removal duties for residents over 70 or disabled persons]."
          ]
        },
        {
          heading: "What to expect from a professional property manager in 2025",
          level: "h3",
          content: [
            "Property management has evolved significantly. 21st-century property owners expect far more than basic bookkeeping. At Gesgrama, HOA administration in Riu Nord, Riu Sud, and Oliveres-Can Serra includes:",
            "24/7 digital portal access enabling every owner to review community accounts, meeting minutes, paid invoices, and maintenance tickets in real time.",
            "Rapid-response emergency maintenance services for critical building installations (elevators, plumbing, electrical).",
            "Proactive advisory on available building renovation subsidies and end-to-end grant application management."
          ]
        }
      ],
      conclusion: "Professional property management is not an expense for the community: it is the investment that ensures building preservation, transparent accounting, debt recovery, and peaceful neighbor relations. Gesgrama has been the trusted administrator across Riu Nord, Riu Sud, Oliveres-Can Serra, and all Santa Coloma neighborhoods for decades."
    }
  }
];
