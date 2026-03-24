/**
 * scripts/translate.ts
 *
 * Automatically translates all missing _en fields from their _fr counterparts
 * across YAML content files. Uses MyMemory free API (no key required).
 *
 * Usage:
 *   pnpm translate               — translate all missing fields
 *
 * Called automatically before each Netlify build (see netlify.toml).
 * Free tier: 10,000 words/day (anonymous).
 */

import { parse, stringify } from 'yaml';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const SCAN_DIRS = [
  'src/data',
  'src/data/locations',
  'src/content/exhibitions',
  'src/content/press',
];

// ── Collect all missing _fr → _en pairs from a YAML object ──────────────────

type Setter = (value: string) => void;
type MissingItem = { fr: string; set: Setter };

function collectMissing(node: unknown): MissingItem[] {
  if (!node || typeof node !== 'object') return [];

  if (Array.isArray(node)) {
    return node.flatMap((item) => collectMissing(item));
  }

  const obj = node as Record<string, unknown>;
  const items: MissingItem[] = [];

  for (const key of Object.keys(obj)) {
    if (key.endsWith('_fr')) {
      const frValue = obj[key];
      if (typeof frValue === 'string' && frValue.trim()) {
        const enKey = key.replace(/_fr$/, '_en');
        const enValue = obj[enKey];
        if (!enValue || (typeof enValue === 'string' && !enValue.trim())) {
          const target = obj;
          const targetKey = enKey;
          items.push({ fr: frValue, set: (v) => { target[targetKey] = v; } });
        }
      }
    } else if (obj[key] && typeof obj[key] === 'object') {
      items.push(...collectMissing(obj[key]));
    }
  }

  return items;
}

// ── Translate a single French string via MyMemory ────────────────────────────

async function translateOne(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
  const data = await res.json() as { responseData: { translatedText: string }; responseStatus: number };
  if (data.responseStatus !== 200) throw new Error(`MyMemory error: ${data.responseStatus}`);
  return data.responseData.translatedText;
}

// ── Translate a batch (sequential to respect rate limits) ────────────────────

async function translateBatch(texts: string[]): Promise<string[]> {
  const results: string[] = [];
  for (const text of texts) {
    results.push(await translateOne(text));
  }
  return results;
}

// ── Process a single YAML file ───────────────────────────────────────────────

async function processFile(filePath: string): Promise<number> {
  const raw = readFileSync(filePath, 'utf-8');
  const obj = parse(raw) as Record<string, unknown>;

  const missing = collectMissing(obj);
  if (missing.length === 0) return 0;

  console.log(`  📝 ${filePath} — ${missing.length} champ(s) manquant(s)`);

  // Batch by 15 to avoid hitting daily word limits too fast
  const BATCH = 15;
  for (let i = 0; i < missing.length; i += BATCH) {
    const chunk = missing.slice(i, i + BATCH);
    const translations = await translateBatch(chunk.map((m) => m.fr));
    chunk.forEach((item, idx) => item.set(translations[idx]));
  }

  writeFileSync(filePath, stringify(obj, {
    lineWidth: 0,
    defaultKeyType: 'PLAIN',
    defaultStringType: 'QUOTE_DOUBLE',
  }));

  return missing.length;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌍  Traduction automatique FR → EN (MyMemory)\n');

  const yamlFiles = SCAN_DIRS.flatMap((dir) => {
    try {
      return readdirSync(dir)
        .filter((f) => extname(f) === '.yaml')
        .map((f) => join(dir, f));
    } catch {
      return [];
    }
  });

  let totalFields = 0;
  let totalFiles = 0;

  for (const file of yamlFiles) {
    try {
      const count = await processFile(file);
      if (count > 0) {
        totalFields += count;
        totalFiles++;
      }
    } catch (err) {
      console.error(`  ❌ ${file}:`, err instanceof Error ? err.message : err);
    }
  }

  if (totalFields === 0) {
    console.log('✅  Tout est déjà traduit — rien à faire.\n');
  } else {
    console.log(`\n✅  ${totalFields} champ(s) traduit(s) dans ${totalFiles} fichier(s).\n`);
  }
}

main().catch((err) => {
  console.error('❌  Erreur fatale:', err);
  process.exit(1);
});
