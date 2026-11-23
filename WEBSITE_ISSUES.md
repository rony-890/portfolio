# Website Issue Log

## Current checkpoint

WEB-001 is resolved in the live source. The hero name now rises and blooms in
one Garden canvas instead of switching from the animated DOM heading to a
differently sized canvas rendering. The Garden uses the heading's computed
responsive font size and deterministic seeds.

Playwright verification: the rendered size and letter positions were identical
across three fresh loads at 390 x 844. The name size matched the heading at
320 x 568, 390 x 844, 492 x 300, and 1024 x 768. Reduced-motion mode showed
the full name on its first painted frame. The mobile caption stayed inside the
viewport and clear of the Scroll cue. A scroll trace at 492 x 300 changed
scale by at most 0.06 per frame. Final sign-off still requires Subhu's laptop
Chrome and physical display.

The final polish for WEB-005, WEB-006, WEB-009, and WEB-010 is implemented and
verified in the integrated preview. The About pose uses the eight-frame WebP
sequence in `img/poses/`; its visible feet align with the bio baseline within
about 3 px at desktop viewports from 1366 x 768 through 1920 x 1080. At
320 x 766, the full bio fits in the viewport, with about 16 px between the
portrait and text. This does not replace testing on Subhu's laptop.

The three Work cards use project artwork, and their dialogs load the selected
supporting images with alt text. A small display crop hides the Gemini sparkle
in the lower-right corner without changing the source files. The “Worked” and
“with” labels share one line; “company” sits below and to the right of the
“2.” WEB-003's centered split composition remains accepted. Garden flower
variety is deferred.

The final palette uses Bottle Green `#0F372B` as the base page background,
Bone `#EFE7DA` for high-contrast text and the hero name, and Vermilion
`#C62F28` for flowers and accents. Measured rendered contrast for Bone on
Bottle Green is 10.68:1. The Assist-Ding panel retains its lavender color;
its heading and body copy use Bone, and only “Visit live site” remains visible.
The curved guide line and HUD accent now also use Vermilion; the integrated
preview confirmed the red line against the green base and Bone name.
Garden stems and leaves use muted green `#4A685A`; veins use lighter sage
`#AFC0A6`; flower fills use deep Vermilion `#C62F28`. Petal linework uses Bone
`#EFE7DA`, creating enough separation without overpowering the hero.

Previously verified changes (2026-11-20):

- WEB-001: the DOM title was hidden once Garden became active. The
  2026-11-21 single-canvas reveal replaces that handoff.
- The Garden-only hero is now the visible title after reveal; Playwright
  confirmed that the DOM title opacity is 0 while the Garden canvas is active.
- WEB-002: the hero settles gradually at the 70% opacity floor instead of
  jumping directly from the initial state.
- Verified trace: opacity 1 at y=0, 0.997 at y=200, 0.922 at y=250,
  0.759 at y=300, and 0.700 from y=350 onward in the 1377 x 764 preview.
- WEB-004: the hero remains present through the start of the About transition
  instead of cutting off before the next scene arrives.
- Verified trace: About becomes visible at y=550 with opacity 0.882 and reaches
  opacity 1 at y=800 in the 1377 x 764 preview.
- WEB-007: the narrow-screen Work scene now hides inactive project cards.
- Verified at 320 x 800: 0/1/2 card parents showed hidden/visible/hidden, with
  one Assist-Ding card in the active viewport.
- WEB-008: the right-edge HUD progress rail is hidden.
- The Journey "100MB" illustration label is removed.

Remaining verification and publish work:

- Test the final About composition on Subhu's laptop Chrome and physical
  display.
- Complete keyboard, reduced-motion, zoom, and deployed-origin link checks.
- Resolve canonical/Open Graph values after the production domain and approved
  preview image are available.
- Configure or remove the optional Vercel analytics script, which returns 404
  in the integrated preview.

WEB-003 is accepted as-is by Subhu. Garden flower variety is explicitly
deferred.

