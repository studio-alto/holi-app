// exWeek is Monday-first (L M X J V S D); JS getDay() is Sunday-first.
const todayWeekIdx = () => (new Date().getDay() + 6) % 7;

const isRoutineDone = (r) => r.exercises.every((ex) => ex.done >= ex.sets);

// A day counts as trained once every selected routine is fully done.
function markTodayIfAllDone(prev, routines) {
  const active = routines.filter((r) => prev.selectedRoutineIds.includes(r.id));
  if (!active.length || !active.every(isRoutineDone)) return prev.exWeek;
  const idx = todayWeekIdx();
  return prev.exWeek.map((d, i) => (i === idx ? { ...d, done: true } : d));
}

export function useExerciseActions(state, update, addToast) {
  const toggleRoutineSelection = (id) => {
    const has = state.selectedRoutineIds.includes(id);
    if (has && state.selectedRoutineIds.length === 1) {
      addToast('Elige al menos una rutina');
      return;
    }
    update((prev) => ({
      selectedRoutineIds: has ? prev.selectedRoutineIds.filter((x) => x !== id) : [...prev.selectedRoutineIds, id],
    }));
  };

  const incrementExercise = (routineId, idx) => {
    update((prev) => {
      const routines = prev.routines.map((r) =>
        r.id !== routineId
          ? r
          : { ...r, exercises: r.exercises.map((ex, i) => (i === idx ? { ...ex, done: Math.min(ex.sets, ex.done + 1) } : ex)) }
      );
      return { routines, exWeek: markTodayIfAllDone(prev, routines) };
    });
  };

  const completeRoutine = () => {
    const active = state.routines.filter((r) => state.selectedRoutineIds.includes(r.id));
    if (active.every(isRoutineDone)) {
      addToast('Ya completaste tu rutina de hoy ✓');
      return;
    }
    update((prev) => {
      const routines = prev.routines.map((r) =>
        prev.selectedRoutineIds.includes(r.id) ? { ...r, exercises: r.exercises.map((ex) => ({ ...ex, done: ex.sets })) } : r
      );
      return { routines, exWeek: markTodayIfAllDone(prev, routines) };
    });
    addToast('✓ ¡Rutina completada! 💪');
  };

  return { toggleRoutineSelection, incrementExercise, completeRoutine };
}
