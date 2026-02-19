export const prerender = false;

export async function GET() {
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = import.meta.env.KEYSTATIC_SECRET;

  // Test the token endpoint with a fake code to see the response format
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.set("client_id", clientId || "MISSING");
  url.searchParams.set("client_secret", clientSecret || "MISSING");
  url.searchParams.set("code", "test_invalid_code");

  let tokenResponse: any = {};
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    tokenResponse = {
      status: res.status,
      ok: res.ok,
      body: await res.text(),
    };
  } catch (e: any) {
    tokenResponse = { error: e.message };
  }

  const envCheck = {
    clientId: clientId ? `SET (${clientId.substring(0, 8)}...)` : "NOT SET",
    clientSecret: clientSecret ? `SET (length=${clientSecret.length}, ends=${clientSecret.slice(-6)})` : "NOT SET",
    secret: secret ? `SET (length=${secret.length})` : "NOT SET",
    processEnvClientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID ? "SET" : "NOT SET",
    processEnvClientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? "SET" : "NOT SET",
    processEnvSecret: process.env.KEYSTATIC_SECRET ? "SET" : "NOT SET",
    tokenTestResponse: tokenResponse,
  };

  return new Response(JSON.stringify(envCheck, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
}
