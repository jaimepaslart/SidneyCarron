export interface LocationImage {
  src: string;
  width: number;
  height: number;
  section?: string;
}

export interface Location {
  slug: string;
  name_fr: string;
  name_en: string;
  country_fr: string;
  country_en: string;
  coords: { lat: number; lng: number };
  photoCount: number;
  type: 'travel' | 'exhibition' | 'event';
  description_fr?: string;
  description_en?: string;
  cover?: string;
  images?: LocationImage[];
  video?: string;
  video_url?: string;
}

// Load all location YAML files via Vite's import.meta.glob (eager)
const locationFiles = import.meta.glob<Record<string, any>>('./locations/*.yaml', { eager: true });

export const locations: Location[] = Object.values(locationFiles).map((mod: any) => {
  const d = mod.default ?? mod;
  return {
    slug: d.slug,
    name_fr: d.name_fr,
    name_en: d.name_en,
    country_fr: d.country_fr,
    country_en: d.country_en,
    coords: { lat: d.lat, lng: d.lng },
    photoCount: d.photoCount,
    type: d.type,
    description_fr: d.description_fr,
    description_en: d.description_en,
    cover: d.cover,
    images: d.images,
    video: d.video,
    video_url: d.video_url,
  };
});

export function getLocation(slug: string): Location | undefined {
  return locations.find(l => l.slug === slug);
}

export function getLocationName(slug: string, lang: 'fr' | 'en'): string {
  const loc = getLocation(slug);
  return loc ? (lang === 'en' ? loc.name_en : loc.name_fr) : slug;
}
