import { useEffect } from 'react';
import { sceneState } from '../scenes/store';

/** Pushes the background portal back while a page has its own focal visual. */
export function usePortalDim(amount = 1) {
  useEffect(() => {
    sceneState.portalDim = amount;
    return () => {
      sceneState.portalDim = 0;
    };
  }, [amount]);
}
