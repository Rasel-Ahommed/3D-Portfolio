/**
 * Non-WebGL fallback (no WebGL, reduced motion, or while the 3D chunk loads).
 * A pure-CSS rendition of the portal so the brand moment survives everywhere.
 */
export function StaticBackdrop({ variant = 'home' }: { variant?: 'home' | 'inner' | 'contact' }) {
  return (
    <div className={`static-backdrop static-backdrop--${variant}`} aria-hidden>
      <div className="static-portal">
        <span className="static-portal__core" />
        <span className="static-portal__ring" />
        <span className="static-portal__ring static-portal__ring--outer" />
      </div>
    </div>
  );
}
