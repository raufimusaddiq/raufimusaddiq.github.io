# raufimusaddiq.github.io

Personal developer site for **Raufi Musaddiq**.

A lightweight static GitHub Pages site with no runtime dependencies, external fonts, analytics, or tracking.

## Local preview

Any static HTTP server works. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages whenever `master` changes. The workflow uses GitHub's official Pages actions.

If Pages has not been enabled for this repository yet, open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source once. After that, pushes to `master` deploy automatically.

## Structure

- `index.html` — page content and metadata
- `styles.css` — responsive layout, light/dark themes, visual system
- `script.js` — theme preference and footer year
- `.nojekyll` — serve the site as plain static files
- `.github/workflows/pages.yml` — Pages deployment
