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
 * Transforms the SSR HTML response at the server level to:
 * 1. Convert render-blocking /assets/*.css links to non-blocking preload pattern.
 * 2. Inject minimal critical inline CSS so first paint shows the page background
 *    (prevents FOUC while the full stylesheet loads asynchronously).
 *
 * WHY SERVER LEVEL: A client-side JS fix fires too late — the browser's preload
 * scanner discovers the <link rel="stylesheet"> in the raw HTML and immediately
 * blocks the render pipeline before any JS ever runs.
 */
async function makeCssNonBlocking(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  // Only transform 200 HTML page responses
  if (!contentType.includes("text/html") || response.status !== 200) return response;

  let body: string;
  try {
    body = await response.text();
  } catch {
    return response;
  }

  // Quick bail-out: nothing to transform
  if (!body.includes("/assets/") || !body.includes("stylesheet")) return response;

  // Minimal critical CSS inlined to paint page background on first byte.
  // Prevents the blank white flash while the full 184 kB CSS downloads.
  const CRITICAL_CSS = [
    '<style id="__critical">',
    "*,::before,::after{box-sizing:border-box;margin:0;padding:0}",
    "html{-webkit-text-size-adjust:100%}",
    "body{background:#F8FAFC;overflow-x:hidden}",
    'h1,h2{font-family:"Aachen BT",Georgia,serif}',
    "</style>",
  ].join("");

  // Matches <link ... rel="stylesheet" ... href="/assets/xxx.css" ...>
  // Works regardless of attribute order (TanStack Start uses different orders in SSR).
  const BLOCKING_CSS_RE = /<link\b([^>]*?)\brel=(["'])stylesheet\2([^>]*?)>/gi;

  const transformed = body
    // Step 1: Inject critical CSS before </head>
    .replace("</head>", CRITICAL_CSS + "</head>")
    // Step 2: Convert every render-blocking /assets/ stylesheet to non-blocking
    .replace(BLOCKING_CSS_RE, (_match, before: string, _q: string, after: string) => {
      const allAttrs = before + " " + after;
      const hrefMatch = allAttrs.match(/\bhref=(["'])(\/assets\/[^"']+\.css[^"']*)\1/i);
      if (!hrefMatch) return _match; // Not an asset CSS — leave untouched

      const href = hrefMatch[2];

      // Build non-blocking tag: keep all original attributes, set media=print + onload
      const beforeTrimmed = before.trim();
      const afterTrimmed = after
        .replace(/\bmedia=(["'])[^"']*\1/gi, "") // remove any existing media attr
        .trim();

      const nonBlockTag =
        `<link` +
        (beforeTrimmed ? ` ${beforeTrimmed}` : "") +
        ` rel="stylesheet"` +
        (afterTrimmed ? ` ${afterTrimmed}` : "") +
        ` media="print" onload="this.media='all'">`;

      return (
        // Preload hint: browser downloads CSS immediately without blocking render
        `<link rel="preload" href="${href}" as="style" fetchpriority="high">` +
        // Non-blocking stylesheet: activates after download
        nonBlockTag +
        // <noscript> fallback for JS-disabled environments
        `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      );
    });

  const headers = new Headers(response.headers);
  headers.delete("content-length"); // Body length changed — remove stale header
  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await makeCssNonBlocking(normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
