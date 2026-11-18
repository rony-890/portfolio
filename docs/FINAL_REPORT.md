# Current Checkpoint Handoff — 2026-11-18

## Status

**In progress; not a final or publish-ready release.** The current task is to
continue the portfolio, with the Journey section next.

## Preserved progress

- Static portfolio with the hero, About, stats, Journey, and remaining page
  content in `index.html`.
- Hero reveal, Garden canvas, scroll zoom/fade, SU/BHU split, and curved line.
- About pose and “Front-End” wrapping work.
- Stats currently settle to Creating since 2026, Projects 10+, and Worked with
  2.
- Detailed visual backlog in [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).

## Outstanding

- All six issues in [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) remain open and
  deferred. No fixes were made while documenting or cleaning the checkpoint.
- “company” is not present in the Worked with stat.
- The settled Projects value is `10+`; confirm whether the plus sign is
  intentional.
- Several About/project/contact/footer/SEO values still refer to John Bolster.
- Empty canonical/Open Graph URL fields and referenced icon files need review.
- User-laptop Chrome, mobile sizes, and cross-browser behavior are not verified.

## Verification performed

The integrated preview at `http://127.0.0.1:5000/` was measured at 1377 x 764.
It showed the documented title timing, fade/split progress, hero-to-About gap,
About baseline mismatch, and stat layout. See
[`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) for exact observations and
limitations. The only observed preview error was the optional
`/_vercel/insights/script.js` 404.

## Next step

Continue with the Journey section, then revisit the deferred visual backlog and
complete the pre-publish checks before considering deployment.
