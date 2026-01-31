import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Phase1Props {
    onComplete: () => void;
}

export default function Phase1_Entry({ onComplete }: Phase1Props) {
    const [glitchText, setGlitchText] = useState("INITIALIZE SYSTEM");

    useEffect(() => {
        // Glitch effect loop
        const glitchInterval = setInterval(() => {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
            const randomText = "MISSION: EXPLORE".split("").map((char, index) => {
                if (Math.random() < 0.1) {
                    return chars[Math.floor(Math.random() * chars.length)];
                }
                return char;
            }).join("");
            setGlitchText(randomText);
        }, 100);

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center font-orbitron overflow-hidden">
            {/* Purple Shining Stars Background */}
            <div className="absolute inset-0 z-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            background: 'rgb(168, 85, 247)', // Pure purple
                            boxShadow: '0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.5)'
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                className="relative z-10 text-center w-full max-w-4xl"
            >
                {/* Background Grid with Purple Glow */}
                <div className="absolute inset-0 z-[-1] opacity-20 bg-[linear-gradient(rgba(168,85,247,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

                <div className="space-y-8">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block border border-purple-500/30 bg-purple-500/5 px-6 py-2 backdrop-blur-md"
                        style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
                    >
                        <span className="text-purple-500 text-xs tracking-[0.5em] uppercase" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}>
                            System Check: Nominal
                        </span>
                    </motion.div>

                    {/* Glitch Text with Radiating Purple Glow */}
                    <motion.h1
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter"
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(168, 85, 247, 0.5)',
                                '0 0 40px rgba(168, 85, 247, 0.8)',
                                '0 0 20px rgba(168, 85, 247, 0.5)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {glitchText}
                    </motion.h1>

                    {/* Button with Purple Glow Only */}
                    <motion.button
                        onClick={onComplete}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group px-12 py-4 bg-transparent border border-purple-500/50 hover:border-purple-500 transition-colors overflow-hidden"
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(168, 85, 247, 0.5)',
                                '0 0 40px rgba(168, 85, 247, 0.8)',
                                '0 0 20px rgba(168, 85, 247, 0.5)'
                            ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <motion.span
                            className="relative z-10 text-white font-bold tracking-[0.2em] group-hover:text-purple-400 transition-colors"
                            animate={{
                                textShadow: [
                                    '0 0 10px rgba(168, 85, 247, 0.6)',
                                    '0 0 20px rgba(168, 85, 247, 1)',
                                    '0 0 10px rgba(168, 85, 247, 0.6)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            INITIATE SPACE MODE
                        </motion.span>
                    </motion.button>
                </div>

                {/* HUD Elements with Purple Glow */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-purple-500/40" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }} />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/40" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }} />

            </motion.div>
        </div>
    );
}
