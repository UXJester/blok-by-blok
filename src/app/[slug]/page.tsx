import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { Story, SingleStoryResponse } from '@/types/blokTypes';
import { getStoryblokConfig } from '@/utils/storyblok';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getStory(slug: string): Promise<Story | null> {
  const { token, version } = await getStoryblokConfig();

  if (!token) {
    console.error('STORYBLOK_ACCESS_TOKEN is not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.STORYBLOK_API_URL}/stories/${slug}?version=${version}&token=${token}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch story: ${response.status}`);
    }

    const data: SingleStoryResponse = await response.json();
    return data.story;
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: story.content.title || story.name,
    description: story.content.description || `Read ${story.name} on our blog`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

  const { title, content } = story.content;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-8">
        {title && (
          <h1 className="text-4xl font-bold mb-8 text-gray-950">{title}</h1>
        )}

        {content && (
          <Markdown
            className="prose prose-lg max-w-none text-gray-900"
            content={content as string}
          />
        )}
      </article>
    </div>
  );
}
