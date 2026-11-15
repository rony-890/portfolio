// Garden engine adapted from Type Garden by Akshat Agarwal
// Ported to vanilla JavaScript for the Subhu portfolio hero

(function (global) {
  'use strict';

  // ---------- CONFIG ----------
  const DEFAULTS = {
    text: 'Subhu',
    font: '"Playfair Display", Georgia, serif',
    fontWeight: 700,
    colors: {
      flower: '#FF3B1F',
      stem: '#1C2B8F',
      line: '#FFD2C4',
      text: null, // read from CSS var --ink
      vein: null, // read from CSS var --bg
    },
    density: 2.0,
    boil: true,
    butterfly: true,
    maxDpr: 2,
    letterSpacing: 0.05,
  };

  // ---------- MATH HELPERS ----------
  function h(n) { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); }
  function eo(t) { if (t <= 0) return 0; if (t >= 1) return 1; return 1 - Math.pow(1 - t, 3); }
  function eb(t) { if (t <= 0) return 0; if (t >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  function spr(t, k, w) { k = k || 7; w = w || 16; if (t <= 0) return 0; return 1 - Math.exp(-t * k) * Math.cos(t * w); }
  function rng(seed) {
    let s = seed | 0;
    return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  // ---------- GEOMETRY HELPERS ----------
  function bez(a, b, c, d, n) {
    const P = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      P.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
              u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]]);
    }
    return P;
  }

  function at(P, u) {
    const n = P.length;
    const i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
    return [P[i], Math.atan2(P[i + 1][1] - P[i - 1][1], P[i + 1][0] - P[i - 1][0])];
  }

  function vine(base, dir, len, amp, waves, ph, bend, n) {
    n = n || 40;
    const P = [[base[0], base[1]]];
    const step = len / n;
    let x = base[0], y = base[1];
    for (let i = 1; i <= n; i++) {
      const u = i / n;
      const a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
      x += Math.cos(a) * step;
      y += Math.sin(a) * step;
      P.push([x, y]);
    }
    return P;
  }

  function curl(B, base, dir, len, amp, w) {
    // Curled tendril
    const P = vine(base, dir, len, amp, 2 + Math.random() * 2, Math.random() * 6.28, (Math.random() - 0.5) * 1.5, 30);
    const n = P.length;
    for (let i = 0; i < n - 1; i++) {
      const u = i / n;
      const thickness = w * (1 - u * 0.8);
      B.stroke([P[i], P[i + 1]], '#1C2B8F', Math.max(0.5, thickness));
    }
    // Curl tip
    const [tip, ta] = at(P, 1);
    const curlR = len * 0.15;
    const curlPts = [];
    for (let i = 0; i <= 12; i++) {
      const a = ta + (i / 12) * Math.PI * 1.5;
      curlPts.push([tip[0] + Math.cos(a) * curlR * (i / 12), tip[1] + Math.sin(a) * curlR * (i / 12)]);
    }
    B.stroke(curlPts, '#1C2B8F', 1);
  }

  function strokeRange(B, pts, col, w0, w1) {
    // Variable width stroke
    const n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      const u = i / (n - 1);
      const w = w0 + (w1 - w0) * u;
      B.stroke([pts[i], pts[i + 1]], col, Math.max(0.5, w));
    }
  }

  function path(c, p, closed) {
    const n = p.length;
    if (n < 2) return;
    const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    if (closed) {
      const s = m(p[n - 1], p[0]);
      c.moveTo(s[0], s[1]);
      for (let i = 0; i < n; i++) {
        const q = m(p[i], p[(i + 1) % n]);
        c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
      }
      c.closePath();
    } else {
      c.moveTo(p[0][0], p[0][1]);
      for (let i = 1; i < n - 1; i++) {
        const q = m(p[i], p[i + 1]);
        c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
      }
      c.lineTo(p[n - 1][0], p[n - 1][1]);
    }
  }

  function backend(g) {
    return {
      fill: (p, col) => { g.beginPath(); path(g, p, true); g.fillStyle = col; g.fill(); },
      stroke: (p, col, w) => { g.beginPath(); path(g, p, false); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); },
    };
  }

  function leaf(B, bx, by, a, L, bend) {
    if (L < 0.5) return;
    const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
    const ax = u => { const b = Math.sin(Math.PI * u) * bend * 0.15 * L; return [bx + ca * u * L + px * b, by + sa * u * L + py * b]; };
    const hw = u => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
    const N = 12, s1 = [], s2 = [];
    for (let i = 0; i <= N; i++) { const u = i / N, c = ax(u), w = hw(u); s1.push([c[0] + px * w, c[1] + py * w]); s2.push([c[0] - px * w, c[1] - py * w]); }
    const tip = ax(1), base = ax(0);
    B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], '#5BAF6A');
  }

  function rose(B, cx, cy, R, rot, e, facing) {
    const cr = Math.cos(rot || 0), sr = Math.sin(rot || 0);
    const T = (x, y) => [cx + x * cr - y * sr, cy + x * sr + y * cr];
    // Draw rose petals
    const petals = 5;
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2;
      const px = cx + Math.cos(a) * R * 0.6;
      const py = cy + Math.sin(a) * R * 0.6;
      B.fill([[cx, cy], [px + Math.cos(a + 0.5) * R * 0.4, py + Math.sin(a + 0.5) * R * 0.4], [px, py], [px + Math.cos(a - 0.5) * R * 0.4, py + Math.sin(a - 0.5) * R * 0.4]], '#FF3B1F');
    }
    // Center
    B.fill([[cx, cy - R * 0.2], [cx + R * 0.2, cy], [cx, cy + R * 0.2], [cx - R * 0.2, cy]], '#FF1400');
  }

  // ---------- GARDEN ENGINE CLASS ----------
  class GardenName {
    constructor(canvas, options) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.opts = Object.assign({}, DEFAULTS, options || {});
      this.opts.colors = Object.assign({}, DEFAULTS.colors, (options && options.colors) || {});

      // Read CSS variables
      const root = getComputedStyle(document.documentElement);
      if (!this.opts.colors.text) {
        this.opts.colors.text = root.getPropertyValue('--ink').trim() || '#1C1C1C';
      }
      if (!this.opts.colors.vein) {
        this.opts.colors.vein = root.getPropertyValue('--bg').trim() || '#ECEAEA';
      }

      // State
      this.letters = [];
      this.flies = [];
      this.pointer = null;
      this.hasPointer = false;
      this.started = false;
      this.grown = false;
      this.introProgress = 0;
      this.introStartTime = null;
      this.rafId = null;
      this.frameTimes = [];
      this.frameTimingDone = false;
      this.lastFrameTime = 0;
      this.visible = true;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      this.boil = this.opts.boil && !this.reducedMotion && !this.coarsePointer;
      this.butterfly = this.opts.butterfly && !this.reducedMotion;
      this.density = this.coarsePointer ? 0.7 : this.opts.density;

      // Adjust density for coarse pointers
      if (this.coarsePointer) {
        this.opts.colors = this.opts.colors;
      }

      // Setup canvas
      this.resize();

      // IntersectionObserver for visibility
      this.observer = new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        if (this.visible && !this.rafId) {
          this.rafId = requestAnimationFrame((t) => this.loop(t));
        }
      }, { threshold: 0.1 });
      this.observer.observe(canvas);

      // Visibility change handler
      this.visibilityHandler = () => {
        if (document.hidden) {
          if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
        } else if (this.visible) {
          this.rafId = requestAnimationFrame((t) => this.loop(t));
        }
      };
      document.addEventListener('visibilitychange', this.visibilityHandler);

      // Resize handler
      this.resizeHandler = () => this.resize();
      window.addEventListener('resize', this.resizeHandler);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr) * 1.5;
      const w = Math.min(Math.round(rect.width * dpr), 4096);
      const h = Math.min(Math.round(rect.height * dpr), 4096);
      this.canvas.width = w;
      this.canvas.height = h;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.W = rect.width;
      this.H = rect.height;
      this.dpr = dpr;
    }

    // Layout text
    layout() {
      const ctx = this.ctx;
      const S = Math.min(this.W, this.H) * 0.35;
      ctx.font = `${this.opts.fontWeight} ${S}px ${this.opts.font}`;
      const ws = this.opts.text.split('').map(ch => ctx.measureText(ch).width / S);
      const totalW = ws.reduce((a, b) => a + b, 0) * S;
      let x = (this.W - totalW) / 2;
      const y = this.H / 2;
      this.letters = [];
      this.opts.text.split('').forEach((ch, i) => {
        const w = ws[i] * S;
        const r = rng(ws[i] * 7 + 13);
        const p = { leafy: (0.6 + r() * 0.8) * this.density, dens: this.density, curvy: 0.8 + r() * 0.6, w: ws[i], roseP: 0.3 + r() * 0.3, bridgeP: 0.6, big: 1.2 };
        const E = [];
        let k0 = 0;
        const nid = () => k0++;
        const w_px = ws[i] * S;
        const inX = () => (r() - 0.5) * w_px * 0.7;
        const nUp = 2 + (r() < 0.6 * p.dens ? 1 : 0);
        for (let j = 0; j < nUp; j++) {
          this.grow(r, E, nid, p, { base: [inX(), -r() * 0.3], dir: -Math.PI / 2 + (r() - 0.5) * 0.7, len: 0.5 + r() * 0.6, d0: 40 + j * 100, tip: 'rose', curvy: p.curvy });
          // Add curl tendril
          const curlBase = [inX(), -r() * 0.2];
          E.push({ t: 'curl', id: nid(), base: curlBase, dir: -Math.PI / 2 + (r() - 0.5) * 1.2, len: 0.3 + r() * 0.3, amp: 0.3 + r() * 0.4, d0: 200 + j * 80 });
        }
        if (r() < 0.6 * p.dens) {
          this.grow(r, E, nid, p, { base: [inX(), -0.1 - r() * 0.35], dir: Math.PI / 2 + (r() - 0.5) * 0.8, len: 0.3 + r() * 0.4, d0: 160, tip: 'rose', curvy: p.curvy });
        }
        // Add a downward stem with leaf
        this.grow(r, E, nid, p, { base: [inX(), r() * 0.2], dir: Math.PI / 2 + (r() - 0.5) * 0.6, len: 0.4 + r() * 0.3, d0: 120, tip: 'leaf', curvy: p.curvy });
        // Add bridge to next letter (if not last)
        if (i < this.opts.text.length - 1) {
          const nextX = x + w_px + ws[i+1] * S / 2;
          E.push({ t: 'bridge', id: nid(), x1: x + w / 2, y1: y + S * 0.1, x2: nextX, y2: y + S * 0.1, d0: 300 });
        }
        // Bridge to next letter
        if (i < this.text.length - 1) {
          const nextX = x + w_px + ws[i+1] * S / 2;
          const bridgePts = [];
          for (let b = 0; b <= 20; b++) {
            const u = b / 20;
            bridgePts.push([x + w_px/2 + (nextX - (x + w_px/2)) * u, y + 15 * Math.sin(u * Math.PI)]);
          }
          els.push({ t: 'bridge', pts: bridgePts, d0: 300, layer: 0 });
        }
        this.letters.push({ ch, x: x + w / 2, y, w: w_px, S, els, birth: null, ws: ws[i] });
        x += w_px;
      });
    }

    // Grow function
    grow(r, E, nid, p, o) {
      const tip = r() < 0.5 ? 'rose' : r() < 0.75 ? 'fan' : 'leaf';
      const len = o.len || 0.8;
      const curvy = o.curvy || p.curvy;
      let P = vine(o.base, o.dir, len, (0.35 + r() * 0.45) * curvy, 1 + r() * 1.6, r() * 6.28, (r() - 0.5) * 1.2, 40);
      const dur = Math.max(320, len * 620);
      E.push({ t: 'stem', id: nid(), pts: P, d0: o.d0, dur, w: 1 });
      const nl = Math.floor(r() * 4.0 * p.leafy);
      let sd = r() < 0.5 ? -1 : 1;
      for (let i = 0; i < nl; i++) {
        const u = 0.25 + r() * 0.6;
        const pt = at(P, u);
        sd = -sd;
        E.push({ t: 'leaf', id: nid(), x: pt[0][0], y: pt[0][1], a: pt[1] + sd * (0.55 + r() * 0.5), L: (0.14 + r() * 0.2), bend: (r() - 0.5) * 1.2, d0: o.d0 + dur * u });
      }
      const [tp, ta] = at(P, 1);
      const td = o.d0 + dur * 0.8;
      if (tip === 'rose') {
        const R = (0.13 + r() * 0.15) * 1.2;
        E.push({ t: 'rose', id: nid(), x: tp[0], y: tp[1], R, rot: (r() - 0.5) * 1.0, d0: td });
      } else if (tip === 'fan') {
        for (let j = 0; j < 2; j++) {
          E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (j - 0.5) * 0.6, L: 0.2, bend: (j - 0.5) * 0.8, d0: td + j * 60 });
        }
      } else if (tip === 'leaf') {
        E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (r() - 0.5) * 0.3, L: 0.16, bend: (r() - 0.5), d0: td });
      }
      return P;
    }

    start() {
      if (this.started) return;
      this.started = true;

      // Wait for font
      const fontPromise = document.fonts ? document.fonts.load(`${this.opts.fontWeight} 100px ${this.opts.font}`) : Promise.resolve();
      fontPromise.then(() => {
        this.layout();
        // Set birth times for staggered growth
        let birthTime = performance.now();
        const delay = 180;
        this.letters.forEach((l, i) => {
          l.birth = birthTime + i * delay;
          l.els.forEach(el => {
            if (el.d0 !== undefined) el.d0 = el.d0; // keep original d0
          });
        });

        if (this.reducedMotion) {
          // Render one static grown frame
          this.introProgress = 10;
          this.grown = true;
          this.renderStatic();
        } else {
          this.introStartTime = performance.now();
          this.rafId = requestAnimationFrame((t) => this.loop(t));
        }
      }).catch(() => {
        this.layout();
        this.introStartTime = performance.now();
        this.rafId = requestAnimationFrame((t) => this.loop(t));
      });
    }

    stop() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      this.frameTimes = [];
      this.frameTimingDone = false;
      this.lastFrameTime = 0;
      }
    }

    destroy() {
      this.stop();
      if (this.observer) this.observer.disconnect();
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      window.removeEventListener('resize', this.resizeHandler);
      this.letters = [];
      this.flies = [];
    }

    setPointer(x, y) {
      if (this.coarsePointer || this.reducedMotion) return;
      this.pointer = { x, y };
      this.hasPointer = true;
    }

    clearPointer() {
      this.pointer = null;
      this.hasPointer = false;
    }

    loop(now) {
      if (this.lastFrameTime > 0 && this.grown && !this.frameTimingDone) {
        const dt = now - this.lastFrameTime;
        this.frameTimes.push(dt);
        if (this.frameTimes.length >= 100) {
          this.frameTimingDone = true;
          const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
          const worst = Math.max(...this.frameTimes);
          console.log('FRAME TIMING (100 frames, idle/sway): avg=' + avg.toFixed(2) + 'ms, worst=' + worst.toFixed(2) + 'ms');
        }
      }
      this.lastFrameTime = now;
      if (!this.visible || document.hidden) {
        this.rafId = null;
      this.frameTimes = [];
      this.frameTimingDone = false;
      this.lastFrameTime = 0;
        return;
      }

      const t = this.introStartTime ? (now - this.introStartTime) / 1000 : 0;

      // Check if intro is done (about 4 seconds)
      if (!this.grown && t > 4) {
        this.grown = true;
      }

      this.render(now, t);
      this.rafId = requestAnimationFrame((n) => this.loop(n));
    }

    render(now, t) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);

      if (!this.letters.length) return;

      // Draw letters (faint)
      ctx.font = `${this.opts.fontWeight} ${Math.min(this.W, this.H) * 0.35}px ${this.opts.font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = this.opts.colors.text + '20'; // 12% opacity
      for (const l of this.letters) {
        ctx.fillText(l.ch, l.x, l.y);
      }

      // Draw flowers
      const B = backend(ctx);
      const boilAmount = this.boil ? Math.sin(now * 0.003) * 0.5 : 0;

      for (const l of this.letters) {
        // Calculate growth progress for this letter
        const letterAge = l.birth ? (now - l.birth) / 1000 : t;
        const growthProgress = this.grown ? 10 : Math.min(letterAge, 10);

        for (const el of l.els) {
          if (el.t === 'stem') {
            this.drawStem(B, el, growthProgress, boilAmount);
          } else if (el.t === 'leaf') {
            this.drawLeaf(B, el, growthProgress, boilAmount);
          } else if (el.t === 'rose') {
            this.drawRose(B, el, growthProgress, boilAmount);
          } else if (el.t === 'bridge') {
            if (growthProgress * 1000 < el.d0) continue;
            strokeRange(B, el.pts, 0, 1, '#1C2B8F', 1.5);
          } else if (el.t === 'curl') {
            if (growthProgress * 1000 > el.d0) {
              curl(B, el.base, el.dir, el.len, el.amp, 1.5);
            }
          } else if (el.t === 'bridge') {
            if (growthProgress * 1000 > el.d0) {
              const pts = [[el.x1, el.y1], [(el.x1 + el.x2) / 2, el.y1 + 10], [el.x2, el.y2]];
              strokeRange(B, pts, this.opts.colors.stem, 1.5, 0.5);
            }
          }
        }
      }

      // Draw butterfly if enabled
      if (this.butterfly && this.grown) {
        this.drawButterfly(ctx, now);
      }
    }

    renderStatic() {
      this.render(performance.now(), 10);
    }

    drawStem(B, stem, progress, boil) {
      const pts = stem.pts;
      const n = pts.length;
      const visible = Math.floor((progress / (stem.dur / 1000 + 0.5)) * n);
      if (visible < 2) return;
      const visiblePts = pts.slice(0, Math.min(visible + 1, n));
      // Apply boil wobble
      let drawPts = visiblePts;
      if (boil) {
        drawPts = visiblePts.map((p, i) => [p[0] + Math.sin(i * 0.5 + boil) * 0.5, p[1] + Math.cos(i * 0.3 + boil) * 0.3]);
      }
      // Variable width: thick at base, thin at tip
      strokeRange(B, drawPts, this.opts.colors.stem, 2.5, 0.5);
    }

    drawLeaf(B, leaf, progress, boil) {
      if (progress < leaf.d0 / 1000) return;
      const p = Math.min(1, (progress * 1000 - leaf.d0) / 200);
      const ca = Math.cos(leaf.a), sa = Math.sin(leaf.a);
      const L = leaf.L * p * 20;
      const bx = leaf.x, by = leaf.y;
      const px = -sa, py = ca;
      const ax = u => { const b = Math.sin(Math.PI * u) * leaf.bend * 0.15 * L; return [bx + ca * u * L + px * b, by + sa * u * L + py * b]; };
      const hw = u => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
      const N = 12, s1 = [], s2 = [];
      for (let i = 0; i <= N; i++) { const u = i / N, c = ax(u), w = hw(u); s1.push([c[0] + px * w, c[1] + py * w]); s2.push([c[0] - px * w, c[1] - py * w]); }
      const tip = ax(1), base = ax(0);
      B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], '#5BAF6A');
    }

    drawRose(B, rose, progress, boil) {
      if (progress < rose.d0 / 1000) return;
      const p = Math.min(1, (progress * 1000 - rose.d0) / 300);
      const R = rose.R * p * 20;

      // Face turn toward cursor
      let rot = rose.rot || 0;
      if (this.hasPointer && !this.reducedMotion) {
        const dx = this.pointer.x - (rose.x + this.letters[0].x - this.letters[0].w / 2);
        const dy = this.pointer.y - (rose.y + this.letters[0].y);
        const targetRot = Math.atan2(dy, dx);
        rot = rot * 0.9 + targetRot * 0.1; // damping
        rose.rot = rot;
      }

      // Draw rose with rotation
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const petals = 5;
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        const px = rose.x + Math.cos(a) * R * 0.6;
        const py = rose.y + Math.sin(a) * R * 0.6;
        const p1x = px + Math.cos(a + 0.5) * R * 0.4;
        const p1y = py + Math.sin(a + 0.5) * R * 0.4;
        const p2x = px + Math.cos(a - 0.5) * R * 0.4;
        const p2y = py + Math.sin(a - 0.5) * R * 0.4;
        B.fill([[rose.x, rose.y], [p1x, p1y], [px, py], [p2x, p2y]], this.opts.colors.flower);
      }
      // Center
      B.fill([[rose.x, rose.y - R * 0.2], [rose.x + R * 0.2, rose.y], [rose.x, rose.y + R * 0.2], [rose.x - R * 0.2, rose.y]], this.opts.colors.flower);
    }

    drawButterfly(ctx, now) {
      // Simple butterfly animation
      const t = now * 0.001;
      const x = this.W * 0.5 + Math.sin(t * 0.5) * this.W * 0.3;
      const y = this.H * 0.3 + Math.cos(t * 0.7) * this.H * 0.2;
      const wingSpan = 15 + Math.sin(t * 8) * 5;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 0.3) * 0.3);
      // Left wing
      ctx.beginPath();
      ctx.ellipse(-wingSpan / 2, 0, wingSpan / 2, wingSpan / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 100, 50, 0.6)';
      ctx.fill();
      // Right wing
      ctx.beginPath();
      ctx.ellipse(wingSpan / 2, 0, wingSpan / 2, wingSpan / 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 100, 50, 0.6)';
      ctx.fill();
      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, 2, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
      ctx.restore();
    }
  }

  // Export
  global.GardenName = GardenName;
})(window);