import { notFound } from 'next/navigation';
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
      <article className="rounded-lg shadow-md p-8">
        {title && <h1 className="text-4xl font-bold mb-8">{title}</h1>}

        {content && (
          <Markdown
            className="prose prose-lg max-w-none"
            content={content as string}
          />
        )}
      </article>
    </div>
  );
}
