// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Guards the percentage-transform footgun (see src/lib/motion.ts):
 * globals.css pre-hides kinetic lines with `transform: translateY(115%)`,
 * which getComputedStyle resolves to PIXELS. If initMotion doesn't zero that
 * parsed px offset before animating yPercent, masked lines end up below
 * their overflow-hidden masks (invisible) and unmasked elements land ~115%
 * of their height below their natural position. This shipped once — the test
 * pins the guard in place.
 */

const setSpy = vi.fn();
const fromToSpy = vi.fn();
const registerPluginSpy = vi.fn();

vi.mock('gsap', () => ({
  default: { set: setSpy, fromTo: fromToSpy, registerPlugin: registerPluginSpy },
}));

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));

function stubMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
}

/** Fresh initMotion per test — the module boots only once via a flag. */
async function freshInitMotion() {
  vi.resetModules();
  const mod = await import('../motion');
  return mod.initMotion;
}

function seedDom() {
  document.documentElement.className = '';
  document.body.innerHTML = `
    <span data-motion="hero-line">Brand</span>
    <span data-motion="stacked-line">Maya Chen</span>
    <p data-motion="fade-up">Intro</p>
  `;
}

const enabledMotion = { enabled: true, reveal: 'stacked-line', ease: 'power3.out' } as const;

describe('initMotion kinetic guard', () => {
  beforeEach(() => {
    setSpy.mockClear();
    fromToSpy.mockClear();
    registerPluginSpy.mockClear();
    stubMatchMedia(false);
    seedDom();
  });

  it('zeroes the parsed px offset on kinetic elements before any tween runs', async () => {
    const initMotion = await freshInitMotion();
    initMotion({ ...enabledMotion });

    expect(setSpy).toHaveBeenCalledTimes(1);
    const [targets, vars] = setSpy.mock.calls[0];
    const texts = Array.from(targets as NodeListOf<HTMLElement>).map((el) => el.textContent);
    expect(texts).toEqual(['Brand', 'Maya Chen']);
    expect(vars).toEqual({ y: 0, yPercent: 115 });

    // The guard must run before the first fromTo, otherwise the "from"
    // snapshot bakes the stale px offset in.
    expect(fromToSpy).toHaveBeenCalled();
    expect(setSpy.mock.invocationCallOrder[0]).toBeLessThan(fromToSpy.mock.invocationCallOrder[0]);
  });

  it('adds the motion-on gate class so CSS pre-hide states apply', async () => {
    const initMotion = await freshInitMotion();
    initMotion({ ...enabledMotion });
    expect(document.documentElement.classList.contains('motion-on')).toBe(true);
  });

  it('is a no-op when motion is disabled', async () => {
    const initMotion = await freshInitMotion();
    initMotion({ ...enabledMotion, enabled: false });
    expect(document.documentElement.classList.contains('motion-on')).toBe(false);
    expect(setSpy).not.toHaveBeenCalled();
    expect(fromToSpy).not.toHaveBeenCalled();
  });

  it('is a no-op under prefers-reduced-motion', async () => {
    stubMatchMedia(true);
    const initMotion = await freshInitMotion();
    initMotion({ ...enabledMotion });
    expect(document.documentElement.classList.contains('motion-on')).toBe(false);
    expect(setSpy).not.toHaveBeenCalled();
    expect(fromToSpy).not.toHaveBeenCalled();
  });
});
