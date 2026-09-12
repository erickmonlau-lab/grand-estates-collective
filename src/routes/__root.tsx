import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?inline";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { ArrowLeft, Home, Phone, Building2 } from "lucide-react";
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
      { property: "og:image", content: "https://grand-estates-collective.vercel.app/og-image.png" },
      { property: "og:image:secure_url", content: "https://grand-estates-collective.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gesgrama — Inmobiliaria y Administración de Fincas en Santa Coloma de Gramenet" },
      { name: "twitter:description", content: "Gestión profesional de comunidades, compraventa de pisos y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana." },
      { name: "twitter:image", content: "https://grand-estates-collective.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "preload", href: "/fonts/AachenBT-Bold.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
      { rel: "preload", href: "/fonts/AGBookRounded-Medium.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
      { rel: "canonical", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "es", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "ca", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "en", href: "https://www.gesgrama.es/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://www.gesgrama.es/" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico?v=2027", sizes: "any" },
      { rel: "icon", href: "/favicon-48x48.png?v=2027", type: "image/png", sizes: "48x48" },
      { rel: "icon", href: "/favicon-192x192.png?v=2027", type: "image/png", sizes: "192x192" },
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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148",
            "bestRating": "5",
            "worstRating": "1"
          },
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
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: appCss }} />
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
