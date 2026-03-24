import { getLocation } from './locations';

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  section?: string;
}

export interface Gallery {
  slug: string;
  images: GalleryImage[];
  sections?: string[];
}

// Legacy JSON galleries (existing data)
const galleryModules = import.meta.glob<Gallery>('./galleries/*.json', { eager: true });

export function getGallery(slug: string): Gallery | undefined {
  // YAML (Keystatic) has priority — edits via CMS take effect immediately
  const loc = getLocation(slug);
  if (loc?.images && loc.images.length > 0) {
    return { slug, images: loc.images };
  }

  // Fallback: legacy JSON gallery
  const key = `./galleries/${slug}.json`;
  return galleryModules[key] as Gallery | undefined;
}

export function getAllGalleries(): Gallery[] {
  return Object.values(galleryModules) as Gallery[];
}
