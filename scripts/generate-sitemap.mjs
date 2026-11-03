import fs from 'fs';
import path from 'path';

const SITE_DOMAIN = 'https://gesgrama.com';
const TODAY = new Date().toISOString().split('T')[0];

const barrios = [
  'centre', 'santa-rosa', 'can-mariner', 'fondo', 'singuerlin',
  'riera-alta', 'llati', 'el-raval', 'riu-nord', 'riu-sud',
  'can-franquesa', 'les-oliveres', 'la-guinardera', 'cementiri-vell'
];

const servicios = [
  'administracion-de-fincas',
  'gestion-inmobiliaria',
  'asesoria-juridica-fiscal',
  'obras-mantenimiento'
];

const articulos = [
  'que-es-un-asesor-inmobiliario-y-por-que-podrias-necesitarlo',
  'que-es-un-contrato-de-exclusividad-inmobiliaria',
  'que-es-un-perito-judicial-inmobiliario',
  'descubre-todo-sobre-una-vivienda-de-obra-nueva',
  'guia-alquilar-vender-piso-singuerlin-centre-santa-coloma',
  'ite-rehabilitacion-edificios-fondo-santa-rosa-can-mariner',
  'plusvalia-municipal-gastos-vender-piso-riera-alta-llati-el-raval',
  'claves-administrar-comunidad-propietarios-riu-nord-riu-sud-oliveres-can-serra'
];

const propiedades = [
  'piso-reformado-riera-alta-llati',
  'apartamento-exterior-singuerlin',
  'atico-duplex-centro-santa-coloma',
  'piso-luminoso-santa-rosa-can-mariner',
  'piso-familiar-fondo',
  'local-comercial-avenida-banus',
  'piso-con-vistas-al-riu'
];

const legales = [
  'aviso-legal',
  'politica-privacidad',
  'politica-cookies'
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// 1. Home
xml += `  <url>\n    <loc>${SITE_DOMAIN}/</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

// 2. Hubs
xml += `  <url>\n    <loc>${SITE_DOMAIN}/noticias</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
xml += `  <url>\n    <loc>${SITE_DOMAIN}/administrador-fincas/santa-coloma-de-gramenet</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.95</priority>\n  </url>\n`;

// 3. Servicios
for (const s of servicios) {
  xml += `  <url>\n    <loc>${SITE_DOMAIN}/servicios/${s}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.90</priority>\n  </url>\n`;
}

// 4. Barrios (14)
for (const b of barrios) {
  xml += `  <url>\n    <loc>${SITE_DOMAIN}/administrador-fincas/${b}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
}

// 5. Inmuebles
for (const p of propiedades) {
  xml += `  <url>\n    <loc>${SITE_DOMAIN}/inmobiliaria/${p}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
}

// 6. Noticias / Artículos
for (const a of articulos) {
  xml += `  <url>\n    <loc>${SITE_DOMAIN}/noticias/${a}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
}

// 7. Legales
for (const l of legales) {
  xml += `  <url>\n    <loc>${SITE_DOMAIN}/${l}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.40</priority>\n  </url>\n`;
}

xml += '</urlset>\n';

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log('Generated public/sitemap.xml with', 1 + 2 + servicios.length + barrios.length + propiedades.length + articulos.length + legales.length, 'URLs');
