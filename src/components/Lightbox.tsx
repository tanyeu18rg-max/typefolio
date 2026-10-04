'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Simple lightbox: fullscreen overlay, Escape/backdrop click to close. */
export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        className="lightbox__image"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
