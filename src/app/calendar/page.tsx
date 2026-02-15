import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/layout';
import { SectionHero } from '@/components/ui/SectionHero';
import Calendar from '@/components/calendar/Calendar';
import { getBreadcrumbSchema } from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'Schedule — Upcoming Lectures & Events',
  description:
    'Stay updated with Nexus club\'s upcoming lectures, workshops, hackathons, and events. We meet twice a week to learn and build together at ADCET.',
  keywords: [
    'Nexus schedule',
    'Nexus ADCET schedule',
    'ADCET Nexus calendar',
    'ADCET web development club schedule',
    'web development lectures',
    'ADCET events',
    'ADCET coding workshops',
    'coding workshops Sangli',
    'Nexus calendar',
    'club schedule',
    'Nexus upcoming events',
    'ADCET tech events',
    'web dev lectures Maharashtra',
    'student workshops ADCET',
  ],
  alternates: {
    canonical: `${siteUrl}/calendar`,
  },
  openGraph: {
    title: 'Club Schedule — Nexus Web Dev Club',
    description:
      'See upcoming lectures, workshops, and events by the Nexus web dev club at ADCET.',
    url: `${siteUrl}/calendar`,
    type: 'website',
  },
};

export default function CalendarPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        getBreadcrumbSchema([
                            { name: 'Home', url: siteUrl },
                            { name: 'Schedule', url: `${siteUrl}/calendar` },
                        ])
                    ),
                }}
            />
            <Layout title={'Schedule'}>
                <div className="container mx-auto px-4 py-16">
                    <SectionHero
                        title="Club Schedule"
                        subtitle="Stay updated with our upcoming lectures, workshops, and events. We meet twice a week to learn and build together."
                    />
                    <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-1 backdrop-blur-sm lg:p-6 shadow-2xl">
                        <Calendar />
                    </div>
                </div>
            </Layout>
        </>
    );
}
