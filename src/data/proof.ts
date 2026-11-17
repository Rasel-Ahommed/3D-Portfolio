/**
 * Proof points & supporting content added after the design audit.
 *
 * RULE: only publish numbers you can verify. Any stat whose `value` is null is
 * hidden automatically — fill it in and it appears everywhere (home, About, Why CHTS).
 * Items marked `// CONFIRM` are sensible defaults that you must check.
 */
import { products } from './products';
import { company } from './site';

export type Stat = { label: string; value: string | null; note?: string };

export const stats: Stat[] = [
  { label: 'Years in business', value: null }, // e.g. '6+'
  { label: 'Projects delivered', value: null }, // e.g. '120+'
  { label: 'Countries served', value: String(company.markets.length), note: company.markets.join(' · ') },
  { label: 'Ready products', value: String(products.filter((p) => !p.draft).length) },
  { label: 'Roadmap delivered in', value: '48 hrs' },
  { label: 'Average response time', value: null }, // e.g. '< 4 hrs'
];

export const visibleStats = stats.filter((s): s is Stat & { value: string } => Boolean(s.value));

/** Industries we build for (from CHTS's target market). */
export const industries = [
  { name: 'Real estate', text: 'Listing portals, CRMs and booking flows for agencies and developers.' },
  { name: 'Restaurants & hospitality', text: 'Ordering, billing, POS and table management.' },
  { name: 'Travel agencies', text: 'Booking, enquiry automation and customer portals.' },
  { name: 'Education', text: 'LMS, exam preparation and institute management.' },
  { name: 'Retail & e-commerce', text: 'Single and multi-vendor stores, inventory and POS.' },
];

/** Plan / Build / Deliver durations shown in the process. */
export const processTimelines: Record<string, string | null> = {
  Plan: '48 hours',
  Build: null, // e.g. '2–12 weeks, in 2-week sprints'
  Deliver: null, // e.g. '1 week + 30 days support'
};

/** How clients can engage. Prices are hidden while null. */
export const engagementModels = [
  {
    name: 'Fixed-scope project',
    best: 'Clear requirements, defined budget',
    points: ['Scope, price and timeline agreed up front', 'Milestone-based payments', 'Ideal for websites, MVPs and ready-system customisation'],
    from: null as string | null, // e.g. 'From $1,500'
  },
  {
    name: 'Dedicated team',
    best: 'Ongoing product development',
    points: ['Your own developers, designer and PM', 'Monthly retainer, flexible size', 'Works inside your tools and rituals'],
    from: null as string | null,
  },
  {
    name: 'Support & maintenance',
    best: 'Live systems that must stay healthy',
    points: ['Monitoring, updates and security patches', 'Agreed response times', 'Small improvements every month'],
    from: null as string | null,
  },
];

/** Office hours in Dhaka (GMT+6). Used to show overlap with client time zones. */
export const officeHours = {
  days: 'Sunday – Thursday', // CONFIRM
  openHour: 10, // CONFIRM — 10:00 Dhaka time
  closeHour: 19, // CONFIRM — 19:00 Dhaka time
  timeZone: 'Asia/Dhaka',
  utcOffset: 6,
};

export const clientZones = [
  { label: 'United Kingdom', zone: 'Europe/London' },
  { label: 'UAE / Gulf', zone: 'Asia/Dubai' },
  { label: 'Malaysia', zone: 'Asia/Kuala_Lumpur' },
  { label: 'Australia (Sydney)', zone: 'Australia/Sydney' },
];

/** Marketplace / review profiles. Add real URLs — empty entries are hidden. */
export const profiles: { label: string; href: string }[] = [
  // { label: 'CodeCanyon', href: 'https://codecanyon.net/user/...' },
  // { label: 'Codester', href: 'https://www.codester.com/...' },
  // { label: 'Clutch', href: 'https://clutch.co/profile/...' },
  // { label: 'Upwork', href: 'https://www.upwork.com/agencies/...' },
];

/** Client logos for the logo strip. Without logos the strip falls back to names. */
export const clientLogos: { name: string; src: string; href?: string }[] = [
  // { name: 'M-Hexad Solution', src: '/images/clients/m-hexad.svg' },
];

/** Shared FAQ for the Services page. */
export const servicesFaq = [
  {
    q: 'How quickly can you start?',
    a: 'After a first call we share a roadmap and timeline within 48 hours. Most projects can start within one to two weeks of sign-off.',
  },
  {
    q: 'Do you work with clients outside Bangladesh?',
    a: `Yes. We work with clients in ${company.markets.join(', ')} and plan meetings inside the overlap between our hours and yours.`,
  },
  {
    q: 'Who owns the code?',
    a: 'For custom work, you do. Source code, documentation and credentials are handed over at delivery. Ready systems are licensed — terms are explained before you buy.',
  },
  {
    q: 'Can you take over an existing system?',
    a: 'Yes. We start with a short technical review of the codebase and infrastructure, then propose fixes and improvements in priority order.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes documentation and training. Ongoing support and maintenance is available as a monthly plan.',
  },
];

/** About page — company story. Empty arrays/nulls are hidden in production. */
export const about = {
  foundedYear: null as number | null, // e.g. 2019
  founderNote: null as string | null, // a short note from the founder, in their words
  milestones: [] as { year: string; title: string; text: string }[],
  // e.g. { year: '2021', title: 'First international client', text: '…' }
  officePhotos: [] as { src: string; alt: string }[],
};

/** Careers page content. */
export const careers = {
  location: 'Dhaka, Bangladesh', // CONFIRM on-site / hybrid / remote wording
  workMode: null as string | null, // e.g. 'Hybrid — 3 days in office'
  benefits: [] as { title: string; text: string }[],
  // e.g. { title: 'Learning budget', text: '…' }
  hiringSteps: [
    { title: 'Apply', text: 'Send your CV and links to your work using the form below.' },
    { title: 'Intro call', text: 'A short conversation about you, the role and how we work.' },
    { title: 'Practical task', text: 'A small, paid or time-boxed task close to real work.' },
    { title: 'Final interview', text: 'Meet the people you would work with, then we make a decision quickly.' },
  ], // CONFIRM — edit to match your actual process
  photos: [] as { src: string; alt: string }[],
};
