"use client";

import { motion } from "framer-motion";

export default function Logout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
    >
      <div className="max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-extrabold mb-6">Logged Out</h2>
        <p className="text-gray-400 mb-6">
          You have successfully logged out. See you again soon!
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Return to Home
        </a>
      </div>
    </motion.div>
  );
}
