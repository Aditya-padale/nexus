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
    year: '2026',
    title: 'A Growing Family – Expansion and New Beginnings (2026)',
    company: 'Nexus Club',
    description:
      'The Year Our Community Grew Stronger, As More Students Joined and Became Part of Our Shared Dream.'
  },
  {
    year: '2025',
    title: 'The First Big Project – Discovery (2025)',
    company: 'Nexus Club',
    description:
      'The Big Step Forward with Discovery, A Project That Proved We Could Turn Our Ideas into Reality Through Teamwork and Determination.'
  },
  {
    year: '2025',
    title: 'The First Milestone – Neuroverse Website (2025)',
    company: 'Nexus Club',
    description:
      'The First Proud Moment When Neuroverse Was Launched, Giving Our Club Its Own Identity and a Place in the Digital World.'
  },
  {
    year: '2025',
    title: 'Club Founded',
    company: 'ADCET, Ashta',
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
      {/* Vertical timeline line */}
      <div className="absolute left-[39px] top-6 bottom-6 hidden w-px bg-gradient-to-b from-primary/20 via-foreground/10 to-transparent sm:block" />

      <div className="space-y-0">
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
              <div
                className={`grid py-5 sm:grid-cols-[80px_1fr] sm:gap-5 sm:py-7 ${
                  isLastItem ? '' : 'border-b border-foreground/[0.06]'
                }`}
              >
                {/* Year with dot indicator */}
                <div className="relative flex items-start gap-3 px-2">
                  {/* Timeline dot */}
                  <div className={`relative z-10 mt-1.5 hidden h-3 w-3 shrink-0 rounded-full border-2 sm:block ${
                    item.highlight
                      ? 'border-primary bg-primary/20 shadow-[0_0_8px_rgba(31,143,255,0.3)]'
                      : 'border-foreground/20 bg-white group-hover:border-primary/40'
                  } transition-all duration-300`} />
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold tracking-wide ${
                      item.highlight
                        ? 'bg-primary/10 text-primary'
                        : 'bg-foreground/[0.04] text-foreground/50 group-hover:bg-foreground/[0.07] group-hover:text-foreground/70'
                    } transition-all duration-300`}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold text-foreground sm:text-xl">
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
                      <span className="text-sm font-medium text-foreground/40">
                        @{item.company}
                      </span>
                    )}
                  </div>
                  <p className="max-w-2xl text-foreground/55 leading-relaxed">
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
