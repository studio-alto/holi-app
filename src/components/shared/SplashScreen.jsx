import { useEffect, useState } from 'react';

const VISIBLE_MS = 1400;
const FADE_MS = 300;

// Shown once per app open (not just once ever) — a brief branded moment
// before landing on Home/onboarding, like a native app's launch screen.
export default function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), VISIBLE_MS);
    const t2 = setTimeout(onDone, VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--grad-welcome)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: 'none',
      }}
    >
      <div className="celebrate" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg viewBox="0 0 120 150" width={108} height={108} fill="none" style={{ filter: 'drop-shadow(0 6px 14px rgba(20,60,90,0.18))' }}>
          <path d="M20 8c8 0 14 6 14 14v30c9-9 20-13 30-13 16 0 26 11 26 27v46c0 8-6 14-14 14s-14-6-14-14V70c0-6-4-10-10-10s-12 5-18 13v40c0 8-6 14-14 14s-14-6-14-14V22c0-8 6-14 14-14z" fill="#ffffff" />
          <circle cx="98" cy="30" r="12" fill="#ffffff" />
        </svg>
        <div style={{ fontWeight: 500, fontSize: 19, color: '#ffffff', letterSpacing: 9, marginTop: 16 }}>HOLI</div>
      </div>
    </div>
  );
}
