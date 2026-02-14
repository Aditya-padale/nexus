'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, BookOpen, Lightbulb, Sparkles, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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

export default function ShowcasePage() {
  const [showcasedContent, setShowcasedContent] = useState<ShowcasedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'thought' | 'repo' | 'blog'>('all');

  useEffect(() => {
    fetchShowcasedContent();
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

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'thought': return <Lightbulb className="w-6 h-6" />;
      case 'repo': return <Github className="w-6 h-6" />;
      case 'blog': return <BookOpen className="w-6 h-6" />;
      default: return null;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case 'thought': return 'from-amber-400 to-orange-500';
      case 'repo': return 'from-purple-500 to-pink-500';
      case 'blog': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredContent = filterType === 'all' 
    ? showcasedContent 
    : showcasedContent.filter(c => c.content_type === filterType);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-700">Loading showcase...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Animated Background Blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-6000" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">The Best of the Best</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-800 mb-4">
            Inspiring Creations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore hand-picked thoughts, repositories, and blog posts that stand out from our talented community members.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            onClick={() => setFilterType('all')}
            className={`${
              filterType === 'all'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-white'
            }`}
          >
            All Content
          </Button>
          <Button
            onClick={() => setFilterType('thought')}
            className={`${
              filterType === 'thought'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-white'
            }`}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Thoughts
          </Button>
          <Button
            onClick={() => setFilterType('repo')}
            className={`${
              filterType === 'repo'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-white'
            }`}
          >
            <Github className="w-4 h-4 mr-2" />
            Repositories
          </Button>
          <Button
            onClick={() => setFilterType('blog')}
            className={`${
              filterType === 'blog'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white/80 border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-white'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Blogs
          </Button>
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <Card className="p-16 bg-white/80 border-orange-200/50 text-center shadow-xl">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-light text-gray-800 mb-2">No Featured Content Yet</h3>
            <p className="text-gray-600">
              {filterType === 'all' 
                ? 'Check back soon for amazing content from our community!'
                : `No featured ${filterType}s at the moment.`
              }
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((content, index) => (
              <Card 
                key={content.id}
                className="group relative p-6 bg-white/90 border-2 border-gray-200 hover:border-violet-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getContentColor(content.content_type)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Content Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${getContentColor(content.content_type)} text-white shadow-lg mb-4`}>
                  {getContentIcon(content.content_type)}
                </div>

                {/* Content Type Badge */}
                <div className="mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                    {content.content_type}
                  </span>
                </div>

                {/* Author */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600">
                    by <span className="font-medium text-violet-600">{content.account_name}</span>
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                  {content.title}
                </h3>

                {/* Description */}
                {content.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {content.description}
                  </p>
                )}

                {/* Tags */}
                {content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        +{content.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Link */}
                {content.url && (
                  <a 
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-semibold group/link"
                  >
                    <span>Explore</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}

                {/* Admin Notes */}
                {content.admin_notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 italic">
                      "{content.admin_notes}"
                    </p>
                  </div>
                )}

                {/* Date */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Featured on {new Date(content.liked_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {showcasedContent.length > 0 && (
          <div className="mt-16 text-center">
            <Card className="inline-block p-8 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 shadow-xl">
              <h3 className="text-2xl font-light text-gray-800 mb-3">Want to be featured?</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Create amazing content and you might see it showcased here! Share your best thoughts, repos, and blogs.
              </p>
              <Link href="/nexus/admin_nexus">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg">
                  Get Started
                </Button>
              </Link>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-orange-200/50 bg-white/70 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-gray-600">
            Showcasing excellence from our community · Curated by Admin
          </p>
        </div>
      </footer>
    </div>
  );
}
