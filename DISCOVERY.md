# DISCOVERY.md — Portfolio Site Analysis

## Project Overview
- **Root**: `D:\PROTFOLIO WEBSITE\subhu-jb-portfolio\`
- **Main Entry**: `index.html` (John Bolster's portfolio, reverse-engineered)
- **Core Garden Engine**: `js/garden/garden-standalone.js` (Type Garden port)
- **Scroll Animation**: `js/scroll-animation.js` (slide-door effect - BROKEN)
- **Main App Logic**: `js/main.js` (minified, handles scroll, projects, interactions)
- **Styles**: `css/main.css` (37600 lines)
- **Server**: Python http.server on port 5000 (working)

---

## (a) Hero Name & Garden Canvas Wrapper

### Hero Element (`.el` in hero section)
**File**: `index.html`, line 59
```html
<div class="el" data-p="0,-0.06" data-mp="0,-0.06" data-z="0" data-f="0,0.05" 
     style="margin-left: 20px; visibility: visible; opacity: 1; 
            width:clamp(420px,85vw,900px); 
            height:clamp(700px,60vh,1000px); 
            transform: translate3d(75px, 465.1px, 0px) translate(-50%, -50%) perspective(1100px) rotateY(0deg) scale(1); 
            --k: 0.000; --fp: 0.846; --dp: 0.000; --sp: 0.000; pointer-events: auto;">
```

**Key Properties:**
- **`.el` (hero)**: `width: clamp(420px, 85vw, 900px)`, `height: clamp(700px, 60vh, 1000px)`, `margin-left: 20px`
- **Transform**: `translate3d(75px, 465.1px, 0px) translate(-50%, -50%) perspective(1100px) rotateY(0deg) scale(1)`
- **CSS Custom Properties**: `--k: 0.000; --fp: 0.846; --dp: 0.000; --sp: 0.000`
- **Canvas Wrapper**: `.garden-canvas-wrapper` — `position:absolute; inset:0; pointer-events:none`
- **Canvas**: `#garden-canvas` — `width:100%; height:100%; pointer-events:none; display:block`

### Garden Canvas (`#garden-canvas`)
- **Created by**: `garden-standalone.js` Garden class constructor
- **Parent**: `.garden-canvas-wrapper` (child of `.el`)
- **Inherits transform** from `.el` via nesting
- **Size**: Determined by `.el` clamps (clamped to viewport)

---

## (b) Zoom Focal Point & Scroll Progress

### Scroll Progress Variable (`K`) — in `scroll-animation.js` (BROKEN)
**File**: `js/scroll-animation.js`, lines 29, 149
```javascript
let K = 0;
// In animate():
K += (target - K) * CONFIG.lerpFactor;  // lerpFactor = 0.12
```

### Scroll Progress Function — in `scroll-animation.js`
**File**: `js/scroll-animation.js`, lines 81-100
```javascript
function getScrollState(scrollY) {
  const pts = CONFIG.keyframes;
  if (scrollY <= pts[0].scroll) return pts[0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    if (scrollY <= b.scroll) {
      const t = (scrollY - a.scroll) / Math.max(1, b.scroll - a.scroll);
      const splitEased = easeOutCubic(Math.min(1, t / CONFIG.splitThreshold));
      return {
        scale: a.scale + (b.scale - a.scale) * t,
        opacity: a.opacity + (b.opacity - a.opacity) * t,
        split: b.split * splitEased,
      };
    }
  }
  return pts[pts.length - 1];
}
```

### Keyframes (from `scroll-animation.js` lines 17-22)
| Scroll Y | Scale | Opacity | Split |
|----------|-------|---------|-------|
| 0        | 1.000 | 1.00    | 0.0   |
| 200      | 1.033 | 1.00    | 0.1   |
| 800      | 1.177 | 1.00    | 0.5   |
| 1400     | 2.466 | 0.60    | 1.0   |
| 2000     | 1.684 | 0.60    | 1.0   |

### Focal Point Calculation (Garden Engine)
**File**: `js/garden/garden-standalone.js`, lines 765-776
```javascript
// focal point: midpoint of "b" and "h" at canvas center-x
const bIdx = this.letters.findIndex((l) => l.ch.toLowerCase() === "b");
const hIdx = this.letters.findIndex((l) => l.ch.toLowerCase() === "h");
if (bIdx >= 0 && hIdx >= 0) {
  const bl = this.letters[bIdx], hl = this.letters[hIdx];
  const dx = this.W / 2 - (bl.x + hl.x) / 2;
  this.letters.forEach((l) => {
    l.tx += dx;
    l.x += dx;
  });
}
```

**ISSUE**: This focal point centering runs TWICE - once at line 765-776 and again after safety fit. Need to remove duplicate.

