import { CheckCircleIcon, HistoryIcon, BellIcon, PillIcon, StarIcon } from '../icons/Icons';

const benefits = [
  { icon: <CheckCircleIcon />, title: 'Todas las categorías sin límites', desc: 'Agua, medicamentos, piel y ejercicio' },
  { icon: <HistoryIcon />, title: 'Historial completo de progreso', desc: 'Mira tu avance desde el primer día' },
  { icon: <BellIcon size={22} color="#91C2F4" strokeWidth={1.6} />, title: 'Recordatorios reales', desc: 'Te avisamos aunque cierres la app' },
  { icon: <PillIcon size={22} color="#91C2F4" strokeWidth={1.6} />, title: 'Sin límite de medicamentos', desc: 'Configura todos los que necesites' },
];

function PlanCard({ label, price, period, badge, highlighted, selected, onClick, extras, ctaLabel }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        background: 'var(--surface)',
        border: selected ? '2px solid #91C2F4' : '1px solid var(--border)',
        boxShadow: highlighted && selected ? '0 6px 20px rgba(145,194,244,0.28)' : 'none',
        borderRadius: 16,
        padding: '18px 14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {badge && (
        <div style={{ position: 'absolute', top: -10, right: 10, background: '#91C2F4', color: '#fff', fontSize: 9.5, fontWeight: 600, borderRadius: 20, padding: '4px 8px' }}>
          {badge}
        </div>
      )}
      <div style={{ fontSize: 14, fontWeight: 600, color: highlighted ? '#91C2F4' : 'var(--text)' }}>{label}</div>
      <div>
        <span style={{ fontSize: 26, fontWeight: 700, color: '#3a6a8f' }}>{price}</span>
        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{period}</div>
      </div>
      {extras && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: 'var(--text-2)' }}>
          {extras.map((line, i) => (
            <div key={i} style={line.strong ? { color: 'var(--gold-text)', fontWeight: 600 } : line.accent ? { color: '#91C2F4' } : undefined}>
              ✓ {line.text}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 6, padding: 10, borderRadius: 10, textAlign: 'center', fontSize: 12, fontWeight: 600, background: selected ? '#91C2F4' : 'var(--surface2)', color: selected ? '#fff' : 'var(--text)' }}>
        {ctaLabel}
      </div>
    </button>
  );
}

export default function Step7Paywall({ state, update, onStartPremium, onContinueFree }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '0.5px solid var(--border)', background: 'rgba(248,247,245,0.92)', backdropFilter: 'blur(6px)' }}>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 3, color: '#91C2F4', textTransform: 'uppercase' }}>HOLÍ</div>
        <button aria-label="Cerrar" onClick={onContinueFree} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 16, color: 'var(--text)', cursor: 'pointer', lineHeight: 1 }}>×</button>
      </div>
      <div style={{ height: 4, background: 'var(--surface2)' }}>
        <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg,var(--violet),#91C2F4)' }} />
      </div>

      <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#91C2F4' }}>¡HOLÍ Premium!</div>
          <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8 }}>7 días gratis de acceso total</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, background: 'rgba(145,194,244,0.12)', border: '1px solid #91C2F4', borderRadius: 20, padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#91C2F4' }}>
            <StarIcon /> 7 días GRATIS
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>¿Qué desbloqueás?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {benefits.map((b) => (
              <div key={b.title} style={{ background: 'var(--surface2)', borderRadius: 12, padding: 12 }}>
                {b.icon}
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginTop: 6 }}>{b.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Elige tu plan</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <PlanCard
              label="Mensual"
              price="$7.99"
              period="/ mes USD"
              selected={state.obPlan === 'monthly'}
              onClick={() => update({ obPlan: 'monthly' })}
              extras={[{ text: 'Renovación automática' }, { text: 'Cancelar cuando quieras' }]}
              ctaLabel={state.obPlan === 'monthly' ? 'Seleccionado' : 'Seleccionar'}
            />
            <PlanCard
              label="Anual"
              price="$64.99"
              period="/ año USD"
              badge="RECOMENDADO"
              highlighted
              selected={state.obPlan === 'annual'}
              onClick={() => update({ obPlan: 'annual' })}
              extras={[
                { text: '= $5.42/mes', strong: true },
                { text: 'Renovación automática' },
                { text: 'Cancelar cuando quieras' },
                { text: 'Acceso a features nuevas', accent: true },
              ]}
              ctaLabel={state.obPlan === 'annual' ? 'Seleccionado' : 'Seleccionar'}
            />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#91C2F4', marginTop: 8 }}>Ahorras 32% ($30.89 de descuento)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onStartPremium} style={{ width: '100%', height: 50, padding: 14, background: 'var(--grad-sky)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            Comenzar Premium 7 días GRATIS
          </button>
          <button onClick={onContinueFree} style={{ width: '100%', padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 199, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>
            Continuar con la versión gratuita
          </button>
        </div>

        <div style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.5 }}>
          Al continuar, aceptas los términos de suscripción. Se aplicará el descuento de prueba. La renovación ocurre automáticamente a menos que se cancele.
          <div style={{ marginTop: 6, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#" style={{ color: '#3a6a8f', textDecoration: 'underline' }}>Términos de suscripción</a>
            <a href="#" style={{ color: '#3a6a8f', textDecoration: 'underline' }}>Política de privacidad</a>
            <a href="#" style={{ color: '#3a6a8f', textDecoration: 'underline' }}>Política de reembolsos</a>
          </div>
          <div style={{ marginTop: 10, fontStyle: 'italic' }}>El asistente no reemplaza diagnósticos médicos profesionales.</div>
        </div>
      </div>
    </div>
  );
}
