(function () {
  "use strict";

  /* ---------- TYPE GARDEN ENGINE (verbatim port from priyamd22/type-garden) ---------- */
  // Font constants - Anton on Google Fonts only has 400 and 700 weights
  const HERO_FONT_FAMILY = '"Anton",sans-serif';
  const HERO_FONT_WEIGHT = '700';
  const FONT = HERO_FONT_FAMILY;
  const FONT_SPEC = `${HERO_FONT_WEIGHT} 100px ${HERO_FONT_FAMILY}`;
  const COLORS = {
    red: "#FF3B1F",
    blue: "#1C2B8F",
    line: "#FFD2C4",
    text: "#121413",
    vein: "#FFD2C4",
  };
  const CFG = { boil: true, density: 1 };

  // B-hole focal point constants
  const B_HOLE_CONFIG = {
    // Render B at this size for hole detection (relative to S)
    RENDER_SCALE: 1.0,
    // Flood fill tolerance
    TOLERANCE: 128,
  };

  // Slide-door animation constants
  const SLIDE_DOOR_CONFIG = {
    // Split after this letter index (0-indexed): 1 = after U (S,U | B,H,U)
    SPLIT_AFTER_INDEX: 1,
    // Maximum shift as fraction of viewport width (reduced to 2% to allow larger text)
    MAX_SHIFT_RATIO: 0.02,
    // Scroll progress at which slide completes (0-1)
    SLIDE_COMPLETE_PROGRESS: 0.6,
    // Minimum opacity at end of zoom (not 0)
    MIN_OPACITY: 0.38,
    // Easing function for slide
    SLIDE_EASE: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  };

  // Safe rect for random seed constraint (Step 7)
  const SAFE_RECT_CONFIG = {
    // Vertical padding above/below text bounds (fraction of text height)
    VERTICAL_PADDING_RATIO: 0.25,
    // Horizontal padding left/right of text bounds (fraction of text width)
    HORIZONTAL_PADDING_RATIO: 0.08,
    // Max attempts to find a valid seed
    MAX_SEED_ATTEMPTS: 20,
  };

  function h(n) {
    const x = Math.sin(n) * 43758.5453;
    return x - Math.floor(x);
  }
  function spr(t, k = 7, w = 16) {
    if (t <= 0) return 0;
    return 1 - Math.exp(-t * k) * Math.cos(t * w);
  }
  function eo(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return 1 - Math.pow(1 - t, 3);
  }
  function rng(seed) {
    let s = seed | 0;
    return () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Compute lower hole centroid of "B" glyph
  function computeBHoleCentroid(fontSpec, size) {
    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d');
    const renderSize = Math.ceil(size * B_HOLE_CONFIG.RENDER_SCALE);
    const padding = Math.ceil(renderSize * 0.2);
    const canvasSize = renderSize + padding * 2;
    
    offscreen.width = canvasSize;
    offscreen.height = canvasSize;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    
    ctx.font = fontSpec.replace('100px', `${renderSize}px`);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText('B', canvasSize / 2, canvasSize / 2);
    
    // Get image data
    const imgData = ctx.getImageData(0, 0, canvasSize, canvasSize);
    const data = imgData.data;
    const w = canvasSize;
    const h = canvasSize;
    
    // Flood fill from outside (white background) to mark exterior
    const visited = new Uint8Array(w * h);
    const queue = [];
    
    // Start from corners (outside)
    const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
    for (const [qx, qy] of corners) {
      const idx = qy * w + qx;
      if (!visited[idx]) {
        const alpha = data[idx * 4 + 3];
        const brightness = (data[idx * 4] + data[idx * 4 + 1] + data[idx * 4 + 2]) / 3;
        if (alpha < 128 || brightness > B_HOLE_CONFIG.TOLERANCE) {
          visited[idx] = 1;
          queue.push([qx, qy]);
        }
      }
    }
    
    // BFS flood fill
    while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
      for (const [nx, ny] of neighbors) {
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const nidx = ny * w + nx;
        if (visited[nidx]) continue;
        const alpha = data[nidx * 4 + 3];
        const brightness = (data[nidx * 4] + data[nidx * 4 + 1] + data[nidx * 4 + 2]) / 3;
        if (alpha < 128 || brightness > B_HOLE_CONFIG.TOLERANCE) {
          visited[nidx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
    
    // Find unvisited black pixels (enclosed regions = holes)
    const holes = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = y * w + x;
        if (visited[idx]) continue;
        const alpha = data[idx * 4 + 3];
        const brightness = (data[idx * 4] + data[idx * 4 + 1] + data[idx * 4 + 2]) / 3;
        if (alpha >= 128 && brightness <= B_HOLE_CONFIG.TOLERANCE) {
          // Found a hole pixel - flood fill this hole
          const holePixels = [];
          const holeQueue = [[x, y]];
          visited[idx] = 2; // Mark as hole
          
          while (holeQueue.length > 0) {
            const [hx, hy] = holeQueue.shift();
            holePixels.push([hx, hy]);
            const neighbors = [[hx + 1, hy], [hx - 1, hy], [hx, hy + 1], [hx, hy - 1]];
            for (const [nhx, nhy] of neighbors) {
              if (nhx < 0 || nhx >= w || nhy < 0 || nhy >= h) continue;
              const nidx = nhy * w + nhx;
              if (visited[nidx] !== 0) continue;
              const nalpha = data[nidx * 4 + 3];
              const nbrightness = (data[nidx * 4] + data[nidx * 4 + 1] + data[nidx * 4 + 2]) / 3;
              if (nalpha >= 128 && nbrightness <= B_HOLE_CONFIG.TOLERANCE) {
                visited[nidx] = 2;
                holeQueue.push([nhx, nhy]);
              }
            }
          }
          
          if (holePixels.length > 10) { // Filter noise
            holes.push(holePixels);
          }
        }
      }
    }
    
    if (holes.length === 0) return null;
    
    // Sort holes by vertical position (y centroid), pick the lower one
    holes.sort((a, b) => {
      const ay = a.reduce((sum, p) => sum + p[1], 0) / a.length;
      const by = b.reduce((sum, p) => sum + p[1], 0) / b.length;
      return ay - by;
    });
    
    const lowerHole = holes[holes.length - 1];
    
    // Compute centroid of lower hole
    const cx = lowerHole.reduce((sum, p) => sum + p[0], 0) / lowerHole.length;
    const cy = lowerHole.reduce((sum, p) => sum + p[1], 0) / lowerHole.length;
    
    // Convert to normalized coordinates (0-1) relative to canvas center
    const normX = (cx - canvasSize / 2) / (renderSize / 2);
    const normY = (cy - canvasSize / 2) / (renderSize / 2);
    
    return { x: normX, y: normY, cx, cy, canvasSize, renderSize };
  }
  function bez(a, b, c, d, n) {
    const P = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n,
        u = 1 - t;
      P.push([
        u * u * u * a[0] +
          3 * u * u * t * b[0] +
          3 * u * t * t * c[0] +
          t * t * t * d[0],
        u * u * u * a[1] +
          3 * u * u * t * b[1] +
          3 * u * t * t * c[1] +
          t * t * t * d[1],
      ]);
    }
    return P;
  }
  function at(P, u) {
    const n = P.length;
    const i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
    return [
      P[i],
      Math.atan2(P[i + 1][1] - P[i - 1][1], P[i + 1][0] - P[i - 1][0]),
    ];
  }
  function jit(id, f, amp) {
    if (!amp) return [0, 0, 0];
    return [
      (h(id * 1.37 + f * 7.13) * 2 - 1) * amp,
      (h(id * 2.71 + f * 3.11) * 2 - 1) * amp,
      (h(id * 5.3 + f * 1.7) * 2 - 1) * 0.035,
    ];
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
      fill: (p, col) => {
        g.beginPath();
        path(g, p, true);
        g.fillStyle = col;
        g.fill();
      },
      stroke: (p, col, w) => {
        g.beginPath();
        path(g, p, false);
        g.strokeStyle = col;
        g.lineWidth = w;
        g.lineCap = "round";
        g.lineJoin = "round";
        g.stroke();
      },
      rect: (x, y, w, hh, col) => {
        g.fillStyle = col;
        g.fillRect(x, y, w, hh);
      },
      text: (ch, x, y, S, col) => {
        g.font = `${HERO_FONT_WEIGHT} ${S}px ${HERO_FONT_FAMILY}`;
        g.fontKerning = 'normal';
        g.fontVariantLigatures = 'none';
        g.fontSynthesis = 'none';
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.fillStyle = col;
        // Add letter spacing for better readability
        const letterSpacing = S * 0.08;
        const chars = ch.split("");
        const totalWidth = chars.reduce((sum, c) => sum + g.measureText(c).width, 0) + letterSpacing * (chars.length - 1);
        let cursorX = x - totalWidth / 2;
        for (const char of chars) {
          g.fillText(char, cursorX, y);
          cursorX += g.measureText(char).width + letterSpacing;
        }
      },
    };
  }
  function vine(base, dir, len, amp, waves, ph, bend, n) {
    n = n || 40;
    const P = [[base[0], base[1]]],
      step = len / n;
    let x = base[0],
      y = base[1];
    for (let i = 1; i <= n; i++) {
      const u = i / n,
        a =
          dir +
          bend * u +
          amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
      x += Math.cos(a) * step;
      y += Math.sin(a) * step;
      P.push([x, y]);
    }
    return P;
  }
  function curl(P, sign, rad) {
    const n = P.length,
      e = P[n - 1],
      a = Math.atan2(e[1] - P[n - 2][1], e[0] - P[n - 2][0]);
    const c = [
      e[0] - Math.sin(a) * sign * rad,
      e[1] + Math.cos(a) * sign * rad,
    ];
    const a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
    for (let i = 1; i <= 14; i++) {
      const u = i / 14,
        t = a0 + sign * u * Math.PI * 1.6,
        rr = rad * (1 - 0.5 * u);
      P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]);
    }
    return P;
  }
  function strokeRange(B, P, a, b, col, w) {
    const n = P.length - 1,
      ia = a * n,
      ib = b * n;
    const lerp = (t) => {
      const i = Math.min(n - 1, Math.floor(t)),
        f = t - i;
      return [
        P[i][0] + (P[i + 1][0] - P[i][0]) * f,
        P[i][1] + (P[i + 1][1] - P[i][1]) * f,
      ];
    };
    const pts = [lerp(ia)];
    for (let i = Math.floor(ia) + 1; i < ib; i++) pts.push(P[i]);
    pts.push(lerp(ib));
    if (pts.length >= 2) B.stroke(pts, col, w);
  }
  function thorn(B, P, u, s, S) {
    const [p, a] = at(P, u),
      d = a + s * 2.3,
      L = S * 0.045;
    B.stroke(
      [p, [p[0] + Math.cos(d) * L, p[1] + Math.sin(d) * L]],
      COLORS.blue,
      S * 0.022,
    );
  }
  function leaf(B, bx, by, a, L, bend) {
    if (L < 0.5) return;
    const ca = Math.cos(a),
      sa = Math.sin(a),
      px = -sa,
      py = ca;
    const ax = (u) => {
      const b = Math.sin(Math.PI * u) * bend * 0.15 * L;
      return [bx + ca * u * L + px * b, by + sa * u * L + py * b];
    };
    const hw = (u) => L * 0.18 * Math.sin(Math.PI * Math.pow(u, 0.8));
    const N = 12,
      s1 = [],
      s2 = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N,
        c = ax(u),
        w = hw(u);
      s1.push([c[0] + px * w, c[1] + py * w]);
      s2.push([c[0] - px * w, c[1] - py * w]);
    }
    const tip = ax(1),
      base = ax(0);
    B.fill(
      [base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base],
      COLORS.blue,
    );
    if (L > 6) {
      const v = [];
      for (let i = 0; i <= 8; i++) v.push(ax(0.08 + (0.72 * i) / 8));
      B.stroke(v, COLORS.vein, Math.max(0.8, L * 0.03));
    }
  }
  function rose(B, cx, cy, R, rot, e, a, tl) {
    const cr = Math.cos(rot),
      sr = Math.sin(rot);
    const tm = tl ? Math.hypot(tl[0], tl[1]) : 0,
      ux = tm ? tl[0] / tm : 0,
      uy = tm ? tl[1] / tm : 0,
      sq = -0.28 * tm;
    const T = (x, y, z = 0) => {
      let dx = x * cr - y * sr,
        dy = x * sr + y * cr;
      if (tm) {
        const k = (dx * ux + dy * uy) * sq;
        dx += k * ux + tl[0] * R * z;
        dy += k * uy + tl[1] * R * z;
      }
      return [cx + dx, cy + dy];
    };
    const P = [
      [0, -0.36, 0.56, 0.54, 0, 0, 0],
      [-0.5, -0.06, 0.6, 0.6, -0.35, 0, 0],
      [0.52, -0.06, 0.6, 0.6, 0.35, 0, 0],
      [-0.42, 0.3, 0.62, 0.48, 0.2, 0.12, 1],
      [0.47, 0.3, 0.62, 0.48, -0.2, 0.12, 1],
      [0.05, 0.42, 0.56, 0.38, 0, 0.14, 0],
    ];
    const ax0 = 0,
      ay0 = 0.5,
      lw = Math.max(0.8, R * 0.045),
      st = 85;
    P.forEach((q, i) => {
      const s = spr((a - i * st) / 1000, 8, 14);
      if (s <= 0.001) return;
      const open = (1 - Math.min(1, s)) * (q[0] < 0 ? 0.5 : -0.5),
        ang = q[4] + open,
        ca2 = Math.cos(ang),
        sa2 = Math.sin(ang);
      const pt = (th) => {
        const rr =
          1 +
          0.08 * Math.sin(3 * th + e.ph1 + i) +
          0.04 * Math.sin(5 * th + e.ph2);
        const lx = Math.cos(th) * q[2] * rr,
          ly = Math.sin(th) * q[3] * rr;
        const px2 = q[0] + lx * ca2 - ly * sa2,
          py2 = q[1] + lx * sa2 + ly * ca2;
        return T(
          (ax0 + (px2 - ax0) * s) * R,
          (ay0 + (py2 - ay0) * s) * R,
          q[5],
        );
      };
      const pts = [];
      for (let k = 0; k < 26; k++) pts.push(pt((k / 26) * Math.PI * 2));
      B.fill(pts, COLORS.red);
      if (q[6] && R >= 12 && s > 0.4) {
        const arc = [];
        for (let k = 0; k <= 14; k++)
          arc.push(pt(Math.PI * (1.18 + (0.64 * k) / 14)));
        strokeRange(
          B,
          arc,
          0,
          Math.min(1, (s - 0.4) / 0.5),
          COLORS.line,
          lw * 0.8,
        );
      }
    });
    const fr = eo((a - P.length * st - 80) / 520);
    if (fr > 0 && R > 3) {
      const sp = [],
        scl = [];
      const turns =
        R < 20 ? Math.min(e.turns, 1.3) : R < 32 ? e.turns * 0.8 : e.turns;
      for (let i = 0; i <= 70; i++) {
        const u = i / 70,
          th = e.ph1 + u * turns * Math.PI * 2,
          rr = R * (0.08 + 0.57 * u);
        sp.push(
          T(
            Math.cos(th) * rr * 1.05,
            Math.sin(th) * rr * 0.72 - 0.12 * R,
            0.34 - 0.24 * u,
          ),
        );
      }
      strokeRange(B, sp, 0, fr, COLORS.line, lw);
      if (R >= 14) {
        for (let i = 0; i <= 36; i++) {
          const u = i / 36;
          scl.push(
            T(
              (-0.72 + 1.5 * u) * R,
              0.36 * R + 0.16 * R * Math.abs(Math.sin(u * Math.PI * 3)),
              0.18,
            ),
          );
        }
        strokeRange(B, scl, 0, fr, COLORS.line, lw);
      }
    }
  }

  function wordParams(ws) {
    const r = rng(ws * 7 + 13),
      dens = CFG.density;
    return {
      roseP: 0.3 + r() * 0.3,
      leafy: (0.6 + r() * 0.8) * dens,
      dens,
      lean: (r() - 0.5) * 0.4,
      big: 0.85 + r() * 0.3,
      curvy: 0.7 + r() * 0.4,
      bridgeP: Math.min(0.95, (0.45 + r() * 0.35) * dens),
      w: 0.5,
    };
  }
  function grow(r, E, nid, p, o) {
    const tip =
      o.tip ||
      (r() < p.roseP
        ? "rose"
        : r() < 0.45
          ? "fan"
          : r() < 0.6
            ? "leaf"
            : "curl");
    let P =
      o.pts ||
      vine(
        o.base,
        o.dir,
        o.len,
        (0.35 + r() * 0.45) * p.curvy,
        1 + r() * 1.6,
        r() * 6.28,
        (r() - 0.5) * 1.2,
        40,
      );
    if (tip === "curl") P = curl(P, r() < 0.5 ? -1 : 1, 0.05 + r() * 0.05);
    const segs = weave(r, o.layer0 != null ? o.layer0 : r() < 0.5 ? 0 : 1);
    const dur = Math.max(320, (o.len || 0.8) * 620);
    const thorns = [],
      nt = Math.floor(r() * 2.5);
    for (let i = 0; i < nt; i++)
      thorns.push({ u: 0.15 + r() * 0.65, s: r() < 0.5 ? -1 : 1 });
    E.push({
      t: "stem",
      id: nid(),
      pts: P,
      segs,
      d0: o.d0,
      dur,
      w: o.depth ? 0.82 : 1,
      thorns,
    });
    const nl = Math.floor(r() * 2.8 * p.leafy);
    let sd = r() < 0.5 ? -1 : 1;
    for (let i = 0; i < nl; i++) {
      const u = 0.25 + r() * 0.6,
        [q, a] = at(P, u);
      sd = -sd;
      E.push({
        t: "leaf",
        id: nid(),
        x: q[0],
        y: q[1],
        a: a + sd * (0.55 + r() * 0.5),
        L: (0.14 + r() * 0.2) * (o.depth ? 0.8 : 1),
        bend: (r() - 0.5) * 1.2,
        layer: layerAt(segs, u),
        d0: o.d0 + dur * u,
      });
    }
    const [tp, ta] = at(P, 1),
      td = o.d0 + dur * 0.8,
      tl = layerAt(segs, 1);
    if (tip === "rose") {
      const R = (0.13 + r() * 0.15) * p.big * (o.depth ? 0.75 : 1);
      const over = tp[1] > -0.78 && tp[1] < 0.05 && Math.abs(tp[0]) < p.w * 0.5;
      const layer = over ? (r() < 0.22 ? 1 : 0) : r() < 0.6 ? 1 : tl;
      E.push({
        t: "rose",
        id: nid(),
        x: tp[0],
        y: tp[1],
        R,
        rot: (r() - 0.5) * 1.0,
        ph1: r() * 6.28,
        ph2: r() * 6.28,
        turns: 1.8 + r() * 1,
        layer,
        d0: td,
      });
      if (r() < 0.2) {
        const oo = ta + (r() < 0.5 ? 1 : -1) * 1.3;
        E.push({
          t: "rose",
          id: nid(),
          x: tp[0] + Math.cos(oo) * R * 1.4,
          y: tp[1] + Math.sin(oo) * R * 1.4,
          R: R * (0.6 + r() * 0.3),
          rot: (r() - 0.5) * 1.2,
          ph1: r() * 6.28,
          ph2: r() * 6.28,
          turns: 1.8 + r(),
          layer,
          d0: td + 120,
        });
      }
    } else if (tip === "fan") {
      const spread = 0.6 + r() * 0.3;
      for (let j = 0; j < 2; j++)
        E.push({
          t: "leaf",
          id: nid(),
          x: tp[0],
          y: tp[1],
          a: ta + (j - 0.5) * spread,
          L: 0.2 + r() * 0.2,
          bend: (j - 0.5) * 0.8,
          layer: tl,
          d0: td + j * 60,
        });
    } else if (tip === "leaf") {
      E.push({
        t: "leaf",
        id: nid(),
        x: tp[0],
        y: tp[1],
        a: ta + (r() - 0.5) * 0.3,
        L: 0.16 + r() * 0.16,
        bend: r() - 0.5,
        layer: tl,
        d0: td,
      });
    }
    if (!o.depth && r() < 0.3) {
      const u = 0.35 + r() * 0.35,
        [q, a] = at(P, u);
      grow(r, E, nid, p, {
        base: q,
        dir: a + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4),
        len: (o.len || 0.8) * (0.35 + r() * 0.2),
        d0: o.d0 + dur * u,
        depth: 1,
        layer0: layerAt(segs, u),
      });
    }
    return P;
  }
  function weave(r, startLayer) {
    const cuts = [],
      nc = 1 + Math.floor(r() * 3);
    for (let i = 0; i < nc; i++) cuts.push(0.15 + r() * 0.7);
    cuts.sort((a, b) => a - b);
    const segs = [];
    let u0 = 0;
    let layer = startLayer;
    for (const c of cuts) {
      if (c <= u0) continue;
      segs.push({ u0, u1: c, layer });
      if (r() < 0.3) {
        const g = 0.02 + r() * 0.03;
        u0 = Math.min(0.98, c + g);
      } else u0 = c;
      layer = 1 - layer;
    }
    segs.push({ u0, u1: 1, layer });
    return segs;
  }
  function layerAt(segs, u) {
    for (const s of segs) if (u >= s.u0 && u <= s.u1) return s.layer;
    return segs[segs.length - 1].layer;
  }
  function genLetter(l, mwFn, randFn) {
    const r = rng(
      (l.ws ^ Math.imul(l.wi + 1, 2654435761)) + Math.floor(randFn() * 1e6),
    );
    const p = wordParams(l.ws),
      E = [];
    let k0 = 0;
    const nid = () => l.id * 100 + k0++;
    const w = mwFn(l.ch),
      inX = () => (r() - 0.5) * w * 0.7;
    p.w = w;
    const nUp = 1 + (r() < 0.45 * p.dens ? 1 : 0);
    for (let i = 0; i < nUp; i++) {
      grow(r, E, nid, p, {
        base: [inX(), -r() * 0.3],
        dir: -Math.PI / 2 + p.lean * 0.5 + (r() - 0.5) * 0.7,
        len: 0.6 + r() * 0.5,
        d0: 40 + i * 130,
        tip: l.wi === 0 && i === 0 ? "rose" : null,
      });
    }
    if (r() < 0.4 * p.dens)
      grow(r, E, nid, p, {
        base: [inX(), -0.1 - r() * 0.35],
        dir: Math.PI / 2 + (r() - 0.5) * 0.8,
        len: 0.35 + r() * 0.35,
        d0: 160,
      });
    if (l.prev && r() < p.bridgeP) {
      const px = -(mwFn(l.prev.ch) + w) / 2,
        a = [inX(), -0.05 - r() * 0.55],
        b = [px + (r() - 0.5) * 0.25, -0.05 - r() * 0.55];
      const bulge = (r() < 0.55 ? -1 : 1) * (0.4 + r() * 0.4),
        dx = b[0] - a[0];
      let P = bez(
        a,
        [a[0] + dx * 0.15, a[1] + bulge],
        [b[0] - dx * 0.15, b[1] + bulge * 0.9],
        b,
        40,
      );
      if (r() < 0.45) P = P.slice(0, Math.floor(P.length * (0.7 + r() * 0.2)));
      grow(r, E, nid, p, {
        pts: P,
        len: Math.abs(dx) + Math.abs(bulge),
        d0: 90,
        tip: r() < 0.5 ? "curl" : r() < 0.5 ? "leaf" : "rose",
      });
    }
    if (r() < p.bridgeP * 0.7) {
      const fx = w * 0.15 + r() * w * 0.2;
      grow(r, E, nid, p, {
        base: [fx, -0.1 - r() * 0.45],
        dir: -0.55 + (r() - 0.5) * 0.9 + p.lean * 0.3,
        len: 0.45 + r() * 0.4,
        d0: 130,
      });
    }
    if (l.wi === 0) {
      const left = r() < 0.3;
      grow(r, E, nid, p, {
        base: [(left ? -1 : 1) * w * 0.3, -0.15 - r() * 0.4],
        dir: (left ? Math.PI : 0) + (r() - 0.5) * 1.2,
        len: 0.45 + r() * 0.3,
        d0: 120,
        tip: "curl",
      });
    }
    l.els = E;
    const T = [],
      tr = rng(l.id * 977 + Math.floor(randFn() * 1e6));
    grow(tr, T, () => l.id * 100 + 90 + T.length, p, {
      base: [w * 0.25, -0.1 - tr() * 0.45],
      dir: (tr() - 0.5) * 1.4,
      len: 0.45 + tr() * 0.25,
      d0: 0,
      tip: "curl",
      depth: 1,
    });
    l.tend = T.filter((e) => e.t === "stem").slice(0, 1);
  }
  function faceTurn(st, e, x, y) {
    let wx = 0,
      wy = 0;
    if (st.mx != null) {
      const dx = st.mx - x,
        dy = st.my - y,
        d = Math.hypot(dx, dy),
        reach = 300;
      if (d < reach && d > 0.001) {
        const w = 1 - d / reach,
          s = w * w * (3 - 2 * w) * Math.min(1, d / 40);
        wx = (dx / d) * s;
        wy = (dy / d) * s;
      }
    }
    const c = st.fa[e.id] || [0, 0];
    c[0] += (wx - c[0]) * 0.09;
    c[1] += (wy - c[1]) * 0.09;
    st.fa[e.id] = c;
    return c;
  }

  class Garden {
    constructor(canvas, opts) {
      this.cv = canvas;
      this.opts = Object.assign(
        { text: "SUBHU", boil: true, maxDpr: 2, density: 1 },
        opts || {},
      );
      this.text = this.opts.text;
      CFG.density = this.opts.density;
      this.g = canvas.getContext("2d");
      this.letters = [];
      this.uid = 1;
      this.cache = {};
      this.fa = {};
      this.mx = null;
      this.my = null;
      this._stopped = false;
      this._boundResize = () => this.resize();
      this._boundMove = (e) => {
        const r = this.cv.getBoundingClientRect();
        this.mx = e.clientX - r.left;
        this.my = e.clientY - r.top;
      };
      this._boundLeave = () => {
        this.mx = null;
      };
      window.addEventListener("resize", this._boundResize);
      window.addEventListener("pointermove", this._boundMove);
      window.addEventListener("pointerleave", this._boundLeave);
      this.reducedMotion =
        window.matchMedia &&
        matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.touch = window.matchMedia && matchMedia("(pointer: coarse)").matches;
      
      const initAfterFontLoad = () => {
        this.cache = {};
        this._buildLetters();
        this.resize();
      };
      
      if (document.fonts) {
        document.fonts
          .load(FONT_SPEC)
          .then(initAfterFontLoad)
          .catch(initAfterFontLoad);
      } else {
        initAfterFontLoad();
      }
    }
    mw(ch) {
      if (this.cache[ch] != null) return this.cache[ch];
      this.g.font = FONT_SPEC;
      this.g.fontKerning = 'normal';
      this.g.fontVariantLigatures = 'none';
      this.g.fontSynthesis = 'none';
      let w = this.g.measureText(ch).width / 100;
      if (ch === " ") w *= 1.4;
      return (this.cache[ch] = w);
    }
    resize() {
      const r = this.cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr || 2);
      if (!r.width || !r.height) return;
      this.cssW = r.width;
      this.cssH = r.height;
      this.W = Math.round(r.width * d);
      this.H = Math.round(r.height * d);
      this.dpr = d;
      this.cv.width = this.W;
      this.cv.height = this.H;
      this.layout();
    }
    _buildLetters() {
      // Compute text bounds first (without garden elements) to establish safe rect
      this._computeTextBoundsForSafeRect();
      
      // Try multiple random seeds until all garden elements fit in safe rect
      let bestSeed = null;
      let bestLetters = null;
      let bestFit = false;
      
      for (let attempt = 0; attempt < SAFE_RECT_CONFIG.MAX_SEED_ATTEMPTS; attempt++) {
        const seed = Math.floor(Math.random() * 1e9);
        const rand = rng(seed);
        const chars = [...this.text];
        let prev = null;
        const letters = chars.map((ch) => {
          const same = prev && prev.ch !== " ";
          const l = {
            ch,
            id: this.uid++,
            birth: null,
            ws: same ? prev.ws : Math.floor(rand() * 1e9),
            wi: same ? prev.wi + 1 : 0,
            prev: same ? prev : null,
          };
          if (ch !== " ") genLetter(l, this.mw.bind(this), rand);
          prev = l;
          return l;
        });
        
        // Check if this seed's garden elements fit in safe rect (at target scale, before safety fit)
        if (this._checkSafeRect(letters)) {
          bestSeed = seed;
          bestLetters = letters;
          bestFit = true;
          break;
        }
        
        // Keep track of last attempt as fallback
        bestSeed = seed;
        bestLetters = letters;
      }
      
      this.letters = bestLetters;
      this._seedFit = bestFit;
      
      // layout() will be called by resize() after font loads
      this.start();
    }
    
    _computeTextBoundsForSafeRect() {
      if (!this.W || !this.H) return;
      const TARGET_S = 300;
      let x = this.W / 2;
      const y = this.H * 0.48;
      
      // Compute total text width at target scale
      const chars = [...this.text];
      let totalW = 0;
      for (const ch of chars) {
        totalW += this.mw(ch) * TARGET_S;
      }
      x -= totalW / 2;
      
      let textLeft = Infinity, textRight = -Infinity, textTop = Infinity, textBottom = -Infinity;
      for (const ch of chars) {
        const w = this.mw(ch) * TARGET_S;
        const cx = x + w / 2;
        textLeft = Math.min(textLeft, cx - w / 2);
        textRight = Math.max(textRight, cx + w / 2);
        textTop = Math.min(textTop, y - TARGET_S * 0.75); // Approx top of ascenders
        textBottom = Math.max(textBottom, y + TARGET_S * 0.25); // Approx baseline
        x += w;
      }
      
      const textWidth = textRight - textLeft;
      const textHeight = textBottom - textTop;
      
      this._safeRect = {
        left: textLeft - textWidth * SAFE_RECT_CONFIG.HORIZONTAL_PADDING_RATIO,
        right: textRight + textWidth * SAFE_RECT_CONFIG.HORIZONTAL_PADDING_RATIO,
        top: textTop - textHeight * SAFE_RECT_CONFIG.VERTICAL_PADDING_RATIO,
        bottom: textBottom + textHeight * SAFE_RECT_CONFIG.VERTICAL_PADDING_RATIO,
      };
      
      // Clamp to canvas bounds
      this._safeRect.left = Math.max(0, this._safeRect.left);
      this._safeRect.top = Math.max(0, this._safeRect.top);
      this._safeRect.right = Math.min(this.W, this._safeRect.right);
      this._safeRect.bottom = Math.min(this.H, this._safeRect.bottom);
    }
    
    _checkSafeRect(letters) {
      if (!this._safeRect) return false;
      const S = 300; // TARGET_S
      
      // Temporarily position letters at target positions (like layout does)
      let x = this.W / 2;
      const totalW = () => letters.reduce((s, l) => s + this.mw(l.ch) * S, 0);
      x -= totalW() / 2;
      const y = this.H * 0.48;
      
      for (const l of letters) {
        const w = this.mw(l.ch) * S;
        l.tx = x + w / 2;
        l.ty = y;
        l.tw = w;
        x += w;
      }
      
      // Check all garden elements against safe rect
      for (const l of letters) {
        if (l.ch === " " || !l.els) continue;
        
        // Check letter bounds
        const halfW = l.tw / 2;
        if (l.tx - halfW < this._safeRect.left || l.tx + halfW > this._safeRect.right ||
            l.ty - S * 0.75 < this._safeRect.top || l.ty + S * 0.25 > this._safeRect.bottom) {
          return false;
        }
        
        // Check stems, leaves, roses
        for (const e of [...l.els, ...(l.tend || [])]) {
          if (e.t === "stem") {
            for (const p of e.pts || []) {
              const px = l.tx + p[0] * S;
              const py = l.ty + p[1] * S;
              if (px < this._safeRect.left || px > this._safeRect.right ||
                  py < this._safeRect.top || py > this._safeRect.bottom) {
                return false;
              }
            }
          } else if (e.t === "leaf") {
            const px = l.tx + e.x * S;
            const py = l.ty + e.y * S;
            const r = (e.L || 0.1) * S;
            if (px - r < this._safeRect.left || px + r > this._safeRect.right ||
                py - r < this._safeRect.top || py + r > this._safeRect.bottom) {
              return false;
            }
          } else if (e.t === "rose") {
            const px = l.tx + e.x * S;
            const py = l.ty + e.y * S;
            const r = (e.R || 0.15) * 1.4 * S;
            if (px - r < this._safeRect.left || px + r > this._safeRect.right ||
                py - r < this._safeRect.top || py + r > this._safeRect.bottom) {
              return false;
            }
          }
        }
      }
      
      return true;
    }
    layout() {
      if (!this.W || !this.letters.length) return;
      const TARGET_S = 300;
      let S = TARGET_S;

      // center letters at the target size first - DETERMINISTIC
      const totalW = () => this.letters.reduce((s, l) => s + this.mw(l.ch) * S, 0);
      let x = this.W / 2 - totalW() / 2;
      const y = this.H * 0.48;
      this.letters.forEach((l) => {
        const w = this.mw(l.ch) * S;
        l.tx = x + w / 2;
        l.ty = y;
        l.tw = w;
        x += w;
      });
      this.S = S;
      this.letters.forEach((l) => {
        l.x = l.tx;
        l.y = l.ty;
      });

      // safety fit: shrink ONLY if full garden (stems+leaves+roses) overflows — prevents crop
      // Extra left padding to prevent left-side crop from vines/flowers
      const pad = Math.max(80, this.W * 0.08);  // Original pad for larger text
      
      // The focal compensation shift is clamped to pad and only shifts LEFT (negative)
      // Reserve shift space only on left side
      const maxShift = pad;
      const availW = this.W - pad * 2 - maxShift,  // Only left side needs shift reserve
        availH = this.H - pad * 2;
      let x0 = 1e9,
        y0 = 1e9,
        x1 = -1e9,
        y1 = -1e9;
      const addP = (l, px, py, r) => {
        const X = l.tx + px * S,
          Y = l.ty + py * S,
          R = (r || 0) * S;
        x0 = Math.min(x0, X - R);
        x1 = Math.max(x1, X + R);
        y0 = Math.min(y0, Y - R);
        y1 = Math.max(y1, Y + R);
      };
      for (const l of this.letters) {
        if (l.ch === " " || !l.els) continue;
        addP(l, -l.tw / S / 2, -0.75);
        addP(l, l.tw / S / 2, 0.1);
        for (const e of [...l.els, ...(l.tend || [])]) {
          if (e.t === "stem")
            (e.pts || []).forEach((q) => addP(l, q[0], q[1], 0.03));
          else if (e.t === "leaf") addP(l, e.x, e.y, e.L || 0.1);
          else if (e.t === "rose") addP(l, e.x, e.y, (e.R || 0.15) * 1.4);
        }
      }
      if (x0 < x1 && y0 < y1) {
        const gw = x1 - x0,
          gh = y1 - y0,
          fit = Math.min(1, availW / gw, availH / gh);
        if (fit < 1) {
          const cx = (x0 + x1) / 2,
            cy = (y0 + y1) / 2;
          this.letters.forEach((l) => {
            l.tx = this.W / 2 + (l.tx - cx) * fit;
            l.ty = this.H / 2 + (l.ty - cy) * fit;
            l.tw *= fit;
          });
          this.S = S * fit;
          this.letters.forEach((l) => {
            l.x = l.tx;
            l.y = l.ty;
          });
        }
      }

      // focal point: lower hole of "B" glyph
      this.computeAndSetBHoleFocalPoint(S);
    }
    start() {
      const now = performance.now();
      this.letters.forEach((l, i) => {
        l.birth = now + i * 180;
      });
      this._stopped = false;
      const loop = (ts) => {
        if (this._stopped) return;
        this.raf = requestAnimationFrame(loop);
        this._frame(ts);
      };
      this.raf = requestAnimationFrame(loop);
    }
    computeAndSetBHoleFocalPoint(S) {
      const hole = computeBHoleCentroid(FONT_SPEC, S);
      if (!hole) return;
      
      // Find B letter
      const bIdx = this.letters.findIndex((l) => l.ch.toLowerCase() === "b");
      if (bIdx < 0) return;
      const bLetter = this.letters[bIdx];
      
      // Convert normalized hole position to canvas coordinates
      // hole.x, hole.y are normalized (-1 to 1) relative to B center
      // B letter center is at bLetter.tx, bLetter.ty
      const holeScale = S * 0.5; // approximate B width/2
      const holeCanvasX = bLetter.tx + hole.x * holeScale;
      const holeCanvasY = bLetter.ty + hole.y * holeScale;
      
      // Shift all letters so B-hole is at canvas center
      const dx = this.W / 2 - holeCanvasX;
      const dy = this.H / 2 - holeCanvasY;
      this.letters.forEach((l) => {
        l.tx += dx;
        l.ty += dy;
        l.x += dx;
        l.y += dy;
      });
      
      // After shift, B-hole is at canvas center (W/2, H/2)
      // Transform-origin should be 50% 50% to scale around canvas center = B-hole
      this.updateTransformOrigin(this.W / 2, this.H / 2);
    }
    updateTransformOrigin(canvasX, canvasY) {
      const heroEl = document.querySelector('#hero .el');
      if (!heroEl) return;
      // Convert canvas coordinates to .el percentage (0-100%)
      const originX = (canvasX / this.W) * 100;
      const originY = (canvasY / this.H) * 100;
      heroEl.style.transformOrigin = `${originX.toFixed(2)}% ${originY.toFixed(2)}%`;
    }
    _computeSlideDoorState() {
      const heroEl = document.querySelector('#hero .el');
      if (!heroEl) {
        this._slideProgress = 0;
        this._slideShift = 0;
        this._globalOpacity = 1;
        return;
      }
      
      // Get scroll progress from heroEl scale
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      if (!scaleMatch) {
        this._slideProgress = 0;
        this._slideShift = 0;
        this._globalOpacity = 1;
        return;
      }
      
      const scale = parseFloat(scaleMatch[1]);
      const minScale = 1;
      const maxScale = 2.43;  // Actual observed max scale
      
      let progress = (scale - minScale) / (maxScale - minScale);
      progress = Math.max(0, Math.min(1, progress));
      
      this._scrollProgress = progress;
      
      const slideProgress = Math.min(1, progress / SLIDE_DOOR_CONFIG.SLIDE_COMPLETE_PROGRESS);
      const easedSlide = SLIDE_DOOR_CONFIG.SLIDE_EASE(slideProgress);
      
      const vpWidth = window.innerWidth;
      const maxShiftCanvas = (vpWidth * SLIDE_DOOR_CONFIG.MAX_SHIFT_RATIO) / this.dpr;
      this._slideShift = maxShiftCanvas * easedSlide;
      
      this._globalOpacity = 1 - (1 - SLIDE_DOOR_CONFIG.MIN_OPACITY) * progress;
      
      this._slideDoorActive = slideProgress > 0;
    }
    _applyFocalCompensation(g, dpr) {
      const heroEl = document.querySelector('#hero .el');
      if (!heroEl) return;
      
      // Parse heroEl transform to get scale and translate
      const transform = heroEl.style.transform;
      const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
      const translateMatch = transform.match(/translate3d\(([^,]+),\s*([^,]+)/);
      
      if (!scaleMatch || !translateMatch) return;
      
      const scale = parseFloat(scaleMatch[1]);
      const translateX = parseFloat(translateMatch[1]);
      const translateY = parseFloat(translateMatch[2]);
      
      // Viewport center
      const vpCenterX = window.innerWidth / 2;
      const vpCenterY = window.innerHeight / 2;
      
      // HeroEl center in viewport = translate (after translate3d, before translate(-50%,-50%))
      const heroCenterX = translateX;
      const heroCenterY = translateY;
      
      // Slide-door shift for B-hole (B is in right group, index 2 > splitIdx 1)
      const slideShift = this._slideShift || 0;
      const bHoleShiftX = slideShift; // B shifts right
      
      // B-hole position in heroEl coords (before CSS scale) = canvas center + slide shift
      const bHoleHeroElX = this.W / 2 + bHoleShiftX;
      const bHoleHeroElY = this.H / 2;
      
      // B-hole position in viewport = heroEl center + (bHoleHeroEl - heroEl center) * scale
      // heroEl center in heroEl coords = (W/2, H/2)
      const bHoleVpX = heroCenterX + (bHoleHeroElX - this.W / 2) * scale;
      const bHoleVpY = heroCenterY + (bHoleHeroElY - this.H / 2) * scale;
      
      // Required shift in viewport coords to center B-hole
      const shiftVpX = vpCenterX - bHoleVpX;
      const shiftVpY = vpCenterY - bHoleVpY;
      
      // Convert to garden canvas coords (before heroEl CSS scale)
      let shiftCanvasX = shiftVpX / scale;
      let shiftCanvasY = shiftVpY / scale;
      
      // Clamp shift to safety pad to prevent cropping
      const pad = Math.max(80, this.W * 0.08);
      const maxShift = pad;
      shiftCanvasX = Math.max(-pad, Math.min(pad, shiftCanvasX));
      shiftCanvasY = Math.max(-pad, Math.min(pad, shiftCanvasY));
      
      // Apply translation (g context already has DPR transform)
      g.translate(shiftCanvasX * dpr, shiftCanvasY * dpr);
    }
    stop() {
      this._stopped = true;
      if (this.raf) cancelAnimationFrame(this.raf);
    }
    destroy() {
      this.stop();
      window.removeEventListener("resize", this._boundResize);
      window.removeEventListener("pointermove", this._boundMove);
      window.removeEventListener("pointerleave", this._boundLeave);
    }
    _frame(now) {
      const g = this.g,
        d = this.dpr;
      g.setTransform(d, 0, 0, d, 0, 0);
      
      // Compute scroll progress and slide-door state
      this._computeSlideDoorState();
      
      // Apply focal compensation transform to keep B-hole at viewport center
      this._applyFocalCompensation(g, d);
      
      g.clearRect(0, 0, this.W, this.H);
      const B = backend(g);
      const st = { mx: this.touch ? null : this.mx, my: this.my, fa: this.fa };
      const f = CFG.boil && !this.reducedMotion ? Math.floor(now / 120) : 0;
      const amp =
        CFG.boil && !this.reducedMotion ? Math.max(0.8, this.S * 0.01) : 0;
      
      // Apply slide-door transform per letter
      const splitIdx = SLIDE_DOOR_CONFIG.SPLIT_AFTER_INDEX;
      const shift = this._slideShift || 0;
      const opacity = this._globalOpacity !== undefined ? this._globalOpacity : 1;
      
      for (const l of this.letters) {
        if (l.ch === " " || !l.els) continue;
        
        // Apply slide-door shift
        const isLeftGroup = this.letters.indexOf(l) <= splitIdx;
        const dir = isLeftGroup ? -1 : 1;
        const slideX = dir * shift;
        
        // Temporarily shift letter position for drawing
        const origX = l.x;
        const origY = l.y;
        l.x += slideX;
        
        const age = this.reducedMotion ? 1e9 : now - l.birth;
        const S = this.S;
        for (const e of l.els) {
          if (e.t === "stem") this._drawStem(B, e, l, age, S, f, amp);
        }
        for (const e of l.els) {
          if (e.t === "leaf") this._drawLeaf(B, e, l, age, S, f, amp);
          else if (e.t === "rose") this._drawRose(B, e, l, age, S, f, amp, st);
        }
        if (l.tend)
          for (const e of l.tend) this._drawStem(B, e, l, age, S, f, amp);
        
        // Draw text with global opacity
        g.globalAlpha = opacity;
        B.text(l.ch, l.x, l.y, S, COLORS.text);
        g.globalAlpha = 1;
        
        // Restore position
        l.x = origX;
        l.y = origY;
      }
    }
    _drawStem(B, e, l, age, S, f, amp) {
      const fr = this.reducedMotion ? 1 : Math.max(0, eo((age - e.d0) / e.dur));
      if (fr <= 0) return;
      const j = jit(e.id, f, amp);
      const P = e.pts.map((p) => [
        l.x + p[0] * S + j[0],
        l.y + p[1] * S + j[1],
      ]);
      for (const sg of e.segs) {
        const b = Math.min(sg.u1, fr);
        if (b <= sg.u0) continue;
        strokeRange(B, P, sg.u0, b, COLORS.blue, S * 0.022 * (e.w || 1));
      }
      for (const th of e.thorns) if (fr > th.u) thorn(B, P, th.u, th.s, S);
    }
    _drawLeaf(B, e, l, age, S, f, amp) {
      const sc = this.reducedMotion
        ? 1
        : Math.max(0, spr((age - e.d0) / 1000, 7, 15));
      if (sc <= 0) return;
      const j = jit(e.id, f, amp);
      const x = l.x + e.x * S + j[0],
        y = l.y + e.y * S + j[1];
      leaf(B, x, y, e.a + j[2], e.L * S * Math.min(1, sc), e.bend);
    }
    _drawRose(B, e, l, age, S, f, amp, st) {
      const a = age - e.d0;
      if (!this.reducedMotion && a < 0) return;
      const aa = this.reducedMotion ? 1e9 : a;
      const j = jit(e.id, f, amp);
      const x = l.x + e.x * S + j[0],
        y = l.y + e.y * S + j[1];
      const tl = this.reducedMotion ? null : faceTurn(st, e, x, y);
      const rot = e.rot + j[2] + (tl ? tl[0] * 0.22 : 0);
      rose(B, x, y, e.R * S, rot, e, aa, tl);
    }
  }

  window.Garden = Garden;
})();
