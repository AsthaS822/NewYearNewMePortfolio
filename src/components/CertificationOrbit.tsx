"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CertificationOrbit.css";

const certifications = [
    {
        id: "01",
        title: "AI Foundations Associate",
        issuer: "Oracle University",
        date: "2025",
        planet: "/assets/planets/greenplanet.png",
        link: "https://drive.google.com/file/d/1eIZobSoU5GtI2MUpRsi78F6_03Anqx5s/view?usp=drive_link"
    },
    {
        id: "02",
        title: "Rebranding Challenge",
        issuer: "Masters Union",
        date: "2024",
        planet: "/assets/planets/purpleplanet.png",
        link: "https://drive.google.com/file/d/1bXEGy81fT9eQo7f8o57WMSWckUvyA2Uo/view?usp=drive_link"
    },
    {
        id: "03",
        title: "Gen AI – SAWIT.AI",
        issuer: "GUVI (HCL TECH)",
        date: "2024",
        planet: "/assets/planets/blueplanet.png",
        link: "https://www.guvi.in/share-certificate/d62a7g7971j7i688JM"
    },
    {
        id: "04",
        title: "Prompt Engineering",
        issuer: "Wilco / MLH",
        date: "2026",
        planet: "/assets/planets/ringsplanet.png",
        link: "https://app.wilco.gg/certificate/6963b164c47bde1d8a58dfb6"
    },
];

export default function CertificationOrbit() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate active certification every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % certifications.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activeCert = certifications[activeIndex];

    return (
        <section className="orbit-section">

            {/* LEFT: THE ORBIT */}
            <div className="orbit-container-left">
                <div className="orbit-system">
                    {/* SPINNING RING FRAME */}
                    <div className="orbit-ring" />

                    {/* CENTERED ACTIVE PLANET WITH GLOW */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCert.id}
                                className="relative flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                                transition={{ duration: 0.6, ease: "backOut" }}
                            >
                                {/* SHINY GLOW BEHIND */}
                                <div
                                    className="absolute rounded-full"
                                    style={{
                                        width: "140%",
                                        height: "140%",
                                        background: "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0) 70%)",
                                        zIndex: 0,
                                        filter: "blur(20px)"
                                    }}
                                />

                                {/* PLANET IMAGE */}
                                <img
                                    src={activeCert.planet}
                                    alt={activeCert.title}
                                    className="object-contain relative z-10"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* RIGHT: THE DATA */}
            <div className="orbit-container-right">

                {/* STATIC HEADING */}
                <div className="mb-8 self-start">
                    <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white tracking-tighter leading-none">
                        CERTIFICATIONS
                    </h2>
                    <div className="h-1 w-24 bg-purple-500 mt-2" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }} />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCert.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="cert-card"
                    >
                        <span className="cert-label">CERTIFICATION 0{activeIndex + 1}</span>
                        <h2 className="cert-title">{activeCert.title}</h2>
                        <div className="cert-issuer">
                            {activeCert.issuer} <br />
                            <span className="text-sm opacity-60 text-white">{activeCert.date}</span>
                        </div>

                        {/* VIEW CREDENTIAL BUTTON */}
                        {activeCert.link && activeCert.link !== "#" && (
                            <a
                                href={activeCert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block px-6 py-2 border border-purple-500/50 text-purple-400 font-orbitron text-xs tracking-widest hover:bg-purple-500/10 hover:text-white transition-all duration-300"
                            >
                                VIEW_CREDENTIAL &rarr;
                            </a>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
