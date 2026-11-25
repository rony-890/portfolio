# Known issues

Open items only. Everything else has been verified or removed.

## QA gaps (need a real laptop, cannot be automated here)

- Fresh reload and the hero-to-About handoff in the user's Chrome.
- Desktop 1366x768, 1440x900, 1600x1000, 1920x1080 and mobile portrait/landscape.
- Keyboard-only pass: tab order, card activation, dialog focus restore.
- `prefers-reduced-motion` pass and 200 percent browser zoom.

## Housekeeping

- Repository history still carries a 64.8 MB `Subhu-jb-portfolio-finihed
  project.zip` from before publishing, so a full clone downloads about 170 MB.
  The live site is unaffected. Cleanup needs a history rewrite and force push.
- Analytics (Cloudflare) and the contact form (Formspree) are live as of 2026-11-25.

## Known-good

- All 13 in-page asset references return 200 on the deployed origin.
- Every local path resolves with exact case, `/portfolio/` subpath included.
- No console errors on load, no broken images, no localhost or debug code.
- No secrets in the working tree or in history.
