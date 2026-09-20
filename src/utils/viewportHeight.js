// iOS Safari (especially installed/standalone PWAs) doesn't reliably size
// position:fixed/100dvh boxes to the true visible screen — there can be a
// gap at the bottom the CSS-only approach never closes. This measures the
// actual visible height with JS and exposes it as --app-height, which
// tokens.css uses instead of vh/dvh for the outermost app box.
//
// On-device diagnosis (DebugOverlay) showed that in standalone-PWA mode,
// window.innerHeight/visualViewport.height under-report the true screen
// height by ~50px (762 measured vs 812 actual) — a known WKWebView quirk
// where the content view initializes shorter than the real screen. Since
// Safari chrome (address bar, tab bar) never exists in standalone mode,
// there's nothing screen.height could be wrongly including there, so it's
// safe to prefer it over the under-reporting APIs specifically when
// standalone. In a regular browser tab (not standalone) screen.height is
// NOT used, since there it legitimately includes space Safari's own UI
// occupies that our content shouldn't try to fill.
export function setupAppHeightVar() {
  const isStandalone = () => window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

  const set = () => {
    const measured = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const screenHeight = window.screen?.height || 0;
    const h = isStandalone() ? Math.max(measured, screenHeight) : measured;
    document.documentElement.style.setProperty('--app-height', `${h}px`);
  };
  set();
  window.addEventListener('resize', set);
  window.addEventListener('orientationchange', set);
  window.visualViewport?.addEventListener('resize', set);
}
