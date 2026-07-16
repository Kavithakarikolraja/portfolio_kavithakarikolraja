"use client";
import React, { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ResumeModal from "@/components/ui/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      {/* Premium preloader loading screen */}
      <LoadingScreen />
      
      {/* Scroll indicator progress bar */}
      <ScrollProgress />
      
      {/* Custom mouse follower cursor & radial glow lighting */}
      <CustomCursor />
      
      {/* Lightweight canvas floating stars background */}
      <ParticlesBackground />
      
      {/* Main website page container */}
      <div className="relative min-h-screen z-20 overflow-hidden">
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />
        
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Certifications />
          <Contact />
        </main>
        
        <Footer />
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
