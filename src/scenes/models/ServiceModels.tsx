import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { ServiceVisual } from '../../data/types';
import { GOLD } from '../timeline';
import { useDispose } from '../useDispose';

/*
 * Eight procedural service illustrations. Built from primitives (no model
 * downloads) and sharing three materials, so the whole set costs very little.
 * Each fits roughly inside a 3 × 3 × 3 unit box.
 */

export function useServiceMaterials() {
  const mats = useMemo(
    () => ({
      metal: new THREE.MeshPhysicalMaterial({ color: '#3a3f55', metalness: 0.9, roughness: 0.3, clearcoat: 0.5, envMapIntensity: 1.8 }),
      dark: new THREE.MeshStandardMaterial({ color: '#1a1d2b', metalness: 0.7, roughness: 0.45, envMapIntensity: 1.4 }),
      gold: new THREE.MeshBasicMaterial({ color: GOLD.clone().multiplyScalar(1.4), toneMapped: false }),
      line: new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 }),
      screen: new THREE.MeshBasicMaterial({ color: '#0b0d1c', toneMapped: false }),
    }),
    [],
  );
  useDispose(...Object.values(mats));
  return mats;
}
type Mats = ReturnType<typeof useServiceMaterials>;

function useSpin(speed = 0.25) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.06;
  });
  return ref;
}

function Lines({ segs, mat }: { segs: number[]; mat: THREE.LineBasicMaterial }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
    return g;
  }, [segs]);
  return <lineSegments geometry={geo} material={mat} />;
}

/* 01 — floating digital architecture */
function Software({ m }: { m: Mats }) {
  const ref = useSpin(0.22);
  const blocks = useMemo(() => {
    const out: [number, number, number, number][] = [];
    for (let x = -1; x <= 1; x++)
      for (let z = -1; z <= 1; z++) {
        const h = 0.3 + ((x * 7 + z * 13 + 20) % 5) * 0.28;
        out.push([x * 0.78, h / 2 - 0.9, z * 0.78, h]);
      }
    return out;
  }, []);
  const segs = useMemo(() => blocks.flatMap(([x, , z, h]) => [x, h - 0.9, z, 0, 1.25, 0]), [blocks]);
  return (
    <group ref={ref} rotation={[0.35, 0.6, 0]}>
      {blocks.map(([x, y, z, h], i) => (
        <mesh key={i} position={[x, y, z]} material={i % 4 === 0 ? m.metal : m.dark}>
          <boxGeometry args={[0.56, h, 0.56]} />
        </mesh>
      ))}
      {blocks.map(([x, , z, h], i) => (
        <mesh key={`c${i}`} position={[x, h - 0.9 + 0.01, z]} rotation={[-Math.PI / 2, 0, 0]} material={m.gold}>
          <planeGeometry args={[0.18, 0.18]} />
        </mesh>
      ))}
      <mesh position={[0, 1.3, 0]} material={m.gold}>
        <octahedronGeometry args={[0.16]} />
      </mesh>
      <Lines segs={segs} mat={m.line} />
    </group>
  );
}

