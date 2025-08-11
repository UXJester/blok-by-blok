// Types
import { Story, StoriesResponse } from '@/types/blokTypes';

// Utils
import { getStoryblokConfig } from '@/utils/storyblok';

export default async function Home() {
  const { token, version } = await getStoryblokConfig();

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
      `${process.env.STORYBLOK_API_URL}/stories?version=${version}&token=${token}`
    );

    if (!data.ok) {
      throw new Error(`Failed to fetch stories: ${data.status}`);
    }

    const response: StoriesResponse = await data.json();
    const stories = response.stories || [];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to the Storyblok Demo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: Story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <a href={`/${story.slug}`} className="block p-6 h-full">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                  {story.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(story.created_at).toLocaleDateString()}
                </p>
              </a>
            </div>
          ))}
        </div>
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
