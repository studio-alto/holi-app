import { BackIcon, BarChartIcon, DropIcon, PillIcon, SkinIcon, ExerciseIcon, FlameStreakIcon, CrownIcon, StarIcon } from '../icons/Icons';
import { computeProgressDerived } from '../../utils/progress';

const STAT_ICONS = { agua: DropIcon, meds: PillIcon, piel: SkinIcon, ejercicio: ExerciseIcon };
const MILESTONE_ICONS = { week: SkinIcon, flame: FlameStreakIcon, crown: CrownIcon, star: StarIcon };

function StatCard({ stat }) {
  const Icon = STAT_ICONS[stat.key];
  return (
    <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{stat.label}</div>
        <div style={{ width: 22, height: 22, display: 'flex' }}>
          <Icon size={20} color={stat.iconColor} strokeWidth={1.7} />
        </div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text)', marginTop: 10 }}>
        {stat.pct}
        <span style={{ fontSize: 14, fontWeight: 600 }}>%</span>
      </div>
      <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${stat.pct}%`, background: stat.barColor, borderRadius: 3 }} />
      </div>
    </div>
  );
}

export default function ProgresoScreen({ state, onNavigate }) {
  const { leftStats, rightStats, streakRingPct, milestones } = computeProgressDerived(state);

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
          Progreso
          <BarChartIcon />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#C9E4F0', borderRadius: 20, padding: 18, color: '#000000', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Racha</div>
              <FlameStreakIcon size={18} color="#1B5C7A" strokeWidth={1.8} />
            </div>
            <div style={{ position: 'relative', width: 104, height: 104, alignSelf: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(#1B5C7A ${streakRingPct}%, rgba(255,255,255,0.7) 0)` }} />
              <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{state.streak}</div>
                <div style={{ fontSize: 10, opacity: 0.85 }}>días</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.9 }}>de racha activa</div>
          </div>

          {leftStats.map((stat) => (
            <StatCard key={stat.key} stat={stat} />
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rightStats.map((stat) => (
            <StatCard key={stat.key} stat={stat} />
          ))}
        </div>
      </div>

      <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginTop: 4 }}>HITOS</div>
      {milestones.map((ms) => {
        const Icon = MILESTONE_ICONS[ms.key];
        return (
          <div key={ms.key} style={{ display: 'flex', alignItems: 'center', gap: 12, background: ms.bg, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ opacity: ms.opacity, display: 'flex' }}>
              <Icon size={22} color={ms.textColor} strokeWidth={1.6} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: ms.textColor }}>{ms.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{ms.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
