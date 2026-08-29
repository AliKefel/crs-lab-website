import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    thrust: z.enum(['perception', 'decision-making', 'learning', 'communication']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { news, projects };
