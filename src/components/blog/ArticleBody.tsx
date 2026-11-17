import type { BlogBlock } from '../../data';

/** Renders article content from structured blocks (works the same for local data, a CMS or an API). */
export function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  let firstP = true;
  return (
    <div className="article">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p': {
            const lead = firstP;
            firstP = false;
            return (
              <p key={i} className={lead ? 'article__lead' : undefined}>
                {b.text}
              </p>
            );
          }
          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'list': {
            const L = b.ordered ? 'ol' : 'ul';
            return (
              <L key={i} className={b.ordered ? 'article__ol' : 'article__ul'}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </L>
            );
          }
          case 'quote':
            return (
              <blockquote key={i} className="article__quote">
                <p>{b.text}</p>
                {b.cite && <cite>{b.cite}</cite>}
              </blockquote>
            );
          case 'callout':
            return (
              <aside key={i} className="article__callout">
                <strong>{b.title}</strong>
                <p>{b.text}</p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
