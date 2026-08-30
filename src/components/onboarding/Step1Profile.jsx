import { UserIcon, InfoIcon } from '../icons/Icons';
import { PrimaryButton, SecondaryButton } from './shared';
import { countryOptions } from '../../data/options';

export default function Step1Profile({ state, update, onNext, onBack }) {
  const invalid = !state.obAge || !state.obCountry;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 24px 28px', gap: 8 }}>
      <UserIcon size={34} />
      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginTop: 10 }}>Cuéntanos de ti</div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Así podemos personalizar tu experiencia en HOLÍ.</div>

      <div>
        <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>Edad</label>
        <input
          aria-label="Edad"
          type="number"
          placeholder="Ej: 25"
          value={state.obAge}
          onChange={(e) => update({ obAge: e.target.value })}
          style={{ width: '100%', marginTop: 8, padding: 14, borderRadius: 12, border: '0.5px solid var(--border)', fontSize: 16, background: 'var(--surface2)' }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>País</label>
        <select
          aria-label="País"
          value={state.obCountry}
          onChange={(e) => update({ obCountry: e.target.value })}
          style={{ width: '100%', marginTop: 8, padding: 14, borderRadius: 12, border: '0.5px solid var(--border)', fontSize: 16, background: 'var(--surface2)', color: 'var(--text)' }}
        >
          <option value="">Selecciona tu país</option>
          {countryOptions.map((cn) => (
            <option key={cn} value={cn}>{cn}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 28, background: 'var(--surface2)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <InfoIcon size={16} />
        <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
          Tu información es privada y solo se usa para adaptar recomendaciones dentro de la app.
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 24 }}>
        <PrimaryButton disabled={invalid} onClick={onNext}>Siguiente</PrimaryButton>
        <SecondaryButton onClick={onBack}>Atrás</SecondaryButton>
      </div>
    </div>
  );
}
