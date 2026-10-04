import type { TokenPreset } from '../lib/tokens';

const BODY_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Inverted: warm paper-colored type on near-black. */
export const ink: TokenPreset = {
  id: 'ink',
  label: 'Ink',
  description: 'Inverted dark theme — paper-colored type on near-black.',
  colors: { paper: '#131110', ink: '#F5F1E8' },
  fonts: {
    display: 'var(--font-archivo), "Arial Narrow", Arial, sans-serif',
    body: BODY_STACK,
  },
  type: {
    hero: 'clamp(3.75rem, 13vw, 12rem)',
    identity: 'clamp(3rem, 11vw, 10rem)',
    manifesto: 'clamp(2.75rem, 9vw, 8rem)',
    heading: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    body: 'clamp(1rem, 1.6vw, 1.25rem)',
    small: '0.8125rem',
  },
  spacing: {
    section: 'clamp(4rem, 10vw, 9rem)',
    gutter: 'clamp(1.25rem, 4vw, 3rem)',
  },
  marquee: { durationSeconds: 36 },
};
