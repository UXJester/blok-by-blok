import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import { Story, SingleStoryResponse } from '@/types/blokTypes';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getStory(slug: string): Promise<Story | null> {
  const isDraftMode = process.env.DRAFT_MODE === 'true';
  const isPreview = process.env.ENVIRONMENT !== 'production';

  // Production always uses production token and published version
  // Preview environment uses preview token and respects DRAFT_MODE
  const token = isPreview
    ? process.env.STORYBLOCK_PREVIEW_ACCESS_TOKEN
    : process.env.STORYBLOCK_ACCESS_TOKEN;

  const version = isPreview && isDraftMode ? 'draft' : 'published';

  if (!token) {
    console.error('STORYBLOK_ACCESS_TOKEN is not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?version=${version}&token=${token}`,
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

  const isDraftMode = process.env.DRAFT_MODE === 'true';
  const isPreview = process.env.ENVIRONMENT !== 'production';
  const token = isPreview
    ? process.env.STORYBLOCK_PREVIEW_ACCESS_TOKEN
    : process.env.STORYBLOCK_ACCESS_TOKEN;
  const version = isPreview && isDraftMode ? 'draft' : 'published';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-600">
        ENVIRONMENT: {process.env.ENVIRONMENT} | DRAFT_MODE:{' '}
        {process.env.DRAFT_MODE}
      </p>
      <p className="mb-4 text-sm text-gray-600">
        Data URL: https://api.storyblok.com/v2/cdn/stories/{slug}?version=
        {version}&token={token}
      </p>
      <article className="prose prose-lg max-w-none">
        {title && (
          <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
        )}

        {content && (
          <Markdown className="prose-content" content={content as string} />
        )}
      </article>
    </div>
  );
}
