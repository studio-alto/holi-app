// A short two-note chime synthesized with the Web Audio API — no audio
// asset to ship or maintain, respects the volume slider in Configuración.
let audioCtx;

export function playChime(volume = 50) {
  if (volume <= 0) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtx;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.value = Math.min(1, volume / 100) * 0.2;
    gain.connect(ctx.destination);

    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(gain);
      const start = now + i * 0.12;
      osc.start(start);
      osc.stop(start + 0.15);
    });
  } catch {
    // Web Audio unavailable (older browser, autoplay policy) — silently skip
  }
}
