import { CheckIcon, DropIcon, PillIcon, FlameStreakIcon, ExerciseIcon, SkinIcon } from '../icons/Icons';

const ICONS = {
  drop: DropIcon,
  pill: PillIcon,
  flame: FlameStreakIcon,
  weight: ExerciseIcon,
  star: SkinIcon,
};

export default function WeekStrip({ days, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', paddingLeft: 4 }}>{label}</div>}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
      {days.map((wd, i) => {
        const Icon = wd.icon && ICONS[wd.icon];
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: wd.cardBg, borderRadius: 14, padding: '6px 0' }}>
            <div style={{ fontSize: 10.5, lineHeight: 1.2, color: 'var(--text-3)' }}>{wd.label}</div>
            <div className={wd.isToday ? 'pop-scale' : undefined} style={{ width: 24, height: 24, borderRadius: '50%', background: wd.circleBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {wd.isDone && <CheckIcon size={12} />}
              {Icon && <Icon size={12} color={wd.iconColor} strokeWidth={1.8} />}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
