export function useDevocionalActions(update, addToast) {
  const markDevocionalRead = () => {
    update({ devocionalRead: true });
    addToast('✓ Devocional completado');
  };

  return { markDevocionalRead };
}
