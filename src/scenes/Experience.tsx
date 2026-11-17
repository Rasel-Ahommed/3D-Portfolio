import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { MainScene } from './MainScene';
import { sceneState } from './store';
import type { Quality } from '../utils/env';

/**
 * The single, shared WebGL canvas. Fixed behind the HTML content, never
 * contains essential text, and degrades gracefully on weaker devices.
 */
export default function Experience({ quality: initial, active = true }: { quality: Quality; active?: boolean }) {
  const [quality, setQuality] = useState<Quality>(initial);
  const [fx, setFx] = useState(initial === 'high');
  const dpr: [number, number] = quality === 'high' ? [1, 1.75] : quality === 'medium' ? [1, 1.4] : [0.8, 1.2];

  useEffect(() => {
    sceneState.quality = quality;
  }, [quality]);

  // Pages without 3D: let the scene settle/fade, then stop rendering entirely.
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');
  useEffect(() => {
    if (active) {
      setFrameloop('always');
      return;
    }
    const id = setTimeout(() => setFrameloop('never'), 1000);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <Canvas
      className="experience"
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance', alpha: false, stencil: false }}
      camera={{ fov: 38, near: 0.1, far: 80, position: [0, 0, 16] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      aria-hidden
      tabIndex={-1}
    >
      <PerformanceMonitor
        onDecline={() => {
          setFx(false);
          setQuality((q) => (q === 'high' ? 'medium' : 'low'));
        }}
        flipflops={2}
      >
        <Suspense fallback={null}>
          <MainScene quality={quality} />
        </Suspense>
        <AdaptiveDpr pixelated={false} />
        {fx && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.75} luminanceThreshold={0.62} luminanceSmoothing={0.2} radius={0.7} />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.22} darkness={0.75} />
          </EffectComposer>
        )}
      </PerformanceMonitor>
    </Canvas>
  );
}
