import { useMemo } from 'react';
import { cn } from '../../utils/cn';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic abstract artwork in brand colours — used when no real image exists. */
export function GeneratedCover({ seed, label, className }: { seed: string; label?: string; className?: string }) {
  const art = useMemo(() => {
    const r = rng(hash(seed));
    const cx = 260 + r() * 280;
    const cy = 160 + r() * 180;
    const rings = Array.from({ length: 7 }, (_, i) => ({ r: 40 + i * (28 + r() * 16), o: 0.08 + r() * 0.22, dash: r() > 0.5 }));
    const arcs = Array.from({ length: 4 }, () => ({ r: 80 + r() * 200, a0: r() * 360, len: 40 + r() * 120 }));
    const dots = Array.from({ length: 36 }, () => ({ x: r() * 800, y: r() * 500, s: r() * 1.6 + 0.4, o: r() * 0.6 }));
    return { cx, cy, rings, arcs, dots };
  }, [seed]);

  const arc = (r: number, a0: number, len: number) => {
    const p = (a: number) => [art.cx + r * Math.cos((a * Math.PI) / 180), art.cy + r * Math.sin((a * Math.PI) / 180)];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a0 + len);
    return `M${x0} ${y0} A${r} ${r} 0 ${len > 180 ? 1 : 0} 1 ${x1} ${y1}`;
  };
  const id = `g${hash(seed).toString(36)}`;

  return (
    <svg className={cn('gen-cover', className)} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label ? `Abstract artwork for ${label}` : 'Abstract artwork'}>
      <defs>
        <radialGradient id={id} cx={art.cx / 800} cy={art.cy / 500} r="0.55">
          <stop offset="0" stopColor="#F4B400" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#D9A441" stopOpacity="0.16" />
          <stop offset="1" stopColor="#050514" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="#0B0B18" />
      <rect width="800" height="500" fill={`url(#${id})`} />
      {art.rings.map((c, i) => (
        <circle key={i} cx={art.cx} cy={art.cy} r={c.r} fill="none" stroke="#C4C5CE" strokeOpacity={c.o} strokeDasharray={c.dash ? '2 6' : undefined} />
      ))}
      {art.arcs.map((a, i) => (
        <path key={i} d={arc(a.r, a.a0, a.len)} fill="none" stroke="#F4B400" strokeOpacity="0.8" strokeWidth="1.5" />
      ))}
      {art.dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#fff" opacity={d.o} />
      ))}
    </svg>
  );
}
