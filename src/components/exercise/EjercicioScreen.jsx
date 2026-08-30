import { BackIcon, ExerciseIcon, CheckIcon } from '../icons/Icons';
import RoutineIcon from './RoutineIcon';
import { computeExerciseDerived } from '../../utils/exercise';
import { useExerciseActions } from '../../state/useExerciseActions';
import { useAlarmActions } from '../../state/useAlarmActions';

export default function EjercicioScreen({ state, update, addToast, onNavigate }) {
  const { routineCards, activeRoutineBlocks, exWeekDaysCount, exWeekPct, exLongestStreak } = computeExerciseDerived(state);
  const { toggleRoutineSelection, incrementExercise, completeRoutine } = useExerciseActions(update, addToast);
  const { triggerExerciseAlarm } = useAlarmActions(state, update, addToast);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button
        onClick={() => onNavigate('home')}
        aria-label="Volver"
        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
      >
        <BackIcon />
      </button>

      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
        Ejercicio
        <ExerciseIcon size={20} color="#6fae82" strokeWidth={1.8} />
      </div>

      <div style={{ background: 'linear-gradient(135deg, #E7F5DD, #D2F3E2)', borderRadius: 20, padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 76, height: 76, flex: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(#6fae82 ${exWeekPct}%, rgba(255,255,255,0.6) 0)` }} />
          <div style={{ position: 'absolute', inset: 7, borderRadius: '50%', background: '#eef7e6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>{exWeekDaysCount}</div>
            <div style={{ fontSize: 9.5, color: '#1a1a1a', opacity: 0.65 }}>Días</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>¡Has mantenido el ritmo!</div>
          <div style={{ fontSize: 12, color: '#1a1a1a', opacity: 0.7, marginTop: 4, lineHeight: 1.4 }}>Entrenaste {exWeekDaysCount} de 7 días esta semana.</div>
          <div style={{ display: 'inline-block', marginTop: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: '#1a1a1a' }}>
            Racha más larga: <b>{exLongestStreak} días</b>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>ELEGIR RUTINA</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {routineCards.map((r) => (
          <div key={r.id} style={{ background: 'var(--surface)', border: `1.5px solid ${r.border}`, borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{r.desc}</div>
            </div>
            <button
              onClick={() => toggleRoutineSelection(r.id)}
              style={{ padding: '9px 14px', background: r.btnBg, color: r.btnColor, border: 'none', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}
            >
              {r.btnLabel}
            </button>
          </div>
        ))}
      </div>

      {activeRoutineBlocks.length > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />}

      {activeRoutineBlocks.map((rb) => (
        <div key={rb.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--surface2)', borderRadius: 18, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            <RoutineIcon routineKey={rb.key} />
            {rb.name}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #8FC79E16, #6FAE8216)', borderRadius: 14, padding: '12px 14px', fontSize: 16, color: '#000', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5 }}>
            {rb.motivation}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{rb.exDone}/{rb.exTotal} ejercicios</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{rb.exPct}%</div>
          </div>
          <div style={{ height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${rb.exPct}%`, background: 'linear-gradient(90deg, #8FC79E, #6FAE82)' }} />
          </div>

          {rb.exercises.map((ex) => (
            <div key={ex.idx} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 22, height: 22, flex: 'none', borderRadius: '50%',
                  border: `1.5px solid ${ex.isDone ? '#6FAE82' : 'var(--border)'}`,
                  background: ex.isDone ? '#6FAE82' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {ex.isDone && <CheckIcon size={13} strokeWidth={2.5} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{ex.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Completado: {ex.done}/{ex.sets} series</div>
              </div>
              <button
                onClick={() => incrementExercise(rb.id, ex.idx)}
                disabled={ex.isDone}
                style={{
                  padding: '8px 12px',
                  background: ex.isDone ? 'var(--surface2)' : 'var(--text)',
                  color: ex.isDone ? 'var(--text-3)' : '#fff',
                  border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 500,
                  cursor: ex.isDone ? 'default' : 'pointer',
                }}
              >
                {ex.isDone ? '✓' : 'Serie'}
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{rb.timeMin} min</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Tiempo estimado</div>
            </div>
            <div style={{ flex: 1, background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 14, padding: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{rb.kcal} kcal</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Estimadas</div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={completeRoutine}
        style={{ padding: 15, background: 'linear-gradient(90deg, #8FC79E, #6FAE82)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 500, cursor: 'pointer' }}
      >
        Completar rutina(s)
      </button>

      <button
        onClick={triggerExerciseAlarm}
        style={{ padding: 13, background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: 999, fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}
      >
        Simular recordatorio de ejercicio
      </button>
    </div>
  );
}
