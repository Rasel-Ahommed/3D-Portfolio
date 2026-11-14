import { Link } from 'react-router';
import { cn } from '../../utils/cn';

/**
 * Official CHTS logo — original files, never recoloured or filtered.
 * `theme="dark"` uses the dark-theme artwork on its own matching neutral plate;
 * `theme="light"` uses the light-theme artwork on a white plate.
 */
export function Logo({ theme = 'dark', className, link = true, width = 148 }: { theme?: 'dark' | 'light'; className?: string; link?: boolean; width?: number }) {
  const src = `/brand/logo-${theme}-theme`;
  const img = (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.png`} alt="Classical Hunter Tech Solutions — CHTS Tech Solutions logo" width={width} height={Math.round(width * (theme === 'dark' ? 384 / 894 : 187 / 438))} decoding="async" />
    </picture>
  );
  const cls = cn('logo-plate', `logo-plate--${theme}`, className);
  return link ? (
    <Link to="/" className={cls} aria-label="CHTS — home">
      {img}
    </Link>
  ) : (
    <span className={cls}>{img}</span>
  );
}
