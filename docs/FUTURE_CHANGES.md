# Future Changes

Status: core implementation completed. Publish-only checks remain separate.
Current split centering remains accepted by Subhu.

## Palette

- Bone: `#EFE7DA`
- Deep Vermilion: `#C62F28`
- Bottle green: `#0F372B`
- Assist-Ding lavender: preserve the existing lavender/Assist-Ding panel color
- No new invented accent colors

Complete: Bottle Green is the base page background and Bone is used for the
hero name and visible text. Vermilion is used for the Garden flowers and red
accents, including the curved guide line and HUD marks. Assist-Ding retains
lavender. What I do becomes deep black in the dark-section interpolation,
with Bone text.

## Hero and Garden

- Complete: keep “SUBHU” at a stable responsive size and position after refresh.
- Complete: animate the visible title and Garden on one canvas; do not replay a
  second DOM title.
- Complete: keep a centered Garden composition behind the canvas text.
- Complete in the integrated preview: fade gradually from 100% toward the
  70% floor and keep the hero visible as About arrives. Recheck after further
  scroll choreography changes.
- Accepted: Subhu likes the current split centering. Do not adjust it unless
  requested.
- Deferred: Subhu currently sees one flower type and does not want flower
  variety changed now. Do not alter Garden seeds or flower generation for this
  handoff.

## About

- Complete: the animation uses `img/poses/pose-1.webp` through
  `img/poses/pose-8.webp`.
- Complete in the integrated preview: align the visible pose's feet with the
  bio baseline at 1366 x 768, 1440 x 900, 1600 x 1000, and 1920 x 1080.
- Laptop physical-display sign-off remains separate from publish work.
- Complete: desktop keeps the pose close to the text without crowding it.
- Complete: mobile places the portrait above the bio.

## By the numbers

- Complete: place “Worked” and “with” on the same line.
- Complete: place “with” above the “2”.
- Complete: place “company” below the right edge/tail of “2”.
- Complete: maintain the hierarchy shared with “Creating since” / “2026”.
- Complete: keep Projects at `10+`.

## Journey

- Complete: keep “The journey” close to “so far”.
- Complete: remove the `100MB` text from the MAR-AUG storage illustration.
- Complete: preserve both milestone layouts and project links.

## What I do

- Complete: preserve the five services.
- Complete: preserve keyboard and tap interactions.
- Review remains: tune the desktop presentation only if the live preview is not
  clear enough.

## Selected Work

- Complete: replace inline SVG card diagrams with optimized project artwork.
- Complete: map Accessible Search to its portfolio cover and demo detail.
- Complete: map Assist-Ding to its work-card cover and spotlight detail.
- Complete: use the AEO Toolkit test image and component image; leave the
  text-labeled contribution artwork unused.
- Complete: crop the Gemini sparkle out of the display area without changing
  the source files.
- Complete: keep useful alt text and project links.
- Complete: one active card remains readable at each narrow-screen scroll stop.

## Assist-Ding spotlight

- Complete: retain the lavender panel.
- Complete: use Bone for the heading and body copy.
- Complete: describe customer questions, order enquiries, and unattended-hours
  routine assistance.
- Complete: keep only “Visit live site” as the visible primary action.
- Complete: remove the visible “Open PR · #2” label.

## Contact and FAQ

- Current contact copy and email/LinkedIn actions are in place. The FAQ was
  removed in the current version; do not restore it unless Subhu requests it.
- Do not add a contact form unless Subhu explicitly requests one.

## Deferred publication work

- Add canonical and Open Graph URLs only after the deployed domain is known.
- Replace/remove missing favicon references.
- Remove or configure Vercel analytics.
- Complete cross-browser and accessibility QA.
