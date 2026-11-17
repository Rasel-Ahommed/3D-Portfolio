import { SectionHead } from '../ui/SectionHead';

/** Accessible FAQ using native <details>, plus FAQPage structured data. */
export function Faq({ items, title = 'Frequently asked *questions.*', eyebrow = 'FAQ', id = 'faq' }: { items: { q: string; a: string }[]; title?: string; eyebrow?: string; id?: string }) {
  if (!items.length) return null;
  return (
    <section className="section section--tight" aria-labelledby={`${id}-title`}>
      <div className="container faq-wrap">
        <SectionHead eyebrow={eyebrow} title={title} titleId={`${id}-title`} />
        <div className="faq">
          {items.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                <span>{f.q}</span>
                <i aria-hidden />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        })}
      </script>
    </section>
  );
}
