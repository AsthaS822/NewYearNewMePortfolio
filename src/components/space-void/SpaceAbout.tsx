"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CinematicAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Text motion
    const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const textX = useTransform(scrollYProgress, [0.15, 0.35], [-40, 0]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative h-[130vh] w-full bg-black overflow-hidden flex items-center"
        >
            {/* GRID LAYOUT */}
            <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2 items-center px-10 md:px-20">

                {/* LEFT — TEXT */}
                <motion.div
                    style={{ opacity: textOpacity, x: textX }}
                    className="relative z-20"
                >
                    <h2 className="text-white text-[14vw] md:text-[9vw] font-black italic tracking-tight leading-none font-orbitron">
                        ABOUT
                    </h2>

                    <div className="mt-10 max-w-xl">
                        <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 mb-8" />

                        <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                            I am a <span className="font-bold">Fullstack Software Engineer</span>.
                            I specialize in bridging the gap between{" "}
                            <span className="text-purple-400 italic">complex logic</span>{" "}
                            and{" "}
                            <span className="text-cyan-400">immersive design</span>.
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT — MOON VIDEO (Full Height Panel) */}
                <div
                    className="absolute md:relative right-0 top-0 h-full w-full md:w-[50vw] overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/assets/moonvidoe.mp4"
                        className="h-full w-full object-cover opacity-80"
                    />

                    {/* SPACE DEPTH GRADIENTS */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Top/Bottom Fade to blend with black background */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default CinematicAbout;
