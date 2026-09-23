// Minimal type declarations for Cloudflare Workers APIs used in src/server.ts.
// Only HTMLRewriter is declared here — adding @cloudflare/workers-types globally
// would conflict with existing DOM types in the project.

interface HTMLRewriterElementContentHandlers {
  element?(element: {
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
    before(content: string, options?: { html?: boolean }): void;
    after(content: string, options?: { html?: boolean }): void;
    prepend(content: string, options?: { html?: boolean }): void;
    append(content: string, options?: { html?: boolean }): void;
    replace(content: string, options?: { html?: boolean }): void;
    remove(): void;
    readonly tagName: string;
  }): void | Promise<void>;
  text?(text: {
    readonly text: string;
    readonly lastInTextNode: boolean;
    before(content: string, options?: { html?: boolean }): void;
    after(content: string, options?: { html?: boolean }): void;
    replace(content: string, options?: { html?: boolean }): void;
    remove(): void;
  }): void | Promise<void>;
  comments?(comment: {
    text: string;
    before(content: string, options?: { html?: boolean }): void;
    after(content: string, options?: { html?: boolean }): void;
    replace(content: string, options?: { html?: boolean }): void;
    remove(): void;
  }): void | Promise<void>;
}

declare class HTMLRewriter {
  constructor();
  on(selector: string, handlers: HTMLRewriterElementContentHandlers): HTMLRewriter;
  onDocument(handlers: HTMLRewriterElementContentHandlers): HTMLRewriter;
  transform(response: Response): Response;
}
