import { Story, StoriesResponse } from '@/types/blokTypes';
export default async function Home() {
  const isDraftMode = process.env.DRAFT_MODE === 'true';
  const isPreview = process.env.ENVIRONMENT !== 'production';

  // Production always uses production token and published version
  // Preview environment uses preview token and respects DRAFT_MODE
  const token = isPreview
    ? process.env.STORYBLOCK_PREVIEW_ACCESS_TOKEN
    : process.env.STORYBLOCK_ACCESS_TOKEN;

  const version = isPreview && isDraftMode ? 'draft' : 'published';

  const data = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?version=${version}&token=${token}`
  );
  const response: StoriesResponse = await data.json();

  const stories = response.stories || [];

  return (
    <div>
      <h1>Welcome to the Storyblok Demo</h1>
      <p className="text-sm text-gray-600">
        Environment: {isPreview ? 'Preview' : 'Production'} | Mode:{' '}
        {isDraftMode ? 'Draft' : 'Published'}
      </p>
      <p className="mb-4 text-sm text-gray-600">
        Data URL: https://api.storyblok.com/v2/cdn/stories?version=
        {version}&token={token}
      </p>
      <ul>
        {stories.map((story: Story) => (
          <li key={story.id}>
            <a href={`/${story.slug}`}>
              <h2>{story.name}</h2>
              <p>Created: {new Date(story.created_at).toLocaleDateString()}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
