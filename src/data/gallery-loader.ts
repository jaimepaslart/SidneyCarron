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
    const sections = [...new Set(
      loc.images.map(img => img.section).filter((s): s is string => !!s)
    )];
    return { slug, images: loc.images, sections: sections.length > 0 ? sections : undefined };
  }

  // Fallback: legacy JSON gallery
  const key = `./galleries/${slug}.json`;
  return galleryModules[key] as Gallery | undefined;
}

export function getAllGalleries(): Gallery[] {
  return Object.values(galleryModules) as Gallery[];
}
