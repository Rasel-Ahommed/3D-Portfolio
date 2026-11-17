/**
 * Content model for the CHTS website.
 * All content lives in /src/data — edit the data files, not the JSX.
 *
 * `draft: true`  → the item is only rendered in development
 *                  (or when VITE_SHOW_DRAFTS=true). Use it for anything
 *                  that still needs sign-off before going public.
 * `undefined` optional fields → the matching UI block is simply not shown.
 */

export type ProjectCategory =
  | 'Web Applications'
  | 'Software Systems'
  | 'E-commerce'
  | 'Education Platforms'
  | 'AI Solutions'
  | 'Mobile Applications';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One-line summary for cards. */
  summary: string;
  description?: string;
  thumbnail?: string;
  gallery?: string[];
  technologies?: string[];
  /** Only set when the client has authorised being named. */
  client?: string;
  url?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  /** Only verified, client-approved results. */
  outcome?: string;
  status?: 'Live' | 'In development' | 'Ongoing support';
  /** Headline result, e.g. { value: '40%', label: 'faster order processing' }. Verified numbers only. */
  metric?: { value: string; label: string };
  /** e.g. '10 weeks' */
  timeline?: string;
  /** e.g. 'United Kingdom' */
  country?: string;
  /** How screenshots are framed: browser window (default) or phone. */
  device?: 'browser' | 'phone';
  testimonialId?: string;
  draft?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  description?: string;
  logo?: string;
  screenshot?: string;
  screenshots?: string[];
  features?: string[];
  technologies?: string[];
  benefits?: string[];
  demoUrl?: string;
  /** e.g. 'From $49' — shown on cards and detail page when set. */
  price?: string;
  /** CodeCanyon / Codester / other marketplace listing. */
  marketplaceUrl?: string;
  marketplaceName?: string;
  faq?: { q: string; a: string }[];
  draft?: boolean;
}

export type ServiceVisual =
  | 'software'
  | 'ai'
  | 'mobile'
  | 'uiux'
  | 'saas'
  | 'game'
  | 'media'
  | 'infra'
  | 'architecture'
  | 'security';

export interface Service {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  capabilities: string[];
  benefits: string[];
  visual: ServiceVisual;
  relatedProjects?: string[];
  relatedProducts?: string[];
  /** One-line proof, e.g. '12 projects delivered'. Verified numbers only. */
  proof?: string;
  faq?: { q: string; a: string }[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  portrait?: string;
  socials?: { label: string; href: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  company: string;
  videoUrl?: string;
  photo?: string;
  logo?: string;
  country?: string;
  /** A concrete outcome, e.g. 'Launched in 6 weeks'. */
  result?: string;
  /** 1–5, only if the client gave a rating. */
  rating?: number;
}

/** A block of article body content — keeps posts renderable from data/CMS/API. */
export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. '2026-11-10' */
  date: string;
  readMinutes: number;
  author: string;
  cover?: string;
  featured?: boolean;
  tags?: string[];
  /** Full article body. Only the detail-page article has this today. */
  body?: BlogBlock[];
}

export interface JobOpening {
  slug: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  summary: string;
  description: string;
  requirements: string[];
}
