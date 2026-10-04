import type { TokenPreset } from '../lib/tokens';
import { paper } from './paper';
import { ink } from './ink';
import { forest } from './forest';
import { clay } from './clay';

export { paper, ink, forest, clay };

/** All available token presets, keyed by id. Add new presets here. */
export const presets: Record<string, TokenPreset> = { paper, ink, forest, clay };

export const presetList: TokenPreset[] = [paper, ink, forest, clay];
