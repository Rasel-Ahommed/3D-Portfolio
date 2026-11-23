import { useEffect, useMemo, useRef, useState } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { SmartImage } from '../common/SmartImage';
import { TeamCard } from '../cards/TeamCard';
import type { TeamMember } from '../../data';
import { cn } from '../../utils/cn';

const MIN_SLOTS = 12;
const SECONDS_PER_TURN = 42;

/**
 * 3D barrel gallery of team portraits with a depth-of-field effect:
 * cards on the far side of the barrel are blurred and dimmed, the front is sharp.
 * Hover (or tap / keyboard focus) a portrait → the rotation eases to a stop and
 * that member's details slide in. Drag to spin. Reduced motion → static grid.
 *
 * With few members the list is repeated to fill the barrel; repeats are hidden
 * from assistive tech and keyboard focus.
 */
export function TeamGallery({ members }: { members: TeamMember[] }) {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const angle = useRef(0);
  const speed = useRef(1);
  const target = useRef<number | null>(null);
  const drag = useRef<{ x: number; a: number; moved: boolean } | null>(null);
  const geom = useRef({ cardW: 240, radius: 600 });
  const [active, setActive] = useState(-1);
  const activeRef = useRef(-1);
  activeRef.current = active;

  const slots = useMemo(() => {
    if (!members.length) return [];
    const count = Math.max(MIN_SLOTS, members.length);
    return Array.from({ length: count }, (_, i) => ({ member: members[i % members.length], dup: i >= members.length, key: `${members[i % members.length].slug}-${i}` }));
  }, [members]);
  const n = slots.length;
  const step = 360 / Math.max(1, n);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      const cardW = Math.max(130, Math.min(240, w * (w < 700 ? 0.34 : 0.155)));
      const radius = (cardW / 2 / Math.tan(Math.PI / n)) * 1.12;
      geom.current = { cardW, radius };
      el.style.setProperty('--card-w', `${cardW}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [n]);

  useEffect(() => {
    if (active < 0) return;
    const onDoc = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setActive(-1);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(-1);
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [active]);

  useAnimationFrame((_, delta) => {
    if (!n || reduced) return;
    const dt = Math.min(delta, 50) / 1000;
    const paused = activeRef.current >= 0 || drag.current !== null;
    speed.current += ((paused ? 0 : 1) - speed.current) * Math.min(1, dt * 4);

    if (target.current !== null) {
      const diff = target.current - angle.current;
      angle.current += diff * Math.min(1, dt * 5);
      if (Math.abs(diff) < 0.05) target.current = null;
    } else if (!drag.current) {
      angle.current -= (360 / SECONDS_PER_TURN) * dt * speed.current;
    }

    const { radius } = geom.current;
    if (ring.current) ring.current.style.transform = `translateZ(${-radius}px) rotateX(-11deg) rotateY(${angle.current.toFixed(2)}deg)`;

    for (let i = 0; i < n; i++) {
      const el = cards.current[i];
      if (!el) continue;
      const world = ((angle.current + i * step) * Math.PI) / 180;
      const facing = Math.cos(world); // 1 front … -1 back
      const k = (facing + 1) / 2;
      const isActive = activeRef.current === i;
      const someoneActive = activeRef.current >= 0;
      // depth of field: focus plane is the front of the barrel (or the hovered card)
      const blur = isActive ? 0 : (1 - k) * 7 + (someoneActive ? 2.5 : 0);
      const bright = isActive ? 1 : 0.38 + 0.62 * k * (someoneActive ? 0.7 : 1);
      el.style.transform = `rotateY(${(i * step).toFixed(2)}deg) translateZ(${radius.toFixed(1)}px)${isActive ? ' scale(1.06)' : ''}`;
      // filter goes on the faces, not the 3D card — a filter would flatten preserve-3d
      const f = blur > 0.25 ? `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(2)})` : `brightness(${bright.toFixed(2)})`;
      for (const face of el.children as HTMLCollectionOf<HTMLElement>) face.style.filter = f;
      el.style.zIndex = String(Math.round(k * 100));
    }
  });

  /** Only portraits turned toward the viewer react to hover. */
  const isFacing = (i: number) => Math.cos(((angle.current + i * step) * Math.PI) / 180) > 0.25;

  const bringToFront = (i: number) => {
    const desired = -i * step;
    let d = (desired - angle.current) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    target.current = angle.current + d;
  };

  if (reduced) {
    return (
      <div className="team-grid team-grid--page">
        {members.map((m) => (
          <TeamCard key={m.slug} member={m} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrap}
      className={cn('tgal', active >= 0 && 'has-active')}
      onPointerDown={(e) => (drag.current = { x: e.clientX, a: angle.current, moved: false })}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 6) d.moved = true;
        if (d.moved) {
          target.current = null;
          angle.current = d.a + dx * 0.25;
        }
      }}
      onPointerUp={() => {
        if (drag.current?.moved) setActive(-1);
        drag.current = null;
      }}
      onPointerCancel={() => (drag.current = null)}
      onPointerLeave={() => (drag.current = null)}
    >
      <div className="tgal__stage">
        <div ref={ring} className="tgal__ring">
          {slots.map(({ member: m, dup, key }, i) => (
            <div
              key={key}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={cn('tgal__card', active === i && 'is-active')}
              aria-hidden={dup || undefined}
              tabIndex={dup ? -1 : 0}
              role={dup ? undefined : 'group'}
              aria-label={dup ? undefined : `${m.name}, ${m.role}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && !drag.current?.moved && isFacing(i) && setActive(i)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && setActive((a) => (a === i ? -1 : a))}
              onClick={(e) => {
                if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'mouse') return;
                setActive((a) => (a === i ? -1 : i));
                bringToFront(i);
              }}
              onFocus={() => {
                setActive(i);
                bringToFront(i);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive((a) => (a === i ? -1 : a));
              }}
            >
              <div className="tgal__face tgal__face--front">
                <SmartImage src={m.portrait} alt={dup ? '' : `Portrait of ${m.name}`} seed={m.name} />
                <div className="tgal__label">
                  <span>{m.name}</span>
                </div>
                <div className="tgal__details">
                  <p className="tgal__role">{m.role}</p>
                  <h3 className="tgal__name">{m.name}</h3>
                  <p className="tgal__bio">{m.bio}</p>
                  {m.socials && m.socials.length > 0 && (
                    <ul className="tgal__socials">
                      {m.socials.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={dup || active !== i ? -1 : 0} aria-label={`${m.name} on ${s.label}`} onClick={(e) => e.stopPropagation()}>
                            {s.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="tgal__face tgal__face--back" aria-hidden>
                <span>{m.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="tgal__hint" aria-hidden>
        {active >= 0 ? 'Paused — move away to resume' : 'Hover a portrait to pause · drag to spin'}
      </p>
    </div>
  );
}
