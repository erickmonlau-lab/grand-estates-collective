# GESGRAMA — MASTER FORENSIC AUDIT & RELEASE REPORT
**Dominio Canónico:** `https://gesgrama.com/`  
**Fecha:** 3 de Octubre de 2026  
**Entorno auditado:** Producción Real + Repositorio Local  
**Objetivo:** Consolidación forense de SEO Técnico, Indexación, Canonical, Structured Data, E-E-A-T, Enlazado Interno, Performance y Anti-Regresión.

---

## 1. ESTADO INICIAL Y ANÁLISIS DE GOOGLE SEARCH CONSOLE

### 1.1 Baseline de Search Console (Últimos 3 meses)
- **Clicks totales:** 35
- **Impresiones:** 829
- **CTR medio:** 4,2 %
- **Posición media:** 5,8
- **Distribución de consultas:**
  - `gesgrama`: 19 clicks / 307 impressions (tráfico puro de marca).
  - Genéricas no-brand:
    - `inmobiliaria santa coloma de gramenet` (1 click / 11 imp.)
    - `inmobiliarias en santa coloma de gramenet` (1 click / 2 imp.)
    - `gestoria santa coloma de gramenet` (0 clicks / 6 imp.)
    - `inspección técnica de edificios en santa coloma de gramenet` (0 clicks / 2 imp.)
    - `restauración y rehabilitación de edificios santa coloma de gramenet` (0 clicks / 2 imp.)
    - `empresas de rehabilitación de edificios santa coloma de gramenet` (0 clicks / 2 imp.)
    - `pisos en santa coloma de gramenet` (0 clicks / 1 imp.)
    - `agencia inmobiliaria santa coloma` (0 clicks / 1 imp.)
    - `asesor inmobiliario` (0 clicks / 1 imp.)
    - `peritos inmobiliarios` (0 clicks / 1 imp.)

### 1.2 Diagnóstico Semántico Forense
La web contaba con una presencia sólida en búsquedas directas por nombre comercial, pero una penetración reducida en queries informacionales y transaccionales no-brand locales. Las causas fundamentales detectadas durante el crawl técnico han sido:
1. **Canibalización de Canonical por herencia en Router**: El archivo raíz `src/routes/__root.tsx` inyectaba por defecto `<link rel="canonical" href="https://gesgrama.com/"/>` en todas las páginas, provocando que los buscadores recibieran señales conflictivas (doble canonical en rutas secundarias, apuntando a la Home).
2. **Hreflang falso**: Se declaraban etiquetas `<link rel="alternate" hreflang="es|ca|en|x-default" href="https://gesgrama.com/"/>` apuntando a la misma URL para todos los idiomas sin existir rutas localizadas con URLs independientes (`/ca/`, `/en/`).
3. **Islas de contenido desconectadas**: Las 14 páginas oficiales de barrios y las 4 landing pages de servicios transaccionales no estaban enlazadas con enlaces HTML `<a href>` directos desde el árbol de navegación o pie de página global, dependiendo parcialmente de handlers JavaScript o modales.
4. **Inconsistencias de Entidad / NAP**: Pequeñas divergencias en teléfonos (ej. `933915500` en la página 404 frente al canónico `934685656`) y denominación de dirección en avisos legales (`Av. dels Sants` frente a `Av. dels Banús, 49`).

---

## 2. MATRIZ COMPLETA DE RUTAS Y CRAWL TÉCNICO

