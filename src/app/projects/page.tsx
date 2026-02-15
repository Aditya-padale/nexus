import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';
import {
  getProjectsCollectionSchema,
  getBreadcrumbSchema,
} from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'Projects — Selected Work',
  description:
    'Explore projects built by Nexus club members — event platforms, AI-powered web apps, hackathon tools, and open-source contributions.',
  keywords: [
    'Nexus projects',
    'ADCET Nexus projects',
    'Nexus ADCET projects',
    'ADCET web development club projects',
    'web development projects',
    'student projects ADCET',
    'college projects India',
    'hackathon projects',
    'React projects',
    'Next.js projects',
    'ADCET',
    'Discovery 2K25',
    'Codathon ADCET',
    'Neuroverse',
    'student portfolio projects',
    'open source student projects',
    'full stack projects college',
  ],
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: 'Projects — Nexus Web Dev Club',
    description:
      'A curated collection of web development projects shipped by the Nexus club at ADCET.',
    url: `${siteUrl}/projects`,
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectsCollectionSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: siteUrl },
              { name: 'Projects', url: `${siteUrl}/projects` },
            ])
          ),
        }}
      />
      <ProjectsClient />
    </>
  );
}
