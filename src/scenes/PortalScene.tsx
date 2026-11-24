import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispose } from './useDispose';
import { portalFragment, portalVertex } from './shaders';
import { GOLD, GOLD_2, PORTAL_KEYS, sampleKeys } from './timeline';
import { live } from './Director';
import { sceneState } from './store';

const RIBS = 40;

/** The signature CHTS portal: dark metallic ring structure with a golden energy core. */
export function PortalScene() {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const arcs = useRef<THREE.Group>(null);
  const edgeMat = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const ribs = useRef<THREE.InstancedMesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uIntensity: { value: 1 },
      uGold: { value: GOLD.clone() },
      uGold2: { value: GOLD_2.clone() },
    }),
    [],
  );

  const energyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: portalVertex,
        fragmentShader: portalFragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [uniforms],
  );

  const metal = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#1b1d29', metalness: 1, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.25, envMapIntensity: 1.35 }),
    [],
  );
  const darkMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0d0e17', metalness: 0.95, roughness: 0.42, envMapIntensity: 1 }), []);

  useDispose(energyMat, metal, darkMetal);

  // place ribs once
  const ribsReady = useRef(false);
  const placeRibs = () => {
    if (!ribs.current || ribsReady.current) return;
    const m = new THREE.Object3D();
    for (let i = 0; i < RIBS; i++) {
      const a = (i / RIBS) * Math.PI * 2;
      m.position.set(Math.cos(a) * 2.78, Math.sin(a) * 2.78, 0);
      m.rotation.set(0, 0, a);
      const big = i % 5 === 0;
      m.scale.set(big ? 1.6 : 1, big ? 1.25 : 1, 1);
      m.updateMatrix();
      ribs.current.setMatrixAt(i, m.matrix);
    }
    ribs.current.instanceMatrix.needsUpdate = true;
    ribsReady.current = true;
  };

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    placeRibs();
    const g = group.current;
    if (!g) return;
    const t = live.time;
    const [x, y, z, s, k] = sampleKeys(PORTAL_KEYS, live.chapter);
    // inner pages: portal sits to the side, calmer
    const innerX = 3.6 * live.spread;
    const contactX = 3.2 * live.spread;
    const narrow = live.spread < 0.6;
    tmp.set(x * live.spread, y + (narrow ? 1.5 * (1 - Math.min(1, live.chapter)) : 0), z);
    tmp.lerp(new THREE.Vector3(narrow ? 0 : innerX, narrow ? 1.6 : 0.2, -3.5), live.inner);
    tmp.lerp(new THREE.Vector3(narrow ? 0 : contactX, narrow ? 2.2 : 0, -1.2), live.contact);
    tmp.z -= live.dim * 3;
    g.position.copy(tmp);

    const scale = THREE.MathUtils.lerp(THREE.MathUtils.lerp(s, 0.95, live.inner), 1, live.contact) * (narrow ? 0.72 : 1);
    const reveal = sceneState.reveal;
    g.scale.setScalar(scale * (0.86 + 0.14 * reveal));

    const intensity = THREE.MathUtils.lerp(THREE.MathUtils.lerp(k, 0.55, live.inner), 0.85, live.contact) * (1 - 0.8 * live.dim);
    uniforms.uTime.value += dt;
    uniforms.uReveal.value = THREE.MathUtils.clamp(reveal * 1.25 - 0.1, 0, 1.2);
    uniforms.uIntensity.value = intensity * Math.min(1, reveal * 1.6);
    metal.opacity = 1;

    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, live.pointer.x * 0.25 + (live.chapter > 1.5 && live.chapter < 2.5 ? 0.45 : 0) - live.inner * 0.35 * (narrow ? 0 : 1), 0.05);
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -live.pointer.y * 0.18, 0.05);
    }
    if (arcs.current) {
      arcs.current.children.forEach((c, i) => (c.rotation.z = t * (0.08 + i * 0.045) * (i % 2 ? -1 : 1) + i));
    }
    if (edgeMat.current) edgeMat.current.color.copy(GOLD).multiplyScalar(0.2 + 1.8 * intensity * reveal * (0.9 + 0.1 * Math.sin(t * 2))); // same peak in the hero, dims with the portal
    if (light.current) light.current.intensity = 14 * intensity * reveal;
    g.visible = reveal > 0.001;
  });

  return (
    <group ref={group}>
      <group ref={tilt}>
        {/* energy core */}
        <mesh position={[0, 0, -0.05]} renderOrder={1} material={energyMat}>
          <circleGeometry args={[2.52, 96]} />
        </mesh>

        {/* main ring */}
        <mesh material={metal}>
          <torusGeometry args={[2.78, 0.2, 48, 220]} />
        </mesh>
        {/* inner lip */}
        <mesh material={darkMetal} position={[0, 0, 0.04]}>
          <torusGeometry args={[2.55, 0.07, 24, 200]} />
        </mesh>
        {/* gold emissive edge */}
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[2.5, 0.012, 8, 220]} />
          <meshBasicMaterial ref={edgeMat} color={GOLD} toneMapped={false} />
        </mesh>
        {/* structural ribs */}
        <instancedMesh ref={ribs} args={[undefined, undefined, RIBS]} material={darkMetal}>
          <boxGeometry args={[0.1, 0.52, 0.34]} />
        </instancedMesh>
        {/* depth ring behind */}
        <mesh material={darkMetal} position={[0, 0, -0.7]}>
          <torusGeometry args={[2.95, 0.05, 16, 200]} />
        </mesh>
        {/* orbiting arcs */}
        <group ref={arcs}>
          {[3.32, 3.55, 3.85].map((r, i) => (
            <mesh key={r} material={i === 1 ? darkMetal : metal} position={[0, 0, -0.1 - i * 0.25]}>
              <torusGeometry args={[r, i === 1 ? 0.018 : 0.032, 8, 120, Math.PI * (0.35 + i * 0.22)]} />
            </mesh>
          ))}
        </group>
        <pointLight ref={light} color={GOLD} intensity={0} distance={9} decay={1.6} position={[0, 0, 0.6]} />
      </group>
    </group>
  );
}
