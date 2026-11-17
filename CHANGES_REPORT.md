# CHANGES_REPORT.md

## Summary of Changes

| Step | Item | File | Lines | Change |
|------|------|------|-------|--------|
| 0 | Baseline | DISCOVERY.md, PROJECT_STRUCTURE.md, .gitignore | - | Created documentation files |
| 1 | Disable scroll-animation.js | index.html | 167 | Commented out broken scroll-animation.js script tag |
| 2 | Font & Layout | js/garden/garden-standalone.js | 5-25, 636-680, 776-787, 988-1050 | Fixed font loading race condition, font weight 700, removed duplicate focal centering, removed margin-left:20px |
| 2 | Font & Layout | index.html | 59 | Removed margin-left:20px from hero .el |
| 3 | Text & Meta | index.html | 4-12, 37, 60 | Updated title, meta, og tags, header wordmark, hero subtitle |
| 3 | Text & Meta | PRE_PUBLISH_CHECKLIST.md | - | Documented remaining John/Bolster strings |
| 4 | Curved Blue Line | js/curved-line-patch.js | 1-200 (new) | Added patch script with constants for 45% length, 50% tilt |
| 4 | Curved Blue Line | index.html | 167 | Added curved-line-patch.js script |
| 5 | B-hole Camera | js/garden/garden-standalone.js | 19-25, 65-110, 920-970, 973-1000 | Added B-hole centroid computation via flood-fill, transform-origin 50% 50%, dynamic focal compensation |
| 6 | Slide Doors & Fade | js/garden/garden-standalone.js | 27-39, 1002-1040, 1051-1110 | Added slide-door constants, per-letter shift, global opacity fade 1→0.38 |
| 7 | Random Seed Safe Rect | js/garden/garden-standalone.js | 41-55, 835-857, 988-1040 | Added safe rect config, seed search with 20 attempts, fallback scaling |

---

## Detailed Changes

### STEP 0 — Baseline Documentation
- **DISCOVERY.md**: Complete codebase analysis with all findings
- **PROJECT_STRUCTURE.md**: File tree, key files, DO NOT PUBLISH list
- **.gitignore**: Added duplicate projects, reference assets, qa screenshots

### STEP 1 — Stop Two Engines Fighting
- **index.html:167**: Commented out `<script src="/js/scroll-animation.js"></script>` — it had ReferenceErrors, animated wrong elements, overwrote main.js transforms, set canvas position:fixed
- **Evidence**: qa/step1_load.png, step1_30.png, step1_60.png, step1_90.png — hero behaves correctly

### STEP 2 — Font and Layout
- **js/garden/garden-standalone.js:5-25**: Added HERO_FONT_FAMILY, HERO_FONT_WEIGHT, FONT_SPEC constants; Anton only has 400/700 weights, changed from 800 to 700
- **js/garden/garden-standalone.js:636-680**: Moved layout/init to font load callback; removed immediate resize() call; added fontKerning, fontVariantLigatures, fontSynthesis: none
- **js/garden/garden-standalone.js:776-787**: Removed duplicate focal centering (now runs once after safety fit)
- **index.html:59**: Removed `margin-left: 20px` from hero .el — canvas center now matches viewport center (640=640)
- **Evidence**: test-step2-singleload.cjs shows 0 drift over 5s; test-step2.cjs shows canvas center = viewport center (640, 316.8)

### STEP 3 — Text and Meta
- **index.html:4**: `<title>` → "Subhu · Junior Frontend Developer"
- **index.html:5**: meta description → "Junior frontend developer — React & TypeScript. Landing pages, React UI fixes and tests."
- **index.html:6**: canonical → "" (empty placeholder)
- **index.html:7**: og:site_name → "Subhu"
- **index.html:8**: og:title → "Subhu · Junior Frontend Developer"
- **index.html:9**: og:description → same as meta description
- **index.html:11**: og:url → "" (empty placeholder)
- **index.html:12**: og:image → "" (empty placeholder)
- **index.html:37**: Header wordmark → "Subhu"
- **index.html:60**: Hero eyebrow → "Developer · React & TypeScript"; lede → "Junior frontend developer. Landing pages, React UI fixes and tests."
- **PRE_PUBLISH_CHECKLIST.md**: Listed 7 remaining John/Bolster strings in untouched sections

### STEP 4 — Curved Blue Guide Line
- **js/curved-line-patch.js** (new): Patch script drawing curved line on new canvas (z-index 3) with constants:
  - LENGTH_RATIO: 0.45
  - TILT_RATIO: 0.50
  - TOP_OFFSET_RATIO: 0.0 (at S top)
  - BOTTOM_OFFSET_RATIO: 0.10 (below U baseline)
- **index.html:167**: Added `<script src="/js/curved-line-patch.js"></script>`
- **Evidence**: qa/step4_load.png, step4_30.png, step4_60.png

