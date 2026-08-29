import yaml from 'js-yaml';
import { z } from 'zod';
import peopleRaw from '../data/people.yaml?raw';

const linksSchema = z
  .object({
    website: z.string().optional(),
    email: z.string().optional(),
    scholar: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  })
  .default({});

const personSchema = z.object({
  name: z.string(),
  role: z.string(),
  note: z.string().optional(),
  interests: z.array(z.string()).default([]),
  photo: z.string().optional(),
  links: linksSchema,
});

const peopleFileSchema = z.object({
  faculty: z.array(personSchema).default([]),
  postdocs: z.array(personSchema).default([]),
  phd: z.array(personSchema).default([]),
  ms: z.array(personSchema).default([]),
  alumni: z.array(personSchema).default([]),
});

export type Person = z.infer<typeof personSchema>;
export type PeopleGroups = z.infer<typeof peopleFileSchema>;
export type PeopleGroupKey = keyof PeopleGroups;

const raw = yaml.load(peopleRaw);

export const people: PeopleGroups = peopleFileSchema.parse(raw);

export const peopleGroupOrder: PeopleGroupKey[] = ['faculty', 'postdocs', 'phd', 'ms', 'alumni'];

export const peopleGroupLabels: Record<PeopleGroupKey, string> = {
  faculty: 'Faculty',
  postdocs: 'Postdoctoral Researchers',
  phd: 'Ph.D. Students',
  ms: 'M.S. Students',
  alumni: 'Alumni',
};

export function getInitials(name: string): string {
  const words = name.replace(/["'()]/g, '').split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}
