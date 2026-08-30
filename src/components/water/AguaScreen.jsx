import { DropIcon, BackIcon } from '../icons/Icons';
import { waterMood, buildWaterHistory } from '../../utils/water';
import { useAlarmActions } from '../../state/useAlarmActions';

const QUICK_AMOUNTS = [250, 500, 750];
const GLASS_ML = 250;

export default function AguaScreen({ state, update, addToast, onNavigate }) {
  const { triggerWaterAlarm } = useAlarmActions(state, update, addToast);
  const waterTodayMl = state.waterTodayMl;
  const waterGoalMl = state.waterGoalMl;
  const waterPct = Math.min(100, Math.round((waterTodayMl / waterGoalMl) * 100));

  const history = buildWaterHistory(state.waterHistoryMl, waterTodayMl, waterGoalMl);
  const allMl = [...state.waterHistoryMl, waterTodayMl];
  const avgMl = Math.round(allMl.reduce((sum, v) => sum + v, 0) / allMl.length);
  const minMl = Math.min(...allMl);
  const maxMl = Math.max(...allMl);

  const { msg } = waterMood(waterPct);

  const glassesTotal = Math.max(1, Math.round(waterGoalMl / GLASS_ML));
  const glassesDone = Math.min(glassesTotal, Math.round(waterTodayMl / GLASS_ML));
  const glassesLeft = Math.max(0, glassesTotal - glassesDone);

  const drinkQuick = () => {
    update((prev) => ({ waterTodayMl: prev.waterTodayMl + prev.waterQuickAmount }));
    addToast?.(`✓ +${state.waterQuickAmount}ml agregados`);
  };

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
          Agua
          <DropIcon size={20} color="var(--water)" strokeWidth={1.8} />
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 20, padding: 20 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#8A8474', letterSpacing: 0.3 }}>AGUA HOY</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#000000', lineHeight: 1 }}>{glassesDone} de {glassesTotal}</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#8A8474' }}>vasos</div>
        </div>
        <div style={{ fontSize: 13, color: '#8A8474', marginTop: 8, lineHeight: 1.5 }}>
          {msg === '¡Meta cumplida! Sigue así'
            ? `Llevas ${waterTodayMl} ml y ya cumpliste tu meta de ${waterGoalMl} ml. `
            : `Llevas ${waterTodayMl} ml de tu meta de ${waterGoalMl} ml. `}
          {glassesLeft > 0 ? `Te faltan ${glassesLeft} vaso${glassesLeft === 1 ? '' : 's'} para hoy.` : '¡Meta cumplida!'}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
          {Array.from({ length: glassesTotal }).map((_, i) => {
            const filled = i < glassesDone;
            return (
              <div
                key={i}
                style={{
                  width: 34, height: 34, borderRadius: '50%', flex: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: filled ? '#AFD3F0' : 'transparent',
                  border: filled ? 'none' : '1.5px solid var(--border)',
                }}
              >
                <DropIcon size={16} color={filled ? '#1f5a86' : 'var(--border)'} strokeWidth={1.8} />
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        {QUICK_AMOUNTS.map((amount) => {
          const selected = state.waterQuickAmount === amount;
          return (
            <button
              key={amount}
              onClick={() => update({ waterQuickAmount: amount })}
              style={{
                padding: '8px 16px',
                background: selected ? '#000000' : 'transparent',
                border: selected ? 'none' : '1px solid var(--border)',
                color: selected ? '#FFFFFF' : 'var(--text-2)',
                cursor: 'pointer',
                fontSize: 13.5,
                fontWeight: 600,
                borderRadius: 999,
              }}
            >
              {amount} ml
            </button>
          );
        })}
      </div>

      <button
        onClick={drinkQuick}
        style={{ padding: 15, background: '#000000', color: '#FFFFFF', border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
      >
        ＋ Tomar {state.waterQuickAmount} ml
      </button>

      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#AFD3F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <DropIcon size={20} color="#1f5a86" strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#000000' }}>{avgMl}</div>
            <div style={{ fontSize: 10.5, color: '#8A8474', marginTop: 2 }}>PROMEDIO</div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#000000' }}>{minMl}</div>
            <div style={{ fontSize: 10.5, color: '#8A8474', marginTop: 2 }}>MÍNIMO</div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#000000' }}>{maxMl}</div>
            <div style={{ fontSize: 10.5, color: '#8A8474', marginTop: 2 }}>MÁXIMO</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: 4 }}>Últimos 7 días</div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
        {history.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
            <div style={{ width: '100%', height: 60, background: 'var(--surface2)', borderRadius: 6, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: `${d.pct}%`, background: '#AFD3F0' }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{d.day}</div>
          </div>
        ))}
      </div>

      <button
        onClick={triggerWaterAlarm}
        style={{ padding: 13, background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: 999, fontSize: 13, color: 'var(--text-2)', cursor: 'pointer' }}
      >
        Simular recordatorio de agua
      </button>
    </div>
  );
}
