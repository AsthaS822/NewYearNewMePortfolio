"use client";

import { useState, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import SpaceVoidExperience from "@/components/space-void/SpaceVoidExperience";
import BackButton from "@/components/BackButton";

export default function Home() {
  const [view, setView] = useState<'landing' | 'tech' | 'space'>('landing');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (view === 'landing') {
    return <LandingPage onChoose={(choice) => setView(choice)} />;
  }

  if (view === 'space') {
    return (
      <>
        <BackButton onBack={() => setView('landing')} theme="dark" />
        <SpaceVoidExperience />
      </>
    );
  }

  // view === 'tech'
  return (
    <main className="min-h-screen">
      <BackButton onBack={() => setView('landing')} theme="light" />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Hero />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Chatbot />
        </>
      )}
    </main>
  );
}
