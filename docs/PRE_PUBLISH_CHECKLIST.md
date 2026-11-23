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
- [x] Add project artwork with a small display crop for the Gemini sparkle.
      Keep the AEO Toolkit contribution image with visible generated labels
      out of the selected card artwork.

## Assets and links

- [x] Remove stale favicon links because the referenced icon files are absent.
- [ ] Check every project, navigation, email, and social link on the deployed
      origin.
- [ ] Confirm the optional Vercel analytics request is configured or removed;
      the integrated preview currently logs a 404 for that script.

## Interaction and responsive QA

- [x] Review the Assist-Ding spotlight copy and keep only the live-site action.
      The integrated preview confirms Bone text on the lavender panel.
- [x] Implement and verify WEB-005, WEB-006, WEB-009, and WEB-010 in the
      integrated preview. See [`WEBSITE_ISSUES.md`](../WEBSITE_ISSUES.md) for
      measurements and the laptop sign-off gap.
- [ ] Test a fresh reload and the hero-to-About handoff in the user's Chrome.
- [ ] Test desktop, mobile, portrait/landscape, keyboard navigation, reduced
      motion, and zoom at supported sizes.
- [x] Recheck the About pose baseline and stat layout in the integrated
      preview. Verify the final result on Subhu's laptop before publishing.
- [x] Confirm that the required pose, Work-card, and project-dialog WebP
      images load in the integrated preview.
- [ ] Complete the final network check. The optional Vercel analytics request
      currently returns 404 in the integrated preview.

Do not mark this checklist complete based only on the integrated preview.
