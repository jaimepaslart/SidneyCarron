export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const reqUrl = new URL(request.url);
  const code = reqUrl.searchParams.get("code");
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  if (!code) {
    return new Response(JSON.stringify({
      message: "Add ?code=XXX to test a real OAuth code exchange",
      clientId: clientId ? `SET (${clientId.substring(0, 8)}...)` : "NOT SET",
      clientSecret: clientSecret ? `SET (length=${clientSecret.length})` : "NOT SET",
    }, null, 2), { headers: { "Content-Type": "application/json" } });
  }

  // Test token exchange with the real code
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.set("client_id", clientId || "");
  url.searchParams.set("client_secret", clientSecret || "");
  url.searchParams.set("code", code);

  let tokenResponse: any = {};
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    tokenResponse = {
      status: res.status,
      ok: res.ok,
      body: await res.json(),
    };
  } catch (e: any) {
    tokenResponse = { error: e.message };
  }

  // Also test WITH redirect_uri (like the login sends)
  const url2 = new URL("https://github.com/login/oauth/access_token");
  url2.searchParams.set("client_id", clientId || "");
  url2.searchParams.set("client_secret", clientSecret || "");
  url2.searchParams.set("code", code + "_used");
  url2.searchParams.set("redirect_uri", `${reqUrl.origin}/api/keystatic/github/oauth/callback`);

  return new Response(JSON.stringify({
    tokenExchangeResult: tokenResponse,
    note: "If body has error, that's the problem. If body has access_token without expires_in, token expiration is not enabled."
  }, null, 2), { headers: { "Content-Type": "application/json" } });
}
