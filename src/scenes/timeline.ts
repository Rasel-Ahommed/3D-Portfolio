import * as THREE from 'three';

/** Bell-shaped weight around a chapter (1 at `center`, 0 beyond ±width). */
export function weight(chapter: number, center: number, width = 0.9) {
  const x = 1 - Math.min(1, Math.abs(chapter - center) / width);
  return x * x * (3 - 2 * x);
}

type Key = { cam: [number, number, number]; look: [number, number, number] };

/** Camera keyframes per homepage chapter (0 → 5). */
export const CAMERA_KEYS: Key[] = [
  { cam: [0, 0, 9.5], look: [0, 0, 0] }, // hero
  { cam: [0.8, 0.25, 6.2], look: [0, 0, 0] }, // introduction — move closer
  { cam: [-0.6, 0.5, 9], look: [0.2, 0, 0] }, // services
  { cam: [0, -0.4, 10], look: [0, -0.2, 0] }, // projects — panels emerge
  { cam: [0, 0.6, 12.5], look: [0, 0, 0] }, // technology network
  { cam: [0, 0, 7.4], look: [0, 0, 0] }, // contact portal
];

export const INNER_KEY: Key = { cam: [0, 0.2, 11], look: [0, 0, 0] };
export const CONTACT_KEY: Key = { cam: [0, 0, 9], look: [0, 0, 0] };

/** Portal placement per chapter: [x, y, z, scale, intensity]. Desktop values; x is scaled on narrow screens. */
export const PORTAL_KEYS: [number, number, number, number, number][] = [
  [0, 0, 0, 1, 1], // hero — full strength
  // after the hero the portal is a quiet backdrop, so the content stays readable
  [0, 0, 0, 1.06, 0.05], // who we are
  [-3.4, 0.4, -2.5, 0.8, 0.03], // what we do
  [0, 0, -4.5, 0.9, 0.025], // projects
  [0, 0, -7, 0.7, 0.03], // technology → careers
  [0, 0.15, 0, 1.08, 0.03], // contact
];

const ease = (t: number) => t * t * (3 - 2 * t);

export function sampleKeys<T extends number[]>(keys: T[], c: number): number[] {
  const i = Math.max(0, Math.min(keys.length - 1, Math.floor(c)));
  const j = Math.min(keys.length - 1, i + 1);
  const f = ease(Math.max(0, Math.min(1, c - i)));
  return keys[i].map((v, k) => v + (keys[j][k] - v) * f);
}

export function sampleCamera(c: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const i = Math.max(0, Math.min(CAMERA_KEYS.length - 1, Math.floor(c)));
  const j = Math.min(CAMERA_KEYS.length - 1, i + 1);
  const f = ease(Math.max(0, Math.min(1, c - i)));
  outPos.set(...CAMERA_KEYS[i].cam).lerp(new THREE.Vector3(...CAMERA_KEYS[j].cam), f);
  outLook.set(...CAMERA_KEYS[i].look).lerp(new THREE.Vector3(...CAMERA_KEYS[j].look), f);
}

export const GOLD = new THREE.Color('#F4B400');
export const GOLD_2 = new THREE.Color('#D9A441');
