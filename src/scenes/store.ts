import { useSyncExternalStore } from 'react';
import type { Quality } from '../utils/env';

/**
 * Shared, mutable scene state.
 * The 3D layer reads it every frame (no React re-renders); the DOM layer writes it
 * from ScrollTrigger callbacks, pointer events and route changes.
 *
 * `chapter` is a continuous value along the homepage story:
 *   0 hero · 1 introduction · 2 services · 3 projects · 4 technology · 5 contact
 */
/**
 * home    — full scroll story; portal only in the hero and the final CTA
 * contact — portal as the page's centrepiece
 * stage   — no portal; the canvas only renders 3D illustrations (service pages)
 * plain   — canvas switched off; a quiet static background is shown instead
 */
export type SceneMode = 'home' | 'contact' | 'stage' | 'plain';

export const sceneState = {
  mode: 'home' as SceneMode,
  chapter: 0,
  pointer: { x: 0, y: 0 },
  /** 0 → 1, animated once after the preloader. */
  reveal: 0,
  activeService: -1,
  serviceAnchor: null as HTMLElement | null,
  /** Element the contact portal should centre on (desktop), if any. */
  portalAnchor: null as HTMLElement | null,
  quality: 'high' as Quality,
  /** 0 → 1: pushes the portal back so other 3D content can take focus. */
  portalDim: 0,
  /** Written by the portal each frame (0–1); other layers follow it. */
  portalVisibility: 1,
};

/* ---------- Small reactive store for UI-level flags ---------- */
type UiState = { introDone: boolean; webgl: 'pending' | 'on' | 'off'; sound: boolean };
let ui: UiState = { introDone: false, webgl: 'pending', sound: false };
const listeners = new Set<() => void>();

export const uiStore = {
  get: () => ui,
  set(patch: Partial<UiState>) {
    ui = { ...ui, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useUi<T>(select: (s: UiState) => T): T {
  return useSyncExternalStore(uiStore.subscribe, () => select(uiStore.get()), () => select(uiStore.get()));
}
