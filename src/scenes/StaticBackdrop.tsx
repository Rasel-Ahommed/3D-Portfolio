import type { SceneMode } from './store';

/**
 * CSS backgrounds.
 * - plain: quiet navy gradient used on content pages (and under the canvas)
 * - home / contact: a CSS rendition of the portal for devices without WebGL
 * - stage: same as plain (3D illustrations need WebGL)
 */
export function StaticBackdrop({ variant = 'home' }: { variant?: SceneMode }) {
  const portal = variant === 'home' || variant === 'contact';
  return (
    <div className={`static-backdrop static-backdrop--${variant}`} aria-hidden>
      {portal && (
        <div className="static-portal">
          <span className="static-portal__core" />
          <span className="static-portal__ring" />
          <span className="static-portal__ring static-portal__ring--outer" />
        </div>
      )}
    </div>
  );
}