Use this file to collect website issues for later review and fix them one at a
time. Do not treat an issue as resolved until it has been verified.

## Evidence and test conditions

- The observations below include the screenshots supplied in the conversation.
  The screenshots are not saved in the repository; screenshot-based pixel
  estimates are therefore explicitly marked approximate.
- The integrated preview was checked at
  `http://127.0.0.1:5000/?refresh=20261118-intro-v6` with a 1377 x 764 viewport
  (about 1.80:1). This is close to the supplied About screenshot's approximate
  1377 x 766 size, but does not reproduce the user's laptop Chrome environment.
- Scroll values are browser `window.scrollY`. The site eases its internal
  camera position, so rendered animation state can lag the requested scroll
  value; measurements are observations, not exact animation thresholds.
- The only preview console/network error observed was a 404 for the optional
  `/_vercel/insights/script.js` request. No failure for the portfolio's main
  assets was observed. The user's separate Chrome logs could not be inspected.
- At 320 x 800, selecting Work in the integrated preview placed all three Work
  cards at the same visible coordinates. The page eased to `scrollY=8648` in
  that run; use the Work navigation rather than treating that scroll offset as
  a stable threshold.
- A fresh 1440 x 900 load followed by a direct scroll to y=9424 showed only
  Accessible Search after settling. The earlier live Work view showed multiple
  items overlapping, so the desktop reproduction remains dependent on the
  scroll path or animation state and needs another check during the fix.
- The blue right-edge line was reproduced in the preview. Its colored segment
  and marker belong to the fixed `#hud` scroll indicator; `#spacer` has a
  transparent background and only adds scroll height.
- Preview measurements are historical where the issue status below records a
  later resolution or user decision. The latest About-pose report is from
  Subhu's laptop; it still needs direct viewport verification.

## Tracked Issues

### WEB-001 — Hero title flashes oversized on refresh

- **Priority:** High
- **Status:** Resolved — 2026-11-21
- **Area:** Hero / page-load animation
- **Reported:** 2026-11-18
- **Observed:** On refresh, “SUBHU” first appears much larger than its intended
  size, then quickly shrinks or shifts into its centered position. The jump
  happens within a split second and is visually jarring.
- **Expected:** The title should appear at its intended size and position, or
  transition smoothly into them without an oversized flash.
- **Reproduce:** Open the local preview and refresh:
  `http://127.0.0.1:5000/?refresh=20261118-intro-v6`
- **Screenshot detail:** The supplied before/after screenshots show the title
  first oversized in the hero and then in its settled composition. The images
  establish the visual jump, but do not record its duration or exact scroll
  offset; the screenshot pixels are not available locally for direct measuring.
- **Previous integrated-preview test (before the fix):** At 1377 x 764, the
  DOM title measured 900 x 207
  at x=266, y=17 with a computed 241.1 px font size and opacity 1 from about
  100 ms through 1400 ms after reload. The Garden canvas had not started during
  that interval. At about 1900 ms the Garden had started and the DOM title
  opacity was 0. The title's measured box and transform did not move during
  these samples. This confirms a very large initial title in the integrated
  preview, but does not reproduce the screenshot's apparent shrink/drag into
  place; that movement remains unverified in the user's Chrome.
- **Resolution:** Removed the visible DOM-to-canvas handoff. Garden now draws
  the staggered rise and bloom on the same canvas, uses the responsive heading
  font size, and generates its floral layout from deterministic seeds. The
  generic 3D text-fit rule no longer shrinks the full-width hero heading box.
- **Verification:** Fresh-load checks at 320 x 568, 390 x 844, 492 x 300, and
  1024 x 768; three identical 390 x 844 reload measurements; reduced-motion
  first-frame check; and a scroll trace at 492 x 300. The user's physical
  display and laptop Chrome remain unverified.

### WEB-002 — Hero fade timing at the next-section transition

