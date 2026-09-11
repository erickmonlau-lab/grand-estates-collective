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

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });

    // Handle Vite/TanStack chunk mismatch after a new deployment:
    const msg = (error?.message || String(error)).toLowerCase();
    const isChunkError =
      msg.includes("failed to fetch dynamically imported module") ||
      msg.includes("dynamically imported module") ||
      msg.includes("loading chunk") ||
      msg.includes("loading css chunk") ||
      msg.includes("error loading module");

    if (isChunkError && typeof window !== "undefined") {
      const lastReload = sessionStorage.getItem("chunk_reload_timestamp");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem("chunk_reload_timestamp", String(now));
        window.location.reload();
        return;
      }
    }
  }, [error]);

  const handleReload = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("chunk_reload_timestamp");
      window.location.href = "/";
    } else {
      router.invalidate();
      reset();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 font-sans">
          Cargando Gesgrama...
        </h1>
        <p className="mt-2 text-sm text-slate-600 font-medium leading-relaxed">
          Sincronizando la última versión de la web.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={handleReload}
            className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Entrar a la web
          </button>
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
      { rel: "canonical", href: "https://www.gesgrama.es/" },
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
