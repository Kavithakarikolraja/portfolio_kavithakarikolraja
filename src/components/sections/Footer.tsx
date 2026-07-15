"use client";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-black/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
          &copy; {currentYear} Kavitha Karikolraja. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 font-semibold tracking-wider">
          Made with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
          <span className="text-white hover:text-blue-400 transition-colors">
            Kavitha Karikolraja
          </span>
        </p>
      </div>
    </footer>
  );
}
