import FixedOverlayLayer from './FixedOverlayLayer';

const TITLES = {
  med: (alarm) => `💊 ¡Hora de tu ${alarm.name}!`,
  sun: () => '☀️ ¡BLOQUEADOR SOLAR!',
  water: () => '💧 ¡Hora de hidratarte!',
  exercise: () => '💪 ¡Hora de tu rutina!',
};

const SUBTITLES = {
  med: (alarm) => `${alarm.dose}${alarm.time ? ' · ' + alarm.time : ''}${alarm.notes ? ' · ' + alarm.notes : ''}`,
  sun: () => 'No olvides tu SPF 50+ 🧴',
  water: (alarm) => `Llevas ${alarm.pct}% de tu meta diaria`,
  exercise: (alarm) => (alarm.routineName ? `No pierdas tu racha con "${alarm.routineName}"` : 'No pierdas tu racha, cada set cuenta'),
};

export default function AlarmToast({ alarm, onTaken, onSnooze, onCancel }) {
  if (!alarm) return null;

  const title = (TITLES[alarm.type] || TITLES.med)(alarm);
  const subtitle = (SUBTITLES[alarm.type] || SUBTITLES.med)(alarm);

  return (
    <FixedOverlayLayer zIndex={60}>
      <div
        style={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 24,
          background: 'var(--surface)',
          borderRadius: 18,
          padding: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
          border: '1px solid var(--border)',
          animation: 'toastIn 0.3s ease',
          pointerEvents: 'auto',
        }}
      >
        <button
          aria-label="Cerrar"
          onClick={onCancel}
          style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: '50%', background: 'var(--surface2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
        >
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', paddingRight: 28 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{subtitle}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={onTaken} style={{ flex: 1.3, padding: 11, background: 'linear-gradient(90deg, #91C2F4, #3788D3)', color: '#fff', border: 'none', borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
            Hecho
          </button>
          <button onClick={onSnooze} style={{ flex: 1, padding: 11, background: 'rgba(145,194,244,0.15)', color: 'var(--sky-dark)', border: 'none', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
            En 10 min
          </button>
        </div>
      </div>
    </FixedOverlayLayer>
  );
}
