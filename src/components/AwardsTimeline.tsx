'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';
import type { RevealPreset, SiteConfig } from '../lib/config-schema';

interface AwardsTimelineProps {
  awards: SiteConfig['awards'];
  reveal: RevealPreset;
}

interface OpenCertificate {
  src: string;
  alt: string;
}

/** Year-grouped award rows; clicking a certificate opens the lightbox. */
export function AwardsTimeline({ awards, reveal }: AwardsTimelineProps) {
  const [open, setOpen] = useState<OpenCertificate | null>(null);

  return (
    <section id="awards" className="awards" aria-label={awards.heading}>
      <h2 className="awards__heading" data-motion={reveal}>
        {awards.heading}
      </h2>

      {awards.groups.map((group) => (
        <div key={group.year} className="awards__group">
          <h3 className="awards__year" data-motion={reveal}>
            {group.year}
          </h3>
          <ul className="awards__list">
            {group.items.map((item) => (
              <li key={`${item.name}-${item.org}`} className="award-row" data-motion={reveal}>
                <div className="award-row__text">
                  <p className="award-row__name">{item.name}</p>
                  <p className="award-row__org">{item.org}</p>
                </div>
                <button
                  type="button"
                  className="award-row__cert"
                  onClick={() =>
                    setOpen({
                      src: item.certificate,
                      alt: `${item.name} — ${item.org} certificate`,
                    })
                  }
                  aria-label={`View certificate: ${item.name}, ${item.org}`}
                >
                  <Image
                    src={item.certificate}
                    alt=""
                    width={800}
                    height={600}
                    className="award-row__thumb"
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {open && <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />}
    </section>
  );
}
