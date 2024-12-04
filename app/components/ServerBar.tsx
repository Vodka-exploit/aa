"use client";

import React, { useState } from "react";
import { Tooltip } from "react-tooltip"; // Tooltip eksternal library

const servers = [
  { id: 1, name: "Home", icon: "bi-house-fill", isActive: true },
  { id: 2, name: "Server 1", icon: "bi-server", notifications: 3 },
  { id: 3, name: "Server 2", icon: "bi-hdd-network" },
  { id: 4, name: "Add Server", icon: "bi-plus-lg" },
  { id: 5, name: "Explore", icon: "bi-compass-fill" },
];

const ServerBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav
      className={`sidebar bg-gray-800 h-full flex flex-col items-center md:items-start py-4 space-y-4 relative transition-all duration-300 ${
        isExpanded ? "w-56" : "w-16"
      }`}
    >
      {/* Close Button (Mobile) */}
      <div className="absolute top-4 right-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white text-lg focus:outline-none"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Home Icon */}
      <div
        className="flex flex-col items-center md:flex-row w-full px-2 group relative"
        onClick={() => console.log("Home Clicked")}
      >
        <div
          className={`relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform ${
            servers[0].isActive ? "ring-4 ring-blue-400" : ""
          }`}
          data-tooltip-id="tooltip"
          data-tooltip-content="Home"
        >
          <i className={`bi ${servers[0].icon} text-white text-2xl`}></i>
        </div>
        {isExpanded && (
          <span className="ml-4 text-gray-300 text-sm truncate">
            {servers[0].name}
          </span>
        )}
      </div>

      {/* Separator */}
      <div className="w-8 border-t-2 border-gray-600 my-2"></div>

      {/* Server Icons */}
      {servers.slice(1).map((server) => (
        <div
          key={server.id}
          className="flex flex-col items-center md:flex-row w-full px-2 group relative"
          onClick={() => console.log(`${server.name} Clicked`)}
        >
          <div
            className={`relative w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform ${
              server.isActive ? "ring-4 ring-blue-400" : ""
            }`}
            data-tooltip-id="tooltip"
            data-tooltip-content={server.name}
          >
            <i className={`bi ${server.icon} text-white text-2xl`}></i>
            {server.notifications && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {server.notifications}
              </span>
            )}
          </div>
          {isExpanded && (
            <span className="ml-4 text-gray-300 text-sm truncate">
              {server.name}
            </span>
          )}
        </div>
      ))}

      {/* Separator */}
      <div className="w-8 border-t-2 border-gray-600 my-2"></div>

      {/* Expand/Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-8 left-4 text-gray-400 hover:text-white transition"
      >
        {isExpanded ? (
          <i className="bi bi-arrow-left-circle text-2xl"></i>
        ) : (
          <i className="bi bi-arrow-right-circle text-2xl"></i>
        )}
      </button>

      {/* Tooltip */}
      <Tooltip id="tooltip" className="bg-gray-700 text-white px-2 py-1 rounded" />
    </nav>
  );
};

export default ServerBar;
