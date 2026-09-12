export interface BarrioFaqItem {
  question: string;
  answer: string;
}

export const BARRIO_FAQS_CA: Record<string, BarrioFaqItem[]> = {
  "centre": [
    {
      question: "Com es gestionen les despeses de portal i ascensor amb els locals del Centre?",
      answer: "Apliquem estrictament la Llei de Propietat Horitzontal i els estatuts de la finca, clarificant quines despeses corresponen per coeficient general i quines estan exemptes segons el títol constitutiu, evitant litigis entre comerciants i veïns."
    },
    {
      question: "Quin és el temps de resposta davant una avaria al Centre?",
      answer: "La nostra oficina és a escassos minuts: davant d'una fuita d'aigua, tall de llum o bloqueig d'ascensor, un operari o tècnic de Gesgrama es persona en menys de 10-15 minuts."
    },
    {
      question: "Com tramiteu les subvencions de rehabilitació de façanes en finques clàssiques del Centre?",
      answer: "Gestionem l'expedient integral davant el Consorci de l'Habitatge i l'Ajuntament de Santa Coloma, coordinant projecte tècnic col·legiat, llicències d'ocupació de via pública i bastides sense molèsties per als propietaris."
    },
    {
      question: "Quin control i accés tenen els veïns als comptes bancaris de la comunitat?",
      answer: "Transparència absoluta: lliurem balanços periòdics clars on cada cèntim està justificat amb la seva factura original i extracte bancari digital accessible 24/7 sense comissions opaques ni lletra petita."
    }
  ],
  "santa-rosa": [
    {
      question: "Quina majoria es necessita a Santa Rosa per instal·lar ascensor a cota zero?",
      answer: "Conforme a l'article 10.1.b de la LPH, la instal·lació d'ascensor o rampa d'accessibilitat és obligatòria quan la sol·liciti un propietari major de 70 anys o amb discapacitat, si l'import anual no excedeix de dotze mensualitats ordinàries descomptades les subvencions."
    },
    {
      question: "Com ajudeu a cobrar les quotes a veïns que no paguen a Santa Rosa?",
      answer: "Iniciem reclamació fefaent immediata, mediem plans de pagament ajornats i, si no hi ha voluntat de pagament, activem el procediment monitori judicial amb el nostre equip d'assessoria jurídica propi sense sobrecost d'honoraris."
    },
    {
      question: "Què passa si la nostra finca a Santa Rosa encara no ha superat la ITE obligatòria?",
      answer: "Coordinem la visita de l'arquitecte col·legiat, sol·licitem pròrroga legal davant l'Ajuntament per evitar sancions i calendaritzem les obres prioritàries de patis de llums o balcons amb pressupostos comparatius contrastats."
    },
    {
      question: "Com canviem d'administrador si l'actual no ret comptes a Santa Rosa?",
      answer: "Us assessorem per convocar una Junta Extraordinària amb ordre del dia legal. Tan bon punt s'aprova per majoria simple, ens personem en 48 hores per recollir tota la documentació, claus i comptes sense friccions."
    }
  ]
,
"can-mariner": [
    {
      "question": "Com es fa el traspàs si canviem d'administrador a Can Mariner?",
      "answer": "Ens encarreguem de tot: enviem la comunicació oficial a l'administrador sortint, recollim els llibres d'actes, contractes i comptes bancaris, i fem una auditoria inicial sense cap cost."
    },
    {
      "question": "Quin estalvi mitjà aconseguiu en revisar contractes de llum i assegurança a Can Mariner?",
      "answer": "En finques de Can Mariner solem detectar pòlisses desfasades amb cobertures duplicades o potències elèctriques mal dimensionades, aconseguint reduir entre 400€ i 800€ anuals directes en el pressupost ordinari."
    },
    {
      "question": "Com s'aborden les humitats i filtracions de les cobertes a Can Mariner?",
      "answer": "Realitzem peritatge amb empreses impermeabilitzadores homologades de Santa Coloma, emetem tres pressupostos cecs comparatius i gestionem el sinistre amb la companyia asseguradora comunitària per cobrir el cost indemnitzable."
    },
    {
      "question": "Es realitzen visites periòdiques de control a l'edifici?",
      "answer": "Sí, revisem presencialment l'estat del vestíbul, il·luminació comunitària, cambres de comptadors i neteja mensual per certificar la qualitat dels proveïdors contractats."
    }
  ],
  "fondo": [
    {
      "question": "Què feu si en una comunitat del Fondo hi ha impagaments generalitzats?",
      "answer": "Auditem el deute de cada habitatge, enviem requeriments amb valor probatori legal, oferim facilitats de fraccionament a famílies amb dificultat real i demandem judicialment els morosos recalcitrants amb el nostre advocat col·legiat."
    },
    {
      "question": "Com gestioneu la mediació veïnal i convivència en finques d'alta rotació?",
      "answer": "Disposem de protocols de convivència clars, informació comunitària explicativa en diversos idiomes i mediació directa veïnal presencial per resoldre sorolls, escombraries en zones comunes i ús de replans."
    },
    {
      "question": "Quina solució apliqueu a les avaries recurrents de baixants i canonades velles al Fondo?",
      "answer": "Treballem amb lampistes i llauners homologats amb servei de desatasco urgent 24h. Negociem tarifes fixes anuals que abarateixen el cost per intervenció davant avisos particulars d'urgència."
    },
    {
      "question": "Per què triar Gesgrama per a una comunitat al barri de Fondo?",
      "answer": "Perquè som físicament al costat a Av. dels Banús, 49. Coneixem les particularitats urbanístiques de cada carrer del barri i no som una agència impersonal de Barcelona: som a peu de carrer."
    }
  ],
  "singuerlin": [
    {
      "question": "Disposeu d'arquitectes tècnics propis per a finques amb humitats a Singuerlín?",
      "answer": "Sí, a Gesgrama comptem amb la titulació oficial de Pèrit Judicial Immobiliari col·legiat, cosa que ens permet diagnosticar l'origen exacte de les filtracions i defensar la comunitat davant companyies d'assegurances o constructores."
    },
    {
      "question": "Com es resolen les deficiències de pressió d'aigua i grups de bombeig a Singuerlín?",
      "answer": "Per l'orografia i desnivells de Singuerlín, molts edificis requereixen grups de pressió i aljubs. Contractem empreses de manteniment preventiu per evitar talls de subministrament a plantes altes."
    },
    {
      "question": "Quines subvencions hi ha per a rehabilitació energètica en finques de Singuerlín?",
      "answer": "Tramitem els ajuts dels fons Next Generation i convocatòries autonòmiques d'eficiència tèrmica en envolupants i façanes, aconseguint fins a un 60-80% de subvenció a fons perdut per a la comunitat."
    },
    {
      "question": "Teniu atenció presencial si el president necessita signar documents o aclarir dubtes?",
      "answer": "Totalment. Singuerlín compta amb atenció immediata del nostre equip col·legiat i desplaçaments continus a les finques administrades."
    }
  ],
  "riera-alta": [
    {
      "question": "Com superviseu les obres de la comunitat a Riera Alta?",
      "answer": "No cobrem comissions d'industrials. Sol·licitem sempre 3 pressupostos cecs d'empreses contrastades, supervisem l'execució i no alliberem el pagament final fins que l'obra està formalment rebuda a satisfacció de la junta."
    },
    {
      "question": "Com se solucionen les humitats per capil·laritat en plantes baixes de Riera Alta?",
      "answer": "Diagnostiquem l'origen exacte del nivell freàtic o filtració amb tècnics especialistes, aplicant tractaments definitius d'injecció de resines o drenatges perimetrals avalats amb garantia."
    },
    {
      "question": "Quin criteri se segueix per a l'elecció d'empreses de neteja i conservació a Riera Alta?",
      "answer": "Presentem sempre 3 pressupostos d'empreses locals verificades, amb contractes que exigeixen fitxatges i auditories de servei periòdiques per part del nostre despatx."
    },
    {
      "question": "Quant cobra Gesgrama per administrar una finca a Riera Alta?",
      "answer": "Els nostres honoraris són transparents, sense costos sorpresa per emissió de certificats ordinaris o fotocòpies. Oferim cotització tancada adaptada al nombre d'entitats."
    }
  ],
  "llati": [
    {
      "question": "Hi ha costos ocults o comissions per tramitar sinistres de l'assegurança al Llatí?",
      "answer": "Zero. La nostra tarifa d'administració és tancada: inclou tramitació integral de comunicats a l'assegurança de la finca sense cap comissió per sinistre."
    },
    {
      "question": "Com es coordina el manteniment de zones comunitàries i patis al Llatí?",
      "answer": "Establim un calendari preventiu de conservació d'embornals, impermeabilització de terrats comunitaris i revisió de claraboies per prevenir goteres estacionals."
    },
    {
      "question": "Com afrontem la instal·lació d'ascensor si l'escala és molt estreta al Llatí?",
      "answer": "Estudiem amb arquitectes solucions per pati interior de llums o modificació de l'ull de l'escala, aprofitant ajuts públics per garantir la viabilitat tècnica i econòmica."
    },
    {
      "question": "Com es tramita una avaria urgent fora d'horari d'oficina al Llatí?",
      "answer": "Disposem d'un telèfon i canal d'emergències actiu les 24 hores i els 365 dies de l'any amb derivació immediata a industrials homologats de Santa Coloma."
    }
  ],
  "el-raval": [
    {
      "question": "Com combateu els problemes d'humitat en finques d'El Raval?",
      "answer": "Analitzem si l'origen és condensació, capil·laritat o filtració del nivell freàtic, redactant dictamen pericial i implementant solucions definitives amb aïllament de solera i ventilació mecànica."
    },
    {
      "question": "Com combatem la morositat persistent en comunitats del Raval?",
      "answer": "Apliquem el protocol judicial exprés: certificació fefaent de deute en Junta, burofax amb justificant de recepció i execució monitori judicial sense avançament de costes abusives."
    },
    {
      "question": "Quins tràmits realitzeu davant sorolls o molèsties veïnals al Raval?",
      "answer": "Intervenim mitjançant requeriment formal signat per la presidència a l'empara de l'article 7.2 de la LPH, coordinant mediació directa amb els propietaris i la Policia Local."
    },
    {
      "question": "Podem consultar les factures i saldos de la comunitat per internet?",
      "answer": "Sí, disposeu de portal digital i liquidacions trimestrals detallades on es reflecteixen ingressos, despeses i saldos bancaris conciliats cèntim a cèntim."
    }
  ],
  "riu-nord": [
    {
      "question": "Tenen els veïns accés a les factures i extractes bancaris de Riu Nord?",
      "answer": "Sí, a través de la nostra plataforma online i app mòbil exclusiva, accessible 24 hores al dia, 365 dies a l'any."
    },
    {
      "question": "Quin manteniment preventiu necessiten els garatges i passatges a Riu Nord?",
      "answer": "Inspeccions periòdiques de ventilació forçada, detecció de monòxid de carboni, extintors reglamentaris i manteniment de portes motoritzades amb marcatge CE."
    },
    {
      "question": "Com es resolen les filtracions produïdes per baixants pluvials a Riu Nord?",
      "answer": "Acudim en menys d'una hora per contenir sinistres actius i tramitem la substitució amb càrrec a la pòlissa de l'assegurança comunitària o causant directe."
    },
    {
      "question": "Quina majoria cal per canviar a Gesgrama en una comunitat de Riu Nord?",
      "answer": "Només majoria simple dels propietaris presents i representats en Junta convocada. Ens encarreguem de redactar el punt del dia i tramitar el traspàs complet."
    }
  ],
  "riu-sud": [
    {
      "question": "Gestioneu també mancomunitats de garatges a Riu Sud?",
      "answer": "Sí, administrem garatges independents i mancomunats, gestionant guals, revisions d'extintors, bombes d'aigua i emissió de comandaments a distància."
    },
    {
      "question": "Com s'optimitzen les despeses de finques amb amplis portals a Riu Sud?",
      "answer": "Revisem contractes de neteja per hores efectives i substitució de lluminàries tradicionals per detectors microones amb LED, baixant el consum elèctric fins a un 45%."
    },
    {
      "question": "Com s'actua davant d'ocupacions il·legals o usurpació de zones comunes?",
      "answer": "Acció preventiva i legal contundent: blindatge d'accessos, càmeres de seguretat homologades conforme a l'AEPD i personació legal immediata davant els jutjats."
    },
    {
      "question": "Presenteu els impostos obligatoris de la comunitat a Riu Sud?",
      "answer": "Sí, emplenem i presentem totes les obligacions tributàries (model 347, retencions IRPF) en termini legal, evitant recàrrecs i sancions als propietaris."
    }
  ],
  "can-franquesa": [
    {
      "question": "Com auditeu els contractes d'ascensors a Can Franquesa?",
      "answer": "Revisem les clàusules de permanència, excloem conceptes abusius i negociem preus corporatius amb les principals empreses mantenidores aprofitant el nostre volum de comunitats."
    },
    {
      "question": "Com es gestiona el manteniment de les grans torres i grups de pressió a Can Franquesa?",
      "answer": "Supervisió especialitzada de grups de bombeig d'aigua sanitària, parallamps, sistemes de ventilació d'emergència i doble línia d'ascensors d'alta velocitat."
    },
    {
      "question": "Com es tramita la ITE i rehabilitació de façanes en alçada a Can Franquesa?",
      "answer": "Gestionem projectes tècnics amb bastides penjants o treballs verticals homologats, tramitant subvencions públiques que alleugen el cost per a les famílies del bloc."
    },
    {
      "question": "Com contactar amb Gesgrama en cas d'avaria durant el cap de setmana?",
      "answer": "Mitjançant la nostra línia directa d'emergències 24/7 que mobilitza els tècnics homologats de guàrdia de manera immediata sense esperes."
    }
  ],
  "les-oliveres": [
    {
      "question": "Què passa amb les ITEs en comunitats de Les Oliveres?",
      "answer": "Coordinem la inspecció tècnica obligatòria amb arquitectes tècnics especialitzats, tramitem el Certificat d'Aptitud davant la Generalitat i gestionem les obres necessàries si hi ha deficiències."
    },
    {
      "question": "Quin tractament donem a les filtracions provocades pel desnivell del terreny?",
      "answer": "Inspecció de murs de contenció perimetrals, canalitzacions d'aigües pluvials i reparació de juntes de dilatació per assegurar l'estabilitat de l'immoble."
    },
    {
      "question": "Com s'estructuren els pagaments de derrames per a obres grans a Les Oliveres?",
      "answer": "Plans fraccionats a mida i negociació de finançament bancari comunitari sense necessitat d'avals personals dels veïns."
    },
    {
      "question": "Quina experiència té Gesgrama en comunitats de Les Oliveres?",
      "answer": "Més de 30 anys a Santa Coloma de Gramenet administrant finques a totes les zones de la ciutat, coneixent a la perfecció les seves singularitats urbanes."
    }
  ],
  "la-guinardera": [
    {
      "question": "Com es gestiona el fons de reserva de la comunitat?",
      "answer": "Conforme a la llei catalana de propietat horitzontal, mantenim el fons de reserva legal (mínim el 5% del pressupost ordinari) en compte bancari separat i remunerat a nom exclusiu de la comunitat."
    },
    {
      "question": "Com es gestiona la convivència entre habitatges i naus o locals a La Guinardera?",
      "answer": "Delimitació rigorosa de quotes de participació, control de pesos i sorolls en accessos rodats i vigilància d'horaris de càrrega i descàrrega conforme a ordenances locals."
    },
    {
      "question": "Quin manteniment preventiu s'aplica a baixants i canalons exposats?",
      "answer": "Neteja d'arquetes i baixants dues vegades a l'any (especialment a la tardor i primavera) per evitar desbordaments i inundacions de portals o soterranis."
    },
    {
      "question": "Com fiscalitza Gesgrama les empreses de manteniment contractades?",
      "answer": "Revisió presencial de parts de treball i retenció de pagaments de liquidació fins a comprovar que l'avaria o obra ha quedat 100% resolta."
    }
  ],
  "cementiri-vell": [
    {
      "question": "Amb quanta antelació es lliuren els comptes abans de la junta ordinària?",
      "answer": "Enviem la convocatòria formal amb l'estat de comptes detallat, factures desglossades i pressupost del nou exercici almenys 15 dies abans de la reunió perquè tots els veïns puguin revisar-ho amb calma."
    },
    {
      "question": "Com es gestiona el canvi d'ascensor en finques consolidades de Cementiri Vell?",
      "answer": "Elaboració de plec tècnic de condicions, sol·licitud de pressupostos a les principals marques i direcció d'obra fins a la legalització al Departament d'Indústria."
    },
    {
      "question": "Quin tractament donem a les plagues o salubritat en patis i clavegueram?",
      "answer": "Convenis directes amb empreses de desinfecció i desratització autoritzades de Santa Coloma per a intervencions de xoc i revisions preventives anuals."
    },
    {
      "question": "Com resolem disputes veïnals sense arribar als tribunals?",
      "answer": "Mediació veïnal activa al nostre despatx d'Av. dels Banús o a la pròpia finca, basant-nos en la normativa vigent i el sentit comú comunitari."
    }
  ]
};

