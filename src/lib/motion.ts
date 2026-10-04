import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RevealPreset } from './config-schema';

/**
 * GSAP preset registry, initialized exactly once per page load.
 *
 * Sections opt in declaratively with data-motion attributes:
 *   - data-motion="hero-line"    — staggered reveal on page load (Hero)
 *   - data-motion="stacked-line" — per-line reveal on scroll (kinetic type)
 *   - data-motion="fade-up"      — block fade-up on scroll (generic sections)
 *
 * The marquee is intentionally NOT here: it runs on a pure CSS animation so
 * it stays smooth and works even with motion.enabled = false.
 *
 * Honors prefers-reduced-motion: when the user asks for reduced motion, this
 * is a no-op and everything renders in its final state.
 */
export interface MotionOptions {
  enabled: boolean;
  reveal: RevealPreset;
  ease: string;
}

let booted = false;

export function initMotion(options: MotionOptions): void {
  if (typeof window === 'undefined' || booted) return;
  booted = true;

  if (!options.enabled) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Gate the CSS initial hidden states (see globals.css) so content is only
  // hidden when we are actually about to animate it.
  document.documentElement.classList.add('motion-on');
  gsap.registerPlugin(ScrollTrigger);

  // Hero: staggered reveal on load.
  document.querySelectorAll<HTMLElement>('[data-motion="hero-line"]').forEach((el, index) => {
    gsap.fromTo(
      el,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: options.ease,
        delay: 0.2 + index * 0.12,
      },
    );
  });

  // Kinetic stacked type: each line reveals as it enters the viewport.
  document.querySelectorAll<HTMLElement>('[data-motion="stacked-line"]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1,
        ease: options.ease,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    );
  });

  // Generic section reveal, preset chosen in site.config.ts.
  document.querySelectorAll<HTMLElement>('[data-motion="fade-up"]').forEach((el) => {
    if (options.reveal !== 'fade-up') return;
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: options.ease,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      },
    );
  });
}
