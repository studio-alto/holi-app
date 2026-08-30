import { HomeNavIcon, BellIcon, SaludIcon } from '../icons/Icons';

const TABS = [
  { id: 'home', label: 'Hoy', Icon: HomeNavIcon },
  { id: 'notificaciones', label: 'Notificaciones', Icon: BellIcon },
  { id: 'salud', label: 'Salud', Icon: SaludIcon },
];

export default function BottomNav({ isActive, onSelect }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)', display: 'flex', padding: '8px 4px', zIndex: 20, flex: 'none' }}>
      {TABS.map(({ id, label, Icon }) => {
        const active = isActive(id);
        const color = active ? '#91C2F4' : 'var(--text-3)';
        return (
          <button
            key={id}
            aria-label={label}
            onClick={() => onSelect(id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 2px', background: 'none', border: 'none', cursor: 'pointer', color, minHeight: 44, borderRadius: 999 }}
          >
            <Icon size={22} color={color} />
            <div style={{ fontSize: 10, fontWeight: 500, color: '#A09A94' }}>{label}</div>
          </button>
        );
      })}
    </div>
  );
}
