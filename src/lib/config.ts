import siteConfig from '../../site.config';
import { siteConfigSchema, type SiteConfig } from './config-schema';

/**
 * Loads and validates site.config.ts. Throws a readable error at build/dev
 * time if the config does not match the schema, so a bad config can never
 * ship silently.
 */
function loadConfig(): SiteConfig {
  const result = siteConfigSchema.safeParse(siteConfig);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid site.config.ts:\n${issues}`);
  }
  return result.data;
}

export const config: SiteConfig = loadConfig();
