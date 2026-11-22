# Neon Handoff: Portfolio

This file records the current decisions, supplied assets, and pending work for
the next implementation pass. Read it with the issue log and progress reports
before changing the site.

## Read first

1. [`WEBSITE_ISSUES.md`](./WEBSITE_ISSUES.md) for tracked issue status and
   previous verification evidence.
2. [`docs/CHANGES_REPORT.md`](./docs/CHANGES_REPORT.md) for the current site
   state.
3. [`docs/FINAL_REPORT.md`](./docs/FINAL_REPORT.md) for handoff limitations.
4. [`docs/FUTURE_CHANGES.md`](./docs/FUTURE_CHANGES.md) for broader approved
   direction.

Address the user as Subhu and communicate in professional English. Keep the
work focused on the remaining tasks below; do not redesign unrelated sections.

## Current decisions

- Subhu accepts the current centered split between “SU” and “BHU.” WEB-003 is
  closed by user preference. Do not adjust the split.
- The Garden currently shows one flower type. Subhu has deferred flower
  variety changes. Do not change flower generation or its seeds in this pass.
- The About pose still looks misaligned on Subhu's laptop. Treat it as open
  until verified at the user's actual viewport.
- Subhu supplied eight replacement pose PNGs and six new Selected Work images.
  Their original files must remain unchanged.

## Priority 1: align the About pose and bio

The current page uses the eight-frame sequence `img/pose0.webp` through
`img/pose7.webp`. The supplied PNGs are in
`D:\PROTFOLIO WEBSITE\subhu-jb-portfolio\img\my assets`:

- `pose_1.png`
- `pose_2.png`
- `pose_3.png`
- `pose_4.png`
- `pose_5.png`
- `pose_6.png`
- `pose_7.png`
- `pose_8.png`

Use the supplied frames in filename order after checking that they form the
intended sequence. Preserve the existing scroll-driven, one-frame-at-a-time
pose behavior; do not turn it into a carousel or show all eight images at once.
If the files do not appear to be a sequence, ask Subhu before choosing a new
interaction.

Relevant implementation:

- `index.html` contains the current About pose images and the bio markup.
- `css/main.css` styles `.ab-fig.pose`; its desktop transform and mobile sizing
  differ by viewport.
- `js/main.js` selects the active `.pose img` frame during the About scene.

Align the visible figure's feet with the intended bio baseline. Compare the
transparent-pixel bounds of each figure, not just the image element's box.
Keep the pose uncropped, preserve its aspect ratio, and prevent frame changes
from making the feet visibly jump.

The earlier preview measured the image box, not the visible silhouette, and
Subhu reports that the laptop result is still wrong. Use Subhu's actual laptop
viewport and zoom for final verification. If those dimensions or a current
screenshot are unavailable, ask for them and report the alignment as
unverified. Also check a narrow mobile viewport so the pose and complete bio
remain visible together.

## Priority 2: use the supplied Selected Work images

The six source images are outside the repository at
`D:\PROTFOLIO WEBSITE\selected-work-images`:

- `Accessible Search project in a frontend portfolio.png`
- `Accessible Search React demo.png`
- `AEO Toolkit open-source contribution.png`
- `AuditInputCard test added in AEO Toolkit PR70.png`
- `Assist-Ding spotlight in a junior frontend developer portfolio.png`
- `Assist-Ding Work-card cover.png`

The current project cards render inline SVG diagrams through
`renderWorkDiagram` in `js/main.js`. The project detail dialogs already use
assets from `img/projects/`. Inspect the supplied images, then replace the
card diagrams with suitable project artwork. Use supporting images in the
dialogs when they add relevant detail.

Filename-based mapping to verify against the actual artwork:

- Accessible Search: use `Accessible Search project in a frontend portfolio.png`
  as the card-cover candidate and `Accessible Search React demo.png` as
  supporting detail.
- Assist-Ding: use `Assist-Ding Work-card cover.png` as the card-cover
  candidate and
  `Assist-Ding spotlight in a junior frontend developer portfolio.png` for the
  spotlight or project detail.
- AEO Toolkit: use `AEO Toolkit open-source contribution.png` as the
  card-cover candidate and `AuditInputCard test added in AEO Toolkit PR70.png`
  as supporting proof. Check the generated labels before publication.

Do not use the external D: drive path in page URLs. Copy selected assets into
the repository, keep the originals intact, and use the existing PNG/WebP
pattern in `img/projects/`. The project already depends on `sharp`; do not add
another image-processing dependency. Update image paths, cache versions, and
alt text when assets change. Keep project links, dialog navigation, and
keyboard access working.

## Remaining tracked work

- WEB-005: use the supplied pose frames and align the visible pose to the bio
  on Subhu's laptop.
- WEB-009: correct the bio's vertical position and its mobile/desktop
  relationship to the pose.
- WEB-010: replace the three Work-card diagrams with the supplied project
  artwork.
- WEB-006: the “Worked with 2 company” stat composition remains open. Keep it
  in the backlog unless Subhu changes the priority.

## Verification before handoff

1. Check the About scene at Subhu's actual laptop viewport and at a narrow
   mobile viewport. Confirm the visible feet align with the bio's last line
   across the eight frames, without clipping or baseline jumps.
2. Open each Work card and project dialog. Confirm the correct image, useful
   alt text, working links, dialog navigation, and no broken image requests.
3. Recheck the Work scene at mobile and desktop sizes. Confirm the active card
   remains readable and the other cards do not overlap it.
4. Run `node --check js/main.js` if JavaScript changes, and run
   `git diff --check`.
5. Report the tested viewport sizes and call out any check that could not be
   run on Subhu's actual laptop.

Do not reopen the accepted split-centering issue or change Garden flower
variety without a new request from Subhu.
