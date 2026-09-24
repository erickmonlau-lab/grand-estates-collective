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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // Cache SSR HTML at Vercel Edge CDN for the home page to cut TTFB
      const url = new URL(request.url);
      if (
        request.method === "GET" &&
        url.pathname === "/" &&
        normalized.status === 200 &&
        (normalized.headers.get("content-type") ?? "").includes("text/html")
      ) {
        let htmlBody = await normalized.text();

        // Extract LCP image preload links and hoist them to the very top of <head>
        // so mobile browsers begin streaming the hero image before downloading JS modules
        const lcpMobileMatch = htmlBody.match(/<link[^>]+family_barcelona_mobile_lcp[^>]+>/i);
        const lcpDesktopMatch = htmlBody.match(/<link[^>]+family_barcelona_desktop_opt[^>]+>/i);

        if (lcpMobileMatch && lcpDesktopMatch) {
          // Remove existing instances from the tail of <head>
          htmlBody = htmlBody.replace(lcpMobileMatch[0], "");
          htmlBody = htmlBody.replace(lcpDesktopMatch[0], "");

          // Insert right after <head>
          const topPreloads = `${lcpMobileMatch[0]}${lcpDesktopMatch[0]}`;
          htmlBody = htmlBody.replace("<head>", `<head>${topPreloads}`);
        }

        const headers = new Headers(normalized.headers);
        // Instruct Vercel Edge CDN to keep the rendered HTML cached for 1 day,
        // allowing background revalidation for 7 days, avoiding cold-start SSR.
        headers.set(
          "Cache-Control",
          "public, s-maxage=86400, stale-while-revalidate=604800",
        );
        headers.set(
          "CDN-Cache-Control",
          "public, s-maxage=86400, stale-while-revalidate=604800, stale-if-error=604800",
        );
        headers.set(
          "Vercel-CDN-Cache-Control",
          "public, s-maxage=86400, stale-while-revalidate=604800, stale-if-error=604800",
        );
        return new Response(htmlBody, {
          status: normalized.status,
          headers,
        });
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
