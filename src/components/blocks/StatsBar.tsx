import { Reveal } from '../animations/Reveal';
import { visibleStats } from '../../data';
import { cn } from '../../utils/cn';

/** Verified proof numbers. Stats without a value (src/data/proof.ts) are hidden. */
export function StatsBar({ className, limit, offset = 0 }: { className?: string; limit?: number; offset?: number }) {
  const items = visibleStats.slice(offset, limit ? offset + limit : undefined);
  if (!items.length) return null;
  return (
    <Reveal as="dl" className={cn('stats', className)} stagger={0.06}>
      {items.map((s) => (
        <div key={s.label} data-reveal className="stats__item">
          <dd className="stats__value">{s.value}</dd>
          <dt className="stats__label">{s.label}</dt>
          {s.note && <p className="stats__note">{s.note}</p>}
        </div>
      ))}
    </Reveal>
  );
}
