'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlight?: boolean;
}

const journeyData: TimelineItem[] = [
  {
    year: 'Now',
    title: 'Growing the Community',
    company: 'Nexus Club',
    description:
      'Actively recruiting new members, running weekly coding sessions, building club projects, and preparing for inter-college hackathons. Nexus is now the largest tech club in the AI & DS department.',
    highlight: true
  },
  {
    year: '2025',
    title: 'First Hackathon Organized',
    company: 'Nexus Club',
    description:
      'Organized our first intra-college hackathon with 100+ participants. Themes included AI-powered web apps, sustainable tech, and social impact projects.'
  },
  {
    year: '2025',
    title: 'Workshop Series Launched',
    company: 'Nexus Club',
    description:
      'Launched a comprehensive workshop series covering HTML/CSS, JavaScript, React, Next.js, Node.js, databases, and deployment. Open to all departments.'
  },
  {
    year: '2024',
    title: 'Open Source Contributions',
    company: 'Nexus Club',
    description:
      'Club members started contributing to open-source projects on GitHub. Participated in Hacktoberfest with 50+ pull requests merged.'
  },
  {
    year: '2024',
    title: 'Club Founded',
    company: 'ADCET, Sangli',
    description:
      'Nexus was founded by a group of passionate students in the AI & Data Science department to bridge the gap between academics and real-world web development.'
  }
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.05
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-1">
        {journeyData.map((item, i) => {
          const isLastItem = i === journeyData.length - 1;

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group relative"
            >
              {/* Timeline item - clean horizontal layout */}
              <div
                className={`grid py-4 sm:grid-cols-[60px_1fr] sm:gap-4 sm:py-6 ${
                  isLastItem ? '' : 'border-b border-foreground/10'
                }`}
              >
                {/* Year */}
                <div className="items-start px-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      item.highlight
                        ? 'bg-primary/10 text-primary'
                        : 'bg-foreground/5 text-foreground/60'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    {item.companyUrl ? (
                      <Link
                        href={item.companyUrl}
                        className="text-sm font-medium text-primary transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{item.company} ↗
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-foreground/50">
                        @{item.company}
                      </span>
                    )}
                  </div>
                  <p className="max-w-2xl text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
