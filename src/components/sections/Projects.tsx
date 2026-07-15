"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, X, ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/data/projects";

// Custom 3D Tilt Card with Mouse Glow
function ProjectCard({ project, onOpenDetails }: { project: Project; onOpenDetails: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 25, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Tilt calculations
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Glow calculations
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      layout // Smooth layout transitions on filtering
      className="relative rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md overflow-hidden group shadow-lg transition-colors hover:border-white/10 h-full flex flex-col cursor-pointer"
      onClick={onOpenDetails}
    >
      {/* Radial Hover Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(260px at ${coords.x}px ${coords.y}px, rgba(96, 165, 250, 0.08), rgba(168, 85, 247, 0.05), transparent 80%)`
        }}
      />

      {/* Stylized Cover image */}
      <div className="relative h-44 w-full overflow-hidden shrink-0 border-b border-white/5">
        <div className={`absolute inset-0 bg-gradient-to-br flex items-center justify-center p-6 ${
          project.category === "Full Stack" 
            ? "from-blue-600/15 via-indigo-900/5 to-transparent" 
            : project.category === "AI & ML" 
              ? "from-purple-600/15 via-indigo-900/5 to-transparent" 
              : project.category === "Mini Project"
                ? "from-emerald-600/15 via-indigo-900/5 to-transparent"
                : "from-pink-600/15 via-indigo-900/5 to-transparent"
        }`}>
          <div className="relative z-10 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors">
              {project.category}
            </span>
            {project.featured && (
              <span className="block mt-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 text-[8px] font-extrabold uppercase tracking-wider text-blue-400 w-fit mx-auto">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="p-5 flex flex-col justify-between flex-grow relative z-20" style={{ transform: "translateZ(15px)" }}>
        <div>
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded text-[9px] font-semibold bg-white/5 text-gray-400 border border-white/5">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-white/5 text-gray-500">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="flex-grow py-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/40 text-xs font-bold text-white transition-colors"
          >
            View Details
          </button>
          
          <a
            href={project.githubRepo}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 text-gray-400 hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "Featured" | "Full Stack" | "AI & ML" | "UI/UX" | "Mini Project">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Featured") return project.featured;
    return project.category === filter;
  });

  return (
    <section id="projects" className="relative py-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Showcase</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(["All", "Featured", "Full Stack", "AI & ML", "Mini Project", "UI/UX"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all relative ${
                filter === cat ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="active-filter-bg"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat === "AI & ML" ? "AI & Machine Learning" : cat === "Full Stack" ? "Full Stack" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard project={project} onOpenDetails={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Immersive Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-black/90 p-6 sm:p-8 z-10 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                {selectedProject.description}
              </p>

              {/* Highlights/Bullet Points */}
              {selectedProject.details && selectedProject.details.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Key Highlights</h4>
                  <ul className="space-y-2 list-disc list-inside text-xs font-medium text-gray-400 leading-relaxed">
                    {selectedProject.details.map((bullet, i) => (
                      <li key={i} className="hover:text-gray-300 transition-colors">
                        <span className="relative -left-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-300 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 border-t border-white/5 pt-6">
                <a
                  href={selectedProject.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 text-xs font-bold tracking-wide uppercase text-white transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub Repository
                </a>
                
                {selectedProject.category !== "UI/UX" ? (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-xs font-bold tracking-wide uppercase text-white transition-opacity"
                  >
                    Live Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-xs font-bold tracking-wide uppercase text-white transition-opacity"
                  >
                    View Figma <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
