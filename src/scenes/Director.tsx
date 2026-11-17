import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from './store';

/** Smoothed, per-frame values every scene object reads from. */
export const live = {
  chapter: 0,
  inner: 0,
  contact: 0,
  pointer: new THREE.Vector2(),
  time: 0,
  /** 1 on wide screens, smaller on narrow ones — used to pull offsets toward centre. */
  spread: 1,
  dim: 0,
};

export function Director() {
  const size = useThree((s) => s.size);
  useFrame((_, dt) => {
    if (!live.time) {
      // first frame: snap to the current page instead of animating from the homepage state
      live.inner = sceneState.mode === 'stage' || sceneState.mode === 'plain' ? 1 : 0;
      live.contact = sceneState.mode === 'contact' ? 1 : 0;
      live.chapter = sceneState.chapter;
    }
    const d = Math.min(dt, 0.05);
    live.time += d;
    live.chapter = THREE.MathUtils.damp(live.chapter, sceneState.chapter, 2.6, d);
    live.inner = THREE.MathUtils.damp(live.inner, sceneState.mode === 'stage' || sceneState.mode === 'plain' ? 1 : 0, 2.2, d);
    live.contact = THREE.MathUtils.damp(live.contact, sceneState.mode === 'contact' ? 1 : 0, 2.2, d);
    live.dim = THREE.MathUtils.damp(live.dim, sceneState.portalDim, 2.4, d);
    live.pointer.x = THREE.MathUtils.damp(live.pointer.x, sceneState.pointer.x, 3, d);
    live.pointer.y = THREE.MathUtils.damp(live.pointer.y, sceneState.pointer.y, 3, d);
    live.spread = THREE.MathUtils.clamp(size.width / 1400, 0, 1);
  }, -2);
  return null;
}
