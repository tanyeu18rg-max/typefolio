import { presets } from '../tokens';

/**
 * A design token preset: one strict two-color pairing plus the type scale,
 * spacing, and motion defaults that give each site its feel. Everything the
 * CSS needs is derived from these values via tokensToCssVars().
 */
export interface TokenPreset {
  id: string;
  label: string;
  description: string;
  colors: {
    /** page background */
    paper: string;
    /** text / foreground */
    ink: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  type: {
    hero: string;
    identity: string;
    manifesto: string;
    heading: string;
    body: string;
    small: string;
  };
  spacing: {
    section: string;
    gutter: string;
  };
  marquee: {
    /** seconds for one full loop of the work marquee */
    durationSeconds: number;
  };
}

/** Resolve the active preset id (from site.config.ts) to a preset object. */
export function getPreset(id: string): TokenPreset {
  return presets[id] ?? presets.paper;
}

/**
 * Pure function: turn a token preset into CSS custom properties applied on
 * :root by the root layout. Swapping presets = swapping the whole theme.
 */
export function tokensToCssVars(preset: TokenPreset): Record<string, string> {
  return {
    '--color-paper': preset.colors.paper,
    '--color-ink': preset.colors.ink,
    '--font-display': preset.fonts.display,
    '--font-body': preset.fonts.body,
    '--type-hero': preset.type.hero,
    '--type-identity': preset.type.identity,
    '--type-manifesto': preset.type.manifesto,
    '--type-heading': preset.type.heading,
    '--type-body': preset.type.body,
    '--type-small': preset.type.small,
    '--space-section': preset.spacing.section,
    '--space-gutter': preset.spacing.gutter,
    '--marquee-duration': `${preset.marquee.durationSeconds}s`,
  };
}
