import type { NextConfig } from "next";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { config } from "process";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      appwrite: require.resolve("appwrite"),
    };

    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      crypto: false,
    }

    config.plugins.push(new NodePolyfillPlugin());

    return config;
  }
};

export default nextConfig;
