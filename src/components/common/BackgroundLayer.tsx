import { lazy, Suspense, useEffect, useState } from 'react';
import { StaticBackdrop } from '../../scenes/StaticBackdrop';
import { sceneState, useUi, type SceneMode } from '../../scenes/store';
import type { Quality } from '../../utils/env';
import { cn } from '../../utils/cn';

export const loadExperience = () => import('../../scenes/Experience');
const Experience = lazy(loadExperience);

/**
 * Fixed background.
 * - home / contact / stage: the shared WebGL canvas
 * - plain: the canvas fades out and stops rendering; a quiet static backdrop shows
 * - no WebGL / reduced motion: CSS fallbacks everywhere
 */
export function BackgroundLayer({ quality, mode }: { quality: Quality; mode: SceneMode }) {
  const webgl = useUi((s) => s.webgl);
  const [mounted, setMounted] = useState(false);
  const need3D = mode !== 'plain';

  useEffect(() => {
    if (webgl !== 'on') return;
    const onMove = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    setMounted(true);
    return () => window.removeEventListener('pointermove', onMove);
  }, [webgl]);

  return (
    <div className="bg-layer" aria-hidden>
      <StaticBackdrop variant={webgl === 'on' && mounted ? 'plain' : mode} />
      {webgl === 'on' && mounted && (
        <div className={cn('bg-canvas', !need3D && 'is-off')}>
          <Suspense fallback={null}>
            <Experience quality={quality} active={need3D} />
          </Suspense>
        </div>
      )}
      <div className={`bg-scrim bg-scrim--${mode}`} />
      <div className="grid-lines">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
