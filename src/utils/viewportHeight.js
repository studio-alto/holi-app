// iOS Safari standalone PWAs don't reliably report the true visible screen
// through viewport APIs — on-device testing this session found
// window.innerHeight/visualViewport.height under-reporting by ~50px, and
// CSS-only attempts (100dvh, position:fixed+inset:0 on .app-shell/html/body)
// left the same gap. A hardcoded correction (forcing screen.height whenever
// standalone) chased that one data point but isn't safe in general — screen
// dimensions are a static per-device constant, not a live measurement, so it
// can just as easily overshoot the real visible area on another device.
//
// html/body are pinned with position:fixed;inset:0 in tokens.css, which the
// CSS spec *guarantees* fills the real browser viewport exactly (that's the
// literal definition of a fixed element's containing block) — no vh/dvh
// ambiguity involved. So instead of trusting a reporting API, this reads
// back the ACTUAL rendered height of that pinned box and uses it as
// --app-height. .app-shell then matches its own ancestor by construction,
// so there's no gap between our own elements regardless of which viewport
// API is inaccurate on a given device — no device-specific numbers needed.
export function setupAppHeightVar() {
  const set = () => {
    const h =
      document.documentElement.getBoundingClientRect().height ||
      window.visualViewport?.height ||
      window.innerHeight;
    document.documentElement.style.setProperty('--app-height', `${h}px`);
  };
  set();
  window.addEventListener('resize', set);
  window.addEventListener('orientationchange', set);
  window.visualViewport?.addEventListener('resize', set);
}
