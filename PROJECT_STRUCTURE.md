# Current Project Structure — 2026-11-18
> Status updated 2026-11-20 with issue fixes and the documentation checkpoint.

The runtime folders stay at the root to preserve the site's current asset
URLs. Project reports are grouped under `docs/`. `node_modules/` and `.git/`
are local/tooling data and are not listed in detail.

```text
subhu-jb-portfolio/
├── .gitignore
├── .vscode/
│   └── launch.json
├── PROJECT_STRUCTURE.md
├── WEBSITE_ISSUES.md
├── css/
│   └── main.css
├── docs/
│   ├── CHANGES_REPORT.md
│   ├── ARCHITECTURE.md
│   ├── DISCOVERY.md
│   ├── FINAL_REPORT.md
│   ├── FUTURE_CHANGES.md
│   └── PRE_PUBLISH_CHECKLIST.md
├── img/
│   └── portfolio images, poses, and video assets
├── index.html
├── js/
│   ├── curved-line-patch.js
│   ├── main.js
│   └── garden/
│       └── garden-standalone.js
├── package.json
├── package-lock.json
└── node_modules/ (local development dependencies)
```

## Runtime entry points

- `index.html` loads the CSS and the active scripts directly.
- `js/main.js` owns scroll/section behavior, counters, and interactions.
- `js/garden/garden-standalone.js` owns the canvas Garden animation.
- `js/curved-line-patch.js` draws the decorative hero curve.
- `img/` contains the live page media. Preserve its contents during cleanup.

## Cleanup recorded at this checkpoint

The following were historical test/debug materials rather than live-site
dependencies and were removed after the user confirmed a full external backup:

- Root `test-*.cjs`, `search-main*.cjs`, image/pose helper scripts, and
  `test-garden.html`.
- The standalone `editor.html` positioning tool.
- Old Garden backup copies and dormant `js/scroll-animation.js` /
  `js/pose-patch.js` scripts.
- Generated `qa/` screenshots, `test-results/`, and the ignored `unused/`
  directory.
- The ignored nested `subhu-garden-portfolio/` duplicate.

`package.json`, `package-lock.json`, `node_modules/`, `.vscode/`, the active
site code, all `img/` assets, and `WEBSITE_ISSUES.md` are preserved.

## Source of truth

- Current progress and next step: [`CHANGES_REPORT.md`](./docs/CHANGES_REPORT.md).
- Open polish issues: [`WEBSITE_ISSUES.md`](./WEBSITE_ISSUES.md).
- Publish blockers:
  [`PRE_PUBLISH_CHECKLIST.md`](./docs/PRE_PUBLISH_CHECKLIST.md).
