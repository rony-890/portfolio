# Future Changes

Status: approved direction; hero refresh/title-swap fixes implemented. The
current split centering is accepted by Subhu. See `NEON_HANDOFF.md` for the
prioritized remaining tasks and asset instructions.

## Palette

- Bone: `#EFE7DA`
- Vermilion: `#E8392B`
- Bottle green: `#0F372B`
- Assist-Ding lavender: preserve the existing lavender/Assist-Ding panel color
- No new invented accent colors

Use Bottle Green as the dark/base section background and Bone for visible
text, including navigation, hero copy, Journey, What I do, Selected Work,
project labels, and contact copy. The What I do dark section should use a
deeper black, while its type remains Bone. Vermilion is the flower accent.

## Hero and Garden

- Resolved: keep “SUBHU” at a stable responsive size and position after refresh.
- Resolved: animate the visible title and Garden on one canvas; do not replay a
  second DOM title.
- Resolved: keep a centered Garden composition behind the canvas text.
- Resolved in the integrated preview: fade gradually from 100% toward the
  70% floor and keep the hero visible as About arrives. Recheck after further
  scroll choreography changes.
- Accepted: Subhu likes the current split centering. Do not adjust it unless
  requested.
- Deferred: Subhu currently sees one flower type and does not want flower
  variety changed now. Do not alter Garden seeds or flower generation for this
  handoff.

## About

- The current animation uses `img/pose0.webp` through `img/pose7.webp`.
- Use the eight supplied pose files in `img/my assets/pose_1.png` through
  `pose_8.png`. Keep their filename order unless visual inspection shows it is
  not the intended sequence.
- Align the visible pose's feet with the bio's last line. Subhu reports that
  the current baseline still looks wrong on the laptop, so do not mark this
  complete based on a different viewport or the image-box bounds alone.
- On desktop, keep the pose close to the text without crowding it.
- On mobile, place the portrait above the bio.

## By the numbers

- Place “Worked” and “with” on the same line.
- Place “with” above the “2”.
- Start “company” at the right edge/tail of “2”, slightly below that tail.
- Maintain similar spacing to the “Creating since” / “2026” hierarchy.
- Keep Projects at `10+` unless Subhu explicitly approves a different value.

## Journey

- Keep “The journey” close to “so far”.
- Done: the `100MB` text was removed from the MAR-AUG storage illustration.
- Keep both milestone layouts and current project links.

## What I do

- Keep the existing five services, but tune their presentation to a cleaner
  horizontal hierarchy instead of a vertical-stack appearance.
- Preserve keyboard and tap interactions.

## Selected Work

- The current Work cards still use inline SVG flow diagrams. Replace their
  artwork with images from `D:\PROTFOLIO WEBSITE\selected-work-images`.
- Accessible Search: use
  `Accessible Search project in a frontend portfolio.png` as a card-cover
  candidate and `Accessible Search React demo.png` as supporting project
  detail.
- Assist-Ding: use `Assist-Ding Work-card cover.png` as a card-cover candidate
  and `Assist-Ding spotlight in a junior frontend developer portfolio.png` for
  the spotlight/detail where appropriate.
- AEO Toolkit: use `AEO Toolkit open-source contribution.png` as a card-cover
  candidate and `AuditInputCard test added in AEO Toolkit PR70.png` as
  supporting proof. Clean its generated labels before publication if they
  remain visible.
- These are candidates based on filenames. Inspect the artwork and map images
  to the correct project before wiring them in. Keep source files unchanged;
  copy optimized project assets into the repository and maintain useful alt
  text.
- Project cards: keep one active card readable at each scroll stop.

## Assist-Ding spotlight

- Retain the lavender panel.
- Change its heading/text color to Bone.
- Replace the incorrect open-PR description with accurate copy about Assist-Ding
  handling customer queries, order questions, and routine assistance for a
  niche business, including unattended hours.
- Keep only “Visit live site” as the visible primary action.
- Do not expose “Open PR · #2” as a visible right-side label.

## Contact and FAQ

- Current contact copy and email/LinkedIn actions are in place. The FAQ was
  removed in the current version; do not restore it unless Subhu requests it.
- Do not add a contact form unless Subhu explicitly requests one.

## Deferred publication work

- Add canonical and Open Graph URLs only after the deployed domain is known.
- Replace/remove missing favicon references.
- Remove or configure Vercel analytics.
- Complete cross-browser and accessibility QA.
