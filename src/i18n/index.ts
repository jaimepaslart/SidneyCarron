import { fr, type TranslationKey } from './fr';
import { en } from './en';

const translations = { fr, en } as const;
type Lang = keyof typeof translations;

export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname;
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return 'fr';
}

export function getTranslation(lang: Lang) {
  return function t(key: TranslationKey, params?: Record<string, string | number>): string {
    let text = translations[lang][key] || translations.fr[key] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  const cleanPath = path.replace(/^\/en/, '').replace(/^\/$/, '') || '/';
  if (lang === 'en') {
    return cleanPath === '/' ? '/en/' : `/en${cleanPath}`;
  }
  return cleanPath;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}

export type { Lang, TranslationKey };
