export function useDiaryActions(state, update, addToast) {
  const setMood = (emoji) => update((prev) => ({ diary: { ...prev.diary, mood: emoji } }));

  const setDiaryText = (e) => update((prev) => ({ diary: { ...prev.diary, text: e.target.value } }));

  const saveDiaryEntry = () => {
    if (!state.diary.text.trim()) return;
    update((prev) => {
      const entry = { id: Date.now(), date: 'hoy', mood: prev.diary.mood || '😊', text: prev.diary.text.trim() };
      return { diary: { mood: null, text: '', entries: [entry, ...prev.diary.entries] } };
    });
    addToast('✓ Entrada guardada');
  };

  return { setMood, setDiaryText, saveDiaryEntry };
}
