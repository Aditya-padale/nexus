'use client';

import React, { useEffect, useRef } from 'react';
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
import { Highlighter } from '@/components/ui/highlighter';
import { ComicText } from '@/components/ui/comic-text';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Learn by Building',
    description: 'No boring lectures. We build real projects from day one — from portfolio sites to full-stack apps.',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-200/50',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Community First',
    description: 'A welcoming space for all skill levels. Collaborate, get code reviews, and grow together.',
    gradient: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-200/50',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Open Source',
    description: 'We believe in giving back. Our code is public, our knowledge is shared, and our doors are always open.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-200/50',
  },
];

const techStack = [
  { name: 'React', color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Next.js', color: 'bg-neutral-100 text-neutral-800' },
  { name: 'TypeScript', color: 'bg-blue-100 text-blue-700' },
  { name: 'Node.js', color: 'bg-green-100 text-green-700' },
  { name: 'Tailwind CSS', color: 'bg-sky-100 text-sky-700' },
  { name: 'GSAP', color: 'bg-lime-100 text-lime-700' },
  { name: 'Supabase', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Git & GitHub', color: 'bg-orange-100 text-orange-700' },
  { name: 'Figma', color: 'bg-purple-100 text-purple-700' },
  { name: 'Vercel', color: 'bg-neutral-100 text-neutral-700' },
];

export default function About() {
  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  const marqueeRef = useRef<HTMLDivElement>(null);

  // Infinite tech marquee
  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Layout title="About us" center={true}>
        <div>
          {/* ── HERO SECTION ── */}
          <section className="relative py-16 md:py-28 overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
              {/* Badge */}
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
                  <span className="sr-only">active</span>
                  <span className="text-sm font-medium text-primary">Web Dev Club • AI & DS Dept</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.05}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
                  We are{' '}
                  <ComicText className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">Nexus</ComicText>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-foreground/70 text-center max-w-3xl mx-auto">
                  A{" "}
                  <Highlighter action="underline" color="#FF9800">
                    vibrant community
                  </Highlighter>{" "}
                  of developers, designers, and tech enthusiasts who believe in{" "}
                  <Highlighter action="highlight" color="#87CEFA">
                    learning by building
                  </Highlighter>{" "}
                  . From ideation to deployment, we transform concepts into real-world applications while fostering innovation, collaboration, and open-source contribution.
                </p>
              </AnimatedSection>

              {/* Scroll indicator */}
              <AnimatedSection animation="fade-up" delay={0.3}>
                <div className="mt-16 flex flex-col items-center gap-2 text-foreground/30">
                  <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                  <div className="h-12 w-px bg-gradient-to-b from-foreground/20 to-transparent animate-scroll-down" />
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── SECTION DIVIDER ── */}
          <div className="section-divider mx-auto max-w-4xl" />

          {/* ── VALUES / PILLARS ── */}
          <section className="py-16 md:py-24">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-3 block">What drives us</span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                  Our Core Pillars
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <AnimatedSection key={v.title} animation="fade-up" delay={i * 0.1}>
                  <div className={`group relative h-full rounded-2xl border ${v.border} bg-gradient-to-br ${v.gradient} p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}>
                    <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-white/80 p-3 shadow-sm text-foreground/70 group-hover:text-primary transition-colors duration-300">
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{v.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{v.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ── MISSION & VISION BENTO ── */}
          <section className="py-12 md:py-20">
            <div className="grid md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Mission - takes 3 cols */}
              <AnimatedSection animation="fade-up" className="md:col-span-3">
                <div className="relative h-full overflow-hidden rounded-2xl border border-foreground/5 bg-white p-8 md:p-10 shadow-sm group hover:shadow-lg transition-all duration-500">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-5">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                      Our Mission
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
                      Empowering the next generation of web developers
                    </h3>
                    <p className="text-foreground/60 leading-relaxed text-base md:text-lg">
                      To empower students with modern web development skills,
                      foster a culture of open-source contribution, and build
                      a community of passionate developers who learn by doing.
                      We bridge the gap between classroom theory and industry practice.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Vision - takes 2 cols */}
              <AnimatedSection animation="fade-up" delay={0.1} className="md:col-span-2">
                <div className="relative h-full overflow-hidden rounded-2xl border border-foreground/5 bg-gradient-to-br from-foreground to-foreground/90 p-8 md:p-10 shadow-sm group hover:shadow-lg transition-all duration-500">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 mb-5">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Our Vision
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      Where passion meets purpose
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      To be the most impactful student-led tech community,
                      producing industry-ready developers and meaningful
                      open-source contributions.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── TECH STACK MARQUEE ── */}
          <section className="py-12 md:py-16 overflow-hidden">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-8">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground/40">Technologies we work with</span>
              </div>
            </AnimatedSection>
            <div className="relative max-w-5xl mx-auto">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <div className="overflow-hidden">
                <div ref={marqueeRef} className="flex gap-4 w-max">
                  {[...techStack, ...techStack].map((tech, i) => (
                    <div
                      key={`${tech.name}-${i}`}
                      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap ${tech.color} border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-md`}
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION DIVIDER ── */}
          <div className="section-divider mx-auto max-w-4xl" />

          {/* ── WHAT WE DO ── */}
          <section className="py-16 md:py-24">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-3 block">Our Activities</span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">What We Do</h2>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { emoji: '🛠️', title: 'Workshops', desc: 'Hands-on sessions on React, Next.js, Node.js, and modern frameworks.' },
                { emoji: '🏅', title: 'Hackathons', desc: 'Intra-college and inter-college hackathons with real-world problem statements.' },
                { emoji: '💡', title: 'Tech Talks', desc: 'Guest speakers, alumni talks, and deep-dives into emerging technologies.' },
                { emoji: '🤝', title: 'Open Source', desc: 'Contributing to OSS projects together. Hacktoberfest participation and more.' },
              ].map((item, i) => (
                <AnimatedSection key={item.title} animation="fade-up" delay={i * 0.08}>
                  <div className="group rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm hover:shadow-lg hover:border-primary/15 transition-all duration-500 hover:-translate-y-1 h-full">
                    <span className="text-3xl mb-4 block">{item.emoji}</span>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* ── SECTION DIVIDER ── */}
          <div className="section-divider mx-auto max-w-4xl" />

          {/* ── JOURNEY & WIDGETS BENTO ── */}
          <section className="py-16 md:py-24">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-12 md:mb-14">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-3 block">Milestones</span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                  Our Journey
                </h2>
                <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  From a small idea to a thriving community — here&apos;s how far we&apos;ve come.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid gap-6 lg:grid-cols-5">
              {/* Journey timeline - 3 cols */}
              <div className="min-w-0 lg:col-span-3 space-y-6">
                <AnimatedSection animation="fade-up">
                  <div className="rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm sm:p-8 hover:shadow-lg transition-shadow duration-500">
                    <JourneyTimeline />
                  </div>
                </AnimatedSection>

                {/* Department card */}
                <AnimatedSection animation="fade-up" delay={0.1}>
                  <div className="relative overflow-hidden rounded-2xl border border-foreground/5 bg-gradient-to-br from-white to-primary/[0.02] p-6 shadow-sm sm:p-8 hover:shadow-lg transition-shadow duration-500">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-5">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                        Our Home
                      </div>
                      <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                        Department & College
                      </h2>
                      <p className="mb-6 text-foreground/60 leading-relaxed">
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
                  </div>
                </AnimatedSection>
              </div>

              {/* Widgets sidebar - 2 cols */}
              <div className="min-w-0 lg:col-span-2">
                <div className="space-y-6 lg:sticky lg:top-32">
                  <AnimatedSection animation="fade-up">
                    <CompactGitHubWidget />
                  </AnimatedSection>
                  <AnimatedSection animation="fade-up" delay={0.05}>
                    <OpenSourceShowcase />
                  </AnimatedSection>
                  <AnimatedSection animation="fade-up" delay={0.1}>
                    <IMessageWidget />
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA SECTION ── */}
          <section className="py-16 md:py-24">
            <AnimatedSection animation="scale">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 p-10 md:p-16 text-center max-w-5xl mx-auto">
                {/* Decorative */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/15 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary/15 rounded-full blur-[80px]" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Ready to build something amazing?
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Whether you&apos;re a complete beginner or a seasoned developer, there&apos;s a place for you in Nexus.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <RoundedButton backgroundColor="primary" className="text-white">
                      Join Nexus →
                    </RoundedButton>
                    <RoundedButton className="text-white">
                      View Projects
                    </RoundedButton>
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
