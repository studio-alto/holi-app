import FixedOverlayLayer from '../shared/FixedOverlayLayer';
import { computeExerciseDerived } from '../../utils/exercise';
import { computeSkinDerived } from '../../utils/skincare';

function SaludCard({ title, value, unit, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ textAlign: 'left', background: gradient, border: 'none', borderRadius: 18, padding: 18, cursor: 'pointer', minHeight: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{value}</div>
        {unit && <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{unit}</div>}
      </div>
    </button>
  );
}

export default function SaludModal({ state, onClose, onNavigate }) {
  const { exDoneCount, exTotalCount } = computeExerciseDerived(state);
  const { homeSkinNextText } = computeSkinDerived(state);

  const go = (screen) => {
    onClose();
    onNavigate(screen);
  };

  return (
    <FixedOverlayLayer zIndex={70}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', animation: 'fadeInUp 0.2s ease', pointerEvents: 'auto' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--surface)', borderRadius: '12px 12px 0 0', padding: 16, maxHeight: '80vh', overflowY: 'auto', animation: 'toastIn 0.3s ease', pointerEvents: 'auto' }}>
        <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 4, margin: '0 auto 14px' }} />
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Salud</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <SaludCard title="Agua" value={`${state.waterTodayMl} ml`} unit="hoy" gradient="var(--card-agua)" onClick={() => go('agua')} />
          <SaludCard title="Medicamentos" value={`${state.medWeekPct}%`} unit="semana" gradient="var(--card-meds)" onClick={() => go('meds')} />
          <SaludCard title="Ejercicio" value={`${exDoneCount}/${exTotalCount}`} unit="hoy" gradient="var(--card-ejercicio)" onClick={() => go('ejercicio')} />
          <SaludCard title="Piel" value={homeSkinNextText} gradient="var(--card-piel)" onClick={() => go('piel')} />
        </div>
        <button
          onClick={() => go('progreso')}
          style={{ width: '100%', marginTop: 14, padding: 14, background: 'linear-gradient(180deg, #1a1a1a, #28211a)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Ver detalle completo
        </button>
      </div>
    </FixedOverlayLayer>
  );
}
