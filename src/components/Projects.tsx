"use client";
import { useState, useEffect, Suspense, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Cyl from "./Cyl";
import "../styles/projects.css";

const projectData = [
    {
        title: "GitGrade",
        tech: "Next.js • GitHub API • LLMs",
        desc: "AI-driven tool analyzing repositories for code quality and Git practices. Generates automated scores and improvement roadmaps.",
        waveColor: "rgba(255, 165, 0, 0.6)",
        accent: "#FF8C00"
    },
    {
        title: "AI-Resume",
        tech: "React • Puter.js • Tailwind",
        desc: "Instant ATS scoring engine providing feedback on PDF/DOCX resumes to optimize them for job descriptions.",
        waveColor: "rgba(255, 20, 147, 0.6)",
        accent: "#FF1493"
    },
    {
        title: "GitGrade Pro",
        tech: "OpenRouter • Next.js",
        desc: "Advanced repository signals converted into structured evaluation metrics for engineering teams.",
        waveColor: "rgba(255, 223, 0, 0.6)",
        accent: "#FFD700"
    },
    {
        title: "Resume Gen",
        tech: "JavaScript • CSS",
        desc: "Seamless client-side file processing for high-speed resume optimization and feedback.",
        waveColor: "rgba(50, 205, 50, 0.6)",
        accent: "#32CD32"
    }
];

type WavePhase = "idle" | "enter" | "hold" | "exit";
type ShowcasePhase = "wave" | "cylinder" | "text" | "idle";

const ThreeWave = ({
    color,
    phase
}: {
    color: string;
    phase: WavePhase;
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const t = state.clock.elapsedTime;

        // --- ORGANIC LIQUID POOL (Vertex Animation) ---
        const geom = meshRef.current.geometry as THREE.PlaneGeometry;
        const posAttr = geom.attributes.position;

        for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i);
            const y = posAttr.getY(i);

            // Increased waviness for "bucket of color" liquid effect
            const wave1 = Math.sin(x * 0.6 + t * 3.0) * 0.6;
            const wave2 = Math.sin(y * 0.4 + t * 2.5) * 0.4;
            const wave3 = Math.sin((x + y) * 0.5 + t * 3.5) * 0.3;

            posAttr.setZ(i, wave1 + wave2 + wave3);
        }
        posAttr.needsUpdate = true;

        // --- DIPPING ANIMATION (Rise -> Hold -> Drain) ---
        // We act on 'y' position because the plane is rotated flat (-90deg x-axis)
        // Standard "Floor" level is roughly y = -2. Cylinder bottom is approx -1.5.

        if (phase === "enter") {
            // Rise up from below (y: -5 -> -1.5) to "dip" the cylinder
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.2, 0.05);
            (meshRef.current.material as any).opacity = THREE.MathUtils.lerp(
                (meshRef.current.material as any).opacity,
                0.9,
                0.05
            );
        }

        if (phase === "hold") {
            // Gentle float while holding
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.0 + Math.sin(t) * 0.1, 0.02);
        }

        if (phase === "exit") {
            // Drain away downwards (y -> -6)
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -6, 0.05);
            (meshRef.current.material as any).opacity = THREE.MathUtils.lerp(
                (meshRef.current.material as any).opacity,
                0,
                0.08
            );
        }

        if (phase === "idle") {
            meshRef.current.position.y = -6;
            (meshRef.current.material as any).opacity = 0;
        }
    });

    return (
        // Rotated -90deg on X to be a flat floor/pool
        <mesh ref={meshRef} position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[22, 12, 64, 64]} />
            <meshPhysicalMaterial
                color={color}
                // Emissive for GLOW
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.9}
                transmission={0.2}   // Less transmission to see the color better
                roughness={0.0}      // Maximum gloss/shine
                metalness={0.8}      // Highly reflective
                thickness={2.0}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.0} // Perfect polish
            />
        </mesh>
    );
};

