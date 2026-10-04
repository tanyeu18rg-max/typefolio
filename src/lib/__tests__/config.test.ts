import { describe, expect, it } from 'vitest';
import { siteConfigSchema } from '../config-schema';
import { siteConfig } from '../../../site.config';

const valid = {
  meta: { title: 'T', description: 'D', url: 'https://example.com' },
  tokens: { preset: 'paper' as const },
  profile: {
    name: 'Jane Doe',
    roles: ['Designer'],
    location: 'Berlin',
    availability: 'Open',
  },
  hero: { eyebrow: 'Hi', lines: ['Hello'] },
  identity: { lines: ['Jane'] },
  intro: 'Intro text.',
  manifesto: { lines: ['Make things'], mark: "© '26" },
  work: {
    heading: 'Work',
    range: '24–26',
    items: [{ title: 'P', image: '/p.svg', href: '#', tags: [] }],
  },
  awards: {
    heading: 'Awards',
    groups: [{ year: "'26", items: [{ name: 'N', org: 'O', certificate: '/c.svg' }] }],
  },
  contact: {
    heading: 'Hi',
    email: 'jane@example.com',
    socials: [{ label: 'Web', href: 'https://example.com' }],
  },
  motion: { enabled: true, reveal: 'stacked-line' as const, ease: 'power3.out' },
};

describe('siteConfigSchema', () => {
  it('accepts the shipped site.config.ts', () => {
    expect(() => siteConfigSchema.parse(siteConfig)).not.toThrow();
  });

  it('accepts a minimal valid config', () => {
    expect(siteConfigSchema.parse(valid)).toEqual(valid);
  });

  it('rejects a missing contact email', () => {
    const bad = { ...valid, contact: { ...valid.contact, email: 'not-an-email' } };
    expect(() => siteConfigSchema.parse(bad)).toThrow();
  });

  it('rejects empty roles', () => {
    const bad = { ...valid, profile: { ...valid.profile, roles: [] } };
    expect(() => siteConfigSchema.parse(bad)).toThrow();
  });

  it('rejects an unknown token preset', () => {
    const bad = { ...valid, tokens: { preset: 'neon' } };
    expect(() => siteConfigSchema.parse(bad)).toThrow();
  });

  it('rejects a non-positive marqueeSpeed', () => {
    const bad = { ...valid, motion: { ...valid.motion, marqueeSpeed: 0 } };
    expect(() => siteConfigSchema.parse(bad)).toThrow();
  });

  it('rejects empty hero lines', () => {
    const bad = { ...valid, hero: { ...valid.hero, lines: [] } };
    expect(() => siteConfigSchema.parse(bad)).toThrow();
  });
});
