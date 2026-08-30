export const MOODS = [
  { emoji: '😊', label: 'Feliz', key: 'happy' },
  { emoji: '😌', label: 'Tranquila', key: 'calm' },
  { emoji: '😐', label: 'Neutral', key: 'neutral' },
  { emoji: '😔', label: 'Triste', key: 'sad' },
  { emoji: '😴', label: 'Cansada', key: 'sleepy' },
];

const MOOD_COLOR_MAP = {
  '😊': { c: '#4c9a6a', bg: '#e3f3e7' },
  '😌': { c: '#5b9bd5', bg: '#e7f1fb' },
  '😐': { c: '#c4954a', bg: '#f7ecdb' },
  '😔': { c: '#5b7ea3', bg: '#e6edf4' },
  '😴': { c: '#9b8ec4', bg: '#eeeafa' },
};

const MOOD_KEY_BY_EMOJI = Object.fromEntries(MOODS.map((m) => [m.emoji, m.key]));

export function computeDiaryDerived(state) {
  const moods = MOODS.map((m) => {
    const selected = state.diary.mood === m.emoji;
    const colors = MOOD_COLOR_MAP[m.emoji];
    return {
      emoji: m.emoji,
      label: m.label,
      moodKey: m.key,
      selected,
      iconColor: selected ? colors.c : 'var(--text-2)',
      bg: selected ? colors.bg : 'var(--surface2)',
      border: selected ? colors.c : 'var(--border)',
    };
  });

  const entries = state.diary.entries.map((e) => ({ ...e, moodKey: MOOD_KEY_BY_EMOJI[e.mood] || 'neutral' }));

  return { moods, entries };
}