---

## (c) Blue HUD Line (Position, Length, Rotation) — VERTICAL #hud on RIGHT

### CSS (lines 318-367 in `main.css`)
```css
#hud {
    position: fixed;
    z-index: 30;
    right: calc(max(16px,env(safe-area-inset-right,0px)) + 6px);
    top: calc(env(safe-area-inset-top,0px) + 84px);
    bottom: calc(env(safe-area-inset-bottom,0px) + 22px);
    width: 1px;
    pointer-events: none;
    --p: 0
}

#hud .trk {
    position: absolute;
    inset: 0;
    background: var(--hair)
}
#hud .trk i {
    position: absolute;
    left: -.5px; right: -.5px; top: 0;
    width: 1px;
    height: calc(var(--p) * 100%);
    background: var(--line)
}
#hud .hd {
    position: absolute; left: -4px; width: 9px; height: 9px;
    border-radius: 50%; background: var(--line);
    top: calc(var(--p) * 100%);
    transform: translateY(-50%)
}
```

**Current Values:**
- `--p: 0.0000` (scroll progress)
- Line: 1px wide, full height of viewport (top to bottom with safe-area insets)
- **Rotation**: None currently (no transform on `#hud`)
- **Length**: Full viewport height minus safe-area insets
- **Color**: `--line` (#4f53af) for the moving indicator, `--hair` for track

**NOTE**: Step 4 mentions a "long curved blue guide line in the hero (the swoosh with a dot)" - this is NOT the vertical #hud. Need to find this curved line.

---

## (d) All "John Bolster" / "Thoughtful brand identity" References

### In `index.html`:
| Line | Context | Current Value |
|------|---------|---------------|
| 4 | `<title>` | `John Bolster · Brand Identity Designer and Art Director, Saratoga Springs NY` |
| 5 | meta description | `Independent brand identity designer and art director in Saratoga Springs, NY...` |
| 6 | canonical | `https://johnbolster.design/` |
| 7 | og:site_name | `John Bolster` |
| 8 | og:title | `John Bolster · Brand Identity Designer and Art Director` |
| 9 | og:description | `Independent brand identity designer and art director...` |
| 11 | og:url | `https://johnbolster.design/` |
| 12 | og:image | `https://johnbolster.design/og.png?v=2` |
| 16 | favicon | `/favicon-32.png` (missing) |
| 17 | apple-touch-icon | `/apple-touch-icon.png` (missing) |
| 19 | ld+json | Contains "John Bolster" throughout |
| 37 | Header wordmark | `John <span>Bolster</span>` |
| 60 | Hero subtitle | `Designer · Since 2002` + `Thoughtful brand identity and design...` |
| 66 | About section | `John Bolster` (alt text), `Independent Brand Designer` |
| 66 | Bio | `I'm John Bolster, an independent designer based in Saratoga Springs, NY...` |
| 120 | Contact email | `jsb@johnbolster.design` |
| 122 | Footer links | Instagram, LinkedIn, Services, FAQ, Saratoga Springs, Freelance |
| 122 | Copyright | `© 2026 John Bolster Design` |
| 130 | Distinkt logo | `Distinkt` (SVG) |
| 142 | Distinkt tagline | `The AI brand <em>strategy</em> creator for designers.` |

**In `js/main.js` (data array):**
- All project objects have `client: "John Bolster"` or similar
- `seoTitle`, `seoDescription` contain "John Bolster"
- `discipline: "Identity"` etc.

---

## (e) Garden Engine — Random Seed, Area, Clipping

### Random Seed Generation
**File**: `js/garden/garden-standalone.js`

**Constructor** (line 673):
```javascript
_buildLetters() {
  const seed = Math.floor(Math.random() * 1e9);  // NEW random seed each load
  const rand = rng(seed);
  ...
}
```

**Deterministic Seed** (line 673 - OVERRIDDEN):
```javascript
const seed = this.text.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0);
// But then overridden by Math.random() above!
```

**RNG Function** (lines 28-35):
```javascript
function rng(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
```

### Garden Area / Bounds
- **Canvas**: Full size of `.el` wrapper (clamped: width 420-900px, height 700-1000px)
- **Layout Padding**: `pad = Math.max(80, this.W * 0.08)` (line 718) — increased from 40/0.04
- **Available Area**: `availW = W - pad*2`, `availH = H - pad*2` (padding 80px each side)
- **Text Baseline**: `y = H * 0.48` (48% from top)

### Clipping / Safety Fit (lines 716-762)
```javascript
// Safety fit: shrink ONLY if full garden (stems+leaves+roses) overflows
const pad = Math.max(80, this.W * 0.08);  // Extra left padding
const availW = this.W - pad * 2, availH = this.H - pad * 2;
// ... computes bounds of all stems/leaves/roses
// If overflows: scales down uniformly
// Re-centers after scaling
```

**Clipping Logic** (lines 724-743):
- Computes bounding box of all stems, leaves, roses
- If exceeds `availW`/`availH`, scales down uniformly
- Re-centers after scaling

---

## (f) Canvas Offset / Refresh Drag Issue

### Why Canvas Starts Offset & Drags Upward

**Root Cause: Font Loading Race Condition**

**File**: `js/garden/garden-standalone.js`, lines 636-650
```javascript
if (document.fonts) {
  document.fonts.load('800 100px "Anton",sans-serif')
    .then(() => { this.cache = {}; this._buildLetters(); })
    .catch(() => { this._buildLetters(); });
} else { this._buildLetters(); }
this.resize();  // Called BEFORE font loads!
```

**Sequence:**
1. Constructor runs → `resize()` called immediately (line 649)
2. `layout()` runs with **fallback font** metrics (Anton not loaded yet)
3. Text positioned with fallback font widths
4. **Later**: Anton font loads → `document.fonts.load().then()` fires
5. `_buildLetters()` runs **again** with Anton metrics
6. `layout()` runs **again** → text shifts to correct position
7. **Visual effect**: Text appears at wrong position, then "drags" to correct spot

**Additional Issue**: Focal point centering runs twice (lines 765-776 and again after safety fit), causing double-shift.

---

## Baseline Screenshots (to capture)

```bash
cd "D:\PROTFOLIO WEBSITE\subhu-jb-portfolio"
python -m http.server 5000
# Then open http://localhost:5000/ in Playwright
```

---

## Summary of Key Findings

| Item | Location | Key Value |
|------|----------|-----------|
| Hero `.el` size | `index.html:59` | `clamp(420px,85vw,900px)` × `clamp(700px,60vh,1000px)` |
| Canvas wrapper | `index.html:59` | `.garden-canvas-wrapper` — `inset:0` |
| Canvas | `index.html:59` | `#garden-canvas` — 100%×100% of wrapper |
| Focal point | `garden-standalone.js:766` | Midpoint of "b" and "h" |
| Scroll progress | `scroll-animation.js:29` | `K` (lerped with 0.12 factor) |
| Keyframes | `scroll-animation.js:17-22` | 5 keyframes (0→2000px) |
| HUD line | `main.css:318-367` | `#hud` — fixed right, 1px wide |
| Font loading bug | `garden-standalone.js:636-650` | Race condition: layout runs before font loads |
| Random seed | Line 673 | `Math.floor(Math.random() * 1e9)` — new each load |
| Focal point | Lines 765-776 | Midpoint of "b" and "h" (runs twice!) |
| Garden padding | Line 718 | `pad = max(80, W*0.08)` — left padding increased |

---

## Files to Modify (Per Task)

| Step | Files to Modify |
|------|-----------------|
| **Step 1** | `index.html` (comment out scroll-animation.js) |
| **Step 2** | `js/garden/garden-standalone.js` (font loading, layout, focal point) |
| **Step 3** | `index.html` (text/meta only) |
| **Step 4** | Find curved blue line, then modify its file |
| **Step 5** | `js/garden/garden-standalone.js` (focal point = B lower hole) |
| **Step 6** | `js/garden/garden-standalone.js` (slide-door in render) |
| **Step 7** | `js/garden/garden-standalone.js` (safe rect for random) |
| **Structure** | `PROJECT_STRUCTURE.md`, `.gitignore`, `CHANGES_REPORT.md` |

---

## NEEDS INPUT

1. **Font weight for text rendering**: Anton on Google Fonts only has weights 400 and 700. Current code uses `800` in `mw()` (line 653) and `800` in `text:` backend (line 114). Should use `700` (max available) or `400`. Need to confirm.
2. **Font family**: `FONT = '"Anton",sans-serif'` at line 5. Confirm this is correct.
3. **Slide-door split index**: `SPLIT_AFTER_INDEX = 1` means "SU" splits from "BHU"? Confirm split after index 1 (0-indexed: S,U | B,H,U).
4. **HUD line rotation**: Current CSS has no rotation. Need to add transform with `ROTATION_ANGLE = 0.5 * CURRENT_ROTATION`.
5. **Slide-door `MAX_SHIFT`**: "about 8 percent of viewport width" — confirm `0.08 * viewportWidth`.
6. **Curved blue guide line**: Step 4 mentions "long curved blue guide line in the hero (the swoosh with a dot), NOT the vertical #hud". Need to find this in code.
7. **Scroll progress variable**: `js/main.js` exposes `--k` on `.el`. Need to find how main.js computes scroll progress and use that instead of creating another scroll engine.

---

*End of DISCOVERY.md*