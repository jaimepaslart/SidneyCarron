export const prerender = false;

export async function GET() {
  const envCheck = {
    hasProcessEnv: typeof process !== 'undefined' && typeof process.env !== 'undefined',
    hasImportMetaEnv: typeof import.meta.env !== 'undefined',
    keystatic_id_process: process.env.KEYSTATIC_GITHUB_CLIENT_ID ? 'SET' : 'NOT SET',
    keystatic_secret_process: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'NOT SET',
    keystatic_key_process: process.env.KEYSTATIC_SECRET ? 'SET' : 'NOT SET',
    keystatic_id_meta: (import.meta as any).env?.KEYSTATIC_GITHUB_CLIENT_ID ? 'SET' : 'NOT SET',
    keystatic_secret_meta: (import.meta as any).env?.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'NOT SET',
    keystatic_key_meta: (import.meta as any).env?.KEYSTATIC_SECRET ? 'SET' : 'NOT SET',
    importMetaEnvKeys: Object.keys((import.meta as any).env || {}).filter(k => !k.startsWith('npm_')).slice(0, 20),
  };

  return new Response(JSON.stringify(envCheck, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
