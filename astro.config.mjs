import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://sidneycarron.com',
  output: 'static',
  adapter: netlify(),
  vite: {
    envPrefix: ['PUBLIC_', 'KEYSTATIC_'],
  },
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
    }),
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
