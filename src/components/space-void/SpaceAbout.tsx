"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CinematicAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax: The moon floats upward while the text stays more stable
    const moonY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const moonScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);

    // Text fade and slide
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const textScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[160vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center"
            id="about"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ backgroundColor: 'black' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
            </div>
            {/* 1. THE MOON SPHERE (From your moonvidoe.mp4) */}
            <motion.div
                style={{
                    y: moonY,
                    scale: moonScale,
                }}
                className="absolute z-0 w-[90vh] h-[90vh] rounded-full overflow-hidden"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/assets/moonvidoe.mp4"
                    className="w-full h-full object-cover brightness-110 bg-black"
                />

                {/* Subtle Outer Glow to make it pop against the black */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(255,255,255,0.1),0_0_50px_rgba(255,255,255,0.05)]" />
            </motion.div>

            {/* 2. THE OVERLAY TEXT (Cinematic Masking) */}
            <motion.div
                style={{ opacity: textOpacity, scale: textScale }}
                className="relative z-10 flex flex-col items-center justify-center w-full"
            >
                {/* MASSIVE BACKGROUND TEXT */}
                {/* 'mix-blend-difference' makes it look exactly like your reference video */}
                <h2 className="text-white text-[18vw] font-black tracking-tighter uppercase leading-none mix-blend-difference select-none italic" style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}>
                    ABOUT
                </h2>

                {/* DESCRIPTION BOX */}
                <div className="mt-[-4vh] px-8 max-w-4xl text-center backdrop-blur-[2px]">
                    <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 mx-auto mb-10" />

                    <p className="text-white text-xl md:text-3xl font-light leading-relaxed drop-shadow-2xl">
                        I am a <span className="font-bold">Fullstack Software Engineer</span>.
                        I specialize in bridging the gap between <span className="text-purple-400 italic">complex logic</span> and <span className="text-cyan-400">immersive design</span>.
                    </p>
                </div>
            </motion.div>

            {/* Visual Polish */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-black/10" />
        </section>
    );
};

export default CinematicAbout;
