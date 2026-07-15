"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

// Dynamically import ThreeDCanvas to prevent SSR/hydration issues
const ThreeDCanvas = dynamic(() => import("../ui/ThreeDCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full border border-purple-500/10 bg-purple-500/5 glow-purple md:h-[400px] md:w-[400px]">
      <div className="h-40 w-40 animate-pulse rounded-full border border-blue-500/20 bg-blue-500/5" />
    </div>
  )
});

const taglines = [
  "Building Intelligent AI Systems.",
  "Scalable Web Applications.",
  "Beautiful User Experiences."
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === taglines[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setText(taglines[index].substring(0, subIndex));
    }, reverse ? 25 : 55);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 font-semibold min-h-[1.5em] inline-block">
      {text}
      <span className="text-white animate-pulse ml-0.5 font-light">|</span>
    </span>
  );
}

export default function Hero() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-hidden">
      {/* Background Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] animate-float-slow" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] animate-float-slower" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-semibold tracking-wider text-blue-400 uppercase w-fit mb-6 shadow-sm shadow-blue-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            Open to opportunities
          </div>
          
          <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Hi, I&apos;m
          </h2>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Kavitha Karikolraja
          </h1>
          
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-300 mb-6">
            Artificial Intelligence & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Data Science Engineer
            </span>
          </h3>

          <div className="text-base sm:text-lg text-gray-400 max-w-lg mb-8 leading-relaxed font-medium">
            <Typewriter />
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Magnetic range={20}>
              <button
                onClick={() => handleScroll("projects")}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm tracking-wider uppercase transition-transform hover:scale-[1.02] shadow-lg shadow-purple-500/20"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>

            <Magnetic range={20}>
              <button
                onClick={() => handleScroll("contact")}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase transition-colors hover:border-purple-500/40"
              >
                Contact Me
              </button>
            </Magnetic>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="h-5 w-5" />, href: "https://github.com/Kavithakarikolraja", name: "GitHub" },
              { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/kavitha-k-", name: "LinkedIn" },
              { icon: <Code className="h-5 w-5" />, href: "https://leetcode.com/u/kavitha_karikolraja", name: "LeetCode" },
              { icon: <Mail className="h-5 w-5" />, href: "mailto:kavithakarikolraja4825@gmail.com", name: "Email" }
            ].map((social) => (
              <Magnetic key={social.name} range={25}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-colors shadow-md"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center relative z-10"
        >
          <ThreeDCanvas />
        </motion.div>
      </div>

      {/* Tailwind inline animation injections */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(0.95); }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
