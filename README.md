# CHTS — Immersive 3D Portfolio

Corporate website for **Classical Hunter Tech Solutions LTD (CHTS)**: a multi-page React site that runs on top of one shared, scroll-driven WebGL scene built around a golden portal.

- **Stack:** React 19 · TypeScript · Vite 7 · Three.js r187 · React Three Fiber 9 · drei 10 · @react-three/postprocessing 3 · GSAP 3 + ScrollTrigger · Motion · Lenis · React Router 7
- **Routes:** `/` `/about` `/services` `/projects` `/projects/:slug` `/products` `/products/:slug` `/team` `/careers` `/contact` `/privacy` `/terms` (plus a 404 page)

---

## 1. Quick start

**Requirements:** Node.js **22.18 or newer** (the sitemap script reads the TypeScript data files directly) and npm 10+.

```bash
npm install          # install dependencies
cp .env.example .env # optional: configure the contact form (see §4)
npm run dev          # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload. Drafts and "Content needed" notes are visible. |
| `npm run build` | Regenerates `public/sitemap.xml`, type-checks, and builds to `dist/` |
| `npm run preview` | Serves the production build at http://localhost:4173 |
| `npm run typecheck` | TypeScript check only |
| `npm run sitemap` | Regenerates the sitemap from the content data |

---

## 2. Deploying

`npm run build` produces a static site in `dist/`. It is a single-page app, so every route has to fall back to `index.html`. That fallback is already set up for common hosts:

- **cPanel / Apache:** upload the *contents* of `dist/` to `public_html/`. `dist/.htaccess` (copied from `public/`) handles the fallback and caching.
- **Netlify:** `public/_redirects` is included.
- **Vercel:** `vercel.json` is included.
- **Nginx:** add `try_files $uri /index.html;`

Before going live, check that `SITE_URL` in `src/data/site.ts` is the production domain. Canonical URLs, Open Graph tags and the sitemap all use it.

---

## 3. Editing content

All content lives in **`src/data/`**. You never need to touch JSX to update text.

| File | Contains |
|---|---|
| `site.ts` | Company facts, mission, vision, values, process, contact details, socials, technologies, "Why CHTS" points |
| `services.ts` | The 8 services: description, capabilities, benefits, 3D visual key, related work |
| `projects.ts` | Client projects (case studies) |
| `products.ts` | Products CHTS owns (ready systems and SaaS) |
| `people.ts` | Team, testimonials, client names, job openings |

**Projects vs products:** client work goes in `projects.ts`. Software CHTS owns and sells goes in `products.ts`. The two are kept separate everywhere on the site.

**Drafts and placeholders:**
- `draft: true` on a project or product means it only appears in `npm run dev`, with a "Draft" badge, until you remove the flag.
- Optional fields you leave out (challenge, solution, outcome, features, technologies, gallery…) hide their section automatically. In dev, a dashed **"Content needed"** note shows where verified copy can go. These notes never appear in production unless `VITE_SHOW_PLACEHOLDERS=true`.

**Careers:** add objects to `jobs` in `people.ts`. While the list is empty, the site shows an open-application message. Job postings get JobPosting structured data automatically.

### Content provenance (please review)
- Company facts, services 01/02/04, team, testimonials, contact details, products and their demo URLs come from **chtsltd.com** (fetched Nov 2026).
- Testimonial quotes are **excerpts** of the published testimonials. Paste the full approved text into `people.ts` if you prefer.
- Services 03 and 05–08 use the service list from the project brief. Their capability and benefit lists are written as service descriptions and contain no claims or statistics.
- Client projects come from the published testimonials (M-Hexad Solution, Fast Track IELTS, Study Abroad Malaysia). Two internal projects, **Renter (Android)** and **LifeDrop**, are marked `draft: true` until you confirm they can be public.
- The site shows **no invented statistics**. The only figures are the 48-hour roadmap (from chtsltd.com), the product count (computed from the data), and markets served.
- `/privacy` and `/terms` describe what this website actually does. Have them reviewed by a legal adviser.

---

## 4. Contact form

The form validates input in the browser and has a honeypot field for spam. It **only reports success when your backend returns a 2xx response**. Pick one option, put it in `.env`, then rebuild:

**A. Bundled PHP endpoint (recommended on cPanel).** Tested: validation, CORS, rate-limit and mail delivery all work.
1. Upload `server/contact.php` to e.g. `public_html/api/contact.php`.
2. Edit the constants at the top: `TO_EMAIL`, `FROM_EMAIL` (must be a mailbox on your domain), `ALLOWED_ORIGINS`.
3. `.env` → `VITE_CONTACT_ENDPOINT=/api/contact.php`, then `npm run build`.
4. Send a test enquiry. If mail doesn't arrive, check the host's mail logs or switch to SMTP.

**B. Formspree** (or any JSON endpoint): `VITE_CONTACT_ENDPOINT=https://formspree.io/f/<id>`

