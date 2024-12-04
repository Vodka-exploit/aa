"use client";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

interface Group {
  id: number;
  name: string;
  avatar: string;
}

// Daftar grup
const groups: Group[] = [
  { id: 1, name: "Group Alpha", avatar: "https://via.placeholder.com/50" },
  { id: 2, name: "Group Beta", avatar: "https://via.placeholder.com/50" },
  { id: 3, name: "Group Gamma", avatar: "https://via.placeholder.com/50" },
  { id: 4, name: "Group Delta", avatar: "https://via.placeholder.com/50" },
  { id: 5, name: "Group Epsilon", avatar: "https://via.placeholder.com/50" },
  { id: 6, name: "Group Zeta", avatar: "https://via.placeholder.com/50" },
  { id: 7, name: "Group Eta", avatar: "https://via.placeholder.com/50" },
  { id: 8, name: "Group Theta", avatar: "https://via.placeholder.com/50" },
];

// Fungsi untuk meng-encode string ke Base64
function encodeBase64(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64");
}

export default function SidebarServer() {
  const router = useRouter();

  const handleGroupClick = (group: Group) => {
    const serverId = "4"; // ID server contoh
    const serverName = "Server 4"; // Nama server contoh
    const groupId = group.id.toString();
    const channelId = "1"; // ID channel default

    // Gabungkan parameter ke dalam format query string
    const queryParams = `id=${serverId}&name=${serverName}&groupid=${groupId}&channelid=${channelId}`;
    const encodedParams = encodeBase64(queryParams); // Encode ke Base64

    // Navigasi ke URL dengan parameter yang dienkripsi
    router.push(`/server?a=${encodedParams}`);
  };

  return (
    <nav className="sidebar bg-gray-800 h-screen flex flex-col py-4 w-64 relative">
      {/* Tombol Back */}
      <div className="flex items-center w-full px-4 py-2">
        <button
          onClick={() => router.push("/")}
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer shadow-lg transition duration-300"
        >
          <BsArrowLeft className="text-white" />
        </button>
        <span className="text-gray-300 text-lg ml-4 no-underline hover:text-blue-400 transition duration-300">
          Back
        </span>
      </div>

      {/* Daftar Grup */}
      <div className="flex-1 overflow-y-auto custom-scroll px-2">
        <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2 px-2">
          Groups
        </h3>
        <div className="space-y-2">
          {groups
            .sort((a, b) => a.id - b.id) // Urutkan grup berdasarkan ID terkecil
            .map((group) => (
              <div
                key={group.id}
                className="flex items-center w-full px-2 py-3 hover:bg-gray-700 rounded-md cursor-pointer transition duration-300"
                onClick={() => handleGroupClick(group)}
              >
                <img
                  src={group.avatar}
                  alt={group.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-gray-300 text-sm ml-4">{group.name}</span>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
