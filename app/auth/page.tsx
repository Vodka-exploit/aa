"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { UAParser } from "ua-parser-js";

const Login = dynamic(() => import("../components/Login"));
const Signup = dynamic(() => import("../components/Signup"));
const Logout = dynamic(() => import("../components/Logout"));

function AuthParamsHandler({ onParamsChange }: { onParamsChange: (type: string | null) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const encoded = searchParams.get("a");
    if (encoded) {
      try {
        const decoded = atob(encoded);
        const params = new URLSearchParams(decoded);
        onParamsChange(params.get("type"));
      } catch (error) {
        console.error("Invalid Base64 encoding:", error);
        onParamsChange(null);
      }
    } else {
      onParamsChange(null);
    }
  }, [searchParams, onParamsChange]);

  return null;
}

export default function AuthPage() {
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({
    browser: "",
    version: "",
    os: "",
    hostname: "unknown",
    ipv4: "unknown",
    ipv6: "unknown",
    HWID: "unknown",
  });

  useEffect(() => {
    const parser = new UAParser();
    const uaResult = parser.getResult();
    const osVersion = `${uaResult.os.name} ${uaResult.os.version || "unknown"}`;
    const browserVersion = `${uaResult.browser.name} ${uaResult.browser.version || "unknown"}`;

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setDeviceInfo((prev) => ({
          ...prev,
          ipv4: data.ip,
        }));
      })
      .catch(() => console.error("Failed to fetch IPv4 address."));

    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setDeviceInfo((prev) => ({
          ...prev,
          ipv6: data.ip,
        }));
      })
      .catch(() => console.error("Failed to fetch IPv6 address."));

    setDeviceInfo((prev) => ({
      ...prev,
      browser: browserVersion,
      version: `${browserVersion}-${osVersion}`,
      os: osVersion,
    }));
  }, []);

  const updateUrl = (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    const encoded = btoa(query);
    router.push(`/auth?a=${encoded}`);
  };

  const resetUrl = () => {
    router.push("/auth");
  };

  const handleAction = (actionType: "login" | "signup") => {
    updateUrl({
      type: actionType,
      browser: deviceInfo.browser,
      version: deviceInfo.version,
      HWID: deviceInfo.HWID,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthParamsHandler onParamsChange={setType} />
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-2xl animate-fadeIn">
          {!type && (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-extrabold text-gray-100">
                Welcome to Modern Auth
              </h1>
              <p className="text-gray-400">Join us or log in to continue!</p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleAction("login")}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAction("signup")}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition duration-300 transform hover:scale-105"
                >
                  Signup
                </button>
              </div>
            </div>
          )}
          {type === "login" && (
            <div className="animate-slideInLeft">
              <Login />
              <button
                onClick={resetUrl}
                className="mt-4 text-sm text-gray-400 hover:underline"
              >
                Back to Home
              </button>
            </div>
          )}
          {type === "signup" && (
            <div className="animate-slideInLeft">
              <Signup />
              <button
                onClick={resetUrl}
                className="mt-4 text-sm text-gray-400 hover:underline"
              >
                Back to Home
              </button>
            </div>
          )}
          {type === "logout" && (
            <div className="animate-slideInLeft">
              <Logout />
              <button
                onClick={resetUrl}
                className="mt-4 text-sm text-gray-400 hover:underline"
              >
                Back to Home
              </button>
            </div>
          )}
          {type && !["login", "signup", "logout"].includes(type) && (
            <p className="text-red-500 animate-shake">Invalid action</p>
          )}
        </div>
      </div>
    </Suspense>
  );
}
