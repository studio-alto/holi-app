export function computeSkinDerived(state) {
  const period = state.skincare.period;
  const skinList = state.skincare[period];
  const skinDoneCount = skinList.filter((st) => st.done).length;
  const skinPct = skinList.length ? Math.round((skinDoneCount / skinList.length) * 100) : 0;

  const skinSteps = skinList.map((st, i) => ({
    id: st.id,
    done: st.done,
    text: `${i + 1}. ${st.text}`,
    note: st.note,
  }));

  const nextSkinStep = state.skincare.am.find((st) => !st.done);
  const homeSkinNextText = state.skincare.am.length === 0
    ? 'Configura tu rutina'
    : nextSkinStep
      ? `${nextSkinStep.text} próximo paso`
      : 'Rutina de mañana completa';

  return {
    period,
    periodLabel: period === 'am' ? 'MAÑANA' : 'NOCHE',
    skinDone: skinDoneCount,
    skinTotal: skinList.length,
    skinPct,
    skinSteps,
    homeSkinNextText,
  };
}
