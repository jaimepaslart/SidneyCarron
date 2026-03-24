#!/usr/bin/env node
/**
 * Process images from Data/ directory:
 * - Resize to max 1600px on longest edge
 * - Output as JPEG quality 80
 * - Organize by location slug
 * - Generate JSON manifests for each location
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA_DIR = path.join(ROOT, 'Data');
const GALLERIES_OUT = path.join(ROOT, 'public', 'images', 'galleries');
const MANIFESTS_OUT = path.join(ROOT, 'src', 'data', 'galleries');

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 80;

// Mapping: Data/ folder name → location slug
const FOLDER_MAP = {
  'Brésil': 'bresil',
  'Sénégal Dakar': 'dakar',
  'Saint Tropez': 'saint-tropez',
  'Ile de la reunion': 'reunion',
  'Réunion ': 'reunion', // Note trailing space in folder name
  'Sri Lanka': 'sri-lanka',
  'Costa Rica': 'costa-rica',
  'Guadeloupe': 'guadeloupe',
  'Exposition Jonone Basille Design Center (. Paris) en 2023': 'paris',
  'Exposition Théatre Antoine Paris ': 'paris', // Note trailing space
  'Coupe des Alpes 2023 avec Peugeot ( anniversaire 205 Gti)': 'alpes',
};

// Sections within Paris (for future use in gallery display)
const PARIS_SECTIONS = {
  'Exposition Jonone Basille Design Center (. Paris) en 2023': 'JonOne — Basille Design Center',
  'Exposition Théatre Antoine Paris ': 'Théâtre Antoine',
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif']);

async function getImageFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map(e => path.join(dirPath, e.name))
    .sort();
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  let resizeOpts = {};
  if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
    if (metadata.width >= metadata.height) {
      resizeOpts = { width: MAX_DIMENSION };
    } else {
      resizeOpts = { height: MAX_DIMENSION };
    }
  }

  await image
    .rotate() // Auto-rotate based on EXIF
    .resize(resizeOpts)
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outputPath);

  const outMeta = await sharp(outputPath).metadata();
  return { width: outMeta.width, height: outMeta.height };
}

async function main() {
  console.log('🖼️  Processing images from Data/...\n');

  // Collect all images grouped by location slug
  const locationImages = {};

  const folders = fs.readdirSync(DATA_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory());

  for (const folder of folders) {
    // Normalize Unicode (macOS uses NFD, our map keys use NFC)
    const normalizedName = folder.name.normalize('NFC');
    const slug = FOLDER_MAP[normalizedName];
    if (!slug) {
      console.log(`  ⏭️  Skipping unmapped folder: "${normalizedName}"`);
      continue;
    }

    const images = await getImageFiles(path.join(DATA_DIR, folder.name));
    if (images.length === 0) {
      console.log(`  ⏭️  No images in: "${normalizedName}"`);
      continue;
    }

    if (!locationImages[slug]) {
      locationImages[slug] = [];
    }

    // Track section for Paris folders
    const section = PARIS_SECTIONS[normalizedName] || null;
    for (const img of images) {
      locationImages[slug].push({ path: img, section });
    }
  }

  // Process each location
  for (const [slug, images] of Object.entries(locationImages)) {
    const outDir = path.join(GALLERIES_OUT, slug);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`📍 ${slug} (${images.length} images)`);

    const manifest = {
      slug,
      images: [],
    };

    // Check if this location has sections (like Paris)
    const sections = [...new Set(images.map(i => i.section).filter(Boolean))];
    if (sections.length > 0) {
      manifest.sections = sections;
    }

    for (let i = 0; i < images.length; i++) {
      const idx = String(i + 1).padStart(3, '0');
      const outFilename = `${slug}-${idx}.jpg`;
      const outPath = path.join(outDir, outFilename);
      const publicPath = `/images/galleries/${slug}/${outFilename}`;

      try {
        const { width, height } = await processImage(images[i].path, outPath);
        const entry = {
          src: publicPath,
          width,
          height,
        };
        if (images[i].section) {
          entry.section = images[i].section;
        }
        manifest.images.push(entry);
        process.stdout.write(`  ✅ ${outFilename} (${width}×${height})\n`);
      } catch (err) {
        console.error(`  ❌ Failed: ${path.basename(images[i].path)} — ${err.message}`);
      }
    }

    // Write manifest JSON
    const manifestPath = path.join(MANIFESTS_OUT, `${slug}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`  📄 Manifest: src/data/galleries/${slug}.json\n`);
  }

  // Summary
  const allManifests = fs.readdirSync(MANIFESTS_OUT).filter(f => f.endsWith('.json'));
  let totalImages = 0;
  for (const f of allManifests) {
    const m = JSON.parse(fs.readFileSync(path.join(MANIFESTS_OUT, f), 'utf-8'));
    totalImages += m.images.length;
  }
  console.log(`\n✨ Done! ${allManifests.length} locations, ${totalImages} images processed.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
