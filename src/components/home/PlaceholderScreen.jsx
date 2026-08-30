import { BackIcon } from '../icons/Icons';

const TITLES = {
  agua: 'Agua',
  meds: 'Medicamentos',
  ejercicio: 'Ejercicio',
  piel: 'Piel',
  devocional: 'Hoy Importa',
  diario: 'Diario & emociones',
  progreso: 'Progreso',
  settings: 'Configuración',
};

export default function PlaceholderScreen({ screen, onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button
        onClick={onBack}
        aria-label="Volver"
        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
      >
        <BackIcon />
      </button>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{TITLES[screen] || screen}</div>
      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 24, textAlign: 'center', color: 'var(--text-2)', fontSize: 13.5 }}>
        Esta pantalla está fuera del alcance de esta primera entrega (onboarding, paywall y dashboard).
      </div>
    </div>
  );
}
