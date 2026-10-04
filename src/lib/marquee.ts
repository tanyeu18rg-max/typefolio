/**
 * Build the item sequence for the seamless work marquee.
 *
 * The marquee track renders two identical halves and animates
 * translateX(-50%); when the animation reaches -50% it lands exactly on the
 * start of the second half, so the loop is seamless. This helper produces
 * those two halves (2x the input items).
 */
export function buildMarqueeSequence<T>(items: T[]): T[] {
  if (items.length === 0) return [];
  return [...items, ...items];
}