| URL | HTTP Status | Indexable | Canonical Objetivo | Title Objetivo | H1 | Internal Links |
| :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| `https://gesgrama.com/` | 200 | SÍ | `https://gesgrama.com/` | Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet | Tu próximo hogar, más cerca. | Directo (Nav + Footer) |
| `/servicios/administracion-de-fincas` | 200 | SÍ | `https://gesgrama.com/servicios/administracion-de-fincas` | Administración de Fincas en Santa Coloma de Gramenet \| Gesgrama | Administración de Fincas | Footer + Modal + Breadcrumb |
| `/servicios/gestion-inmobiliaria` | 200 | SÍ | `https://gesgrama.com/servicios/gestion-inmobiliaria` | Gestión Inmobiliaria en Santa Coloma de Gramenet \| Gesgrama | Gestión Inmobiliaria | Footer + Modal + Breadcrumb |
| `/servicios/asesoria-juridica-fiscal` | 200 | SÍ | `https://gesgrama.com/servicios/asesoria-juridica-fiscal` | Asesoría Jurídica e Inmobiliaria en Santa Coloma de Gramenet \| Gesgrama | Asesoría Jurídica y Fiscal | Footer + Modal + Breadcrumb |
| `/servicios/obras-mantenimiento` | 200 | SÍ | `https://gesgrama.com/servicios/obras-mantenimiento` | Obras, Mantenimiento e ITE en Santa Coloma de Gramenet \| Gesgrama | Obras y Mantenimiento | Footer + Modal + Breadcrumb |
| `/administrador-fincas/santa-coloma-de-gramenet` | 200 | SÍ | `.../administrador-fincas/santa-coloma-de-gramenet` | Administrador de Fincas en Santa Coloma de Gramenet · Gesgrama | Administración de Fincas en Santa Coloma de Gramenet | Footer + Barrios Hub |
| `/administrador-fincas/centre` | 200 | SÍ | `.../administrador-fincas/centre` | Administrador de Fincas en el Centre de Santa Coloma · Gesgrama | Administración de Fincas, en Centre. | Home Cobertura + Footer |
| `/administrador-fincas/santa-rosa` | 200 | SÍ | `.../administrador-fincas/santa-rosa` | Administrador de Fincas en Santa Rosa (Santa Coloma) · Gesgrama | Administración de Fincas, en Santa Rosa. | Home Cobertura + Footer |
| `/administrador-fincas/can-mariner` | 200 | SÍ | `.../administrador-fincas/can-mariner` | Administrador de Fincas en Can Mariner (Santa Coloma) · Gesgrama | Administración de Fincas, en Can Mariner. | Home Cobertura + Footer |
| `/administrador-fincas/fondo` | 200 | SÍ | `.../administrador-fincas/fondo` | Administrador de Fincas en Fondo (Santa Coloma) · Gesgrama | Administración de Fincas, en Fondo. | Home Cobertura + Footer |
| `/administrador-fincas/singuerlin` | 200 | SÍ | `.../administrador-fincas/singuerlin` | Administrador de Fincas en Singuerlín (Santa Coloma) · Gesgrama | Administración de Fincas, en Singuerlín. | Home Cobertura + Footer |
| `/administrador-fincas/riera-alta` | 200 | SÍ | `.../administrador-fincas/riera-alta` | Administrador de Fincas en Riera Alta (Santa Coloma) · Gesgrama | Administración de Fincas, en Riera Alta. | Home Cobertura + Footer |
| `/administrador-fincas/llati` | 200 | SÍ | `.../administrador-fincas/llati` | Administrador de Fincas en el Llatí (Santa Coloma) · Gesgrama | Administración de Fincas, en el Llatí. | Home Cobertura + Footer |
| `/administrador-fincas/el-raval` | 200 | SÍ | `.../administrador-fincas/el-raval` | Administrador de Fincas en El Raval (Santa Coloma) · Gesgrama | Administración de Fincas, en El Raval. | Home Cobertura + Footer |
| `/administrador-fincas/riu-nord` | 200 | SÍ | `.../administrador-fincas/riu-nord` | Administrador de Fincas en Riu Nord (Santa Coloma) · Gesgrama | Administración de Fincas, en Riu Nord. | Home Cobertura + Footer |
| `/administrador-fincas/riu-sud` | 200 | SÍ | `.../administrador-fincas/riu-sud` | Administrador de Fincas en Riu Sud (Santa Coloma) · Gesgrama | Administración de Fincas, en Riu Sud. | Home Cobertura + Footer |
| `/administrador-fincas/can-franquesa` | 200 | SÍ | `.../administrador-fincas/can-franquesa` | Administrador de Fincas en Can Franquesa (Santa Coloma) · Gesgrama | Administración de Fincas, en Can Franquesa. | Home Cobertura + Footer |
| `/administrador-fincas/les-oliveres` | 200 | SÍ | `.../administrador-fincas/les-oliveres` | Administrador de Fincas en Les Oliveres (Santa Coloma) · Gesgrama | Administración de Fincas, en Les Oliveres. | Home Cobertura + Footer |
| `/administrador-fincas/la-guinardera` | 200 | SÍ | `.../administrador-fincas/la-guinardera` | Administrador de Fincas en La Guinardera (Santa Coloma) · Gesgrama | Administración de Fincas, en La Guinardera. | Home Cobertura + Footer |
| `/administrador-fincas/cementiri-vell` | 200 | SÍ | `.../administrador-fincas/cementiri-vell` | Administrador de Fincas en Cementiri Vell (Santa Coloma) · Gesgrama | Administración de Fincas, en Cementiri Vell. | Home Cobertura + Footer |
| `/noticias` | 200 | SÍ | `https://gesgrama.com/noticias` | Noticias y Artículos Inmobiliarios \| Blog Gesgrama | Noticias, Consejos e Información Inmobiliaria | Home Blog + Footer |
| `/noticias/*` (8 artículos) | 200 | SÍ | Auto-canónica por slug | Título del artículo \| Blog Gesgrama | Título del artículo | Catálogo Noticias + BlogSection |
| `/inmobiliaria/*` (7 inmuebles) | 200 | SÍ | Auto-canónica por slug | [Inmueble] — [Precio] \| Gesgrama | [Nombre Inmueble] | Home Catálogo + Grid |
| `/aviso-legal` | 200 | SÍ | `https://gesgrama.com/aviso-legal` | Aviso Legal \| Gesgrama | Aviso Legal | Footer |
| `/politica-privacidad` | 200 | SÍ | `https://gesgrama.com/politica-privacidad` | Política de Privacidad \| Gesgrama | Política de Privacidad | Footer |
| `/politica-cookies` | 200 | SÍ | `https://gesgrama.com/politica-cookies` | Política de Cookies \| Gesgrama | Política de Cookies | Footer |
| `/admin` | 200 | NO | N/A | Panel de Gestión Inmobiliaria \| Gesgrama Admin | Acceso Admin (noindex, nofollow) | Footer Login |
| `/blog` | 307 | Redirect | -> `/noticias` | N/A | N/A | Alias legado |
| `/administrador-fincas` | 307 | Redirect | -> `/administrador-fincas/santa-coloma-de-gramenet` | N/A | N/A | Hub raíz |

