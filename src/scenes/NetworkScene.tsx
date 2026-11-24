import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispose } from './useDispose';
import { particleFragment, particleVertex } from './shaders';
import { GOLD, weight } from './timeline';
import { live } from './Director';

/**
 * Interconnected node network — the portal energy "becomes" this structure in the
 * services and technology chapters.
 */
export function NetworkScene({ nodes = 90 }: { nodes?: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  const { points, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodes; i++) {
      const y = 1 - (i / (nodes - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const r = 4.4 + (Math.random() - 0.5) * 1.2;
      pts.push(new THREE.Vector3(Math.cos(th) * rad * r * 1.25, y * r * 0.85, Math.sin(th) * rad * r));
    }
    const pos = new Float32Array(nodes * 3);
    const scale = new Float32Array(nodes);
    const seed = new Float32Array(nodes);
    pts.forEach((p, i) => {
      pos.set([p.x, p.y, p.z], i * 3);
      scale[i] = 1.4 + Math.random() * 2.4;
      seed[i] = Math.random();
    });
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    pg.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

    const seg: number[] = [];
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
        .filter((o) => o.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      near.forEach(({ j }) => seg.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
    return { points: pg, lines: lg };
  }, [nodes]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 16 }, uPixelRatio: { value: dpr }, uOpacity: { value: 0 }, uGold: { value: GOLD.clone() } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const mat = useMemo(
    () => new THREE.ShaderMaterial({ vertexShader: particleVertex, fragmentShader: particleFragment, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    [uniforms],
  );

  useDispose(mat, points, lines);

  useFrame((_, dt) => {
    const w = Math.max(weight(live.chapter, 4, 1.1), weight(live.chapter, 2, 0.8) * 0.22) * (1 - live.inner) * (1 - live.contact);
    uniforms.uTime.value += dt;
    // kept quiet so it stays a backdrop behind the projects / technology content
    uniforms.uOpacity.value = w * 0.45;
    if (lineMat.current) lineMat.current.opacity = w * 0.13;
    const g = group.current;
    if (g) {
      g.visible = w > 0.01;
      g.rotation.y += dt * 0.06;
      g.rotation.x = live.pointer.y * 0.15;
      const s = 0.6 + w * 0.4;
      g.scale.setScalar(s);
      g.position.z = THREE.MathUtils.lerp(-5, 0, w);
      g.position.x = live.chapter < 3 ? 2.2 * live.spread * w : 0;
    }
  });

  return (
    <group ref={group} visible={false}>
      <points geometry={points} material={mat} frustumCulled={false} />
      <lineSegments geometry={lines}>
        <lineBasicMaterial ref={lineMat} color={GOLD} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}