- **Priority:** Not triaged
- **Status:** Resolved in integrated preview — 2026-11-20
- **Area:** Hero / scroll transition
- **Reported:** 2026-11-18
- **Requested behavior:** Begin fading at approximately the scroll position
  shown in the latest screenshot, transitioning smoothly from 100% opacity to
  70% as the hero moves into the next section. Confirm the exact start point
  during later review.
- **Screenshot detail:** The supplied screenshot shows the zoomed hero at the
  desired fade-start state. The requested endpoint is 70% opacity by the next
  section; the screenshot does not expose a machine-readable scroll position.
- **Integrated-preview test:** At 1377 x 764, a settled scroll trace measured
  hero opacity 1 at y=0, 150, and 200; 0.988 at y=250; 0.832 at y=300; and the
  0.7 floor at y=350 and y=400. This places the fade roughly between y=200 and
  y=350 in this preview. Because the camera is eased, these values are not a
  portable pixel-perfect threshold for the user's screenshot or laptop.
- **Resolution:** The hero now fades gradually to the 70% floor instead of
  dropping directly from its initial opacity. The trace above records the
  integrated-preview behavior; recheck the exact screenshot timing during
  final visual polish.

### WEB-003 — Center the gap between the split hero groups

- **Priority:** Not triaged
- **Status:** Closed by user preference — 2026-11-21
- **Area:** Hero / split animation
- **Reported:** 2026-11-18
- **Observed:** During the scroll split, “SU” moves too far left and “BHU” too
  far right, leaving their gap away from the page center.
- **Expected:** Keep the space between “SU” and “BHU” centered on the viewport
  during the split for a balanced composition.
- **Screenshot detail:** The supplied split-state screenshot shows “SU” on the
  left and “BHU” on the right, with their gap visibly away from the page
  midpoint. The user specifically wants the gap itself centered, not merely
  equal movement of both groups.
- **Integrated-preview test:** At 1377 x 764 and y about 426, the split was
  complete. The canvas midpoint was x=405 and the calculated gap midpoint was
  x=365.2 in canvas coordinates, or 44.3 CSS px left of that midpoint. With the
  hero's measured 2.4987 scale, this corresponds to an estimated 111 px
  left-of-center screen displacement. This is a geometry-based estimate, not a
  direct pixel scan of the screenshot.
- **Resolution:** Subhu accepts the current centered split composition and
  likes it. Do not change it unless Subhu asks.

### WEB-004 — Hero disappears before the next section arrives

- **Priority:** Not triaged
- **Status:** Resolved in integrated preview — 2026-11-20
- **Area:** Hero / section transition
- **Reported:** 2026-11-18
- **Observed:** While scrolling, the hero title remains visible and then
  disappears abruptly before the next section has fully arrived, leaving a
  blank background that feels like a video ending too early.
- **Expected:** The scroll transition should carry the viewer into the next
  section without an abrupt disappearance or empty gap.
- **Screenshot detail:** The supplied scroll-state screenshot and description
  show the hero still present during the transition, then gone while the
  background is still blank and the next section has not fully arrived. The
  user compared it to a video ending before its scene finishes.
- **Integrated-preview test:** At 1377 x 764, the hero was `visibility:hidden`
  by y=550 while About was still hidden; both were hidden at y=700. About first
  became visible at y=800 with opacity 0.15 while the HUD still said “Home,”
  and reached opacity 1 with the HUD on “About” by y=1000. This confirms a
  roughly 250 px scroll interval from the hero hiding to About first appearing,
  followed by a gradual arrival. The hero's inline opacity remained at 0.7
  while hidden.
- **Resolution:** The hero remains visible as About begins to arrive. In the
  1377 x 764 preview, About reached opacity 0.882 at y=550 and 1 at y=800.
  Recheck after further scroll choreography changes.

### WEB-005 — About portrait size and baseline vary by screen ratio

- **Priority:** Not triaged
- **Status:** Implemented and verified in the integrated preview; laptop sign-off
  remains open
- **Area:** About / responsive layout
- **Reported:** 2026-11-18
- **Observed:** The portrait size and foot baseline still look wrong for the
  user's screen ratio, despite appearing correct in the VS Code preview.
