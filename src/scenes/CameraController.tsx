import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CONTACT_KEY, INNER_KEY, sampleCamera } from './timeline';
import { live } from './Director';
import { sceneState } from './store';

/** Scroll-driven cinematic camera with mouse parallax and an intro dolly. */
export function CameraController() {
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const innerPos = useMemo(() => new THREE.Vector3(...INNER_KEY.cam), []);
  const innerLook = useMemo(() => new THREE.Vector3(...INNER_KEY.look), []);
  const cPos = useMemo(() => new THREE.Vector3(...CONTACT_KEY.cam), []);
  const cLook = useMemo(() => new THREE.Vector3(...CONTACT_KEY.look), []);
  const cur = useMemo(() => new THREE.Vector3(0, 0, 16), []);
  const curLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    sampleCamera(live.chapter, pos, look);
    pos.lerp(innerPos, live.inner);
    look.lerp(innerLook, live.inner);
    pos.lerp(cPos, live.contact);
    look.lerp(cLook, live.contact);

    // intro dolly-in
    pos.z += (1 - sceneState.reveal) * 6;
    // narrow screens: pull back so the portal fits
    pos.z += (1 - live.spread) * 3.5;

    // parallax + breathing
    const t = live.time;
    pos.x += live.pointer.x * 0.55 + Math.sin(t * 0.15) * 0.08;
    pos.y += live.pointer.y * 0.35 + Math.cos(t * 0.12) * 0.06;

    const k = 1 - Math.exp(-dt * 3.2);
    cur.lerp(pos, k);
    curLook.lerp(look, k);
    state.camera.position.copy(cur);
    state.camera.lookAt(curLook);
  });
  return null;
}
