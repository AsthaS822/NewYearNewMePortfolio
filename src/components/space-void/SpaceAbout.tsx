"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CinematicAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Entrance animations
    const contentOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative h-[120vh] w-full bg-black overflow-hidden flex items-center justify-center"
        >
            {/* 1. FULL BACKGROUND MOON VIDEO */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/assets/moonvidoe.mp4"
                    className="h-full w-full object-cover opacity-70"
                />
                {/* Vignette & Gradients to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* 2. GLASS CONTENT BOX (Matching Hero style) */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 mx-5 max-w-[900px] w-full"
            >
                <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden group">

                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-purple-500/30 rounded-tl-[2.5rem] group-hover:border-purple-400 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-500/30 rounded-br-[2.5rem] group-hover:border-cyan-400 transition-colors" />

                    <div className="flex flex-col items-center gap-8">
                        {/* Section Title with Transparent/Gradient effect */}
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white/80"
                            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))' }}>
                            ABOUT
                        </h2>

                        <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500" />

                        <p className="text-white text-xl md:text-3xl font-light leading-relaxed max-w-2xl">
                            I am a <span className="font-bold">Fullstack Software Engineer</span>.
                            I specialize in bridging the gap between{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 italic font-bold">complex logic</span>{" "}
                            and{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 font-bold">immersive design</span>.
                        </p>
                    </div>

                    {/* Glossy Reflection Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none rounded-[2.5rem]" />
                </div>
            </motion.div>
        </section>
    );
};

export default CinematicAbout;
