const MOTIVATIONS = {
  glutes: 'Hoy es día de piernas, ¡vamos con todo!',
  arms: 'Hoy es día de brazos, ¡a trabajar!',
  full: 'Full body hoy, cada músculo cuenta',
};

export function computeExerciseDerived(state) {
  const activeRoutines = state.routines.filter((r) => state.selectedRoutineIds.includes(r.id));

  const exDoneCount = activeRoutines.reduce((a, r) => a + r.exercises.filter((ex) => ex.done >= ex.sets).length, 0);
  const exTotalCount = activeRoutines.reduce((a, r) => a + r.exercises.length, 0);
  const exDoneSets = activeRoutines.reduce((a, r) => a + r.exercises.reduce((b, ex) => b + ex.done, 0), 0);
  const exTotalSets = activeRoutines.reduce((a, r) => a + r.exercises.reduce((b, ex) => b + ex.sets, 0), 0) || 1;
  const exPct = Math.round((exDoneSets / exTotalSets) * 100);

  const routineCards = state.routines.map((r) => {
    const on = state.selectedRoutineIds.includes(r.id);
    return {
      id: r.id,
      key: r.key,
      name: r.name,
      desc: r.desc,
      on,
      border: on ? '#6fae82' : 'var(--border)',
      btnBg: on ? 'linear-gradient(135deg,#E7F5DD,#D2F3E2)' : 'var(--surface2)',
      btnColor: on ? '#2f5a3d' : 'var(--text)',
      btnLabel: on ? 'Quitar' : 'Agregar +',
    };
  });

  const activeRoutineBlocks = activeRoutines.map((r) => {
    const rDone = r.exercises.filter((ex) => ex.done >= ex.sets).length;
    const rTotalSets = r.exercises.reduce((a, ex) => a + ex.sets, 0) || 1;
    const rDoneSets = r.exercises.reduce((a, ex) => a + ex.done, 0);
    const rPct = Math.round((rDoneSets / rTotalSets) * 100);
    return {
      id: r.id,
      key: r.key,
      name: r.name,
      motivation: MOTIVATIONS[r.id] || '¡A darlo todo hoy!',
      exDone: rDone,
      exTotal: r.exercises.length,
      exPct: rPct,
      timeMin: r.exercises.length * 6,
      kcal: r.exercises.length * 40,
      exercises: r.exercises.map((ex, i) => ({
        idx: i,
        isDone: ex.done >= ex.sets,
        label: `${i + 1}. ${ex.name} (${ex.sets}x${ex.reps})`,
        done: ex.done,
        sets: ex.sets,
      })),
    };
  });

  const exWeekDaysCount = state.exWeek.filter((d) => d.done).length;
  const exWeekPct = Math.round((exWeekDaysCount / 7) * 100);

  return {
    exDoneCount,
    exTotalCount,
    exPct,
    routineCards,
    activeRoutineBlocks,
    exWeekDaysCount,
    exWeekPct,
    exLongestStreak: state.longestStreak,
  };
}
