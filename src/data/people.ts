import type { JobOpening, TeamMember, Testimonial } from './types';

/** Source: https://chtsltd.com/our-team (Nov 2026). */
const TEAM_IMG = 'https://chtsltd.com/assets/images/frontend/team';

export const team: TeamMember[] = [
  {
    slug: 'samir-khan',
    name: 'Samir Khan',
    role: 'Founder & Chairman',
    bio: 'Leads strategy, growth and key decisions — driving global expansion, client acquisition and scalable software solutions.',
    portrait: `${TEAM_IMG}/e907e9a5-735e-4fc5-9be9-f79721258d5a.png`,
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samir-khan-b83178227' },
      { label: 'X', href: 'https://x.com/Samirkhan33990' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/1AtksC7BtY/' },
    ],
  },
  {
    slug: 'hridoy-sheikh',
    name: 'Hridoy Sheikh',
    role: 'Chief Technology Officer',
    bio: 'Turning complex problems into smart solutions.',
    portrait: `${TEAM_IMG}/0e884d5e-3930-4b30-a221-d079381b54af.png`,
    socials: [{ label: 'Facebook', href: 'https://www.facebook.com/share/17ZLKcGFEH/' }],
  },
  {
    slug: 'nijwel-islam',
    name: 'Nijwel Islam',
    role: 'Senior Software Engineer',
    bio: 'Building the future, one feature at a time.',
    portrait: `${TEAM_IMG}/45784250-b8bd-4e3c-b9fe-fd1eefe4a957.png`,
  },
  {
    slug: 'sible-hossain',
    name: 'Sible Hossain',
    role: 'Affiliate Business Partner',
    bio: 'A long-term, trusted affiliate partner supporting business development, client relationships and technology partnerships.',
    portrait: `${TEAM_IMG}/5ea0f60d-fc32-408d-96a7-081e85c86e66.PNG`,
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
