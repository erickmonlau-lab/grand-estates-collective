import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BUSINESS } from "@/config/business";
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

import "../styles.css";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { ArrowLeft, Home, Phone, Building2, RefreshCw } from "lucide-react";
import { FooterMascot } from "../components/FooterMascot";
import heroBgDesktop from "@/assets/family_barcelona_desktop_opt.webp";

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
              try {
                if ('caches' in window) {
                  caches.keys().then(names => names.forEach(name => caches.delete(name)));
                }
                sessionStorage.clear();
              } catch (_) {}
              if (reset) reset();
              window.location.href = window.location.pathname + '?_t=' + Date.now();
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
      { title: "Gesgrama · Inmobiliaria y Fincas en Santa Coloma de Gramenet" },
      { name: "description", content: "Gesgrama: administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana. +15 años de experiencia, +300 comunidades gestionadas." },
      { property: "og:url", content: "https://gesgrama.com/" },
      { property: "og:title", content: "Gesgrama · Inmobiliaria y Fincas en Santa Coloma de Gramenet" },
      { property: "og:description", content: "Gestión profesional, transparente y cercana para tu comunidad y propiedad en Santa Coloma de Gramenet y área metropolitana." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Gesgrama" },
      { property: "og:image", content: "https://gesgrama.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://gesgrama.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gesgrama · Inmobiliaria y Fincas en Santa Coloma de Gramenet" },
      { name: "twitter:description", content: "Gestión profesional de comunidades, compraventa de pisos y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana." },
      { name: "twitter:image", content: "https://gesgrama.com/og-image.png" },
    ],
    links: [
      // ── Hero image preloads ───────────────────────────────────────────────
      // Emblem badge: first image rendered in hero eyebrow on ALL viewports (LCP candidate on mobile)

      // Desktop hero photo (hidden on mobile via CSS)
      { rel: "preload", href: heroBgDesktop, as: "image", type: "image/webp", media: "(min-width: 641px)", fetchpriority: "high" as any },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as any },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@500;600;700;800;900&display=swap" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico?v=2027", sizes: "any" },
      { rel: "icon", href: "/favicon-48x48.png?v=2027", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2027", sizes: "180x180" },
      { rel: "shortcut icon", href: "/favicon.ico?v=2027" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://gesgrama.com/#website",
            "url": "https://gesgrama.com",
            "name": "Gesgrama",
            "description": "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet",
            "publisher": {
              "@id": "https://gesgrama.com/#organization"
            },
            "inLanguage": ["es", "ca", "en"]
          },
          {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": "https://gesgrama.com/#organization",
            "name": BUSINESS.name,
            "legalName": BUSINESS.legalName,
            "description": "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana. Más de 15 años de experiencia y +300 comunidades gestionadas.",
            "url": BUSINESS.siteDomain,
            "logo": "https://gesgrama.com/images/logo-gesgrama-text-horizontal.webp",
            "image": "https://gesgrama.com/og-image.png",
            "telephone": BUSINESS.phone,
            "email": BUSINESS.email,
            "priceRange": "€€",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": BUSINESS.address.street,
              "addressLocality": BUSINESS.address.city,
              "postalCode": BUSINESS.address.postalCode,
              "addressRegion": BUSINESS.address.region,
              "addressCountry": BUSINESS.address.countryCode
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": BUSINESS.address.geo.latitude,
              "longitude": BUSINESS.address.geo.longitude
            },
            // TODO: aggregateRating omitido hasta confirmación de nota y número de reseñas reales de Google
            "openingHoursSpecification": BUSINESS.openingHours.schema.map(item => ({
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": item.dayOfWeek,
              "opens": item.opens,
              "closes": item.closes
            })),
            "areaServed": {
              "@type": "City",
              "name": BUSINESS.serviceArea.city
            },
            "hasCredential": [
              BUSINESS.registrations.aicat,
              BUSINESS.registrations.api,
              "Peritos Judiciales Inmobiliarios PJI 2024",
              "APIS - PERITOS nº 1639"
            ],
            // TODO: Agregar URL de GBP oficial en sameAs una vez facilitada
            "sameAs": [
              "https://habitatge.gencat.cat/ca/inici/",
              "https://www.apicatalunya.com/"
            ]
          }
        ])
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
