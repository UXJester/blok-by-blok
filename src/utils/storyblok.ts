export function getStoryblokConfig() {
  const isDraftMode = process.env.DRAFT_MODE === 'true';
  const isPreview = process.env.ENVIRONMENT !== 'production';

  // Production always uses production token and published version
  // Preview environment uses preview token and respects DRAFT_MODE
  const token = isPreview
    ? process.env.STORYBLOCK_PREVIEW_ACCESS_TOKEN
    ? process.env.STORYBLOK_PREVIEW_ACCESS_TOKEN
    : process.env.STORYBLOK_ACCESS_TOKEN;

  const version = isPreview && isDraftMode ? 'draft' : 'published';

  return {
    token,
    version,
    isDraftMode,
    isPreview,
  };
}
