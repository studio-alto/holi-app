// Real browser push notifications via a small Cloudflare Worker (see /worker).
// No accounts, no email — a device's push subscription endpoint IS its id.
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
const WORKER_URL = import.meta.env.VITE_PUSH_WORKER_URL || '';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export function isPushSupported() {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    return await navigator.serviceWorker.register('/sw.js');
  } catch {
    return null;
  }
}

// Builds the list of real per-item reminder times currently configured.
// Only medications have a genuinely per-item time today; agua/piel/ejercicio
// use one daily reminder time each, gated by their "Recordatorios por
// categoría" toggle in Configuración.
export function buildReminderSchedule(state) {
  const schedule = [];

  state.meds.forEach((m) => {
    if (!m.time) return;
    schedule.push({ type: 'med', time: m.time, label: m.name, dose: m.dose, notes: m.notes });
  });

  if (state.notif.cats.sun) {
    schedule.push({ type: 'sun', time: state.skincare.spfReminderTime || '08:00', label: 'Bloqueador solar' });
  }
  if (state.notif.cats.water) {
    schedule.push({ type: 'water', time: state.waterReminderTime || '12:00', label: 'Agua' });
  }
  if (state.notif.cats.exercise) {
    schedule.push({ type: 'exercise', time: state.exerciseReminderTime || '18:00', label: 'Ejercicio' });
  }

  return schedule;
}

export async function syncSubscription(state) {
  if (!WORKER_URL || !isPushSupported()) return;
  if (Notification.permission !== 'granted') return;

  const reg = await registerServiceWorker();
  const sub = reg && (await reg.pushManager.getSubscription());
  if (!sub) return;

  try {
    await fetch(`${WORKER_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: sub.toJSON(),
        schedule: buildReminderSchedule(state),
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    });
  } catch {
    // Offline or Worker unreachable — best-effort, will retry on next sync
  }
}

// Requests permission (if needed), subscribes this device, and sends the
// current reminder schedule to the Worker. Call whenever the person turns
// notifications on.
export async function subscribeToPush(state) {
  if (!isPushSupported() || !VAPID_PUBLIC_KEY) return false;

  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  if (permission !== 'granted') return false;

  const reg = await registerServiceWorker();
  if (!reg) return false;

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
  }

  await syncSubscription(state);
  return true;
}
