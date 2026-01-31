import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Assets
const deepSpaceVid = "/assets/deepspace.mp4";

export default function Phase3_Travel() {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Local state for the initial timed blur
    const [isInitialBlur, setIsInitialBlur] = useState(true);

    useEffect(() => {
        // After 2 seconds, remove the initial blur
        const timer = setTimeout(() => {
            setIsInitialBlur(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Scale still tied to scroll for that "cruising" feel
    const spaceScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

    // ADJUSTED OPACITY: Original stage values
    const spaceOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.5]);

    // HUD Logic: Fade in immediately, then slide up on scroll
    const hudOpacity = useTransform(scrollYProgress, [0, 0.8, 0.9], [1, 1, 0]);
    const hudY = useTransform(scrollYProgress, [0, 0.9], [0, -50]);

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full bg-black overflow-x-hidden overflow-y-visible -mb-[1px]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20">

                {/* MAIN VISUAL */}
                <motion.div
                    initial={{ filter: "blur(20px) brightness(1.5)" }}
                    animate={{
                        filter: isInitialBlur ? "blur(20px) brightness(1.5)" : "blur(0px) brightness(1)"
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }} // The "clearing" animation
                    style={{
                        opacity: spaceOpacity,
                        scale: spaceScale,
                        backgroundColor: 'black' // Ensure it doesn't show default theme color
                    }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <video
                        src={deepSpaceVid}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </motion.div>

                {/* HUD: Education Data */}
                <motion.div
                    style={{
                        opacity: hudOpacity,
                        // y: hudY 
                    }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                >
                    {/* 🎓 EDUCATION GLASS CARD - BIG & WIDE */}
                    <div className="px-6 sm:px-10 py-16 sm:py-20 md:px-24 md:py-32 rounded-[2.5rem] border border-white/10 relative overflow-visible group shadow-[0_0_120px_rgba(168,85,247,0.25)] max-w-6xl w-full mx-4 md:mx-10 backdrop-blur-2xl bg-white/[0.02]">

                        {/* Glossy Reflection Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none rounded-[2.5rem]" />

                        <div className="relative z-10 text-center">
                            <h3 className="text-4xl sm:text-5xl md:text-7xl font-orbitron font-bold text-white mb-16 tracking-[0.2em] flex items-center justify-center gap-8">
                                <span className="w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                                EDUCATION_LOG
                                <span className="w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                            </h3>

                            <div className="flex flex-col gap-8 text-left divide-y divide-white/10">
                                {/* Master's */}
                                <div className="py-8 first:pt-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                        <h4 className="text-purple-300 font-bold text-4xl">VIT Bhopal</h4>
                                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 whitespace-nowrap">
                                            <span className="text-sm md:text-base text-purple-300 font-mono font-bold">CGPA: 8.80</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                        <p className="text-2xl text-white/90 font-light">Master of Computer Applications</p>
                                        <span className="text-base text-white/40 font-mono tracking-widest whitespace-nowrap">2024 – 2026</span>
                                    </div>
                                </div>

                                {/* Bachelor's */}
                                <div className="py-8 last:pb-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                                        <h4 className="text-purple-300 font-bold text-4xl">MGKVP Varanasi</h4>
                                        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 whitespace-nowrap">
                                            <span className="text-sm md:text-base text-purple-300 font-mono font-bold">64.67%</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                        <p className="text-2xl text-white/90 font-light">BSc (Mathematics & CS)</p>
                                        <span className="text-base text-white/40 font-mono tracking-widest whitespace-nowrap">2020 – 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Scanline/Grid Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
        </section>
    );
}
