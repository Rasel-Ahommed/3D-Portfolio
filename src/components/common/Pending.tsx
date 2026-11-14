import type { ReactNode } from 'react';
import { SHOW_PLACEHOLDERS } from '../../data';

/**
 * Clearly marked editable placeholder for content that still needs to be
 * supplied or verified. Rendered only in development (or with
 * VITE_SHOW_PLACEHOLDERS=true) — production never shows unverified copy.
 */
export function Pending({ children, file }: { children: ReactNode; file?: string }) {
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <div className="pending" role="note">
      <span className="pending__tag">Content needed</span>
      <span>{children}</span>
      {file && <code>{file}</code>}
    </div>
  );
}

export function DraftBadge({ draft }: { draft?: boolean }) {
  if (!draft) return null;
  return <span className="draft-badge" title="Draft — only visible in development until approved">Draft</span>;
}
