import { useEffect } from 'react';

type Disposable = { dispose: () => void } | null | undefined;

/** Disposes GPU resources created imperatively (useMemo) when the component unmounts. */
export function useDispose(...items: Disposable[]) {
  useEffect(
    () => () => items.forEach((i) => i?.dispose()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    items,
  );
}
