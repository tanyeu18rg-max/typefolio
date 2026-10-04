import type { CSSProperties } from 'react';
import Image from 'next/image';
import { buildMarqueeSequence } from '../lib/marquee';
import type { RevealPreset, SiteConfig } from '../lib/config-schema';

interface WorkMarqueeProps {
  work: SiteConfig['work'];
  reveal: RevealPreset;
  /** Seconds for one full loop. From config.motion.marqueeSpeed, else token default. */
  marqueeSeconds: number;
}

/**
 * Heading row with a range label, then an infinite horizontal marquee of
 * project cards. The loop is a pure CSS animation (translateX(-50%) over two
 * identical halves built by buildMarqueeSequence); speed comes from the
 * --marquee-duration custom property, pausing on hover.
 */
export function WorkMarquee({ work, reveal, marqueeSeconds }: WorkMarqueeProps) {
  const sequence = buildMarqueeSequence(work.items);
  const half = sequence.length / 2;
  const firstHalf = sequence.slice(0, half);
  const secondHalf = sequence.slice(half);

  return (
    <section id="work" className="work" aria-label={work.heading}>
      <div className="work__heading-row" data-motion={reveal}>
        <h2 className="work__heading">{work.heading}</h2>
        <span className="work__range">{work.range}</span>
      </div>

      <div
        className="marquee"
        style={{ '--marquee-duration': `${marqueeSeconds}s` } as CSSProperties}
      >
        <div className="marquee__track">
          {[firstHalf, secondHalf].map((group, groupIndex) => (
            <div key={groupIndex} className="marquee__group" aria-hidden={groupIndex === 1}>
              {group.map((item, itemIndex) => (
                <article key={`${item.title}-${itemIndex}`} className="work-card">
                  <a
                    href={item.href}
                    className="work-card__link"
                    tabIndex={groupIndex === 1 ? -1 : 0}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} — cover art`}
                      width={800}
                      height={600}
                      className="work-card__image"
                      loading="lazy"
                    />
                    <div className="work-card__meta">
                      <h3 className="work-card__title">{item.title}</h3>
                      {item.tags.length > 0 && (
                        <p className="work-card__tags">{item.tags.join(' · ')}</p>
                      )}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
