# Portfolio Progress Checkpoint
> Status updated 2026-11-23: core portfolio work is complete. Publish-only
> domain, metadata, account, and cross-browser checks remain separate.

This replaces the older step-by-step log. Treat this as the current handoff
point; the full project backup is maintained by the user outside this folder.

## Current website state

- The site is a static portfolio served from `index.html`.
- The hero keeps its accessible DOM heading but animates the visible title and
  Garden bloom on one canvas, avoiding a DOM-to-canvas size/position swap.
  Garden sizing follows the heading's responsive font size and uses
  deterministic seeds. Scroll zoom/fade, the SU/BHU split, and the curved
  guide line remain in place.
- The About section and pose animation are complete. The “Front-End” title
  is grouped to avoid breaking across lines. The current animation uses
  `img/poses/pose-1.webp` through `img/poses/pose-8.webp`. Integrated-preview
  measurements align the visible feet with the bio baseline; laptop sign-off
  remains separate.
- The stats are “Creating since 2026,” “Projects 10+,” and “Worked with 2.”
  “Worked” and “with” share one line; “company” sits below the right edge of
  “2.”
- The Journey section now has two month-based milestones: `MAR–AUG` and
  `SEP–PRESENT`. The older 2019 and 2026 stops are removed.
- The unrelated Beyond design stop is removed, and What I do now follows the
  Journey with a shorter transition.
- What I do now presents React UI refinements, landing pages, accessible UI,
  targeted testing, and interface QA with more spacing across screen sizes.
- Work presents three verified examples: a live Accessible Search demo,
  an open Assist-Ding setup PR, and a merged AEO Toolkit contribution. Cards
  use supplied project artwork; project dialogs use optimized images from
  `img/projects/` and query URLs so refresh works on static hosting. Display
  crops hide the Gemini sparkle without modifying the source images.
- The previous Distinkt feature is a compact Assist-Ding project
  spotlight, using its supplied artwork and linking to the live first website.
  The copy describes customer questions, order enquiries, and unattended-hours
  routine assistance. The visible PR #2 label is removed.
- Subhu accepts the current centered split composition. Do not spend another
  pass adjusting WEB-003 unless requested. Garden flower variety is deferred;
  no Garden change is currently requested.
- Contact now says “Let’s build something,” keeps Copy email, and uses the
  provided email and LinkedIn link. The unrelated FAQ and old
  location/service links are removed. Stale John Bolster metadata and contact
  details are also removed; no site URL or preview image was invented.
- The visual palette uses Bottle Green `#0F372B` as the base background,
  Bone `#EFE7DA` for the name and text, and deep Vermilion `#C62F28` for flowers
  and accents. Bone on Bottle Green measures 10.68:1 contrast.
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
- `img/` — portfolio images and video assets, including generated project
  artwork in `img/projects/`.

## Verification snapshot

The hero was checked in the integrated preview at 320 x 568, 390 x 844,
492 x 300, and 1024 x 768. Three fresh 390 x 844 loads produced identical
Garden size and letter positions. Reduced-motion mode painted the complete
name on its first frame. A scroll trace at 492 x 300 had a maximum per-frame
scale delta of 0.06. The mobile caption stayed within the viewport and did not
overlap the Scroll cue. Detailed issue history is in
[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).

- The earlier DOM-to-canvas title timing measurement is superseded by the
  single-canvas reveal.
- The previous 1377 x 764 trace reached the hero's 70% opacity floor around
  scroll y=350. The hero-to-About gap was subsequently fixed; recheck both
  behaviors after the recent scroll-smoothing change.
- The About pose visible feet align within about 3 px of the bio baseline at
  1366 x 768, 1440 x 900, 1600 x 1000, and 1920 x 1080. At 320 x 766, the
  portrait and full bio fit with about 14-16 px between them.
- The settled Projects counter displays `10+`; “company” appears in the
  Worked with card.
- The only observed console/network error was a 404 for optional Vercel
  analytics. The user's separate Chrome logs remain unavailable.

These are preview observations, not cross-browser sign-off. WEB-001,
WEB-002, WEB-004, WEB-005, WEB-006, WEB-007, WEB-008, WEB-009, and WEB-010
are implemented and verified in the integrated preview; Subhu accepted
WEB-003 as-is. Garden flower variety remains deferred.

## Next

Publish separately: confirm laptop behavior, cross-browser responsive behavior,
accessibility, canonical/Open Graph metadata, deployed links, asset
permissions, and analytics. Keep the split centering and defer flower variety.