**C. Web3Forms:** `VITE_WEB3FORMS_KEY=<access key>`

**With nothing configured,** the form still validates. On submit it tells the visitor that online submission isn't connected yet and offers a pre-filled email to contact@chtsltd.com. It never fakes success.

---

## 5. Brand & assets

| Asset | Location | Notes |
|---|---|---|
| Logo, dark theme | `public/brand/logo-dark-theme.{webp,png}` | Official artwork, cropped to its bounds only. Pixels untouched. Shown on a plate in `#000015`, the colour sampled from the artwork's own background, so it blends with the navy UI. |
| Logo, light theme | `public/brand/logo-light-theme.{webp,png}` | Official artwork, used on white (About → "Our story"). |
| Favicon / touch icon | `public/favicon.png`, `public/apple-touch-icon.png` | The CH mark from the official file on its own background, unaltered. |
| Social share image | `public/og-image.jpg` (1200×630) | Official logo on its original background. |
| Fonts | npm `@fontsource` packages | Manrope (UI/display), Instrument Serif (italic accents), JetBrains Mono (labels). Self-hosted, no Google Fonts requests. |
| Product screenshots, team portraits | Loaded from `chtsltd.com/assets/...` | See below. |
| 3D | Procedural (code) | No GLB files to download. |

**Logo rules in the code:** `src/components/ui/Logo.tsx` only ever renders the original files. It applies no filters, glow or blend modes, and no gold graphics are placed behind it.

**Remote images.** Product screenshots and team portraits currently load straight from chtsltd.com. For faster loading and independence from the old site:
1. Download each file into `public/images/products/` or `public/images/team/`, ideally as WebP/AVIF at about 1600px wide.
2. Update the paths in `src/data/products.ts` and `src/data/people.ts`, e.g. `'/images/products/chatmili.webp'`.

If an image is missing or fails to load, `SmartImage` shows a generated abstract cover in brand colours. It never falls back to a stock photo posing as client work. Client projects show these covers until you add real screenshots (`thumbnail` / `gallery`).

**Why procedural 3D instead of Blender GLBs:** the portal, particles, network, floating panels and all 8 service illustrations are built from Three.js primitives and GLSL shaders. That means zero model downloads, sharp results at any resolution, and colours tied directly to the palette. If you later model assets in Blender, export GLB with Draco compression, put them in `public/models/`, load them with drei's `useGLTF` inside the relevant `src/scenes/models/*` component, and keep them under about 1 MB each.

---

## 6. Architecture

```
src/
  app/            App, router (lazy routes), Layout (page transitions, background, preloader)
  components/
    animations/   SplitText (word reveals), Reveal, RevealImage
    cards/        ProjectCard, ProductCard, TeamCard
    common/       Seo, SmoothScroll (Lenis), Preloader, BackgroundLayer, PageHero, SmartImage, Pending…
    forms/        ContactForm
    navigation/   Nav, SoundToggle
    footer/       Footer
    ui/           Button, Logo, Eyebrow, SectionHead, FilterBar, ServiceGlyph
  scenes/         The 3D layer (lazy-loaded chunk)
    Experience.tsx    single shared <Canvas>, quality tiers, post-processing
    MainScene.tsx     composition + local studio environment (no HDR download)
    Director.tsx      per-frame smoothed state
    CameraController  scroll-driven camera + parallax + intro dolly
    PortalScene       metal rings, ribs, orbiting arcs, GLSL energy core
    ParticleScene     single-draw-call point cloud
    NetworkScene      node network (services/technology chapters)
    PanelsScene       floating interface panels (projects/products chapters)
    ServiceStage      renders the active service model pinned to a DOM element
    models/           8 procedural service illustrations
    store.ts          shared scene state (DOM → 3D bridge)
    shaders.ts        GLSL
  sections/       Homepage sections (Hero … ContactCTA)
  pages/          Route pages
  hooks/          useGsap (context + cleanup), useChapters, useHashScroll, useMediaQuery
  animations/     GSAP registration and defaults
  data/           All content (see §3)
  styles/         tokens · base · layout · components · sections · pages
server/contact.php  Optional mail endpoint
scripts/            Sitemap generator
```

