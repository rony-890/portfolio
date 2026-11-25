# Changelog

## 2026-11-25

Analytics, contact form, sitemap and CI

- Cloudflare Web Analytics beacon added (cookie-less, no banner).
- Contact form posts to Formspree, AJAX submit with a no-JS fallback.
- `sitemap.xml` added; `robots.txt` points at it.
- `scripts/check-links.mjs` plus a GitHub Action that fails on a missing or
  wrong-case asset reference.

## 2026-11-25

Publish v1.0

- Created the public repository and enabled GitHub Pages.
- Converted every root-absolute asset path to a relative path so the site
  works from `/portfolio/`.
- Added `canonical`, `og:url`, `og:image`, `twitter:summary_large_image` and
  `img/og-cover.png` (1200x630).
- Fixed the 404 back-link to point at the project subpath.
- Added `README.md`, `LICENSE` (MIT, artwork excluded), `.nojekyll`.
- Removed unused assets: 19 source PNGs (39.8 MB), ten unreferenced webp
  files and the 8 MB teaser video.
- Moved project data out of `js/main.js` into `js/projects.js`.
- Removed internal planning notes and tracked editor config from the repo.
- Verified 13/13 assets and zero console errors on the deployed origin.

## Before 2026-11-25

Core implementation: scroll camera, Garden hero, About poses, numbers,
Journey, services, selected work, Assist-Ding spotlight, contact.
