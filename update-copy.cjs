const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf8');

code = code.replace(
  /nav: \{\s*propiedades: "Propiedades",\s*servicios: "Servicios",\s*proceso: "Proceso",\s*contacto: "Contacto",\s*concierge: "Concierge"\s*\}/,
  `nav: {
      propiedades: "Inmobiliaria",
      servicios: "Servicios",
      proceso: "Nosotros",
      contacto: "Contacto",
      concierge: "Portal de Clientes"
    }`
);

code = code.replace(
  /hero: \{\s*tag: "Inmobiliaria moderna — desde 2009",\s*title1: "Encuentra o vende tu propiedad",\s*title2: "de la forma más rápida,",\s*title3: "sencilla e intuitiva.",\s*subtitle: "Encuentra o vende propiedades con total confianza."/,
  `hero: {
      tag: "Gestión integral — desde 2009",
      title1: "Administración de Fincas,",
      title2: "Inmobiliaria y",
      title3: "Asesoría jurídica.",
      subtitle: "Gestión experta, transparente y cercana para su tranquilidad."`
);

code = code.replace(
  /services: \{\s*tag: "Servicios",\s*title1: "Una casa.",\s*title2: "Un legado.",\s*title3: "Un mismo equipo.",\s*list: \[\s*\{ title: "Comprar", desc: "Acceso a inventario off-market y asesoramiento personalizado." \},\s*\{ title: "Vender", desc: "Estrategia de marketing de alto impacto para activos singulares." \},\s*\{ title: "Valorar", desc: "Análisis riguroso de mercado y precio óptimo defendible." \},\s*\{ title: "Invertir", desc: "Gestión de carteras patrimoniales y análisis de rentabilidad." \},\s*\{ title: "Obra nueva", desc: "Preventa exclusiva de las promociones más deseadas." \},\s*\{ title: "Luxury", desc: "División especializada en propiedades a partir de 3M€." \}\s*\]\s*\}/,
  `services: {
      tag: "Servicios",
      title1: "Gestión integral.",
      title2: "Tranquilidad",
      title3: "absoluta.",
      list: [
        { title: "Administración de Fincas", desc: "Gestión transparente, atención rápida de incidencias y optimización de gastos de su comunidad." },
        { title: "Inmobiliaria", desc: "Venta de pisos, locales y captación proactiva de inmuebles con las mejores condiciones." },
        { title: "Asesoramiento Jurídico", desc: "Especialistas en redacción de contratos, tramitación de herencias y gestión legal." },
        { title: "Arquitectura Técnica", desc: "Inspecciones, certificados de eficiencia energética y gestión de obras." },
        { title: "Gestión Patrimonial", desc: "Optimización de la rentabilidad para inversores y propietarios de grandes carteras." },
        { title: "Seguros", desc: "Auditoría de pólizas de comunidad y tramitación ágil de siniestros." }
      ]
    }`
);

code = code.replace(
  /process: \{\s*tag: "Vender con Gesgrama",\s*title1: "Siete pasos.",\s*title2: "Un resultado",\s*title3: "excepcional.",\s*list: \[\s*\{ num: "01", title: "Valoración", desc: "Análisis profundo del mercado para determinar el precio óptimo." \},\s*\{ num: "02", title: "Estrategia", desc: "Plan de comercialización personalizado para su propiedad." \},\s*\{ num: "03", title: "Reportaje", desc: "Producción fotográfica y cinematográfica al nivel de un editorial." \},\s*\{ num: "04", title: "Marketing", desc: "Campaña omnicanal en portales premium y redes exclusivas." \},\s*\{ num: "05", title: "Visitas", desc: "Filtrado y acompañamiento de compradores cualificados." \},\s*\{ num: "06", title: "Negociación", desc: "Defensa del valor real con máxima discreción." \},\s*\{ num: "07", title: "Venta", desc: "Cierre jurídico impecable y traspaso sereno." \}\s*\]\s*\}/,
  `process: {
      tag: "Por qué Gesgrama",
      title1: "Experiencia.",
      title2: "Compromiso",
      title3: "y cercanía.",
      list: [
        { num: "01", title: "Transparencia", desc: "Acceso 24/7 a la documentación y cuentas de su comunidad." },
        { num: "02", title: "Agilidad", desc: "Respuesta rápida ante incidencias y emergencias comunitarias." },
        { num: "03", title: "Asesoría Integral", desc: "Un solo equipo para cubrir sus necesidades inmobiliarias y legales." },
        { num: "04", title: "Optimización", desc: "Revisión continua de contratos para reducir gastos comunitarios." },
        { num: "05", title: "Experiencia", desc: "Más de 15 años gestionando propiedades en la zona." },
        { num: "06", title: "Confianza", desc: "Miles de vecinos confían la gestión de su hogar en nosotros." },
        { num: "07", title: "Innovación", desc: "Herramientas digitales punteras para una comunicación fluida." }
      ]
    }`
);

fs.writeFileSync('src/routes/index.tsx', code);
console.log("Translations updated successfully.");
