import {
  BackIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  SoundIcon,
  VibrateIcon,
  GearIcon,
  SupportIcon,
  InfoIcon,
  ChevronDownIcon,
} from '../icons/Icons';
import Switch from '../shared/Switch';
import { computeAccountInfo, getDndDayChips, getLegalItems, getNotifCats, exportStateAsCsv } from '../../utils/settings';
import { downloadTextFile } from '../../utils/download';
import { subscribeToPush, syncSubscription } from '../../utils/push';

function AccordionButton({ icon, label, extra, open, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', background: 'var(--surface)', border: '0.5px solid var(--border)',
        borderRadius: 14, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, fontWeight: 600, color: 'var(--text)', letterSpacing: 0.2 }}>
        {icon}
        {label}
        {extra}
      </span>
      <span style={{ color: 'var(--text-3)', display: 'flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
        <ChevronDownIcon />
      </span>
    </button>
  );
}

function Panel({ children, style }) {
  return (
    <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border)' }} />;
}

function SubAccordionRow({ label, badge, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: '0.5px solid var(--border)' }}>
      <button onClick={onToggle} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {label}
          {badge}
        </span>
        <span style={{ color: 'var(--text-3)', display: 'flex', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <ChevronDownIcon size={14} />
        </span>
      </button>
      {open && <div style={{ padding: '0 16px 16px' }}>{children}</div>}
    </div>
  );
}

