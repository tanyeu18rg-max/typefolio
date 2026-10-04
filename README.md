# Typefolio

A repeatable, customizable minimal portfolio template — kinetic stacked
typography, a two-color design system, an infinite work marquee, and an awards
timeline. **One config file plus token presets drive the whole site.**

Inspired by the structure and motion language of Awwwards-winning minimal
portfolios. All copy, imagery, and branding here are 100% fresh placeholder
content — nothing is lifted from any real site.

## Quickstart

```bash
# 1. Use this repo as a GitHub template (or clone it)
# 2. Install
npm install

# 3. Make it yours — answers a few prompts, writes site.config.ts
npm run scaffold

# 4. Develop
npm run dev

# 5. Ship — static export in out/, or deploy to Vercel (see below)
npm run build
```

### Deploy to Vercel

This is a pure static export (`output: 'export'` in `next.config.ts`):

- **Via dashboard:** import the repo in Vercel — the defaults work
  (framework preset Next.js, build command `next build`, output dir `out/`).
- **Via CLI:** `npx vercel --prod` from the repo root.

Any static host works too: serve the `out/` directory.

## The three customization levels

**Level 1 — Config (non-devs).** Edit `site.config.ts`: name, roles, hero lines,
intro, manifesto, work items, awards, contact links, motion settings, and the
token preset (`'paper' | 'ink' | 'forest' | 'clay'`). The file is validated with
zod at build time — a bad shape fails loudly with a readable error. Or run
`npm run scaffold` and answer the prompts.

**Level 2 — Tokens (designers).** Each preset in `src/tokens/` is one strict
two-color pairing plus type scale (`clamp()` values), spacing, fonts, and the
marquee default speed. `src/lib/tokens.ts` resolves the active preset into CSS
custom properties on `:root` (`tokensToCssVars()`); the stylesheet only ever
reads variables, so adding a preset is one new file plus one line in
`src/tokens/index.ts`. Changing `tokens.preset` in the config re-themes the
entire site.

**Level 3 — Components & motion (developers).** Every component in
`src/components/` is prop-driven with zero hardcoded copy. Motion lives in
`src/lib/motion.ts`: a GSAP + ScrollTrigger registry initialized once, with
sections opting in via `data-motion` attributes (`hero-line`, `stacked-line`,
`fade-up`). `motion.reveal` in the config picks the generic section preset;
`motion.enabled: false` or the user's `prefers-reduced-motion` setting disables
animation entirely and everything renders in its final state.

## Project structure

```
site.config.ts              ← the single source of truth (edit this)
src/
  app/
    layout.tsx              ← fonts, :root CSS vars, nav, motion boot
    page.tsx                ← section composition
    globals.css             ← token-driven styles, no hardcoded theme values
  components/               ← StackedType, Navigation, Hero, IdentityStack,
                              Intro, Manifesto, WorkMarquee, AwardsTimeline,
                              Contact, Lightbox, MotionInit
  lib/
    config.ts               ← loads + validates site.config.ts (zod)
    config-schema.ts        ← the zod schema
    tokens.ts               ← TokenPreset, getPreset(), tokensToCssVars()
    motion.ts               ← GSAP preset registry
    marquee.ts              ← seamless-loop duplication helper
  tokens/                   ← paper, ink, forest, clay presets
scripts/
  scaffold.mjs              ← `npm run scaffold` (zero-dependency CLI)
  generate-placeholders.mjs ← `npm run placeholders` (duotone SVG covers)
public/assets/              ← generated placeholder covers (replace with yours)
```

## Media

`npm run placeholders` generates abstract duotone SVG covers into
`public/assets/works/` (10) and `public/assets/awards/` (4), colored from the
token palettes. Replace them with real project images — anything referenced
from `site.config.ts` just works (images are served unoptimized for the static
export).

## Notes

- **No backend on purpose.** This is a pure static site: no database, no API
  routes, no auth — so Sentry and health endpoints are intentionally omitted.
  If you add a backend later, add them then.
- Fonts load via `next/font/google` (Archivo for display) at build time; body
  text uses the system stack.
- Accessibility: semantic landmarks, skip link, alt text on all images,
  `aria-hidden` on the duplicated marquee half, focus-visible styles, and
  `prefers-reduced-motion` respected in both CSS and JS.

## Scripts

| Script                                    | What it does                           |
| ----------------------------------------- | -------------------------------------- |
| `npm run dev`                             | Start the dev server                   |
| `npm run build`                           | Static export to `out/`                |
| `npm run start`                           | Serve the production build             |
| `npm run lint`                            | ESLint (Next.js core-web-vitals + TS)  |
| `npm run format` / `npm run format:check` | Prettier write / check                 |
| `npm run typecheck`                       | `tsc --noEmit`                         |
| `npm run test`                            | Vitest                                 |
| `npm run scaffold`                        | Interactive `site.config.ts` generator |
| `npm run placeholders`                    | Generate placeholder SVG covers        |
