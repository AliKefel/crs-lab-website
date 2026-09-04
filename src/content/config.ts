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

// Older project write-ups grouped by the kind of system involved, distinct
// from the four research thrusts above. See src/data/systems.ts.
const systemProjects = defineCollection({
  type: 'content',
  schema: z.object({
    system: z.enum(['human-robot', 'robot-robot', 'multi-agent']),
    category: z.string(),
    title: z.string(),
    images: z.array(z.string()).default([]),
    citation: z.string().optional(),
    citationUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { news, projects, systemProjects };
