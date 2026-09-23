import { useEffect, useMemo } from 'react';
import { FlameStreakIcon, BellIcon, GearIcon } from '../icons/Icons';
import WeekStrip from './WeekStrip';
import BottomNav from './BottomNav';
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
import { buildWeekDays, todayLabel } from '../../utils/date';
import { getWeekStripCategory } from '../../utils/weekStripCategory';
import { useMedsActions } from '../../state/useMedsActions';
import { syncSubscription } from '../../utils/push';

const NO_WEEK_STRIP_SCREENS = new Set(['home', 'diario', 'devocional', 'progreso', 'notificaciones', 'settings']);

export default function MainApp({ state, update, addToast, resetState }) {
  const today = useMemo(() => new Date(), []);
  const weekCategory = useMemo(() => getWeekStripCategory(state.screen), [state.screen]);
  const weekDays = useMemo(() => buildWeekDays(today, weekCategory), [today, weekCategory]);
  const label = useMemo(() => todayLabel(today), [today]);
  const meds = useMedsActions(state, update, addToast);

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
      syncSubscription(state);
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleFingerprint, state.notif.master]);

  // The page itself scrolls now (no inner scroll box), so a new screen has to
  // start back at the top instead of inheriting the previous one's offset.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.screen]);

  const goTo = (screen) => update({ screen });
  const isHome = state.screen === 'home';
  const showQuote = !NO_WEEK_STRIP_SCREENS.has(state.screen);
  const isTabActive = (id) => state.screen === id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, zIndex: 20, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: 'calc(16px + env(safe-area-inset-top, 0px)) 20px 12px', borderBottom: '0.5px solid var(--border)', backgroundColor: '#EEF1F0EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => goTo('home')}
            aria-label="Inicio"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img src="/holi-wordmark.png" alt="Holí" style={{ height: 34, width: 'auto', display: 'block' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#91C2F4', color: '#FFFFFF', padding: '5px 10px', borderRadius: 30, fontSize: 12.5, fontWeight: 100 }}>
              <FlameStreakIcon size={14} color="#FFFFFF" /> {state.streak} días
            </div>
            <button onClick={() => goTo('notificaciones')} aria-label="Notificaciones" style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', opacity: 0.8, flexShrink: 0 }}>
              <BellIcon size={16} />
            </button>
            <button onClick={() => goTo('settings')} aria-label="Configuración" style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', opacity: 0.8, flexShrink: 0 }}>
              <GearIcon size={16} color="var(--text-2)" />
            </button>
          </div>
        </div>
      </div>

      {/* Reserves the fixed header's height in CSS (16 top + 34 row + 12 bottom +
          0.5 border, plus the status-bar inset the header pads itself with) —
          a JS-measured height stayed short on iPhone and hid the first row. */}
      <div aria-hidden style={{ height: 'calc(63px + env(safe-area-inset-top, 0px))', flexShrink: 0 }} />

      <div className="fade-in-up" style={{ flex: 1, padding: '16px 20px calc(104px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        {showQuote && (
          <WeekStrip days={weekDays} label={label} />
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

      <BottomNav isActive={isTabActive} onSelect={goTo} onDetails={() => goTo('progreso')} />

      {state.medModalOpen && (
        <MedFormModal
          title={state.editingMedId ? 'Editar medicamento' : 'Agregar medicamento'}
          form={state.medForm}
          onChange={meds.setMedForm}
          onCancel={meds.closeMedModal}
          onSave={meds.saveMed}
        />
      )}
    </div>
  );
}
