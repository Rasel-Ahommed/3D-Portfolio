
// Generates public/sitemap.xml from the content data files.
// Compatible with Windows and Node.js 22.18+.

import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const load = (f) =>
  import(pathToFileURL(resolve(root, 'src/data', f)).href);

const { SITE_URL } = await load('site.ts');
const { projects } = await load('projects.ts');
const { products } = await load('products.ts');
const { DETAIL_POST } = await load('blog.ts');

const showDrafts = process.env.VITE_SHOW_DRAFTS === 'true';
const today = new Date().toISOString().slice(0, 10);

const routes = [
  ['/', '1.0'],
  ['/about', '0.8'],
  ['/services', '0.9'],
  ['/projects', '0.9'],
  ['/products', '0.9'],
  ['/team', '0.6'],
  ['/blog', '0.7'],

  // Currently available blog article
  [`/blog/${DETAIL_POST.slug}`, '0.6'],

  ['/careers', '0.6'],
  ['/contact', '0.8'],
  ['/privacy', '0.2'],
  ['/terms', '0.2'],

  ...projects
    .filter((p) => showDrafts || !p.draft)
    .map((p) => [`/projects/${p.slug}`, '0.7']),

  ...products
    .filter((p) => showDrafts || !p.draft)
    .map((p) => [`/products/${p.slug}`, '0.7']),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, priority]) =>
      `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);

console.log(`sitemap.xml written with ${routes.length} URLs`);
