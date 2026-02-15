'use client';

import React from 'react';
import Layout from '@/components/layout';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHero } from '@/components/ui/SectionHero';

// Events data
const workItems = [
  {
    id: 'hackathon-2025',
    title: 'Nexus Hackathon 2025',
    description:
      'Our flagship intra-college hackathon with 100+ participants. Build AI-powered web apps in 24 hours.',
    imagePath: '',
    link: '/web',
    tags: ['Hackathon', 'AI', 'Web Dev']
  },
  {
    id: 'react-workshop',
    title: 'React Workshop Series',
    description:
      'A 4-week hands-on workshop covering React fundamentals, hooks, state management, and deployment.',
    imagePath: '',
    link: '/web',
    tags: ['Workshop', 'React']
  },
  {
    id: 'nextjs-bootcamp',
    title: 'Next.js Bootcamp',
    description:
      'Intensive weekend bootcamp on building full-stack applications with Next.js, TypeScript, and Prisma.',
    imagePath: '',
    link: '/web',
    tags: ['Bootcamp', 'Next.js']
  },
  {
    id: 'open-source-day',
    title: 'Open Source Contribution Day',
    description:
      'A day-long event helping students make their first open-source contribution on GitHub.',
    imagePath: '',
    link: '/web',
    tags: ['Open Source', 'GitHub']
  },
  {
    id: 'tech-talks',
    title: 'Tech Talk Tuesdays',
    description:
      'Weekly tech talks by club members and industry guests on trending web technologies and career guidance.',
    imagePath: '',
    link: '/web',
    tags: ['Tech Talks', 'Community']
  }
];

export default function WebClient() {
  return (
    <Layout title="Events & Activities">
      <div className="container mx-auto min-h-screen px-4 py-16">
        <SectionHero
          title="Events & Activities"
          subtitle="Workshops, hackathons, tech talks, and more — explore what Nexus has been up to."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <ProjectCard
              key={item.id}
              {...item}
              index={index}
              animated
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
