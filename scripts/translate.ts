/**
 * scripts/translate.ts
 *
 * Automatically translates all missing _en fields from their _fr counterparts
 * across YAML content files. Uses MyMemory free API (no key required).
 *
 * Usage:
 *   pnpm translate               — translate all missing fields
 *   SKIP_TRANSLATE=1 pnpm build  — skip translation (all fields already done)
 *
 * Called automatically before each Netlify build (see netlify.toml).
 * Free tier: 10,000 words/day (anonymous).
 */

import { parse, stringify } from 'yaml';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

// ── Skip flag — set SKIP_TRANSLATE=1 to bypass the API entirely ─────────────

if (process.env.SKIP_TRANSLATE === '1' || process.argv.includes('--skip')) {
  console.log('⏭️   SKIP_TRANSLATE — traduction ignorée.\n');
  process.exit(0);
}

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

// ── Translate a single French string via MyMemory (with timeout) ─────────────

const FETCH_TIMEOUT_MS = 8000;

async function translateOne(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
    const data = await res.json() as { responseData: { translatedText: string }; responseStatus: number };
    if (data.responseStatus !== 200) throw new Error(`MyMemory status ${data.responseStatus}`);
    return data.responseData.translatedText;
  } finally {
    clearTimeout(timer);
  }
}

// ── Translate a batch — sequential to respect rate limits ────────────────────

// How many API errors in a row before we give up on the API for this run
const MAX_CONSECUTIVE_ERRORS = 3;
let consecutiveErrors = 0;

async function translateBatch(texts: string[]): Promise<(string | null)[]> {
  const results: (string | null)[] = [];
  for (const text of texts) {
    if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
      // API appears down — skip remaining translations rather than hanging the build
      results.push(null);
      continue;
    }
    try {
      results.push(await translateOne(text));
      consecutiveErrors = 0;
    } catch (err) {
      consecutiveErrors++;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`    ⚠️  Traduction ignorée (${msg})`);
      results.push(null);
    }
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

  const BATCH = 15;
  let translated = 0;
  for (let i = 0; i < missing.length; i += BATCH) {
    const chunk = missing.slice(i, i + BATCH);
    const results = await translateBatch(chunk.map((m) => m.fr));
    chunk.forEach((item, idx) => {
      if (results[idx] !== null) {
        item.set(results[idx]!);
        translated++;
      }
    });
  }

  if (translated > 0) {
    writeFileSync(filePath, stringify(obj, {
      lineWidth: 0,
      defaultKeyType: 'PLAIN',
      defaultStringType: 'QUOTE_DOUBLE',
    }));
  }

  return translated;
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
      // File-level errors (FS, YAML parse) are logged but never fatal —
      // the build must not fail because of a translation hiccup
      console.warn(`  ⚠️  ${file}: ${err instanceof Error ? err.message : err}`);
    }
  }

  if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
    console.warn('\n⚠️   L\'API MyMemory semble indisponible — certains champs n\'ont pas été traduits.');
    console.warn('     Définissez SKIP_TRANSLATE=1 pour ignorer la traduction au prochain build.\n');
  } else if (totalFields === 0) {
    console.log('✅  Tout est déjà traduit — rien à faire.\n');
  } else {
    console.log(`\n✅  ${totalFields} champ(s) traduit(s) dans ${totalFiles} fichier(s).\n`);
  }
  // Always exit 0 — translation failures must never block the build
}

main().catch((err) => {
  console.error('❌  Erreur fatale:', err);
  // Exit 0 even here: a translation script crash must not kill the build
  process.exit(0);
});
