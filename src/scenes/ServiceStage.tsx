import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { services } from '../data/services';
import { SERVICE_MODELS, useServiceMaterials } from './models/ServiceModels';
import { sceneState } from './store';
import { live } from './Director';

const DIST = 7;

/**
 * Renders the active service's 3D illustration inside the shared canvas,
 * pinned to a DOM "stage" element (sceneState.serviceAnchor). This avoids a
 * second WebGL context while keeping the model aligned with the layout.
 */
export function ServiceStage() {
  const mats = useServiceMaterials();
  const root = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const v = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const scales = useRef(services.map(() => 0));

  useFrame((_, dt) => {
    const g = root.current;
    const el = sceneState.serviceAnchor;
    if (!g) return;
    if (!el) {
      g.visible = false;
      return;
    }
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const onScreen = r.bottom > 0 && r.top < vh && r.width > 0;
    g.visible = onScreen;
    if (!onScreen) return;

    const nx = ((r.left + r.width / 2) / window.innerWidth) * 2 - 1;
    const ny = -((r.top + r.height / 2) / vh) * 2 + 1;
    v.set(nx, ny, 0.5).unproject(camera);
    dir.copy(v).sub(camera.position).normalize();
    g.position.copy(camera.position).addScaledVector(dir, DIST);
    g.quaternion.copy(camera.quaternion);

    const worldH = 2 * DIST * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const s = ((Math.min(r.height, r.width * 1.1) / vh) * worldH) / 3.6;
    g.scale.setScalar(s);

    g.children.forEach((c, i) => {
      const target = i === sceneState.activeService ? 1 : 0;
      scales.current[i] = THREE.MathUtils.damp(scales.current[i], target, 7, dt);
      const k = scales.current[i];
      c.visible = k > 0.01;
      c.scale.setScalar(k);
      c.rotation.y = (1 - k) * 1.2 + live.pointer.x * 0.3;
      c.rotation.x = -live.pointer.y * 0.2;
    });
  });

  return (
    <group ref={root} visible={false}>
      {services.map((s) => {
        const Model = SERVICE_MODELS[s.visual];
        return (
          <group key={s.slug} visible={false}>
            <Model m={mats} />
          </group>
        );
      })}
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <directionalLight position={[-3, 1, 2]} intensity={0.6} color="#D9A441" />
      <hemisphereLight args={['#c4c5ce', '#050514', 0.6]} />
    </group>
  );
}
