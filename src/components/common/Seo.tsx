import { useLocation } from 'react-router';
import { SITE_URL, company } from '../../data';

type Props = { title: string; description: string; image?: string; jsonLd?: object; noindex?: boolean };

/** React 19 hoists <title>, <meta> and <link> into <head> automatically. */
export function Seo({ title, description, image = '/og-image.jpg', jsonLd, noindex }: Props) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  const fullTitle = title.includes('CHTS') ? title : `${title} — CHTS`;
  const img = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...jsonLd })}</script>}
      <meta name="author" content={company.name} />
    </>
  );
}
