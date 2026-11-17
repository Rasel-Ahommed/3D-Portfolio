import type { JobOpening, TeamMember, Testimonial } from './types';

/** Source: https://chtsltd.com/our-team (Nov 2026). */
const TEAM_IMG = '/team';

export const team: TeamMember[] = [
  {
    slug: 'samir-khan',
    name: 'Samir Khan',
    role: 'Founder & Chairman',
    bio: 'Simplifying Complexity Through Innovation.',
    portrait: `${TEAM_IMG}/md.jpg`,
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samir-khan-b83178227' },
      { label: 'X', href: 'https://x.com/Samirkhan33990' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/1AtksC7BtY/' },
    ],
  },
  {
    slug: 'rasel-ahmed-rana',
    name: 'Rasel Ahmed Rana',
    role: 'Chief Executive Officer',
    bio: 'Think Smart. Build Best.',
    portrait: `${TEAM_IMG}/ceo.jpeg`,
    socials: [{ label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579125720580' }],
  },
  {
    slug: 'hridoy-sheikh',
    name: 'Hridoy Sheikh',
    role: 'Chief Technology Officer',
    bio: 'Turning complex problems into smart solutions.',
    portrait: `${TEAM_IMG}/cto.jpg`,
    socials: [
      { label: 'Facebook', href: 'https://www.facebook.com/share/17ZLKcGFEH/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dev-redoy123/' }
    ],
  },
  {
    slug: 'nijwel-islam',
    name: 'Nijwel Islam',
    role: 'Senior Software Engineer',
    bio: 'Building the future, one feature at a time.',
    portrait: `${TEAM_IMG}/sse.png`,
  },
  {
    slug: 'sible-hossain',
    name: 'Sible Hossain',
    role: 'Affiliate Business Partner',
    bio: 'Building Partnerships, Creating Shared Success.',
    portrait: `${TEAM_IMG}/abp.png`,
  },
];

/**
 * Source: testimonials published on https://chtsltd.com (Nov 2026).
 * Quotes are excerpts of the published testimonials — paste the full
 * approved text here if you want the longer versions.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'm-hexad',
    quote: 'They delivered a professional website that perfectly represents our brand.',
    name: 'Mack Mahen',
    designation: 'Managing Director & Founder',
    company: 'M-Hexad Solution',
  },
  {
    id: 'fast-track-ielts',
    quote: 'A highly professional and dependable team.',
    name: 'Md Zahirul Islam',
    designation: 'Managing Director',
    company: 'Fast Track IELTS',
  },
  {
    id: 'study-abroad-malaysia',
    quote: 'Responsive, professional, and supportive — with 24/7 assistance.',
    name: 'Chandbir',
    designation: 'CTO',
    company: 'Study Abroad Malaysia',
  },
  {
    id: 'pte',
    quote: 'Great communication, strong support system, and always available when needed.',
    name: 'Rayhan Ahmed Sajid',
    designation: 'CTO',
    company: 'PTE',
  },
];

/** Client names shown in the client strip (all have published testimonials). */
export const clients = ['M-Hexad Solution', 'Fast Track IELTS', 'Study Abroad Malaysia', 'PTE'];

/**
 * Open positions. Add an object to publish a role, e.g.
 * {
 *   slug: 'laravel-developer',
 *   title: 'Laravel Developer',
 *   type: 'Full-time',
 *   location: 'Dhaka (on-site)',
 *   summary: '…',
 *   description: '…',
 *   requirements: ['…'],
 * }
 * While the list is empty the site shows an open-application message.
 */
export const jobs: JobOpening[] = [];
