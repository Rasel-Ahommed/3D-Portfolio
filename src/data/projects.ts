import type { Project } from './types';

/**
 * Client projects (kept separate from CHTS-owned products).
 *
 * Published entries are backed by client testimonials on chtsltd.com.
 * Challenge / solution / outcome were NOT published, so they are left
 * undefined and those blocks stay hidden until verified copy is added.
 *
 * Entries marked `draft: true` come from internal work notes and are only
 * shown in development until you confirm they can be public.
 */
export const projects: Project[] = [
  {
    slug: 'fast-track-ielts-platform',
    title: 'AI-Powered Language Learning & Exam Platform',
    category: 'Education Platforms',
    client: 'Fast Track IELTS',
    summary: 'An AI-powered language learning and exam platform built in collaboration with Fast Track IELTS.',
    description:
      'CHTS collaborated with Fast Track IELTS on an AI-powered language learning and exam platform, supporting their students’ preparation for English proficiency tests.',
    status: 'Live',
    testimonialId: 'fast-track-ielts',
  },
  {
    slug: 'm-hexad-solution-website',
    title: 'Corporate Website for M-Hexad Solution',
    category: 'Web Applications',
    client: 'M-Hexad Solution',
    summary: 'A professional website designed and developed to represent the M-Hexad Solution brand.',
    description:
      'CHTS designed and delivered a professional website for M-Hexad Solution that represents the brand online.',
    status: 'Live',
    testimonialId: 'm-hexad',
  },
  {
    slug: 'study-abroad-malaysia',
    title: 'Web Platform & Technical Support for Study Abroad Malaysia',
    category: 'Web Applications',
    client: 'Study Abroad Malaysia',
    summary: 'Ongoing web development and responsive technical support for a study-abroad consultancy.',
    description:
      'CHTS provides web and technical support for Study Abroad Malaysia, including domain and hosting configuration and responsive, round-the-clock assistance.',
    url: 'https://studyabroad.com.my/',
    status: 'Ongoing support',
    testimonialId: 'study-abroad-malaysia',
  },
  {
    slug: 'renter-android',
    title: 'Renter — Android Rental Marketplace App',
    category: 'Mobile Applications',
    summary: 'A native Android client for a peer-to-peer rental marketplace, built on an existing Laravel API.',
    description:
      'A Kotlin and Jetpack Compose Android application for the Renter rental marketplace, consuming the platform’s existing Laravel REST API with secure token authentication. Built in clearly defined stages from networking and authentication through bookings, payments and reviews.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Retrofit', 'Laravel API'],
    status: 'In development',
    draft: true,
  },
  {
    slug: 'lifedrop',
    title: 'LifeDrop — Blood Donation Platform',
    category: 'Web Applications',
    summary: 'A blood donation platform for Bangladesh with a public site and a Laravel management system.',
    description:
      'A public-facing blood donation website with a blood-compatibility tool, emergency request ticker and request form, backed by a Laravel management system for donors, recipients and donation history.',
    technologies: ['Laravel', 'PHP', 'Bootstrap 5', 'JavaScript'],
    status: 'In development',
    draft: true,
  },
];
