# Current Checkpoint Handoff — 2026-11-21

## Status

**Core implementation complete; not publish-ready.** Remaining work is
publish QA and deployment configuration, not portfolio feature implementation.

## Preserved progress

- Static portfolio with the hero, About, stats, Journey, and remaining page
  content in `index.html`.
- Single-canvas staggered hero reveal and Garden bloom; the old DOM-to-canvas
  title swap that caused the refresh size jump is removed. Scroll zoom/fade,
  SU/BHU split, and curved line remain.
- The About pose uses `img/poses/pose-1.webp` through
  `img/poses/pose-8.webp`; it is aligned in the integrated preview.
- Stats currently settle to Creating since 2026, Projects 10+, and Worked with
  2.
- The approved Bone, Bottle Green, and Vermilion palette is applied.
- The Assist-Ding panel retains lavender and uses Bone copy with only the
  live-site action.
- Detailed visual backlog in [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).

## Outstanding

- WEB-001, WEB-002, WEB-004, WEB-007, and WEB-008 are resolved in the
  integrated preview. Subhu accepts WEB-003's current centered split as-is.
- WEB-005, WEB-006, WEB-009, and WEB-010 are complete in the integrated preview.
- Selected Work cards use supplied artwork and project dialogs use supporting
  WebP images.
- “Company” appears below the right edge of the Worked with “2.”
- The settled Projects value remains `10+`.
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

Complete laptop and deployed-origin QA, canonical/Open Graph metadata,
copyright/permission confirmation, and analytics configuration. Keep the
current split centering and leave flower variety unchanged.
