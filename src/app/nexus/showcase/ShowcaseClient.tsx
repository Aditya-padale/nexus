'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Github,
  BookOpen,
  Lightbulb,
  Sparkles,
  Star,
  TrendingUp,
  ArrowUpRight,
  Quote,
  Filter,
  ChevronDown,
  Users,
  Award,
  Zap,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { ComicText } from '@/components/ui/comic-text';

interface ShowcasedContent {
  id: string;
  user_id: string;
  content_type: 'thought' | 'repo' | 'blog';
  title: string;
  description: string | null;
  url: string | null;
  tags: string[];
  created_at: string;
  liked_at: string;
  admin_notes: string | null;
  display_order: number;
  account_name: string;
}

// ── Animated Counter ──
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Stagger fade-in wrapper ──
function FadeInOnScroll({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── Showcase Card ──
function ShowcaseCard({ content, index }: { content: ShowcasedContent; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'thought':
        return <Lightbulb className="w-5 h-5" />;
      case 'repo':
        return <Github className="w-5 h-5" />;
      case 'blog':
        return <BookOpen className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getAccentColor = (type: string) => {
    switch (type) {
      case 'thought':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          hoverBorder: 'hover:border-amber-400',
          iconBg: 'bg-amber-100',
          iconText: 'text-amber-600',
          badgeBg: 'bg-amber-50',
          badgeText: 'text-amber-700',
          badgeBorder: 'border-amber-200',
          tagBg: 'bg-amber-50',
          tagText: 'text-amber-700',
          gradient: 'from-amber-500 to-orange-500',
          dot: 'bg-amber-400',
        };
      case 'repo':
        return {
          bg: 'bg-violet-50',
          border: 'border-violet-200',
          hoverBorder: 'hover:border-violet-400',
          iconBg: 'bg-violet-100',
          iconText: 'text-violet-600',
          badgeBg: 'bg-violet-50',
          badgeText: 'text-violet-700',
          badgeBorder: 'border-violet-200',
          tagBg: 'bg-violet-50',
          tagText: 'text-violet-700',
          gradient: 'from-violet-500 to-purple-500',
          dot: 'bg-violet-400',
        };
      case 'blog':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          hoverBorder: 'hover:border-sky-400',
          iconBg: 'bg-sky-100',
          iconText: 'text-sky-600',
          badgeBg: 'bg-sky-50',
          badgeText: 'text-sky-700',
          badgeBorder: 'border-sky-200',
          tagBg: 'bg-sky-50',
          tagText: 'text-sky-700',
          gradient: 'from-sky-500 to-blue-500',
          dot: 'bg-sky-400',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          hoverBorder: 'hover:border-gray-400',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          badgeBg: 'bg-gray-50',
          badgeText: 'text-gray-700',
          badgeBorder: 'border-gray-200',
          tagBg: 'bg-gray-50',
          tagText: 'text-gray-700',
          gradient: 'from-gray-500 to-gray-600',
          dot: 'bg-gray-400',
        };
    }
  };

  const colors = getAccentColor(content.content_type);

  return (
    <FadeInOnScroll delay={index * 80}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative bg-white rounded-2xl border ${colors.border} ${colors.hoverBorder} shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden`}
        style={{
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient}`} />

        <div className="p-6 lg:p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${colors.iconBg} ${colors.iconText}`}>
                {getContentIcon(content.content_type)}
              </div>
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-widest ${colors.badgeBg} ${colors.badgeText} border ${colors.badgeBorder}`}
                >
                  {content.content_type}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[11px] font-medium text-amber-600">Featured</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors leading-snug">
            {content.title}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
              <span className="text-[10px] font-bold text-white uppercase">
                {content.account_name.charAt(0)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{content.account_name}</span>
            </p>
          </div>

          {/* Description */}
          {content.description && (
            <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">
              {content.description}
            </p>
          )}

          {/* Tags */}
          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {content.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 ${colors.tagBg} ${colors.tagText} rounded-lg text-xs font-medium`}
                >
                  {tag}
                </span>
              ))}
              {content.tags.length > 4 && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium">
                  +{content.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Admin Notes */}
          {content.admin_notes && (
            <div className="mb-5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex gap-2">
                <Quote className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 italic leading-relaxed">
                  {content.admin_notes}
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium">
              {new Date(content.liked_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r ${colors.gradient} text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
              >
                View
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

// ── Featured Spotlight (hero card for top item) ──
function FeaturedSpotlight({ content }: { content: ShowcasedContent }) {
  const getGradient = (type: string) => {
    switch (type) {
      case 'thought':
        return 'from-amber-500 to-orange-600';
      case 'repo':
        return 'from-violet-500 to-purple-600';
      case 'blog':
        return 'from-sky-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'thought':
        return <Lightbulb className="w-6 h-6" />;
      case 'repo':
        return <Github className="w-6 h-6" />;
      case 'blog':
        return <BookOpen className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <FadeInOnScroll>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-200 via-pink-200 to-amber-200 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
        <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left accent panel */}
            <div
              className={`md:col-span-2 bg-gradient-to-br ${getGradient(content.content_type)} p-8 md:p-10 flex flex-col justify-between text-white min-h-[280px]`}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Editor&apos;s Pick</span>
                </div>
                <div className="p-3 bg-white/20 rounded-xl inline-block mb-4">{getIcon(content.content_type)}</div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">{content.title}</h3>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
                  <span className="text-sm font-bold uppercase">{content.account_name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{content.account_name}</p>
                  <p className="text-xs text-white/70">
                    {new Date(content.liked_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right content panel */}
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {content.description && (
                  <p className="text-gray-600 leading-relaxed text-base mb-6">{content.description}</p>
                )}
                {content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {content.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {content.admin_notes && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                    <div className="flex gap-3">
                      <Quote className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                      <p className="text-sm text-gray-500 italic leading-relaxed">
                        {content.admin_notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {content.url && (
                <a
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${getGradient(content.content_type)} text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-fit`}
                >
                  Explore This {content.content_type === 'repo' ? 'Repository' : content.content_type === 'blog' ? 'Blog Post' : 'Thought'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━ MAIN PAGE ━━━━━━━━━━━━━━━━━━━━━━

export default function ShowcaseClient() {
  const [showcasedContent, setShowcasedContent] = useState<ShowcasedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'thought' | 'repo' | 'blog'>('all');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetchShowcasedContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchShowcasedContent = async () => {
    try {
      const response = await fetch('/api/admin-likes');
      const data = await response.json();
      if (data.showcased) {
        setShowcasedContent(data.showcased);
      }
    } catch (error) {
      console.error('Error fetching showcased content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent =
    filterType === 'all' ? showcasedContent : showcasedContent.filter((c) => c.content_type === filterType);

  const thoughtsCount = showcasedContent.filter((c) => c.content_type === 'thought').length;
  const reposCount = showcasedContent.filter((c) => c.content_type === 'repo').length;
  const blogsCount = showcasedContent.filter((c) => c.content_type === 'blog').length;
  const uniqueAuthors = new Set(showcasedContent.map((c) => c.account_name)).size;

  // Separate first item as spotlight
  const spotlightItem = filteredContent.length > 0 ? filteredContent[0] : null;
  const restItems = filteredContent.slice(1);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-violet-500 animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-900 font-semibold text-lg">Loading Showcase</p>
            <p className="text-gray-400 text-sm">Curating the best content for you…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ━━━━━ HERO SECTION ━━━━━ */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-[10%] w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-60"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          />
          <div
            className="absolute top-40 right-[15%] w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          {/* Top nav bar */}
          <div className="flex items-center justify-between py-6">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700">Live</span>
            </div>
          </div>

          {/* Hero content */}
          <div className="pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-4xl mx-auto">
            <FadeInOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full mb-8">
                <Award className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-semibold text-violet-700 tracking-wide">Community Showcase</span>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={100}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-6 leading-[0.95]">
                The Best
                <br />
                <ComicText className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                  Creations
                </ComicText>
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={200}>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
                Hand-picked thoughts, repositories, and blog posts that stand out from our talented community members.
              </p>
            </FadeInOnScroll>

            {/* Stats strip */}
            <FadeInOnScroll delay={300}>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    <AnimatedCounter target={showcasedContent.length} />
                  </span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Featured</span>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden md:block" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    <AnimatedCounter target={uniqueAuthors} />
                  </span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Contributors</span>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden md:block" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    <AnimatedCounter target={3} />
                  </span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Categories</span>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Scroll hint */}
            <FadeInOnScroll delay={500}>
              <div className="mt-16 flex flex-col items-center gap-2 animate-scroll-down">
                <ChevronDown className="w-5 h-5 text-gray-300" />
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ━━━━━ CATEGORY STATS RIBBON ━━━━━ */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <FadeInOnScroll delay={0} className="py-8 md:py-10 flex items-center justify-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter target={thoughtsCount} />
                </p>
                <p className="text-sm text-gray-500 font-medium">Thoughts Shared</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={100} className="py-8 md:py-10 flex items-center justify-center gap-4">
              <div className="p-3 bg-violet-100 rounded-xl">
                <Github className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter target={reposCount} />
                </p>
                <p className="text-sm text-gray-500 font-medium">Repositories</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={200} className="py-8 md:py-10 flex items-center justify-center gap-4">
              <div className="p-3 bg-sky-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter target={blogsCount} />
                </p>
                <p className="text-sm text-gray-500 font-medium">Blog Posts</p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ━━━━━ FILTERS ━━━━━ */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Filter:</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { key: 'all' as const, label: 'All', icon: <Sparkles className="w-3.5 h-3.5" />, count: showcasedContent.length },
                { key: 'thought' as const, label: 'Thoughts', icon: <Lightbulb className="w-3.5 h-3.5" />, count: thoughtsCount },
                { key: 'repo' as const, label: 'Repos', icon: <Github className="w-3.5 h-3.5" />, count: reposCount },
                { key: 'blog' as const, label: 'Blogs', icon: <BookOpen className="w-3.5 h-3.5" />, count: blogsCount },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filterType === f.key
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.icon}
                  <span className="hidden sm:inline">{f.label}</span>
                  <span
                    className={`ml-1 text-xs tabular-nums ${
                      filterType === f.key ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━ MAIN CONTENT ━━━━━ */}
      <main className="container mx-auto px-6 max-w-7xl py-16 md:py-20">
        {filteredContent.length === 0 ? (
          /* Empty State */
          <FadeInOnScroll>
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Featured Content Yet</h3>
              <p className="text-gray-500 max-w-md mb-8">
                {filterType === 'all'
                  ? 'Check back soon for amazing content from our community!'
                  : `No featured ${filterType}s at the moment. Try a different filter.`}
              </p>
              {filterType !== 'all' && (
                <button
                  onClick={() => setFilterType('all')}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Show All Content
                </button>
              )}
            </div>
          </FadeInOnScroll>
        ) : (
          <div className="space-y-16">
            {/* Spotlight — first item gets hero treatment */}
            {spotlightItem && (
              <div>
                <FadeInOnScroll>
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Spotlight</h2>
                  </div>
                </FadeInOnScroll>
                <FeaturedSpotlight content={spotlightItem} />
              </div>
            )}

            {/* Rest of content */}
            {restItems.length > 0 && (
              <div>
                <FadeInOnScroll>
                  <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="w-5 h-5 text-violet-500" />
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">All Featured</h2>
                    <div className="flex-1 h-px bg-gray-100 ml-4" />
                  </div>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restItems.map((content, index) => (
                    <ShowcaseCard key={content.id} content={content} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ━━━━━ CTA SECTION ━━━━━ */}
      <section className="border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl py-20 md:py-28">
          <FadeInOnScroll>
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 md:p-16 text-center">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium text-gray-300">Join the Community</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  Want to be featured?
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  Create something amazing and share it with the community. The best content gets hand-picked and showcased right here.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact">
                    <button className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      Get Started
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="px-8 py-3.5 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ━━━━━ FOOTER ━━━━━ */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-6 max-w-7xl py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Community Showcase</span>
            </div>
            <p className="text-sm text-gray-400">
              Curated with care · Showcasing excellence from our community
            </p>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link href="/projects" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
