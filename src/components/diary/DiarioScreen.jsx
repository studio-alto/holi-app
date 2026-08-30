import { BackIcon, MoodIcon } from '../icons/Icons';
import { computeDiaryDerived } from '../../utils/diary';
import { useDiaryActions } from '../../state/useDiaryActions';

function DiaryIcon({ size = 20, color = '#91C2F4', strokeWidth = 1.8 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M4 20l1-4 11-11 3 3-11 11z" />
      <path d="M14 6l3 3" />
    </svg>
  );
}

export default function DiarioScreen({ state, update, addToast, onNavigate }) {
  const { moods, entries } = computeDiaryDerived(state);
  const { setMood, setDiaryText, saveDiaryEntry } = useDiaryActions(state, update, addToast);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button
        onClick={() => onNavigate('home')}
        aria-label="Volver"
        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
      >
        <BackIcon />
      </button>

      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
        Diario &amp; emociones
        <DiaryIcon />
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>¿Cómo te sientes hoy?</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {moods.map((mo) => (
            <button
              key={mo.emoji}
              aria-label={mo.label}
              aria-pressed={mo.selected}
              onClick={() => setMood(mo.emoji)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0', borderRadius: 999, border: `1.5px solid ${mo.border}`, background: mo.bg, color: mo.iconColor, cursor: 'pointer' }}
            >
              <MoodIcon mood={mo.moodKey} size={26} />
            </button>
          ))}
        </div>
        <textarea
          aria-label="Escribe tu entrada"
          placeholder="Escribe lo que quieras recordar de hoy..."
          value={state.diary.text}
          onChange={setDiaryText}
          style={{ width: '100%', marginTop: 12, minHeight: 90, padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', fontFamily: 'inherit', fontSize: 14, resize: 'vertical', background: 'var(--surface2)' }}
        />
        <button
          onClick={saveDiaryEntry}
          disabled={!state.diary.text.trim()}
          style={{ marginTop: 10, width: '100%', padding: 13, background: state.diary.text.trim() ? 'var(--grad-sky)' : 'var(--border)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 500, cursor: state.diary.text.trim() ? 'pointer' : 'not-allowed' }}
        >
          Guardar entrada
        </button>
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)', marginTop: 4 }}>ENTRADAS ANTERIORES</div>
      {entries.length === 0 && (
        <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Aún no tienes entradas guardadas.</div>
      )}
      {entries.map((e) => (
        <div key={e.id} style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', color: 'var(--text-2)' }}>
              <MoodIcon mood={e.moodKey} size={20} />
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{e.date}</span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.5 }}>{e.text}</div>
        </div>
      ))}
    </div>
  );
}
