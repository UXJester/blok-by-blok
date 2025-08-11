// Next.js
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

// Components
import EnvironmentToggle from '@/components/EnvironmentToggle';

// Utils
import { getStoryblokConfig } from '@/utils/storyblok';

// Vercel
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Styles
import './globals.css';

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
        {process.env.VERCEL_ENV !== 'production' && (
          <EnvironmentToggle
            currentEnvironment={environment}
            currentDraftMode={isDraftMode}
            apiUrl={process.env.STORYBLOK_API_URL || ''}
            version={version}
            token={token || ''}
          />
        )}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