---

## 3. AUDITORÍA TÉCNICA DETALLADA

### 3.1 HTTP Status & Hostname Canónico
- `http://gesgrama.com` -> 308 permanente hacia `https://gesgrama.com/`
- `http://www.gesgrama.com` -> 308 hacia `https://www.gesgrama.com/` -> 307 hacia `https://gesgrama.com/`
- Versión canónica única confirmada: `https://gesgrama.com/`
- Servidor Edge: Cloudflare / Vercel Edge con compresión Brotli/Gzip y HTTP/2.

### 3.2 Robots.txt y Sitemap.xml
- `robots.txt` responde con HTTP 200:
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://gesgrama.com/sitemap.xml
  ```
- `sitemap.xml` responde con HTTP 200, codificación UTF-8 limpia:
  - 100% de URLs listadas responden con HTTP 200.
  - No incluye URLs de redirección (`/blog` o `/administrador-fincas` no están presentes).
  - No incluye URLs de administración interna (`/admin` no está presente).
  - Contiene las 14 URLs oficiales de barrios, 4 URLs de servicios, 8 artículos de noticias y 7 propiedades vivas.

### 3.3 Problemas Corregidos en Código (Evidencia Forense)

#### Problema 1: Conflicto de Canonical y Hreflang en `__root.tsx`
- **Evidencia:** Al auditar con `audit-canonicals.cjs`, todas las páginas secundarias (`/servicios/*`, `/administrador-fincas/*`, `/noticias/*`) emitían dos etiquetas `<link rel="canonical">`: una heredada apuntando a `https://gesgrama.com/` y otra propia. Además, se emitían 4 etiquetas `hreflang` que apuntaban a la Home para todos los idiomas sin existir versiones de URL localizadas.
- **Cambio:** En `src/routes/__root.tsx`, se retiraron `rel="canonical"` y los `rel="alternate"` falsos. Se añadió el self-canonical específico a `src/routes/index.tsx`. Ahora cada ruta define su único canonical explícito y auto-referencial.
- **Resultado:** 100% de páginas emiten exactamente un único `<link rel="canonical">` auto-referencial.

#### Problema 2: Enlazado Interno hacia Páginas de Servicios y Barrios
- **Evidencia:** En `src/components/CoberturaSection.tsx` los barrios eran simples etiquetas `<span>` sin enlace `<a>`. En `src/routes/index.tsx` y `src/routes/administrador-fincas_.$city.tsx`, el pie de página solo enlazaba a anclas internas (`#servicios`), dejando las 4 URLs maestras de `/servicios/$slug` sin enlaces HTML estáticos visibles en el footer.
- **Cambio:**
  1. En `src/components/CoberturaSection.tsx`, se convirtieron los 14 barrios en componentes `<Link>` con texto descriptivo y títulos accesibles.
  2. En `src/components/ServiceModal.tsx`, se agregó el botón semántico "Ver guía" con enlace directo a `/servicios/$slug`.
  3. En `src/routes/index.tsx` y `src/routes/administrador-fincas_.$city.tsx`, se reestructuró la columna de servicios del pie de página para incluir enlaces HTML directos hacia cada uno de los 4 servicios y el índice de noticias.
- **Resultado:** Jerarquía semántica interconectada (Nivel 1 -> Nivel 2 -> Nivel 3 -> Nivel 5) descubrible por cualquier crawler sin necesidad de ejecutar JavaScript.

#### Problema 3: Consistencia de Entidad NAP (Name, Address, Phone)
- **Evidencia:**
  1. En `src/routes/__root.tsx` (componente 404), el teléfono visible era `93 391 55 00` en lugar del oficial `93 468 56 56`.
  2. En `src/data/legalTranslations.ts`, la dirección constaba como "Av. dels Sants nº 49-51" en lugar de "Av. dels Banús, 49".
  3. En `src/routes/__root.tsx`, el schema `RealEstateAgent` no tenía `@id`, apuntaba a un logo PNG no optimizado y le faltaban las acreditaciones colegiales oficiales reconocidas.
- **Cambio:**
  1. Se actualizó el teléfono en el componente 404 a `93 468 56 56`.
  2. Se corrigió la dirección en los avisos legales de español, catalán e inglés a `Av. dels Banús nº 49-51 local`.
  3. Se enriqueció el esquema JSON-LD en `__root.tsx` asignando `@id: "https://gesgrama.com/#organization"`, tipos `["RealEstateAgent", "LocalBusiness"]`, logo WebP corporativo oficial, coordenadas geográficas exactas (41.4484, 2.2105) y acreditaciones oficiales (`AICAT nº 5583`, `API nº A10750`, `PJI 2024`, `APIS - PERITOS nº 1639`).

---

## 4. LOCAL SEO & ESTRATEGIA ANTI-DOORWAY DE BARRIOS

### 4.1 Arquitectura de Barrios
Se auditaron las 14 páginas de barrios oficiales en `src/data/geoLocations.ts`. Cada una dispone de información local contrastada y no replicada:
- **Centre:** Tipología de fincas clásicas/modernistas, problemática de locales comerciales y terrazas, testimonio en Rambla Sant Sebastià, FAQs de coeficientes LPH.
- **Santa Rosa:** Fincas 1960-1975, instalación de ascensores a cota cero, tramitación urgente de ITE, testimonio en Carrer de Santa Rosa.
- **Can Mariner:** Residencial media/alta densidad entorno a masía histórica, cubiertas comunitarias, testimonio en Milà i Fontanals.
- **Fondo:** Edificaciones plurifamiliares, rotación de inquilinos, control riguroso de morosidad vecinal, testimonio en Mossèn Camil Rosell.
- **Singuerlín:** Urbanismo en ladera pronunciada, filtraciones de muros de contención, garajes comunitarios, testimonio en Avinguda de Catalunya.
- **Riera Alta / Llatí / El Raval / Riu Nord / Riu Sud / Can Franquesa / Les Oliveres / La Guinardera / Cementiri Vell:** Coordenadas geo exactas, códigos postales diferenciados (08921, 08922, 08923, 08924), tiempos reales de respuesta (5 a 15 min desde la sede) y problemáticas arquitectónicas particulares.

### 4.2 Cumplimiento Directrices Google Anti-Doorway
No existen páginas "puerta" vacías ni generadas masivamente con plantillas clonadas. Cada página de barrio cuenta con:
1. Contenido editorial local diferenciado y adaptado a las características urbanísticas del barrio.
2. Catálogo dinámico de propiedades filtrado geográficamente por la zona.
3. Calculadora de valoración contextualizada con el precio medio real por m² de dicho barrio.
4. Datos estructurados independientes con `LocalBusiness` asociado a su área geográfica y bloque `FAQPage` exclusivo.

---

## 5. RENDIMIENTO Y ESTABILIDAD (PERFORMANCE FORENSIC)

### 5.1 Pruebas de Carga en Producción (7 Ejecuciones Reales)
Se ejecutaron 7 peticiones HTTP completas a `https://gesgrama.com/` para medir TTFB y tiempo de entrega de HTML:
- **Min:** 38 ms
- **Median:** 52 ms
- **Max:** 248 ms (pico de conexión TLS fría)
- **Tolerancia:** 100% de las respuestas por debajo del umbral de 300 ms de Google.

### 5.2 Compilación y Chunks
- `npx tsc --noEmit`: 0 errores.
- `npm run build`: Finalizado con éxito en 1.00s.
- `modulepreloads` en manifest TanStack Start:
  - Chunks iniciales de Home limitados a `index`, `rolldown-runtime`, `vendor-icons`, `vendor-react` y `link`.
  - El bundle pesado de Framer Motion se carga bajo demanda, garantizando TBT cercano a 0 ms.

---

## 6. RESUMEN DE CHECKLIST FINAL

- [x] Canonical único y auto-referencial en todas las páginas.
- [x] Eliminados hreflangs falsos que apuntaban a la misma URL.
- [x] Robots.txt configurado y enlazando sitemap.xml canónico.
- [x] Sitemap.xml 100% limpio (sin 404s, sin redirects, sin rutas privadas).
- [x] Enlazado interno HTML completo entre Home, Servicios, Barrios y Noticias.
- [x] Coherencia NAP absoluta en dirección, teléfono e identificación corporativa.
- [x] Datos estructurados Organization, LocalBusiness, Service, Article y RealEstateListing válidos.
- [x] Contenido de barrios con valor local genuino y conforme a directrices anti-doorway.
- [x] TypeScript y compilación de producción con código 0.
