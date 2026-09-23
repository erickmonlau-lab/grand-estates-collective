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

// Minimal critical CSS: only what is needed to paint the above-the-fold hero
// before the full 184 kB stylesheet finishes loading.
const CRITICAL_CSS = `<style id="__c">*,::before,::after{box-sizing:border-box}body{margin:0;background:#F8FAFC;overflow-x:hidden}</style>`;

/**
 * Uses Cloudflare's native HTMLRewriter API to transform the SSR response
 * STREAM — no buffering, no latency cost, no TBT impact.
 *
 * What it does:
 * 1. Injects minimal critical CSS into <head> so first paint is not blank.
 * 2. Converts every render-blocking /assets/*.css stylesheet link to the
 *    preload + non-blocking pattern so the browser can paint immediately.
 *
 * HTMLRewriter processes the response byte-by-byte as it streams from
 * TanStack Start's React SSR, so streaming and TBT are completely unaffected.
 */
function applyCssOptimizations(response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") || response.status !== 200) return response;

  return new HTMLRewriter()
    // ── 1. Inject critical inline CSS at end of <head> ──────────────────────
    .on("head", {
      element(el) {
        el.append(CRITICAL_CSS, { html: true });
      },
    })
    // ── 2. Convert render-blocking asset CSS to non-blocking ─────────────────
    // Selector targets: <link rel="stylesheet" href="/assets/...css">
    // Works regardless of extra attributes (crossorigin, nonce, etc.)
    .on('link[rel="stylesheet"][href*="/assets/"]', {
      element(el) {
        const href = el.getAttribute("href");
        if (!href || !href.endsWith(".css")) return;

        // a) Insert preload hint BEFORE the existing link tag
        //    → browser discovers & downloads CSS immediately, at high priority
        el.before(
          `<link rel="preload" href="${href}" as="style" fetchpriority="high">`,
          { html: true },
        );

        // b) Change the existing link to media="print" so it doesn't block render.
        //    onload flips it back to "all" once the CSS has been downloaded.
        el.setAttribute("media", "print");
        el.setAttribute("onload", "this.media='all'");

        // c) <noscript> fallback for visitors with JS disabled
        el.after(
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
          { html: true },
        );
      },
    })
    .transform(response);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applyCssOptimizations(normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
