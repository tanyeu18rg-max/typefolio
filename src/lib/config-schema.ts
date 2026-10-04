import { z } from 'zod';

/**
 * The shape of site.config.ts. Validated at build/dev time by src/lib/config.ts.
 * Keep this schema free of defaults/transforms so the input type and the
 * validated output type stay identical.
 */

const socialSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const workItemSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  href: z.string().min(1),
  tags: z.array(z.string()),
});

const awardItemSchema = z.object({
  name: z.string().min(1),
  org: z.string().min(1),
  certificate: z.string().min(1),
});

const awardGroupSchema = z.object({
  year: z.string().min(1),
  items: z.array(awardItemSchema).min(1),
});

export const siteConfigSchema = z.object({
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    url: z.string().url(),
  }),
  tokens: z.object({
    preset: z.enum(['paper', 'ink', 'forest', 'clay']),
  }),
  profile: z.object({
    name: z.string().min(1),
    roles: z.array(z.string().min(1)).min(1),
    location: z.string().min(1),
    availability: z.string().min(1),
  }),
  hero: z.object({
    eyebrow: z.string().min(1),
    lines: z.array(z.string().min(1)).min(1),
  }),
  identity: z.object({
    lines: z.array(z.string().min(1)).min(1),
  }),
  intro: z.string().min(1),
  manifesto: z.object({
    lines: z.array(z.string().min(1)).min(1),
    mark: z.string().min(1),
  }),
  work: z.object({
    heading: z.string().min(1),
    range: z.string().min(1),
    items: z.array(workItemSchema).min(1),
  }),
  awards: z.object({
    heading: z.string().min(1),
    groups: z.array(awardGroupSchema).min(1),
  }),
  contact: z.object({
    heading: z.string().min(1),
    email: z.string().email(),
    socials: z.array(socialSchema).min(1),
  }),
  motion: z.object({
    enabled: z.boolean(),
    reveal: z.enum(['stacked-line', 'fade-up']),
    marqueeSpeed: z.number().positive().optional(),
    ease: z.string().min(1),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type RevealPreset = SiteConfig['motion']['reveal'];
