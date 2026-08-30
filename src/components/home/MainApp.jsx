import { useEffect, useMemo } from 'react';
import { FlameStreakIcon, CircleProgressIcon, BellIcon } from '../icons/Icons';
import WeekStrip from './WeekStrip';
import BottomNav from './BottomNav';
import SaludModal from './SaludModal';
import Home from './Home';
import PlaceholderScreen from './PlaceholderScreen';
import AguaScreen from '../water/AguaScreen';
import MedsScreen from '../meds/MedsScreen';
import MedFormModal from '../meds/MedFormModal';
import EjercicioScreen from '../exercise/EjercicioScreen';
import PielScreen from '../skin/PielScreen';
import ProgresoScreen from '../progress/ProgresoScreen';
import SettingsScreen from '../settings/SettingsScreen';
import DiarioScreen from '../diary/DiarioScreen';
import DevocionalScreen from '../devocional/DevocionalScreen';
import NotificacionesScreen from '../notificaciones/NotificacionesScreen';
import AlarmToast from '../shared/AlarmToast';
import { buildWeekDays, todayLabel } from '../../utils/date';
import { getWeekStripCategory } from '../../utils/weekStripCategory';
import { useMedsActions } from '../../state/useMedsActions';
import { useAlarmActions } from '../../state/useAlarmActions';
import { syncSubscription } from '../../utils/push';

const NO_WEEK_STRIP_SCREENS = new Set(['home', 'diario', 'devocional', 'progreso', 'notificaciones', 'settings']);

export default function MainApp({ state, update, addToast, resetState }) {
  const today = useMemo(() => new Date(), []);
  const weekCategory = useMemo(() => getWeekStripCategory(state.screen), [state.screen]);
  const weekDays = useMemo(() => buildWeekDays(today, weekCategory), [today, weekCategory]);
  const label = useMemo(() => todayLabel(today), [today]);
  const meds = useMedsActions(state, update, addToast);
  const alarm = useAlarmActions(state, update, addToast);

  // Keep the Worker's copy of "when to remind this device" in sync whenever
  // the person edits a medication or a reminder time/toggle — debounced so
  // rapid edits (e.g. typing a dose) don't spam the network.
  const scheduleFingerprint = JSON.stringify({
    meds: state.meds.map((m) => [m.name, m.dose, m.time, m.notes]),
    cats: state.notif.cats,
    spf: state.skincare.spfReminderTime,
    water: state.waterReminderTime,
    exercise: state.exerciseReminderTime,
  });
  useEffect(() => {
    const t = setTimeout(() => {
      if (state.notif.master) syncSubscription(state);
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleFingerprint, state.notif.master]);

  const goTo = (screen) => update({ screen, saludModalOpen: false });
  const isHome = state.screen === 'home';
  const showQuote = !NO_WEEK_STRIP_SCREENS.has(state.screen);

  const openSalud = () => update({ saludModalOpen: true });
  const closeSalud = () => update({ saludModalOpen: false });

  const handleTabSelect = (id) => {
    if (id === 'salud') return openSalud();
    goTo(id);
  };
  const isTabActive = (id) => {
    if (id === 'salud') return state.saludModalOpen;
    return state.screen === id;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100%' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(8px)', padding: '16px 20px 12px', borderBottom: '0.5px solid var(--border)', backgroundColor: '#F7F1E3EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 300, fontSize: 24, lineHeight: 1, letterSpacing: 3, textTransform: 'uppercase', color: '#000000' }}>HOLÍ</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'linear-gradient(90deg, #91C2F4, #3788D3)', color: '#FFFFFF', padding: '5px 10px', borderRadius: 30, fontSize: 12.5, fontWeight: 100 }}>
              <FlameStreakIcon size={14} color="#FFFFFF" /> {state.streak} días
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{label}</div>
          </div>
        </div>
      </div>

      <div className="fade-in-up" style={{ flex: 1, overflowY: 'auto', padding: '16px 20px calc(90px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        {showQuote && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => goTo('progreso')} aria-label="Progreso" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', opacity: 0.8 }}>
                <CircleProgressIcon />
              </button>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '8px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{label}</div>
              <button onClick={() => goTo('settings')} aria-label="Notificaciones" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', opacity: 0.8 }}>
                <BellIcon />
              </button>
            </div>
            <WeekStrip days={weekDays} />
          </div>
        )}

        {isHome ? (
          <Home state={state} onNavigate={goTo} />
        ) : state.screen === 'agua' ? (
          <AguaScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'meds' ? (
          <MedsScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'ejercicio' ? (
          <EjercicioScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'piel' ? (
          <PielScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'progreso' ? (
          <ProgresoScreen state={state} onNavigate={goTo} />
        ) : state.screen === 'settings' ? (
          <SettingsScreen state={state} update={update} addToast={addToast} onNavigate={goTo} resetState={resetState} />
        ) : state.screen === 'diario' ? (
          <DiarioScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'devocional' ? (
          <DevocionalScreen state={state} update={update} addToast={addToast} onNavigate={goTo} />
        ) : state.screen === 'notificaciones' ? (
          <NotificacionesScreen state={state} onNavigate={goTo} />
        ) : (
          <PlaceholderScreen screen={state.screen} onBack={() => goTo('home')} />
        )}
      </div>

      <BottomNav isActive={isTabActive} onSelect={handleTabSelect} onDetails={() => goTo('progreso')} />

      {state.medModalOpen && (
        <MedFormModal
          title={state.editingMedId ? 'Editar medicamento' : 'Agregar medicamento'}
          form={state.medForm}
          onChange={meds.setMedForm}
          onCancel={meds.closeMedModal}
          onSave={meds.saveMed}
        />
      )}

      <AlarmToast alarm={state.alarmToast} onTaken={alarm.alarmTaken} onSnooze={alarm.alarmSnooze} onCancel={alarm.alarmCancel} />

      {state.saludModalOpen && <SaludModal state={state} onClose={closeSalud} onNavigate={goTo} />}
    </div>
  );
}
