export function DropIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />
    </svg>
  );
}

export function PillIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <rect x="4" y="9" width="16" height="7" rx="3.5" transform="rotate(-30 12 12.5)" />
      <line x1="12" y1="7.5" x2="12" y2="17.5" transform="rotate(-30 12 12.5)" />
    </svg>
  );
}

export function SunIcon({ size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3v2.2M12 18.8V21M4.2 12H2M22 12h-2.2M5.6 5.6l1.5 1.5M18.4 5.6l-1.5 1.5M5.6 18.4l1.5-1.5M18.4 18.4l-1.5-1.5" />
    </svg>
  );
}

export function MoonIcon({ size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function ExerciseIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M6 12h12M4 9v6M20 9v6M7.5 7v10M16.5 7v10" />
    </svg>
  );
}

export function SkinIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

// Sun (mañana) + moon (noche) combined — used where "Piel" needs to read as the
// AM/PM skincare routine rather than the sparkle used for the screen's own title.
export function SunMoonIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2.6" />
      <path d="M8 2.5v1.4M8 12.1v1.4M2.5 8h1.4M4.3 4.3l1 1M4.3 11.7l1-1" />
      <path d="M20.5 15.8A5.2 5.2 0 0 1 14.8 10a4.1 4.1 0 0 0 6.8 6.8 5.2 5.2 0 0 1-1.1-1z" />
    </svg>
  );
}

export function FlameStreakIcon({ size = 18, color = 'currentColor', strokeWidth = 1.7 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-0.5-2-1-2.5 1.5 0.5 2.5 2 2.5 4a5 5 0 0 1-10 0c0-4 3-4.5 5.5-8.5z" />
    </svg>
  );
}

export function CheckIcon({ size = 14, color = '#fff', strokeWidth = 2.2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 13, color = 'currentColor', strokeWidth = 2.2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BackIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function CircleProgressIcon({ size = 18, color = 'currentColor', accent = 'var(--sky-dark)' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.6}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 6.36 15.36" stroke={accent} />
    </svg>
  );
}

export function BellIcon({ size = 18, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10a6 6 0 1 1 12 0c0 3 1 4.5 1.5 5.5H4.5C5 14.5 6 13 6 10z" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

export function HomeNavIcon({ size = 22, color = 'currentColor', strokeWidth = 1.7 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5v7a1 1 0 0 0 1 1h3v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20.5h3a1 1 0 0 0 1-1v-7" />
      <path d="M3.5 11 11 4.3a1.5 1.5 0 0 1 2 0L20.5 11" />
    </svg>
  );
}

export function SaludIcon({ size = 22, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M12 3v18M4.5 6.5l15 11M19.5 6.5l-15 11" />
    </svg>
  );
}

export function SettingsIcon({ size = 20, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <line x1="4" y1="8" x2="20" y2="8" />
      <circle cx="15" cy="8" r="2" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="9" cy="16" r="2" />
    </svg>
  );
}

export function GearIcon({ size = 17, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h0A1.7 1.7 0 0010 3.6V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z" />
    </svg>
  );
}

export function SoundIcon({ size = 17, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 9v6h4l5 4V5L9 9H5z" />
      <path d="M16 9a4 4 0 010 6" />
    </svg>
  );
}

export function VibrateIcon({ size = 17, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="4" width="8" height="16" rx="1.5" />
      <line x1="2" y1="9" x2="2" y2="15" />
      <line x1="22" y1="9" x2="22" y2="15" />
    </svg>
  );
}

export function SupportIcon({ size = 17, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2.5 1.7-2.5 3.5" />
      <circle cx="12" cy="16.5" r="0.6" fill={color} stroke="none" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 15, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function UserIcon({ size = 34, color = '#91C2F4', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" />
    </svg>
  );
}

export function InfoIcon({ size = 16, color = '#91C2F4' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.6" fill={color} stroke="none" />
    </svg>
  );
}

export function SparkleIcon({ size = 20, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

export function StarIcon({ size = 13, color = '#91C2F4' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.4 5.5 6 .6-4.5 4 1.3 5.9L12 16l-5.2 3 1.3-5.9-4.5-4 6-.6z" />
    </svg>
  );
}

export function BarChartIcon({ size = 20, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M5 19V11M11 19V6M17 19V14" />
    </svg>
  );
}

export function CrownIcon({ size = 22, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8l3 4 5-6 5 6 3-4-2 10H6L4 8z" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 22, color = '#91C2F4', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.3l2 2 5-5" />
    </svg>
  );
}

export function HistoryIcon({ size = 22, color = 'var(--violet)', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
      <line x1="3.5" y1="9" x2="20.5" y2="9" />
      <line x1="8" y1="2.5" x2="8" y2="6.5" />
      <line x1="16" y1="2.5" x2="16" y2="6.5" />
    </svg>
  );
}

const MOOD_PATHS = {
  happy: <><path d="M7.7 9.6 Q9 11.3 10.3 9.6" /><path d="M13.7 9.6 Q15 11.3 16.3 9.6" /><path d="M7.8 14 Q12 17.6 16.2 14" /></>,
  calm: <><path d="M7.7 10.3 Q9 9 10.3 10.3" /><path d="M13.7 10.3 Q15 9 16.3 10.3" /><path d="M9 14.6 Q12 16 15 14.6" /></>,
  neutral: <><path d="M9 9.5 L9 11.5" /><path d="M15 9.5 L15 11.5" /><path d="M8.5 15 L15.5 15" /></>,
  sad: <><path d="M7.7 10.4 Q9 8.9 10.3 10.4" /><path d="M13.7 10.4 Q15 8.9 16.3 10.4" /><path d="M8 16.3 Q12 13.4 16 16.3" /></>,
  sleepy: (
    <>
      <path d="M8 11.2 Q9 10 10.3 11.2" />
      <path d="M13.7 11.2 Q15 10 16.3 11.2" />
      <circle cx="12" cy="15" r="0.7" fill="currentColor" stroke="none" />
      <text x="16.5" y="7" fontSize="4.5" stroke="none" fill="currentColor">z</text>
      <text x="19" y="4.5" fontSize="3.5" stroke="none" fill="currentColor">z</text>
    </>
  ),
};

export function MoodIcon({ mood, size = 22, color = 'currentColor', strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <circle cx="12" cy="12" r="9.25" />
      {MOOD_PATHS[mood]}
    </svg>
  );
}
