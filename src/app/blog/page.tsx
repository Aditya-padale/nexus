import Layout from '@/components/layout';
import { getBlogPosts } from './actions';
import { BlogList } from './components/BlogList';
import { SectionHero } from '@/components/ui/SectionHero';
import { Suspense } from 'react';

export default async function Page() {
  const posts = await getBlogPosts();

  return (
    <Layout title={'Blog'}>
      <div className="container mx-auto px-4 py-16">
        <SectionHero
          title="Blog & Resources"
          subtitle="Articles, tutorials, and resources from the Nexus community on web development, AI, and more."
        />
        <Suspense
          fallback={<div className="py-12 text-center">Loading posts...</div>}
        >
          <BlogList posts={posts} />
        </Suspense>
      </div>
    </Layout>
  );
}
