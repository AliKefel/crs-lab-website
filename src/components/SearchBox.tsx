import { useEffect, useRef, useState } from 'preact/hooks';

interface Item {
  url: string;
  title: string;
  excerpt: string;
  section: string;
}

interface Group {
  key: string;
  heading?: string;
  items: Item[];
}

type Status = 'idle' | 'loading' | 'ready' | 'unavailable';

const PAGEFIND_URL = '/pagefind/pagefind.js';
const MAX_PAGES = 8;
const MAX_SUB_RESULTS = 4;

const sectionLabels: Record<string, string> = {
  news: 'News',
  research: 'Research',
  people: 'People',
  publications: 'Publications',
  contact: 'Contact',
};

function sectionOf(url: string) {
  return sectionLabels[url.split('/')[1]?.split('#')[0] ?? ''] ?? 'Overview';
}

// Vite's dev server refuses to import modules that live in /public, so in dev we
// fetch the script and import it from a Blob URL. Production imports it directly.
async function importPagefind() {
  if (!import.meta.env.DEV) return import(/* @vite-ignore */ PAGEFIND_URL);
  const res = await fetch(PAGEFIND_URL);
  if (!res.ok) throw new Error('Pagefind index not found');
  const blob = new Blob([await res.text()], { type: 'text/javascript' });
  return import(/* @vite-ignore */ URL.createObjectURL(blob));
}

let pagefindPromise: Promise<any> | null = null;
function loadPagefind() {
  pagefindPromise ??= importPagefind().then(async (pf) => {
    await pf.options({ basePath: '/pagefind/' });
    pf.init();
    return pf;
  });
  return pagefindPromise;
}

