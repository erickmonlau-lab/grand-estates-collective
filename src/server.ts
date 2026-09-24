import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

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

// Cloudflare execution context type
type CfCtx = { waitUntil: (p: Promise<unknown>) => void };

// Cache the home page SSR HTML at Cloudflare edge using Cache API.
// Cloudflare Workers ignore s-maxage on Worker responses — must use caches.default explicitly.
const HOME_CACHE_TTL = 3600; // 1 hour

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const url = new URL(request.url);
      const isHomeGet =
        request.method === "GET" &&
        url.pathname === "/" &&
        !request.headers.has("cookie");

      if (isHomeGet) {
        // Try to serve from Cloudflare edge cache first
        const cache = (caches as unknown as { default: Cache }).default;
        const cacheKey = new Request(url.toString(), { method: "GET" });
        const cached = await cache.match(cacheKey);
        if (cached) return cached;

        // Cache miss — do SSR, then store result
        const response = await handler.fetch(request, env, ctx);
        const normalized = await normalizeCatastrophicSsrResponse(response);

        if (
          normalized.status === 200 &&
          (normalized.headers.get("content-type") ?? "").includes("text/html")
        ) {
          const headers = new Headers(normalized.headers);
          headers.set("Cache-Control", `public, max-age=${HOME_CACHE_TTL}`);
          const toCache = new Response(normalized.clone().body, {
            status: normalized.status,
            headers,
          });
          (ctx as CfCtx).waitUntil(cache.put(cacheKey, toCache));
        }

        return normalized;
      }

      const response = await handler.fetch(request, env, ctx);
      return normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
