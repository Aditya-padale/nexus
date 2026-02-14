'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Twitter widget showing latest tweet or status
 * Inspired by Marco.fyi about page
 */
export default function TwitterWidget() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Twitter icon badge */}
      <div className="absolute right-4 top-4">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-blue-500"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Profile info */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-600 to-indigo-800">
          <span className="text-lg font-bold text-white">N</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Nexus Club</h3>
          <p className="text-sm text-foreground/60">@nexus_adce</p>
        </div>
      </div>

      {/* Status text */}
      <p className="mb-4 text-sm leading-relaxed text-foreground/80">
        Web Development Club • AI & DS Dept • ADCET Sangli
      </p>

      {/* View tweets link */}
      <Link
        href="https://www.instagram.com/nexus_adce"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Follow us
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

