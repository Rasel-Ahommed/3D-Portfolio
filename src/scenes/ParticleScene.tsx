import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispose } from './useDispose';
import { particleFragment, particleVertex } from './shaders';
import { GOLD } from './timeline';
import { live } from './Director';
import { sceneState } from './store';

/** Single draw-call point cloud of drifting dust and gold sparks. */
export function ParticleScene({ count }: { count: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // denser near the portal, sparse in the distance
      const r = Math.pow(Math.random(), 0.6) * 14;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r * 1.3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -Math.random() * 18 + 5;
      scale[i] = 0.35 + Math.random() * Math.random() * 1.5;
      seed[i] = Math.random();
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 9 }, uPixelRatio: { value: dpr }, uOpacity: { value: 0 }, uGold: { value: GOLD.clone() } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const mat = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: particleVertex, fragmentShader: particleFragment, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    [uniforms],
  );

  useDispose(mat, geo);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uPixelRatio.value = dpr;
    const target = Math.min(1, sceneState.reveal * 1.4) * (0.85 + 0.25 * Math.max(0, 1 - Math.abs(live.chapter - 4)));
    uniforms.uOpacity.value = THREE.MathUtils.lerp(uniforms.uOpacity.value, target * (1 - live.inner * 0.35), 0.05);
    if (ref.current) {
      ref.current.rotation.y = live.time * 0.01 + live.pointer.x * 0.05;
      ref.current.position.y = -live.chapter * 0.6;
    }
  });

  return (
    <points ref={ref} geometry={geo} material={mat} frustumCulled={false} />
  );
}
