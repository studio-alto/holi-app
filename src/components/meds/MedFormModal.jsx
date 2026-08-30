import { MED_COLORS, MED_COLOR_GRADIENTS, MED_TYPE_OPTIONS, MED_FREQ_OPTIONS } from '../../data/medOptions';
import FixedOverlayLayer from '../shared/FixedOverlayLayer';

function SectionLabel({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: '#000000', marginBottom: 8 }}>{children}</div>;
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 16px',
        borderRadius: 999,
        border: selected ? 'none' : '1px solid var(--border)',
        background: selected ? '#000000' : 'transparent',
        color: selected ? '#FFFFFF' : 'var(--text-2)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function MedFormModal({ title, form, onChange, onCancel, onSave }) {
  const set = (key) => (e) => onChange({ ...form, [key]: e.target.value });
  const canSave = form.name.trim().length > 0;

  return (
    <FixedOverlayLayer zIndex={70}>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'flex-end', pointerEvents: 'auto' }}>
      <div style={{ background: '#F7F1E3', width: '100%', borderRadius: '22px 22px 0 0', padding: '18px 20px 26px', maxHeight: '90%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button
            onClick={onCancel}
            aria-label="Cerrar"
            style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#000000' }}>{title}</div>
          <button
            onClick={onSave}
            disabled={!canSave}
            aria-label="Guardar"
            style={{ width: 34, height: 34, borderRadius: '50%', background: canSave ? '#000000' : 'var(--border)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: canSave ? 'pointer' : 'not-allowed' }}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <SectionLabel>Nombre</SectionLabel>
            <input
              aria-label="Nombre"
              placeholder="Ej. Vitamina B6"
              value={form.name}
              onChange={set('name')}
              style={{ width: '100%', padding: '13px 14px', borderRadius: 999, border: '0.5px solid var(--border)', fontSize: 16, background: '#FFFFFF' }}
            />
          </div>

          <div>
            <SectionLabel>Tipo</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {MED_TYPE_OPTIONS.map((t) => (
                <Chip key={t} selected={form.type === t} onClick={() => onChange({ ...form, type: t })}>{t}</Chip>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Dosis</SectionLabel>
            <input
              aria-label="Dosis"
              placeholder="Ej. 1 píldora"
              value={form.dose}
              onChange={set('dose')}
              style={{ width: '100%', padding: '13px 14px', borderRadius: 999, border: '0.5px solid var(--border)', fontSize: 16, background: '#FFFFFF' }}
            />
          </div>

          <div>
            <SectionLabel>Frecuencia</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {MED_FREQ_OPTIONS.map((f) => (
                <Chip key={f} selected={form.freq === f} onClick={() => onChange({ ...form, freq: f })}>{f}</Chip>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Recordatorio</SectionLabel>
            <input
              aria-label="Hora"
              type="time"
              value={form.time}
              onChange={set('time')}
              style={{ width: '100%', padding: '13px 14px', borderRadius: 999, border: '0.5px solid var(--border)', fontSize: 16, background: '#FFFFFF' }}
            />
          </div>

          <div>
            <SectionLabel>Notas</SectionLabel>
            <input
              aria-label="Notas"
              placeholder="Opcional"
              value={form.notes}
              onChange={set('notes')}
              style={{ width: '100%', padding: '13px 14px', borderRadius: 999, border: '0.5px solid var(--border)', fontSize: 16, background: '#FFFFFF' }}
            />
          </div>

          <div>
            <SectionLabel>Color</SectionLabel>
            <div style={{ display: 'flex', gap: 10 }}>
              {MED_COLORS.map((c) => (
                <button
                  key={c}
                  aria-label="Color"
                  onClick={() => onChange({ ...form, color: c })}
                  style={{ width: 34, height: 34, borderRadius: '50%', background: MED_COLOR_GRADIENTS[c] || c, border: `2.5px solid ${form.color === c ? '#000000' : 'transparent'}`, cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </FixedOverlayLayer>
  );
}
