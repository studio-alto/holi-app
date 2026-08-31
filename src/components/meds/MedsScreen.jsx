import { BackIcon, PillIcon, BellIcon } from '../icons/Icons';
import { useMedsActions } from '../../state/useMedsActions';
import { useAlarmActions } from '../../state/useAlarmActions';

function formatTime12h(time) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

// The next medication still pending today by scheduled time, or — if every timed
// medication for today is already taken or past — the earliest one tomorrow.
function getNextMed(meds) {
  const withTime = meds.filter((m) => m.time && !m.taken);
  if (withTime.length === 0) return null;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const upcomingToday = withTime.filter((m) => toMinutes(m.time) >= nowMinutes).sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
  if (upcomingToday.length > 0) return { med: upcomingToday[0], tomorrow: false };
  const earliest = [...withTime].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
  return { med: earliest[0], tomorrow: true };
}

export default function MedsScreen({ state, update, addToast, onNavigate }) {
  const { editMed, openAddMed, toggleMedTaken, removeMed, toggleMedEdit } = useMedsActions(state, update, addToast);
  const { triggerMedAlarm } = useAlarmActions(state, update, addToast);
  const nextMed = getNextMed(state.meds);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <button
            onClick={() => onNavigate('home')}
            aria-label="Volver"
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', flexShrink: 0 }}
          >
            <BackIcon />
          </button>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            Medicamentos
            <PillIcon size={20} color="var(--violet)" strokeWidth={1.8} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <button
            aria-label="Editar lista"
            onClick={toggleMedEdit}
            style={{ width: 66, height: 38, borderRadius: 999, background: 'var(--surface2)', color: 'var(--text-2)', border: '1px solid var(--border)', fontSize: 10.5, fontWeight: 600, cursor: 'pointer' }}
          >
            {state.medEditMode ? 'Listo' : 'Editar'}
          </button>
          <button
            aria-label="Agregar medicamento"
            onClick={openAddMed}
            style={{ width: 38, height: 38, borderRadius: '50%', color: '#5B3E82', border: 'none', fontSize: 19, cursor: 'pointer', backgroundColor: '#DED2EE' }}
          >
            +
          </button>
        </div>
      </div>

      {nextMed && (
        <div style={{ background: '#DED2EE', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PillIcon size={19} color="#5B3E82" strokeWidth={1.8} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#5B3E82', letterSpacing: '0.03em' }}>
              PRÓXIMO MEDICAMENTO{nextMed.tomorrow ? ' · MAÑANA' : ''}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#141414', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {nextMed.med.name}
            </div>
            <div style={{ fontSize: 12.5, color: '#5B3E82', marginTop: 1 }}>
              {formatTime12h(nextMed.med.time)}{nextMed.med.dose ? ` · ${nextMed.med.dose}` : ''}
            </div>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)' }}>
          <span>Cumplimiento semanal</span>
          <b style={{ color: 'var(--violet-text)' }}>{state.medWeekPct}%</b>
        </div>
        <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 4, marginTop: 8, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${state.medWeekPct}%`,
              background: 'linear-gradient(90deg, #9b8ec4, #e3ccef, #9B8EC4)',
              backgroundSize: '200% 100%',
              animation: 'barShimmer 2.5s linear infinite',
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {state.meds.map((m) => (
        <div key={m.id} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div
            onClick={state.medEditMode ? () => editMed(m.id) : undefined}
            style={{ flex: 1, paddingLeft: 6, cursor: state.medEditMode ? 'pointer' : 'default' }}
          >
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{m.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', marginTop: 2 }}>{m.dose} · {m.time} · {m.freq}</div>
            {m.notes && <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{m.notes}</div>}
          </div>
          {state.medEditMode ? (
            <button
              aria-label="Eliminar medicamento"
              onClick={() => removeMed(m.id)}
              style={{ width: 32, height: 32, flex: 'none', borderRadius: '50%', border: 'none', background: '#c0392b', color: '#fff', fontSize: 15, cursor: 'pointer', opacity: 0.8 }}
            >
              ✕
            </button>
          ) : (
            <>
              <button
                aria-label={`Simular recordatorio de ${m.name}`}
                onClick={() => triggerMedAlarm(m.id)}
                style={{ width: 32, height: 32, flex: 'none', borderRadius: '50%', border: 'none', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <BellIcon size={15} color="var(--violet-text)" strokeWidth={1.8} />
              </button>
              <button
                aria-label="Marcar tomado"
                role="checkbox"
                aria-checked={m.taken}
                onClick={() => toggleMedTaken(m.id)}
                style={{ width: 22, height: 21, flex: 'none', borderRadius: '50%', border: `1.5px solid ${m.taken ? 'var(--violet)' : 'var(--border)'}`, background: m.taken ? 'var(--violet)' : 'transparent', cursor: 'pointer', opacity: 0.56 }}
              />
            </>
          )}
        </div>
      ))}

      {state.meds.length === 0 && (
        <div style={{ fontSize: 12.5, color: 'var(--text-3)', textAlign: 'center', padding: '8px 0' }}>
          Agrega un medicamento para programar su recordatorio.
        </div>
      )}
    </div>
  );
}
