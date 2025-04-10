import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  content: {
    collections: [
      {
        name: 'directory',
        schema: {
          title: 'string',
          description: 'string',
          logo: 'string',
          author: 'string',
          createdAt: 'date',
          tags: 'string[]',
          featured: 'boolean?',
          official: 'boolean?',
          new: 'boolean?',
          advertisement: 'boolean?',
          url: 'string?',
          rating: 'number?',
        },
      },
    ],
  },
});
