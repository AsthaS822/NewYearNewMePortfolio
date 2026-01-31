"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
const gitgradeimg = "/assets/gitgradeimg.png";
const airesumeanalyserimg = "/assets/airesumeanlyserimg.png";

const projects = [
  {
    id: 1,
    name: "GitGrade",
    tagline: "AI-Powered GitHub Repository Analyzer",
    img: gitgradeimg,
    tech: ["Next.js", "GitHub API", "OpenRouter API", "LLMs", "Neon"],
    link: "https://gitgrade-project-h2kc.vercel.app/",
    aspects: [
      { label: "Problem", value: "Developers struggle to evaluate real repository quality beyond stars." },
      { label: "Solution", value: "AI-driven analysis of code quality, documentation, and Git practices." },
      { label: "System", value: "Automated GitHub data extraction + Signal-to-metric scoring system." },
      { label: "Outcome", value: "Structured, explainable repository intelligence." }
    ]
  },
  {
    id: 2,
    name: "AI Resume Analyzer",
    tagline: "ATS-Aware Intelligent Feedback System",
    img: airesumeanalyserimg,
    tech: ["React", "JavaScript", "Puter.js", "Tailwind CSS"],
    link: "https://ai-resume-analyser-qnli4s0qn-astha-s-projects-35d28306.vercel.app/",
    aspects: [
      { label: "Problem", value: "Job seekers lack clear, ATS-aware resume feedback." },
      { label: "Solution", value: "Instant AI-based resume analysis with ATS scoring." },
      { label: "System", value: "Client-side PDF handling using Puter.js + Job description matching." },
      { label: "Outcome", value: "Faster, clearer resume optimization." }
    ]
  }
];

export default function Scene04_FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fade in the background video as we enter the section
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] w-full bg-black overflow-visible -mt-[10vh]">

      {/* 1. FIXED BACKGROUND LAYER - Constrained to this section via opacity */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black"
      >
        <iframe
          src="https://customer-cbeadsgr09pnsezs.cloudflarestream.com/964cb3eddff1a67e3772aac9a7aceea2/iframe?autoplay=true&loop=true&muted=true&controls=false"
          className="w-full h-full border-none object-cover scale-110"
          allow="autoplay; fullscreen"
          loading="lazy"
        />

        {/* GLOBAL PURPLE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.15),transparent_70%)] z-10" />
      </motion.div>

      <div className="relative z-10">
        {/* PROJECTS HEADING */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2 className="text-white font-orbitron text-5xl md:text-[10vw] font-black tracking-[0.2em] uppercase leading-none opacity-20 select-none">
              PROJECTS
            </h2>
          </motion.div>
        </div>

        {/* PROJECTS CONTENT */}
        <div className="max-w-7xl mx-auto px-6 relative -mt-[50vh]">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // ARC MOTION LOGIC
  // Visual comes from bottom-left in an upward arc
  const visualX = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, 0, 0]);
  const visualY = useTransform(scrollYProgress, [0, 0.4, 0.6], [100, 0, 0]);
  const visualRotate = useTransform(scrollYProgress, [0, 0.4], [-5, 0]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Text comes from top-right in a downward arc
  const textX = useTransform(scrollYProgress, [0, 0.4, 0.6], [200, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4, 0.6], [-100, 0, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mb-32 lg:mb-64">

      {/* LEFT: PROJECT VISUAL (Bottom-Left Arc) */}
      <motion.div
        style={{ x: visualX, y: visualY, rotate: visualRotate, opacity: visualOpacity }}
        className="w-full lg:w-1/2 relative group"
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(123,63,242,0.2)] bg-zinc-900">
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* TECH TAGS */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.tech.map((t: string) => (
            <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-orbitron text-primary tracking-widest uppercase">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* RIGHT: CASE STUDY TEXT (Top-Right Arc) */}
      <motion.div
        style={{ x: textX, y: textY, opacity: textOpacity }}
        className="w-full lg:w-1/2 space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-4xl md:text-6xl font-orbitron font-black text-white tracking-tighter uppercase italic">
            {project.name}
          </h3>
          <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase opacity-80">
            {project.tagline}
          </p>
        </div>

        <div className="grid gap-6">
          {project.aspects.map((aspect: any) => (
            <div key={aspect.label} className="space-y-1 relative">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#7B3FF2]" />
                <span className="text-[10px] font-orbitron text-white/40 uppercase tracking-[0.2em]">{aspect.label}</span>
              </div>
              <p className="text-gray-300 font-sans text-sm md:text-md leading-relaxed pl-4 border-l border-white/5">
                {aspect.value}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="px-8 py-3 bg-white/5 border border-white/20 text-white text-[10px] font-orbitron tracking-[.4em] hover:bg-primary hover:border-primary transition-all uppercase rounded-full group flex items-center gap-4">
              INITIATE_DEEP_DIVE
              <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
            </button>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
