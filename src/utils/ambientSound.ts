/**
 * Generative ambient drone (Web Audio) — no audio files to download.
 * Off by default; only starts after an explicit user click.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function build() {
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 520;
  filter.Q.value = 0.6;
  filter.connect(master);
  master.connect(ctx.destination);

  [55, 82.5, 110.4, 164.8].forEach((f, i) => {
    const o = ctx!.createOscillator();
    o.type = i % 2 ? 'triangle' : 'sine';
    o.frequency.value = f;
    o.detune.value = (i - 1.5) * 6;
    const g = ctx!.createGain();
    g.gain.value = [0.5, 0.22, 0.16, 0.06][i];
    const lfo = ctx!.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.03;
    const lfoGain = ctx!.createGain();
    lfoGain.gain.value = g.gain.value * 0.5;
    lfo.connect(lfoGain).connect(g.gain);
    o.connect(g).connect(filter);
    o.start();
    lfo.start();
  });
}

export async function setAmbient(on: boolean) {
  if (on && !ctx) build();
  if (!ctx || !master) return;
  if (on && ctx.state === 'suspended') await ctx.resume();
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(on ? 0.05 : 0, t + 1.2);
  if (!on) setTimeout(() => ctx?.state === 'running' && master!.gain.value < 0.001 && ctx.suspend(), 1400);
}
