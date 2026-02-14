'use client';

import React from 'react';
import { useGitHub } from '@/hooks/useGithub';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import RoundedButton from '@/components/animations/roundedButton';
import OpenSourceShowcase from '@/components/about/OpenSourceShowcase';
import CompactGitHubWidget from '@/components/about/Widgets/CompactGitHubWidget';
import IMessageWidget from '@/components/about/Widgets/IMessageWidget';

export default function About() {
  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <div className="relative overflow-hidden">
      <Layout title="About Us">
        <div>
          <section className="grid gap-8 py-12 md:gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimatedSection
              animation="fade-right"
              className="lg:sticky lg:top-32 lg:col-span-2 lg:self-start"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center">
                <h2 className="text-6xl font-bold text-white">N</h2>
              </div>
            </AnimatedSection>

            <div className="space-y-8 lg:col-span-3">
              <AnimatedSection animation="fade-up">
                <TextReveal
                  text="Nexus is the web development club of the AI & Data Science department at Annasaheb Dange College of Engineering, Sangli. We bridge the gap between learning and building."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  highlightWords={['Nexus', 'building']}
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Our Mission
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    To empower students with modern web development skills,
                    foster a culture of open-source contribution, and build
                    a community of passionate developers who learn by doing.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    What We Do
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    We organize hands-on workshops on React, Next.js, Node.js,
                    and other modern frameworks. We host hackathons, coding
                    challenges, and tech talks. We build real-world projects
                    as a team and contribute to open-source. We also mentor
                    juniors and help them kickstart their development journey.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>
          {/* Journey Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Our Journey
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0 lg:col-span-1">
                  <div className="rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm sm:p-8">
                    <JourneyTimeline />
                  </div>
                  {/* Department Section */}
                  <section className="py-16">
                    <AnimatedSection animation="fade-up">
                      <div className="rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                          Department & College
                        </h2>
                        <p className="mb-6 text-foreground/70">
                          Part of the{' '}
                          <span className="font-semibold text-foreground">
                            Artificial Intelligence & Data Science
                          </span>{' '}
                          department at Annasaheb Dange College of Engineering &
                          Technology (ADCET), Sangli, affiliated to Shivaji
                          University, Kolhapur.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <RoundedButton>
                            AI & Data Science Department
                          </RoundedButton>
                          <RoundedButton>
                            ADCET, Sangli
                          </RoundedButton>
                        </div>
                      </div>
                    </AnimatedSection>
                  </section>
                </div>

                {/* Widgets sidebar */}
                <div className="min-w-0 lg:col-span-1">
                  <div className="space-y-4 lg:sticky lg:top-32">
                    <AnimatedSection animation="fade-up">
                      <CompactGitHubWidget />
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up">
                      <OpenSourceShowcase />
                    </AnimatedSection>
                    <AnimatedSection animation="fade-up">
                      <IMessageWidget />
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>
        </div>
      </Layout>

      <ContrastCursor isActive={false} text="" />
    </div>
  );
}
