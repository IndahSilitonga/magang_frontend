// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'http://localhost:4321', // Replace with your site's URL
  integrations: [react(), tailwind()],
  buildOptions: {
    site: 'https://your-site-url.com', // Replace with your site's URL
  },
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },      
  },
});