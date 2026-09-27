import { en, type Dictionary } from "./dictionaries/en";
import { hi } from "./dictionaries/hi";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";
