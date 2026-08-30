const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

export function todayLabel(date = new Date()) {
  return `${DAY_LABELS[date.getDay()]} ${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`;
}

export function buildWeekDays(date = new Date(), category) {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const isToday = d.toDateString() === date.toDateString();
    const isPast = d < date && !isToday;
    const isFuture = d > date;

    return {
      label: DAY_LABELS[d.getDay()],
      isToday,
      isDone: isPast,
      isFuture,
      icon: isToday ? category.icon : null,
      iconColor: category.color,
      cardBg: isToday ? '#FFFFFF' : 'transparent',
      circleBg: isPast ? category.doneColor : isToday ? category.bg : 'var(--surface2)',
    };
  });
}
