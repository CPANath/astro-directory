import { defineCollection, z } from 'astro:content';

const directory = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    logo: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    official: z.boolean().default(false),
    new: z.boolean().default(false),
    advertisement: z.boolean().optional(),
    rating: z.number().min(0).max(5).default(0),
    createdAt: z.date().optional()
  })
});

export const collections = {
  directory
};
