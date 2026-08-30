import { HomeNavIcon, BellIcon, SaludIcon, CircleProgressIcon } from '../icons/Icons';

const LEFT_TABS = [
  { id: 'home', label: 'Hoy', Icon: HomeNavIcon },
  { id: 'notificaciones', label: 'Notificaciones', Icon: BellIcon },
];
const RIGHT_TABS = [{ id: 'salud', label: 'Salud', Icon: SaludIcon }];

function TabButton({ id, label, Icon, active, onSelect }) {
  const color = active ? '#FFFFFF' : 'rgba(255,255,255,0.45)';
  return (
    <button
      aria-label={label}
      onClick={() => onSelect(id)}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 2px', background: 'none', border: 'none', cursor: 'pointer', color, minHeight: 44, borderRadius: 999 }}
    >
      <Icon size={22} color={color} />
      <div style={{ fontSize: 10, fontWeight: 500, color }}>{label}</div>
    </button>
  );
}

// Fixed to the viewport (not the page) so it stays put while content scrolls —
// same centered 600px column as .phone-card, see FixedOverlayLayer for why
// `fixed` (not `sticky`) is what actually works here. Floats as a rounded pill
// with margin on all sides (reference image), rather than a flush full-bleed bar.
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
          top: -22,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--sky)',
          border: '4px solid var(--bg)',
          boxShadow: '0 4px 12px rgba(145,194,244,0.5)',
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
