import { translationsEs, type TranslationSchema } from "./translations-es";

let caCache: TranslationSchema | null = null;
let enCache: TranslationSchema | null = null;

// Async loaders for on-demand language hydration
export async function loadLanguage(lang: "es" | "ca" | "en"): Promise<TranslationSchema> {
  if (lang === "ca") {
    if (!caCache) {
      const mod = await import("./translations-ca");
      caCache = mod.translationsCa as unknown as TranslationSchema;
    }
    return caCache;
  }
  if (lang === "en") {
    if (!enCache) {
      const mod = await import("./translations-en");
      enCache = mod.translationsEn as unknown as TranslationSchema;
    }
    return enCache;
  }
  return translationsEs;
}

// Synchronous translations accessor:
// - ES is bundled directly for zero-latency SSR & first frame
// - CA / EN return loaded translations if available, or fall back seamlessly to ES
export const translations: {
  es: TranslationSchema;
  ca: TranslationSchema;
  en: TranslationSchema;
} = {
  es: translationsEs,
  get ca() {
    return caCache || translationsEs;
  },
  get en() {
    return enCache || translationsEs;
  }
};

export type { TranslationSchema };
