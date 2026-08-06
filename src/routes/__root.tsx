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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-4 p-4 bg-red-100 text-red-900 rounded-md text-left overflow-auto text-xs break-words">
          <strong>Error:</strong> {error?.message || String(error)}
          <br />
          <pre className="mt-2 whitespace-pre-wrap">{error?.stack}</pre>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
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
      { rel: "canonical", href: "https://www.gesgrama.es/" },
      { rel: "preload", href: "/fonts/AachenBT-Bold.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/AGBookRounded-Medium.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "stylesheet", href: appCss },
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
          "alternateName": "Gesgrama Gestiones Inmobiliarias",
          "description": "Administración de fincas, inmobiliaria y asesoría jurídica en Santa Coloma de Gramenet y área metropolitana.",
          "url": "https://www.gesgrama.es",
          "logo": "https://www.gesgrama.es/logo.png",
          "image": "https://www.gesgrama.es/og-image.png",
          "telephone": "+34934685656",
          "email": "info@gesgrama.com",
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
  errorComponent: ErrorComponent,
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
