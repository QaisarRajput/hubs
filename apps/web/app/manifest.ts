import config from '../../../config/site';

export default function manifest() {
  return {
    name: config.site.name,
    short_name: config.site.name,
    description: config.site.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
