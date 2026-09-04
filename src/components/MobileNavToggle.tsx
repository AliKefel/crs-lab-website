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
      class="text-muted hover:text-maroon hover:bg-rule-soft inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center bg-transparent transition-colors duration-200 md:hidden"
      aria-expanded={open}
      aria-controls="primary-nav-list"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={() => setOpen((o) => !o)}
    >
      <i class={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-[15px]`} aria-hidden="true" />
    </button>
  );
}
