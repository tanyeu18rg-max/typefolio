import type { JSX } from 'react';

interface StackedTypeProps {
  lines: string[];
  /** Which motion preset animates each line. */
  motion?: 'hero-line' | 'stacked-line';
  className?: string;
  as?: 'h1' | 'h2' | 'div';
}

/**
 * Giant stacked kinetic type. Each line sits in an overflow-hidden mask so
 * the GSAP reveal can slide it up from below. No hardcoded copy — every
 * line comes from props.
 */
export function StackedType({
  lines,
  motion = 'stacked-line',
  className = '',
  as = 'div',
}: StackedTypeProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`stacked-type ${className}`.trim()} aria-label={lines.join(' ')}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask" aria-hidden="true">
          <span className="line" data-motion={motion}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
