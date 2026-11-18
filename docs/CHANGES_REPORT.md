# Portfolio Progress Checkpoint — 2026-11-18

This replaces the older step-by-step log. Treat this as the current handoff
point; the full project backup is maintained by the user outside this folder.

## Current website state

- The site is a static portfolio served from `index.html`.
- The hero uses the staggered “SUBHU” reveal, Garden canvas animation, scroll
  zoom/fade, SU/BHU split, and curved guide line.
- The About section and pose animation remain in place. The “Front-End” title
  is grouped to avoid breaking across lines.
- The current stats are “Creating since 2026,” “Projects 10+,” and “Worked
  with 2.” The requested “company” placement is not implemented.
- The Journey section now has two month-based milestones: `MAR–AUG` and
  `SEP–PRESENT`. The older 2019 and 2026 stops are removed.
- The unrelated Beyond design stop is removed, and What I do now follows the
  Journey with a shorter transition.
- What I do now presents React UI refinements, landing pages, accessible UI,
  targeted testing, and interface QA with more spacing across screen sizes.
- The later milestone links to the Assist-Ding setup PR and a merged AEO
  Toolkit contribution. Keep internship and client-conversion claims out until
  they can be verified.
- New Journey artwork can be added under `img/journey-assets/`; the current
  inline drawings remain temporary until replacement artwork is ready.

## Current source files

- `index.html` — page content, metadata, section markup, startup sequence.
- `css/main.css` — layout, responsive rules, typography, and animation styling.
- `js/main.js` — section transforms, scroll state, stats, and interactions.
- `js/garden/garden-standalone.js` — canvas typography and Garden animation.
- `js/curved-line-patch.js` — decorative curved line.
- `img/` — portfolio images and video assets.

## Verification snapshot

The integrated preview at `http://127.0.0.1:5000/` was checked at 1377 x 764.
The detailed measurements and screenshot observations are in
[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md). Highlights:

- The DOM title begins at 241.1 px and the Garden canvas starts around 1.9 s
  after reload; the user's laptop-Chrome movement was not reproduced.
- The hero reached its 70% opacity floor around scroll y=350 in the measured
  trace.
- The hero was hidden before About first appeared, leaving an observed gap.
- The About pose box ended 48 px below the last bio line in this preview.
- The settled Projects counter displayed `10+`; “company” is absent from the
  Worked with card.
- The only observed console/network error was a 404 for optional Vercel
  analytics. The user's separate Chrome logs remain unavailable.

These are preview observations, not cross-browser sign-off. The six issues in
[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) are still open and intentionally
deferred until the full website is complete.

## Next

The user will provide the next Journey content/art direction. Do not treat
this checkpoint as a final release or as confirmation that deferred polish
issues are fixed.
