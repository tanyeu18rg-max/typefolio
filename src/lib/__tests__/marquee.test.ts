import { describe, expect, it } from 'vitest';
import { buildMarqueeSequence } from '../marquee';

describe('buildMarqueeSequence', () => {
  it('returns an empty array for empty input', () => {
    expect(buildMarqueeSequence([])).toEqual([]);
  });

  it('duplicates a single item (2x) so the loop still works', () => {
    expect(buildMarqueeSequence(['a'])).toEqual(['a', 'a']);
  });

  it('returns 2x items with two identical halves', () => {
    const items = ['a', 'b', 'c'];
    const seq = buildMarqueeSequence(items);
    expect(seq).toHaveLength(6);
    expect(seq.slice(0, 3)).toEqual(items);
    expect(seq.slice(3)).toEqual(items);
  });

  it('does not mutate the input', () => {
    const items = ['a', 'b'];
    buildMarqueeSequence(items);
    expect(items).toEqual(['a', 'b']);
  });
});
