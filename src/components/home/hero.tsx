'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] text-white selection:bg-violet-500/30">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            animation: 'hero-breathe 6s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500"
        >
          nexus — adcet
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.25 }}
          className="font-display text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Where ideas
          <br />
          <span className="italic text-zinc-400">take shape.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.45 }}
          className="mx-auto mt-8 max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg"
        >
          A student community for web, AI &amp; data science —
          building real things, together.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/join"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:bg-white/[0.06] hover:text-white"
          >
            Join the Club
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />

      <style jsx>{`
        @keyframes hero-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
