'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EnvironmentToggleProps } from '@/types/blokTypes';

export default function EnvironmentToggle({
  currentEnvironment,
  currentDraftMode,
  apiUrl,
  version,
  token,
}: EnvironmentToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if we're in Preview environment (Vercel preview deployment)
  const isPreviewEnvironment = process.env.VERCEL_ENV === 'preview';
  const isProductionEnvironment = process.env.VERCEL_ENV === 'production';

  // Don't render anything in production environment
  if (isProductionEnvironment) {
    return null;
  }

  const toggleEnvironment = async () => {
    setIsLoading(true);
    const newEnv =
      currentEnvironment === 'development' ? 'production' : 'development';

    await fetch('/api/set-environment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ environment: newEnv }),
    });

    // Keep menu open for 2 seconds before reloading
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const toggleDraftMode = async () => {
    setIsLoading(true);

    await fetch('/api/set-draft-mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftMode: !currentDraftMode }),
    });

    // Keep menu open for 2 seconds before reloading
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCollapse = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsAnimating(false);
    }, 200); // Match animation duration
  };

  const clearCookies = async () => {
    setIsLoading(true);

    await fetch('/api/clear-cookies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Keep menu open for 2 seconds before reloading
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isExpanded && !isAnimating ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white px-1 py-1.5 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-50"
        >
          <Image
            src="/three-dots.svg"
            alt="Menu"
            width={20}
            height={20}
            className="text-black"
          />
        </button>
      ) : (
        <div
          className={`bg-white p-4 rounded-lg shadow-lg border origin-top-right ${
            isAnimating ? 'animate-collapse' : 'animate-expand'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-700 font-medium">
              Environment Controls
            </span>
            <button
              onClick={handleCollapse}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {/* Only show environment toggle in development (not in Preview) */}
            {!isPreviewEnvironment && (
              <button
                onClick={toggleEnvironment}
                disabled={isLoading || currentDraftMode}
                className={`px-3 py-1 text-sm text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentEnvironment === 'development'
                    ? 'bg-blue-500 hover:bg-blue-600 disabled:hover:bg-blue-500'
                    : 'bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600'
                }`}
              >
                {isLoading
                  ? 'Switching...'
                  : currentDraftMode
                  ? 'Environment (Disable Draft First)'
                  : `Switch to ${
                      currentEnvironment === 'development'
                        ? 'Production'
                        : 'Development'
                    }`}
              </button>
            )}

            <button
              onClick={toggleDraftMode}
              disabled={
                isLoading ||
                (!isPreviewEnvironment && currentEnvironment === 'production')
              }
              className={`px-3 py-1 text-sm text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                currentDraftMode
                  ? 'bg-red-800 hover:bg-red-900 disabled:hover:bg-red-800'
                  : 'bg-green-500 hover:bg-green-600 disabled:hover:bg-green-500'
              }`}
            >
              {isLoading
                ? 'Toggling...'
                : !isPreviewEnvironment && currentEnvironment === 'production'
                ? 'Draft Mode (Available in Preview Only)'
                : `${currentDraftMode ? 'Disable' : 'Enable'} Draft Mode`}
            </button>

            {/* Only show reset button in development (not in Preview) */}
            {!isPreviewEnvironment && (
              <button
                onClick={clearCookies}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
              >
                {isLoading ? 'Clearing...' : 'Reset to .env'}
              </button>
            )}

            <div className="text-xs text-gray-600 mt-2 flex divide-x">
              <div className="px-2">Env: {currentEnvironment}</div>
              <div className="px-2">
                Draft: {currentDraftMode ? 'ON' : 'OFF'}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2 border-t pt-2">
              <div className="mb-1">API URL:</div>
              <div className="font-mono text-xs break-all">
                {apiUrl}/stories?version={version}&token={token}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
