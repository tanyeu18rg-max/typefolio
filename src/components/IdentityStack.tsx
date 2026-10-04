import { StackedType } from './StackedType';
import type { SiteConfig } from '../lib/config-schema';

/** Huge kinetic stacked lines, each revealed on scroll. */
export function IdentityStack({ identity }: { identity: SiteConfig['identity'] }) {
  return (
    <section className="identity" aria-label="About">
      <StackedType
        lines={identity.lines}
        motion="stacked-line"
        as="h2"
        className="identity__title"
      />
    </section>
  );
}
