"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Download, Briefcase, GraduationCap, Code, 
  Award, FileText, Mail, Phone, MapPin, 
  Linkedin, Github, CheckCircle2, User, Library
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col max-h-[85vh] overflow-hidden backdrop-blur-xl text-white z-10"
          >
            {/* Header / Top Bar */}
            <div className="sticky top-0 bg-slate-950/80 backdrop-blur-md px-6 py-4 border-b border-white/5 flex justify-between items-center z-20">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="font-semibold tracking-wider uppercase text-xs text-gray-400">Curriculum Vitae</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/Kavitha_Karikolraja_Resume.pdf"
                  download="Kavitha_Karikolraja_Resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 CustomScrollbar">
              {/* Name & Contact Info Header */}
              <div className="text-center md:text-left border-b border-white/5 pb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                  Kavitha Karikolraja
                </h1>
                <p className="text-blue-400 font-semibold text-lg mb-4">
                  Artificial Intelligence & Data Science Engineer
                </p>

                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-400">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                    <span>Tirupur, Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                    <a href="mailto:kavithakarikolraja4825@gmail.com" className="hover:text-blue-400 transition-colors">
                      kavithakarikolraja4825@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                    <span>+91 63806 78981</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Linkedin className="h-4 w-4 text-gray-500 shrink-0" />
                    <a href="https://linkedin.com/in/kavitha-k-" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      linkedin.com/in/kavitha-k-
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Github className="h-4 w-4 text-gray-500 shrink-0" />
                    <a href="https://github.com/Kavithakarikolraja" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      github.com/Kavithakarikolraja
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Code className="h-4 w-4 text-gray-500 shrink-0" />
                    <a href="https://leetcode.com/u/kavitha_karikolraja" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      leetcode.com/u/kavitha_karikolraja
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <User className="h-4 w-4 text-blue-400" /> Summary
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                  Artificial Intelligence and Data Science student with a <span className="text-white font-semibold">9.20 CGPA</span>, passionate about building intelligent and scalable software solutions. Experienced in Machine Learning, Data Analysis, NLP, and Full Stack Web Development through academic projects and internships. Proficient in Python, Java, React.js, Node.js, Express.js, SQL, and TensorFlow, with strong analytical, problem-solving, and teamwork skills. Seeking an opportunity to contribute to innovative AI and software development projects.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <GraduationCap className="h-4 w-4 text-blue-400" /> Education
                </h2>
                <div className="space-y-4">
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <h3 className="font-semibold text-sm text-white">
                        Bachelor of Technology in Artificial Intelligence and Data Science
                      </h3>
                      <span className="text-xs text-gray-400 sm:text-right shrink-0 mt-0.5">
                        09/2023 – 09/2027
                      </span>
                    </div>
                    <p className="text-xs text-blue-400">Nandha Engineering College, Erode</p>
                    <p className="text-xs text-gray-400">Expected Graduation: 2027 | CGPA: 9.20 / 10</p>
                  </div>

                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <h3 className="font-semibold text-sm text-white">
                        Higher Secondary Education
                      </h3>
                      <span className="text-xs text-gray-400 sm:text-right shrink-0 mt-0.5">
                        06/2022 – 03/2023
                      </span>
                    </div>
                    <p className="text-xs text-blue-400">Carmel Girls Higher Secondary School</p>
                    <p className="text-xs text-gray-400">Percentage: 86% | Kangeyam</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <Briefcase className="h-4 w-4 text-blue-400" /> Experience
                </h2>
                <div className="relative pl-4 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <h3 className="font-semibold text-sm text-white">
                      Data Science Intern
                    </h3>
                    <span className="text-xs text-gray-400 sm:text-right shrink-0 mt-0.5">
                      06/2025 – 07/2025
                    </span>
                  </div>
                  <p className="text-xs text-blue-400">Training Trains &bull; Perundurai, Tamil Nadu</p>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1.5 mt-2 pl-2 leading-relaxed">
                    <li>Collected datasets through Python-based web scraping techniques.</li>
                    <li>Cleaned, transformed, and preprocessed datasets for machine learning applications.</li>
                    <li>Performed exploratory data analysis and visualization to generate business insights.</li>
                    <li>Collaborated with team members to automate data processing workflows.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <Code className="h-4 w-4 text-blue-400" /> Technical Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400">Programming & Databases</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-white">Languages:</strong> Python, Java, JavaScript, SQL<br/>
                      <strong className="text-white">Databases:</strong> MySQL, MongoDB
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400">Machine Learning & Data Science</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Scikit-learn, TensorFlow, NLTK, NLP, Sentiment Analysis, Data Preprocessing, Feature Engineering, Data Analysis
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400">Full Stack & UI/UX</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-white">Full Stack:</strong> React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS, REST APIs<br/>
                      <strong className="text-white">UI/UX:</strong> Figma, Wireframing, Prototyping, User Research
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400">Tools & Core Concepts</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <strong className="text-white">Tools:</strong> Git, GitHub, Tableau, VS Code<br/>
                      <strong className="text-white">Concepts:</strong> OOP, Data Structures, Algorithms, Problem Solving
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <Library className="h-4 w-4 text-blue-400" /> Projects
                </h2>
                <div className="space-y-5">
                  {/* Campus Hub */}
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-sm text-white">
                      Campus Hub - A Platform for Resource Sharing
                    </h3>
                    <p className="text-xs text-blue-400 italic">React.js, Node.js, Express.js, MongoDB</p>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-1 pl-2 leading-relaxed">
                      <li>Developed a campus collaboration platform for announcements, placement updates, discussion forums, and academic resource sharing.</li>
                      <li>Built responsive frontend interfaces using React.js.</li>
                      <li>Developed REST APIs using Express.js and Node.js.</li>
                      <li>Integrated MongoDB for efficient data storage and retrieval.</li>
                    </ul>
                  </div>

                  {/* MedIntel SelfTrack */}
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-sm text-white">
                      MedIntel SelfTrack: AI-Based Cardiovascular & Chronic Disease Monitoring System
                    </h3>
                    <p className="text-xs text-blue-400 italic">Python, Machine Learning</p>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-1 pl-2 leading-relaxed">
                      <li>Developed a healthcare analytics platform for monitoring chronic diseases using machine learning.</li>
                      <li>Analyzed health metrics to assess disease risk.</li>
                      <li>Integrated an AI chatbot to provide personalized health guidance.</li>
                    </ul>
                  </div>

                  {/* Movie Review Sentiment Analysis */}
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-sm text-white">
                      Movie Review Sentiment Analysis
                    </h3>
                    <p className="text-xs text-blue-400 italic">Python, Scikit-learn, NLTK</p>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-1 pl-2 leading-relaxed">
                      <li>Built an NLP-based sentiment analysis model to classify movie reviews.</li>
                      <li>Applied text preprocessing, TF-IDF vectorization, and machine learning classification algorithms.</li>
                      <li>Evaluated model performance using accuracy and classification metrics.</li>
                    </ul>
                  </div>

                  {/* Stock Price Prediction */}
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-sm text-white">
                      Stock Price Prediction
                    </h3>
                    <p className="text-xs text-blue-400 italic">Python, TensorFlow</p>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-1 pl-2 leading-relaxed">
                      <li>Developed a machine learning model to predict stock price trends using historical financial data.</li>
                      <li>Performed preprocessing, feature engineering, and model evaluation for time-series forecasting.</li>
                    </ul>
                  </div>

                  {/* UI/UX Design Projects */}
                  <div className="relative pl-4 border-l border-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-sm text-white">
                      UI/UX Design Projects
                    </h3>
                    <p className="text-xs text-blue-400 italic">Figma</p>
                    <ul className="list-disc list-inside text-xs text-gray-300 space-y-1 mt-1 pl-2 leading-relaxed">
                      <li>Designed a mobile donut ordering application with user-centered navigation and checkout workflow.</li>
                      <li>Developed a gaming dashboard emphasizing responsive layouts, typography hierarchy, and modern interface design.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Certifications & Workshops */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                  <Award className="h-4 w-4 text-blue-400" /> Certifications & Workshops
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Full stack Development — Novi Tech</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Applied Machine Learning — LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>UI/UX Design — Coursera</span>
                  </div>
                </div>
              </div>

              {/* Leadership Activities & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Leadership */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                    <User className="h-4 w-4 text-blue-400" /> Leadership Activities
                  </h2>
                  <div className="relative pl-4 border-l border-l-white/10 space-y-1">
                    <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm text-white">Department Executive Member</h3>
                      <span className="text-xs text-gray-400">2025 – 2026</span>
                    </div>
                    <p className="text-xs text-gray-400">Department of Artificial Intelligence & Data Science</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-white border-l-2 border-blue-500 pl-3">
                    <Award className="h-4 w-4 text-blue-400" /> Achievements
                  </h2>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1.5 pl-2 leading-relaxed">
                    <li>Active problem solver on LeetCode and HackerRank</li>
                    <li>Developed AI, Machine Learning, and Full Stack projects addressing real-world applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <style jsx global>{`
        /* Hide scrollbar on modal contents */
        .CustomScrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .CustomScrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .CustomScrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .CustomScrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </AnimatePresence>
  );
}
