# PRE_PUBLISH_CHECKLIST.md

## Remaining John/Bolster Strings (in sections NOT to be modified per requirements)

These are intentionally left unchanged as per Step 3 requirements: "Do NOT touch About, bio, Beyond design, contact, footer, Distinkt or project data."

| File | Line | Context |
|------|------|---------|
| `index.html` | 19 | ld+json structured data - Person, ProfessionalService, WebSite |
| `index.html` | 35 | noscript SEO text - "About John Bolster" |
| `index.html` | 65 | About section - `alt="John Bolster"` on pose0.webp |
| `index.html` | 66 | About section bio - "I'm John Bolster, an independent designer..." |
| `index.html` | 93 | Journey 2019 - "Founded Bolster Art", `alt="Framed abstract print by John Bolster"` |
| `index.html` | 121 | Contact email - `jsb@johnbolster.design` |
| `index.html` | 122 | Footer - `© 2026 John Bolster Design`, Instagram/LinkedIn links to johnbolster.design |

## In `js/main.js` (project data - NOT to be modified)
- All project objects have `client: "John Bolster"` or similar
- `seoTitle`, `seoDescription` contain "John Bolster"
- `discipline: "Identity"` etc.

## In `css/main.css` 
- No John/Bolster references found (verified)

## In `js/garden/garden-standalone.js`
- No John/Bolster references found (verified)

## In `js/scroll-animation.js`
- Comments reference "John Bolster's site" (line 4, 5) - this file is disabled anyway

---

## Verified Changes (Step 3 Complete)

### Meta Tags (index.html lines 4-12)
- ✅ `<title>` → "Subhu · Junior Frontend Developer"
- ✅ `meta description` → "Junior frontend developer — React & TypeScript. Landing pages, React UI fixes and tests."
- ✅ `canonical` → "" (empty placeholder)
- ✅ `og:site_name` → "Subhu"
- ✅ `og:title` → "Subhu · Junior Frontend Developer"
- ✅ `og:description` → "Junior frontend developer — React & TypeScript. Landing pages, React UI fixes and tests."
- ✅ `og:url` → "" (empty placeholder)
- ✅ `og:image` → "" (empty placeholder)

### Header Wordmark (line 37)
- ✅ "John Bolster" → "Subhu"

### Hero Subtitle (line 60)
- ✅ Eyebrow: "Designer · Since 2002" → "Developer · React & TypeScript"
- ✅ Lede: "Thoughtful brand identity and design..." → "Junior frontend developer. Landing pages, React UI fixes and tests."

### Aria-labels
- ✅ Header button aria-label: "Back to start" (unchanged, generic)
- ✅ Hero h1 aria-label: "SUBHU" (already correct)

---

## NEEDS INPUT
- Should the empty canonical/og:url/og:image be removed entirely or kept as empty strings?
- Should the ld+json be updated to reflect Subhu's info?
- Should the contact email and footer copyright be updated in a later step?