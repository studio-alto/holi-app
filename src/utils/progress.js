import { buildWaterHistory } from './water';
import { computeExerciseDerived } from './exercise';

const MILESTONE_DEFS = [
  { days: 7, key: 'week', label: 'Semana completa', sub: '¡Eres una guerrera!' },
  { days: 14, key: 'flame', label: 'Dos semanas', sub: 'Tu disciplina es admirable' },
  { days: 30, key: 'crown', label: 'Un mes completo', sub: '¡Lo lograste!' },
  { days: 100, key: 'star', label: '100 días', sub: '¡Eres legendaria!' },
];

export function computeProgressDerived(state) {
  const waterHistory = buildWaterHistory(state.waterHistoryMl, state.waterTodayMl, state.waterGoalMl);
  const waterWeekPct = Math.round(waterHistory.reduce((a, d) => a + d.pct, 0) / waterHistory.length);

  const skinWeekPct = Math.round(
    (state.skincare.history.filter((d) => d.am && d.pm).length / state.skincare.history.length) * 100
  );

  const { exPct } = computeExerciseDerived(state);

  const weeklyStats = [
    { key: 'agua', label: 'Agua', pct: waterWeekPct, barColor: 'linear-gradient(90deg,#a9d3ea,#4c85ab)' },
    { key: 'meds', label: 'Medicamentos', pct: state.medWeekPct, barColor: 'linear-gradient(90deg,#c9bfe0,#9b8ec4)' },
    { key: 'piel', label: 'Piel', pct: skinWeekPct, barColor: 'linear-gradient(90deg,#FFECD2,#FCB69F)' },
    { key: 'ejercicio', label: 'Ejercicio', pct: exPct, barColor: 'linear-gradient(90deg,#8fc79e,#6fae82)' },
  ];

  const leftStats = [{ ...weeklyStats[3], iconColor: '#86DA21' }];
  const rightStats = [
    { ...weeklyStats[0], iconColor: '#93C4F5' },
    { ...weeklyStats[1], iconColor: '#A093C6' },
    { ...weeklyStats[2], iconColor: '#FDB7A1' },
  ];

  const streakRingPct = Math.min(100, Math.round((state.streak / 30) * 100));

  const milestones = MILESTONE_DEFS.map((m) => {
    const achieved = state.streak >= m.days;
    return {
      key: m.key,
      label: m.label,
      sub: achieved ? m.sub : `Faltan ${m.days - state.streak} días`,
      achieved,
      opacity: achieved ? 1 : 0.35,
      bg: achieved ? '#e0f0fa' : 'var(--surface2)',
      textColor: achieved ? '#4c85ab' : 'var(--text-3)',
    };
  });

  return { leftStats, rightStats, streakRingPct, milestones };
}
