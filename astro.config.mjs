// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import icon from 'astro-icon';
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  image: {
    service: imageService(),
  },
  output: 'server',
    integrations: [icon()],
  adapter: node({
    mode: 'standalone',
  }),
});
