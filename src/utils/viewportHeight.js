// iOS Safari (especially installed/standalone PWAs) doesn't reliably size
// position:fixed/100dvh boxes to the true visible screen — there can be a
// gap at the bottom the CSS-only approach never closes. This measures the
// actual visible height with JS and exposes it as --app-height, which
// tokens.css uses instead of vh/dvh for the outermost app box.
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
