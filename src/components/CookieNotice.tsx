'use client';
import { useState, useEffect } from 'react';

export default function CookieNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('cookie-notice-acknowledged');
    if (!hasAcknowledged) {
      setShowNotice(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-notice-acknowledged', 'true');
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-md mx-auto">
      <p className="text-sm mb-3">
        This site uses functional cookies to remember your environment and draft
        mode preferences.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors"
      >
        Accept
      </button>
    </div>
  );
}
