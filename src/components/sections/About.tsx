"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, User, Briefcase } from "lucide-react";
import Image from "next/image";

interface CounterProps {
  value: number;
  suffix?: string;
  isDecimal?: boolean;
}

function Counter({ value, suffix = "", isDecimal = false }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    if (isDecimal) {
      let start = 0;
      const end = Math.floor(value * 100);
      const step = Math.max(1, Math.floor(end / 40));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start / 100);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      let start = 0;
      const end = value;
      const step = Math.max(1, Math.floor(end / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref} className="font-extrabold text-3xl sm:text-4xl text-white">
      {isDecimal ? count.toFixed(2) : count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="group relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-2xl p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-xl overflow-hidden glow-card">
              <div className="absolute inset-0 bg-black/80 rounded-[14px] z-10 transition-opacity group-hover:opacity-40" />
              <div className="relative w-full h-full rounded-[14px] overflow-hidden z-20">
                <Image
                  src="/profile_avatar.png"
                  alt="Kavitha Karikolraja"
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-30 opacity-60" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" />
              Artificial Intelligence & Data Science Student
            </h3>
            
            <p className="text-gray-400 font-medium leading-relaxed mb-6">
              I am an AI & Data Science engineering student at Nandha Engineering College, passionate about building intelligent systems and full-stack solutions. With a strong academic foundation (9.20 CGPA) and hands-on internship experience in machine learning workflows, data preprocessing, and automated scrapers, I strive to design beautiful, user-centered apps combined with robust algorithmic backends.
            </p>

            {/* Quick Education Timeline */}
            <div className="mb-8 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Bachelor of Technology (B.Tech)</h4>
                  <p className="text-xs text-gray-400 font-medium">Artificial Intelligence & Data Science | Nandha Engineering College (2023 - 2027)</p>
                  <p className="text-xs text-blue-400 font-semibold mt-1">Expected Graduation: 2027 | CGPA: 9.20/10</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Data Science Intern</h4>
                  <p className="text-xs text-gray-400 font-medium">Training Trains (06/2025 - 07/2025)</p>
                  <p className="text-xs text-purple-400 font-semibold mt-1">Python Web Scraping, EDA, Data Cleaning & Automation</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "CGPA", component: <Counter value={9.2} isDecimal suffix="/10" /> },
                { title: "LeetCode solved", component: <Counter value={500} suffix="+" /> },
                { title: "Projects built", component: <Counter value={10} suffix="+" /> },
                { title: "Internships completed", component: <Counter value={1} /> },
                { title: "Certifications earned", component: <Counter value={3} /> },
                { title: "HackerRank stars", component: <Counter value={5} suffix="★" /> }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-center text-center shadow-md relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {stat.component}
                  <span className="text-xs text-gray-400 font-bold uppercase mt-2 tracking-wide">
                    {stat.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
