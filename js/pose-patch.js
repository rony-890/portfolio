/**
 * Pose Cycling Patch for 8 Frames
 * Fixes the pose cycling in the about section for 8 frames (0-7)
 * Uses scroll position directly since main.js keeps visibility hidden
 */

(function() {
  'use strict';

  let posePatchActive = false;
  let poseElements = null;
  let lastPoseIndex = -1;

  // About section scroll range (based on data-gap="3.2", data-hold=".85")
  // viewport height = 720px (typical)
  const VP_HEIGHT = 720;
  const ABOUT_START = 3.2 * VP_HEIGHT;  // 2304px
  const ABOUT_HOLD = 0.85 * VP_HEIGHT;  // 612px
  const ABOUT_END = ABOUT_START + ABOUT_HOLD;  // 2916px

  function init() {
    console.log('Pose patch: initializing...');
    const poseFigure = document.querySelector('.ab-fig.pose');
    if (!poseFigure) {
      console.warn('Pose patch: .ab-fig.pose not found');
      return;
    }
    
    poseElements = Array.from(poseFigure.querySelectorAll('.pose img'));
    console.log('Pose patch: found', poseElements.length, 'pose images');
    
    if (poseElements.length !== 8) {
      console.warn('Pose patch: expected 8 poses, found', poseElements.length);
      return;
    }
    
    // Set initial pose
    poseElements[0].classList.add('on');
    lastPoseIndex = 0;
    
    posePatchActive = true;
    console.log('Pose patch activated for 8 frames');
  }

  function updatePose(progress) {
    if (!posePatchActive || !poseElements) return;
    
    // Clamp progress to 0-1
    const p = Math.max(0, Math.min(1, progress));
    
    // Calculate pose index (0-7 for 8 frames)
    const poseIndex = Math.round(p * 7);
    
    if (poseIndex !== lastPoseIndex && poseIndex >= 0 && poseIndex < 8) {
      // Remove 'on' from previous
      if (lastPoseIndex >= 0 && lastPoseIndex < 8) {
        poseElements[lastPoseIndex].classList.remove('on');
      }
      // Add 'on' to new
      poseElements[poseIndex].classList.add('on');
      lastPoseIndex = poseIndex;
      console.log('Pose patch: switched to pose', poseIndex, 'progress', progress);
    }
  }

  function getScrollProgress() {
    const scrollY = window.scrollY;
    
    // About section range: 2304px to 2916px
    if (scrollY < ABOUT_START) return 0;
    if (scrollY > ABOUT_END) return 1;
    
    // Linear progress within about section hold range
    return (scrollY - ABOUT_START) / (ABOUT_END - ABOUT_START);
  }

  function animate() {
    if (!posePatchActive) return;
    
    const progress = getScrollProgress();
    updatePose(progress);
    
    requestAnimationFrame(animate);
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Pose patch: DOMContentLoaded');
      init();
      animate();
    });
  } else {
    console.log('Pose patch: already loaded, initializing immediately');
    init();
    animate();
  }
  
  // Expose for debugging
  window.__posePatch = {
    getActive: () => posePatchActive,
    getElements: () => poseElements
  };
  
  console.log('Pose patch script loaded');
})();