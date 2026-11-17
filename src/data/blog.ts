import type { BlogPost } from './types';

/**
 * Blog posts.
 *
 * TODAY: every card links to /blog/:slug, and the detail page renders the single
 * article in `DETAIL_POST` (the only post with a `body`).
 *
 * LATER (dynamic): give every post a `body` here — or load posts from a CMS/API —
 * and switch the lookup in src/pages/BlogDetails/BlogDetails.tsx (see `getPost`).
 * Card URLs are already per-post, so nothing else needs to change.
 *
 * NOTE: these are starter articles written for launch. Review dates, authorship
 * and wording before publishing.
 */
export const posts: BlogPost[] = [
  {
    slug: 'ready-system-vs-custom-software',
    title: 'Ready system or custom software? How to choose for your business',
    excerpt:
      'Ready systems get you live fast; custom software fits you exactly. Here is a practical way to decide — and why many businesses start with one and grow into the other.',
    category: 'Software Strategy',
    date: '2026-11-12',
    readMinutes: 6,
    author: 'CHTS Team',
    featured: true,
    tags: ['Software', 'SaaS', 'Planning'],
    body: [
      {
        type: 'p',
        text: 'Every growing business reaches the point where spreadsheets and messaging apps stop being enough. Orders slip, stock numbers drift and reports take a day to assemble. The next step is software — and the first big decision is whether to deploy a ready system or build something custom.',
      },
      {
        type: 'p',
        text: 'Both are valid. The right answer depends less on technology and more on how standard your processes are, how quickly you need results and where you expect the business to be in two or three years.',
      },
      { type: 'h2', id: 'what-is-a-ready-system', text: 'What a ready system gives you' },
      {
        type: 'p',
        text: 'A ready system is a proven product — an LMS, a point-of-sale and inventory manager, a restaurant billing system, an e-commerce platform — that already covers the common workflows of an industry. You configure it, brand it and go live.',
      },
      {
        type: 'list',
        items: [
          'Speed: you can be operational in days or weeks rather than months.',
          'Lower upfront cost, because the core has already been built and tested.',
          'A clear picture of what you get before you commit — you can try a live demo first.',
        ],
      },
      { type: 'h2', id: 'when-custom-makes-sense', text: 'When custom software makes more sense' },
      {
        type: 'p',
        text: 'Custom software is built around your exact process. It earns its cost when the way you work is a competitive advantage, when you need to integrate several existing tools, or when off-the-shelf systems force your team into awkward workarounds.',
      },
      {
        type: 'list',
        items: [
          'Your workflow is unusual, regulated or central to how you win customers.',
          'You need deep integration with existing systems, payment providers or partner APIs.',
          'You expect significant growth in users, data or features and want to own the roadmap.',
        ],
      },
      {
        type: 'callout',
        title: 'A useful rule of thumb',
        text: 'If more than about a fifth of your requirements are things a ready system cannot do through configuration, it is worth pricing a custom build — or a ready system with custom modules.',
      },
      { type: 'h2', id: 'the-hybrid-path', text: 'The hybrid path most businesses take' },
      {
        type: 'p',
        text: 'The choice is rarely all-or-nothing. A common and cost-effective approach is to start on a ready system, learn what your team actually needs, then extend it with custom modules, integrations or a mobile app as the business grows.',
      },
      {
        type: 'quote',
        text: 'Choose the option that gets real users onto the software soonest — then let real usage tell you what to build next.',
      },
      { type: 'h2', id: 'questions-to-ask', text: 'Questions to answer before you decide' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Which three workflows cost your team the most time today?',
          'Which of those are standard for your industry, and which are unique to you?',
          'What has to connect to the new system — accounting, payments, messaging, websites?',
          'Who will own and maintain the system after launch?',
          'What does success look like in six months, and how will you measure it?',
        ],
      },
      { type: 'h2', id: 'next-steps', text: 'Next steps' },
      {
        type: 'p',
        text: 'Write down your answers, try a live demo of a ready system in your category, and talk to a development partner about the gaps. A good partner will tell you honestly when a ready system is enough — and plan the custom work only where it pays off.',
      },
    ],
  },
  {
    slug: 'ai-chatbots-for-customer-support',
    title: 'What AI chatbots can (and can’t) do for customer support',
    excerpt:
      'Automated chat can answer common questions instantly and route the rest to your team. A realistic look at where AI helps, where humans still matter and how to roll it out.',
    category: 'AI & Automation',
    date: '2026-11-05',
    readMinutes: 5,
    author: 'CHTS Team',
    tags: ['AI', 'Chatbots', 'Support'],
  },
  {
    slug: 'designing-architecture-for-a-growing-saas',
    title: 'Designing system architecture for a SaaS that will grow',
    excerpt:
      'Modular monolith or microservices? How to structure data, tenants and integrations so your product can scale without a rewrite.',
    category: 'Architecture',
    date: '2026-10-28',
    readMinutes: 8,
    author: 'CHTS Team',
    tags: ['Architecture', 'SaaS', 'Scalability'],
  },
  {
    slug: 'laravel-security-checklist',
    title: 'A practical security checklist for Laravel applications',
    excerpt:
      'Authentication, validation, secrets, headers, backups and updates — the essentials we review on every Laravel project before it goes live.',
    category: 'Cyber Security',
    date: '2026-10-20',
    readMinutes: 7,
    author: 'CHTS Team',
    tags: ['Security', 'Laravel', 'PHP'],
  },
  {
    slug: 'before-you-hire-a-software-agency',
    title: 'What to prepare before you hire a software agency',
    excerpt:
      'Clear goals, real examples and a decision-maker go a long way. A short guide to briefing a development partner so you get accurate estimates.',
    category: 'Software Strategy',
    date: '2026-10-11',
    readMinutes: 4,
    author: 'CHTS Team',
    tags: ['Planning', 'Outsourcing'],
  },
  {
    slug: 'native-android-app-for-your-platform',
    title: 'When your web platform needs a native Android app',
    excerpt:
      'Push notifications, offline access and a home-screen presence. How to tell if your users need an app — and how to build one on your existing backend.',
    category: 'Mobile',
    date: '2026-10-02',
    readMinutes: 5,
    author: 'CHTS Team',
    tags: ['Android', 'Kotlin', 'Mobile'],
  },
];

/** The article the detail page shows until the blog becomes dynamic. */
export const DETAIL_POST = posts.find((p) => p.body) ?? posts[0];

export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
