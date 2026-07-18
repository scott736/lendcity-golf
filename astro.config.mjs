// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lendcityevents.ca',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
    prerenderEnvironment: 'node',
  }),
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
