import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import bibRaw from '../data/publications.bib?raw';
import { people, peopleGroupOrder } from './people';

export interface PublicationAuthor {
  given: string;
  family: string;
  isLabAuthor: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: PublicationAuthor[];
  year: number;
  venue: string;
  venueType: 'journal' | 'conference';
  doi?: string;
  pdf?: string;
  code?: string;
  url?: string;
  bibtex: string;
}

interface LabAuthorKey {
  initial: string;
  family: string;
}

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z]/g, '');
}

function buildLabAuthorKeys(): LabAuthorKey[] {
  const keys: LabAuthorKey[] = [];
  for (const group of peopleGroupOrder) {
    for (const person of people[group]) {
      const words = person.name.replace(/["'()]/g, '').split(/\s+/).filter(Boolean);
      if (words.length === 0) continue;
      const given = words[0];
      const family = words[words.length - 1];
      keys.push({ initial: given[0]?.toLowerCase() ?? '', family: normalize(family) });
    }
  }
  return keys;
}

const labAuthorKeys = buildLabAuthorKeys();

// The roster keys off a person's last word ("Shahrak"), but BibTeX entries
// use the full family name ("Zaker Shahrak"/"Zakershahrak"). Map variants
// to a single canonical form so both sides match.
const familyAliases: Record<string, string> = {
  shahrak: 'zakershahrak',
  zakershahrak: 'zakershahrak',
  zakerhahrak: 'zakershahrak',
};

function isLabAuthor(given: string, family: string): boolean {
  const normFamily = familyAliases[normalize(family)] ?? normalize(family);
  const initial = given[0]?.toLowerCase() ?? '';
  return labAuthorKeys.some((key) => {
    const keyFamily = familyAliases[key.family] ?? key.family;
    return keyFamily === normFamily && key.initial === initial;
  });
}

/** Splits the raw .bib source into per-entry field maps, keyed by citation key. */
function extractRawEntries(raw: string): Map<string, { fields: Record<string, string>; block: string }> {
  const entries = new Map<string, { fields: Record<string, string>; block: string }>();
  const entryRegex = /@(\w+)\{([^,]+),([\s\S]*?)\n\}/g;
  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(raw))) {
    const key = match[2].trim();
    const body = match[3];
    const block = match[0];
    const fields: Record<string, string> = {};
    const fieldRegex = /(\w+)\s*=\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRegex.exec(body))) {
      fields[fieldMatch[1].toLowerCase()] = fieldMatch[2].trim();
    }
    entries.set(key, { fields, block });
  }
  return entries;
}

const rawEntries = extractRawEntries(bibRaw);

const cite = new Cite(bibRaw);
const csl: any[] = cite.data;

function parseAuthors(raw: string): { given: string; family: string }[] {
  return raw.split(' and ').map((part) => {
    const [family, given] = part.split(',').map((s) => s.trim());
    return { given: given ?? '', family: family ?? part.trim() };
  });
}

export const publications: Publication[] = csl.map((entry) => {
  const record = rawEntries.get(entry.id);
  const fields = record?.fields ?? {};
  const authors = parseAuthors(fields.author ?? '').map((a) => ({
    ...a,
    isLabAuthor: isLabAuthor(a.given, a.family),
  }));
  const venue = fields.booktitle ?? fields.journal ?? '';
  const venueType: Publication['venueType'] = fields.journal ? 'journal' : 'conference';

  return {
    id: entry.id,
    title: fields.title ?? entry.title ?? '',
    authors,
    year: Number(fields.year) || 0,
    venue,
    venueType,
    doi: fields.doi,
    pdf: fields.pdf,
    code: fields.code,
    url: fields.url,
    bibtex: record?.block.trim() ?? '',
  };
});

export function groupByYear(pubs: Publication[]): [number, Publication[]][] {
  const map = new Map<number, Publication[]>();
  for (const pub of pubs) {
    if (!map.has(pub.year)) map.set(pub.year, []);
    map.get(pub.year)!.push(pub);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export const publicationYears = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
