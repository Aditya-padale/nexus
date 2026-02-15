import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getAboutPageSchema, getBreadcrumbSchema } from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'About Us — Our Mission, Values & Journey',
  description:
    "Discover Nexus — the web development club at ADCET's AI & Data Science department. Our mission, values, tech stack, journey timeline, and open-source contributions.",
  keywords: [
    'about Nexus',
    'about Nexus ADCET',
    'Nexus web dev club',
    'ADCET Nexus',
    'Nexus ADCET',
    'ADCET web development club',
    'ADCET coding club',
    'ADCET tech club about',
    'web development community',
    'student developers Sangli',
    'open source college club',
    'AI & Data Science',
    'Annasaheb Dange College',
    'Nexus club mission',
    'Nexus club values',
    'ADCET student community',
    'web development club Maharashtra',
    'Nexus journey timeline',
    'college developer community India',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About Nexus — Web Dev Club',
    description:
      'Meet Nexus — a vibrant community of student developers at ADCET, building real projects and contributing to open source.',
    url: `${siteUrl}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAboutPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: siteUrl },
              { name: 'About', url: `${siteUrl}/about` },
            ])
          ),
        }}
      />
      <AboutClient />
    </>
  );
}
