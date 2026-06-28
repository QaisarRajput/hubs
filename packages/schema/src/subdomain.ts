import { z } from 'zod';

export const subdomainSchema = z.object({
  id: z.string(), // e.g. tax.hubs.dpdns.org
  url: z.string().url(),
  title: z.string().optional(),
  description: z.string().optional(),
  favicon: z.string().optional(),
  ogImage: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  categories: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  lastSyncedAt: z.string().optional(),
});

export type Subdomain = z.infer<typeof subdomainSchema>;
