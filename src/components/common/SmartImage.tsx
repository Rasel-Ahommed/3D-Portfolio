import { useState } from 'react';
import { GeneratedCover } from './GeneratedCover';
import { cn } from '../../utils/cn';

type Props = { src?: string; alt: string; seed?: string; className?: string; priority?: boolean };

/**
 * Lazy image with graceful fallback. If the source is missing or fails to load,
 * an abstract generated cover is shown instead — never a stock photo pretending
 * to be client work.
 */
export function SmartImage({ src, alt, seed, className, priority }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!src || failed) return <GeneratedCover seed={seed ?? alt} label={alt} className={cn('smart-img', className)} />;
  return (
    <img
      className={cn('smart-img', loaded && 'is-loaded', className)}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
