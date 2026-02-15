import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexus — Web Development Club | ADCE',
    short_name: 'Nexus Club',
    description:
      'Nexus is the Web Development Club under the AI & Data Science Department at Annasaheb Dange College of Engineering. Learn web development, AI, and build real projects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1f8fff',
    orientation: 'portrait-primary',
    categories: ['education', 'technology'],
    icons: [
      {
        src: '/images/nexus-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/nexus-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/nexus-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
