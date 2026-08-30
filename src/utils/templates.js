import { MED_COLORS, MED_TYPE_OPTIONS } from '../data/medOptions';

// Turns the onboarding answers into the actual starting medicamentos list —
// today that connection didn't exist: the app always seeded the same two
// unrelated sample medications regardless of what the person answered.
// One entry per medication type they selected; name/type stay fully
// editable afterwards through the existing add/edit/delete flow.
const MED_TEMPLATES = {
  recetados: { name: 'Medicamento recetado', type: 'Recetado' },
  vitaminas: { name: 'Vitamina', type: 'Vitamina' },
  suplementos: { name: 'Suplemento', type: 'Otro' },
  otros: { name: 'Otro medicamento', type: 'Otro' },
};

const MED_TIME_CYCLE = ['08:00', '14:00', '20:00'];

export function personalizeMeds(state) {
  if (!state.obMedsOn) return [];

  const types = state.obMedTypes.length ? state.obMedTypes : ['otros'];
  return types.map((typeKey, i) => {
    const tpl = MED_TEMPLATES[typeKey] || MED_TEMPLATES.otros;
    return {
      id: Date.now() + i,
      name: tpl.name,
      type: MED_TYPE_OPTIONS.includes(tpl.type) ? tpl.type : 'Otro',
      dose: '',
      freq: 'Diario',
      time: MED_TIME_CYCLE[i % MED_TIME_CYCLE.length],
      notes: '',
      color: MED_COLORS[i % MED_COLORS.length],
      taken: false,
    };
  });
}

// Same idea for la rutina de piel: arma la lista AM/PM real a partir de
// cuántos pasos dijeron tener y si usan bloqueador, en vez de mostrar
// siempre la misma rutina de ejemplo.
const AM_STEPS = [
  { text: 'Limpiador facial', note: 'Con agua tibia' },
  { text: 'Tónico', note: 'Piel preparada' },
  { text: 'Sérum vitamina C', note: 'Antioxidante' },
  { text: 'Crema hidratante', note: 'SPF 30+' },
];
const PM_STEPS = [
  { text: 'Desmaquillante', note: 'Doble limpieza' },
  { text: 'Limpiador facial', note: 'Con agua tibia' },
  { text: 'Tónico', note: 'Piel calmada' },
  { text: 'Crema de noche', note: 'Nutritiva' },
];

const AM_STEP_COUNTS = { '1-2 pasos': 2, '3-4 pasos': 4, '5+ pasos': 4 };
const PM_STEP_COUNTS = { '1-2 pasos': 2, '3-4 pasos': 4, '5-6 pasos': 4, '7+ pasos': 4 };

function withIds(steps) {
  return steps.map((s, i) => ({ id: i + 1, text: s.text, note: s.note, done: false }));
}

export function personalizeSkincare(state) {
  if (!state.obSkinOn) return { am: [], pm: [] };

  const amCount = AM_STEP_COUNTS[state.obSkinAM] ?? AM_STEPS.length;
  let am = AM_STEPS.slice(0, amCount);
  if (state.obSpfOn) {
    const time = state.skincare.spfReminderTime || '08:00';
    const note = state.obSpfReminder ? `Última capa · recordatorio ${time}` : 'Última capa';
    am = [...am, { text: 'Protector solar', note }];
  }

  const pmCount = PM_STEP_COUNTS[state.obSkinPM] ?? PM_STEPS.length;
  const pm = PM_STEPS.slice(0, pmCount);

  return { am: withIds(am), pm: withIds(pm) };
}
