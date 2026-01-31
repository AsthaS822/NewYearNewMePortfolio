"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./hero.css";

export default function Hero() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });

    /* 
       SCENE TIMING & PATHS
    */

    /* IMAGE MOTION */
    // X: 0 (Start) -> 220 (Edu Right) -> 140 (About Right - Increased shift) -> 0
    const imgX = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [0, 220, 220, 140]);

    // Y: 0 (Start) -> 60 (Edu Down - Reduced to stay in frame) -> 60 -> 0
    const imgY = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [0, 60, 60, 0]);

    // Rotate: Twist
    const rotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [0, 15, -5, 0]);

    // RotateY 1 (Pink): 0 -> 180 (Back) -> 360 (Front)
    const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [0, 180, 270, 360]);

    // RotateY 2 (Anime): 180 (Back) -> 360 (Front) -> 540 (Back)
    const rotateY2 = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [180, 360, 450, 540]);

    /* OPACITY SWAP */
    const img1Opacity = useTransform(scrollYProgress,
        [0, 0.14, 0.16, 0.70, 0.72],
        [1, 1, 0, 0, 1]
    );

    const img2Opacity = useTransform(scrollYProgress,
        [0, 0.14, 0.16, 0.70, 0.72],
        [0, 0, 1, 1, 0]
    );

    /* HI BADGE VISIBILITY & OFFSET */
    // Visible during Education and About
    const badgeOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.85], [0, 1, 1, 0]);
    const badgeScale = useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.85], [0, 1, 1, 0]);

    /* TEXT VISIBILITY */
    const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Education
    const eduOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);

    // About
    const aboutOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
    const aboutX = useTransform(scrollYProgress, [0.65, 0.75], [-20, 0]);

    return (
        <section ref={scrollRef} className="hero-scroll">
            <div className="hero-stage">
                {/* HERO NAVBAR */}
                <nav className="hero-nav">
                    <a href="#skills" className="hero-nav-link">Skills</a>
                    <a href="#projects" className="hero-nav-link">Projects</a>
                    <a href="#certifications" className="hero-nav-link">Certification</a>
                    <a href="#contact" className="hero-nav-link">Contact</a>
                </nav>

                {/* LEFT */}
                <div className="hero-left">
                    {/* INTRO TEXT */}
                    <motion.div className="hero-block intro-block" style={{ opacity: introOpacity }}>
                        <h2 className="duncan-name">ASTHA SINGH</h2>
                        <h1 className="duncan-title">WEB<br />DEVELOPER</h1>
                    </motion.div>

                    {/* EDUCATION TEXT */}
                    <motion.div className="hero-block edu-block" style={{ opacity: eduOpacity }}>
                        <h2 className="section-title">EDUCATION</h2>
                        <div className="edu-copy">
                            <p className="edu-degree">MCA (2024–2026)</p>
                            <p className="edu-school">VELLORE INSTITUTE OF TECHNOLOGY</p>
                        </div>
                        <div className="edu-copy mt-8">
                            <p className="edu-degree">BSc CS (2020–2023)</p>
                            <p className="edu-school">MGKVP</p>
                        </div>
                    </motion.div>

                    {/* ABOUT TEXT */}
                    <motion.div className="hero-block about-block" style={{ opacity: aboutOpacity, x: aboutX }}>
                        <h2 className="section-title">ABOUT ME</h2>
                        <p className="about-copy">
                            Hi, I'm Astha — frontend developer and AI enthusiast focused on
                            crafting meaningful and impactful digital experiences.
                        </p>
                    </motion.div>
                </div>

                {/* IMAGE CONTAINER */}
                <div className="hero-image">
                    <motion.img
                        src="/assets/pinkhair girl.png"
                        className="hero-img"
                        style={{ x: imgX, y: imgY, rotate, rotateY: rotateY, opacity: img1Opacity }}
                    />

                    <motion.img
                        src="/assets/anime-protagonistgril.png"
                        className="hero-img absolute"
                        style={{ x: imgX, y: imgY, rotate, rotateY: rotateY2, opacity: img2Opacity }}
                    />

                    {/* HI BADGE - Anchored to Image Motion */}
                    <motion.div
                        className="hi-badge"
                        style={{
                            x: imgX,
                            y: imgY,
                            opacity: badgeOpacity,
                            scale: badgeScale,
                            rotate: 0, // Keep badge upright even if image twists
                        }}
                    >
                        <span className="hi-text">Hi</span>
                        <span className="wave-emoji">👋</span>
                    </motion.div>
                </div>

                {/* RIGHT */}
                <div className="hero-right">
                    <motion.div style={{ opacity: introOpacity }}>
                        <h1 className="duncan-title right-align">AI<br />ENTHUSIAST</h1>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
