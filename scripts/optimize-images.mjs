// Image optimiser — turns large originals into small, responsive WebP sets.
//
//   1. Put originals in  assets-src/images/  (any sub-folders, e.g. team/cto.jpg)
//   2. Run               npm run images
//   3. Use the printed path in src/data, e.g.  portrait: '/images/team/cto-{w}.webp'
//
// For every image it writes 480 / 768 / 1024 / 1440 / 1920 px WebP files into
// public/images/<same folder>/ (never upscaling), auto-rotates from EXIF, strips
// metadata, and lowers quality until the 1024 px version is under the budget.
import { readdir, mkdir, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'assets-src/images');
const OUT = join(root, 'public/images');
const WIDTHS = [480, 768, 1024, 1440, 1920]; // keep in sync with src/utils/image.ts
const BUDGET_KB = 150; // target for the 1024 px file
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic']);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(e.name).toLowerCase())) yield p;
  }
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let count = 0;
let before = 0;
let after = 0;

for await (const file of walk(SRC)) {
  const rel = relative(SRC, file);
  const outDir = join(OUT, dirname(rel));
  const name = slug(basename(rel, extname(rel)));
  await mkdir(outDir, { recursive: true });
  const srcSize = (await stat(file)).size;
  before += srcSize;

  // find a quality that keeps the 1024 px version under budget
  let quality = 80;
  while (quality > 50) {
    const buf = await sharp(file).rotate().resize({ width: 1024, withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();
    if (buf.length / 1024 <= BUDGET_KB) break;
    quality -= 6;
  }

  const sizes = [];
  for (const w of WIDTHS) {
    const out = join(outDir, `${name}-${w}.webp`);
    const info = await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(out);
    sizes.push(`${w}:${Math.round(info.size / 1024)}KB`);
    after += w === 1024 ? info.size : 0;
  }
  count++;
  const usePath = '/' + relative(join(root, 'public'), join(outDir, `${name}-{w}.webp`)).split('\\').join('/');
  console.log(`✓ ${rel}  ${(srcSize / 1024 / 1024).toFixed(2)} MB → q${quality}  [${sizes.join(' ')}]\n    use: '${usePath}'`);
}

if (!count) console.log(`No images found. Put originals in ${relative(root, SRC)}/ and run again.`);
else console.log(`\n${count} image(s): originals ${(before / 1024 / 1024).toFixed(1)} MB → 1024px versions ${(after / 1024).toFixed(0)} KB total`);
