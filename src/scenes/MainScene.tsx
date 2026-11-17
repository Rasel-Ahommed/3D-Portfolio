import { Environment, Lightformer } from '@react-three/drei';
import { PortalScene } from './PortalScene';
import { ParticleScene } from './ParticleScene';
import { ServiceStage } from './ServiceStage';
import { CameraController } from './CameraController';
import { Director } from './Director';
import type { Quality } from '../utils/env';

const PARTICLES: Record<Quality, number> = { high: 2600, medium: 1300, low: 550 };

/** Composition of the continuous 3D environment. */
export function MainScene({ quality }: { quality: Quality }) {
  return (
    <>
      <color attach="background" args={['#050514']} />
      <fogExp2 attach="fog" args={['#050514', 0.045]} />
      <Director />
      <CameraController />

      <ambientLight intensity={0.15} />
      <directionalLight position={[-5, 6, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[6, -2, -4]} intensity={0.5} color="#D9A441" />

      {/* Local studio reflections — no HDR download */}
      <Environment resolution={quality === 'high' ? 256 : 128} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 5, -6]} scale={[12, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#F4B400" position={[-6, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 1.2, 1]} />
        <Lightformer form="rect" intensity={0.9} color="#C4C5CE" position={[6, 1, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={1.6} color="#F4B400" position={[0, 0, -8]} scale={4} />
      </Environment>

      <PortalScene />
      <ParticleScene count={PARTICLES[quality]} />
      <ServiceStage />
    </>
  );
}
