
import { useState } from 'react';
import { GeneratedCover } from './GeneratedCover';
import { cn } from '../../utils/cn';

type Props = {
  src?: string;
  alt: string;
  seed?: string;
  className?: string;
  priority?: boolean;
  ratio?: number;
  sizes?: string;
};

/**
 * Lazy image with graceful fallback.
 * If the source is missing or fails to load,
 * an abstract generated cover is shown.
 */
export function SmartImage({
  src,
  alt,
  seed,
  className,
  priority,
  ratio = 16 / 10,
  sizes,
}: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageStyle = {
    aspectRatio: ratio,
  };

  if (!src || failed) {
    return (
      <div style={imageStyle}>
        <GeneratedCover
          seed={seed ?? alt}
          label={alt}
          className={cn('smart-img', className)}
        />
      </div>
    );
  }

  return (
    <img
      className={cn('smart-img', loaded && 'is-loaded', className)}
      src={src}
      alt={alt}
      style={imageStyle}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
