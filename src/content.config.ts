import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const directory = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/directory' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    logo: z.string(),
    author: z.string(),
    createdAt: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    official: z.boolean().optional().default(false),
    new: z.boolean().optional().default(false),
    advertisement: z.boolean().optional().default(false),
    url: z.string().optional(),
    rating: z.number().min(0).max(5).optional().default(0),
  }),
});

export const collections = {
  directory,
};
