// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      port: 8095,
      strictPort: true,
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split heavy animation library into its own async chunk
            if (id.includes('framer-motion')) return 'vendor-motion';
            // Split icon library into its own async chunk
            if (id.includes('lucide-react')) return 'vendor-icons';
            // Split all Radix UI primitives together
            if (id.includes('@radix-ui')) return 'vendor-radix';
            // Split React core
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react';
          },
        },
      },
    },
  },
});
