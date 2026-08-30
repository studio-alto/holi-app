export default function Switch({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{ width: 44, height: 24, borderRadius: 999, border: 'none', background: checked ? '#91C2F4' : 'var(--border)', position: 'relative', cursor: 'pointer', flex: 'none' }}
    >
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: checked ? 23 : 3, transition: 'left 0.25s' }} />
    </button>
  );
}
