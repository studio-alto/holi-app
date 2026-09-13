import { useEffect, useState } from 'react';

// TEMPORARY — diagnosing an iOS PWA viewport bug we can't reproduce in
// browser tooling. Shows real on-device measurements so the fix can be
// data-driven instead of guessed. Remove once the layout bug is confirmed
// fixed.
export default function DebugOverlay() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const measure = () => {
      const probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;bottom:0;left:0;height:0;padding-bottom:env(safe-area-inset-bottom);visibility:hidden;';
      document.body.appendChild(probe);
      const safeBottom = getComputedStyle(probe).paddingBottom;
      document.body.removeChild(probe);

      const phoneCard = document.querySelector('.phone-card');
      const navBtn = document.querySelector('[aria-label="Ver detalles"]');
      const appHeightVar = getComputedStyle(document.documentElement).getPropertyValue('--app-height').trim();
      const pcRect = phoneCard?.getBoundingClientRect();
      const navRect = navBtn?.getBoundingClientRect();

      setInfo({
        innerHeight: window.innerHeight,
        visualViewportHeight: window.visualViewport ? window.visualViewport.height : 'n/a',
        clientHeight: document.documentElement.clientHeight,
        appHeightVar: appHeightVar || 'unset',
        safeAreaBottom: safeBottom,
        phoneCardTop: pcRect ? Math.round(pcRect.top) : 'n/a',
        phoneCardBottom: pcRect ? Math.round(pcRect.bottom) : 'n/a',
        phoneCardHeight: pcRect ? Math.round(pcRect.height) : 'n/a',
        navBtnBottom: navRect ? Math.round(navRect.bottom) : 'not found',
        navBtnTop: navRect ? Math.round(navRect.top) : 'not found',
        screenHeight: window.screen?.height,
        devicePixelRatio: window.devicePixelRatio,
        standalone: window.navigator.standalone,
        displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser',
      });
    };
    measure();
    const t = setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 4,
        left: 4,
        right: 4,
        background: 'rgba(0,0,0,0.85)',
        color: '#0f0',
        fontFamily: 'monospace',
        fontSize: 9,
        padding: 6,
        borderRadius: 6,
        zIndex: 999999,
        lineHeight: 1.4,
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <div>DEBUG</div>
      {Object.entries(info).map(([k, v]) => (
        <div key={k}>
          {k}: {String(v)}
        </div>
      ))}
    </div>
  );
}
