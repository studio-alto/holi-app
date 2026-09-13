import { useEffect, useState } from 'react';

const VISIBLE_MS = 1700;
const FADE_MS = 300;
const FONT_TIMEOUT_MS = 500;
const LETTERS = ['H', 'o', 'l', 'i', '!'];

// Shown once per app open (not just once ever) — a brief branded moment
// before landing on Home/onboarding, like a native app's launch screen.
// The wordmark is real text (Leckerli One, a script webfont), not an image,
// so each letter can animate in on its own.
export default function SplashScreen({ onDone }) {
  const [fontReady, setFontReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Wait for the Leckerli One webfont so the letters don't flash in a fallback
  // serif before swapping — but never block longer than FONT_TIMEOUT_MS
  // (e.g. offline), since the splash should never hang.
  useEffect(() => {
    let cancelled = false;
    const ready = document.fonts?.load ? document.fonts.load('64px "Leckerli One"').then(() => document.fonts.ready) : Promise.resolve();
    const timeout = new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS));
    Promise.race([ready, timeout]).then(() => {
      if (!cancelled) setFontReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!fontReady) return undefined;
    const t1 = setTimeout(() => setLeaving(true), VISIBLE_MS);
    const t2 = setTimeout(onDone, VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [fontReady, onDone]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#91C2F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: 'none',
      }}
    >
      {fontReady && (
        <div style={{ fontFamily: "'Leckerli One', cursive", fontSize: 64, color: '#ffffff', lineHeight: 1 }}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: 'letterPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
                animationDelay: `${i * 0.09}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
