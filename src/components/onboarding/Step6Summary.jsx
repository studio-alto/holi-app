import { UserIcon, DropIcon, PillIcon, ExerciseIcon } from '../icons/Icons';
import { goalLabel } from '../../utils/water';

function SkinSummaryIcon() {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="var(--text)" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.5c1.8 2.5 1.8 5.5 0 8-1.8-2.5-1.8-5.5 0-8z" />
      <path d="M20.5 12c-2.5 1.8-5.5 1.8-8 0 2.5-1.8 5.5-1.8 8 0z" />
      <path d="M12 20.5c-1.8-2.5-1.8-5.5 0-8 1.8 2.5 1.8 5.5 0 8z" />
      <path d="M3.5 12c2.5-1.8 5.5-1.8 8 0-2.5 1.8-5.5 1.8-8 0z" />
    </svg>
  );
}

function SummaryCard({ background, icon, title, children }) {
  return (
    <div style={{ borderRadius: 12, padding: 14, background }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

function resumenPerfil(state) {
  const parts = [state.obName, state.obAge && `${state.obAge} años`, state.obCountry].filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Sin datos de perfil';
}

function resumenMeds(state) {
  if (!state.obMedsOn) return 'Sin medicamentos configurados';
  const qty = state.obMedQty ? `${state.obMedQty} al día` : 'Cantidad por definir';
  const types = state.obMedTypes.length ? `${state.obMedTypes.length} tipo(s)` : 'Tipos por definir';
  return `${qty} · ${types}${state.obMedReminders ? ' · Recordatorios activos' : ''}`;
}

function resumenPiel(state) {
  if (!state.obSkinOn) return 'Sin rutina configurada';
  const am = state.obSkinAM || 'Por definir';
  const pm = state.obSkinPM || 'Por definir';
  return `AM: ${am} · PM: ${pm}${state.obSpfOn ? ' · Con SPF' : ''}`;
}

function resumenEjercicio(state) {
  if (!state.obExOn) return 'Sin ejercicio configurado';
  const types = state.obExerciseTypes.length ? `${state.obExerciseTypes.length} tipo(s)` : 'Tipos por definir';
  const freq = state.obExFreq || 'Frecuencia por definir';
  return `${types} · ${freq}`;
}

export default function Step6Summary({ state, onNext, onEdit }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 28px', gap: 18 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>¡Casi listo!</div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Resumen de tu configuración</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SummaryCard background="#FFFFFF" icon={<UserIcon size={15} strokeWidth={1.8} color="var(--text)" />} title="Perfil">
          {resumenPerfil(state)}
        </SummaryCard>
        <SummaryCard background="linear-gradient(90deg, #E0EFF8, #B3DFFD)" icon={<DropIcon size={15} strokeWidth={1.8} color="var(--text)" />} title="Agua">
          {goalLabel(state)}
        </SummaryCard>
        <SummaryCard background="linear-gradient(90deg, #F1EDFD, #DBD6F9)" icon={<PillIcon size={15} strokeWidth={1.8} color="var(--text)" />} title="Medicamentos">
          {resumenMeds(state)}
        </SummaryCard>
        <SummaryCard background="linear-gradient(90deg, #FFE9CF, #FCBAA3)" icon={<SkinSummaryIcon />} title="Piel">
          {resumenPiel(state)}
        </SummaryCard>
        <div style={{ gridColumn: '1/3' }}>
          <SummaryCard background="linear-gradient(90deg, #EBF4DB, #E3F0CB)" icon={<ExerciseIcon size={15} strokeWidth={1.6} color="var(--text)" />} title="Ejercicio">
            {resumenEjercicio(state)}
          </SummaryCard>
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={onNext}
          style={{ width: '100%', height: 56, padding: 14, background: 'var(--grad-sky)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
        >
          Comenzar
        </button>
        <button
          onClick={onEdit}
          style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: '1px solid var(--border)', color: '#91C2F4', borderRadius: 96, fontWeight: 500, fontSize: 12, cursor: 'pointer' }}
        >
          Editar configuración
        </button>
      </div>
    </div>
  );
}
