import { Metadata } from 'next';
import ShowcaseClient from './ShowcaseClient';
import { getBreadcrumbSchema } from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'Showcase — Community Highlights',
  description:
    'Explore featured projects, blog posts, thoughts, and repos shared by Nexus club members. The best of our community, curated and showcased.',
  keywords: [
    'Nexus showcase',
    'Nexus ADCET showcase',
    'ADCET Nexus community',
    'ADCET web development club showcase',
    'community projects',
    'student blogs ADCET',
    'open source repos',
    'web development showcase',
    'ADCET students',
    'Nexus member projects',
    'student developer portfolio',
    'college open source contributions',
    'best student projects ADCET',
    'Nexus club highlights',
  ],
  alternates: {
    canonical: `${siteUrl}/nexus/showcase`,
  },
  openGraph: {
    title: 'Community Showcase — Nexus Web Dev Club',
    description:
      'Featured projects, blogs, and contributions by Nexus club members at ADCET.',
    url: `${siteUrl}/nexus/showcase`,
    type: 'website',
  },
};

export default function ShowcasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: siteUrl },
              { name: 'Nexus', url: `${siteUrl}/nexus` },
              { name: 'Showcase', url: `${siteUrl}/nexus/showcase` },
            ])
          ),
        }}
      />
      <ShowcaseClient />
    </>
  );
}
