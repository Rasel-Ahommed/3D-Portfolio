import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

export function FilterBar<T extends string>({ options, value, onChange, label, id }: { options: T[]; value: T | 'All'; onChange: (v: T | 'All') => void; label: string; id: string }) {
  const all: (T | 'All')[] = ['All', ...options];
  return (
    <div className="filters" role="group" aria-label={label}>
      {all.map((o) => (
        <button key={o} type="button" className={cn('filter', value === o && 'is-active')} aria-pressed={value === o} onClick={() => onChange(o)}>
          {value === o && <motion.span layoutId={`filter-pill-${id}`} className="filter__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
          <span className="filter__label">{o}</span>
        </button>
      ))}
    </div>
  );
}
