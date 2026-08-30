import { emptyMedForm } from '../data/medOptions';

export function useMedsActions(state, update, addToast) {
  const openAddMed = () => update({ medModalOpen: true, editingMedId: null, medForm: emptyMedForm() });

  const editMed = (id) => {
    const m = state.meds.find((x) => x.id === id);
    if (!m) return;
    update({
      medModalOpen: true,
      editingMedId: id,
      medForm: { name: m.name, type: m.type, dose: m.dose, freq: m.freq, time: m.time, notes: m.notes, color: m.color },
    });
  };

  const closeMedModal = () => update({ medModalOpen: false });

  const saveMed = () => {
    update((prev) => {
      if (!prev.medForm.name.trim()) return { medModalOpen: false };
      if (prev.editingMedId) {
        return { meds: prev.meds.map((m) => (m.id === prev.editingMedId ? { ...m, ...prev.medForm } : m)), medModalOpen: false };
      }
      const newMed = { id: Date.now(), taken: false, ...prev.medForm };
      return { meds: [...prev.meds, newMed], medModalOpen: false };
    });
    addToast('✓ Medicamento guardado');
  };

  const setMedForm = (form) => update({ medForm: form });

  const toggleMedTaken = (id) => update((prev) => ({ meds: prev.meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)) }));

  const removeMed = (id) => {
    update((prev) => ({ meds: prev.meds.filter((m) => m.id !== id) }));
    addToast('✓ Medicamento eliminado');
  };

  const toggleMedEdit = () => update((prev) => ({ medEditMode: !prev.medEditMode }));

  return {
    openAddMed,
    editMed,
    closeMedModal,
    saveMed,
    setMedForm,
    toggleMedTaken,
    removeMed,
    toggleMedEdit,
  };
}
