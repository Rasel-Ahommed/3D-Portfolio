import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispose } from './useDispose';
import { panelFragment, portalVertex } from './shaders';
import { GOLD, weight } from './timeline';
import { live } from './Director';

const LAYOUT: [number, number, number, number, number][] = [
  // x, y, z, w, rotY
  [-4.6, 1.4, -1.5, 2.6, 0.5],
  [-3.2, -1.6, 0.2, 2.1, 0.35],
  [4.5, 1.2, -1.2, 2.8, -0.5],
  [3.4, -1.8, 0.4, 2, -0.3],
  [-1.2, 2.6, -3, 1.8, 0.1],
  [1.6, -2.8, -2.2, 2.2, -0.15],
  [0.2, 0.2, -6, 3.2, 0],
];

/** Floating project/product panels that emerge from the environment. */
export function PanelsScene() {
  const group = useRef<THREE.Group>(null);
  const mats = useMemo(
    () =>
      LAYOUT.map(
        (_, i) =>
          new THREE.ShaderMaterial({
            vertexShader: portalVertex,
            fragmentShader: panelFragment,
            uniforms: { uOpacity: { value: 0 }, uTime: { value: 0 }, uGold: { value: GOLD.clone() }, uSeed: { value: (i + 1) * 0.137 } },
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
      ),
    [],
  );

  useDispose(...mats);

  useFrame((_, dt) => {
    const w = weight(live.chapter, 3, 0.6) * (1 - live.inner) * (1 - live.contact);
    const g = group.current;
    if (!g) return;
    g.visible = w > 0.01;
    g.children.forEach((c, i) => {
      const [x, y, z] = LAYOUT[i];
      const t = live.time + i;
      c.position.set(x * (0.6 + 0.4 * live.spread) * (0.55 + 0.45 * w), y + Math.sin(t * 0.6) * 0.15 - (1 - w) * 1.5, z - (1 - w) * 6);
      c.rotation.z = Math.sin(t * 0.4) * 0.03;
      const m = mats[i];
      m.uniforms.uOpacity.value = w * (i === 6 ? 0.4 : 0.7);
      m.uniforms.uTime.value += dt;
    });
    g.rotation.y = live.pointer.x * 0.12;
  });

  return (
    <group ref={group} visible={false}>
      {LAYOUT.map(([, , , w, ry], i) => (
        <mesh key={i} rotation={[0, ry, 0]} material={mats[i]}>
          <planeGeometry args={[w, w * 0.64]} />
        </mesh>
      ))}
    </group>
  );
}
