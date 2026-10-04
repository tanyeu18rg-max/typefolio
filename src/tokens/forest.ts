import type { TokenPreset } from '../lib/tokens';

const BODY_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Deep forest green with bone-colored type. */
export const forest: TokenPreset = {
  id: 'forest',
  label: 'Forest',
  description: 'Deep forest green background with bone-colored type.',
  colors: { paper: '#0F1E14', ink: '#EAE3CF' },
  fonts: {
    display: 'var(--font-archivo), "Arial Narrow", Arial, sans-serif',
    body: BODY_STACK,
  },
  type: {
    hero: 'clamp(3.5rem, 12vw, 11rem)',
    identity: 'clamp(2.75rem, 10vw, 9rem)',
    manifesto: 'clamp(2.5rem, 8.5vw, 7.5rem)',
    heading: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    body: 'clamp(1rem, 1.6vw, 1.25rem)',
    small: '0.8125rem',
  },
  spacing: {
    section: 'clamp(4rem, 10vw, 9rem)',
    gutter: 'clamp(1.25rem, 4vw, 3rem)',
  },
  marquee: { durationSeconds: 40 },
};
