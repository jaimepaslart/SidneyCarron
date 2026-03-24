import type { Lang } from '@/i18n';
import settingsData from '../data/settings.yaml';
import aboutData from '../data/about.yaml';
import homeData from '../data/home.yaml';

export const SITE_URL = 'https://sidneycarron.com';

// ─── Settings singleton (src/data/settings.yaml) ───
interface Settings {
  artistName: string;
  email: string;
  heroImage: string;
  logo: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  defaultSeo: {
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    ogImage: string;
  };
}

export function getSettings(): Settings {
  return settingsData as Settings;
}

// ─── About singleton (src/data/about.yaml) ───
interface AboutData {
  portrait: string;
  intro_fr: string;
  intro_en: string;
  bio_fr: string;
  bio_en: string;
  statement_fr: string;
  statement_en: string;
  cv: { year: string; text_fr: string; text_en: string }[];
  pdf_bio?: string;
  pdf_exhibitions?: string;
  pdf_poem?: string;
}

export function getAbout(): AboutData {
  return aboutData as AboutData;
}

// ─── Home singleton (src/data/home.yaml) ───
interface HomeData {
  hero_statement_fr: string;
  hero_statement_en: string;
  hero_subtitle_fr: string;
  hero_subtitle_en: string;
  featured_locations: string[];
}

export function getHome(): HomeData {
  return homeData as HomeData;
}

// ─── Localize helper ───
export function localize<T>(lang: Lang, fr: T, en: T): T {
  return lang === 'en' ? en : fr;
}
