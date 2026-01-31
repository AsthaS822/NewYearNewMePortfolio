"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const skills = {
    ios: [
        { title: "React", icon: "⚛️", level: "Advanced", projects: ["Ai- Resume Analyser"] },
        { title: "Next.js", icon: "▲", level: "Advanced", projects: ["GitGrade"] },
        { title: "TypeScript", icon: "TS", level: "Intermediate", projects: ["GitGrade"] },
        { title: "Tailwind", icon: "🎨", level: "Expert", projects: ["Ai- Resume Analyser"] },
        { title: "Node.js", icon: "🟢", level: "Intermediate", projects: ["GitGrade"] },
        { title: "SQL", icon: "🗄️", level: "Intermediate", projects: ["GitGrade"] }
    ],
    android: [
        { title: "Python", icon: "🐍", level: "Intermediate", projects: ["EDA Project", "Employee Management System"] },
        { title: "Java", icon: "☕", level: "Basic", projects: ["Snake Game"] },
        { title: "Git", icon: "📦", level: "Advanced", projects: ["GitGrade", "Ai- Resume Analyser", "Finance App", "Daily News App"] },
        { title: "API", icon: "🔌", level: "Advanced", projects: ["OpenRouter API", "Gemini API", "Groq API"] },
        { title: "Three.js", icon: "🧊", level: "Basic", projects: ["Portfolio"] },
        { title: "Prompt Eng", icon: "🤖", level: "Expert", projects: ["MLH Projects"] }
    ]
};

const phoneFrames = {
    ios: {
        body: "rounded-[3.8rem] border-[3px] border-white bg-gradient-to-br from-white via-cyan-50 to-white shadow-[0_80px_160px_rgba(0,0,0,0.22)]",
        screen: "inset-[12px] rounded-[3.2rem]"
    },
    android: {
        body: "rounded-[1.8rem] border-[6px] border-neutral-900 bg-neutral-950 shadow-[0_60px_120px_rgba(0,0,0,0.35)]",
        screen: "inset-[16px] rounded-[1.2rem]"
    }
};

