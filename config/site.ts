import { z } from 'zod';

export const siteConfigSchema = z.object({
  site: z.object({
    name: z.string(),
    tagline: z.string(),
    domain: z.string(),
    url: z.string().url(),
    locale: z.string().default('en-US'),
    contactEmail: z.string().email(),
  }),
  social: z.object({
    twitter: z.string().default(''),
    github: z.string().default(''),
  }),
  seo: z.object({
    googleSiteVerification: z.string().default(''),
    defaultOgImage: z.string().default('/og/default.png'),
  }),
  analytics: z.object({
    provider: z.enum(['cloudflare', 'ga4', 'none']).default('cloudflare'),
  }),
  monetization: z.object({
    tipUrl: z.string().default(''),
    consultancyEmail: z.string().default(''),
  }),
  adsense: z.object({
    publisherId: z.string().default('5974949409227096'),
    ready: z.boolean().default(true),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const config: SiteConfig = siteConfigSchema.parse({
  site: {
    name: 'Hubs',
    tagline: 'A collection of modern, responsive, and useful web applications.',
    domain: 'hubs.dpdns.org',
    url: 'https://hubs.dpdns.org',
    contactEmail: 'admin@hubs.dpdns.org',
  },
  social: {},
  seo: {},
  analytics: { provider: 'cloudflare' },
  monetization: { tipUrl: 'https://buymeacoffee.com/hubs', consultancyEmail: 'consulting@hubs.dpdns.org' },
  adsense: { publisherId: '5974949409227096', ready: true },
});

export default config;