export default function Projects() {
    const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lastColor, setLastColor] = useState(projectData[0].waveColor);
    const [wavePhase, setWavePhase] = useState<WavePhase>("idle");
    const [showcasePhase, setShowcasePhase] = useState<ShowcasePhase>("idle");

    useEffect(() => {
        if (focusedIdx !== null) {
            setLastColor(projectData[focusedIdx].waveColor);
        }
    }, [focusedIdx]);

    useEffect(() => {
        let isActive = true;

        const sleep = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        const runSequence = async () => {
            let index = 0;

            while (isActive) {
                const currentIdx = index % projectData.length;
                setActiveIndex(currentIdx); // Track color even when text is null

                /* ------------------ 1. WAVE INTRO ------------------ */
                setFocusedIdx(null);              // ❗ no text
                setShowcasePhase("wave");
                setWavePhase("enter");
                await sleep(2000);

                setWavePhase("hold");
                await sleep(4000);                // wave alone

                /* ------------------ 2. CYLINDER HERO ------------------ */
                setWavePhase("exit");
                setShowcasePhase("cylinder");
                await sleep(2500);                // cylinder motion time

                /* ------------------ 3. TEXT REVEAL ------------------ */
                setFocusedIdx(currentIdx);        // ✅ NOW show text
                setShowcasePhase("text");
                await sleep(6000);                // reading time

                /* ------------------ 4. RESET ------------------ */
                setFocusedIdx(null);
                setWavePhase("idle");
                setShowcasePhase("idle");
                await sleep(3000);

                index++;
            }
        };

        runSequence();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <section id="projects" className={`projects-main ${focusedIdx !== null ? "is-focused" : ""}`}>
            {/* Layered Glass Reveal Overlay */}
            <AnimatePresence mode="wait">
                {focusedIdx !== null && (
                    <motion.div
                        key={focusedIdx}
                        className="center-focus-overlay"
                        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 1.1, x: "-50%", y: "-60%" }}
                        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                        style={{ position: 'absolute', left: '50%', top: '50%' }}
                    >
                        {/* Layer 1: The outermost "Atmospheric" blur */}
                        <div className="glass-layer-outer">
                            {/* Inner layer: Pure white area */}
                            <div className="glass-layer-inner">
                                <div className="content-reveal">
                                    <span className="tech-badge-premium" style={{ color: projectData[focusedIdx].accent }}>
                                        {projectData[focusedIdx].tech}
                                    </span>
                                    <h1 className="project-title-layered">
                                        {projectData[focusedIdx].title}
                                    </h1>
                                    <p className="project-desc-layered">
                                        {projectData[focusedIdx].desc}
                                    </p>
                                    <div className="scroll-progress-bar">
                                        <motion.div
                                            className="progress-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 6 }}
                                            style={{ background: projectData[focusedIdx].accent }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Header */}
            <div className="side-content">
                <span className="eyebrow">SELECTED WORK</span>
                <h2 className="title">Projects</h2>
                <div className="accent-bar" />
            </div>

            {/* Cylinder Area - No Box, Floating Look */}
            <div className="canvas-wrapper">
                <Canvas
                    dpr={[1, 2]} // HD sharpness
                    camera={{ fov: 18, position: [0, 0, 10] }}
                    className="h-[50vh] md:h-[700px] w-full"
                    gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
                >
                    <ambientLight intensity={0.8} />
                    {/* Key Light */}
                    <rectAreaLight intensity={5} width={10} height={10} position={[5, 5, 5]} />

                    {/* Rim Light (This defines the 3D shape) */}
                    <spotLight position={[-5, 2, 5]} angle={0.15} penumbra={1} intensity={10} color="#ffffff" />

                    <Suspense fallback={null}>
                        <Environment preset="city" /> {/* Sharper reflections for curve definition */}
                        <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />

                        {/* The Wave: Behind the cylinder */}
                        {showcasePhase !== "text" && (
                            <ThreeWave
                                color={projectData[activeIndex]?.accent || "#ffffff"}
                                phase={wavePhase}
                            />
                        )}

                        {/* The Cylinder: In the middle */}
                        <group position={[0.5, 0, 0]}>
                            {/* Only stop spinning when the user is reading the text */}
                            <Cyl isPaused={showcasePhase === "text"} />
                        </group>

                        <EffectComposer>
                            <Bloom
                                intensity={0.4}
                                luminanceThreshold={0.9}
                            />
                        </EffectComposer>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}
