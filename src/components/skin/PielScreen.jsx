import { useEffect, useRef, useState } from 'react';
import { BackIcon, SkinIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { computeSkinDerived } from '../../utils/skincare';

const TIMER_PRESETS = [30, 60, 90, 120];

function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PielScreen({ state, update, addToast, onNavigate }) {
  const { period, periodLabel, skinDone, skinTotal, skinPct, skinSteps } = computeSkinDerived(state);

  const [timerDuration, setTimerDuration] = useState(60);
  const [timerRemaining, setTimerRemaining] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [customTimerInput, setCustomTimerInput] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const clearTimerInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const setPreset = (sec) => {
    clearTimerInterval();
    setTimerRunning(false);
    setTimerDuration(sec);
    setTimerRemaining(sec);
  };

  const applyCustomTimer = () => {
    const v = parseFloat(customTimerInput);
    if (!(v > 0)) return;
    clearTimerInterval();
    const sec = Math.round(v * 60);
    setTimerRunning(false);
    setTimerDuration(sec);
    setTimerRemaining(sec);
    setCustomTimerInput('');
    addToast?.('✓ Tiempo actualizado');
  };

  const startTimer = () => {
    if (timerRunning) return;
    let remaining = timerRemaining <= 0 ? timerDuration : timerRemaining;
    setTimerRemaining(remaining);
    setTimerRunning(true);
    // Counted outside the state updater: calling addToast (another
    // component's setState) from inside one is a React "setState while
    // rendering" error and can fire the toast twice.
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      setTimerRemaining(Math.max(0, remaining));
      if (remaining <= 0) {
        clearTimerInterval();
        setTimerRunning(false);
        addToast?.('✓ Tiempo de espera completado ⏱️');
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearTimerInterval();
    setTimerRunning(false);
  };

  const resetTimer = () => {
    clearTimerInterval();
    setTimerRunning(false);
    setTimerRemaining(timerDuration);
  };

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => onNavigate('home')}
          aria-label="Volver"
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', flexShrink: 0 }}
        >
          <BackIcon />
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
          Piel
          <SkinIcon size={20} color="#8A5A24" strokeWidth={1.8} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          aria-pressed={amActive}
          onClick={() => setPeriod('am')}
          style={{
            flex: 1, padding: 11, borderRadius: 999, border: 'none',
            background: amActive ? '#F3E1CC' : 'var(--surface2)',
            color: amActive ? '#8A5A24' : 'var(--text-2)',
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
            background: !amActive ? '#F3E1CC' : 'var(--surface2)',
            color: !amActive ? '#8A5A24' : 'var(--text-2)',
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
        <div style={{ height: '100%', width: `${skinPct}%`, background: '#E9AF6E' }} />
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
              border: `1.5px solid ${s.done ? '#E9AF6E' : 'var(--border)'}`,
              background: s.done ? '#E9AF6E' : 'transparent',
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
          style={{ flex: 1, minWidth: 0, padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', fontSize: 16, background: 'var(--surface)' }}
        />
        <button
          onClick={addSkinStep}
          style={{ flexShrink: 0, padding: '12px 16px', background: '#F3E1CC', color: '#8A5A24', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Añadir
        </button>
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>⏱️ Cronómetro entre pasos</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{formatTimer(timerRemaining)}</div>

        <div style={{ display: 'flex', gap: 6 }}>
          {TIMER_PRESETS.map((sec) => {
            const active = timerDuration === sec;
            return (
              <button
                key={sec}
                onClick={() => setPreset(sec)}
                style={{ padding: '8px 12px', borderRadius: 999, border: 'none', background: active ? '#F3E1CC' : 'var(--surface2)', color: active ? '#8A5A24' : 'var(--text-2)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
              >
                {sec}s
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <input
            aria-label="Minutos personalizados"
            type="number"
            min="1"
            placeholder="Tiempo personalizado (min)"
            value={customTimerInput}
            onChange={(e) => setCustomTimerInput(e.target.value)}
            style={{ flex: 1, minWidth: 0, padding: '10px 14px', borderRadius: 999, border: '1px solid var(--border)', fontSize: 12.5, background: 'var(--bg)' }}
          />
          <button
            onClick={applyCustomTimer}
            style={{ flexShrink: 0, padding: '10px 16px', background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 999, fontWeight: 500, fontSize: 12, cursor: 'pointer' }}
          >
            Usar
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <button
            onClick={timerRunning ? pauseTimer : startTimer}
            style={{ flex: 1.4, padding: 12, background: '#F3E1CC', color: '#8A5A24', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
          >
            {timerRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            onClick={resetTimer}
            style={{ flex: 1, padding: 12, background: 'var(--surface2)', color: 'var(--text-2)', border: 'none', borderRadius: 999, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
          >
            Reiniciar
          </button>
        </div>

        <div style={{ fontSize: 11.5, color: 'var(--text-3)', textAlign: 'center' }}>
          Úsalo entre sérum, mascarilla o crema para respetar el tiempo de absorción.
        </div>
      </div>
    </div>
  );
}
