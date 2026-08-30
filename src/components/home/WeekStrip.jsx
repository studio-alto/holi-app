import { CheckIcon, DropIcon, PillIcon, FlameStreakIcon, ExerciseIcon, SkinIcon } from '../icons/Icons';

const ICONS = {
  drop: DropIcon,
  pill: PillIcon,
  flame: FlameStreakIcon,
  weight: ExerciseIcon,
  star: SkinIcon,
};

export default function WeekStrip({ days }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
      {days.map((wd, i) => {
        const Icon = wd.icon && ICONS[wd.icon];
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: wd.cardBg, borderRadius: 16, padding: '10px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{wd.label}</div>
            <div className={wd.isToday ? 'pop-scale' : undefined} style={{ width: 28, height: 28, borderRadius: '50%', background: wd.circleBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {wd.isDone && <CheckIcon />}
              {Icon && <Icon size={14} color={wd.iconColor} strokeWidth={1.8} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
