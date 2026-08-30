// Colors match the exact per-category icon/background hex values used on the
// Home dashboard cards, taken directly from the original design spec.
// doneColor is the fill for already-completed (checked) days in that
// category's calendar strip — blue for agua, purple for meds, orange for
// piel, and the same green used elsewhere on the ejercicio screen.
const CATEGORIES = {
  agua: { icon: 'drop', color: '#4c85ab', bg: '#e0f0fa', doneColor: '#4c85ab' },
  meds: { icon: 'pill', color: '#8676b0', bg: '#eeeafc', doneColor: '#8676b0' },
  ejercicio: { icon: 'weight', color: '#5c8a68', bg: '#e6f3d9', doneColor: '#6fae82' },
  piel: { icon: 'star', color: '#c9744a', bg: '#fdeadc', doneColor: '#e8a87a' },
};

const DEFAULT_CATEGORY = { icon: 'flame', color: 'var(--rose-dark)', bg: 'var(--rose-light)', doneColor: 'var(--sage)' };

export function getWeekStripCategory(screen) {
  return CATEGORIES[screen] || DEFAULT_CATEGORY;
}
