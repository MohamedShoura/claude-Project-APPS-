import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gulf Hot Offers',
    short_name: 'Gulf Offers',
    description: 'The best Gulf deals in one place — Qatar, Saudi Arabia & UAE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e6392b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    lang: 'en',
    dir: 'auto',
    categories: ['shopping'],
  };
}
