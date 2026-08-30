import { BackIcon } from '../icons/Icons';
import Switch from '../shared/Switch';

export function OnboardingTopbar({ stepLabel, onBack, showBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '16px 20px 10px', borderBottom: '0.5px solid var(--border)' }}>
      {showBack && (
        <button
          aria-label="Atrás"
          onClick={onBack}
          style={{ position: 'absolute', left: 16, top: 10, width: 32, height: 32, borderRadius: '50%', background: 'var(--surface2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
        >
          <BackIcon />
        </button>
      )}
      <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400 }}>{stepLabel}</div>
    </div>
  );
}

export function ProgressBar({ pct }) {
  return (
    <div style={{ height: 4, background: 'var(--surface2)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--grad-sky)', transition: 'width 0.6s ease' }} />
    </div>
  );
}

export function PrimaryButton({ children, onClick, disabled, style, type = 'button' }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: '100%',
        padding: 14,
        background: disabled ? 'var(--border)' : 'var(--grad-sky)',
        color: '#fff',
        border: 'none',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: 14,
        background: 'transparent',
        border: '0.5px solid var(--border)',
        color: 'var(--text)',
        borderRadius: 12,
        fontWeight: 500,
        fontSize: 13,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {label && <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{label}</label>}
      <Switch checked={checked} onChange={onChange} ariaLabel={label} />
    </div>
  );
}

export function Chip({ label, selected, onClick, weight = 500 }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: 999,
        border: `1.5px solid ${selected ? 'var(--sky)' : 'var(--border)'}`,
        background: selected ? 'rgba(145,194,244,0.12)' : 'var(--surface)',
        color: selected ? 'var(--sky-dark, #3a6a8f)' : 'var(--text)',
        fontSize: 12.5,
        fontWeight: weight,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export function ChipGroup({ options, selected, multi = false, onToggle, getLabel = (o) => (typeof o === 'string' ? o : o.label), getValue = (o) => (typeof o === 'string' ? o : o.id) }) {
  const isSelected = (val) => (multi ? (selected || []).includes(val) : selected === val);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => {
        const value = getValue(opt);
        return <Chip key={value} label={getLabel(opt)} selected={isSelected(value)} onClick={() => onToggle(value)} />;
      })}
    </div>
  );
}

export function StepHeading({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {icon}
      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginTop: 8 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

export function InfoNote({ children }) {
  return (
    <div style={{ marginTop: 28, background: 'var(--surface2)', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}
