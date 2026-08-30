import { BackIcon, SkinIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { computeSkinDerived } from '../../utils/skincare';
import { useAlarmActions } from '../../state/useAlarmActions';

export default function PielScreen({ state, update, addToast, onNavigate }) {
  const { period, periodLabel, skinDone, skinTotal, skinPct, skinSteps } = computeSkinDerived(state);
  const { triggerSunscreenAlarm } = useAlarmActions(state, update, addToast);

  const setPeriod = (p) => update((prev) => ({ skincare: { ...prev.skincare, period: p } }));

  const toggleSkinStep = (id) => {
    update((prev) => ({
      skincare: { ...prev.skincare, [period]: prev.skincare[period].map((st) => (st.id === id ? { ...st, done: !st.done } : st)) },
    }));
  };

  const removeSkinStep = (id) => {
    update((prev) => ({
      skincare: { ...prev.skincare, [period]: prev.skincare[period].filter((st) => st.id !== id) },
    }));
  };

  const setNewStepText = (e) => update({ newStepText: e.target.value });

  const addSkinStep = () => {
    update((prev) => {
      if (!prev.newStepText.trim()) return {};
      const newStep = { id: Date.now(), text: prev.newStepText.trim(), note: 'Paso personalizado', done: false };
      return { skincare: { ...prev.skincare, [period]: [...prev.skincare[period], newStep] }, newStepText: '' };
    });
  };

  const amActive = period === 'am';

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
        Piel
        <SkinIcon size={20} color="#FCB69F" strokeWidth={1.8} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          aria-pressed={amActive}
          onClick={() => setPeriod('am')}
          style={{
            flex: 1, padding: 11, borderRadius: 999, border: 'none',
            background: amActive ? 'linear-gradient(135deg,#FFECD2,#FCB69F)' : 'var(--surface2)',
            color: amActive ? '#7a3d1e' : 'var(--text-2)',
            fontWeight: 500, fontSize: 13.5, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <SunIcon /> Mañana
        </button>
        <button
          aria-pressed={!amActive}
          onClick={() => setPeriod('pm')}
          style={{
            flex: 1, padding: 11, borderRadius: 999, border: 'none',
            background: !amActive ? 'linear-gradient(135deg,#FFECD2,#FCB69F)' : 'var(--surface2)',
            color: !amActive ? '#7a3d1e' : 'var(--text-2)',
            fontWeight: 500, fontSize: 13.5, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <MoonIcon /> Noche
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>PROGRESO {periodLabel}</div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)' }}>{skinDone}/{skinTotal}</div>
      </div>
      <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${skinPct}%`, background: 'linear-gradient(90deg,#FFECD2,#FCB69F)' }} />
      </div>

      {skinSteps.map((s) => (
        <div key={s.id} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 16, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            aria-label="Marcar paso"
            role="checkbox"
            aria-checked={s.done}
            onClick={() => toggleSkinStep(s.id)}
            style={{
              width: 22, height: 22, flex: 'none', borderRadius: '50%',
              border: `1.5px solid ${s.done ? '#FCB69F' : 'var(--border)'}`,
              background: s.done ? '#FCB69F' : 'transparent',
              cursor: 'pointer', opacity: 0.8,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 400 }}>{s.text}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{s.note}</div>
          </div>
          <button
            aria-label="Eliminar paso"
            onClick={() => removeSkinStep(s.id)}
            style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', borderRadius: 999 }}
          >
            ✕
          </button>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          aria-label="Nuevo paso de skincare"
          placeholder="Agregar paso personalizado..."
          value={state.newStepText}
          onChange={setNewStepText}
          style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', fontSize: 13.5, background: 'var(--surface)' }}
        />
        <button
          onClick={addSkinStep}
          style={{ padding: '12px 16px', background: 'linear-gradient(90deg,#FFECD2,#FCB69F)', color: '#7a3d1e', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Añadir
        </button>
      </div>

      <button
        onClick={triggerSunscreenAlarm}
        style={{ padding: 13, background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: 999, fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}
      >
        Simular recordatorio de bloqueador
      </button>
    </div>
  );
}
