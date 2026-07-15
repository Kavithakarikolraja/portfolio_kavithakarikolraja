"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + Math.floor(Math.random() * 12) + 6;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return nextProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] select-none"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-xl font-bold tracking-widest text-white"
          >
            KAVITHA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">KARIKOLRAJA</span>
          </motion.div>

          {/* Progress Container */}
          <div className="w-40 h-[2px] rounded-full bg-white/10 overflow-hidden relative mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            Loading {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
