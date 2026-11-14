import { lazy, Suspense, useEffect, useState } from 'react';
import { StaticBackdrop } from '../../scenes/StaticBackdrop';
import { sceneState, useUi, type SceneMode } from '../../scenes/store';
import type { Quality } from '../../utils/env';

export const loadExperience = () => import('../../scenes/Experience');
const Experience = lazy(loadExperience);

/** Fixed background: the shared WebGL canvas, or a CSS fallback. */
export function BackgroundLayer({ quality, mode }: { quality: Quality; mode: SceneMode }) {
  const webgl = useUi((s) => s.webgl);
  const [mounted, setMounted] = useState(false);

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
      {webgl === 'on' && mounted ? (
        <Suspense fallback={<StaticBackdrop variant={mode} />}>
          <Experience quality={quality} />
        </Suspense>
      ) : (
        <StaticBackdrop variant={mode} />
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
