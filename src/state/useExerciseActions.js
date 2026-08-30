export function useExerciseActions(update, addToast) {
  const toggleRoutineSelection = (id) => {
    update((prev) => {
      const has = prev.selectedRoutineIds.includes(id);
      const next = has ? prev.selectedRoutineIds.filter((x) => x !== id) : [...prev.selectedRoutineIds, id];
      return { selectedRoutineIds: next.length ? next : prev.selectedRoutineIds };
    });
  };

  const incrementExercise = (routineId, idx) => {
    update((prev) => ({
      routines: prev.routines.map((r) =>
        r.id !== routineId
          ? r
          : { ...r, exercises: r.exercises.map((ex, i) => (i === idx ? { ...ex, done: Math.min(ex.sets, ex.done + 1) } : ex)) }
      ),
    }));
  };

  const completeRoutine = () => addToast('✓ ¡Rutina completada! 💪');

  return { toggleRoutineSelection, incrementExercise, completeRoutine };
}
