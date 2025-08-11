import { cookies } from 'next/headers';

export async function getStoryblokConfig() {
  const cookieStore = await cookies();

  // Get environment from cookie, fallback to env var, then Vercel environment
  const cookieEnvironment = cookieStore.get('storyblok-environment')?.value;
  let environment =
    cookieEnvironment || process.env.ENVIRONMENT || 'development';

  // Override environment based on Vercel deployment context
  if (process.env.VERCEL_ENV === 'production') {
    environment = 'production';
  } else if (process.env.VERCEL_ENV === 'preview') {
    environment = 'preview';
  }

  // Get draft mode from cookie, fallback to env var and environment defaults
  const cookieDraftMode = cookieStore.get('storyblok-draft-mode')?.value;
  let draftMode: boolean;

  if (cookieDraftMode !== undefined) {
    draftMode = cookieDraftMode === 'true';
  } else if (environment === 'preview') {
    draftMode = false; // Preview environment defaults to draft mode OFF
  } else {
    draftMode = process.env.DRAFT_MODE === 'true';
  }

  // Determine token based on environment and draft mode
  let token: string | undefined;
  if (environment === 'production') {
    // Production environment always uses production token
    token = process.env.STORYBLOK_ACCESS_TOKEN;
  } else {
    // Preview environment and development with draft mode use preview token
    token = process.env.STORYBLOK_PREVIEW_ACCESS_TOKEN;
  }

  const version = draftMode ? 'draft' : 'published';
  const isPreview =
    environment === 'development' || environment === 'preview' || draftMode;

  return {
    token,
    version,
    isDraftMode: draftMode,
    isPreview,
    environment,
  };
}
