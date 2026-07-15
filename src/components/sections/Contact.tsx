"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Code, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);

    // Fire premium custom confetti
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#a855f7", "#06b6d4"]
    });

    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Background neon light glow */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[45%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Let&apos;s build something amazing!</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-sm">
                Whether you want to discuss a new machine learning project, collaborate on full-stack web applications, or just say hello, my inbox is always open.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Email Me</h4>
                    <a href="mailto:kavithakarikolraja4825@gmail.com" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                      kavithakarikolraja4825@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Location</h4>
                    <span className="text-sm font-semibold text-white">Tamil Nadu, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-12">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Follow My Profiles</h4>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Github className="h-4.5 w-4.5" />, href: "https://github.com/Kavithakarikolraja", name: "GitHub" },
                  { icon: <Linkedin className="h-4.5 w-4.5" />, href: "https://linkedin.com/in/kavitha-k-", name: "LinkedIn" },
                  { icon: <Code className="h-4.5 w-4.5" />, href: "https://leetcode.com/u/kavitha_karikolraja", name: "LeetCode" }
                ].map((social) => (
                  <Magnetic key={social.name} range={20}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all shadow"
                    >
                      {social.icon}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-md space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="Collaboration Project"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="Tell me about your project idea..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending message...
                  </>
                ) : submitted ? (
                  "Message Sent successfully! ✓"
                ) : (
                  <>
                    Send Message <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
