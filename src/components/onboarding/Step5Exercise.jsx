import { ExerciseIcon } from '../icons/Icons';
import { ChipGroup, PrimaryButton, SecondaryButton, StepHeading, ToggleSwitch } from './shared';
import ExerciseTypeIcon from './ExerciseTypeIcon';
import { exerciseTypeOptions, freqOptions, exDurationOptions, exTimeOptions, exGoalOptions } from '../../data/options';

export default function Step5Exercise({ state, update, toggleInArray, onNext, onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 28px', gap: 16 }}>
      <StepHeading icon={<ExerciseIcon size={32} color="#91C2F4" />} title="Ejercicio" subtitle="¿Qué tipos de ejercicio haces?" />

      <ToggleSwitch label="¿Practicas ejercicio regularmente?" checked={state.obExOn} onChange={(v) => update({ obExOn: v })} />

      {!state.obExOn && (
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>No hay problema, puedes empezar cuando quieras</div>
      )}

      {state.obExOn && (
        <>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>Selecciona los tipos de ejercicio que practicas</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {exerciseTypeOptions.map((et) => {
              const selected = state.obExerciseTypes.includes(et.id);
              const color = selected ? 'var(--sky-dark, #3a6a8f)' : 'var(--text)';
              const color2 = selected ? '#3a6a8f' : 'var(--text-2)';
              return (
                <button
                  key={et.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleInArray('obExerciseTypes', et.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '12px 6px', borderRadius: 14, border: `1.5px solid ${selected ? 'var(--sky)' : 'var(--border)'}`, background: selected ? 'rgba(145,194,244,0.12)' : 'var(--surface)', cursor: 'pointer' }}
                >
                  <ExerciseTypeIcon id={et.id} color={color2} />
                  <span style={{ fontSize: 12, fontWeight: 600, color }}>{et.label}</span>
                </button>
              );
            })}
          </div>

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Cuántos días a la semana ejercitas?</label>
          <ChipGroup options={freqOptions} selected={state.obExFreq} onToggle={(v) => update({ obExFreq: v })} />

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>¿Cuánto dura tu rutina típica?</label>
          <ChipGroup options={exDurationOptions} selected={state.obExDuration} onToggle={(v) => update({ obExDuration: v })} />

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>¿A qué hora acostumbras ejercitarte?</label>
          <ChipGroup options={exTimeOptions} selected={state.obExTimes} multi onToggle={(v) => toggleInArray('obExTimes', v)} />

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>¿Cuál es tu objetivo de ejercicio?</label>
          <ChipGroup options={exGoalOptions} selected={state.obExGoals} multi onToggle={(v) => toggleInArray('obExGoals', v)} />

          <ToggleSwitch label="¿Quieres recordatorios de ejercicio?" checked={state.obExReminders} onChange={(v) => update({ obExReminders: v })} />
        </>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton onClick={onNext}>Siguiente</PrimaryButton>
        <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>
      </div>
    </div>
  );
}
