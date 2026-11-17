import { SmartImage } from '../common/SmartImage';
import { ServiceGlyph } from '../ui/ServiceGlyph';
import type { ServiceVisual } from '../../data';
import { cn } from '../../utils/cn';

type Img = { src?: string; alt: string; seed: string };

/**
 * Page-specific hero visuals — each page shows its own content instead of the portal:
 *  - collage: stacked, slightly rotated frames (projects, products, blog)
 *  - strip:   a row of portraits (team, about)
 *  - glyphs:  service icon grid (services)
 */
export function HeroCollage({ variant = 'collage', images = [], glyphs = [] }: { variant?: 'collage' | 'strip' | 'glyphs'; images?: Img[]; glyphs?: ServiceVisual[] }) {
  if (variant === 'glyphs')
    return (
      <div className="hv hv--glyphs" aria-hidden>
        {glyphs.slice(0, 9).map((g, i) => (
          <span key={g} className="hv__glyph" style={{ animationDelay: `${i * 60}ms` }}>
            <ServiceGlyph visual={g} />
          </span>
        ))}
      </div>
    );
  const list = images.slice(0, variant === 'strip' ? 5 : 3);
  if (!list.length) return null;
  return (
    <div className={cn('hv', `hv--${variant}`)}>
      {list.map((img, i) => (
        <figure key={img.seed} className="hv__item" style={{ animationDelay: `${i * 90}ms` }}>
          <SmartImage src={img.src} alt={img.alt} seed={img.seed} ratio={variant === 'strip' ? 4 / 5 : 16 / 10} sizes={variant === 'strip' ? '160px' : '(max-width: 900px) 70vw, 30vw'} priority={i === 0} />
        </figure>
      ))}
    </div>
  );
}
