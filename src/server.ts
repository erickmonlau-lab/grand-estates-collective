import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
// Build-time URL of the processed CSS bundle (hash changes per build)
import cssUrl from "./styles.css?url";
// Critical above-the-fold CSS — inlined to eliminate render-blocking CSS
import { criticalCss } from "./lib/critical-css";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // ── Home page: inline critical CSS + make full CSS non-blocking ────────
      // This is done AFTER Nitro/React renders HTML, so React is unaware of it.
      // React reconciles on hydration, but by then the full CSS is already cached.
      const url = new URL(request.url);
      if (
        request.method === "GET" &&
        url.pathname === "/" &&
        normalized.status === 200 &&
        (normalized.headers.get("content-type") ?? "").includes("text/html")
      ) {
        const html = await normalized.text();

        // Find the blocking CSS link injected by Vite/TanStack Start (with data-precedence or any attributes)
        const cssLinkRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']+\.css[^"']*["'][^>]*\/?>/i;

        // Non-blocking replacement:
        //  1. <style> with critical CSS renders immediately (no network request)
        //  2. <link rel="preload"> starts full CSS download in parallel (non-blocking)
        //  3. Inline <script> appends <link rel="stylesheet"> dynamically (async — never blocks render)
        //  4. <noscript> fallback for JS-disabled browsers
        const nonBlocking = [
          `<style>${criticalCss}</style>`,
          `<link rel="preload" href="${cssUrl}" as="style">`,
          `<script>(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${cssUrl}';document.head.appendChild(l);})();</script>`,
          `<noscript><link rel="stylesheet" href="${cssUrl}"></noscript>`,
        ].join("");

        const transformed = cssLinkRegex.test(html)
          ? html.replace(cssLinkRegex, nonBlocking)
          : html;

        const headers = new Headers(normalized.headers);
        headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
        // Remove Content-Length — body size changed after transformation
        headers.delete("content-length");

        return new Response(transformed, { status: normalized.status, headers });
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
