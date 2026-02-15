'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HighlighterProps {
  children: ReactNode;
  action?: 'highlight' | 'underline';
  color?: string;
  className?: string;
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#FFD700',
  className,
}: HighlighterProps) {
  if (action === 'highlight') {
    return (
      <span
        className={cn('px-1 py-0.5 rounded', className)}
        style={{
          backgroundColor: color,
          color: '#000',
        }}
      >
        {children}
      </span>
    );
  }

  if (action === 'underline') {
    return (
      <span
        className={cn('relative', className)}
        style={{
          borderBottom: `3px solid ${color}`,
          paddingBottom: '2px',
        }}
      >
        {children}
      </span>
    );
  }

  return <span className={className}>{children}</span>;
}