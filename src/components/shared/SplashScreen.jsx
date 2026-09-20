import { useEffect, useState } from 'react';

const VISIBLE_MS = 1400;
const FADE_MS = 300;

// Shown once per app open (not just once ever) — a brief branded moment
// before landing on Home/onboarding, like a native app's launch screen.
// Uses the actual "Holi!" logo image (not recreated text) so the
// typography always matches exactly, with a playful pop/bounce entrance
// (the same `celebrate` keyframe used on the onboarding welcome screen).
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
        position: 'fixed',
        inset: 0,
        background: '#89C6FD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: 'none',
      }}
    >
      <img src="/icon-512.png" alt="Holí" className="celebrate" style={{ width: '48%', maxWidth: 220, borderRadius: 28 }} />
    </div>
  );
}
