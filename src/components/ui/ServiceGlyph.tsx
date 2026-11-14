import type { ServiceVisual } from '../../data/types';

/** Line-art glyphs used where the 3D illustration isn't rendered (fallbacks, cards). */
export function ServiceGlyph({ visual, className }: { visual: ServiceVisual; className?: string }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const g = { fill: '#F4B400' };
  const art: Record<ServiceVisual, React.JSX.Element> = {
    software: (
      <>
        <path {...s} d="M20 70 50 85 80 70 50 55Z M20 55 50 70 80 55 50 40Z M20 40 50 55 80 40 50 25Z" />
        <circle {...g} cx="50" cy="25" r="3" />
      </>
    ),
    ai: (
      <>
        <path {...s} d="M18 30 50 20 82 35 M18 30 50 50 82 35 M18 70 50 50 82 65 M18 70 50 80 82 65 M50 20 50 80" />
        {[[18, 30], [18, 70], [50, 20], [50, 50], [50, 80], [82, 35], [82, 65]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" {...(i === 3 ? g : { fill: '#050514', stroke: 'currentColor', strokeWidth: 1.4 })} />
        ))}
      </>
    ),
    mobile: (
      <>
        <rect {...s} x="32" y="12" width="36" height="76" rx="7" />
        <path {...s} d="M40 30h20M40 40h14M40 50h20" />
        <rect {...g} x="40" y="62" width="20" height="8" rx="2" />
      </>
    ),
    uiux: (
      <>
        <rect {...s} x="14" y="40" width="52" height="36" rx="4" />
        <rect {...s} x="24" y="30" width="52" height="36" rx="4" />
        <rect {...s} x="34" y="20" width="52" height="36" rx="4" />
        <circle {...g} cx="72" cy="44" r="5" />
      </>
    ),
    saas: (
      <>
        <path {...s} d="M30 55a14 14 0 0 1 4-27 18 18 0 0 1 34 4 12 12 0 0 1 2 23Z M50 55v15 M30 55l-10 20 M70 55l10 20" />
        <rect {...g} x="45" y="70" width="10" height="8" rx="2" />
        <rect {...s} x="14" y="75" width="12" height="8" rx="2" />
        <rect {...s} x="74" y="75" width="12" height="8" rx="2" />
      </>
    ),
    game: (
      <>
        <path {...s} d="M10 75 30 60 45 70 65 50 90 72" />
        <path {...s} d="M10 85h80" />
        <path {...g} d="M50 18 60 30 50 42 40 30Z" />
      </>
    ),
    media: (
      <>
        <circle {...s} cx="50" cy="50" r="32" />
        <circle {...s} cx="50" cy="50" r="14" />
        <path {...g} d="M45 43 58 50 45 57Z" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect key={a} {...s} x="46" y="10" width="8" height="6" rx="1" transform={`rotate(${a} 50 50)`} />
        ))}
      </>
    ),
    infra: (
      <>
        {[18, 42, 66].map((x) => (
          <rect key={x} {...s} x={x} y="30" width="16" height="52" rx="2" />
        ))}
        <path {...s} d="M26 30V18h48v12 M50 18v12" />
        <circle {...g} cx="50" cy="16" r="3" />
        <path {...s} d="M22 40h8M46 46h8M70 52h8" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {art[visual]}
    </svg>
  );
}
