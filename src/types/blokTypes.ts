// Base Storyblok component interface
export interface StoryblokComponent {
  _uid: string;
  component: string;
  _editable?: string;
}

// Page component type
export interface PageStory extends StoryblokComponent {
  component: 'page';
  body?: StoryblokComponent[];
}

// Teaser component type
export interface TeaserStory extends StoryblokComponent {
  component: 'teaser';
  headline?: string;
  text?: string;
  image?: {
    filename: string;
    alt?: string;
    title?: string;
  };
  link?: {
    url: string;
    linktype: string;
    cached_url?: string;
  };
}

// Feature component type
export interface FeatureStory extends StoryblokComponent {
  component: 'feature';
  name?: string;
  description?: string;
  icon?: {
    filename: string;
    alt?: string;
    title?: string;
  };
}

// Grid component type
export interface GridStory extends StoryblokComponent {
  component: 'grid';
  columns?: StoryblokComponent[];
  gap?: string;
  layout?: 'auto' | 'fixed' | 'responsive';
}

// Union type for all components
export type AllStoryblokComponents =
  | PageStory
  | TeaserStory
  | FeatureStory
  | GridStory;

// Generic props interface for components
export interface StoryblokComponentProps<T extends StoryblokComponent> {
  blok: T;
}

// Specific prop types for each component
export type PageProps = StoryblokComponentProps<PageStory>;
export type TeaserProps = StoryblokComponentProps<TeaserStory>;
export type FeatureProps = StoryblokComponentProps<FeatureStory>;
export type GridProps = StoryblokComponentProps<GridStory>;

// Common Storyblok asset type
export interface StoryblokAsset {
  filename: string;
  alt?: string;
  title?: string;
  focus?: string;
  name?: string;
  copyright?: string;
}

// Common Storyblok link type
export interface StoryblokLink {
  url: string;
  linktype: 'url' | 'story' | 'asset' | 'email';
  cached_url?: string;
  target?: '_self' | '_blank';
  fieldtype?: string;
}

// Rich text type for Storyblok
export interface StoryblokRichText {
  type: string;
  content?: any[];
}
