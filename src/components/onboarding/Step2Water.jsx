import { DropIcon } from '../icons/Icons';
import { PrimaryButton, SecondaryButton, StepHeading } from './shared';
import { thermoSizeOptions } from '../../data/options';
import { goalLabel } from '../../utils/water';

function UnitOption({ label, sublabel, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: 12, border: `1.5px solid ${selected ? 'var(--sky)' : 'var(--border)'}`, background: 'var(--surface)', textAlign: 'left', cursor: 'pointer' }}
    >
      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid var(--border)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: selected ? 10 : 0, height: selected ? 10 : 0, borderRadius: '50%', backgroundColor: 'var(--sky)' }} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{sublabel}</div>
      </div>
    </button>
  );
}

export default function Step2Water({ state, update, onNext, onBack }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 28px', gap: 16 }}>
      <StepHeading icon={<DropIcon size={32} color="#91C2F4" />} title="Configura tu Agua" subtitle="Hidratación diaria" />

      <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>¿Cómo prefieres medir tu hidratación?</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <UnitOption label="Vasos (250ml)" sublabel="Cuenta por vasos" selected={state.obWaterUnit === 'vasos'} onClick={() => update({ obWaterUnit: 'vasos' })} />
        <UnitOption label="Mililitros personalizados" sublabel="Registra por ml exactos" selected={state.obWaterUnit === 'ml'} onClick={() => update({ obWaterUnit: 'ml' })} />
      </div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>Capacidad de tu termo</label>
        <select
          aria-label="Capacidad del termo"
          value={state.thermoSize}
          onChange={(e) => update({ thermoSize: e.target.value, customThermoInput: '' })}
          style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', fontSize: 16, color: 'var(--text)' }}
        >
          {thermoSizeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            aria-label="Capacidad personalizada del termo"
            type="number"
            placeholder="Otra capacidad (ml)"
            value={state.customThermoInput}
            onChange={(e) => update({ customThermoInput: e.target.value })}
            style={{ flex: 1, padding: '11px 14px', borderRadius: 12, border: '1px solid var(--border)', fontSize: 16, background: 'var(--surface)' }}
          />
          <button
            type="button"
            onClick={() => update((prev) => ({ thermoSize: prev.customThermoInput || prev.thermoSize }))}
            style={{ padding: '11px 16px', background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 999, fontWeight: 500, fontSize: 12.5, cursor: 'pointer' }}
          >
            Usar
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--surface2)', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#91C2F4', fontWeight: 600 }}>
        Meta diaria: <span style={{ color: 'var(--text)' }}>{goalLabel(state)}</span>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PrimaryButton onClick={onNext}>Siguiente</PrimaryButton>
        <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>
      </div>
    </div>
  );
}
