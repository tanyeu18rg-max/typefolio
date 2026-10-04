'use client';

import { useEffect } from 'react';
import { initMotion, type MotionOptions } from '../lib/motion';

/**
 * Boots the GSAP motion registry once, right after mount. Placed in the
 * root layout so every [data-motion] element on the page is animated.
 */
export function MotionInit({ motion }: { motion: MotionOptions }) {
  useEffect(() => {
    initMotion(motion);
  }, [motion]);

  return null;
}
