# Portfolio Progress Checkpoint — 2026-11-21
> Status updated 2026-11-21: the hero refresh-size jump is fixed. Subhu accepts
> the current split centering. The next visual tasks are the About pose and
> supplied Selected Work images.

This replaces the older step-by-step log. Treat this as the current handoff
point; the full project backup is maintained by the user outside this folder.

## Current website state

- The site is a static portfolio served from `index.html`.
- The hero keeps its accessible DOM heading but animates the visible title and
  Garden bloom on one canvas, avoiding a DOM-to-canvas size/position swap.
  Garden sizing follows the heading's responsive font size and uses
  deterministic seeds. Scroll zoom/fade, the SU/BHU split, and the curved
  guide line remain in place.
- The About section and pose animation remain in place. The “Front-End” title
  is grouped to avoid breaking across lines. The current animation uses
  `img/pose0.webp` through `img/pose7.webp`; Subhu reports that the pose
  baseline still looks wrong on the laptop and supplied eight PNG pose frames
  in `img/my assets/`.
- The current stats are “Creating since 2026,” “Projects 10+,” and “Worked
  with 2.” The requested “company” placement is not implemented.
- The Journey section now has two month-based milestones: `MAR–AUG` and
  `SEP–PRESENT`. The older 2019 and 2026 stops are removed.
- The unrelated Beyond design stop is removed, and What I do now follows the
  Journey with a shorter transition.
- What I do now presents React UI refinements, landing pages, accessible UI,
  targeted testing, and interface QA with more spacing across screen sizes.
- Work now presents three verified examples: a live Accessible Search demo,
  an open Assist-Ding setup PR, and a merged AEO Toolkit contribution. Cards
  still use inline SVG flow diagrams; project dialogs use existing images from
  `img/projects/` and query URLs so refresh works on static hosting. Six
  additional project images were supplied in
  `D:\PROTFOLIO WEBSITE\selected-work-images` and are not yet integrated into
  the cards.
- The previous Distinkt feature is now a compact Assist-Ding project
  spotlight, using its supplied artwork and linking to the live first website.
  PR #2 remains referenced as project evidence. The copy makes no claims about
  business traction, and its scroll hold is shorter than before.
- The five supplied images are copied into `img/projects/` as descriptive PNG
  sources and optimized WebP files. Accessible Search and AEO Toolkit each use
  two project images; Assist-Ding uses one in its spotlight and project detail.
  The AEO Toolkit normalization image contains visible generated labels and
  should be cleaned up in Canva before publication.
- Subhu accepts the current centered split composition. Do not spend another
  pass adjusting WEB-003 unless requested. Garden flower variety is deferred;
  no Garden change is currently requested.
- Contact now says “Let’s build something,” keeps Copy email, and uses the
  provided email and LinkedIn link. The unrelated FAQ and old
  location/service links are removed. Stale John Bolster metadata and contact
  details are also removed; no site URL or preview image was invented.
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
- The About pose box ended 48 px below the last bio line in this preview.
- That prior measurement used image-box bounds and did not verify the visible
  feet or Subhu's laptop. Treat pose alignment as unresolved until checked at
  the user's actual viewport.
- At 320 x 766, the About bio began below the viewport; the mobile text
  transform added 306.4 px in the tested preview. At 1377 x 766, the text
  block began 215 px below the portrait's top.
- The settled Projects counter displayed `10+`; “company” is absent from the
  Worked with card.
- The only observed console/network error was a 404 for optional Vercel
  analytics. The user's separate Chrome logs remain unavailable.

These are preview observations, not cross-browser sign-off. WEB-001, WEB-002,
WEB-004, WEB-007, and WEB-008 are resolved in the integrated preview. Subhu
accepted WEB-003 as-is. WEB-005, WEB-006, WEB-009, and WEB-010 remain open or
deferred. See [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) for details.

## Next

Next, align the supplied About pose frames to the bio using Subhu's laptop
viewport, then replace the inline Work-card diagrams with the supplied project
artwork. Keep the current split centering and defer flower variety changes.
Do not treat this checkpoint as a final release.
