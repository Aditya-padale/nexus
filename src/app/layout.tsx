import { Inter } from 'next/font/google';
import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import Animations from './animations';
import Header from '@/components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  getOrganizationSchema,
  getWebsiteSchema,
} from '@/lib/jsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

const metaDescription =
  'Nexus — Web Development Club | AI & Data Science Department, Annasaheb Dange College of Engineering, Ashta. Learn web development, build real projects, and grow as a developer.';

const ogImagePath = '/images/nexus-og.png';

const seoKeywords = [
  // Brand variations
  'Nexus',
  'ADCET Nexus',
  'Nexus ADCET',
  'Nexus club',
  'Nexus web dev club',
  'Nexus ADCE',
  'Nexus web development club',
  // College & department
  'ADCET',
  'ADCET web development club',
  'ADCET coding club',
  'ADCET tech club',
  'ADCET AI DS club',
  'Annasaheb Dange College of Engineering',
  'Annasaheb Dange College of Engineering and Technology',
  'ADCET Ashta',
  'ADCET Sangli',
  'AI & Data Science',
  'AI & Data Science department ADCET',
  // Activities
  'web development',
  'Web Development Club',
  'coding club',
  'college coding club',
  'student developer community',
  'hackathon ADCET',
  'web dev club Maharashtra',
  'open source college club',
  'student hackathon Sangli',
  // Tech stack
  'React',
  'Next.js',
  'full-stack development',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'MERN stack',
  // Location
  'Sangli',
  'Maharashtra',
  'Ashta',
  'Kolhapur',
  'Shivaji University',
  // Intent keywords
  'learn web development',
  'join coding club',
  'college tech community India',
  'student projects India',
  'web development college club India',
  'programming club ADCET',
];

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nexus — Web Dev Club | ADCET',
    template: '%s | Nexus Web Dev Club',
  },
  description: metaDescription,
  keywords: seoKeywords,
  authors: [{ name: 'Nexus — Web Development Club', url: siteUrl }],
  creator: 'Nexus ADCE',
  publisher: 'Nexus — Web Development Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'education',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Nexus — Web Dev Club',
    title: 'Nexus — Web Dev Club | ADCET',
    description: metaDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: 'Nexus — Web Development Club at Annasaheb Dange College of Engineering',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus — Web Dev Club | ADCET',
    description: metaDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: 'Nexus — Web Development Club',
      },
    ],
    creator: '@nexus_adce',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/nexus-icon-192.png',
  },
  verification: {
    // Add your verification tokens here when ready:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* JSON-LD Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        {/* JSON-LD Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <SpeedInsights />
      <body className="overflow-scroll overflow-x-hidden">
        <Animations>
          <div role="document">
            <Header />
            <div className="flex flex-col bg-background text-foreground">
              <main id="main-content" className={`flex-grow ${inter.className}`}>
                {children}
              </main>
              <Analytics />
            </div>
            <Toaster />
          </div>
        </Animations>
      </body>
    </html>
  );
}
