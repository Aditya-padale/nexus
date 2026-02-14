import { blogPostSchema, type BlogPost } from './types';
import { z } from 'zod';

const MEDIUM_USERNAME = 'nexus-adce';
const TWITTER_USERNAME = 'nexus_adce';

const EXTERNAL_POSTS: BlogPost[] = [
  {
    id: 'nexus-getting-started-webdev',
    title: 'Getting Started with Web Development — A Beginner\'s Guide',
    content:
      'A comprehensive guide for new members of Nexus to kickstart their web development journey. Covers HTML, CSS, JavaScript fundamentals, and setting up your development environment.',
    url: '#',
    publishedAt: '2025-01-15T00:00:00.000Z',
    heroImage: '/images/blog/stablecoin.png',
    author: {
      name: 'Nexus Club',
      handle: 'nexus-adce'
    }
  }
];

async function fetchMediumPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.warn(`Medium RSS fetch returned status ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => {
      // Extract hero image from content
      const heroImageMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
      const heroImage = heroImageMatch ? heroImageMatch[1] : undefined;

      return {
        id: item.guid,
        title: item.title,
        content: item.description.replace(/<[^>]*>/g, ''), // Remove HTML tags
        url: item.link,
        publishedAt: item.pubDate,
        heroImage,
        author: {
          name: item.author,
          handle: MEDIUM_USERNAME
        }
      };
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    // Gracefully handle fetch failures - return empty array to show external posts
    return [];
  }
}

export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
  };
}

// Convert Tweet to BlogPost format
function convertTweetToBlogPost(tweet: Tweet): BlogPost {
  const title =
    tweet.text.length > 60 ? tweet.text.substring(0, 57) + '...' : tweet.text;

  return {
    id: `tweet-${tweet.id}`,
    title: title,
    content: tweet.text,
    url: `https://twitter.com/${tweet.author.username}/status/${tweet.id}`,
    publishedAt: tweet.created_at,
    author: {
      name: tweet.author.name,
      handle: tweet.author.username,
      avatar: tweet.author.profile_image_url
    }
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const mediumPosts = await fetchMediumPosts();

  // Combine Medium posts with external posts and sort by date
  const allPosts = [...mediumPosts, ...EXTERNAL_POSTS];

  return allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
