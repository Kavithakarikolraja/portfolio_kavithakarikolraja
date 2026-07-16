"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotX = useTransform(cursorX, (x) => x + 12);
  const dotY = useTransform(cursorY, (y) => y + 12);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-10 hidden lg:block"
        style={{
          background: `radial-gradient(800px at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 80%)`,
        }}
      />
      {/* Ring Follower */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border border-blue-500/40 bg-blue-500/5 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Center Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-purple-500 mix-blend-screen hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
