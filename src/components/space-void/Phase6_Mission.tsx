"use client";

import { motion } from "framer-motion";

const astronautLookingVid = "/space/astronautlooking-Ci82unKl.mp4";

export default function Phase6_Mission() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-0">
            <video
                src={astronautLookingVid}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />

            <div className="relative z-10 text-center space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl font-orbitron text-white"
                >
                    MISSION ACCOMPLISHED
                </motion.h2>
                <p className="text-purple-500 tracking-[1em] uppercase">YOU HAVE RETURNED BACK</p>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent" />
        </section>
    );
}