export default function Skills() {
    const [os, setOs] = useState<"ios" | "android">("ios");
    const [activeSkill, setActiveSkill] = useState<null | {
        title: string;
        icon: string;
        level: string;
        projects: string[];
    }>(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);
        return () => window.removeEventListener('resize', setVH);
    }, []);

    const currentSkills = os === "ios" ? skills.ios : skills.android;

    const ghostPhone = (os: "ios" | "android") => cn(
        "absolute w-[320px] h-[520px] transition-all duration-700 flex items-center justify-center overflow-hidden scale-[0.85]"
    );

    return (
        <section className="relative w-screen h-[calc(var(--vh,1vh)*100)] min-h-[600px] bg-[#F8F9FA] overflow-x-hidden z-30 flex items-center justify-center">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex items-center justify-center w-full h-full relative z-10 contain-layout">

                {/* Right Side: THE ELEGANT PHONE STACK */}
                <div className="relative flex items-center justify-center h-full w-full overflow-visible">
                    <div className="relative flex items-center justify-center">

                        {/* LEFT CONTROL PHONE (Tech Stack & Toggles) */}
                        <div className={cn(ghostPhone(os), "left-1/2 translate-x-[calc(-50%_-_375px)] translate-y-4 z-20 hidden lg:flex flex-col items-center justify-center p-6 text-center shadow-2xl")}>
                            {/* Phone Frame Background (Ghosted) */}
                            <div className={cn("absolute inset-0 z-0 opacity-40 transition-all duration-700", phoneFrames[os].body)} />
                            {/* Neon Border (iOS Only) */}
                            {os === "ios" && <div className="absolute inset-0 rounded-[3.8rem] border border-cyan-300/30 shadow-[0_0_12px_rgba(34,211,238,0.2)] z-0" />}

                            {/* Interactive Overlay (Full Opacity) */}
                            <div className="relative z-10 flex flex-col items-center h-full justify-center w-full">
                                <div className="mb-6">
                                    <h2 className={cn("font-orbitron text-4xl font-black leading-tight mb-2 transition-colors duration-500", os === "android" ? "text-white" : "text-black")}>
                                        TECH<br /><span className={cn("transition-colors duration-500", os === "android" ? "text-neutral-300" : "text-neutral-700")}>STACK</span>
                                    </h2>
                                    <p className={cn("text-xs font-inter leading-relaxed max-w-[200px] mx-auto transition-colors duration-500", os === "android" ? "text-neutral-200" : "text-neutral-950")}>
                                        Toggle the OS to explore technical proficiencies. Each tool represents a core pillar.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full max-w-[180px]">
                                    {["ios", "android"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOs(type as any);
                                            }}
                                            className={cn(
                                                "w-full py-3 rounded-xl font-orbitron text-xs tracking-widest border transition-all duration-300 uppercase cursor-pointer relative z-50",
                                                os === type
                                                    ? "bg-black text-white border-black shadow-lg scale-105"
                                                    : "bg-white/80 text-black border-neutral-300 hover:bg-white hover:border-cyan-400"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT GHOST PHONE (Active Skill Details) */}
                        <div className={cn(ghostPhone(os), "left-1/2 translate-x-[calc(375px_-_50%)] translate-y-4 z-10 hidden lg:flex")}>
                            {/* Phone Frame Background (Ghosted) */}
                            <div className={cn("absolute inset-0 z-0 opacity-40 transition-all duration-700", phoneFrames[os].body)} />
                            {/* Neon Border (iOS Only) */}
                            {os === "ios" && <div className="absolute inset-0 rounded-[3.8rem] border border-cyan-300/30 shadow-[0_0_12px_rgba(34,211,238,0.2)] z-0" />}

                            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                                {activeSkill && (
                                    <div className="text-center px-6 space-y-4">
                                        <div className="text-5xl mb-2 transition-transform hover:scale-110 duration-300">{activeSkill.icon}</div>
                                        <div>
                                            <p className={cn("text-[10px] font-orbitron uppercase tracking-widest mb-1 transition-colors duration-500", os === "android" ? "text-neutral-300" : "text-neutral-700")}>
                                                Used In
                                            </p>
                                            <p className={cn("text-sm font-bold leading-tight transition-colors duration-500", os === "android" ? "text-white" : "text-black")}>
                                                {activeSkill.projects[0]}
                                            </p>
                                            {activeSkill.projects[1] && (
                                                <p className={cn("text-sm font-semibold leading-tight mt-1 transition-colors duration-500", os === "android" ? "text-neutral-200" : "text-neutral-950")}>
                                                    & {activeSkill.projects[1]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MAIN CENTER PHONE */}
                        <div id="phone-body" className={cn(
                            "relative h-[85%] aspect-[9/17] max-h-[780px] min-h-[500px] transition-all duration-700 z-30 transform-gpu translate-y-6",
                            phoneFrames[os].body
                        )}>
                            {/* Inner Neon Rim (iOS Only Style) */}
                            {os === "ios" && <div className="absolute inset-0 rounded-[inherit] ring-1 ring-cyan-300/40 pointer-events-none z-40" />}

                            {/* Android Hardware (Punch-hole) */}
                            {os === "android" && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-50 border border-neutral-800" />
                            )}

                            {/* Screen Content - ELEGANT DARK UI */}
                            <div className={cn(
                                "phone-screen absolute flex flex-col overflow-hidden transition-all duration-700",
                                phoneFrames[os].screen,
                                "bg-[#0a0a0a] text-white" /* Force Dark Elegant Theme */
                            )}>
                                {/* Status Bar Area */}
                                <div className="h-10 w-full flex items-end justify-between px-6 pb-2 text-[10px] text-neutral-400 font-medium z-10 shrink-0">
                                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <div className="flex gap-1.5">
                                        <span>5G</span>
                                        <span>100%</span>
                                    </div>
                                </div>

                                {/* SCROLLABLE CONTENT */}
                                <div id="home-grid" className="flex-1 flex flex-col px-5 pt-2 pb-6 overflow-y-auto no-scrollbar">

                                    {/* Profile Header - Compacted */}
                                    <div className="mb-6 shrink-0">
                                        <h2 className="text-2xl font-bold tracking-tight mb-0.5 text-white">Astha Singh</h2>
                                        <p className="text-[10px] text-neutral-400 font-medium tracking-wide uppercase mb-3">Full-Stack Developer</p>

                                        <div className="text-[10px] leading-relaxed text-neutral-300 space-y-0.5 border-l-2 border-neutral-800 pl-3">
                                            <p>Based in India</p>
                                            <p>专注于 crafting digital experiences.</p>
                                            <p className="text-cyan-400">Open to Work</p>
                                        </div>
                                    </div>

                                    {/* Proficiencies Section */}
                                    <div className="mb-2">
                                        <h3 className="text-sm font-semibold mb-3 text-white">Proficiencies</h3>

                                        <div className="flex flex-col gap-2">
                                            {currentSkills.map((skill, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => {
                                                        setActiveSkill(skill);
                                                        setShowDetail(true);
                                                    }}
                                                    className="group flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 border border-white/5 hover:bg-neutral-800 transition-all cursor-pointer"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-medium text-neutral-200 group-hover:text-white transition-colors">{skill.title}</span>
                                                        <span className="text-[9px] text-neutral-500 uppercase tracking-wider">{skill.level}</span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{skill.icon}</span>
                                                        <span className="text-neutral-600 text-[10px] group-hover:text-cyan-400 transition-colors">→</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Detail Screen Overlay */}
                                {showDetail && activeSkill && (
                                    <div className="absolute inset-0 z-50 flex flex-col bg-[#0a0a0a] text-white animate-in fade-in slide-in-from-bottom-4">
                                        {/* Header */}
                                        <div className="px-6 pt-14 pb-4 flex items-center justify-between border-b border-white/5">
                                            <button
                                                onClick={() => setShowDetail(false)}
                                                className="text-sm text-cyan-400 font-medium"
                                            >
                                                ← Back
                                            </button>
                                            <span className="text-sm font-semibold text-neutral-400 tracking-widest uppercase">Details</span>
                                            <div className="w-8" />
                                        </div>

                                        <div className="flex-1 px-6 py-8 flex flex-col items-center text-center">
                                            <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-4xl mb-6 shadow-2xl">
                                                {activeSkill.icon}
                                            </div>

                                            <h3 className="text-2xl font-bold mb-1">{activeSkill.title}</h3>
                                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                                                {activeSkill.level}
                                            </span>

                                            <div className="w-full text-left space-y-4">
                                                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                                    Applied In
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    {activeSkill.projects.map((p, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-white/5">
                                                            <span className="text-sm font-medium text-neutral-300">{p}</span>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Bottom Bar (Mimic Home Indicator) */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-700 rounded-full opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
