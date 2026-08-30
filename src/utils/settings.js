const LEGAL_DEFS = [
  { key: 'soporte', label: 'Contactar soporte', content: 'Escríbenos a hello@holi-wellness.com contándonos tu problema. Puedes adjuntar logs de depuración desde esta pantalla si el equipo te lo solicita.' },
  { key: 'terminos', label: 'Términos de servicio', content: 'Al usar HOLÍ aceptas estos términos. Las suscripciones se renuevan automáticamente salvo cancelación. Podemos actualizar estos términos; te avisaremos de cambios relevantes.' },
  { key: 'privacidad', label: 'Política de privacidad', content: 'Recopilamos solo los datos necesarios para el funcionamiento de la app. Puedes solicitar acceso, eliminación o portabilidad de tus datos. Usamos Firebase y Stripe como proveedores externos. Contacto: privacy@holi-wellness.com.' },
  { key: 'reembolsos', label: 'Política de reembolsos', content: 'Garantía de satisfacción de 7 días desde la compra. Para solicitar un reembolso escríbenos a soporte; el procesamiento toma 3-5 días hábiles.' },
  { key: 'reportar', label: 'Reportar un problema', content: 'Cuéntanos qué pasó: tipo de problema, descripción y, si quieres, incluye logs de depuración y tu email de contacto. Enviaremos tu reporte a nuestro equipo.' },
];

const DND_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const NOTIF_CAT_DEFS = [
  { key: 'meds', label: 'Medicamentos', sub: 'Alerta para tus medicamentos' },
  { key: 'sun', label: 'Bloqueador solar', sub: 'Recordatorio para bloqueador' },
  { key: 'water', label: 'Agua', sub: 'Recordatorio para beber agua' },
  { key: 'exercise', label: 'Ejercicio', sub: 'Recordatorio para ejercicio' },
  { key: 'diary', label: 'Momento de hoy', sub: 'Inspiración diaria' },
];

export function getNotifCats(notif) {
  return NOTIF_CAT_DEFS.map((c) => ({ ...c, on: notif.cats[c.key], vib: notif.vib[c.key] }));
}

// Personalizes the per-category reminder toggles using the answers given
// during onboarding, instead of generic defaults — a category only starts
// on if the user actually opted into that habit AND asked for reminders.
export function personalizeNotifCats(state) {
  return {
    meds: !!(state.obMedsOn && state.obMedReminders),
    sun: !!(state.obSkinOn && state.obSpfOn && state.obSpfReminder),
    water: false,
    exercise: !!(state.obExOn && state.obExReminders),
    diary: false,
  };
}

export function computeAccountInfo(state) {
  const isPremium = state.obPlanType === 'monthly' || state.obPlanType === 'annual';
  return {
    name: state.obName || 'Invitada',
    email: state.acctEmail || state.obEmail || 'sin correo registrado',
    isPremium,
    isFree: !isPremium,
    planLabel: state.obPlanType === 'monthly' ? 'Premium Mensual' : state.obPlanType === 'annual' ? 'Premium Anual' : 'Gratuita',
    planStatus: isPremium ? 'Activo' : 'Sin suscripción',
    planPrice: state.obPlanType === 'monthly' ? '$7.99/mes' : state.obPlanType === 'annual' ? '$64.99/año' : '$0',
    planRenewal: isPremium ? 'Próxima renovación: en 7 días (fin del trial)' : 'Sin renovación programada',
    paymentHistory: isPremium
      ? [{ date: '04 ago 2026', plan: state.obPlanType === 'annual' ? 'Anual' : 'Mensual', amount: state.obPlanType === 'annual' ? '$64.99' : '$7.99', status: 'Pagado' }]
      : [],
  };
}

export function getDndDayChips(dndDays) {
  return DND_DAYS.map((day) => ({ day, on: dndDays[day] }));
}

export function getLegalItems(legalOpenKey) {
  return LEGAL_DEFS.map((li) => ({ ...li, open: legalOpenKey === li.key }));
}

function csvEscape(value) {
  const str = String(value ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function csvRow(fields) {
  return `${fields.map(csvEscape).join(',')}\n`;
}

// Flat, generic CSV dump of everything meaningful in state — organized in
// sections so it stays readable, but with no fragile per-field schema to
// keep in sync as the app's state shape evolves.
export function exportStateAsCsv(state) {
  let csv = csvRow(['HOLÍ — Exportación de datos', new Date().toLocaleString('es-ES')]);
  csv += '\n';

  csv += csvRow(['Perfil']);
  csv += csvRow(['Nombre', state.obName || '']);
  csv += csvRow(['Edad', state.obAge || '']);
  csv += csvRow(['País', state.obCountry || '']);
  csv += csvRow(['Racha (días)', state.streak]);
  csv += '\n';

  csv += csvRow(['Agua']);
  csv += csvRow(['Hoy (ml)', state.waterTodayMl]);
  csv += csvRow(['Meta (ml)', state.waterGoalMl]);
  csv += '\n';

  csv += csvRow(['Medicamentos']);
  csv += csvRow(['Nombre', 'Dosis', 'Hora', 'Frecuencia', 'Tomado hoy']);
  state.meds.forEach((m) => {
    csv += csvRow([m.name, m.dose, m.time, m.freq, m.taken ? 'Sí' : 'No']);
  });
  csv += '\n';

  csv += csvRow(['Ejercicio']);
  csv += csvRow(['Rutina', 'Ejercicio', 'Series completadas', 'Series totales']);
  state.routines
    .filter((r) => state.selectedRoutineIds.includes(r.id))
    .forEach((r) => {
      r.exercises.forEach((ex) => {
        csv += csvRow([r.name, ex.name, ex.done, ex.sets]);
      });
    });
  csv += '\n';

  csv += csvRow(['Piel']);
  csv += csvRow(['Periodo', 'Paso', 'Completado']);
  ['am', 'pm'].forEach((period) => {
    state.skincare[period].forEach((step) => {
      csv += csvRow([period === 'am' ? 'Mañana' : 'Noche', step.text, step.done ? 'Sí' : 'No']);
    });
  });
  csv += '\n';

  csv += csvRow(['Diario']);
  csv += csvRow(['Fecha', 'Estado de ánimo', 'Entrada']);
  state.diary.entries.forEach((e) => {
    csv += csvRow([e.date, e.mood, e.text]);
  });

  return csv;
}
