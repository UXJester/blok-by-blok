import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  // Delete the Storyblok cookies
  cookieStore.delete('storyblok-environment');
  cookieStore.delete('storyblok-draft-mode');

  return NextResponse.json({ success: true });
}
