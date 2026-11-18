# Pre-Publish Checklist

**Status: Not ready to publish.** Complete the remaining content and QA checks.

## Identity and content

- [x] Replace or confirm remaining John Bolster text in About, project
      descriptions, Journey, contact, and footer.
- [x] Confirm the contact email and social links with the user; do not invent
      personal details. Location and copyright text are omitted.
- [x] Replace the John Bolster JSON-LD with verified Subhu details.
- [ ] Add canonical and Open Graph URLs or an image only when the deployed
      domain and approved preview image are available.
- [ ] Confirm that all portfolio copy, images, video, and reference-derived
      materials are authorized for publication.
- [ ] Review the generated project artwork in `img/projects/`, including the
      visible prompt labels in the AEO Toolkit normalization image.

## Assets and links

- [ ] Verify that `/favicon-32.png`, `/icon-512.png`, and
      `/apple-touch-icon.png` exist and load, or update/remove those references.
- [ ] Check every project, navigation, email, and social link on the deployed
      origin.
- [ ] Confirm the optional Vercel analytics request is configured or removed;
      the integrated preview currently logs a 404 for that script.

## Interaction and responsive QA

- [ ] Review the Assist-Ding spotlight and Contact copy before publishing.
- [ ] Resolve and verify WEB-001 through WEB-009 in
      [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md).
- [ ] Test a fresh reload and the hero-to-About handoff in the user's Chrome.
- [ ] Test desktop, mobile, portrait/landscape, keyboard navigation, reduced
      motion, and zoom at supported sizes.
- [ ] Recheck the About pose baseline and stat counter/layout after final
      content and responsive changes.
- [ ] Run a final console/network check and confirm that all required assets
      load.
- [ ] Verify both the PNG source copies and WebP display images in
      `img/projects/`.

Do not mark this checklist complete based only on the integrated preview.
