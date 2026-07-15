"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, GraduationCap, Layers, Trophy } from "lucide-react";

interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const achievements: Achievement[] = [
  {
    title: "9.20 Cumulative GPA",
    subtitle: "Academic Excellence",
    description: "Maintained a top-tier GPA of 9.20/10 in B.Tech Artificial Intelligence & Data Science at Nandha Engineering College, ranking among the top students in the department.",
    icon: <GraduationCap className="h-6 w-6 text-blue-400" />,
    badge: "B.Tech AI & DS"
  },
  {
    title: "500+ LeetCode Solved",
    subtitle: "Algorithmic Problem Solver",
    description: "Active coder on LeetCode and HackerRank, focusing on advanced Data Structures, Algorithms, Dynamic Programming, and mathematical programming challenges.",
    icon: <Code2 className="h-6 w-6 text-purple-400" />,
    badge: "Problem Solving"
  },
  {
    title: "Real-world AI Projects",
    subtitle: "Applied Machine Learning",
    description: "Developed end-to-end intelligent systems like MedIntel SelfTrack and sentiment models, integrating deep learning algorithms with responsive user interfaces.",
    icon: <Cpu className="h-6 w-6 text-cyan-400" />,
    badge: "Machine Learning"
  },
  {
    title: "Full Stack Platforms",
    subtitle: "Software Engineering",
    description: "Built collaborative MERN stack platforms like Campus Hub, handling secure authentication, real-time messaging sockets, and database querying structures.",
    icon: <Layers className="h-6 w-6 text-teal-400" />,
    badge: "MERN Stack"
  },
  {
    title: "Hackathon Participant",
    subtitle: "Collaborative Innovation",
    description: "Active participant in college-level hackathons and technical project exhibitions, collaborating in teams to draft solutions within constraints.",
    icon: <Trophy className="h-6 w-6 text-pink-400" />,
    badge: "Innovation"
  }
];

function AchievementCard({ achievement, index, isVisible }: { achievement: Achievement; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative p-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md overflow-hidden group shadow-lg transition-colors hover:border-white/10"
    >
      {/* Radial Hover Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(200px at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.08), rgba(168, 85, 247, 0.05), transparent 80%)`
        }}
      />

      <div className="flex justify-between items-start mb-6 relative z-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.05] transition-colors">
          {achievement.icon}
        </div>
        <span className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-gray-400 group-hover:text-white transition-colors">
          {achievement.badge}
        </span>
      </div>

      <div className="relative z-20">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{achievement.subtitle}</h4>
        <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{achievement.title}</h3>
        <p className="text-gray-400 text-xs font-medium leading-relaxed">{achievement.description}</p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background neon light glow */}
      <div className="absolute top-[40%] right-[10%] w-[35%] h-[30%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, i) => (
            <AchievementCard key={ach.title} achievement={ach} index={i} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
