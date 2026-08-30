import { useMemo, useState } from 'preact/hooks';
import type { Publication } from '../lib/publications';

interface Props {
  publications: Publication[];
}

function formatAuthors(authors: Publication['authors']) {
  return authors.map((a, i) => {
    const label = a.given ? `${a.given} ${a.family}` : a.family;
    const isLast = i === authors.length - 1;
    let sep = '';
    if (i > 0) {
      sep = isLast ? (authors.length === 2 ? ' and ' : ', and ') : ', ';
    }
    return (
      <span key={`${a.family}-${i}`}>
        {sep}
        {a.isLabAuthor ? <strong>{label}</strong> : label}
      </span>
    );
  });
}

export default function PublicationList({ publications }: Props) {
  const [year, setYear] = useState('all');
  const [venueType, setVenueType] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [publications],
  );

  const grouped = useMemo(() => {
    const filtered = publications.filter(
      (p) => (year === 'all' || p.year === Number(year)) && (venueType === 'all' || p.venueType === venueType),
    );
    const map = new Map<number, Publication[]>();
    for (const pub of filtered) {
      if (!map.has(pub.year)) map.set(pub.year, []);
      map.get(pub.year)!.push(pub);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [publications, year, venueType]);

  const total = grouped.reduce((sum, [, pubs]) => sum + pubs.length, 0);

  async function copyBibtex(pub: Publication) {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId((current) => (current === pub.id ? null : current)), 1800);
    } catch {
      // Clipboard API unavailable; nothing to fall back to silently.
    }
  }

  return (
    <div>
      <div class="border-rule flex flex-wrap items-center gap-x-8 gap-y-3 border-b pb-6">
        <label class="flex items-center gap-2 text-sm">
          <span class="text-muted">Year</span>
          <select
            class="border-rule text-text bg-paper border px-2 py-1 text-sm"
            value={year}
            onChange={(e) => setYear((e.target as HTMLSelectElement).value)}
          >
            <option value="all">All</option>
            {years.map((y) => (
              <option value={y} key={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label class="flex items-center gap-2 text-sm">
          <span class="text-muted">Venue</span>
          <select
            class="border-rule text-text bg-paper border px-2 py-1 text-sm"
            value={venueType}
            onChange={(e) => setVenueType((e.target as HTMLSelectElement).value)}
          >
            <option value="all">All</option>
            <option value="conference">Conference</option>
            <option value="journal">Journal</option>
          </select>
        </label>
        <p class="meta ml-auto">
          {total} publication{total === 1 ? '' : 's'}
        </p>
      </div>

      {grouped.map(([groupYear, pubs]) => (
        <div class="border-rule grid grid-cols-1 gap-6 border-t py-14 first:border-t-0 md:grid-cols-[96px_1fr] md:gap-10" key={groupYear}>
          <p class="font-serif text-maroon m-0 text-[2.5rem] leading-none">{groupYear}</p>
          <ul class="list-none p-0">
            {pubs.map((pub) => (
              <li class="border-rule-soft border-t py-9 first:border-t-0 first:pt-0" key={pub.id}>
                <h3 class="mb-2 text-[1.05rem]">{pub.title}</h3>
                <p class="text-text mb-2 text-sm leading-relaxed">{formatAuthors(pub.authors)}</p>
                <p class="meta mb-3">{pub.venue}</p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {pub.pdf && (
                    <a href={pub.pdf} target="_blank" rel="noopener noreferrer">
                      PDF
                    </a>
                  )}
                  {pub.doi && (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                      DOI
                    </a>
                  )}
                  {pub.code && (
                    <a href={pub.code} target="_blank" rel="noopener noreferrer">
                      Code
                    </a>
                  )}
                  <button
                    type="button"
                    class="text-maroon hover:text-maroon-deep cursor-pointer border-0 bg-transparent p-0 font-sans text-sm underline decoration-1 underline-offset-[0.15em]"
                    onClick={() => copyBibtex(pub)}
                  >
                    {copiedId === pub.id ? 'Copied' : 'BibTeX'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {grouped.length === 0 && <p class="text-muted mt-8">No publications match these filters.</p>}
    </div>
  );
}
