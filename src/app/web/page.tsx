import { Metadata } from 'next';
import WebClient from './WebClient';
import { getBreadcrumbSchema } from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'Events & Activities',
  description:
    'Explore Nexus club events — hackathons, workshops, bootcamps, tech talks, and open-source contribution days at ADCET.',
  keywords: [
    'Nexus events',
    'Nexus ADCET events',
    'ADCET Nexus activities',
    'ADCET web development club events',
    'hackathon ADCET',
    'ADCET hackathon',
    'Nexus hackathon',
    'web development workshop ADCET',
    'coding bootcamp Sangli',
    'tech talks ADCET',
    'open source day',
    'Nexus activities',
    'React workshop ADCET',
    'Next.js bootcamp',
    'college hackathon Maharashtra',
    'student tech events India',
    'Hacktoberfest ADCET',
  ],
  alternates: {
    canonical: `${siteUrl}/web`,
  },
  openGraph: {
    title: 'Events & Activities — Nexus Web Dev Club',
    description:
      'Workshops, hackathons, tech talks, and more — explore what Nexus has been up to.',
    url: `${siteUrl}/web`,
    type: 'website',
  },
};

export default function WebPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: siteUrl },
              { name: 'Events', url: `${siteUrl}/web` },
            ])
          ),
        }}
      />
      <WebClient />
    </>
  );
}
