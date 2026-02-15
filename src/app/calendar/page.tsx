import React from 'react';
import Layout from '@/components/layout';
import { SectionHero } from '@/components/ui/SectionHero';
import Calendar from '@/components/calendar/Calendar';

export default function CalendarPage() {
    return (
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
    );
}
