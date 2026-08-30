import { PillIcon, InfoIcon } from '../icons/Icons';
import { ChipGroup, PrimaryButton, SecondaryButton, StepHeading, ToggleSwitch } from './shared';
import { medTypeOptions, medQtyOptions } from '../../data/options';

export default function Step3Meds({ state, update, toggleInArray, onNext, onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 28px', gap: 16 }}>
      <StepHeading icon={<PillIcon size={32} color="#91C2F4" />} title="Medicamentos" subtitle="Configura tus recordatorios" />

      <ToggleSwitch label="¿Tomas medicamentos regularmente?" checked={state.obMedsOn} onChange={(v) => update({ obMedsOn: v })} />

      {!state.obMedsOn && (
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Perfecto, puedes agregarlos después en la app</div>
      )}

      {state.obMedsOn && (
        <>
          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Qué tipo de medicamentos tomas?</label>
          <ChipGroup options={medTypeOptions} selected={state.obMedTypes} multi onToggle={(v) => toggleInArray('obMedTypes', v)} />

          <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Cuántos medicamentos tomas diariamente?</label>
          <ChipGroup options={medQtyOptions} selected={state.obMedQty} onToggle={(v) => update({ obMedQty: v })} />

          <ToggleSwitch label="¿Quieres recordatorios de medicamentos?" checked={state.obMedReminders} onChange={(v) => update({ obMedReminders: v })} />

          {state.obMedReminders && (
            <div style={{ background: 'var(--surface2)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <InfoIcon size={16} />
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                Podrás elegir la hora exacta para cada medicamento, a cualquier hora del día, cuando lo agregues en la app.
              </div>
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton onClick={onNext}>Siguiente</PrimaryButton>
        <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>
      </div>
    </div>
  );
}
