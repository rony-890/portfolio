# PROJECT_STRUCTURE.md

## Folder Tree (depth 3, excluding node_modules/.git/duplicates)

```
subhu-jb-portfolio/
├── index.html                      # Main entry point (reverse-engineered from John Bolster)
├── editor.html                     # Text positioning editor tool
├── test-garden.html                # Garden test page
├── package.json                    # Package config (prettier only)
├── package-lock.json
├── DISCOVERY.md                    # Codebase analysis (this session)
├── PROJECT_STRUCTURE.md            # This file
├── .gitignore                      # Git ignore rules
├── css/
│   └── main.css                    # Main stylesheet (37600 lines)
├── js/
│   ├── main.js                     # Main app logic (minified, handles scroll, projects)
│   ├── scroll-animation.js         # Slide-door scroll animation (BROKEN - to disable)
│   └── garden/
│       ├── garden-standalone.js            # Current working garden engine
│       ├── garden-standalone.final-backup.js  # Latest working backup (DO NOT TOUCH)
│       ├── garden-standalone.working-backup.js
│       ├── garden-standalone.backup
│       ├── garden-standalone.backup-.js
├── img/                            # Assets (images, videos)
│   ├── distinkt-teaser.mp4
│   ├── distinkt-teaser-poster.webp
│   ├── ht-can.webp
│   ├── ht-ih.webp
│   ├── pose0.webp through pose5.webp
├── qa/                             # Test screenshots (50+ files)
├── test-results/                   # Playwright test results
├── subhu-garden-portfolio/         # DUPLICATE PROJECT - DO NOT PUBLISH
├── subhu-merged-portfolio/         # DUPLICATE PROJECT - DO NOT PUBLISH
├── subhu-jb-portfolio-v2/          # DUPLICATE PROJECT - DO NOT PUBLISH
├── subhu-jb-portfolio-v3/          # DUPLICATE PROJECT - DO NOT PUBLISH
├── portfolio-v1/                   # DUPLICATE PROJECT - DO NOT PUBLISH
├── unused/                         # Old Playwright install - DO NOT PUBLISH
├── JOHN_BOLSTER_ASSETS/            # Reference assets - DO NOT PUBLISH
├── PORTFOLIO_RESOURCES/            # Reference resources - DO NOT PUBLISH
├── garden-frames/                  # Reference frames - DO NOT PUBLISH
└── node_modules/                   # prettier only (in .gitignore)
```

---

## One Line Per Key File

| File | Purpose |
|------|---------|
| `index.html` | Main HTML entry - hero, sections, garden canvas, HUD, all content |
| `css/main.css` | All styles - layout, typography, animations, HUD, responsive |
| `js/main.js` | Minified app logic - scroll handling, project data, interactions, hero transforms |
| `js/scroll-animation.js` | **BROKEN** - slide-door attempt, conflicts with main.js, to be disabled |
| `js/garden/garden-standalone.js` | Type Garden engine - renders animated text with flowers/vines |
| `js/garden/garden-standalone.final-backup.js` | **Protected backup** - DO NOT MODIFY |
| `editor.html` | Visual editor for text positioning |
| `test-garden.html` | Standalone garden test page |
| `img/*.webp` | Hero images (poses, cutouts) |
| `img/distinkt-teaser.mp4` | Distinkt product video |
| `qa/*.png` | Test/verification screenshots |

---

## Config Constants Location

| Constant | File | Line |
|----------|------|------|
| `FONT` | `js/garden/garden-standalone.js` | 5 |
| `COLORS` | `js/garden/garden-standalone.js` | 6-12 |
| `CFG` | `js/garden/garden-standalone.js` | 13 |
| `TARGET_S` | `js/garden/garden-standalone.js` | 696 |
| `pad` (safety fit) | `js/garden/garden-standalone.js` | 718 |
| `KEYFRAMES` | `js/scroll-animation.js` | 17-22 |
| `lerpFactor` | `js/scroll-animation.js` | 24 |
| `--k` (scroll progress) | `index.html` (inline on `.el`) | 59 |
| `#hud` styles | `css/main.css` | 318-367 |
| Font imports | `index.html` | 29-30 |

---

## DO NOT PUBLISH — Files Derived from John Bolster Site

**These files are reverse-engineered from johnbolster.design and must NOT be published as original work:**

### Core Reverse-Engineered Files
- `index.html` — Entire structure copied from John Bolster's site
- `js/main.js` — Minified scroll/animation logic from original site
- `css/main.css` — Complete stylesheet from original site
- `js/garden/garden-standalone.js` — Type Garden port (open source) but integrated into John's layout

### Assets from John Bolster
- `img/pose0.webp` through `img/pose5.webp` — John's photos
- `img/ht-can.webp` — Halftone can image
- `img/ht-ih.webp` — Halftone hockey player
- `img/distinkt-teaser.mp4` — Distinkt product video
- `img/distinkt-teaser-poster.webp` — Video poster

### Duplicate Project Folders (Entire Copies)
- `subhu-garden-portfolio/` — Full copy of earlier version
- `subhu-merged-portfolio/` — Full copy
- `subhu-jb-portfolio-v2/` — Full copy
- `subhu-jb-portfolio-v3/` — Full copy
- `portfolio-v1/` — Full copy

### Reference/Scraped Materials
- `JOHN_BOLSTER_ASSETS/` — Scraped assets from johnbolster.design
- `PORTFOLIO_RESOURCES/` — Reference resources
- `garden-frames/` — Reference frames

### Old Tooling
- `unused/` — Old Playwright install (5000+ files)
- `test-results/` — Test artifacts
- `qa/` — 50+ test screenshots (keep for verification only)

---

## My Own Files (Original Work)

| File | Status |
|------|--------|
| `js/garden/garden-standalone.js` | **Modified** - Fixed font loading, layout, focal point, letter spacing (based on Type Garden open source) |
| `js/scroll-animation.js` | **New** - Slide-door attempt (BROKEN, to be removed) |
| `editor.html` | **New** - Text positioning tool |
| `test-garden.html` | **New** - Test page |
| `DISCOVERY.md` | **New** - This analysis |
| `PROJECT_STRUCTURE.md` | **New** - This file |
| `CHANGES_REPORT.md` | **New** - To be created |

---

## .gitignore Additions (DO NOT PUBLISH files)

```gitignore
# DO NOT PUBLISH - Reverse-engineered from John Bolster
subhu-garden-portfolio/
subhu-merged-portfolio/
subhu-jb-portfolio-v2/
subhu-jb-portfolio-v3/
portfolio-v1/
JOHN_BOLSTER_ASSETS/
PORTFOLIO_RESOURCES/
garden-frames/
unused/
test-results/
qa/*.png
```

---

## Notes

- **Protected file**: `js/garden/garden-standalone.final-backup.js` — Never modify, never delete
- **Current working version**: `js/garden/garden-standalone.js` (has fixes for font loading, focal point, letter spacing)
- **Broken file**: `js/scroll-animation.js` — To be disabled in Step 1
- **Font**: Anton (Google Fonts) - only weights 400 and 700 available, current code uses 800 (fake bold)
- **Hero text**: "SUBHU" (5 letters, all caps)