import { DEVOCIONALES } from '../data/devocionales';
import { todayLabel } from './date';

export function computeDevocionalDerived(state) {
  const dev = DEVOCIONALES[state.devocionalIdx % DEVOCIONALES.length];

  return {
    date: todayLabel(),
    title: dev.title,
    text: dev.text,
    reflection: dev.reflection,
    teaser: dev.text.length > 70 ? `${dev.text.slice(0, 70)}…` : dev.text,
    btnBg: state.devocionalRead ? 'var(--surface2)' : 'var(--grad-sky)',
    btnColor: state.devocionalRead ? 'var(--text-3)' : '#fff',
    btnText: state.devocionalRead ? 'Completado hoy' : 'Marcar como leído',
  };
}
