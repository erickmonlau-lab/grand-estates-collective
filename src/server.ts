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

/**
 * Uses Cloudflare HTMLRewriter to make the main Vite CSS non-render-blocking.
 *
 * Conservative approach to avoid React 19 hydration conflicts:
 * - Adds a high-priority <link rel="preload"> BEFORE the stylesheet so the browser
 *   downloads CSS immediately at full priority.
 * - Sets media="print" + onload on the stylesheet so it doesn't block the render
 *   pipeline (the browser still downloads it, just doesn't block painting).
 * - Does NOT add <noscript> or extra elements that could confuse React's head
 *   resource reconciliation during hydration.
 * - React 19 uses suppressHydrationWarning on stylesheet links, so it tolerates
 *   the extra media="print" attribute without throwing a hydration error.
 *
 * HTMLRewriter processes the response as a stream — no buffering, no TBT impact.
 */
function applyCssOptimizations(response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") || response.status !== 200) return response;

  // Minimal critical CSS painted on first byte so the hero background is visible
  // immediately — prevents the blank white flash before the full CSS activates.
  const CRITICAL_CSS =
    `<style id="__c">` +
    `*,::before,::after{box-sizing:border-box}` +
    `body{margin:0;background:#F8FAFC;overflow-x:hidden}` +
    `</style>`;

  return new HTMLRewriter()
    // ── Inject critical CSS at end of <head> ─────────────────────────────────
    .on("head", {
      element(el) {
        el.append(CRITICAL_CSS, { html: true });
      },
    })
    // ── Convert render-blocking asset stylesheets to non-blocking ─────────────
    // Selector: only Vite asset CSS (href contains /assets/ and ends with .css)
    .on('link[rel="stylesheet"][href*="/assets/"]', {
      element(el) {
        const href = el.getAttribute("href");
        if (!href || !href.endsWith(".css")) return;

        // Insert high-priority preload BEFORE the link so the browser downloads
        // the CSS at full network priority (without this, media=print lowers it).
        el.before(
          `<link rel="preload" href="${href}" as="style" fetchpriority="high">`,
          { html: true },
        );

        // Change the stylesheet to media="print" so it does not block rendering.
        // onload switches it back to "all" once the download finishes.
        // React 19 has suppressHydrationWarning on this element and will not
        // overwrite these attributes during client hydration.
        el.setAttribute("media", "print");
        el.setAttribute("onload", "this.media='all'");
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
