import { StackedType } from './StackedType';
import type { SiteConfig } from '../lib/config-schema';

/** Oversized manifesto lines plus a small mark (e.g. © '26). */
export function Manifesto({ manifesto }: { manifesto: SiteConfig['manifesto'] }) {
  return (
    <section className="manifesto" aria-label="Manifesto">
      <StackedType lines={manifesto.lines} motion="stacked-line" className="manifesto__title" />
      <p className="manifesto__mark">{manifesto.mark}</p>
    </section>
  );
}
