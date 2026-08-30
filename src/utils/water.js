export function goalLabel(state) {
  const thermo = Number(state.customThermoInput) || Number(state.thermoSize) || 1000;
  if (state.obWaterUnit === 'vasos') return '8 vasos (2000 ml)';
  const refills = Math.max(1, Math.ceil(2000 / thermo));
  return `${refills} termos de ${thermo} ml (2000 ml)`;
}

export function waterMood(pct) {
  if (pct >= 100) return { mood: 'happy', msg: '¡Meta cumplida! Sigue así' };
  if (pct >= 60) return { mood: 'calm', msg: 'Vas muy bien hoy' };
  if (pct >= 30) return { mood: 'neutral', msg: 'Puedes tomar un poco más' };
  return { mood: 'sad', msg: 'Recuerda hidratarte' };
}

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function buildWaterHistory(historyMl, todayMl, goalMl) {
  const allMl = [...historyMl, todayMl];
  return allMl.map((ml, i) => ({
    day: DAY_LABELS[i] ?? '',
    pct: Math.max(4, Math.min(100, Math.round((ml / goalMl) * 100))),
  }));
}
