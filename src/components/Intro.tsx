import type { RevealPreset } from '../lib/config-schema';

interface IntroProps {
  intro: string;
  reveal: RevealPreset;
}

/** Single introductory paragraph. */
export function Intro({ intro, reveal }: IntroProps) {
  return (
    <section className="intro" aria-label="Summary">
      <p className="intro__text" data-motion={reveal}>
        {intro}
      </p>
    </section>
  );
}
