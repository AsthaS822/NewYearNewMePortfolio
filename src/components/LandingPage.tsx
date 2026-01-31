"use client";
import MetallicBubbles from "./MetallicBubbles";

export default function LandingPage({ onChoose }: { onChoose: (c: "tech" | "space") => void }) {
    return (
        <main className="relative w-full h-screen bg-[#060212] overflow-hidden">
            {/* Background Layer (Neon Glows) */}
            <div className="absolute inset-0 opacity-40 blur-[100px]">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#ff66b2] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#a366ff] rounded-full" />
            </div>

            {/* 3D Bubble Layer */}
            <MetallicBubbles />

            {/* UI Layer */}
            <div className="relative z-50 flex flex-col md:flex-row items-center justify-center h-full gap-12 pointer-events-none p-8">

                <div onClick={() => onChoose("tech")} className="frosted-glass-card pointer-events-auto">
                    <span className="system-tag">INITIALIZE</span>
                    <h1 className="main-title">TECH_OS</h1>
                </div>

                <div onClick={() => onChoose("space")} className="frosted-glass-card pointer-events-auto">
                    <span className="system-tag">EXPLORE</span>
                    <h1 className="main-title space-void-text">SPACE_VOID</h1>
                </div>

            </div>
        </main>
    );
}
