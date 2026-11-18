/**
 * Slide-Door Scroll Animation for SUBHU Hero
 *
 * Behavior (matching John Bolster's site):
 * - Words split apart like sliding doors (left half goes left, right half goes right)
 * - Fade to ~60% opacity (not 0%)
 * - Then next section appears
 * - Blue HUD guideline always on top
 */

(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    // Keyframe points matching John's site
    keyframes: [
      { scroll: 0, scale: 1.0, opacity: 1.0, split: 0.0 },
      { scroll: 200, scale: 1.033, opacity: 1.0, split: 0.1 },
      { scroll: 800, scale: 1.177, opacity: 1.0, split: 0.5 },
      { scroll: 1400, scale: 2.466, opacity: 0.6, split: 1.0 }, // 60% fade, not 0%
      { scroll: 2000, scale: 1.684, opacity: 0.6, split: 1.0 },
    ],
    lerpFactor: 0.12, // Smooth lerp factor
    splitThreshold: 0.3, // Start splitting at this progress
  };

  // State
  let K = 0;
  let heroEl = null;
  let gardenCanvas = null;
  let hudEl = null;
  let wordElements = [];
  let wordPositions = [];

  // Initialize
  function init() {
    heroEl = document.querySelector(".el");
    gardenCanvas = document.getElementById("garden-canvas");
    hudEl = document.getElementById("hud");

    // Find word elements (the .h-name span elements)
    const hName = document.querySelector(".h-name");
    if (hName) {
      wordElements = Array.from(hName.querySelectorAll(".w"));
      cacheWordPositions();
    }

    // Ensure HUD is always on top
    if (hudEl) {
      hudEl.style.zIndex = "9999";
      hudEl.style.position = "fixed";
    }

    // Ensure canvas is below HUD but above content
    if (gardenCanvas) {
      gardenCanvas.style.zIndex = "10";
      gardenCanvas.style.position = "fixed";
    }

    // Start animation loop
    requestAnimationFrame(animate);
  }

  function cacheWordPositions() {
    wordPositions = wordElements.map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        element: el,
        index: i,
        left: rect.left,
        width: rect.width,
        center: rect.left + rect.width / 2,
        originalLeft: el.style.left,
        originalTransform: el.style.transform,
      };
    });
  }

  // Interpolate between keyframes
  function getScrollState(scrollY) {
    const pts = CONFIG.keyframes;
    if (scrollY <= pts[0].scroll) return pts[0];

    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      if (scrollY <= b.scroll) {
        const t = (scrollY - a.scroll) / Math.max(1, b.scroll - a.scroll);
        // Easing for split
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

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Apply slide-door effect to word elements
  function applySlideDoor(split, scale, opacity) {
    if (!wordElements.length) return;

    const midIndex = Math.floor(wordElements.length / 2);

    wordElements.forEach((el, i) => {
      const pos = wordPositions[i];
      if (!pos) return;

      // Calculate split offset - left half goes left, right half goes right
      const isLeftSide = i < wordElements.length / 2;
      const direction = isLeftSide ? -1 : 1;
      const maxSplitDistance = 50; // Max pixels to slide

      const splitOffset =
        direction * maxSplitDistance * Math.min(1, splitProgress / 0.5);

      // Apply transform
      const currentScale = getCurrentScale();
      const transform = `translate3d(${pos.left + splitOffset}px, 0, 0) scale(${currentScale})`;

      el.style.transform = transform;
      el.style.opacity = currentOpacity;
    });
  }

  function getCurrentScale() {
    return window.__garden ? window.__garden.S / 300 : 1;
  }

  function getCurrentOpacity() {
    return 1; // Handled by main scroll logic
  }

  function getSplitProgress() {
    const state = getScrollState(window.scrollY);
    return Math.min(1, state.split / 0.5);
  }

  function animate() {
    const target = window.scrollY;
    const maxScroll = Math.max(
      1,
      document.body.scrollHeight - window.innerHeight,
    );

    K += (target - K) * CONFIG.lerpFactor;
    const state = getScrollState(K);

    // Apply main transform to hero element
    if (heroEl) {
      heroEl.style.transform = `translate3d(50vw, 50vh, 0) translate(-50%, -50%) perspective(1100px) rotateY(0deg) scale(${state.scale.toFixed(4)})`;
      heroEl.style.opacity = state.opacity.toFixed(3);
      heroEl.style.visibility = state.opacity < 0.01 ? "hidden" : "visible";
    }

    // Apply slide-door effect to word elements
    applySlideDoor(state.split, state.scale, state.opacity);

    // Update HUD
    if (hudEl) {
      const p = Math.min(
        1,
        Math.max(
          0,
          window.scrollY /
            Math.max(1, document.body.scrollHeight - window.innerHeight),
        ),
      );
      const hudTrack = document.querySelector("#hud .trk i");
      const hudDot = document.querySelector("#hud .hd");
      const hudLabel = document.querySelector("#hud .lbl");

      if (hudTrack) hudTrack.style.height = p * 100 + "%";
      if (hudDot) hudDot.style.top = p * 100 + "%";

      // Update HUD label based on scroll position
      if (hudLabel) {
        const pts = CONFIG.keyframes;
        let label = "01 HOME";
        if (K > 200) label = "02 ABOUT";
        if (K > 800) label = "03 JOURNEY";
        if (K > 1400) label = "04 SERVICES";
        if (K > 2000) label = "05 WORK";
        hudLabel.innerHTML = `<span id="hudn">${label.split(" ")[0]}</span><b id="hudl">${label.split(" ")[1] || ""}</b>`;
      }
    }

    // Ensure HUD stays on top
    if (hudEl) {
      hudEl.style.zIndex = "9999";
    }
    if (gardenCanvas) {
      gardenCanvas.style.zIndex = "10";
    }

    requestAnimationFrame(animate);
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose for debugging
  window.__scrollAnimation = {
    animate,
    getState: () => getScrollState(window.scrollY),
    CONFIG,
  };
})();
