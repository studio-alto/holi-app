import { ChipGroup, PrimaryButton, SecondaryButton, StepHeading, ToggleSwitch } from './shared';
import { skinAMOptions, skinPMOptions, spfTimeOptions, skinTypeOptions } from '../../data/options';

export default function Step4Skin({ state, update, toggleInArray, onNext, onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 28px', gap: 16 }}>
      <StepHeading icon={<SkinRoutineIcon />} title="Rutina de Piel" subtitle="Cuida tu piel" />

      <ToggleSwitch label="¿Tienes rutina de piel establecida?" checked={state.obSkinOn} onChange={(v) => update({ obSkinOn: v })} />

      {!state.obSkinOn && (
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Podemos ayudarte a crearla después</div>
      )}

      {state.obSkinOn && (
        <>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Cuántos pasos en tu rutina de MAÑANA?</label>
          <ChipGroup options={skinAMOptions} selected={state.obSkinAM} onToggle={(v) => update({ obSkinAM: v })} />

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Cuántos pasos en tu rutina de NOCHE?</label>
          <ChipGroup options={skinPMOptions} selected={state.obSkinPM} onToggle={(v) => update({ obSkinPM: v })} />

          <ToggleSwitch label="¿Usas bloqueador solar?" checked={state.obSpfOn} onChange={(v) => update({ obSpfOn: v })} />

          {state.obSpfOn && (
            <>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿A qué hora te aplicas bloqueador?</label>
              <ChipGroup options={spfTimeOptions} selected={state.obSpfTimes} multi onToggle={(v) => toggleInArray('obSpfTimes', v)} />

              <ToggleSwitch label="¿Quieres recordatorio de bloqueador?" checked={state.obSpfReminder} onChange={(v) => update({ obSpfReminder: v })} />
            </>
          )}

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>¿Cuál es tu tipo de piel?</label>
          <ChipGroup options={skinTypeOptions} selected={state.obSkinType} onToggle={(v) => update({ obSkinType: v })} />
        </>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton onClick={onNext}>Siguiente</PrimaryButton>
        <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>
      </div>
    </div>
  );
}

function SkinRoutineIcon() {
  return (
    <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="#91C2F4" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.5c1.8 2.5 1.8 5.5 0 8-1.8-2.5-1.8-5.5 0-8z" />
      <path d="M20.5 12c-2.5 1.8-5.5 1.8-8 0 2.5-1.8 5.5-1.8 8 0z" />
      <path d="M12 20.5c-1.8-2.5-1.8-5.5 0-8 1.8 2.5 1.8 5.5 0 8z" />
      <path d="M3.5 12c2.5-1.8 5.5-1.8 8 0-2.5 1.8-5.5 1.8-8 0z" />
    </svg>
  );
}
