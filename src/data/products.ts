import type { Product } from './types';

/**
 * CHTS-owned products & ready systems.
 * Source: portfolio listing on https://chtsltd.com/projects (Nov 2026) — names,
 * categories, live demo URLs and screenshots are taken from there.
 *
 * Screenshots are currently referenced from chtsltd.com. For best performance,
 * download them into /public/images/products and update the paths (see README).
 *
 * `features` / `technologies` / `benefits` were not published on the live site,
 * so they are left empty and the matching blocks are hidden until you add them.
 */
const IMG = 'https://chtsltd.com/assets/images/frontend/projects';

export const products: Product[] = [
  {
    slug: 'chatmili',
    name: 'ChatMili',
    category: 'AI Solutions',
    tagline: 'AI-based automated customer chat management.',
    description:
      'ChatMili brings customer conversations into one place and uses AI automation to answer, route and manage chats — so businesses can respond faster without growing their support team.',
    screenshot: `${IMG}/82a32c35-0781-4b1e-b07d-f34b84159f41.png`,
    demoUrl: 'https://chatmili.com/',
  },
  {
    slug: 'ai-pte-lms',
    name: 'AI PTE Learning Platform',
    category: 'Education Platforms',
    tagline: 'AI-based learning management for the Pearson Test of English.',
    description:
      'A learning management system for PTE preparation that uses AI to support practice and assessment, designed for institutions and training providers.',
    screenshot: `${IMG}/7000ffe4-81ff-4237-a845-f5dfd971c16a.png`,
    demoUrl: 'https://pte.demo.chtsltd.com/',
  },
  {
    slug: 'messenger-automation-chatbot',
    name: 'Messenger Automation Chatbot',
    category: 'AI Solutions',
    tagline: 'Automated replies and lead capture for Facebook Messenger.',
    description:
      'An AI agent that automates conversations on Messenger, helping pages respond instantly to customer enquiries.',
    screenshot: `${IMG}/bba73955-d359-44c4-a74e-b7174090a96d.webp`,
    demoUrl: 'https://aiagent.chtsltd.com/',
  },
  {
    slug: 'restaurant-billing-management',
    name: 'Restaurant & Billing Management',
    category: 'Software Systems',
    tagline: 'Orders, tables and billing in one restaurant system.',
    description: 'A web-based system for running restaurant operations and billing from a single dashboard.',
    screenshot: `${IMG}/19427092-7d75-4d90-ae9c-43de2d4c00ac.webp`,
    demoUrl: 'http://restaurent.demo.chtsltd.com/',
  },
  {
    slug: 'store-inventory-management',
    name: 'Store Management & Inventory',
    category: 'Software Systems',
    tagline: 'Point of sale with a built-in inventory manager.',
    description: 'A store management and POS system with inventory management for retail businesses.',
    screenshot: `${IMG}/7f718d9a-06e6-45bb-8903-7b4a0c830169.webp`,
    demoUrl: 'http://pos.demo.chtsltd.com/',
  },
  {
    slug: 'online-learning-management-system',
    name: 'Online Learning Management System',
    category: 'Education Platforms',
    tagline: 'Courses, learners and content delivery online.',
    description: 'A ready LMS for delivering and managing online courses.',
    screenshot: `${IMG}/b6bec828-d781-496e-94f4-339a1bddc973.webp`,
    demoUrl: 'http://lms.demo.chtsltd.com/',
  },
  {
    slug: 'educational-institute-management-system',
    name: 'Educational Institute Management',
    category: 'Education Platforms',
    tagline: 'Administration for schools, colleges and institutes.',
    description: 'A management system that brings institute administration into a single web platform.',
    screenshot: `${IMG}/290ed062-ab26-47b6-beae-0e4382d2fe04.webp`,
    demoUrl: 'http://eims.demo.chtsltd.com/',
  },
  {
    slug: 'diagnostic-management-system',
    name: 'Diagnostic Management System',
    category: 'Software Systems',
    tagline: 'Operations software for diagnostic centres.',
    description: 'A web-based system for managing the day-to-day operations of diagnostic centres.',
    screenshot: `${IMG}/f2cf6aeb-e3e6-4248-aaf8-3eec2344acbb.webp`,
    demoUrl: 'http://diagnostic.demo.chtsltd.com/',
  },
  {
    slug: 'multi-vendor-ecommerce',
    name: 'Multi-Vendor E-Commerce',
    category: 'E-commerce',
    tagline: 'A marketplace platform for many sellers.',
    description: 'A multi-vendor e-commerce marketplace where multiple sellers can list and sell products.',
    screenshot: `${IMG}/eb99b13c-d3b4-4f89-a7f4-d722c7544157.webp`,
    demoUrl: 'http://ecommultivendor.demo.chtsltd.com/',
  },
  {
    slug: 'single-vendor-ecommerce',
    name: 'Single Vendor E-Commerce',
    category: 'E-commerce',
    tagline: 'A complete online store for one brand.',
    description: 'A single-vendor e-commerce platform for brands selling directly to customers.',
    screenshot: `${IMG}/b61c5e94-7828-40bc-816e-ffbfde4409c9.webp`,
    demoUrl: 'http://ecom.demo.chtsltd.com/',
  },
];