### How the 3D storytelling works
- **One canvas** sits fixed behind the HTML for the whole session, so route changes never create a new WebGL context. All real text stays in the HTML, where search engines and screen readers can read it.
- Each homepage section has a `data-chapter` value. `useChapters` turns scroll position into a continuous chapter number (0 hero → 1 intro → 2 services → 3 projects → 4 technology → 5 contact), and every 3D object eases toward its keyframes for that value. The progression: the portal appears, the camera moves closer, the energy becomes connected nodes, panels emerge, the network forms, and the portal returns for the contact section.
- **Inner pages** set the scene to a calmer "inner" mode with the portal moved to the side. The Contact page has its own mode. The Services page dims the portal so each service's 3D model can take focus.
- **Service models** render inside the same canvas, aligned each frame to a DOM "stage" element, so the layout stays plain HTML/CSS.

### Animation rules
- GSAP + ScrollTrigger handle scroll-driven and entrance animation. Every effect runs inside `gsap.context` (`useGsap`) and is reverted on unmount.
- Motion handles small UI interactions: buttons, filters, menu, page transitions, accordions. It never animates the same element as GSAP.
- Lenis runs on GSAP's ticker, so smooth scrolling and ScrollTrigger stay in sync.
- `prefers-reduced-motion` turns off Lenis and word/scroll animations, and uses the static portal.

---

## 7. Performance

- The 3D bundle (three + R3F + drei + postprocessing, about 295 KB gzip) is **lazy-loaded** while the preloader runs. Initial JS is about 215 KB gzip. Every route is code-split.
- **Quality tiers** are picked from screen width, pointer type, CPU cores and memory:
  - *High:* 2,600 particles, bloom, vignette and grain, DPR up to 1.75
  - *Medium:* 1,300 particles, no post-processing
  - *Low/mobile:* 550 particles, 50 network nodes, DPR ≤ 1.2, and a static glyph instead of 3D in the homepage services stage
- `PerformanceMonitor` steps quality down automatically when the frame rate drops, and `AdaptiveDpr` lowers resolution under load.
- Particles and the network are single draw calls. Ribs use instancing. Materials created in code are disposed on unmount.
- **Fallbacks:** if WebGL is missing or reduced motion is requested, a CSS-only portal renders instead and the site stays fully usable.
- Images lazy-load with `decoding="async"`, and fonts are self-hosted WOFF2.

## 8. SEO & accessibility
- Every page has a unique `<title>`, meta description, canonical URL, Open Graph and Twitter tags (React 19 native metadata).
- JSON-LD: Organization (site-wide), CreativeWork (projects), SoftwareApplication (products), ItemList, ContactPage, and JobPosting when there are openings.
- `public/robots.txt` and an auto-generated `public/sitemap.xml` (drafts excluded).
- Semantic landmarks, one `h1` per page, skip link, visible focus rings, a focus-trapped mobile menu (Esc closes it), labelled form fields with inline errors, and `aria-live` form status.
- **Recommended next step for SEO:** this is a client-rendered SPA. Google renders JavaScript, but for the best coverage across all crawlers you can add prerendering at build time (e.g. `vite-prerender-plugin`) or move to React Router framework mode with SSG.

## 9. What was tested
Tested in headless Chrome (SwiftShader WebGL), desktop 1440×900 and mobile 390×844:
- All 12 routes plus the 404 page render with **no console errors**. Titles and h1s are correct.
- Nav transitions, scroll reset, `/services#…` hash links, project filters and search, and the mobile menu (open, focus, Esc).
- Form validation errors. The not-configured state shows no fake success. The configured state worked end to end through `server/contact.php` (mail captured).
- The no-WebGL and reduced-motion fallbacks.

Not yet tested on real devices or GPUs, and real Safari/Firefox weren't covered. Please check on an iPhone and a mid-range Android before launch.
