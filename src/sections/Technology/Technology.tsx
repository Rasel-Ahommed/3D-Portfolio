import { useMemo, useRef } from 'react';
import { SectionHead } from '../../components/ui/SectionHead';
import { gsap } from '../../animations/gsap';
import { useGsap } from '../../hooks/useGsap';
import { technologies } from '../../data';

const GROUPS = ['Frontend', 'Backend', 'Data', 'Mobile'];

/** Short monogram badge for each technology (no third-party logos). */
const MONO: Record<string, string> = { React: 'Re', TypeScript: 'TS', JavaScript: 'JS', 'Three.js': '3D', Laravel: 'Lv', PHP: 'Php', Python: 'Py', 'Node.js': 'No', MySQL: 'SQL', Kotlin: 'Kt', Android: 'An' };
const monogram = (n: string) => MONO[n] ?? n.slice(0, 2);

/** Technology ecosystem: an SVG constellation linking real tools to their layer. */
export function Technology() {
  const ref = useRef<HTMLElement>(null);
  const layout = useMemo(() => {
    const W = 1000;
    const H = 560;
    const hubs = GROUPS.map((g, i) => ({ g, x: 140 + i * 240, y: H / 2 + (i % 2 ? 70 : -70) }));
    const nodes = technologies.map((t) => {
      const hub = hubs.find((h) => h.g === t.group)!;
      const siblings = technologies.filter((x) => x.group === t.group);
      const k = siblings.indexOf(t);
      const a = -Math.PI / 2 + (k / siblings.length) * Math.PI * 2 + (hub.y > H / 2 ? Math.PI / 4 : 0);
      const r = siblings.length > 2 ? 130 : 110;
      return { ...t, x: hub.x + Math.cos(a) * r, y: hub.y + Math.sin(a) * r * 0.9, hub };
    });
    return { W, H, hubs, nodes };
  }, []);

  useGsap(
    ({ reduced, scope }) => {
      if (reduced) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: scope.querySelector('.tech__map'), start: 'top 75%', once: true } });
      tl.from(scope.querySelectorAll('.tech__link'), { strokeDashoffset: 300, duration: 1.6, stagger: 0.03, ease: 'expo.out' })
        .from(scope.querySelectorAll('.tech__hub'), { scale: 0, transformOrigin: 'center', duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }, 0.1)
        .from(scope.querySelectorAll('.tech__node'), { opacity: 0, y: 14, duration: 0.8, stagger: 0.04 }, 0.3);
    },
    ref,
  );

  return (
    <section ref={ref} className="section tech" data-chapter="4" aria-labelledby="tech-title">
      <div className="container">
        <SectionHead
          eyebrow="Our technology"
          index="04"
          titleId="tech-title"
          title="A focused stack, *chosen* for longevity."
          lead="We work with a deliberately small set of proven technologies, so every system we hand over is maintainable, hireable-for and built to last."
          align="split"
        />
        <div className="tech__map">
          <svg viewBox={`0 0 ${layout.W} ${layout.H}`} role="img" aria-labelledby="tech-svg-title">
            <title id="tech-svg-title">CHTS technology ecosystem</title>
            {layout.hubs.slice(0, -1).map((h, i) => (
              <line key={h.g} className="tech__link tech__link--spine" x1={h.x} y1={h.y} x2={layout.hubs[i + 1].x} y2={layout.hubs[i + 1].y} />
            ))}
            {layout.nodes.map((n) => (
              <line key={`l-${n.name}`} className="tech__link" x1={n.hub.x} y1={n.hub.y} x2={n.x} y2={n.y} />
            ))}
            {layout.hubs.map((h) => (
              <g key={h.g} className="tech__hub">
                <circle cx={h.x} cy={h.y} r="34" />
                <text x={h.x} y={h.y + 4} textAnchor="middle">{h.g}</text>
              </g>
            ))}
            {layout.nodes.map((n) => (
              <g key={n.name} className="tech__node">
                <rect x={n.x - n.name.length * 4.6 - 30} y={n.y - 18} width={n.name.length * 9.2 + 56} height="36" rx="18" />
                <circle className="tech__icon" cx={n.x - n.name.length * 4.6 - 12} cy={n.y} r="11" />
                <text className="tech__mono" x={n.x - n.name.length * 4.6 - 12} y={n.y + 4} textAnchor="middle">{monogram(n.name)}</text>
                <text x={n.x + 10} y={n.y + 5} textAnchor="middle">{n.name}</text>
              </g>
            ))}
          </svg>
        </div>
        <ul className="tech__list" aria-label="Technologies">
          {technologies.map((t) => (
            <li key={t.name}>
              <span className="tech__chip-icon" aria-hidden>{monogram(t.name)}</span>
              <span>{t.name}</span>
              <i>{t.group}</i>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
