import { defineMiddleware } from 'astro:middleware';

// Dev-only: injects the Keystatic enhancer (map picker + HMR auto-reload)
// into all /keystatic/* HTML pages. No-op in production.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (!import.meta.env.DEV) return response;

  const { pathname } = context.url;
  if (!pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')) {
    return response;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) return response;

  const html = await response.text();
  const tag = '<script type="module" src="/src/keystatic-enhancer.ts"></script>';

  // Keystatic pages have no <head> — inject before the <astro-island> component
  let enhanced: string;
  if (html.includes('<astro-island')) {
    enhanced = html.replace('<astro-island', `${tag}<astro-island`);
  } else if (html.includes('</head>')) {
    enhanced = html.replace('</head>', `${tag}</head>`);
  } else {
    enhanced = html + tag;
  }

  return new Response(enhanced, {
    status: response.status,
    headers: response.headers,
  });
});
