// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lendcityevents.ca',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  adapter: vercel({
    maxDuration: 120,
    imageService: true,
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
