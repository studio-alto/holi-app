export const MED_COLORS = ['#d4847a', '#9b8ec4', '#7aab90', '#c4954a', '#e8a87a'];

export const MED_COLOR_GRADIENTS = {
  '#d4847a': 'linear-gradient(135deg,#d4847a,#e8a87a)',
  '#9b8ec4': 'linear-gradient(135deg,#9b8ec4,#c9bfe0)',
  '#7aab90': 'linear-gradient(135deg,#8fc79e,#6fae82)',
  '#c4954a': 'linear-gradient(135deg,#c4954a,#e8c99a)',
  '#e8a87a': 'linear-gradient(135deg,#e8a87a,#FCB69F)',
};

export const MED_TYPE_OPTIONS = ['Anticonceptivo', 'Vitamina', 'Recetado', 'Otro'];
export const MED_FREQ_OPTIONS = ['Diario', 'Semanal', 'Cada 8 horas', 'Cada 12 horas'];

export const emptyMedForm = () => ({ name: '', type: 'Vitamina', dose: '', freq: 'Diario', time: '08:00', notes: '', color: '#d4847a' });
