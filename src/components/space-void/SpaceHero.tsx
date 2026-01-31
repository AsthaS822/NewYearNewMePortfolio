"use client";

import React from "react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";

const Hero = () => {
    return (
        <section
            className="relative flex flex-col h-screen w-full overflow-hidden bg-black"
            id="home"
        >
            {/* 1. THE BLACK HOLE: Anchored to Top Border */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-[-350px] md:top-[-280px] left-0 z-[1] w-full h-full object-cover opacity-80 rotate-180"
            >
                <source src="/space/blackhole.webm" type="video/webm" />
            </video>

            {/* 2. OVERLAY GRADIENT: Blends video into the black background */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

            {/* 3. HERO CONTENT: The Glass Box */}
            <div className="relative z-[10] flex flex-col items-center justify-center h-full px-5 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="backdrop-blur-lg bg-white/[0.02] border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl max-w-[900px] w-full text-center relative overflow-hidden"
                >
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-purple-500/30 rounded-tl-[2.5rem]" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-500/30 rounded-br-[2.5rem]" />

                    <div className="flex flex-col items-center gap-6">
                        {/* Badge */}
                        <div className="flex items-center gap-2 py-1.5 px-4 border border-purple-500/30 rounded-full bg-black/40">
                            <BsStars className="text-purple-400 h-4 w-4" />
                            <span className="text-white text-[10px] md:text-[12px] font-mono tracking-[0.3em] uppercase">
                                Fullstack Developer // 2026
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic leading-tight">
                            PROVIDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400" style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.5))' }}>THE BEST</span> PROJECT EXPERIENCE
                        </h1>

                        {/* Description */}
                        <p className="text-gray-400 text-sm md:text-lg max-w-[600px] leading-relaxed">
                            I am <span className="text-white font-semibold">Astha Singh</span>, a Web developer & Ai enthusiast.
                            Let’s turn your coding dreams into reality.
                        </p>

                        {/* CTA Button */}
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 py-3 px-10 bg-white/5 border border-white/20 text-white font-bold rounded-full cursor-pointer hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
                        >
                            Learn More!
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* 4. MOUSE SCROLL INDICATOR */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
