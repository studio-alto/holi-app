// Our sw.js calls skipWaiting()+clients.claim() unconditionally, so a newly
// deployed service worker always takes over immediately — but the page's
// already-loaded JS/CSS stays the stale bundle until it reloads. We detect
// that takeover (a genuine version swap, not the very first install) and let
// the caller show a banner instead of silently discarding unsaved input.
export function watchServiceWorkerUpdates(onUpdateReady) {
  if (!('serviceWorker' in navigator)) return;

  const hadController = !!navigator.serviceWorker.controller;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) onUpdateReady();
  });

  navigator.serviceWorker.getRegistration().then((reg) => {
    if (!reg) return;

    // The browser's own background update check can lag well behind a fresh
    // deploy, especially for an installed PWA that was already open — force
    // a check now and every time the app comes back to the foreground.
    reg.update();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reg.update();
    });
  });
}
