import { playChime } from '../utils/sound';
import { isQuietHours } from '../utils/notifications';

export function useAlarmActions(state, update, addToast) {
  const maybeChime = () => {
    if (state.notif.master && !isQuietHours(state.notif)) {
      playChime(state.soundVolume);
    }
  };

  const triggerMedAlarm = (medId) => {
    const m = medId ? state.meds.find((x) => x.id === medId) : state.meds[0];
    if (!m) return;
    update({ alarmToast: { type: 'med', medId: m.id, name: m.name, dose: m.dose, time: m.time, notes: m.notes } });
    maybeChime();
  };

  const triggerSunscreenAlarm = () => {
    update({ alarmToast: { type: 'sun' } });
    maybeChime();
  };

  const triggerWaterAlarm = () => {
    const pct = Math.min(100, Math.round((state.waterTodayMl / state.waterGoalMl) * 100));
    update({ alarmToast: { type: 'water', pct, amount: state.waterQuickAmount } });
    maybeChime();
  };

  const triggerExerciseAlarm = () => {
    const activeRoutine = state.routines.find((r) => state.selectedRoutineIds.includes(r.id));
    update({ alarmToast: { type: 'exercise', routineName: activeRoutine ? activeRoutine.name : null } });
    maybeChime();
  };

  const alarmTaken = () => {
    const a = state.alarmToast;
    if (!a) return;
    if (a.type === 'med') {
      update((prev) => ({ meds: prev.meds.map((m) => (m.id === a.medId ? { ...m, taken: true } : m)), alarmToast: null }));
      addToast('✓ Medicamento registrado');
    } else if (a.type === 'sun') {
      update((prev) => ({
        skincare: { ...prev.skincare, am: prev.skincare.am.map((st) => (st.text === 'Protector solar' ? { ...st, done: true } : st)) },
        alarmToast: null,
      }));
      addToast('✓ ¡Protegida!');
    } else if (a.type === 'water') {
      const amount = a.amount || state.waterQuickAmount;
      update((prev) => ({ waterTodayMl: prev.waterTodayMl + amount, alarmToast: null }));
      addToast(`✓ +${amount}ml agregados`);
    } else if (a.type === 'exercise') {
      update({ alarmToast: null });
      addToast('✓ ¡A por tu rutina! 💪');
    }
  };

  const alarmSnooze = () => {
    update({ alarmToast: null });
    addToast('Te recordaremos en 10 min ⏰');
  };

  const alarmCancel = () => update({ alarmToast: null });

  return { triggerMedAlarm, triggerSunscreenAlarm, triggerWaterAlarm, triggerExerciseAlarm, alarmTaken, alarmSnooze, alarmCancel };
}