export default function SettingsScreen({ state, update, addToast, onNavigate, resetState }) {
  const account = computeAccountInfo(state);
  const dndDayChips = getDndDayChips(state.notif.dndDays);
  const notifCats = getNotifCats(state.notif);
  const legalItems = getLegalItems(state.legalOpen);

  const toggleSec = (key) => update((prev) => ({ settingsOpen: { ...prev.settingsOpen, [key]: !prev.settingsOpen[key] } }));
  const toggleSub = (key) => update((prev) => ({ generalSubOpen: { ...prev.generalSubOpen, [key]: !prev.generalSubOpen[key] } }));

  const toggleMaster = () => {
    const turningOn = !state.notif.master;
    update((prev) => ({ notif: { ...prev.notif, master: !prev.notif.master } }));
    if (turningOn) {
      subscribeToPush(state).then((granted) => {
        if (!granted) addToast('Activa los permisos de notificación en tu navegador');
      });
    }
  };

  const toggleDnd = () => update((prev) => ({ notif: { ...prev.notif, dnd: !prev.notif.dnd } }));
  const setDndFrom = (e) => update((prev) => ({ notif: { ...prev.notif, dndFrom: e.target.value } }));
  const setDndTo = (e) => update((prev) => ({ notif: { ...prev.notif, dndTo: e.target.value } }));
  const toggleDndDay = (day) => update((prev) => ({ notif: { ...prev.notif, dndDays: { ...prev.notif.dndDays, [day]: !prev.notif.dndDays[day] } } }));

  const toggleCat = (key) => {
    const turningOn = !state.notif.cats[key];
    update((prev) => ({ notif: { ...prev.notif, cats: { ...prev.notif.cats, [key]: !prev.notif.cats[key] } } }));
    if (turningOn && state.notif.master) syncSubscription(state);
  };

  const toggleVib = (key) => update((prev) => ({ notif: { ...prev.notif, vib: { ...prev.notif.vib, [key]: !prev.notif.vib[key] } } }));
  const setSoundVolume = (e) => update({ soundVolume: Number(e.target.value) });
  const toggleLegal = (key) => update((prev) => ({ legalOpen: prev.legalOpen === key ? null : key }));

  const exportCsv = () => {
    downloadTextFile(`holi-datos-${new Date().toISOString().slice(0, 10)}.csv`, exportStateAsCsv(state));
    addToast('✓ CSV descargado');
  };

  const deleteLocalData = () => {
    resetState();
    addToast('✓ Datos locales borrados');
  };

  const so = state.settingsOpen;
  const gs = state.generalSubOpen;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <button
        onClick={() => onNavigate('home')}
        aria-label="Volver"
        style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)' }}
      >
        <BackIcon />
      </button>

      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
        Configuración
        <SettingsIcon color="#91C2F4" />
      </div>

      {/* CUENTA */}
      <AccordionButton icon={<UserIcon size={17} strokeWidth={1.8} />} label="Cuenta" open={so.cuenta} onClick={() => toggleSec('cuenta')} />
      {so.cuenta && (
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{account.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{account.email}</div>
            </div>
            <button onClick={() => addToast('Editar perfil próximamente')} style={{ padding: '8px 12px', background: 'var(--surface2)', color: 'var(--text)', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              Editar
            </button>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{account.planLabel}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{account.planStatus} · {account.planPrice}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 1 }}>{account.planRenewal}</div>
            </div>
            <button onClick={() => addToast('Abriendo planes…')} style={{ padding: '8px 12px', background: '#91C2F4', color: '#fff', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer', flex: 'none' }}>
              Cambiar plan
            </button>
          </div>
          {account.isPremium && (
            <button onClick={() => addToast('Abriendo encuesta de cancelación…')} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
              Cancelar suscripción
            </button>
          )}
          <Divider />
          <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)' }}>Historial de pagos</div>
          {account.paymentHistory.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Sin pagos registrados</div>
          )}
          {account.paymentHistory.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-2)' }}>
              <div>{p.date} · {p.plan}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--text)' }}>{p.amount}</span>
                <span style={{ color: '#6FAE82' }}>{p.status}</span>
              </div>
            </div>
          ))}
          <button onClick={() => addToast('Abriendo historial completo…')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#91C2F4', fontSize: 12, cursor: 'pointer', padding: 0 }}>
            Ver historial completo
          </button>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Sesión activa</div>
            <button onClick={() => addToast('Sesión cerrada')} style={{ padding: '8px 12px', background: 'none', color: '#b8624f', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              Cerrar sesión
            </button>
          </div>
        </Panel>
      )}

      {/* NOTIFICACIONES */}
      <AccordionButton icon={<BellIcon size={17} strokeWidth={1.8} color="#91C2F4" />} label="Notificaciones" open={so.notif} onClick={() => toggleSec('notif')} />
      {so.notif && (
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Activar notificaciones</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Interruptor general</div>
            </div>
            <Switch checked={state.notif.master} onChange={toggleMaster} ariaLabel="Activar notificaciones" />
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>No molestar</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>De {state.notif.dndFrom} a {state.notif.dndTo}</div>
            </div>
            <Switch checked={state.notif.dnd} onChange={toggleDnd} ariaLabel="No molestar" />
          </div>
          {state.notif.dnd && (
            <>
              <div style={{ display: 'flex', gap: 8 }}>
                <input aria-label="Hora desde" type="time" value={state.notif.dndFrom} onChange={setDndFrom} style={{ flex: 1, padding: 10, borderRadius: 10, border: '0.5px solid var(--border)', fontSize: 16, background: 'var(--surface2)' }} />
                <input aria-label="Hora hasta" type="time" value={state.notif.dndTo} onChange={setDndTo} style={{ flex: 1, padding: 10, borderRadius: 10, border: '0.5px solid var(--border)', fontSize: 16, background: 'var(--surface2)' }} />
              </div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
                {dndDayChips.map((dd) => (
                  <button
                    key={dd.day}
                    aria-pressed={dd.on}
                    onClick={() => toggleDndDay(dd.day)}
                    style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${dd.on ? '#91C2F4' : 'var(--border)'}`, background: dd.on ? 'rgba(145,194,244,0.12)' : 'var(--surface)', color: dd.on ? '#3a6a8f' : 'var(--text-2)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                  >
                    {dd.day}
                  </button>
                ))}
              </div>
            </>
          )}
          <Divider />
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: 0.4 }}>RECORDATORIOS POR CATEGORÍA</div>
          {notifCats.map((c) => (
            <div
              key={c.key}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, padding: '8px 10px', background: c.on ? 'rgba(200,236,251,0.4)' : 'transparent' }}
            >
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{c.label}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{c.sub}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flex: 'none' }}>
                <button
                  aria-label={`Sonido: ${c.label}`}
                  aria-pressed={c.on}
                  onClick={() => toggleCat(c.key)}
                  style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: c.on ? 'rgba(145,194,244,0.18)' : 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <SoundIcon size={15} color={c.on ? '#91C2F4' : 'var(--text-3)'} />
                </button>
                <button
                  aria-label={`Vibración: ${c.label}`}
                  aria-pressed={c.vib}
                  onClick={() => toggleVib(c.key)}
                  style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: c.vib ? 'rgba(145,194,244,0.18)' : 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <VibrateIcon size={15} color={c.vib ? '#91C2F4' : 'var(--text-3)'} />
                </button>
              </div>
            </div>
          ))}
        </Panel>
      )}

      {/* SONIDO */}
      <AccordionButton icon={<SoundIcon />} label="Sonido" open={so.sonido} onClick={() => toggleSec('sonido')} />
      {so.sonido && (
        <Panel style={{ gap: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Elige el volumen que quieras</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: 0.4, marginTop: 4 }}>SONIDO DEL TEMA</div>
          <input aria-label="Volumen del sonido del tema" type="range" min="0" max="100" value={state.soundVolume} onChange={setSoundVolume} style={{ width: '100%', accentColor: '#91C2F4' }} />
        </Panel>
      )}

      {/* GENERAL */}
      <AccordionButton icon={<GearIcon />} label="General" open={so.general} onClick={() => toggleSec('general')} />
      {so.general && (
        <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
          <SubAccordionRow label="Exportar datos" open={gs.export} onToggle={() => toggleSub('export')}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => addToast('Generando PDF…')} style={{ flex: 1, padding: 10, background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
                Descargar PDF
              </button>
              <button onClick={exportCsv} style={{ flex: 1, padding: 10, background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
                Descargar CSV
              </button>
            </div>
          </SubAccordionRow>
          <div>
            <button onClick={() => toggleSub('delete')} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: '#b8624f' }}>Borrar datos locales</span>
              <span style={{ color: 'var(--text-3)', display: 'flex', transform: gs.delete ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <ChevronDownIcon size={14} />
              </span>
            </button>
            {gs.delete && (
              <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Esta acción no se puede revertir.</div>
                <button onClick={deleteLocalData} style={{ textAlign: 'left', padding: 10, background: 'none', border: '1px solid var(--border)', color: '#b8624f', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
                  Borrar datos locales
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SOPORTE & LEGAL */}
      <AccordionButton icon={<SupportIcon />} label="Soporte & Legal" open={so.soporte} onClick={() => toggleSec('soporte')} />
      {so.soporte && (
        <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 18, padding: '6px 16px' }}>
          {legalItems.map((li) => (
            <div key={li.key} style={{ borderBottom: '1px solid var(--border)' }}>
              <button onClick={() => toggleLegal(li.key)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '13px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 14, color: 'var(--text)' }}>{li.label}</span>
                <span style={{ color: 'var(--text-3)', display: 'flex', transform: li.open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <ChevronDownIcon size={14} />
                </span>
              </button>
              {li.open && <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, paddingBottom: 13, whiteSpace: 'pre-line' }}>{li.content}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ACERCA DE */}
      <AccordionButton icon={<InfoIcon size={17} />} label="Acerca de" open={so.acerca} onClick={() => toggleSec('acerca')} />
      {so.acerca && (
        <Panel>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>HOLÍ · v1.0.0<br />Build 2026.08.01 · PWA</div>
          <Divider />
          <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>Hecho para acompañarte cada día.</div>
          <Divider />
          <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)' }}>Síguenos</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12.5 }}>
            <a href="#" style={{ color: '#3a6a8f', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#3a6a8f', textDecoration: 'none' }}>TikTok</a>
            <a href="mailto:hello@holi-wellness.com" style={{ color: '#3a6a8f', textDecoration: 'none' }}>Email</a>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Última verificación: {state.lastUpdateCheck}</div>
            <button onClick={() => addToast('Estás en la última versión')} style={{ padding: '8px 12px', background: 'var(--surface2)', color: 'var(--text)', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
              Verificar
            </button>
          </div>
        </Panel>
      )}
    </div>
  );
}
