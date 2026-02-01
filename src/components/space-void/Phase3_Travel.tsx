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
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        opacity: spaceOpacity,
                        scale: spaceScale,
                        backgroundColor: 'black'
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
                </motion.div>

                {/* VIGNETTE LAYER */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none z-[5]" />

                {/* 👨🚀 FLOATING ASTRONAUT */}
                <motion.img
                    src="/assets/astronautimg.png"
                    alt="Floating Astronaut"
                    className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 
                               w-[180px] sm:w-[240px] md:w-[320px] lg:w-[450px]
                               z-10 pointer-events-none select-none drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                    initial={{ y: 40, rotate: -8, opacity: 0 }}
                    animate={{
                        y: [40, -40, 40],
                        rotate: [-8, 6, -8],
                        opacity: 1,
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* HUD: Education Data - SHIFTED TO RIGHT */}
                <motion.div
                    style={{
                        opacity: hudOpacity,
                    }}
                    className="absolute inset-0 flex items-center justify-end z-20 pr-6 md:pr-16 lg:pr-24"
                >
                    {/* 🎓 EDUCATION GLASS CARD */}
                    <div className="px-6 sm:px-10 py-12 md:px-16 md:py-20 rounded-[2.5rem] border border-white/10 relative overflow-visible group shadow-[0_0_120px_rgba(168,85,247,0.25)] max-w-4xl w-full backdrop-blur-2xl bg-white/[0.02]">
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none rounded-[2.5rem]" />

                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-10 tracking-[0.2em] flex items-center justify-center gap-6">
                                <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                                EDUCATION_LOG
                                <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                            </h3>

                            <div className="flex flex-col gap-6 text-left divide-y divide-white/10">
                                {/* Master's */}
                                <div className="py-6 first:pt-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                                        <h4 className="text-purple-300 font-bold text-3xl">VIT Bhopal</h4>
                                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                            <span className="text-xs md:text-sm text-purple-300 font-mono font-bold">CGPA: 8.80</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                        <p className="text-xl text-white/90 font-light">MCA</p>
                                        <span className="text-sm text-white/40 font-mono tracking-widest whitespace-nowrap">2024 – 2026</span>
                                    </div>
                                </div>

                                {/* Bachelor's */}
                                <div className="py-6 last:pb-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                                        <h4 className="text-purple-300 font-bold text-3xl">MGKVP Varanasi</h4>
                                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                            <span className="text-xs md:text-sm text-purple-300 font-mono font-bold">64.67%</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                        <p className="text-xl text-white/90 font-light">BSc (Maths & CS)</p>
                                        <span className="text-sm text-white/40 font-mono tracking-widest whitespace-nowrap">2020 – 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Scanline/Grid Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-30" />
            </div>
        </section>
    );
}
