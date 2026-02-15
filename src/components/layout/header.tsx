'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Menu from '../nav';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { isMobile } from '@/components/util';
import Magnetic from '@/components/animations/magnetic';
import Image from 'next/image';

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    // Check if mobile on client side to avoid hydration mismatch
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          });
        }
      }
    });
  }, []);

  return (
    <>
      <div
        ref={header}
        className="absolute top-0 z-20 box-border flex w-full items-center justify-between px-6 py-5 font-light text-white mix-blend-difference lg:px-10 lg:py-6"
      >
        {/* Logo + Brand */}
        <div className="flex items-center">
          <Link href={'/'} className="group z-10 flex items-center gap-3">
            <Magnetic>
              <Image
                height={28}
                width={28}
                src="/images/logo.jpg"
                alt="Nexus logo"
                priority
                className="rounded-sm"
              />
            </Magnetic>
            {!isMobileDevice && (
              <div className="flex items-center gap-1 text-sm tracking-wide opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                <span className="transition-transform duration-500 group-hover:rotate-[360deg]">©</span>
                <div className="relative flex items-center overflow-hidden">
                  <span className="whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-0 group-hover:translate-x-[-10px] group-hover:opacity-0 active:scale-95">
                    built by
                  </span>
                  <span className="px-1 font-medium">Nexus</span>
                  <span className="max-w-0 translate-x-[-10px] whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[50px] group-hover:translate-x-0 group-hover:opacity-100">
                    Club
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        {!isMobileDevice && (
          <nav className="flex items-center gap-1">
            {[
              { label: 'About', href: '/about' },
              { label: 'Projects', href: '/projects' },
              { label: 'Events', href: '/web' },
              { label: 'Schedule', href: '/calendar' },
              { label: 'Showcase', href: '/nexus/showcase' },
            ].map((item) => (
              <Magnetic key={item.label}>
                <Link
                  href={item.href}
                  className="group/link relative z-10 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-100 opacity-70"
                >
                  {item.label}
                  <span className="absolute bottom-0.5 left-4 right-4 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                </Link>
              </Magnetic>
            ))}

            {/* Contact CTA */}
            <Magnetic>
              <Link
                href={'/contact'}
                className="group/contact relative z-10 ml-4 flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2 text-[13px] font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08]"
              >
                Contact
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </nav>
        )}
      </div>
      {!isMobileDevice && (
        <div ref={button} className="fixed right-0 z-20 scale-0 transform">
          <Menu />
        </div>
      )}
      {isMobileDevice && (
        <div className="fixed right-2 z-20 transform">
          <Menu />
        </div>
      )}
    </>
  );
}
