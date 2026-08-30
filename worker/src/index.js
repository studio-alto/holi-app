import { buildPushHTTPRequest } from '@pushforge/builder';

const ADMIN_CONTACT = 'mailto:hello@holi-wellness.com';

const REMINDER_COPY = {
  med: (item) => ({
    title: `💊 ¡Hora de tu ${item.label}!`,
    body: `${item.dose || ''}${item.notes ? ' · ' + item.notes : ''}`.trim() || 'Es hora de tu medicamento.',
  }),
  sun: () => ({ title: '☀️ ¡Bloqueador solar!', body: 'No olvides tu SPF antes de salir.' }),
  water: () => ({ title: '💧 ¡Hora de hidratarte!', body: 'Un vaso de agua ahora te hace bien.' }),
  exercise: () => ({ title: '💪 ¡Hora de tu rutina!', body: 'No pierdas tu racha, cada set cuenta.' }),
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

// { date: 'YYYY-MM-DD', hm: 'HH:MM' } in the device's own timezone, so a
// reminder scheduled for "08:00" fires at 8am local time, not UTC.
function nowInTZ(tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return { date: `${get('year')}-${get('month')}-${get('day')}`, hm: `${get('hour')}:${get('minute')}` };
  } catch {
    const d = new Date();
    return {
      date: d.toISOString().slice(0, 10),
      hm: `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`,
    };
  }
}

async function sendPush(env, subscription, item) {
  const copy = (REMINDER_COPY[item.type] || REMINDER_COPY.med)(item);
  const { endpoint, headers, body } = await buildPushHTTPRequest({
    privateJWK: JSON.parse(env.VAPID_PRIVATE_KEY),
    subscription,
    message: {
      payload: { ...copy, url: '/' },
      adminContact: ADMIN_CONTACT,
      options: { ttl: 3600, urgency: 'high' },
    },
  });
  return fetch(endpoint, { method: 'POST', headers, body });
}

async function processEntry(env, storageKey) {
  const raw = await env.HOLI_PUSH.get(storageKey);
  if (!raw) return;

  const entry = JSON.parse(raw);
  const { date, hm } = nowInTZ(entry.tz);
  entry.lastSent = entry.lastSent || {};

  let changed = false;
  let expired = false;

  for (const item of entry.schedule || []) {
    if (item.time !== hm) continue;
    const sentKey = `${item.type}:${item.label}`;
    if (entry.lastSent[sentKey] === date) continue;

    try {
      const res = await sendPush(env, entry.subscription, item);
      if (res.status === 404 || res.status === 410) {
        expired = true;
        break;
      }
      entry.lastSent[sentKey] = date;
      changed = true;
    } catch (err) {
      // A bad subscription or a transient signing/network error shouldn't
      // stop the other reminders in this entry (or other people's entries)
      // from being processed this minute — just skip this one and retry
      // next run.
      console.error(`push failed for ${sentKey}:`, err);
    }
  }

  if (expired) {
    await env.HOLI_PUSH.delete(storageKey);
  } else if (changed) {
    await env.HOLI_PUSH.put(storageKey, JSON.stringify(entry));
  }
}

async function handleSubscribe(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid JSON' }, 400);
  }

  const { subscription, schedule, tz } = payload || {};
  if (!subscription || !subscription.endpoint) {
    return json({ error: 'missing subscription' }, 400);
  }

  const storageKey = subscription.endpoint;
  const existingRaw = await env.HOLI_PUSH.get(storageKey);
  const existing = existingRaw ? JSON.parse(existingRaw) : {};

  await env.HOLI_PUSH.put(
    storageKey,
    JSON.stringify({
      subscription,
      schedule: schedule || [],
      tz: tz || 'UTC',
      lastSent: existing.lastSent || {},
    })
  );

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      return handleSubscribe(request, env);
    }

    return json({ error: 'not found' }, 404);
  },

  async scheduled(event, env, ctx) {
    const list = await env.HOLI_PUSH.list();
    for (const key of list.keys) {
      ctx.waitUntil(processEntry(env, key.name));
    }
  },
};
