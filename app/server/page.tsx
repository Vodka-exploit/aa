"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SidebarServer = dynamic(() => import("../components/SidebarServer"), { ssr: false });

// Fungsi untuk mendekode Base64
function decodeBase64(input: string): string {
  try {
    return atob(input);
  } catch (error) {
    console.error("Failed to decode Base64:", error);
    return "";
  }
}

function ServerContent() {
  const searchParams = useSearchParams();
  const encodedParams = searchParams.get("a"); // Ambil parameter "a" dari URL
  let serverName = "Server";
  let serverId = "Unknown";
  let groupId = "Unknown";
  let channelId = "Unknown";

  if (encodedParams) {
    try {
      const decodedParams = decodeBase64(encodedParams); // Decode Base64
      const params = new URLSearchParams(decodedParams); // Parse hasil decode
      serverName = params.get("name") || serverName;
      serverId = params.get("id") || serverId;
      groupId = params.get("groupid") || groupId;
      channelId = params.get("channelid") || channelId;
    } catch (error) {
      console.error("Failed to decode parameters:", error);
    }
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-gray-900">
      <h1 className="text-4xl font-bold text-blue-400">Welcome to {serverName}</h1>
      <p className="mt-4 text-gray-300">Server ID: {serverId}</p>
      <p className="mt-2 text-gray-300">Group ID: {groupId}</p>
      <p className="mt-2 text-gray-300">Channel ID: {channelId}</p>
    </main>
  );
}

export default function ServerPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar for Server */}
      <SidebarServer />

      {/* Server Content */}
      <Suspense fallback={<div>Loading...</div>}>
        <ServerContent />
      </Suspense>
    </div>
  );
}