async function runSearch(query: string): Promise<Group[]> {
  const pf = await loadPagefind();
  const search = await pf.debouncedSearch(query, {}, 150);
  if (search === null) return []; // superseded by a newer query
  const pages = await Promise.all(search.results.slice(0, MAX_PAGES).map((r: any) => r.data()));
  return pages.map((page: any) => {
    const section = sectionOf(page.url);
    // Pages with anchored headings (e.g. each paper on /publications) surface as
    // individual hits under the page name so they deep-link to the entry.
    const anchored = (page.sub_results ?? []).filter((s: any) => s.url.includes('#')).slice(0, MAX_SUB_RESULTS);
    if (anchored.length > 0) {
      return {
        key: page.url,
        heading: page.meta.title,
        items: anchored.map((s: any) => ({
          url: s.url,
          title: s.title,
          excerpt: s.excerpt,
          section,
        })),
      };
    }
    return {
      key: page.url,
      items: [
        {
          url: page.url,
          title: page.meta.title ?? page.url,
          excerpt: page.excerpt,
          section,
        },
      ],
    };
  });
}

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [searched, setSearched] = useState('');
  const [active, setActive] = useState(0);
  const [panelStyle, setPanelStyle] = useState<Record<string, string | number>>({ width: 480 });
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const flat = groups.flatMap((g) => g.items);

  function close() {
    setOpen(false);
    setQuery('');
    setGroups([]);
    setSearched('');
    setActive(0);
  }

  // Global shortcuts: "/" or Cmd/Ctrl+K opens, Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        close();
      }
    }
    function onPointer(e: MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node)) close();
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    // Wide screens: the panel hangs left from the icon. Phones: it spans the viewport under the header row.
    const fit = () => {
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      setPanelStyle(
        window.innerWidth < 640
          ? { position: 'fixed', top: rect.bottom + 8, left: 20, right: 20 }
          : { width: Math.min(480, rect.right - 20) },
      );
    };
    fit();
    window.addEventListener('resize', fit);
    // Warm the index while the user is typing their first characters.
    loadPagefind().catch(() => setStatus('unavailable'));
    return () => window.removeEventListener('resize', fit);
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) {
      setGroups([]);
      setSearched('');
      return;
    }
    let cancelled = false;
    setStatus((s) => (s === 'unavailable' ? s : 'loading'));
    runSearch(q)
      .then((res) => {
        if (cancelled) return;
        setGroups(res);
        setSearched(q);
        setActive(0);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('unavailable'));
    return () => {
      cancelled = true;
    };
  }, [query, open]);

  useEffect(() => {
    root.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, groups]);

  function onInputKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' && flat.length) {
      e.preventDefault();
      setActive((a) => (a + 1) % flat.length);
    } else if (e.key === 'ArrowUp' && flat.length) {
      e.preventDefault();
      setActive((a) => (a - 1 + flat.length) % flat.length);
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      window.location.href = flat[active].url;
    }
  }

  const q = query.trim();
  const showPanel = open && q.length >= 2;

  return (
    <div ref={root} class="relative h-9 w-9 shrink-0">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? 'Close search' : 'Search the site'}
        aria-expanded={open}
        title="Search ( / )"
        class={`hover:text-maroon hover:bg-rule-soft inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ${open ? 'text-maroon bg-rule-soft' : 'text-muted bg-transparent'}`}
      >
        <i class={`fa-solid ${open ? 'fa-xmark' : 'fa-magnifying-glass'} text-[15px]`} aria-hidden="true" />
      </button>

      {open && (
        <div
          style={panelStyle}
          class="border-rule bg-paper absolute top-full right-0 z-50 mt-2 overflow-hidden rounded-xl border shadow-lg"
        >
          <div class="focus-within:bg-bg flex items-center gap-3 px-4 py-3">
            <i class="fa-solid fa-magnifying-glass text-faint text-[13px]" aria-hidden="true" />
            <input
              ref={input}
              type="search"
              value={query}
              onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
              onKeyDown={onInputKey}
              placeholder="Search papers, news, people…"
              role="combobox"
              aria-expanded={showPanel}
              aria-controls="search-results"
              aria-autocomplete="list"
              aria-activedescendant={flat[active] ? `search-item-${active}` : undefined}
              aria-label="Search the site"
              class="text-text placeholder:text-faint min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <kbd class="text-faint border-rule hidden rounded border px-1.5 font-sans text-[10px] sm:inline">esc</kbd>
          </div>
          {showPanel && (
            <div class="border-rule-soft border-t">
              <div
                id="search-results"
                role="listbox"
                class="max-h-[min(28rem,70vh)] overflow-y-auto overscroll-contain"
              >
                {status === 'unavailable' ? (
                  <p class="text-muted m-0 p-5 text-sm">
                    Search index not found. Run <code>npm run build</code> to generate it (see README for dev mode).
                  </p>
                ) : status === 'loading' && searched === '' ? (
                  <p class="text-muted m-0 p-5 text-sm">Searching…</p>
                ) : searched === q && flat.length === 0 ? (
                  <p class="text-muted m-0 p-5 text-sm">No results for “{q}”.</p>
                ) : (
                  (() => {
                    let index = -1;
                    return groups.map((group) => (
                      <div key={group.key} class="border-rule-soft border-t first:border-t-0">
                        {group.heading && (
                          <p class="text-faint m-0 px-4 pt-3 pb-1 font-sans text-[11px] font-medium tracking-[0.1em] uppercase">
                            {group.heading}
                          </p>
                        )}
                        {group.items.map((item) => {
                          index += 1;
                          const i = index;
                          const isActive = i === active;
                          return (
                            <a
                              key={item.url}
                              id={`search-item-${i}`}
                              role="option"
                              aria-selected={isActive}
                              data-active={isActive}
                              href={item.url}
                              onMouseMove={() => active !== i && setActive(i)}
                              class={`block px-4 py-2.5 no-underline ${isActive ? 'bg-rule-soft' : ''}`}
                            >
                              <span class="flex items-baseline justify-between gap-3">
                                <span class="text-ink text-sm font-medium">{item.title}</span>
                                {!group.heading && (
                                  <span class="text-maroon shrink-0 font-sans text-[10px] font-medium tracking-[0.1em] uppercase">
                                    {item.section}
                                  </span>
                                )}
                              </span>
                              <span
                                class="text-muted mt-0.5 block text-[13px] leading-snug [&_mark]:rounded-sm [&_mark]:bg-gold/30 [&_mark]:text-inherit"
                                dangerouslySetInnerHTML={{
                                  __html: item.excerpt,
                                }}
                              />
                            </a>
                          );
                        })}
                      </div>
                    ));
                  })()
                )}
              </div>
              <div class="border-rule-soft text-faint hidden justify-between border-t px-4 py-2 text-[11px] sm:flex">
                <span>↑↓ navigate · ↵ open · esc close</span>
                {status === 'ready' && flat.length > 0 && (
                  <span>
                    {flat.length} result{flat.length === 1 ? '' : 's'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
