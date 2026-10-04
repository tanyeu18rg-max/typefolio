# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),

## [0.1.1] - 2026-10-05

### Fixed
- Motion end-state bug: `globals.css` pre-hides kinetic lines with
  `transform: translateY(115%)`, which `getComputedStyle` resolves to pixels —
  GSAP parsed that as a px `y` offset, and since the reveals only animate
  `yPercent`, every reveal finished ~115% of the element's height below its
  natural position. Masked headlines (hero, identity, manifesto) stayed
  invisible inside their overflow-hidden masks; unmasked elements overlapped
  the content beneath them. `initMotion` now zeroes the parsed px component up
  front (`gsap.set(els, { y: 0, yPercent: 115 })`) so reveals land exactly on
  the natural position. Verified section-by-section in headless Chromium:
  all 19 animated elements end at `translateY(0)`.

### Added
- `src/lib/__tests__/motion.test.ts`: regression test pinning the guard —
  with GSAP mocked, asserts `gsap.set` zeroes `{ y: 0, yPercent: 115 }` on
  kinetic elements before any `fromTo` runs, plus no-op behavior when motion
  is disabled or `prefers-reduced-motion` matches.
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-10-05

### Added

- Initial release of Typefolio, a repeatable minimal portfolio template.
- Single-source-of-truth `site.config.ts` validated with zod at build time.
- Four two-color token presets (`paper`, `ink`, `forest`, `clay`) resolved to CSS
  custom properties on `:root` via a pure `tokensToCssVars()` function.
- Sections: fixed navigation with fullscreen overlay menu, hero with staggered
  load reveal, kinetic identity stack, intro, manifesto, infinite work marquee
  (CSS animation, pause on hover), year-grouped awards timeline with lightbox,
  contact footer.
- GSAP + ScrollTrigger motion registry driven by `data-motion` attributes;
  honors `prefers-reduced-motion` and `motion.enabled`.
- `npm run scaffold`: zero-dependency CLI that writes a fresh `site.config.ts`.
- `npm run placeholders`: generates abstract duotone SVG placeholder covers.
- Vitest suites for config validation, token vars, and the marquee loop helper.
- CI workflow (Node 22): prettier check → eslint → typecheck → vitest → next build.
- Static export (`output: 'export'`) — deployable to any static host or Vercel.
