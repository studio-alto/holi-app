import { BackIcon, BellIcon, PillIcon, SunIcon, DropIcon, FlameStreakIcon } from '../icons/Icons';

const ICONS = { isMed: PillIcon, isSun: SunIcon, isWater: DropIcon, isStreak: FlameStreakIcon };

export default function NotificacionesScreen({ state, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => onNavigate('home')}
          aria-label="Volver"
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', flexShrink: 0 }}
        >
          <BackIcon />
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
          Notificaciones
          <BellIcon size={20} color="#91C2F4" strokeWidth={1.8} />
        </div>
      </div>

      {state.notifFeed.map((n, i) => {
        const iconKey = Object.keys(ICONS).find((key) => n[key]);
        const Icon = iconKey ? ICONS[iconKey] : null;
        return (
          <div key={i} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#C9E4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              {Icon && <Icon size={17} color="#1B5C7A" strokeWidth={1.7} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{n.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{n.time}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3, lineHeight: 1.5 }}>{n.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
