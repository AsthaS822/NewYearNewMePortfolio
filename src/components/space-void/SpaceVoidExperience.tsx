"use client";

import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Phase1_Entry from "./Phase1_Entry";
import Phase1_5_WarpGame from "./Phase1_5_WarpGame";
import SpaceHero from "./SpaceHero";
import SpaceAbout from "./SpaceAbout";
import Phase3_Travel from "./Phase3_Travel";
import Scene04_FeaturedProjects from "./Scene04_FeaturedProjects";
import Phase5_Skills from "./Phase5_Skills";
import Phase6_Contact from "./Phase6_Contact";
import CinematicNoise from "./CinematicNoise";
import DimensionNavigator from "./DimensionNavigator";
import CertificationOrbit from "../CertificationOrbit";
import Phase6_Mission from "./Phase6_Mission";


type Phase = "entry" | "warp" | "main";

export default function SpaceVoidExperience() {
    const [currentPhase, setCurrentPhase] = useState<Phase>("entry");

    useEffect(() => {
        if (currentPhase === "main") {
            try {
                const lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });

                const raf = (time: number) => {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                };
                requestAnimationFrame(raf);

                return () => lenis.destroy();
            } catch (e) {
                console.error("Lenis init failed", e);
            }
        }
    }, [currentPhase]);

    return (
        <div className="relative">
            {/* Global Cinematic Noise Overlay */}
            <div className="fixed inset-0 z-[100] pointer-events-none">
                <CinematicNoise opacity={0.03} />
            </div>

            {currentPhase === "entry" && (
                <Phase1_Entry onComplete={() => setCurrentPhase("warp")} />
            )}

            {currentPhase === "warp" && (
                <Phase1_5_WarpGame onComplete={() => setCurrentPhase("main")} />
            )}

            {currentPhase === "main" && (
                <main className="relative z-10 bg-black min-h-screen text-white selection:bg-primary/30">
                    <SpaceHero />

                    <div id="about">
                        <SpaceAbout />
                    </div>

                    <div id="education">
                        <Phase3_Travel />
                    </div>

                    <div id="projects">
                        <Scene04_FeaturedProjects />
                    </div>

                    <div id="skills">
                        <Phase5_Skills />
                    </div>

                    <div id="certifications">
                        <CertificationOrbit />
                    </div>

                    <Phase6_Mission />
                    <Phase6_Contact />

                    <DimensionNavigator />
                </main>
            )}
        </div>
    );
}
