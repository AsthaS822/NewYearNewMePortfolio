import { motion } from "framer-motion";
import Scene05_SkillsSpiral from "./Scene05_SkillsSpiral";

const deepspaceVid = "/space/deepspace-Ck9OEiOC.mp4";

export default function Phase5_Skills() {
    return (
        <main className="bg-black">
            {/* SECTION 1: THE GAME PAGE */}
            <section className="relative h-screen w-full overflow-hidden border-b border-purple-900/20">
                <div className="absolute inset-0 z-0">
                    <video
                        src={deepspaceVid}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="relative z-10 h-full w-full">
                    {/* Ensure this component is set to height: 100% internally */}
                    <Scene05_SkillsSpiral />
                </div>
            </section>
        </main>
    );
}