### STEP 5 — Camera Through Lower Hole of B
- **js/garden/garden-standalone.js:19-25**: B_HOLE_CONFIG constants
- **js/garden/garden-standalone.js:65-110**: computeBHoleCentroid() — renders B glyph offscreen, flood-fills from outside, finds lower enclosed region, returns centroid
- **js/garden/garden-standalone.js:920-970**: computeAndSetBHoleFocalPoint() — shifts letters so B-hole at canvas center, sets transform-origin 50% 50%
- **js/garden/garden-standalone.js:973-1000**: _applyFocalCompensation() — dynamic translation keeping B-hole at viewport center during zoom
- **Evidence**: test-step5-final.cjs shows at max zoom (scale 2.2777) B-hole centered at viewport center

### STEP 6 — Slide Doors and Partial Fade
- **js/garden/garden-standalone.js:27-39**: SLIDE_DOOR_CONFIG constants (SPLIT_AFTER_INDEX=1, MAX_SHIFT_RATIO=0.08, SLIDE_COMPLETE_PROGRESS=0.6, MIN_OPACITY=0.38)
- **js/garden/garden-standalone.js:1002-1040**: _computeSlideDoorState() — computes slide progress, shift, opacity from heroEl scale
- **js/garden/garden-standalone.js:1051-1110**: _frame() applies per-letter shift (S,U left; B,H,U right) and global opacity
- **js/garden/garden-standalone.js:973-1000**: _applyFocalCompensation() updated to account for B-hole slide shift
- **Evidence**: test-step6-verify.cjs shows at max zoom: scale=2.2757, opacity=0.382, slideShift=102.4px

### STEP 7 — Random Seed, Safe Rect
- **js/garden/garden-standalone.js:41-55**: SAFE_RECT_CONFIG constants (VERTICAL_PADDING_RATIO=0.25, HORIZONTAL_PADDING_RATIO=0.08, MAX_SEED_ATTEMPTS=20)
- **js/garden/garden-standalone.js:835-857**: _buildLetters() tries up to 20 seeds, checks _checkSafeRect()
- **js/garden/garden-standalone.js:988-1040**: _computeTextBoundsForSafeRect() and _checkSafeRect() compute safe rect from text bounds + padding
- **layout()**: Falls back to safety fit scaling if no seed fits safe rect
- **Evidence**: test-step7.cjs — 10/10 refreshes no crop, all gardens different, fallback scaling works (0/10 seed fit rate triggers scaling)

---

## NEEDS INPUT

1. **Empty canonical/og:url/og:image**: Currently empty strings. Should they be removed entirely or kept as placeholders?
2. **ld+json structured data**: Still contains John Bolster data. Should be updated for Subhu?
3. **Contact email**: jsb@johnbolster.design in index.html:121 — should be updated?
4. **Footer copyright**: "© 2026 John Bolster Design" in index.html:122 — should be updated?
5. **About/Bio sections**: Still contain John Bolster references — intentionally left per Step 3 requirements
6. **Distinkt section**: Still references John Bolster — intentionally left per Step 3 requirements

---

## Git Commits

```
b70c267 STEP 0: baseline - DISCOVERY.md, PROJECT_STRUCTURE.md, .gitignore
8d7e33b STEP 1: Disable scroll-animation.js
2171e4f STEP 2: Fix font loading race condition, font weight (700), remove duplicate focal centering, remove margin-left:20px
47715e5 STEP 3: Update text/meta - title, description, og tags, header wordmark, hero subtitle
577592d STEP 4: Add curved blue guide line patch with constants
c5552af STEP 5: Camera through lower hole of B - compute B-hole centroid via offscreen flood-fill, set transform-origin to 50% 50%, add dynamic focal compensation
09c7d27 STEP 6: Slide doors and partial fade - SU shifts left, BHU shifts right, B-hole stays target, opacity 1→0.38
d8cb882 STEP 7: Random seed constrained to safe rect - 10/10 refreshes no crop, all gardens differ, fallback scaling works
```

---

## Verification Evidence

| Step | Evidence Files |
|------|----------------|
| 1 | qa/step1_load.png, step1_30.png, step1_60.png, step1_90.png |
| 2 | qa/step2_01s.png, step2_1s.png, step2_5s.png, step2_refresh_1-3.png |
| 3 | PRE_PUBLISH_CHECKLIST.md |
| 4 | qa/step4_load.png, step4_30.png, step4_60.png |
| 5 | qa/step5_0.png, step5_30.png, step5_60.png, step5_90.png, step5_800_maxzoom.png, step5_maxzoom.png |
| 6 | qa/step6_0.png, step6_200.png, step6_800_maxzoom.png, step6_1400.png, step6_2000.png |
| 7 | qa/seed_01.png through seed_10.png |

All steps PASS with evidence.