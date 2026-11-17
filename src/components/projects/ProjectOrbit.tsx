import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { SmartImage } from '../common/SmartImage';
import { DraftBadge } from '../common/Pending';
import type { Project } from '../../data';

const TAU = Math.PI * 2;
const SECONDS_PER_ORBIT = 48;

/**
 * Project cards orbiting a black hole.
 * - Cards travel on a tilted elliptical orbit; passing behind the singularity they
 *   shrink, blur and dim (gravitational lensing feel), in front they grow and sharpen.
 * - Hover or keyboard focus pauses the orbit (and brings a focused card to the front).
 * - Drag / swipe horizontally to spin it by hand.
 * - Reduced motion: cards are laid out on the orbit but don't move.
 * Transforms are written straight to the DOM every frame — no React re-renders.
 */
export function ProjectOrbit({ projects }: { projects: Project[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const angle = useRef(0);
  const speed = useRef(1);
  const hovered = useRef(-1);
  const focusedWithin = useRef(false);
  const target = useRef<number | null>(null);
  const drag = useRef<{ x: number; a: number; moved: boolean } | null>(null);
  const size = useRef({ w: 1200, h: 720 });
  const reduced = useReducedMotion();
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => (size.current = { w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const n = projects.length;
    if (!n) return;
    const dt = Math.min(delta, 50) / 1000;
    const stop = hovered.current >= 0 || focusedWithin.current || drag.current !== null;
    speed.current += ((stop ? 0 : 1) - speed.current) * Math.min(1, dt * 3.5);

    if (target.current !== null) {
      const diff = target.current - angle.current;
      angle.current += diff * Math.min(1, dt * 5);
      if (Math.abs(diff) < 0.001) target.current = null;
    } else if (!reduced && !drag.current) {
      angle.current += (TAU / SECONDS_PER_ORBIT) * dt * speed.current;
    }

    const { w, h } = size.current;
    const narrow = w < 700;
    const rx = w * (narrow ? 0.36 : 0.4);
    const ry = Math.min(h * 0.3, rx * (narrow ? 0.85 : 0.3));
    const step = TAU / n;

    for (let i = 0; i < n; i++) {
      const el = cards.current[i];
      if (!el) continue;
      const a = angle.current + i * step;
      const depth = Math.sin(a); // +1 = closest to viewer (bottom of the orbit)
      const k = (depth + 1) / 2; // 0 back → 1 front
      const isHover = hovered.current === i;
      // lensing: directly behind the black hole cards are pulled in hardest
      const behindCore = depth < 0 ? Math.max(0, 1 - Math.abs(Math.cos(a)) * 1.6) : 0;
      const x = Math.cos(a) * rx * (1 - behindCore * 0.18);
      const y = depth * ry;
      const s = (0.52 + 0.48 * k) * (1 - behindCore * 0.25) * (isHover ? 1.1 : 1);
      const blur = isHover ? 0 : (1 - k) * 5 + behindCore * 3;
      const op = isHover ? 1 : 0.3 + 0.7 * k - behindCore * 0.2;
      const ry3d = -Math.cos(a) * 22;
      el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateY(${ry3d.toFixed(1)}deg) scale(${s.toFixed(3)})`;
      el.style.zIndex = String(isHover ? 400 : Math.round(100 + depth * 60));
      el.style.opacity = Math.max(0.15, op).toFixed(3);
      el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px) brightness(${(0.6 + 0.4 * k).toFixed(2)})` : 'none';
    }
  });

  const bringToFront = (i: number) => {
    const n = projects.length;
    const step = TAU / n;
    const desired = Math.PI / 2 - i * step; // angle where sin = 1 (front)
    let d = (desired - angle.current) % TAU;
    if (d > Math.PI) d -= TAU;
    if (d < -Math.PI) d += TAU;
    target.current = angle.current + d;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, a: angle.current, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) {
      if (!d.moved) stage.current?.setPointerCapture(e.pointerId);
      d.moved = true;
      setHint(false);
    }
    if (d.moved) {
      target.current = null;
      angle.current = d.a + (dx / Math.max(320, size.current.w)) * Math.PI * 1.4;
    }
  };
  const endDrag = (e: React.PointerEvent) => {
    if (stage.current?.hasPointerCapture(e.pointerId)) stage.current.releasePointerCapture(e.pointerId);
    const moved = drag.current?.moved;
    drag.current = null;
    if (moved) {
      // swallow the click that follows a drag
      const stop = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      window.addEventListener('click', stop, { capture: true, once: true });
      setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 50);
    }
  };

  return (
    <div className="orbit">
      <div
        ref={stage}
        className="orbit__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onFocusCapture={() => (focusedWithin.current = true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) focusedWithin.current = false;
        }}
      >
        <div className="bh" aria-hidden>
          <span className="bh__glow" />
          <span className="bh__disk bh__disk--back"><i /></span>
          <span className="bh__lens" />
          <span className="bh__core" />
          <span className="bh__disk bh__disk--front"><i /></span>
        </div>

        <ul className="orbit__list" aria-label="Projects">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="orbit__card"
              onPointerEnter={(e) => e.pointerType === 'mouse' && (hovered.current = i)}
              onPointerLeave={() => hovered.current === i && (hovered.current = -1)}
            >
              <Link to={`/projects/${p.slug}`} className="ocard" onFocus={() => bringToFront(i)} draggable={false}>
                <div className="ocard__media">
                  <SmartImage src={p.thumbnail} alt={p.title} seed={p.slug} />
                </div>
                <div className="ocard__body">
                  <p className="ocard__cat">{p.category}</p>
                  <h3 className="ocard__title">
                    {p.title} <DraftBadge draft={p.draft} />
                  </h3>
                  {p.client && <p className="ocard__client">{p.client}</p>}
                  <span className="ocard__cta" aria-hidden>View project →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {!reduced && hint && projects.length > 1 && (
          <p className="orbit__hint" aria-hidden>
            Hover to pause · drag to spin
          </p>
        )}
      </div>
    </div>
  );
}
