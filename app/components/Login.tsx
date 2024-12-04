"use client";

import { motion } from "framer-motion";
import { account } from "../../lib/appwrite";
import { useState } from "react";
import dynamic from "next/dynamic";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await account.createSession(email, password);
      alert("Login berhasil!");
      // Redirect ke halaman dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-gray-900 text-white rounded-xl shadow-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.target as any).email.value;
          const password = (e.target as any).password.value;
          handleLogin(email, password);
        }}
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
}