/* 02 — neural network */
function AI({ m }: { m: Mats }) {
  const ref = useSpin(0.18);
  const layers = [3, 5, 5, 2];
  const nodes = useMemo(() => layers.flatMap((n, l) => Array.from({ length: n }, (_, i) => new THREE.Vector3((l - 1.5) * 0.95, (i - (n - 1) / 2) * 0.55, 0))), []);
  const segs = useMemo(() => {
    const s: number[] = [];
    let off = 0;
    layers.forEach((n, l) => {
      if (l === layers.length - 1) return;
      const next = layers[l + 1];
      for (let a = 0; a < n; a++) for (let b = 0; b < next; b++) {
        const p = nodes[off + a];
        const q = nodes[off + n + b];
        s.push(p.x, p.y, p.z, q.x, q.y, q.z);
      }
      off += n;
    });
    return s;
  }, [nodes]);
  const pulse = useRef<THREE.Group>(null);
  useFrame((st) => {
    pulse.current?.children.forEach((c, i) => {
      const s = 0.8 + 0.4 * Math.sin(st.clock.elapsedTime * 3 - i * 0.6);
      c.scale.setScalar(s);
    });
  });
  return (
    <group ref={ref}>
      <Lines segs={segs} mat={m.line} />
      <group ref={pulse}>
        {nodes.map((p, i) => (
          <mesh key={i} position={p} material={i % 3 === 0 ? m.gold : m.metal}>
            <sphereGeometry args={[0.11, 20, 20]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* 03 — smartphone with floating UI */
function Mobile({ m }: { m: Mats }) {
  const ref = useSpin(0.3);
  return (
    <group ref={ref} rotation={[0.1, -0.4, 0.08]}>
      <RoundedBox args={[1.25, 2.5, 0.12]} radius={0.14} smoothness={4} material={m.metal} />
      <mesh position={[0, 0, 0.065]} material={m.screen}>
        <planeGeometry args={[1.08, 2.28]} />
      </mesh>
      {[0.75, 0.35, -0.05, -0.45].map((y, i) => (
        <mesh key={y} position={[i === 0 ? -0.12 : 0, y, 0.07]} material={i === 0 ? m.gold : m.dark}>
          <planeGeometry args={[i === 0 ? 0.7 : 0.88, i === 0 ? 0.12 : 0.26]} />
        </mesh>
      ))}
      {[[-1.05, 0.6, 0.4], [1.0, -0.2, 0.5], [-0.9, -0.85, 0.3]].map(([x, y, z], i) => (
        <RoundedBox key={i} args={[0.7, 0.4, 0.04]} radius={0.06} position={[x, y, z]} material={i === 1 ? m.gold : m.dark} />
      ))}
    </group>
  );
}

/* 04 — layered interface panels */
function UIUX({ m }: { m: Mats }) {
  const ref = useSpin(0.16);
  return (
    <group ref={ref} rotation={[-0.5, 0.5, 0.15]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[i * 0.18, i * 0.42 - 0.4, i * 0.1]}>
          <RoundedBox args={[2.1, 1.35, 0.04]} radius={0.06} material={i === 2 ? m.metal : m.dark} />
          <mesh position={[-0.55, 0.42, 0.03]} material={m.gold}>
            <planeGeometry args={[0.6, 0.08]} />
          </mesh>
          {i === 2 && (
            <mesh position={[0.5, -0.2, 0.05]} material={m.gold}>
              <circleGeometry args={[0.18, 32]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* 05 — connected cloud infrastructure */
function SaaS({ m }: { m: Mats }) {
  const ref = useSpin(0.2);
  const puffs: [number, number, number, number][] = [[0, 0.75, 0, 0.62], [-0.65, 0.55, 0, 0.45], [0.65, 0.55, 0.05, 0.48], [-0.3, 1.05, -0.1, 0.42], [0.3, 1.05, 0.1, 0.4]];
  const ends = [[-1.1, -1.0, 0.3], [0, -1.15, 0.6], [1.1, -1.0, 0.3], [-0.55, -1.1, -0.6], [0.55, -1.1, -0.6]];
  const segs = ends.flatMap(([x, y, z]) => [0, 0.3, 0, x, y, z]);
  return (
    <group ref={ref}>
      {puffs.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} material={m.metal}>
          <icosahedronGeometry args={[r, 2]} />
        </mesh>
      ))}
      <Lines segs={segs} mat={m.line} />
      {ends.map(([x, y, z], i) => (
        <RoundedBox key={i} args={[0.34, 0.2, 0.34]} radius={0.04} position={[x, y, z]} material={i % 2 ? m.dark : m.gold} />
      ))}
    </group>
  );
}

/* 06 — stylised game environment */
function Game({ m }: { m: Mats }) {
  const ref = useSpin(0.25);
  const terrain = useMemo(() => {
    const g = new THREE.PlaneGeometry(2.8, 2.8, 14, 14);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      p.setZ(i, Math.sin(x * 2.1) * Math.cos(y * 1.7) * 0.25 + Math.random() * 0.06);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const gem = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (gem.current) {
      gem.current.rotation.y = s.clock.elapsedTime;
      gem.current.position.y = 0.6 + Math.sin(s.clock.elapsedTime * 1.6) * 0.12;
    }
  });
  return (
    <group ref={ref} rotation={[0.45, 0, 0]}>
      <mesh geometry={terrain} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#141726" metalness={0.6} roughness={0.5} flatShading />
      </mesh>
      <mesh ref={gem} material={m.gold}>
        <octahedronGeometry args={[0.3, 0]} />
      </mesh>
      {[[-0.8, -0.2, 0.5], [0.9, -0.25, -0.4], [0.2, -0.3, 0.9]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={m.metal}>
          <boxGeometry args={[0.28, 0.28 + i * 0.12, 0.28]} />
        </mesh>
      ))}
    </group>
  );
}

/* 07 — abstract image & video creation */
function Media({ m }: { m: Mats }) {
  const ref = useSpin(0.12);
  const frames = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (frames.current) frames.current.rotation.z += dt * 0.25;
  });
  return (
    <group ref={ref}>
      <group ref={frames}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0]} rotation={[0, 0, a + Math.PI / 2]}>
              <RoundedBox args={[0.62, 0.42, 0.04]} radius={0.04} material={i % 3 === 0 ? m.gold : m.dark} />
            </group>
          );
        })}
      </group>
      <mesh material={m.metal}>
        <torusGeometry args={[0.55, 0.08, 24, 64]} />
      </mesh>
      <mesh material={m.gold} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.18, 3]} />
      </mesh>
    </group>
  );
}

/* 08 — connected servers & network */
function Infra({ m }: { m: Mats }) {
  const ref = useSpin(0.2);
  const racks: [number, number][] = [[-0.85, 0], [0, -0.35], [0.85, 0]];
  const segs = [-0.85, 1.2, 0, 0, 1.6, 0, 0, 1.6, 0, 0.85, 1.2, 0, 0, 1.6, 0, 0, 0.95, -0.35];
  return (
    <group ref={ref} rotation={[0.25, 0.4, 0]}>
      {racks.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <RoundedBox args={[0.62, 2.0, 0.62]} radius={0.04} material={m.metal} />
          {Array.from({ length: 6 }, (_, k) => (
            <mesh key={k} position={[0, -0.75 + k * 0.3, 0.315]} material={(k + i) % 3 === 0 ? m.gold : m.dark}>
              <planeGeometry args={[0.44, 0.05]} />
            </mesh>
          ))}
        </group>
      ))}
      <Lines segs={segs} mat={m.line} />
      <mesh position={[0, 1.6, 0]} material={m.gold}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
    </group>
  );
}

export const SERVICE_MODELS: Record<ServiceVisual, (p: { m: Mats }) => React.JSX.Element> = {
  software: Software,
  ai: AI,
  mobile: Mobile,
  uiux: UIUX,
  saas: SaaS,
  game: Game,
  media: Media,
  infra: Infra,
};
