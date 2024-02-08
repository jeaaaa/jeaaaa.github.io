import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://jeaaaa.github.io/astro-start/',
  base: '/astro-start'
  integrations: [mdx(), sitemap(), react(), tailwind({
    applyBaseStyles: false,
  })]
});