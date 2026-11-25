# Architecture

Static single-page portfolio. No framework, no build step: the browser loads
`index.html`, `css/main.css` and the scripts as written.

## Runtime files

| File | Owns |
| --- | --- |
| `index.html` | markup for every section, metadata, JSON-LD |
| `css/main.css` | design tokens, layout, scroll-stage styling |
| `js/projects.js` | the project data (edit here to add a project) |
| `js/main.js` | scroll camera, section choreography, counters, project cards, dialog |
| `js/garden/garden-standalone.js` | canvas flower field behind the hero name |
| `js/curved-line-patch.js` | decorative hero curve |

## Sections

Hero, About, By the numbers, Journey, What I do, Selected Work, Assist-Ding
spotlight, Contact. Each one is a `<section class="st">` stop.

## Scroll camera

Every stop carries `data-gap`, `data-hold`, `data-a`, `data-ma`; every moving
element carries `data-p`, `data-mp`, `data-z`, `data-f`. The camera eases in
`js/main.js`, so `window.scrollY` and the rendered scene position differ while
the page is in motion. Scrolling programmatically with `scrollIntoView` will
be re-eased back by the camera; use the site's own stops.

## Projects

`js/projects.js` assigns `window.PROJECTS` before `js/main.js` runs, and
`js/main.js` reads it into `window.JB.projects` at startup. Card markup, the
project dialog and `?project=<slug>` deep links are generated from that array,
so adding a project never means touching layout code.

## Assets

- `img/poses/` hero-adjacent portrait frames (webp only).
- `img/projects/` project artwork, webp only.
- `img/og-cover.png` social preview card, 1200x630.
- Source PNG originals are kept outside the repository on purpose; the site
  never requests a PNG except the OG cover.

## Responsive behaviour

Below 760px the scene switches to the mobile camera, portrait moves above the
bio, and text wraps differently. Desktop and mobile are tuned separately.

## Accessibility

Semantic sections, visible focus rings, `aria-label` on split headings,
keyboard-operable cards, a `noscript` fallback with the full page text, and
`prefers-reduced-motion` handling.
