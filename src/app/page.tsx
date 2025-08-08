import { Story, StoriesResponse } from '@/types/blokTypes';
import { getStoryblokConfig } from '@/utils/storyblok';

export default async function Home() {
  const { token, version, isDraftMode, isPreview } = getStoryblokConfig();

  if (!token) {
    console.error('STORYBLOK_ACCESS_TOKEN is not configured');
    return (
      <div>
        <h1>Welcome to the Storyblok Demo</h1>
        <p className="text-red-500">Error: Storyblok token not configured</p>
      </div>
    );
  }

  try {
    const data = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?version=${version}&token=${token}`
    );

    if (!data.ok) {
      throw new Error(`Failed to fetch stories: ${data.status}`);
    }

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
                <p>
                  Created: {new Date(story.created_at).toLocaleDateString()}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error fetching stories:', error);
    return (
      <div>
        <h1>Welcome to the Storyblok Demo</h1>
        <p className="text-red-500">
          Error loading stories. Please try again later.
        </p>
      </div>
    );
  }
}
