// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
    integrations: [icon()],
  adapter: node({
    mode: 'standalone',
  }),
});
