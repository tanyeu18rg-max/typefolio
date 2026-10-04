import { StackedType } from './StackedType';
import type { RevealPreset, SiteConfig } from '../lib/config-schema';

interface HeroProps {
  hero: SiteConfig['hero'];
  reveal: RevealPreset;
}

/** Hero: eyebrow plus giant stacked type with a staggered load reveal. */
export function Hero({ hero, reveal }: HeroProps) {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <p className="hero__eyebrow" data-motion={reveal}>
        {hero.eyebrow}
      </p>
      <StackedType lines={hero.lines} motion="hero-line" as="h1" className="hero__title" />
    </section>
  );
}
