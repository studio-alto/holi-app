// Mirrors the live visible viewport into --app-height for the outermost app
// box (tokens.css). Deliberately NO screen.height override: that was a fix
// for the black-translucent status-bar mode (index.html no longer opts into
// it), where iOS sized the standalone web view ~50px shorter than the
// screen. Without it — same setup as the PAYDAY PWA — the web view fills the
// screen below the status bar and the measured height is already exact.
export function setupAppHeightVar() {
  const set = () => {
    const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty('--app-height', `${h}px`);
  };
  set();
  window.addEventListener('resize', set);
  window.addEventListener('orientationchange', set);
  window.visualViewport?.addEventListener('resize', set);
}
