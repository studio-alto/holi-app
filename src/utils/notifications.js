// Whether "right now" falls inside the person's configured Do Not Disturb window.
export function isQuietHours(notif) {
  if (!notif.dnd) return false;
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const [fh, fm] = notif.dndFrom.split(':').map(Number);
  const [th, tm] = notif.dndTo.split(':').map(Number);
  const from = fh * 60 + fm;
  const to = th * 60 + tm;
  return from <= to ? cur >= from && cur < to : cur >= from || cur < to;
}
