import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

// Import CSS as a URL string so Vite processes and hashes it, but TanStack Start
// does NOT auto-inject a render-blocking <link rel="stylesheet"> via HeadContent.
// We inject the <link> manually in RootShell below with media="print" + onLoad
// so the CSS is non-blocking while still being preloaded at high priority.
import cssHref from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { ArrowLeft, Home, Phone, Building2, RefreshCw } from "lucide-react";
import { FooterMascot } from "../components/FooterMascot";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0b172a] via-[#0f2142] to-[#0b172a] px-4 py-12 text-center text-white relative overflow-hidden font-sans">
      {/* Background Decorative Blur Rings */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto flex flex-col items-center relative z-10 w-full">
        {/* Brand Logo */}
        <Link to="/" className="mb-6 hover:opacity-90 transition-opacity">
          <img
            src="/images/logo-gesgrama-text-horizontal.webp"
            alt="Gesgrama"
            width={212}
            height={52}
            className="h-9 sm:h-11 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* Friendly Waving Mascot */}
        <div className="w-48 sm:w-56 h-auto mb-2 drop-shadow-[0_10px_25px_rgba(37,99,235,0.3)]">
          <FooterMascot className="w-full h-auto object-contain" />
        </div>

        {/* 404 Big Badge */}
        <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs sm:text-sm font-black tracking-widest uppercase px-4 py-1.5 rounded-xl shadow-lg mb-4">
          <span>Error 404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 leading-tight text-balance">
          Página no encontrada
        </h1>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-md font-bold leading-relaxed mb-8 text-balance">
          La página que buscas no existe, ha cambiado de dirección o está temporalmente fuera de servicio.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4 text-white" />
            <span>Volver al inicio</span>
          </a>

          <a
            href="/#propiedades"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Ver inmuebles</span>
          </a>
        </div>

        {/* Quick Help Line */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-400">
          <span>¿Necesitas ayuda directa?</span>
          <a
            href="tel:933915500"
            className="text-white hover:text-blue-400 underline font-black inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>93 391 55 00</span>
          </a>
        </div>
      </div>
    </main>
  );
}

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    reportLovableError(error, { component: "RootErrorComponent" });
    console.error("Gesgrama Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0b172a] via-[#0f2142] to-[#0b172a] px-4 py-12 text-center text-white relative overflow-hidden font-sans">
      {/* Background Decorative Blur Rings */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto flex flex-col items-center relative z-10 w-full">
        {/* Brand Logo */}
        <a href="/" className="mb-6 hover:opacity-90 transition-opacity">
          <img
            src="/images/logo-gesgrama-text-horizontal.webp"
            alt="Gesgrama"
            width={212}
            height={52}
            className="h-9 sm:h-11 w-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Friendly Mascot */}
        <div className="w-40 sm:w-48 h-auto mb-2 drop-shadow-[0_10px_25px_rgba(37,99,235,0.3)]">
          <FooterMascot className="w-full h-auto object-contain" />
        </div>

        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase px-4 py-1.5 rounded-xl shadow-lg mb-4">
          <span>Incidencia temporal</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-tight text-balance">
          Ha ocurrido un imprevisto al cargar la página
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-md font-bold leading-relaxed mb-8 text-balance">
          Estamos actualizando los servicios en directo. Puedes volver a intentar la conexión o regresar a la página principal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              if (reset) reset();
              window.location.reload();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            <span>Recargar página</span>
          </button>

          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Volver al inicio</span>
          </a>
        </div>

        {/* Direct Phone Assistance */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-400">
          <span>Atención al cliente:</span>
          <a
            href="tel:934685656"
            className="text-white hover:text-blue-400 underline font-black inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>93 468 56 56</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { title: "Gesgrama — Administración de Fincas, Inmobiliaria y Asesoría Jurídica en Santa Coloma de Gramenet" },
      { name: "description", content: "Gesgrama: administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana. +15 años de experiencia, +300 comunidades gestionadas." },
      { property: "og:url", content: "https://www.gesgrama.es/" },
      { property: "og:title", content: "Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet" },
      { property: "og:description", content: "Gestión profesional, transparente y cercana para tu comunidad y propiedad en Santa Coloma de Gramenet y área metropolitana." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Gesgrama" },
      { property: "og:image", content: "https://www.gesgrama.es/og-image.png" },
      { property: "og:image:secure_url", content: "https://www.gesgrama.es/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet" },
      { name: "twitter:description", content: "Gestión profesional de comunidades, compraventa de pisos y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana." },
      { name: "twitter:image", content: "https://www.gesgrama.es/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "es", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "ca", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "en", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://www.gesgrama.es/" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico?v=2027", sizes: "any" },
      { rel: "icon", href: "/favicon-48x48.png?v=2027", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2027", sizes: "180x180" },
      { rel: "shortcut icon", href: "/favicon.ico?v=2027" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Gesgrama",
          "alternateName": "Gesgrama Gestiones Inmobiliarias y Administración de Fincas",
          "description": "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana.",
          "url": "https://www.gesgrama.es",
          "logo": "https://www.gesgrama.es/logo.png",
          "image": "https://www.gesgrama.es/og-image.png",
          "telephone": "+34934685656",
          "email": "info@gesgrama.com",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. dels Banús, 49",
            "addressLocality": "Santa Coloma de Gramenet",
            "postalCode": "08923",
            "addressRegion": "Barcelona",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.4511,
            "longitude": 2.2144
          },
          "areaServed": [
            "Santa Coloma de Gramenet",
            "Centre (Santa Coloma)",
            "Singuerlín",
            "Santa Rosa - Can Mariner",
            "Fondo",
            "Riera Alta - Llatí",
            "El Raval (Santa Coloma)",
            "Riu Nord",
            "Riu Sud",
            "Oliveres",
            "Can Serra",
            "Badalona",
            "Área Metropolitana de Barcelona"
          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "hasCredential": "AICAT nº 5583",
          "sameAs": [
            "https://www.gesgrama.es"
          ]
        })
      }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        {/*
          ── CRITICAL CSS ──────────────────────────────────────────────────────
          Inlined CSS that covers exactly what is visible above the fold:
            • Tailwind base reset (box-sizing, margin, overflow)
            • Body / html base styles matching styles.css @layer base
            • Navbar: fixed pill, background color, text colors, layout
            • Hero: background, min-height, layout
            • SVG guard (prevent icons exploding to 100vw before full CSS loads)
          This eliminates FOUC completely while allowing the full stylesheet
          to load asynchronously (non-blocking), keeping FCP fast.
          ─────────────────────────────────────────────────────────────────────
        */}
        <style dangerouslySetInnerHTML={{ __html: `
*,::before,::after{box-sizing:border-box}
html{font-size:clamp(15px,.4vw + 14px,18px);-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:#F8FAFC;overflow-x:hidden;width:100%;font-family:"AG Book Rounded",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
h1,h2{font-family:"Aachen BT",Georgia,serif}
svg{max-width:100%;height:auto}
svg:not([width]):not([class*="w-"]){width:24px;height:24px}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}
/* Navbar pill */
nav[class*="fixed"]{position:fixed;top:.625rem;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;justify-content:space-between;width:calc(100% - 20px);max-width:1360px;background:rgba(15,23,42,.95);border:1px solid rgba(51,65,85,.8);border-radius:9999px;padding:.5rem .875rem;color:#fff;gap:.75rem}
@media(min-width:640px){nav[class*="fixed"]{top:.875rem;padding:.625rem 1.25rem}}
/* Hero section */
section#hero{position:relative;min-height:100svh;background:#F8FAFC;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding-top:4.5rem;padding-left:1rem;padding-right:1rem}
@media(min-width:640px){section#hero{padding-top:6rem;padding-left:2rem;padding-right:2rem}}
@media(min-width:1024px){section#hero{padding-top:7rem;padding-left:3rem;padding-right:3rem}}
/* Announcement banner above navbar */
div[class*="marquee"]{overflow:hidden}
/* Prevent layout shift on images with known dimensions */
img[width][height]{height:auto}
        ` }} />
        {/*
          Full stylesheet loads asynchronously (non-blocking).
          media="print" tells the browser not to block rendering on this sheet.
          onLoad switches it to media="all" once downloaded, applying all styles.
          The critical CSS above ensures the page already looks correct by then.
          React SSR + client both render this identically → no hydration mismatch.
        */}
        <link rel="preload" href={cssHref} as="style" fetchPriority="high" />
        <link
          rel="stylesheet"
          href={cssHref}
          media="print"
          onLoad={(e) => {
            (e.currentTarget as HTMLLinkElement).media = "all";
          }}
        />
        {/* Fallback: if JS is disabled, load stylesheet normally */}
        <noscript><link rel="stylesheet" href={cssHref} /></noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
