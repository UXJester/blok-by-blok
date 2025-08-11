import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import EnvironmentToggle from '@/components/EnvironmentToggle';
import { getStoryblokConfig } from '@/utils/storyblok';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blok by Blok',
  description: 'A Next.js app using Storyblok Content Delivery API',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { environment, isDraftMode, token, version } =
    await getStoryblokConfig();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {environment !== 'production' && (
          <EnvironmentToggle
            currentEnvironment={environment}
            currentDraftMode={isDraftMode}
            apiUrl={process.env.STORYBLOK_API_URL || ''}
            version={version}
            token={token || ''}
          />
        )}
        {children}
      </body>
    </html>
  );
}
