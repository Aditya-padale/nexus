'use client';

import React, { useState, useEffect } from 'react';

const motivationalQuotes = [
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    icon: "💡"
  },
  {
    quote: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    icon: "🚀"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    icon: "🎯"
  },
  {
    quote: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    icon: "🧠"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    icon: "❤️"
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    icon: "⭐"
  }
];

/**
 * Motivational widget for sidebar display
 */
export default function CompactGitHubWidget() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const quote = motivationalQuotes[currentQuote];

  return (
    <div className="group relative block overflow-hidden rounded-2xl border border-foreground/10 bg-white p-5 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-primary/20">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/[0.04] group-hover:bg-primary/10 transition-colors duration-300">
              <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                {quote.icon}
              </span>
            </div>
            <h4 className="text-sm font-bold text-foreground">Daily Motivation</h4>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-medium text-primary">Inspire</span>
          </div>
        </div>

        {/* Quote content */}
        <div className="mb-4 rounded-xl bg-foreground/[0.02] p-4 group-hover:bg-primary/[0.02] transition-colors duration-300">
          <blockquote className="text-sm font-medium text-foreground/80 leading-relaxed mb-3 italic">
            "{quote.quote}"
          </blockquote>
          <cite className="text-xs font-semibold text-foreground/60 not-italic">
            — {quote.author}
          </cite>
        </div>

        {/* Quote indicators */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {motivationalQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentQuote 
                    ? 'bg-primary w-4' 
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-foreground/30 group-hover:text-primary transition-colors duration-300">
            Keep coding! 💻
          </span>
        </div>
      </div>
    </div>
  );
}
