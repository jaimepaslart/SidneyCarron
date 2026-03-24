/**
 * Netlify Edge Function — protection HTTP Basic Auth sur /keystatic/*
 *
 * Variables d'environnement à configurer sur Netlify :
 *   KEYSTATIC_AUTH_USER     → identifiant (défaut : "admin")
 *   KEYSTATIC_AUTH_PASSWORD → mot de passe (obligatoire pour activer la protection)
 *
 * Si KEYSTATIC_AUTH_PASSWORD n'est pas défini, la protection est désactivée
 * (utile en preview/staging sans variable configurée).
 */

export default async function handler(request, context) {
  const url = new URL(request.url);

  // Le callback OAuth GitHub arrive en redirect — il ne peut pas porter
  // l'en-tête Authorization. On le laisse passer pour ne pas casser le flux OAuth.
  if (url.pathname.startsWith('/keystatic/api/github/oauth/')) {
    return context.next();
  }

  const username = Deno.env.get('KEYSTATIC_AUTH_USER') ?? 'admin';
  const password = Deno.env.get('KEYSTATIC_AUTH_PASSWORD');

  // Pas de mot de passe configuré = protection désactivée
  if (!password) {
    return context.next();
  }

  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Basic ')) {
    const credentials = atob(authHeader.slice(6));
    const colonIndex = credentials.indexOf(':');
    const user = credentials.slice(0, colonIndex);
    const pass = credentials.slice(colonIndex + 1);

    if (user === username && pass === password) {
      return context.next();
    }
  }

  return new Response('Accès non autorisé', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sidney Carron — Administration", charset="UTF-8"',
    },
  });
}

export const config = {
  path: '/keystatic/*',
};
