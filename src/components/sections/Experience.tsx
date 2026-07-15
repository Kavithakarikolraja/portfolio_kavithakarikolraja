"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  bullets: string[];
  tags: string[];
}

const experiences: TimelineItem[] = [
  {
    role: "Data Science Intern",
    company: "Training Trains",
    duration: "06/2025 – 07/2025",
    location: "Perundurai, Tamil Nadu",
    bullets: [
      "Collected large datasets through robust Python-based web scraping techniques.",
      "Cleaned, transformed, and preprocessed raw datasets to make them suitable for machine learning applications.",
      "Performed exploratory data analysis (EDA) and visualization to discover insights and generate business intelligence.",
      "Collaborated with team members to build automated data processing pipelines and streamline workflows."
    ],
    tags: ["Python", "Web Scraping", "EDA", "Data Cleaning", "Data Visualization", "Automation"]
  }
];

function TimelineCard({ item, index, isVisible }: { item: TimelineItem; index: number; isVisible: boolean }) {
  return (
    <div className="relative pl-8 sm:pl-10 pb-12 last:pb-0">
      {/* Node Bullet point */}
      <div className="absolute left-0 top-1.5 z-10 flex h-6 w-6 -translate-x-[11px] items-center justify-center rounded-full bg-black border border-purple-500 shadow-sm shadow-purple-500/50">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="p-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md glow-card relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">{item.role}</h3>
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {item.company}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-400 font-medium mt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-500/80" />
              {item.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-purple-500/80" />
              {item.location}
            </span>
          </div>
        </div>

        <ul className="space-y-2.5 text-gray-400 text-sm font-medium mb-6 list-disc list-inside">
          {item.bullets.map((bullet, idx) => (
            <li key={idx} className="leading-relaxed hover:text-gray-300 transition-colors">
              <span className="relative -left-1 text-gray-400">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/25 text-purple-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[5%] w-[40%] h-[30%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative border-l border-white/10 ml-3">
          {experiences.map((exp, i) => (
            <TimelineCard key={i} item={exp} index={i} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
