import { MetadataRoute } from 'next';
import config from '../../../config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${config.site.url}/sitemap.xml`,
  };
}
