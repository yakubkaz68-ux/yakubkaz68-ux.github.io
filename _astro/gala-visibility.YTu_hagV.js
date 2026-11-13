(() => {
  // November 21, 2026 at 00:00 America/New_York (Eastern Standard Time).
  const GALA_CUTOFF = Date.parse('2026-11-21T05:00:00Z');
  let timer;

  function updateGalaVisibility() {
    clearTimeout(timer);
    const remaining = GALA_CUTOFF - Date.now();
    if (remaining <= 0) {
      document.documentElement.classList.add('gala-over');
    } else {
      // Also retire the invitation in a tab left open across midnight. Clamp to
      // the browser's signed 32-bit timeout limit for visits far before the gala.
      timer = setTimeout(updateGalaVisibility, Math.min(remaining, 2_147_483_647));
    }
  }

  updateGalaVisibility();
  // Back/forward cache restores do not execute the head script again.
  window.addEventListener('pageshow', updateGalaVisibility);
})();
