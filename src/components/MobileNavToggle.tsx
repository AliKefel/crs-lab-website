import { useEffect, useState } from 'preact/hooks';

export default function MobileNavToggle() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const list = document.getElementById('primary-nav-list');
    if (!list) return;
    list.classList.toggle('max-md:!hidden', !open);
  }, [open]);

  return (
    <button
      type="button"
      class="text-ink border-rule inline-flex cursor-pointer items-center gap-2 self-end border bg-transparent px-3 py-2 text-xs tracking-wider uppercase md:hidden"
      aria-expanded={open}
      aria-controls="primary-nav-list"
      onClick={() => setOpen((o) => !o)}
    >
      <span>{open ? 'Close' : 'Menu'}</span>
      <span class="flex flex-col gap-[3px]" aria-hidden="true">
        <span class="bg-ink block h-px w-4"></span>
        <span class="bg-ink block h-px w-4"></span>
        <span class="bg-ink block h-px w-4"></span>
      </span>
    </button>
  );
}