- **Expected:** The full pose should scale and align consistently with the
  bio's last line across screen ratios.
- **Screenshot detail:** The supplied About screenshot (approximately
  1377 x 766) shows the full-body portrait to the left of the bio. The portrait
  looks too small for the composition, and its feet do not align with the
  bio's final line. The screenshot confirms the mismatch; no exact pixel delta
  is claimed from the image.
- **Integrated-preview test:** The visible alpha edge of the pose frames was
  measured against the bio's bottom at 1366 x 768, 1440 x 900, 1600 x 1000, and
  1920 x 1080. The differences were within about 3 px at all four sizes.
  At 320 x 766, the portrait's visible bottom was about 16 px above the bio,
  and the full bio ended at y=763, inside the viewport.
- **Assets and implementation:** The page now uses
  `img/poses/pose-1.webp` through `pose-8.webp`, generated from the supplied
  eight-frame set. The desktop offset accounts for transparent space at the
  bottom of each image. The user's laptop Chrome and physical display remain
  unverified.

### WEB-006 — Rework the “Worked with 2 company” composition

- **Priority:** Not triaged
- **Status:** Implemented and verified in the integrated preview
- **Area:** By the numbers / stat layout
- **Reported:** 2026-11-18
- **Observed:** The “Worked with” label does not align with the number in the
  intended composition.
- **Expected:** Place “with” above the top of the “2”, then place “company”
  below and to the right of the number's tail, starting about 1em below where
  the tail ends. The intended placement of “Worked” relative to “with” is
  still unspecified; preserve the word and confirm its position during polish.
- **Screenshot detail:** The supplied stats reference shows the “Worked with”
  label and large “2.” The requested composition is for “with” to sit above
  the number and “company” to begin about 1em below the end of the number's
  tail, aligned to its right side.
- **Integrated-preview test:** At 1440 x 900 after the counters settled,
  “Worked” and “with” share one line above the “2.” “Company” appears below
  and to the right of the number; its rendered text box begins about 13 px
  below the number's box. The Projects counter settles to “10+.”
- **Implementation:** The label and company placement are styled in
  `css/main.css`. Review the final composition on Subhu's laptop before
  publishing.

### WEB-007 — Work project cards overlap on narrow screens

- **Priority:** High
- **Status:** Resolved in integrated preview — 2026-11-20
- **Area:** Work / responsive 3D scroll scene
- **Reported:** 2026-11-18
- **Observed:** At 320 x 800, selecting Work in the integrated preview shows all
  three project cards at once in nearly identical bounds: approximately
  x=45, y=244, 230 x 284 px. Their boxes overlap almost completely, hiding the
  first two cards beneath AEO Toolkit. A center-point hit test targeted
  AEO Toolkit, so the underlying cards are also obstructed for pointer users.
- **Expected:** Each Work card should have its own readable scroll moment and
  not cover another card. Each project should remain individually selectable.
- **Reproduce:** Open
  `http://127.0.0.1:5000/`, set the viewport to 320 x 800, select Work from the
  navigation, and wait for the scene to settle. In this run the page reached
  `scrollY=8648`; the exact value may vary with viewport and scroll easing.
- **Integrated-preview test:** At 320 x 800, Accessible Search, Assist-Ding,
  and AEO Toolkit were all `visibility: visible`, each at approximately the
  same 230 x 284 px rectangle. Their parent transforms also placed them within
  about 0.2 px of one another. At 1440 x 900, a clean reload followed by a
  direct scroll to y=9424 showed only Accessible Search after settling; the
  earlier live Work view did show multiple items overlapping. Treat the
  desktop behavior as path-dependent and recheck it during the fix.
- **Likely cause:** The Work generator spaces later stops with `data-gap="1.55"`
  ([js/main.js](./js/main.js):390), while the 3D scene keeps elements visible
  through a depth window reaching `2.7 * p`
  ([js/main.js](./js/main.js):1250). Multiple nearby cards can therefore be
  visible together, and perspective positioning brings their boxes into the
  same area on the narrow viewport. This is the best-supported explanation
  from the source and preview; the exact desktop trigger still needs
  confirmation.
