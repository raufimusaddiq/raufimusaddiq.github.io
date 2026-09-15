(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const year = document.querySelector('#year');
  const storageKey = 'raufi-theme';

  const preferredTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    toggle?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    toggle?.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };

  applyTheme(preferredTheme());

  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
