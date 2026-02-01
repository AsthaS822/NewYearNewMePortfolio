import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Assets
const deepSpaceVid = "/assets/deepspace.mp4";

export default function Phase3_Travel() {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Local state for the initial timed blur and video sync
    const [isInitialBlur, setIsInitialBlur] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialBlur(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    // Synchronize video with astronaut float (14s cycle)
    useEffect(() => {
        const syncInterval = setInterval(() => {
            setIsPaused(prev => !prev);
        }, 7000); // Toggle every 7 seconds to match half of the 14s cycle

        return () => clearInterval(syncInterval);
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;
        if (isPaused) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(() => { });
        }
    }, [isPaused]);

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
            <div className="sticky top-0 h-screen w-full max-w-[1600px] mx-auto flex items-center justify-center px-6 md:px-12 lg:px-20">

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
                        ref={videoRef}
                        src={deepSpaceVid}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-opacity duration-1000"
                        style={{ opacity: isPaused ? 0.4 : 1 }}
                    />
                </motion.div>

                {/* VIGNETTE LAYER - Left to right falloff */}
                <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* 👨🚀 FLOATING ASTRONAUT */}
                <motion.img
                    src="/assets/astronautimg.png"
                    alt="Floating Astronaut"
                    className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 
                               w-[180px] sm:w-[240px] md:w-[320px] lg:w-[450px]
                               z-10 pointer-events-none select-none drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                    initial={{ y: 40, rotate: -8, opacity: 0 }}
                    animate={{
                        y: isPaused ? [-40, 40] : [40, -40], // Slower, purposeful float
                        rotate: isPaused ? [6, -8] : [-8, 6],
                        opacity: 1,
                    }}
                    transition={{
                        duration: 7, // Matches the isPaused toggle
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />

                {/* HUD: Education Data - CONTAINED AND READABLE */}
                <div className="relative z-20 flex items-center justify-end w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:pr-32">
                    <motion.div
                        style={{
                            opacity: hudOpacity,
                        }}
                        className="w-full max-w-4xl"
                    >
                        {/* 🎓 EDUCATION GLASS CARD - SQUARE HUD STYLE */}
                        <div className="px-6 sm:px-10 py-12 md:px-16 md:py-20 rounded-sm border border-white/20 relative group shadow-[0_0_120px_rgba(168,85,247,0.25)] backdrop-blur-3xl bg-black/40">

                            {/* HUD CORNER LABELS */}
                            <div className="absolute top-2 left-3 font-mono text-[10px] text-white/40 tracking-tighter select-none">SYST_LOG_03</div>
                            <div className="absolute top-2 right-3 font-mono text-[10px] text-white/40 tracking-tighter select-none">ED_TR_432</div>
                            <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/40 tracking-tighter select-none">POS: 42.1N 12.8E</div>
                            <div className="absolute bottom-2 right-3 font-mono text-[10px] text-white/40 tracking-tighter select-none">STAT: SYNCED</div>

                            {/* Inner Contrast Layer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent rounded-sm pointer-events-none" />

                            {/* Glossy Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20 pointer-events-none rounded-sm" />

                            {/* Corner Decorative Brackets */}
                            <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-purple-500" />
                            <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-purple-500" />
                            <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-purple-500" />
                            <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-purple-500" />

                            <div className="relative z-10 text-center">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-10 tracking-[0.2em] flex items-center justify-center gap-6">
                                    <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                                    EDUCATION_LOG
                                    <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_20px_#a855f7]" />
                                </h3>

                                <div className="flex flex-col gap-6 text-left divide-y divide-white/10">
                                    <div className="py-6 first:pt-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
                                            <h4 className="text-purple-300 font-bold text-3xl">VIT Bhopal</h4>
                                            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                                <span className="text-xs md:text-sm text-purple-300 font-mono font-bold">CGPA: 8.80</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                            <p className="text-xl text-white/90 font-light">MCA</p>
                                            <span className="text-sm text-white/40 font-mono tracking-widest">2024 – 2026</span>
                                        </div>
                                    </div>

                                    <div className="py-6 last:pb-0 hover:bg-white/5 transition-colors rounded-2xl md:px-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
                                            <h4 className="text-purple-300 font-bold text-3xl">MGKVP Varanasi</h4>
                                            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                                <span className="text-xs md:text-sm text-purple-300 font-mono font-bold">64.67%</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2">
                                            <p className="text-xl text-white/90 font-light">BSc (Maths & CS)</p>
                                            <span className="text-sm text-white/40 font-mono tracking-widest">2020 – 2023</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scanline/Grid Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-30" />
            </div>
        </section>
    );
}
