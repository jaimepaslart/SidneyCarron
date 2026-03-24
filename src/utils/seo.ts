import { SITE_URL, getSettings } from './site';
import type { Lang } from '@/i18n';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbs(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sidney Carron', item: SITE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: item.url } : {}),
      })),
    ],
  };
}

export function buildPersonSchema(lang: Lang) {
  const settings = getSettings();
  const sameAs = [
    settings.socials.instagram,
    settings.socials.facebook,
    settings.socials.linkedin,
    settings.socials.youtube,
  ].filter(Boolean);

  return {
    '@type': 'Person',
    name: settings.artistName,
    jobTitle: lang === 'en'
      ? 'Visual Artist & Photographer'
      : 'Artiste — Empreintes solaires',
    description: lang === 'en'
      ? settings.defaultSeo.description_en
      : settings.defaultSeo.description_fr,
    url: SITE_URL,
    image: `${SITE_URL}${settings.defaultSeo.ogImage}`,
    email: settings.email,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildExhibitionStatusBadge(
  status: string,
  t: (key: string) => string,
): { label: string; className: string } {
  switch (status) {
    case 'current':
      return { label: t('exhibitions.current_badge'), className: 'bg-text text-white' };
    case 'upcoming':
      return { label: t('exhibitions.upcoming_badge'), className: 'bg-secondary text-white' };
    default:
      return { label: t('exhibitions.past_badge'), className: 'bg-border text-text' };
  }
}
