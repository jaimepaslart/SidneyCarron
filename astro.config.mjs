import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://sidneycarron.com',
  output: 'static',
  adapter: netlify(),
  vite: {
    envPrefix: ['PUBLIC_', 'KEYSTATIC_'],
    plugins: [
      yaml(),
      // Dev-only: watches YAML files and notifies Keystatic enhancer via HMR
      {
        name: 'keystatic-yaml-watcher',
        configureServer(server) {
          server.watcher.on('change', (file) => {
            if (!file.endsWith('.yaml')) return;
            if (!file.includes('src/data') && !file.includes('src/content')) return;
            server.ws.send({
              type: 'custom',
              event: 'keystatic:yaml-changed',
              data: { file, ts: Date.now() },
            });
          });
        },
      },
    ],
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
