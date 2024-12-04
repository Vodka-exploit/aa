'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For URL navigation
import { BsHouseFill, BsPlusLg, BsCompassFill } from 'react-icons/bs';

interface LinkItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface Server {
  id: number;
  name: string;
  avatar: string;
  groupId: number;
  channelId: number;
}

const linkItems: LinkItem[] = [
  { id: 'home', name: 'Home', href: '#home', icon: <BsHouseFill /> },
  { id: 'add', name: 'Add Server', href: '#add', icon: <BsPlusLg /> },
  { id: 'explore', name: 'Explore', href: '#explore', icon: <BsCompassFill /> },
];

const servers: Server[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Server ${i + 1}`,
  avatar: 'https://via.placeholder.com/50',
  groupId: Math.floor(Math.random() * 10) + 1, // Random groupId
  channelId: Math.floor(Math.random() * 100) + 1, // Random channelId
}));

// Helper functions for Base64 encoding and decoding
const encodeBase64 = (input: string) =>
  Buffer.from(input).toString('base64');

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isServerView, setIsServerView] = useState(false);
  const [currentServer, setCurrentServer] = useState<Server | null>(null);

  const router = useRouter();

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleServerClick = (server: Server) => {
    setCurrentServer(server);
    setIsServerView(true);

    // Encode full query string
    const queryString = `id=${server.id}&name=${server.name}&groupid=${server.groupId}&channelid=${server.channelId}`;
    const encodedQuery = encodeBase64(queryString);

    // Navigate with encoded query
    router.push(`/server?a=${encodedQuery}`);
  };

  const handleBackClick = () => {
    setIsServerView(false);
    setCurrentServer(null);
    router.push('/');
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`sidebar bg-gray-800 h-full flex flex-col py-4 space-y-4 overflow-hidden relative transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-20'
        } ${isMobile ? (isSidebarVisible ? 'fixed w-screen' : 'hidden') : ''}`}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        {/* Close Button (Mobile) */}
        {isMobile && isSidebarVisible && (
          <div className="absolute top-4 right-4">
            <button onClick={toggleSidebar} className="text-white text-lg">
              ✖
            </button>
          </div>
        )}

        {/* Back Button (Server View) */}
        {isServerView && (
          <div className="flex items-center w-full px-2">
            <button
              onClick={handleBackClick}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer shadow-lg"
            >
              ⬅
            </button>
            {isExpanded && (
              <span className="text-gray-300 text-sm ml-4 no-underline hover:text-blue-400">
                Back
              </span>
            )}
          </div>
        )}

        {/* Main Links */}
        {!isServerView &&
          linkItems.map((item) => (
            <div key={item.id} className="flex items-center w-full px-2">
              <a
                href={item.href}
                className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer shadow-lg"
                aria-label={item.name}
              >
                {item.icon}
              </a>
              {isExpanded && (
                <a
                  href={item.href}
                  className="text-gray-300 text-sm ml-4 no-underline hover:text-blue-400"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}

        {/* Separator */}
        <div className="w-10 border-t-2 border-gray-600 my-2 mx-auto"></div>

        {/* Server List */}
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          {(!isServerView ? servers : [currentServer]).map(
            (server) =>
              server && (
                <div
                  key={server.id}
                  className="flex items-center w-full px-2 mb-4"
                >
                  <button
                    onClick={() => handleServerClick(server)}
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer shadow"
                    aria-label={`Select ${server.name}`}
                  >
                    <img
                      src={server.avatar}
                      alt={server.name}
                      className="w-full h-full rounded-full"
                    />
                  </button>
                  {isExpanded && (
                    <button
                      onClick={() => handleServerClick(server)}
                      className="text-gray-300 text-sm ml-4 no-underline hover:text-blue-400"
                    >
                      {server.name}
                    </button>
                  )}
                </div>
              )
          )}
        </div>
      </nav>

      {/* Floating Action Button (Mobile) */}
      {isMobile && !isSidebarVisible && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
          aria-label="Toggle sidebar"
        >
          <BsPlusLg />
        </button>
      )}
    </>
  );
}