export const BARRIO_FAQS_EN: Record<string, BarrioFaqItem[]> = {
  "centre": [
    {
      "question": "How are hallway and elevator costs shared with commercial premises in Centre?",
      "answer": "We strictly apply the Horizontal Property Act and community bylaws, clarifying which expenses belong to general shares and which are exempt, preventing disputes between shop owners and residents."
    },
    {
      "question": "What is your emergency response time in Centre?",
      "answer": "Our office is just minutes away: for water leaks, power outages, or elevator breakdowns, a Gesgrama technician arrives in under 10-15 minutes."
    },
    {
      "question": "How do you manage facade rehabilitation grants for classic buildings in Centre?",
      "answer": "We handle the complete grant application with the Housing Consortium and Santa Coloma City Council, coordinating technical projects, street occupancy permits, and scaffolding with zero hassle for owners."
    },
    {
      "question": "What access and oversight do homeowners have regarding community bank accounts?",
      "answer": "Total transparency: we deliver clear periodic statements where every cent is backed by original invoices and 24/7 digital bank statement access with no hidden fees."
    }
  ],
  "santa-rosa": [
    {
      "question": "What voting majority is required in Santa Rosa to install a ground-level elevator?",
      "answer": "Under Article 10.1.b of the Horizontal Property Act, elevator installation or accessibility ramps become mandatory when requested by an owner over 70 or with disabilities, provided net annual costs do not exceed twelve monthly fees."
    },
    {
      "question": "How do you collect overdue fees from non-paying neighbors in Santa Rosa?",
      "answer": "We initiate immediate certified legal notices, mediate structured payment plans, and if needed, file court-ordered payment proceedings with our in-house legal team at no extra legal fees."
    },
    {
      "question": "What happens if our building in Santa Rosa has not passed its mandatory building inspection (ITE)?",
      "answer": "We coordinate visits with certified chartered architects, file legal deferrals with City Council to prevent penalties, and schedule priority works with competitive quotes."
    },
    {
      "question": "How can we switch property managers if our current one does not render accounts in Santa Rosa?",
      "answer": "We advise you on convening an Extraordinary General Meeting with a compliant agenda. Once approved by simple majority, we take charge within 48 hours to collect all records, keys, and accounts seamlessly."
    }
  ],
  "can-mariner": [
    {
      "question": "How does the handover process work when switching property managers in Can Mariner?",
      "answer": "We handle everything: sending official notifications to the outgoing manager, retrieving minute books, contracts, and bank accounts, and performing an initial comprehensive audit at zero charge."
    },
    {
      "question": "What average savings do you achieve on electricity and insurance contracts in Can Mariner?",
      "answer": "In Can Mariner buildings we typically uncover outdated policies with duplicated coverage or oversized power tariffs, achieving savings of between €400 and €800 per year directly in the operating budget."
    },
    {
      "question": "How are roof leaks and damp problems managed in Can Mariner?",
      "answer": "We conduct certified inspections with approved waterproofing specialists in Santa Coloma, obtain three blind competitive quotes, and manage the insurance claim to cover all eligible costs."
    },
    {
      "question": "Do you carry out regular on-site inspection visits to the building?",
      "answer": "Yes, we physically inspect lobbies, hallway lighting, meter rooms, and monthly cleaning quality to ensure contracted providers meet top standards."
    }
  ],
  "fondo": [
    {
      "question": "What do you do if there are widespread payment arrears in a building in Fondo?",
      "answer": "We audit debt unit by unit, issue legally admissible registered notices, offer practical installment plans for families facing real hardship, and take persistent defaulters to court with our certified in-house legal counsel."
    },
    {
      "question": "How do you manage neighbor mediation in buildings with high tenant turnover?",
      "answer": "We establish clear community rules in multiple languages and provide direct on-site personal mediation to resolve noise disputes, common area cleanliness, and landing usage."
    },
    {
      "question": "What solutions do you provide for recurring pipe and drainage issues in older Fondo properties?",
      "answer": "We partner with licensed 24/7 emergency plumbers. We negotiate fixed annual rates that drastically reduce costs compared to emergency callouts."
    },
    {
      "question": "Why choose Gesgrama for a building in the Fondo neighborhood?",
      "answer": "Because we are right next door at Av. dels Banús, 49. We know the exact urban characteristics of each street and are accessible on foot, not an impersonal office in central Barcelona."
    }
  ],
  "singuerlin": [
    {
      "question": "Do you have in-house technical surveyors for damp issues in Singuerlín?",
      "answer": "Yes, Gesgrama holds official certification as Registered Real Estate Judicial Experts, allowing us to diagnose the exact origin of moisture issues and defend the community against insurers or builders."
    },
    {
      "question": "How do you address water pressure and pump system deficiencies in Singuerlín?",
      "answer": "Due to Singuerlín's topography and elevation differences, many buildings depend on water booster pumps and tanks. We contract preventive maintenance companies to prevent supply disruptions to upper floors."
    },
    {
      "question": "What subsidies are available for energy rehabilitation in Singuerlín buildings?",
      "answer": "We process Next Generation European funds and regional grants for thermal insulation of facades and roofs, securing non-repayable subsidies of up to 60-80% for the community."
    },
    {
      "question": "Can community presidents meet with you in person to sign documents or discuss queries?",
      "answer": "Absolutely. Singuerlín communities enjoy immediate attention from our certified team and continuous visits to every building we manage."
    }
  ],
  "riera-alta": [
    {
      "question": "How do you supervise community renovation works in Riera Alta?",
      "answer": "We do not take contractor commissions. We always obtain 3 blind comparative quotes from vetted companies, inspect execution, and withhold final sign-off until the board is completely satisfied."
    },
    {
      "question": "How is rising damp resolved in ground-floor properties in Riera Alta?",
      "answer": "We diagnose the water table or infiltration source with specialist engineers, applying guaranteed chemical resin injections or perimeter drainage solutions."
    },
    {
      "question": "What criteria are used to select cleaning and maintenance contractors in Riera Alta?",
      "answer": "We always present 3 quotes from verified local contractors, backed by contracts requiring check-in verification and regular service quality audits from our team."
    },
    {
      "question": "How much does Gesgrama charge to manage a building in Riera Alta?",
      "answer": "Our fees are fully transparent, with no surprise charges for ordinary certificates or copying. We provide fixed quotes tailored to the number of units."
    }
  ],
  "llati": [
    {
      "question": "Are there hidden fees or markups for processing insurance claims in El Llatí?",
      "answer": "Zero. Our management fee is all-inclusive: complete handling of building insurance claims is included with no commission per incident."
    },
    {
      "question": "How do you coordinate maintenance for common areas and courtyards in El Llatí?",
      "answer": "We establish a preventive maintenance schedule for storm drains, rooftop waterproofing, and skylight inspections to prevent seasonal leaks."
    },
    {
      "question": "How can an elevator be installed if the stairwell is very narrow in El Llatí?",
      "answer": "We collaborate with architects to design solutions via interior lightwells or staircase remodeling, leveraging public grants to ensure technical and financial feasibility."
    },
    {
      "question": "How are out-of-hours emergency repairs handled in El Llatí?",
      "answer": "We operate a 24/7, 365-day emergency hotline that immediately dispatches certified local technicians across Santa Coloma."
    }
  ],
  "el-raval": [
    {
      "question": "How do you tackle damp and moisture problems in El Raval properties?",
      "answer": "We assess whether moisture stems from condensation, capillary action, or water table seepage, providing technical reports and permanent solutions such as slab insulation and mechanical ventilation."
    },
    {
      "question": "How do you manage chronic payment delinquency in El Raval communities?",
      "answer": "We apply an expedited legal recovery protocol: certified debt recognition at meetings, formal notice letters, and fast-track court enforcement with no unfair advance legal fee markups."
    },
    {
      "question": "What actions do you take regarding neighbor noise or nuisance in El Raval?",
      "answer": "We intervene via formal cease-and-desist notices signed by the community president under Article 7.2 of the Horizontal Property Act, coordinating directly with owners and local authorities."
    },
    {
      "question": "Can homeowners review community invoices and account balances online?",
      "answer": "Yes, you have access to a digital portal and quarterly detailed accountings displaying all income, expenditure, and bank statements reconciled down to the cent."
    }
  ],
  "riu-nord": [
    {
      "question": "Do residents have access to invoices and bank statements in Riu Nord?",
      "answer": "Yes, via our exclusive online platform and mobile app, accessible 24 hours a day, 365 days a year."
    },
    {
      "question": "What preventive maintenance do garages and passageways need in Riu Nord?",
      "answer": "Routine inspections of forced ventilation, carbon monoxide detection systems, certified fire extinguishers, and CE-marked automated garage doors."
    },
    {
      "question": "How are leaks caused by rainwater downpipes handled in Riu Nord?",
      "answer": "We respond within an hour to contain active leaks and process replacement claims through the community or responsible party's insurance policy."
    },
    {
      "question": "What majority is needed to switch to Gesgrama in a Riu Nord community?",
      "answer": "Only a simple majority of owners present or represented at a duly convened meeting. We prepare the agenda item and handle the full transfer process."
    }
  ],
  "riu-sud": [
    {
      "question": "Do you also manage garage associations in Riu Sud?",
      "answer": "Yes, we manage both independent and mixed-use parking associations, supervising municipal drop-curb permits, fire equipment inspections, sump pumps, and remote control issuance."
    },
    {
      "question": "How can expenses be optimized for buildings with large entrance halls in Riu Sud?",
      "answer": "We renegotiate cleaning contracts based on actual hours and upgrade traditional lighting to microwave-sensor LED fixtures, lowering common electricity consumption by up to 45%."
    },
    {
      "question": "What action is taken regarding unauthorized occupancy or misuse of common spaces?",
      "answer": "Firm preventive and legal measures: secure access reinforcement, GDPR-compliant certified security cameras, and prompt legal filings before the courts."
    },
    {
      "question": "Do you file mandatory tax declarations for the building in Riu Sud?",
      "answer": "Yes, we prepare and submit all required tax returns (Form 347, withholdings) on time, protecting homeowners from surcharges or penalties."
    }
  ],
  "can-franquesa": [
    {
      "question": "How do you audit elevator maintenance contracts in Can Franquesa?",
      "answer": "We review lock-in clauses, eliminate unjustified fees, and negotiate group corporate rates with leading elevator companies using our portfolio volume."
    },
    {
      "question": "How is maintenance managed for high-rise towers and pressure pumps in Can Franquesa?",
      "answer": "Specialized oversight of domestic water booster stations, lightning rods, emergency ventilation systems, and high-speed dual elevator banks."
    },
    {
      "question": "How do you process ITE inspections and high-rise facade restorations in Can Franquesa?",
      "answer": "We coordinate projects using suspended scaffolding or certified rope access technicians, securing public subsidies that reduce the cost burden for resident families."
    },
    {
      "question": "How can we reach Gesgrama for emergencies over the weekend?",
      "answer": "Via our direct 24/7 emergency hotline, which mobilizes vetted on-duty technicians immediately without delays."
    }
  ],
  "les-oliveres": [
    {
      "question": "How are mandatory building inspections (ITE) managed in Les Oliveres?",
      "answer": "We coordinate inspections with certified building engineers, process the Certificate of Fitness with the Generalitat, and supervise required remedial works."
    },
    {
      "question": "How do you handle water infiltration caused by sloped terrain?",
      "answer": "Inspection of perimeter retaining walls, stormwater channels, and expansion joints to guarantee structural stability and waterproof integrity."
    },
    {
      "question": "How are special assessment payments structured for major works in Les Oliveres?",
      "answer": "Custom installment plans and negotiation of community bank loans without requiring personal guarantees from individual homeowners."
    },
    {
      "question": "What experience does Gesgrama have in Les Oliveres communities?",
      "answer": "Over 30 years in Santa Coloma de Gramenet managing properties across every neighborhood, with in-depth knowledge of local structural conditions."
    }
  ],
  "la-guinardera": [
    {
      "question": "How is the community reserve fund managed?",
      "answer": "Under Catalan property law, we maintain the mandatory statutory reserve fund (minimum 5% of ordinary budget) in a separate, interest-bearing bank account held exclusively in the community's name."
    },
    {
      "question": "How do you manage coexistence between residences and commercial warehouses in La Guinardera?",
      "answer": "Precise delineation of participation shares, weight and noise control on access roads, and enforcement of loading/unloading hours under municipal ordinances."
    },
    {
      "question": "What preventive maintenance applies to exposed downpipes and gutters?",
      "answer": "Twice-yearly cleaning of catch basins and downspouts (especially in autumn and spring) to prevent overflows and flooding in entrance halls or basements."
    },
    {
      "question": "How does Gesgrama inspect contracted maintenance providers?",
      "answer": "In-person verification of job sheets and withholding settlement payments until confirming that repairs or works have been 100% completed to standard."
    }
  ],
  "cementiri-vell": [
    {
      "question": "How far in advance are financial statements provided before the annual general meeting?",
      "answer": "We send the formal meeting notice complete with itemized accounts, breakdown of invoices, and draft budget at least 15 days before the meeting so all owners can review everything thoroughly."
    },
    {
      "question": "How is elevator modernization handled in established buildings in Cementiri Vell?",
      "answer": "Preparation of technical specifications, soliciting competitive bids from leading manufacturers, and site supervision through to final certification with the Department of Industry."
    },
    {
      "question": "What treatment is provided for pest control and sanitation in lightwells and drainage?",
      "answer": "Direct agreements with licensed pest management firms in Santa Coloma for targeted emergency treatments and scheduled annual preventive sweeps."
    },
    {
      "question": "How do you resolve neighbor disputes without going to court?",
      "answer": "Active neighbor mediation at our office on Av. dels Banús or on-site at the building, grounded in current legislation and community common sense."
    }
  ]
};

export function getNeighborhoodFaqs(slug: string, language: 'es' | 'ca' | 'en', defaultFaqs: BarrioFaqItem[]): BarrioFaqItem[] {
  if (language === 'ca' && BARRIO_FAQS_CA[slug]) return BARRIO_FAQS_CA[slug];
  if (language === 'en' && BARRIO_FAQS_EN[slug]) return BARRIO_FAQS_EN[slug];
  return defaultFaqs;
}
