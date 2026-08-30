import { DropIcon, PillIcon, ExerciseIcon, SunMoonIcon, CircleProgressIcon } from '../icons/Icons';

const LEFT_TABS = [
  { id: 'agua', label: 'Agua', Icon: DropIcon, activeColor: 'var(--water)' },
  { id: 'meds', label: 'Medicamentos', Icon: PillIcon, activeColor: 'var(--violet)' },
];
const RIGHT_TABS = [
  { id: 'ejercicio', label: 'Ejercicio', Icon: ExerciseIcon, activeColor: '#6fae82' },
  { id: 'piel', label: 'Piel', Icon: SunMoonIcon, activeColor: '#e2925a' },
];

function TabButton({ id, label, Icon, activeColor, active, onSelect }) {
  const color = active ? activeColor : 'rgba(255,255,255,0.45)';
  return (
    <button
      aria-label={label}
      onClick={() => onSelect(id)}
      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 2px', background: 'none', border: 'none', cursor: 'pointer', minHeight: 44, borderRadius: 999 }}
    >
      <Icon size={22} color={color} strokeWidth={1.8} />
    </button>
  );
}

// Fixed to the viewport (not the page) so it stays put while content scrolls —
// same centered 600px column as .phone-card, see FixedOverlayLayer for why
// `fixed` (not `sticky`) is what actually works here. Floats as a rounded pill
// with margin on all sides (reference image), rather than a flush full-bleed bar.
// Icon-only, one tab per main category — same glyphs/colors each screen already
// uses for its own title, so the nav reads as the same visual language, not a
// second icon set. The center button covers "ver detalles" (Progreso); Inicio,
// Notificaciones and Configuración moved to the top header (see MainApp).
export default function BottomNav({ isActive, onSelect, onDetails }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 568,
        background: '#000000',
        borderRadius: 999,
        boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 6px',
        zIndex: 20,
        flex: 'none',
      }}
    >
      <div style={{ display: 'flex', flex: 1 }}>
        {LEFT_TABS.map((t) => (
          <TabButton key={t.id} {...t} active={isActive(t.id)} onSelect={onSelect} />
        ))}
      </div>
      <div style={{ width: 64, flexShrink: 0 }} />
      <div style={{ display: 'flex', flex: 1 }}>
        {RIGHT_TABS.map((t) => (
          <TabButton key={t.id} {...t} active={isActive(t.id)} onSelect={onSelect} />
        ))}
      </div>

      <button
        aria-label="Ver detalles"
        onClick={onDetails}
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#5ba3e8',
          border: '4px solid var(--bg)',
          boxShadow: '0 4px 12px rgba(91,163,232,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <CircleProgressIcon size={22} color="#FFFFFF" accent="#FFFFFF" />
      </button>
    </div>
  );
}
