"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Achievements", id: "achievements" },
  { name: "Certifications", id: "certifications" },
  { name: "Contact", id: "contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy logic
      const sections = navItems.map((item) => document.getElementById(item.id));
      let currentSection = "home";

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section occupies middle portion of viewport
          if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "py-4 bg-background/40 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Kavitha <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Karikolraja</span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all relative ${
                activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              {item.name}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Magnetic range={30} strength={0.3}>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 text-xs font-bold tracking-wider uppercase bg-white/5 hover:bg-white/10 text-white transition-all hover:border-purple-500/40"
            >
              Let&apos;s Connect <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </Magnetic>
        </div>

        {/* Mobile menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-6 right-6 mt-3 rounded-2xl border border-white/5 bg-black/90 backdrop-blur-xl p-6 flex flex-col gap-3 z-50 shadow-2xl shadow-purple-500/5"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`py-2.5 text-left text-sm font-semibold border-b border-white/5 transition-colors ${
                  activeSection === item.id
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center gap-1 py-3 mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-center text-xs tracking-wider uppercase shadow-lg shadow-purple-500/10"
            >
              Let&apos;s Connect <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
