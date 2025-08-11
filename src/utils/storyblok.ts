import { cookies } from 'next/headers';

export async function getStoryblokConfig() {
  const cookieStore = await cookies();

  // Get environment from cookie, fallback to env var
  const cookieEnvironment = cookieStore.get('storyblok-environment')?.value;
  const environment =
    cookieEnvironment || process.env.ENVIRONMENT || 'development';

  // Get draft mode from cookie, fallback to env var
  const cookieDraftMode = cookieStore.get('storyblok-draft-mode')?.value;
  const draftMode = cookieDraftMode
    ? cookieDraftMode === 'true'
    : process.env.DRAFT_MODE === 'true';

  const isPreview = environment === 'development' || draftMode;

  const token = isPreview
    ? process.env.STORYBLOK_PREVIEW_ACCESS_TOKEN
    : process.env.STORYBLOK_ACCESS_TOKEN;

  const version = draftMode ? 'draft' : 'published';

  return {
    token,
    version,
    isDraftMode: draftMode,
    isPreview,
    environment,
  };
}
