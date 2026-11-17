import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={cn('eyebrow', className)}>
      {index && <span className="eyebrow__index">{index}</span>}
      {/* <span className="eyebrow__dot" aria-hidden /> */}
      {children}
    </p>
  );
}
