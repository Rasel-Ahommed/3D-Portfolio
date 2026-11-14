import type { Service } from './types';

/**
 * Services. The capability lists for Software, AI & Automation and UI/UX
 * mirror the service lists published on chtsltd.com.
 */
export const services: Service[] = [
  {
    slug: 'software-web-development',
    index: '01',
    title: 'Software & Web Development',
    short: 'Custom web applications and business software, engineered around how you actually work.',
    description:
      'We build custom digital solutions aligned with your business goals and operational needs — from full-stack web applications to internal management tools and the APIs that connect them.',
    capabilities: [
      'Custom web applications',
      'Custom software solutions',
      'System integration & APIs',
      'Business management tools',
      'Full-stack website development',
    ],
    benefits: [
      'Software that fits your process instead of the other way round',
      'Clean, documented code your team can maintain',
      'Architecture planned for growth from day one',
    ],
    visual: 'software',
    relatedProducts: ['restaurant-billing-management', 'store-inventory-management', 'diagnostic-management-system'],
    relatedProjects: ['m-hexad-solution-website'],
  },
  {
    slug: 'ai-automation',
    index: '02',
    title: 'AI & Automation',
    short: 'Smart automation that removes manual effort and keeps operations moving.',
    description:
      'We design automation systems that reduce repetitive work and boost productivity — workflow pipelines, AI-powered chatbots and the integrations that tie them into your existing tools.',
    capabilities: [
      'Automated workflows & pipelines',
      'Task & process automation',
      'AI-powered chatbot systems',
      'Business operation optimisation',
    ],
    benefits: [
      'Faster responses to customers, around the clock',
      'Fewer manual hand-offs and copy-paste errors',
      'Teams freed up for work that needs a human',
    ],
    visual: 'ai',
    relatedProducts: ['chatmili', 'messenger-automation-chatbot', 'ai-pte-lms'],
    relatedProjects: ['fast-track-ielts-platform'],
  },
  {
    slug: 'mobile-applications',
    index: '03',
    title: 'Mobile Applications',
    short: 'Native Android apps that extend your platform into your customers’ pockets.',
    description:
      'We build mobile clients for new and existing platforms — native Android with Kotlin, connected to the same backend that powers your web product, so data and accounts stay in sync.',
    capabilities: [
      'Native Android development (Kotlin)',
      'Apps for existing web platforms & APIs',
      'Secure authentication & accounts',
      'Store-ready builds and releases',
    ],
    benefits: [
      'One backend, consistent experience across web and mobile',
      'Modern, maintainable native code',
      'Built in clear stages you can review',
    ],
    visual: 'mobile',
    relatedProjects: ['renter-android'],
  },
  {
    slug: 'ui-ux-design',
    index: '04',
    title: 'UI/UX Design',
    short: 'Interfaces that are clear, usable and unmistakably yours.',
    description:
      'We design responsive, user-friendly interfaces that strengthen your brand and online presence — from early prototypes to production-ready design systems, landing pages and portfolios.',
    capabilities: [
      'UI / UX design & prototyping',
      'Design systems & component libraries',
      'Landing page & portfolio design',
      'Responsive, accessible layouts',
    ],
    benefits: [
      'Validated flows before development starts',
      'A consistent visual language across products',
      'Better conversion from clearer journeys',
    ],
    visual: 'uiux',
    relatedProjects: ['m-hexad-solution-website'],
  },
  {
    slug: 'saas-digital-products',
    index: '05',
    title: 'SaaS & Digital Products',
    short: 'Secure cloud products and ready systems built for uptime and scale.',
    description:
      'We build SaaS platforms and ship ready systems — LMS, institute management, e-commerce and more — that can be deployed quickly and customised as your business grows.',
    capabilities: [
      'SaaS platform development',
      'Ready systems: LMS, ERP, HRM, e-commerce',
      'Multi-tenant & subscription architecture',
      'Cross-device, cloud-hosted delivery',
    ],
    benefits: [
      'Go live fast with a proven base system',
      'Customise only what makes you different',
      'High availability on modern infrastructure',
    ],
    visual: 'saas',
    relatedProducts: ['online-learning-management-system', 'educational-institute-management-system', 'multi-vendor-ecommerce', 'single-vendor-ecommerce'],
  },
  {
    slug: 'game-development',
    index: '06',
    title: 'Game Development',
    short: 'Interactive 3D and gamified experiences for learning, marketing and play.',
    description:
      'We create interactive experiences — browser-based 3D, gamified learning modules and playful brand activations — using real-time graphics technology such as Three.js.',
    capabilities: [
      'Browser-based 3D experiences',
      'Gamified learning & engagement',
      'Interactive brand activations',
      'Real-time graphics with WebGL',
    ],
    benefits: [
      'Higher engagement than static content',
      'Runs in the browser — no install required',
      'Reusable interactive components',
    ],
    visual: 'game',
  },
  {
    slug: 'ai-image-video-production',
    index: '07',
    title: 'AI Image & Video Production',
    short: 'AI-assisted visuals and motion content produced for real campaigns.',
    description:
      'We produce images, explainer animations and short-form video for social and marketing channels, combining AI generation with motion design and editorial judgement.',
    capabilities: [
      'AI image generation & retouching',
      'Animated explainer videos',
      'Short-form social video & reels',
      'Brand-consistent visual production',
    ],
    benefits: [
      'Content at the pace social channels demand',
      'Consistent quality across campaigns',
      'Lower production cost per asset',
    ],
    visual: 'media',
  },
  {
    slug: 'it-infrastructure-network',
    index: '08',
    title: 'IT Infrastructure & Network Solutions',
    short: 'Servers, hosting and networks configured to keep your systems dependable.',
    description:
      'We configure and maintain the infrastructure behind your software — servers, hosting, domains, DNS and deployment pipelines — so your applications stay fast, secure and online.',
    capabilities: [
      'Server setup & configuration',
      'Hosting, domains & DNS management',
      'Deployment & DevOps pipelines',
      'Performance & security hardening',
    ],
    benefits: [
      'Fewer outages and faster pages',
      'Clear ownership of your infrastructure',
      'Deployments you can repeat with confidence',
    ],
    visual: 'infra',
  },
];