- **Resolution:** The narrow-screen fix hides inactive cards so only the
  active Work card is visible. At 320 x 800, the three card parents showed
  hidden/visible/hidden. Recheck other viewport sizes during final Work-scene
  polish.

### WEB-008 — Remove the blue scroll-progress line at the right edge

- **Priority:** Medium
- **Status:** Resolved in integrated preview — 2026-11-20
- **Area:** Global HUD / scroll indicator
- **Reported:** 2026-11-18
- **Observed:** A blue vertical line and progress marker appear at the right
  edge of the page in the supplied browser view. The user considers the line
  extra and wants it removed.
- **Expected:** The blue vertical line should not appear. Confirm separately
  whether the endpoint marker or the other HUD ticks should also be removed.
- **Reproduce:** Scroll the integrated preview to a content section. At 320 x
  800, the HUD rail measured 1 x 694 px at x=305, y=84; its blue segment was
  about 347 px high and its marker used the same blue color.
- **Investigation:** The visible rail is the fixed `#hud` progress indicator,
  not `#spacer`: `#hud .trk i` paints the progress segment with `var(--line)`
  ([css/main.css](./css/main.css):344), and `.hd` paints the marker with that
  color ([css/main.css](./css/main.css):369). The scroll handler updates its
  progress value ([js/main.js](./js/main.js):1698). The selected `#spacer`
  element is transparent and only provides document scroll height.
- **Resolution:** The right-edge HUD progress rail is hidden. Recheck the
  remaining HUD and marker during final visual polish.

### WEB-009 — About bio block sits too low

- **Priority:** High on narrow screens
- **Status:** Implemented and verified in the integrated preview
- **Area:** About / bio positioning
- **Reported:** 2026-11-18
- **Observed:** The previous mobile layout put much of the bio below the
  viewport.
- **Expected:** Raise the bio heading and copy so they appear within the About
  scene and sit in a deliberate relationship to the portrait, including on
  narrow screens.
- **Integrated-preview test:** At 320 x 766, the bio box measured y=359–763,
  so the full copy fits within the viewport. The visible portrait ends about
  16 px above the bio. Desktop placement was checked with the pose baseline at
  1366 x 768, 1440 x 900, 1600 x 1000, and 1920 x 1080.
- **Implementation:** The mobile pose and bio use the stacked layout; desktop
  positioning is tuned together with WEB-005. Confirm both on Subhu's laptop.

### WEB-010 — Replace Selected Work card diagrams with supplied artwork

- **Priority:** Medium
- **Status:** Implemented and verified in the integrated preview
- **Area:** Work / project-card artwork
- **Reported:** 2026-11-21
- **Observed:** The Work cards previously rendered inline SVG flow diagrams.
- **Expected:** Use Subhu's supplied project artwork for the three Work cards
  while preserving project links, dialog behavior, and accessible text.
- **Supplied images:** `D:\PROTFOLIO WEBSITE\selected-work-images` contains
  `Accessible Search project in a frontend portfolio.png`,
  `Accessible Search React demo.png`,
  `AEO Toolkit open-source contribution.png`,
  `AuditInputCard test added in AEO Toolkit PR70.png`,
  `Assist-Ding spotlight in a junior frontend developer portfolio.png`, and
  `Assist-Ding Work-card cover.png`.
- **Integrated-preview test:** All three Work card images load, the cards no
  longer contain inline SVG diagrams, and each project dialog loads its
  selected image or images with alt text. The display crop hides the small
  lower-right Gemini sparkle while keeping the source images unchanged. The
  AEO Toolkit card uses the test artwork; the supplied contribution image with
  visible generated labels is not used.
- **Implementation:** The cards use optimized WebP covers in `img/projects/`.
  Accessible Search, Assist-Ding, and AEO Toolkit dialogs preserve their
  project links and display the selected supporting artwork.
