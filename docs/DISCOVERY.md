# Current Project Discovery — 2026-11-18
> Status updated 2026-11-20: source issue fixes completed; final browser sign-off remains.

## Runtime shape

This is a static, single-page portfolio. `package.json` has no build or start
scripts; the browser loads the page assets directly.

## Active files

| File                             | Responsibility                                               |
| -------------------------------- | ------------------------------------------------------------ |
| `index.html`                     | Page content, section markup, metadata, and initialization   |
| `css/main.css`                   | Layout, responsive styling, type, and visual states          |
| `js/main.js`                     | Scroll-driven section transforms, counters, and interactions |
| `js/garden/garden-standalone.js` | Canvas-based “SUBHU” and Garden animation                    |
| `js/curved-line-patch.js`        | Decorative curved line attached to the hero                  |
| `img/`                           | Portfolio images, poses, and video assets                    |

The page currently requests `css/main.css?v=9`, `js/main.js?v=10`,
`js/garden/garden-standalone.js?v=6`, and `js/curved-line-patch.js?v=2`.
`js/scroll-animation.js` is disabled and is not part of the active runtime.

## Interaction model

- `js/main.js` projects page sections through a scroll-driven 3D scene. The
  internal camera is eased, so `window.scrollY` can differ from the rendered
  animation state during a transition.
- The Garden script draws the hero typography and animated floral forms on a
  canvas. Its reveal is sequenced after the DOM title reveal.
- The main stylesheet contains the About pose layout and responsive rules.
- The stats counter animates when its section enters view.

## Content and state

The current page includes the hero, About, By the numbers, a two-milestone
Journey (`MAR–AUG`, `SEP–PRESENT`), and further portfolio content. The user
will provide the next Journey content and artwork direction.

The page title and hero identify Subhu, but several About, project, contact,
footer, and structured-data values still refer to John Bolster. These are
publish blockers to review with the user; details are in
[`PRE_PUBLISH_CHECKLIST.md`](./PRE_PUBLISH_CHECKLIST.md).

## Known issues and verification limits

[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) is the source of truth for six open
visual issues. They have been measured in the integrated preview, but not fixed
because the user wants to finish the site before polishing.

The integrated preview was reachable at `http://127.0.0.1:5000/`. Its only
observed network error was an optional Vercel analytics 404. The user's laptop
Chrome and its logs were not available for inspection; mobile and multiple
aspect ratios have not been comprehensively tested.
