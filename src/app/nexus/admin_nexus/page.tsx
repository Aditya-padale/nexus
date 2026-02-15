'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, ExternalLink, Github, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Account {
  id: string;
  account_name: string;
  user_id: string;
  created_at: string;
}

interface UserContent {
  id: string;
  user_id: string;
  content_type: 'thought' | 'repo' | 'blog';
  title: string;
  description: string | null;
  url: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminNexusPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccountName, setNewAccountName] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [allContent, setAllContent] = useState<UserContent[]>([]);
  const [likedContentIds, setLikedContentIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'accounts' | 'content'>('accounts');

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccounts();
      fetchAllContent();
      fetchLikedContent();
    }
  }, [isAuthenticated]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      if (data.accounts) {
        setAccounts(data.accounts);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const fetchAllContent = async () => {
    try {
      const response = await fetch('/api/user-content');
      const data = await response.json();
      if (data.content) {
        setAllContent(data.content);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchLikedContent = async () => {
    try {
      const response = await fetch('/api/admin-likes');
      const data = await response.json();
      if (data.showcased) {
        const likedIds = new Set<string>(data.showcased.map((item: any) => item.id));
        setLikedContentIds(likedIds);
      }
    } catch (error) {
      console.error('Error fetching liked content:', error);
    }
  };

  const handleLikeToggle = async (contentId: string) => {
    const isLiked = likedContentIds.has(contentId);
    
    try {
      if (isLiked) {
        // Unlike
        const response = await fetch(`/api/admin-likes?contentId=${contentId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLikedContentIds(prev => {
            const next = new Set(prev);
            next.delete(contentId);
            return next;
          });
          setMessage({ type: 'success', text: 'Content removed from showcase' });
        }
      } else {
        // Like
        const response = await fetch('/api/admin-likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentId }),
        });
        if (response.ok) {
          setLikedContentIds(prev => new Set(prev).add(contentId));
          setMessage({ type: 'success', text: 'Content added to showcase!' });
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setMessage({ type: 'error', text: 'Failed to update showcase' });
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'thought': return <Lightbulb className="w-5 h-5" />;
      case 'repo': return <Github className="w-5 h-5" />;
      case 'blog': return <BookOpen className="w-5 h-5" />;
      default: return null;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case 'thought': return 'from-amber-500 to-orange-500';
      case 'repo': return 'from-purple-500 to-pink-500';
      case 'blog': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getAccountName = (userId: string) => {
    const account = accounts.find(a => a.user_id === userId);
    return account?.account_name || userId;
  };

  const handleCreateAccount = async () => {
    if (!newAccountName || !newUserId) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountName: newAccountName,
          userId: newUserId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully!' });
        setNewAccountName('');
        setNewUserId('');
        fetchAccounts();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while creating the account' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) {
      return;
    }

    try {
      const response = await fetch(`/api/accounts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account deleted successfully!' });
        fetchAccounts();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while deleting the account' });
    }
  };

  const handleLogin = () => {
    // This is a placeholder - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        {/* Ambient glow effect */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
            }}
          />
        </div>
        
        <Card className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight text-white mb-2">Admin Nexus</h1>
            <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider">Secure Access Portal</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter access code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
            >
              Access System
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-white">Admin Nexus</h1>
              <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Central Control System</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/nexus/showcase">
                <Button 
                  variant="outline"
                  className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  View Showcase
                </Button>
              </Link>
              <Button 
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('accounts')}
            className={`${
              activeTab === 'accounts'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10'
            }`}
          >
            Account Management
          </Button>
          <Button
            onClick={() => setActiveTab('content')}
            className={`${
              activeTab === 'content'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10'
            }`}
          >
            Content Review
          </Button>
        </div>

        {/* Accounts Management */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-light tracking-tight mb-2">Account Management</h2>
            <p className="text-zinc-500 text-sm">Create and manage user accounts</p>
          </div>

          {message && (
            <Card className={`p-4 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message.text}
              </p>
            </Card>
          )}

          <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-xl font-light tracking-tight mb-4">Create New Account</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-400">Account Name</label>
                <Input
                  placeholder="Enter account name"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-400">User ID</label>
                <Input
                  placeholder="Enter user ID"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600"
                />
              </div>
            </div>
            <Button
              onClick={handleCreateAccount}
              disabled={isLoading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <div className="p-6">
              <h3 className="text-xl font-light tracking-tight mb-4">Existing Accounts</h3>
              {accounts.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">
                  No accounts found. Create your first account above.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-zinc-500 font-medium text-sm">Account Name</th>
                        <th className="text-left py-3 px-4 text-zinc-500 font-medium text-sm">User ID</th>
                        <th className="text-left py-3 px-4 text-zinc-500 font-medium text-sm">Created At</th>
                        <th className="text-left py-3 px-4 text-zinc-500 font-medium text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account) => (
                        <tr key={account.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-medium">{account.account_name}</td>
                          <td className="py-4 px-4">
                            <code className="px-2 py-1 bg-violet-500/20 text-violet-400 rounded text-sm">
                              {account.user_id}
                            </code>
                          </td>
                          <td className="py-4 px-4 text-zinc-500 text-sm">
                            {new Date(account.created_at).toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-3">
                              <a
                                href={`/nexus/${account.user_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
                              >
                                View Page
                              </a>
                              <button
                                onClick={() => handleDeleteAccount(account.id)}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </div>
        )}

        {/* Content Review */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-2">Content Review</h2>
              <p className="text-zinc-500 text-sm">Review and feature the best user content</p>
            </div>

            {message && (
              <Card className={`p-4 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              </Card>
            )}

            {allContent.length === 0 ? (
              <Card className="p-12 bg-white/5 border-white/10 text-center">
                <p className="text-zinc-500">No content has been created yet.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allContent.map((content) => {
                  const isLiked = likedContentIds.has(content.id);
                  return (
                    <Card 
                      key={content.id} 
                      className={`p-6 border transition-all hover:shadow-xl ${
                        isLiked 
                          ? 'bg-violet-500/10 border-violet-500/30' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${getContentColor(content.content_type)} text-white shadow-lg`}>
                          {getContentIcon(content.content_type)}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleLikeToggle(content.id)}
                          className={`${
                            isLiked
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'
                              : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10'
                          }`}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                          {isLiked ? 'Featured' : 'Feature'}
                        </Button>
                      </div>

                      <div className="mb-2">
                        <span className="text-xs text-violet-400 font-medium">
                          by {getAccountName(content.user_id)}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-medium text-white mb-2">{content.title}</h4>
                      
                      {content.description && (
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{content.description}</p>
                      )}
                      
                      {content.url && (
                        <a 
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium mb-4"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Link
                        </a>
                      )}
                      
                      {content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {content.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-zinc-500">
                          Created {new Date(content.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
