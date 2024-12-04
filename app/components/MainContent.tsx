'use client';

import { useState, useEffect } from 'react';

export default function MainContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main
      className={`flex-1 p-8 overflow-y-auto ${
        isMobile && isSidebarVisible ? 'hidden' : ''
      }`}
    >
      <h1 className="text-4xl font-bold text-blue-400">Welcome to the Server</h1>
      <p className="mt-4 text-gray-300">
        This is a fully fixed and responsive server bar with proper animations
        and interactivity.
      </p>
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="mt-4 bg-gray-700 p-2 rounded text-white"
      >
        Toggle Dark/Light Mode
      </button>
    </main>
  );
}
