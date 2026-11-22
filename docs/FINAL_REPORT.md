# Current Checkpoint Handoff — 2026-11-21

## Status

**In progress; not a final or publish-ready release.** The next handoff work is
the About pose alignment and supplied Selected Work images.

## Preserved progress

- Static portfolio with the hero, About, stats, Journey, and remaining page
  content in `index.html`.
- Single-canvas staggered hero reveal and Garden bloom; the old DOM-to-canvas
  title swap that caused the refresh size jump is removed. Scroll zoom/fade,
  SU/BHU split, and curved line remain.
- The About pose animation currently uses `img/pose0.webp` through
  `img/pose7.webp`. Subhu reports that its baseline still looks wrong on the
  laptop and supplied eight PNG pose frames under `img/my assets/`.
- Stats currently settle to Creating since 2026, Projects 10+, and Worked with
  2.
- Detailed visual backlog in [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).

## Outstanding

- WEB-001, WEB-002, WEB-004, WEB-007, and WEB-008 are resolved in the
  integrated preview. Subhu accepts WEB-003's current centered split as-is.
- WEB-005, WEB-006, WEB-009, and WEB-010 remain open in
  [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md): pose baseline, stats layout, bio
  position, and supplied Work-card artwork.
- Selected Work cards still use inline SVG diagrams. The new image set is in
  `D:\PROTFOLIO WEBSITE\selected-work-images`; existing project-dialog images
  remain in `img/projects/`.
- “company” is not present in the Worked with stat.
- The settled Projects value is `10+`; confirm whether the plus sign is
  intentional.
- Canonical/Open Graph URL fields and referenced icon files need review before
  publication.
- User-laptop Chrome and cross-browser behavior are not verified; mobile checks
  are limited to the listed viewports.

## Verification performed

The hero was checked at 320 x 568, 390 x 844, 492 x 300, and 1024 x 768.
Garden size and positions were identical across three fresh 390 x 844 loads;
the mobile name size matched the responsive heading, and reduced-motion mode
painted the full name on its first frame. The scroll trace showed a maximum
scale delta of 0.06 per frame at 492 x 300. See
[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) for remaining issues and
limitations. The optional `/_vercel/insights/script.js` request still returns
404.

The earlier pose comparison measured the image box, not the visible silhouette,
and did not use Subhu's laptop viewport. Pose alignment is not verified.

## Next step

Use the supplied pose PNGs to correct the visible feet-to-bio baseline at
Subhu's laptop viewport. Then replace Work-card diagrams with the supplied
project images. Keep the current split centering and leave flower variety
unchanged. Recheck WEB-006 and WEB-009 before publication.
