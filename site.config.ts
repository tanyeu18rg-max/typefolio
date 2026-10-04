import type { SiteConfig } from './src/lib/config-schema';

/**
 * ─── TYPEFOLIO · site.config.ts ─────────────────────────────────────────────
 * The single source of truth for your site. Everything on the page — copy,
 * images, links, theme, motion — comes from this file. No code changes needed
 * to make this site yours.
 *
 * HOW TO CUSTOMIZE
 *  1. Replace the placeholder content below with your own (name, roles,
 *     projects, awards, links).
 *  2. Pick a token preset in `tokens.preset`: 'paper' | 'ink' | 'forest' | 'clay'.
 *     Add your own preset in src/tokens/ and reference it here.
 *  3. Tune motion in `motion` (or set enabled: false for a fully static site).
 *
 * Or run `npm run scaffold` and answer a few prompts — it writes this file.
 * The config is validated with zod at build time; a bad shape fails loudly.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const siteConfig: SiteConfig = {
  meta: {
    title: 'Alex Carter — Designer & Developer',
    description:
      'Portfolio of Alex Carter, an independent product designer and creative developer.',
    url: 'https://example.com',
  },

  tokens: {
    preset: 'paper',
  },

  profile: {
    name: 'Alex Carter',
    roles: ['Product Designer', 'Creative Developer'],
    location: 'Portland, Oregon',
    availability: 'Available for new projects',
  },

  hero: {
    eyebrow: 'Independent designer & developer',
    lines: ['Design', '& Code'],
  },

  identity: {
    lines: ['Alex Carter', 'Designs', 'Interfaces', '& Systems'],
  },

  intro:
    'I design and build websites, products, and interfaces — pairing strong typography and clear layouts with thoughtful, well-crafted engineering.',

  manifesto: {
    lines: ['Good work', 'speaks quietly.'],
    mark: "© '26",
  },

  work: {
    heading: 'Selected Work',
    range: '24–26',
    items: [
      {
        title: 'Northwind Dashboard',
        image: '/assets/works/work-01.svg',
        href: '#',
        tags: ['Product', 'Dashboard'],
      },
      {
        title: 'Field Notes',
        image: '/assets/works/work-02.svg',
        href: '#',
        tags: ['Mobile', 'iOS'],
      },
      {
        title: 'Meridian Identity',
        image: '/assets/works/work-03.svg',
        href: '#',
        tags: ['Branding'],
      },
      {
        title: 'Pulse Analytics',
        image: '/assets/works/work-04.svg',
        href: '#',
        tags: ['Web App'],
      },
      {
        title: 'Harbor Commerce',
        image: '/assets/works/work-05.svg',
        href: '#',
        tags: ['E-commerce'],
      },
      {
        title: 'Atlas Portfolio',
        image: '/assets/works/work-06.svg',
        href: '#',
        tags: ['Portfolio'],
      },
      {
        title: 'Signal Chat',
        image: '/assets/works/work-07.svg',
        href: '#',
        tags: ['Mobile', 'Android'],
      },
      {
        title: 'Drift Travel',
        image: '/assets/works/work-08.svg',
        href: '#',
        tags: ['Website'],
      },
      {
        title: 'Ledger Finance',
        image: '/assets/works/work-09.svg',
        href: '#',
        tags: ['Fintech'],
      },
      {
        title: 'Prism System',
        image: '/assets/works/work-10.svg',
        href: '#',
        tags: ['Design System'],
      },
    ],
  },

  awards: {
    heading: 'Awards & Recognition',
    groups: [
      {
        year: "'26",
        items: [
          {
            name: 'Site of the Day',
            org: 'Independent Design Awards',
            certificate: '/assets/awards/award-01.svg',
          },
          {
            name: 'Developer Award',
            org: 'Independent Design Awards',
            certificate: '/assets/awards/award-02.svg',
          },
        ],
      },
      {
        year: "'25",
        items: [
          {
            name: 'Site of the Day',
            org: 'CSS Design Awards',
            certificate: '/assets/awards/award-03.svg',
          },
          {
            name: 'Typography Honor',
            org: 'Type Directors Circle',
            certificate: '/assets/awards/award-04.svg',
          },
        ],
      },
    ],
  },

  contact: {
    heading: "Let's build something good.",
    email: 'hello@alexcarter.design',
    socials: [
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'X', href: 'https://x.com/' },
      { label: 'Dribbble', href: 'https://dribbble.com/' },
    ],
  },

  motion: {
    enabled: true,
    reveal: 'stacked-line',
    marqueeSpeed: 32,
    ease: 'power3.out',
  },
};

export default siteConfig;
