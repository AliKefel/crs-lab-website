import { useMemo, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
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


function highlightBibtex(bibtex: string) {
  return bibtex.split('\n').map((line, i) => {
    const entryMatch = line.match(/^@(\w+)\{([^,]+),?$/);
    if (entryMatch) {
      return (
        <div key={i}>
          <span class="text-gold">@{entryMatch[1]}</span>
          <span class="text-chrome-fg/40">{'{'}</span>
          <span class="text-chrome-fg">{entryMatch[2]}</span>
          <span class="text-chrome-fg/40">,</span>
        </div>
      );
    }
    const fieldMatch = line.match(/^(\s*)(\w+)(\s*=\s*)\{(.*)\}(,?)$/);
    if (fieldMatch) {
      const [, indent, field, , value, trailingComma] = fieldMatch;
      return (
        <div key={i}>
          {indent}
          <span class="text-gold">{field}</span>
          <span class="text-chrome-fg/40"> = {'{'}</span>
          <span class="text-chrome-fg">{value}</span>
          <span class="text-chrome-fg/40">
            {'}'}
            {trailingComma}
          </span>
        </div>
      );
    }
    if (line.trim() === '}') {
      return (
        <div key={i}>
          <span class="text-gold">{'}'}</span>
        </div>
      );
    }
    return <div key={i}>{line || ' '}</div>;
  });
}

function PillButton({
  children,
  active,
  onClick,
  href,
}: {
  children: ComponentChildren;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const classes =
    'border-rule text-text hover:border-maroon hover:text-maroon inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.02em] uppercase no-underline transition-colors duration-200' +
    (active ? ' !border-maroon !text-maroon bg-bg' : '');
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" class={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" class={`cursor-pointer ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

function PublicationEntry({ pub }: { pub: Publication }) {
  const [openPanel, setOpenPanel] = useState<'abs' | 'bib' | null>(null);
  const [copied, setCopied] = useState(false);

  async function copyBibtex() {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable; nothing to fall back to silently.
    }
  }

  function toggle(panel: 'abs' | 'bib') {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  return (
    <li class="border-rule-soft border-t py-9 first:border-t-0 first:pt-0">
      <h3 class="mb-2 flex flex-wrap items-baseline gap-2 text-[1.05rem]">
        {pub.title}
        {pub.award && (
          <span class="text-gold font-sans text-[11px] font-medium tracking-[0.1em] uppercase">{pub.award}</span>
        )}
      </h3>
      <p class="text-text mb-2 text-sm leading-relaxed">{formatAuthors(pub.authors)}</p>
      <p class="meta mb-3">{pub.venue}</p>
      <div class="flex flex-wrap gap-2">
        {pub.pdf && <PillButton href={pub.pdf}>Read</PillButton>}
        {pub.abstract && (
          <PillButton active={openPanel === 'abs'} onClick={() => toggle('abs')}>
            Abs
          </PillButton>
        )}
        <PillButton active={openPanel === 'bib'} onClick={() => toggle('bib')}>
          Bib
        </PillButton>
      </div>

      {openPanel === 'abs' && pub.abstract && (
        <div class="border-rule bg-paper mt-4 rounded-xl border p-5">
          <p class="text-text m-0 text-sm leading-relaxed">{pub.abstract}</p>
        </div>
      )}

      {openPanel === 'bib' && (
        <div class="border-rule bg-chrome mt-4 overflow-hidden rounded-xl border">
          <div class="border-rule-soft/20 flex items-center justify-between border-b px-5 py-2.5">
            <span class="text-chrome-fg/60 font-sans text-[11px] font-medium tracking-[0.1em] uppercase">BibTeX</span>
            <button
              type="button"
              class="cursor-pointer border-0 bg-transparent p-0 font-sans text-xs font-medium text-white/70 hover:text-white"
              onClick={copyBibtex}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre class="text-chrome-fg m-0 overflow-x-auto p-5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
            <code>{highlightBibtex(pub.bibtex)}</code>
          </pre>
        </div>
      )}
    </li>
  );
}

export default function PublicationList({ publications }: Props) {
  const [year, setYear] = useState('all');
  const [venueType, setVenueType] = useState('all');

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
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="dissertation">Dissertation</option>
          </select>
        </label>
        <p class="meta ml-auto">
          {total} publication{total === 1 ? '' : 's'}
        </p>
      </div>

      {grouped.map(([groupYear, pubs]) => (
        <div
          class="border-rule grid grid-cols-1 gap-6 border-t py-14 first:border-t-0 md:grid-cols-[96px_1fr] md:gap-10"
          key={groupYear}
        >
          <p class="font-serif text-maroon m-0 text-[2.5rem] leading-none">{groupYear}</p>
          <ul class="list-none p-0">
            {pubs.map((pub) => (
              <PublicationEntry pub={pub} key={pub.id} />
            ))}
          </ul>
        </div>
      ))}

      {grouped.length === 0 && <p class="text-muted mt-8">No publications match these filters.</p>}
    </div>
  );
}
