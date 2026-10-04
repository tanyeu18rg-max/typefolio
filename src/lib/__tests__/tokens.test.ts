import { describe, expect, it } from 'vitest';
import { getPreset, tokensToCssVars } from '../tokens';
import { presetList } from '../../tokens';

describe('tokensToCssVars', () => {
  it('maps preset colors to CSS custom properties', () => {
    const preset = getPreset('paper');
    const vars = tokensToCssVars(preset);
    expect(vars['--color-paper']).toBe(preset.colors.paper);
    expect(vars['--color-ink']).toBe(preset.colors.ink);
  });

  it('exposes type, spacing, and motion tokens', () => {
    const vars = tokensToCssVars(getPreset('paper'));
    expect(vars['--font-display']).toContain('var(--font-archivo)');
    expect(vars['--type-hero']).toMatch(/clamp\(/);
    expect(vars['--space-gutter']).toMatch(/clamp\(/);
    expect(vars['--marquee-duration']).toBe('36s');
  });

  it('switching presets changes the emitted variables', () => {
    const paperVars = tokensToCssVars(getPreset('paper'));
    const inkVars = tokensToCssVars(getPreset('ink'));
    expect(inkVars['--color-paper']).not.toBe(paperVars['--color-paper']);
    expect(inkVars['--color-ink']).not.toBe(paperVars['--color-ink']);
  });

  it('falls back to the paper preset for unknown ids', () => {
    expect(getPreset('nope')).toBe(getPreset('paper'));
  });

  it('ships four distinct two-color presets', () => {
    expect(presetList).toHaveLength(4);
    const pairs = presetList.map((p) => `${p.colors.paper}/${p.colors.ink}`);
    expect(new Set(pairs).size).toBe(4);
  });
});
