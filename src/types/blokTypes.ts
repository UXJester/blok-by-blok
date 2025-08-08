// Storyblok story content structure
export interface StoryContent {
  title?: string;
  content?: string;
  description?: string;
}

// Individual story from Storyblok
export interface Story {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  content: StoryContent;
}

// API response for single story
export interface SingleStoryResponse {
  story: Story;
}

// API response for stories list
export interface StoriesResponse {
  stories?: Story[];
}

// Markdown component props
export interface MarkdownProps {
  content: string;
  className?: string;
}

// Environment toggle component props
export interface EnvironmentToggleProps {
  currentEnvironment: string;
  currentDraftMode: boolean;
  apiUrl: string;
  version: string;
  token: string;
}
