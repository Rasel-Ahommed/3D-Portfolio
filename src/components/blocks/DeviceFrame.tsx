import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

/** Dark device frames so screenshots of any style sit inside the brand palette. */
export function DeviceFrame({ kind = 'browser', url, children, className }: { kind?: 'browser' | 'phone'; url?: string; children: ReactNode; className?: string }) {
  if (kind === 'phone')
    return (
      <div className={cn('device device--phone', className)}>
        <span className="device__notch" aria-hidden />
        <div className="device__screen">{children}</div>
      </div>
    );
  return (
    <div className={cn('device device--browser', className)}>
      <div className="device__bar" aria-hidden>
        <i />
        <i />
        <i />
        {url && <span>{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>}
      </div>
      <div className="device__screen">{children}</div>
    </div>
  );
}
