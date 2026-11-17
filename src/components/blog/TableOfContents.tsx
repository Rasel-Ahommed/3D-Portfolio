import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../common/SmoothScroll';
import { cn } from '../../utils/cn';

/** Sticky table of contents with active-section highlighting. */
export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ol>
        {items.map((i, n) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(active === i.id && 'is-active')}
              aria-current={active === i.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(i.id);
                if (el) scrollTo(el);
                history.replaceState(null, '', `#${i.id}`);
              }}
            >
              <span>{String(n + 1).padStart(2, '0')}</span>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
