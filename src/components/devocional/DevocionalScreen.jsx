import { BackIcon } from '../icons/Icons';
import { computeDevocionalDerived } from '../../utils/devocional';
import { useDevocionalActions } from '../../state/useDevocionalActions';

function OpenBookIcon({ size = 20, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6c2-1 5-1 8 1 3-2 6-2 8-1v12c-2-1-5-1-8 1-3-2-6-2-8-1z" />
      <path d="M12 7v12" />
    </svg>
  );
}

export default function DevocionalScreen({ state, update, addToast, onNavigate }) {
  const { date, title, text, reflection, btnBg, btnColor, btnText } = computeDevocionalDerived(state);
  const { markDevocionalRead } = useDevocionalActions(update, addToast);

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
          Hoy Importa
          <OpenBookIcon />
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: 12, color: '#91C2F4', fontWeight: 500 }}>{date}</div>
        <div style={{ fontWeight: 700, fontSize: 19, color: 'var(--text)', marginTop: 6 }}>{title}</div>
        <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 12 }}>{text}</div>
        <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
        <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 500 }}>PARA REFLEXIONAR</div>
        <div style={{ fontSize: 14, color: '#000', marginTop: 6, fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5 }}>{reflection}</div>
      </div>

      <button
        onClick={markDevocionalRead}
        disabled={state.devocionalRead}
        style={{ padding: 15, background: btnBg, color: btnColor, border: 'none', borderRadius: 999, fontWeight: 500, cursor: state.devocionalRead ? 'default' : 'pointer' }}
      >
        {btnText}
      </button>
    </div>
  );
}
