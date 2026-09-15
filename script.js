(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('#theme-color');
  const year = document.querySelector('#year');
  const storageKey = 'raufi-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const storedTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  };

  const preferredTheme = () => storedTheme() || (systemTheme.matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (toggle) {
      toggle.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
      toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
    }

    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#151513' : '#f3f1ea');
    }
  };

  applyTheme(preferredTheme());

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }
    applyTheme(nextTheme);
  });

  systemTheme.addEventListener?.('change', (event) => {
    if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  const reveals = Array.from(document.querySelectorAll('.reveal'));

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    });

    reveals.forEach((element) => observer.observe(element));
  }

  if (year) year.textContent = String(new Date().getFullYear());
})();
