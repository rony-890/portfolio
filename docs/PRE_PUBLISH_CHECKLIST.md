# Pre-Publish Checklist

**Status: Not ready to publish.** Continue with the Journey section first.

## Identity and content

- [ ] Replace or confirm remaining John Bolster text in About, project
  descriptions, Journey, contact, and footer.
- [ ] Confirm the contact email, location, social links, and copyright text
  with the user; do not invent personal details.
- [ ] Replace the John Bolster JSON-LD identity, URLs, image, email, and
  `sameAs` links with verified Subhu details.
- [ ] Set the canonical URL, Open Graph URL, and Open Graph image. They are
  currently empty.
- [ ] Confirm that all portfolio copy, images, video, and reference-derived
  materials are authorized for publication.

## Assets and links

- [ ] Verify that `/favicon-32.png`, `/icon-512.png`, and
  `/apple-touch-icon.png` exist and load, or update/remove those references.
- [ ] Check every project, navigation, email, and social link on the deployed
  origin.
- [ ] Confirm the optional Vercel analytics request is configured or removed;
  the integrated preview currently logs a 404 for that script.

## Interaction and responsive QA

- [ ] Finish the Journey section before polishing the deferred issues.
- [ ] Resolve and verify WEB-001 through WEB-006 in
  [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).
- [ ] Test a fresh reload and the hero-to-About handoff in the user's Chrome.
- [ ] Test desktop, mobile, portrait/landscape, keyboard navigation, reduced
  motion, and zoom at supported sizes.
- [ ] Recheck the About pose baseline and stat counter/layout after final
  content and responsive changes.
- [ ] Run a final console/network check and confirm that all required assets
  load.

Do not mark this checklist complete based only on the integrated preview.
