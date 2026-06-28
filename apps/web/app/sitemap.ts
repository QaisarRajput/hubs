import { MetadataRoute } from 'next';
import config from '../../../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.site.url,
      lastModified: new Date(),
    },
    {
      url: `${config.site.url}/about`,
      lastModified: new Date(),
    },
    {
      url: `${config.site.url}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${config.site.url}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${config.site.url}/cookies`,
      lastModified: new Date(),
    },
  ];
}
