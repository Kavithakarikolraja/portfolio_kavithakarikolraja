"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skillsVerified: string[];
}

const certifications: Certification[] = [
  {
    title: "Full Stack Development",
    issuer: "Novi Tech",
    date: "2024",
    credentialUrl: "#",
    skillsVerified: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "CRUD Operations"]
  },
  {
    title: "Applied Machine Learning",
    issuer: "LinkedIn Learning",
    date: "2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/e135a20d5e24f5a768b6ea80b74971470ed2dac1ac91831be9a753f5b4159918?trk=share_certificate",
    skillsVerified: ["Supervised Learning", "Unsupervised Learning", "Scikit-Learn", "Model Evaluation"]
  },
  {
    title: "UI/UX Design",
    issuer: "Coursera",
    date: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/LJL301WU2GFB",
    skillsVerified: ["User Research", "Wireframing", "Figma", "High-Fidelity Prototyping"]
  }
];

function CertCard({ cert, index, isVisible }: { cert: Certification; index: number; isVisible: boolean }) {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative p-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md overflow-hidden group shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-white/10"
    >
      {/* Radial Hover Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(200px at ${coords.x}px ${coords.y}px, rgba(96, 165, 250, 0.08), rgba(168, 85, 247, 0.05), transparent 80%)`
        }}
      />

      <div className="flex justify-between items-start mb-6 relative z-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
          <Award className="h-6 w-6" />
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide bg-white/5 border border-white/5 px-2.5 py-0.5 rounded">
          Verified
        </span>
      </div>

      <div className="relative z-20">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{cert.issuer}</span>
        <h3 className="text-base font-bold text-white mt-1 mb-4 group-hover:text-blue-400 transition-colors">
          {cert.title}
        </h3>
        
        {/* Skills Verified */}
        <div className="mb-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Skills Verified</div>
          <div className="flex flex-wrap gap-1.5">
            {cert.skillsVerified.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded text-[9px] font-semibold bg-white/5 text-gray-300 border border-white/5 flex items-center gap-1"
              >
                <CheckCircle className="h-2.5 w-2.5 text-purple-500/80" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/5 pt-4">
          <span>Earned: {cert.date}</span>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-white font-bold transition-colors flex items-center gap-0.5"
          >
            View Certificate
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-[20%] left-[10%] w-[35%] h-[30%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
