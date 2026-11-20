# Website Issue Log

## Checkpoint status — 2026-11-20

The issue-fix pass has been implemented in the live source. Verification uses
the integrated preview only; final sign-off still requires Subhu's laptop
Chrome and physical display.

Resolved in this pass:
- WEB-001: the DOM title and Garden handoff now avoid a second visible title
  after the first reveal.
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
- The “Worked” and “with” labels are placed on one line, with “company” paired
  beside the “2” tail.

Needs final visual sign-off:
- WEB-003: split gap centering.
- WEB-005: portrait baseline and bio proportion.
- WEB-006: exact glyph-tail alignment.
- WEB-009: mobile and desktop About stacking.

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
- This is a report-only update. No website behavior was changed, and all items
  remain open for the post-completion polish pass.

## Open Issues

### WEB-001 — Hero title flashes oversized on refresh

- **Priority:** High
- **Status:** Open — fix deferred by user
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
- **Integrated-preview test:** At 1377 x 764, the DOM title measured 900 x 207
  at x=266, y=17 with a computed 241.1 px font size and opacity 1 from about
  100 ms through 1400 ms after reload. The Garden canvas had not started during
  that interval. At about 1900 ms the Garden had started and the DOM title
  opacity was 0. The title's measured box and transform did not move during
  these samples. This confirms a very large initial title in the integrated
  preview, but does not reproduce the screenshot's apparent shrink/drag into
  place; that movement remains unverified in the user's Chrome.
- **Investigation/fix:** Tested in the integrated preview; not fixed, per user
  request. Capture the user's actual Chrome refresh before choosing a fix.

### WEB-002 — Hero fade timing at the next-section transition

- **Priority:** Not triaged
- **Status:** Open — fix deferred by user
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
- **Investigation/fix:** Tested in the integrated preview; not fixed, per user
  request. Compare against the screenshot's exact state during later tuning.

### WEB-003 — Center the gap between the split hero groups

- **Priority:** Not triaged
- **Status:** Open — fix deferred by user
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
- **Investigation/fix:** Tested in the integrated preview; not fixed, per user
  request. Verify the gap in the rendered screenshot when polishing.

### WEB-004 — Hero disappears before the next section arrives

- **Priority:** Not triaged
- **Status:** Open — polish after the website is complete
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
- **Investigation/fix:** Tested in the integrated preview; not fixed. Keep this
  in the backlog until the website is complete.

### WEB-005 — About portrait size and baseline vary by screen ratio

- **Priority:** Not triaged
- **Status:** Open — polish after the website is complete
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
- **Integrated-preview test:** At 1377 x 764, y=1200, with the HUD on “About,”
  the pose image box measured 310 x 556 at x=319, y=152. The bio rendered as
  11 lines; its last line ended at y=660, while the pose box ended at y=708
  (48 px lower). This confirms a baseline mismatch in the integrated preview,
  but not necessarily the same direction or magnitude as the user's Chrome.
  Only this desktop ratio was tested; 4:3, mobile, and the user's laptop Chrome
  remain unverified. These are image-box bounds, not alpha-pixel bounds of the
  figure itself.
- **Investigation/fix:** Tested in the integrated preview; not fixed. Keep this
  in the backlog until the website is complete.

### WEB-006 — Rework the “Worked with 2 company” composition

- **Priority:** Not triaged
- **Status:** Open — polish after the website is complete
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
- **Integrated-preview test:** After the counter settled at y=2800, “Worked
  with” measured 83 x 16 at x=1071, y=194; “with” alone measured 30 x 13 at
  x=1124, y=195; and the “2” box measured 72 x 155 at x=1071, y=216. Thus
  “with” is 21 px above the number box and overlaps its upper-right area.
  “company” is absent from the current card's DOM. The visible tail itself
  needs pixel-level alignment during implementation; a DOM box is not the
  glyph's exact outline. The Projects counter was “0+” at 350 ms and settled
  to “10+” after about 2.85 s; confirm whether the plus sign is intended when
  reviewing the final stats.
- **Investigation/fix:** Tested in the integrated preview; not fixed. Keep this
  in the backlog until the website is complete.

### WEB-007 — Work project cards overlap on narrow screens

- **Priority:** High
- **Status:** Open — fix deferred by user
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
- **Fix direction:** Adjust the Work scene's spacing/visibility so only the
  intended card occupies the active area. No source changes have been made,
  per the user's instruction.

### WEB-008 — Remove the blue scroll-progress line at the right edge

- **Priority:** Medium
- **Status:** Open — fix deferred by user
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
- **Fix direction:** Remove the unwanted blue rail as requested, then verify
  whether the marker should go with it. No source changes have been made.

### WEB-009 — About bio block sits too low

- **Priority:** High on narrow screens
- **Status:** Open — fix deferred by user
- **Area:** About / bio positioning
- **Reported:** 2026-11-18
- **Observed:** At 320 x 766, after selecting About and waiting for the scene
  to settle, the portrait occupied y=209–543 while the bio container began at
  y=695. The title began at y=726 and the paragraph at y=798, below the
  viewport; the paragraph ended at y=1098. At 1377 x 766, the text container
  began at y=336, 215 px below the portrait's top at y=121. This reproduces the
  user's report that the bio sits too low.
- **Expected:** Raise the bio heading and copy so they appear within the About
  scene and sit in a deliberate relationship to the portrait, including on
  narrow screens.
- **Reproduce:** Open `http://127.0.0.1:5000/`, set the viewport to 320 x 766,
  select About from the navigation, and wait about 2.2 seconds. In this run the
  page reached `scrollY=1466`; the number varies with viewport and camera
  easing.
- **Integrated-preview test:** At 320 x 766, the bio's computed transform was
  `translateY(306.4px)`, matching the mobile CSS rule. At 1377 x 766, the bio
  remained visibly lower than the portrait's top, though it fit in the
  viewport. These measurements are preview observations, not the exact user's
  Chrome state.
- **Likely cause:** The About text scene uses a lower vertical position
  (`data-p="0.18,0.21"` and mobile `data-mp="0,0.35"` in
  [index.html](./index.html):402), and the <=360 px rule adds
  `translateY(40vh)` ([css/main.css](./css/main.css):638). The mobile offset is
  directly confirmed by the computed transform; the desktop placement also
  needs to be tuned against the intended composition. This is separate from
  WEB-005, which tracks portrait sizing and baseline alignment.
- **Fix direction:** Rework the About text's vertical placement and narrow
  screen stacking, then verify the portrait and complete bio together at
  mobile and desktop sizes. No source changes have been made.
