"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Eye, Terminal, Wrench, Code2 } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Terminal className="h-5 w-5" />,
    skills: ["Python", "Java", "JavaScript", "SQL"],
    color: "from-blue-500/20 to-cyan-500/20 text-cyan-400"
  },
  {
    title: "Data Structures",
    icon: <Code2 className="h-5 w-5" />,
    skills: ["Linear Data Structures", "Non-Linear Data Structures"],
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400"
  },
  {
    title: "Frontend Development",
    icon: <Eye className="h-5 w-5" />,
    skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive Design"],
    color: "from-cyan-500/20 to-teal-500/20 text-teal-400"
  },
  {
    title: "Backend Development",
    icon: <Database className="h-5 w-5" />,
    skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs", "Socket.IO"],
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-400"
  },
  {
    title: "Machine Learning & AI",
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "Scikit-learn",
      "NLTK & NLP",
      "Data Preprocessing",
      "Feature Engineering",
      "Data Analysis"
    ],
    color: "from-purple-500/20 to-pink-500/20 text-purple-400"
  },
  {
    title: "Tools & Frameworks",
    icon: <Wrench className="h-5 w-5" />,
    skills: ["Git & GitHub", "VS Code", "Tableau", "Figma", "Auto Layout", "Prototyping"],
    color: "from-pink-500/20 to-red-500/20 text-pink-400"
  }
];

function SkillCard({ category, index, isVisible }: { category: SkillCategory; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(220px at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.08), rgba(168, 85, 247, 0.06), transparent 80%)`,
        }}
      />
      
      {/* Decorative top gradient border highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.color.split(" ")[0]} ${category.color.split(" ")[1]} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${category.color.split(" ")[0]} ${category.color.split(" ")[1]} ${category.color.split(" ")[2]}`}>
          {category.icon}
        </div>
        <h3 className="text-base font-bold text-white tracking-wide">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/[0.03] border border-white/[0.04] text-gray-300 hover:text-white hover:border-white/15 transition-all hover:bg-white/[0.05]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background radial highlight */}
      <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[60%] h-[30%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
