'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Plus, Edit, Trash2, ExternalLink, Github, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
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

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;
  const [account, setAccount] = useState<Account | null>(null);
  const [contents, setContents] = useState<UserContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContent, setEditingContent] = useState<UserContent | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    contentType: 'thought' as 'thought' | 'repo' | 'blog',
    title: '',
    description: '',
    url: '',
    tags: '',
  });

  useEffect(() => {
    fetchAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (account) {
      fetchContents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const fetchAccount = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      
      if (data.accounts) {
        const foundAccount = data.accounts.find(
          (acc: Account) => acc.user_id === username
        );
        
        if (foundAccount) {
          setAccount(foundAccount);
        } else {
          setError('Account not found');
        }
      }
    } catch (err) {
      setError('Failed to load account');
    } finally {
      setLoading(false);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await fetch(`/api/user-content?userId=${username}`);
      const data = await response.json();
      if (data.content) {
        setContents(data.content);
      }
    } catch (err) {
      console.error('Failed to load contents:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      if (editingContent) {
        // Update existing content
        const response = await fetch('/api/user-content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingContent.id,
            title: formData.title,
            description: formData.description,
            url: formData.url || null,
            tags,
          }),
        });

        if (response.ok) {
          fetchContents();
          resetForm();
        }
      } else {
        // Create new content
        const response = await fetch('/api/user-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: username,
            contentType: formData.contentType,
            title: formData.title,
            description: formData.description,
            url: formData.url || null,
            tags,
          }),
        });

        if (response.ok) {
          fetchContents();
          resetForm();
        }
      }
    } catch (err) {
      console.error('Failed to save content:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const response = await fetch(`/api/user-content?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchContents();
      }
    } catch (err) {
      console.error('Failed to delete content:', err);
    }
  };

  const startEdit = (content: UserContent) => {
    setEditingContent(content);
    setFormData({
      contentType: content.content_type,
      title: content.title,
      description: content.description || '',
      url: content.url || '',
      tags: content.tags.join(', '),
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      contentType: 'thought',
      title: '',
      description: '',
      url: '',
      tags: '',
    });
    setEditingContent(null);
    setShowAddModal(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-6">{error || 'Account not found'}</p>
          <Link href="/nexus/admin_nexus">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const thoughtsCount = contents.filter(c => c.content_type === 'thought').length;
  const reposCount = contents.filter(c => c.content_type === 'repo').length;
  const blogsCount = contents.filter(c => c.content_type === 'blog').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        <div className="space-y-8">
          {/* Welcome Section */}
          <Card className="p-8 bg-white/80 border-orange-200/50 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-light tracking-tight text-gray-800">Welcome, {account.account_name}!</h2>
                <p className="text-gray-600 text-sm">Member since {new Date(account.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Share your thoughts, showcase your repositories, and write blogs. The admin might feature your best work on the showcase page!
            </p>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Content
            </Button>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                <div className="text-sm text-orange-800 font-medium">Thoughts</div>
              </div>
              <div className="text-3xl font-light tracking-tight text-orange-900">{thoughtsCount}</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-5 h-5 text-purple-600" />
                <div className="text-sm text-purple-800 font-medium">Repositories</div>
              </div>
              <div className="text-3xl font-light tracking-tight text-purple-900">{reposCount}</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div className="text-sm text-blue-800 font-medium">Blogs</div>
              </div>
              <div className="text-3xl font-light tracking-tight text-blue-900">{blogsCount}</div>
            </Card>
          </div>

          {/* Content List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light tracking-tight text-gray-800">Your Content</h3>
            
            {contents.length === 0 ? (
              <Card className="p-12 bg-white/80 border-orange-200/50 text-center">
                <div className="text-gray-500 mb-4">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>No content yet. Start by adding your first thought, repo, or blog!</p>
                </div>
                <Button 
                  onClick={() => setShowAddModal(true)}
                  variant="outline"
                  className="border-orange-300 hover:bg-orange-100"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Content
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contents.map((content) => (
                  <Card 
                    key={content.id} 
                    className="p-6 bg-white/80 border-orange-200/50 hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${getContentColor(content.content_type)} text-white shadow-lg`}>
                        {getContentIcon(content.content_type)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(content)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(content.id)}
                          className="border-red-300 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-medium text-gray-800 mb-2">{content.title}</h4>
                    {content.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.description}</p>
                    )}
                    
                    {content.url && (
                      <a 
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Link
                      </a>
                    )}
                    
                    {content.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {content.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        {new Date(content.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-light tracking-tight text-gray-800 mb-6">
              {editingContent ? 'Edit Content' : 'Add New Content'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!editingContent && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Content Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['thought', 'repo', 'blog'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, contentType: type })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.contentType === type
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`flex flex-col items-center gap-2 ${
                          formData.contentType === type ? 'text-violet-600' : 'text-gray-600'
                        }`}>
                          {getContentIcon(type)}
                          <span className="text-sm font-medium capitalize">{type}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a title"
                  required
                  className="border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add a description"
                  rows={4}
                  className="border-gray-300"
                />
              </div>

              {(formData.contentType === 'repo' || formData.contentType === 'blog') && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">URL</label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                    type="url"
                    className="border-gray-300"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="javascript, react, tutorial"
                  className="border-gray-300"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
                >
                  {editingContent ? 'Update' : 'Create'}
                </Button>
                <Button 
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
