import { useEffect, useState } from 'preact/hooks';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // localStorage unavailable; theme just won't persist across visits.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      class="text-muted hover:text-maroon hover:bg-rule-soft inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center bg-transparent transition-colors duration-200 rounded-lg"
    >
      <i class={`fa-solid ${dark ? 'fa-moon' : 'fa-sun'} text-[15px]`} aria-hidden="true" />
    </button>
  );
}
